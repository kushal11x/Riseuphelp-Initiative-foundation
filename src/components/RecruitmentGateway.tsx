import React, { useState } from 'react';
import { Users, Briefcase, HeartHandshake, Send, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RecruitmentGateway: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'career'>('volunteer');

  // Path A: Volunteer Form State
  const [volName, setVolName] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volTrack, setVolTrack] = useState('Hospital Nutrition (RUHS & SMS)');
  const [volAvailability, setVolAvailability] = useState('Weekends & Ekadashi');
  const [volSuccess, setVolSuccess] = useState(false);
  const [volSubmitting, setVolSubmitting] = useState(false);

  // Path B: Career Form State
  const [carName, setCarName] = useState('');
  const [carPhone, setCarPhone] = useState('');
  const [carRole, setCarRole] = useState('Community Operations & Field Lead');
  const [carResumeLink, setCarResumeLink] = useState('');
  const [carSuccess, setCarSuccess] = useState(false);
  const [carSubmitting, setCarSubmitting] = useState(false);
  const [mockInterviewDate, setMockInterviewDate] = useState('');

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName || volPhone.length < 10) return;
    setVolSubmitting(true);
    setTimeout(() => {
      setVolSubmitting(false);
      setVolSuccess(true);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#084c36', '#FDB813'],
        });
      } catch (err) {
        console.log(err);
      }
    }, 700);
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carName || carPhone.length < 10) return;
    setCarSubmitting(true);
    
    // Generate mock interview schedule date (3 days from now)
    const interviewDate = new Date();
    interviewDate.setDate(interviewDate.getDate() + 3);
    const dateStr = interviewDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
    setMockInterviewDate(dateStr);

    setTimeout(() => {
      setCarSubmitting(false);
      setCarSuccess(true);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#0e6245', '#FDB813', '#3b82f6'],
        });
      } catch (err) {
        console.log(err);
      }
    }, 800);
  };

  return (
    <section id="recruitment" className="py-12 sm:py-20 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-[#FDB813]/15 text-[#084c36] font-semibold text-xs rounded-full px-3.5 py-1 mb-3 border border-[#FDB813]/30">
          <span>JOIN THE MOVEMENT • JAIPUR & PAN-RAJASTHAN</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 tracking-tight">
          Be a Changemaker. <br className="hidden sm:inline" />
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }} className="text-[#084c36]">
            Join Team RiseUpHelp
          </span>
        </h2>
        <p className="mt-3.5 text-sm sm:text-base text-neutral-600">
          Whether you want to serve directly on hospital floors or build scalable NGO operations, our multi-track recruitment portal connects your energy to real human transformation.
        </p>

        {/* Tab Switcher */}
        <div className="mt-6 inline-flex p-1.5 bg-neutral-200/80 backdrop-blur-md rounded-2xl border border-neutral-300">
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'volunteer'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Users className="w-4 h-4 text-[#084c36]" />
            <span>Path A: Ground Volunteering Hub</span>
          </button>
          <button
            onClick={() => setActiveTab('career')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'career'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#FDB813]" />
            <span>Path B: Corporate Recruitment Cell</span>
          </button>
        </div>
      </div>

      {/* Two-Path Cards / Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Information & Ethos Column */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#084c36] to-[#033826] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FDB813]/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              {activeTab === 'volunteer' ? (
                <HeartHandshake className="w-6 h-6 text-[#FDB813]" />
              ) : (
                <Briefcase className="w-6 h-6 text-[#FDB813]" />
              )}
            </div>

            <span className="text-xs uppercase tracking-widest text-[#FDB813] font-semibold">
              {activeTab === 'volunteer' ? 'Frontline Impact Cell' : 'Corporate Governance'}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold mt-2 leading-tight">
              {activeTab === 'volunteer'
                ? 'Stand beside patients & girl students when it matters most.'
                : 'Engineer high-transparency social welfare infrastructure.'}
            </h3>

            <p className="text-xs sm:text-sm text-emerald-100/90 mt-4 leading-relaxed">
              {activeTab === 'volunteer'
                ? 'Join our weekend Ekadashi coconut distributions at RUHS Cancer Hospital or lead educational kits distribution in Jaipur municipal schools.'
                : 'We are expanding our core Section 8 management cell across partnerships, supply-chain verification, community outreach, and donor relations.'}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-[#FDB813] flex-shrink-0" />
                <span className="text-xs text-white">
                  {activeTab === 'volunteer' ? 'Certificate of Social Impact & LOR' : 'Competitive NGO Stipend & Full-time Roles'}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-[#FDB813] flex-shrink-0" />
                <span className="text-xs text-white">
                  {activeTab === 'volunteer' ? 'Verified Jaipur on-ground relief badges' : 'Instant WhatsApp Interview Notification Alerts'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/15 text-[11px] text-emerald-200/80 flex items-center justify-between relative z-10">
            <span>RiseUpHelp Foundation</span>
            <span>Jaipur Headquarters</span>
          </div>
        </div>

        {/* Right Form Interactive Block */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200 relative">
          {/* Path A: Volunteer Form */}
          {activeTab === 'volunteer' && (
            <div>
              {volSuccess ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#084c36] flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">
                    Welcome to the Circle, {volName}!
                  </h4>
                  <p className="text-sm text-neutral-600 mt-2 max-w-md">
                    Your volunteer profile for <strong>{volTrack}</strong> has been logged to the Jaipur On-Ground Coordinator queue.
                  </p>

                  <div className="mt-5 w-full bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-left text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold mb-2">
                      <MessageSquare className="w-4 h-4 text-emerald-700" />
                      <span>WhatsApp Volunteer Group Invite</span>
                    </div>
                    <p className="text-neutral-600 text-xs">
                      We have dispatched an automated onboarding link to <strong>+91 {volPhone}</strong>. You will receive the location pin for our upcoming hospital drive.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setVolSuccess(false);
                      setVolName('');
                      setVolPhone('');
                    }}
                    className="mt-6 bg-[#084c36] text-white text-xs font-semibold py-2.5 px-6 rounded-xl hover:bg-[#063b2a] transition-all cursor-pointer"
                  >
                    Register Another Volunteer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#084c36]" />
                    <h4 className="font-bold text-neutral-900 text-base">
                      Ground Activity Volunteer Registration
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sharma"
                        value={volName}
                        onChange={(e) => setVolName(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        WhatsApp Phone Number *
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs font-medium text-neutral-400">+91</span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="9828291119"
                          value={volPhone}
                          onChange={(e) => setVolPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-3 py-2.5 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        Preferred Relief Track
                      </label>
                      <select
                        value={volTrack}
                        onChange={(e) => setVolTrack(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                      >
                        <option value="Hospital Nutrition (RUHS & SMS)">Hospital Nutrition (RUHS & SMS)</option>
                        <option value="Slum Girls Education & School Bags">Girls Education & School Bag Drive</option>
                        <option value="Women Livelihood Skill Cells">Women Livelihood Skill Cells</option>
                        <option value="Emergency Relief Coordination">Emergency Relief Coordination</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        Availability
                      </label>
                      <select
                        value={volAvailability}
                        onChange={(e) => setVolAvailability(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                      >
                        <option value="Weekends & Ekadashi">Weekends & Ekadashi Mornings</option>
                        <option value="Daily 2 Hours">Daily 2 Hours</option>
                        <option value="On-Call Emergency">On-Call Emergency Drives</option>
                        <option value="Virtual / Digital Support">Virtual / Digital Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={volSubmitting}
                      className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      {volSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Registering Ground Volunteer...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Volunteer Registration</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Path B: Corporate Career Form */}
          {activeTab === 'career' && (
            <div>
              {carSuccess ? (
                <div className="py-6 text-center flex flex-col items-center animate-in fade-in duration-200">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8 text-[#084c36]" />
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">
                    Application Logged Successfully!
                  </h4>
                  <p className="text-sm text-neutral-600 mt-2 max-w-md">
                    Candidate: <strong className="text-neutral-900">{carName}</strong> for <strong className="text-[#084c36]">{carRole}</strong>.
                  </p>

                  <div className="mt-5 w-full bg-gradient-to-r from-emerald-50 to-amber-50 rounded-2xl p-5 border border-emerald-200 text-left shadow-sm">
                    <div className="flex items-center gap-2 text-[#084c36] font-bold text-xs sm:text-sm mb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#084c36] animate-ping" />
                      <span>Automated WhatsApp Interview Alert Dispatched</span>
                    </div>

                    <div className="bg-white/90 rounded-xl p-3 border border-emerald-100 text-xs text-neutral-800 flex flex-col gap-1.5">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Applicant:</span>
                        <span className="font-semibold">{carName} (+91 {carPhone})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Scheduled Mock Interview:</span>
                        <span className="font-bold text-[#084c36]">{mockInterviewDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Location / Mode:</span>
                        <span className="font-medium">Google Meet & Jaipur Office</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-500 mt-2.5">
                      A calendar invite and interview briefing document have been automatically sent to your WhatsApp number.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCarSuccess(false);
                      setCarName('');
                      setCarPhone('');
                    }}
                    className="mt-6 bg-[#084c36] text-white text-xs font-semibold py-2.5 px-6 rounded-xl hover:bg-[#063b2a] transition-all cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB813]" />
                    <h4 className="font-bold text-neutral-900 text-base">
                      Corporate Career Recruitment Registry
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Vikramaditya Rathore"
                        value={carName}
                        onChange={(e) => setCarName(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        WhatsApp Contact Line *
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs font-medium text-neutral-400">+91</span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="9828291119"
                          value={carPhone}
                          onChange={(e) => setCarPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-3 py-2.5 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        Target Role Domain
                      </label>
                      <select
                        value={carRole}
                        onChange={(e) => setCarRole(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                      >
                        <option value="Community Operations & Field Lead">Community Operations & Field Lead</option>
                        <option value="Hospital Relations & Medical Sourcing">Hospital Relations & Medical Sourcing</option>
                        <option value="Corporate CSR Partnerships Manager">Corporate CSR Partnerships Manager</option>
                        <option value="Digital Media & Transparency Auditor">Digital Media & Transparency Auditor</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        Resume / Portfolio Link *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://linkedin.com/in/... or Drive link"
                        value={carResumeLink}
                        onChange={(e) => setCarResumeLink(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                    <span>
                      Applicants receive an immediate mock interview schedule notification dispatched directly to their WhatsApp device number.
                    </span>
                  </div>

                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={carSubmitting}
                      className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      {carSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Application & Interview Slot...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application & Schedule Interview</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
