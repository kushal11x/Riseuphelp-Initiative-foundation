import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
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
  Heart,
} from 'lucide-react';
import { Footer } from '../components/Footer';
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

interface InternshipPageProps {
  onBackToHome: () => void;
  onOpenAdmin?: () => void;
  onSubmitInternship?: (submission: InternshipSubmission) => void;
}

export const InternshipPage: React.FC<InternshipPageProps> = ({
  onBackToHome,
  onOpenAdmin,
  onSubmitInternship,
}) => {
  const { count } = useFellowshipCounter(568);

  // 13 Structured Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [ageBracket, setAgeBracket] = useState(AGE_BRACKET_OPTIONS[1]);
  const [gender, setGender] = useState('Female');
  const [state, setState] = useState('Rajasthan');
  const [city, setCity] = useState('');
  const [qualification, setQualification] = useState(QUALIFICATION_OPTIONS[1]);
  const [institution, setInstitution] = useState('');
  const [interestTrack, setInterestTrack] = useState(FELLOWSHIP_TRACK_OPTIONS[0]);
  const [weeklyAvailability, setWeeklyAvailability] = useState(WEEKLY_AVAILABILITY_OPTIONS[0]);
  const [whyJoin, setWhyJoin] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InternshipSubmission | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim() || !state.trim()) {
      return;
    }

    setIsSubmitting(true);

    const newSubmission: InternshipSubmission = {
      id: `RUH-INT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
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
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 450);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb / Back Bar */}
      <div className="max-w-7xl mx-auto w-full pt-4 px-3 sm:px-6 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 bg-white/95 hover:bg-white text-neutral-800 font-bold text-xs sm:text-sm px-4 py-2 rounded-full border border-neutral-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-[#084c36] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#084c36] font-mono font-bold text-xs px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-xs">
          <GraduationCap className="w-4 h-4 text-[#084c36]" />
          <span>National Youth Fellowship 2026-2027</span>
        </div>
      </div>

      {/* Hero Header Banner (Grand, Prestigious National Scale) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#021e14] via-[#084c36] to-[#03271b] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border-2 border-amber-500/35 relative overflow-hidden">
          {/* Luminous aura */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4 text-left">
            
            {/* Accreditation Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#FDB813] text-neutral-950 font-mono font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                Pan-India Winter 2026 Cohort
              </span>
              <span className="bg-white/15 backdrop-blur-md text-emerald-200 font-mono text-xs px-3 py-1 rounded-full border border-white/20">
                Government Section 8 Registered • 80G Certified
              </span>
              <span className="bg-white/10 text-white/80 font-mono text-xs px-3 py-1 rounded-full border border-white/15 hidden sm:inline">
                CIN: U88900RJ2024NPL093120
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#FDB813] tracking-tight leading-tight">
              National Youth Social Impact & Policy Fellowship
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed max-w-3xl font-normal">
              A prestigious pan-India social leadership initiative by Rise Up Help Initiative Foundation. Inviting dedicated school, college students & young researchers from all 28 States & 8 UTs to lead grassroots healthcare relief in Jaipur or author strategic maternal nutrition policy files.
            </p>

            {/* Dynamic Social Proof Live Counter: 500+ and Increasing */}
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/35 text-amber-300 font-mono text-xs font-bold shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-white font-black text-sm">{count}+</span>
                <span className="text-neutral-200">Candidates Applied Across 26 States</span>
              </div>
              <span className="text-xs text-emerald-200/90 font-mono">
                ⚡ Admissions Registry Active • Selection via Official Email Only
              </span>
            </div>

            {/* 4 Pillars of Recognition */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-semibold">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FDB813] shrink-0" />
                <span>Verified Section 8 Certificate</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Founder's LOR for Toppers</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-300 shrink-0" />
                <span>Dual Mode: Ground & Research</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Strictly 100% Free Application</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Dual Tracks Editorial Explainer (Ground vs Remote Research) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Track 1: Ground Seva (Jaipur) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm relative overflow-hidden text-left">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Track A • Local Jaipur Fellows
              </span>
              <span className="text-xs font-semibold text-neutral-400">On-Ground Direct Care</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mt-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Hospital Oncology & Bedside Nutrition Relief</span>
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
              Assigned to candidates living in or near Jaipur. Participate directly in hospital bedside drives at RUHS State Cancer Institute & SMS Hospital serving fresh green tender coconuts and 100% taaza anaar juice to chemotherapy warriors, plus weekend slum food drives.
            </p>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
              <span>✓ Direct Bedside Experience</span>
              <span>•</span>
              <span>✓ Ground Leadership Certificate</span>
            </div>
          </div>

          {/* Track 2: Strategic Research Files (Pan-India / Outstation) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm relative overflow-hidden text-left">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Track B • Pan-India Outstation Fellows
              </span>
              <span className="text-xs font-semibold text-neutral-400">Research & Policy Files</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mt-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" />
              <span>Maternal & Child Nutrition Policy Dossiers</span>
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
              Assigned to candidates residing outside Jaipur across all 28 States & UTs. Author structured research proposal files on high-impact questions: <em>"What supplementary clinical nutrition can be provided to pregnant women in slum clusters beyond coconut water?"</em> and submit detailed project dossiers.
            </p>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono text-sky-800 font-semibold">
              <span>✓ Policy Dossier Authorship</span>
              <span>•</span>
              <span>✓ Research Fellowship Certificate & LOR</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Application Form Container */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-neutral-200 shadow-md">
          
          {submittedData ? (
            /* Success / Confirmation Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 sm:py-12 space-y-4 max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
                  Fellowship Docket ID: {submittedData.id}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 pt-2">
                  Application Successfully Registered!
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-neutral-900">{submittedData.fullName}</span> ({submittedData.city}, {submittedData.state}). Your fellowship credentials have been recorded in the National Selection Registry.
                </p>
              </div>

              {/* What Happens Next Card */}
              <div className="bg-[#faf8f5] border border-neutral-300 rounded-3xl p-6 text-left space-y-3 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#084c36] flex items-center gap-2 font-mono">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>Official Selection Timeline & Email Dispatch</span>
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  Our selection board is reviewing state quotas and candidate profiles. Shortlisted candidates will receive their <strong>Official Selection Letter, Assigned Fellowship Track & Project Dossier</strong> directly on your registered email:
                </p>
                <div className="bg-white p-3.5 rounded-2xl border border-emerald-300 flex items-center gap-2.5 font-mono text-xs sm:text-sm text-neutral-900 shadow-2xs">
                  <Mail className="w-4 h-4 text-[#084c36] shrink-0" />
                  <span className="truncate font-bold">{submittedData.email}</span>
                </div>
                <div className="text-[11px] text-neutral-500 space-y-1 pt-2 border-t border-neutral-200">
                  <div>• <strong>Assigned Track Criteria:</strong> Jaipur-based fellows receive hospital/slum ground relief; outstation fellows receive policy research files on maternal nutrition & slum development.</div>
                  <div>• Official dockets are dispatched strictly via email within 48 to 72 hours.</div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={onBackToHome}
                  className="bg-[#084c36] hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all shadow-md cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          ) : (
            /* Spacious 13-Point National Application Form */
            <div className="max-w-4xl mx-auto space-y-8 text-left">
              
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#084c36] font-mono font-bold text-xs px-3 py-1 rounded-full border border-emerald-200 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                  <span>National Application Form • Winter 2026 Intake</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  Fellowship Enrolment Registry
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Please provide accurate academic and geographic details. All fields marked with * are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* SECTION 1: Personal & Contact Information */}
                <div className="space-y-4 bg-[#faf8f5] p-5 sm:p-7 rounded-3xl border border-neutral-200/90">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 font-mono">
                      <span>1. Candidate Identity & Direct Communication</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 font-semibold">100% Confidential</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Full Legal Name *
                      </label>
                      <div className="relative flex items-center">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Official Email */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Official Email Address * <span className="text-[10px] font-normal text-emerald-800">(For selection letters)</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. priya.sharma@gmail.com"
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all font-mono shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Primary WhatsApp */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Primary WhatsApp Mobile Number *
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-xs font-bold text-neutral-500 font-mono">+91</span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98282 91119"
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-13 pr-3.5 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all font-mono shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Alternate Phone */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Alternate / Emergency Contact Number <span className="text-[10px] font-normal text-neutral-400">(Optional)</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-xs font-bold text-neutral-500 font-mono">+91</span>
                        <input
                          type="tel"
                          value={alternatePhone}
                          onChange={(e) => setAlternatePhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98280 00000"
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-13 pr-3.5 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all font-mono shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Age Bracket */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Age Bracket *
                      </label>
                      <div className="relative flex items-center">
                        <Calendar className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                        <select
                          value={ageBracket}
                          onChange={(e) => setAgeBracket(e.target.value)}
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                        >
                          {AGE_BRACKET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl px-3.5 py-3 text-neutral-900 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Geographic & Educational Profile */}
                <div className="space-y-4 bg-[#faf8f5] p-5 sm:p-7 rounded-3xl border border-neutral-200/90">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 font-mono">
                      <span>2. Geographic & Educational Profile</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 font-semibold">Determines Ground vs Research Track</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* State / UT */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        State / Union Territory * <span className="text-[10px] font-normal text-emerald-800">(All 36 States & UTs Open)</span>
                      </label>
                      <div className="relative flex items-center">
                        <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                        <select
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                        >
                          {INDIAN_STATES_AND_UTS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* City / District */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Current City / District *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Jaipur, Jodhpur, Lucknow, Mumbai, Indore..."
                        className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl px-3.5 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Highest Educational Qualification */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Highest Educational Qualification *
                      </label>
                      <div className="relative flex items-center">
                        <GraduationCap className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                        <select
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                        >
                          {QUALIFICATION_OPTIONS.map((q) => (
                            <option key={q} value={q}>
                              {q}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Institution Name */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Current College / School / University Name
                      </label>
                      <div className="relative flex items-center">
                        <Building2 className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g. University of Rajasthan / Delhi Univ / JECRC"
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Fellowship Track & Time Commitment */}
                <div className="space-y-4 bg-[#faf8f5] p-5 sm:p-7 rounded-3xl border border-neutral-200/90">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 font-mono">
                      <span>3. Fellowship Track & Impact Commitment</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 font-semibold">Interest Matching</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Fellowship Track */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Primary Area of Interest / Fellowship Track *
                      </label>
                      <div className="relative flex items-center">
                        <BookOpen className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                        <select
                          value={interestTrack}
                          onChange={(e) => setInterestTrack(e.target.value)}
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                        >
                          {FELLOWSHIP_TRACK_OPTIONS.map((track) => (
                            <option key={track} value={track}>
                              {track}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Weekly Availability */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Weekly Time Availability *
                      </label>
                      <div className="relative flex items-center">
                        <Clock className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                        <select
                          value={weeklyAvailability}
                          onChange={(e) => setWeeklyAvailability(e.target.value)}
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
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

                  {/* Statement of Purpose */}
                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1">
                      Statement of Purpose: Why do you want to join Rise Up Help Initiative?
                    </label>
                    <textarea
                      rows={3}
                      value={whyJoin}
                      onChange={(e) => setWhyJoin(e.target.value)}
                      placeholder="Briefly describe what motivates you (e.g. cancer patient relief, maternal & child nutrition policy research, slum development, education mentorship)..."
                      className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl p-4 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:outline-none transition-all resize-none shadow-2xs"
                    />
                  </div>
                </div>

                {/* Transparent Selection Guarantee Notice */}
                <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-3xl p-5 flex items-start gap-3 text-xs text-neutral-700">
                  <ShieldCheck className="w-5 h-5 text-[#084c36] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Transparent National Selection Policy:</strong> All applications undergo merit & location review. <strong>No registration fees or hidden charges are ever charged.</strong> Official selection letters, assigned fellowship guides & verification dockets will be dispatched strictly via Email to ensure corporate integrity.
                  </p>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#03261a] via-[#084c36] to-[#03261a] hover:brightness-110 text-white font-black text-sm sm:text-base py-4 rounded-full transition-all shadow-xl active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                  <p className="text-xs text-center text-neutral-400 mt-2.5 font-mono">
                    Rise Up Help Initiative Foundation • Section 8 Registered Non-Profit • 80G Certified
                  </p>
                </div>

              </form>
            </div>
          )}

        </div>
      </div>

      {/* Page Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />

    </div>
  );
};
