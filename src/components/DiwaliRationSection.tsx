import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  CheckCircle2,
  Phone,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Check,
  Maximize2,
  X,
  Heart,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import type { DriveItem } from '../types';
import { DRIVE_ITEMS } from '../data/mockData';

interface DiwaliRationSectionProps {
  onOpenSponsorModal: (
    item?: DriveItem,
    initialData?: { name: string; phone: string; quantity: number }
  ) => void;
}

/**
 * Elegant, Minimalist Brass & Clay Diya with a Natural Living Flame
 */
export const AestheticDiya: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dims = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-12 h-12' : 'w-9 h-9';
  return (
    <div className={`relative ${dims} flex items-center justify-center shrink-0 select-none ${className}`}>
      {/* Warm Breathing Candlelight Aura */}
      <div
        className="absolute inset-0 rounded-full bg-amber-400/35 blur-md pointer-events-none"
        style={{ animation: 'candle-glow-pulse 3s ease-in-out infinite' }}
      />

      {/* Sleek Minimalist Diya SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-sm">
        <defs>
          <linearGradient id="brassClayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="45%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="livingFlameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#fdb813" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Earthen / Brass Saucer Base */}
        <path
          d="M 20 66 C 20 84 80 84 80 66 C 72 66 64 70 50 70 C 36 70 28 66 20 66 Z"
          fill="url(#brassClayGrad)"
          stroke="#78350f"
          strokeWidth="1.2"
        />

        {/* Golden Lip */}
        <ellipse cx="50" cy="66" rx="30" ry="3.5" fill="#fdb813" opacity="0.85" />

        {/* Wick */}
        <circle cx="50" cy="65" r="1.5" fill="#291206" />

        {/* Living Flame */}
        <g
          style={{
            transformOrigin: '50px 64px',
            animation: 'diya-flame-organic 2s ease-in-out infinite',
          }}
        >
          <path
            d="M 50 20 C 58 35 63 48 57 57 C 53 62 47 62 43 57 C 37 48 42 35 50 20 Z"
            fill="url(#livingFlameGrad)"
          />
          <path
            d="M 50 29 C 54 39 56 48 53 53 C 51 56 49 56 47 53 C 44 48 46 39 50 29 Z"
            fill="#ffffff"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
};

// Compact 13 Essential Grocery Items for a neat, aesthetic manifest
const COMPACT_RATION_ITEMS = [
  { name: '10kg आटा', brand: 'Laxmi Bhog', icon: '🌾' },
  { name: '1L सरसों तेल', brand: 'Kacchi Ghani', icon: '🫗' },
  { name: '1kg नमक', brand: 'Tata Salt', icon: '🧂' },
  { name: '1kg मिक्स दाल', brand: 'Whole Farm', icon: '🍲' },
  { name: 'सोया चंक्स', brand: 'Fortune Soya', icon: '🥣' },
  { name: '1kg चावल', brand: 'Clean Rice', icon: '🍚' },
  { name: '1kg चीनी', brand: 'Pure Sugar', icon: '🍬' },
  { name: 'मीठा बूरा', brand: 'Sweet Boora', icon: '🍯' },
  { name: 'चाय पत्ती', brand: 'CTC Tea', icon: '☕' },
  { name: 'हल्दी पाउडर', brand: 'Haldi', icon: '🌿' },
  { name: 'लाल मिर्च', brand: 'Lal Mirch', icon: '🌶️' },
  { name: 'धनिया पाउडर', brand: 'Dhaniya', icon: '🌿' },
  { name: 'साबुत जीरा', brand: 'Jeera', icon: '🌾' },
];

