import { Pause, Play, RotateCcw } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface HumanAnimatedExerciseProps {
  animationType: string;
  isMom?: boolean;
  speed?: number;
  height?: number;
}

export const HumanAnimatedExercise: React.FC<HumanAnimatedExerciseProps> = ({
  animationType,
  isMom = true,
  speed = 1,
  height = 300
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(speed);
  const [progress, setProgress] = useState<number>(0);

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2800 / playbackSpeed;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = (elapsed % duration) / duration;
      // Smooth sinusoidal oscillation for natural human movement
      const easeProgress = 0.5 - 0.5 * Math.cos(rawProgress * 2 * Math.PI);
      setProgress(easeProgress);

      requestRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      startTimeRef.current = null;
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, duration]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const replay = () => {
    startTimeRef.current = null;
    setProgress(0);
    setIsPlaying(true);
  };
  const cycleSpeed = () => {
    setPlaybackSpeed((prev) => (prev === 1 ? 0.5 : prev === 0.5 ? 1.5 : 1));
  };

  const skinTone = '#f6d5b8';
  const hairColor = isMom ? '#475569' : '#1e1b4b';
  const shirtColor = isMom ? '#0d9488' : '#2563eb';
  const pantsColor = isMom ? '#334155' : '#1e293b';
  const shoeColor = '#0f172a';
  const soleColor = '#ffffff';

  const t = progress; // 0 (start) to 1 (peak)
  const floorY = 245;

  const renderHuman = () => {
    switch (animationType) {
      // 1. SEATED BARBELL OVERHEAD SHOULDER PRESS (Clean, Realistic Overhead Press)
      case 'barbell-press': {
        const chairX = 145;
        const hipX = 155;
        const hipY = 178;
        const shoulderX = 155;
        const shoulderY = 120;
        const headX = 155;
        const headY = 94;

        // Barbell presses vertically from collarbone (Y = 115) up to full overhead extension (Y = 48)
        const barY = 115 - t * 67;
        // Elbows bend down at collarbone (X = 140, Y = 145), extend upward when pressing overhead
        const leftElbowX = 140 + t * 5;
        const leftElbowY = 145 - t * 55;
        const rightElbowX = 170 - t * 5;
        const rightElbowY = 145 - t * 55;

        const leftHandX = 140;
        const rightHandX = 170;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            
            {/* Chair */}
            <g>
              <rect x={chairX - 35} y="115" width="10" height="75" rx="5" fill="#475569" />
              <rect x={chairX - 38} y="180" width="65" height="14" rx="6" fill="#0f766e" />
              <rect x={chairX - 32} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
              <rect x={chairX + 18} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
            </g>

            {/* Legs seated comfortably */}
            <path d={`M ${hipX} ${hipY} L 190 185 L 195 ${floorY - 5}`} fill="none" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="202" cy={floorY - 3} rx="14" ry="5" fill={shoeColor} />

            {/* Torso sitting proud and tall */}
            <path
              d={`M ${hipX - 8} ${hipY + 5} L ${hipX + 12} ${hipY + 5} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 8} ${shoulderY} Z`}
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Head & Hair */}
            <line x1={shoulderX + 2} y1={shoulderY} x2={headX} y2={headY + 12} stroke={skinTone} strokeWidth="8" />
            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            {/* Left Arm (Shoulder -> Elbow -> Hand at bar) */}
            <path
              d={`M ${shoulderX - 4} ${shoulderY + 6} L ${leftElbowX} ${leftElbowY} L ${leftHandX} ${barY}`}
              fill="none"
              stroke={skinTone}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Arm */}
            <path
              d={`M ${shoulderX + 6} ${shoulderY + 6} L ${rightElbowX} ${rightElbowY} L ${rightHandX} ${barY}`}
              fill="none"
              stroke={skinTone}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* THE SYMACTIVE 3-IN-1 BARBELL WITH PLASTIC 2KG & 2.5KG PLATES */}
            <g transform={`translate(155, ${barY})`}>
              {/* Barbell Bar */}
              <line x1="-75" y1="0" x2="75" y2="0" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
              {/* Foam grip center */}
              <rect x="-24" y="-5" width="48" height="10" rx="3" fill="#1e293b" />
              {/* Hands holding bar */}
              <circle cx="-15" cy="0" r="6" fill={skinTone} />
              <circle cx="15" cy="0" r="6" fill={skinTone} />

              {/* Left Plates (2.5kg + 2kg) */}
              <rect x="-65" y="-18" width="8" height="36" rx="3" fill="#0d9488" />
              <rect x="-55" y="-14" width="7" height="28" rx="2" fill="#0f766e" />
              <circle cx="-45" cy="0" r="4" fill="#cbd5e1" />

              {/* Right Plates (2.5kg + 2kg) */}
              <rect x="57" y="-18" width="8" height="36" rx="3" fill="#0d9488" />
              <rect x="48" y="-14" width="7" height="28" rx="2" fill="#0f766e" />
              <circle cx="41" cy="0" r="4" fill="#cbd5e1" />
            </g>

            {/* Callout */}
            <g transform="translate(205, 55)">
              <rect x="0" y="0" width="135" height="36" rx="8" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1" />
              <text x="67" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f766e">
                {t > 0.5 ? 'Press Straight Overhead' : 'Lower to Collarbone'}
              </text>
              <text x="67" y="28" textAnchor="middle" fontSize="9" fill="#64748b">
                Back Supported by Chair
              </text>
            </g>
          </g>
        );
      }

      // 2. SEATED RESISTANCE BAND ROW (Clean, Realistic Tension & Scapular Squeeze)
      case 'band-row': {
        const pull = t * 42; // Hands pull back 42px
        const chairX = 135;
        const hipX = 145;
        const hipY = 180;
        const shoulderX = 152;
        const shoulderY = 120;
        const headX = 152;
        const headY = 94;
        const footX = 230;
        const footY = floorY - 5;
        
        // Arms pull from extended (X = 215) to ribs (X = 173)
        const handX = 215 - pull;
        const handY = 135;
        const elbowX = shoulderX + 26 - pull * 0.7;
        const elbowY = shoulderY + 20;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            
            {/* Chair */}
            <g>
              <rect x={chairX - 35} y="115" width="10" height="75" rx="5" fill="#475569" />
              <rect x={chairX - 38} y="180" width="60" height="14" rx="6" fill="#0f766e" />
              <rect x={chairX - 32} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
              <rect x={chairX + 14} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
            </g>

            {/* Legs extended forward with feet anchored firmly */}
            <path
              d={`M ${hipX} ${hipY} L 190 195 L ${footX} ${footY}`}
              fill="none"
              stroke={pantsColor}
              strokeWidth="15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <ellipse cx={footX + 8} cy={footY - 2} rx="14" ry="6" fill={shoeColor} />

            {/* Torso Sitting Tall */}
            <path
              d={`M ${hipX - 8} ${hipY + 5} L ${hipX + 12} ${hipY + 5} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 8} ${shoulderY} Z`}
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Upper back muscle squeeze indicator */}
            <ellipse cx={shoulderX - 10} cy={shoulderY + 16} rx="12" ry="18" fill="#0d9488" opacity={0.25 + t * 0.6} />

            {/* The Resistance Band: Straight and taut under tension from foot to hands! */}
            <line x1={footX} y1={footY - 8} x2={handX} y2={handY} stroke="#f43f5e" strokeWidth={5 + t * 2} strokeLinecap="round" />
            
            {/* Arms: Upper arm & Forearm with bending elbow */}
            <path
              d={`M ${shoulderX} ${shoulderY + 4} L ${elbowX} ${elbowY} L ${handX} ${handY}`}
              fill="none"
              stroke={skinTone}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sleeve */}
            <line x1={shoulderX} y1={shoulderY + 4} x2={shoulderX + 10} y2={shoulderY + 16} stroke={shirtColor} strokeWidth="12" strokeLinecap="round" />
            {/* Hand grip on band handle */}
            <circle cx={handX} cy={handY} r="6" fill="#1e293b" />

            {/* Head */}
            <line x1={shoulderX + 2} y1={shoulderY} x2={headX} y2={headY + 12} stroke={skinTone} strokeWidth="8" />
            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            <g transform="translate(210, 60)">
              <rect x="0" y="0" width="130" height="36" rx="8" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1" />
              <text x="65" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be185d">
                {t > 0.5 ? 'Pinch Shoulder Blades' : 'Controlled Return'}
              </text>
              <text x="65" y="28" textAnchor="middle" fontSize="9" fill="#64748b">
                Pull Elbows to Ribs
              </text>
            </g>
          </g>
        );
      }

      // 3. RESISTANCE BAND OVERHEAD SHOULDER STRETCH / FLOSS (Requested: Stretches using bands!)
      case 'band-shoulder-stretch': {
        const chairX = 145;
        const hipX = 155;
        const hipY = 178;
        const shoulderX = 155;
        const shoulderY = 120;
        const headX = 155;
        const headY = 94;

        // Band moves from chest up overhead and slightly back for chest stretch
        const bandAngle = -20 + t * 90; // degrees
        const rad = (bandAngle * Math.PI) / 180;
        const armLen = 55;
        const handLeftX = shoulderX - Math.sin(rad) * armLen - 15;
        const handLeftY = shoulderY - Math.cos(rad) * armLen;
        const handRightX = shoulderX + Math.sin(rad) * armLen + 15;
        const handRightY = shoulderY - Math.cos(rad) * armLen;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            {/* Chair */}
            <rect x={chairX - 35} y="115" width="10" height="75" rx="5" fill="#475569" />
            <rect x={chairX - 38} y="180" width="65" height="14" rx="6" fill="#0f766e" />
            <rect x={chairX - 32} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
            <rect x={chairX + 18} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />

            {/* Legs */}
            <path d={`M ${hipX} ${hipY} L 190 185 L 195 ${floorY - 5}`} fill="none" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />
            <ellipse cx="202" cy={floorY - 3} rx="14" ry="5" fill={shoeColor} />

            {/* Torso */}
            <path d={`M ${hipX - 8} ${hipY + 5} L ${hipX + 12} ${hipY + 5} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 8} ${shoulderY} Z`} fill={shirtColor} stroke={shirtColor} strokeWidth="6" strokeLinejoin="round" />

            {/* Head */}
            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            {/* Arms holding the wide band moving overhead */}
            <line x1={shoulderX - 5} y1={shoulderY + 6} x2={handLeftX} y2={handLeftY} stroke={skinTone} strokeWidth="9" strokeLinecap="round" />
            <line x1={shoulderX + 5} y1={shoulderY + 6} x2={handRightX} y2={handRightY} stroke={skinTone} strokeWidth="9" strokeLinecap="round" />

            {/* Red Resistance Band stretched wide */}
            <line x1={handLeftX - 10} y1={handLeftY} x2={handRightX + 10} y2={handRightY} stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />

            <g transform="translate(195, 55)">
              <rect x="0" y="0" width="145" height="36" rx="8" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1" />
              <text x="72" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be185d">
                {t > 0.5 ? 'Open Chest Overhead' : 'Gentle Arm Mobility'}
              </text>
              <text x="72" y="28" textAnchor="middle" fontSize="9" fill="#64748b">
                Breathe Deeply & Relax
              </text>
            </g>
          </g>
        );
      }

      // 4. SEATED BAND HAMSTRING STRETCH (Requested: Stretches using bands!)
      case 'band-hamstring-stretch': {
        const chairX = 135;
        const hipX = 145;
        const hipY = 180;
        const shoulderX = 152 + t * 6; // gentle straight-spine hinge
        const shoulderY = 125 + t * 6;
        const headX = shoulderX + 2;
        const headY = shoulderY - 26;
        const footX = 235;
        const footY = floorY - 6;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            {/* Chair */}
            <rect x={chairX - 35} y="115" width="10" height="75" rx="5" fill="#475569" />
            <rect x={chairX - 38} y="180" width="60" height="14" rx="6" fill="#0f766e" />
            <rect x={chairX - 32} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
            <rect x={chairX + 14} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />

            {/* Straight leg extended forward with heel on floor */}
            <line x1={hipX} y1={hipY} x2={footX} y2={footY} stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />
            <ellipse cx={footX + 6} cy={footY - 2} rx="12" ry="5" fill={shoeColor} />

            {/* Band looped around foot, held gently with straight spine */}
            <line x1={footX} y1={footY - 6} x2={shoulderX + 15} y2={shoulderY + 15} stroke="#f43f5e" strokeWidth="5" />
            <line x1={shoulderX} y1={shoulderY + 6} x2={shoulderX + 18} y2={shoulderY + 18} stroke={skinTone} strokeWidth="9" strokeLinecap="round" />

            {/* Torso straight (zero rounding) */}
            <path d={`M ${hipX - 8} ${hipY + 5} L ${hipX + 12} ${hipY + 5} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 8} ${shoulderY} Z`} fill={shirtColor} stroke={shirtColor} strokeWidth="6" strokeLinejoin="round" />

            {/* Head */}
            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            <g transform="translate(190, 55)">
              <rect x="0" y="0" width="150" height="36" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
              <text x="75" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803d">
                {t > 0.5 ? 'Feel Hamstring Stretch' : 'Flat Spine • No Rounding'}
              </text>
              <text x="75" y="28" textAnchor="middle" fontSize="9" fill="#64748b">
                Band Assists Gentle Stretch
              </text>
            </g>
          </g>
        );
      }

      // 5. RESISTANCE BAND PULL-APARTS (Standing or Seated Horizontal Chest Opener)
      case 'band-pull-apart': {
        const shoulderX = 180;
        const shoulderY = 95;
        const armSpread = 25 + t * 45; // hands separate from 25 to 70px

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            <path d={`M 172 175 L 172 ${floorY - 6}`} stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />
            <path d={`M 188 175 L 188 ${floorY - 6}`} stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />
            <ellipse cx="172" cy={floorY - 3} rx="12" ry="5" fill={shoeColor} />
            <ellipse cx="188" cy={floorY - 3} rx="12" ry="5" fill={shoeColor} />

            <path d={`M 166 175 L 194 175 L 192 95 L 168 95 Z`} fill={shirtColor} stroke={shirtColor} strokeWidth="6" strokeLinejoin="round" />

            {/* Rear shoulder glow */}
            <circle cx="168" cy={shoulderY} r="10" fill="#0d9488" opacity={0.3 + t * 0.6} />
            <circle cx="192" cy={shoulderY} r="10" fill="#0d9488" opacity={0.3 + t * 0.6} />

            {/* Arms extending forward and pulling apart */}
            <line x1={shoulderX - 10} y1={shoulderY + 6} x2={shoulderX - armSpread} y2={shoulderY + 12} stroke={skinTone} strokeWidth="9" strokeLinecap="round" />
            <line x1={shoulderX + 10} y1={shoulderY + 6} x2={shoulderX + armSpread} y2={shoulderY + 12} stroke={skinTone} strokeWidth="9" strokeLinecap="round" />

            {/* Resistance Band */}
            <line x1={shoulderX - armSpread} y1={shoulderY + 12} x2={shoulderX + armSpread} y2={shoulderY + 12} stroke="#f43f5e" strokeWidth={5 + t * 2} strokeLinecap="round" />

            <circle cx="180" cy="62" r="16" fill={skinTone} />
            <path d={`M 164 58 C 164 42, 196 42, 196 58 Z`} fill={hairColor} />
            {isMom && <circle cx={166} cy="54" r="8" fill={hairColor} />}

            <g transform="translate(45, 55)">
              <rect x="0" y="0" width="115" height="34" rx="8" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1" />
              <text x="57" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be185d">
                {t > 0.5 ? 'Pull Band to Chest' : 'Control the Return'}
              </text>
              <text x="57" y="27" textAnchor="middle" fontSize="9" fill="#64748b">
                Shoulder Posture
              </text>
            </g>
          </g>
        );
      }

      // 6. LOW STOOL STEP-UP
      case 'stool-step-up': {
        const stoolX = 185;
        const stoolY = floorY - 26;
        const stoolW = 65;
        const chairX = 265;
        const lift = t * 28;
        const standingLegX = 150 + t * 40;
        const hipX = 150 + t * 40;
        const hipY = 135 - lift;
        const shoulderX = hipX + 2;
        const shoulderY = hipY - 55;
        const headX = shoulderX + 2;
        const headY = shoulderY - 26;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            
            <g>
              <rect x={stoolX} y={stoolY} width={stoolW} height="10" rx="4" fill="#f59e0b" />
              <rect x={stoolX} y={stoolY + 3} width={stoolW} height="3" fill="#d97706" />
              <rect x={stoolX + 4} y={stoolY + 10} width="7" height={floorY - (stoolY + 10)} rx="2" fill="#78350f" />
              <rect x={stoolX + stoolW - 11} y={stoolY + 10} width="7" height={floorY - (stoolY + 10)} rx="2" fill="#78350f" />
            </g>

            <g opacity="0.8">
              <rect x={chairX} y="85" width="8" height="105" rx="4" fill="#64748b" />
              <rect x={chairX - 5} y="190" width="45" height="10" rx="4" fill="#0f766e" />
              <rect x={chairX + 2} y="200" width="6" height={floorY - 200} rx="2" fill="#94a3b8" />
              <rect x={chairX + 32} y="200" width="6" height={floorY - 200} rx="2" fill="#94a3b8" />
            </g>

            <path
              d={`M ${hipX} ${hipY} L ${stoolX + 25} ${stoolY - 45 + (1 - t) * 15} L ${stoolX + 25} ${stoolY - 4}`}
              fill="none"
              stroke={pantsColor}
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <ellipse cx={stoolX + 25} cy={stoolY - 3} rx="13" ry="5" fill={shoeColor} />

            <path
              d={`M ${hipX - 5} ${hipY} L ${standingLegX - 15} ${floorY - 45 - lift * 0.5} L ${standingLegX - 15} ${floorY - 4}`}
              fill="none"
              stroke={pantsColor}
              strokeWidth="14"
              strokeLinecap="round"
            />
            <ellipse cx={standingLegX - 15} cy={floorY - 2} rx="13" ry="5" fill={shoeColor} />

            <path
              d={`M ${hipX - 8} ${hipY + 5} L ${hipX + 12} ${hipY + 5} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 8} ${shoulderY} Z`}
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="6"
              strokeLinejoin="round"
            />

            <path
              d={`M ${shoulderX} ${shoulderY + 6} L ${chairX - 15} ${shoulderY + 25} L ${chairX} 98`}
              fill="none"
              stroke={skinTone}
              strokeWidth="10"
              strokeLinecap="round"
            />
            <line x1={shoulderX} y1={shoulderY + 6} x2={shoulderX + 16} y2={shoulderY + 16} stroke={shirtColor} strokeWidth="12" strokeLinecap="round" />

            <line x1={shoulderX + 2} y1={shoulderY} x2={headX} y2={headY + 10} stroke={skinTone} strokeWidth="8" />
            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            <g transform="translate(45, 50)">
              <rect x="0" y="0" width="130" height="34" rx="8" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
              <text x="65" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">
                {t > 0.5 ? 'Step Firmly on Stool' : 'Step Down Controlled'}
              </text>
              <text x="65" y="27" textAnchor="middle" fontSize="9" fill="#78350f">
                Press Through Heel
              </text>
            </g>
          </g>
        );
      }

      // 7. BARBELL ROMANIAN DEADLIFT / HIP HINGE
      case 'barbell-deadlift': {
        const hinge = t * 35;
        const hipX = 165 + hinge * 0.4;
        const hipY = 140 + hinge * 0.3;
        const shoulderX = hipX - 25 - hinge * 0.2;
        const shoulderY = hipY - 45 + hinge * 0.5;
        const barY = 150 + hinge * 1.3;
        const headX = shoulderX + 2;
        const headY = shoulderY - 24;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            <path d={`M 165 ${floorY - 6} L 170 180 L ${hipX - 5} ${hipY}`} stroke={pantsColor} strokeWidth="16" strokeLinecap="round" />
            <path d={`M 185 ${floorY - 6} L 180 180 L ${hipX + 10} ${hipY}`} stroke={pantsColor} strokeWidth="16" strokeLinecap="round" />
            <ellipse cx="165" cy={floorY - 3} rx="12" ry="5" fill={shoeColor} />
            <ellipse cx="185" cy={floorY - 3} rx="12" ry="5" fill={shoeColor} />

            {/* Flat spine */}
            <path
              d={`M ${hipX - 8} ${hipY} L ${hipX + 12} ${hipY} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 8} ${shoulderY} Z`}
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="6"
              strokeLinejoin="round"
            />

            <line x1={shoulderX} y1={shoulderY + 6} x2="160" y2={barY} stroke={skinTone} strokeWidth="10" strokeLinecap="round" />
            <line x1={shoulderX + 8} y1={shoulderY + 6} x2="190" y2={barY} stroke={skinTone} strokeWidth="10" strokeLinecap="round" />

            <g transform={`translate(175, ${barY})`}>
              <line x1="-80" y1="0" x2="80" y2="0" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              <rect x="-25" y="-5" width="50" height="10" rx="3" fill="#1e293b" />
              <rect x="-70" y="-18" width="8" height="36" rx="3" fill="#0d9488" />
              <rect x="-60" y="-14" width="7" height="28" rx="2" fill="#0f766e" />
              <circle cx="-50" cy="0" r="4" fill="#cbd5e1" />
              <rect x="62" y="-18" width="8" height="36" rx="3" fill="#0d9488" />
              <rect x="53" y="-14" width="7" height="28" rx="2" fill="#0f766e" />
              <circle cx="46" cy="0" r="4" fill="#cbd5e1" />
            </g>

            <circle cx={headX} cy={headY} r="15" fill={skinTone} />
            <path d={`M ${headX - 15} ${headY - 2} C ${headX - 15} ${headY - 17}, ${headX + 13} ${headY - 19}, ${headX + 15} ${headY - 4} Z`} fill={hairColor} />

            <g transform="translate(45, 45)">
              <rect x="0" y="0" width="125" height="34" rx="8" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1" />
              <text x="62" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f766e">
                {t > 0.5 ? 'Hips Back • Flat Spine' : 'Drive Hips to Stand'}
              </text>
              <text x="62" y="27" textAnchor="middle" fontSize="9" fill="#64748b">
                Feel Hamstrings Work
              </text>
            </g>
          </g>
        );
      }

      // 8. CHAIR SIT-TO-STAND
      case 'chair-sit-to-stand': {
        const chairX = 135;
        const hipX = 155 + t * 25;
        const hipY = 178 - t * 55;
        const kneeX = 195 - t * 10;
        const kneeY = 182 - t * 20;
        const ankleX = 195;
        const ankleY = floorY - 5;
        const torsoHinge = (1 - t) * 8;
        const shoulderX = hipX + torsoHinge + 5;
        const shoulderY = hipY - 55;
        const headX = shoulderX + 3;
        const headY = shoulderY - 26;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            <rect x={chairX - 35} y="115" width="10" height="75" rx="5" fill="#475569" />
            <rect x={chairX - 38} y="180" width="65" height="14" rx="6" fill="#0f766e" />
            <rect x={chairX - 38} y="186" width="65" height="6" rx="2" fill="#115e59" />
            <rect x={chairX - 32} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
            <rect x={chairX + 18} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />

            <path d={`M ${hipX - 6} ${hipY} Q ${kneeX - 6} ${kneeY} ${ankleX - 6} ${ankleY}`} fill="none" stroke="#1e293b" strokeWidth="14" strokeLinecap="round" />
            <path d={`M ${hipX} ${hipY} Q ${(hipX + kneeX) / 2 + 5} ${(hipY + kneeY) / 2} ${kneeX} ${kneeY}`} fill="none" stroke={pantsColor} strokeWidth="16" strokeLinecap="round" />
            <path d={`M ${kneeX} ${kneeY} Q ${(kneeX + ankleX) / 2 + 4} ${(kneeY + ankleY) / 2} ${ankleX} ${ankleY}`} fill="none" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
            <ellipse cx={ankleX + 8} cy={ankleY} rx="14" ry="6" fill={shoeColor} />

            <path d={`M ${hipX - 8} ${hipY + 5} L ${hipX + 12} ${hipY + 5} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 8} ${shoulderY} Z`} fill={shirtColor} stroke={shirtColor} strokeWidth="6" strokeLinejoin="round" />
            <path d={`M ${shoulderX} ${shoulderY + 6} Q ${shoulderX + 18} ${shoulderY + 30} ${kneeX - 4} ${kneeY - 12}`} fill="none" stroke={skinTone} strokeWidth="10" strokeLinecap="round" />
            <line x1={shoulderX - 2} y1={shoulderY + 4} x2={shoulderX + 8} y2={shoulderY + 18} stroke={shirtColor} strokeWidth="12" strokeLinecap="round" />

            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            <g transform="translate(240, 70)">
              <rect x="0" y="0" width="105" height="38" rx="10" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1" />
              <text x="52" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f766e">
                {t > 0.5 ? 'Standing Tall' : 'Seated in Chair'}
              </text>
              <text x="52" y="30" textAnchor="middle" fontSize="10" fill="#64748b">
                Neutral Spine
              </text>
            </g>
          </g>
        );
      }

      // 9. CALF RAISES
      case 'calf-raises': {
        const chairX = 230;
        const lift = t * 24;
        const ankleX = 145;
        const ankleY = floorY - 8 - lift;
        const ballFootX = 160;
        const kneeX = 148;
        const kneeY = ankleY - 58;
        const hipX = 148;
        const hipY = kneeY - 60;
        const shoulderX = 150;
        const shoulderY = hipY - 55;
        const headX = 150;
        const headY = shoulderY - 26;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            <rect x={chairX} y="75" width="10" height="115" rx="5" fill="#475569" />
            <rect x={chairX - 5} y="185" width="55" height="12" rx="4" fill="#0f766e" />
            <rect x={chairX + 2} y="195" width="7" height={floorY - 195} rx="3" fill="#64748b" />
            <rect x={chairX + 42} y="195" width="7" height={floorY - 195} rx="3" fill="#64748b" />

            <path d={`M ${hipX} ${hipY} L ${kneeX} ${kneeY} L ${ankleX} ${ankleY}`} fill="none" stroke={pantsColor} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx={ankleX + 2} cy={ankleY - 26} rx="12" ry="18" fill="#10b981" opacity={0.3 + t * 0.55} />
            <path d={`M ${ankleX} ${ankleY} L ${ballFootX} ${floorY - 4} L ${ballFootX + 16} ${floorY - 4}`} fill="none" stroke={shoeColor} strokeWidth="12" strokeLinecap="round" />

            <path d={`M ${hipX - 9} ${hipY + 5} L ${hipX + 11} ${hipY + 5} L ${shoulderX + 13} ${shoulderY} L ${shoulderX - 9} ${shoulderY} Z`} fill={shirtColor} stroke={shirtColor} strokeWidth="6" strokeLinejoin="round" />
            <path d={`M ${shoulderX} ${shoulderY + 6} L ${chairX - 10} ${shoulderY + 22} L ${chairX} 95`} fill="none" stroke={skinTone} strokeWidth="10" strokeLinecap="round" />
            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            <g transform={`translate(60, ${floorY - 30 - lift})`}>
              <line x1="0" y1="15" x2="0" y2="-10" stroke="#10b981" strokeWidth="3" />
              <polygon points="0,-16 -5,-8 5,-8" fill="#10b981" />
              <text x="12" y="2" fontSize="11" fontWeight="bold" fill="#047857">
                {t > 0.5 ? 'Heels High' : 'Smooth Return'}
              </text>
            </g>
          </g>
        );
      }

      // 10. WALL PUSH-UPS
      case 'wall-push-up': {
        const wallX = 295;
        const lean = t * 36;
        const ankleX = 110;
        const ankleY = floorY - 5;
        const hipX = 145 + lean;
        const hipY = 175 - lean * 0.15;
        const shoulderX = 180 + lean;
        const shoulderY = 115 - lean * 0.25;
        const headX = shoulderX + 16;
        const headY = shoulderY - 14;
        const handX = wallX;
        const handY = 120;
        const elbowX = (shoulderX + handX) / 2 - 4;
        const elbowY = (shoulderY + handY) / 2 + t * 24;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            <rect x={wallX} y="25" width="40" height={floorY - 25} fill="#cbd5e1" />
            <path d={`M ${ankleX} ${ankleY} L ${hipX} ${hipY}`} fill="none" stroke={pantsColor} strokeWidth="16" strokeLinecap="round" />
            <ellipse cx={ankleX + 6} cy={ankleY + 1} rx="12" ry="5" fill={shoeColor} />

            <path d={`M ${hipX - 6} ${hipY} L ${hipX + 10} ${hipY} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 6} ${shoulderY} Z`} fill={shirtColor} stroke={shirtColor} strokeWidth="6" strokeLinejoin="round" />
            <path d={`M ${shoulderX} ${shoulderY + 6} L ${elbowX} ${elbowY} L ${handX} ${handY}`} fill="none" stroke={skinTone} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={headX} cy={headY} r="15" fill={skinTone} />
            <path d={`M ${headX - 15} ${headY - 2} C ${headX - 15} ${headY - 17}, ${headX + 13} ${headY - 19}, ${headX + 15} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 13} cy={headY - 7} r="7" fill={hairColor} />}

            <g transform="translate(50, 45)">
              <rect x="0" y="0" width="130" height="34" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
              <text x="65" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803d">
                {t > 0.5 ? 'Lower to Wall' : 'Press Away Smoothly'}
              </text>
              <text x="65" y="27" textAnchor="middle" fontSize="9" fill="#64748b">
                Rigid Plank
              </text>
            </g>
          </g>
        );
      }

      // 11. GLUTE BRIDGES
      case 'glute-bridge': {
        const matY = 215;
        const hipRise = t * 50;
        const shoulderX = 115;
        const shoulderY = matY - 12;
        const hipX = 175;
        const hipY = matY - 12 - hipRise;
        const kneeX = 235;
        const kneeY = matY - 50;
        const footX = 255;
        const footY = matY;

        return (
          <g>
            <rect x="40" y={matY} width="260" height="12" rx="4" fill="#0d9488" opacity="0.8" />
            <rect x="60" y={matY - 10} width="40" height="10" rx="4" fill="#e2e8f0" />

            <path d={`M ${hipX} ${hipY} L ${kneeX} ${kneeY} L ${footX} ${footY}`} fill="none" stroke={pantsColor} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx={footX + 4} cy={footY} rx="12" ry="5" fill={shoeColor} />

            <path d={`M ${shoulderX - 5} ${shoulderY - 5} L ${shoulderX - 5} ${shoulderY + 10} L ${hipX + 5} ${hipY + 8} L ${hipX + 5} ${hipY - 8} Z`} fill={shirtColor} stroke={shirtColor} strokeWidth="6" strokeLinejoin="round" />
            <ellipse cx={hipX} cy={hipY + 6} rx="15" ry="12" fill="#10b981" opacity={0.3 + t * 0.6} />
            <line x1={shoulderX + 5} y1={shoulderY + 5} x2={shoulderX + 50} y2={matY - 2} stroke={skinTone} strokeWidth="9" strokeLinecap="round" />

            <circle cx="80" cy={matY - 16} r="15" fill={skinTone} />
            <path d={`M 66 ${matY - 20} C 66 ${matY - 32}, 94 ${matY - 32}, 95 ${matY - 20} Z`} fill={hairColor} />

            <g transform="translate(100, 50)">
              <rect x="0" y="0" width="160" height="34" rx="8" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1" />
              <text x="80" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f766e">
                {t > 0.5 ? 'Hold & Squeeze Glutes' : 'Lower Hips Gently'}
              </text>
              <text x="80" y="27" textAnchor="middle" fontSize="9" fill="#64748b">
                Do Not Over-Arch
              </text>
            </g>
          </g>
        );
      }

      // 12. DUMBBELL BICEPS CURL
      case 'biceps-curl': {
        const curlAngle = 25 + t * 115;
        const rad = (curlAngle * Math.PI) / 180;
        const shoulderX = 180;
        const shoulderY = 90;
        const elbowX = 180;
        const elbowY = 150;
        const forearmLen = 50;
        const handX = elbowX + Math.sin(rad) * forearmLen;
        const handY = elbowY + Math.cos(rad) * forearmLen;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            <path d={`M 172 175 L 172 ${floorY - 6}`} stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />
            <path d={`M 188 175 L 188 ${floorY - 6}`} stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />
            <ellipse cx="172" cy={floorY - 3} rx="12" ry="5" fill={shoeColor} />
            <ellipse cx="188" cy={floorY - 3} rx="12" ry="5" fill={shoeColor} />

            <path d={`M 166 175 L 194 175 L 192 90 L 168 90 Z`} fill={shirtColor} stroke={shirtColor} strokeWidth="6" strokeLinejoin="round" />
            <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke={skinTone} strokeWidth="11" strokeLinecap="round" />
            <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke={skinTone} strokeWidth="10" strokeLinecap="round" />

            <g transform={`translate(${handX}, ${handY}) rotate(${-curlAngle + 90})`}>
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
              <rect x="-24" y="-12" width="7" height="24" rx="3" fill="#0d9488" />
              <rect x="17" y="-12" width="7" height="24" rx="3" fill="#0d9488" />
            </g>

            <circle cx="180" cy="58" r="16" fill={skinTone} />
            <path d={`M 164 54 C 164 38, 196 38, 196 54 Z`} fill={hairColor} />
            {isMom && <circle cx="166" cy="50" r="8" fill={hairColor} />}

            <g transform="translate(45, 60)">
              <rect x="0" y="0" width="105" height="34" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
              <text x="52" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">
                {t > 0.5 ? 'Squeeze Biceps' : '3-Sec Slow Lower'}
              </text>
              <text x="52" y="27" textAnchor="middle" fontSize="9" fill="#64748b">
                2kg or 2.5kg Plate
              </text>
            </g>
          </g>
        );
      }

      // 13. SQUATS / GOBLET SQUAT
      case 'squat':
      case 'goblet-squat': {
        const squatDepth = t * 45;
        const hipX = 160 - squatDepth * 0.4;
        const hipY = 145 + squatDepth;
        const kneeX = 190 + squatDepth * 0.2;
        const kneeY = 195;
        const footX = 185;
        const shoulderX = hipX + 15 + squatDepth * 0.25;
        const shoulderY = hipY - 55;
        const headX = shoulderX + 4;
        const headY = shoulderY - 24;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            <path d={`M ${footX} ${floorY - 6} L ${kneeX} ${kneeY} L ${hipX} ${hipY}`} fill="none" stroke={pantsColor} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx={footX + 4} cy={floorY - 3} rx="13" ry="5" fill={shoeColor} />

            <path d={`M ${hipX - 8} ${hipY} L ${hipX + 12} ${hipY} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 8} ${shoulderY} Z`} fill={shirtColor} stroke={shirtColor} strokeWidth="6" strokeLinejoin="round" />
            <g transform={`translate(${shoulderX + 14}, ${shoulderY + 16})`}>
              <rect x="-6" y="-12" width="12" height="24" rx="3" fill="#334155" />
              <rect x="-10" y="-16" width="20" height="6" rx="2" fill="#0d9488" />
              <rect x="-10" y="10" width="20" height="6" rx="2" fill="#0d9488" />
              <circle cx="0" cy="0" r="7" fill={skinTone} />
            </g>

            <circle cx={headX} cy={headY} r="15" fill={skinTone} />
            <path d={`M ${headX - 15} ${headY - 2} C ${headX - 15} ${headY - 17}, ${headX + 13} ${headY - 19}, ${headX + 15} ${headY - 4} Z`} fill={hairColor} />

            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="115" height="34" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
              <text x="57" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">
                {t > 0.5 ? 'Thighs Parallel' : 'Drive Up to Stand'}
              </text>
              <text x="57" y="27" textAnchor="middle" fontSize="9" fill="#64748b">
                Chest Proud
              </text>
            </g>
          </g>
        );
      }

      // 14. SEATED TORSO SIDE REACH / LAT OPENER
      case 'seated-side-reach': {
        const chairX = 145;
        const hipX = 155;
        const hipY = 180;
        const curve = t * 18;
        const shoulderX = 155 - curve * 0.4;
        const shoulderY = 120;
        const headX = shoulderX - curve * 0.3;
        const headY = 94;
        const rightHandX = shoulderX - 10 - curve * 1.5;
        const rightHandY = 65 + (1 - t) * 45;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            
            {/* Chair */}
            <g>
              <rect x={chairX - 35} y="115" width="10" height="75" rx="5" fill="#475569" />
              <rect x={chairX - 38} y="180" width="65" height="14" rx="6" fill="#0f766e" />
              <rect x={chairX - 32} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
              <rect x={chairX + 18} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
            </g>

            {/* Legs seated comfortably */}
            <path d={`M ${hipX} ${hipY} L 195 185 L 195 ${floorY - 5}`} fill="none" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="203" cy={floorY - 3} rx="13" ry="5" fill={shoeColor} />

            {/* Torso with gentle side curve */}
            <path
              d={`M ${hipX - 10} ${hipY + 4} L ${hipX + 12} ${hipY + 4} L ${shoulderX + 12} ${shoulderY} L ${shoulderX - 10} ${shoulderY} Z`}
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Lateral rib stretch glow */}
            <ellipse cx={shoulderX + 14} cy={shoulderY + 22} rx="10" ry="20" fill="#38bdf8" opacity={0.25 + t * 0.5} />

            {/* Left arm resting on chair arm / thigh for support */}
            <path d={`M ${shoulderX - 8} ${shoulderY + 6} L ${chairX - 20} 150 L ${chairX - 15} 175`} fill="none" stroke={skinTone} strokeWidth="9" strokeLinecap="round" />
            
            {/* Right arm reaching overhead in smooth gentle arch */}
            <path d={`M ${shoulderX + 8} ${shoulderY + 4} Q ${shoulderX + 18} 75 ${rightHandX} ${rightHandY}`} fill="none" stroke={skinTone} strokeWidth="9" strokeLinecap="round" />
            <line x1={shoulderX + 8} y1={shoulderY + 4} x2={shoulderX + 12} y2={shoulderY - 8} stroke={shirtColor} strokeWidth="12" strokeLinecap="round" />
            <circle cx={rightHandX} cy={rightHandY} r="5" fill={skinTone} />

            {/* Head */}
            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            <g transform="translate(195, 50)">
              <rect x="0" y="0" width="145" height="36" rx="8" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
              <text x="72" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0284c7">
                {t > 0.5 ? 'Gentle Side Rib Reach' : 'Both Hips Firm On Seat'}
              </text>
              <text x="72" y="28" textAnchor="middle" fontSize="9" fill="#64748b">
                Zero Spinal Twisting
              </text>
            </g>
          </g>
        );
      }

      // 15. SEATED FIGURE-4 HIP & GLUTE STRETCH
      case 'figure4-stretch': {
        const chairX = 145;
        const hipX = 155;
        const hipY = 180;
        const hinge = t * 10;
        const shoulderX = 155 + hinge * 0.8;
        const shoulderY = 120 + hinge * 0.2;
        const headX = shoulderX + 2;
        const headY = shoulderY - 26;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            
            {/* Chair */}
            <g>
              <rect x={chairX - 35} y="115" width="10" height="75" rx="5" fill="#475569" />
              <rect x={chairX - 38} y="180" width="65" height="14" rx="6" fill="#0f766e" />
              <rect x={chairX - 32} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
              <rect x={chairX + 18} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
            </g>

            {/* Left leg planted on floor */}
            <path d={`M ${hipX - 5} ${hipY} L 195 185 L 195 ${floorY - 5}`} fill="none" stroke="#1e293b" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="203" cy={floorY - 3} rx="12" ry="5" fill={shoeColor} />

            {/* Right leg in Figure-4 position (ankle resting across left knee) */}
            <path d={`M ${hipX + 5} ${hipY} L 170 165 L 195 182`} fill="none" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="198" cy="182" rx="10" ry="5" fill={shoeColor} />

            {/* Hip glow indicator */}
            <ellipse cx={hipX + 8} cy={hipY - 2} rx="16" ry="14" fill="#a855f7" opacity={0.25 + t * 0.55} />

            {/* Torso straight & tall */}
            <path
              d={`M ${hipX - 10} ${hipY + 4} L ${hipX + 12} ${hipY + 4} L ${shoulderX + 12} ${shoulderY} L ${shoulderX - 10} ${shoulderY} Z`}
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Hands gently resting on shin/knee */}
            <path d={`M ${shoulderX} ${shoulderY + 6} L 175 155 L 185 175`} fill="none" stroke={skinTone} strokeWidth="9" strokeLinecap="round" />

            {/* Head */}
            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            <g transform="translate(195, 50)">
              <rect x="0" y="0" width="145" height="36" rx="8" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1" />
              <text x="72" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">
                {t > 0.5 ? 'Gentle Hip & Glute Release' : 'Sit Tall • Flat Spine'}
              </text>
              <text x="72" y="28" textAnchor="middle" fontSize="9" fill="#64748b">
                Ankle Crossed Over Knee
              </text>
            </g>
          </g>
        );
      }

      // 16. SEATED GENTLE SIDE NECK & TRAP RELEASE
      case 'neck-release': {
        const chairX = 145;
        const hipX = 155;
        const hipY = 180;
        const shoulderX = 155;
        const shoulderY = 120;
        const tiltAngle = (t - 0.5) * 28;
        const headX = shoulderX;
        const headY = 94;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            
            {/* Chair */}
            <g>
              <rect x={chairX - 35} y="115" width="10" height="75" rx="5" fill="#475569" />
              <rect x={chairX - 38} y="180" width="65" height="14" rx="6" fill="#0f766e" />
              <rect x={chairX - 32} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
              <rect x={chairX + 18} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
            </g>

            {/* Legs */}
            <path d={`M ${hipX} ${hipY} L 195 185 L 195 ${floorY - 5}`} fill="none" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="203" cy={floorY - 3} rx="13" ry="5" fill={shoeColor} />

            {/* Torso upright with shoulders relaxed down */}
            <path
              d={`M ${hipX - 10} ${hipY + 4} L ${hipX + 12} ${hipY + 4} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 10} ${shoulderY} Z`}
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Arms resting softly in lap */}
            <path d={`M ${shoulderX - 4} ${shoulderY + 6} L 180 145 L 190 175`} fill="none" stroke={skinTone} strokeWidth="9" strokeLinecap="round" />

            {/* Neck stretch highlight */}
            <ellipse cx={shoulderX - 8} cy={shoulderY - 10} rx="8" ry="14" fill="#06b6d4" opacity={0.3 + Math.abs(t - 0.5) * 0.8} />

            {/* Head tilted smoothly */}
            <g transform={`translate(${headX}, ${headY}) rotate(${tiltAngle})`}>
              <circle cx="0" cy="0" r="16" fill={skinTone} />
              <path d="M -16 -2 C -16 -18, 14 -20, 16 -4 Z" fill={hairColor} />
              {isMom && <circle cx="-14" cy="-8" r="8" fill={hairColor} />}
            </g>

            <g transform="translate(195, 50)">
              <rect x="0" y="0" width="145" height="36" rx="8" fill="#ecfeff" stroke="#a5f3fc" strokeWidth="1" />
              <text x="72" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0891b2">
                Ear Toward Shoulder
              </text>
              <text x="72" y="28" textAnchor="middle" fontSize="9" fill="#64748b">
                Relieves Neck & Head Tension
              </text>
            </g>
          </g>
        );
      }

      // 17. SEATED GENTLE PELVIC ROCKING & SPINE LENGTHENING
      case 'pelvic-tilt': {
        const chairX = 145;
        const rock = (t - 0.5) * 14;
        const hipX = 155 + rock * 0.5;
        const hipY = 180;
        const shoulderX = 155 - rock * 0.4;
        const shoulderY = 120;
        const headX = shoulderX;
        const headY = 94;

        return (
          <g>
            <rect x="20" y={floorY} width="320" height="15" rx="3" fill="#e2e8f0" />
            
            {/* Chair */}
            <g>
              <rect x={chairX - 35} y="115" width="10" height="75" rx="5" fill="#475569" />
              <rect x={chairX - 38} y="180" width="65" height="14" rx="6" fill="#0f766e" />
              <rect x={chairX - 32} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
              <rect x={chairX + 18} y="194" width="7" height={floorY - 194} rx="3" fill="#64748b" />
            </g>

            {/* Legs */}
            <path d={`M ${hipX} ${hipY} L 195 185 L 195 ${floorY - 5}`} fill="none" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="203" cy={floorY - 3} rx="13" ry="5" fill={shoeColor} />

            {/* Torso rocking gently between mild anterior and posterior pelvic tilt */}
            <path
              d={`M ${hipX - 10} ${hipY + 4} L ${hipX + 12} ${hipY + 4} L ${shoulderX + 14} ${shoulderY} L ${shoulderX - 10} ${shoulderY} Z`}
              fill={shirtColor}
              stroke={shirtColor}
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Pelvic glow */}
            <ellipse cx={hipX} cy={hipY + 2} rx="16" ry="12" fill="#10b981" opacity={0.3 + Math.abs(t - 0.5) * 0.7} />

            {/* Hands on thighs */}
            <path d={`M ${shoulderX} ${shoulderY + 6} L 180 150 L 190 180`} fill="none" stroke={skinTone} strokeWidth="9" strokeLinecap="round" />

            {/* Head */}
            <circle cx={headX} cy={headY} r="16" fill={skinTone} />
            <path d={`M ${headX - 16} ${headY - 2} C ${headX - 16} ${headY - 18}, ${headX + 14} ${headY - 20}, ${headX + 16} ${headY - 4} Z`} fill={hairColor} />
            {isMom && <circle cx={headX - 14} cy={headY - 8} r="8" fill={hairColor} />}

            <g transform="translate(195, 50)">
              <rect x="0" y="0" width="145" height="36" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
              <text x="72" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803d">
                {t > 0.5 ? 'Gentle Anterior Tilt' : 'Gentle Posterior Rock'}
              </text>
              <text x="72" y="28" textAnchor="middle" fontSize="9" fill="#64748b">
                Lower Back Decompression
              </text>
            </g>
          </g>
        );
      }

      // 18. DEFAULT / BOX BREATHING
      case 'box-breathing':
      default: {
        const scale = 0.8 + t * 0.4;
        const phaseName = 
          t < 0.25 ? 'Breathe In Slowly (4s)' : 
          t < 0.5 ? 'Hold Breath (4s)' : 
          t < 0.75 ? 'Exhale Gently (4s)' : 'Rest & Relax (4s)';

        return (
          <g>
            <circle cx="180" cy="130" r="85" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="3" />
            <circle cx="180" cy="130" r={55 * scale} fill="#2dd4bf" opacity="0.6" />
            <circle cx="180" cy="130" r="16" fill="#ffffff" stroke="#0d9488" strokeWidth="3" />
            <text x="180" y="135" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f766e">
              {Math.round(4 - (t % 0.25) * 16) || 4}
            </text>
            <text x="180" y="240" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0d9488">
              {phaseName}
            </text>
          </g>
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden select-none">
      <div className="w-full relative flex items-center justify-center bg-gradient-to-b from-slate-50/80 to-slate-100/50 dark:from-slate-900 dark:to-slate-950 p-2">
        <svg
          viewBox="0 0 360 270"
          className="w-full max-w-sm h-auto"
          style={{ maxHeight: height }}
        >
          {renderHuman()}
        </svg>

        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          <span>{isPlaying ? 'Animated Guide' : 'Paused'}</span>
        </div>

        <button
          onClick={cycleSpeed}
          className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-slate-700 px-2.5 py-1 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-400 border border-slate-200 dark:border-slate-700 transition"
        >
          {playbackSpeed}x Speed
        </button>
      </div>

      <div className="w-full px-4 py-2.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <button
          onClick={togglePlay}
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlaying ? 'Pause Motion' : 'Play Motion'}</span>
        </button>

        <button
          onClick={replay}
          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay</span>
        </button>
      </div>
    </div>
  );
};
