const SESSION_KEY = 'astro_health_session';

// Iniciar sessão de demonstração
export function startDemoSession(email) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      email,
      authenticated: true,
      startedAt: new Date().toISOString(),
    })
  );
}

// Verificar se existe uma sessão ativa
export function hasDemoSession() {
  try {
    const session = JSON.parse(
      localStorage.getItem(SESSION_KEY)
    );

    return session?.authenticated === true;
  } catch {
    return false;
  }
}

// Terminar sessão
export function endDemoSession() {
  localStorage.removeItem(SESSION_KEY);
}
