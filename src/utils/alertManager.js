/**
 * ASTRO-HEALTH
 * Gestor de alertas da missão.
 *
 * Os alertas são informativos e não substituem
 * os protocolos médicos da missão.
 */

const alertConfig = {
  attention: {
    severity: 'warning',
    title: 'Atenção necessária',
  },

  critical: {
    severity: 'critical',
    title: 'Alerta crítico',
  },

  insufficient: {
    severity: 'info',
    title: 'Dados insuficientes',
  },
};

export function generateAlerts(analysis) {
  if (!analysis || !Array.isArray(analysis.indicators)) {
    return [];
  }

  return analysis.indicators
    .filter(indicator => indicator.status !== 'normal')
    .map(indicator => {
      const config = alertConfig[indicator.status];

      if (!config) return null;

      return {
        id: `${analysis.astronautId}-${indicator.key}`,
        astronautId: analysis.astronautId,
        astronautName: analysis.astronautName,
        indicator: indicator.label,
        value: indicator.value,
        unit: indicator.unit,
        status: indicator.status,
        severity: config.severity,
        title: config.title,
        message: indicator.message,
        createdAt: new Date().toISOString(),
        acknowledged: false,
      };
    })
    .filter(Boolean);
}
