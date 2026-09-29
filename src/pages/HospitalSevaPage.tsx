import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Building2,
  Sparkles,
  MapPin,
  MessageCircle,
  Calendar,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import type { DriveItem, HospitalNode } from '../types';
import { DRIVE_ITEMS, PARTNER_HOSPITALS, OFFICIAL_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export type HospitalSevaTab = 'nariyal' | 'anar-juice' | 'meal';

export interface SevaDateOption {
  dateStr: string; // "2026-09-26"
  label: string; // "26 Sep 2026"
  day: string; // "Sat"
  note: string; // "Pratipada Shraadh"
}

export const getTodayISTString = (): string => {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(new Date());
  } catch {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
};

export const SHRAADH_DATES: SevaDateOption[] = [
  { dateStr: '2026-09-26', label: '26 Sep 2026', day: 'Sat', note: 'Pratipada Shraadh' },
  { dateStr: '2026-09-27', label: '27 Sep 2026', day: 'Sun', note: 'Dwitiya Shraadh' },
  { dateStr: '2026-09-28', label: '28 Sep 2026', day: 'Mon', note: 'Tritiya Shraadh' },
  { dateStr: '2026-09-29', label: '29 Sep 2026', day: 'Tue', note: 'Chaturthi Shraadh' },
  { dateStr: '2026-09-30', label: '30 Sep 2026', day: 'Wed', note: 'Panchami Shraadh' },
  { dateStr: '2026-10-01', label: '01 Oct 2026', day: 'Thu', note: 'Shasthi Shraadh' },
  { dateStr: '2026-10-02', label: '02 Oct 2026', day: 'Fri', note: 'Saptami Shraadh' },
  { dateStr: '2026-10-03', label: '03 Oct 2026', day: 'Sat', note: 'Ashtami Shraadh' },
  { dateStr: '2026-10-04', label: '04 Oct 2026', day: 'Sun', note: 'Matru Navami' },
  { dateStr: '2026-10-05', label: '05 Oct 2026', day: 'Mon', note: 'Dashami Shraadh' },
  { dateStr: '2026-10-06', label: '06 Oct 2026', day: 'Tue', note: 'Indira Ekadashi' },
  { dateStr: '2026-10-07', label: '07 Oct 2026', day: 'Wed', note: 'Dwadashi Shraadh' },
  { dateStr: '2026-10-08', label: '08 Oct 2026', day: 'Thu', note: 'Trayodashi Shraadh' },
  { dateStr: '2026-10-09', label: '09 Oct 2026', day: 'Fri', note: 'Chaturdashi Shraadh' },
  { dateStr: '2026-10-10', label: '10 Oct 2026', day: 'Sat', note: 'Sarva Pitru Amavasya' },
];

interface HospitalSevaPageProps {
  onBackToHome: () => void;
  onOpenSponsorModal: (
    item?: DriveItem,
    initialData?: {
      name: string;
      phone: string;
      quantity: number;
      scheduledDate?: string;
      hospitalName?: string;
      occasionNote?: string;
      customBreakdown?: string;
    }
  ) => void;
  hospitals?: HospitalNode[];
  initialTab?: HospitalSevaTab;
}

export const HospitalSevaPage: React.FC<HospitalSevaPageProps> = ({
  onBackToHome,
  onOpenSponsorModal,
  hospitals = PARTNER_HOSPITALS,
  initialTab = 'nariyal',
}) => {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<HospitalSevaTab>(initialTab);
  const [selectedQty, setSelectedQty] = useState<number>(20);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customQtyInput, setCustomQtyInput] = useState<number | ''>('');

  const todayIST = getTodayISTString();

  // Find first upcoming open date, default to 30 Sep if today is 29 Sep
  const defaultOpenDate =
    SHRAADH_DATES.find((d) => d.dateStr > todayIST) || SHRAADH_DATES[SHRAADH_DATES.length - 1];
  const [selectedDateStr, setSelectedDateStr] = useState<string>(defaultOpenDate.dateStr);

  const selectedDateObj =
    SHRAADH_DATES.find((d) => d.dateStr === selectedDateStr) || defaultOpenDate;
  const isSelectedDateCompleted = selectedDateObj.dateStr <= todayIST;

  // Check URL query on mount for item override (?item=anar-juice | meal | nariyal)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      const itemParam = search.get('item')?.toLowerCase() || search.get('donate')?.toLowerCase();
      if (itemParam === 'anar' || itemParam === 'anar-juice' || itemParam === 'anaar' || itemParam === 'juice') {
        setSelectedTab('anar-juice');
      } else if (itemParam === 'khana' || itemParam === 'meal' || itemParam === 'meal-box' || itemParam === 'thali' || itemParam === 'shraadh') {
        setSelectedTab('meal');
      } else if (itemParam === 'nariyal' || itemParam === 'nariyal-pani' || itemParam === 'coconut') {
        setSelectedTab('nariyal');
      }
    }
  }, []);

  // Items data mapped to DRIVE_ITEMS
  const coconutItem =
    DRIVE_ITEMS.find((i) => i.id === 'coconut-water') || DRIVE_ITEMS[0];
  const anarItem =
    DRIVE_ITEMS.find((i) => i.id === 'anar-juice') || {
      id: 'anar-juice',
      name: 'Pure Cold-Pressed Anar (Pomegranate) Juice',
      tagline: 'Antioxidant & Platelet Boost • SMS & RUHS',
      category: 'hospital' as const,
      price: 70,
      unitLabel: 'Juice Glass',
      targetCount: '60K Target',
      deliveredCount: '48K Delivered',
      percentage: 80,
      color: '#b91c1c',
      badge: '100% Pure Pomegranate',
      image: '/uploads/jaljhulani_anar_juice_nariyal_seva.jpg',
      description: '100% pure cold-pressed fresh pomegranate juice served bedside in government oncology and dialysis wards for cancer chemotherapy patients.',
      impactMetrics: '48,000+ glasses served bedside to cancer fighters.',
      options: { primary: 'Anaar Juice (₹70)', secondary: 'Pomegranate Box' },
      status: 'active' as const,
    };
  const mealItem =
    DRIVE_ITEMS.find((i) => i.id === 'pomegranate-meal') || {
      id: 'pomegranate-meal',
      name: 'Wholesome Hospital Meal Box (Shraadh Seva)',
      tagline: 'Daily Hospital Drives (26 Sep - 10 Oct) • RUHS Hospital',
      category: 'hospital' as const,
      price: 70,
      unitLabel: 'Meal Box',
      targetCount: '50K Target',
      deliveredCount: '34K Delivered',
      percentage: 68,
      color: '#c2410c',
      badge: 'Shraadh Bhojan Seva',
      image: '/uploads/slum_packed_thali_tiffin.jpg',
      description: 'Freshly cooked hygienic high-protein meal box containing 4 soft rotis, seasonal sabzi, dal, rice and salad for cancer patients and needy patient attendants.',
      impactMetrics: '34,000+ wholesome nutritious meals distributed across Jaipur government healthcare centers.',
      options: { primary: 'Meal Box (₹70)', secondary: 'Nutritional Pack' },
      status: 'active' as const,
    };

  const currentItemMap: Record<HospitalSevaTab, DriveItem> = {
    nariyal: coconutItem,
    'anar-juice': anarItem,
    meal: mealItem,
  };

  const activeItem = currentItemMap[selectedTab];
  const unitRate = activeItem.price || 70;

  const effectiveQty = isCustomMode
    ? typeof customQtyInput === 'number' && customQtyInput > 0
      ? customQtyInput
      : 20
    : selectedQty;

  const totalAmount = effectiveQty * unitRate;

  // Dynamic shareable link
  const baseUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/hospital-seva`
      : 'https://riseuphelp.org/hospital-seva';
  const shareableUrl = selectedTab === 'nariyal' ? baseUrl : `${baseUrl}?item=${selectedTab}`;

  const handleWhatsAppShare = () => {
    let itemTitle = 'Fresh Tender Coconut Water Seva (₹65/pc)';
    let shareText = '';

    if (selectedTab === 'anar-juice') {
      itemTitle = '100% Pure Cold-Pressed Anaar Juice (₹70/glass)';
      shareText =
        `🙏 *Support Cancer Chemotherapy Patients with Hospital Bedside Seva*\n` +
        `🏥 State Cancer Medical College (RUHS) & SMS Hospital, Jaipur.\n\n` +
        `✨ *Seva Item:* ${itemTitle}\n` +
        `✅ 100% Direct on-ground bedside delivery.\n` +
        `🛡️ 50% Tax Exemption under Section 80G.\n\n` +
        `👉 *Donate Directly in 1 Click:* ${shareableUrl}`;
    } else if (selectedTab === 'meal') {
      itemTitle = 'Wholesome Hospital Meal Box - Shraadh Seva (₹70/meal)';
      shareText =
        `🙏 *Hospital Meal Seva - Shraadh Paksha (26 Sep - 10 Oct)*\n` +
        `🏥 State Cancer Medical College (RUHS), Jaipur.\n\n` +
        `🍱 *Seva:* Wholesome fresh meal box (4 rotis, dal, seasonal sabzi, rice, salad) served bedside to cancer patients and attendants.\n` +
        `✅ 26-29 Sep completed • Upcoming dates open for sponsorship.\n` +
        `🛡️ 50% Tax Exemption under Section 80G.\n\n` +
        `👉 *Select Date & Sponsor Directly:* ${shareableUrl}`;
    } else {
      itemTitle = 'Fresh Tender Coconut Water Seva (₹65/pc)';
      shareText =
        `🙏 *Support Cancer Chemotherapy Patients with Hospital Bedside Seva*\n` +
        `🏥 State Cancer Medical College (RUHS) & SMS Hospital, Jaipur.\n\n` +
        `✨ *Seva Item:* ${itemTitle}\n` +
        `✅ 100% Direct on-ground bedside delivery.\n` +
        `🛡️ 50% Tax Exemption under Section 80G.\n\n` +
        `👉 *Donate Directly in 1 Click:* ${shareableUrl}`;
    }

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleTriggerCheckout = () => {
    onOpenSponsorModal(activeItem, {
      name: '',
      phone: '',
      quantity: effectiveQty,
      scheduledDate:
        selectedTab === 'meal'
          ? `${selectedDateObj.label} (${selectedDateObj.note})`
          : undefined,
      hospitalName: 'State Cancer Medical College (RUHS), Jaipur',
      occasionNote:
        selectedTab === 'meal'
          ? `Shraadh Pitru Bhojan Seva (${selectedDateObj.note})`
          : undefined,
    });
  };

  return (
    <div className="w-full flex flex-col gap-3.5 sm:gap-5 animate-in fade-in duration-300 pb-12 px-3 sm:px-4 max-w-4xl mx-auto font-sans">
      {/* 1. COMPACT TOP HEADER */}
      <div className="w-full pt-2 flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 bg-white text-neutral-700 hover:text-neutral-900 font-medium text-xs px-3 py-1.5 rounded-full border border-neutral-200/90 shadow-2xs hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-neutral-600" />
          <span>{t.ekadashiBack || 'Back to Home'}</span>
        </button>

        <button
          onClick={handleWhatsAppShare}
          className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer active:scale-95"
          title="Share on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>Share on WhatsApp</span>
        </button>
      </div>

      {/* 2. MINIMALIST SEGMENTED SELECTION TABS */}
      <div className="w-full bg-neutral-100/90 p-1 rounded-2xl border border-neutral-200/70 shadow-2xs">
        <div className="grid grid-cols-3 gap-1 w-full">
          {/* Tab 1: Coconut */}
          <button
            onClick={() => setSelectedTab('nariyal')}
            className={`py-2 px-2 rounded-xl text-xs transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 ${
              selectedTab === 'nariyal'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs border border-neutral-200/70'
                : 'text-neutral-600 hover:text-neutral-900 font-medium hover:bg-neutral-200/40'
            }`}
          >
            <span className="truncate">Coconut Water</span>
            <span className={`text-[11px] font-mono ${selectedTab === 'nariyal' ? 'text-emerald-800 font-semibold' : 'text-neutral-400'}`}>
              ₹65
            </span>
          </button>

          {/* Tab 2: Anaar Juice */}
          <button
            onClick={() => setSelectedTab('anar-juice')}
            className={`py-2 px-2 rounded-xl text-xs transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 ${
              selectedTab === 'anar-juice'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs border border-neutral-200/70'
                : 'text-neutral-600 hover:text-neutral-900 font-medium hover:bg-neutral-200/40'
            }`}
          >
            <span className="truncate">Anaar Juice</span>
            <span className={`text-[11px] font-mono ${selectedTab === 'anar-juice' ? 'text-rose-800 font-semibold' : 'text-neutral-400'}`}>
              ₹70
            </span>
          </button>

          {/* Tab 3: Meal Box */}
          <button
            onClick={() => setSelectedTab('meal')}
            className={`py-2 px-2 rounded-xl text-xs transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 relative ${
              selectedTab === 'meal'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs border border-neutral-200/70'
                : 'text-neutral-600 hover:text-neutral-900 font-medium hover:bg-neutral-200/40'
            }`}
          >
            <span className="truncate">Meal Box</span>
            <span className={`text-[11px] font-mono ${selectedTab === 'meal' ? 'text-amber-800 font-semibold' : 'text-neutral-400'}`}>
              ₹70
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 ml-0.5" />
          </button>
        </div>
      </div>

      {/* 3. AESTHETIC MAIN SEVA CARD */}
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        {/* Card Header Banner with Rich Muted Gradients */}
        <div
          className={`p-4 sm:p-5 text-white flex items-center justify-between gap-3 ${
            selectedTab === 'anar-juice'
              ? 'bg-gradient-to-br from-[#4a0a0e] via-[#6d1319] to-[#300508]'
              : selectedTab === 'meal'
              ? 'bg-gradient-to-br from-[#591d09] via-[#7c290e] to-[#331005]'
              : 'bg-gradient-to-br from-[#05291d] via-[#084c36] to-[#031d14]'
          }`}
        >
          <div className="min-w-0 flex-1 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-white/15 text-white text-[10px] font-medium tracking-wider px-2.5 py-0.5 rounded-full border border-white/20 uppercase">
                {selectedTab === 'meal' ? 'Shraadh Bhojan Seva' : 'Bedside Patient Relief'}
              </span>
              <span className="text-[11px] text-white/70 font-medium">
                RUHS & SMS Medical Oncology
              </span>
            </div>
            <h1 className="text-base sm:text-xl font-bold tracking-tight text-white mt-1.5 truncate">
              {activeItem.name}
            </h1>
            <p className="text-[11px] sm:text-xs text-white/80 font-normal line-clamp-1 mt-0.5">
              {selectedTab === 'meal'
                ? 'Freshly prepared wholesome meals (rotis, dal, sabzi, rice, salad) served bedside.'
                : activeItem.description}
            </p>
          </div>

          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-white/20 bg-neutral-900 shadow-xs">
            <img
              src={activeItem.image || '/uploads/nariyal_pani_fresh_coconut.jpg'}
              alt={activeItem.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex flex-col gap-3.5 text-left">
          {/* ONLY FOR MEAL TAB: ELEGANT DATE SELECTOR */}
          {selectedTab === 'meal' && (
            <div className="bg-neutral-50 border border-neutral-200/90 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-600" />
                  <span className="text-xs font-semibold text-neutral-900">
                    Seva Schedule (26 Sep – 10 Oct):
                  </span>
                  {isSelectedDateCompleted ? (
                    <span className="text-[10px] font-medium text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      Completed
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md">
                      Available
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 font-normal">
                  {isSelectedDateCompleted
                    ? '450 meals successfully distributed bedside at RUHS Cancer Hospital.'
                    : `Daily fresh high-protein meals served bedside (₹70/meal box).`}
                </p>
              </div>

              <select
                value={selectedDateStr}
                onChange={(e) => setSelectedDateStr(e.target.value)}
                className="w-full sm:w-auto bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#084c36] shadow-2xs cursor-pointer"
              >
                {SHRAADH_DATES.map((d) => {
                  const completed = d.dateStr <= todayIST;
                  return (
                    <option key={d.dateStr} value={d.dateStr}>
                      {d.label} ({d.day}) • {d.note} {completed ? '— Completed' : '— Open'}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* QUANTITY PRESET PILLS */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-neutral-800 tracking-tight">
                Select Quantity
              </span>
              <span className="text-neutral-500 font-mono text-[11px]">
                Rate: ₹{unitRate} / {activeItem.unitLabel || 'Unit'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[10, 20, 50, 100].map((qty) => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => {
                    setSelectedQty(qty);
                    setIsCustomMode(false);
                  }}
                  className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                    !isCustomMode && selectedQty === qty
                      ? 'bg-[#084c36] text-white border-[#084c36] shadow-xs'
                      : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200/90'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-semibold">
                    {qty}
                    {qty === 20 && (
                      <span className={`text-[9px] font-normal ml-1 ${!isCustomMode && selectedQty === qty ? 'text-emerald-200' : 'text-neutral-400'}`}>
                        Popular
                      </span>
                    )}
                  </div>
                  <div className={`text-[10px] font-mono mt-0.5 ${!isCustomMode && selectedQty === qty ? 'text-emerald-200' : 'text-neutral-500'}`}>
                    ₹{(qty * unitRate).toLocaleString('en-IN')}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Quantity Toggle Option */}
            <div className="mt-2.5 flex items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsCustomMode(!isCustomMode)}
                className="text-emerald-800 hover:text-emerald-950 font-medium text-[11px] underline underline-offset-2 cursor-pointer"
              >
                {isCustomMode ? 'Use Preset Quantities' : '+ Enter Custom Quantity'}
              </button>

              {isCustomMode && (
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-500 text-[11px]">Units:</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="25"
                    value={customQtyInput}
                    onChange={(e) =>
                      setCustomQtyInput(
                        e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value, 10))
                      )
                    }
                    className="w-16 bg-white border border-neutral-300 rounded-lg px-2 py-1 text-center font-medium text-xs focus:outline-none focus:border-[#084c36]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* TOTAL SUMMARY & PRIMARY CTA BUTTON */}
          <div className="pt-2 border-t border-neutral-200/80">
            {selectedTab === 'meal' && isSelectedDateCompleted ? (
              <div className="w-full bg-emerald-50 text-emerald-800 border border-emerald-300/80 font-medium text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {selectedDateObj.label} Seva Completed (450 Meals Distributed)
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleTriggerCheckout}
                className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white font-medium text-sm sm:text-base py-3 px-5 rounded-xl transition-all shadow-xs hover:shadow active:scale-[0.99] cursor-pointer flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="tracking-tight">
                    Sponsor {effectiveQty} {activeItem.unitLabel || 'Units'}
                    {selectedTab === 'meal' ? ` for ${selectedDateObj.label}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono font-semibold text-emerald-100">
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. AESTHETIC TRUST & 80G HIGHLIGHTS */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white rounded-xl p-2.5 border border-neutral-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-neutral-900 tracking-tight">100% Bedside</div>
          <div className="text-[10px] text-neutral-500 font-normal">RUHS & SMS Hospital</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 border border-neutral-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-neutral-900 tracking-tight">50% Tax Relief</div>
          <div className="text-[10px] text-neutral-500 font-normal">Section 80G Certified</div>
        </div>
        <div className="bg-white rounded-xl p-2.5 border border-neutral-200/80 shadow-2xs">
          <div className="text-xs font-semibold text-neutral-900 tracking-tight">Direct Updates</div>
          <div className="text-[10px] text-neutral-500 font-normal">WhatsApp Live Proof</div>
        </div>
      </div>

      {/* 5. VERIFIED PARTNER HOSPITALS */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200/80 shadow-2xs text-left">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-3.5 h-3.5 text-[#084c36]" />
          <h4 className="text-xs font-semibold text-neutral-900 tracking-tight">
            Active Verified Hospital Relief Wards in Jaipur:
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {hospitals.slice(0, 3).map((h) => (
            <span
              key={h.id}
              className="bg-neutral-50 text-neutral-700 px-2.5 py-1 rounded-lg border border-neutral-200/80 font-medium inline-flex items-center gap-1"
            >
              <MapPin className="w-2.5 h-2.5 text-emerald-700" />
              <span>{h.name.split('(')[0].trim()}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 6. TRANSPARENCY FOOTNOTE */}
      <div className="text-center text-[10px] text-neutral-400 pt-1 font-normal">
        <span>{OFFICIAL_INFO.name} • Section 8 Non-Profit • CIN: {OFFICIAL_INFO.cinNumber}</span>
      </div>
    </div>
  );
};
