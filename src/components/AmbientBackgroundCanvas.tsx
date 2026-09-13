import React from 'react';

export const AmbientBackgroundCanvas: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      style={{
        contain: 'strict',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
    >
      {/* 1. Subtle Precision Technical Dot-Grid Matrix (Pure CSS Pattern) */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #084c36 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* 2. AMBIENT LIVING AURA LIGHT BEAMS - GPU COMPOSITED FLOATING ANIMATION */}
      {/* Light Beam 1: Amber Sunset Aura (Gentle Float) */}
      <div
        className="absolute -top-28 -left-16 w-[480px] h-[480px] rounded-full pointer-events-none opacity-80 animate-float-slow gpu-layer"
        style={{
          background: 'radial-gradient(circle, rgba(253, 184, 19, 0.14) 0%, rgba(245, 158, 11, 0.04) 50%, transparent 70%)',
        }}
      />

      {/* Light Beam 2: Deep Emerald Seva Radiant Aura (Gentle Counter-Float) */}
      <div
        className="absolute top-[35%] -right-24 w-[520px] h-[520px] rounded-full pointer-events-none opacity-80 animate-float-reverse gpu-layer"
        style={{
          background: 'radial-gradient(circle, rgba(8, 76, 54, 0.12) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 70%)',
        }}
      />

      {/* Light Beam 3: Soft Radiant Golden Pulse in Center-Bottom */}
      <div
        className="absolute top-[75%] left-[20%] w-[420px] h-[420px] rounded-full pointer-events-none opacity-70 animate-pulse-glow gpu-layer"
        style={{
          background: 'radial-gradient(circle, rgba(253, 184, 19, 0.08) 0%, rgba(8, 76, 54, 0.04) 50%, transparent 70%)',
        }}
      />
    </div>
  );
};
