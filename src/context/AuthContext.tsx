/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { AuthContextI } from "../interface/AuthContext.interface";

const defaultAuthValue = {
  auth: {},
  setAuth: () => {},
};

const AuthContext = createContext<AuthContextI>(defaultAuthValue);

export default AuthContext;
