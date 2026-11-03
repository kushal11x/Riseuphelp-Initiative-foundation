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

const RATION_ITEMS = [
  { name: 'आटा (Laxmi Bhog Atta)', category: 'Staple', icon: '🌾' },
  { name: 'सरसों का तेल (Mustard Oil)', category: 'Cooking', icon: '🫗' },
  { name: 'नमक (Tata Salt)', category: 'Essential', icon: '🧂' },
  { name: 'मिक्स दाल (Mix Dal)', category: 'Protein', icon: '🍲' },
  { name: 'सोया चंक्स (Fortune Soya)', category: 'Nutrition', icon: '🥣' },
  { name: 'चावल (Quality Rice)', category: 'Staple', icon: '🍚' },
  { name: 'चीनी (Pure Sugar)', category: 'Sweetener', icon: '🍬' },
  { name: 'बूरा (Sweet Boora)', category: 'Festive', icon: '🍯' },
  { name: 'चाय पत्ती (CTC Tea)', category: 'Daily', icon: '☕' },
  { name: 'हल्दी (Turmeric)', category: 'Spice', icon: '🌿' },
  { name: 'लाल मिर्च (Red Chilli)', category: 'Spice', icon: '🌶️' },
  { name: 'धनिया पाउडर (Coriander)', category: 'Spice', icon: '🌿' },
  { name: 'जीरा (Cumin Seeds)', category: 'Spice', icon: '🌾' },
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
    <section id="diwali-seva" className="py-8 sm:py-14 px-3 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-br from-[#1a0c02] via-[#2c1404] to-[#120802] border border-amber-500/30 text-white shadow-2xl relative overflow-hidden p-4 sm:p-8 lg:p-10"
      >
        {/* Festive Golden Ambient Glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-[#FDB813] border border-[#FDB813]/40 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <span className="text-base">🪔</span>
            <span>दीपावली महापर्व सेवा महाभियान 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FDB813] animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            इस दीपावली, खुशियाँ बाँटने का संकल्प लें ❤️
          </h2>
          <p className="text-xs sm:text-base text-amber-100/85 mt-2 leading-relaxed">
            हमारा उद्देश्य है कि इस दीपावली हर जरूरतमंद परिवार के घर में चूल्हा जले और कोई भी परिवार त्योहार की खुशियों से वंचित न रहे।
          </p>
        </div>

        {/* Main Grid: Left = Authentic Ground Photo & Target Progress, Right = Kit Breakdown & Quick Sponsor */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left Column: Authentic Ground Photo & Kit Verification Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl bg-black/40 group">
              <img
                src="/uploads/diwali_ration_kit_2026.jpg"
                alt="Rise Up Help Foundation Diwali Ration Kits Ground Distribution"
                className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-[#FDB813] text-neutral-950 font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md font-mono">
                  ₹1,100 / Complete Kit
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoZoomed(true)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer"
                title="View Full Resolution Image"
              >
                <Maximize2 className="w-4 h-4 text-amber-300" />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Direct On-Ground Procured & Packed</span>
                </div>
                <p className="text-xs text-neutral-200 line-clamp-2">
                  Laxmi Bhog Atta, Tata Salt, Mustard Oil, Soya Chunks, Rice, Dal & Spices packed for direct doorstep delivery to slum families.
                </p>
              </div>
            </div>

            {/* Campaign Progress Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-amber-200 font-semibold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#FDB813]" />
                  <span>1,500 Families Campaign Goal</span>
                </span>
                <span className="text-[#FDB813] font-mono font-bold">340 Distributed (23%)</span>
              </div>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 via-[#FDB813] to-orange-500 rounded-full w-[23%]" />
              </div>
              <p className="text-[11px] text-neutral-300/80 mt-2">
                Targeting 1,500 underprivileged families across Jaipur slum settlements and patient attendant camps outside RUHS & SMS Hospitals.
              </p>
            </div>

            {/* Emotional Quote Callout */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-l-4 border-[#FDB813] p-3.5 rounded-r-xl text-left">
              <p className="text-xs text-amber-100 font-medium italic leading-relaxed">
                "आइए, इस दीपावली किसी के घर में खुशियों के साथ उम्मीद का दीप भी जलाएँ। आपका सहयोग, किसी की मुस्कान।"
              </p>
              <span className="text-[10px] text-amber-300/80 mt-1 block font-mono">
                Rise Up Help Initiative Foundation • Section 8 Licensed Non-Profit
              </span>
            </div>
          </div>

          {/* Right Column: 13 Kit Items Breakdown & 1-Click Sponsorship Stepper */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            
            {/* Header Description */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#FDB813]" />
                  <span>प्रत्येक राशन किट में शामिल 13 सामग्री (Kit Contents)</span>
                </h3>
                <span className="text-[11px] font-mono text-amber-300 bg-amber-400/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Fixed ₹1,100 / Kit
                </span>
              </div>
              <p className="text-xs text-neutral-300 mb-3.5 leading-relaxed">
                प्रत्येक किट एक गरीब परिवार के पूरे महीने के भोजन का आधार बनती है, जिसमें गुणवत्ता युक्त ब्रांडेड सामग्री शामिल है:
              </p>

              {/* 13 Items Aesthetic Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {RATION_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-black/30 hover:bg-black/50 border border-white/10 rounded-xl p-2 transition-colors"
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                      <span className="text-[9px] text-amber-300/80 uppercase font-mono tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Preset Kit Selection */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-amber-400/30 rounded-2xl p-4 sm:p-5">
              <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-2 font-mono">
                कितनी किट स्पॉन्सर करना चाहते हैं? (Select Quantity)
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
                        ? 'bg-[#FDB813] text-neutral-950 border-[#FDB813] shadow-md scale-102'
                        : 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className="text-[11px] opacity-90 font-mono">₹{preset.amount.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>

              {/* Stepper & Total Display */}
              <div className="flex items-center justify-between gap-3 bg-black/40 border border-white/10 rounded-xl p-2.5 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="px-3 text-center">
                    <span className="text-sm sm:text-base font-extrabold text-white font-mono">
                      {quantity} {quantity === 1 ? 'Kit' : 'Kits'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">Total Contribution</span>
                  <span className="text-lg sm:text-xl font-extrabold text-[#FDB813] font-mono">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons: 1-Click Sponsor & WhatsApp Share */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSponsor(quantity)}
                  className="w-full bg-gradient-to-r from-[#FDB813] via-amber-400 to-[#FDB813] hover:brightness-105 active:scale-98 text-neutral-950 font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
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
              <div className="flex items-center justify-between flex-wrap gap-2 pt-3 mt-3 border-t border-white/10 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>50% Tax Exemption (80G Certified)</span>
                </span>
                <a
                  href="tel:+919828291119"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 font-mono"
                >
                  <Phone className="w-3 h-3" />
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
