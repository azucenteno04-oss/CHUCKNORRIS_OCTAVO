import axios from "axios";

const API_URL = "https://chucknorrisoctavo-production-d7ea.up.railway.app/api";

const api = axios.create({
  baseURL: API_URL,
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
};

export default api;