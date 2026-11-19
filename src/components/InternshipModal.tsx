import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  Mail,
  Building2,
  BookOpen,
  MapPin,
  Send,
  FileText,
  Clock,
  ShieldCheck,
  Calendar,
  User,
  Compass,
} from 'lucide-react';
import type { InternshipSubmission } from '../types';
import { useFellowshipCounter } from '../utils/fellowshipCounter';

export const INDIAN_STATES_AND_UTS = [
  'Rajasthan',
  'Delhi NCR',
  'Uttar Pradesh',
  'Maharashtra',
  'Madhya Pradesh',
  'Gujarat',
  'Haryana',
  'Punjab',
  'Bihar',
  'Karnataka',
  'West Bengal',
  'Tamil Nadu',
  'Telangana',
  'Andhra Pradesh',
  'Kerala',
  'Odisha',
  'Jharkhand',
  'Assam',
  'Uttarakhand',
  'Himachal Pradesh',
  'Chhattisgarh',
  'Goa',
  'Jammu & Kashmir',
  'Chandigarh',
  'Ladakh',
  'Puducherry',
  'Tripura',
  'Manipur',
  'Meghalaya',
  'Nagaland',
  'Mizoram',
  'Arunachal Pradesh',
  'Sikkim',
  'Andaman and Nicobar Islands',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
];

export const QUALIFICATION_OPTIONS = [
  '11th / 12th Standard (Senior Secondary)',
  'Undergraduate / Bachelor\'s (1st or 2nd Year)',
  'Undergraduate / Bachelor\'s (Final Year / Graduating)',
  'Postgraduate / Master\'s (MA, M.Sc, M.Com, MBA, MSW)',
  'Professional Degree (B.Tech, MBBS, Law, CA, Architecture)',
  'Graduate / Working Professional / Preparing for Exams',
  'Doctorate / Ph.D / Researcher',
];

export const FELLOWSHIP_TRACK_OPTIONS = [
  'Hospital Bedside Oncology & Patient Nutrition Relief',
  'Slum Maternal & Infant Nutrition Policy Research',
  'Underprivileged Child Education & STEM Mentorship',
  'Social Media Journalism, Documentary & Ground Storytelling',
  'Youth Leadership, Community Outreach & Awareness',
  'NGO Public Administration & Ground Data Auditing',
];

export const WEEKLY_AVAILABILITY_OPTIONS = [
  '4 to 6 Hours / Week (Flexible Weekend Fellowship)',
  '8 to 12 Hours / Week (Standard National Fellowship)',
  '15+ Hours / Week (Intensive Social Leadership)',
];

