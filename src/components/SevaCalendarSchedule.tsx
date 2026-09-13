import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Heart,
  Building2,
  CalendarCheck,
  Flame,
} from 'lucide-react';
import type { SevaScheduleEvent, DriveItem, HospitalNode } from '../types';
import { INITIAL_SEVA_SCHEDULE, PARTNER_HOSPITALS, DRIVE_ITEMS } from '../data/mockData';

interface SevaCalendarScheduleProps {
  scheduleEvents?: SevaScheduleEvent[];
  hospitals?: HospitalNode[];
  onSelectScheduleSlot?: (event: SevaScheduleEvent, customDate?: string) => void;
  onSponsorItem?: (item: DriveItem, initialData?: { name: string; phone: string; quantity: number; date?: string }) => void;
}

export const SevaCalendarSchedule: React.FC<SevaCalendarScheduleProps> = ({
  scheduleEvents = INITIAL_SEVA_SCHEDULE,
  hospitals = PARTNER_HOSPITALS,
  onSelectScheduleSlot,
  onSponsorItem,
}) => {
  const [selectedCustomDate, setSelectedCustomDate] = useState<string>('');
  const [customOccasion, setCustomOccasion] = useState<string>('In Memory of Beloved / Birthday');

  const todayLiveEvent = scheduleEvents.find((e) => e.status === 'active_today') || scheduleEvents[0];
  const upcomingEvents = scheduleEvents.filter((e) => e.id !== todayLiveEvent?.id);

  const handleBookSlot = (event: SevaScheduleEvent) => {
    if (onSelectScheduleSlot) {
      onSelectScheduleSlot(event);
    } else if (onSponsorItem) {
      onSponsorItem(DRIVE_ITEMS[0], {
        name: '',
        phone: '',
        quantity: 20,
      });
    }
  };

  const handleBookCustomDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomDate) {
      alert('Please select a date from the calendar');
      return;
    }
    const customEvent: SevaScheduleEvent = {
      id: `custom-date-${selectedCustomDate}`,
      title: `Special Dedicated Seva (${customOccasion})`,
      tithi: customOccasion,
      date: selectedCustomDate,
      hospital: 'State Cancer Medical College (RUHS), Jaipur',
      targetCoconuts: 100,
      sponsoredCoconuts: 0,
      status: 'upcoming',
      description: `Special dedicated bedside fresh coconut seva organized on your chosen date (${selectedCustomDate}) for cancer fighters at RUHS Hospital.`,
    };

    if (onSelectScheduleSlot) {
      onSelectScheduleSlot(customEvent, selectedCustomDate);
    } else if (onSponsorItem) {
      onSponsorItem(DRIVE_ITEMS[0], {
        name: '',
        phone: '',
        quantity: 20,
      });
    }
  };

  return (
    <section id="ekadashi-calendar" className="w-full py-10 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-[#084c36] font-bold text-xs px-3.5 py-1.5 rounded-full mb-3 border border-emerald-300/80 shadow-xs">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Har Ekadashi Vow & Dedicated Calendar</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight">
          Har Ekadashi State Cancer Hospital (RUHS) Nariyal Pani Seva
        </h2>
        <p className="text-xs sm:text-base text-neutral-600 mt-2.5 leading-relaxed">
          Every Ekadashi without fail, our volunteers reach the bedside of cancer fighters admitted in RUHS State Cancer Medical College and SMS Hospitals, cutting fresh green coconuts live to provide natural electrolyte recovery. Choose your Ekadashi or special date to sponsor.
        </p>

        {/* On-Ground Bedside Proof Photo Cards */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto text-left">
          <div className="bg-white/90 rounded-2xl p-3 border border-emerald-200/80 shadow-xs flex items-center gap-3">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200 shadow-2xs">
              <img
                src="/uploads/ruhs_hospital_nariyal_seva_trolley.jpg"
                alt="RUHS Hospital Nariyal Pani Seva Trolley"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md uppercase font-mono">
                🏥 RUHS Ward Trolley
              </span>
              <h4 className="text-xs font-bold text-neutral-900 mt-1 truncate">
                On-Ground Coconut Distribution
              </h4>
              <p className="text-[11px] text-neutral-500 line-clamp-1">
                Trolley loaded bedside with whole green tender coconuts.
              </p>
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-3 border border-emerald-200/80 shadow-xs flex items-center gap-3">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200 shadow-2xs">
              <img
                src="/uploads/nariyal_pani_fresh_coconut.jpg"
                alt="100% Pure Tender Coconut"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md uppercase font-mono">
                🥥 100% Tender Coconut
              </span>
              <h4 className="text-xs font-bold text-neutral-900 mt-1 truncate">
                Cut Fresh Live Bedside
              </h4>
              <p className="text-[11px] text-neutral-500 line-clamp-1">
                Zero chemical adulteration, sterile eco-straws for hydration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. CURRENTLY ACTIVE ON-GROUND SEVA BROADCAST BANNER */}
      {todayLiveEvent && (
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#084c36] to-[#053224] text-white p-6 sm:p-8 shadow-xl border-2 border-amber-400/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                {todayLiveEvent.status === 'active_today' ? (
                  <span className="inline-flex items-center gap-1.5 bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full animate-pulse shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>CURRENTLY ACTIVE ON-GROUND</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-amber-400 text-neutral-950 font-extrabold text-xs px-3.5 py-1 rounded-full shadow-md font-mono">
                    <span>🗓️ NEXT UPCOMING EKADASHI DRIVE</span>
                  </span>
                )}
                <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-emerald-200 border border-white/10">
                  {todayLiveEvent.date} • {todayLiveEvent.tithi}
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                {todayLiveEvent.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {todayLiveEvent.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FDB813]" />
                  <span>{todayLiveEvent.hospital}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#FDB813]" />
                  <span>Seva Timing: {todayLiveEvent.timing || '12:00 PM - 04:00 PM'}</span>
                </span>
              </div>
            </div>

            {/* Live Seva Photo Preview */}
            <div className="relative w-36 h-28 sm:w-44 sm:h-32 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg shrink-0 hidden md:block group">
              <img
                src="/uploads/ruhs_hospital_nariyal_seva_trolley.jpg"
                alt="RUHS Hospital Bedside Seva Trolley"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-1.5 inset-x-1.5 text-[9px] font-bold text-amber-300 text-center uppercase tracking-wider font-mono">
                🏥 RUHS Hospital Trolley
              </span>
            </div>

            {/* Right Metric & Quick Sponsor Trigger */}
            <div className="w-full lg:w-auto bg-black/30 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col items-center sm:items-end justify-center gap-3 shrink-0">
              <div className="text-center sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-mono font-semibold">
                  {todayLiveEvent.status === 'active_today' ? "Today's Live Bedside Progress" : "Scheduled Drive Goal"}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  {todayLiveEvent.sponsoredCoconuts.toLocaleString('en-IN')} / {todayLiveEvent.targetCoconuts.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-amber-300 font-medium block">
                  {todayLiveEvent.status === 'active_today' ? "Fresh Tender Coconuts Cut Bedside Today" : "Pledged Coconuts for RUHS Cancer Ward"}
                </span>
              </div>

              <button
                onClick={() => handleBookSlot(todayLiveEvent)}
                className="w-full sm:w-auto bg-[#FDB813] hover:bg-[#f59e0b] text-neutral-950 font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{todayLiveEvent.status === 'active_today' ? 'Sponsor 20 Coconuts Today (₹1,300)' : 'Pre-Book / Sponsor Coconuts (₹65 each)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. UPCOMING EKADASHI & HOSPITAL SCHEDULE CARDS */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-[#084c36]" />
              <span>Upcoming Scheduled Ekadashi Hospital Drives</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Book your name or family's seva slot for upcoming auspicious Ekadashi dates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {upcomingEvents.map((event) => {
            const progress = Math.min(100, Math.round((event.sponsoredCoconuts / event.targetCoconuts) * 100));

            return (
              <motion.div
                key={event.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {event.tithi}
                    </span>
                    <span className="text-xs font-bold font-mono text-[#084c36] flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{event.date}</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-neutral-900 text-sm sm:text-base mb-1.5 leading-snug">
                    {event.title}
                  </h4>
                  <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="bg-[#f8f6f2] rounded-xl p-2.5 border border-neutral-200/70 mb-4 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-700 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-[#084c36] shrink-0" />
                      <span className="truncate">{event.hospital}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-600 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#084c36]" />
                        <span>{event.timing || '12:00 PM - 04:00 PM'}</span>
                      </span>
                      <span>Target: {event.targetCoconuts.toLocaleString('en-IN')} Coconuts</span>
                    </div>
                    <div className="flex justify-end text-[10px] text-neutral-500">
                      <strong className="text-neutral-900">{progress}% Booked</strong>
                    </div>
                    {/* Mini Progress Bar */}
                    <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#084c36] h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBookSlot(event)}
                  className="w-full bg-emerald-50 hover:bg-[#084c36] text-[#084c36] hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all border border-emerald-200 hover:border-[#084c36] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Book This Ekadashi Slot</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. DEDICATED CUSTOM DATE PICKER: "SPONSOR ON MY SPECIAL DAY" */}
      <div className="mb-12 bg-[#faf8f5] rounded-3xl p-6 sm:p-8 border border-neutral-300/80 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Choose Your Custom Date</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
              Sponsor Bedside Coconut Seva on Your Birthday, Anniversary or Memorial Day
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Want to perform fresh tender coconut or meal seva on a specific date in memory of your elders, parents, or celebrating a family milestone? Choose your date and our volunteer squad will carry out the on-ground distribution in Jaipur hospital wards on that exact day.
            </p>
          </div>

          <form onSubmit={handleBookCustomDate} className="lg:col-span-6 bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm space-y-3.5">
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Select Your Desired Seva Date *
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={selectedCustomDate}
                onChange={(e) => setSelectedCustomDate(e.target.value)}
                className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Occasion / Dedication Note
              </label>
              <select
                value={customOccasion}
                onChange={(e) => setCustomOccasion(e.target.value)}
                className="w-full text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:border-emerald-800 focus:outline-none"
              >
                <option value="In Loving Memory of Beloved Elders">In Loving Memory of Beloved Elders / Shraadh</option>
                <option value="Birthday Celebration Seva">Birthday Celebration Seva</option>
                <option value="Wedding Anniversary Milestone">Wedding Anniversary Milestone</option>
                <option value="New Venture / Health Recovery Gratitude">New Venture / Health Recovery Gratitude</option>
                <option value="General Hospital Ward Relief">General Hospital Ward Relief</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Book My Custom Date Seva</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 4. EXPANDED GOVERNMENT PARTNER HOSPITALS NETWORK */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h3 className="text-lg sm:text-2xl font-bold text-neutral-900">
            Jaipur Premier Government Hospitals & Medical Relief Nodes
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Active verified bedside seva conducted across premier Rajasthan Government medical colleges and state cancer wards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs hover:border-emerald-700/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#084c36] flex items-center justify-center shrink-0 border border-emerald-200">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
                    {hosp.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                    {hosp.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FDB813]" />
                    <span>{hosp.location}</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-100 text-[11px] text-neutral-600 flex items-center justify-between">
                <span className="font-medium">{hosp.specialty.split('&')[0]}</span>
                <span className="font-mono font-semibold text-[#084c36]">{hosp.bedsideCapacity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
