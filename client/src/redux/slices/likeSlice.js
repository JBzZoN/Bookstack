import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ==========================================================================
   Async Actions (Thunks)
   ========================================================================== */

/**
 * Fetches all book IDs liked by the current user from the backend.
 * Used to hydrate the global state on application load or login.
 * 
 * @async
 * @function loadLikesFromBackend
 */
export const loadLikesFromBackend = createAsyncThunk(
  "likes/load",
  async () => {
    const res = await api.get("/member/likes");
    return res.data;
  }
);

/**
 * Synchronizes a single 'like' toggle with the persistent backend database.
 * 
 * @async
 * @function syncLikeWithBackend
 * @param {string|number} bookId - The unique identifier of the book to toggle.
 */
export const syncLikeWithBackend = createAsyncThunk(
  "likes/sync",
  async (bookId) => {
    await api.post("/member/likes/toggle", { bookId });
    return bookId;
  }
);

/* ==========================================================================
   Slice Definition
   ========================================================================== */

/**
 * Like Slice
 * ==========================================================================
 * Manages the "liked" status of books across the application.
 * 
 * State Structure:
 * - byBookId {Object}: A map where keys are book IDs and values are booleans (true if liked).
 * - loading {boolean}: Tracks the status of background API synchronizations.
 * 
 * @module likeSlice
 */
const likeSlice = createSlice({
  name: "likes",
  initialState: {
    byBookId: {},
    loading: false
  },
  reducers: {
    /**
     * Optimistically toggles the like status in the local state.
     * This provides immediate UI feedback while the thunk handles backend sync.
     * 
     * @param {Object} state - Current slice state.
     * @param {Object} action - Action containing the bookId.
     */
    toggleLike: (state, action) => {
      const bookId = action.payload;
      const current = state.byBookId[bookId] ?? false;
      state.byBookId[bookId] = !current;
    }
  },
  extraReducers: (builder) => {
    builder
      /* --- Load Initial Data --- */
      .addCase(loadLikesFromBackend.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadLikesFromBackend.fulfilled, (state, action) => {
        const normalized = {};

        // SAFETY: handle array of IDs OR a pre-normalized object
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

