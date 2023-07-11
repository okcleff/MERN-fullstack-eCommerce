import { Navigate, Outlet } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// types
import { IUserInfo } from "../types";

const PrivateRoute = () => {
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: IUserInfo } }) => state.auth
  );
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
