import React from 'react';
import { SrtCue } from '../../data/srtCues';

interface SubtitleBarProps {
  currentCue?: SrtCue;
}

export const SubtitleBar: React.FC<SubtitleBarProps> = ({ currentCue }) => {
  if (!currentCue) return null;

  const renderTextWithHighlights = () => {
    let raw = currentCue.text;
    const parts: { text: string; isHighlight: boolean }[] = [];

    // Simple highlight splitter
    let remaining = raw;
    for (const h of currentCue.highlights) {
      const idx = remaining.toLowerCase().indexOf(h.toLowerCase());
      if (idx !== -1) {
        if (idx > 0) {
          parts.push({ text: remaining.slice(0, idx), isHighlight: false });
        }
        parts.push({ text: remaining.slice(idx, idx + h.length), isHighlight: true });
        remaining = remaining.slice(idx + h.length);
      }
    }
    if (remaining.length > 0) {
      parts.push({ text: remaining, isHighlight: false });
    }

    return parts.map((p, i) => (
      <span
        key={i}
        style={{
          color: p.isHighlight ? '#FACC15' : '#FFFFFF',
          textShadow: p.isHighlight ? '0 0 16px rgba(250, 204, 21, 0.6)' : '0 4px 10px rgba(0,0,0,0.8)',
          fontWeight: p.isHighlight ? 900 : 700,
        }}
      >
        {p.text}
      </span>
    ));
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 55,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: 'rgba(10, 15, 30, 0.88)',
          border: '3px solid #334155',
          borderRadius: 24,
          padding: '16px 42px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.8)',
          maxWidth: 1350,
          textAlign: 'center',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 34,
          lineHeight: 1.35,
          letterSpacing: 0.5,
        }}
      >
        {renderTextWithHighlights()}
      </div>
    </div>
  );
};
