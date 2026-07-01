import { api } from "@/api/api";
import { axiosInterceptor } from "@/axios/interceptor";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  apiKeysError,
  apiKeysLoading,
  apiKeysSuccess,
} from "@/redux/slices/apikeysslice";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, MoreHorizontal, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiKeyMoreOptions } from "@/utils/contants";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const ApiKeys = () => {
  const [newKeyGenerateButtonLoader, setNewKeyGenerateButtonLoader] =
    useState(false);
  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );
  const { data: userData } = useSelector((state) => state.meReducer);
  const {
    data: apikeys,
    loading: apiKeysLoader,
    error: apiKeysErr,
  } = useSelector((state) => state.apiKeysReducer);
  const dispatch = useDispatch();

  async function generateNewKey() {
    try {
      setNewKeyGenerateButtonLoader(true);
      const key = await axiosInterceptor.post(
        api.projects + selectedProjectId + "/" + api.api_keys,
      );
      dispatch(apiKeysSuccess([...apikeys, key.data]));
    } finally {
      setNewKeyGenerateButtonLoader(false);
    }
  }

  async function fetchApiKeys() {
    try {
      dispatch(apiKeysLoading());
      const response = await axiosInterceptor.get(
        api.projects + selectedProjectId + "/" + api.api_keys,
      );
      dispatch(apiKeysSuccess(response.data.data));
    } catch (error) {
      dispatch(apiKeysError(error?.response?.data?.message || error.message));
    }
  }

  async function handleOptions(option, id) {
    if (option === "revoke") {
      await axiosInterceptor.put(api.projects + api.api_keys + id + "/revoke");
      fetchApiKeys();
      toast.success("This key has been revoked. This key is no longer in use.");
    } else if (option === "delete") {
      await axiosInterceptor.delete(
        api.projects + api.api_keys + id + "/delete",
      );
      fetchApiKeys();
      toast.success("key is deleted successfully.");
    } else if (option === "make_active") {
      await axiosInterceptor.delete(
        api.projects + api.api_keys + id + "/make-active",
      );
      fetchApiKeys();
      toast.success("key is activated successfully.");
    }
  }
  const role = userData.dataValues.role;
  const disable = role !== "ADMIN" && role !== "OWNER";

  useEffect(() => {
    if (selectedProjectId) {
      fetchApiKeys();
    }
  }, [selectedProjectId]);
  return (
    <div className="px-4 pt-12">
      <div className="text-end">
        <Button onClick={generateNewKey}>
          {newKeyGenerateButtonLoader ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Plus /> New Key
            </>
          )}
        </Button>
      </div>
      <p className="text-sm font-bold  mb-4">
        Api key will be shown once.Please copy and save it to use in your
        projects.
      </p>
      <Table>
        <TableCaption className="text-start">
          API keys for this project.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>API KEY</TableHead>
            <TableHead>CREATED AT</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!apiKeysLoader &&
            apikeys?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono">
                  {item.api_key || item.hash_key}
                </TableCell>

                <TableCell>
                  {new Date(item.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-gray-100 transition">
                        <MoreHorizontal className="w-5 h-5 cursor-pointer" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-40 p-1">
                      <div className="flex flex-col">
                        {apiKeyMoreOptions.map((option) => (
                          <button
                            disabled={disable}
                            key={option}
                            onClick={() =>
                              handleOptions(
                                item.status === "revoked"
                                  ? "make_active"
                                  : option,
                                item.id,
                              )
                            }
                            className={`text-left px-3 py-2 text-sm rounded-md cursor-pointer transition hover:bg-gray-100 ${
                              option === "revoke"
                                ? item.status === "revoked" 
                                  ? "hover:text-green-600 hover:bg-green-100"
                                  : "hover:text-red-600 hover:bg-red-50"
                                : ""
                            } ${ option === "delete" && "hover:bg-red-100 hover:text-red-600"}`}
                          >
                            {item.status === "revoked" && option === "revoke" ? "Make active" : option}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                {item.status === "revoked" && (
                  <TableCell>
                    <p className="bg-red-600 text-white font-bold w-fit px-2 py-1 text-xs rounded-full">
                      {item.status}
                    </p>
                  </TableCell>
                )}
              </TableRow>
            ))}
          {apiKeysLoader && (
            <TableRow>
              <TableCell>
                {" "}
                <Skeleton className="h-4 w-[220px]" />
              </TableCell>
              <TableCell>
                {" "}
                <Skeleton className="h-4 w-[160px]" />
              </TableCell>
              <TableCell>
                {" "}
                <Skeleton className="h-4 w-8" />
              </TableCell>
            </TableRow>
          )}
          {!apikeys ||
            (!apikeys.length && !apiKeysLoader && (
              <TableRow>
                <TableCell>No Api keys are generated.</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApiKeys;
