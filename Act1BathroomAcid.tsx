import React from 'react';
import { interpolate, useCurrentFrame, spring } from 'remotion';
import { PatientRig } from '../rigs/PatientRig';

export const Act1BathroomAcid: React.FC = () => {
  const frame = useCurrentFrame();

  // Swallowing zoom: frame 198+
  const zoom = interpolate(frame, [0, 198, 246, 500], [1, 1, 2.8, 2.8], {
    extrapolateRight: 'clamp',
  });
  const panX = interpolate(frame, [198, 246], [0, -150], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [198, 246], [0, 200], { extrapolateRight: 'clamp' });

  // Pill animation
  const pillY = interpolate(frame, [198, 260], [-100, 320], { extrapolateRight: 'clamp' });
  const pillOpacity = interpolate(frame, [198, 210, 290, 320], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  // 90/10 Split Stamp (Frame 516+)
  const stampScale = spring({ frame: frame - 594, fps: 30, config: { damping: 12, stiffness: 200 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 40%, #1E293B 0%, #090D16 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Bathroom Cabinet props */}
      <div style={{ position: 'absolute', top: 120, left: 240, opacity: frame > 246 ? 0.2 : 1 }}>
        <svg width="400" height="400">
          <rect x="20" y="20" width="360" height="360" rx="16" fill="#334155" stroke="#64748B" strokeWidth="8" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="#64748B" strokeWidth="6" />
          {/* Pill Bottle */}
          <rect x="70" y="90" width="80" height="100" rx="10" fill="#F97316" stroke="#000" strokeWidth="6" />
          <rect x="85" y="70" width="50" height="20" rx="4" fill="#FFF" stroke="#000" strokeWidth="5" />
          <text x="110" y="145" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#000">EXP</text>
          <text x="110" y="165" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#DC2626">3 YRS</text>
        </svg>
      </div>

      {/* Hero Character */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 40,
          transform: `translate(-50%, 0) translate(${panX}px, ${panY}px) scale(${zoom})`,
          transformOrigin: '50% 70%',
        }}
      >
        <PatientRig
          expression={frame < 198 ? 'agony' : frame < 260 ? 'gulp' : 'shock'}
          isXRay={frame > 246}
          scale={1.3}
        />
      </div>

      {/* Falling Pill */}
      {frame >= 198 && frame < 330 && (
        <div
          style={{
            position: 'absolute',
            left: 920,
            top: pillY,
            opacity: pillOpacity,
            zIndex: 150,
          }}
        >
          <svg width="70" height="35" viewBox="0 0 70 35">
            <rect x="2" y="2" width="33" height="31" rx="15" fill="#EF4444" stroke="#000" strokeWidth="4" />
            <rect x="35" y="2" width="33" height="31" rx="15" fill="#F8FAFC" stroke="#000" strokeWidth="4" />
          </svg>
        </div>
      )}

      {/* Act I Climax: 90% Myth vs 10% Fatal Grid (Frame 516-1035) */}
      {frame >= 516 && (
        <div
          style={{
            position: 'absolute',
            right: 80,
            top: 140,
            width: 720,
            background: 'rgba(15, 23, 42, 0.95)',
            border: '4px solid #475569',
            borderRadius: 24,
            padding: 30,
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 900, color: '#94A3B8', letterSpacing: 1.5, marginBottom: 16 }}>
            HOUSEHOLD PILL POPULATION
          </div>
          {/* Pill Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10, marginBottom: 20 }}>
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 24,
                  borderRadius: 6,
                  background: i < 90 ? '#FBBF24' : '#EF4444',
                  boxShadow: i >= 90 ? '0 0 10px #EF4444' : 'none',
                }}
              />
            ))}
          </div>

          {/* Rubber Stamp */}
          {frame >= 594 && (
            <div
              style={{
                position: 'absolute',
                top: 70,
                left: 100,
                transform: `scale(${Math.max(0, stampScale)}) rotate(-8deg)`,
                border: '6px solid #EF4444',
                color: '#EF4444',
                padding: '12px 28px',
                fontSize: 38,
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: 'uppercase',
                background: 'rgba(0,0,0,0.4)',
              }}
            >
              $1B MYTH!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
