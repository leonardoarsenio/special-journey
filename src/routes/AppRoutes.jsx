import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Onboarding from '../pages/Onboarding';
import Dashboard from '../pages/Dashboard';
import CrewDashboard from '../pages/CrewDashboard';

import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../components/AppLayout';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>

        <Route element={<ProtectedRoute requireProfile />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crew" element={<CrewDashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
