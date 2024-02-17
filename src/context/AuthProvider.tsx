import { ReactNode, useState } from "react";
import { flushSync } from "react-dom";
import { jwtDecode } from "jwt-decode";

import { AuthI, UserI } from "../interface/AuthContext.interface";
import AuthContext from "./AuthContext";
import { setTokensCookies, getIsUserAuthenticated } from "../utils/auth.utils";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authRaw, setAuthRaw] = useState<AuthI>({});

  const setAuth = (access_token: string, refresh_token?: string) => {
    const { name, email } = jwtDecode<UserI>(access_token);
    flushSync(() => {
      setTokensCookies(access_token, refresh_token);
      setAuthRaw({
        user: {
          name,
          email,
        },
        isUserAuthenticated: !!email || getIsUserAuthenticated(),
      });
    });
  };

  const auth = {
    user: authRaw.user,
    isUserAuthenticated: getIsUserAuthenticated(),
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
