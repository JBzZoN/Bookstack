import axios from "axios";

const API_BASE = "http://localhost:7070"; // Gateway URL

// 🔐 Helper to get JWT
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`
  };
};

/**
 * GET all liked books for logged-in member
 * Returns: { bookId: true, bookId: true }
 */
export const fetchUserLikes = async () => {
  const res = await axios.get(
    `${API_BASE}/member/likes`,
    {
      headers: authHeader()
    }
  );

  return res.data;
};

/**
 * Toggle like/unlike for a book
 */
export const toggleLikeApi = async (bookId) => {
  await axios.post(
    `${API_BASE}/member/likes/toggle`,
    { bookId },
    {
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      }
    }
  );
};
