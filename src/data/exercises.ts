import { Exercise } from '../types';

export const EXERCISES: Record<string, Exercise> = {
  // --- MOM & SISTER COMMON/ADAPTED EXERCISES ---
  'supported-chair-sit-to-stand': {
    id: 'supported-chair-sit-to-stand',
    name: 'Supported Chair Sit-to-Stand',
    category: 'legs',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core Stabilizers'],
    equipment: ['chair'],
    startingPosition: 'Sit tall on a sturdy, non-slip armless chair with feet flat on the floor, hip-width apart. Keep your spine in a neutral upright alignment. Have hands lightly resting on thighs or a nearby counter for balance.',
    stepByStep: [
      'Inhale and gently engage your core muscles without holding your breath.',
      'Hinge forward slightly at your hips while maintaining a straight, neutral spine (avoid rounding your back).',
      'Push evenly through your heels and midfoot to smoothly rise to a tall standing posture.',
      'Squeeze your glutes gently at the top without hyperextending your lower back.',
      'Controlled descent: slowly bend your hips and knees to return to the seated position with full control.'
    ],
    breathingInstructions: 'Exhale as you push up into a standing position; inhale as you slowly lower yourself back onto the chair.',
    defaultSets: 3,
    defaultReps: '8–10 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Rounding the lower back when standing up.',
      'Letting the knees collapse inwards.',
      'Flopping down onto the chair instead of lowering with muscular control.',
      'Holding your breath during the ascent.'
    ],
    safetyWarnings: [
      'Crucial for bone weakness: maintain a tall, neutral spine throughout; do not slump forward.',
      'If you experience dizziness when standing upright, pause, keep your gaze fixed on an eye-level focal point, and hold onto a sturdy surface.',
      'Never bounce or jerk.'
    ],
    easierVariation: 'Use chair arms to push off with your hands, or place a cushion on the chair seat to reduce the descent depth.',
    harderVariation: 'Cross arms across chest, pause for 2 seconds just above the chair seat before sitting.',
    safetyStatus: 1, // General low-intensity activity
    flags: {
      fallRisk: true,
      requiresChairSupport: true,
      rapidHeadMovement: false,
      loadedSpinalFlexion: false
    },
    animationType: 'chair-sit-to-stand'
  },

  'supported-calf-raises': {
    id: 'supported-calf-raises',
    name: 'Supported Standing Calf Raises',
    category: 'legs',
    targetMuscles: ['Gastrocnemius', 'Soleus (Calf muscles)', 'Ankle Stabilizers'],
    equipment: ['chair', 'wall'],
    startingPosition: 'Stand tall with feet hip-width apart, holding firmly onto the back of a sturdy chair or resting both hands flat against a solid wall at shoulder height.',
    stepByStep: [
      'Stand tall with your shoulders relaxed and spine neutral.',
      'Keep your eyes focused straight ahead on an unmoving object at eye level.',
      'Slowly press through the balls of both feet to elevate your heels off the floor as high as comfortable.',
      'Pause at the peak for 1 second, feeling the calves contract.',
      'Lower your heels back to the floor in a slow, controlled 2-second motion.'
    ],
    breathingInstructions: 'Exhale as you rise up onto your toes; inhale as you slowly lower your heels back down.',
    defaultSets: 3,
    defaultReps: '10–12 reps',
    defaultRestSeconds: 45,
    commonMistakes: [
      'Rolling weight onto the outer edges of the feet.',
      'Bouncing rapidly at the bottom without controlling the movement.',
      'Looking down at feet, which can trigger vertigo or imbalance.'
    ],
    safetyWarnings: [
      'Always maintain light two-handed contact with the chair back or wall for vestibular stability.',
      'Keep your gaze fixed straight ahead; avoid tilting your head backwards or sideways.'
    ],
    easierVariation: 'Perform seated calf raises while sitting tall on a chair with feet flat.',
    harderVariation: 'Hold the top elevated position for 3 seconds before lowering, or perform with one hand lightly touching support.',
    safetyStatus: 1,
    flags: {
      fallRisk: true,
      requiresChairSupport: true
    },
    animationType: 'calf-raises'
  },

  'supported-side-leg-raises': {
    id: 'supported-side-leg-raises',
    name: 'Supported Standing Side Leg Raises',
    category: 'legs',
    targetMuscles: ['Gluteus Medius', 'Hip Abductors', 'Core Stabilizers'],
    equipment: ['chair', 'wall'],
    startingPosition: 'Stand upright holding onto the back of a sturdy chair with both hands or one hand. Feet together, chest open, spine neutral.',
    stepByStep: [
      'Shift your weight gently onto your supporting leg (keep a soft, micro-bend in that knee).',
      'Keeping your moving leg straight and toes pointing straight forward (not turned outward), lift the leg out to the side 20 to 30 degrees.',
      'Keep your torso completely upright—do not lean to the opposite side to lift the leg higher.',
      'Hold for a brief 1-second pause at the comfortable top range.',
      'Lower the leg slowly back to the starting position.'
    ],
    breathingInstructions: 'Exhale as you lift the leg sideways; inhale as you bring it back to center.',
    defaultSets: 3,
    defaultReps: '8–10 reps per side',
    defaultRestSeconds: 45,
    commonMistakes: [
      'Leaning the torso sideways to cheat range of motion.',
      'Rotating the toes upwards (recruits hip flexor instead of glute medius).',
      'Swinging the leg with momentum.'
    ],
    safetyWarnings: [
      'Crucial for hip stability and osteoporosis: focus on controlled glute contraction, not high range of motion.',
      'Always hold chair back firmly to eliminate any balance challenge.'
    ],
    easierVariation: 'Perform side leg slides while seated upright in a chair with smooth socks on tile/wood floor.',
    harderVariation: 'Loop a light resistance band around the ankles or lower calves.',
    safetyStatus: 1,
    flags: {
      fallRisk: true,
      requiresChairSupport: true
    },
    animationType: 'side-leg-raises'
  },

  'gentle-glute-activation': {
    id: 'gentle-glute-activation',
    name: 'Gentle Glute Activation (Neutral Bridge)',
    category: 'core',
    targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Deep Core'],
    equipment: ['mat'],
    startingPosition: 'Lie comfortably on your back on an exercise mat or firm bed. Knees bent at roughly 90 degrees with feet flat on the floor, hip-width apart. Arms resting at your sides, palms flat.',
    stepByStep: [
      'Gently brace your abdominal muscles as if preparing for a gentle tap to the tummy.',
      'Keep your head resting comfortably flat (do not lift head; keep chin neutral).',
      'Press firmly through your heels and squeeze your glutes to raise your pelvis until your thighs and torso form a straight line.',
      'Do not arch your lower back or push your belly upwards past a straight line.',
      'Pause for 1–2 seconds squeezing glutes, then gently lower down vertebra by vertebra.'
    ],
    breathingInstructions: 'Exhale as you lift your hips; inhale as you slowly lower your hips to the mat.',
    defaultSets: 3,
    defaultReps: '8–10 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Hyperextending the lumbar spine (arching lower back too high).',
      'Pushing from the toes rather than the heels.',
      'Lifting or turning the head rapidly while hips are elevated (can trigger vertigo).'
    ],
    safetyWarnings: [
      'Spine safety: Stop the lift when hips align with knees and shoulders. Never over-arch your lower back.',
      'For vertigo: keep your head stationary and flat on the pillow/mat throughout.'
    ],
    easierVariation: 'Standing glute squeeze: stand tall holding a chair and squeeze glutes for 5 seconds without bridging.',
    harderVariation: 'Glute bridge with 3-second isometric hold at the top.',
    safetyStatus: 2, // Requires confirmation for back/bone condition
    flags: {
      loadedSpinalFlexion: false,
      rapidHeadMovement: false
    },
    animationType: 'glute-bridge'
  },

  'seated-resistance-band-row': {
    id: 'seated-resistance-band-row',
    name: 'Seated Resistance Band Row',
    category: 'upper',
    targetMuscles: ['Rhomboids', 'Latissimus Dorsi', 'Rear Deltoids', 'Biceps'],
    equipment: ['resistance_bands', 'chair'],
    startingPosition: 'Sit tall on a sturdy chair with feet flat and legs extended slightly forward with knees soft. Secure the middle of the resistance band around the arches of your feet, or anchor to a secure post in front. Hold both handles with arms straight.',
    stepByStep: [
      'Sit tall with your chest upright and shoulders relaxed away from your ears.',
      'Inhale to prepare, engaging your abdominal muscles gently.',
      'Exhale and smoothly pull the band handles towards your lower ribs by driving your elbows backwards.',
      'Squeeze your shoulder blades together gently at the end of the pull for 1 second.',
      'Inhale as you slowly extend your arms back to the starting position against the band resistance.'
    ],
    breathingInstructions: 'Exhale as you pull the band towards your torso; inhale as you slowly allow your arms to return.',
    defaultSets: 3,
    defaultReps: '10–12 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Shrugging the shoulders up toward ears.',
      'Leaning backward with the spine during the pull (keep torso upright and stationary).',
      'Letting the band snap your hands back abruptly.'
    ],
    safetyWarnings: [
      'Verify the band is firmly seated under the arches of your shoes so it cannot slip off.',
      'Do not rock your torso backward or round forward—keep your back tall and supported.'
    ],
    easierVariation: 'Use a lighter tension band or reduce distance of stretch.',
    harderVariation: 'Pause for 2 full seconds in the contracted position with shoulder blades squeezed.',
    safetyStatus: 1,
    flags: {
      requiresChairSupport: true
    },
    animationType: 'band-row'
  },

  'wall-push-up': {
    id: 'wall-push-up',
    name: 'Wall Push-Up',
    category: 'upper',
    targetMuscles: ['Pectorals (Chest)', 'Anterior Deltoids', 'Triceps', 'Core'],
    equipment: ['wall'],
    startingPosition: 'Stand facing a clear, solid wall roughly arm-length away. Place palms flat on the wall at shoulder height and shoulder-width apart. Feet hip-width apart on a non-slip floor.',
    stepByStep: [
      'Align your body in a straight, neutral line from your heels to the crown of your head.',
      'Keep your core lightly braced so your hips do not sag or poke backward.',
      'Inhale and slowly bend your elbows to bring your chest towards the wall in a smooth 2-second motion.',
      'Keep elbows tracking back at approximately a 45-degree angle (not flaring wide out to the sides).',
      'Pause briefly when your nose is a few inches from the wall, then exhale and push through your palms to return.'
    ],
    breathingInstructions: 'Inhale as you lower your chest towards the wall; exhale as you push away to return to the starting position.',
    defaultSets: 3,
    defaultReps: '8–12 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Flaring elbows straight out sideways at 90 degrees (strains shoulders).',
      'Sagging at the hips or arching the lower back.',
      'Craning the neck forward to reach the wall.'
    ],
    safetyWarnings: [
      'Ensure floor has good traction to prevent feet slipping.',
      'Keep movement gentle and controlled; avoid rapid head jerks.'
    ],
    easierVariation: 'Stand closer to the wall to decrease the angle and bodyweight load.',
    harderVariation: 'Step feet further back, or transition to an elevated sturdy counter or knee push-up.',
    safetyStatus: 1,
    flags: {
      requiresWallSupport: true
    },
    animationType: 'wall-push-up'
  },

  'gentle-abdominal-bracing': {
    id: 'gentle-abdominal-bracing',
    name: 'Gentle Abdominal Bracing (Neutral Spine)',
    category: 'core',
    targetMuscles: ['Transverse Abdominis', 'Internal Obliques', 'Pelvic Floor'],
    equipment: ['mat', 'chair'],
    startingPosition: 'Lie on your back on a mat with knees bent and feet flat (or sit upright in a firm chair). Place your fingertips gently on your lower abdomen, just inside your hip bones.',
    stepByStep: [
      'Relax your shoulders and jaw completely.',
      'Take a comfortable breath in through your nose, letting your belly expand naturally.',
      'As you exhale gently, imagine pulling your belly button slightly inward towards your spine, tightening the corset of muscles around your waist by about 20-30%.',
      'Do NOT flatten your lower back forcefully against the floor, and do NOT tilt your pelvis.',
      'Hold this gentle contraction for 5 seconds while continuing to breathe normally (never hold breath).',
      'Slowly release the tension and rest for 3 seconds.'
    ],
    breathingInstructions: 'Never hold your breath. Inhale naturally, and engage the core gently as you breathe out or count aloud: "1, 2, 3, 4, 5".',
    defaultSets: 3,
    defaultReps: '6–8 holds (5 sec each)',
    defaultRestSeconds: 45,
    commonMistakes: [
      'Holding breath while contracting (causes intra-abdominal spike).',
      'Sucking in the chest rather than bracing the deep abdominal wall.',
      'Flexing the spine or curling the pelvis.'
    ],
    safetyWarnings: [
      'Safe for bone weakness: zero spinal flexion occurs. The spine remains completely still and neutral.',
      'If you feel pressure in your head or dizziness, you are bearing down; relax and focus on gentle, shallow engagement.'
    ],
    easierVariation: 'Perform seated upright with back supported by a chair.',
    harderVariation: 'Hold the gentle brace for 8-10 seconds while gently tapping one heel forward.',
    safetyStatus: 2, // Requires confirmation for back condition
    flags: {
      loadedSpinalFlexion: false
    },
    animationType: 'abdominal-bracing'
  },

  'light-seated-biceps-curl': {
    id: 'light-seated-biceps-curl',
    name: 'Light Seated Biceps Curl',
    category: 'upper',
    targetMuscles: ['Biceps Brachii', 'Brachialis', 'Forearm Flexors'],
    equipment: ['convertible_dumbbells', 'resistance_bands', 'chair'],
    startingPosition: 'Sit tall in a sturdy chair with feet flat on the floor. Hold light convertible dumbbells (1-2 kg) or resistance band handles at your sides, arms extended downwards with palms facing forward.',
    stepByStep: [
      'Keep your elbows comfortably pinned close to your ribcage.',
      'Shoulders should remain relaxed and down, chest open.',
      'Exhale and slowly bend your elbows, curling the weights upward towards your shoulders.',
      'Pause for a moment at the top of the curl, feeling the front of your arms work.',
      'Inhale as you slowly lower the weights down over 2-3 seconds with full control.'
    ],
    breathingInstructions: 'Exhale on the curl upward; inhale on the slow controlled lowering.',
    defaultSets: 3,
    defaultReps: '10–12 reps',
    defaultRestSeconds: 45,
    commonMistakes: [
      'Swinging the elbows forward or backward.',
      'Using body momentum or leaning back to lift the weight.',
      'Gripping the dumbbells with excessive, tense force.'
    ],
    safetyWarnings: [
      'Always start with lightest dumbbell load or lightest band.',
      'Keep wrists straight and neutral (do not bend wrists backward).'
    ],
    easierVariation: 'Perform with light resistance band or unweighted arm movement.',
    harderVariation: '3-second negative (lowering) tempo on each repetition.',
    safetyStatus: 1,
    flags: {
      requiresChairSupport: true
    },
    animationType: 'biceps-curl'
  },

  'supported-standing-hamstring-curls': {
    id: 'supported-standing-hamstring-curls',
    name: 'Supported Standing Hamstring Curls',
    category: 'legs',
    targetMuscles: ['Hamstrings (Biceps Femoris, Semitendinosus)', 'Calves'],
    equipment: ['chair', 'wall'],
    startingPosition: 'Stand tall facing the back of a sturdy chair or wall, holding on with both hands for balance. Feet hip-width apart, knees soft.',
    stepByStep: [
      'Keep your thighs parallel to each other throughout the movement.',
      'Shift weight onto your left foot with slight knee bend.',
      'Slowly bend your right knee, bringing your right heel up towards your glute.',
      'Keep your right thigh pointing straight down—do not let the knee drift forward.',
      'Hold at the top for 1 second, then lower your foot slowly back to the floor.',
      'Complete all repetitions, then switch legs.'
    ],
    breathingInstructions: 'Exhale as you curl the heel up; inhale as you slowly lower the foot back to the ground.',
    defaultSets: 3,
    defaultReps: '8–10 reps per leg',
    defaultRestSeconds: 45,
    commonMistakes: [
      'Arching the lower back when curling the leg.',
      'Letting the moving thigh swing forward in front of the standing leg.',
      'Jerking the heel up quickly instead of using controlled hamstring contraction.'
    ],
    safetyWarnings: [
      'Keep spine tall and still; avoid any backward arching of the lower back.',
      'Keep two hands on the chair back for secure balance.'
    ],
    easierVariation: 'Perform while lying prone or decrease range of motion.',
    harderVariation: 'Loop a light ankle band around ankles for resistance.',
    safetyStatus: 1,
    flags: {
      fallRisk: true,
      requiresChairSupport: true
    },
    animationType: 'hamstring-curl'
  },

  'comfortable-walking': {
    id: 'comfortable-walking',
    name: 'Comfortable Continuous Walking',
    category: 'mobility',
    targetMuscles: ['Cardiovascular System', 'Legs', 'Postural Stabilizers'],
    equipment: ['bodyweight'],
    startingPosition: 'Stand tall with comfortable, supportive walking shoes on a flat, non-slip indoor surface, hallway, or treadmill with safety bar.',
    stepByStep: [
      'Begin walking at an easy, conversational pace.',
      'Keep head upright, gaze forward, shoulders relaxed and swinging gently.',
      'Roll naturally from heel to toe with each step.',
      'Breathe rhythmically and comfortably.',
      'Walk for 10 to 20 minutes as tolerated, taking breaks whenever needed.'
    ],
    breathingInstructions: 'Breathe smoothly and naturally through nose and mouth. You should be able to speak a full sentence without gasping.',
    defaultSets: 1,
    defaultReps: '10–20 min',
    defaultRestSeconds: 0,
    commonMistakes: [
      'Looking down at feet continuously.',
      'Walking too fast or shuffling feet.',
      'Walking on uneven rugs or tripping hazards.'
    ],
    safetyWarnings: [
      'Clear all throw rugs, wires, or clutter from the walking path.',
      'If active vertigo or dizziness occurs, stop immediately and sit on the nearest chair.'
    ],
    easierVariation: 'Gentle marching in place while holding onto a sturdy counter or high chair back.',
    harderVariation: 'Increase duration to 25-30 minutes at a brisk conversational pace.',
    safetyStatus: 1,
    flags: {
      fallRisk: true
    },
    animationType: 'walking'
  },

  // --- SISTER STRENGTH & FITNESS SPECIFIC EXERCISES ---
  'bodyweight-squat': {
    id: 'bodyweight-squat',
    name: 'Bodyweight Squat',
    category: 'legs',
    targetMuscles: ['Quadriceps', 'Gluteus Maximus', 'Hamstrings', 'Core'],
    equipment: ['bodyweight'],
    startingPosition: 'Stand tall with feet slightly wider than shoulder-width apart, toes turned outward 10-15 degrees. Arms extended forward at shoulder height for counter-balance.',
    stepByStep: [
      'Brace your core, keep chest proud and back neutral.',
      'Initiate movement by sending hips back and bending knees simultaneously.',
      'Lower down smoothly until thighs are parallel to the floor (or as deep as mobility allows with neutral spine).',
      'Keep knees tracking inline with your second and third toes.',
      'Drive powerfully through midfoot and heels to return to standing position, squeezing glutes at the top.'
    ],
    breathingInstructions: 'Inhale as you descend down into the squat; exhale as you push up to standing.',
    defaultSets: 3,
    defaultReps: '10–12 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Knees collapsing inward (valgus collapse).',
      'Heels lifting off the floor.',
      'Rounding the lower back at the bottom of the squat.'
    ],
    safetyWarnings: [
      'Maintain an upright torso; do not fold over at the waist.',
      'Keep weight balanced across whole foot.'
    ],
    easierVariation: 'Chair-assisted squat or squatting to a bench.',
    harderVariation: 'Pause at bottom for 2 seconds or add tempo.',
    safetyStatus: 1,
    flags: {},
    animationType: 'squat'
  },

  'dumbbell-goblet-squat': {
    id: 'dumbbell-goblet-squat',
    name: 'Dumbbell Goblet Squat',
    category: 'legs',
    targetMuscles: ['Quadriceps', 'Gluteus Maximus', 'Upper Back', 'Core'],
    equipment: ['convertible_dumbbells'],
    startingPosition: 'Stand with feet shoulder-width apart. Hold one convertible dumbbell vertically with both hands cupping the top weight plate against your sternum. Elbows pointing down.',
    stepByStep: [
      'Keep the dumbbell held securely against your upper chest.',
      'Inhale, brace your core, and push hips back and down.',
      'Squat down between your legs until elbows graze the inside of your knees.',
      'Keep your chest high and back flat throughout.',
      'Drive through your heels to return to standing position, exhaling at the top.'
    ],
    breathingInstructions: 'Inhale deeply as you squat down; exhale forcefully as you drive back up.',
    defaultSets: 3,
    defaultReps: '8–10 reps',
    defaultRestSeconds: 75,
    commonMistakes: [
      'Allowing the dumbbell to drift away from the chest (pulls torso forward).',
      'Rounding upper or lower back.',
      'Shifting weight onto the toes.'
    ],
    safetyWarnings: [
      'Verify spinlock collars are firmly tightened on the dumbbell before lifting.',
      'Use a manageable weight (e.g. 3-6 kg) before progressing.'
    ],
    easierVariation: 'Bodyweight squat with hands clasped at chest.',
    harderVariation: 'Increase dumbbell weight or add 1.5 rep pulses.',
    safetyStatus: 1,
    flags: {},
    animationType: 'goblet-squat'
  },

  'glute-bridge': {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    category: 'core',
    targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Erector Spinae'],
    equipment: ['mat'],
    startingPosition: 'Lie on your back on a mat, knees bent at 90 degrees, feet flat on the floor hip-width apart. Arms at sides.',
    stepByStep: [
      'Brace your abdominal wall to stabilize your pelvis.',
      'Press through your heels and drive your hips upward towards the ceiling.',
      'At the top, create a straight diagonal line from knees to hips to shoulders.',
      'Squeeze your glutes hard at the top for 2 seconds.',
      'Lower your hips back down in a controlled manner.'
    ],
    breathingInstructions: 'Exhale as you thrust hips upward; inhale as you lower down.',
    defaultSets: 3,
    defaultReps: '12–15 reps',
    defaultRestSeconds: 45,
    commonMistakes: [
      'Arching lower back rather than driving from glutes.',
      'Pushing through toes instead of heels.'
    ],
    safetyWarnings: [
      'Avoid hyperextending the lower back at the top.'
    ],
    easierVariation: 'Shorter range of motion or feet closer to glutes.',
    harderVariation: 'Single-leg glute bridge or place a dumbbell across hips.',
    safetyStatus: 1,
    flags: {},
    animationType: 'glute-bridge'
  },

  'knee-push-up': {
    id: 'knee-push-up',
    name: 'Knee Push-Up',
    category: 'upper',
    targetMuscles: ['Chest', 'Anterior Deltoid', 'Triceps', 'Core'],
    equipment: ['mat'],
    startingPosition: 'Start on hands and knees on a mat. Walk hands forward until body forms a straight diagonal line from knees to crown of head. Hands slightly wider than shoulder width.',
    stepByStep: [
      'Keep glutes and core engaged so your hips do not sag or poke upward.',
      'Inhale and lower your chest towards the mat by bending elbows at roughly 45 degrees.',
      'Lower until your chest hovers 2-3 inches above the floor.',
      'Exhale and push firmly through your palms to return to the starting plank on knees.'
    ],
    breathingInstructions: 'Inhale on the descent; exhale as you push up.',
    defaultSets: 3,
    defaultReps: '8–10 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Sagging in the lower back.',
      'Flaring elbows out at 90 degrees.',
      'Poking neck down to touch floor before chest.'
    ],
    safetyWarnings: [
      'Keep wrists stacked comfortably under shoulders and core braced.'
    ],
    easierVariation: 'Wall push-up or incline push-up against a sturdy table.',
    harderVariation: 'Full standard push-up on toes.',
    safetyStatus: 1,
    flags: {},
    animationType: 'knee-push-up'
  },

  'standing-band-row': {
    id: 'standing-band-row',
    name: 'Standing Resistance Band Row',
    category: 'upper',
    targetMuscles: ['Rhomboids', 'Lats', 'Biceps', 'Posterior Deltoid'],
    equipment: ['resistance_bands'],
    startingPosition: 'Stand in athletic stance with feet hip-width apart. Anchor resistance band around a secure door anchor or step on the middle of the band with both feet, holding handles.',
    stepByStep: [
      'Hinge forward slightly at hips with flat back, knees softly bent.',
      'Hold handles with arms extended forward towards anchor.',
      'Exhale and pull handles back towards the sides of your waist, driving elbows back.',
      'Squeeze shoulder blades together firmly at the peak.',
      'Slowly extend arms forward resisting the band pull.'
    ],
    breathingInstructions: 'Exhale on the pull; inhale as you return.',
    defaultSets: 3,
    defaultReps: '10–12 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Rounding the spine while bent forward.',
      'Using momentum by jerking torso upward.'
    ],
    safetyWarnings: [
      'Ensure the band anchor is rock solid.'
    ],
    easierVariation: 'Seated band row with back support.',
    harderVariation: 'Increase band resistance or 2-second isometric contraction at peak.',
    safetyStatus: 1,
    flags: {},
    animationType: 'band-row'
  },

  'dumbbell-biceps-curl': {
    id: 'dumbbell-biceps-curl',
    name: 'Standing Dumbbell Biceps Curl',
    category: 'upper',
    targetMuscles: ['Biceps', 'Brachialis', 'Forearms'],
    equipment: ['convertible_dumbbells'],
    startingPosition: 'Stand tall with feet hip-width apart. Hold a convertible dumbbell in each hand by your sides, palms facing forward. Chest proud, core engaged.',
    stepByStep: [
      'Keep elbows close to your torso without moving them forward.',
      'Exhale and curl the dumbbells up towards shoulder height.',
      'Squeeze biceps at the top of the movement.',
      'Inhale as you lower the weights smoothly back down over 2-3 seconds.'
    ],
    breathingInstructions: 'Exhale as you curl the weights; inhale as you lower them.',
    defaultSets: 3,
    defaultReps: '10–12 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Swinging hips or arching back to cheat the weight.',
      'Letting elbows flare outward.'
    ],
    safetyWarnings: [
      'Ensure dumbbell weight plates are locked tight with safety collars.'
    ],
    easierVariation: 'Seated biceps curl or lighter dumbbell weight.',
    harderVariation: 'Hammer curls or eccentric 4-second descent.',
    safetyStatus: 1,
    flags: {},
    animationType: 'biceps-curl'
  },

  'overhead-triceps-extension': {
    id: 'overhead-triceps-extension',
    name: 'Overhead Triceps Extension',
    category: 'upper',
    targetMuscles: ['Triceps Brachii'],
    equipment: ['convertible_dumbbells', 'resistance_bands'],
    startingPosition: 'Stand or sit upright holding one dumbbell vertically with both hands overhead, arms fully extended. Keep core braced and ribs pulled down.',
    stepByStep: [
      'Keep upper arms close to your ears and elbows pointing forward.',
      'Inhale and slowly bend your elbows, lowering the dumbbell behind your head until forearms are parallel to the floor.',
      'Keep elbows stationary—do not allow them to flare wide out.',
      'Exhale and press through your triceps to extend arms back to the overhead starting position.'
    ],
    breathingInstructions: 'Inhale as you lower the weight behind head; exhale as you press overhead.',
    defaultSets: 3,
    defaultReps: '10–12 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Arching lower back when arms are overhead.',
      'Letting elbows flare wide out to the sides.'
    ],
    safetyWarnings: [
      'Maintain strong grip on dumbbell collar with both hands.',
      'Keep neck and head neutral.'
    ],
    easierVariation: 'Resistance band tricep pushdown or chair triceps dips.',
    harderVariation: 'Perform with single arm or increase dumbbell plate weight.',
    safetyStatus: 1,
    flags: {},
    animationType: 'triceps-extension'
  },

  'dumbbell-lateral-raise': {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    category: 'upper',
    targetMuscles: ['Lateral Deltoids (Shoulders)', 'Trapezius'],
    equipment: ['convertible_dumbbells'],
    startingPosition: 'Stand tall with feet shoulder-width apart, holding light dumbbells at your sides, palms facing inward. Slight bend in the elbows.',
    stepByStep: [
      'Brace core and keep shoulders down (do not shrug).',
      'Exhale and raise arms out to the sides in a wide arc until dumbbells reach shoulder height.',
      'Lead with elbows slightly higher than wrists; keep a slight bend in elbows.',
      'Hold for a split second at the top.',
      'Inhale and lower down with control.'
    ],
    breathingInstructions: 'Exhale as you raise arms sideways; inhale as you lower them down.',
    defaultSets: 3,
    defaultReps: '10–12 reps',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Using momentum or bouncing knees to swing weights up.',
      'Lifting hands higher than shoulders.'
    ],
    safetyWarnings: [
      'Use very light weights (1-2 kg) to maintain pristine form without impingement.'
    ],
    easierVariation: 'Perform with thumbs up or use light resistance band.',
    harderVariation: 'Slow 3-second descent on each rep.',
    safetyStatus: 1,
    flags: {},
    animationType: 'lateral-raise'
  },

  'supported-reverse-lunge': {
    id: 'supported-reverse-lunge',
    name: 'Supported Reverse Lunge',
    category: 'legs',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    equipment: ['chair', 'wall'],
    startingPosition: 'Stand tall with feet together, holding onto the back of a sturdy chair with one hand for balance.',
    stepByStep: [
      'Keep torso upright and chest open.',
      'Take a controlled, generous step backward with your right leg.',
      'Lower your hips straight down until front thigh is parallel to floor and back knee hovers a few inches above floor.',
      'Front knee should stay directly above front ankle (not collapsing inward or drifting far past toes).',
      'Exhale and press through the front heel to return to the starting position.',
      'Repeat on the opposite leg.'
    ],
    breathingInstructions: 'Inhale as you step back and descend; exhale as you push forward to stand.',
    defaultSets: 3,
    defaultReps: '8–10 reps per leg',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Stepping back too short, putting excessive shearing force on front knee.',
      'Leaning torso forward over front leg.'
    ],
    safetyWarnings: [
      'Keep one hand on the chair back for balance.',
      'Do not let the back knee slam into the floor.'
    ],
    easierVariation: 'Partial depth reverse step without dropping hips low.',
    harderVariation: 'Hold a dumbbell in the non-supporting hand, or perform freestanding.',
    safetyStatus: 1,
    flags: {
      fallRisk: true,
      requiresChairSupport: true
    },
    animationType: 'lunge'
  },

  'dead-bug': {
    id: 'dead-bug',
    name: 'Dead Bug (Core Stability)',
    category: 'core',
    targetMuscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Obliques'],
    equipment: ['mat'],
    startingPosition: 'Lie on your back on a mat. Raise arms straight up pointing towards ceiling. Lift legs with knees bent at 90 degrees (tabletop position).',
    stepByStep: [
      'Gently flatten your lower back against the floor so there is zero gap.',
      'Inhale and slowly lower your right arm backward past your ear while simultaneously extending your left leg straight out hovering above floor.',
      'Maintain the lower back contact with the mat throughout—do not let lower back arch.',
      'Exhale and bring both right arm and left leg back to starting tabletop position.',
      'Repeat with left arm and right leg.'
    ],
    breathingInstructions: 'Inhale as you extend arm and opposite leg; exhale as you return to center.',
    defaultSets: 3,
    defaultReps: '6–8 reps per side',
    defaultRestSeconds: 60,
    commonMistakes: [
      'Arching lower back off floor when limbs extend (indicates core lost tension).',
      'Moving limbs too fast.'
    ],
    safetyWarnings: [
      'If lower back arches off floor, reduce limb extension distance immediately.'
    ],
    easierVariation: 'Only move arms while keeping knees bent, or tap heels to floor instead of full leg extension.',
    harderVariation: 'Hold light 1 kg dumbbells in hands.',
    safetyStatus: 1,
    flags: {
      loadedSpinalFlexion: false
    },
    animationType: 'dead-bug'
  },

  // --- RECOVERY & GENTLE MOBILITY EXERCISES ---
  'shoulder-circles-gentle': {
    id: 'shoulder-circles-gentle',
    name: 'Gentle Shoulder Rolls & Circles',
    category: 'mobility',
    targetMuscles: ['Trapezius', 'Rhomboids', 'Rotator Cuff'],
    equipment: ['chair'],
    startingPosition: 'Sit comfortably upright in a chair with back supported and hands resting on thighs. Keep neck relaxed.',
    stepByStep: [
      'Inhale as you shrug shoulders smoothly up towards ears.',
      'Roll shoulders back, bringing shoulder blades together.',
      'Exhale as you drop shoulders down and away from ears.',
      'Complete 8 backward rolls, then reverse for 8 gentle forward rolls.'
    ],
    breathingInstructions: 'Inhale as shoulders lift; exhale as shoulders slide down.',
    defaultSets: 2,
    defaultReps: '10 circles each direction',
    defaultRestSeconds: 30,
    commonMistakes: ['Jerking shoulders or holding breath.'],
    safetyWarnings: ['Keep head and neck relaxed; do not strain neck muscles.'],
    easierVariation: 'Smaller circular motion.',
    safetyStatus: 1,
    flags: {},
    animationType: 'shoulder-circles'
  },

  'ankle-pumps-circles': {
    id: 'ankle-pumps-circles',
    name: 'Seated Ankle Pumps & Circles',
    category: 'mobility',
    targetMuscles: ['Tibialis Anterior', 'Gastrocnemius', 'Ankle Capsule'],
    equipment: ['chair'],
    startingPosition: 'Sit in a chair with one foot slightly lifted off the floor.',
    stepByStep: [
      'Point your toes forward away from you, then flex toes back toward your shin (pump).',
      'Perform 10 smooth pumps.',
      'Then draw slow, wide circles in the air with your big toe (10 clockwise, 10 counter-clockwise).',
      'Switch to the other foot.'
    ],
    breathingInstructions: 'Breathe normally throughout.',
    defaultSets: 2,
    defaultReps: '10 pumps & 10 circles per foot',
    defaultRestSeconds: 30,
    commonMistakes: ['Moving the entire knee instead of isolating ankle.'],
    safetyWarnings: ['Excellent for circulation and venous return.'],
    easierVariation: 'Perform with heel resting on floor.',
    safetyStatus: 1,
    flags: {},
    animationType: 'ankle-pumps'
  },

  'box-breathing-relaxation': {
    id: 'box-breathing-relaxation',
    name: 'Box Breathing Relaxation',
    category: 'mobility',
    targetMuscles: ['Diaphragm', 'Autonomic Nervous System Regulation'],
    equipment: ['chair', 'mat'],
    startingPosition: 'Sit comfortably in a chair with feet flat and eyes closed or focused softly ahead. Rest hands in lap.',
    stepByStep: [
      'Inhale slowly through nose for 4 counts, expanding lower ribs.',
      'Hold your breath gently with relaxed throat for 4 counts.',
      'Exhale smoothly through mouth or nose for 4 counts.',
      'Hold empty lungs gently for 4 counts.',
      'Repeat for 4 to 8 relaxing cycles.'
    ],
    breathingInstructions: 'Follow the 4-4-4-4 rhythm without straining.',
    defaultSets: 1,
    defaultReps: '4–8 cycles (3–5 min)',
    defaultRestSeconds: 0,
    commonMistakes: ['Tensing shoulders during the inhale.'],
    safetyWarnings: ['If at any point holding breath causes dizziness, switch to natural gentle breathing immediately.'],
    easierVariation: '3-3-3-3 second count.',
    safetyStatus: 1,
    flags: {},
    animationType: 'box-breathing'
  }
};

