import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { StoryContentConfig } from '../types';

interface StorySectionProps {
  storyContent?: StoryContentConfig;
}

export const StorySection: React.FC<StorySectionProps> = ({ storyContent }) => {
  return (
    <section id="story" className="py-16 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Visual & Ethos Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-white p-3 sm:p-4 group">
            {/* Embedded Visual with Open Natural Official Logo */}
            <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-tr from-emerald-950 via-[#084c36] to-[#FDB813]/30 flex flex-col items-center justify-center p-6 text-center text-white">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(253,184,19,0.3)_0%,_transparent_70%)] pointer-events-none" />
              
              {/* Open Logo Silhouette (No Restrictive Circle Container) */}
              <motion.div
                whileHover={{ scale: 1.06, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative w-48 sm:w-56 h-36 sm:h-40 mb-3 flex items-center justify-center cursor-pointer select-none"
              >
                {/* Soft ambient aura */}
                <div className="absolute inset-0 bg-[#FDB813]/25 rounded-full blur-2xl pointer-events-none" />
                <img
                  src={storyContent?.ethosImage || "/logo.png"}
                  alt="RiseUpHelp Open Brand Silhouette"
                  className="w-full h-full object-contain filter drop-shadow-2xl relative z-10"
                />
              </motion.div>

              <span className="text-xs uppercase tracking-widest text-[#FDB813] font-bold mt-1">
                {storyContent?.establishedText || "ESTABLISHED 2024 • JAIPUR"}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-1.5 max-w-sm">
                RiseUpHelp Initiative Foundation
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 max-w-xs font-serif italic">
                "{storyContent?.storyQuote || "Seva • Empathy • Impact — Always There For You"}"
              </p>
            </div>

            {/* Float Card Overlay */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 350 }}
              className="absolute -bottom-5 sm:-bottom-6 right-6 sm:right-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-neutral-200 flex items-center gap-3.5 max-w-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#084c36] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900">Section 8 Registered</div>
                <div className="text-[11px] text-neutral-500">50% Tax Exemption (80G Certified)</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Editorial Copy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#084c36] font-semibold text-xs rounded-full px-3.5 py-1 mb-4 border border-emerald-200/80 w-fit">
            <Heart className="w-3.5 h-3.5 fill-[#084c36]" />
            <span>OUR FOUNDATION STORY & ETHOS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
            {storyContent?.missionTitle || "Redefining Clinical Care & Educational Dignity in"}{' '}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }} className="text-[#084c36]">
              {storyContent?.missionHighlight || "Rajasthan."}
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-neutral-700 leading-relaxed">
            {storyContent?.paragraph1 || (
              <>
                Founded in Jaipur, <strong>RiseUpHelp Initiative Foundation</strong> [Help__by__riseup (@riseuphelp)] was born out of a fundamental human observation: during prolonged medical battles and underprivileged schooling, it is the simple, dignified essentials that sustain hope.
              </>
            )}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {storyContent?.harEkadashiVow || (
              <>
                <strong>Har Ekadashi Vow:</strong> We purchase whole, fresh green tender coconuts directly from ethical orchards, transport them on-ground to State Cancer Medical College (RUHS) and SMS Hospital oncology wards, cut and open them fresh right in front of chemotherapy cancer fighters, and serve them with sterile eco-straws for natural hydration and nausea relief.
              </>
            )}
          </p>

          {/* Value Matrix */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              className="bg-[#f5f2ee] rounded-2xl p-4 border border-neutral-200/70 transition-all"
            >
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-[#084c36]" />
                <span>Har Ekadashi Bedside Seva</span>
              </div>
              <p className="text-[11px] text-neutral-600">
                Whole tender green coconuts cut live bedside at State Cancer Medical College (RUHS) for cancer patients.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              className="bg-[#f5f2ee] rounded-2xl p-4 border border-neutral-200/70 transition-all"
            >
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-[#084c36]" />
                <span>All Children Education Cells</span>
              </div>
              <p className="text-[11px] text-neutral-600">
                High-grade waterproof school bags, notebooks & mentoring for all underprivileged children (boys & girls).
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
