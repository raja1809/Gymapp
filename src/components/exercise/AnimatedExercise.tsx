import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, ListOrdered, Repeat, CheckCircle } from 'lucide-react';

interface AnimatedExerciseProps {
  exerciseId: string;
  animationType: string;
  speed?: number; // 0.5, 1, 1.5
  height?: number;
  className?: string;
  autoPlay?: boolean;
}

export const AnimatedExercise: React.FC<AnimatedExerciseProps> = ({
  animationType,
  speed = 1,
  height = 280,
  className = '',
  autoPlay = true
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(speed);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [isStepMode, setIsStepMode] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0); // 0 to 1

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2400 / playbackSpeed; // standard cycle in ms

  // Step mode definitions: 4 distinct phases for every movement
  const steps = [
    { label: 'Starting Position', progress: 0.05, cue: 'Stable posture, spine neutral, core lightly set.' },
    { label: 'Initiating Movement', progress: 0.35, cue: 'Controlled start, smooth muscle recruitment.' },
    { label: 'Peak Contraction', progress: 0.50, cue: 'Hold for 1–2 seconds. Breathe comfortably.' },
    { label: 'Controlled Return', progress: 0.85, cue: 'Resist gravity slowly back to starting posture.' }
  ];

  // Continuous animation loop via requestAnimationFrame
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const rawProgress = (elapsed % duration) / duration;

    // Smooth sinusoidal oscillation for natural anatomical movement
    // progress: 0 at start -> 1 at peak -> 0 at end
    const easeProgress = 0.5 - 0.5 * Math.cos(rawProgress * 2 * Math.PI);
    setProgress(easeProgress);

    if (isLooping || elapsed < duration) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (isPlaying && !isStepMode) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      startTimeRef.current = null;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, isLooping, playbackSpeed, isStepMode]);

  const handleTogglePlay = () => {
    if (isStepMode) {
      setIsStepMode(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReplay = () => {
    startTimeRef.current = null;
    setProgress(0);
    setIsPlaying(true);
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    setIsStepMode(true);
    const next = (currentStepIndex + 1) % steps.length;
    setCurrentStepIndex(next);
    setProgress(steps[next].progress);
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    setIsStepMode(true);
    const prev = (currentStepIndex - 1 + steps.length) % steps.length;
    setCurrentStepIndex(prev);
    setProgress(steps[prev].progress);
  };

  const cycleSpeed = () => {
    const speeds = [0.5, 1, 1.5];
    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(next);
  };

  // Compute animated joint coordinates based on progress (0 to 1)
  const renderVisual = () => {
    const t = progress; // 0 to 1
    const brandColor = '#0d9488'; // Teal
    const accentColor = '#3b82f6'; // Blue
    const jointColor = '#0f766e';
    const floorY = 240;

    switch (animationType) {
      case 'chair-sit-to-stand': {
        // Chair dimensions
        const chairX = 140;
        const chairSeatY = 190;
        // Joint movement: seated -> standing
        // Sitting: hip at 155, 185; knee at 185, 185; ankle at 185, 240
        // Standing: hip at 170, 130; knee at 175, 185; ankle at 185, 240
        const hipX = 155 + t * 20;
        const hipY = 185 - t * 65;
        const kneeX = 190 - t * 10;
        const kneeY = 185 - t * 25;
        const ankleX = 195;
        const ankleY = floorY;
        const shoulderX = hipX + 10 - (1 - t) * 12; // slight forward hinge during ascent
        const shoulderY = hipY - 65;
        const headX = shoulderX + 4;
        const headY = shoulderY - 26;

        return (
          <g>
            {/* Floor */}
            <line x1="40" y1={floorY} x2="360" y2={floorY} stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 4" />
            
            {/* Sturdy Chair */}
            <path d={`M ${chairX - 35} 120 L ${chairX - 35} 190 L ${chairX + 25} 190`} fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            <line x1={chairX - 30} y1="190" x2={chairX - 30} y2={floorY} stroke="#64748b" strokeWidth="5" />
            <line x1={chairX + 20} y1="190" x2={chairX + 20} y2={floorY} stroke="#64748b" strokeWidth="5" />
            {/* Chair cushion */}
            <rect x={chairX - 35} y="184" width="60" height="8" rx="4" fill="#94a3b8" />

            {/* Target muscle highlight (Quads & Glutes) */}
            <ellipse cx={(hipX + kneeX) / 2} cy={(hipY + kneeY) / 2} rx="12" ry="7" fill={brandColor} opacity={0.3 + t * 0.4} />

            {/* Skeleton Figure */}
            {/* Lower leg */}
            <line x1={ankleX} y1={ankleY} x2={kneeX} y2={kneeY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            {/* Thigh */}
            <line x1={kneeX} y1={kneeY} x2={hipX} y2={hipY} stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
            {/* Torso (Spine remains neutral/straight) */}
            <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            {/* Arm - hands resting on thighs or reaching forward for balance */}
            <path d={`M ${shoulderX} ${shoulderY} Q ${shoulderX + 15} ${shoulderY + 30} ${kneeX} ${kneeY - 10}`} fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            
            {/* Head */}
            <circle cx={headX} cy={headY} r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />
            {/* Eye focus point arrow */}
            <path d={`M ${headX + 18} ${headY} L ${headX + 45} ${headY}`} stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points={`${headX + 48},${headY} ${headX + 42},${headY - 4} ${headX + 42},${headY + 4}`} fill="#0284c7" />

            {/* Joints */}
            <circle cx={ankleX} cy={ankleY} r="5" fill={jointColor} />
            <circle cx={kneeX} cy={kneeY} r="6" fill={jointColor} />
            <circle cx={hipX} cy={hipY} r="6" fill={jointColor} />
            <circle cx={shoulderX} cy={shoulderY} r="5" fill={jointColor} />

            {/* Movement Direction Arrow */}
            <g opacity={0.8} transform={`translate(240, ${180 - t * 40})`}>
              <line x1="0" y1="20" x2="0" y2="-10" stroke={brandColor} strokeWidth="3" />
              <polygon points="0,-16 -6,-6 6,-6" fill={brandColor} />
              <text x="12" y="0" fontSize="11" fontWeight="bold" fill={brandColor}>
                {t > 0.5 ? 'Standing Up' : 'Lowering'}
              </text>
            </g>
          </g>
        );
      }

      case 'calf-raises': {
        const chairX = 220;
        const lift = t * 28;
        const ankleX = 150;
        const ankleY = floorY - lift;
        const ballFootX = 165;
        const kneeX = 152;
        const kneeY = ankleY - 60;
        const hipX = 150;
        const hipY = kneeY - 65;
        const shoulderX = 152;
        const shoulderY = hipY - 65;
        const headX = 152;
        const headY = shoulderY - 26;

        return (
          <g>
            <line x1="40" y1={floorY} x2="360" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            {/* Chair Support */}
            <path d={`M ${chairX} 80 L ${chairX} 190 L ${chairX + 40} 190`} fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            <line x1={chairX} y1="190" x2={chairX} y2={floorY} stroke="#64748b" strokeWidth="5" />
            <line x1={chairX + 40} y1="190" x2={chairX + 40} y2={floorY} stroke="#64748b" strokeWidth="5" />

            {/* Calf Muscle Glow */}
            <ellipse cx={ankleX + 2} cy={ankleY - 32} rx="14" ry="18" fill="#10b981" opacity={0.25 + t * 0.55} />

            {/* Foot on toes */}
            <line x1={ankleX} y1={ankleY} x2={ballFootX} y2={floorY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <line x1={ballFootX} y1={floorY} x2={ballFootX + 16} y2={floorY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

            {/* Leg */}
            <line x1={ankleX} y1={ankleY} x2={kneeX} y2={kneeY} stroke="#1e293b" strokeWidth="6" />
            <line x1={kneeX} y1={kneeY} x2={hipX} y2={hipY} stroke="#1e293b" strokeWidth="7" />
            {/* Torso */}
            <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="#0f766e" strokeWidth="8" />
            {/* Hands holding chair back */}
            <path d={`M ${shoulderX} ${shoulderY} L ${chairX - 8} ${shoulderY + 20} L ${chairX} 105`} fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />

            <circle cx={headX} cy={headY} r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />
            
            {/* Joint dots */}
            <circle cx={ankleX} cy={ankleY} r="5" fill={jointColor} />
            <circle cx={kneeX} cy={kneeY} r="6" fill={jointColor} />
            <circle cx={hipX} cy={hipY} r="6" fill={jointColor} />

            {/* Vertical Heel Lift Indicator */}
            <g transform={`translate(100, ${floorY - lift / 2})`}>
              <line x1="0" y1="12" x2="0" y2="-12" stroke="#10b981" strokeWidth="3" />
              <polygon points="0,-16 -5,-8 5,-8" fill="#10b981" />
              <text x="-70" y="4" fontSize="11" fontWeight="bold" fill="#10b981">
                {t > 0.4 ? 'Heels High' : 'Lowering'}
              </text>
            </g>
          </g>
        );
      }

      case 'biceps-curl': {
        const curlAngle = 30 + t * 110; // degrees
        const rad = (curlAngle * Math.PI) / 180;
        const shoulderX = 180;
        const shoulderY = 85;
        const elbowX = 180;
        const elbowY = 150;
        const forearmLength = 55;
        // Forearm moving up
        const wristX = elbowX + Math.sin(rad) * forearmLength;
        const wristY = elbowY + Math.cos(rad) * forearmLength;

        return (
          <g>
            <line x1="60" y1={floorY} x2="340" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            {/* Standing legs & torso */}
            <line x1="165" y1={floorY} x2="175" y2="180" stroke="#1e293b" strokeWidth="6" />
            <line x1="195" y1={floorY} x2="185" y2="180" stroke="#1e293b" strokeWidth="6" />
            <line x1="180" y1="180" x2="180" y2="85" stroke="#0f766e" strokeWidth="9" strokeLinecap="round" />
            
            {/* Head */}
            <circle cx="180" cy="55" r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            {/* Biceps Muscle Contraction Glow */}
            <ellipse cx={elbowX + 4} cy={elbowY - 26} rx="11" ry="16" fill="#ef4444" opacity={0.2 + t * 0.65} />

            {/* Upper Arm (Stays Pinned!) */}
            <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
            {/* Forearm (Rotating) */}
            <line x1={elbowX} y1={elbowY} x2={wristX} y2={wristY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

            {/* Convertible Dumbbell in Hand */}
            <g transform={`translate(${wristX}, ${wristY}) rotate(${-curlAngle + 90})`}>
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#475569" strokeWidth="5" />
              <rect x="-24" y="-12" width="6" height="24" rx="2" fill="#0d9488" />
              <rect x="18" y="-12" width="6" height="24" rx="2" fill="#0d9488" />
            </g>

            {/* Joints */}
            <circle cx={shoulderX} cy={shoulderY} r="5" fill={jointColor} />
            <circle cx={elbowX} cy={elbowY} r="6" fill="#ef4444" />
            <circle cx={wristX} cy={wristY} r="4" fill={jointColor} />

            {/* Cue */}
            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Squeeze Biceps at Top' : 'Controlled 3s Lowering'}
            </text>
          </g>
        );
      }

      case 'wall-push-up': {
        const wallX = 300;
        // Lean towards wall: 0 is arm extended, 1 is chest close
        const lean = t * 38;
        const ankleX = 110;
        const ankleY = floorY;
        const hipX = 145 + lean;
        const hipY = 175 - lean * 0.2;
        const shoulderX = 180 + lean;
        const shoulderY = 115 - lean * 0.3;
        const headX = shoulderX + 16;
        const headY = shoulderY - 14;
        const handX = wallX;
        const handY = 120;
        const elbowX = (shoulderX + handX) / 2 - (1 - t) * 8;
        const elbowY = (shoulderY + handY) / 2 + t * 24;

        return (
          <g>
            {/* Floor */}
            <line x1="40" y1={floorY} x2="360" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            
            {/* Solid Wall on Right */}
            <rect x={wallX} y="30" width="30" height="210" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
            {/* Wall hatch pattern */}
            <line x1={wallX} y1="60" x2={wallX + 30} y2="50" stroke="#cbd5e1" strokeWidth="2" />
            <line x1={wallX} y1="100" x2={wallX + 30} y2="90" stroke="#cbd5e1" strokeWidth="2" />
            <line x1={wallX} y1="140" x2={wallX + 30} y2="130" stroke="#cbd5e1" strokeWidth="2" />
            <line x1={wallX} y1="180" x2={wallX + 30} y2="170" stroke="#cbd5e1" strokeWidth="2" />

            {/* Straight rigid body line */}
            <line x1={ankleX} y1={ankleY} x2={hipX} y2={hipY} stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
            <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            
            {/* Arms: Shoulder -> Elbow -> Hand on wall */}
            <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

            {/* Chest muscle highlight */}
            <ellipse cx={shoulderX + 8} cy={shoulderY + 12} rx="12" ry="10" fill="#0d9488" opacity={0.3 + t * 0.5} />

            {/* Head */}
            <circle cx={headX} cy={headY} r="15" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            {/* Joints */}
            <circle cx={ankleX} cy={ankleY} r="5" fill={jointColor} />
            <circle cx={hipX} cy={hipY} r="6" fill={jointColor} />
            <circle cx={shoulderX} cy={shoulderY} r="5" fill={jointColor} />
            <circle cx={elbowX} cy={elbowY} r="5" fill="#0d9488" />
            <circle cx={handX} cy={handY} r="5" fill="#475569" />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Elbows bend 45° smoothly' : 'Press evenly away from wall'}
            </text>
          </g>
        );
      }

      case 'glute-bridge': {
        const matY = 210;
        // Head at 90, shoulders at 120, hips rise from 205 to 145, knees at 230, feet at 260
        const hipRise = t * 55;
        const shoulderX = 125;
        const shoulderY = matY - 12;
        const hipX = 180;
        const hipY = matY - 12 - hipRise;
        const kneeX = 235;
        const kneeY = matY - 55;
        const footX = 255;
        const footY = matY;

        return (
          <g>
            {/* Mat */}
            <rect x="50" y={matY} width="240" height="12" rx="4" fill="#0d9488" opacity="0.6" />
            
            {/* Head flat on mat (no head movement) */}
            <circle cx="85" cy={matY - 16} r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />
            {/* Flat neck/pillow indicator */}
            <rect x="68" y={matY - 5} width="36" height="5" rx="2" fill="#cbd5e1" />

            {/* Glute highlight */}
            <ellipse cx={hipX} cy={hipY + 8} rx="16" ry="12" fill="#10b981" opacity={0.3 + t * 0.6} />

            {/* Arms resting flat on mat */}
            <line x1={shoulderX} y1={shoulderY} x2={shoulderX + 50} y2={matY - 4} stroke="#64748b" strokeWidth="5" strokeLinecap="round" />

            {/* Straight line torso (shoulders to hips) */}
            <line x1={shoulderX} y1={shoulderY} x2={hipX} y2={hipY} stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            {/* Thigh (hips to knees) */}
            <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
            {/* Shin (knees to feet) */}
            <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

            {/* Joints */}
            <circle cx={shoulderX} cy={shoulderY} r="5" fill={jointColor} />
            <circle cx={hipX} cy={hipY} r="6" fill="#10b981" />
            <circle cx={kneeX} cy={kneeY} r="6" fill={jointColor} />
            <circle cx={footX} cy={footY} r="5" fill={jointColor} />

            {/* Alignment Guideline */}
            {t > 0.4 && (
              <line x1={shoulderX} y1={shoulderY} x2={kneeX} y2={kneeY} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
            )}

            <text x="170" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Hold & Squeeze Glutes (No Arching Back)' : 'Lower Smoothly to Mat'}
            </text>
          </g>
        );
      }

      case 'band-row': {
        const pull = t * 45;
        const chairX = 140;
        const chairSeatY = 190;
        const hipX = 150;
        const hipY = 185;
        const shoulderX = 155;
        const shoulderY = 120;
        const headX = 155;
        const headY = 94;
        const footX = 230;
        const footY = floorY - 5;
        // Hands pull from footX-30 back to ribs
        const handX = 220 - pull;
        const handY = 140;
        const elbowX = shoulderX + 25 - pull * 0.6;
        const elbowY = shoulderY + 25;

        return (
          <g>
            <line x1="40" y1={floorY} x2="360" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            
            {/* Chair */}
            <path d={`M ${chairX - 35} 120 L ${chairX - 35} 190 L ${chairX + 15} 190`} fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            <line x1={chairX - 30} y1="190" x2={chairX - 30} y2={floorY} stroke="#64748b" strokeWidth="5" />
            <line x1={chairX + 10} y1="190" x2={chairX + 10} y2={floorY} stroke="#64748b" strokeWidth="5" />

            {/* Back muscles glow (Rhomboids/Lats) */}
            <ellipse cx={shoulderX - 8} cy={shoulderY + 18} rx="12" ry="18" fill="#0d9488" opacity={0.25 + t * 0.6} />

            {/* Legs extended forward */}
            <line x1={hipX} y1={hipY} x2={195} y2={210} stroke="#1e293b" strokeWidth="7" />
            <line x1={195} y1={210} x2={footX} y2={footY} stroke="#1e293b" strokeWidth="6" />

            {/* Torso sitting proud */}
            <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            
            {/* Resistance Band (Stretching from feet to hands) */}
            <path d={`M ${footX} ${footY - 10} Q ${(footX + handX) / 2} ${handY + 15} ${handX} ${handY}`} fill="none" stroke="#f43f5e" strokeWidth={4 + t * 1.5} />
            
            {/* Arms: Shoulder -> Elbow -> Hand */}
            <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

            {/* Head */}
            <circle cx={headX} cy={headY} r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            {/* Joints */}
            <circle cx={shoulderX} cy={shoulderY} r="5" fill={jointColor} />
            <circle cx={elbowX} cy={elbowY} r="5" fill="#f43f5e" />
            <circle cx={handX} cy={handY} r="4" fill="#1e293b" />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Drive Elbows Back & Pinch Shoulder Blades' : 'Controlled Return (Do Not Snap Band)'}
            </text>
          </g>
        );
      }

      case 'side-leg-raises': {
        const chairX = 230;
        const legSweep = t * 32; // degrees
        const rad = (legSweep * Math.PI) / 180;
        const hipX = 160;
        const hipY = 120;
        const legLength = 115;
        // Standing leg
        const standFootX = 180;
        // Abducting leg
        const moveAnkleX = hipX - Math.sin(rad) * legLength;
        const moveAnkleY = hipY + Math.cos(rad) * legLength;

        return (
          <g>
            <line x1="40" y1={floorY} x2="360" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            
            {/* Sturdy Chair on right */}
            <path d={`M ${chairX} 80 L ${chairX} 190 L ${chairX + 40} 190`} fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            <line x1={chairX} y1="190" x2={chairX} y2={floorY} stroke="#64748b" strokeWidth="5" />
            <line x1={chairX + 40} y1="190" x2={chairX + 40} y2={floorY} stroke="#64748b" strokeWidth="5" />

            {/* Hip Abductor Highlight (Glute Medius) */}
            <ellipse cx={hipX - 10} cy={hipY + 8} rx="12" ry="12" fill="#0284c7" opacity={0.3 + t * 0.6} />

            {/* Standing Leg (Fixed upright) */}
            <line x1={hipX + 15} y1={hipY} x2={standFootX} y2={floorY} stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
            
            {/* Moving Leg (Lifting sideways without leaning) */}
            <line x1={hipX - 5} y1={hipY} x2={moveAnkleX} y2={moveAnkleY} stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />

            {/* Torso strictly upright (No lateral slouching) */}
            <line x1={hipX + 5} y1={hipY} x2={hipX + 5} y2="60" stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            
            {/* Hands on chair */}
            <path d={`M ${hipX + 5} 70 L ${chairX} 100`} stroke="#475569" strokeWidth="5" strokeLinecap="round" />

            {/* Head */}
            <circle cx={hipX + 5} cy="38" r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            {/* Joint dots */}
            <circle cx={hipX - 5} cy={hipY} r="6" fill="#0284c7" />
            <circle cx={moveAnkleX} cy={moveAnkleY} r="5" fill={jointColor} />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Toes Point Forward • Torso Tall' : 'Slow Lowering'}
            </text>
          </g>
        );
      }

      case 'abdominal-bracing': {
        const matY = 210;
        const braceIntensity = t; // 0 to 1
        return (
          <g>
            <rect x="50" y={matY} width="240" height="12" rx="4" fill="#0d9488" opacity="0.6" />
            
            {/* Person resting in supine posture */}
            <circle cx="85" cy={matY - 16} r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />
            {/* Torso */}
            <line x1="105" y1={matY - 12} x2="180" y2={matY - 12} stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            {/* Knees bent */}
            <line x1="180" y1={matY - 12} x2="215" y2={matY - 55} stroke="#1e293b" strokeWidth="7" />
            <line x1="215" y1={matY - 55} x2="245" y2={matY} stroke="#1e293b" strokeWidth="6" />

            {/* Transverse Abdominis Engagement Halo (Visualizing deep core brace without moving spine) */}
            <g transform="translate(142, 194)">
              <ellipse cx="0" cy="0" rx={24 + braceIntensity * 6} ry={14 + braceIntensity * 4} fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="4 3" opacity={0.4 + braceIntensity * 0.6} />
              <ellipse cx="0" cy="0" rx="16" ry="9" fill="#10b981" opacity={0.2 + braceIntensity * 0.5} />
            </g>

            {/* Fingertips placed gently on lower belly */}
            <path d={`M 120 ${matY - 20} Q 135 ${matY - 35} 142 ${matY - 22}`} fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

            {/* Zero spine movement badge */}
            <rect x="80" y="80" width="180" height="28" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
            <text x="170" y="98" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
              ✓ Neutral Spine (No Bending)
            </text>

            <text x="170" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Breathe Naturally • Gentle Corset Tightening' : 'Release Tension Smoothly'}
            </text>
          </g>
        );
      }

      case 'squat':
      case 'goblet-squat': {
        const squatDepth = t * 50;
        const hipX = 160 - squatDepth * 0.4;
        const hipY = 145 + squatDepth;
        const kneeX = 185 + squatDepth * 0.2;
        const kneeY = 195;
        const footX = 180;
        const shoulderX = hipX + 15 + squatDepth * 0.3;
        const shoulderY = hipY - 65;
        const headX = shoulderX + 4;
        const headY = shoulderY - 24;

        return (
          <g>
            <line x1="40" y1={floorY} x2="360" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            
            {/* Quads & Glute highlight */}
            <ellipse cx={(hipX + kneeX) / 2} cy={(hipY + kneeY) / 2} rx="14" ry="10" fill={brandColor} opacity={0.3 + t * 0.5} />
            <ellipse cx={hipX - 10} cy={hipY + 5} rx="12" ry="10" fill="#3b82f6" opacity={0.3 + t * 0.5} />

            {/* Legs */}
            <line x1={footX} y1={floorY} x2={kneeX} y2={kneeY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <line x1={kneeX} y1={kneeY} x2={hipX} y2={hipY} stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
            {/* Spine */}
            <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            
            {/* Dumbbell held at chest for Goblet Squat */}
            {animationType === 'goblet-squat' ? (
              <g transform={`translate(${shoulderX + 16}, ${shoulderY + 16})`}>
                <rect x="-6" y="-12" width="12" height="24" rx="4" fill="#334155" />
                <rect x="-10" y="-16" width="20" height="6" rx="2" fill="#0d9488" />
                <rect x="-10" y="10" width="20" height="6" rx="2" fill="#0d9488" />
                {/* Arms holding dumbbell */}
                <path d={`M ${shoulderX} ${shoulderY} L ${shoulderX + 14} ${shoulderY + 16}`} stroke="#475569" strokeWidth="5" />
              </g>
            ) : (
              // Extended arms for bodyweight squat
              <line x1={shoulderX} y1={shoulderY} x2={shoulderX + 45} y2={shoulderY} stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            )}

            <circle cx={headX} cy={headY} r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            <circle cx={footX} cy={floorY} r="5" fill={jointColor} />
            <circle cx={kneeX} cy={kneeY} r="6" fill={jointColor} />
            <circle cx={hipX} cy={hipY} r="6" fill={jointColor} />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Thighs Parallel • Chest Proud' : 'Drive Through Midfoot to Stand'}
            </text>
          </g>
        );
      }

      case 'knee-push-up': {
        const lean = t * 30;
        const kneeX = 90;
        const kneeY = floorY - 5;
        const hipX = 140;
        const hipY = floorY - 50 + lean * 0.7;
        const shoulderX = 200;
        const shoulderY = floorY - 80 + lean;
        const handX = 210;
        const handY = floorY;
        const elbowX = (shoulderX + handX) / 2 + t * 15;
        const elbowY = (shoulderY + handY) / 2 - 10;

        return (
          <g>
            <rect x="70" y={floorY} width="220" height="10" rx="4" fill="#64748b" opacity="0.4" />
            
            {/* Straight line from knees to shoulders */}
            <line x1={kneeX} y1={kneeY} x2={hipX} y2={hipY} stroke="#1e293b" strokeWidth="7" />
            <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            
            {/* Arms */}
            <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#1e293b" strokeWidth="6" />
            <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke="#1e293b" strokeWidth="6" />

            <circle cx={shoulderX + 18} cy={shoulderY - 10} r="15" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            <circle cx={kneeX} cy={kneeY} r="6" fill={jointColor} />
            <circle cx={hipX} cy={hipY} r="6" fill={jointColor} />
            <circle cx={shoulderX} cy={shoulderY} r="5" fill={jointColor} />
            <circle cx={handX} cy={handY} r="5" fill="#475569" />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Chest 3 inches off mat' : 'Push back up strongly'}
            </text>
          </g>
        );
      }

      case 'triceps-extension': {
        const bend = t * 80; // degrees
        const rad = (bend * Math.PI) / 180;
        const shoulderX = 180;
        const shoulderY = 110;
        const elbowX = 180;
        const elbowY = 55; // overhead
        const forearmLength = 45;
        const handX = elbowX - Math.sin(rad) * forearmLength;
        const handY = elbowY + Math.cos(rad) * forearmLength;

        return (
          <g>
            <line x1="80" y1={floorY} x2="280" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            {/* Standing body */}
            <line x1="170" y1={floorY} x2="180" y2="180" stroke="#1e293b" strokeWidth="6" />
            <line x1="190" y1={floorY} x2="180" y2="180" stroke="#1e293b" strokeWidth="6" />
            <line x1="180" y1="180" x2="180" y2="110" stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            <circle cx="180" cy="80" r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            {/* Triceps muscle highlight */}
            <ellipse cx={elbowX - 6} cy={elbowY + 22} rx="8" ry="14" fill="#f59e0b" opacity={0.3 + t * 0.6} />

            {/* Upper arm (stationary overhead) */}
            <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            {/* Forearm bending backward */}
            <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

            {/* Dumbbell */}
            <circle cx={handX} cy={handY} r="7" fill="#0d9488" />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Lower behind head' : 'Extend fully overhead'}
            </text>
          </g>
        );
      }

      case 'lateral-raise': {
        const sweep = t * 75; // degrees from vertical
        const rad = (sweep * Math.PI) / 180;
        const armLength = 55;
        const shoulderY = 100;
        const leftHandX = 165 - Math.sin(rad) * armLength;
        const leftHandY = shoulderY + Math.cos(rad) * armLength;
        const rightHandX = 195 + Math.sin(rad) * armLength;
        const rightHandY = shoulderY + Math.cos(rad) * armLength;

        return (
          <g>
            <line x1="80" y1={floorY} x2="280" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            <line x1="170" y1={floorY} x2="180" y2="170" stroke="#1e293b" strokeWidth="6" />
            <line x1="190" y1={floorY} x2="180" y2="170" stroke="#1e293b" strokeWidth="6" />
            <line x1="180" y1="170" x2="180" y2="100" stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            <circle cx="180" cy="72" r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            {/* Shoulders highlight */}
            <circle cx="165" cy={shoulderY} r="9" fill="#0284c7" opacity={0.3 + t * 0.6} />
            <circle cx="195" cy={shoulderY} r="9" fill="#0284c7" opacity={0.3 + t * 0.6} />

            {/* Left Arm */}
            <line x1="165" y1={shoulderY} x2={leftHandX} y2={leftHandY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <circle cx={leftHandX} cy={leftHandY} r="6" fill="#0d9488" />

            {/* Right Arm */}
            <line x1="195" y1={shoulderY} x2={rightHandX} y2={rightHandY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <circle cx={rightHandX} cy={rightHandY} r="6" fill="#0d9488" />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Raise to Shoulder Height' : 'Smooth Control Down'}
            </text>
          </g>
        );
      }

      case 'hamstring-curl': {
        const chairX = 220;
        const curl = t * 90; // degrees
        const rad = (curl * Math.PI) / 180;
        const kneeX = 160;
        const kneeY = 175;
        const shinLen = 60;
        const footX = kneeX - Math.sin(rad) * shinLen;
        const footY = kneeY + Math.cos(rad) * shinLen;

        return (
          <g>
            <line x1="40" y1={floorY} x2="360" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            <path d={`M ${chairX} 80 L ${chairX} 190 L ${chairX + 40} 190`} fill="none" stroke="#64748b" strokeWidth="6" />
            <line x1={chairX} y1="190" x2={chairX} y2={floorY} stroke="#64748b" strokeWidth="5" />
            <line x1={chairX + 40} y1="190" x2={chairX + 40} y2={floorY} stroke="#64748b" strokeWidth="5" />

            {/* Standing support leg */}
            <line x1="180" y1={floorY} x2="175" y2="120" stroke="#1e293b" strokeWidth="7" />

            {/* Hamstring muscle glow */}
            <ellipse cx="152" cy="148" rx="10" ry="16" fill="#f43f5e" opacity={0.3 + t * 0.6} />

            {/* Moving leg: thigh points down, shin curls */}
            <line x1="160" y1="120" x2={kneeX} y2={kneeY} stroke="#1e293b" strokeWidth="7" />
            <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

            {/* Torso & hands on chair */}
            <line x1="170" y1="120" x2="170" y2="60" stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            <path d="M 170 70 L 220 95" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <circle cx="170" cy="38" r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            <circle cx={kneeX} cy={kneeY} r="6" fill="#f43f5e" />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Curl Heel Towards Glute' : 'Lower Under Control'}
            </text>
          </g>
        );
      }

      case 'dead-bug': {
        const matY = 200;
        const extend = t * 35;
        return (
          <g>
            <rect x="50" y={matY} width="240" height="12" rx="4" fill="#0d9488" opacity="0.6" />
            <circle cx="80" cy={matY - 14} r="15" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />
            
            {/* Flat lower back glued to floor */}
            <line x1="95" y1={matY - 10} x2="180" y2={matY - 10} stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            
            {/* Right arm reaches overhead */}
            <line x1="120" y1={matY - 10} x2={120 - extend * 0.8} y2={matY - 45 - extend * 0.3} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            {/* Left arm vertical */}
            <line x1="125" y1={matY - 10} x2="125" y2={matY - 60} stroke="#475569" strokeWidth="5" strokeLinecap="round" />

            {/* Left leg extends forward hovering */}
            <line x1="180" y1={matY - 10} x2={220 + extend} y2={matY - 25 - extend * 0.2} stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            {/* Right leg in tabletop 90 deg */}
            <line x1="180" y1={matY - 10} x2="200" y2={matY - 45} stroke="#475569" strokeWidth="6" />
            <line x1="200" y1={matY - 45} x2="230" y2={matY - 45} stroke="#475569" strokeWidth="5" />

            {/* Core highlight */}
            <rect x="125" y={matY - 20} width="45" height="15" rx="6" fill="#10b981" opacity={0.3 + t * 0.6} />

            <text x="170" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Lower Back Stays Glued to Mat' : 'Smooth Return to Tabletop'}
            </text>
          </g>
        );
      }

      case 'lunge': {
        const chairX = 220;
        const dip = t * 40;
        const frontFootX = 180;
        const frontKneeX = 180;
        const frontKneeY = floorY - 60 + dip * 0.5;
        const backFootX = 100 - t * 20;
        const backKneeY = floorY - 10 - (1 - t) * 40;

        return (
          <g>
            <line x1="40" y1={floorY} x2="360" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            <path d={`M ${chairX} 80 L ${chairX} 190 L ${chairX + 40} 190`} fill="none" stroke="#64748b" strokeWidth="6" />
            <line x1={chairX} y1="190" x2={chairX} y2={floorY} stroke="#64748b" strokeWidth="5" />
            <line x1={chairX + 40} y1="190" x2={chairX + 40} y2={floorY} stroke="#64748b" strokeWidth="5" />

            {/* Legs */}
            <line x1={frontFootX} y1={floorY} x2={frontKneeX} y2={frontKneeY} stroke="#1e293b" strokeWidth="7" />
            <line x1={frontKneeX} y1={frontKneeY} x2="160" y2={140 + dip} stroke="#1e293b" strokeWidth="7" />
            
            <line x1="160" y1={140 + dip} x2="120" y2={backKneeY} stroke="#1e293b" strokeWidth="6" />
            <line x1="120" y1={backKneeY} x2={backFootX} y2={floorY} stroke="#1e293b" strokeWidth="6" />

            {/* Torso & Hand on chair */}
            <line x1="160" y1={140 + dip} x2="160" y2={70 + dip} stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            <path d={`M 160 ${80 + dip} L ${chairX} 100`} stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <circle cx="160" cy={48 + dip} r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Back Knee Hovers • Torso Upright' : 'Press Front Heel to Stand'}
            </text>
          </g>
        );
      }

      case 'walking': {
        const swing = Math.sin(t * Math.PI * 2) * 20;
        return (
          <g>
            <line x1="40" y1={floorY} x2="360" y2={floorY} stroke="#cbd5e1" strokeWidth="3" />
            {/* Legs swinging */}
            <line x1="180" y1="130" x2={165 + swing} y2={floorY} stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
            <line x1="180" y1="130" x2={195 - swing} y2={floorY} stroke="#0d9488" strokeWidth="7" strokeLinecap="round" />
            
            {/* Torso */}
            <line x1="180" y1="130" x2="180" y2="70" stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
            
            {/* Arms swinging opposite to legs */}
            <line x1="180" y1="80" x2={195 - swing * 0.8} y2="120" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <line x1="180" y1="80" x2={165 + swing * 0.8} y2="120" stroke="#475569" strokeWidth="5" strokeLinecap="round" />

            <circle cx="180" cy="48" r="16" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />

            <text x="180" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              Easy Conversational Pace • Eyes Looking Forward
            </text>
          </g>
        );
      }

      case 'shoulder-circles': {
        const angle = t * Math.PI * 2;
        const cx = 180;
        const cy = 100;
        const r = 14;
        const sx = cx + Math.cos(angle) * r;
        const sy = cy + Math.sin(angle) * r;

        return (
          <g>
            <circle cx="180" cy="65" r="18" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />
            <line x1="180" y1="83" x2="180" y2="170" stroke="#0f766e" strokeWidth="9" strokeLinecap="round" />
            
            {/* Circular Path Guideline */}
            <ellipse cx={cx} cy={cy} rx={r} ry={r} fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 3" />
            
            {/* Rolling Shoulders */}
            <circle cx={sx} cy={sy} r="9" fill="#0d9488" />
            
            <text x="180" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              Smooth Circular Rolls • Relax Neck & Jaw
            </text>
          </g>
        );
      }

      case 'ankle-pumps': {
        const pump = t * 40 - 20; // -20 to +20 deg
        const rad = (pump * Math.PI) / 180;
        const ankleX = 160;
        const ankleY = 170;
        const toeX = ankleX + Math.cos(rad) * 55;
        const toeY = ankleY + Math.sin(rad) * 55;

        return (
          <g>
            {/* Lower leg */}
            <line x1="120" y1="100" x2={ankleX} y2={ankleY} stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
            {/* Foot pivoting */}
            <line x1={ankleX - 15} y1={ankleY} x2={toeX} y2={toeY} stroke="#0d9488" strokeWidth="8" strokeLinecap="round" />
            
            <circle cx={ankleX} cy={ankleY} r="7" fill="#0f766e" />

            {/* Arc guide */}
            <path d={`M ${ankleX + 45} 145 A 50 50 0 0 1 ${ankleX + 45} 195`} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />

            <text x="180" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">
              {t > 0.5 ? 'Point Toes Forward' : 'Pull Toes Toward Shin'}
            </text>
          </g>
        );
      }

      case 'box-breathing':
      default: {
        // Dynamic expanding & contracting soft ring with 4 phase labels
        const scale = 0.75 + t * 0.45;
        const phaseName = 
          t < 0.25 ? 'Inhale (4s)' : 
          t < 0.5 ? 'Hold Lungs Full (4s)' : 
          t < 0.75 ? 'Exhale (4s)' : 'Hold Empty (4s)';

        return (
          <g>
            {/* Background Zen Circles */}
            <circle cx="180" cy="130" r="85" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="3" />
            <circle cx="180" cy="130" r="60" fill="#ccfbf1" opacity="0.4" />

            {/* Pulsing Breathing Bubble */}
            <circle cx="180" cy="130" r={50 * scale} fill="url(#breathGradient)" opacity="0.8" />
            
            {/* Central Heart/Calm Indicator */}
            <circle cx="180" cy="130" r="14" fill="#ffffff" stroke="#0d9488" strokeWidth="2" />

            <text x="180" y="135" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f766e">
              {Math.round(4 - (t % 0.25) * 16) || 4}s
            </text>

            <text x="180" y="235" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0d9488">
              {phaseName}
            </text>
          </g>
        );
      }
    }
  };

  return (
    <div className={`flex flex-col items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden select-none ${className}`}>
      {/* SVG Canvas */}
      <div className="w-full relative flex items-center justify-center bg-gradient-to-b from-slate-50/60 to-slate-100/40 dark:from-slate-900 dark:to-slate-950 p-2">
        <svg
          viewBox="0 0 360 280"
          className="w-full max-w-md h-auto"
          style={{ maxHeight: height }}
          aria-label={`Animation of ${animationType}`}
        >
          <defs>
            <linearGradient id="breathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2dd4bf" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
          </defs>
          {renderVisual()}
        </svg>

        {/* Floating status pill */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          <span>{isStepMode ? `Step ${currentStepIndex + 1}/4` : isPlaying ? 'Live Demonstration' : 'Paused'}</span>
        </div>

        {/* Speed tag */}
        <button
          onClick={cycleSpeed}
          className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-slate-700 px-2 py-1 rounded-lg text-xs font-bold text-teal-700 dark:text-teal-400 border border-slate-200 dark:border-slate-700 transition"
          title="Change animation speed"
        >
          {playbackSpeed}x
        </button>
      </div>

      {/* Step Description Callout if in Step Mode */}
      {isStepMode && (
        <div className="w-full bg-teal-50 dark:bg-teal-950/40 border-y border-teal-200 dark:border-teal-900/50 px-4 py-2 text-xs flex items-center justify-between text-teal-900 dark:text-teal-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>
              <strong>{steps[currentStepIndex].label}:</strong> {steps[currentStepIndex].cue}
            </span>
          </div>
        </div>
      )}

      {/* Interactive Controls Bar */}
      <div className="w-full px-4 py-2.5 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-1.5">
          {/* Play / Pause */}
          <button
            onClick={handleTogglePlay}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition active:scale-95"
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
          </button>

          {/* Replay */}
          <button
            onClick={handleReplay}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
            aria-label="Replay animation"
            title="Replay from beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Loop toggle */}
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`flex items-center justify-center w-9 h-9 rounded-xl transition ${
              isLooping
                ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}
            aria-label="Toggle loop"
            title={isLooping ? 'Looping enabled' : 'Loop disabled'}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Step-by-Step Mode Navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevStep}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
            title="Previous step"
          >
            ‹ Prev
          </button>
          <button
            onClick={handleNextStep}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-100 dark:bg-teal-900/40 hover:bg-teal-200 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-300 transition flex items-center gap-1"
            title="Next step in movement"
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Step {currentStepIndex + 1}</span>
            <span>›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

