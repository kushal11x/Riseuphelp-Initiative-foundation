import React, { useState } from 'react';
import { ArrowLeft, Users, CheckCircle2, Heart, Sparkles, Send } from 'lucide-react';
import { Footer } from '../components/Footer';
import type { VolunteerSubmission } from '../types';

interface VolunteerPageProps {
  onBackToHome: () => void;
  onOpenAdmin?: () => void;
  onSubmitVolunteer?: (volunteer: VolunteerSubmission) => void;
}

export const VolunteerPage: React.FC<VolunteerPageProps> = ({
  onBackToHome,
  onOpenAdmin,
  onSubmitVolunteer,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState('Hospital Bedside Coconut Seva (RUHS & SMS)');
  const [availability, setAvailability] = useState('Sundays & Ekadashi Mornings');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    if (!cleanName || !cleanPhone || cleanPhone.length < 10) return;

    const newVolunteer: VolunteerSubmission = {
      id: `vol-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      fullName: cleanName,
      phone: cleanPhone,
      email: email.trim() || undefined,
      track,
      availability,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    // 1. Save to local storage for instant persistence
    try {
      const stored = localStorage.getItem('ruh_volunteers_v1');
      const list: VolunteerSubmission[] = stored ? JSON.parse(stored) : [];
      list.unshift(newVolunteer);
      localStorage.setItem('ruh_volunteers_v1', JSON.stringify(list));
    } catch (err) {
      console.error('Failed to save volunteer to localStorage', err);
    }

    // 2. Post to server endpoint in background
    fetch('/api/submit-volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVolunteer),
    }).catch((err) => console.warn('Background server submit warning:', err));

    // 3. Inform parent App.tsx state
    if (onSubmitVolunteer) {
      onSubmitVolunteer(newVolunteer);
    }

    setSubmitted(true);
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

        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#084c36] font-bold text-xs px-3 py-1.5 rounded-full border border-emerald-200">
          <Users className="w-3.5 h-3.5" />
          <span>Frontline Changemaker Squad</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#084c36] to-[#042d20] text-white p-6 sm:p-12 shadow-xl border border-emerald-800/40 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#FDB813] text-neutral-950 font-mono font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              2,400+ Active Youth Volunteers
            </span>
            <h1 className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Be a Volunteer: Hold Hands Where It Matters Most
            </h1>
            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed">
              True service isn't done from behind a desk. Join our on-ground youth squad in Jaipur cutting fresh coconuts bedside at RUHS Cancer Hospital, mentoring slum children with digital tablets, and organizing emergency relief drives.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                📜 Official Section 8 Volunteer Certificate
              </span>
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                🏥 Hospital Bedside Seva Experience
              </span>
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                ⭐ Community Leadership Recognition
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form & Track Selection */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Highlights */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#084c36] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Choose Your Seva Track
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                Where Can You Make an Impact in Jaipur?
              </h2>

              <div className="space-y-3 pt-2">
                <div className="bg-[#faf8f5] p-4 rounded-2xl border border-neutral-200">
                  <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Hospital Bedside Oncology Seva</span>
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    Assist volunteers during morning rounds at RUHS State Cancer Hospital cutting fresh green coconuts and supporting cancer patient families.
                  </p>
                </div>

                <div className="bg-[#faf8f5] p-4 rounded-2xl border border-neutral-200">
                  <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#084c36]" />
                    <span>Weekend Slum Digital Mentorship</span>
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    Teach basic English, math, and digital tablet skills to underprivileged children across Jaipur slum communities.
                  </p>
                </div>

                <div className="bg-[#faf8f5] p-4 rounded-2xl border border-neutral-200">
                  <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FDB813]" />
                    <span>Media, Photography & Operations</span>
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    Capture verified on-ground distribution photo receipts and manage direct transparency telemetry.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Application Form */}
            <div className="lg:col-span-6 bg-[#faf8f5] p-6 sm:p-8 rounded-3xl border border-neutral-300/80">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#084c36] flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    Application Received, {fullName}!
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                    Our Jaipur volunteer coordinator will contact you via WhatsApp (+91 {phone}) with the next hospital seva schedule orientation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 bg-[#084c36] text-white text-xs font-bold px-6 py-2 rounded-xl"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    Volunteer Enrolment Form
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        10-Digit Mobile / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9828291119"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="rahul@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Preferred Seva Track
                    </label>
                    <select
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                    >
                      <option value="Hospital Weekend Coconut Seva (RUHS/SMS)">Hospital Bedside Coconut Seva (RUHS & SMS)</option>
                      <option value="Weekend Slum Digital & STEM Mentorship">Weekend Slum Digital & STEM Mentorship</option>
                      <option value="Emergency Relief & Rapid Distribution Squad">Emergency Relief & Rapid Distribution Squad</option>
                      <option value="Media, Photography & Transparency Dispatch">Media, Photography & Transparency Dispatch</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">
                      Your Availability
                    </label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                    >
                      <option value="Sundays & Ekadashi Mornings">Sundays & Ekadashi Mornings (3-4 Hours)</option>
                      <option value="Weekend Afternoons (Saturday/Sunday)">Weekend Afternoons (Saturday/Sunday)</option>
                      <option value="Full-Time Active Intern (Weekdays)">Full-Time Active Intern (Weekdays)</option>
                      <option value="On-Call Emergency Squad">On-Call Emergency Squad</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Volunteer Application</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />
    </div>
  );
};
