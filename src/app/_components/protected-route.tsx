import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth-store';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  return <Outlet />;
}
