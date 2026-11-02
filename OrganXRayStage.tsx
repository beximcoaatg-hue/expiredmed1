import React from 'react';
import { useCurrentFrame } from 'remotion';

interface OrganXRayStageProps {
  organ: 'STOMACH' | 'KIDNEY' | 'OCULAR' | 'HEART' | 'BRAIN';
  status: 'NORMAL' | 'DAMAGED' | 'CRITICAL';
}

export const OrganXRayStage: React.FC<OrganXRayStageProps> = ({ organ, status }) => {
  const frame = useCurrentFrame();
  const wave = Math.sin(frame * 0.2) * 8;

  return (
    <div
      style={{
        width: 680,
        height: 520,
        background: 'rgba(9, 13, 22, 0.92)',
        border: `4px solid ${status === 'CRITICAL' ? '#EF4444' : status === 'DAMAGED' ? '#F59E0B' : '#38BDF8'}`,
        borderRadius: 28,
        padding: 28,
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.85)',
        overflow: 'hidden',
      }}
    >
      <div style={{ color: '#38BDF8', fontSize: 18, fontWeight: 900, letterSpacing: 2, marginBottom: 12 }}>
        MICROSCOPIC X-RAY FEED // {organ}
      </div>

      {organ === 'STOMACH' && (
        <svg width="620" height="420" viewBox="0 0 620 420">
          {/* Stomach Chamber */}
          <path
            d="M 180 40 C 90 90, 70 290, 220 360 C 390 410, 520 290, 460 150 C 420 70, 290 40, 180 40 Z"
            fill="#1E293B"
            stroke={status === 'CRITICAL' ? '#EF4444' : '#10B981'}
            strokeWidth="10"
          />
          {/* Bubbling Acid Pool */}
          <path
            d={`M 115 ${240 + wave} Q 290 ${220 - wave} 475 ${240 + wave} L 450 355 L 160 355 Z`}
            fill={status === 'CRITICAL' ? '#DC2626' : '#84CC16'}
            opacity="0.8"
          />
          {/* Dissolving Tablet */}
          <g transform={`translate(280, ${210 + wave}) rotate(${frame * 2})`}>
            <rect x="-45" y="-22" width="90" height="44" rx="22" fill="#F8FAFC" stroke="#0F172A" strokeWidth="5" />
            <circle cx="0" cy="0" r={32 + Math.sin(frame * 0.3) * 6} fill="none" stroke="#38BDF8" strokeWidth="4" strokeDasharray="8 6" />
          </g>
        </svg>
      )}

      {organ === 'KIDNEY' && (
        <svg width="620" height="420" viewBox="0 0 620 420">
          <path
            d="M 200 45 C 80 80, 70 300, 210 365 C 350 410, 480 290, 440 160 C 410 75, 290 30, 200 45 Z"
            fill="#4C0519"
            stroke="#F43F5E"
            strokeWidth="9"
          />
          {/* Nephron Filtration Tubes */}
          {[120, 185, 250].map((y, idx) => (
            <g key={idx}>
              <path
                d={`M 150 ${y} Q 290 ${y + 35} 410 ${y}`}
                stroke={status === 'CRITICAL' ? '#A855F7' : '#FDA4AF'}
                strokeWidth="10"
                fill="none"
                strokeDasharray={status === 'CRITICAL' ? '14 10' : 'none'}
              />
              {/* Flowing Molecules */}
              <circle
                cx={150 + ((frame * 6 + idx * 70) % 250)}
                cy={y + 12}
                r="10"
                fill={status === 'CRITICAL' ? '#C084FC' : '#38BDF8'}
              />
            </g>
          ))}
        </svg>
      )}

      {organ === 'OCULAR' && (
        <svg width="620" height="420" viewBox="0 0 620 420">
          <circle cx="310" cy="210" r="145" fill="#F8FAFC" stroke="#1E293B" strokeWidth="10" />
          <circle cx="310" cy="210" r="65" fill="#0284C7" />
          <circle cx="310" cy="210" r="30" fill="#0F172A" />
          {/* Bacteria Colony Swarm */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 + frame * 0.04;
            const rad = 50 + (i % 3) * 32;
            return (
              <ellipse
                key={i}
                cx={310 + Math.cos(angle) * rad}
                cy={210 + Math.sin(angle) * rad}
                rx="14"
                ry="7"
                fill="#22C55E"
                stroke="#14532D"
                strokeWidth="3"
              />
            );
          })}
        </svg>
      )}

      {organ === 'HEART' && (
        <svg width="620" height="420" viewBox="0 0 620 420">
          {/* Constricted Coronary Artery */}
          <path d="M 60 150 L 560 150" stroke="#EF4444" strokeWidth="14" />
          <path d="M 60 270 L 560 270" stroke="#EF4444" strokeWidth="14" />
          {/* Narrowing Bottleneck */}
          <path d="M 220 150 Q 310 205 400 150 Z" fill="#FACC15" />
          <path d="M 220 270 Q 310 215 400 270 Z" fill="#FACC15" />
          {/* Blocked Red Blood Cells */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={i}
              cx={90 + ((frame * 3 + i * 28) % 160)}
              cy={190 + (i % 3) * 20}
              r="14"
              fill="#DC2626"
              stroke="#7F1D1D"
              strokeWidth="3"
            />
          ))}
        </svg>
      )}

      {organ === 'BRAIN' && (
        <svg width="620" height="420" viewBox="0 0 620 420">
          <ellipse cx="310" cy="200" rx="190" ry="135" fill="#F472B6" stroke="#831843" strokeWidth="10" />
          {/* Microglial Pac-Man Cells Chomping Synapses (Hour 48 Autophagy) */}
          {[220, 310, 400].map((cx, i) => (
            <g key={i} transform={`translate(${cx}, ${170 + (i % 2) * 55})`}>
              <circle r="26" fill="#FACC15" stroke="#000" strokeWidth="4" />
              <polygon points="0,0 28,-14 28,14" fill="#090D16" />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
};
