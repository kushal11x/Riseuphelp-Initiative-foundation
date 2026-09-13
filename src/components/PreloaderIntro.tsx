import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface PreloaderIntroProps {
  onComplete: () => void;
  isInaugurationMode?: boolean;
  developerName?: string;
  inaugurationTitle?: string;
}

// Synthesizes a luxury celebratory fanfare chime using Web Audio API (zero external assets needed)
const playCelebrationChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Melodic celebratory arpeggio: C5, E5, G5, C6, E6
    const notes = [
      { f: 523.25, time: 0.0, dur: 0.35 },
      { f: 659.25, time: 0.1, dur: 0.35 },
      { f: 783.99, time: 0.2, dur: 0.45 },
      { f: 1046.5, time: 0.32, dur: 0.9 },
      { f: 1318.51, time: 0.45, dur: 1.1 },
    ];

    notes.forEach(({ f, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime + time);

      gain.gain.setValueAtTime(0, ctx.currentTime + time);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + dur + 0.05);
    });
  } catch (err) {
    console.debug('Celebration audio chime muted or unavailable:', err);
  }
};

// Multi-angle fireworks and confetti cannons
const fireCelebrationConfetti = () => {
  try {
    // 1. Center explosion
    confetti({
      particleCount: 110,
      spread: 95,
      origin: { y: 0.55 },
      colors: ['#FDB813', '#10B981', '#FF6B6B', '#3B82F6', '#FFFFFF', '#E0AAFF'],
      zIndex: 999999,
    });

    // 2. Left flank cannon
    setTimeout(() => {
      confetti({
        particleCount: 75,
        angle: 60,
        spread: 80,
        origin: { x: 0.08, y: 0.65 },
        colors: ['#FDB813', '#10B981', '#FFD700', '#FFFFFF'],
        zIndex: 999999,
      });
    }, 180);

    // 3. Right flank cannon
    setTimeout(() => {
      confetti({
        particleCount: 75,
        angle: 120,
        spread: 80,
        origin: { x: 0.92, y: 0.65 },
        colors: ['#FDB813', '#10B981', '#FFD700', '#FFFFFF'],
        zIndex: 999999,
      });
    }, 320);

    // 4. Gold starburst cascade
    setTimeout(() => {
      confetti({
        particleCount: 65,
        spread: 130,
        origin: { y: 0.4 },
        shapes: ['star', 'circle'],
        colors: ['#FFD700', '#FFA500', '#FFFFFF', '#10B981'],
        zIndex: 999999,
      });
    }, 520);
  } catch (err) {
    console.debug('Confetti animation skipped:', err);
  }
};

