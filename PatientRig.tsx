import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ArnoldPose } from '../../data/sceneTimeline';

export type ArnoldExpression =
  | 'agony'
  | 'gulp'
  | 'shock'
  | 'burning'
  | 'relieved'
  | 'nauseous'
  | 'panic'
  | 'insomnia';

interface PatientRigProps {
  expression: ArnoldExpression;
  pose?: ArnoldPose;
  isXRay?: boolean;
  scale?: number;
  x?: number;
  y?: number;
}

export const PatientRig: React.FC<PatientRigProps> = ({
  expression,
  pose = 'headache',
  isXRay = false,
  scale = 1,
  x = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();

  // Fast Meet-Arnold style squash, stretch & jitter
  const breath = Math.sin(frame * 0.18) * 5;
  const jitterX =
    expression === 'agony' || expression === 'panic' || expression === 'burning'
      ? Math.sin(frame * 1.9) * 3.5
      : 0;
  const headBob = Math.cos(frame * 0.22) * 4;
  const eyeBlink = frame % 65 < 4 ? 0.1 : 1;
  const sweatY = (frame * 7) % 65;

  // Articulated limb angles based on pose
  let leftArmPath = 'M 125 300 Q 65 360 95 450';
  let rightArmPath = 'M 325 300 Q 385 360 355 450';

  if (pose === 'headache') {
    leftArmPath = 'M 125 300 Q 50 200 140 150';
    rightArmPath = 'M 325 300 Q 400 200 310 150';
  } else if (pose === 'swallow') {
    leftArmPath = 'M 125 300 Q 80 380 110 470';
    rightArmPath = 'M 325 300 Q 395 210 255 235';
  } else if (pose === 'burn') {
    leftArmPath = 'M 125 300 Q 75 420 185 450';
    rightArmPath = 'M 325 300 Q 375 420 265 450';
  } else if (pose === 'salute') {
    leftArmPath = 'M 125 300 Q 90 390 115 480';
    rightArmPath = 'M 325 300 Q 410 160 295 125';
  } else if (pose === 'kidney_grab') {
    leftArmPath = 'M 125 300 Q 60 400 155 465';
    rightArmPath = 'M 325 300 Q 390 400 295 465';
  } else if (pose === 'eyedrop') {
    leftArmPath = 'M 125 300 Q 70 220 160 170';
    rightArmPath = 'M 325 300 Q 380 110 265 110';
  } else if (pose === 'heart_clutch') {
    leftArmPath = 'M 125 300 Q 90 360 200 355';
    rightArmPath = 'M 325 300 Q 360 360 245 355';
  } else if (pose === 'flex') {
    leftArmPath = 'M 125 300 Q 45 260 85 185';
    rightArmPath = 'M 325 300 Q 405 260 365 185';
  } else if (pose === 'sniff') {
    leftArmPath = 'M 125 300 Q 90 380 115 470';
    rightArmPath = 'M 325 300 Q 365 250 255 225';
  }

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${x + jitterX}px, ${y + breath}px) scale(${scale})`,
        transformOrigin: 'bottom center',
        width: 450,
        height: 650,
      }}
    >
      <svg width="450" height="650" viewBox="0 0 450 650">
        {/* Floor Shadow */}
        <ellipse cx="225" cy="630" rx="135" ry="18" fill="rgba(0,0,0,0.4)" />

        {/* Legs */}
        <line x1="185" y1="530" x2="175" y2="625" stroke="#1E3A8A" strokeWidth="28" strokeLinecap="round" />
        <line x1="265" y1="530" x2="275" y2="625" stroke="#1E3A8A" strokeWidth="28" strokeLinecap="round" />
        {/* Sneakers */}
        <ellipse cx="165" cy="628" rx="30" ry="14" fill="#F8FAFC" stroke="#1E293B" strokeWidth="6" />
        <ellipse cx="285" cy="628" rx="30" ry="14" fill="#F8FAFC" stroke="#1E293B" strokeWidth="6" />

        {/* Torso: Regular Hoodie vs. Organ X-Ray Cutaway */}
        {!isXRay ? (
          <g id="torso-regular">
            <path
              d="M 120 310 C 120 275, 160 255, 225 255 C 290 255, 330 275, 330 310 L 345 535 C 345 550, 320 555, 225 555 C 130 555, 105 550, 105 535 Z"
              fill="#E11D48"
              stroke="#1E293B"
              strokeWidth="8"
            />
            <line x1="200" y1="270" x2="195" y2="345" stroke="#FFF" strokeWidth="6" strokeLinecap="round" />
            <line x1="250" y1="270" x2="255" y2="345" stroke="#FFF" strokeWidth="6" strokeLinecap="round" />
          </g>
        ) : (
          <g id="torso-xray">
            <path
              d="M 120 310 C 120 275, 160 255, 225 255 C 290 255, 330 275, 330 310 L 345 535 C 345 550, 320 555, 225 555 C 130 555, 105 550, 105 535 Z"
              fill="#090D16"
              stroke="#38BDF8"
              strokeWidth="6"
            />
            {/* Glowing Ribcage */}
            <path d="M 155 305 Q 225 325 295 305" stroke="#38BDF8" strokeWidth="7" fill="none" opacity="0.7" />
            <path d="M 145 350 Q 225 375 305 350" stroke="#38BDF8" strokeWidth="7" fill="none" opacity="0.7" />
            <path d="M 150 395 Q 225 420 300 395" stroke="#38BDF8" strokeWidth="7" fill="none" opacity="0.7" />
            {/* Heart */}
            <circle
              cx="245"
              cy="345"
              r={pose === 'heart_clutch' ? 22 + Math.sin(frame * 0.8) * 5 : 18}
              fill="#EF4444"
            />
            {/* Stomach Vat */}
            <path
              d="M 185 425 C 160 440, 155 485, 195 510 C 245 525, 275 480, 235 435 Z"
              fill={expression === 'burning' ? '#F97316' : '#10B981'}
              stroke="#FFF"
              strokeWidth="3"
            />
            {/* Kidneys */}
            <ellipse cx="165" cy="465" rx="18" ry="28" fill={pose === 'kidney_grab' ? '#A855F7' : '#DC2626'} />
            <ellipse cx="285" cy="465" rx="18" ry="28" fill={pose === 'kidney_grab' ? '#A855F7' : '#DC2626'} />
          </g>
        )}

        {/* Articulated Arms */}
        <path d={leftArmPath} stroke="#E11D48" strokeWidth="26" strokeLinecap="round" fill="none" />
        <path d={leftArmPath} stroke="#1E293B" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.25" />
        <path d={rightArmPath} stroke="#E11D48" strokeWidth="26" strokeLinecap="round" fill="none" />

        {/* Head Group with Bobbing */}
        <g id="head" transform={`translate(0, ${headBob})`}>
          <ellipse
            cx="225"
            cy="175"
            rx="95"
            ry="105"
            fill={expression === 'nauseous' ? '#BBF7D0' : '#FED7AA'}
            stroke="#1E293B"
            strokeWidth="8"
          />

          {/* Signature Ginger Hair Tufts */}
          <path
            d="M 130 145 C 130 85, 170 45, 225 45 C 285 45, 320 85, 320 145 C 320 115, 290 85, 250 80 C 210 75, 170 105, 130 145 Z"
            fill="#EA580C"
            stroke="#1E293B"
            strokeWidth="8"
          />

          {/* Expressive Eyes */}
          {expression === 'agony' && (
            <g>
              <path d="M 165 155 L 200 172 M 200 155 L 165 172" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
              <path d="M 250 155 L 285 172 M 285 155 L 250 172" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
              <circle cx="225" cy="95" r={35 + (frame % 15) * 2} fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="10 6" />
            </g>
          )}

          {expression === 'panic' && (
            <g>
              <ellipse cx="185" cy="160" rx="30" ry={30 * eyeBlink} fill="#FFF" stroke="#1E293B" strokeWidth="6" />
              <circle cx="185" cy="160" r="8" fill="#1E293B" />
              <ellipse cx="265" cy="160" rx="30" ry={30 * eyeBlink} fill="#FFF" stroke="#1E293B" strokeWidth="6" />
              <circle cx="265" cy="160" r="8" fill="#1E293B" />
            </g>
          )}

          {expression === 'insomnia' && (
            <g>
              <ellipse cx="185" cy="160" rx="32" ry={32 * eyeBlink} fill="#FEE2E2" stroke="#DC2626" strokeWidth="6" />
              <circle cx="185" cy="160" r="5" fill="#1E293B" />
              <ellipse cx="265" cy="160" rx="32" ry={32 * eyeBlink} fill="#FEE2E2" stroke="#DC2626" strokeWidth="6" />
              <circle cx="265" cy="160" r="5" fill="#1E293B" />
            </g>
          )}

          {expression !== 'agony' && expression !== 'panic' && expression !== 'insomnia' && (
            <g>
              <ellipse cx="185" cy="160" rx="26" ry={26 * eyeBlink} fill="#FFF" stroke="#1E293B" strokeWidth="6" />
              <circle cx={188 + Math.sin(frame * 0.1) * 4} cy="162" r="10" fill="#1E293B" />
              <ellipse cx="265" cy="160" rx="26" ry={26 * eyeBlink} fill="#FFF" stroke="#1E293B" strokeWidth="6" />
              <circle cx={268 + Math.sin(frame * 0.1) * 4} cy="162" r="10" fill="#1E293B" />
            </g>
          )}

          {/* Mouths */}
          {expression === 'burning' && (
            <g>
              <path d="M 175 225 Q 225 285 275 225 Z" fill="#991B1B" stroke="#1E293B" strokeWidth="6" />
              <text x="225" y="265" textAnchor="middle" fontSize="32">🔥</text>
            </g>
          )}
          {expression === 'gulp' && <ellipse cx="225" cy="240" rx="24" ry="34" fill="#1E293B" />}
          {expression === 'agony' && <path d="M 180 245 Q 225 215 270 245" stroke="#1E293B" strokeWidth="8" fill="none" />}
          {expression === 'shock' && <ellipse cx="225" cy="235" rx="30" ry="38" fill="#000" stroke="#1E293B" strokeWidth="6" />}
          {expression === 'relieved' && <path d="M 180 225 Q 225 265 270 225" stroke="#1E293B" strokeWidth="7" fill="none" strokeLinecap="round" />}
          {expression === 'insomnia' && <path d="M 190 238 Q 225 230 260 238" stroke="#1E293B" strokeWidth="6" fill="none" />}
          {expression === 'nauseous' && <path d="M 175 235 Q 200 255 225 235 Q 250 255 275 235" stroke="#15803D" strokeWidth="7" fill="none" />}
          {expression === 'panic' && <ellipse cx="225" cy="238" rx="34" ry="28" fill="#7F1D1D" stroke="#1E293B" strokeWidth="6" />}

          {/* Animated Sweat Droplets */}
          {(expression === 'agony' || expression === 'panic' || expression === 'burning' || expression === 'nauseous') && (
            <circle cx="135" cy={150 + sweatY} r="7" fill="#38BDF8" />
          )}
        </g>
      </svg>
    </div>
  );
};
