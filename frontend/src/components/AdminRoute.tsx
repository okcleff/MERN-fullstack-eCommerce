import { Navigate, Outlet } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// types
import { IUserInfo } from '../types';

const AdminRoute = () => {
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: IUserInfo } }) => state.auth
  );
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};
export default AdminRoute;