export const PreloaderIntro: React.FC<PreloaderIntroProps> = ({
  onComplete,
  isInaugurationMode = false,
  developerName = 'Lead Tech Engineer',
  inaugurationTitle = 'Grand Portal Inauguration',
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isReadyForCeremony, setIsReadyForCeremony] = useState(false);
  const [isCeremonyLaunched, setIsCeremonyLaunched] = useState(false);

  // Lock scroll while preloader is showing
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    // Snappy, smooth cinematic counter (~850ms)
    const startTime = performance.now();
    const duration = 850;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progressRatio, 2.2);
      const currentProgress = Math.min(100, Math.floor(easeOut * 100));
      setProgress(currentProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        if (isInaugurationMode) {
          // Pause and let user cut ribbon in celebration
          setIsReadyForCeremony(true);
        } else {
          // Fast auto-unveil
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 300);
          }, 150);
        }
      }
    };

    const rafId = requestAnimationFrame(updateCounter);

    // Guaranteed fallback timer (only if not waiting for user ribbon-cut)
    const maxSafetyTimer = setTimeout(() => {
      if (!isInaugurationMode) {
        setProgress(100);
        setIsFinished(true);
        onComplete();
      }
    }, 1400);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(maxSafetyTimer);
    };
  }, [isInaugurationMode, onComplete]);

  const handleInaugurateClick = () => {
    if (isCeremonyLaunched) return;
    setIsCeremonyLaunched(true);

    // Blast celebratory audio chime and multi-directional fireworks
    playCelebrationChime();
    fireCelebrationConfetti();

    // After celebratory fanfare display, smoothly slide open the portal
    setTimeout(() => {
      setIsFinished(true);
      setTimeout(onComplete, 450);
    }, 1350);
  };

  // Dynamic status text based on progress
  const getStatusText = () => {
    if (progress < 35) return 'Initializing Transparency Ledger';
    if (progress < 70) return 'Verifying Section 8 Jaipur Nodes';
    if (progress < 100) return 'Connecting RUHS & SMS Hospital Feeds';
    return 'Verification Complete • System Ready';
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1], // Luxurious cinematic shutter curve
            },
          }}
          className="fixed inset-0 z-[100] bg-[#07130e] flex flex-col items-center justify-between p-6 sm:p-10 text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(253,184,19,0.15)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,76,54,0.38)_0%,transparent_70%)] pointer-events-none" />

          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono text-emerald-400/80 tracking-widest uppercase flex items-center gap-2 relative z-10"
          >
            <span className="w-2 h-2 rounded-full bg-[#FDB813] animate-pulse" />
            <span>JAIPUR RELIEF FOUNDATION • SEC. 8 REG</span>
          </motion.div>

          {/* Center Brand Identity & Illumination */}
          <div className="flex flex-col items-center text-center relative z-10 my-auto">
            {/* Glowing Logo Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: [0.85, 1.02, 1], opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400/20 to-emerald-500/20 p-3 border border-amber-300/40 shadow-[0_0_50px_rgba(253,184,19,0.3)] flex items-center justify-center mb-4 relative group"
            >
              <img
                src="/logo.png"
                alt="RiseUpHelp Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(253,184,19,0.6)]"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans"
            >
              RiseUpHelp
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[11px] sm:text-xs text-amber-200/90 font-mono tracking-wider uppercase mt-1 mb-6"
            >
              Initiative Foundation
            </motion.p>

            {/* Interactive Inauguration Ribbon Card (When Active & Ready) */}
            {isInaugurationMode && isReadyForCeremony ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm flex flex-col items-center text-center gap-3.5 px-3 py-4 rounded-2xl bg-neutral-900/80 border border-amber-400/40 backdrop-blur-xl shadow-[0_0_40px_rgba(253,184,19,0.25)]"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-[10px] sm:text-[11px] font-mono text-amber-300 uppercase tracking-widest shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FDB813] animate-ping" />
                  <span>Portal Inauguration Ceremony</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {inaugurationTitle || 'RiseUpHelp Portal Inauguration'}
                  </h2>
                  <p className="text-[11px] text-neutral-300 max-w-xs mx-auto leading-relaxed">
                    Section 8 Rajasthan Healthcare & Nutrition Transparency Portal is ready for public unveiling.
                  </p>
                </div>

                {/* Ribbon Cutting Button */}
                <motion.button
                  type="button"
                  onClick={handleInaugurateClick}
                  disabled={isCeremonyLaunched}
                  whileHover={{ scale: isCeremonyLaunched ? 1 : 1.04 }}
                  whileTap={{ scale: isCeremonyLaunched ? 1 : 0.96 }}
                  className={`relative px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg overflow-hidden border ${
                    isCeremonyLaunched
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-300 shadow-[0_0_35px_rgba(16,185,129,0.7)]'
                      : 'bg-gradient-to-r from-[#FDB813] via-amber-400 to-[#FDB813] text-neutral-950 border-amber-200 shadow-[0_0_30px_rgba(253,184,19,0.5)] hover:shadow-[0_0_40px_rgba(253,184,19,0.8)]'
                  }`}
                >
                  {isCeremonyLaunched ? (
                    <>
                      <span className="text-xl animate-bounce">🎊</span>
                      <span className="font-extrabold tracking-wide uppercase">Portal Inaugurated! Welcome 🙏</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl animate-pulse">🎀</span>
                      <span className="font-extrabold tracking-wide uppercase">Cut Ribbon & Open Portal ✨</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            ) : (
              /* Progress Bar Counter */
              <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-2.5">
                <div className="w-full flex justify-between items-baseline text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 truncate max-w-[220px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
                    <span className="truncate">{getStatusText()}</span>
                  </span>
                  <span className="font-bold text-white font-mono text-xs">{progress}%</span>
                </div>

                {/* Progress Track */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#FDB813] via-emerald-400 to-[#FDB813] rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* PERMANENT Sleek Developer Attribution Badge (Always Active & Visible) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-20 flex flex-col items-center gap-1 mt-auto pt-4 text-center select-none"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] font-mono shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-amber-400/40 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-neutral-400">Architected & Developed by</span>
              <span className="font-bold text-amber-300 tracking-wide">
                {developerName || 'Lead Tech Engineer'}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-emerald-400/90 font-medium text-[10px]">v2.6 Live</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

