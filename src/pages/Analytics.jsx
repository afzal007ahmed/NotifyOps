import { api } from "@/api/api";
import { axiosInterceptor } from "@/axios/interceptor";
import { logsError, logsLoading, logsSuccess } from "@/redux/slices/logs";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CartesianGrid, Line, LineChart, XAxis, PieChart, Pie } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const Analytics = () => {
  const dispatch = useDispatch();

  const [usageData, setUsageData] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );

  const {
    data: logsData,
    loading,
    error,
  } = useSelector((state) => state.logsReducer);

  async function fetchUsage() {
    try {
      setUsageData((prev) => ({ ...prev, loading: true }));
      const response = await axiosInterceptor.get(api.organisation + api.usage);
      setUsageData((prev) => ({
        ...prev,
        data: response.data.data,
        loading: false,
      }));
    } catch (error) {
      setUsageData((prev) => ({ ...prev, loading: false }));
    }
  }

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
    if (selectedProjectId) {
      fetchLogs();
      fetchUsage();
    }
  }, [selectedProjectId]);

  const chartDataLineChart = useMemo(() => {
    const returnData = [];
    if (logsData && logsData.length) {
      const data = {};

      logsData.forEach((log) => {
        const date = new Date(log.createdAt).getDate();
        const smsStatus = log.status.find((i) => i.channel === "sms")?.value;

        if (
          log?.channel.includes("sms") &&
          (smsStatus === "partially_sent" || smsStatus === "sms_delivered")
        ) {
          data[date] = data[date]
            ? { ...data[date], sms: data[date].sms + 1 }
            : { sms: 1, email: 0, inapp: 0 };
        }
        const emailStatus = log.status.find(
          (i) => i.channel === "email",
        )?.value;

        if (
          log.channel.includes("email") &&
          (emailStatus === "partially_sent" || emailStatus === "sent_to_smtp")
        ) {
          data[date] = data[date]
            ? { ...data[date], email: data[date].email + 1 }
            : { sms: 0, email: 1, inapp: 0 };
        }

        const inappStatus = log.status.find(
          (i) => i.channel === "inapp",
        )?.value;

        if (
          log.channel.includes("inapp") &&
          (inappStatus === "partially_sent" ||
            inappStatus === "delivered_to_merchant")
        ) {
          data[date] = data[date]
            ? { ...data[date], inapp: data[date].inapp + 1 }
            : { sms: 0, email: 1, inapp: 1 };
        }
      });

      for (let i in data) {
        const element = {
          date: i,
          sms: data[i].sms,
          email: data[i].email,
          inapp: data[i].inapp,
        };
        returnData.push(element);
      }
      return returnData;
    }
  }, [logsData]);

  const chartConfigLineChart = {
    sms: {
      label: "Sms",
      color: "#1563e0ff",
    },
    email: {
      label: "Email",
      color: "#22c55e",
    },
    inapp: {
      label: "Inapp",
      color: "#b41b1bff",
    },
  };

  const chartConfigPieChart = {
    sms: {
      label: "Sms",
      color: "#1563e0ff",
    },
    email: {
      label: "Email",
      color: "#22c55e",
    },
    inapp: {
      label: "In-app",
      color: "#eb3c15ff",
    },
  };

  const chartDataPieChart = useMemo(() => {
    const data = [];
    if (usageData.data) {
      data.push({
        key: "email",
        usage: usageData.data.email_count,
        fill: "#22c55e",
      });
      data.push({
        key: "sms",
        usage: usageData.data.sms_count,
        fill: "#3b82f6",
      });
      data.push({
        key: "inapp",
        usage: usageData.data.inapp_count,
        fill: "#f59e0b",
      });
    }
    return data;
  }, [usageData]);

  return (
    <div className="p-12 flex gap-4 justify-center items-start">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Successfull / Partially delivered notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigLineChart}>
            <LineChart
              accessibilityLayer
              data={chartDataLineChart}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="email"
                type="natural"
                stroke={chartConfigLineChart.email.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="sms"
                type="natural"
                stroke={chartConfigLineChart.sms.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="inapp"
                type="natural"
                stroke={chartConfigLineChart.inapp.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <CardFooter className="bg-white my-4 block">
            <div className="flex gap-2 items-center">
              <div
                className={`w-4 h-4 border rounded`}
                style={{ background: chartConfigLineChart.email.color }}
              />
              <span className="text-xs font-medium font-mono pt-1">Email</span>
            </div>
            <div className="flex gap-2 items-center mt-1">
              <div
                className={`w-4 h-4 border rounded`}
                style={{ background: chartConfigLineChart.sms.color }}
              />
              <span className="text-xs font-medium font-mono pt-1">Sms</span>
            </div>
            <div className="flex gap-2 items-center mt-1">
              <div
                className={`w-4 h-4 border rounded`}
                style={{ background: chartConfigLineChart.inapp.color }}
              />
              <span className="text-xs font-medium font-mono pt-1">Inapp</span>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
      <Card className="flex flex-col w-[400px] h-[400px]">
        <CardHeader className="items-center pb-0">
          <CardTitle>Total usage</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfigPieChart}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartDataPieChart} dataKey="usage" nameKey="key" />
            </PieChart>
          </ChartContainer>
          <CardFooter className="bg-white block">
            <div className="flex gap-2 items-center">
              <div
                className={`w-4 h-4 border rounded`}
                style={{ background: chartConfigPieChart.email.color }}
              />
              <span className="text-xs font-medium font-mono pt-1">Email</span>
            </div>
            <div className="flex gap-2 items-center mt-1">
              <div
                className={`w-4 h-4 border rounded`}
                style={{ background: chartConfigPieChart.sms.color }}
              />
              <span className="text-xs font-medium font-mono pt-1">Sms</span>
            </div>
            <div className="flex gap-2 items-center mt-1">
              <div
                className={`w-4 h-4 border rounded`}
                style={{ background: chartConfigPieChart.inapp.color }}
              />
              <span className="text-xs font-medium font-mono pt-1">Inapp</span>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
