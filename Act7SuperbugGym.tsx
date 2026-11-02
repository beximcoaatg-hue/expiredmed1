import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PatientRig } from '../rigs/PatientRig';
import { SuperbugGym } from '../metaphors/SuperbugGym';

export const Act7SuperbugGym: React.FC = () => {
  const frame = useCurrentFrame();
  const globalFrame = frame + 7260;
  const isMutating = globalFrame >= 7734;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, #2E1065 0%, #090514 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PatientRig
        expression={isMutating ? 'panic' : 'relieved'}
        pose={isMutating ? 'headache' : 'flex'}
        isXRay={true}
        scale={1.15}
        x={80}
        y={140}
      />

      <div style={{ position: 'absolute', right: 80, top: 150 }}>
        <SuperbugGym stage={isMutating ? 'GYM_MUTATION' : 'WEAK_WIPEOUT'} />
      </div>
    </div>
  );
};
