import { UserProfile, WorkoutSessionLog, AppSettings, ProfileId } from '../types';
import { DEFAULT_MOM_PROFILE, DEFAULT_SISTER_PROFILE } from '../data/defaultProfiles';

const STORAGE_KEYS = {
  ACTIVE_PROFILE_ID: 'familyfit_active_profile_id',
  PROFILES: 'familyfit_profiles',
  WORKOUT_LOGS: 'familyfit_workout_logs',
  SETTINGS: 'familyfit_settings'
};

export const DEFAULT_SETTINGS: AppSettings = {
  textSize: 'normal',
  reducedMotion: false,
  darkMode: false,
  animationSpeed: 1,
  soundEnabled: true,
  hasCompletedOnboarding: false
};

// --- PROFILES ---
export function getSavedProfiles(): Record<string, UserProfile> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (!raw) {
      const initial = {
        mom: DEFAULT_MOM_PROFILE,
        sister: DEFAULT_SISTER_PROFILE
      };
      saveProfiles(initial);
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load profiles from localStorage', e);
    return {
      mom: DEFAULT_MOM_PROFILE,
      sister: DEFAULT_SISTER_PROFILE
    };
  }
}

export function saveProfiles(profiles: Record<string, UserProfile>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  } catch (e) {
    console.error('Failed to save profiles', e);
  }
}

export function saveProfile(profile: UserProfile): void {
  const current = getSavedProfiles();
  current[profile.id] = profile;
  saveProfiles(current);
}

export function getActiveProfileId(): ProfileId {
  try {
    const id = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE_ID);
    return id || 'mom';
  } catch {
    return 'mom';
  }
}

export function setActiveProfileId(id: ProfileId): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, id);
  } catch (e) {
    console.error('Failed to set active profile id', e);
  }
}

// --- WORKOUT LOGS ---
export function getWorkoutLogs(profileId?: ProfileId): WorkoutSessionLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS);
    if (!raw) return [];
    const all: WorkoutSessionLog[] = JSON.parse(raw);
    if (profileId) {
      return all.filter(item => item.profileId === profileId);
    }
    return all;
  } catch (e) {
    console.error('Failed to load workout logs', e);
    return [];
  }
}

export function saveWorkoutLog(session: WorkoutSessionLog): void {
  try {
    const current = getWorkoutLogs();
    current.unshift(session); // Add newest first
    localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save workout log', e);
  }
}

export function deleteWorkoutLog(logId: string): void {
  try {
    const current = getWorkoutLogs();
    const updated = current.filter(s => s.id !== logId);
    localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete workout log', e);
  }
}

// --- SETTINGS ---
export function getSavedSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    // Apply text size to root
    const root = document.documentElement;
    root.classList.remove('text-size-large', 'text-size-xlarge');
    if (settings.textSize === 'large') root.classList.add('text-size-large');
    if (settings.textSize === 'xlarge') root.classList.add('text-size-xlarge');

    // Apply reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Apply dark mode
    if (settings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

// --- DATA EXPORT & IMPORT ---
export function exportDataAsJSON(): string {
  const data = {
    profiles: getSavedProfiles(),
    workoutLogs: getWorkoutLogs(),
    settings: getSavedSettings(),
    exportedAt: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
}

export function exportWorkoutLogsAsCSV(profileId?: ProfileId): string {
  const logs = getWorkoutLogs(profileId);
  const headers = [
    'Date',
    'Profile',
    'Workout Title',
    'Duration (Min)',
    'Exercises Completed',
    'Exercises Skipped',
    'Difficulty Rating (1-5)',
    'Symptoms Reported',
    'Notes'
  ];

  const rows = logs.map(l => {
    const completedCount = l.exercisesCompleted.filter(e => !e.skipped).length;
    const skippedCount = l.exercisesCompleted.filter(e => e.skipped).length;
    const symptoms = (l.symptomsReported || []).join('; ');
    const safeTitle = `"${l.dayTitle.replace(/"/g, '""')}"`;
    const safeNotes = `"${(l.notes || '').replace(/"/g, '""')}"`;
    const safeSymptoms = `"${symptoms.replace(/"/g, '""')}"`;

    return [
      new Date(l.date).toLocaleDateString(),
      l.profileId,
      safeTitle,
      Math.round(l.durationSeconds / 60),
      completedCount,
      skippedCount,
      l.difficultyRating,
      safeSymptoms,
      safeNotes
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

export function resetAllData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROFILES);
    localStorage.removeItem(STORAGE_KEYS.WORKOUT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROFILE_ID);
  } catch (e) {
    console.error('Failed to reset data', e);
  }
}

