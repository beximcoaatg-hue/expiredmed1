import React from 'react';
import { Composition } from 'remotion';
import { ExpiredMedicineMaster } from './ExpiredMedicineMaster';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="ExpiredMedicineMaster"
        component={ExpiredMedicineMaster}
        durationInFrames={9240} // 308 seconds @ 30fps (Exact SRT length)
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
