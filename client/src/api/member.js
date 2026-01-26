import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL
});

export const allBooksCardData = () => {
  return api.get("/member/books");
};

export const allLikedBooksCardData = () => {
  return api.get("/member/liked-books");
};