import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, ShieldCheck, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { PATIENT_PROFILES } from '../data/mockData';
import type { PatientProfile, DriveItem } from '../types';

interface PatientLifelineModuleProps {
  patientProfiles?: PatientProfile[];
  onSponsorPatient: (
    item: DriveItem,
    initialData?: { name: string; phone: string; quantity: number }
  ) => void;
}

export const PatientLifelineModule: React.FC<PatientLifelineModuleProps> = ({
  patientProfiles = PATIENT_PROFILES,
  onSponsorPatient,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Critical Priority' | 'Active Chemo Protocol'>('All');

  const sourcePatients = patientProfiles && patientProfiles.length > 0 ? patientProfiles : PATIENT_PROFILES;

  const filteredPatients = sourcePatients.filter((patient) => {
    if (activeFilter === 'All') return true;
    return patient.urgency === activeFilter;
  });

  const handleSponsorClick = (patient: PatientProfile, amount: number = 15000) => {
    const patientDriveItem: DriveItem = {
      id: `patient-${patient.id}`,
      name: `Cancer Warrior Lifeline: ${patient.name}`,
      tagline: `${patient.diagnosis} • ${patient.hospitalWard}`,
      category: 'hospital',
      price: amount,
      unitLabel: 'Complete Patient Care Unit',
      targetCount: `₹${patient.targetAmount.toLocaleString('en-IN')} Unit Target`,
      deliveredCount: `₹${patient.fundedAmount.toLocaleString('en-IN')} Funded`,
      percentage: patient.fundingPercentage,
      color: '#084c36',
      badge: patient.urgency,
      description: `Complete chemotherapeutic medicines, target oncology drugs, diagnostic support, and bedside nutrition for ${patient.name} (${patient.age} yrs) at ${patient.hospitalWard}, Jaipur. Verification Ref: ${patient.verificationId}.`,
      impactMetrics: `100% direct medication settlement at RUHS & SMS Hospital oncology pharmacies.`,
      options: {
        primary: `Full Care Unit (₹15,000)`,
        secondary: `Half Medicine Share (₹7,500)`,
      },
    };

    onSponsorPatient(patientDriveItem, {
      name: '',
      phone: '',
      quantity: 1,
    });
  };

  return (
    <section
      id="patient-sponsorship"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200/80 relative select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Workspace Row Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#084c36]/10 text-[#084c36] font-semibold text-xs rounded-full px-4 py-1 mb-3.5 border border-[#084c36]/20">
            <Activity className="w-3.5 h-3.5 text-[#FDB813]" />
            <span>ADOPT A CANCER WARRIOR / SYSTEMIC MEDICAL CARE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 tracking-tight">
            Sponsor a Cancer Warrior Lifeline.{' '}
            <span
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}
              className="text-[#084c36]"
            >
              Take full responsibility.
            </span>
          </h2>

          {/* Main Pitch Line (Verbatim) */}
          <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal text-balance">
            Aap kisi ek critical cancer warrior ki poori zimedari le skte hain. Your support provides complete specialized chemotherapeutic medicines, diagnostic support, and lifeline care directly inside government hospital wards.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {(['All', 'Critical Priority', 'Active Chemo Protocol'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#084c36] text-white shadow-sm'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {filter === 'All' ? 'All Active Warriors' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Story Cards Grid / Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredPatients.map((patient) => {
            const fundedPercent = patient.fundingPercentage;
            const remainingAmount = Math.max(0, patient.targetAmount - patient.fundedAmount);

            return (
              <motion.div
                key={patient.id}
                whileHover={{
                  y: -6,
                  transition: { type: 'spring', stiffness: 350, damping: 22 },
                }}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Image Section with Urgency & Batch Node */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-950 flex-shrink-0">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-black/25" />

                  {/* Urgency Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                        patient.urgency === 'Critical Priority'
                          ? 'bg-red-600 text-white'
                          : patient.urgency === 'Active Chemo Protocol'
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {patient.urgency}
                    </span>
                  </div>

                  {/* Verification Badge */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[9px] font-mono px-2 py-0.5 rounded-md border border-white/20">
                    {patient.verificationId}
                  </div>

                  {/* Patient Name & Age on Image Base */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold leading-tight group-hover:text-[#FDB813] transition-colors">
                        {patient.name}
                      </h3>
                      <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md">
                        {patient.age} yrs • {patient.gender}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body with Detailed Layout */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Diagnosis & Location */}
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[#084c36]">
                      <MapPin className="w-3 h-3 text-[#FDB813] flex-shrink-0" />
                      <span className="truncate">{patient.hospitalWard}</span>
                    </div>
                    <div className="text-xs font-bold text-neutral-900 mt-1 line-clamp-1">
                      {patient.diagnosis}
                    </div>

                    {/* The True Story */}
                    <div className="mt-2.5 bg-neutral-50 rounded-xl p-2.5 border border-neutral-200/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-mono">
                        The True Story
                      </span>
                      <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                        {patient.story}
                      </p>
                    </div>

                    {/* Current Critical Medical Needs */}
                    <div className="mt-2.5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block font-mono">
                        Critical Medical Needs:
                      </span>
                      <ul className="text-[10px] text-neutral-600 space-y-1">
                        {patient.medicalNeeds.slice(0, 2).map((need, i) => (
                          <li key={i} className="flex items-start gap-1 leading-snug">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span className="line-clamp-1">{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Rigid Funding Matrix & Progress Loading Bar */}
                  <div className="bg-emerald-50/70 rounded-2xl p-3 border border-emerald-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[9px] text-neutral-500 uppercase font-mono block">
                          Fixed Care Target Unit
                        </span>
                        <strong className="text-sm font-bold text-neutral-950 font-sans">
                          ₹{patient.targetAmount.toLocaleString('en-IN')}
                        </strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-neutral-500 uppercase font-mono block">
                          Funded
                        </span>
                        <strong className="text-xs font-bold text-emerald-800">
                          ₹{patient.fundedAmount.toLocaleString('en-IN')} ({fundedPercent}%)
                        </strong>
                      </div>
                    </div>

                    {/* Horizontal Progress Tracking Indicator */}
                    <div className="w-full h-2 bg-emerald-200/80 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-600 to-[#084c36] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${fundedPercent}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                      <span>Cycle {patient.cyclesCompleted}/{patient.totalCycles} Chemotherapy</span>
                      <span className="text-amber-800 font-semibold">Remaining: ₹{remainingAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Action Trigger: Adopt This Patient Lifeline */}
                  <button
                    onClick={() => handleSponsorClick(patient, 15000)}
                    className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#FDB813] fill-[#FDB813]" />
                    <span>Adopt This Patient Lifeline (₹15,000)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 100% Direct Public Ledger Settlement Guarantee Note */}
        <div className="mt-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#084c36] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-950">
                100% Direct Hospital Pharmacy Settlement
              </h4>
              <p className="text-[11px] text-neutral-600">
                Every ₹15,000 care unit is directly credited to government hospital oncology counters for real chemotherapeutic medicines.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Section 8 Registered • 80G Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};
