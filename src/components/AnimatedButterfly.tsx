import React from 'react';
import { motion } from 'framer-motion';

interface ButterflyProps {
  id: number;
  startX: number;
  startY: number;
  size?: number;
  duration?: number;
  delay?: number;
  scale?: number;
}

const SingleButterfly: React.FC<ButterflyProps> = ({
  startX,
  startY,
  size = 28,
  duration = 16,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{
        x: `${startX}vw`,
        y: `${startY}vh`,
        opacity: 0,
        scale: 0.6,
      }}
      animate={{
        x: [
          `${startX}vw`,
          `${(startX + 18) % 95}vw`,
          `${(startX - 12 + 100) % 95}vw`,
          `${(startX + 24) % 95}vw`,
          `${startX}vw`,
        ],
        y: [
          `${startY}vh`,
          `${(startY - 20 + 100) % 85}vh`,
          `${(startY + 15) % 85}vh`,
          `${(startY - 30 + 100) % 85}vh`,
          `${startY}vh`,
        ],
        opacity: [0, 0.9, 0.95, 0.85, 0],
        scale: [0.6, 1, 0.9, 1.05, 0.6],
        rotate: [-15, 20, -10, 25, -15],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className="fixed pointer-events-none z-20 select-none"
      style={{ perspective: 600 }}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Left Wing with 3D Flap Animation */}
        <div
          className="w-1/2 h-full origin-right"
          style={{
            animation: 'wingFlapLeft 0.22s ease-in-out infinite alternate',
            transformOrigin: 'right center',
          }}
        >
          <svg viewBox="0 0 50 60" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id={`wingGradLeft-${startX}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDB813" />
                <stop offset="60%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
            {/* Top Forewing */}
            <path
              d="M 50 30 C 40 10, 10 5, 2 18 C -3 27, 20 38, 50 32 Z"
              fill={`url(#wingGradLeft-${startX})`}
              stroke="#0f172a"
              strokeWidth="1.2"
            />
            {/* Bottom Hindwing */}
            <path
              d="M 50 32 C 35 38, 12 40, 15 52 C 18 60, 42 55, 50 35 Z"
              fill={`url(#wingGradLeft-${startX})`}
              stroke="#0f172a"
              strokeWidth="1"
            />
            {/* Delicate Wing Veins */}
            <circle cx="15" cy="18" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="22" cy="12" r="1.2" fill="#ffffff" opacity="0.8" />
            <circle cx="20" cy="48" r="1.2" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>

        {/* Central Body & Antennae */}
        <div className="w-[3px] h-[65%] bg-neutral-900 rounded-full z-10 relative flex flex-col items-center">
          {/* Head & Antennae */}
          <div className="w-1.5 h-1.5 bg-neutral-950 rounded-full -top-0.5 relative" />
          <div className="absolute -top-2 flex gap-1">
            <div className="w-1.5 h-2 border-t border-l border-neutral-900 rounded-tl-full -rotate-12" />
            <div className="w-1.5 h-2 border-t border-r border-neutral-900 rounded-tr-full rotate-12" />
          </div>
        </div>

        {/* Right Wing with 3D Flap Animation */}
        <div
          className="w-1/2 h-full origin-left"
          style={{
            animation: 'wingFlapRight 0.22s ease-in-out infinite alternate',
            transformOrigin: 'left center',
          }}
        >
          <svg viewBox="0 0 50 60" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id={`wingGradRight-${startX}`} x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDB813" />
                <stop offset="60%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
            {/* Top Forewing */}
            <path
              d="M 0 30 C 10 10, 40 5, 48 18 C 53 27, 30 38, 0 32 Z"
              fill={`url(#wingGradRight-${startX})`}
              stroke="#0f172a"
              strokeWidth="1.2"
            />
            {/* Bottom Hindwing */}
            <path
              d="M 0 32 C 15 38, 38 40, 35 52 C 32 60, 8 55, 0 35 Z"
              fill={`url(#wingGradRight-${startX})`}
              stroke="#0f172a"
              strokeWidth="1"
            />
            {/* Delicate Wing Veins */}
            <circle cx="35" cy="18" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="28" cy="12" r="1.2" fill="#ffffff" opacity="0.8" />
            <circle cx="30" cy="48" r="1.2" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export const AnimatedButterflySystem: React.FC = () => {
  const butterflies = [
    { id: 1, startX: 15, startY: 25, size: 30, duration: 18, delay: 0 },
    { id: 2, startX: 75, startY: 45, size: 26, duration: 22, delay: 3 },
    { id: 3, startX: 45, startY: 70, size: 34, duration: 20, delay: 6 },
    { id: 4, startX: 85, startY: 18, size: 24, duration: 16, delay: 9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {butterflies.map((b) => (
        <SingleButterfly
          key={b.id}
          id={b.id}
          startX={b.startX}
          startY={b.startY}
          size={b.size}
          duration={b.duration}
          delay={b.delay}
        />
      ))}
    </div>
  );
};
