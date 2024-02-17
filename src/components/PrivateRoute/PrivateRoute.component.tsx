import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const {
    auth: { isUserAuthenticated },
  } = useAuth();
  return isUserAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
