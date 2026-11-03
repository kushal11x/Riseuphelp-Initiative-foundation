import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Share2,
  CheckCircle2,
  Package,
  Phone,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Flame,
  Check,
  Maximize2,
  X,
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
 * Authentic Hand-Crafted Clay Diya Component with Layered Flickering Flame & Warm Aura
 */
export const DiwaliDiya: React.FC<{ size?: 'sm' | 'md' | 'lg'; glow?: boolean; className?: string }> = ({
  size = 'md',
  glow = true,
  className = '',
}) => {
  const dims = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-14 sm:h-14';
  return (
    <div className={`relative ${dims} flex items-center justify-center shrink-0 select-none ${className}`}>
      {/* Warm Breathing Ambient Halo */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full bg-amber-400/35 blur-xl pointer-events-none"
          style={{ animation: 'diya-aura-pulse 2.2s ease-in-out infinite' }}
        />
      )}

      {/* Pure SVG Mitti Ka Diya with Terracotta Base & Organic Flame */}
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
        <defs>
          <linearGradient id="clayBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#b45309" />
            <stop offset="80%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="flameColorGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="65%" stopColor="#fdb813" />
            <stop offset="100%" stopColor="#fffbeb" />
          </linearGradient>
          <radialGradient id="oilPoolGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Earthen Lamp Stand */}
        <path
          d="M 38 82 Q 50 86 62 82 L 66 89 Q 50 93 34 89 Z"
          fill="#451a03"
          stroke="#291002"
          strokeWidth="0.8"
        />

        {/* Terracotta Diya Body */}
        <path
          d="M 16 64 C 16 86 84 86 84 64 C 76 64 66 69 50 69 C 34 69 24 64 16 64 Z"
          fill="url(#clayBaseGrad)"
          stroke="#78350f"
          strokeWidth="1.2"
        />

        {/* Handcrafted Golden Engraved Rim */}
        <path
          d="M 14 63 Q 50 72 86 63 Q 50 66 14 63 Z"
          fill="#fdb813"
          opacity="0.95"
        />

        {/* Oil Pool inside Diya */}
        <ellipse cx="50" cy="65" rx="28" ry="4" fill="url(#oilPoolGlow)" />

        {/* Black Wick Tip */}
        <path d="M 50 65 L 50 56" stroke="#261005" strokeWidth="2" strokeLinecap="round" />

        {/* Organic Flickering Flame (Teardrop) */}
        <g
          style={{
            transformOrigin: '50px 60px',
            animation: 'diya-flicker 1.8s ease-in-out infinite',
          }}
        >
          {/* Flame Outer Halo */}
          <path
            d="M 50 16 C 60 33 65 48 58 57 C 54 62 46 62 42 57 C 35 48 40 33 50 16 Z"
            fill="url(#flameColorGrad)"
          />
          {/* White-Hot Flame Core */}
          <path
            d="M 50 26 C 55 37 57 47 54 52 C 52 55 48 55 46 52 C 43 47 45 37 50 26 Z"
            fill="#fffbeb"
            opacity="0.95"
          />
          {/* Flame Spark Tip */}
          <circle cx="50" cy="22" r="1.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Twinkling Festive Fairy Lights Garland (दीपावली की रंग-बिरंगी लड़ियां)
 */
const FairyLightsGarland: React.FC = () => {
  const bulbColors = [
    { color: '#FDB813', glow: 'rgba(253, 184, 19, 0.9)' },
    { color: '#F97316', glow: 'rgba(249, 115, 22, 0.9)' },
    { color: '#10B981', glow: 'rgba(16, 185, 129, 0.9)' },
    { color: '#F43F5E', glow: 'rgba(244, 63, 94, 0.9)' },
    { color: '#FDB813', glow: 'rgba(253, 184, 19, 0.9)' },
    { color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.9)' },
    { color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.9)' },
  ];

  const bulbs = Array.from({ length: 18 });

  return (
    <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden pointer-events-none z-20 flex items-start justify-between px-3 sm:px-8">
      {/* Delicate Dark Wire */}
      <svg className="absolute top-0 left-0 w-full h-5 stroke-neutral-700/60 fill-none" preserveAspectRatio="none">
        <path d="M 0 3 Q 100 8, 200 3 T 400 3 T 600 3 T 800 3 T 1000 3 T 1200 3" strokeWidth="1" />
      </svg>

      {bulbs.map((_, i) => {
        const conf = bulbColors[i % bulbColors.length];
        const delay = (i * 0.18) % 1.6;
        return (
          <div
            key={i}
            className="flex flex-col items-center"
            style={{
              animation: `festive-fairy-lights 1.8s ease-in-out infinite ${delay}s`,
            }}
          >
            {/* Socket */}
            <div className="w-1.5 h-1 bg-neutral-800 rounded-xs" />
            {/* Glowing Teardrop Bulb */}
            <div
              className="w-2.5 h-3 rounded-b-full rounded-t-xs"
              style={{
                backgroundColor: conf.color,
                boxShadow: `0 0 8px ${conf.glow}, 0 0 14px ${conf.glow}`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const RATION_ITEMS = [
  { name: 'आटा (Laxmi Bhog Atta)', category: '10kg Chakki Fresh', icon: '🌾' },
  { name: 'सरसों का तेल (Mustard Oil)', category: '100% Pure Kacchi Ghani', icon: '🫗' },
  { name: 'नमक (Tata Salt)', category: 'Iodized Tata Pack', icon: '🧂' },
  { name: 'मिक्स दाल (Mix Dal)', category: 'Whole Farm Protein', icon: '🍲' },
  { name: 'सोया चंक्स (Fortune Soya)', category: 'Nutritious Veg Meal', icon: '🥣' },
  { name: 'चावल (Quality Rice)', category: 'Clean Whole Grains', icon: '🍚' },
  { name: 'चीनी (Pure Sugar)', category: 'Sweet Refined Pack', icon: '🍬' },
  { name: 'बूरा (Sweet Boora)', category: 'Festive Sweetener', icon: '🍯' },
  { name: 'चाय पत्ती (CTC Tea)', category: 'Fresh Leaf Tea', icon: '☕' },
  { name: 'हल्दी (Turmeric)', category: 'Pure Spices', icon: '🌿' },
  { name: 'लाल मिर्च (Red Chilli)', category: 'Aromatic Powder', icon: '🌶️' },
  { name: 'धनिया पाउडर (Coriander)', category: 'Ground Coriander', icon: '🌿' },
  { name: 'जीरा (Cumin Seeds)', category: 'Whole Aromatic Seeds', icon: '🌾' },
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
🌾 आटा (Laxmi Bhog)
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
    setTimeout(() => setIsShareCopied(false), 3000);
  };

  return (
    <section id="diwali-seva" className="py-8 sm:py-14 px-3 sm:px-6 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-br from-[#1c0c02] via-[#2d1404] to-[#120701] border-2 border-amber-500/40 text-white shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden p-4 sm:p-8 lg:p-10 group"
      >
        {/* Twinkling Fairy Lights Garland at the Top */}
        <FairyLightsGarland />

        {/* Festive Golden Ambient Glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Festive Gold Embers (Phuljhadi Sparkles) */}
        {[
          { top: '15%', left: '8%', delay: '0s', size: 'w-2 h-2' },
          { top: '35%', left: '92%', delay: '1.2s', size: 'w-1.5 h-1.5' },
          { top: '65%', left: '12%', delay: '0.8s', size: 'w-2.5 h-2.5' },
          { top: '78%', left: '88%', delay: '2.1s', size: 'w-2 h-2' },
          { top: '22%', left: '48%', delay: '1.5s', size: 'w-1.5 h-1.5' },
        ].map((ember, idx) => (
          <div
            key={idx}
            className={`absolute ${ember.size} rounded-full bg-[#FDB813] pointer-events-none`}
            style={{
              top: ember.top,
              left: ember.left,
              boxShadow: '0 0 10px #FDB813, 0 0 20px #F59E0B',
              animation: `diwali-sparkle-drift 3.5s ease-in-out infinite ${ember.delay}`,
            }}
          />
        ))}

        {/* Corner Rangoli / Mandala Decorative Vectors */}
        <div className="absolute -top-16 -right-16 w-52 h-52 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-amber-300">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 100 20 Q 115 65 160 80 Q 115 95 100 140 Q 85 95 40 80 Q 85 65 100 20 Z" opacity="0.6" />
          </svg>
        </div>
        <div className="absolute -bottom-16 -left-16 w-52 h-52 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity rotate-180">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-amber-300">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 100 20 Q 115 65 160 80 Q 115 95 100 140 Q 85 95 40 80 Q 85 65 100 20 Z" opacity="0.6" />
          </svg>
        </div>

        {/* Section Header with Glowing Earthen Diyas */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-6 sm:mb-10 pt-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/25 via-orange-500/25 to-amber-500/25 text-[#FDB813] border border-[#FDB813]/50 px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-[0_0_20px_rgba(253,184,19,0.2)]">
            <span className="text-base animate-pulse">✨</span>
            <span className="font-mono tracking-wider">शुभ दीपावली महापर्व सेवा महाभियान २०२६</span>
            <span className="text-base animate-pulse">✨</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-5 my-1">
            <DiwaliDiya size="md" />
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFBEB] via-[#FDB813] to-[#F59E0B] tracking-tight leading-tight drop-shadow-sm">
              इस दीपावली, खुशियाँ बाँटने का संकल्प लें
            </h2>
            <DiwaliDiya size="md" />
          </div>

          <p className="text-xs sm:text-base text-amber-100/90 mt-2.5 leading-relaxed max-w-2xl mx-auto font-medium">
            हमारा उद्देश्य है कि इस दीपावली हर जरूरतमंद परिवार के घर में चूल्हा जले और कोई भी परिवार त्योहार की खुशियों से वंचित न रहे।
          </p>
        </div>

        {/* Main Grid: Left = Authentic Ground Photo & Target Progress, Right = Kit Breakdown & Quick Sponsor */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left Column: Authentic Ground Photo & Kit Verification Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-black/40 group">
              <img
                src="/uploads/diwali_ration_kit_2026.jpg"
                alt="Rise Up Help Foundation Diwali Ration Kits Ground Distribution"
                className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-[#FDB813] to-amber-500 text-neutral-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-lg font-mono flex items-center gap-1">
                  <span>₹1,100 / Complete Kit</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoZoomed(true)}
                className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer border border-white/20 shadow-lg"
                title="View Full Resolution Image"
              >
                <Maximize2 className="w-4 h-4 text-amber-300" />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Direct On-Ground Procured & Packed</span>
                </div>
                <p className="text-xs text-neutral-200 line-clamp-2 leading-relaxed">
                  Laxmi Bhog Atta, Tata Salt, Mustard Oil, Fortune Soya Chunks, Rice, Dal & Spices packed for direct doorstep delivery to slum families.
                </p>
              </div>
            </div>

            {/* Campaign Progress Card with Golden Progress Bar */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 border border-amber-400/30 rounded-2xl p-4 text-left backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-amber-200 font-semibold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#FDB813] fill-[#FDB813]" />
                  <span>1,500 Families Campaign Goal</span>
                </span>
                <span className="text-[#FDB813] font-mono font-bold">340 Distributed (23%)</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-[#FDB813] to-orange-400 rounded-full shadow-[0_0_10px_#FDB813]"
                  style={{ width: '23%' }}
                />
              </div>
              <p className="text-[11px] text-amber-100/80 mt-2">
                Targeting 1,500 underprivileged families across Jaipur slum settlements and patient attendant camps outside RUHS & SMS Hospitals.
              </p>
            </div>

            {/* Emotional Quote Callout with Diya Icon */}
            <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border-l-4 border-[#FDB813] p-4 rounded-r-2xl text-left flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">🪔</span>
              <div>
                <p className="text-xs sm:text-sm text-amber-100 font-medium italic leading-relaxed">
                  "आइए, इस दीपावली किसी के घर में खुशियों के साथ उम्मीद का दीप भी जलाएँ। आपका सहयोग, किसी की मुस्कान।"
                </p>
                <span className="text-[10px] text-amber-300/80 mt-1.5 block font-mono">
                  Rise Up Help Initiative Foundation • Section 8 Licensed Non-Profit
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 13 Kit Items Breakdown & 1-Click Sponsorship Stepper */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            
            {/* Header Description */}
            <div className="bg-white/5 border border-amber-400/25 rounded-2xl p-4 sm:p-5 backdrop-blur-xs">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#FDB813]" />
                  <span>प्रत्येक राशन किट में शामिल 13 सामग्री (Kit Contents)</span>
                </h3>
                <span className="text-[11px] font-mono text-amber-200 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-400/40 font-bold">
                  Fixed ₹1,100 / Kit
                </span>
              </div>
              <p className="text-xs text-neutral-300 mb-3.5 leading-relaxed">
                प्रत्येक किट एक गरीब परिवार के पूरे महीने के भोजन का आधार बनती है, जिसमें गुणवत्ता युक्त ब्रांडेड सामग्री शामिल है:
              </p>

              {/* 13 Items Aesthetic Grid with Golden Glow on Hover */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {RATION_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-amber-500/20 hover:border-[#FDB813]/60 rounded-xl p-2.5 transition-all duration-200 group/item shadow-xs hover:shadow-[0_0_12px_rgba(253,184,19,0.2)]"
                  >
                    <span className="text-lg shrink-0 group-hover/item:scale-115 transition-transform">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate group-hover/item:text-amber-200 transition-colors">
                        {item.name}
                      </p>
                      <span className="text-[9px] text-amber-300/80 uppercase font-mono tracking-wider block truncate">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Preset Kit Selection with Warm Golden Festive Card */}
            <div className="bg-gradient-to-br from-amber-500/15 via-black/40 to-black/60 border-2 border-amber-400/35 rounded-2xl p-4 sm:p-5 shadow-xl">
              <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-2 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                <span>कितनी किट स्पॉन्सर करना चाहते हैं? (Select Quantity)</span>
              </label>

              {/* Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5">
                {[
                  { count: 1, label: '1 Kit', amount: 1100 },
                  { count: 2, label: '2 Kits', amount: 2200 },
                  { count: 5, label: '5 Kits', amount: 5500 },
                  { count: 10, label: '10 Kits', amount: 11000 },
                ].map((preset) => (
                  <button
                    key={preset.count}
                    type="button"
                    onClick={() => setQuantity(preset.count)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                      quantity === preset.count
                        ? 'bg-gradient-to-r from-[#FDB813] to-amber-400 text-neutral-950 border-[#FDB813] shadow-[0_0_18px_rgba(253,184,19,0.4)] scale-102'
                        : 'bg-white/5 hover:bg-white/15 text-white border-white/15 hover:border-amber-400/40'
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className="text-[11px] opacity-90 font-mono">₹{preset.amount.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>

              {/* Stepper & Total Display */}
              <div className="flex items-center justify-between gap-3 bg-black/60 border border-amber-400/30 rounded-xl p-3 mb-4 shadow-inner">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-neutral-950 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="px-3 text-center min-w-[70px]">
                    <span className="text-base sm:text-lg font-extrabold text-white font-mono">
                      {quantity} {quantity === 1 ? 'Kit' : 'Kits'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-neutral-950 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-amber-200/80 uppercase font-mono block">Total Contribution</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#FDB813] font-mono drop-shadow-sm">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons: 1-Click Sponsor & WhatsApp Share */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSponsor(quantity)}
                  className="diwali-gold-shimmer-btn w-full bg-gradient-to-r from-[#FDB813] via-amber-400 to-[#FDB813] hover:brightness-105 active:scale-98 text-neutral-950 font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-[0_0_25px_rgba(253,184,19,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Sparkles className="w-4 h-4 text-neutral-950 fill-neutral-950" />
                  <span>Sponsor {quantity} Kit{quantity > 1 ? 's' : ''} (₹{totalAmount.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-neutral-950 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  {isShareCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Opening WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share Campaign on WhatsApp</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust & Tax Footnote */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-3 mt-3 border-t border-white/10 text-[11px] text-neutral-300">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>50% Tax Exemption (80G Certified)</span>
                </span>
                <a
                  href="tel:+919828291119"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 font-mono font-semibold"
                >
                  <Phone className="w-3 h-3 text-[#FDB813]" />
                  <span>Helpline: +91 9828291119</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal for Full Image Inspection */}
      <AnimatePresence>
        {isPhotoZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full bg-neutral-950 rounded-2xl overflow-hidden border border-white/20 p-2 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setIsPhotoZoomed(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src="/uploads/diwali_ration_kit_2026.jpg"
                alt="Diwali Ration Kits High Res"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="p-3 text-left">
                <p className="text-xs text-white font-medium">
                  🪔 Rise Up Help Initiative Foundation — Diwali Family Ration Kit Packaged Material (Laxmi Bhog Atta, Tata Salt, Soya Chunks, Oil, Dal, Spices & Groceries)
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
