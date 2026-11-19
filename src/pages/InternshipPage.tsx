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
  Lightbulb,
  Check,
  ArrowDown,
  TrendingUp,
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
  'Graduate / Working Professional / Competitive Exam Aspirant',
  'Doctorate / Ph.D / Academic Researcher',
];

export const ACADEMIC_DISCIPLINE_OPTIONS = [
  'Social Sciences & Humanities',
  'Commerce, Finance & Business Administration (BBA/MBA)',
  'Engineering, Technology & Computer Science (B.Tech/BCA)',
  'Medicine, Nursing & Public Health / Life Sciences',
  'Law, Legal Studies & Public Policy',
  'Mass Communication, Journalism & Media Arts',
  'Pure Sciences, Mathematics & Statistics',
  'Other Interdisciplinary Discipline',
];

export const PRIOR_EXPERIENCE_OPTIONS = [
  'Leadership Role (Led student clubs / social initiatives / campus drives)',
  'Active Volunteer (Participated in NGO drives / community work)',
  'First-Time Contributor (Passionate about beginning grassroots journey)',
];

export const FELLOWSHIP_TRACK_OPTIONS = [
  'Hospital Bedside Oncology & Patient Nutrition Relief (Clinical Bedside)',
  'Slum Maternal & Infant Supplementary Nutrition Policy Dossier (Research File)',
  'Pediatric Slum Education & Digital Literacy Intervention (Education Cell)',
  'Ground Documentary Journalism & Transparency Storytelling (Media Track)',
  'Public Administration & Community Field Auditing (Operations)',
];

