import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { PatientRig } from '../rigs/PatientRig';
import { OrganXRayStage } from '../rigs/OrganXRayStage';
import { PillTimeBomb } from '../metaphors/PillTimeBomb';

export const Act2SteamCement: React.FC = () => {
  const frame = useCurrentFrame(); // Local sequence frame (0 to 1428, corresponding to global 1035..2463)
  const globalFrame = frame + 1035;

  const phase = globalFrame < 1500 ? 'SHIELD' : globalFrame < 1884 ? 'STEAM' : 'SPLIT_FORK';
  const isDoseDump = globalFrame >= 2148;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: isDoseDump
          ? 'radial-gradient(circle at 50% 50%, #450A0A 0%, #090D16 100%)'
          : 'radial-gradient(circle at 50% 50%, #162B38 0%, #090D16 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Persistent Left Arnold Character Pod */}
      <PatientRig
        expression={isDoseDump ? 'burning' : globalFrame >= 1650 ? 'panic' : 'shock'}
        pose={isDoseDump ? 'burn' : 'headache'}
        isXRay={true}
        scale={1.15}
        x={90}
        y={140}
      />

      {/* Right Stage: Switches between Stomach X-Ray Vat & Pill Time-Bomb Metaphor */}
      <div style={{ position: 'absolute', right: 90, top: 150 }}>
        {globalFrame < 1236 ? (
          <OrganXRayStage organ="STOMACH" status="NORMAL" />
        ) : (
          <PillTimeBomb phase={phase} />
        )}
      </div>
    </div>
  );
};
