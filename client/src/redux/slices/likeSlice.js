import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "likes",
  initialState: {
    byBookId: {}
  },
  reducers: {
    toggleLike: (state, action) => {
      const bookId = action.payload;
      const current = state.byBookId[bookId] ?? false;
      state.byBookId[bookId] = !current;
    },
    hydrateLikes: (state, action) => {
      state.byBookId = {
        ...state.byBookId,
        ...action.payload
      };
    }
  }
});

export const { toggleLike, hydrateLikes } = likeSlice.actions;
export default likeSlice.reducer;
