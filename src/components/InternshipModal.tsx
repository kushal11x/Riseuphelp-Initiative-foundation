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
} from 'lucide-react';
import type { InternshipSubmission } from '../types';

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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [institution, setInstitution] = useState('');
  const [course, setCourse] = useState('');
  const [whyJoin, setWhyJoin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InternshipSubmission | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim() || !institution.trim()) {
      return;
    }

    setIsSubmitting(true);

    const newSubmission: InternshipSubmission = {
      id: `int-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      institution: institution.trim(),
      course: course.trim() || 'Student',
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
    }, 400);
  };

  const handleResetAndClose = () => {
    setSubmittedData(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setCity('');
    setInstitution('');
    setCourse('');
    setWhyJoin('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-neutral-200 relative text-neutral-900 my-auto overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#03261a] via-[#084c36] to-[#021c13] text-white p-5 sm:p-7 relative overflow-hidden shrink-0">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                <span>Rise Up Youth Internship Cohort • 2026 Intake</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Social Leadership & Research Internship
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl leading-relaxed">
                Empowering college & school students through hands-on social impact, healthcare relief, and community development research.
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
            {submittedData ? (
              /* Success / Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6 sm:py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Application ID: {submittedData.id.toUpperCase()}
                  </span>
                  <h3 className="text-2xl font-extrabold text-neutral-900 pt-2">
                    Application Received Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-neutral-900">{submittedData.fullName}</span>. Your application has been logged into the Rise Up Help Initiative Foundation registry.
                  </p>
                </div>

                {/* What Happens Next Card */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 text-left max-w-lg mx-auto space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#084c36] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span>Next Selection Steps & Email Notification</span>
                  </h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Our scrutiny committee will review your profile and location ({submittedData.city}). Shortlisted candidates will receive their <strong>official Selection Letter & assigned Project Guidelines</strong> directly on your registered email:
                  </p>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-300/80 flex items-center gap-2 font-mono text-xs text-neutral-900">
                    <Mail className="w-4 h-4 text-[#084c36] shrink-0" />
                    <span className="truncate font-semibold">{submittedData.email}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 italic">
                    Please ensure you check your Inbox and Spam/Promotions folder over the next 48 to 72 hours.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleResetAndClose}
                    className="bg-[#084c36] hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Application Form View */
              <>
                {/* Core Benefits Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-neutral-200/90 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4 text-[#FDB813]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Official Certificate</h4>
                      <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                        Section 8 registered NGO credentials for college credits & CV.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-neutral-200/90 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#084c36] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-[#084c36]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Founder LOR</h4>
                      <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                        Letter of Recommendation for top performers (MBA & Abroad).
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-neutral-200/90 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-700 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">Ground & Research</h4>
                      <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                        Assigned by team based on your city & academic background.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all"
                      />
                    </div>

                    {/* Official Email */}
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Email Address * <span className="text-[10px] font-normal text-emerald-800">(For official selection letters)</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. priya.sharma@gmail.com"
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Contact Mobile Number *
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs font-semibold text-neutral-500 font-mono">+91</span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98282 91119"
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-12 pr-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all font-mono"
                        />
                      </div>
                    </div>

                    {/* City & State */}
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Current City & State * <span className="text-[10px] font-normal text-neutral-500">(To determine track)</span>
                      </label>
                      <div className="relative flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Jaipur, Rajasthan or Delhi, Mumbai"
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Institution */}
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        College / University / School Name *
                      </label>
                      <div className="relative flex items-center">
                        <Building2 className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g. University of Rajasthan / JECRC / DPS"
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Course & Year */}
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Course & Year / Class *
                      </label>
                      <div className="relative flex items-center">
                        <BookOpen className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          placeholder="e.g. BBA 2nd Year, B.Tech, Class 12, etc."
                          className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Statement of Purpose / Motivation */}
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      Why do you want to intern with Rise Up Help Initiative? <span className="text-[10px] font-normal text-neutral-500">(Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={whyJoin}
                      onChange={(e) => setWhyJoin(e.target.value)}
                      placeholder="Share your interests, e.g. hospital cancer relief, maternal & child nutrition research, slum education, or digital outreach..."
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36] focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Information Notice */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-neutral-600">
                    <ShieldCheck className="w-4 h-4 text-[#084c36] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Selection Process:</strong> Our team will review your application and city. Local candidates may be assigned on-ground hospital/slum drives, while outstation candidates will be assigned strategic research proposals (e.g. maternal nutrition & slum development). Official notifications will be sent directly to your registered email.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#03261a] via-[#084c36] to-[#03261a] hover:brightness-110 text-white font-bold text-xs sm:text-sm py-3.5 rounded-full transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#FDB813]" />
                          <span>Submit Internship Application</span>
                        </>
                      )}
                    </button>
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
