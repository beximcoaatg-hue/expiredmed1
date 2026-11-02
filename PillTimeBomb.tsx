import React from 'react';
import { useCurrentFrame, spring } from 'remotion';

interface PillTimeBombProps {
  phase: 'SHIELD' | 'STEAM' | 'SPLIT_FORK';
}

export const PillTimeBomb: React.FC<PillTimeBombProps> = ({ phase }) => {
  const frame = useCurrentFrame();
  const pop = spring({ frame, fps: 30, config: { damping: 12, stiffness: 180 } });

  return (
    <div style={{ width: 760, padding: 28, background: 'rgba(15, 23, 42, 0.92)', borderRadius: 28, border: '4px solid #38BDF8' }}>
      {phase === 'SHIELD' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#38BDF8', fontSize: 28, fontWeight: 900, marginBottom: 16 }}>
            POLYMER TIME-RELEASE SHIELD (6-HR CONTROL)
          </div>
          <svg width="680" height="280" viewBox="0 0 680 280">
            <circle
              cx="340"
              cy="140"
              r={105 + Math.sin(frame * 0.2) * 6}
              fill="rgba(56, 189, 248, 0.15)"
              stroke="#38BDF8"
              strokeWidth="5"
              strokeDasharray="12 8"
            />
            <rect x="250" y="105" width="90" height="70" rx="35" fill="#EF4444" stroke="#000" strokeWidth="6" />
            <rect x="340" y="105" width="90" height="70" rx="35" fill="#F8FAFC" stroke="#000" strokeWidth="6" />
            <text x="340" y="150" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0F172A">⏱️ 6 HRS</text>
          </svg>
        </div>
      )}

      {phase === 'STEAM' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#FACC15', fontSize: 28, fontWeight: 900, marginBottom: 16 }}>
            HUMID BATHROOM CABINET: H₂O PENETRATION
          </div>
          <svg width="680" height="280" viewBox="0 0 680 280">
            <rect x="250" y="105" width="180" height="70" rx="35" fill="#F97316" stroke="#DC2626" strokeWidth="6" strokeDasharray="10 5" />
            {Array.from({ length: 14 }).map((_, i) => (
              <circle
                key={i}
                cx={160 + ((i * 35 + frame * 5) % 360)}
                cy={240 - ((frame * 4 + i * 25) % 200)}
                r="9"
                fill="#38BDF8"
                opacity="0.8"
              />
            ))}
          </svg>
        </div>
      )}

      {phase === 'SPLIT_FORK' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, transform: `scale(${pop})` }}>
          <div style={{ background: '#1E293B', border: '4px solid #94A3B8', borderRadius: 20, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 64 }}>🧱</div>
            <div style={{ color: '#F8FAFC', fontSize: 26, fontWeight: 900, marginTop: 8 }}>1. CEMENT BLOCK</div>
            <div style={{ color: '#94A3B8', fontSize: 19, marginTop: 8 }}>0% Absorption — Passes Straight Through</div>
          </div>
          <div style={{ background: '#450A0A', border: '4px solid #EF4444', borderRadius: 20, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 64 }}>💥</div>
            <div style={{ color: '#FCA5A5', fontSize: 26, fontWeight: 900, marginTop: 8 }}>2. COATING CRACKS</div>
            <div style={{ color: '#FECACA', fontSize: 19, marginTop: 8 }}>6-Hr Dose Dumped at Once — Burns Stomach!</div>
          </div>
        </div>
      )}
    </div>
  );
};
