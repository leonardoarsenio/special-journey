/**
 * ASTRO-HEALTH
 * Dados fictícios para demonstração do MVP.
 *
 * Os intervalos abaixo são exclusivamente ilustrativos.
 * Não representam limites clínicos validados.
 */

export const demoHealthProfiles = [
  {
    astronautId: 'CREW-001',
    astronautName: 'Alex Johnson',
    mission: 'ASTRO-01',
    location: 'Órbita terrestre (LEO)',

    indicators: [
      {
        key: 'heartRate',
        label: 'Frequência cardíaca',
        value: 72,
        unit: 'bpm',
        reference: { min: 60, max: 100 },
        critical: { min: 40, max: 120 },
        description: 'Batimentos por minuto',
      },
      {
        key: 'oxygen',
        label: 'Saturação de oxigénio',
        value: 98,
        unit: '%',
        reference: { min: 95, max: 100 },
        critical: { min: 90, max: 100 },
        description: 'Oxigénio no sangue',
      },
      {
        key: 'bloodPressure',
        label: 'Pressão arterial',
        value: null,
        unit: 'mmHg',
        reference: null,
        critical: null,
        displayValue: '120/80',
        description: 'Aguardando avaliação sistólica e diastólica',
      },
      {
        key: 'temperature',
        label: 'Temperatura corporal',
        value: 37.5,
        unit: '°C',
        reference: { min: 36, max: 37.4 },
        critical: { min: 35, max: 39 },
        description: 'Temperatura corporal',
      },
    ],
  },
];
