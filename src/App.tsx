import { Suspense, Key } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import routes, { ExtendedRouteProps } from "./routes/config";
import { AuthProvider } from "./context/AuthProvider";
import { Body } from "./App.styles";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const renderRoute = (route: ExtendedRouteProps, index: Key) => {
  const Element = () =>
    route.protected ? (
      <PrivateRoute>
        <route.element />
      </PrivateRoute>
    ) : (
      <PublicRoute>
        <route.element />
      </PublicRoute>
    );

  return <Route key={index} path={route.path} element={<Element />} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Body>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, index) => renderRoute(route, index))}
            </Routes>
          </Suspense>
        </Body>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
