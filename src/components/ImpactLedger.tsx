import React from 'react';
import { motion } from 'framer-motion';
import { Activity, HeartHandshake, MapPin } from 'lucide-react';
import { OFFICIAL_INFO } from '../data/mockData';
import { AnimatedCounter } from './AnimatedCounter';

export const ImpactLedger: React.FC = () => {
  const telemetryNodes = [
    {
      hospital: 'RUHS State Cancer Hospital',
      location: 'Pratap Nagar, Jaipur',
      metric: '194,700+ Coconuts',
      status: 'Live Seva Drive',
      frequency: 'Every Ekadashi & Sunday',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      hospital: 'SMS Medical College & Hospital',
      location: 'Jawahar Lal Nehru Marg, Jaipur',
      metric: '34,000+ Meal Boxes',
      status: 'Daily Nutrition Track',
      frequency: 'Daily Bedside Distribution',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      hospital: 'All Slum Children Education Cells',
      location: 'Jaipur Slum Clusters',
      metric: '6,400+ School Kits',
      status: 'Active Academic Drive',
      frequency: 'Continuous Academic Support',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      hospital: 'Government Cancer Oncology Wards',
      location: '5 Partner Govt Hospitals, Jaipur',
      metric: '100+ Active Volunteers',
      status: '20 Volunteers Per Hospital',
      frequency: 'Every Ekadashi & Weekend',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
  ];

  const milestonesData = [
    {
      id: '1',
      rawNumber: 194700,
      suffix: '+',
      label: 'Fresh Coconuts Cut Bedside',
      subtext: 'Served at RUHS State Cancer Hospital & SMS Medical College',
    },
    {
      id: '2',
      rawNumber: 6400,
      suffix: '+',
      label: 'School Bags Provided',
      subtext: 'Empowering all underprivileged children across Jaipur slum cells',
    },
    {
      id: '3',
      rawNumber: 34000,
      suffix: '+',
      label: 'Nutritious Meal Boxes',
      subtext: 'Antioxidant juice and wholesome food packs for patient attendants',
    },
    {
      id: '4',
      rawNumber: 100,
      suffix: '+',
      label: 'Active Seva Volunteers',
      subtext: 'Dedicated team of 20 volunteers in each of the 5 Govt Hospitals',
    },
  ];

  return (
    <section id="impact" className="py-16 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#084c36] font-semibold text-xs rounded-full px-3.5 py-1 mb-3 border border-emerald-200">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>REAL-TIME AUDIT & VERIFIED TELEMETRY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 tracking-tight">
          Jaipur Impact Telemetry & <br className="hidden sm:inline" />
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }} className="text-[#084c36]">
            Public Relief Ledger
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-600">
          We maintain absolute transparency. Explore the live distribution milestones recorded across hospitals and educational cells in Jaipur.
        </p>
      </motion.div>

      {/* 4 Core Milestones Grid with Animated Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {milestonesData.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 350, damping: 25, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/90 hover:shadow-xl hover:border-emerald-800/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#084c36] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-sans">
                <AnimatedCounter value={item.rawNumber} suffix={item.suffix} />
              </div>
              <h4 className="text-sm font-bold text-neutral-800 mt-1">
                {item.label}
              </h4>
            </div>
            <p className="text-xs text-neutral-500 mt-3 pt-3 border-t border-neutral-100">
              {item.subtext}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Live Ground Nodes Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="bg-[#f5f2ee] rounded-3xl p-6 sm:p-8 border border-neutral-300 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#084c36] block">
              Direct Beneficiary Distribution Cells
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
              Jaipur Active Ground Stations
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>Node ID: <strong className="font-mono text-neutral-900">{OFFICIAL_INFO.verificationNodeId}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {telemetryNodes.map((node, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-xs flex flex-col justify-between gap-3 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm sm:text-base">
                    {node.hospital}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{node.location}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${node.color}`}>
                  {node.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                <span className="text-neutral-500">{node.frequency}</span>
                <span className="font-bold text-[#084c36] text-sm">{node.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
