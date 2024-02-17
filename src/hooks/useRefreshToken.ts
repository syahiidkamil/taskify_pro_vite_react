import { axiosInstance } from "../api/axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosInstance.get("/auth/refresh", {
      withCredentials: true,
    });
    const { access_token } = response?.data || {};
    setAuth(access_token);
    return access_token;
  };
  return refresh;
};

export default useRefreshToken;
