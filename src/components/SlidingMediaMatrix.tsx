import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, ArrowUpRight, ShieldCheck, X, ChevronRight, Heart } from 'lucide-react';
import type { DriveItem, MediaPhotoCard } from '../types';
import { DRIVE_ITEMS, INITIAL_MEDIA_CARDS_ROW_1, INITIAL_MEDIA_CARDS_ROW_2 } from '../data/mockData';

interface SlidingMediaMatrixProps {
  onSelectDrive?: (item?: DriveItem) => void;
  mediaCardsRow1?: MediaPhotoCard[];
  mediaCardsRow2?: MediaPhotoCard[];
}

export const SlidingMediaMatrix: React.FC<SlidingMediaMatrixProps> = ({
  onSelectDrive,
  mediaCardsRow1,
  mediaCardsRow2,
}) => {
  const row1 = mediaCardsRow1 && mediaCardsRow1.length > 0 ? mediaCardsRow1 : INITIAL_MEDIA_CARDS_ROW_1;
  const row2 = mediaCardsRow2 && mediaCardsRow2.length > 0 ? mediaCardsRow2 : INITIAL_MEDIA_CARDS_ROW_2;

  const [activeLightboxCard, setActiveLightboxCard] = useState<MediaPhotoCard | null>(null);
  const [isReadyToSlide, setIsReadyToSlide] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  // 1. Only run continuous marquee calculation when section is scrolled into or near view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { rootMargin: '250px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Start slide gracefully after brief mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReadyToSlide(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (card: MediaPhotoCard) => {
    setActiveLightboxCard(card);
  };

  const handleDonateFromCard = (card: MediaPhotoCard) => {
    if (onSelectDrive) {
      if (card.driveItemIndex !== undefined && DRIVE_ITEMS[card.driveItemIndex]) {
        onSelectDrive(DRIVE_ITEMS[card.driveItemIndex]);
      } else {
        const customItem: DriveItem = {
          id: card.id,
          name: card.title,
          tagline: `${card.category} • ${card.location}`,
          category: 'hospital',
          price: card.defaultPrice,
          unitLabel: card.unitLabel,
          targetCount: card.stats,
          deliveredCount: 'Active On-Ground Drive',
          percentage: 90,
          color: '#084c36',
          badge: '100% Direct Sourced',
          description: card.fullStory,
          impactMetrics: card.stats,
          options: {
            primary: `Single Unit (₹${card.defaultPrice})`,
            secondary: `5 Units (₹${card.defaultPrice * 5})`,
          },
        };
        onSelectDrive(customItem);
      }
    }
    setActiveLightboxCard(null);
  };

  // Lock body scroll when lightbox modal is active
  useEffect(() => {
    if (activeLightboxCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLightboxCard]);

  return (
    <motion.section
      ref={sectionRef}
      id="sliding-media"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 sm:py-24 overflow-hidden relative select-none"
    >
      {/* Header Container */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#084c36]/10 text-[#084c36] font-semibold text-xs rounded-full px-4 py-1 mb-3 border border-[#084c36]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
          <span>ON-GROUND DISPATCH STREAM • JAIPUR HEADQUARTERS</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 tracking-tight">
          Small actions.{' '}
          <span
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}
            className="text-[#084c36]"
          >
            Visible change.
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-neutral-600">
          Real photos from our verified Rajasthan distribution nodes. Click any photo to inspect on-ground telemetry or sponsor directly.
        </p>
      </div>

      {/* Track 1: Leftward Infinite Acceleration Slider (GPU-Accelerated CSS Marquee) */}
      <div className="flex w-full overflow-hidden relative group/track1 py-2 gpu-layer">
        <div
          className={`flex gap-4 sm:gap-6 flex-nowrap ${
            isReadyToSlide && isInViewport ? 'animate-marquee' : ''
          } hover:[animation-play-state:paused]`}
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        >
          {[...row1, ...row1].map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="relative w-72 sm:w-80 h-96 rounded-3xl overflow-hidden flex-shrink-0 cursor-pointer shadow-md hover:shadow-2xl border border-neutral-200/90 transition-transform duration-300 group/card bg-neutral-900 hover:scale-[1.02]"
              onClick={() => handleCardClick(card)}
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                decoding="async"
              />

              {/* Gradient Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent pointer-events-none" />

              {/* Border Highlight */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover/card:border-white/50 pointer-events-none transition-colors duration-300" />

              {/* Top Tag & Location */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <span className="bg-white/95 text-neutral-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {card.category}
                </span>
                <span className="bg-neutral-900/90 text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3 h-3 text-[#FDB813]" />
                  <span>Jaipur</span>
                </span>
              </div>

              {/* Bottom Content Card */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10 flex flex-col justify-end">
                <span className="text-[11px] font-mono text-[#FDB813] font-semibold tracking-wide">
                  {card.stats}
                </span>
                <h3 className="text-base sm:text-lg font-bold leading-snug mt-1 group-hover/card:text-[#FDB813] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>

                {/* Micro Action Button on Hover */}
                <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-emerald-300">
                  <span className="flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Click to View & Sponsor</span>
                  </span>
                  <div className="flex items-center gap-1 group-hover/card:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Track 2: Rightward Infinite Acceleration Slider (GPU-Accelerated CSS Marquee) */}
      <div className="flex w-full overflow-hidden relative group/track2 py-3 gpu-layer">
        <div
          className={`flex gap-4 sm:gap-6 flex-nowrap ${
            isReadyToSlide && isInViewport ? 'animate-marquee-reverse' : ''
          } hover:[animation-play-state:paused]`}
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        >
          {[...row2, ...row2].map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="relative w-72 sm:w-80 h-96 rounded-3xl overflow-hidden flex-shrink-0 cursor-pointer shadow-md hover:shadow-2xl border border-neutral-200/90 transition-transform duration-300 group/card bg-neutral-900 hover:scale-[1.02]"
              onClick={() => handleCardClick(card)}
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                decoding="async"
              />

              {/* Gradient Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent pointer-events-none" />

              {/* High-Fidelity Glassmorphic Border Highlight */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover/card:border-white/60 pointer-events-none transition-colors duration-300" />

              {/* Top Tag & Location */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <span className="bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {card.category}
                </span>
                <span className="bg-neutral-950/70 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#FDB813]" />
                  <span>Jaipur</span>
                </span>
              </div>

              {/* Bottom Content Card */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10 flex flex-col justify-end">
                <span className="text-[11px] font-mono text-[#FDB813] font-semibold tracking-wide">
                  {card.stats}
                </span>
                <h3 className="text-base sm:text-lg font-bold leading-snug mt-1 group-hover/card:text-[#FDB813] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>

                {/* Micro Action Button on Hover */}
                <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-emerald-300">
                  <span className="flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Click to View & Sponsor</span>
                  </span>
                  <div className="flex items-center gap-1 group-hover/card:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Photo Detail & Donation Lightbox Modal via Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeLightboxCard && (
              <div
                onClick={() => setActiveLightboxCard(null)}
                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/75 backdrop-blur-md"
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="bg-white rounded-3xl sm:rounded-[2.5rem] overflow-hidden max-w-2xl w-full shadow-2xl border border-neutral-200 text-neutral-900 relative flex flex-col max-h-[92vh]"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveLightboxCard(null)}
                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* High-Resolution Hero Photo */}
                  <div className="relative h-64 sm:h-72 w-full flex-shrink-0 bg-neutral-950 overflow-hidden">
                    <img
                      src={activeLightboxCard.image}
                      alt={activeLightboxCard.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-black/30" />

                    {/* Badges on Image */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#084c36] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        {activeLightboxCard.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-mono text-[#FDB813] font-semibold flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{activeLightboxCard.location}</span>
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                        {activeLightboxCard.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 overflow-y-auto space-y-4 text-neutral-700 text-xs sm:text-sm">
                    <div>
                      <h4 className="text-[11px] font-bold uppercase font-mono tracking-wider text-emerald-800 mb-1">
                        Verified On-Ground Seva Dispatch
                      </h4>
                      <p className="leading-relaxed text-neutral-800">
                        {activeLightboxCard.fullStory}
                      </p>
                    </div>

                    {/* Telemetry Box */}
                    <div className="grid grid-cols-2 gap-3 bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
                      <div>
                        <span className="text-[10px] text-neutral-400 font-mono uppercase block">Total Delivered</span>
                        <strong className="text-sm font-bold text-neutral-950">{activeLightboxCard.stats}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 font-mono uppercase block">Per Unit Seva</span>
                        <strong className="text-sm font-bold text-emerald-800">₹{activeLightboxCard.defaultPrice} / {activeLightboxCard.unitLabel}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span>100% Direct Public Ledger • 80G Tax Deductible Receipts</span>
                    </div>
                  </div>

                  {/* Footer Actions: Direct Sponsor Trigger */}
                  <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveLightboxCard(null)}
                      className="text-xs text-neutral-500 hover:text-neutral-900 underline cursor-pointer font-medium"
                    >
                      Close Photo
                    </button>

                    <button
                      onClick={() => handleDonateFromCard(activeLightboxCard)}
                      className="bg-[#084c36] hover:bg-[#063b2a] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ml-auto"
                    >
                      <Heart className="w-4 h-4 text-[#FDB813] fill-[#FDB813]" />
                      <span>Sponsor This Drive (₹{activeLightboxCard.defaultPrice})</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.section>
  );
};
