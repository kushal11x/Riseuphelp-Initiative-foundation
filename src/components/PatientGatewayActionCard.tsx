import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Award, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { PATIENT_PROFILES } from '../data/mockData';

interface PatientGatewayActionCardProps {
  onOpenPortal: () => void;
}

export const PatientGatewayActionCard: React.FC<PatientGatewayActionCardProps> = ({
  onOpenPortal,
}) => {
  const activeCasesCount = PATIENT_PROFILES.length;

  return (
    <section
      id="patient-sponsorship"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200/80 relative select-none"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-white/95 to-[#faf8f4] border border-neutral-300/90 p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden text-center"
        >
          {/* Subtle Sunset Amber Gradient Aura Bleed */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FDB813]/20 via-emerald-800/5 to-transparent pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#084c36]/5 blur-3xl pointer-events-none" />

          {/* Section Row Label */}
          <div className="relative z-10 inline-flex items-center gap-2 bg-[#084c36]/10 text-[#084c36] font-semibold text-xs rounded-full px-4 py-1 mb-4 border border-[#084c36]/20">
            <Activity className="w-3.5 h-3.5 text-[#FDB813]" />
            <span>SPONSOR A CANCER WARRIOR LIFELINE</span>
          </div>

          {/* Main Headline */}
          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 tracking-tight max-w-4xl mx-auto">
            Take 100% responsibility for a life.{' '}
            <span
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}
              className="text-[#084c36]"
            >
              Systemic medical oncology care.
            </span>
          </h2>

          {/* Primary Impact Pitch Line (Verbatim) */}
          <p className="relative z-10 mt-4 text-sm sm:text-base lg:text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed text-balance">
            Aap kisi ek critical cancer warrior ki poori zimedari le skte hain. Your support provides complete specialized chemotherapeutic medicines, diagnostic support, and lifeline care directly inside government hospital wards.
          </p>

          {/* Glancable Highlight Badges */}
          <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-neutral-700">
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
              <span>{activeCasesCount} Verified Critical Cases</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-xs font-semibold">
              <Activity className="w-3.5 h-3.5 text-emerald-700" />
              <span>Fixed ₹15,000 Care Units</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-[#084c36]" />
              <span>Real-Time Donors Honor Roll</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>50% 80G Tax Exemption</span>
            </span>
          </div>

          {/* Large Interactive Gateway Action Button */}
          <div className="relative z-10 mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onOpenPortal}
              className="group inline-flex items-center gap-3 bg-[#084c36] hover:bg-[#063b2a] text-white px-8 sm:px-10 py-4 rounded-full text-sm sm:text-base font-bold shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer ring-4 ring-[#084c36]/15"
            >
              <Heart className="w-4 h-4 text-[#FDB813] fill-[#FDB813] group-hover:scale-110 transition-transform" />
              <span>View Active Patient Profiles & Leaderboard</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>

          {/* Micro Assurance */}
          <div className="relative z-10 mt-5 flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Direct hospital pharmacy settlement at RUHS & SMS Hospital Jaipur</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
