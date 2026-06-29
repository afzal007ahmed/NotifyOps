import ProjectInfo from "@/components/home/ProjectInfo";
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { selectedProjectId } = useSelector(
    (state) => state.selectProjectIdReducer,
  );

  return (
    <div className="h-full">
      {!selectedProjectId ? (
        <div className="h-full flex justify-center items-center">
          <div>
            <p className="text-xl font-medium">No Projects Found.</p>
          </div>
        </div>
      ) : (
        <ProjectInfo />
      )}
    </div>
  );
};

export default Home;
