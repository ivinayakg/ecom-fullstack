import { Outlet, useLocation, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  const isAuth = localStorage.getItem("isAuth") ?? false;
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
