import React from 'react';
import { useCurrentFrame, Audio, staticFile, Sequence } from 'remotion';
import { SRT_CUES } from './data/srtCues';
import { ACT_TIMELINE, SFX_TIMELINE } from './data/sceneTimeline';
import { CameraRig } from './components/stage/CameraRig';
import { BioClockHUD } from './components/stage/BioClockHUD';
import { SubtitleBar } from './components/stage/SubtitleBar';

import { Act1BathroomAcid } from './components/acts/Act1BathroomAcid';
import { Act2SteamCement } from './components/acts/Act2SteamCement';
import { Act3MilitaryVault } from './components/acts/Act3MilitaryVault';
import { Act4FanconiKidney } from './components/acts/Act4FanconiKidney';
import { Act5LiquidBioTrap } from './components/acts/Act5LiquidBioTrap';
import { Act6HeartRedZone } from './components/acts/Act6HeartRedZone';
import { Act7SuperbugGym } from './components/acts/Act7SuperbugGym';
import { Act8SurvivalCheck } from './components/acts/Act8SurvivalCheck';

export const ExpiredMedicineMaster: React.FC = () => {
  const frame = useCurrentFrame();

  // Active SRT cue & Act state
  const activeCue = SRT_CUES.find((c) => frame >= c.startFrame && frame < c.endFrame);
  const currentAct =
    ACT_TIMELINE.find((a) => frame >= a.startFrame && frame < a.endFrame) || ACT_TIMELINE[0];

  // Meet Arnold style fast-paced camera punch-ins on every single cue transition
  const cueIndex = activeCue ? activeCue.id : 1;
  const framesIntoCue = activeCue ? frame - activeCue.startFrame : 0;

  // Alternate subtle Dutch-angle/zoom cuts on odd/even cues so the frame changes every 2-3 seconds
  const dynamicZoom = cueIndex % 3 === 0 ? 1.08 : cueIndex % 2 === 0 ? 1.04 : 1.0;
  const dynamicPanX = cueIndex % 3 === 0 ? -25 : cueIndex % 2 === 0 ? 20 : 0;
  const dynamicPanY = cueIndex % 4 === 0 ? -15 : 0;

  // High-impact screen shakes on dramatic beats
  const isImpactMoment =
    (frame >= 198 && frame <= 265) ||
    (frame >= 594 && frame <= 620) ||
    (frame >= 2148 && frame <= 2200) ||
    (frame >= 3696 && frame <= 3730) ||
    (frame >= 4998 && frame <= 5045) ||
    (frame >= 6390 && frame <= 6435);

  const shakeAmount = isImpactMoment ? 7 : framesIntoCue < 4 ? 2.5 : 0;

  return (
    <div style={{ width: 1920, height: 1080, position: 'relative', background: currentAct.bgHex }}>
      {/* 1. Primary Voiceover Track (Bundled in public/voiceover.mp3) */}
      <Audio src={staticFile('voiceover.mp3')} volume={1.0} />

      {/* 2. Frame-Accurate Tactile SFX Cues (Bundled in public/sfx/*.wav) */}
      {SFX_TIMELINE.map((sfx, idx) => (
        <Sequence key={idx} from={sfx.frame} durationInFrames={45}>
          <Audio src={staticFile(sfx.file)} volume={sfx.volume} />
        </Sequence>
      ))}

      {/* 3. Main 16:9 Stage with Fast-Paced Camera Cuts & Impact Shakes */}
      <CameraRig zoom={dynamicZoom} panX={dynamicPanX} panY={dynamicPanY} shake={shakeAmount}>
        <Sequence from={0} durationInFrames={1035}>
          <Act1BathroomAcid />
        </Sequence>
        <Sequence from={1035} durationInFrames={1428}>
          <Act2SteamCement />
        </Sequence>
        <Sequence from={2463} durationInFrames={1512}>
          <Act3MilitaryVault />
        </Sequence>
        <Sequence from={3975} durationInFrames={1371}>
          <Act4FanconiKidney />
        </Sequence>
        <Sequence from={5346} durationInFrames={1044}>
          <Act5LiquidBioTrap />
        </Sequence>
        <Sequence from={6390} durationInFrames={870}>
          <Act6HeartRedZone />
        </Sequence>
        <Sequence from={7260} durationInFrames={690}>
          <Act7SuperbugGym />
        </Sequence>
        <Sequence from={7950} durationInFrames={1290}>
          <Act8SurvivalCheck />
        </Sequence>
      </CameraRig>

      {/* 4. Persistent Top-Left Biological Stopwatch & ECG Monitor */}
      <BioClockHUD clockText={currentAct.hudClock} threatLevel={currentAct.threatLevel} />

      {/* 5. High-Contrast Kinetic Subtitles */}
      <SubtitleBar currentCue={activeCue} />
    </div>
  );
};
