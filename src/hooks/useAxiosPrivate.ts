import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { axiosPrivateInstance } from "../api/axiosInstance";
import { deleteTokensCookies } from "../utils/auth.utils";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${Cookies.get(
            "access_token"
          )}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const new_access_token = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${new_access_token}`;
            return axiosPrivateInstance(prevRequest);
          } catch (error) {
            deleteTokensCookies();
            navigate("/login");
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, refresh]);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;
