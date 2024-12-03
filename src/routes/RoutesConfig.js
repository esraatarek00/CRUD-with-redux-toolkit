import React from "react";
import { Routes, Route } from "react-router-dom";
import PostsList from "../features/posts/PostsList"; 
import PostDetails from "../features/posts/PostDetails"; 

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  );
};

export default RoutesConfig;
