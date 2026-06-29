import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../ui/sidebar";
import { menuItems } from "@/utils/contants";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { routes } from "@/routes/routes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProjectId } from "@/redux/slices/selectedProjectId";
import { Plus } from "lucide-react";

const AppSidebar = ({ setOpenDialog }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { data: projects } = useSelector((state) => state.projectsReducer);
  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );
  const { data: user } = useSelector((state) => state.meReducer);

  const path = window.location.pathname;

  function handleLogout() {
    localStorage.removeItem("token");
    nav(routes.LOGIN);
  }
  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="px-6 pt-6">
        <p className="text-2xl font-semibold tracking-tight">Hello { user.dataValues.name }</p>
        <p className="text-sm text-gray-500">NotifyOps Dashboard</p>
      </SidebarHeader>

      <SidebarContent className="px-4 py-2 flex flex-col justify-between">
        <div>
          <Select
            value={String(selectedProjectId || "")}
            onValueChange={(value) => dispatch(setSelectedProjectId(value))}
          >
            <SelectTrigger className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium text-gray-800">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>

            <SelectContent className="rounded-xl overflow-hidden border border-gray-200 shadow-lg">
              <SelectGroup>
                {projects?.map((project) => (
                  <SelectItem
                    key={project.id}
                    value={String(project.id)}
                    className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 transition"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-gray-800">
                        {project.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
                <div
                  onClick={() => setOpenDialog(true)}
                  className="flex text-sm mt-2 items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                >
                  {" "}
                  <Plus size={14} /> Add New Project{" "}
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
          <SidebarMenu className="space-y-2 mt-4">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  onClick={() => nav(item.link)}
                  className={` flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  text-base font-medium
                  text-gray-600
                  hover:bg-gray-100
                  hover:text-gray-900
                  transition
                  cursor-pointer
                  ${path === item.link && "bg-gray-200 text-black"}
                `}
                >
                  <item.icon size={20} className="text-gray-500" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
        <SidebarFooter>
          <Button
            className="font-bold bg-red-600 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
