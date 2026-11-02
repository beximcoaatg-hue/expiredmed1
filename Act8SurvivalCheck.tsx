import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PatientRig } from '../rigs/PatientRig';
import { SurvivalChecklist } from '../metaphors/SurvivalChecklist';
import { OrganXRayStage } from '../rigs/OrganXRayStage';

export const Act8SurvivalCheck: React.FC = () => {
  const frame = useCurrentFrame();
  const globalFrame = frame + 7950;

  const activeRule: 1 | 2 | 3 | 4 =
    globalFrame < 8406 ? 1 : globalFrame < 8574 ? 2 : globalFrame < 8790 ? 3 : 4;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          activeRule === 4
            ? 'radial-gradient(circle at 50% 50%, #1E1B4B 0%, #05050A 100%)'
            : 'radial-gradient(circle at 50% 50%, #1E293B 0%, #090D16 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PatientRig
        expression={activeRule === 4 ? 'insomnia' : 'relieved'}
        pose={activeRule === 4 ? 'zombie' : 'sniff'}
        isXRay={activeRule === 4}
        scale={1.15}
        x={70}
        y={140}
      />

      <div style={{ position: 'absolute', right: 70, top: 130 }}>
        {activeRule < 4 ? (
          <SurvivalChecklist activeRule={activeRule} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <OrganXRayStage organ="BRAIN" status="CRITICAL" />
            <SurvivalChecklist activeRule={4} />
          </div>
        )}
      </div>
    </div>
  );
};
