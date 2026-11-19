import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  MapPin,
} from 'lucide-react';
import { useFellowshipCounter } from '../utils/fellowshipCounter';

interface NationalFellowshipBannerProps {
  onOpenApplyModal: () => void;
}

export const NationalFellowshipBanner: React.FC<NationalFellowshipBannerProps> = ({
  onOpenApplyModal,
}) => {
  const { count } = useFellowshipCounter(568);

  return (
    <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 pt-1 pb-3">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-br from-[#021e14] via-[#053d2b] to-[#01140d] text-white p-5 sm:p-8 lg:p-10 border-2 border-amber-500/35 shadow-[0_0_50px_rgba(8,76,54,0.35)] relative overflow-hidden"
      >
        {/* Subtle luminous festive/emerald background ambient lighting */}
        <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          
          {/* Left Narrative Pillar: Big, Authoritative Typography */}
          <div className="max-w-3xl space-y-3.5 text-left">
            
            {/* Top Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-amber-500/25 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                <span>Pan-India Intake • Winter 2026 Cohort</span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-emerald-200 bg-emerald-950/70 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Government CIN Registered • 80G Certified
              </span>
            </div>

            {/* Big Headline */}
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#FDB813] tracking-tight leading-tight">
                National Youth Social Impact & Policy Fellowship
              </h2>
              <p className="text-xs sm:text-base text-emerald-100/90 mt-2 leading-relaxed font-normal max-w-2xl">
                A prestigious pan-India initiative by Rise Up Help Initiative Foundation. Gain verified Section 8 NGO credentials, work directly on hospital oncology relief or strategic maternal nutrition research files.
              </p>
            </div>

            {/* 3 Prestigious Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/15 flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#FDB813] shrink-0" />
                <div className="text-[11px] leading-tight font-semibold text-white">
                  Official Section 8 Certificate
                  <span className="block text-[9px] text-emerald-200/80 font-normal">Valid for Academic Credits & CV</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/15 flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-300 shrink-0" />
                <div className="text-[11px] leading-tight font-semibold text-white">
                  Founder's LOR for Toppers
                  <span className="block text-[9px] text-emerald-200/80 font-normal">For MBA, Placements & Study Abroad</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/15 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-sky-300 shrink-0" />
                <div className="text-[11px] leading-tight font-semibold text-white">
                  All 28 States & UTs Open
                  <span className="block text-[9px] text-emerald-200/80 font-normal">Ground Jaipur & Remote Research</span>
                </div>
              </div>
            </div>

            {/* Dynamic Social Proof Live Counter: 500+ and Growing */}
            <div className="pt-2 flex items-center gap-2.5 flex-wrap">
              <div className="inline-flex items-center gap-2 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/35 text-amber-300 font-mono text-xs font-bold shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-white font-extrabold text-sm">{count}+</span>
                <span className="text-amber-200">Applications Received Across 26 States</span>
              </div>
              <span className="text-[11px] text-emerald-200/80 font-mono">
                ⚡ Real-time Admissions Registry Active
              </span>
            </div>

          </div>

          {/* Right Action Pillar: High-Impact Call to Action Card */}
          <div className="w-full lg:w-80 shrink-0 bg-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/25 shadow-2xl flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/15">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  Winter 2026 Admissions
                </span>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold">
                  Active Intake
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-extrabold text-white mt-2 leading-snug">
                Step Into Social Impact & Leadership
              </h3>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                Fill the 13-point national application form. Our selection committee will review your location and assign appropriate tracks.
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={onOpenApplyModal}
                className="w-full gold-shimmer-btn bg-gradient-to-r from-[#FDB813] via-amber-400 to-[#FDB813] hover:brightness-105 text-neutral-950 font-black text-xs sm:text-sm py-3.5 px-5 rounded-full transition-all shadow-[0_0_20px_rgba(253,184,19,0.35)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for National Fellowship</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/70 font-mono pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Free Application • No Charges</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/15 text-[10px] text-emerald-300 leading-snug">
              Official selection letters and project guidelines dispatched strictly via Email.
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
