import { api } from "@/api/api";
import { axiosInterceptor } from "@/axios/interceptor";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logsError, logsLoading, logsSuccess } from "@/redux/slices/logs";

const Logs = () => {
  const dispatch = useDispatch();
  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );
  const {
    data: logsData,
    loading,
    error,
  } = useSelector((state) => state.logsReducer);
  async function fetchLogs() {
    try {
      dispatch(logsLoading());
      const response = await axiosInterceptor.get(
        api.logs + "/" + selectedProjectId,
      );
      dispatch(logsSuccess(response.data.data));
    } catch (error) {
      dispatch(logsError(error?.response.data.message || error.message));
    }
  }

  useEffect(() => {
    if (selectedProjectId) fetchLogs();
  }, [selectedProjectId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "sent_to_smtp":
      case "sms_delivered":
      case "delivered_to_merchant":
        return "bg-green-100 text-green-700";

      case "failed":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "partially_sent":
        return "bg-orange-100 text-orange-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const safeArray = (val) => (Array.isArray(val) ? val : []);

  return (
    <div className="px-4 pt-12">
      <h1 className="text-lg font-bold mb-4">Logs</h1>

      <Table>
        <TableCaption className="text-start">
          Notification logs for this project.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>JOB ID</TableHead>
            <TableHead>CHANNELS</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>ATTEMPTS</TableHead>
            <TableHead>RECIPIENT TYPE</TableHead>
            <TableHead>CREATED</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading &&
            Array.from({ length: 3 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Skeleton className="h-4 w-[160px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[60px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[140px]" />
                </TableCell>
              </TableRow>
            ))}

          {!loading &&
            logsData?.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">
                  {log.job_id ?? "-"}
                </TableCell>

                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {safeArray(log.channel).map((ch, idx) => (
                      <Badge key={idx} variant="outline">
                        {ch}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    {safeArray(log.status).map((s, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(
                          s?.value,
                        )}`}
                      >
                        {s?.channel} : {s?.value}
                      </span>
                    ))}
                  </div>
                </TableCell>

                <TableCell>{log.attempts ?? 0}</TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    {log.recipients_type ?? "-"}
                  </Badge>
                </TableCell>

                <TableCell>
                  {log.createdAt
                    ? new Date(log.createdAt).toLocaleString()
                    : "-"}
                </TableCell>
                {log.error_message && (
                  <TableCell>{log.error_message}</TableCell>
                )}
              </TableRow>
            ))}

          {!loading && logsData?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No logs found
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-red-600">
                {error}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Logs;
