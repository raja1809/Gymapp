import { UserProfile } from '../types';

export const DEFAULT_MOM_PROFILE: UserProfile = {
  id: 'mom',
  name: 'Mom',
  relationship: 'mom',
  age: 50,
  fitnessExperience: 'beginner',
  equipment: {
    chair: true,
    bands: true,
    dumbbells: true,
    mat: true
  },
  currentPhase: 'phase1_beginner',
  phaseUnlocked: {
    phase1_beginner: true,
    phase2_intermediate: false,
    phase3_advanced: false
  },
  phaseClinicianApprovalNotes: {
    intermediateApproved: false,
    intermediateApprovalDate: '',
    intermediateClinicianNotes: 'Requires formal clearance from physiotherapist regarding bone loading and vestibular stability before advancing.',
    advancedApproved: false,
    advancedApprovalDate: '',
    advancedClinicianNotes: 'Requires formal physician or orthopedic clearance before high load or complex balance exercises.'
  },
  momConfig: {
    exactBackDiagnosis: 'Lower-back bone weakness (physiotherapy recommended, avoid loaded spinal flexion)',
    hasOsteoporosisOrSpinalFracture: false,
    mobilityLimitations: ['Requires chair or wall support for balance', 'Avoid rapid changes in head posture'],
    vertigoActive: true,
    vertigoTriggers: ['Rapid head turning', 'Lying down or standing up too quickly', 'Looking backwards'],
    vertigoRestrictions: [
      'No rapid head rotations',
      'No deep inverted bending',
      'Maintain fixed eye-level focal point during standing exercises'
    ],
    approvedExercises: [
      'supported-chair-sit-to-stand',
      'supported-calf-raises',
      'supported-side-leg-raises',
      'gentle-glute-activation',
      'seated-resistance-band-row',
      'wall-push-up',
      'gentle-abdominal-bracing',
      'light-seated-biceps-curl',
      'supported-standing-hamstring-curls',
      'comfortable-walking',
      'shoulder-circles-gentle',
      'ankle-pumps-circles',
      'box-breathing-relaxation'
    ],
    activityLevel: 'lightly_active',
    sessionDuration: 20, // 20 minutes conservative duration
    preferredWorkoutDays: [1, 2, 4, 6] // Mon, Tue, Thu, Sat
  },
  physiotherapyExercises: [
    {
      id: 'pt-pelvic-tilt',
      name: 'Supine Pelvic Tilt with Neutral Spine Cueing',
      instructions: 'Lie on your back with knees bent and feet flat on the mat. Place hands on hip bones. Gently engage your lower abdominal muscles to roll pelvis backward slightly without flattening lumbar curve forcefully. Hold for 3 seconds and release smoothly.',
      setsAndReps: '2 sets of 8 repetitions',
      frequency: 'Daily or 3-4 days per week',
      restrictions: 'Do not arch back, do not push into pain.',
      notesFromPhysiotherapist: 'Focus on gentle transverse abdominis engagement; do not grip breath. Approved for core stability without spinal flexion.',
      isApproved: true,
      prescribedBy: 'Dr. Anita (Physiotherapist)',
      datePrescribed: '2026-10-15',
      animationType: 'abdominal-bracing'
    },
    {
      id: 'pt-scapular-retraction',
      name: 'Seated Postural Scapular Retraction',
      instructions: 'Sitting tall in a sturdy chair with feet flat, gently squeeze shoulder blades back and down as if holding a pencil between your shoulder blades. Hold for 5 seconds while breathing smoothly.',
      setsAndReps: '3 sets of 8 repetitions',
      frequency: 'Every workout day',
      restrictions: 'Avoid shrugging shoulders up towards ears.',
      notesFromPhysiotherapist: 'Essential for upper back postural support and offsetting spinal rounding.',
      isApproved: true,
      prescribedBy: 'Dr. Anita (Physiotherapist)',
      datePrescribed: '2026-10-15',
      animationType: 'band-row'
    }
  ],
  weeklySchedule: [
    {
      dayOfWeek: 0,
      dayName: 'Sunday',
      title: 'Rest & Guided Box Breathing',
      isRestOrRecovery: true,
      focus: 'Total rest, gentle breathing and nervous system calm.',
      exerciseIds: ['box-breathing-relaxation']
    },
    {
      dayOfWeek: 1,
      dayName: 'Monday',
      title: 'Day 1 — Lower Body & Hip Strength (Supported)',
      isRestOrRecovery: false,
      focus: 'Safe chair transfers, calf strength, and hip abductor stability for balance.',
      exerciseIds: [
        'supported-chair-sit-to-stand',
        'supported-calf-raises',
        'gentle-glute-activation',
        'supported-side-leg-raises'
      ]
    },
    {
      dayOfWeek: 2,
      dayName: 'Tuesday',
      title: 'Day 2 — Upper Body & Posture Strength',
      isRestOrRecovery: false,
      focus: 'Back strengthening to protect spine, wall push-up for chest, and gentle bicep control.',
      exerciseIds: [
        'seated-resistance-band-row',
        'wall-push-up',
        'light-seated-biceps-curl',
        'shoulder-circles-gentle'
      ]
    },
    {
      dayOfWeek: 3,
      dayName: 'Wednesday',
      title: 'Recovery & Gentle Mobility',
      isRestOrRecovery: true,
      focus: 'Rest, circulation enhancement, ankle mobility, and comfortable walking.',
      exerciseIds: [
        'comfortable-walking',
        'ankle-pumps-circles',
        'shoulder-circles-gentle',
        'box-breathing-relaxation'
      ]
    },
    {
      dayOfWeek: 4,
      dayName: 'Thursday',
      title: 'Day 3 — Lower Body & Core Stability',
      isRestOrRecovery: false,
      focus: 'Hamstring support, safe non-flexion core bracing, and calf stability.',
      exerciseIds: [
        'gentle-abdominal-bracing',
        'supported-standing-hamstring-curls',
        'supported-calf-raises',
        'supported-chair-sit-to-stand'
      ]
    },
    {
      dayOfWeek: 5,
      dayName: 'Friday',
      title: 'Rest & Gentle Stroll',
      isRestOrRecovery: true,
      focus: 'Active recovery, light indoor walking, hydration and rest.',
      exerciseIds: ['comfortable-walking', 'ankle-pumps-circles']
    },
    {
      dayOfWeek: 6,
      dayName: 'Saturday',
      title: 'Day 4 — Full Body Stability & Balance',
      isRestOrRecovery: false,
      focus: 'Full body functional movement with chair and wall support.',
      exerciseIds: [
        'supported-chair-sit-to-stand',
        'seated-resistance-band-row',
        'wall-push-up',
        'supported-side-leg-raises'
      ]
    }
  ]
};

