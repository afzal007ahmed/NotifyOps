import { api } from "@/api/api";
import { axiosInterceptor } from "@/axios/interceptor";
import {
  templatesError,
  templatesLoading,
  templatesSuccess,
} from "@/redux/slices/templates";
import { routes } from "@/routes/routes";
import { templateOptions } from "@/utils/contants";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const TemplateOptions = ({ selectedTemplate, setSelectedTemplate }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );

  const {
    data: templates,
    loading: templatesLoader,
    error: templatesErr,
  } = useSelector((state) => state.templateReducer);
  async function fetchTemplates() {
    try {
      dispatch(templatesLoading());
      const response = await axiosInterceptor.get(
        api.template + "all/" + selectedProjectId,
      );
      dispatch(templatesSuccess(response.data.data));
    } catch (error) {
      dispatch(templatesError());
    }
  }

  useEffect(() => {
    if (selectedProjectId) {
      fetchTemplates();
    }
  }, [selectedProjectId]);

  return (
    <div className="w-full">
      <p className="font-semibold text-center text-xl text-gray-800">
        Select the channel
      </p>

      <p className="text-sm text-gray-500 text-center mt-1">
        Choose how you want to send notifications
      </p>

      <div className="flex gap-6 justify-center mt-10 flex-wrap">
        {templateOptions.map((option) => {
          const isActive = selectedTemplate === option.id;

          return (
            <div
              key={option.id}
              onClick={() => setSelectedTemplate(option.id)}
              className={`
                cursor-pointer select-none
                px-8 py-5 rounded-xl border transition-all duration-200
                w-44 text-center
                hover:shadow-md hover:-translate-y-1
                ${
                  isActive
                    ? "border-black bg-black text-white shadow-lg"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }
              `}
            >
              <p className="font-semibold text-sm">{option.label}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-12">
        <p className="mb-6 text-center text-lg font-semibold">Templates</p>

        {templatesLoader ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : templates?.length ? (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() =>
                  nav(
                    routes.TEMPLATEINFO.slice(
                      0,
                      routes.TEMPLATEINFO.length - 3,
                    ) + template.id,
                  )
                }
                className="rounded-lg border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex justify-between gap-6">
                    <div className="flex gap-3 items-start">
                      <p className="font-semibold text-gray-900 truncate">
                        {template.template_name}
                      </p>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium capitalize text-gray-600">
                        {template.channel}
                      </span>
                    </div>
                    <p className="text-xs">{template.id}</p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  Created {new Date(template.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            No templates created yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateOptions;
