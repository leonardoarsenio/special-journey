import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startDemoSession } from '../services/sessionService';
import { hasAstronautProfile } from '../services/profileService';

import {
  Activity,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  Orbit,
  ShieldCheck,
} from 'lucide-react';

import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
  event.preventDefault();
  setMessage('');

  if (!email.trim() || !password.trim()) {
    setMessage('Preencha o email e a palavra-passe para continuar.');
    return;
  }

  // Inicia a sessão de demonstração
  startDemoSession(email.trim());

  // Se já existe um perfil, vai para o dashboard.
  // Se for o primeiro acesso, vai para o cadastro.
  if (hasAstronautProfile()) {
    navigate('/dashboard', { replace: true });
  } else {
    navigate('/onboarding', { replace: true });
  }
}
  return (
    <main className="login-page">

      {/* LADO INFORMATIVO */}
      <section className="login-hero">

        <div className="brand">
          <div className="brand-icon">
            <Activity size={25} />
          </div>

          <span>ASTRO<span className="brand-highlight">-HEALTH</span></span>
        </div>

        <div className="hero-content">
          <span className="mission-label">
            <Orbit size={15} />
            SPACE HEALTH MONITORING SYSTEM
          </span>

          <h1>
            A saúde da tripulação.
            <span> A missão em primeiro lugar.</span>
          </h1>

          <p>
            Monitorização inteligente dos indicadores de saúde
            dos astronautas, ajudando a identificar alterações
            e apoiar decisões durante missões espaciais.
          </p>

          <div className="hero-features">

            <div className="hero-feature">
              <Activity size={20} />
              <div>
                <strong>Monitorização contínua</strong>
                <span>Acompanhamento dos indicadores vitais.</span>
              </div>
            </div>

            <div className="hero-feature">
              <ShieldCheck size={20} />
              <div>
                <strong>Segurança da tripulação</strong>
                <span>Informação organizada para apoiar decisões.</span>
              </div>
            </div>

          </div>
        </div>

        <div className="hero-footer">
          <span>ASTRO-HEALTH SYSTEM</span>
          <span>FROM ANGOLA. BEYOND LIMITS.</span>
        </div>

      </section>

      {/* LADO DO FORMULÁRIO */}
      <section className="login-form-section">

        <div className="login-form-container">

          <div className="mobile-brand">
            <div className="brand-icon">
              <Activity size={23} />
            </div>
            <span>ASTRO-HEALTH</span>
          </div>

          <div className="form-heading">
            <span className="welcome-label">BEM-VINDO À MISSÃO</span>

            <h2>Iniciar sessão</h2>

            <p>
              Introduza as suas credenciais para aceder
              à plataforma de monitorização.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="login-input-group">
              <label htmlFor="email">Endereço de email</label>

              <div className="login-input-wrapper">
                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  placeholder="exemplo@astro-health.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Palavra-passe</label>

              <div className="login-input-wrapper">
                <LockKeyhole size={19} />

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Introduza a sua palavra-passe"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? 'Ocultar palavra-passe'
                      : 'Mostrar palavra-passe'
                  }
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button">
              Entrar na plataforma
              <span>→</span>
            </button>

            {message && (
              <div className="login-message" role="status">
                {message}
              </div>
            )}

          </form>

          <div className="login-security">
            <ShieldCheck size={17} />
            <span>Acesso reservado a utilizadores autorizados.</span>
          </div>

          <div className="login-bottom">
            <span>ASTRO-HEALTH © 2026</span>
            <span>MISSION CONTROL INTERFACE</span>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Login;
