import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Blocks access unless the authenticated user's role is in `allowedRoles`.
 * Usage: <Route element={<RoleRoute allowedRoles={['host', 'admin']} />}>
 */
const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
