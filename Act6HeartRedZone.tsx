import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PatientRig } from '../rigs/PatientRig';
import { OrganXRayStage } from '../rigs/OrganXRayStage';

export const Act6HeartRedZone: React.FC = () => {
  const frame = useCurrentFrame();
  const globalFrame = frame + 6390;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, #450A0A 0%, #150303 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PatientRig
        expression="agony"
        pose="heart_clutch"
        isXRay={true}
        scale={1.15}
        x={90}
        y={140}
      />

      <div style={{ position: 'absolute', right: 90, top: 130 }}>
        <OrganXRayStage organ="HEART" status="CRITICAL" />
        <div style={{ display: 'flex', gap: 16, marginTop: 18 }}>
          {['EPIPEN (Allergy)', 'INSULIN (Diabetes)', 'NITROGLYCERIN (Heart)'].map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                background: '#7F1D1D',
                border: '3px solid #EF4444',
                borderRadius: 14,
                padding: '12px 16px',
                color: '#FFF',
                fontWeight: 900,
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
