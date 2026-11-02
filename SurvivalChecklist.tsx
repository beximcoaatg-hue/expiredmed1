import React from 'react';
import { useCurrentFrame, spring } from 'remotion';

interface SurvivalChecklistProps {
  activeRule: 1 | 2 | 3 | 4; // 4 = 72-Hour Sleep Deprivation Brain Hook
}

export const SurvivalChecklist: React.FC<SurvivalChecklistProps> = ({ activeRule }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ width: 820 }}>
      {activeRule <= 3 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ color: '#FACC15', fontSize: 36, fontWeight: 900, letterSpacing: 2 }}>
            3-SECOND PILL SURVIVAL CHECK
          </div>

          {/* Rule 1 */}
          <div
            style={{
              background: activeRule === 1 ? '#1E293B' : 'rgba(30,41,59,0.5)',
              border: `4px solid ${activeRule === 1 ? '#38BDF8' : '#334155'}`,
              borderRadius: 20,
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div style={{ fontSize: 52 }}>👃</div>
            <div>
              <div style={{ color: '#38BDF8', fontSize: 26, fontWeight: 900 }}>1. SMELL & INSPECT THE BOTTLE</div>
              <div style={{ color: '#E2E8F0', fontSize: 20 }}>
                Sharp vinegar odor (aspirin) or cracked/sticky capsules = Toss immediately!
              </div>
            </div>
          </div>

          {/* Rule 2 */}
          {activeRule >= 2 && (
            <div
              style={{
                background: activeRule === 2 ? '#450A0A' : 'rgba(69,10,10,0.5)',
                border: `4px solid ${activeRule === 2 ? '#EF4444' : '#7F1D1D'}`,
                borderRadius: 20,
                padding: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 24,
              }}
            >
              <div style={{ fontSize: 52 }}>🚫</div>
              <div>
                <div style={{ color: '#FCA5A5', fontSize: 26, fontWeight: 900 }}>2. THE NEVER-GAMBLE 5</div>
                <div style={{ color: '#FECACA', fontSize: 20 }}>
                  Liquids • Eye Drops • Insulin • Heart Pills (Nitroglycerin) • Antibiotics
                </div>
              </div>
            </div>
          )}

          {/* Rule 3 */}
          {activeRule >= 3 && (
            <div
              style={{
                background: '#064E3B',
                border: '4px solid #10B981',
                borderRadius: 20,
                padding: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 24,
              }}
            >
              <div style={{ fontSize: 52 }}>🚿➡️🗄️</div>
              <div>
                <div style={{ color: '#6EE7B7', fontSize: 26, fontWeight: 900 }}>3. EVACUATE THE BATHROOM CABINET</div>
                <div style={{ color: '#D1FAE5', fontSize: 20 }}>
                  Shower steam ages a pill faster than years on a calendar.
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            background: '#1E1B4B',
            border: '5px solid #F43F5E',
            borderRadius: 28,
            padding: 36,
            textAlign: 'center',
            boxShadow: '0 0 60px rgba(244, 63, 94, 0.5)',
          }}
        >
          <div style={{ color: '#FDA4AF', fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>
            UP NEXT: 72 HOURS WITHOUT SLEEP
          </div>
          <div style={{ color: '#FFF', fontSize: 48, fontWeight: 900, margin: '16px 0' }}>
            BY HOUR 48, YOUR BRAIN EATS ITSELF 🧠🍽️
          </div>
          <div
            style={{
              display: 'inline-block',
              background: '#EF4444',
              color: '#FFF',
              fontSize: 28,
              fontWeight: 900,
              padding: '16px 40px',
              borderRadius: 16,
              marginTop: 12,
              transform: `scale(${1 + Math.sin(frame * 0.25) * 0.06})`,
            }}
          >
            ▶ CLICK THE VIDEO ON SCREEN NOW
          </div>
        </div>
      )}
    </div>
  );
};
