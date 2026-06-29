import { api } from "@/api/api";
import { axiosInterceptor } from "@/axios/interceptor";
import { fetchingProjectsSuccess } from "@/redux/slices/projects";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Project = ({ openDialog, setOpenDialog }) => {
  const [projectName, setProjectName] = useState("");
  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit() {
    try {
      setLoading(true);
      await axiosInterceptor.post(api.projects, { name: projectName });
      const response = await axiosInterceptor.get(api.projects);
      dispatch(fetchingProjectsSuccess(response.data.data));
      setOpenDialog(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        if( !selectedProjectId ) return ; 
        setOpenDialog(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>
            Create a new project for your organisation.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <DialogFooter>
          <Button className="font-bold" onClick={handleSubmit}>
            {loading ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Project;
