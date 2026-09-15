import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, Briefcase, ArrowUpRight, CheckCircle2, ShieldCheck, Mail, Globe, ExternalLink, X, Send } from 'lucide-react';
import { OFFICIAL_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface ClosingEcosystemProps {
  onOpenSponsorModal?: () => void;
}

export const ClosingEcosystem: React.FC<ClosingEcosystemProps> = () => {
  const { t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<'volunteer' | 'career' | null>(null);

  // Form states for modals
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [volunteerArea, setVolunteerArea] = useState('Hospital Nutrition Seva (RUHS / SMS)');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setActiveModal(null);
      setVolunteerName('');
      setVolunteerPhone('');
    }, 2200);
  };

  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Only decode & play video when user scrolls near this lower section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="recruitment"
      className="relative min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-300/80 shadow-lg flex flex-col justify-between p-5 sm:p-8 lg:p-12 select-none bg-neutral-950"
      style={{
        backgroundImage: 'url(/lower-bg-poster.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 1. Lower-Fold Video Background (Only decodes on GPU when scrolled into view) */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        disableRemotePlayback
        poster="/lower-bg-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 gpu-layer"
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <source src="/lower-bg.mp4" type="video/mp4" />
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
          type="video/mp4"
        />
      </video>

      {/* Top Header Row with Official Section 8 Identity */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Crest */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <img
            src="/logo.png"
            alt="RiseUpHelp Silhouette Mark"
            className="w-7 h-7 object-contain"
          />
          <span className="text-sm font-bold text-white tracking-tight">
            RiseUpHelp Initiative Foundation
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FDB813] animate-pulse" />
        </div>

        {/* Section 8 Verification Badge */}
        <div className="hidden sm:inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white/90">
          <ShieldCheck className="w-4 h-4 text-[#FDB813]" />
          <span>CIN: {OFFICIAL_INFO.cinNumber}</span>
          <span className="text-emerald-400 font-bold">• 80G Certified</span>
        </div>
      </div>

      {/* 2. Main Content Body (Pinned to Bottom on Desktop) */}
      <div className="relative z-10 mt-auto pt-12 sm:pt-16 pb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 sm:gap-10">
        
        {/* Left Column — Rigid Impact Headline & Email Subscription */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md text-[#FDB813] font-semibold text-xs rounded-full px-3.5 py-1 mb-3 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#FDB813]" />
            <span>{t.closingBadge}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 5.5vw, 52px)',
              lineHeight: 1.15,
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
            className="font-sans tracking-tight text-white drop-shadow-md text-balance"
          >
            {t.closingTitle}
          </h2>

          {/* Pristine White Email Subscription Input Row */}
          <div className="mt-6 sm:mt-8">
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 rounded-full px-5 py-3 text-xs sm:text-sm font-medium text-emerald-200 inline-flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FDB813]" />
                <span>Thank you! On-ground dispatch telemetry updates will reach your inbox.</span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:inline-flex sm:flex-row sm:items-center sm:rounded-full bg-white p-1.5 shadow-2xl gap-2 sm:gap-0 max-w-md w-full"
              >
                <div className="relative flex-1 flex items-center">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full rounded-full sm:rounded-none bg-transparent pl-10 pr-4 py-2.5 sm:py-2 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 outline-none font-medium"
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: 'linear-gradient(to bottom, #1e293b, #090d16)' }}
                  className="rounded-full px-6 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold text-white hover:opacity-90 transition-opacity cursor-pointer border border-white/10 shadow flex items-center justify-center gap-1.5"
                >
                  <span>Keep Me Updated</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Two High-Impact Glass Cards */}
        <div className="flex flex-col sm:flex-row lg:w-auto gap-4 sm:gap-5 w-full sm:w-auto">
          
          {/* Right Column Block A — Live Ground Stats Matrix */}
          <div className="liquid-glass rounded-2xl sm:w-64 p-5 sm:p-6 border border-white/25 shadow-2xl flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/15 text-[11px] font-mono text-white/80">
                <span>JAIPUR TELEMETRY</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Massive 89,741+ Metric */}
              <div className="mt-4 text-4xl md:text-5xl font-semibold text-white tracking-tight font-sans">
                89,741+
              </div>

              {/* Exact Niche Soft Caption */}
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/85">
                Total transparent lives supported across Jaipur slums and government healthcare networks.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-emerald-300">
              <span>Verified Direct Seva</span>
              <span>100% Non-Profit</span>
            </div>
          </div>

          {/* Right Column Block B — Multi-Path Registration Gateway ('Join RiseUp Team') */}
          <div className="liquid-glass rounded-2xl sm:w-80 p-5 sm:p-6 border border-white/25 shadow-2xl flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-white/15">
                <span className="text-xs uppercase font-bold tracking-wider text-[#FDB813]">
                  Join RiseUp Team
                </span>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                  Active Intake
                </span>
              </div>

              {/* Multi-Path Action Navigation Blocks */}
              <div className="mt-3 space-y-2.5">
                
                {/* Path 1: Frontline Volunteering Hub */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('volunteer');
                    setVolunteerArea('Hospital Nutrition Seva (RUHS / SMS)');
                  }}
                  className="w-full bg-white/15 hover:bg-white/25 p-3 rounded-xl border border-white/20 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs sm:text-sm text-white flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-[#FDB813]" />
                      <span>Frontline Volunteering Hub</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-white/75 mt-1 leading-snug">
                    Assist hospital fresh coconut distributions & slum girl education cells.
                  </p>
                </button>

                {/* Path 2: Career Recruitment Cell */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('career');
                    setVolunteerArea('Full-Time / Part-Time Core NGO Operations');
                  }}
                  className="w-full bg-white/15 hover:bg-white/25 p-3 rounded-xl border border-white/20 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs sm:text-sm text-white flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Career Recruitment Cell</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-white/75 mt-1 leading-snug">
                    Formal registry for program managers, ground coordinators & data auditors.
                  </p>
                </button>

              </div>
            </div>

            {/* WhatsApp Webhook Notification Indicator */}
            <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center gap-1.5 text-[10px] text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Automated interview notifications pushed directly to WhatsApp.</span>
            </div>
          </div>

        </div>

      </div>

      {/* 5. Elegant Bottom Footer Index (The Thank You Gateway) */}
      <div className="relative z-10 pt-4 mt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/90">
        {/* Left side: Official communication line & live core domain */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-center sm:text-left">
          <a
            href="mailto:support@riseuphelp.org"
            className="hover:text-white transition-colors underline font-medium"
          >
            support@riseuphelp.org
          </a>
          <span className="text-white/40">|</span>
          <a
            href="https://www.riseuphelp.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>www.riseuphelp.org</span>
          </a>
        </div>

        {/* Right side: High-contrast link pointing to official Instagram community */}
        <div className="flex items-center gap-2">
          <a
            href="https://instagram.com/riseuphelp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 text-white px-3.5 py-1 rounded-full border border-white/30 transition-all font-semibold inline-flex items-center gap-1.5"
          >
            <span>@riseuphelp</span>
            <ExternalLink className="w-3 h-3 text-[#FDB813]" />
          </a>
        </div>
      </div>

      {/* Interactive Registration Modal for Volunteering / Career */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 relative text-neutral-900"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Application Received!</h3>
                  <p className="text-xs text-neutral-600 mt-2">
                    Our Jaipur ground operations team will dispatch automated WhatsApp interview details to +91 {volunteerPhone}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-md mb-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{activeModal === 'volunteer' ? 'Frontline Volunteer Cell' : 'Career Recruitment Registry'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-950">
                      {activeModal === 'volunteer' ? 'Join As A Ground Volunteer' : 'Apply For RiseUp Careers'}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Empowering Jaipur through 100% transparent ground relief.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditi Sharma"
                      value={volunteerName}
                      onChange={(e) => setVolunteerName(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs font-medium text-neutral-400">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9828291119"
                        value={volunteerPhone}
                        onChange={(e) => setVolunteerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-3 py-2 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Preferred Seva / Role Track
                    </label>
                    <select
                      value={volunteerArea}
                      onChange={(e) => setVolunteerArea(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                    >
                      <option value="Hospital Nutrition Seva (RUHS / SMS)">Hospital Bedside Coconut & Meals (RUHS / SMS)</option>
                      <option value="Chhoti Chaupar Slum Education Cell">Chhoti Chaupar Slum Education Cell</option>
                      <option value="Full-Time / Part-Time Core NGO Operations">Full-Time / Part-Time Core Operations</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white py-2.5 rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit & Receive WhatsApp Confirmation</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
