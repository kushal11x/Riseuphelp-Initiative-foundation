import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Building2,
  Sparkles,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import type { DriveItem, HospitalNode } from '../types';
import { DRIVE_ITEMS, PARTNER_HOSPITALS, OFFICIAL_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface NariyalPaniPageProps {
  onBackToHome: () => void;
  onOpenSponsorModal: (
    item?: DriveItem,
    initialData?: { name: string; phone: string; quantity: number }
  ) => void;
  hospitals?: HospitalNode[];
}

export const NariyalPaniPage: React.FC<NariyalPaniPageProps> = ({
  onBackToHome,
  onOpenSponsorModal,
  hospitals = PARTNER_HOSPITALS,
}) => {
  const { t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [customQty, setCustomQty] = useState<number | ''>(20);

  const coconutItem = DRIVE_ITEMS.find((i) => i.id === 'coconut-water') || DRIVE_ITEMS[0];
  const shareableUrl = `${window.location.origin}/nariyal-pani`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🙏 *Support Cancer Chemotherapy Patients with Fresh Tender Coconut Water Seva* at State Cancer Medical College (RUHS) & SMS Hospital, Jaipur.\n\n` +
      `🥥 100% Sterile, Live Bedside-Cut Green Coconuts for recovery, nausea relief & electrolyte balance.\n` +
      `Rate: ₹65 per coconut • 50% Tax Exemption under 80G.\n\n` +
      `👉 *Donate Directly Here:* ${shareableUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleDonatePreset = (quantity: number) => {
    onOpenSponsorModal(coconutItem, {
      name: '',
      phone: '',
      quantity,
    });
  };

  const presetTiers = [
    {
      coconuts: 10,
      amount: 650,
      label: '10 Coconuts',
      tag: 'Chemo Hydration Pool',
      desc: 'Provides fresh sterile coconut water for 10 cancer patients in pediatric & chemo wards.',
      popular: false,
    },
    {
      coconuts: 20,
      amount: 1300,
      label: '20 Coconuts',
      tag: '⭐ Most Popular Seva',
      desc: 'Comprehensive bedside hydration relief for an entire recovery room floor at RUHS.',
      popular: true,
    },
    {
      coconuts: 50,
      amount: 3250,
      label: '50 Coconuts',
      tag: 'Full Ward Sponsorship',
      desc: 'Covers whole day bedside hydration across pediatric, adult oncology & chemo wards.',
      popular: false,
    },
    {
      coconuts: 100,
      amount: 6500,
      label: '100 Coconuts',
      tag: 'Grand Ekadashi Seva',
      desc: 'Dedicated mega bedside drive with your name / family dedication card on volunteer trolleys.',
      popular: false,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300 pb-16">
      {/* 1. TOP NAVIGATION / BREADCRUMB BAR */}
      <div className="max-w-7xl mx-auto w-full pt-4 px-3 sm:px-6 flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-neutral-800 font-bold text-xs sm:text-sm px-4 py-2 rounded-full border border-neutral-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-[#084c36] group-hover:-translate-x-1 transition-transform" />
          <span>{t.ekadashiBack || 'Back to Main Portal'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* WhatsApp Direct Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-3.5 py-2 rounded-full shadow-xs transition-all cursor-pointer active:scale-95"
            title="Share Direct Nariyal Pani Link on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline">Share on WhatsApp</span>
            <span className="sm:hidden">Share</span>
          </button>

          {/* Copy Direct Link Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs px-3.5 py-2 rounded-full border border-neutral-300 shadow-xs transition-all cursor-pointer active:scale-95"
            title="Copy Direct Link to Clipboard"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-600" />
                <span className="hidden sm:inline">Copy Direct Link</span>
                <span className="sm:hidden">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. HERO DIRECT DONATION BANNER */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#063b2a] via-[#084c36] to-[#032419] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border-2 border-emerald-500/30 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB813]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#FDB813] text-neutral-950 font-mono font-bold text-[11px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                  <span>🥥 100% Direct Bedside Seva</span>
                </span>
                <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs px-3 py-1 rounded-full font-semibold">
                  Rate: ₹65 / Coconut
                </span>
                <span className="bg-white/10 text-amber-300 text-xs px-3 py-1 rounded-full font-mono border border-white/15">
                  🛡️ 80G Tax Exemption
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Government Cancer Hospital Bedside Nariyal Pani Seva
              </h1>

              <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
                Direct bedside distribution of farm-fresh green tender coconuts cut live in front of cancer chemotherapy patients at <strong>State Cancer Medical College (RUHS)</strong> & <strong>SMS Hospital, Jaipur</strong>. Zero intermediaries, 100% transparent.
              </p>

              {/* Verified Metrics Counter */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-center">
                  <div className="text-lg sm:text-2xl font-extrabold text-[#FDB813] font-mono">194,700+</div>
                  <div className="text-[10px] sm:text-xs text-neutral-300">Coconuts Cut Bedside</div>
                </div>
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-center">
                  <div className="text-lg sm:text-2xl font-extrabold text-white font-mono">₹65</div>
                  <div className="text-[10px] sm:text-xs text-neutral-300">Pure Unit Rate</div>
                </div>
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-center">
                  <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono">100%</div>
                  <div className="text-[10px] sm:text-xs text-neutral-300">Direct Bedside Delivery</div>
                </div>
              </div>

              {/* Instant Donate Quick Trigger */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => handleDonatePreset(20)}
                  className="bg-[#FDB813] hover:bg-amber-400 text-neutral-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 text-neutral-950 fill-neutral-950" />
                  <span>Sponsor 20 Coconuts Now (₹1,300)</span>
                </button>

                <button
                  onClick={() => handleDonatePreset(10)}
                  className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-2xl border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Sponsor 10 (₹650)</span>
                </button>
              </div>
            </div>

            {/* Right Column: Authentic Live Seva Photos */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/25 shadow-2xl group bg-neutral-950 aspect-4/3 sm:aspect-auto sm:h-64">
                <img
                  src="/uploads/nariyal_pani_fresh_coconut.jpg"
                  alt="Fresh Green Tender Coconuts for Cancer Patients"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 bg-[#084c36]/90 backdrop-blur-md text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-emerald-400/40 shadow-xs flex items-center gap-1">
                  <span>🥥 100% Farm-Sourced Whole Coconuts</span>
                </div>
                <div className="absolute bottom-3 inset-x-3 text-left">
                  <div className="text-white font-bold text-xs sm:text-sm leading-snug">
                    "Cut live bedside with sterile eco-straws"
                  </div>
                  <div className="text-[11px] text-emerald-200 mt-0.5">
                    Essential potassium & electrolyte balance for chemotherapy patients.
                  </div>
                </div>
              </div>

              {/* Photo 2: Hospital Seva Trolley */}
              <div className="bg-black/35 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-400/40 bg-neutral-900">
                  <img
                    src="/uploads/ruhs_hospital_nariyal_seva_trolley.jpg"
                    alt="RUHS Hospital Bedside Seva Trolley"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                    🏥 RUHS Oncology Ward Trolley
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5 truncate">
                    Daily & Har Ekadashi Bedside Rounds
                  </h4>
                  <p className="text-[11px] text-emerald-100/80 line-clamp-1 mt-0.5">
                    Served directly to children & adults battling chemotherapy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ONE-CLICK SPONSORSHIP TIERS (THE CLIENT JUST CLICKS & DONATES) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold font-mono text-[#084c36] bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Choose Your Contribution
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-900 mt-2">
            Select Your Nariyal Pani Seva Quantity
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Click any package below to open instant UPI QR code, Card, NetBanking & instant 80G tax receipt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {presetTiers.map((tier) => (
            <motion.div
              key={tier.coconuts}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between relative ${
                tier.popular
                  ? 'bg-gradient-to-b from-emerald-900 to-[#084c36] text-white border-amber-400 shadow-xl ring-2 ring-amber-400/40'
                  : 'bg-white text-neutral-900 border-neutral-200 shadow-sm hover:shadow-md'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FDB813] text-neutral-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                  Most Chosen Seva
                </span>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded-md ${
                    tier.popular ? 'bg-white/20 text-amber-200' : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {tier.tag}
                  </span>
                  <span className={`text-xs font-bold ${tier.popular ? 'text-emerald-200' : 'text-neutral-500'}`}>
                    ₹65/pc
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl sm:text-3xl font-black">₹{tier.amount.toLocaleString('en-IN')}</span>
                  <span className={`text-xs ${tier.popular ? 'text-emerald-200' : 'text-neutral-500'}`}>
                    ({tier.label})
                  </span>
                </div>

                <p className={`text-xs mt-3 leading-relaxed ${tier.popular ? 'text-emerald-100' : 'text-neutral-600'}`}>
                  {tier.desc}
                </p>
              </div>

              <button
                onClick={() => handleDonatePreset(tier.coconuts)}
                className={`w-full mt-6 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                  tier.popular
                    ? 'bg-[#FDB813] hover:bg-amber-400 text-neutral-950'
                    : 'bg-[#084c36] hover:bg-[#063b2a] text-white'
                }`}
              >
                <span>Donate {tier.label} (₹{tier.amount})</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Custom Quantity Input Bar */}
        <div className="mt-6 bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <span>🥥 Custom Quantity Seva</span>
              <span className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">₹65 / Coconut</span>
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5">
              Enter any number of tender coconuts you wish to sponsor for hospital chemotherapy patients.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex items-center">
              <input
                type="number"
                min="1"
                step="1"
                value={customQty}
                onChange={(e) => setCustomQty(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                placeholder="20"
                className="w-28 sm:w-32 bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 font-bold font-mono text-neutral-900 text-center focus:bg-white focus:border-[#084c36] focus:outline-none"
              />
              <span className="absolute right-3 text-xs text-neutral-400 pointer-events-none">pcs</span>
            </div>

            <button
              onClick={() => {
                const q = typeof customQty === 'number' && customQty > 0 ? customQty : 20;
                handleDonatePreset(q);
              }}
              className="flex-1 sm:flex-none bg-[#084c36] hover:bg-[#063b2a] text-white font-extrabold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Donate ₹{((typeof customQty === 'number' ? customQty : 20) * 65).toLocaleString('en-IN')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. SHAREABLE LINK DIRECT TOOLBAR (FOR ADMIN & VOLUNTEERS TO COPY / SHARE) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-50 via-[#f0fdf4] to-amber-50 rounded-2xl p-5 border border-emerald-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1">
              <Share2 className="w-3 h-3" />
              <span>Direct Client Donation Link</span>
            </span>
            <h4 className="text-sm sm:text-base font-bold text-neutral-900">
              Share This Direct Link With Donors & Friends
            </h4>
            <p className="text-xs text-neutral-600">
              Donors who click this link bypass all home page browsing and open the Nariyal Pani donation window instantly.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs font-mono text-neutral-700 truncate max-w-xs select-all">
              {shareableUrl}
            </div>

            <button
              onClick={handleCopyLink}
              className="bg-[#084c36] hover:bg-[#063b2a] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. CLINICAL & MEDICAL REASONS (WHY NARIYAL PANI FOR CHEMO PATIENTS) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase">
              Clinical Integrity
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 mt-2">
              Why Fresh Tender Coconut Water is Essential for Cancer Patients
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Approved by oncology nursing staff for gentle hydration during chemotherapy cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#fcfbf9] rounded-2xl p-4 border border-neutral-200/80 space-y-1.5 text-left">
              <span className="text-2xl">⚡</span>
              <h4 className="text-xs font-bold text-neutral-900">Natural Electrolytes</h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Packed with bioavailable potassium, magnesium, and sodium to instantly counter severe dehydration caused by chemotherapy.
              </p>
            </div>

            <div className="bg-[#fcfbf9] rounded-2xl p-4 border border-neutral-200/80 space-y-1.5 text-left">
              <span className="text-2xl">🛡️</span>
              <h4 className="text-xs font-bold text-neutral-900">100% Sterile & Safe</h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Naturally sealed inside the thick green husk. When cut live with sterile single-use straws, there is zero risk of hospital-acquired infection.
              </p>
            </div>

            <div className="bg-[#fcfbf9] rounded-2xl p-4 border border-neutral-200/80 space-y-1.5 text-left">
              <span className="text-2xl">🌿</span>
              <h4 className="text-xs font-bold text-neutral-900">Reduces Chemo Nausea</h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Cancer chemotherapy leaves a bitter metallic taste and painful mouth ulcers. Mild natural coconut water soothes the esophagus and settles vomiting.
              </p>
            </div>

            <div className="bg-[#fcfbf9] rounded-2xl p-4 border border-neutral-200/80 space-y-1.5 text-left">
              <span className="text-2xl">🩸</span>
              <h4 className="text-xs font-bold text-neutral-900">Blood & Kidney Care</h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Flushes high-potency chemotherapeutic toxic residues through the kidneys, preventing nephrotoxicity and protecting renal function.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. PARTNER HOSPITALS */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h3 className="text-base sm:text-xl font-bold text-neutral-900">
            Active Verified Hospital Relief Nodes in Jaipur
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Regular on-ground bedside delivery conducted with hospital ward permission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {hospitals.slice(0, 3).map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#084c36] flex items-center justify-center shrink-0 border border-emerald-200">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-[9px] font-bold text-emerald-800 uppercase font-mono">
                  {hosp.category}
                </span>
                <h4 className="text-xs font-bold text-neutral-900 truncate">
                  {hosp.name}
                </h4>
                <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#FDB813]" />
                  <span className="truncate">{hosp.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. TRANSPARENCY & 80G TAX EXEMPTION FOOTNOTE */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 text-center">
        <div className="bg-neutral-100 rounded-2xl p-4 text-xs text-neutral-600 flex flex-wrap items-center justify-center gap-4">
          <span className="font-semibold text-neutral-900">🏛️ {OFFICIAL_INFO.name}</span>
          <span>•</span>
          <span>CIN: {OFFICIAL_INFO.cinNumber}</span>
          <span>•</span>
          <span>{OFFICIAL_INFO.taxExemption}</span>
          <span>•</span>
          <span className="text-emerald-800 font-bold">Helpline: {OFFICIAL_INFO.phone}</span>
        </div>
      </div>
    </div>
  );
};
