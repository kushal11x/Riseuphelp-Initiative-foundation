import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronRight, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { Navbar, type AppView } from './Navbar';
import { SponsorshipGrid } from './SponsorshipGrid';
import { HangingPaperFrames } from './HangingPaperFrames';
import { smoothScrollTo } from '../utils/smoothScroll';
import type { DriveItem, ChildSpotlightProfile, DonorProfile, HeroContentConfig } from '../types';
import type { LanguageMode } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  isIntroReady?: boolean;
  childLeft?: ChildSpotlightProfile;
  childRight?: ChildSpotlightProfile;
  onSelectChild?: (child: ChildSpotlightProfile) => void;
  onOpenAdmin?: () => void;
  onOpenAuthModal?: () => void;
  currentUser?: DonorProfile | null;
  onOpenSponsorModal: (
    item?: DriveItem,
    initialData?: { name: string; phone: string; quantity: number }
  ) => void;
  onOpenRecruitment: () => void;
  onOpenCart?: () => void;
  onNavigateView: (view: AppView) => void;
  activeView?: AppView;
  cartCount: number;
  language?: LanguageMode;
  onChangeLanguage?: (lang: LanguageMode) => void;
  onOpenCustomDateModal?: () => void;
  heroContent?: HeroContentConfig;
  driveItems?: DriveItem[];
  leftProfiles?: ChildSpotlightProfile[];
  rightProfiles?: ChildSpotlightProfile[];
}

