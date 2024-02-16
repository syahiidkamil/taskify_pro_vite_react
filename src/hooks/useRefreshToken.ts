import { axiosInstance } from "../api/axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosInstance.get("/auth/refresh", {
      withCredentials: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setAuth((prev: any) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
