import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import AppSidebar from "./components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Project from "./components/authprovider/Project";
import { axiosInterceptor } from "./axios/interceptor";
import { api } from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { fetchingMeSuccess, meLoading, meReset } from "./redux/slices/me";
import {
  fetchingProjectsSuccess,
  projectsLoading,
  projectsReset,
} from "./redux/slices/projects";
import { setSelectedProjectId } from "./redux/slices/selectedProjectId";
import {
  fetchOrganisationError,
  fetchOrganisationSuccess,
  resetOrganisation,
} from "./redux/slices/organisationSlice";
import { routes } from "./routes/routes";

const AuthProvider = () => {
  const nav = useNavigate();
  const [openDialog, setOpenDailog] = useState(false);
  const { data, loading } = useSelector((state) => state.meReducer);
  const { data: projects, loading: projectsLoader } = useSelector(
    (state) => state.projectsReducer,
  );
  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );

  const dispatch = useDispatch();

  async function fetchMe() {
    try {
      dispatch(meLoading());
      const response = await axiosInterceptor.get(api.me);
      dispatch(fetchingMeSuccess(response.data.data));
    } catch (error) {
      nav(routes.LOGIN);
    }
  }

  async function fetchProjects() {
    dispatch(projectsLoading());
    const response = await axiosInterceptor.get(api.projects);
    dispatch(fetchingProjectsSuccess(response.data.data));
  }

  async function fetchOrg() {
    try {
      const response = await axiosInterceptor.get(api.organisation);
      dispatch(fetchOrganisationSuccess(response.data.data));
    } catch (error) {
      dispatch(fetchOrganisationError());
    }
  }

  useEffect(() => {
    if (projects?.length > 0 && !selectedProjectId) {
      dispatch(setSelectedProjectId(projects[0].id));
    }

    if (projects && projects.length === 0 && !projectsLoader) {
      setOpenDailog(true);
    }
  }, [projects]);

  useEffect(() => {
    fetchMe();
    fetchProjects();
    fetchOrg();
    return () => {
      dispatch(meReset());
      dispatch(projectsReset());
      dispatch(resetOrganisation());
    };
  }, []);

  if (loading || data === null) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="relative">
      <SidebarProvider>
        <AppSidebar setOpenDialog={setOpenDailog} />
        <span className="flex-1 min-h-[100vh] relative">
          <SidebarTrigger className="absolute top-0 left-0" />
          <Outlet />
        </span>
      </SidebarProvider>
      {openDialog && (
        <Project openDialog={openDialog} setOpenDialog={setOpenDailog} />
      )}
    </div>
  );
};

export default AuthProvider;
