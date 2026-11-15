
import {
  Activity,
  HeartPulse,
  Droplets,
  Thermometer,
  Gauge,
  Bell,
  Orbit,
  ShieldCheck,
  Clock3,
  UserRound,
  Satellite,
} from 'lucide-react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { demoHealthProfiles } from '../data/demoHealthProfiles';
import { analyzeHealthProfile, STATUS } from '../utils/healthAnalyzer';
import { generateProfileRecommendations } from '../utils/recommendationEngine';
import { generateAlerts } from '../utils/alertManager';

import './Dashboard.css';

// Dados fictícios para os gráficos do MVP
const heartRateData = [
  { time: '08:00', value: 68 },
  { time: '09:00', value: 72 },
  { time: '10:00', value: 75 },
  { time: '11:00', value: 70 },
  { time: '12:00', value: 74 },
  { time: '13:00', value: 72 },
  { time: '14:00', value: 76 },
];

const oxygenData = [
  { time: '08:00', value: 98 },
  { time: '09:00', value: 97 },
  { time: '10:00', value: 99 },
  { time: '11:00', value: 98 },
  { time: '12:00', value: 97 },
  { time: '13:00', value: 98 },
  { time: '14:00', value: 98 },
];

const indicatorIcons = {
  heartRate: HeartPulse,
  oxygen: Droplets,
  bloodPressure: Gauge,
  temperature: Thermometer,
};

const statusLabels = {
  [STATUS.NORMAL]: 'Normal',
  [STATUS.ATTENTION]: 'Atenção',
  [STATUS.CRITICAL]: 'Crítico',
  [STATUS.INSUFFICIENT]: 'Dados insuficientes',
};

const statusTypes = {
  [STATUS.NORMAL]: 'success',
  [STATUS.ATTENTION]: 'warning',
  [STATUS.CRITICAL]: 'danger',
  [STATUS.INSUFFICIENT]: 'warning',
};

function MetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <article className="metric-card">
      <div className="metric-top">
        <div className="metric-icon">
          <Icon size={21} />
        </div>

        <span className={`status-badge ${metric.statusType}`}>
          {metric.status}
        </span>
      </div>

      <p className="metric-title">{metric.title}</p>

      <div className="metric-value">
        {metric.value}
        <span>{metric.unit}</span>
      </div>

      <p className="metric-description">{metric.description}</p>
    </article>
  );
}

