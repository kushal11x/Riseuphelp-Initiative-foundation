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
} from 'lucide-react';
import type { DriveItem } from '../types';
import { DRIVE_ITEMS } from '../data/mockData';

interface DiwaliRationSectionProps {
  onOpenSponsorModal: (
    item?: DriveItem,
    initialData?: { name: string; phone: string; quantity: number }
  ) => void;
}

const RATION_MANIFEST = [
  { item: '10kg आटा', brand: 'Laxmi Bhog Chakki Fresh', icon: '🌾' },
  { item: '1L सरसों तेल', brand: '100% Pure Kacchi Ghani', icon: '🫗' },
  { item: '1kg नमक', brand: 'Tata Iodized Salt', icon: '🧂' },
  { item: '1kg मिक्स दाल', brand: 'Whole Farm Protein Dal', icon: '🍲' },
  { item: 'सोया चंक्स', brand: 'Fortune Soya Protein', icon: '🥣' },
  { item: 'चावल', brand: 'Quality Whole Grain Rice', icon: '🍚' },
  { item: 'चीनी', brand: 'Pure Refined Sugar', icon: '🍬' },
  { item: 'मीठा बूरा', brand: 'Festive Sweetener', icon: '🍯' },
  { item: 'चाय पत्ती', brand: 'Fresh Leaf CTC Tea', icon: '☕' },
  { item: 'हल्दी पाउडर', brand: 'Pure Kitchen Turmeric', icon: '🌿' },
  { item: 'लाल मिर्च', brand: 'Aromatic Red Chilli', icon: '🌶️' },
  { item: 'धनिया पाउडर', brand: 'Ground Coriander', icon: '🌿' },
  { item: 'साबुत जीरा', brand: 'Whole Cumin Seeds', icon: '🌾' },
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
    <section id="diwali-seva" className="py-10 sm:py-16 px-3 sm:px-6 max-w-7xl mx-auto text-neutral-900">
      <div className="rounded-3xl bg-[#141210] border border-neutral-800 text-white shadow-2xl overflow-hidden p-5 sm:p-8 lg:p-10 relative">
        
        {/* Soft, warm ambient light in corner (subtle & natural, not neon) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header: Human, Understated, Emotional */}
        <div className="relative z-10 max-w-3xl mb-8 sm:mb-10 text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3">
            <span>🪔</span>
            <span>JAIPUR GROUND RELIEF • DIWALI DRIVE 2026</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            इस दीपावली, खुशियाँ बाँटने का संकल्प लें।
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 mt-3 leading-relaxed max-w-2xl">
            हमारा उद्देश्य है कि इस दीपावली हर जरूरतमंद परिवार के घर में चूल्हा जले और कोई भी परिवार त्योहार की खुशियों से वंचित न रहे। आपका एक छोटा-सा सहयोग किसी जरूरतमंद परिवार तक पूरे महीने का राशन पहुँचा सकता है।
          </p>
        </div>

        {/* Main Grid: Left = Authentic Photo with Editorial Caption, Right = Manifest & Clean Action */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left Column: Real Photo Card */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-md group">
              <img
                src="/uploads/diwali_ration_kit_2026.jpg"
                alt="Actual Diwali Ration Kits at Jaipur Hub"
                className="w-full h-80 sm:h-[420px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Photo pill */}
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono text-neutral-200">
                Ground Inventory • Jaipur Packing Hub
              </div>

              {/* Zoom Trigger */}
              <button
                type="button"
                onClick={() => setIsPhotoZoomed(true)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black text-neutral-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                title="View Full Photo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Details */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Genuine Branded Groceries</span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug">
                  Laxmi Bhog Atta, Tata Salt, Mustard Oil, Fortune Soya, Rice, Dal & Spices packed for direct doorstep handover to slum families.
                </p>
              </div>
            </div>

            {/* Honest Progress Tracker */}
            <div className="bg-[#1b1815] border border-neutral-800/80 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-neutral-300 font-medium">Distribution Goal: 1,500 Families</span>
                <span className="text-amber-400 font-mono font-bold">340 Delivered (23%)</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#FDB813] rounded-full"
                  style={{ width: '23%' }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-2">
                Direct distribution across Jaipur slum clusters and poor patient families camping outside RUHS & SMS Hospital corridors.
              </p>
            </div>

            {/* Human quote / contact strip */}
            <div className="bg-[#181613] border border-neutral-800 rounded-xl p-3.5 text-xs text-neutral-400 flex items-center justify-between">
              <span className="italic text-neutral-300">"आपका सहयोग, किसी की मुस्कान।"</span>
              <a
                href="tel:+919828291119"
                className="text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>+91 9828291119</span>
              </a>
            </div>
          </div>

          {/* Right Column: 13-Item Manifest & Clean Sponsorship Form */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            
            {/* 13 Items Manifest Card */}
            <div className="bg-[#1a1714] border border-neutral-800 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>राशन किट में शामिल सामग्री (13 Items Manifest)</span>
                </h3>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  ₹1,100 / Complete Kit
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                कोई भी परिवार त्योहार पर भूखा न रहे, इसलिए हर किट में पूरे महीने की दैनिक ज़रूरत का शुद्ध सामान है:
              </p>

              {/* Clean Manifest Chips Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {RATION_MANIFEST.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-neutral-900/60 border border-neutral-800/80 rounded-xl px-3 py-2 text-neutral-200"
                  >
                    <span className="text-base shrink-0">{entry.icon}</span>
                    <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-white truncate">{entry.item}</span>
                      <span className="text-[10px] text-neutral-400 truncate font-mono">{entry.brand}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between flex-wrap gap-2">
                <span>+ इको-फ्रेंडली बैग व जयपुर क्षेत्र में घर-घर वितरण</span>
                <span className="text-amber-400/90 font-mono">100% Direct Ground Impact</span>
              </div>
            </div>

            {/* Clean, Tactile Sponsor Card */}
            <div className="bg-[#1b1814] border border-neutral-800 rounded-2xl p-5 shadow-lg">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2.5 font-mono">
                Select Family Kits to Sponsor
              </label>

              {/* Clean Preset Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
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
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                      quantity === preset.count
                        ? 'bg-[#FDB813] text-neutral-950 border-[#FDB813] shadow-sm font-extrabold'
                        : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className="text-[11px] font-mono opacity-90 mt-0.5">₹{preset.amount.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>

              {/* Quantity Stepper & Total */}
              <div className="flex items-center justify-between gap-3 bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="px-3 text-center min-w-[70px]">
                    <span className="text-base font-bold text-white font-mono">
                      {quantity} {quantity === 1 ? 'Kit' : 'Kits'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 font-mono block">Contribution</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#FDB813] font-mono">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* 2 Primary Actions: Fast Sponsor & WhatsApp Share */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSponsor(quantity)}
                  className="w-full bg-[#FDB813] hover:bg-amber-400 active:scale-98 text-neutral-950 font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Heart className="w-4 h-4 fill-neutral-950" />
                  <span>Sponsor {quantity} Kit{quantity > 1 ? 's' : ''} (₹{totalAmount.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-neutral-950 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  {isShareCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Opening WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share on WhatsApp</span>
                    </>
                  )}
                </button>
              </div>

              {/* Compliance & Receipts */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-3 mt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>80G Tax Exemption • Instant Digital Receipt</span>
                </span>
                <span className="font-mono text-neutral-400">Section 8 Registered Non-Profit</span>
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
              className="relative max-w-3xl w-full bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 p-2 shadow-2xl"
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
