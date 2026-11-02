export type ArnoldPose =
  | 'headache'
  | 'swallow'
  | 'burn'
  | 'salute'
  | 'kidney_grab'
  | 'eyedrop'
  | 'heart_clutch'
  | 'flex'
  | 'sniff'
  | 'zombie';

export interface ActState {
  actId: number;
  startFrame: number;
  endFrame: number;
  bgHex: string;
  hudClock: string;
  threatLevel: 'NORMAL' | 'CAUTION' | 'CRITICAL' | 'BIOHAZARD' | 'LETHAL';
  defaultPose: ArnoldPose;
}

export const ACT_TIMELINE: ActState[] = [
  { actId: 1, startFrame: 0,    endFrame: 1035, bgHex: '#0D1322', hudClock: '02:00 AM',  threatLevel: 'CAUTION',   defaultPose: 'headache' },
  { actId: 2, startFrame: 1035, endFrame: 2463, bgHex: '#1B1912', hudClock: 'MIN 05–15', threatLevel: 'CRITICAL',  defaultPose: 'burn' },
  { actId: 3, startFrame: 2463, endFrame: 3975, bgHex: '#EBE6DC', hudClock: 'MIN 20:00', threatLevel: 'NORMAL',    defaultPose: 'salute' },
  { actId: 4, startFrame: 3975, endFrame: 5346, bgHex: '#1A0B0E', hudClock: 'MIN 38:00', threatLevel: 'LETHAL',    defaultPose: 'kidney_grab' },
  { actId: 5, startFrame: 5346, endFrame: 6390, bgHex: '#091914', hudClock: 'MIN 45:00', threatLevel: 'BIOHAZARD', defaultPose: 'eyedrop' },
  { actId: 6, startFrame: 6390, endFrame: 7260, bgHex: '#220707', hudClock: 'MIN 52:00', threatLevel: 'LETHAL',    defaultPose: 'heart_clutch' },
  { actId: 7, startFrame: 7260, endFrame: 7950, bgHex: '#150D24', hudClock: 'MIN 60:00', threatLevel: 'BIOHAZARD', defaultPose: 'flex' },
  { actId: 8, startFrame: 7950, endFrame: 9240, bgHex: '#0F172A', hudClock: 'SURVIVAL',  threatLevel: 'CAUTION',   defaultPose: 'sniff' },
];

export interface SfxCue {
  frame: number;
  file: string;
  volume: number;
}

// Frame-accurate SFX triggers mapped to the 106 SRT cues
export const SFX_TIMELINE: SfxCue[] = [
  { frame: 5,    file: 'sfx/heartbeat.wav',   volume: 0.7 },
  { frame: 45,   file: 'sfx/heartbeat.wav',   volume: 0.8 },
  { frame: 93,   file: 'sfx/ui-pop.wav',      volume: 0.6 },
  { frame: 198,  file: 'sfx/gulp.wav',        volume: 0.9 },
  { frame: 246,  file: 'sfx/acid-sizzle.wav', volume: 0.8 },
  { frame: 516,  file: 'sfx/whoosh.wav',      volume: 0.6 },
  { frame: 594,  file: 'sfx/stamp-thud.wav',  volume: 0.9 },
  { frame: 705,  file: 'sfx/siren-alert.wav', volume: 0.7 },
  { frame: 756,  file: 'sfx/ui-pop.wav',      volume: 0.6 },
  { frame: 852,  file: 'sfx/ui-pop.wav',      volume: 0.6 },
  { frame: 984,  file: 'sfx/stamp-thud.wav',  volume: 0.8 },
  { frame: 1035, file: 'sfx/whoosh.wav',      volume: 0.7 },
  { frame: 1128, file: 'sfx/acid-sizzle.wav', volume: 0.7 },
  { frame: 1236, file: 'sfx/ui-pop.wav',      volume: 0.6 },
  { frame: 1560, file: 'sfx/whoosh.wav',      volume: 0.6 },
  { frame: 1725, file: 'sfx/steam-hiss.wav',  volume: 0.8 },
  { frame: 1992, file: 'sfx/stamp-thud.wav',  volume: 0.8 },
  { frame: 2148, file: 'sfx/glass-crack.wav', volume: 0.9 },
  { frame: 2307, file: 'sfx/acid-sizzle.wav', volume: 0.9 },
  { frame: 2463, file: 'sfx/whoosh.wav',      volume: 0.7 },
  { frame: 2760, file: 'sfx/stamp-thud.wav',  volume: 0.85 },
  { frame: 2997, file: 'sfx/ui-pop.wav',      volume: 0.6 },
  { frame: 3228, file: 'sfx/stamp-thud.wav',  volume: 0.9 },
  { frame: 3696, file: 'sfx/siren-alert.wav', volume: 0.8 },
  { frame: 3975, file: 'sfx/whoosh.wav',      volume: 0.7 },
  { frame: 4110, file: 'sfx/siren-alert.wav', volume: 0.75 },
  { frame: 4695, file: 'sfx/acid-sizzle.wav', volume: 0.75 },
  { frame: 4998, file: 'sfx/glass-crack.wav', volume: 0.85 },
  { frame: 5346, file: 'sfx/whoosh.wav',      volume: 0.7 },
  { frame: 5715, file: 'sfx/ui-pop.wav',      volume: 0.7 },
  { frame: 6018, file: 'sfx/siren-alert.wav', volume: 0.7 },
  { frame: 6390, file: 'sfx/siren-alert.wav', volume: 0.85 },
  { frame: 6660, file: 'sfx/ui-pop.wav',      volume: 0.65 },
  { frame: 6735, file: 'sfx/ui-pop.wav',      volume: 0.65 },
  { frame: 6786, file: 'sfx/ui-pop.wav',      volume: 0.65 },
  { frame: 6978, file: 'sfx/steam-hiss.wav',  volume: 0.7 },
  { frame: 7152, file: 'sfx/heartbeat.wav',   volume: 0.95 },
  { frame: 7260, file: 'sfx/whoosh.wav',      volume: 0.7 },
  { frame: 7575, file: 'sfx/ui-pop.wav',      volume: 0.7 },
  { frame: 7806, file: 'sfx/stamp-thud.wav',  volume: 0.85 },
  { frame: 7950, file: 'sfx/whoosh.wav',      volume: 0.7 },
  { frame: 8076, file: 'sfx/stamp-thud.wav',  volume: 0.8 },
  { frame: 8406, file: 'sfx/stamp-thud.wav',  volume: 0.8 },
  { frame: 8574, file: 'sfx/stamp-thud.wav',  volume: 0.8 },
  { frame: 8790, file: 'sfx/whoosh.wav',      volume: 0.75 },
  { frame: 9120, file: 'sfx/heartbeat.wav',   volume: 0.9 },
];
