import React from 'react';
import { useCurrentFrame } from 'remotion';

interface SuperbugGymProps {
  stage: 'WEAK_WIPEOUT' | 'GYM_MUTATION';
}

export const SuperbugGym: React.FC<SuperbugGymProps> = ({ stage }) => {
  const frame = useCurrentFrame();
  const liftY = Math.sin(frame * 0.35) * 18;

  return (
    <div
      style={{
        width: 780,
        height: 480,
        background: 'rgba(19, 10, 38, 0.94)',
        border: '4px solid #C084FC',
        borderRadius: 28,
        padding: 32,
        position: 'relative',
      }}
    >
      <div style={{ color: '#C084FC', fontSize: 26, fontWeight: 900, letterSpacing: 1.5, marginBottom: 16 }}>
        {stage === 'WEAK_WIPEOUT'
          ? 'MINUTE 60: WEAK ANTIBIOTIC KILLS ONLY WEAK GERMS'
          : 'SURVIVING GERMS MUTATE INTO DRUG-RESISTANT SUPERBUGS!'}
      </div>

      <svg width="710" height="360" viewBox="0 0 710 360">
        {stage === 'WEAK_WIPEOUT' ? (
          <g>
            {/* Weak germs getting zapped */}
            {[110, 230, 350, 470].map((cx, i) => (
              <g key={i} opacity={0.35}>
                <circle cx={cx} cy="160" r="32" fill="#64748B" stroke="#94A3B8" strokeWidth="4" strokeDasharray="6 4" />
                <text x={cx} y="168" textAnchor="middle" fontSize="24">💀</text>
              </g>
            ))}
            {/* Strong Boss Bacteria surviving */}
            <g transform="translate(590, 160)">
              <circle r="52" fill="#9333EA" stroke="#FACC15" strokeWidth="6" />
              <text x="0" y="12" textAnchor="middle" fontSize="42">😈</text>
            </g>
          </g>
        ) : (
          <g>
            {/* Superbug Lifting Barbell inside Microscopic Gym */}
            <g transform="translate(355, 210)">
              <circle r="75" fill="#7E22CE" stroke="#F43F5E" strokeWidth="8" />
              {/* Armor Spikes */}
              <polygon points="0,-95 -15,-70 15,-70" fill="#FACC15" />
              <polygon points="-90,0 -68,-15 -68,15" fill="#FACC15" />
              <polygon points="90,0 68,-15 68,15" fill="#FACC15" />
              <text x="0" y="18" textAnchor="middle" fontSize="56">🦠</text>

              {/* Animated Barbell */}
              <g transform={`translate(0, ${-95 + liftY})`}>
                <line x1="-160" y1="0" x2="160" y2="0" stroke="#CBD5E1" strokeWidth="10" />
                <rect x="-185" y="-35" width="35" height="70" rx="8" fill="#EF4444" stroke="#000" strokeWidth="4" />
                <rect x="150" y="-35" width="35" height="70" rx="8" fill="#EF4444" stroke="#000" strokeWidth="4" />
                <text x="0" y="-18" textAnchor="middle" fill="#FACC15" fontSize="22" fontWeight="900">
                  RESISTANCE +100%
                </text>
              </g>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
