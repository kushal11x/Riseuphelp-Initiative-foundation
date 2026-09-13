import React from 'react';

export const FloatingShapes: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Floating Glowing Sphere Top-Right */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#FDB813]/15 to-transparent blur-3xl animate-float-slow"
        style={{ willChange: 'transform' }}
      />

      {/* Floating Emerald Glow Left */}
      <div 
        className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[#0e6245]/10 to-[#FDB813]/10 blur-3xl animate-float-reverse"
        style={{ willChange: 'transform' }}
      />

      {/* Floating Soft Sunset Orb Bottom-Right */}
      <div 
        className="absolute top-2/3 -right-20 w-72 h-72 rounded-full bg-[#FDB813]/12 blur-2xl animate-pulse-glow"
        style={{ willChange: 'transform' }}
      />

      {/* Abstract Geometric Shapes with Micro-animations */}
      <svg
        className="absolute top-20 left-[12%] w-16 h-16 text-[#0e6245]/20 animate-float-slow"
        style={{ animationDuration: '9s' }}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <circle cx="20" cy="20" r="16" strokeDasharray="3 3" />
        <circle cx="20" cy="20" r="8" />
      </svg>

      <svg
        className="absolute top-1/2 right-[8%] w-20 h-20 text-[#FDB813]/30 animate-float-reverse"
        style={{ animationDuration: '11s' }}
        viewBox="0 0 50 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <rect x="10" y="10" width="30" height="30" rx="6" transform="rotate(45 25 25)" />
        <circle cx="25" cy="25" r="4" fill="currentColor" fillOpacity="0.4" />
      </svg>

      <svg
        className="absolute bottom-40 left-[18%] w-14 h-14 text-[#084c36]/20 animate-float-slow"
        style={{ animationDuration: '8s' }}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <polygon points="20,4 36,34 4,34" />
      </svg>

      <svg
        className="absolute top-3/4 left-[8%] w-12 h-12 text-[#FDB813]/25 animate-float-reverse"
        style={{ animationDuration: '10s' }}
        viewBox="0 0 30 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <line x1="5" y1="15" x2="25" y2="15" />
        <line x1="15" y1="5" x2="15" y2="25" />
        <circle cx="15" cy="15" r="3" />
      </svg>
    </div>
  );
};
