import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, WorkoutSessionLog, AppSettings, ProfileId, Exercise } from '../types';
import { getSavedProfiles, saveProfiles, getActiveProfileId, setActiveProfileId, getWorkoutLogs, saveWorkoutLog, getSavedSettings, saveSettings } from '../utils/storage';
import { EXERCISES } from '../data/exercises';

export type ActiveTab = 
  | 'dashboard'
  | 'library'
  | 'physiotherapy'
  | 'phases'
  | 'recovery'
  | 'progress'
  | 'equipment'
  | 'settings';

interface AppContextType {
  activeProfile: UserProfile;
  profiles: Record<string, UserProfile>;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  switchProfile: (id: ProfileId) => void;
  updateProfile: (profile: UserProfile) => void;
  workoutLogs: WorkoutSessionLog[];
  logWorkoutSession: (session: WorkoutSessionLog) => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  // Modal / Player states
  selectedExercise: Exercise | null;
  setSelectedExercise: (exercise: Exercise | null) => void;
  activeWorkoutDayIndex: number | null;
  startWorkout: (dayIndex: number) => void;
  exitWorkout: () => void;
  isSafetyCheckOpen: boolean;
  setIsSafetyCheckOpen: (open: boolean) => void;
  pendingWorkoutDayIndex: number | null;
  confirmStartWorkoutAfterSafetyCheck: () => void;
  showApkModal: boolean;
  setShowApkModal: (show: boolean) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>(getSavedProfiles());
  const [activeProfileId, setActiveId] = useState<ProfileId>(getActiveProfileId());
  const [settings, setSettingsState] = useState<AppSettings>(getSavedSettings());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutSessionLog[]>(getWorkoutLogs());

  // Modal / Action states
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeWorkoutDayIndex, setActiveWorkoutDayIndex] = useState<number | null>(null);
  const [isSafetyCheckOpen, setIsSafetyCheckOpen] = useState<boolean>(false);
  const [pendingWorkoutDayIndex, setPendingWorkoutDayIndex] = useState<number | null>(null);
  const [showApkModal, setShowApkModal] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!settings.hasCompletedOnboarding);

  // Apply settings to document on load
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const activeProfile = profiles[activeProfileId] || profiles['mom'];

  const switchProfile = (id: ProfileId) => {
    setActiveId(id);
    setActiveProfileId(id);
    // If active in a workout, close it
    setActiveWorkoutDayIndex(null);
  };

  const updateProfile = (updated: UserProfile) => {
    const next = { ...profiles, [updated.id]: updated };
    setProfiles(next);
    saveProfiles(next);
  };

  const logWorkoutSession = (session: WorkoutSessionLog) => {
    saveWorkoutLog(session);
    setWorkoutLogs(getWorkoutLogs());
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettingsState(updated);
    saveSettings(updated);
  };

  const startWorkout = (dayIndex: number) => {
    // If it's Mom's profile, always run the Pre-workout Safety Check first!
    if (activeProfile.relationship === 'mom') {
      setPendingWorkoutDayIndex(dayIndex);
      setIsSafetyCheckOpen(true);
    } else {
      setActiveWorkoutDayIndex(dayIndex);
    }
  };

  const confirmStartWorkoutAfterSafetyCheck = () => {
    if (pendingWorkoutDayIndex !== null) {
      setActiveWorkoutDayIndex(pendingWorkoutDayIndex);
      setPendingWorkoutDayIndex(null);
      setIsSafetyCheckOpen(false);
    }
  };

  const exitWorkout = () => {
    setActiveWorkoutDayIndex(null);
    setPendingWorkoutDayIndex(null);
  };

  return (
    <AppContext.Provider
      value={{
        activeProfile,
        profiles,
        activeTab,
        setActiveTab,
        switchProfile,
        updateProfile,
        workoutLogs,
        logWorkoutSession,
        settings,
        updateSettings,
        selectedExercise,
        setSelectedExercise,
        activeWorkoutDayIndex,
        startWorkout,
        exitWorkout,
        isSafetyCheckOpen,
        setIsSafetyCheckOpen,
        pendingWorkoutDayIndex,
        confirmStartWorkoutAfterSafetyCheck,
        showApkModal,
        setShowApkModal,
        showOnboarding,
        setShowOnboarding
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

