import { api } from "@/api/api";
import { axiosInterceptor } from "@/axios/interceptor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const TemplateInfo = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    loading: false,
    error: null,
    data: null,
  });

  async function fetchTemplateData() {
    try {
      setData((prev) => ({ ...prev, loading: true }));

      const response = await axiosInterceptor.get(api.template + id);

      setData({
        loading: false,
        error: null,
        data: response.data.data,
      });
    } catch (error) {
      setData({
        loading: false,
        error: error?.response?.data?.message || error.message,
        data: null,
      });
    }
  }

  useEffect(() => {
    if (id) fetchTemplateData();
  }, [id]);

  if (data.loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-7 w-7 animate-spin" />
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="py-20 text-center text-red-600 font-medium">
        {data.error}
      </div>
    );
  }

  if (!data.data) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">{data.data.template_name}</CardTitle>

          <p className="text-sm text-gray-500 mt-2">
            Created on {new Date(data.data.createdAt).toLocaleString()}
          </p>
        </CardHeader>

        <CardContent className="space-y-8 pt-8">
          { data.data.title && <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Subject / Title
            </p>

            <textarea
              readOnly
              value={data.data.title || ""}
              className="min-h-[90px] w-full rounded-md border bg-gray-50 p-3 text-sm resize-none"
            />
          </div>}

          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Template Body
            </p>

            <textarea
              readOnly
              value={data.data.body}
              className="min-h-[320px] w-full rounded-md border bg-gray-50 p-3 text-sm resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateInfo;
