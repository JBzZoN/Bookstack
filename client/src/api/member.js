import axios from "axios";

const API_BASE_URL = "http://localhost:7070";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`
  }
});

export const allBooksCardData = () => {
  return api.get("/member/books");
};

export const allLikedBooksCardData = () => {
  return api.get("/member/liked-books");
};

export const recommendedBooksData = () => {
  return api.get("/member/recommended-books");
};

export const trendingBooksData = () => {
  return api.get("/member/trending-books");
};

export const newArrivedBooksData = () => {
  return api.get("/member/new-arrived-books");
};

export const allRecommendedBooksData = () => {
  return api.get("/member/all-recommended-books");
};

export const allTrendingBooksData = () => {
  return api.get("/member/all-trending-books");
};

export const allNewArrivedBooksData = () => {
  return api.get("/member/all-new-arrived-books");
};

export const bookDetailsData = (id) => {
  return api.get(`/member/book/${id}`);
};

export const mightLikedBooksData = (id) => {
  return api.get(`/member/might-liked-books/${id}`);
};



