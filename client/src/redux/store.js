import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./slices/likeSlice";

export const store = configureStore({
  reducer: {
    likes: likeReducer
  }
});

export default store;