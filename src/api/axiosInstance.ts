import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const isDevelopment = import.meta.env.VITE_APP_ENV === "development";

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export const axiosPrivateInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: !isDevelopment,
});
