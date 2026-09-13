import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import type { LeaderboardDonor } from '../types';

interface RecentDonationsTickerProps {
  donors?: LeaderboardDonor[];
  isEnabled?: boolean;
}

export const RecentDonationsTicker: React.FC<RecentDonationsTickerProps> = ({
  donors = [],
  isEnabled = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [closedManually, setClosedManually] = useState(false);

  // Filter only real valid donors with names and amounts
  const realDonors = donors.filter((d) => d && d.name && d.name.trim() !== '' && d.amount > 0);

  useEffect(() => {
    if (closedManually || !isEnabled || realDonors.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % realDonors.length);
        setIsVisible(true);
      }, 800);
    }, 7000);

    return () => clearInterval(interval);
  }, [closedManually, isEnabled, realDonors.length]);

  if (!isEnabled || closedManually || realDonors.length === 0) return null;

  const current = realDonors[currentIndex % realDonors.length];
  if (!current) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-4 left-4 z-40 max-w-sm pointer-events-auto">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl p-3 sm:p-3.5 shadow-xl border border-neutral-200/90 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#084c36] flex items-center justify-center flex-shrink-0 animate-pulse">
              <Heart className="w-4 h-4 fill-[#084c36]" />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xs font-bold text-neutral-900 truncate">
                  {current.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="text-[10px] text-neutral-400 font-mono">
                  {current.timestamp || 'Verified'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 truncate mt-1">
                Sponsored <strong className="text-neutral-900">₹{current.amount.toLocaleString('en-IN')}</strong> ({current.patientAdopted || 'Bedside Hospital Seva'})
              </p>
            </div>

            <button
              onClick={() => setClosedManually(true)}
              className="text-neutral-400 hover:text-neutral-600 p-0.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
