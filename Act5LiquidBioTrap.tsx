import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PatientRig } from '../rigs/PatientRig';
import { OrganXRayStage } from '../rigs/OrganXRayStage';

export const Act5LiquidBioTrap: React.FC = () => {
  const frame = useCurrentFrame();
  const globalFrame = frame + 5346;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, #064E3B 0%, #022C22 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PatientRig
        expression={globalFrame >= 6018 ? 'panic' : 'shock'}
        pose="eyedrop"
        isXRay={false}
        scale={1.15}
        x={90}
        y={140}
      />

      <div style={{ position: 'absolute', right: 90, top: 140 }}>
        <OrganXRayStage organ="OCULAR" status="CRITICAL" />
        <div
          style={{
            marginTop: 18,
            background: '#065F46',
            border: '3px solid #34D399',
            borderRadius: 16,
            padding: '12px 24px',
            color: '#ECFDF5',
            fontSize: 22,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          MINUTE 45: PRESERVATIVES DIE FIRST ➔ BACTERIAL COLONY INJECTED
        </div>
      </div>
    </div>
  );
};
