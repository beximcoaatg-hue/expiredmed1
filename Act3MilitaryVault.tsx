import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PatientRig } from '../rigs/PatientRig';
import { MilitaryVault } from '../metaphors/MilitaryVault';

export const Act3MilitaryVault: React.FC = () => {
  const frame = useCurrentFrame();
  const globalFrame = frame + 2463;

  const step =
    globalFrame < 2796
      ? 'DRAWER'
      : globalFrame < 3228
      ? 'STOCKPILE'
      : globalFrame < 3696
      ? 'RESULTS'
      : 'WARNING';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          step === 'WARNING'
            ? 'radial-gradient(circle at 50% 50%, #3B0712 0%, #090D16 100%)'
            : 'radial-gradient(circle at 50% 50%, #1E293B 0%, #0F172A 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PatientRig
        expression={step === 'WARNING' ? 'panic' : 'relieved'}
        pose={step === 'WARNING' ? 'headache' : 'salute'}
        isXRay={false}
        scale={1.15}
        x={90}
        y={140}
      />

      <div style={{ position: 'absolute', right: 90, top: 180 }}>
        <MilitaryVault step={step} />
      </div>
    </div>
  );
};
