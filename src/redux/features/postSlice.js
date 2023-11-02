import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../mockData";

export const postSlice = createSlice({
  name: "posts",
  initialState: JSON.parse(localStorage.getItem("posts")) || data,
  reducers: {
    addPost: (state, action) => {
      // using unshit method instead of push
      // so that our written post come on top
      state.unshift(action.payload);
      localStorage.setItem("posts", JSON.stringify(state));
    },

    updatePost: (state, action) => {
      const { id, content, isFollowing } = action.payload;
      const postToUpdate = state.find((post) => post.id === id);
      if (postToUpdate) {
        postToUpdate.content = content;
        postToUpdate.isFollowing = !isFollowing;
      }
      localStorage.setItem("posts", JSON.stringify(state));
    },

    removePost: (state, action) => {
      const data = state?.filter((user) => {
        if (user.id !== action.payload.id) {
          return user;
        }
      });
      localStorage.setItem("posts", JSON.stringify(data));
      return data;
    }
  }
});

export const { addPost, updatePost, removePost } = postSlice.actions;

export default postSlice.reducer;
