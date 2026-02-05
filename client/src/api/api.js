import axios from "axios";

/**
 * Central API Utility
 * =========================================================================
 * Provides a pre-configured Axios instance for all backend interactions.
 * 
 * Key Responsibilities:
 * - Base URL configuration.
 * - Automatic authentication header injection (JWT & User ID).
 * - Global error handling and session management (401/403 redirects).
 */

/**
 * Base URL for the backend services.
 * @constant {string}
 */
const API_BASE_URL = "http://localhost:7070";

/**
 * Configured Axios instance.
 * Use this instance rather than the raw axios library to benefit from interceptors.
 */
const api = axios.create({
  baseURL: API_BASE_URL
});

/* ==========================================================================
   Request Interceptor
   ========================================================================== */

/**
 * Injects security headers before every outgoing request.
 * - Extracts current user from localStorage.
 * - Adds 'Authorization: Bearer <token>' for JWT verification.
 * - Adds 'X-User-Id' for backend user context tracking.
 */
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
  (error) => {
    throw error;
  }
);

/* ==========================================================================
   Response Interceptor
   ========================================================================== */

/**
 * Handles backend responses globally.
 * - Passes successful responses through.
 * - On 401 (Unauthorized) or 403 (Forbidden), clears the local session 
 *   and redirects the user to the login page to ensure security.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    throw error;
  }
);

export default api;

