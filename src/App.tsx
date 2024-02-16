import { Suspense, Key } from "react";
import { Routes, Route } from "react-router-dom";

import routes, { ExtendedRouteProps } from "./routes/config";
import PrivateRoute from "./components/PrivateRoute.component";
import { AuthProvider } from "./context/AuthProvider";

const renderRoute = (route: ExtendedRouteProps, index: Key) => {
  const Element = () =>
    route.protected ? (
      <PrivateRoute>
        <route.element />
      </PrivateRoute>
    ) : (
      <route.element />
    );

  return <Route key={index} path={route.path} element={<Element />} />;
};

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => renderRoute(route, index))}
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
