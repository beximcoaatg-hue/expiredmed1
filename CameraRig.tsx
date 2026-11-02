import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface CameraRigProps {
  zoom?: number;
  panX?: number;
  panY?: number;
  shake?: number;
  children: React.ReactNode;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  zoom = 1,
  panX = 0,
  panY = 0,
  shake = 0,
  children,
}) => {
  const frame = useCurrentFrame();

  const shakeOffset = shake > 0 ? Math.sin(frame * 1.5) * shake : 0;
  const shakeOffsetY = shake > 0 ? Math.cos(frame * 2.1) * shake : 0;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: '50% 50%',
          transform: `translate(${panX + shakeOffset}px, ${panY + shakeOffsetY}px) scale(${zoom})`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0.9, 0.3, 1)',
        }}
      >
        {children}
      </div>
    </div>
  );
};
