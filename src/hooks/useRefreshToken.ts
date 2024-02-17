import Cookies from "js-cookie";

import { axiosInstance } from "../api/axiosInstance";
import { REFRESH_URL } from "../constants/api.constants";
import useAuth from "./useAuth";

const isDevelopment = import.meta.env.VITE_APP_ENV === "development";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosInstance.post(REFRESH_URL, undefined, {
      withCredentials: !isDevelopment,
      headers: isDevelopment
        ? {
            Authorization: `Bearer ${Cookies.get("refresh_token")}`,
          }
        : {},
    });
    const { access_token } = response?.data || {};
    setAuth(access_token);
    return access_token;
  };
  return refresh;
};

export default useRefreshToken;
