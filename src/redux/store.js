

// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
// import tasksReducer from "./tasksSlice"; // Task slice
import themeReducer from "./themeSlice"; // Theme slice
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";
import postReducer from "./postSlice"; // Adjust path as needed
export const store = configureStore({
  reducer: {
   
    theme: themeReducer, // Ensure themeReducer is added here
    auth: authReducer,
    tasks: taskReducer,
    posts: postReducer, 
  },
});

