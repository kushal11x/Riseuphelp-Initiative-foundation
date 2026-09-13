import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Heart, BookOpen, Camera, ArrowRight, Sparkles } from 'lucide-react';
import { Hero } from '../components/Hero';
import { StorySection } from '../components/StorySection';
import { SlidingMediaMatrix } from '../components/SlidingMediaMatrix';
import { ImpactLedger } from '../components/ImpactLedger';
import { ImpactSimulator } from '../components/ImpactSimulator';
import { ClosingEcosystem } from '../components/ClosingEcosystem';
import { Footer } from '../components/Footer';
import type {
  DriveItem,
  ChildSpotlightProfile,
  DonorProfile,
  MediaPhotoCard,
  HeroContentConfig,
  StoryContentConfig,
} from '../types';
import type { AppView } from '../components/Navbar';
import type { LanguageMode } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

interface HomePageProps {
  isIntroReady: boolean;
  childLeft: ChildSpotlightProfile;
  childRight: ChildSpotlightProfile;
  onSelectChild: (child: ChildSpotlightProfile) => void;
  onOpenSponsorModal: (
    item?: DriveItem,
    initialData?: { name: string; phone: string; quantity: number }
  ) => void;
  onOpenCart: () => void;
  onNavigateView: (view: AppView) => void;
  onOpenAdmin?: () => void;
  onOpenAuthModal?: () => void;
  currentUser?: DonorProfile | null;
  cartCount: number;
  mediaPhotosRow1: MediaPhotoCard[];
  mediaPhotosRow2: MediaPhotoCard[];
  language?: LanguageMode;
  onChangeLanguage?: (lang: LanguageMode) => void;
  onOpenCustomDateModal?: () => void;
  heroContent?: HeroContentConfig;
  storyContent?: StoryContentConfig;
  driveItems?: DriveItem[];
  leftProfiles?: ChildSpotlightProfile[];
  rightProfiles?: ChildSpotlightProfile[];
}

export const HomePage: React.FC<HomePageProps> = ({
  isIntroReady,
  childLeft,
  childRight,
  onSelectChild,
  onOpenSponsorModal,
  onOpenCart,
  onNavigateView,
  onOpenAdmin,
  onOpenAuthModal,
  currentUser,
  cartCount,
  mediaPhotosRow1,
  mediaPhotosRow2,
  language = 'en',
  onChangeLanguage,
  onOpenCustomDateModal,
  heroContent,
  storyContent,
  driveItems,
  leftProfiles,
  rightProfiles,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleSimulatedSponsor = (amount: number, _description: string) => {
    const qty = Math.max(1, Math.floor(amount / 65));
    onOpenSponsorModal(undefined, {
      name: currentUser?.fullName || '',
      phone: currentUser?.phone || '',
      quantity: qty,
    });
  };

  return (
    <main className="relative z-10 w-full flex flex-col gap-3 sm:gap-4 animate-in fade-in duration-300">
      {/* Top Hero Container */}
      <Hero
        isIntroReady={isIntroReady}
        childLeft={childLeft}
        childRight={childRight}
        leftProfiles={leftProfiles}
        rightProfiles={rightProfiles}
        onSelectChild={onSelectChild}
        onOpenAdmin={onOpenAdmin}
        onOpenAuthModal={onOpenAuthModal}
        currentUser={currentUser}
        onOpenSponsorModal={onOpenSponsorModal}
        onOpenRecruitment={() => onNavigateView('volunteer')}
        onOpenCart={onOpenCart}
        onNavigateView={onNavigateView}
        activeView="home"
        cartCount={cartCount}
        language={language}
        onChangeLanguage={onChangeLanguage}
        onOpenCustomDateModal={onOpenCustomDateModal}
        heroContent={heroContent}
        driveItems={driveItems}
      />

      {/* 4 HIGH-IMPACT DEDICATED INITIATIVE GATEWAY CARDS (NO ENDLESS SCROLLING) */}
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-2">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#084c36] font-bold text-xs px-3 py-1 rounded-full border border-emerald-200 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
            <span>{t.gatewaysTitle}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {t.gatewaysTitle}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            {t.gatewaysSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Har Ekadashi Bedside Seva */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            onClick={() => onNavigateView('ekadashi')}
            className="flow-light-border flow-card-glow p-5 sm:p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform shadow-xs">
                <Flame className="w-6 h-6 text-[#FDB813] fill-[#FDB813]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-mono border border-emerald-200">
                {t.card1Tag}
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-2 mb-1 group-hover:text-[#084c36] transition-colors leading-snug">
                {t.card1Title}
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-2">
                {t.card1Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#084c36]">
              <span>{t.card1Cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2: Adopt a Cancer Warrior */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            onClick={() => onNavigateView('cancer-warriors')}
            className="flow-light-border flow-card-glow p-5 sm:p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform shadow-xs">
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md font-mono border border-rose-200">
                {t.card2Tag}
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-2 mb-1 group-hover:text-rose-700 transition-colors leading-snug">
                {t.card2Title}
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-2">
                {t.card2Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>{t.card2Cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3: All Children Education & Livelihood */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            onClick={() => onNavigateView('education')}
            className="flow-light-border flow-card-glow p-5 sm:p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform shadow-xs">
                <BookOpen className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md font-mono border border-amber-200">
                {t.card3Tag}
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-2 mb-1 group-hover:text-amber-800 transition-colors leading-snug">
                {t.card3Title}
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-2">
                {t.card3Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>{t.card3Cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 4: The Truth Engine - Live Media Gallery */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            onClick={() => onNavigateView('gallery')}
            className="flow-light-border flow-card-glow p-5 sm:p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#084c36] flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform shadow-xs">
                <Camera className="w-6 h-6 text-[#084c36]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-mono border border-emerald-200">
                {t.card4Tag}
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-2 mb-1 group-hover:text-[#084c36] transition-colors leading-snug">
                {t.card4Title}
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-2">
                {t.card4Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#084c36]">
              <span>{t.card4Cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Below the Fold Matte Gradient Canvas */}
      <div className="w-full matte-gradient-canvas rounded-2xl sm:rounded-3xl border border-neutral-300/80 shadow-sm relative overflow-hidden">
        {/* 1. Foundation Ethos & Story */}
        <StorySection storyContent={storyContent} />

        {/* 2. PROMINENT POSITION: High-Impact Verified On-Ground Photos & Media Stream */}
        <SlidingMediaMatrix
          onSelectDrive={(item) => onOpenSponsorModal(item)}
          mediaCardsRow1={mediaPhotosRow1}
          mediaCardsRow2={mediaPhotosRow2}
        />

        {/* 3. Real-time Jaipur Impact Telemetry */}
        <ImpactLedger />

        {/* 4. Interactive Live Impact Simulator */}
        <ImpactSimulator onSponsorAmount={handleSimulatedSponsor} />
      </div>

      {/* Closing Ecosystem (Full Video Background - Deferred Rendering) */}
      <div className="w-full">
        <ClosingEcosystem onOpenSponsorModal={() => onOpenSponsorModal()} />
      </div>

      {/* Section 8 Credentials & Foundation Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />
    </main>
  );
};
