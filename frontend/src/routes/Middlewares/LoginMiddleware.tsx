import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

export function LoginMiddleware() {
  // const { data } = useAuth();

  // if (data) {
  //   return <Outlet />;
  // }

  return <Navigate to="/login" replace />;
}
