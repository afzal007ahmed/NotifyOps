import React from "react";
import { Button } from "../ui/button";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { axiosInterceptor } from "@/axios/interceptor";
import { api } from "@/api/api";
import { useSelector } from "react-redux";

const Sms = ({ smsTemplate, setSmsTemplate, setSelectedTemplate }) => {
  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );

  async function handleSubmit() {
    try {
      setSmsTemplate((prev) => ({ ...prev, loading: true }));
      const { loading, ...template } = smsTemplate;
      const body = {
        ...template,
        projectId: selectedProjectId,
      };
      await axiosInterceptor.post(api.template, body);
      setSelectedTemplate("");
      toast.success("Template created successfully.");
    } finally {
      setSmsTemplate((prev) => ({ ...prev, loading: false }));
    }
  }

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="text-end mb-6">
        <Button className="cursor-pointer" onClick={handleSubmit}>
          {smsTemplate.loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Save />
              Save
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-semibold">Note:</span> Choose a unique template
        name for this project. When sending a notification, pass this value as
        the
        <span className="mx-1 rounded bg-gray-100 px-1 py-0.5 font-mono">
          template_name
        </span>
        in the request payload to identify the template.
      </p>
      <p className="mb-8 text-sm text-gray-600">
        <span className="font-semibold">Instructions:</span> Use{" "}
        <span className="rounded bg-gray-100 px-1 py-0.5 font-mono text-gray-800">
          {"{{variable}}"}
        </span>{" "}
        to insert dynamic recipient data. During notification delivery, each
        placeholder will be replaced with the corresponding value provided by
        the merchant.
        <br />
        <span className="text-gray-500">
          Example:{" "}
          <span className="font-mono text-gray-800">Hello {"{{name}}"}!</span> →{" "}
          <span className="font-medium">Hello John!</span>
        </span>
      </p>
      <div className="flex items-center border-b pb-2 mb-4">
        <span className="text-sm w-[140px]">Template Name :</span>
        <input
          value={smsTemplate.template_name}
          onChange={(e) =>
            setSmsTemplate((prev) => ({
              ...prev,
              template_name: e.target.value,
            }))
          }
          placeholder="Template Name"
          className="border-none focus:outline-none focus:ring-0 font-mono w-full"
        />
      </div>
      <textarea
        value={smsTemplate.body}
        onChange={(e) =>
          setSmsTemplate((prev) => ({ ...prev, body: e.target.value }))
        }
        placeholder="Enter the message here..."
        className="mt-6 w-full  h-[60vh] p-2 font-mono focus:outline-none"
      />
    </div>
  );
};

export default Sms;
