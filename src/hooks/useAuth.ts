import { getIsUserAuthenticated } from "./../utils/auth.utils";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return {
    auth: { ...auth, isUserAuthenticated: getIsUserAuthenticated() },
    setAuth,
  };
};

export default useAuth;