export const AGE_BRACKET_OPTIONS = [
  '16 - 18 Years',
  '19 - 21 Years',
  '22 - 25 Years',
  '26+ Years',
];

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInternship?: (submission: InternshipSubmission) => void;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({
  isOpen,
  onClose,
  onSubmitInternship,
}) => {
  const { count } = useFellowshipCounter(568);

  // 13 Comprehensive Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [ageBracket, setAgeBracket] = useState(AGE_BRACKET_OPTIONS[1]);
  const [gender, setGender] = useState('Prefer not to say');
  const [state, setState] = useState('Rajasthan');
  const [city, setCity] = useState('');
  const [qualification, setQualification] = useState(QUALIFICATION_OPTIONS[1]);
  const [institution, setInstitution] = useState('');
  const [interestTrack, setInterestTrack] = useState(FELLOWSHIP_TRACK_OPTIONS[0]);
  const [weeklyAvailability, setWeeklyAvailability] = useState(WEEKLY_AVAILABILITY_OPTIONS[0]);
  const [whyJoin, setWhyJoin] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InternshipSubmission | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim() || !state.trim()) {
      return;
    }

    setIsSubmitting(true);

    const newSubmission: InternshipSubmission = {
      id: `ruh-int-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      alternatePhone: alternatePhone.trim() || undefined,
      ageBracket,
      gender,
      state,
      city: city.trim(),
      qualification,
      institution: institution.trim() || 'Not Specified',
      course: qualification,
      interestTrack,
      weeklyAvailability,
      whyJoin: whyJoin.trim() || undefined,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    // 1. LocalStorage Persistence
    try {
      const stored = localStorage.getItem('ruh_internships_v1');
      const list: InternshipSubmission[] = stored ? JSON.parse(stored) : [];
      list.unshift(newSubmission);
      localStorage.setItem('ruh_internships_v1', JSON.stringify(list));
    } catch (err) {
      console.warn('Failed to save internship to localStorage', err);
    }

    // 2. Background Server Sync
    fetch('/api/submit-internship', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSubmission),
    }).catch((err) => console.warn('Background server submit warning:', err));

    // 3. Inform parent App state
    if (onSubmitInternship) {
      onSubmitInternship(newSubmission);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData(newSubmission);
    }, 450);
  };

  const handleResetAndClose = () => {
    setSubmittedData(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setAlternatePhone('');
    setCity('');
    setInstitution('');
    setWhyJoin('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-neutral-300 relative text-neutral-900 my-auto overflow-hidden flex flex-col max-h-[94vh]"
        >
          {/* Header Banner: National Scale */}
          <div className="bg-gradient-to-r from-[#03261a] via-[#084c36] to-[#021c13] text-white p-5 sm:p-7 relative overflow-hidden shrink-0 border-b border-amber-500/30">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-amber-500/25 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                  <span>National Youth Fellowship & Internship Cohort 2026-2027</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Section 8 Certified • 80G Tax Exemption
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                National Social Leadership & Policy Research Fellowship
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
                Official intake by Rise Up Help Initiative Foundation. Open for ambitious school, college students & young researchers across all 28 States & 8 UTs.
              </p>

              {/* Dynamic Live Counter Indicator: 500+ and Increasing */}
              <div className="pt-1 flex items-center gap-2 flex-wrap text-xs">
                <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/30 text-amber-300 font-mono text-[11px] sm:text-xs font-bold shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-white font-extrabold">{count}+</span>
                  <span className="text-neutral-300">Candidates Applied from 26 States</span>
                </div>
                <span className="text-[11px] text-emerald-200/80 hidden sm:inline">
                  ⚡ Intake Open • Shortlisted applicants notified via Email
                </span>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-7 overflow-y-auto space-y-6">
            {submittedData ? (
              /* Success / Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6 sm:py-10 space-y-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Application ID: {submittedData.id}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 pt-2">
                    Application Successfully Registered!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-neutral-900">{submittedData.fullName}</span> ({submittedData.city}, {submittedData.state}). Your fellowship credentials have been recorded in the National Selection Registry.
                  </p>
                </div>

                {/* What Happens Next Card */}
                <div className="bg-[#faf8f5] border border-neutral-300 rounded-2xl p-5 text-left max-w-xl mx-auto space-y-3 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#084c36] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span>Next Official Selection & Email Dispatch</span>
                  </h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Our selection board reviews candidate background, qualifications, and state representation. Shortlisted candidates receive their <strong>Official Selection Letter, Assigned Fellowship Track & Project Dossier</strong> directly via Email:
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-emerald-300 flex items-center gap-2 font-mono text-xs text-neutral-900 shadow-2xs">
                    <Mail className="w-4 h-4 text-[#084c36] shrink-0" />
                    <span className="truncate font-bold">{submittedData.email}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 space-y-1 pt-1 border-t border-neutral-200">
                    <div>• <strong>Assigned Track Criteria:</strong> Jaipur-based fellows receive hospital/slum ground relief; outstation fellows receive policy research files on maternal nutrition & slum development.</div>
                    <div>• Official communication will be dispatched within 48 to 72 hours.</div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleResetAndClose}
                    className="bg-[#084c36] hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-full transition-all shadow-md cursor-pointer"
                  >
                    Done & Return to Website
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Comprehensive Application Form (13 Structured Details) */
              <>
                {/* Elite National Credentials Pillar Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-neutral-200 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-[#FDB813]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Section 8 Verified Certificate</h4>
                      <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                        Recognized for college academic credits, NIRF/NAAC & corporate resumes.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-neutral-200 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-[#084c36] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#084c36]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Founder's LOR for Toppers</h4>
                      <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                        High-value Letter of Recommendation for top performers (MBA & Abroad).
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-neutral-200 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-700 flex items-center justify-center shrink-0">
                      <Compass className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Pan-India Dual Tracks</h4>
                      <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                        Ground Seva in Jaipur OR Strategic Research Files for Outstation Fellows.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form: 13 Required & Structured Questions */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                  
                  {/* Section Title */}
                  <div className="flex items-center justify-between pb-1 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 font-mono">
                      <span>Section A: Personal & Contact Credentials</span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">100% Confidential</span>
                  </div>

                  {/* 1. Full Legal Name & 2. Official Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        1. Full Legal Name *
                      </label>
                      <div className="relative flex items-center">
                        <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        2. Official Email Address * <span className="text-[10px] font-normal text-emerald-800">(For selection letters)</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. priya.sharma@gmail.com"
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Primary Mobile & 4. Alternate Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        3. Primary WhatsApp Mobile Number *
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs font-bold text-neutral-500 font-mono">+91</span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98282 91119"
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-12 pr-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        4. Alternate / Emergency Contact Number <span className="text-[10px] font-normal text-neutral-400">(Optional)</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs font-bold text-neutral-500 font-mono">+91</span>
                        <input
                          type="tel"
                          value={alternatePhone}
                          onChange={(e) => setAlternatePhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98280 00000"
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-12 pr-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. Age Bracket & 6. Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        5. Age Bracket *
                      </label>
                      <div className="relative flex items-center">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <select
                          value={ageBracket}
                          onChange={(e) => setAgeBracket(e.target.value)}
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all"
                        >
                          {AGE_BRACKET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        6. Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  {/* Section Title B */}
                  <div className="flex items-center justify-between pt-2 pb-1 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 font-mono">
                      <span>Section B: Location & Qualification Profile</span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">Determines Ground vs Research</span>
                  </div>

                  {/* 7. State/UT & 8. City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        7. State / Union Territory * <span className="text-[10px] font-normal text-emerald-800">(All India Open)</span>
                      </label>
                      <div className="relative flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <select
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all"
                        >
                          {INDIAN_STATES_AND_UTS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        8. Current City / District *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Jaipur, Jodhpur, Lucknow, Mumbai, Indore..."
                        className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* 9. Highest Educational Qualification & 10. Institution Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        9. Highest Educational Qualification *
                      </label>
                      <div className="relative flex items-center">
                        <GraduationCap className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <select
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all"
                        >
                          {QUALIFICATION_OPTIONS.map((q) => (
                            <option key={q} value={q}>
                              {q}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        10. Current College / School / University Name
                      </label>
                      <div className="relative flex items-center">
                        <Building2 className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <input
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g. University of Rajasthan / Delhi Univ / JECRC"
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Title C */}
                  <div className="flex items-center justify-between pt-2 pb-1 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 font-mono">
                      <span>Section C: Fellowship Track & Impact Motivation</span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">Interest Matching</span>
                  </div>

                  {/* 11. Fellowship Track & 12. Weekly Availability */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        11. Primary Area of Interest / Fellowship Track *
                      </label>
                      <div className="relative flex items-center">
                        <BookOpen className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <select
                          value={interestTrack}
                          onChange={(e) => setInterestTrack(e.target.value)}
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all"
                        >
                          {FELLOWSHIP_TRACK_OPTIONS.map((track) => (
                            <option key={track} value={track}>
                              {track}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        12. Weekly Time Availability *
                      </label>
                      <div className="relative flex items-center">
                        <Clock className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <select
                          value={weeklyAvailability}
                          onChange={(e) => setWeeklyAvailability(e.target.value)}
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all"
                        >
                          {WEEKLY_AVAILABILITY_OPTIONS.map((avail) => (
                            <option key={avail} value={avail}>
                              {avail}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 13. Statement of Purpose (SoP) */}
                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1">
                      13. Statement of Purpose: Why do you want to join Rise Up Help Initiative?
                    </label>
                    <textarea
                      rows={2}
                      value={whyJoin}
                      onChange={(e) => setWhyJoin(e.target.value)}
                      placeholder="Briefly describe what motivates you (e.g., patient relief, maternal & child nutrition policy research, slum development, education)..."
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Transparent Selection Guarantee Notice */}
                  <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-neutral-700">
                    <ShieldCheck className="w-4 h-4 text-[#084c36] shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-[11px]">
                      <strong>Transparent National Selection Policy:</strong> All applications undergo merit & location review. <strong>No registration fees or hidden charges are ever charged.</strong> Official selection letters, assigned fellowship guides & verification dockets will be dispatched strictly via Email to ensure corporate integrity.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#03261a] via-[#084c36] to-[#03261a] hover:brightness-110 text-white font-extrabold text-sm py-4 rounded-full transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Application to National Registry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#FDB813]" />
                          <span>Submit National Fellowship Application (100% Free)</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-neutral-400 mt-2 font-mono">
                      Rise Up Help Initiative Foundation • Section 8 Registered Non-Profit • 80G Certified
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
