import axios from "axios";

const API_BASE_URL = "http://localhost:30080";

const api = axios.create({
  baseURL: API_BASE_URL
});

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* RESPONSE INTERCEPTOR (optional but recommended) */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;









