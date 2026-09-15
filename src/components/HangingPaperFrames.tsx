import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Heart,
  Sparkles,
  Move,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from 'lucide-react';
import type { ChildSpotlightProfile } from '../types';
import {
  INITIAL_CHILD_SPOTLIGHTS,
  SPOTLIGHT_LEFT_PROFILES,
  SPOTLIGHT_RIGHT_PROFILES,
} from '../data/mockData';

interface HangingPaperFramesProps {
  isIntroReady?: boolean;
  childLeft?: ChildSpotlightProfile;
  childRight?: ChildSpotlightProfile;
  leftProfiles?: ChildSpotlightProfile[];
  rightProfiles?: ChildSpotlightProfile[];
  onSelectChild?: (child: ChildSpotlightProfile) => void;
  showFrames?: boolean;
  showLeftFrame?: boolean;
  showRightFrame?: boolean;
  frameTheme?: 'matte-white' | 'gold-foil' | 'vintage-polaroid' | 'emerald';
  frameStrap?: 'short' | 'standard' | 'long';
  frameMotion?: 'gentle' | 'calm' | 'dynamic';
  autoRotate?: boolean;
}

export const HangingPaperFrames: React.FC<HangingPaperFramesProps> = ({
  isIntroReady = true,
  childLeft = INITIAL_CHILD_SPOTLIGHTS.left,
  childRight = INITIAL_CHILD_SPOTLIGHTS.right,
  leftProfiles,
  rightProfiles,
  onSelectChild,
  showFrames = true,
  showLeftFrame = true,
  showRightFrame = true,
  frameTheme = 'matte-white',
  frameStrap = 'standard',
  frameMotion = 'gentle',
  autoRotate = true,
}) => {
  const strapClass =
    frameStrap === 'short'
      ? 'w-7 h-36 sm:h-44'
      : frameStrap === 'long'
      ? 'w-7 h-60 sm:h-72'
      : 'w-7 h-48 sm:h-56';

  const themeFrameClass =
    frameTheme === 'gold-foil'
      ? 'bg-[#fefdf9] border-2 border-amber-300 ring-2 ring-amber-400/40 shadow-[0_25px_45px_-10px_rgba(217,119,6,0.35)]'
      : frameTheme === 'vintage-polaroid'
      ? 'bg-[#faf6ee] border border-stone-300 ring-1 ring-stone-400/20 shadow-[0_25px_45px_-10px_rgba(50,40,30,0.3)]'
      : frameTheme === 'emerald'
      ? 'bg-[#f8fdfa] border-2 border-emerald-400 ring-2 ring-emerald-500/30 shadow-[0_25px_45px_-10px_rgba(8,76,54,0.35)]'
      : 'bg-white border border-neutral-200/90 shadow-[0_25px_45px_-10px_rgba(0,0,0,0.28)]';

  // Build composite lists: user customized child from props is ALWAYS index 0
  const leftList: ChildSpotlightProfile[] = React.useMemo(() => {
    const rawList = leftProfiles && leftProfiles.length > 0 ? leftProfiles : SPOTLIGHT_LEFT_PROFILES;
    if (!childLeft) return rawList;
    const filtered = rawList.filter(
      (c) => c.id !== childLeft.id && c.name?.toLowerCase() !== childLeft.name?.toLowerCase()
    );
    return [childLeft, ...filtered];
  }, [leftProfiles, childLeft]);

  const rightList: ChildSpotlightProfile[] = React.useMemo(() => {
    const rawList = rightProfiles && rightProfiles.length > 0 ? rightProfiles : SPOTLIGHT_RIGHT_PROFILES;
    if (!childRight) return rawList;
    const filtered = rawList.filter(
      (c) => c.id !== childRight.id && c.name?.toLowerCase() !== childRight.name?.toLowerCase()
    );
    return [childRight, ...filtered];
  }, [rightProfiles, childRight]);

  // Active rotation indices
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  // Instantly reset indices whenever user edits childLeft or childRight in admin portal
  useEffect(() => {
    setLeftIndex(0);
  }, [childLeft?.image, childLeft?.name, childLeft?.title, childLeft?.story]);

  useEffect(() => {
    setRightIndex(0);
  }, [childRight?.image, childRight?.name, childRight?.title, childRight?.story]);

  // Proactively pre-decode all warrior profile photos to eliminate black frames during rotation
  useEffect(() => {
    const allPhotos = [...leftList, ...rightList].map((p) => p.image).filter(Boolean);
    allPhotos.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, [leftList, rightList]);

  // Pause on hover states
  const [isPausedLeft, setIsPausedLeft] = useState(false);
  const [isPausedRight, setIsPausedRight] = useState(false);

  const leftMotionClass =
    frameMotion === 'calm'
      ? ''
      : !isPausedLeft
      ? 'animate-paper-sway-left'
      : '';

  const rightMotionClass =
    frameMotion === 'calm'
      ? ''
      : !isPausedRight
      ? 'animate-paper-sway-right'
      : '';

  // Left frame auto-rotation: every 6 seconds (if autoRotate is true)
  useEffect(() => {
    if (autoRotate === false || isPausedLeft || leftList.length <= 1) return;
    const interval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % leftList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoRotate, isPausedLeft, leftList.length]);

  // Right frame auto-rotation: every 6 seconds with a 3-second offset (if autoRotate is true)
  useEffect(() => {
    if (autoRotate === false || isPausedRight || rightList.length <= 1) return;
    const initialDelay = setTimeout(() => {
      setRightIndex((prev) => (prev + 1) % rightList.length);
    }, 3000);

    const interval = setInterval(() => {
      setRightIndex((prev) => (prev + 1) % rightList.length);
    }, 6000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [autoRotate, isPausedRight, rightList.length]);

  // Unified list for single mobile spotlight frame (combining left and right profiles)
  const mobileList = React.useMemo(() => {
    const list: ChildSpotlightProfile[] = [];
    const max = Math.max(leftList.length, rightList.length);
    for (let i = 0; i < max; i++) {
      if (i < leftList.length) list.push(leftList[i]);
      if (i < rightList.length && !leftList.some((l) => l.id === rightList[i].id)) {
        list.push(rightList[i]);
      }
    }
    return list.length > 0 ? list : leftList;
  }, [leftList, rightList]);

  const [mobileIndex, setMobileIndex] = useState(0);

  // Mobile auto-rotation every 5.5s
  useEffect(() => {
    if (autoRotate === false || isPausedLeft || mobileList.length <= 1) return;
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % mobileList.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [autoRotate, isPausedLeft, mobileList.length]);

  const handlePrevMobile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileIndex((prev) => (prev - 1 + mobileList.length) % mobileList.length);
  };

  const handleNextMobile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileIndex((prev) => (prev + 1) % mobileList.length);
  };

  const activeLeft = leftList[leftIndex] || leftList[0] || childLeft;
  const activeRight = rightList[rightIndex] || rightList[0] || childRight;
  const activeMobile = mobileList[mobileIndex % mobileList.length] || activeLeft;

  const handlePrevLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLeftIndex((prev) => (prev - 1 + leftList.length) % leftList.length);
  };

  const handleNextLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLeftIndex((prev) => (prev + 1) % leftList.length);
  };

  const handlePrevRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRightIndex((prev) => (prev - 1 + rightList.length) % rightList.length);
  };

  const handleNextRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRightIndex((prev) => (prev + 1) % rightList.length);
  };

  const handleSelectLeft = (e?: React.MouseEvent | unknown) => {
    if (e && typeof e === 'object' && 'stopPropagation' in e) {
      (e as React.MouseEvent).stopPropagation();
    }
    if (onSelectChild) {
      onSelectChild(activeLeft);
    }
  };

  const handleSelectRight = (e?: React.MouseEvent | unknown) => {
    if (e && typeof e === 'object' && 'stopPropagation' in e) {
      (e as React.MouseEvent).stopPropagation();
    }
    if (onSelectChild) {
      onSelectChild(activeRight);
    }
  };

  if (showFrames === false || (showLeftFrame === false && showRightFrame === false)) return null;

  return (
    <>
      {/* =========================================================================
          1. LEFT HANGING 3D PAPER FRAME (Auto-Rotating Healthcare & Cancer Warriors)
          ========================================================================= */}
      {showLeftFrame !== false && (
        <div className="hidden lg:block absolute top-0 left-[0.5%] xl:left-[1%] 2xl:left-[2%] z-40 pointer-events-none select-none">
        {/* Drop Entrance Animation */}
        <motion.div
          initial={{ y: '-130%', opacity: 0 }}
          animate={isIntroReady ? { y: '0%', opacity: 1 } : { y: '-130%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 65,
            damping: 14,
            mass: 1.1,
            delay: 0.35,
          }}
          style={{ transformOrigin: 'top center' }}
        >
          {/* Continuous Micro-Swinging Pendulum Loop (Pure CSS Off-Thread Animation) */}
          <div
            className={`flex flex-col items-center pointer-events-auto gpu-layer ${leftMotionClass}`}
            style={{
              transformOrigin: 'top center',
            }}
            onMouseEnter={() => setIsPausedLeft(true)}
            onMouseLeave={() => setIsPausedLeft(false)}
          >
            {/* Long Solid White Strap Wire (h-56 behind navbar pill) */}
            <div
              className={`${strapClass} bg-white border-x border-b border-neutral-200/90 shadow-xs relative z-0`}
              style={{
                background:
                  'linear-gradient(to right, #f4f4f4 0%, #ffffff 25%, #ffffff 75%, #ededed 100%)',
              }}
            >
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-neutral-200/60 -translate-x-1/2" />
            </div>

            {/* Clickable & Draggable 3D Matte Paper Frame */}
            <motion.div
              drag
              dragMomentum={false}
              dragConstraints={{ top: -40, bottom: 120, left: -60, right: 60 }}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 260, bounceDamping: 18 }}
              whileHover={{
                scale: 1.04,
                cursor: 'pointer',
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              whileDrag={{
                scale: 1.08,
                cursor: 'grabbing',
                boxShadow:
                  '0 35px 60px -15px rgba(0, 0, 0, 0.4), 0 16px 28px -8px rgba(0, 0, 0, 0.25)',
              }}
              className={`relative w-[184px] 2xl:w-[204px] p-3 rounded-sm ${themeFrameClass} group transition-shadow duration-300 touch-none cursor-pointer select-none gpu-layer`}
              style={{
                boxShadow:
                  '0 28px 45px -10px rgba(0, 0, 0, 0.3), 0 12px 22px -6px rgba(0, 0, 0, 0.18), 0 0 1px 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
              }}
              onClick={handleSelectLeft}
            >
              {/* Manual Flip Arrow Controls (Visible on Hover) */}
              <button
                type="button"
                onClick={handlePrevLeft}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/85 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md"
                title="Previous Warrior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextLeft}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/85 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md"
                title="Next Warrior"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Inset Photo Window with Seamless Cross-Fade (Never Flashes Black) */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xs border border-neutral-300/80 shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)] bg-neutral-100">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${activeLeft.id}-${activeLeft.image}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={activeLeft.image}
                      alt={activeLeft.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out pointer-events-none"
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/uploads/upload_1788854883629_8bda525a0f.jpg';
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/10 pointer-events-none" />

                    {/* Top Badge: Category & Counter */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className="bg-[#084c36]/90 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-sm shadow-xs tracking-wider uppercase font-mono flex items-center gap-1">
                        <Heart className="w-2.5 h-2.5 text-[#FDB813] fill-[#FDB813]" />
                        <span>{activeLeft.bedNumber ? `RUHS • ${activeLeft.bedNumber}` : activeLeft.category}</span>
                      </span>

                      <span className="bg-black/60 backdrop-blur-sm text-[#FDB813] font-mono text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <RotateCw className="w-2 h-2 text-emerald-400" />
                        <span>
                          {leftIndex + 1}/{leftList.length}
                        </span>
                      </span>
                    </div>

                    {/* Drag Hint */}
                    <div className="absolute top-8 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm p-1 rounded text-white text-[9px] pointer-events-none">
                      <Move className="w-2.5 h-2.5 text-[#FDB813]" />
                    </div>

                    {/* Bottom Location */}
                    <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                      <span className="text-[10px] font-bold text-neutral-100 flex items-center gap-1 drop-shadow-md">
                        <MapPin className="w-2.5 h-2.5 text-[#FDB813]" />
                        <span className="truncate">{activeLeft.location.split(',')[0]}</span>
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Paper Caption Area with Animated Beneficiary Details */}
              <div className="mt-2.5 pt-0.5 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLeft.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-[11px] font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors leading-tight truncate">
                      {activeLeft.name} ({activeLeft.age}y)
                    </h4>
                    <span className="text-[9px] font-mono text-neutral-500 font-semibold tracking-wide block mt-0.5 truncate">
                      {activeLeft.title}
                    </span>

                    {/* Direct Suggested Sponsorship Badge */}
                    <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-bold text-[#084c36]">
                      <span className="text-neutral-500 font-medium text-[9px]">Need:</span>
                      <strong className="text-emerald-950 font-sans">
                        ₹{(activeLeft.monthlyNeed || activeLeft.suggestedDonation).toLocaleString('en-IN')}/mo
                      </strong>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Click CTA Pill */}
                <div className="mt-1.5 inline-flex items-center gap-1 bg-emerald-50 text-[#084c36] group-hover:bg-[#084c36] group-hover:text-white font-bold text-[9px] px-2.5 py-1 rounded-full border border-emerald-200 transition-colors">
                  <Sparkles className="w-2.5 h-2.5 text-[#FDB813]" />
                  <span>View Story & Sponsor</span>
                </div>

                {/* Micro Carousel Dot Indicators */}
                <div className="flex items-center justify-center gap-1 mt-2">
                  {leftList.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLeftIndex(idx);
                      }}
                      className={`h-1 rounded-full transition-all cursor-pointer ${
                        idx === leftIndex
                          ? 'w-4 bg-[#084c36]'
                          : 'w-1 bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      title={`Go to ${leftList[idx]?.name || 'Beneficiary'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Ambient Shadow */}
              <div className="absolute -bottom-8 inset-x-4 h-6 bg-black/28 blur-lg rounded-full pointer-events-none -z-10 group-hover:bg-black/38 transition-all" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      )}

      {/* =========================================================================
          2. RIGHT HANGING 3D PAPER FRAME (Auto-Rotating Education & Livelihood Heroes)
          ========================================================================= */}
      {showRightFrame !== false && (
        <div className="hidden lg:block absolute top-0 right-[0.5%] xl:right-[1%] 2xl:right-[2%] z-40 pointer-events-none select-none">
        {/* Drop Entrance Animation */}
        <motion.div
          initial={{ y: '-130%', opacity: 0 }}
          animate={isIntroReady ? { y: '0%', opacity: 1 } : { y: '-130%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 65,
            damping: 14,
            mass: 1.1,
            delay: 0.48,
          }}
          style={{ transformOrigin: 'top center' }}
        >
          {/* Continuous Micro-Swinging Pendulum Loop (Pure CSS Off-Thread Animation) */}
          <div
            className={`flex flex-col items-center pointer-events-auto gpu-layer ${rightMotionClass}`}
            style={{
              transformOrigin: 'top center',
            }}
            onMouseEnter={() => setIsPausedRight(true)}
            onMouseLeave={() => setIsPausedRight(false)}
          >
            {/* Long Solid White Strap Wire (h-56 behind navbar pill) */}
            <div
              className={`${strapClass} bg-white border-x border-b border-neutral-200/90 shadow-xs relative z-0`}
              style={{
                background:
                  'linear-gradient(to right, #f4f4f4 0%, #ffffff 25%, #ffffff 75%, #ededed 100%)',
              }}
            >
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-neutral-200/60 -translate-x-1/2" />
            </div>

            {/* Clickable & Draggable 3D Matte Paper Frame */}
            <motion.div
              drag
              dragMomentum={false}
              dragConstraints={{ top: -40, bottom: 120, left: -60, right: 60 }}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 260, bounceDamping: 18 }}
              whileHover={{
                scale: 1.04,
                cursor: 'pointer',
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              whileDrag={{
                scale: 1.08,
                cursor: 'grabbing',
                boxShadow:
                  '0 35px 60px -15px rgba(0, 0, 0, 0.4), 0 16px 28px -8px rgba(0, 0, 0, 0.25)',
              }}
              className={`relative w-[184px] 2xl:w-[204px] p-3 rounded-sm ${themeFrameClass} group transition-shadow duration-300 touch-none cursor-pointer select-none gpu-layer`}
              style={{
                boxShadow:
                  '0 28px 45px -10px rgba(0, 0, 0, 0.3), 0 12px 22px -6px rgba(0, 0, 0, 0.18), 0 0 1px 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
              }}
              onClick={handleSelectRight}
            >
              {/* Manual Flip Arrow Controls (Visible on Hover) */}
              <button
                type="button"
                onClick={handlePrevRight}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/85 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md"
                title="Previous Hero"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextRight}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/85 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md"
                title="Next Hero"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Inset Photo Window with Seamless Cross-Fade (Never Flashes Black) */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xs border border-neutral-300/80 shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)] bg-neutral-100">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${activeRight.id}-${activeRight.image}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={activeRight.image}
                      alt={activeRight.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out pointer-events-none"
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/uploads/upload_1788854883630_6eb02e090b.jpg';
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/10 pointer-events-none" />

                    {/* Top Badge: Category & Counter */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className="bg-[#0e6245]/90 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-sm shadow-xs tracking-wider uppercase font-mono flex items-center gap-1">
                        <Heart className="w-2.5 h-2.5 text-[#FDB813] fill-[#FDB813]" />
                        <span>{activeRight.bedNumber ? `RUHS • ${activeRight.bedNumber}` : activeRight.category}</span>
                      </span>

                      <span className="bg-black/60 backdrop-blur-sm text-[#FDB813] font-mono text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <RotateCw className="w-2 h-2 text-emerald-400" />
                        <span>
                          {rightIndex + 1}/{rightList.length}
                        </span>
                      </span>
                    </div>

                    {/* Drag Hint */}
                    <div className="absolute top-8 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm p-1 rounded text-white text-[9px] pointer-events-none">
                      <Move className="w-2.5 h-2.5 text-[#FDB813]" />
                    </div>

                    {/* Bottom Location */}
                    <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                      <span className="text-[10px] font-bold text-neutral-100 flex items-center gap-1 drop-shadow-md">
                        <MapPin className="w-2.5 h-2.5 text-[#FDB813]" />
                        <span className="truncate">{activeRight.location.split(',')[0]}</span>
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Paper Caption Area with Animated Beneficiary Details */}
              <div className="mt-2.5 pt-0.5 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRight.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-[11px] font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors leading-tight truncate">
                      {activeRight.name} ({activeRight.age}y)
                    </h4>
                    <span className="text-[9px] font-mono text-neutral-500 font-semibold tracking-wide block mt-0.5 truncate">
                      {activeRight.title}
                    </span>

                    {/* Direct Suggested Sponsorship Badge */}
                    <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-bold text-[#084c36]">
                      <span className="text-neutral-500 font-medium text-[9px]">Need:</span>
                      <strong className="text-emerald-950 font-sans">
                        ₹{(activeRight.monthlyNeed || activeRight.suggestedDonation).toLocaleString('en-IN')}/mo
                      </strong>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Click CTA Pill */}
                <div className="mt-1.5 inline-flex items-center gap-1 bg-emerald-50 text-[#084c36] group-hover:bg-[#084c36] group-hover:text-white font-bold text-[9px] px-2.5 py-1 rounded-full border border-emerald-200 transition-colors">
                  <Sparkles className="w-2.5 h-2.5 text-[#FDB813]" />
                  <span>View Story & Sponsor</span>
                </div>

                {/* Micro Carousel Dot Indicators */}
                <div className="flex items-center justify-center gap-1 mt-2">
                  {rightList.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRightIndex(idx);
                      }}
                      className={`h-1 rounded-full transition-all cursor-pointer ${
                        idx === rightIndex
                          ? 'w-4 bg-[#084c36]'
                          : 'w-1 bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      title={`Go to ${rightList[idx]?.name || 'Beneficiary'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Ambient Shadow */}
              <div className="absolute -bottom-8 inset-x-4 h-6 bg-black/28 blur-lg rounded-full pointer-events-none -z-10 group-hover:bg-black/38 transition-all" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      )}

      {/* =========================================================================
          3. MOBILE & TABLET AUTO-ROTATING SPOTLIGHT (Visible on Screen < lg)
             Single neat centered hanging frame (Clean, non-cramped mobile layout)
          ========================================================================= */}
      <div className="lg:hidden w-full px-4 pt-1 pb-3 relative z-30 pointer-events-auto">
        <div className="max-w-[280px] sm:max-w-xs mx-auto">
          {/* Subtle hanging wire and wooden pin at top */}
          <div className="flex flex-col items-center mb-1 select-none">
            <div className="w-8 h-2 bg-neutral-200 border-x border-t border-neutral-300 rounded-t-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#084c36] border-2 border-white shadow-xs -mt-1 z-10" />
          </div>

          {/* Clean Single Hanging Card */}
          <div
            onClick={() => onSelectChild && onSelectChild(activeMobile)}
            className="bg-white p-3 rounded-2xl border border-neutral-200/90 shadow-md flex flex-col cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden group"
          >
            {/* Beneficiary Photo */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-2 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeMobile.id}
                  src={activeMobile.image}
                  alt={activeMobile.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Tag / Category Badge */}
              <span className="absolute top-2 left-2 bg-[#084c36]/90 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono shadow-xs">
                {activeMobile.bedNumber || activeMobile.category}
              </span>

              {/* Counter Badge */}
              <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-[#FDB813] text-[9px] font-mono px-1.5 py-0.5 rounded shadow-xs">
                {(mobileIndex % mobileList.length) + 1}/{mobileList.length}
              </span>

              {/* Bedside Verified pill */}
              <span className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs text-[#084c36] text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Bedside Verified</span>
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex items-start justify-between gap-1 mb-1">
              <div className="min-w-0 pr-1">
                <strong className="text-xs sm:text-sm font-extrabold text-neutral-900 truncate block">
                  {activeMobile.name} ({activeMobile.age} yrs)
                </strong>
                <span className="text-[10px] sm:text-[11px] text-neutral-500 truncate block">
                  {activeMobile.title}
                </span>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[11px] sm:text-xs font-black text-[#084c36]">
                  ₹{(activeMobile.monthlyNeed || activeMobile.suggestedDonation).toLocaleString('en-IN')}
                </div>
                <span className="text-[8px] text-neutral-400 block -mt-0.5">per month</span>
              </div>
            </div>

            {/* Action Bar & Controls */}
            <div className="mt-1.5 pt-2 border-t border-neutral-100 flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevMobile}
                className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors shrink-0 cursor-pointer active:scale-95"
                aria-label="Previous child"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex-1 bg-emerald-50 group-hover:bg-[#084c36] group-hover:text-white text-[#084c36] text-[10px] sm:text-xs font-bold py-1.5 text-center rounded-lg border border-emerald-200 transition-all flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500 shrink-0 group-hover:fill-white group-hover:text-white transition-colors" />
                <span>View Story & Sponsor</span>
              </div>

              <button
                type="button"
                onClick={handleNextMobile}
                className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors shrink-0 cursor-pointer active:scale-95"
                aria-label="Next child"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
