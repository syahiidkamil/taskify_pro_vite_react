import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const {
    auth: { isUserAuthenticated },
  } = useAuth();
  return isUserAuthenticated ? <Navigate to="/tasklist" /> : children;
};

export default PublicRoute;
