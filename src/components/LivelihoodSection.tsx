import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import { DRIVE_ITEMS } from '../data/mockData';
import type { DriveItem } from '../types';

interface LivelihoodSectionProps {
  onSponsorItem: (item: DriveItem) => void;
}

export const LivelihoodSection: React.FC<LivelihoodSectionProps> = ({ onSponsorItem }) => {
  const schoolBagItem = DRIVE_ITEMS[2];

  return (
    <section id="livelihood" className="py-16 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Abstract Glow circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FDB813]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#0e6245]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#FDB813] font-semibold text-xs rounded-full px-3.5 py-1 mb-4 border border-white/15">
              <BookOpen className="w-3.5 h-3.5" />
              <span>EDUCATION & LIVELIHOOD CELLS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              A School Bag is Not Just a Bag.{' '}
              <span
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}
                className="text-[#FDB813]"
              >
                It Carries Dreams.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              In marginalized Jaipur slum communities, underprivileged children—both boys and girls—often face school dropout risks due to lack of basic academic accessories. Through our <strong>Children School Bag & Education Initiative</strong>, we provide durable waterproof backpacks complete with stationery, geometry boxes, and notebooks.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex-1 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FDB813]">₹899</div>
                <div className="text-xs font-semibold text-white mt-1">Cost of One Complete Kit</div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Includes Rise Up backpack + 6 notebooks + DOMS colors + pens + bottle + lunch box.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex-1 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">12,800+</div>
                <div className="text-xs font-semibold text-white mt-1">Children Equipped Across Jaipur</div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Chhoti Chaupar Govt School & Slum Education Cells.
                </p>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSponsorItem(schoolBagItem)}
                className="group inline-flex items-center gap-3 bg-[#FDB813] hover:bg-[#e5a60e] text-neutral-950 font-bold px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sponsor Bag & Stationery Kit (₹899 / Child)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>80G Tax Exemption Eligible</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ rotateY: 3, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl flex flex-col gap-4 text-neutral-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FDB813] text-neutral-900 flex items-center justify-center font-bold text-xs">
                    RU
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    School Kit Breakdown
                  </span>
                </div>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                  Verified Sourcing
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span>Durable Rise Up Waterproof Backpack</span>
                  <span className="font-semibold text-white">₹450</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span>6 Hardcover Ruling Notebooks & Drawing Pad</span>
                  <span className="font-semibold text-white">₹180</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span>DOMS Colors, Pentonic Pens & Pencil Box</span>
                  <span className="font-semibold text-white">₹120</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span>Stainless Water Bottle & Lunch Box</span>
                  <span className="font-semibold text-white">₹149</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white">
                <span>Total Kit Sponsor Value:</span>
                <span className="text-lg text-[#FDB813]">₹899 / Student</span>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
