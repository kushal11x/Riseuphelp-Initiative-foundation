import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Video, ArrowRight, ShieldCheck } from 'lucide-react';
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
  const [isReelMode, setIsReelMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return (
        params.get('reel_mode') === '1' ||
        params.get('reel') === '1' ||
        params.get('donate_anim') === '1' ||
        params.get('creator') === '1'
      );
    }
    return false;
  });
  const [isGreenScreen, setIsGreenScreen] = useState(false);
  const tapCountRef = useRef(0);

  // Secret keyboard trigger (Ctrl+R or Alt+R) for creator convenience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.altKey) && e.key.toLowerCase() === 'r') {
        setIsReelMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogoClick = () => {
    tapCountRef.current += 1;
    if (tapCountRef.current >= 4) {
      setIsReelMode(true);
      tapCountRef.current = 0;
    }
  };

  // Lock scroll while preloader is showing
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let current = 0;
    let target = 25;
    let rafId: number;

    const criticalAssets = [
      '/logo.png',
      '/lower-bg-poster.jpg',
      '/uploads/upload_1788854883643_e4a411d682.jpg',
      '/uploads/upload_1788854883651_f76b88b4fe.jpg',
    ];

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        if (img.complete) {
          if ('decode' in img) {
            img.decode().then(resolve).catch(resolve);
          } else {
            resolve();
          }
          return;
        }
        img.onload = () => {
          if ('decode' in img) {
            img.decode().then(resolve).catch(resolve);
          } else {
            resolve();
          }
        };
        img.onerror = () => resolve();
      });
    };

    const runLoader = async () => {
      // 1. Initial DOM & React mount stage
      target = Math.max(target, 30);

      // 2. Wait for Google fonts to be ready
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      } catch {
        // Fallback gracefully
      }
      if (isCancelled) return;
      target = Math.max(target, 55);

      // 3. Preload and decode critical media
      await Promise.all(criticalAssets.map(preloadImage));
      if (isCancelled) return;
      target = Math.max(target, 85);

      // 4. Wait for full window load (document.readyState === 'complete')
      if (document.readyState !== 'complete') {
        await new Promise<void>((resolve) => {
          const onComplete = () => {
            window.removeEventListener('load', onComplete);
            resolve();
          };
          window.addEventListener('load', onComplete);
          // Safety timeout for window load event
          setTimeout(resolve, 3500);
        });
      }
      if (isCancelled) return;
      target = 100;
    };

    // Smooth RAF ticker for buttery progress line interpolation
    const tick = () => {
      if (isCancelled) return;

      const diff = target - current;
      if (diff > 0) {
        // Smooth asymptotic ease-out toward target
        const step = Math.max(0.35, diff * 0.08);
        current = Math.min(target, current + step);
        setProgress(Math.floor(current));
      }

      if (current >= 100 && target >= 100) {
        setProgress(100);
        if (isInaugurationMode) {
          setIsReadyForCeremony(true);
        } else if (isReelMode) {
          // In Reel mode, keep looping and do not unmount so creator can screen record!
        } else {
          // Allow 450ms buffer for browser paint/compositing settling and viewing Donate Now animation
          setTimeout(() => {
            if (isCancelled) return;
            setIsFinished(true);
            setTimeout(onComplete, 400);
          }, 450);
        }
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    runLoader();

    // Absolute safety fallback (6.5s) to prevent permanent hang on blocked networks
    const fallbackTimer = setTimeout(() => {
      if (isCancelled) return;
      target = 100;
      current = 100;
      setProgress(100);
      if (isInaugurationMode) {
        setIsReadyForCeremony(true);
      } else if (!isReelMode) {
        setIsFinished(true);
        onComplete();
      }
    }, 6500);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackTimer);
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
          className={`fixed inset-0 z-[100] ${isGreenScreen ? 'bg-[#00FF00]' : 'bg-[#07130e]'} flex flex-col items-center justify-between p-4 sm:p-10 text-white select-none overflow-hidden transition-colors duration-300`}
        >
          {/* Subtle Ambient Radial Glow (hidden on pure green screen for clean chroma key) */}
          {!isGreenScreen && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(253,184,19,0.15)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,76,54,0.38)_0%,transparent_70%)] pointer-events-none" />
            </>
          )}



            {/* Top Bar with Secret Reel Record Mode Switcher (Visible ONLY in Reel Mode) */}
          <div className="w-full flex items-center justify-between relative z-20">
            {!isGreenScreen ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[10px] sm:text-xs font-mono tracking-widest uppercase flex items-center gap-2 text-emerald-400/80"
              >
                <span className="w-2 h-2 rounded-full animate-pulse bg-[#FDB813]" />
                <span className="truncate max-w-[200px] sm:max-w-none">JAIPUR RELIEF FOUNDATION • SEC. 8 REG</span>
              </motion.div>
            ) : (
              <div />
            )}

            {/* Reel Video Record Mode Controls - STRICTLY HIDDEN FROM NORMAL VISITORS */}
            {isReelMode && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 border bg-emerald-500 text-neutral-950 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.7)]">
                  <Video className="w-3 h-3 animate-pulse" />
                  <span>🎥 Reel Mode: Looping</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGreenScreen(!isGreenScreen)}
                  className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold border cursor-pointer transition-all active:scale-95 ${
                    isGreenScreen
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-[#00FF00] text-black border-white shadow-[0_0_15px_rgba(0,255,0,0.8)] font-extrabold'
                  }`}
                  title="Chroma Key Green Screen for CapCut / VN / Premiere"
                >
                  {isGreenScreen ? '⬛ Dark BG' : '🟢 Green Screen'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsFinished(true);
                    onComplete();
                  }}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#FDB813] hover:bg-amber-300 text-neutral-950 border border-amber-300 flex items-center gap-1 cursor-pointer transition-all shadow-md active:scale-95"
                  title="Exit to main website"
                >
                  <span>Open Site</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Center Brand Identity & Illumination */}
          <div className="flex flex-col items-center text-center relative z-10 my-auto w-full max-w-lg px-2">
            {/* Glowing Logo Mark (Tap 4 times to toggle reel mode) */}
            <motion.div
              onClick={handleLogoClick}
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: [0.85, 1.02, 1], opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-3 border shadow-[0_0_50px_rgba(253,184,19,0.3)] flex items-center justify-center mb-3 relative group cursor-pointer ${
                isGreenScreen
                  ? 'bg-[#071711] border-2 border-[#FDB813] shadow-2xl'
                  : 'bg-gradient-to-tr from-amber-400/20 to-emerald-500/20 border-amber-300/40'
              }`}
              title="RiseUpHelp Logo"
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
              className={`text-2xl sm:text-4xl font-black tracking-tight font-sans ${
                isGreenScreen ? 'text-neutral-950 drop-shadow-sm' : 'text-white'
              }`}
            >
              RiseUpHelp
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className={`text-[11px] sm:text-xs font-mono tracking-wider uppercase mt-1 mb-3 font-semibold ${
                isGreenScreen ? 'text-neutral-900 font-bold' : 'text-amber-200/90'
              }`}
            >
              Initiative Foundation
            </motion.p>

            {/* Animated Luxury DONATE NOW CTA for Instagram Reels - STRICTLY PRIVATE (Only shown in isReelMode) */}
            {isReelMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative my-3 flex flex-col items-center group w-full"
              >
                {/* Radial Pulse Backlight (hidden in green screen mode) */}
                {!isGreenScreen && (
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 via-[#FDB813] to-emerald-500 opacity-60 blur-lg animate-pulse pointer-events-none" />
                )}

                {/* The Shining Pill Badge */}
                <div className={`relative inline-flex items-center gap-2 sm:gap-3 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full ${
                  isGreenScreen
                    ? 'bg-[#063324] border-2 border-amber-400 shadow-2xl'
                    : 'bg-gradient-to-r from-[#0a5c42] via-[#084c36] to-[#04281c] border-2 border-amber-300/90 shadow-[0_0_35px_rgba(253,184,19,0.45)]'
                } overflow-hidden`}>
                  {/* Fast Sweeping Metallic Shimmer Light */}
                  <motion.div
                    animate={{ x: ['-120%', '280%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', repeatDelay: 0.6 }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                  />

                  {/* Pulsing Heart Icon */}
                  <motion.div
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                    className="flex items-center justify-center text-rose-500 fill-rose-500"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  </motion.div>

                  {/* Primary CTA Text */}
                  <span className="font-black text-xs sm:text-base text-white tracking-wider uppercase font-sans drop-shadow-sm">
                    DONATE NOW
                  </span>

                  <span className="text-amber-300/60 text-xs font-mono">•</span>

                  {/* Supporting Seva Text */}
                  <span className="text-[#FDB813] font-extrabold text-[11px] sm:text-xs tracking-wide uppercase font-sans drop-shadow-[0_0_10px_rgba(253,184,19,0.5)]">
                    SUPPORT SEVA
                  </span>

                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FDB813] animate-spin" style={{ animationDuration: '3.5s' }} />
                </div>

                {/* Verified Badges Row */}
                <div className={`flex items-center gap-2 mt-2.5 text-[10px] sm:text-[11px] font-mono tracking-wide ${
                  isGreenScreen ? 'text-black font-extrabold' : 'text-amber-200/90'
                }`}>
                  <span className={`flex items-center gap-1 font-semibold ${isGreenScreen ? 'text-black font-extrabold' : 'text-emerald-400'}`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>80G TAX BENEFIT</span>
                  </span>
                  <span className={isGreenScreen ? 'text-black/60 font-bold' : 'text-neutral-400'}>•</span>
                  <span className={isGreenScreen ? 'text-black font-extrabold' : 'text-neutral-300'}>WWW.RISEUPHELP.ORG</span>
                </div>
              </motion.div>
            )}

            {/* Interactive Inauguration Ribbon Card (When Active) OR Progress Bar (For Normal Public Visitors) */}
            {!isReelMode && (
              isInaugurationMode && isReadyForCeremony ? (
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
              )
            )}
          </div>

          {/* Sleek Developer Attribution Badge (Hidden on Green Screen for clean video editing chroma key) */}
          {!isGreenScreen && (
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
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

