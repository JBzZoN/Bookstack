import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ---------- ASYNC ---------- */

export const loadLikesFromBackend = createAsyncThunk(
  "likes/load",
  async () => {
    const res = await api.get("/member/likes");
    return res.data;
  }
);

export const syncLikeWithBackend = createAsyncThunk(
  "likes/sync",
  async (bookId) => {
    await api.post("/member/likes/toggle", { bookId });
    return bookId;
  }
);

/* ---------- SLICE ---------- */

const likeSlice = createSlice({
  name: "likes",
  initialState: {
    byBookId: {},     
    loading: false
  },
  reducers: {
    toggleLike: (state, action) => {
      const bookId = action.payload;
      const current = state.byBookId[bookId] ?? false;
      state.byBookId[bookId] = !current;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLikesFromBackend.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadLikesFromBackend.fulfilled, (state, action) => {
        const normalized = {};

        // 🔥 SAFETY: handle array OR object
        if (Array.isArray(action.payload)) {
          action.payload.forEach((bookId) => {
            normalized[bookId] = true;
          });
        } else if (action.payload && typeof action.payload === "object") {
          Object.assign(normalized, action.payload);
        }

        state.byBookId = normalized;
        state.loading = false;
      })
      .addCase(loadLikesFromBackend.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
