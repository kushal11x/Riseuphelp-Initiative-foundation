import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Heart, MapPin, Activity, CheckCircle2, Award, Mail } from 'lucide-react';
import { Footer } from '../components/Footer';
import type { PatientProfile, LeaderboardDonor, DriveItem } from '../types';
import { PATIENT_PROFILES, INITIAL_LEADERBOARD_DONORS } from '../data/mockData';

interface CancerWarriorsPageProps {
  onBackToHome: () => void;
  patients?: PatientProfile[];
  donors?: LeaderboardDonor[];
  onSponsorPatient: (item: DriveItem, initData?: { name: string; phone: string; quantity: number }) => void;
  onOpenAdmin?: () => void;
}

export const CancerWarriorsPage: React.FC<CancerWarriorsPageProps> = ({
  onBackToHome,
  patients = PATIENT_PROFILES,
  donors = INITIAL_LEADERBOARD_DONORS,
  onSponsorPatient,
  onOpenAdmin,
}) => {
  const handleAdoptPatient = (patient: PatientProfile, fullLifeline: boolean = true) => {
    const dummyDriveItem: DriveItem = {
      id: `patient-care-${patient.id}`,
      name: `Adopt ${patient.name}`,
      tagline: `${patient.diagnosis} • ${patient.hospitalWard}`,
      category: 'hospital',
      price: fullLifeline ? patient.targetAmount : 7500,
      unitLabel: fullLifeline ? '1 Full Month Care Unit' : 'Half Chemo Cycle Share',
      targetCount: `₹${patient.targetAmount.toLocaleString('en-IN')}`,
      deliveredCount: `₹${patient.fundedAmount.toLocaleString('en-IN')} Funded`,
      percentage: patient.fundingPercentage,
      color: '#084c36',
      badge: 'Critical Cancer Lifeline',
      description: patient.story,
      impactMetrics: patient.medicalNeeds.join('; '),
      options: {
        primary: 'Full Month Unit (₹15,000)',
        secondary: 'Chemo Share (₹7,500)',
      },
    };

    onSponsorPatient(dummyDriveItem, {
      name: '',
      phone: '',
      quantity: 1,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Top Breadcrumb / Back Bar */}
      <div className="max-w-7xl mx-auto w-full pt-4 px-3 sm:px-6 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-neutral-800 font-bold text-xs sm:text-sm px-4 py-2 rounded-full border border-neutral-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-[#084c36] group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 font-bold text-xs px-3 py-1.5 rounded-full border border-rose-200">
          <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          <span>RUHS & SMS Chemotherapy Relief</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-neutral-950 via-[#042d20] to-[#084c36] text-white p-6 sm:p-12 shadow-xl border border-emerald-800/40 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#FDB813] text-neutral-950 font-mono font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              100% Direct Oncology Support
            </span>
            <h1 className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Adopt a Cancer Warrior: Chemotherapy & Lifeline Care
            </h1>
            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed">
              In government cancer wards, families from rural Rajasthan exhaust all lifetime savings on basic diagnostics. By adopting a patient for ₹15,000/month, you cover their targeted chemotherapy ampoules, single-donor platelet kits, and supportive bedside care.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                🎗 Fixed ₹15,000 / Full Care Unit
              </span>
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                📊 Verified Doctor Prescriptions & Biometrics
              </span>
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                📜 80G Tax Exemption Certificate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patients.map((patient) => (
            <motion.div
              key={patient.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-5 sm:p-7 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Profile with Image */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-neutral-900 shrink-0 border-2 border-neutral-200">
                    <img
                      src={patient.image}
                      alt={patient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-red-200 uppercase font-mono">
                        {patient.urgency}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {patient.verificationId}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                      {patient.name} ({patient.age}y, {patient.gender})
                    </h3>
                    <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                      {patient.diagnosis}
                    </p>
                    <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#FDB813]" />
                      <span>{patient.hospitalWard}, {patient.city}</span>
                    </p>
                  </div>
                </div>

                {/* Patient True Story */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4 bg-[#faf8f5] p-3.5 rounded-2xl border border-neutral-200/70">
                  {patient.story}
                </p>

                {/* Chemo Protocol Cycles Tracker */}
                <div className="bg-[#f5f2ee] rounded-2xl p-3.5 border border-neutral-200 mb-4">
                  <div className="flex justify-between items-center text-xs font-semibold text-neutral-800 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-[#084c36]" />
                      <span>Chemo Protocol Cycles:</span>
                    </span>
                    <span className="font-mono text-emerald-900 font-bold">
                      {patient.cyclesCompleted} of {patient.totalCycles} Cycles Completed
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#084c36] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(patient.cyclesCompleted / patient.totalCycles) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Medical Prescriptions Covered */}
                <div className="mb-4 space-y-1.5">
                  <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider block">
                    What This Care Unit Covers:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {patient.medicalNeeds.map((need, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-white rounded-xl p-2 border border-neutral-200/80 text-[11px] text-neutral-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#084c36] shrink-0 mt-0.5" />
                        <span>{need}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rise Up Direct Contact (Instagram & Email Only - Zero Phone Numbers) */}
                <div className="mt-3 mb-1 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-3 sm:p-3.5 border border-emerald-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-900 block">
                        Direct Verification & Hospital Contact
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600">
                      For patient privacy and bedside visit verification, reach out directly:
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                    {/* Instagram Direct Link */}
                    <a
                      href="https://instagram.com/riseuphelp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>@riseuphelp</span>
                    </a>

                    {/* Email Direct Link */}
                    <a
                      href={`mailto:support@riseuphelp.org?subject=${encodeURIComponent(
                        `Inquiry for Cancer Warrior ${patient.name}`
                      )}`}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#084c36] hover:bg-[#063b2a] text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                      title="Email Rise Up Support"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#FDB813]" />
                      <span>support@riseuphelp.org</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleAdoptPatient(patient, true)}
                  className="flex-1 bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                  <span>Adopt for ₹15,000 / Month</span>
                </button>

                <button
                  onClick={() => handleAdoptPatient(patient, false)}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold py-2.5 px-3 rounded-xl text-xs transition-all border border-neutral-300 cursor-pointer"
                >
                  Sponsor Chemo Share (₹7,500)
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Honor Roll Leaderboard Section */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1 rounded-full mb-1">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>Live Public Transparency Ledger</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                Honor Roll: Verified Lifeline Patrons
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Updated Live via Jaipur Hospital Nodes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <strong className="text-neutral-900 text-sm font-bold">{donor.name}</strong>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                      ₹{donor.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 font-medium">
                    Adopted: {donor.patientAdopted}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-200/60 flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>{donor.receiptNumber}</span>
                  <span>{donor.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />
    </div>
  );
};
