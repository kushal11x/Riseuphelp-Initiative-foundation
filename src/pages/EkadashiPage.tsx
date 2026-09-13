import React from 'react';
import { ArrowLeft, Flame } from 'lucide-react';
import { SevaCalendarSchedule } from '../components/SevaCalendarSchedule';
import { Footer } from '../components/Footer';
import type { SevaScheduleEvent, DriveItem, HospitalNode } from '../types';
import { PARTNER_HOSPITALS } from '../data/mockData';

interface EkadashiPageProps {
  onBackToHome: () => void;
  scheduleEvents: SevaScheduleEvent[];
  hospitals?: HospitalNode[];
  onOpenSponsorModal: (
    item?: DriveItem,
    initialData?: { name: string; phone: string; quantity: number }
  ) => void;
  onOpenAdmin?: () => void;
}

export const EkadashiPage: React.FC<EkadashiPageProps> = ({
  onBackToHome,
  scheduleEvents,
  hospitals = PARTNER_HOSPITALS,
  onOpenSponsorModal,
  onOpenAdmin,
}) => {
  const handleSelectScheduleSlot = (event: SevaScheduleEvent, _customDate?: string) => {
    const scheduleDriveItem: DriveItem = {
      id: `slot-${event.id}`,
      name: `${event.title} (${event.tithi})`,
      tagline: `${event.date} • ${event.hospital}`,
      category: 'hospital',
      price: 65,
      unitLabel: 'Fresh Coconut',
      targetCount: `${event.targetCoconuts} Coconuts`,
      deliveredCount: `${event.sponsoredCoconuts} Sponsored`,
      percentage: 90,
      color: '#084c36',
      badge: 'Ekadashi Seva Slot',
      description: event.description,
      impactMetrics: `Direct bedside delivery on ${event.date} at ${event.hospital}`,
      options: {
        primary: 'Fresh Coconut',
        secondary: 'Immunity Pack',
      },
    };
    onOpenSponsorModal(scheduleDriveItem, {
      name: '',
      phone: '',
      quantity: 20,
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

        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#084c36] font-bold text-xs px-3 py-1.5 rounded-full border border-emerald-200">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Har Ekadashi Bedside Seva Vow</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#084c36] to-[#042d20] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-800/40 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="bg-[#FDB813] text-neutral-950 font-mono font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Official Hospital Seva Registry
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Har Ekadashi State Cancer Hospital (RUHS) Nariyal Pani Seva
              </h1>
              <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed">
                Every Ekadashi without interruption, our seva volunteers procure farm-fresh green tender coconuts, transport them on-ground to State Cancer Medical College (RUHS) and SMS Hospitals, and cut them open live bedside for admitted cancer patients undergoing chemotherapy.
              </p>

              {/* Fast Summary Badges */}
              <div className="pt-1 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                  🥥 389,000+ Sourced & Cut Bedside
                </span>
                <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                  🏥 RUHS & SMS Cancer Hospital Wards
                </span>
                <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                  ⭐ 50% Tax Exemption (80G)
                </span>
              </div>

              {/* Quick Sponsor CTA */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const coconutDriveItem: DriveItem = {
                      id: 'coconut-water',
                      name: 'Fresh Whole Tender Coconut (RUHS Bedside)',
                      tagline: 'Every Ekadashi Vow • Government Cancer Hospital (RUHS)',
                      category: 'hospital',
                      price: 65,
                      unitLabel: 'Fresh Coconut',
                      targetCount: '215K Target',
                      deliveredCount: '194.7K Delivered',
                      percentage: 91,
                      color: '#084c36',
                      badge: '100% Direct Sourced',
                      image: '/uploads/nariyal_pani_fresh_coconut.jpg',
                      description: 'Whole green tender coconuts cut and opened fresh in front of cancer patients at State Cancer Medical College (RUHS) with sterile eco-straws.',
                      impactMetrics: '194,700+ fresh coconuts cut bedside for patients battling chemotherapy and trauma recovery.',
                      options: {
                        primary: 'Fresh Coconut',
                        secondary: 'Immunity Packs',
                      },
                      status: 'active',
                    };
                    onOpenSponsorModal(coconutDriveItem, { name: '', phone: '', quantity: 20 });
                  }}
                  className="bg-[#FDB813] hover:bg-amber-400 text-neutral-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>🥥 Sponsor Bedside Coconuts (₹65/pc)</span>
                </button>
              </div>
            </div>

            {/* Right Photo Column: Dual Authentic Seva Photos */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              {/* Photo 1: Authentic RUHS Hospital Seva Trolley */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/25 shadow-2xl group bg-neutral-950 aspect-4/3 sm:aspect-auto sm:h-56 lg:h-64">
                <img
                  src="/uploads/ruhs_hospital_nariyal_seva_trolley.jpg"
                  alt="Rise Up Help Foundation RUHS Hospital Nariyal Pani Seva Trolley"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 bg-[#084c36]/90 backdrop-blur-md text-[#FDB813] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-400/40 shadow-xs">
                  🏥 RUHS Hospital Bedside Trolley
                </div>
                <div className="absolute bottom-2.5 inset-x-2.5 text-left">
                  <div className="text-white font-extrabold text-xs sm:text-sm leading-snug drop-shadow-xs">
                    "Small Steps, Big Changes!"
                  </div>
                  <div className="text-[11px] text-emerald-200 mt-0.5 leading-tight drop-shadow-2xs">
                    Fresh coconut sacks loaded on seva trolley at State Cancer Hospital (RUHS), Jaipur
                  </div>
                </div>
              </div>

              {/* Photo 2: Fresh Whole Tender Coconut Cut Bedside */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg group bg-black/40 backdrop-blur-md flex items-center gap-3.5 p-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-400/40 shadow-xs bg-neutral-900">
                  <img
                    src="/uploads/nariyal_pani_fresh_coconut.jpg"
                    alt="Fresh Green Tender Coconut with Straw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="inline-block bg-emerald-400/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase">
                    🥥 100% Pure Tender Coconut
                  </div>
                  <div className="text-white font-bold text-xs sm:text-sm mt-1 leading-snug">
                    Cut Live in Front of Patients
                  </div>
                  <div className="text-[11px] text-emerald-100/80 mt-0.5 leading-tight">
                    Served with sterile eco-straws for chemotherapy hydration & nausea relief.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Seva Calendar Schedule Container */}
      <div className="w-full matte-gradient-canvas rounded-2xl sm:rounded-3xl border border-neutral-300/80 shadow-sm relative overflow-hidden max-w-7xl mx-auto">
        <SevaCalendarSchedule
          scheduleEvents={scheduleEvents}
          hospitals={hospitals}
          onSelectScheduleSlot={handleSelectScheduleSlot}
          onSponsorItem={(item, init) => onOpenSponsorModal(item, init)}
        />
      </div>

      {/* Bedside Protocol & Hygienic Assurance Card */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-3xl font-bold text-neutral-900">
              Our 4-Step Bedside Seva Protocol
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Ensuring 100% unadulterated clinical hygiene and emotional comfort for chemotherapy patients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#fcfbf9] rounded-2xl p-4 border border-neutral-200">
              <span className="w-7 h-7 rounded-full bg-[#084c36] text-white flex items-center justify-center font-bold text-xs mb-3 font-mono">
                01
              </span>
              <h4 className="font-bold text-neutral-900 text-sm mb-1">Ethical Orchard Sourcing</h4>
              <p className="text-xs text-neutral-600">
                Fresh green whole tender coconuts harvested within 24 hours of hospital distribution.
              </p>
            </div>

            <div className="bg-[#fcfbf9] rounded-2xl p-4 border border-neutral-200">
              <span className="w-7 h-7 rounded-full bg-[#084c36] text-white flex items-center justify-center font-bold text-xs mb-3 font-mono">
                02
              </span>
              <h4 className="font-bold text-neutral-900 text-sm mb-1">On-Ground Transport</h4>
              <p className="text-xs text-neutral-600">
                Dispatched directly in sanitised volunteer vans to RUHS State Cancer College & SMS Hospital.
              </p>
            </div>

            <div className="bg-[#fcfbf9] rounded-2xl p-4 border border-neutral-200">
              <span className="w-7 h-7 rounded-full bg-[#084c36] text-white flex items-center justify-center font-bold text-xs mb-3 font-mono">
                03
              </span>
              <h4 className="font-bold text-neutral-900 text-sm mb-1">Live Bedside Cutting</h4>
              <p className="text-xs text-neutral-600">
                Cut and opened in front of patients to ensure zero adulteration and preserve natural electrolytes.
              </p>
            </div>

            <div className="bg-[#fcfbf9] rounded-2xl p-4 border border-neutral-200">
              <span className="w-7 h-7 rounded-full bg-[#084c36] text-white flex items-center justify-center font-bold text-xs mb-3 font-mono">
                04
              </span>
              <h4 className="font-bold text-neutral-900 text-sm mb-1">Verified Photo Receipt</h4>
              <p className="text-xs text-neutral-600">
                Distribution verification photos shared directly to donor via WhatsApp with 80G Certificate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />
    </div>
  );
};