export const Hero: React.FC<HeroProps> = ({
  isIntroReady = true,
  childLeft,
  childRight,
  onSelectChild,
  onOpenAdmin,
  onOpenAuthModal,
  currentUser,
  onOpenSponsorModal,
  onOpenRecruitment,
  onOpenCart,
  onNavigateView,
  activeView = 'home',
  cartCount,
  language = 'en',
  onChangeLanguage,
  onOpenCustomDateModal,
  heroContent,
  driveItems,
  leftProfiles,
  rightProfiles,
}) => {
  const [showMatrix, setShowMatrix] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Keep background video playing smoothly and continuously
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const handleSponsorClick = () => {
    setShowMatrix(true);
    smoothScrollTo('sponsorship-grid', 700, 40);
  };

  // Luxury Slow Masked Word Animation Stagger Variants
  const wordAnimationVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: 'blur(12px)',
      scale: 0.98,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 1.05,
        delay: 0.15 + i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[700px] w-full rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden flex flex-col justify-between"
    >
      {/* 1. Cinematic Background Video with Original Specifications */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          poster={heroContent?.posterUrl || "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=60"}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[1.0] contrast-[1.02] gpu-layer"
          style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
        >
          <source
            src={heroContent?.videoUrl || "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4"}
            type="video/mp4"
          />
        </video>
        
        {/* Crisp Light Overlay (NO dimming or dark gradient layer) */}
        <div className="absolute inset-0 bg-white/10 pointer-events-none z-0" />
      </div>

      {/* 2. Floating Pill Navbar (Topmost Z-50 Layer: 100% IN FRONT OF ALL STRAPS) */}
      <div className="relative z-50 pointer-events-auto w-full">
        <Navbar
          logoUrl={heroContent?.logoUrl}
          onOpenSponsorModal={() => {
            setShowMatrix(true);
            onOpenSponsorModal();
          }}
          onOpenRecruitment={onOpenRecruitment}
          onOpenCart={onOpenCart}
          onNavigateView={onNavigateView}
          onOpenAdmin={onOpenAdmin}
          currentUser={currentUser}
          onOpenAuthModal={onOpenAuthModal}
          activeView={activeView}
          cartCount={cartCount}
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
      </div>

      {/* 3. 3D Matte Paper Hanging Frames (Straps at z-20 BEHIND Navbar z-50; Cards Clickable at z-40) */}
      <HangingPaperFrames
        isIntroReady={isIntroReady}
        childLeft={childLeft}
        childRight={childRight}
        leftProfiles={leftProfiles}
        rightProfiles={rightProfiles}
        onSelectChild={onSelectChild}
        showFrames={heroContent?.showFrames !== false}
        showLeftFrame={heroContent?.showLeftFrame !== false}
        showRightFrame={heroContent?.showRightFrame !== false}
        frameTheme={heroContent?.frameTheme || 'matte-white'}
        frameStrap={heroContent?.frameStrap || 'standard'}
        frameMotion={heroContent?.frameMotion || 'gentle'}
        autoRotate={heroContent?.frameAutoRotate !== false}
      />

      {/* 4. Foreground Content with Kinetic Typography (pointer-events-none on container so side frame clicks pass cleanly) */}
      <div className="relative z-30 flex flex-col justify-between flex-grow pointer-events-none">
        {/* Global Slow Aesthetic Reveal Hero Content */}
        <div className="flex flex-col items-center px-4 pt-4 sm:pt-8 pb-6 sm:pb-8 text-center max-w-5xl mx-auto pointer-events-auto">
          
          {/* 1. Verification Node Badge (Smooth Glide Down) */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={isIntroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-neutral-300/80 shadow-xs mb-5 sm:mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#084c36] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold text-neutral-800 tracking-wider uppercase flex items-center gap-1.5">
              <span>{heroContent?.badgeText || t.heroBadge}</span>
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#084c36]" />
          </motion.div>

          {/* 2. Kinetic Typography (Clear, Warm, Friendly Title) */}
          <h1
            style={{
              fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              letterSpacing: '-0.03em',
            }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.1] sm:leading-[1.06] text-balance max-w-4xl"
          >
            <span className="inline-block overflow-hidden pb-1">
              <motion.span
                custom={0}
                initial="hidden"
                animate={isIntroReady ? 'visible' : 'hidden'}
                variants={wordAnimationVariants}
                className="inline-block"
              >
                {heroContent?.title1 || t.heroTitle1}
              </motion.span>
            </span>{' '}
            <span className="inline-block overflow-hidden pb-1">
              <motion.span
                custom={1}
                initial="hidden"
                animate={isIntroReady ? 'visible' : 'hidden'}
                variants={wordAnimationVariants}
                className="inline-block text-[#084c36]"
              >
                {heroContent?.title2 || t.heroTitle2}
              </motion.span>
            </span>{' '}
            <span className="inline-block overflow-hidden pb-1">
              <motion.span
                custom={2}
                initial="hidden"
                animate={isIntroReady ? 'visible' : 'hidden'}
                variants={wordAnimationVariants}
                className="inline-block"
              >
                {heroContent?.title3 || t.heroTitle3}
              </motion.span>
            </span>
          </h1>

          {/* 3. Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isIntroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(13px, 3.5vw, 15px)',
            }}
            className="mt-4 sm:mt-5 text-neutral-700 max-w-2xl px-2 font-normal leading-relaxed text-balance"
          >
            {heroContent?.subtitle || t.heroSubtitle}
          </motion.p>

          {/* 4. Action Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            animate={
              isIntroReady
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 22, scale: 0.94 }
            }
            transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[14px]"
          >
            {/* Button A: Sponsor a Drive */}
            <button
              onClick={handleSponsorClick}
              className="group inline-flex items-center gap-3 bg-[#084c36] hover:bg-[#063b2a] text-white rounded-full pl-6 sm:pl-7 pr-2 py-2 sm:py-2.5 font-bold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <span>{t.heroSponsorBtn}</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </button>

            {/* Button B: Explore Story */}
            <button
              onClick={() => onNavigateView('ekadashi')}
              className="liquid-glass border border-white/40 hover:border-neutral-300 text-neutral-900 bg-white/90 hover:bg-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow active:scale-95 cursor-pointer inline-flex items-center gap-2 text-xs sm:text-sm"
            >
              <Sparkles className="w-4 h-4 text-[#FDB813]" />
              <span>{t.heroCalendarBtn}</span>
            </button>
          </motion.div>
        </div>

        {/* Sponsorship Grid Dashboard */}
        <div id="sponsorship-grid" className="w-full pb-4 sm:pb-6 px-2 sm:px-4 flex flex-col items-center relative z-40 pointer-events-auto">
          <AnimatePresence mode="wait">
            {showMatrix ? (
              <motion.div
                key="sponsorship-matrix-panel"
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 35, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                className="w-full pointer-events-auto"
              >
                <SponsorshipGrid
                  driveItems={driveItems}
                  onTriggerCheckout={(item, initialData) => onOpenSponsorModal(item ? item : undefined, initialData)}
                  onCloseMatrix={() => setShowMatrix(false)}
                  onOpenCustomDateModal={onOpenCustomDateModal}
                />
              </motion.div>
            ) : (
              <motion.div
                key="sponsorship-matrix-placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center pt-8 pb-4"
              >
                <button
                  onClick={() => setShowMatrix(true)}
                  className="group inline-flex items-center gap-2 bg-white/80 hover:bg-white/95 backdrop-blur-md text-neutral-800 border border-neutral-300/80 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span className="w-2 h-2 rounded-full bg-[#084c36] animate-pulse" />
                  <span>View Fast Sponsorship Matrix</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
