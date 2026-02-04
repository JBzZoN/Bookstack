import axios from "axios";

const API_BASE_URL = "http://localhost:7070";

const api = axios.create({
  baseURL: API_BASE_URL
});

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      const { token, userId, id } = JSON.parse(storedUser);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add X-User-Id header if userId exists (backend requirement)
      if (userId || id) {
        config.headers['X-User-Id'] = userId || id;
      }
    }

    return config;
  },
  (error) => {
    throw error;
  }
);

/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.clear();
      window.location.href = "/login";
    }

    throw error;
  }
);

export default api;
