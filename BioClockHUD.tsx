import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface BioClockHUDProps {
  clockText: string;
  threatLevel: 'NORMAL' | 'CAUTION' | 'CRITICAL' | 'BIOHAZARD' | 'LETHAL';
}

export const BioClockHUD: React.FC<BioClockHUDProps> = ({ clockText, threatLevel }) => {
  const frame = useCurrentFrame();

  const colors = {
    NORMAL: '#10B981',
    CAUTION: '#F59E0B',
    CRITICAL: '#EF4444',
    BIOHAZARD: '#8B5CF6',
    LETHAL: '#DC2626',
  };

  const threatColor = colors[threatLevel] || '#EF4444';
  const pulse = Math.sin(frame * 0.2) * 0.08 + 1;

  // ECG line progress
  const ecgShift = (frame * 12) % 300;

  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 50,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        fontFamily: "'Inter', 'Impact', sans-serif",
      }}
    >
      {/* Clock Pill */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.88)',
          border: '3px solid #334155',
          borderRadius: 20,
          padding: '12px 28px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: threatColor,
            transform: `scale(${pulse})`,
            boxShadow: `0 0 16px ${threatColor}`,
          }}
        />
        <div style={{ color: '#F8FAFC', fontSize: 28, fontWeight: 900, letterSpacing: 2 }}>
          {clockText}
        </div>
      </div>

      {/* Threat Badge */}
      <div
        style={{
          background: threatColor,
          color: '#000',
          fontWeight: 900,
          fontSize: 16,
          padding: '8px 18px',
          borderRadius: 12,
          letterSpacing: 2,
          transform: `scale(${threatLevel === 'LETHAL' || threatLevel === 'CRITICAL' ? pulse : 1})`,
          boxShadow: `0 4px 20px ${threatColor}66`,
        }}
      >
        {threatLevel}
      </div>

      {/* Mini ECG Heart Monitor */}
      <div
        style={{
          width: 220,
          height: 48,
          background: 'rgba(15, 23, 42, 0.75)',
          border: '2px solid #334155',
          borderRadius: 14,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
        }}
      >
        <svg width="200" height="40" style={{ transform: `translateX(-${ecgShift}px)` }}>
          <path
            d="M0 20 L20 20 L25 5 L30 35 L35 12 L40 20 L80 20 L85 5 L90 35 L95 12 L100 20 L160 20 L165 5 L170 35 L175 12 L180 20 L240 20 L245 5 L250 35 L255 12 L260 20 L320 20 L325 5 L330 35 L335 12 L340 20 L400 20 L405 5 L410 35 L415 12 L420 20"
            fill="none"
            stroke={threatColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
