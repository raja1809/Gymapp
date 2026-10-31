export type ProfileId = 'mom' | 'sister' | string;

export type TrainingPhase = 'phase1_beginner' | 'phase2_intermediate' | 'phase3_advanced';

export type ExerciseSafetyStatus = 
  | 1 // General low-intensity activity
  | 2 // Requires confirmation that it is appropriate for back/bone condition
  | 3; // Only perform when specifically prescribed or approved by physiotherapist

export interface Exercise {
  id: string;
  name: string;
  category: 'legs' | 'upper' | 'core' | 'full_body' | 'mobility' | 'physiotherapy';
  targetMuscles: string[];
  equipment: ('chair' | 'resistance_bands' | 'convertible_dumbbells' | 'bodyweight' | 'mat' | 'wall')[];
  startingPosition: string;
  stepByStep: string[];
  breathingInstructions: string;
  defaultSets: number;
  defaultReps: string;
  defaultRestSeconds: number;
  commonMistakes: string[];
  safetyWarnings: string[];
  easierVariation: string;
  harderVariation?: string;
  safetyStatus: ExerciseSafetyStatus;
  flags: {
    loadedSpinalFlexion?: boolean; // sit-ups, loaded forward bending (contraindicated for osteoporosis)
    forcefulTwisting?: boolean;
    rapidHeadMovement?: boolean; // vertigo trigger
    highImpact?: boolean;
    fallRisk?: boolean; // requires chair or wall support
    requiresChairSupport?: boolean;
    requiresWallSupport?: boolean;
    requiresClinicianSupervision?: boolean;
  };
  animationType: string;
}

export interface PhysiotherapyExercise {
  id: string;
  name: string;
  instructions: string;
  setsAndReps: string;
  frequency: string;
  restrictions: string;
  notesFromPhysiotherapist: string;
  animationType?: string;
  datePrescribed?: string;
  prescribedBy?: string;
  isApproved: boolean;
}

export interface DaySchedule {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayName: string;
  title: string;
  isRestOrRecovery: boolean;
  focus: string;
  exerciseIds: string[];
}

export interface MomMedicalConfig {
  exactBackDiagnosis: string;
  hasOsteoporosisOrSpinalFracture: boolean;
  mobilityLimitations: string[];
  vertigoActive: boolean;
  vertigoTriggers: string[];
  vertigoRestrictions: string[];
  approvedExercises: string[];
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active';
  sessionDuration: number; // in minutes
  preferredWorkoutDays: number[];
}

export interface SisterFitnessConfig {
  goals: ('general_fitness' | 'strength' | 'muscle_building' | 'mobility' | 'weight_management')[];
  medicalRestrictions: string[];
  sessionDuration: number;
  preferredWorkoutDays: number[];
  targetDumbbellWeightKg: number;
}

export interface UserProfile {
  id: ProfileId;
  name: string;
  relationship: 'mom' | 'sister' | 'custom';
  age: number;
  fitnessExperience: 'beginner' | 'intermediate' | 'advanced';
  equipment: {
    chair: boolean;
    bands: boolean;
    dumbbells: boolean;
    mat: boolean;
  };
  currentPhase: TrainingPhase;
  phaseUnlocked: {
    phase1_beginner: boolean;
    phase2_intermediate: boolean;
    phase3_advanced: boolean;
  };
  phaseClinicianApprovalNotes?: {
    intermediateApproved?: boolean;
    intermediateApprovalDate?: string;
    intermediateClinicianNotes?: string;
    advancedApproved?: boolean;
    advancedApprovalDate?: string;
    advancedClinicianNotes?: string;
  };
  weeklySchedule: DaySchedule[];
  momConfig?: MomMedicalConfig;
  sisterConfig?: SisterFitnessConfig;
  physiotherapyExercises: PhysiotherapyExercise[];
}

export interface CompletedSetLog {
  setNumber: number;
  reps: number | string;
  weightKg?: number;
  completed: boolean;
}

export interface CompletedExerciseLog {
  exerciseId: string;
  name: string;
  setsCompleted: number;
  targetSets: number;
  reps: string;
  weightUsedKg?: number;
  skipped: boolean;
  skipReason?: string;
  sets: CompletedSetLog[];
}

export interface WorkoutSessionLog {
  id: string;
  profileId: ProfileId;
  date: string; // ISO string
  dayNumber: number;
  dayTitle: string;
  durationSeconds: number;
  exercisesCompleted: CompletedExerciseLog[];
  difficultyRating: 1 | 2 | 3 | 4 | 5; // 1: Very Easy, 5: Very Tough
  symptomsReported: string[];
  symptomNotes?: string;
  notes?: string;
}

export interface PreWorkoutSafetyCheck {
  feelsDizzyOrUnsteady: boolean;
  newOrWorseningBackPain: boolean;
  newNeurologicalSymptoms: boolean;
  followsCurrentRestrictions: boolean;
  checkedAt: string;
  passed: boolean;
}

export interface AppSettings {
  textSize: 'normal' | 'large' | 'xlarge';
  reducedMotion: boolean;
  darkMode: boolean;
  animationSpeed: number; // 0.5, 1, 1.5, 2
  soundEnabled: boolean;
  hasCompletedOnboarding: boolean;
}

