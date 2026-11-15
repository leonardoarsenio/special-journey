import { Navigate, Outlet } from 'react-router-dom';
import { hasDemoSession } from '../services/sessionService';
import { hasAstronautProfile } from '../services/profileService';

function ProtectedRoute({ requireProfile = false }) {
  if (!hasDemoSession()) {
    return <Navigate to="/" replace />;
  }

  if (requireProfile && !hasAstronautProfile()) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
