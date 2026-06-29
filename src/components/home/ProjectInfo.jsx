import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInterceptor } from "@/axios/interceptor";
import { api } from "@/api/api";
import {
  projectInfoError,
  projectInfoLoading,
  projectInfoSuccess,
} from "@/redux/slices/projectInfoSlice";

const ProjectInfo = () => {
  const dispatch = useDispatch();
  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );

  const {
    data: projectInfo,
    loading: projectInfoLoader,
    error,
  } = useSelector((state) => state.projectInfoReducer);

  async function fetchProject() {
    try {
      dispatch(projectInfoLoading());
      const res = await axiosInterceptor.get(
        `${api.projects}${selectedProjectId}`,
      );
      dispatch(projectInfoSuccess(res.data.data));
    } catch (error) {
      dispatch(projectInfoError(error.response?.data.message || error.message));
    }
  }

  useEffect(() => {
    if (selectedProjectId) {
      fetchProject();
    }
  }, [selectedProjectId]);

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      {error && (
        <div className="w-full max-w-[420px] rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <div className="text-red-600 font-semibold text-lg">{error}</div>

          <p className="text-sm text-red-500 mt-2">{error}</p>
        </div>
      )}
      {projectInfoLoader ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-gray-600" size={40} />
          <p className="text-sm text-gray-500">Loading project...</p>
        </div>
      ) : projectInfo ? (
        <div className="w-full max-w-[420px] rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {projectInfo.name}
            </h1>

            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
              Active
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Project ID</span>
              <span className="text-gray-800 font-medium truncate max-w-[200px]">
                {projectInfo.id}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Org ID</span>
              <span className="text-gray-800 font-medium truncate max-w-[200px]">
                {projectInfo.org_id}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Created</span>
              <span className="text-gray-700">
                {new Date(projectInfo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            No project selected
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Select a project from sidebar to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectInfo;
