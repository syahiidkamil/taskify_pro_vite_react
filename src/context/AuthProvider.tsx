/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, ReactNode } from "react";

const AuthContext = createContext<any>({});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<any>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
