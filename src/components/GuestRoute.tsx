import { Navigate } from 'react-router-dom';
import { useSessionStore } from '../store/sessionStore';

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const isAuthenticated = useSessionStore(state => state.isAuthenticated);

  // 已经登录了，直接跳首页
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;