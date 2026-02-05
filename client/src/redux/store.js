import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./slices/likeSlice";

/**
 * Central Redux Store
 * =========================================================================
 * The single source of truth for the application's global state.
 * 
 * Registered Reducers:
 * - likes: Manages the collection of books favorited by the user.
 * 
 * @see {@link https://redux-toolkit.js.org/api/configureStore}
 */
export const store = configureStore({
  reducer: {
    likes: likeReducer
  }
});

export default store;