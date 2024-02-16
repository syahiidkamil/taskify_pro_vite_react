import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export const axiosPrivateInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
