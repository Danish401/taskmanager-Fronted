


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import './styles/global.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import TaskManager from "./components/TaskManager";
import Dashboard from "./components/Dashboard"; // Assuming you have a Dashboard component
import NotFound from "./components/NotFound"; // Assuming a NotFound component for 404 pages
import DragDrop from "./components/DragDrop";
import PostForm from "./components/PostForm";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

const App = () => {
  const mode = useSelector((state) => state.theme.mode); // Access theme state

  return (
    <Router>
      <div className={`app-container ${mode}`}> {/* Dynamic styling based on theme */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />}>
            <Route index element={<Hero />}/>
              <Route path="sign-up" element={<Signup />} />
              <Route path="log-in" element={<Login />} />
              <Route path="add-task" element={<TaskManager />} />
              <Route path="task-drag" element={<DragDrop />} />
              <Route path="post" element={<PostForm />} />
              <Route path="footer" element={<Footer/>}/>
            </Route>
            <Route path="*" element={<NotFound />} /> {/* 404 fallback route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
