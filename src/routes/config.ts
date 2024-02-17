import React from "react";

export interface ExtendedRouteProps {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: React.LazyExoticComponent<any>;
  protected?: boolean;
}

const routes: ExtendedRouteProps[] = [
  {
    path: "/",
    element: React.lazy(() => import("../pages/HomePage")),
    protected: true,
  },
  {
    path: "/home",
    element: React.lazy(() => import("../pages/HomePage")),
    protected: true,
  },
  {
    path: "/login",
    element: React.lazy(() => import("../pages/LoginPage")),
    protected: false,
  },
  {
    path: "/register",
    element: React.lazy(() => import("../pages/RegisterPage")),
    protected: false,
  },
];

export default routes;
