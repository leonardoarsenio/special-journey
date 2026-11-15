
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Onboarding from '../pages/Onboarding';
import Dashboard from '../pages/Dashboard';
import CrewDashboard from '../pages/CrewDashboard';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crew" element={<CrewDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