function HealthChart({ title, data, color, unit, domain }) {
  return (
    <article className="dashboard-card chart-card">
      <div className="card-heading">
        <div>
          <h3>{title}</h3>
          <p>Últimas 7 horas</p>
        </div>
        <Activity size={20} />
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${unit}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148,163,184,0.12)"
            />

            <XAxis
              dataKey="time"
              stroke="#94A3B8"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={domain}
              stroke="#94A3B8"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={35}
            />

            <Tooltip
              contentStyle={{
                background: '#10243A',
                border: '1px solid #29415A',
                borderRadius: '8px',
                color: '#F5F8FC',
              }}
              formatter={(value) => [`${value} ${unit}`, title]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#gradient-${unit})`}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

function Dashboard() {
  const savedProfile = (() => {
    try {
      const rawProfile = window.localStorage.getItem('astronautProfile');
      return rawProfile ? JSON.parse(rawProfile) : null;
    } catch {
      return null;
    }
  })();

  const profile = {
    ...demoHealthProfiles[0],
    astronautName:
      savedProfile?.astronautName || demoHealthProfiles[0].astronautName,
    astronautId:
      savedProfile?.crewId || demoHealthProfiles[0].astronautId,
    mission:
      savedProfile?.missionName || demoHealthProfiles[0].mission,
    location:
      savedProfile?.environment || demoHealthProfiles[0].location,
  };

  // 2. Analisar os indicadores de saúde
  const analysis = analyzeHealthProfile(profile);

  // 3. Gerar recomendações e alertas automaticamente
  const recommendations = generateProfileRecommendations(analysis);
  const alerts = generateAlerts(analysis);

  // 4. Preparar os indicadores para os cartões
  const indicators = analysis.indicators.map((indicator) => {
    const original = profile.indicators.find(
      (item) => item.key === indicator.key
    );

    return {
      title: indicator.label,
      value:
        original?.displayValue ??
        (indicator.value == null ? '—' : String(indicator.value)),
      unit: indicator.unit,
      status: statusLabels[indicator.status],
      statusType: statusTypes[indicator.status],
      icon: indicatorIcons[indicator.key] || Activity,
      description: original?.description || indicator.message,
    };
  });

  const overallLabels = {
    [STATUS.NORMAL]: 'Monitorização estável',
    [STATUS.ATTENTION]: 'Existem indicadores que exigem atenção',
    [STATUS.CRITICAL]: 'Foi identificado um indicador crítico',
    [STATUS.INSUFFICIENT]: 'Existem dados insuficientes',
  };

  const overallStatus = analysis.overallStatus;

  return (
    <main className="dashboard-page">

      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-logo">
            <Orbit size={24} />
          </div>

          <div>
            <h2>ASTRO-HEALTH</h2>
            <p>SPACE HEALTH MONITORING</p>
          </div>
        </div>

        <div className="header-actions">
          <span className="system-status">
            <span className="status-dot"></span>
            Sistema operacional
          </span>

          <button
            className="notification-button"
            type="button"
            aria-label="Notificações"
          >
            <Bell size={19} />
            <span className="notification-dot"></span>
          </button>

          <div className="user-avatar">
            <UserRound size={20} />
          </div>
        </div>
      </header>

      <div className="dashboard-content">

        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-eyebrow">
              CENTRO DE MONITORIZAÇÃO
            </span>
            <h1>Painel de saúde</h1>
            <p>
              Acompanha os indicadores de saúde da tripulação em tempo real.
            </p>
          </div>

          <div className="mission-info">
            <div className="mission-icon">
              <Satellite size={22} />
            </div>
            <div>
              <span>MISSÃO ATUAL</span>
              <strong>{profile.mission}</strong>
              <small>{profile.location}</small>
            </div>
          </div>
        </section>

        <div className="demo-banner">
          <ShieldCheck size={18} />
          <span>
            MODO DE DEMONSTRAÇÃO — Os valores apresentados são dados
            simulados e não representam medições reais.
          </span>
        </div>

        <section className="health-overview">
          <div className="overview-indicator">
            <span className="overview-dot"></span>
            <div>
              <span>ESTADO GERAL</span>
              <strong>
                {overallLabels[overallStatus] || 'Estado não determinado'}
              </strong>
            </div>
          </div>

          <div className="overview-details">
            <span>
              <Clock3 size={15} />
              Análise automática
            </span>
            <span>01 astronauta monitorizado</span>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Indicadores de saúde</h2>
              <p>Resumo dos parâmetros fisiológicos.</p>
            </div>
            <span className="section-label">
              {indicators.length} INDICADORES
            </span>
          </div>

          <div className="metrics-grid">
            {indicators.map((metric) => (
              <MetricCard key={metric.title} metric={metric} />
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Evolução dos indicadores</h2>
              <p>Histórico de medições durante a missão.</p>
            </div>
            <span className="section-label">HISTÓRICO</span>
          </div>

          <div className="charts-grid">
            <HealthChart
              title="Frequência cardíaca"
              data={heartRateData}
              color="#16C7B0"
              unit="bpm"
              domain={[50, 100]}
            />

            <HealthChart
              title="Saturação de oxigénio"
              data={oxygenData}
              color="#4C8DFF"
              unit="%"
              domain={[90, 100]}
            />
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Centro de alertas</h2>
              <p>Ocorrências identificadas pelo sistema.</p>
            </div>
            <span className="section-label">
              {alerts.length} OCORRÊNCIAS
            </span>
          </div>

          {alerts.length === 0 ? (
            <article className="alert-item">
              <div className="alert-content">
                <strong>Nenhum alerta identificado.</strong>
                <p>Não existem ocorrências registadas nesta análise.</p>
              </div>
            </article>
          ) : (
            alerts.map((alert) => (
              <article
                className="alert-item warning-alert"
                key={alert.id}
              >
                <div className="alert-icon">
                  <Activity size={21} />
                </div>

                <div className="alert-content">
                  <div className="alert-title-row">
                    <strong>{alert.title}</strong>
                    <span
                      className={`status-badge ${
                        alert.severity === 'critical'
                          ? 'danger'
                          : alert.severity === 'warning'
                            ? 'warning'
                            : 'success'
                      }`}
                    >
                      {statusLabels[alert.status] || alert.status}
                    </span>
                  </div>

                  <p>{alert.message}</p>
                  <small>{alert.astronautName} · Alerta simulado</small>
                </div>
              </article>
            ))
          )}
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <div>
              <h2>Recomendações do sistema</h2>
              <p>Ações informativas geradas a partir dos indicadores.</p>
            </div>
            <span className="section-label">
              {recommendations.length} RECOMENDAÇÕES
            </span>
          </div>

          {recommendations.map((recommendation, index) => (
            <article className="alert-item" key={`${recommendation.indicator}-${index}`}>
              <div className="alert-icon">
                <ShieldCheck size={21} />
              </div>

              <div className="alert-content">
                <div className="alert-title-row">
                  <strong>{recommendation.title}</strong>
                </div>
                <p>{recommendation.message}</p>
                <small>{recommendation.action}</small>
              </div>
            </article>
          ))}

          <p className="metric-description">
            As recomendações são informativas e não substituem avaliação
            médica nem os protocolos médicos da missão.
          </p>
        </section>

        <section className="dashboard-section astronaut-section">
          <div className="section-title">
            <div>
              <h2>Informações da missão</h2>
              <p>Dados de identificação do astronauta.</p>
            </div>
          </div>

          <div className="dashboard-card astronaut-card">
            <div className="astronaut-avatar">
              <UserRound size={28} />
            </div>

            <div className="astronaut-details">
              <span>ASTRONAUTA</span>
              <strong>{profile.astronautName}</strong>
              <small>ID: {profile.astronautId}</small>
            </div>

            <div className="astronaut-mission">
              <span>MISSÃO</span>
              <strong>{profile.mission}</strong>
              <small>{profile.location}</small>
            </div>

            <span className="status-badge success">
              Em monitorização
            </span>
          </div>
        </section>

      </div>

      <footer className="dashboard-footer">
        ASTRO-HEALTH · SPACE HEALTH MONITORING SYSTEM
        <span>Protótipo MVP · Dados simulados</span>
      </footer>
    </main>
  );
}

export default Dashboard;
