import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Search, Heart, Sparkles, X, Printer, UserCheck } from 'lucide-react';
import type { LeaderboardDonor } from '../types';

interface DonorsLeaderboardProps {
  donors: LeaderboardDonor[];
  onOpenReceipt?: (receiptNumber: string) => void;
}

export const DonorsLeaderboard: React.FC<DonorsLeaderboardProps> = ({
  donors,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDonorReceipt, setSelectedDonorReceipt] = useState<LeaderboardDonor | null>(null);

  const filteredDonors = donors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.patientAdopted.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFundedSum = donors.reduce((sum, d) => sum + d.amount, 0);

  return (
    <section
      id="donors-leaderboard"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200/80 relative select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FDB813]/15 text-neutral-900 font-semibold text-xs rounded-full px-4 py-1 mb-3.5 border border-[#FDB813]/30">
            <Award className="w-3.5 h-3.5 text-[#FDB813]" />
            <span>RISEUP HELP LEADERBOARD / REAL-TIME COMMUNITY HEROES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 tracking-tight">
            The Honor Roll.{' '}
            <span
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}
              className="text-[#084c36]"
            >
              Public acknowledgement of seva.
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm lg:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Transparent live record of patrons and community heroes who have adopted critical cancer warriors and hospital nutrition drives across Jaipur.
          </p>
        </div>

        {/* Glassmorphic Analytics & Search Top Bar */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-neutral-200 shadow-md mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Telemetry Highlight Pill */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-100 to-orange-100 border border-amber-300 p-2.5 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-[#084c36]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono tracking-wider block">
                  Total Community Care Disbursed
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#084c36] font-sans">
                  ₹{totalFundedSum.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Search Input Filter */}
            <div className="w-full md:w-80 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search donor name, receipt, or batch code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-4 py-2.5 text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-emerald-800 focus:outline-none shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Leaderboard Table Grid */}
        <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xl">
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-neutral-100/80 border-b border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
            <div className="col-span-1">Rank</div>
            <div className="col-span-3">Donor / Community Hero</div>
            <div className="col-span-2">Batch Code</div>
            <div className="col-span-3">Patient / Seva Adopted</div>
            <div className="col-span-2 text-right">Contribution</div>
            <div className="col-span-1 text-center">Status</div>
          </div>

          {/* Table Body with Vertical Spring Physics */}
          <div className="divide-y divide-neutral-100 overflow-x-auto">
            <AnimatePresence initial={false}>
              {filteredDonors.length === 0 ? (
                <div className="p-12 text-center text-xs text-neutral-500">
                  No donor records found matching "{searchQuery}".
                </div>
              ) : (
                filteredDonors.map((donor, idx) => (
                  <motion.div
                    key={donor.id}
                    layout
                    initial={{ opacity: 0, y: -24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 30,
                    }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 p-4 sm:px-6 sm:py-4 items-center hover:bg-neutral-50/90 transition-colors group"
                  >
                    {/* Rank / Medal Node */}
                    <div className="col-span-1 flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs ${
                          idx === 0
                            ? 'bg-amber-400 text-neutral-950 font-black'
                            : idx === 1
                            ? 'bg-slate-200 text-neutral-800'
                            : idx === 2
                            ? 'bg-amber-700/20 text-amber-900'
                            : 'bg-neutral-100 text-neutral-600 font-mono'
                        }`}
                      >
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Donor Name & Location */}
                    <div className="col-span-3">
                      <div className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <span className="truncate">{donor.name}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1 mt-0.5">
                        <span>{donor.city}</span>
                        <span>•</span>
                        <span>{donor.timestamp}</span>
                      </div>
                    </div>

                    {/* Verification Batch Code */}
                    <div className="col-span-2">
                      <span className="text-[11px] font-mono bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md border border-neutral-200">
                        {donor.batchCode}
                      </span>
                    </div>

                    {/* Patient / Seva Adopted */}
                    <div className="col-span-3">
                      <div className="text-xs font-semibold text-[#084c36] flex items-center gap-1.5 truncate">
                        <Heart className="w-3.5 h-3.5 text-[#FDB813] fill-[#FDB813] flex-shrink-0" />
                        <span className="truncate">{donor.patientAdopted}</span>
                      </div>
                    </div>

                    {/* Total Sponsoring Amount */}
                    <div className="col-span-2 lg:text-right">
                      <div className="text-sm font-bold text-neutral-950 font-sans">
                        ₹{donor.amount.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-emerald-800 font-semibold block">
                        80G Tax Deductible
                      </span>
                    </div>

                    {/* Verified Status & Receipt Trigger */}
                    <div className="col-span-1 flex lg:justify-center">
                      <button
                        onClick={() => setSelectedDonorReceipt(donor)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
                        title="View Verified Receipt"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Verified</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Receipt Verification Modal */}
        <AnimatePresence>
          {selectedDonorReceipt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 relative text-neutral-900"
              >
                <button
                  onClick={() => setSelectedDonorReceipt(null)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Verified 80G Public Ledger Record</span>
                </div>

                <h3 className="text-xl font-bold text-neutral-950">
                  {selectedDonorReceipt.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Official Section 8 Donation Receipt Verification
                </p>

                {/* Receipt Details Box */}
                <div className="mt-5 bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-xs space-y-2.5">
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500">Receipt Ref ID:</span>
                    <strong className="font-mono text-neutral-900">{selectedDonorReceipt.receiptNumber}</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500">Verification Batch:</span>
                    <strong className="font-mono text-neutral-900">{selectedDonorReceipt.batchCode}</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500">Seva Allocation:</span>
                    <strong className="text-neutral-900">{selectedDonorReceipt.patientAdopted}</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500">Total Contribution:</span>
                    <strong className="text-emerald-800 text-sm font-bold">
                      ₹{selectedDonorReceipt.amount.toLocaleString('en-IN')} (50% Tax Exemption)
                    </strong>
                  </div>
                  <div className="flex justify-between pt-1 text-[11px] text-neutral-500">
                    <span>Disbursed Node:</span>
                    <span>RUHS & SMS Hospital, Jaipur</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-2.5">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt Record</span>
                  </button>
                  <button
                    onClick={() => setSelectedDonorReceipt(null)}
                    className="px-4 py-2.5 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
