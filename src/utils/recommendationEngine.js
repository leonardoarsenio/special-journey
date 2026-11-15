
/**
 * ASTRO-HEALTH
 * Motor de recomendações.
 *
 * As recomendações são sugestões informativas.
 * Não substituem avaliação ou orientação médica.
 */

const recommendations = {
  normal: {
    title: 'Indicador dentro da referência',
    message: 'Continue a acompanhar este indicador e mantenha as rotinas previstas no plano da missão.',
    priority: 'low',
    action: 'Manter monitorização.',
  },

  attention: {
    title: 'Indicador merece atenção',
    message: 'Verifique a medição, analise a tendência e considere os fatores que podem ter influenciado o resultado.',
    priority: 'medium',
    action: 'Repetir medição e acompanhar.',
  },

  critical: {
    title: 'Indicador requer avaliação prioritária',
    message: 'Siga o protocolo médico da missão e encaminhe o resultado à equipa médica responsável.',
    priority: 'high',
    action: 'Contactar a equipa médica imediatamente.',
  },

  insufficient: {
    title: 'Dados insuficientes',
    message: 'Não foi possível avaliar este indicador com segurança. Verifique os dados e a configuração da referência.',
    priority: 'medium',
    action: 'Verificar ou recolher nova medição.',
  },
};

export function generateRecommendation(indicator) {
  const recommendation = recommendations[indicator.status];

  if (!recommendation) {
    return {
      title: 'Estado desconhecido',
      message: 'Não existe uma recomendação configurada para este estado.',
      priority: 'medium',
      action: 'Solicitar avaliação da equipa médica.',
      source: indicator.source || null,
    };
  }

  return {
    indicator: indicator.label,
    value: indicator.value,
    unit: indicator.unit,
    status: indicator.status,
    ...recommendation,
    source: indicator.source || null,
  };
}

export function generateProfileRecommendations(analysis) {
  return analysis.indicators.map(generateRecommendation);
}