export const DiwaliRationSection: React.FC<DiwaliRationSectionProps> = ({
  onOpenSponsorModal,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);
  const [isShareCopied, setIsShareCopied] = useState(false);

  const diwaliItem: DriveItem = DRIVE_ITEMS.find((d) => d.id === 'diwali-ration-kit') || {
    id: 'diwali-ration-kit',
    name: 'Diwali Family Ration & Happiness Kit',
    tagline: 'इस दीपावली, खुशियाँ बाँटने का संकल्प • 13 Essential Items',
    category: 'livelihood',
    price: 1100,
    unitLabel: 'Family Kit',
    targetCount: '1,500 Kits Target',
    deliveredCount: '340 Distributed',
    percentage: 23,
    color: '#b45309',
    badge: 'Diwali Special Seva',
    image: '/uploads/diwali_ration_kit_2026.jpg',
    description:
      'Complete festive grocery kit containing 13 everyday essentials: Atta, Mustard Oil, Tata Salt, Mix Dal, Fortune Soya Chunks, Rice, Sugar, Boora, Tea, Haldi, Mirch, Dhaniya, and Jeera.',
    impactMetrics: '1,500+ needy families gifted complete monthly provisions for Diwali.',
    options: {
      primary: '1 Ration Kit (₹1,100)',
      secondary: 'Multiple Family Kits',
    },
    status: 'active',
  };

  const unitPrice = 1100;
  const totalAmount = quantity * unitPrice;

  const handleSponsor = (qty: number = quantity) => {
    onOpenSponsorModal(diwaliItem, {
      name: '',
      phone: '',
      quantity: qty,
    });
  };

  const handleWhatsAppShare = () => {
    const shareText = `🪔 *इस दीपावली, खुशियाँ बाँटने का संकल्प लें।* ❤️

इस वर्ष *Rise Up Help Initiative Foundation* जरूरतमंद परिवारों तक राशन पहुँचाकर उनकी दीपावली को खुशहाल बनाने का प्रयास कर रही है।

हमारी ओर से प्रत्येक ₹1,100 की राशन किट में रोज़मर्रा की ज़रूरत का सामान शामिल है:
🌾 10kg आटा (Laxmi Bhog)
🫗 सरसों का तेल
🧂 टाटा नमक
🍲 मिक्स दाल
🥣 सोयाबीन / सोया चंक्स
🍚 चावल
🍬 चीनी व बूरा
☕ चाय पत्ती
🌿 हल्दी, मिर्च, धनिया व जीरा

हमारा उद्देश्य है कि इस दीपावली हर जरूरतमंद परिवार के घर में चूल्हा जले और कोई भी परिवार त्योहार की खुशियों से वंचित न रहे।

👉 *एक किट (₹1,100) स्पॉन्सर करें:*
https://riseuphelp.org/#diwali-seva

*Rise Up Help Initiative Foundation*
📞 Helpline: +91 9828291119
🌐 https://riseuphelp.org`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    setIsShareCopied(true);
    setTimeout(() => setIsShareCopied(false), 2500);
  };

  return (
    <section id="diwali-seva" className="py-6 sm:py-10 px-2.5 sm:px-4 max-w-7xl mx-auto text-neutral-900 relative">
      {/* Warm Diwali Illuminated Card (Rich Warm Amber/Terracotta festive theme, NOT pitch black) */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#2a1306] via-[#1f0d04] to-[#140802] border border-amber-500/40 text-white shadow-[0_0_50px_rgba(245,158,11,0.18)] overflow-hidden p-4 sm:p-6 lg:p-7 relative transition-all duration-300">
        
        {/* Warm Radiant Diwali Ambient Lighting in Background */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[550px] h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"
          style={{ animation: 'candle-glow-pulse 4s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-20 right-10 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"
          style={{ animation: 'candle-glow-pulse 5s ease-in-out infinite 1s' }}
        />

        {/* Delicate Golden Sparkles in Background */}
        {[
          { top: '15%', left: '4%', delay: '0s' },
          { top: '35%', left: '96%', delay: '1.2s' },
          { top: '75%', left: '6%', delay: '2.1s' },
          { top: '85%', left: '94%', delay: '0.8s' },
        ].map((ember, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 pointer-events-none"
            style={{
              top: ember.top,
              left: ember.left,
              boxShadow: '0 0 8px #FDB813',
              animation: `golden-ember-float 4s ease-in-out infinite ${ember.delay}`,
            }}
          />
        ))}

        {/* Section Header: Compact, Warm, Readable */}
        <div className="relative z-10 max-w-3xl mb-5 sm:mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-mono font-medium mb-2 shadow-xs">
            <span>✨</span>
            <span className="tracking-wide">शुभ दीपावली सेवा २०२६ • JAIPUR GROUND RELIEF</span>
          </div>

          <div className="flex items-center gap-2.5 my-0.5">
            <AestheticDiya size="sm" />
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-[#FDB813] tracking-tight leading-tight">
              इस दीपावली, खुशियाँ बाँटने का संकल्प लें
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-amber-100/85 mt-1.5 leading-relaxed max-w-2xl font-normal">
            हर जरूरतमंद परिवार के घर में चूल्हा जले और कोई भी त्योहार की खुशियों से वंचित न रहे। आपका छोटा-सा सहयोग किसी परिवार तक 13 आवश्यक सामग्रियों वाली राशन किट पहुँचाता है।
          </p>
        </div>

        {/* Main Grid: Height-Balanced Two-Column Layout (Compact on Phone & Desktop) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
          
          {/* Left Column: Compact Photo & Quick Ground Progress */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3 text-left">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-amber-500/35 bg-black/40 shadow-lg group">
              <img
                src="/uploads/diwali_ration_kit_2026.jpg"
                alt="Actual Diwali Ration Kits at Jaipur Hub"
                className="w-full h-56 sm:h-64 lg:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

              {/* Photo pill */}
              <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md border border-amber-400/30 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono text-amber-200 flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Jaipur Ground Stock</span>
              </div>

              {/* Zoom Trigger */}
              <button
                type="button"
                onClick={() => setIsPhotoZoomed(true)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 hover:bg-black text-amber-200 hover:text-white transition-colors cursor-pointer border border-white/15 shadow-md"
                title="View Full Resolution Photo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Bottom Caption on Photo */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-semibold mb-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>100% Genuine Branded Groceries</span>
                </div>
                <p className="text-[11px] text-neutral-200 leading-tight line-clamp-2">
                  Laxmi Bhog Atta, Tata Salt, Mustard Oil, Fortune Soya, Rice, Dal & Spices packed for direct doorstep handover.
                </p>
              </div>
            </div>

            {/* Compact Progress Bar */}
            <div className="bg-amber-950/30 border border-amber-500/25 rounded-xl p-3 shadow-xs">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-amber-100 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Goal: 1,500 Families</span>
                </span>
                <span className="text-amber-400 font-mono font-bold">340 Delivered (23%)</span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden p-0.5 border border-amber-500/20">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-[#FDB813] to-amber-300 rounded-full shadow-[0_0_6px_rgba(253,184,19,0.5)]"
                  style={{ width: '23%' }}
                />
              </div>
            </div>

            {/* Helpline strip */}
            <div className="bg-amber-950/25 border border-amber-500/20 rounded-xl px-3 py-2 text-[11px] text-amber-200/80 flex items-center justify-between">
              <span className="italic">"आपका सहयोग, किसी की मुस्कान।"</span>
              <a
                href="tel:+919828291119"
                className="text-amber-300 hover:text-amber-200 font-mono font-bold flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-amber-400" />
                <span>+91 9828291119</span>
              </a>
            </div>
          </div>

          {/* Right Column: Compact 13-Item Manifest & Tactile 1-Click Sponsorship */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3 text-left">
            
            {/* Compact 13 Items Manifest Card (3-4 columns of slim chips, NOT tall 7 rows!) */}
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    राशन किट सामग्री (13 Items Included)
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2 py-0.2 rounded-full">
                  ₹1,100 / Kit
                </span>
              </div>

              {/* Compact Aesthetic Chips: 2 cols on tiny screens, 3 cols on sm, 4 cols on lg */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                {COMPACT_RATION_ITEMS.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 bg-black/40 hover:bg-black/60 border border-amber-500/20 hover:border-amber-400/50 rounded-lg px-2 py-1.5 text-neutral-200 transition-colors shadow-2xs"
                  >
                    <span className="text-xs shrink-0">{entry.icon}</span>
                    <div className="min-w-0 flex-1 leading-none">
                      <p className="text-[11px] font-semibold text-white truncate">{entry.name}</p>
                      <p className="text-[9px] text-amber-300/75 truncate font-mono mt-0.5">{entry.brand}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2.5 pt-2 border-t border-amber-500/20 text-[10px] sm:text-[11px] text-amber-200/70 flex items-center justify-between flex-wrap gap-1">
                <span>+ इको-फ्रेंडली बैग व घर-घर वितरण</span>
                <span className="text-emerald-400 font-medium">100% Direct Ground Delivery</span>
              </div>
            </div>

            {/* Tactile Sponsor Card */}
            <div className="bg-amber-950/35 border border-amber-500/35 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-md">
              <label className="text-[11px] font-bold text-amber-200 uppercase tracking-wider block mb-2 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Select Family Kits to Sponsor</span>
              </label>

              {/* Preset Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
                {[
                  { count: 1, label: '1 Family', amount: 1100 },
                  { count: 2, label: '2 Families', amount: 2200 },
                  { count: 5, label: '5 Families', amount: 5500 },
                  { count: 10, label: '10 Families', amount: 11000 },
                ].map((preset) => (
                  <button
                    key={preset.count}
                    type="button"
                    onClick={() => setQuantity(preset.count)}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                      quantity === preset.count
                        ? 'bg-gradient-to-r from-[#FDB813] to-amber-400 text-neutral-950 border-[#FDB813] shadow-[0_0_12px_rgba(253,184,19,0.35)] font-extrabold scale-102'
                        : 'bg-black/35 hover:bg-black/50 text-neutral-200 border-amber-500/20 hover:border-amber-400/40'
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className="text-[10px] font-mono opacity-90 mt-0.5">₹{preset.amount.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>

              {/* Quantity Stepper & Total Contribution */}
              <div className="flex items-center justify-between gap-2 bg-black/50 border border-amber-500/25 rounded-xl p-2.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 font-bold flex items-center justify-center transition-colors cursor-pointer text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <div className="px-2 text-center min-w-[60px]">
                    <span className="text-sm sm:text-base font-bold text-white font-mono">
                      {quantity} {quantity === 1 ? 'Kit' : 'Kits'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 font-bold flex items-center justify-center transition-colors cursor-pointer text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-amber-200/70 font-mono block">Contribution</span>
                  <span className="text-lg sm:text-xl font-extrabold text-[#FDB813] font-mono">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* 2 Primary Actions: Fast Sponsor & WhatsApp Share */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSponsor(quantity)}
                  className="gold-shimmer-btn w-full bg-gradient-to-r from-[#FDB813] via-amber-400 to-[#FDB813] hover:brightness-105 active:scale-98 text-neutral-950 font-bold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-[0_0_15px_rgba(253,184,19,0.35)] transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Heart className="w-3.5 h-3.5 fill-neutral-950" />
                  <span>Sponsor {quantity} Kit{quantity > 1 ? 's' : ''} (₹{totalAmount.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-neutral-950 font-bold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  {isShareCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Opening WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share on WhatsApp</span>
                    </>
                  )}
                </button>
              </div>

              {/* Compliance & Receipts */}
              <div className="flex items-center justify-between flex-wrap gap-1.5 pt-2.5 mt-2.5 border-t border-amber-500/20 text-[10px] text-amber-200/70">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>80G Tax Exemption • Instant Digital Receipt</span>
                </span>
                <span className="font-mono">Section 8 Registered Non-Profit</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Lightbox for Authentic Ground Photo */}
      <AnimatePresence>
        {isPhotoZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl w-full bg-neutral-950 rounded-2xl overflow-hidden border border-amber-500/30 p-2 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setIsPhotoZoomed(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src="/uploads/diwali_ration_kit_2026.jpg"
                alt="Diwali Ration Kits High Res"
                className="w-full max-h-[82vh] object-contain rounded-xl"
              />
              <div className="p-3 text-left">
                <p className="text-xs text-neutral-200">
                  Rise Up Help Initiative Foundation — Authentic Ground Photograph of Packed Diwali Ration Kits (Laxmi Bhog Atta, Tata Salt, Mustard Oil, Fortune Soya Chunks, Dal, Rice & Spices).
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
