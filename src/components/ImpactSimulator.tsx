import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ImpactSimulatorProps {
  onSponsorAmount: (amount: number, itemTitle: string) => void;
}

export const ImpactSimulator: React.FC<ImpactSimulatorProps> = ({ onSponsorAmount }) => {
  const { language, t } = useLanguage();
  const [donationValue, setDonationValue] = useState(2500);

  const coconutCount = Math.floor(donationValue / 65);
  const mealsProvided = Math.floor(donationValue / 70);
  const schoolBags = Math.floor(donationValue / 899);

  const presets = [500, 1500, 5000, 15000, 30000, 50000, 100000];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-12 sm:my-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-xl relative overflow-hidden"
      >
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FDB813]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#084c36]/10 text-[#084c36] font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full mb-1.5 border border-[#084c36]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
              <span>{t.simulatorBadge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
              {t.simulatorTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#084c36] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.simulatorTag}</span>
          </div>
        </div>

        {/* Amount Input & Preset Chips (No Limit!) */}
        <div className="my-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
            <span className="text-xs sm:text-sm font-semibold text-neutral-700">
              {t.simulatorLabel}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#084c36]">₹</span>
              <input
                type="number"
                min="50"
                value={donationValue}
                onChange={(e) => setDonationValue(Math.max(1, Number(e.target.value) || 0))}
                className="text-2xl sm:text-3xl font-extrabold text-[#084c36] font-sans bg-transparent border-b-2 border-emerald-800/40 focus:border-emerald-800 focus:outline-none w-44 text-right py-0.5"
              />
            </div>
          </div>

          {/* Range Slider spanning up to ₹1,00,000+ */}
          <input
            type="range"
            min="200"
            max="100000"
            step="100"
            value={donationValue}
            onChange={(e) => setDonationValue(Number(e.target.value))}
            className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#084c36]"
          />

          <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-2">
            <span>{t.simulatorPack200}</span>
            <span>{t.simulatorPack25k}</span>
            <span>{t.simulatorPack100k}</span>
          </div>

          {/* Quick Preset Chips */}
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-neutral-500 font-medium mr-1">
              {language === 'hi' ? 'त्वरित चयन:' : language === 'hinglish' ? 'Quick Select:' : 'Quick Select:'}
            </span>
            {presets.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setDonationValue(amt)}
                className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer font-medium ${
                  donationValue === amt
                    ? 'bg-[#084c36] text-white border-[#084c36] shadow-xs'
                    : 'bg-neutral-50 hover:bg-white text-neutral-700 border-neutral-300'
                }`}
              >
                ₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-[#f5f2ee] rounded-2xl p-4 sm:p-5 border border-neutral-200/80 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-[#084c36] uppercase tracking-wider block">
                RUHS Cancer Hospital
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                {language === 'hi'
                  ? `${coconutCount.toLocaleString('en-IN')} ताजे नारियल`
                  : language === 'hinglish'
                  ? `${coconutCount.toLocaleString('en-IN')} Fresh Nariyal`
                  : `${coconutCount.toLocaleString('en-IN')} Coconuts`}
              </div>
              <p className="text-xs text-neutral-600 mt-1">
                {language === 'hi'
                  ? 'कीमोथेरेपी कैंसर मरीजों के बेड पर ताजा काटकर स्वच्छ स्ट्रॉ से पिलाने हेतु।'
                  : language === 'hinglish'
                  ? 'Chemo cancer patients ke bed par live cut karke fresh pilane ke liye.'
                  : 'Whole green coconuts cut live bedside for oncology chemotherapy fighters.'}
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 font-semibold mt-3 pt-2 border-t border-neutral-200">
              @ ₹65 / {language === 'hi' ? 'ताजा नारियल' : language === 'hinglish' ? 'Fresh Nariyal' : 'Fresh Coconut'}
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-amber-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200/80 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                SMS Hospital Recovery
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                {language === 'hi'
                  ? `${mealsProvided.toLocaleString('en-IN')} भोजन पैकेट`
                  : language === 'hinglish'
                  ? `${mealsProvided.toLocaleString('en-IN')} Meal Packs`
                  : `${mealsProvided.toLocaleString('en-IN')} Meals`}
              </div>
              <p className="text-xs text-neutral-600 mt-1">
                {language === 'hi'
                  ? 'मरीजों व उनके परिजनों हेतु पौष्टिक भोजन व अनार का ताजा जूस।'
                  : language === 'hinglish'
                  ? 'Patients aur unke attendants ke liye poshtik khana & pomegranate juice.'
                  : 'Wholesome protein meal boxes & cold-pressed pomegranate juice.'}
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-900 font-semibold mt-3 pt-2 border-t border-amber-200">
              @ ₹70 / {language === 'hi' ? 'भोजन यूनिट' : language === 'hinglish' ? 'Meal Unit' : 'Meal Unit'}
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-emerald-50/70 rounded-2xl p-4 sm:p-5 border border-emerald-200/80 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">
                Chhoti Chaupar Education
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                {language === 'hi'
                  ? `${schoolBags.toLocaleString('en-IN')} स्कूल बैग किट`
                  : language === 'hinglish'
                  ? `${schoolBags.toLocaleString('en-IN')} School Kits`
                  : `${schoolBags.toLocaleString('en-IN')} Full Kits`}
              </div>
              <p className="text-xs text-neutral-600 mt-1">
                {language === 'hi'
                  ? 'वाटरप्रूफ बैग + 6 कॉपियां + DOMS रंग + पेन + बोतल।'
                  : language === 'hinglish'
                  ? 'Waterproof school bag + 6 notebooks + DOMS colors + pens + bottle.'
                  : 'Waterproof bags + 6 notebooks + DOMS colors + pens + bottle + lunch box.'}
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-900 font-semibold mt-3 pt-2 border-t border-emerald-200">
              @ ₹899 / {language === 'hi' ? 'बैग व स्टेशनरी किट' : language === 'hinglish' ? 'Bag & Stationery Kit' : 'Bag & Stationery Kit'}
            </span>
          </motion.div>

        </div>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-100 relative z-10">
          <div className="text-xs text-neutral-500 text-center sm:text-left">
            <span>
              {language === 'hi'
                ? `₹${donationValue.toLocaleString('en-IN')} के लिए तत्काल 80G टैक्स छूट प्रमाण पत्र उपलब्ध।`
                : language === 'hinglish'
                ? `₹${donationValue.toLocaleString('en-IN')} ke liye instant 80G tax exemption receipt available.`
                : `Instant 80G tax exemption certificate generated for ₹${donationValue.toLocaleString('en-IN')}.`}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSponsorAmount(donationValue, `${coconutCount} Fresh Coconuts & ${schoolBags} School Kits`)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#084c36] hover:bg-[#063b2a] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#FDB813]" />
            <span>
              {language === 'hi'
                ? `अभी ₹${donationValue.toLocaleString('en-IN')} प्रायोजित करें`
                : language === 'hinglish'
                ? `Abhi ₹${donationValue.toLocaleString('en-IN')} Sponsor Karein`
                : `Sponsor ₹${donationValue.toLocaleString('en-IN')} Now`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
};
