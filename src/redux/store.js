import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/postSlice";
import searchReducer from "./features/searchSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    searchTerm: searchReducer
  }
});
