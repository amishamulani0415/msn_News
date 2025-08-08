// src/services/apiService.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/msnclone", // ✅ backend url
});

// CRUD functions
const apiService = {
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config),
};

export default apiService;
