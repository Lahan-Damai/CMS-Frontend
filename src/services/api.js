import axios from "axios";

const API_BASE_URL = "https://lahandamaiapi-production.up.railway.app/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error;
  }
);

export default api;