export const DEFAULT_SISTER_PROFILE: UserProfile = {
  id: 'sister',
  name: 'Sister',
  relationship: 'sister',
  age: 24,
  fitnessExperience: 'beginner',
  equipment: {
    chair: true,
    bands: true,
    dumbbells: true,
    mat: true
  },
  currentPhase: 'phase1_beginner',
  phaseUnlocked: {
    phase1_beginner: true,
    phase2_intermediate: true, // Sister can progress when ready
    phase3_advanced: false
  },
  sisterConfig: {
    goals: ['general_fitness', 'strength', 'muscle_building'],
    medicalRestrictions: [],
    sessionDuration: 35,
    preferredWorkoutDays: [1, 2, 4, 6],
    targetDumbbellWeightKg: 4
  },
  physiotherapyExercises: [],
  weeklySchedule: [
    {
      dayOfWeek: 0,
      dayName: 'Sunday',
      title: 'Rest & Recovery',
      isRestOrRecovery: true,
      focus: 'Full rest, light stretching, mobility and hydration.',
      exerciseIds: ['box-breathing-relaxation']
    },
    {
      dayOfWeek: 1,
      dayName: 'Monday',
      title: 'Day 1 — Legs and Glutes',
      isRestOrRecovery: false,
      focus: 'Building lower-body strength with squats, glute bridges, and calves.',
      exerciseIds: [
        'bodyweight-squat',
        'glute-bridge',
        'supported-calf-raises',
        'supported-side-leg-raises',
        'dumbbell-goblet-squat'
      ]
    },
    {
      dayOfWeek: 2,
      dayName: 'Tuesday',
      title: 'Day 2 — Chest, Back, Shoulders & Arms',
      isRestOrRecovery: false,
      focus: 'Upper body push & pull balance with resistance bands and convertible dumbbells.',
      exerciseIds: [
        'knee-push-up',
        'standing-band-row',
        'dumbbell-biceps-curl',
        'overhead-triceps-extension',
        'dumbbell-lateral-raise'
      ]
    },
    {
      dayOfWeek: 3,
      dayName: 'Wednesday',
      title: 'Recovery and Gentle Mobility',
      isRestOrRecovery: true,
      focus: 'Active recovery, hip opener mobility, shoulder circles, walking.',
      exerciseIds: [
        'comfortable-walking',
        'shoulder-circles-gentle',
        'ankle-pumps-circles',
        'box-breathing-relaxation'
      ]
    },
    {
      dayOfWeek: 4,
      dayName: 'Thursday',
      title: 'Day 3 — Lower Body and Core Stability',
      isRestOrRecovery: false,
      focus: 'Leg endurance, hamstring strength, supported lunges and dead bugs.',
      exerciseIds: [
        'bodyweight-squat',
        'glute-bridge',
        'supported-standing-hamstring-curls',
        'supported-reverse-lunge',
        'dead-bug',
        'supported-calf-raises'
      ]
    },
    {
      dayOfWeek: 5,
      dayName: 'Friday',
      title: 'Recovery & Mobility Walk',
      isRestOrRecovery: true,
      focus: 'Rest day, 20 minute walk, breathing exercises.',
      exerciseIds: ['comfortable-walking', 'box-breathing-relaxation']
    },
    {
      dayOfWeek: 6,
      dayName: 'Saturday',
      title: 'Day 4 — Full Body Strength & Power',
      isRestOrRecovery: false,
      focus: 'Total body compound routine reinforcing major muscle groups.',
      exerciseIds: [
        'dumbbell-goblet-squat',
        'standing-band-row',
        'knee-push-up',
        'dumbbell-biceps-curl',
        'glute-bridge',
        'dead-bug'
      ]
    }
  ]
};

