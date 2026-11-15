const PROFILE_KEY = 'astro_health_profile';

export function saveAstronautProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getAstronautProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
  } catch {
    return null;
  }
}

export function hasAstronautProfile() {
  return getAstronautProfile() !== null;
}
