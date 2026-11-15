import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { endDemoSession } from '../services/sessionService';
import './AppLayout.css';

function AppLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    endDemoSession();
    navigate('/', { replace: true });
  }

  return (
    <>
      <nav className="app-navigation">
        <div className="app-navigation-brand">
          <span className="app-navigation-symbol">A</span>
          <strong>ASTRO-HEALTH</strong>
        </div>

        <div className="app-navigation-links">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => isActive ? 'app-nav-link active' : 'app-nav-link'}
          >
            <LayoutDashboard size={18} />
            <span>Meu painel</span>
          </NavLink>

          <NavLink
            to="/crew"
            className={({ isActive }) => isActive ? 'app-nav-link active' : 'app-nav-link'}
          >
            <Users size={18} />
            <span>Painel médico</span>
          </NavLink>
        </div>

        <button
          type="button"
          className="app-logout-button"
          onClick={handleLogout}
        >
          <LogOut size={17} />
          <span>Sair</span>
        </button>
      </nav>

      <Outlet />
    </>
  );
}

export default AppLayout;
