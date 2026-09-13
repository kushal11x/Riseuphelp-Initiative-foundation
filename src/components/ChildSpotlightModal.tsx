import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Heart, MapPin, Sparkles, CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import type { ChildSpotlightProfile } from '../types';

interface ChildSpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: ChildSpotlightProfile | null;
  onSponsorChild: (child: ChildSpotlightProfile) => void;
}

export const ChildSpotlightModal: React.FC<ChildSpotlightModalProps> = ({
  isOpen,
  onClose,
  child,
  onSponsorChild,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen && child) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, child]);

  if (!isOpen || !child || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window with High-Accessibility Scrollable Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 z-10 my-auto max-h-[88vh] flex flex-col overflow-hidden"
        >
          {/* 1. Top Header Bar (Fixed at Top) */}
          <div className="bg-[#084c36] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 border-b border-emerald-900 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FDB813]" />
                <span>Verified Beneficiary Spotlight</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-200 hidden sm:inline">
                {child.verificationNode}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Scrollable Body Content (Never Cut Off, Full Visibility) */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain space-y-4 sm:space-y-5">
            {/* Header with Avatar, Title & Location */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pb-2 border-b border-neutral-100">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-neutral-200 shadow-md bg-neutral-900 shrink-0">
                <img
                  src={child.image}
                  alt={child.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#084c36] border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
                    <Sparkles className="w-3 h-3 text-[#FDB813]" />
                    <span>{child.category}</span>
                  </span>
                  {child.bedNumber && (
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      🛏️ {child.bedNumber}
                    </span>
                  )}
                  {child.duration && (
                    <span className="text-[10px] sm:text-xs font-medium text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200">
                      ⏱️ {child.duration}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 leading-tight">
                  {child.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium flex items-center gap-1.5 mt-1">
                  <span>{child.age} Years Old • {child.gender}</span>
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-[#f5f2ee] rounded-xl px-2.5 py-1 border border-neutral-200 text-xs text-neutral-700 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#084c36]" />
                  <span>{child.location}</span>
                </div>
              </div>
            </div>

            {/* 1. True Life Story & Ground Reality (Immediate Focus on Frame Open) */}
            <div className="bg-[#faf8f5] rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#084c36]" />
                <span>True Life Story & Ground Reality</span>
              </h4>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                {child.story}
              </p>
            </div>

            {/* 2. Critical Support Needs Checklist */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2.5 flex items-center gap-1.5 font-mono">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>What Your Direct Sponsorship Covers:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {child.criticalNeeds.map((need, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-neutral-50 hover:bg-emerald-50/50 transition-colors rounded-xl p-2.5 border border-neutral-200 text-xs text-neutral-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#084c36] shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug">{need}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Contact Rise Up for Bedside Visit / Verification (Placed at end of story) */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-4 border border-emerald-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] uppercase font-mono font-bold text-emerald-900 tracking-wider">
                    Direct Verification & Hospital Bedside Contact
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-200">
                  Official Rise Up Helpline
                </span>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed">
                If you wish to assist <strong>{child.name}</strong>, visit them in person at the hospital, or verify clinical patient details directly, please reach out to our official Rise Up Help Foundation channels below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {/* Instagram Direct Link */}
                <a
                  href="https://instagram.com/riseuphelp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram (@riseuphelp)</span>
                </a>

                {/* Email Direct Link */}
                <a
                  href={`mailto:support@riseuphelp.org?subject=${encodeURIComponent(
                    `Inquiry for ${child.name} (${child.bedNumber || child.category})`
                  )}`}
                  className="flex items-center justify-center gap-2 bg-[#084c36] hover:bg-[#063b2a] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#FDB813] shrink-0" />
                  <span>support@riseuphelp.org</span>
                </a>
              </div>
            </div>
          </div>

          {/* 3. Bottom Sticky Action Footer (Always Visible) */}
          <div className="bg-neutral-900 text-white p-3.5 sm:p-4 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-800">
            <div>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider font-mono block">
                Monthly Care Requirement
              </span>
              <div className="text-base sm:text-xl font-extrabold text-[#FDB813] mt-0.5">
                ₹{(child.monthlyNeed || child.suggestedDonation).toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-neutral-300">
                  /month ({child.unitLabel})
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onSponsorChild(child);
              }}
              className="w-full sm:w-auto bg-[#FDB813] hover:bg-[#f59e0b] text-neutral-950 font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sponsor {child.name.split(' ')[0]} Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
