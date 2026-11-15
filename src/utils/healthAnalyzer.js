
/**
 * ASTRO-HEALTH
 * Motor de análise de indicadores fisiológicos.
 *
 * IMPORTANTE:
 * Os intervalos são fornecidos pela configuração de cada indicador.
 * Este módulo não inventa nem define limites clínicos.
 */

const STATUS = {
  NORMAL: 'normal',
  ATTENTION: 'attention',
  CRITICAL: 'critical',
  INSUFFICIENT: 'insufficient',
};

function isOutsideRange(value, range) {
  if (!range) return false;

  return (
    (Number.isFinite(range.min) && value < range.min) ||
    (Number.isFinite(range.max) && value > range.max)
  );
}

function isValidRange(range) {
  if (!range) return false;

  const hasMin = Number.isFinite(range.min);
  const hasMax = Number.isFinite(range.max);

  if (!hasMin && !hasMax) return false;

  if (hasMin && hasMax && range.min > range.max) {
    return false;
  }

  return true;
}

export function evaluateIndicator(indicator) {
  const {
    key,
    label,
    value,
    unit,
    reference,
    critical,
    source,
  } = indicator;

  // Verificar se existe uma medição válida.
  if (!Number.isFinite(value)) {
    return {
      key,
      label,
      value: null,
      unit,
      status: STATUS.INSUFFICIENT,
      message: 'Medição ausente ou inválida.',
      source: source || null,
    };
  }

  // Sem referência individual, não podemos avaliar o indicador.
  if (!isValidRange(reference)) {
    return {
      key,
      label,
      value,
      unit,
      status: STATUS.INSUFFICIENT,
      message: 'Referência individual não configurada.',
      source: source || null,
    };
  }

  // Verificar primeiro os critérios críticos configurados.
  if (critical && !isValidRange(critical)) {
    return {
      key,
      label,
      value,
      unit,
      status: STATUS.INSUFFICIENT,
      message: 'Configuração dos critérios críticos inválida.',
      source: source || null,
    };
  }

  if (isOutsideRange(value, critical)) {
    return {
      key,
      label,
      value,
      unit,
      status: STATUS.CRITICAL,
      message: 'Valor fora dos critérios críticos configurados.',
      source: source || null,
    };
  }

  if (isOutsideRange(value, reference)) {
    return {
      key,
      label,
      value,
      unit,
      status: STATUS.ATTENTION,
      message: 'Valor fora da referência individual.',
      source: source || null,
    };
  }

  return {
    key,
    label,
    value,
    unit,
    status: STATUS.NORMAL,
    message: 'Valor dentro da referência individual.',
    source: source || null,
  };
}

export function analyzeHealthProfile(profile) {
  const indicators = (profile.indicators || []).map(
    evaluateIndicator
  );

  const hasCritical = indicators.some(
    (item) => item.status === STATUS.CRITICAL
  );

  const hasAttention = indicators.some(
    (item) => item.status === STATUS.ATTENTION
  );

  const hasInsufficient = indicators.some(
    (item) => item.status === STATUS.INSUFFICIENT
  );

  let overallStatus = STATUS.NORMAL;

  if (hasCritical) {
    overallStatus = STATUS.CRITICAL;
  } else if (hasAttention) {
    overallStatus = STATUS.ATTENTION;
  } else if (hasInsufficient) {
    overallStatus = STATUS.INSUFFICIENT;
  }

  return {
    astronautId: profile.astronautId,
    astronautName: profile.astronautName,
    overallStatus,
    indicators,
    summary: {
      total: indicators.length,
      normal: indicators.filter(
        (item) => item.status === STATUS.NORMAL
      ).length,
      attention: indicators.filter(
        (item) => item.status === STATUS.ATTENTION
      ).length,
      critical: indicators.filter(
        (item) => item.status === STATUS.CRITICAL
      ).length,
      insufficient: indicators.filter(
        (item) => item.status === STATUS.INSUFFICIENT
      ).length,
    },
    evaluatedAt: new Date().toISOString(),
  };
}

export { STATUS };
