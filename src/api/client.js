import axios from "axios";

// axios.create() returns a new axios instance with the given defaults
// Every call made through 'client' uses these defaults
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  // VITE_API_URL comes from .env file — we cover .env properly on Day 12
  // The || 'http://localhost:8000' is a fallback for when .env is not set
});

// ─────────────────────────────────────────────────────────────
// Request interceptor — runs BEFORE every request
// ─────────────────────────────────────────────────────────────
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Attach the JWT as a Bearer token
    // FastAPI's get_current_user dependency reads this header
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // must return config — otherwise the request is cancelled
});
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default client;
