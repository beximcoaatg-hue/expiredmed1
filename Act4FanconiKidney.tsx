import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PatientRig } from '../rigs/PatientRig';
import { OrganXRayStage } from '../rigs/OrganXRayStage';

export const Act4FanconiKidney: React.FC = () => {
  const frame = useCurrentFrame();
  const globalFrame = frame + 3975;
  const isPoisoned = globalFrame >= 4695;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, #3B0712 0%, #120307 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PatientRig
        expression={isPoisoned ? 'nauseous' : 'panic'}
        pose="kidney_grab"
        isXRay={true}
        scale={1.15}
        x={90}
        y={140}
      />

      <div style={{ position: 'absolute', right: 90, top: 130 }}>
        <OrganXRayStage organ="KIDNEY" status={isPoisoned ? 'CRITICAL' : 'DAMAGED'} />
        {globalFrame >= 4998 && (
          <div
            style={{
              marginTop: 18,
              background: '#7F1D1D',
              border: '4px solid #F43F5E',
              borderRadius: 18,
              padding: '14px 28px',
              color: '#FFF',
              fontSize: 24,
              fontWeight: 900,
              textAlign: 'center',
            }}
          >
            ⚠️ FANCONI SYNDROME: FLUSHING WATER, GLUCOSE & POTASSIUM!
          </div>
        )}
      </div>
    </div>
  );
};
