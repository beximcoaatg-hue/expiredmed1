import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface MilitaryVaultProps {
  step: 'DRAWER' | 'STOCKPILE' | 'RESULTS' | 'WARNING';
}

export const MilitaryVault: React.FC<MilitaryVaultProps> = ({ step }) => {
  const frame = useCurrentFrame();
  const batchCounter = Math.min(3000, Math.floor(interpolate(frame, [0, 90], [100, 3000], { extrapolateRight: 'clamp' })));

  return (
    <div
      style={{
        width: 820,
        background: '#1E293B',
        border: '5px solid #1E5641',
        borderRadius: 28,
        padding: 36,
        color: '#F8FAFC',
        boxShadow: '0 24px 60px rgba(0,0,0,0.75)',
      }}
    >
      {step === 'DRAWER' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#34D399', fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>COOL, DRY NIGHTSTAND DRAWER</div>
          <div style={{ fontSize: 76, fontWeight: 900, color: '#10B981', margin: '20px 0' }}>✓ IT WORKS!</div>
          <div style={{ fontSize: 24, color: '#CBD5E1' }}>Zero steam + stable 20°C preserves molecular bonds</div>
        </div>
      )}

      {step === 'STOCKPILE' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#FACC15', fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>U.S. MILITARY + FDA SLEP PROGRAM</div>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#FFF', margin: '12px 0' }}>$1,000,000,000 STOCKPILE</div>
          <div style={{ background: '#0F172A', padding: '18px 32px', borderRadius: 18, border: '3px solid #38BDF8', display: 'inline-block' }}>
            <span style={{ color: '#38BDF8', fontSize: 38, fontWeight: 900 }}>{batchCounter.toLocaleString()} BATCHES TESTED</span>
          </div>
        </div>
      )}

      {step === 'RESULTS' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 82, fontWeight: 900, color: '#10B981' }}>90%</div>
              <div style={{ fontSize: 22, color: '#A7F3D0', fontWeight: 700 }}>SAFE & POTENT</div>
            </div>
            <div style={{ width: 4, height: 110, background: '#334155' }} />
            <div>
              <div style={{ fontSize: 82, fontWeight: 900, color: '#FACC15' }}>+15 YRS</div>
              <div style={{ fontSize: 22, color: '#FEF08A', fontWeight: 700 }}>PAST EXPIRATION</div>
            </div>
          </div>
          <div style={{ marginTop: 24, padding: 14, background: '#0F172A', borderRadius: 14, color: '#94A3B8', fontSize: 20 }}>
            EXP DATE = Legal 100% Strength Guarantee Deadline (Not Toxic Date)
          </div>
        </div>
      )}

      {step === 'WARNING' && (
        <div style={{ textAlign: 'center', border: '4px solid #EF4444', borderRadius: 20, padding: 24, background: '#450A0A' }}>
          <div style={{ color: '#FCA5A5', fontSize: 30, fontWeight: 900 }}>⚠️ WAIT! CRITICAL STORAGE DIFFERENCE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 18 }}>
            <div style={{ background: '#064E3B', padding: 16, borderRadius: 14 }}>
              <div style={{ fontWeight: 900, fontSize: 22 }}>✓ MILITARY VAULT</div>
              <div style={{ fontSize: 18, color: '#A7F3D0' }}>Climate-Controlled</div>
            </div>
            <div style={{ background: '#7F1D1D', padding: 16, borderRadius: 14 }}>
              <div style={{ fontWeight: 900, fontSize: 22 }}>✗ YOUR HOUSE</div>
              <div style={{ fontSize: 18, color: '#FECACA' }}>4 Red-List Drugs Turn Lethal</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
