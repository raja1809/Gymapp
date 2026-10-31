import React, { useState } from 'react';
import { HumanAnimatedExercise } from './exercise/HumanAnimatedExercise';
import { 
  Dumbbell, 
  ShieldCheck, 
  Sparkles, 
  Moon, 
  Phone, 
  ChevronRight,
  ChevronLeft,
  Check,
  Calendar
} from 'lucide-react';

interface WorkoutExerciseItem {
  id: string;
  name: string;
  category: 'warmup' | 'workout' | 'cooldown' | 'stretch';
  animationType: string;
  setsAndReps: string;
  equipment: string;
  plateSuggestion?: string;
  howTo: string[];
  safetyTip: string;
}

interface DayPlan {
  dayId: string;
  dayName: string;
  dayShort: string;
  typeBadge: string;
  title: string;
  subtitle: string;
  exercises: WorkoutExerciseItem[];
  isStretchOnly?: boolean;
}

export const CleanWorkoutApp: React.FC = () => {
  // Helper to determine today's day of week
  const getTodayDayId = (): string => {
    const day = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
    switch (day) {
      case 1: return 'monday';
      case 2: return 'tuesday';
      case 3: return 'wednesday';
      case 4: return 'thursday';
      case 5: return 'friday';
      case 6: return 'saturday';
      case 0:
      default:
        return 'sunday';
    }
  };

  const todayId = getTodayDayId();

  // Day selector (defaults to today!)
  const [selectedDayId, setSelectedDayId] = useState<string>(todayId);
  // Active exercise index within current day
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  // Large text toggle for Mom's eyesight
  const [isLargeText, setIsLargeText] = useState<boolean>(true);
  // Phone install modal
  const [showInstallTip, setShowInstallTip] = useState<boolean>(false);
  // Filter within day: 'all' | 'warmup' | 'workout' | 'cooldown'
  const [sectionFilter, setSectionFilter] = useState<'all' | 'warmup' | 'workout' | 'cooldown'>('all');

  // --- REUSABLE DAILY WARM-UP STRETCHES FOR MOM ---
  const momDailyWarmupStretches: WorkoutExerciseItem[] = [
    {
      id: 'mom-warm-1',
      name: '☀️ 1. Band Overhead Shoulder & Chest Opener',
      category: 'warmup',
      animationType: 'band-shoulder-stretch',
      setsAndReps: '10 gentle overhead passes',
      equipment: 'Light Resistance Band',
      howTo: [
        'Sit tall in your chair holding the resistance band in front with hands wide.',
        'Smoothly lift arms overhead to gently open chest and shoulders.',
        'Lower back to chest level with relaxed, slow breathing.'
      ],
      safetyTip: 'Move slowly and smoothly. Never force your range of motion; keeps shoulders mobile.'
    },
    {
      id: 'mom-warm-2',
      name: '☀️ 2. Gentle Seated Torso Side Reach',
      category: 'warmup',
      animationType: 'seated-side-reach',
      setsAndReps: '8 gentle reaches each side',
      equipment: 'Chair Support',
      howTo: [
        'Sit tall with both hip bones firmly planted on the chair seat.',
        'Raise one arm overhead and gently curve toward the opposite side to lengthen ribs.',
        'Return to center and switch to the other side.'
      ],
      safetyTip: 'Zero spinal twisting or bending forward! Elongates ribcage and relieves back pressure.'
    },
    {
      id: 'mom-warm-3',
      name: '☀️ 3. Seated Ankle Circulation Pumps & Circles',
      category: 'warmup',
      animationType: 'calf-raises',
      setsAndReps: '10 pumps & 10 circles each foot',
      equipment: 'Chair',
      howTo: [
        'Sit comfortably and point toes forward, then flex toes back toward shin.',
        'Draw slow circles with big toe to lubricate ankle joints.'
      ],
      safetyTip: 'Warms up calf and ankle stability before stepping on stool; enhances blood flow.'
    },
    {
      id: 'mom-warm-4',
      name: '☀️ 4. Seated Wrist, Finger & Forearm Circles',
      category: 'warmup',
      animationType: 'biceps-curl',
      setsAndReps: '10 gentle wrist circles',
      equipment: 'Chair',
      howTo: [
        'Sit comfortably and extend arms forward.',
        'Roll wrists smoothly in slow circles clockwise, then counter-clockwise.',
        'Open fingers wide, then make a soft fist.'
      ],
      safetyTip: 'Warms up grip and forearms before holding dumbbells, barbell, or resistance bands.'
    }
  ];

  // --- REUSABLE DAILY COOL-DOWN STRETCHES FOR MOM ---
  const momDailyCooldownStretches: WorkoutExerciseItem[] = [
    {
      id: 'mom-cool-1',
      name: '🧘 1. Seated Resistance Band Hamstring Stretch',
      category: 'cooldown',
      animationType: 'band-hamstring-stretch',
      setsAndReps: '3 holds of 20 seconds each leg',
      equipment: 'Chair + Resistance Band',
      howTo: [
        'Sit tall, extend right leg straight with heel on floor.',
        'Loop band under foot and hold gently with straight spine.',
        'Keep back flat (no rounding) until feeling a gentle stretch in back of thigh.'
      ],
      safetyTip: 'Zero back rounding! Keep spine tall like a tree to protect lower vertebrae.'
    },
    {
      id: 'mom-cool-2',
      name: '🧘 2. Seated Figure-4 Hip & Glute Gentle Stretch',
      category: 'cooldown',
      animationType: 'figure4-stretch',
      setsAndReps: '3 holds of 20 seconds each leg',
      equipment: 'Chair',
      howTo: [
        'Sit tall in chair, rest right ankle gently across left knee in a figure-4.',
        'Keep spine upright and tall. Gently lean chest forward 1 inch from hips only.',
        'Feel the pleasant release in your hip and outer glute.'
      ],
      safetyTip: 'Spine stays completely flat; never slouch or hunch down.'
    },
    {
      id: 'mom-cool-3',
      name: '🧘 3. Seated Gentle Pelvic Rocking & Spine Lengthening',
      category: 'cooldown',
      animationType: 'pelvic-tilt',
      setsAndReps: '8 slow pelvic rocking breaths',
      equipment: 'Chair',
      howTo: [
        'Sit comfortably with hands on thighs.',
        'Gently rock your pelvis forward to create a slight natural lumbar curve.',
        'Then rock back softly into neutral without slumping.'
      ],
      safetyTip: 'Very subtle, smooth mobilization that releases lower back muscular tension.'
    },
    {
      id: 'mom-cool-4',
      name: '🧘 4. Gentle Side Neck & Upper Trapezius Release',
      category: 'cooldown',
      animationType: 'neck-release',
      setsAndReps: '3 holds of 15 seconds each side',
      equipment: 'Chair',
      howTo: [
        'Sit tall with shoulders relaxed away from ears.',
        'Gently tilt right ear toward right shoulder until you feel a soft stretch on left neck.',
        'Hold smoothly, then switch sides.'
      ],
      safetyTip: 'Never yank or push neck. Smooth, gentle motion relieves tension that can trigger vertigo.'
    },
    {
      id: 'mom-cool-5',
      name: '🧘 5. Calming 4-4-4-4 Box Breathing',
      category: 'cooldown',
      animationType: 'box-breathing',
      setsAndReps: '5 cycles of calming breath',
      equipment: 'Chair',
      howTo: [
        'Inhale 4s through nose, Hold 4s with soft throat, Exhale 4s through mouth, Hold empty 4s.',
        'Soothes the vestibular balance center and relaxes nervous system.'
      ],
      safetyTip: 'Relax face, jaw, and shoulders completely.'
    }
  ];

  // --- REUSABLE 9-PART REST & RECOVERY STRETCHES FOR MOM ---
  const momRestDayStretches: WorkoutExerciseItem[] = [
    {
      id: 'box-breathing-rest',
      name: '1. Guided Calming Box Breathing (4-4-4-4)',
      category: 'stretch',
      animationType: 'box-breathing',
      setsAndReps: '5 to 8 relaxing breath cycles',
      equipment: 'Comfortable Chair',
      howTo: [
        'Sit comfortably in your chair with hands resting softly in your lap.',
        'Breathe in slowly through your nose for 4 seconds.',
        'Hold your breath gently for 4 seconds with relaxed throat.',
        'Breathe out smoothly through your mouth for 4 seconds.',
        'Rest empty for 4 seconds, then repeat.'
      ],
      safetyTip: 'Soothes the vestibular balance center and lowers spinal muscular tension.'
    },
    {
      id: 'seated-stretch-shoulder',
      name: '2. Band Overhead Shoulder & Chest Opener',
      category: 'stretch',
      animationType: 'band-shoulder-stretch',
      setsAndReps: '10 gentle overhead passes',
      equipment: 'Resistance Band',
      howTo: [
        'Hold band wide in front, raise overhead smoothly and slightly backward.',
        'Feel a pleasant, gentle chest opening stretch. Return slowly.'
      ],
      safetyTip: 'Never strain shoulders. Keep grip wide.'
    },
    {
      id: 'seated-stretch-hamstring',
      name: '3. Seated Resistance Band Hamstring Stretch',
      category: 'stretch',
      animationType: 'band-hamstring-stretch',
      setsAndReps: '3 holds of 20 seconds each leg',
      equipment: 'Chair + Resistance Band',
      howTo: [
        'Sit on edge of chair with one leg extended straight, heel on floor.',
        'Loop band around foot and hold handles with tall, straight spine.',
        'Gently lean forward from hips (flat back) until feeling hamstring stretch.'
      ],
      safetyTip: 'Zero rounding of lower back: completely safe for bone weakness.'
    },
    {
      id: 'seated-stretch-side',
      name: '4. Gentle Seated Torso Side Reach',
      category: 'stretch',
      animationType: 'seated-side-reach',
      setsAndReps: '8 gentle reaches each side',
      equipment: 'Chair',
      howTo: [
        'Sit tall, ground both hips, reach one arm high and gently curve to the side.',
        'Feel ribs and side back open without any twisting.'
      ],
      safetyTip: 'Keeps spine elongated and decompresses lumbar discs.'
    },
    {
      id: 'seated-stretch-figure4',
      name: '5. Seated Figure-4 Hip & Glute Gentle Stretch',
      category: 'stretch',
      animationType: 'figure4-stretch',
      setsAndReps: '3 holds of 20 seconds each leg',
      equipment: 'Chair',
      howTo: [
        'Rest right ankle across left knee in figure-4.',
        'Sit tall, hinge forward slightly from hips only.',
        'Feel pleasant outer hip relief.'
      ],
      safetyTip: 'No spinal slouching; keeps pelvic alignment true.'
    },
    {
      id: 'seated-stretch-pelvic',
      name: '6. Seated Gentle Pelvic Rocking & Spine Lengthening',
      category: 'stretch',
      animationType: 'pelvic-tilt',
      setsAndReps: '8 slow cycles',
      equipment: 'Chair',
      howTo: [
        'Gently rock pelvis between subtle anterior and neutral tilt.',
        'Smoothly coordinate with slow breathing.'
      ],
      safetyTip: 'Relieves lower back stiffness without forward bending.'
    },
    {
      id: 'seated-stretch-neck',
      name: '7. Gentle Side Neck & Upper Trapezius Release',
      category: 'stretch',
      animationType: 'neck-release',
      setsAndReps: '3 holds of 15 seconds each side',
      equipment: 'Chair',
      howTo: [
        'Tilt right ear softly toward right shoulder, keep left shoulder down.',
        'Release tension in neck and base of skull.'
      ],
      safetyTip: 'Soothes tension that triggers dizziness or vertigo.'
    },
    {
      id: 'stool-calf-stretch',
      name: '8. Low Stool Supported Calf Stretch',
      category: 'stretch',
      animationType: 'stool-step-up',
      setsAndReps: '3 holds of 15 seconds per foot',
      equipment: 'Small Stool + Chair Support',
      howTo: [
        'Place small stool in front of chair.',
        'Place ball of right foot on edge of stool with heel resting on floor.',
        'Hold chair back and gently lean forward until you feel a comfortable stretch in your calf.',
        'Switch to left foot.'
      ],
      safetyTip: 'Never bounce. Just hold a gentle, pleasant stretch.'
    },
    {
      id: 'seated-ankle-stretches',
      name: '9. Seated Ankle Circulation Pumps & Circles',
      category: 'stretch',
      animationType: 'calf-raises',
      setsAndReps: '10 pumps & 10 circles each foot',
      equipment: 'Chair',
      howTo: [
        'Sit in your chair with one foot slightly lifted.',
        'Point toes forward away from you, then flex toes back up towards your shin.',
        'Draw slow circles in the air with your big toe.',
        'Switch to the other foot.'
      ],
      safetyTip: 'Improves blood circulation and keeps ankle joints limber without fall risk.'
    }
  ];

  // --- FULL 7-DAY WEEKLY SCHEDULE FOR MOM ---
  const weeklyPlans: DayPlan[] = [
    {
      dayId: 'monday',
      dayName: 'Monday',
      dayShort: 'Mon',
      typeBadge: 'Day 1 Workout',
      title: 'Monday (Day 1) — Legs, Hips & Stool Step-Ups',
      subtitle: 'Chair & stool-supported routine for bone density & hip balance',
      exercises: [
        ...momDailyWarmupStretches,
        // Main Workouts (6 Exercises)
        {
          id: 'mom-stool-step',
          name: '1. Low Stool Step-Ups (or Foot Taps)',
          category: 'workout',
          animationType: 'stool-step-up',
          setsAndReps: '3 sets of 8–10 reps per leg',
          equipment: 'Small Stool + Chair Support',
          plateSuggestion: 'Bodyweight (holding chair for balance)',
          howTo: [
            'Place the small stool on non-slip floor with chair next to it.',
            'Hold chair back with one hand for steady balance.',
            'Step your right foot firmly onto the center of the stool.',
            'Press through your right heel to stand tall on stool, then step back down.',
            'Complete all reps, then switch to left leg.'
          ],
          safetyTip: 'Press through the heel, not the toes. Always keep one hand on chair for balance.'
        },
        {
          id: 'mom-sit-to-stand',
          name: '2. Supported Chair Sit-to-Stand',
          category: 'workout',
          animationType: 'chair-sit-to-stand',
          setsAndReps: '3 sets of 8–10 reps',
          equipment: 'Sturdy Armless Chair',
          plateSuggestion: 'Hold one 2kg plate at chest if strong, or bodyweight',
          howTo: [
            'Sit tall on chair with feet flat, hip-width apart.',
            'Keep your spine straight (do not round your back) and press through heels to stand upright.',
            'Gently squeeze your bottom at top, then slowly lower yourself back onto chair with control.'
          ],
          safetyTip: 'Maintain a straight, proud spine. Never drop or flop down onto the chair.'
        },
        {
          id: 'mom-calf-raises',
          name: '3. Supported Standing Calf Raises',
          category: 'workout',
          animationType: 'calf-raises',
          setsAndReps: '3 sets of 12 reps',
          equipment: 'Chair Support',
          plateSuggestion: 'Bodyweight (high heel elevation)',
          howTo: [
            'Stand tall with two hands firmly holding back of sturdy chair.',
            'Slowly push through balls of feet to lift heels as high as comfortable.',
            'Hold for 1 second at peak, feeling calf muscles contract, then lower slowly.'
          ],
          safetyTip: 'Keep your gaze focused straight ahead at eye level to prevent vertigo.'
        },
        {
          id: 'mom-glute-bridge',
          name: '4. Gentle Glute Bridges (Neutral Spine)',
          category: 'workout',
          animationType: 'glute-bridge',
          setsAndReps: '3 sets of 10 reps',
          equipment: 'Exercise Mat or Firm Bed',
          plateSuggestion: 'Optional: Rest one 2kg plate gently on pelvis',
          howTo: [
            'Lie comfortably on back with knees bent and feet flat on mat.',
            'Keep head flat on small pillow without turning your neck.',
            'Press through heels and squeeze bottom to lift hips into straight diagonal line.',
            'Lower back down smoothly vertebra by vertebra.'
          ],
          safetyTip: 'Do not arch lower back high. Stop when hips align with knees.'
        },
        {
          id: 'mom-wall-pushup',
          name: '5. Gentle Wall Push-Ups',
          category: 'workout',
          animationType: 'wall-push-up',
          setsAndReps: '3 sets of 8–10 reps',
          equipment: 'Solid Wall',
          plateSuggestion: 'Bodyweight pressing against wall',
          howTo: [
            'Stand facing wall at arm length with hands flat at shoulder height.',
            'Keep body straight like a gentle plank.',
            'Bend elbows smoothly to bring chest towards wall, then push back.'
          ],
          safetyTip: 'Stand closer to wall for an easier movement. Smooth and pain-free.'
        },
        {
          id: 'mom-bicep-curl-d1',
          name: '6. Seated Dumbbell Biceps Curls',
          category: 'workout',
          animationType: 'biceps-curl',
          setsAndReps: '3 sets of 10 reps',
          equipment: 'Symactive Dumbbells (2×2kg plates)',
          plateSuggestion: '2×2kg plates',
          howTo: [
            'Sit tall in chair, elbows tucked into ribs, curl dumbbells up to shoulders.',
            'Lower slowly over 3 seconds.'
          ],
          safetyTip: 'Keep elbows still; only forearms move.'
        },
        ...momDailyCooldownStretches
      ]
    },
    {
      dayId: 'tuesday',
      dayName: 'Tuesday',
      dayShort: 'Tue',
      typeBadge: 'Day 2 Workout',
      title: 'Tuesday (Day 2) — Upper Body, Barbell & Dumbbells',
      subtitle: 'Barbell overhead press, seated band rows, curls & band pull-aparts',
      exercises: [
        ...momDailyWarmupStretches,
        // Main Workouts (6 Exercises)
        {
          id: 'mom-barbell-press',
          name: '1. Seated Barbell Overhead Shoulder Press',
          category: 'workout',
          animationType: 'barbell-press',
          setsAndReps: '3 sets of 8–10 reps',
          equipment: 'Symactive Barbell (two 2kg plates, 4kg total)',
          plateSuggestion: 'Barbell + two 2kg plates (one on each end)',
          howTo: [
            'Sit tall with your back supported by chair backrest.',
            'Hold barbell with hands at shoulder-width, resting at collarbone level.',
            'Smoothly press barbell straight overhead until arms extend upwards.',
            'Slowly lower barbell back to collarbone level with control over 2 seconds.'
          ],
          safetyTip: 'Tighten spinlock collars firmly before lifting. Keep back fully supported.'
        },
        {
          id: 'mom-band-row-d2',
          name: '2. Seated Resistance Band Rows',
          category: 'workout',
          animationType: 'band-row',
          setsAndReps: '3 sets of 12 reps',
          equipment: 'Chair + Resistance Band',
          plateSuggestion: 'Medium band tension',
          howTo: [
            'Sit tall with band looped securely under shoe arches.',
            'Pull handles back towards ribs, driving elbows past waist.',
            'Squeeze shoulder blades firmly together for 1 second, then slowly return.'
          ],
          safetyTip: 'Essential for upper back postural support to counteract bone rounding.'
        },
        {
          id: 'mom-bicep-curls-d2',
          name: '3. Seated Dumbbell Biceps Curls',
          category: 'workout',
          animationType: 'biceps-curl',
          setsAndReps: '3 sets of 10–12 reps',
          equipment: 'Pair of Symactive Dumbbells (2×2kg plates)',
          plateSuggestion: '2×2kg plates (4kg total)',
          howTo: [
            'Sit upright holding a 2kg dumbbell in each hand by sides.',
            'Keep elbows tucked close to ribs.',
            'Curl dumbbells smoothly up towards shoulders, lower over 3 seconds.'
          ],
          safetyTip: 'Never swing body. Strict arm control.'
        },
        {
          id: 'mom-band-pullapart',
          name: '4. Resistance Band Posture Pull-Aparts',
          category: 'workout',
          animationType: 'band-pull-apart',
          setsAndReps: '3 sets of 12 reps',
          equipment: 'Resistance Band',
          plateSuggestion: 'Light/Medium band',
          howTo: [
            'Hold band at chest height with arms straight.',
            'Pull hands apart horizontally until band touches chest.',
            'Squeeze rear shoulder blades together, return slowly.'
          ],
          safetyTip: 'Keeps shoulders down; do not shrug.'
        },
        {
          id: 'mom-wall-pushup-d2',
          name: '5. Gentle Wall Push-Ups',
          category: 'workout',
          animationType: 'wall-push-up',
          setsAndReps: '3 sets of 8–10 reps',
          equipment: 'Solid Wall',
          plateSuggestion: 'Bodyweight',
          howTo: [
            'Hands flat on wall at shoulder height, lower chest, press away smoothly.'
          ],
          safetyTip: 'Keep neck relaxed and chin level.'
        },
        {
          id: 'mom-stool-tap-d2',
          name: '6. Low Stool Toe Taps (Coordination & Balance)',
          category: 'workout',
          animationType: 'stool-step-up',
          setsAndReps: '3 sets of 10 taps each foot',
          equipment: 'Small Stool + Chair Support',
          plateSuggestion: 'Bodyweight',
          howTo: [
            'Stand holding chair back, place small stool in front.',
            'Lightly tap right toes onto stool and return to floor.',
            'Lightly tap left toes onto stool and return.'
          ],
          safetyTip: 'Keep eyes focused straight ahead at eye level.'
        },
        ...momDailyCooldownStretches
      ]
    },
    {
      dayId: 'wednesday',
      dayName: 'Wednesday',
      dayShort: 'Wed',
      typeBadge: 'Recovery & Stretches',
      title: 'Wednesday — Mid-Week Recovery & Gentle Stretches',
      subtitle: 'Gentle band stretching, spinal decompression, hip openers & box breathing',
      isStretchOnly: true,
      exercises: momRestDayStretches
    },
    {
      dayId: 'thursday',
      dayName: 'Thursday',
      dayShort: 'Thu',
      typeBadge: 'Day 3 Workout',
      title: 'Thursday (Day 3) — Lower Body, Stool & Hip Hinge',
      subtitle: 'Light barbell hip hinge, stool step-ups, glute bridges & calf stability',
      exercises: [
        ...momDailyWarmupStretches,
        // Main Workouts (6 Exercises — NO SEATED ROWS HERE!)
        {
          id: 'mom-barbell-deadlift',
          name: '1. Light Barbell Romanian Hinge (Flat Spine)',
          category: 'workout',
          animationType: 'barbell-deadlift',
          setsAndReps: '3 sets of 8–10 reps',
          equipment: 'Symactive Barbell (two 2kg plates, 4kg total)',
          plateSuggestion: 'Barbell + two 2kg plates',
          howTo: [
            'Stand with feet hip-width apart, holding barbell in front of thighs.',
            'Keep knees soft with a slight bend.',
            'Push your hips backward like you are touching a wall behind you with bottom.',
            'Keep spine completely flat (zero rounding). Lower bar to knee height.',
            'Squeeze glutes to return tall.'
          ],
          safetyTip: 'Move strictly from hips with perfectly flat back! Strengthens back chain.'
        },
        {
          id: 'mom-stool-step-3',
          name: '2. Low Stool Step-Ups (Supported)',
          category: 'workout',
          animationType: 'stool-step-up',
          setsAndReps: '3 sets of 8 reps per leg',
          equipment: 'Small Stool + Chair Support',
          plateSuggestion: 'Bodyweight',
          howTo: [
            'Hold chair back, step onto small stool, drive through heel to stand tall, step down smoothly.'
          ],
          safetyTip: '2 seconds up, 2 seconds down. Controlled power.'
        },
        {
          id: 'mom-glute-bridge-3',
          name: '3. Gentle Glute Bridges with 2-Sec Hold',
          category: 'workout',
          animationType: 'glute-bridge',
          setsAndReps: '3 sets of 10 reps',
          equipment: 'Exercise Mat or Firm Bed',
          plateSuggestion: 'Optional: Rest one 2.5kg plate gently across pelvis',
          howTo: [
            'Lie on back, lift hips into straight diagonal line.',
            'Hold and squeeze bottom firmly for 2 full seconds.',
            'Lower down smoothly.'
          ],
          safetyTip: 'Spine stays neutral; core is gently braced.'
        },
        {
          id: 'mom-calf-3',
          name: '4. Supported Calf Raises (2-Second Peak Hold)',
          category: 'workout',
          animationType: 'calf-raises',
          setsAndReps: '3 sets of 12 reps',
          equipment: 'Chair Support',
          plateSuggestion: 'Bodyweight',
          howTo: [
            'Hold chair back, rise onto tiptoes, hold for 2 seconds at peak, lower slowly.'
          ],
          safetyTip: 'Builds ankle and calf stability to protect against trips.'
        },
        {
          id: 'mom-band-pullapart-d3',
          name: '5. Resistance Band Posture Pull-Aparts',
          category: 'workout',
          animationType: 'band-pull-apart',
          setsAndReps: '3 sets of 12 reps',
          equipment: 'Resistance Band',
          plateSuggestion: 'Light band',
          howTo: [
            'Hold band at chest height, pull hands wide apart, squeeze upper back blades.'
          ],
          safetyTip: 'Keeps shoulders back and neck relaxed.'
        },
        {
          id: 'mom-sit-to-stand-3',
          name: '6. Supported Chair Sit-to-Stand',
          category: 'workout',
          animationType: 'chair-sit-to-stand',
          setsAndReps: '3 sets of 8 reps',
          equipment: 'Chair',
          plateSuggestion: 'Bodyweight',
          howTo: [
            'Stand upright from chair, squeeze bottom, return with full control.'
          ],
          safetyTip: 'Keep knees pointing in same direction as toes.'
        },
        ...momDailyCooldownStretches
      ]
    },
    {
      dayId: 'friday',
      dayName: 'Friday',
      dayShort: 'Fri',
      typeBadge: 'Recovery & Stretches',
      title: 'Friday — Rest & Gentle Stretches',
      subtitle: 'Hamstring stretch, pelvic mobility, neck tension release & calm breathing',
      isStretchOnly: true,
      exercises: momRestDayStretches
    },
    {
      dayId: 'saturday',
      dayName: 'Saturday',
      dayShort: 'Sat',
      typeBadge: 'Day 4 Workout',
      title: 'Saturday (Day 4) — Full Body Balance & Functional Movement',
      subtitle: 'Complete compound routine combining stool, dumbbells, barbell & wall',
      exercises: [
        ...momDailyWarmupStretches,
        // Main Workouts (6 Exercises)
        {
          id: 'mom-stool-step-4',
          name: '1. Low Stool Step-Ups with Hand Support',
          category: 'workout',
          animationType: 'stool-step-up',
          setsAndReps: '3 sets of 8–10 reps each leg',
          equipment: 'Small Stool + Chair Support',
          plateSuggestion: 'Bodyweight',
          howTo: [
            'Hold chair, step onto small stool, stand tall, step down slowly.'
          ],
          safetyTip: 'Stay tall; eyes looking forward.'
        },
        {
          id: 'mom-sit-to-stand-4',
          name: '2. Supported Chair Sit-to-Stand (Weighted)',
          category: 'workout',
          animationType: 'chair-sit-to-stand',
          setsAndReps: '3 sets of 8–10 reps',
          equipment: 'Sturdy Chair + 2kg Plate',
          plateSuggestion: 'Hold one 2kg plate at chest or bodyweight',
          howTo: [
            'Hold 2kg plate at chest with elbows tucked.',
            'Rise from chair with straight spine, pause at top, lower controlled.'
          ],
          safetyTip: 'Keep movements smooth and steady.'
        },
        {
          id: 'mom-curls-4',
          name: '3. Dumbbell Biceps Curls (2×2kg or 2×2.5kg)',
          category: 'workout',
          animationType: 'biceps-curl',
          setsAndReps: '3 sets of 10–12 reps',
          equipment: 'Symactive Dumbbells',
          plateSuggestion: '2×2kg or 2×2.5kg plates',
          howTo: [
            'Sit tall, curl dumbbells up towards shoulders, lower over 3 seconds.'
          ],
          safetyTip: 'Elbows pinned to sides; no body swinging.'
        },
        {
          id: 'mom-band-pullapart-4',
          name: '4. Resistance Band Posture Pull-Aparts',
          category: 'workout',
          animationType: 'band-pull-apart',
          setsAndReps: '3 sets of 12 reps',
          equipment: 'Resistance Band',
          plateSuggestion: 'Medium band tension',
          howTo: [
            'Hold band at chest height, pull hands apart horizontally, squeeze upper back.'
          ],
          safetyTip: 'Keep shoulders relaxed away from ears.'
        },
        {
          id: 'mom-wall-pushup-4',
          name: '5. Gentle Wall Push-Ups',
          category: 'workout',
          animationType: 'wall-push-up',
          setsAndReps: '3 sets of 8–10 reps',
          equipment: 'Solid Wall',
          plateSuggestion: 'Bodyweight',
          howTo: [
            'Hands on wall, bend elbows to bring chest forward, press away.'
          ],
          safetyTip: 'Body stays in a solid gentle line.'
        },
        {
          id: 'mom-calf-4',
          name: '6. Supported Calf Raises on Flat Floor',
          category: 'workout',
          animationType: 'calf-raises',
          setsAndReps: '3 sets of 12 reps',
          equipment: 'Chair Support',
          plateSuggestion: 'Bodyweight',
          howTo: [
            'Hold chair with two hands, lift heels high, hold 1 sec, lower down.'
          ],
          safetyTip: 'Finish strong with good posture!'
        },
        ...momDailyCooldownStretches
      ]
    },
    {
      dayId: 'sunday',
      dayName: 'Sunday',
      dayShort: 'Sun',
      typeBadge: 'Sunday Rest',
      title: 'Sunday — Full Body Rest & Gentle Guided Stretches',
      subtitle: 'Complete 9-part restorative stretch routine for spine, hips, neck and balance',
      isStretchOnly: true,
      exercises: momRestDayStretches
    }
  ];

  const currentPlan = weeklyPlans.find((p) => p.dayId === selectedDayId) || weeklyPlans[0];

  // Filter exercises if section filter is chosen
  const filteredExercises = currentPlan.exercises.filter((ex) => {
    if (sectionFilter === 'all') return true;
    if (sectionFilter === 'warmup') return ex.category === 'warmup';
    if (sectionFilter === 'workout') return ex.category === 'workout';
    if (sectionFilter === 'cooldown') return ex.category === 'cooldown' || ex.category === 'stretch';
    return true;
  });

  const currentExercise = filteredExercises[activeExerciseIndex] || filteredExercises[0] || currentPlan.exercises[0];

  const warmupCount = currentPlan.exercises.filter(e => e.category === 'warmup').length;
  const workoutCount = currentPlan.exercises.filter(e => e.category === 'workout').length;
  const cooldownCount = currentPlan.exercises.filter(e => e.category === 'cooldown' || e.category === 'stretch').length;

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-28 sm:pb-16 transition-all ${isLargeText ? 'text-lg' : 'text-base'}`}>
      
      {/* TOP HEADER: Clean & Accessible */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3.5 sm:px-6 py-3 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white font-black text-base flex items-center justify-center shadow-xs flex-shrink-0">
              👵
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                Mom's Daily Fitness & Stretches
              </h1>
              <span className="text-[11px] sm:text-xs text-teal-700 dark:text-teal-400 font-semibold block mt-0.5">
                Back-Safe • Chair & Stool • Animated Workouts
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setShowInstallTip(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
              title="Install app on phone"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden xs:inline">Install</span>
              <span className="hidden sm:inline">on Phone</span>
            </button>

            <button
              onClick={() => setIsLargeText(!isLargeText)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-black transition active:scale-95 ${
                isLargeText
                  ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isLargeText ? 'Text: A+' : 'Text: A'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">

        {/* 1. MONDAY TO SUNDAY DAY SELECTOR (Horizontally Scrollable on Mobile) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Choose Day of the Week:</span>
            </label>
            <span className="text-[11px] text-slate-400 sm:hidden">Swipe days →</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none -mx-1 px-1">
            {weeklyPlans.map((plan) => {
              const isSelected = plan.dayId === selectedDayId;
              const isToday = plan.dayId === todayId;

              return (
                <button
                  key={plan.dayId}
                  onClick={() => {
                    setSelectedDayId(plan.dayId);
                    setActiveExerciseIndex(0);
                    setSectionFilter('all');
                  }}
                  className={`py-3 px-3.5 sm:px-4 rounded-2xl font-black text-xs sm:text-sm transition flex flex-col items-center justify-center border flex-shrink-0 shadow-xs active:scale-95 min-w-[76px] sm:min-w-[105px] relative ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/25 ring-2 ring-teal-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {/* Today Badge */}
                  {isToday && (
                    <span className={`text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded-full mb-0.5 ${
                      isSelected 
                        ? 'bg-white text-teal-700' 
                        : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
                    }`}>
                      Today
                    </span>
                  )}

                  <span className="text-sm sm:text-base font-black">
                    {plan.dayName}
                  </span>

                  <span className={`text-[10px] font-semibold mt-0.5 ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                    {plan.typeBadge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DAY TITLE CARD */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {currentPlan.typeBadge}
            </span>
            <span className="text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/50">
              {currentPlan.exercises.length} Total Movements
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">
            {currentPlan.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {currentPlan.subtitle}
          </p>
        </div>

        {/* SECTION FILTER PILLS (Warm-up, Workout, Cooldown) */}
        {!currentPlan.isStretchOnly ? (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            <button
              onClick={() => { setSectionFilter('all'); setActiveExerciseIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 active:scale-95 ${
                sectionFilter === 'all'
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              All ({currentPlan.exercises.length})
            </button>
            <button
              onClick={() => { setSectionFilter('warmup'); setActiveExerciseIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 flex-shrink-0 active:scale-95 ${
                sectionFilter === 'warmup'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40'
              }`}
            >
              <span>☀️ Warm-Up Stretches ({warmupCount})</span>
            </button>
            <button
              onClick={() => { setSectionFilter('workout'); setActiveExerciseIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 flex-shrink-0 active:scale-95 ${
                sectionFilter === 'workout'
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-900/40'
              }`}
            >
              <span>🏋️ Main Workouts ({workoutCount})</span>
            </button>
            <button
              onClick={() => { setSectionFilter('cooldown'); setActiveExerciseIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 flex-shrink-0 active:scale-95 ${
                sectionFilter === 'cooldown'
                  ? 'bg-sky-600 text-white'
                  : 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-200/60 dark:border-sky-900/40'
              }`}
            >
              <span>🧘 Cool-Down Stretches ({cooldownCount})</span>
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-900/40 flex items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-300">
            <Moon className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Gentle recovery day: Tap any of the 9 restorative stretches below to watch the animation.</span>
          </div>
        )}

        {/* 2. THE REALISTIC HUMAN ANIMATION DEMONSTRATION CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-3.5 sm:space-y-4">
          
          {/* Card Header: Exercise Name & Badges */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 leading-snug">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0" />
                <span>{currentExercise.name}</span>
              </h3>
              
              <span className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex-shrink-0">
                {activeExerciseIndex + 1}/{filteredExercises.length}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-teal-700 dark:text-teal-300 px-2.5 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60">
                {currentExercise.equipment}
              </span>
              {currentExercise.plateSuggestion && (
                <span className="text-[11px] sm:text-xs font-bold text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60">
                  {currentExercise.plateSuggestion}
                </span>
              )}
            </div>
          </div>

          {/* THE HUMAN VECTOR ANIMATION */}
          <HumanAnimatedExercise
            animationType={currentExercise.animationType}
            isMom={true}
            height={260}
          />

          {/* Target Repetitions & Dosage Banner */}
          <div className="p-3 sm:p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-900/60 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black flex-shrink-0">
                <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 block">
                  Target Repetitions & Dosage
                </span>
                <span className="text-sm sm:text-lg font-black text-teal-950 dark:text-teal-100 leading-tight">
                  {currentExercise.setsAndReps}
                </span>
              </div>
            </div>

            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 text-right">
              Rest 45–60s
            </span>
          </div>

          {/* STEP BY STEP DIRECTIONS */}
          <div className="space-y-1.5 pt-1">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              How to perform this movement:
            </h4>
            <ol className="space-y-2">
              {currentExercise.howTo.map((step, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-base text-slate-800 dark:text-slate-200">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-400 font-bold text-[11px] sm:text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* SAFETY / DOCTOR NOTE FOR MOM */}
          <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <strong>Form & Safety Cue:</strong> {currentExercise.safetyTip}
            </div>
          </div>

          {/* DESKTOP NEXT / PREV BUTTONS */}
          <div className="pt-2 hidden sm:flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveExerciseIndex(Math.max(0, activeExerciseIndex - 1))}
              disabled={activeExerciseIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Item</span>
            </button>

            <span className="text-xs font-bold text-slate-400">
              Item {activeExerciseIndex + 1} of {filteredExercises.length}
            </span>

            <button
              onClick={() => setActiveExerciseIndex(Math.min(filteredExercises.length - 1, activeExerciseIndex + 1))}
              disabled={activeExerciseIndex === filteredExercises.length - 1}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              <span>Next Item</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. EXERCISE LIST PICKER (Tappable on mobile & desktop) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Tap any movement below to watch animation:
            </label>
            <span className="text-[11px] text-teal-600 font-bold">
              {filteredExercises.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {filteredExercises.map((ex, idx) => {
              const isSelected = idx === activeExerciseIndex;
              const isWarm = ex.category === 'warmup';
              const isCool = ex.category === 'cooldown' || ex.category === 'stretch';

              return (
                <button
                  key={ex.id}
                  onClick={() => {
                    setActiveExerciseIndex(idx);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                  className={`p-3 rounded-2xl border text-left transition flex items-center justify-between active:scale-98 ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-500 ring-2 ring-teal-400/20'
                      : isWarm
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/60'
                      : isCool
                      ? 'bg-sky-50/50 dark:bg-sky-950/20 border-sky-200/60'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="leading-tight overflow-hidden pr-2">
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 block truncate">
                      {ex.name}
                    </span>
                    <span className="text-[11px] text-teal-600 dark:text-teal-400 font-bold block mt-0.5 truncate">
                      {ex.setsAndReps} • {ex.equipment}
                    </span>
                  </div>
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">
                      #{idx + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* MOBILE STICKY BOTTOM THUMB BAR: Lifesaver for phone workout view */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 shadow-xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setActiveExerciseIndex(Math.max(0, activeExerciseIndex - 1));
              window.scrollTo({ top: 180, behavior: 'smooth' });
            }}
            disabled={activeExerciseIndex === 0}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1 active:scale-95 shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <div className="text-center px-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Item</span>
            <span className="text-xs font-black text-teal-600 dark:text-teal-400">
              {activeExerciseIndex + 1} of {filteredExercises.length}
            </span>
          </div>

          <button
            onClick={() => {
              setActiveExerciseIndex(Math.min(filteredExercises.length - 1, activeExerciseIndex + 1));
              window.scrollTo({ top: 180, behavior: 'smooth' });
            }}
            disabled={activeExerciseIndex === filteredExercises.length - 1}
            className="flex-1 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1 active:scale-95"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PHONE INSTALL MODAL */}
      {showInstallTip && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Phone className="w-5 h-5 text-teal-600" />
                <span>Install App on Mom's Phone</span>
              </h3>
              <button 
                onClick={() => setShowInstallTip(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To install this as a standalone home app on her Android phone with zero ads and an icon on her home screen:
            </p>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="font-bold text-teal-600">1.</span>
                <span>Open this link in <strong>Chrome</strong> on her Android phone.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="font-bold text-teal-600">2.</span>
                <span>Tap the <strong>three dots (⋮)</strong> in Chrome's top right corner.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="font-bold text-teal-600">3.</span>
                <div>
                  <span>Select <strong>'Add to Home screen'</strong>.</span>
                  <p className="text-[11px] text-teal-700 dark:text-teal-400 mt-1 font-semibold">
                    💡 If 'Install App' fails due to local Wi-Fi HTTP, tap <strong>'Add to Home screen'</strong>. It creates the app icon on her screen and opens full-screen like a native app!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInstallTip(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md shadow-teal-600/20 active:scale-95"
              >
                Got It, Thank You!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
