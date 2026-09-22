import React from 'react';
import { ArrowLeft, Flame } from 'lucide-react';
import { SevaCalendarSchedule } from '../components/SevaCalendarSchedule';
import { Footer } from '../components/Footer';
import type { SevaScheduleEvent, DriveItem, HospitalNode } from '../types';
import { PARTNER_HOSPITALS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();

  const handleSelectScheduleSlot = (event: SevaScheduleEvent, _customDate?: string) => {
    const isAnaar = event.title.toLowerCase().includes('anaar') || (event.sevaItems && event.sevaItems.some(i => i.toLowerCase().includes('anaar')));
    const price = event.pricePerUnit || (isAnaar ? 70 : 65);
    const unitLabel = event.unitLabel || (isAnaar ? 'Anaar Juice Glass' : 'Fresh Coconut');

    const scheduleDriveItem: DriveItem = {
      id: `slot-${event.id}`,
      name: `${event.title} (${event.tithi})`,
      tagline: `${event.date} • ${event.hospital}`,
      category: 'hospital',
      price: price,
      unitLabel: unitLabel,
      targetCount: `${event.targetCoconuts} ${unitLabel}s`,
      deliveredCount: `${event.sponsoredCoconuts} Sponsored`,
      percentage: 90,
      color: isAnaar ? '#b91c1c' : '#084c36',
      badge: 'Ekadashi Seva Slot',
      image: event.image || (isAnaar ? '/uploads/jaljhulani_anar_juice_nariyal_seva.jpg' : '/uploads/nariyal_pani_fresh_coconut.jpg'),
      description: event.description,
      impactMetrics: `Direct bedside delivery on ${event.date} at ${event.hospital}`,
      options: {
        primary: `${unitLabel} (₹${price})`,
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
          <span>{t.ekadashiBack}</span>
        </button>

        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#084c36] font-bold text-xs px-3 py-1.5 rounded-full border border-emerald-200">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{t.ekadashiVowBadge}</span>
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
                {t.ekadashiRegistryBadge}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {t.ekadashiHeroTitle}
              </h1>
              <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed">
                {t.ekadashiHeroDesc}
              </p>

              {/* Fast Summary Badges */}
              <div className="pt-1 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                  {t.ekadashiBadge1}
                </span>
                <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                  {t.ekadashiBadge2}
                </span>
                <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                  {t.ekadashiBadge3}
                </span>
              </div>

              {/* Quick Sponsor CTA */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const activeToday = scheduleEvents.find((e) => e.status === 'active_today');
                    const isAnaar = activeToday?.title.toLowerCase().includes('anaar') || (activeToday?.sevaItems && activeToday.sevaItems.some(i => i.toLowerCase().includes('anaar')));
                    const liveDriveItem: DriveItem = {
                      id: activeToday?.id || 'anaar-juice',
                      name: activeToday?.title || 'Pure Cold-Pressed Anaar Juice (RUHS Bedside)',
                      tagline: `${activeToday?.date || 'Sep 22, 2026'} • ${activeToday?.hospital || 'State Cancer Hospital (RUHS)'}`,
                      category: 'hospital',
                      price: activeToday?.pricePerUnit || 70,
                      unitLabel: activeToday?.unitLabel || 'Anaar Juice Glass',
                      targetCount: `${activeToday?.targetCoconuts || 3000} Glasses`,
                      deliveredCount: `${activeToday?.sponsoredCoconuts || 480} Sponsored`,
                      percentage: 91,
                      color: isAnaar ? '#b91c1c' : '#084c36',
                      badge: '100% Pure Fresh Juice',
                      image: activeToday?.image || '/uploads/jaljhulani_anar_juice_nariyal_seva.jpg',
                      description: activeToday?.description || 'Pure cold-pressed pomegranate (taaza anaar) juice served bedside in clean glasses for cancer chemotherapy patients across RUHS wards.',
                      impactMetrics: 'Restores essential hemoglobin, platelets, and vitamins during intensive oncology treatments.',
                      options: {
                        primary: `${activeToday?.unitLabel || 'Anaar Juice Glass'} (₹${activeToday?.pricePerUnit || 70})`,
                        secondary: 'Immunity Pack',
                      },
                      status: 'active',
                    };
                    onOpenSponsorModal(liveDriveItem, { name: '', phone: '', quantity: 20 });
                  }}
                  className="bg-[#FDB813] hover:bg-amber-400 text-neutral-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{t.ekadashiSponsorBtn} (₹70/Glass)</span>
                </button>
              </div>
            </div>

            {/* Right Photo Column: Dual Authentic Seva Photos */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              {/* Photo 1: Authentic Jaljhulani Ekadashi Anaar Juice & Nariyal Seva */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/25 shadow-2xl group bg-neutral-950 aspect-4/3 sm:aspect-auto sm:h-56 lg:h-64">
                <img
                  src="/uploads/jaljhulani_anar_juice_nariyal_seva.jpg"
                  alt="Rise Up Help Foundation Jaljhulani Ekadashi Taaza Anaar Juice & Nariyal Pani Seva"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-red-400/40 shadow-xs flex items-center gap-1">
                  <span>🍷 Taaza Anaar Juice + 🥥 Nariyal Pani Seva</span>
                </div>
                <div className="absolute bottom-2.5 inset-x-2.5 text-left">
                  <div className="text-white font-extrabold text-xs sm:text-sm leading-snug drop-shadow-xs">
                    "निःशुल्क सेवा: ताज़ा अनार का जूस और नारियल पानी"
                  </div>
                  <div className="text-[11px] text-emerald-200 mt-0.5 leading-tight drop-shadow-2xs">
                    Special Jaljhulani Ekadashi bedside delivery for chemotherapy cancer patients at RUHS Jaipur
                  </div>
                </div>
              </div>

              {/* Photo 2: Authentic RUHS Hospital Seva Trolley */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg group bg-black/40 backdrop-blur-md flex items-center gap-3.5 p-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-400/40 shadow-xs bg-neutral-900">
                  <img
                    src="/uploads/ruhs_hospital_nariyal_seva_trolley.jpg"
                    alt="RUHS Hospital Bedside Seva Trolley"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="inline-block bg-emerald-400/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase">
                    🏥 RUHS Bedside Trolley
                  </div>
                  <div className="text-white font-bold text-xs sm:text-sm mt-1 leading-snug">
                    Pure Sourced & Bedside Cut
                  </div>
                  <div className="text-[11px] text-emerald-100/80 mt-0.5 leading-tight">
                    Whole tender coconuts and freshly pressed juices served bedside with sterile eco-straws.
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
