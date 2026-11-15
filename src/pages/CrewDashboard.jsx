
import {
  Activity,
  HeartPulse,
  Users,
  AlertTriangle,
  ShieldCheck,
  Orbit,
  UserRound,
} from 'lucide-react';

import { demoHealthProfiles } from '../data/demoHealthProfiles';
import { analyzeHealthProfile, STATUS } from '../utils/healthAnalyzer';
import { generateAlerts } from '../utils/alertManager';

import './CrewDashboard.css';

const statusLabels = {
  [STATUS.NORMAL]: 'Normal',
  [STATUS.ATTENTION]: 'Atenção',
  [STATUS.CRITICAL]: 'Crítico',
  [STATUS.INSUFFICIENT]: 'Dados insuficientes',
};

const statusClasses = {
  [STATUS.NORMAL]: 'normal',
  [STATUS.ATTENTION]: 'attention',
  [STATUS.CRITICAL]: 'critical',
  [STATUS.INSUFFICIENT]: 'insufficient',
};

function CrewDashboard() {
  // Analisar todos os perfis disponíveis
  const crew = demoHealthProfiles.map((profile) => {
    const analysis = analyzeHealthProfile(profile);
    const alerts = generateAlerts(analysis);

    return {
      ...profile,
      analysis,
      alerts,
    };
  });

  // Calcular resumo da tripulação
  const totalAstronauts = crew.length;

  const totalAlerts = crew.reduce(
    (total, astronaut) => total + astronaut.alerts.length,
    0
  );

  const criticalAstronauts = crew.filter(
    (astronaut) => astronaut.analysis.overallStatus === STATUS.CRITICAL
  ).length;

  const attentionAstronauts = crew.filter(
    (astronaut) => astronaut.analysis.overallStatus === STATUS.ATTENTION
  ).length;

  return (
    <main className="crew-page">

      <header className="crew-header">
        <div className="crew-brand">
          <div className="crew-logo">
            <Orbit size={24} />
          </div>

          <div>
            <h2>ASTRO-HEALTH</h2>
            <p>MEDICAL CREW MONITORING</p>
          </div>
        </div>

        <span className="crew-demo-status">
          <span></span>
          Modo de demonstração
        </span>
      </header>

      <div className="crew-content">

        <section className="crew-welcome">
          <span className="crew-eyebrow">CENTRO MÉDICO ESPACIAL</span>
          <h1>Painel da tripulação</h1>
          <p>
            Acompanhamento dos indicadores de saúde dos astronautas
            durante a missão.
          </p>
        </section>

        <div className="crew-demo-banner">
          <ShieldCheck size={19} />
          Dados simulados exclusivamente para demonstração do MVP.
        </div>

        {/* RESUMO DA TRIPULAÇÃO */}
        <section className="crew-summary">

          <article className="crew-summary-card">
            <Users size={22} />
            <div>
              <span>Astronautas</span>
              <strong>{totalAstronauts}</strong>
            </div>
          </article>

          <article className="crew-summary-card">
            <AlertTriangle size={22} />
            <div>
              <span>Alertas ativos</span>
              <strong>{totalAlerts}</strong>
            </div>
          </article>

          <article className="crew-summary-card">
            <Activity size={22} />
            <div>
              <span>Casos críticos</span>
              <strong>{criticalAstronauts}</strong>
            </div>
          </article>

          <article className="crew-summary-card">
            <HeartPulse size={22} />
            <div>
              <span>Requerem atenção</span>
              <strong>{attentionAstronauts}</strong>
            </div>
          </article>

        </section>

        {/* LISTA DE ASTRONAUTAS */}
        <section className="crew-section">

          <div className="crew-section-heading">
            <div>
              <h2>Astronautas monitorizados</h2>
              <p>Estado individual de cada membro da tripulação.</p>
            </div>

            <span>{totalAstronauts} REGISTADOS</span>
          </div>

          <div className="crew-list">

            {crew.map((astronaut) => {
              const status = astronaut.analysis.overallStatus;

              return (
                <article
                  className="crew-astronaut-card"
                  key={astronaut.astronautId}
                >

                  <div className="crew-astronaut-identity">
                    <div className="crew-astronaut-avatar">
                      <UserRound size={25} />
                    </div>

                    <div>
                      <h3>{astronaut.astronautName}</h3>
                      <span>{astronaut.astronautId}</span>
                    </div>
                  </div>

                  <div className="crew-astronaut-mission">
                    <span>MISSÃO</span>
                    <strong>{astronaut.mission}</strong>
                    <small>{astronaut.location}</small>
                  </div>

                  <div className="crew-astronaut-status">
                    <span>ESTADO GERAL</span>
                    <strong className={statusClasses[status]}>
                      {statusLabels[status] || status}
                    </strong>
                  </div>

                  <div className="crew-astronaut-count">
                    <span>ALERTAS</span>
                    <strong>{astronaut.alerts.length}</strong>
                  </div>

                </article>
              );
            })}

          </div>
        </section>

        {/* ALERTAS DA TRIPULAÇÃO */}
        <section className="crew-section">

          <div className="crew-section-heading">
            <div>
              <h2>Alertas da tripulação</h2>
              <p>Indicadores que necessitam de acompanhamento.</p>
            </div>
          </div>

          {totalAlerts === 0 ? (
            <div className="crew-empty-state">
              <ShieldCheck size={24} />
              <p>Nenhum alerta identificado.</p>
            </div>
          ) : (
            crew.flatMap((astronaut) =>
              astronaut.alerts.map((alert) => (
                <article className="crew-alert-card" key={alert.id}>
                  <div className="crew-alert-icon">
                    <AlertTriangle size={21} />
                  </div>

                  <div>
                    <h3>{alert.title}</h3>
                    <p>{alert.message}</p>
                    <small>
                      {astronaut.astronautName} · {astronaut.astronautId}
                    </small>
                  </div>

                  <span className={statusClasses[alert.status]}>
                    {statusLabels[alert.status] || alert.status}
                  </span>
                </article>
              ))
            )
          )}

        </section>

      </div>

      <footer className="crew-footer">
        ASTRO-HEALTH · MEDICAL CREW MONITORING
        <span>Protótipo MVP · Dados simulados</span>
      </footer>

    </main>
  );
}

export default CrewDashboard;

