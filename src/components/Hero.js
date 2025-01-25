import React from "react";
import { Outlet } from "react-router-dom";

import TaskManager from "./TaskManager"; // Import TaskManager
import DragDrop from "./DragDrop"; // Import DragDrop
import PostForm from "./PostForm"; // Import PostForm
import Dashboard from "./Dashboard"; // Import Dashboard

const Hero = () => {
  return (
    <div className="flex flex-col min-h-screen text-black bg-white">
      {/* Dashboard Section */}
      {/* <div className="py-6 bg-blue-100">
        <Dashboard />
      </div> */}

      {/* Main Content */}
      <main className="flex-grow p-6 space-y-10">
        {/* Render additional components */}
        <TaskManager />
        <DragDrop />
        <PostForm />
        <Outlet /> {/* Renders nested routes */}
      </main>

      {/* Footer */}
    
    </div>
  );
};

export default Hero;