const AVAILABLE_SKILLS = [
  'Research & Dossier Writing',
  'Field Ground Operations',
  'Data & Impact Analytics',
  'Content & Video Storytelling',
  'Public Speaking & Advocacy',
  'Community Engagement',
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
  const { count } = useFellowshipCounter(574);

  // Form States (Clean, Professional, No phone number clutter)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [ageBracket, setAgeBracket] = useState(AGE_BRACKET_OPTIONS[1]);
  const [gender, setGender] = useState('Female');
  const [state, setState] = useState('Rajasthan');
  const [city, setCity] = useState('');
  const [qualification, setQualification] = useState(QUALIFICATION_OPTIONS[1]);
  const [academicDiscipline, setAcademicDiscipline] = useState(ACADEMIC_DISCIPLINE_OPTIONS[0]);
  const [institution, setInstitution] = useState('');
  const [priorExperience, setPriorExperience] = useState(PRIOR_EXPERIENCE_OPTIONS[0]);
  const [interestTrack, setInterestTrack] = useState(FELLOWSHIP_TRACK_OPTIONS[0]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Research & Dossier Writing',
    'Community Engagement',
  ]);
  const [analyticalResponse, setAnalyticalResponse] = useState('');
  const [whyJoin, setWhyJoin] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InternshipSubmission | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !city.trim() || !state.trim()) {
      return;
    }

    setIsSubmitting(true);

    const newSubmission: InternshipSubmission = {
      id: `RUH-INT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      ageBracket,
      gender,
      state,
      city: city.trim(),
      qualification,
      academicDiscipline,
      institution: institution.trim() || 'Independent Scholar',
      course: qualification,
      priorExperience,
      interestTrack,
      coreSkills: selectedSkills,
      analyticalResponse: analyticalResponse.trim() || undefined,
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
      window.scrollTo({ top: 260, behavior: 'smooth' });
    }, 450);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300 bg-[#fbf9f6] min-h-screen text-neutral-900">
      
      {/* Top Back Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full pt-4 px-3 sm:px-6 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs sm:text-sm px-4 py-2 rounded-full border border-neutral-300 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-700 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 bg-[#0d1627] text-amber-300 font-mono font-bold text-xs px-3.5 py-1.5 rounded-full border border-neutral-800 shadow-xs">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>National Fellowship Admissions 2026-2027</span>
        </div>
      </div>

      {/* Hero Header Banner (Grand, Prestigious National Scale - Midnight Obsidian & Gold Luxury Theme) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#090f1d] via-[#0d1627] to-[#060a12] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10 ring-1 ring-amber-400/20 relative overflow-hidden">
          {/* Ambient Lighting Halos */}
          <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-amber-400/12 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* 2-Column Balanced Grid: Left Content (7 cols) + Right Admissions Snapshot (5 cols) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Mission, Title, Accreditations & Recognition */}
            <div className="lg:col-span-7 space-y-4 text-left">
              {/* Accreditation Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-gradient-to-r from-[#FDB813] to-amber-400 text-neutral-950 font-mono font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
                  <span>Pan-India Winter 2026 Intake</span>
                </span>
                <span className="bg-white/10 backdrop-blur-md text-emerald-300 font-mono text-xs px-3 py-1 rounded-full border border-white/15 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Govt Section 8 Registered • 80G Certified</span>
                </span>
                <span className="bg-white/5 text-neutral-300 font-mono text-xs px-3 py-1 rounded-full border border-white/10 hidden sm:inline">
                  CIN: U88900RJ2024NPL093120
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-amber-200 tracking-tight leading-[1.15]">
                National Youth Social Impact & Policy Fellowship
              </h1>

              <p className="text-xs sm:text-base text-neutral-300 leading-relaxed font-normal">
                A prestigious pan-India social leadership initiative by Rise Up Help Initiative Foundation. Uniting passionate high-school & college students and young researchers across all 28 States & 8 UTs to lead frontline healthcare relief in Jaipur or author strategic maternal nutrition policy files from home.
              </p>

              {/* Dynamic Social Proof Live Counter: 500+ and Increasing */}
              <div className="pt-1 flex items-center gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/35 text-amber-300 font-mono text-xs font-bold shadow-inner">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-white font-black text-sm">{count}+</span>
                  <span className="text-neutral-200">Candidates Applied Across 26 States</span>
                </div>
                <span className="text-xs text-amber-200/90 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admissions Open • Direct Email Selection</span>
                </span>
              </div>

              {/* 4 Pillars of Recognition */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold">
                <div className="bg-white/[0.07] backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-[#FDB813] shrink-0" />
                  <span>Verified Section 8 Certificate</span>
                </div>
                <div className="bg-white/[0.07] backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Founder's LOR for Top 10%</span>
                </div>
                <div className="bg-white/[0.07] backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Dual Track: Jaipur Ground & Research</span>
                </div>
                <div className="bg-white/[0.07] backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Strictly 100% Free Application</span>
                </div>
              </div>
            </div>

            {/* Right Column: Executive Admissions Snapshot Card (No Empty Space) */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden text-left space-y-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-300">
                      Admissions Telemetry
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Live Registry
                  </span>
                </div>

                {/* Big Metric Display */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      {count}+
                    </span>
                    <span className="text-xs text-amber-300 font-mono font-bold flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Organic Live
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Verified candidate portfolios submitted across Delhi, Rajasthan, UP, Maharashtra, Karnataka & 21 other regions.
                  </p>
                </div>

                {/* Track Participation Breakdown */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-300">
                    <span>Ground Healthcare (Jaipur)</span>
                    <span className="text-emerald-400 font-bold">38%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-400 h-full w-[38%]" />
                    <div className="bg-sky-400 h-full w-[62%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-300">
                    <span>Maternal Nutrition Policy (Outstation)</span>
                    <span className="text-sky-400 font-bold">62%</span>
                  </div>
                </div>

                {/* Verification Checkmarks */}
                <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Pure Merit-Based Selection (No bias, 100% free)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Official Selection Letter dispatched to Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certificate issued under Section 8 Registered Seal</span>
                  </div>
                </div>

                {/* Fast-Track CTA Button */}
                <button
                  type="button"
                  onClick={() => {
                    const formElement = document.getElementById('application-form');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FDB813] to-amber-400 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-lg transition-all cursor-pointer group"
                >
                  <span>Begin Fellowship Application</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Dual Tracks Explainer (Ground vs Remote Research) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Track 1: Ground Seva (Jaipur) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm relative overflow-hidden text-left hover:shadow-md transition-shadow">
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
              Assigned to fellows living in or near Jaipur. Directly participate in morning rounds at RUHS State Cancer Institute & SMS Hospital serving fresh green tender coconuts and 100% cold-pressed taaza anaar juice bedside to chemotherapy warriors, plus Sunday slum education cells.
            </p>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
              <span>✓ Direct Bedside Experience</span>
              <span>•</span>
              <span>✓ Ground Leadership Certificate</span>
            </div>
          </div>

          {/* Track 2: Strategic Research Files (Pan-India / Outstation) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm relative overflow-hidden text-left hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Track B • Pan-India Outstation Fellows
              </span>
              <span className="text-xs font-semibold text-neutral-400">Policy & Research Dossiers</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mt-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" />
              <span>Maternal & Child Nutrition Policy Dossiers</span>
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
              Assigned to fellows residing outside Jaipur across all 28 States & UTs. Author structured policy research files on core questions: <em>"What supplementary clinical nutrition can be provided to pregnant women in slum settlements beyond coconut water?"</em> and submit detailed project dossiers.
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
      <div id="application-form" className="max-w-7xl mx-auto w-full px-3 sm:px-6 scroll-mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-neutral-300 shadow-xl">
          
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
                  Our selection board is reviewing state representation and candidate profiles. Shortlisted fellows will receive their <strong>Official Selection Letter, Assigned Fellowship Track & Project Dossier</strong> directly on your registered email:
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
            /* Spacious Professional Application Form (Clean, Modern, No Fake Names) */
            <div className="max-w-4xl mx-auto space-y-8 text-left">
              
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#084c36] font-mono font-bold text-xs px-3 py-1 rounded-full border border-emerald-200 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                  <span>National Enrolment Form • Winter 2026 Admissions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  Fellowship Enrolment Application
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Please provide accurate academic, geographic and analytical responses. Official offer dockets will be communicated strictly via Email.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* SECTION 1: Personal & Contact Information (Email Centric, No Clutter) */}
                <div className="space-y-4 bg-[#faf8f5] p-5 sm:p-7 rounded-3xl border border-neutral-200">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 font-mono">
                      <span>1. Applicant Identity & Direct Email Dispatch</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 font-semibold">Verified Admissions</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Legal Name */}
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
                          placeholder="Enter your full legal name as per government records"
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Official Email */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Official Email Address * <span className="text-[10px] font-normal text-emerald-800">(All selection letters dispatched here)</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all font-mono shadow-2xs"
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

                {/* SECTION 2: Geographic & Educational Credentials */}
                <div className="space-y-4 bg-[#faf8f5] p-5 sm:p-7 rounded-3xl border border-neutral-200">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 font-mono">
                      <span>2. Geographic & Educational Credentials</span>
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
                        Current City / District of Residence *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter your current city or district name"
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

                    {/* Academic Discipline / Field of Study */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Academic Stream / Field of Study *
                      </label>
                      <select
                        value={academicDiscipline}
                        onChange={(e) => setAcademicDiscipline(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl px-3.5 py-3 text-neutral-900 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                      >
                        {ACADEMIC_DISCIPLINE_OPTIONS.map((d) => (
                          <option key={d} value={d}>
                            {d}
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
                        placeholder="Enter your current institution, university or college name"
                        className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl pl-10 pr-3.5 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Social Impact Orientation & Track Selection */}
                <div className="space-y-4 bg-[#faf8f5] p-5 sm:p-7 rounded-3xl border border-neutral-200">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 font-mono">
                      <span>3. Social Impact Orientation & Track Matching</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 font-semibold">Leadership Fit</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Prior Community Experience */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Prior Volunteering / Student Body Experience *
                      </label>
                      <select
                        value={priorExperience}
                        onChange={(e) => setPriorExperience(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl px-3.5 py-3 text-neutral-900 focus:border-[#084c36] focus:outline-none transition-all shadow-2xs"
                      >
                        {PRIOR_EXPERIENCE_OPTIONS.map((exp) => (
                          <option key={exp} value={exp}>
                            {exp}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Fellowship Track */}
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        Preferred Fellowship Pillar & Focus *
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
                  </div>

                  {/* Core Skills Selector (Clickable Modern Interactive Pills) */}
                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                      Core Strengths You Bring to the Cohort <span className="text-[10px] font-normal text-neutral-500">(Select all that apply)</span>
                    </label>
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {AVAILABLE_SKILLS.map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-[#0d1627] text-white border-neutral-800 shadow-xs ring-1 ring-amber-400/40'
                                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#FDB813]" />}
                            <span>{skill}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* SECTION 4: Analytical Problem-Solving & Fellowship Statement */}
                <div className="space-y-4 bg-[#faf8f5] p-5 sm:p-7 rounded-3xl border border-neutral-200">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2 font-mono">
                      <span>4. Analytical Thinking & Personal Statement</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 font-semibold">Merit Evaluation</span>
                  </div>

                  {/* Analytical Problem-Solving Question */}
                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Analytical Prompt: Healthcare & Nutrition Access in Underserved Areas</span>
                    </label>
                    <p className="text-[11px] text-neutral-500 mb-1.5 leading-relaxed">
                      In your perspective, what is the biggest challenge faced by patient families in government hospitals or slum mothers, and how can structured non-profit relief create lasting dignity?
                    </p>
                    <textarea
                      rows={3}
                      value={analyticalResponse}
                      onChange={(e) => setAnalyticalResponse(e.target.value)}
                      placeholder="Share your structured thoughts or observations on grassroots healthcare, clinical nutrition, or slum development..."
                      className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl p-4 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-800 focus:outline-none transition-all resize-none shadow-2xs"
                    />
                  </div>

                  {/* Statement of Purpose */}
                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1">
                      Fellowship Motivation: Why do you wish to join Rise Up Help Initiative Foundation?
                    </label>
                    <textarea
                      rows={3}
                      value={whyJoin}
                      onChange={(e) => setWhyJoin(e.target.value)}
                      placeholder="Explain your goals, academic vision, and what you aim to achieve through this national fellowship..."
                      className="w-full text-xs sm:text-sm bg-white border border-neutral-300 rounded-2xl p-4 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-800 focus:outline-none transition-all resize-none shadow-2xs"
                    />
                  </div>
                </div>

                {/* Transparent Selection Guarantee Notice */}
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-5 flex items-start gap-3 text-xs text-neutral-700">
                  <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Merit-Based National Intake:</strong> Every application is assessed by the foundation's academic review panel. <strong>No registration fees or hidden charges are ever charged.</strong> Official selection letters, assigned fellowship guides & verification dockets will be dispatched strictly via Email to maintain corporate integrity.
                  </p>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#090f1d] via-[#131f36] to-[#090f1d] hover:brightness-115 text-white font-black text-sm sm:text-base py-4 rounded-full border-2 border-amber-400/40 hover:border-amber-400 transition-all shadow-xl active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
