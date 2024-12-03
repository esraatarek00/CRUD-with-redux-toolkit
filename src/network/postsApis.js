import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// adding new post
export const addPost = createAsyncThunk("posts/addPost", async (postInfo) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    postInfo
  );
  return response.data;
});
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
});
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return { id }; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
