import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, ShieldCheck } from 'lucide-react';
import { PatientLifelineModule } from './PatientLifelineModule';
import { DonorsLeaderboard } from './DonorsLeaderboard';
import type { DriveItem, LeaderboardDonor } from '../types';
import { OFFICIAL_INFO } from '../data/mockData';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  donors: LeaderboardDonor[];
  onSponsorPatient: (
    item: DriveItem,
    initialData?: { name: string; phone: string; quantity: number }
  ) => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  donors,
  onSponsorPatient,
}) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none flex items-center justify-center p-2 sm:p-4 lg:p-6">
          {/* Glassmorphic Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/75 backdrop-blur-md"
          />

          {/* Hyper-Smooth Scale-Up Kinetic Modal Window (scale-95 to scale-100) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 28,
            }}
            className="relative w-full max-w-7xl max-h-[94vh] bg-gradient-to-b from-white to-[#faf8f5] rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Sticky Header Bar */}
            <div className="sticky top-0 z-30 px-5 sm:px-8 py-4 bg-white/95 backdrop-blur-xl border-b border-neutral-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-100 to-orange-100 p-2 border border-amber-300 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-[#084c36]" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-950 text-sm sm:text-base flex items-center gap-2">
                    <span>Patient Lifeline Care Portal & Leaderboard</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-mono px-2 py-0.5 rounded-full border border-emerald-200 hidden sm:inline-block">
                      Active Intake
                    </span>
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 font-mono">
                    {OFFICIAL_INFO.cinNumber} • Direct Government Hospital Oncology Settlement
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 p-2 rounded-full transition-colors cursor-pointer"
                  title="Close Portal (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable Content with Full Expanded Features */}
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-200/80">
              
              {/* Feature 1: Patient Story Tracks & ₹15,000 Care Unit Matrix */}
              <PatientLifelineModule onSponsorPatient={onSponsorPatient} />

              {/* Feature 2: The Honor Roll Leaderboard Grid */}
              <DonorsLeaderboard donors={donors} />

            </div>

            {/* Sticky Footer Bar */}
            <div className="px-6 py-3.5 bg-white/95 backdrop-blur-md border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>50% Tax Exemption Receipts (80G) generated instantly upon donation.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={onClose}
                  className="text-xs text-neutral-500 hover:text-neutral-900 underline cursor-pointer font-medium"
                >
                  Close Window
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
