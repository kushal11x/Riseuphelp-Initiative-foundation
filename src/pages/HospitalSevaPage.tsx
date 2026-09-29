import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Building2,
  Sparkles,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import type { DriveItem, HospitalNode } from '../types';
import { DRIVE_ITEMS, PARTNER_HOSPITALS, OFFICIAL_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export type HospitalSevaTab = 'nariyal' | 'anar-juice' | 'meal';

export interface ShraadhDateEntry {
  dateStr: string; // "2026-09-26"
  displayDate: string; // "26 Sep 2026"
  dayOfWeek: string; // "Saturday"
  hindiDay: string; // "शनिवार"
  tithi: string; // "पूर्णिमा / प्रतिपदा श्राद्ध"
  subTitle: string;
  defaultDeliveredCount: number;
  targetMeals: number;
  isSpecial?: boolean;
  specialTag?: string;
}

export const getTodayISTString = (): string => {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(new Date()); // Formats as YYYY-MM-DD (e.g. "2026-09-29")
  } catch {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
};

export const SHRAADH_MEAL_DATES: ShraadhDateEntry[] = [
  {
    dateStr: '2026-09-26',
    displayDate: '26 Sep 2026',
    dayOfWeek: 'Saturday',
    hindiDay: 'शनिवार',
    tithi: 'पूर्णिमा / प्रतिपदा श्राद्ध',
    subTitle: 'आरंभ: प्रथम श्राद्ध तर्पण',
    defaultDeliveredCount: 460,
    targetMeals: 450,
  },
  {
    dateStr: '2026-09-27',
    displayDate: '27 Sep 2026',
    dayOfWeek: 'Sunday',
    hindiDay: 'रविवार',
    tithi: 'द्वितीया श्राद्ध',
    subTitle: 'दूज श्राद्ध भोजन सेवा',
    defaultDeliveredCount: 450,
    targetMeals: 450,
  },
  {
    dateStr: '2026-09-28',
    displayDate: '28 Sep 2026',
    dayOfWeek: 'Monday',
    hindiDay: 'सोमवार',
    tithi: 'तृतीया श्राद्ध',
    subTitle: 'तीज श्राद्ध भोजन सेवा',
    defaultDeliveredCount: 440,
    targetMeals: 450,
  },
  {
    dateStr: '2026-09-29',
    displayDate: '29 Sep 2026',
    dayOfWeek: 'Tuesday',
    hindiDay: 'मंगलवार',
    tithi: 'चतुर्थी श्राद्ध',
    subTitle: 'चौथ श्राद्ध भोजन सेवा',
    defaultDeliveredCount: 450,
    targetMeals: 450,
  },
  {
    dateStr: '2026-09-30',
    displayDate: '30 Sep 2026',
    dayOfWeek: 'Wednesday',
    hindiDay: 'बुधवार',
    tithi: 'पंचमी श्राद्ध',
    subTitle: 'पंचमी तिथि श्राद्ध सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 450,
  },
  {
    dateStr: '2026-10-01',
    displayDate: '01 Oct 2026',
    dayOfWeek: 'Thursday',
    hindiDay: 'गुरुवार',
    tithi: 'षष्ठी श्राद्ध',
    subTitle: 'छठ श्राद्ध भोजन सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 450,
  },
  {
    dateStr: '2026-10-02',
    displayDate: '02 Oct 2026',
    dayOfWeek: 'Friday',
    hindiDay: 'शुक्रवार',
    tithi: 'सप्तमी श्राद्ध',
    subTitle: 'सातम श्राद्ध भोजन सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 450,
  },
  {
    dateStr: '2026-10-03',
    displayDate: '03 Oct 2026',
    dayOfWeek: 'Saturday',
    hindiDay: 'शनिवार',
    tithi: 'अष्टमी श्राद्ध',
    subTitle: 'आठम श्राद्ध भोजन सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 450,
  },
  {
    dateStr: '2026-10-04',
    displayDate: '04 Oct 2026',
    dayOfWeek: 'Sunday',
    hindiDay: 'रविवार',
    tithi: 'नवमी (मातृ नवमी) श्राद्ध',
    subTitle: 'माता, दादी व कुल स्त्रियों के निमित्त विशेष सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 500,
    isSpecial: true,
    specialTag: '⭐ मातृ नवमी महाश्राद्ध',
  },
  {
    dateStr: '2026-10-05',
    displayDate: '05 Oct 2026',
    dayOfWeek: 'Monday',
    hindiDay: 'सोमवार',
    tithi: 'दशमी श्राद्ध',
    subTitle: 'दसम श्राद्ध भोजन सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 450,
  },
  {
    dateStr: '2026-10-06',
    displayDate: '06 Oct 2026',
    dayOfWeek: 'Tuesday',
    hindiDay: 'मंगलवार',
    tithi: 'एकादशी (इंदिरा एकादशी) श्राद्ध',
    subTitle: 'पितृ मोक्ष इंदिरा एकादशी महाव्रत भोजन व नारियल सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 500,
    isSpecial: true,
    specialTag: '⭐ इंदिरा एकादशी महाव्रत',
  },
  {
    dateStr: '2026-10-07',
    displayDate: '07 Oct 2026',
    dayOfWeek: 'Wednesday',
    hindiDay: 'बुधवार',
    tithi: 'द्वादशी / सन्यासी श्राद्ध',
    subTitle: 'बारस व सन्यासी श्राद्ध सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 450,
  },
  {
    dateStr: '2026-10-08',
    displayDate: '08 Oct 2026',
    dayOfWeek: 'Thursday',
    hindiDay: 'गुरुवार',
    tithi: 'त्रयोदशी (मघा) श्राद्ध',
    subTitle: 'तेरस / मघा श्राद्ध भोजन सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 450,
  },
  {
    dateStr: '2026-10-09',
    displayDate: '09 Oct 2026',
    dayOfWeek: 'Friday',
    hindiDay: 'शुक्रवार',
    tithi: 'चतुर्दशी श्राद्ध',
    subTitle: 'चौदस श्राद्ध भोजन सेवा',
    defaultDeliveredCount: 0,
    targetMeals: 450,
  },
  {
    dateStr: '2026-10-10',
    displayDate: '10 Oct 2026',
    dayOfWeek: 'Saturday',
    hindiDay: 'शनिवार',
    tithi: 'सर्वपितृ अमावस्या महाश्राद्ध',
    subTitle: 'समस्त ज्ञात-अज्ञात पितरों का विसर्जन महाभोज',
    defaultDeliveredCount: 0,
    targetMeals: 600,
    isSpecial: true,
    specialTag: '⭐ सर्वपितृ अमावस्या महाश्राद्ध',
  },
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
  const [copiedLink, setCopiedLink] = useState(false);
  const [customQty, setCustomQty] = useState<number | ''>(20);
  const [shraadhFilter, setShraadhFilter] = useState<'all' | 'open' | 'completed'>('all');

  const todayIST = getTodayISTString();

  // Dynamic status counts for Shraadh calendar
  const completedEntries = SHRAADH_MEAL_DATES.filter((d) => d.dateStr <= todayIST);
  const openEntries = SHRAADH_MEAL_DATES.filter((d) => d.dateStr > todayIST);
  const totalMealsServedSoFar = completedEntries.reduce(
    (acc, cur) => acc + (cur.defaultDeliveredCount || 450),
    0
  );

  const filteredShraadhDates = SHRAADH_MEAL_DATES.filter((entry) => {
    const isCompleted = entry.dateStr <= todayIST;
    if (shraadhFilter === 'open') return !isCompleted;
    if (shraadhFilter === 'completed') return isCompleted;
    return true;
  });

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
      name: 'Wholesome Hospital Meal Box (Shraadh Bhojan Seva)',
      tagline: 'Pavitra Shraadh Drive (26 Sep - 10 Oct) • Daily RUHS Meals',
      category: 'hospital' as const,
      price: 70,
      unitLabel: 'Meal Box',
      targetCount: '50K Target',
      deliveredCount: '34K Delivered',
      percentage: 68,
      color: '#c2410c',
      badge: 'Pavitra Shraadh Seva',
      image: '/uploads/slum_packed_thali_tiffin.jpg',
      description: 'Freshly cooked hygienic high-protein meal box containing 4 soft rotis, seasonal sabzi, dal, rice and salad for cancer patients and needy patient attendants.',
      impactMetrics: '34,000+ wholesome nutritious meals distributed across Jaipur government healthcare centers.',
      options: { primary: 'Shraadh Meal Box (₹70)', secondary: 'Nutritional Pack' },
      status: 'active' as const,
    };

  const currentItemMap: Record<HospitalSevaTab, DriveItem> = {
    nariyal: coconutItem,
    'anar-juice': anarItem,
    meal: mealItem,
  };

  const activeItem = currentItemMap[selectedTab];

  // Dynamic shareable link based on selected item
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}/hospital-seva` : 'https://riseuphelp.org/hospital-seva';
  const shareableUrl = selectedTab === 'nariyal' ? baseUrl : `${baseUrl}?item=${selectedTab}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareableUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleWhatsAppShare = () => {
    let itemTitle = 'Fresh Tender Coconut Water Seva (₹65/pc)';
    let shareText = '';

    if (selectedTab === 'anar-juice') {
      itemTitle = '100% Pure Taaza Anaar Juice Seva (₹70/glass)';
      shareText =
        `🙏 *Support Cancer Chemotherapy Patients with Hospital Bedside Seva*\n` +
        `🏥 State Cancer Medical College (RUHS) & SMS Hospital, Jaipur.\n\n` +
        `✨ *Seva Item:* ${itemTitle}\n` +
        `✅ 100% Direct on-ground bedside delivery.\n` +
        `🛡️ 50% Tax Exemption under Section 80G.\n\n` +
        `👉 *Donate Directly in 1 Click Here:* ${shareableUrl}`;
    } else if (selectedTab === 'meal') {
      itemTitle = 'Wholesome Nutritious Meal Box / Khana Seva (₹70/meal)';
      shareText =
        `🙏 *पवित्र श्राद्ध पक्ष (26 सितंबर - 10 अक्टूबर): कैंसर अस्पताल दैनिक भोजन सेवा*\n` +
        `🏥 State Cancer Medical College (RUHS), Jaipur.\n\n` +
        `🍱 *सेवा:* अपने पितरों/पूर्वजों की पावन स्मृति में कैंसर मरीजों व जरूरतमंद परिजनों को ताज़ा पौष्टिक भोजन (4 रोटी, दाल, सब्ज़ी, चावल, सलाद).\n` +
        `✅ 26, 27, 28, 29 सितंबर की सेवा संपन्न (${totalMealsServedSoFar.toLocaleString('en-IN')}+ भोजन वितरित), आगामी तिथियों की बुकिंग जारी।\n` +
        `🛡️ 50% Tax Exemption under Section 80G.\n\n` +
        `👉 *यहाँ से सीधे तिथि चुनकर भोजन कराएं:* ${shareableUrl}`;
    } else {
      shareText =
        `🙏 *Support Cancer Chemotherapy Patients with Hospital Bedside Seva*\n` +
        `🏥 State Cancer Medical College (RUHS) & SMS Hospital, Jaipur.\n\n` +
        `✨ *Seva Item:* ${itemTitle}\n` +
        `✅ 100% Direct on-ground bedside delivery.\n` +
        `🛡️ 50% Tax Exemption under Section 80G.\n\n` +
        `👉 *Donate Directly in 1 Click Here:* ${shareableUrl}`;
    }

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleDonatePreset = (quantity: number) => {
    onOpenSponsorModal(activeItem, {
      name: '',
      phone: '',
      quantity,
      scheduledDate:
        selectedTab === 'meal' ? 'Pavitra Shraadh Drive (26 Sep - 10 Oct)' : undefined,
      hospitalName: 'State Cancer Medical College (RUHS), Jaipur',
      occasionNote:
        selectedTab === 'meal'
          ? 'Pavitra Shraadh Pitru Bhojan Seva (कैंसर अस्पताल भोजन सेवा)'
          : undefined,
    });
  };

  const handleDonateCustom = () => {
    const qty = typeof customQty === 'number' && customQty > 0 ? customQty : 20;
    onOpenSponsorModal(activeItem, {
      name: '',
      phone: '',
      quantity: qty,
      scheduledDate:
        selectedTab === 'meal' ? 'Pavitra Shraadh Drive (26 Sep - 10 Oct)' : undefined,
      hospitalName: 'State Cancer Medical College (RUHS), Jaipur',
      occasionNote:
        selectedTab === 'meal'
          ? 'Pavitra Shraadh Pitru Bhojan Seva (कैंसर अस्पताल भोजन सेवा)'
          : undefined,
    });
  };

  const handleBookShraadhDate = (entry: ShraadhDateEntry) => {
    onOpenSponsorModal(mealItem, {
      name: '',
      phone: '',
      quantity: 20,
      scheduledDate: `${entry.displayDate} (${entry.tithi})`,
      hospitalName: 'State Cancer Medical College (RUHS), Jaipur',
      occasionNote: `Pavitra Shraadh Pitru Bhojan Seva (${entry.tithi})`,
    });
  };

  const unitRate = activeItem.price || 70;

  const presetTiers = [
    {
      units: 10,
      amount: 10 * unitRate,
      label: `10 ${activeItem.unitLabel || 'Units'}`,
      tag: selectedTab === 'meal' ? '🕊️ Daycare Ward Shraadh Bhojan' : 'Daycare Recovery Pool',
      desc:
        selectedTab === 'meal'
          ? '10 cancer chemotherapy patients & attendants served warm fresh meals in memory of departed elders.'
          : 'Provides 10 bedside units directly to cancer chemotherapy patients.',
      popular: false,
    },
    {
      units: 20,
      amount: 20 * unitRate,
      label: `20 ${activeItem.unitLabel || 'Units'}`,
      tag: selectedTab === 'meal' ? '⭐ Most Chosen Shraadh Seva' : '⭐ Most Popular Seva',
      desc:
        selectedTab === 'meal'
          ? 'Comprehensive bedside meal distribution for an entire chemo recovery ward at RUHS Hospital.'
          : 'Comprehensive bedside relief for an entire recovery floor at RUHS Hospital.',
      popular: true,
    },
    {
      units: 50,
      amount: 50 * unitRate,
      label: `50 ${activeItem.unitLabel || 'Units'}`,
      tag: selectedTab === 'meal' ? 'Full Chemo Ward Memorial Bhojan' : 'Full Ward Sponsorship',
      desc:
        selectedTab === 'meal'
          ? 'Covers dinner/lunch meal boxes across pediatric & adult oncology wards for 50 patients & families.'
          : 'Covers bedside distribution across pediatric, adult oncology & chemo wards.',
      popular: false,
    },
    {
      units: 100,
      amount: 100 * unitRate,
      label: `100 ${activeItem.unitLabel || 'Units'}`,
      tag: selectedTab === 'meal' ? 'Grand Shraadh Memorial Mahabhoj' : 'Grand Hospital Drive',
      desc:
        selectedTab === 'meal'
          ? 'Dedicated 100-meal mega hospital drive with ancestor dedication card on volunteer trolleys.'
          : 'Dedicated mega hospital bedside drive with family dedication card on volunteer trolleys.',
      popular: false,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6 animate-in fade-in duration-300 pb-16">
      {/* 1. TOP BREADCRUMB & QUICK ACTIONS */}
      <div className="max-w-7xl mx-auto w-full pt-4 px-3 sm:px-6 flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-neutral-800 font-bold text-xs sm:text-sm px-4 py-2 rounded-full border border-neutral-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-[#084c36] group-hover:-translate-x-1 transition-transform" />
          <span>{t.ekadashiBack || 'Back to Main Portal'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* WhatsApp Direct Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-3.5 py-2 rounded-full shadow-xs transition-all cursor-pointer active:scale-95"
            title="Share Direct Hospital Seva Link on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline">Share on WhatsApp</span>
            <span className="sm:hidden">Share</span>
          </button>

          {/* Copy Direct Link Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs px-3.5 py-2 rounded-full border border-neutral-300 shadow-xs transition-all cursor-pointer active:scale-95"
            title="Copy Direct Link to Clipboard"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-600" />
                <span className="hidden sm:inline">Copy Direct Link</span>
                <span className="sm:hidden">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SHRAADH PAKSHA TOP ANNOUNCEMENT BANNER */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div
          onClick={() => {
            setSelectedTab('meal');
            setTimeout(() => {
              document.getElementById('shraadh-calendar')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-3 cursor-pointer hover:shadow-lg transition-all border border-amber-400/30 group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce shrink-0">🍱</span>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  🔴 Live Now: 26 Sep - 10 Oct
                </span>
                <span className="text-amber-200 text-xs font-semibold hidden sm:inline">
                  Pavitra Shraadh Paksha
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold mt-0.5 text-white">
                RUHS कैंसर अस्पताल में प्रतिदिन श्राद्ध भोजन सेवा: 26, 27, 28, 29 सितंबर संपन्न • आगामी तिथियों की बुकिंग जारी
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl border border-white/20 whitespace-nowrap group-hover:translate-x-1 transition-transform shrink-0">
            <span>श्राद्ध कैलेंडर देखें</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 2. THREE-IN-ONE SEVA SELECTION TABS */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs font-bold text-neutral-600 px-3 hidden sm:inline">
            Choose Seva Item:
          </span>
          <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto flex-1 max-w-2xl">
            {/* Tab 1: Nariyal Pani */}
            <button
              onClick={() => setSelectedTab('nariyal')}
              className={`py-2 px-2.5 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedTab === 'nariyal'
                  ? 'bg-[#084c36] text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span className="text-base leading-none">🥥</span>
              <span className="truncate">Nariyal Pani (₹65)</span>
            </button>

            {/* Tab 2: Taaza Anaar Juice */}
            <button
              onClick={() => setSelectedTab('anar-juice')}
              className={`py-2 px-2.5 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedTab === 'anar-juice'
                  ? 'bg-[#b91c1c] text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span className="text-base leading-none">🥤</span>
              <span className="truncate">Anaar Juice (₹70)</span>
            </button>

            {/* Tab 3: Khana / Meal Box */}
            <button
              onClick={() => setSelectedTab('meal')}
              className={`py-2 px-2.5 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 relative ${
                selectedTab === 'meal'
                  ? 'bg-[#c2410c] text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span className="text-base leading-none">🍱</span>
              <span className="truncate">श्राद्ध भोजन (₹70)</span>
              <span className="absolute -top-2 -right-1 bg-amber-400 text-neutral-950 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full uppercase shadow-xs">
                Live
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. HERO DYNAMIC DIRECT DONATION BANNER */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div
          className={`rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-2xl border-2 relative overflow-hidden transition-all duration-500 ${
            selectedTab === 'anar-juice'
              ? 'bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#3f0808] border-rose-500/40'
              : selectedTab === 'meal'
              ? 'bg-gradient-to-br from-[#431407] via-[#7c2d12] to-[#270f07] border-amber-500/40'
              : 'bg-gradient-to-br from-[#063b2a] via-[#084c36] to-[#032419] border-emerald-500/30'
          }`}
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#FDB813] text-neutral-950 font-mono font-bold text-[11px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                  <span>
                    {selectedTab === 'nariyal' && '🥥 100% Direct Bedside Seva'}
                    {selectedTab === 'anar-juice' && '🥤 Pure Cold-Pressed Juice Seva'}
                    {selectedTab === 'meal' && '🕊️ पवित्र श्राद्ध पक्ष (26 Sep - 10 Oct) • 100% प्रत्यक्ष भोजन सेवा'}
                  </span>
                </span>
                <span className="bg-white/20 text-white border border-white/30 text-xs px-3 py-1 rounded-full font-semibold">
                  Unit Rate: ₹{unitRate} / {activeItem.unitLabel || 'Unit'}
                </span>
                <span className="bg-white/10 text-amber-300 text-xs px-3 py-1 rounded-full font-mono border border-white/15">
                  🛡️ 80G Tax Exemption
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {selectedTab === 'nariyal' && 'Government Cancer Hospital Bedside Nariyal Pani Seva'}
                {selectedTab === 'anar-juice' && 'State Cancer Hospital Pure Taaza Anaar Juice Seva'}
                {selectedTab === 'meal' && 'कैंसर अस्पताल पवित्र श्राद्ध पक्ष दैनिक पौष्टिक भोजन सेवा'}
              </h1>

              <p className="text-xs sm:text-base text-neutral-100/90 leading-relaxed font-normal">
                {selectedTab === 'nariyal' &&
                  'Direct bedside distribution of farm-fresh green tender coconuts cut live in front of cancer chemotherapy patients at State Cancer Medical College (RUHS) & SMS Hospital, Jaipur.'}
                {selectedTab === 'anar-juice' &&
                  '100% pure cold-pressed fresh pomegranate (taaza anaar) juice prepared without water or sugar, restoring essential hemoglobin, iron, and platelets for patients undergoing intensive chemotherapy.'}
                {selectedTab === 'meal' &&
                  '26 सितंबर से 10 अक्टूबर तक RUHS राजकीय कैंसर अस्पताल, जयपुर में कैंसर पेशेंट्स व जरूरतमंद तीमारदारों को पितरों की आत्मशांति हेतु प्रतिदिन ताज़ा व पौष्टिक भोजन (4 रोटी, दाल, मौसमी सब्ज़ी, चावल व सलाद) वितरित किया जा रहा है। 26 से 29 सितंबर की सेवा संपन्न हो चुकी है, आगामी तिथियों के लिए भोजन बुक कराएं।'}
              </p>

              {/* Verified Metrics Counter */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-center">
                  <div className="text-lg sm:text-2xl font-extrabold text-[#FDB813] font-mono">
                    {selectedTab === 'nariyal' && '194,700+'}
                    {selectedTab === 'anar-juice' && '48,000+'}
                    {selectedTab === 'meal' && `${totalMealsServedSoFar.toLocaleString('en-IN')}+`}
                  </div>
                  <div className="text-[10px] sm:text-xs text-neutral-300">
                    {selectedTab === 'nariyal' && 'Coconuts Cut Bedside'}
                    {selectedTab === 'anar-juice' && 'Glasses Served Bedside'}
                    {selectedTab === 'meal' && 'श्राद्ध भोजन संपन्न (26-29 Sep)'}
                  </div>
                </div>
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-center">
                  <div className="text-lg sm:text-2xl font-extrabold text-white font-mono">₹{unitRate}</div>
                  <div className="text-[10px] sm:text-xs text-neutral-300">
                    {selectedTab === 'meal' ? 'प्रति पौष्टिक मील बॉक्स' : 'Pure Unit Rate'}
                  </div>
                </div>
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-center">
                  <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono">
                    {selectedTab === 'meal' ? '15 दिन' : '100%'}
                  </div>
                  <div className="text-[10px] sm:text-xs text-neutral-300">
                    {selectedTab === 'meal' ? 'प्रतिदिन RUHS अस्पताल सेवा' : 'Direct Bedside Delivery'}
                  </div>
                </div>
              </div>

              {/* Instant Donate Quick Trigger */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => handleDonatePreset(20)}
                  className="bg-[#FDB813] hover:bg-amber-400 text-neutral-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 text-neutral-950 fill-neutral-950" />
                  <span>
                    {selectedTab === 'meal'
                      ? `Sponsor 20 Shraadh Meals (₹${(20 * unitRate).toLocaleString('en-IN')})`
                      : `Sponsor 20 ${activeItem.unitLabel || 'Units'} (₹${(20 * unitRate).toLocaleString('en-IN')})`}
                  </span>
                </button>

                <button
                  onClick={() => handleDonatePreset(10)}
                  className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-2xl border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Sponsor 10 (₹{(10 * unitRate).toLocaleString('en-IN')})</span>
                </button>
              </div>
            </div>

            {/* Right Column: Authentic Ground Photos */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/25 shadow-2xl group bg-neutral-950 aspect-4/3 sm:aspect-auto sm:h-64">
                <img
                  src={activeItem.image || '/uploads/nariyal_pani_fresh_coconut.jpg'}
                  alt={activeItem.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 bg-[#084c36]/90 backdrop-blur-md text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-emerald-400/40 shadow-xs flex items-center gap-1">
                  <span>
                    {selectedTab === 'nariyal' && '🥥 100% Farm-Sourced Whole Coconuts'}
                    {selectedTab === 'anar-juice' && '🥤 Fresh Cold-Pressed Pure Pomegranate'}
                    {selectedTab === 'meal' && '🍱 100% ताज़ा शुद्ध पौष्टिक थाली'}
                  </span>
                </div>
                <div className="absolute bottom-3 inset-x-3 text-left">
                  <div className="text-white font-bold text-xs sm:text-sm leading-snug">
                    {selectedTab === 'nariyal' && '"Cut live bedside with sterile eco-straws"'}
                    {selectedTab === 'anar-juice' && '"Zero sugar, zero water added - 100% pure nutrition"'}
                    {selectedTab === 'meal' && '"4 रोटी, दाल, मौसमी सब्ज़ी, चावल व सलाद - पितरों के निमित्त"'}
                  </div>
                  <div className="text-[11px] text-emerald-200 mt-0.5">
                    Served directly at RUHS & SMS Hospital oncology wards, Jaipur.
                  </div>
                </div>
              </div>

              {/* Photo 2: Hospital Seva Trolley */}
              <div className="bg-black/35 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-400/40 bg-neutral-900">
                  <img
                    src="/uploads/ruhs_hospital_nariyal_seva_trolley.jpg"
                    alt="RUHS Hospital Bedside Seva Trolley"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                    🏥 RUHS Oncology Ward Trolley
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5 truncate">
                    Daily Bedside Rounds & Har Ekadashi
                  </h4>
                  <p className="text-[11px] text-emerald-100/80 line-clamp-1 mt-0.5">
                    Direct on-ground relief for cancer fighters & child warriors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.5 15-DAY SHRAADH DAILY MEAL SEVA TRACKER & CALENDAR (26 SEP - 10 OCT) */}
      {selectedTab === 'meal' && (
        <section id="shraadh-calendar" className="max-w-7xl mx-auto w-full px-3 sm:px-6">
          <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-stone-50 rounded-3xl p-5 sm:p-8 border-2 border-amber-300/80 shadow-lg text-left space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-amber-600 text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    🕊️ 26 सितंबर - 10 अक्टूबर 2026
                  </span>
                  <span className="bg-white text-amber-900 border border-amber-300 text-xs px-3 py-1 rounded-full font-bold">
                    पवित्र श्राद्ध पक्ष पितृ भोजन सेवा
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold border border-emerald-300">
                    🏥 RUHS कैंसर अस्पताल, जयपुर
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                  15 दिवसीय दैनिक श्राद्ध भोजन सेवा कैलेंडर व ट्रैकर
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-3xl mt-1 leading-relaxed">
                  शास्त्रों में पितृ पक्ष में अस्पताल में भर्ती असहाय, निर्धन कैंसर मरीजों व उनके परिजनों को भोजन कराना महापुण्य माना गया है। RUHS कैंसर अस्पताल में 26 सितंबर से 10 अक्टूबर तक प्रतिदिन 400-500 मरीजों व तीमारदारों को ताज़ा पौष्टिक भोजन (4 रोटी, दाल, सब्ज़ी, चावल, सलाद) कराया जा रहा है।
                </p>
              </div>

              {/* Live Status Ribbon */}
              <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs shrink-0 flex flex-col gap-2 min-w-[240px]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">कुल श्राद्ध अवधि:</span>
                  <strong className="text-neutral-900 font-mono">15 दिन</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>सेवा संपन्न:</span>
                  </span>
                  <strong className="text-emerald-800 font-mono font-bold">
                    {completedEntries.length} दिन ({totalMealsServedSoFar.toLocaleString('en-IN')}+ भोजन)
                  </strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-700 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>बुकिंग उपलब्ध:</span>
                  </span>
                  <strong className="text-amber-800 font-mono font-bold">
                    {openEntries.length} दिन शेष
                  </strong>
                </div>
                <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-500"
                    style={{
                      width: `${Math.round((completedEntries.length / SHRAADH_MEAL_DATES.length) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-600 hidden sm:inline">फिल्टर:</span>
                <div className="flex items-center bg-white p-1 rounded-xl border border-neutral-300">
                  <button
                    onClick={() => setShraadhFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      shraadhFilter === 'all'
                        ? 'bg-[#084c36] text-white shadow-xs'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    सभी 15 दिन ({SHRAADH_MEAL_DATES.length})
                  </button>
                  <button
                    onClick={() => setShraadhFilter('open')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      shraadhFilter === 'open'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>🟢 उपलब्ध तिथियां</span>
                    <span className="text-[10px] opacity-90 font-mono">({openEntries.length})</span>
                  </button>
                  <button
                    onClick={() => setShraadhFilter('completed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      shraadhFilter === 'completed'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>✅ संपन्न सेवाएं</span>
                    <span className="text-[10px] opacity-90 font-mono">({completedEntries.length})</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-neutral-500 italic">
                *तारीख अनुसार संपन्न सेवा स्वतः अपडेट होती है (26, 27, 28, 29 सितंबर पूर्ण)।
              </div>
            </div>

            {/* 15 Dates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredShraadhDates.map((entry) => {
                const isCompleted = entry.dateStr <= todayIST;
                const isToday = entry.dateStr === todayIST;

                return (
                  <div
                    key={entry.dateStr}
                    className={`rounded-2xl p-4 border-2 transition-all flex flex-col justify-between relative ${
                      isCompleted
                        ? 'bg-emerald-50/50 border-emerald-300 shadow-2xs'
                        : 'bg-white border-amber-300 hover:border-amber-400 hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Date & Status Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className={`w-4 h-4 ${isCompleted ? 'text-emerald-700' : 'text-amber-600'}`} />
                          <span className="font-bold text-xs sm:text-sm text-neutral-900 font-mono">
                            {entry.displayDate}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-medium">
                            ({entry.hindiDay})
                          </span>
                        </div>

                        {isCompleted ? (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>{isToday ? '✅ आज की सेवा संपन्न' : '✅ सेवा संपन्न'}</span>
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shrink-0 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>🟢 बुकिंग खुली है</span>
                          </span>
                        )}
                      </div>

                      {/* Tithi Title & Special Highlight */}
                      <div className="mt-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-sm sm:text-base font-extrabold text-neutral-950">
                            {entry.tithi}
                          </h4>
                          {entry.specialTag && (
                            <span className="bg-[#FDB813] text-neutral-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                              {entry.specialTag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-600 mt-0.5">
                          {entry.subTitle}
                        </p>
                      </div>

                      {/* Details Box */}
                      <div className="mt-3 bg-neutral-50 rounded-xl p-2.5 border border-neutral-200 text-xs space-y-1">
                        <div className="flex items-center justify-between text-neutral-700">
                          <span>भोजन मेनू:</span>
                          <span className="font-semibold text-neutral-900">4 रोटी, दाल, सब्ज़ी, चावल, सलाद</span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-700">
                          <span>अस्पताल:</span>
                          <span className="font-semibold text-neutral-900">RUHS कैंसर अस्पताल</span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-700">
                          <span>दर / रेट:</span>
                          <span className="font-bold text-neutral-900 font-mono">₹70 / मील बॉक्स</span>
                        </div>
                        {isCompleted && (
                          <div className="pt-1 border-t border-emerald-200 text-emerald-800 font-semibold flex items-center justify-between">
                            <span>बेडसाइड वितरित भोजन:</span>
                            <span className="font-bold font-mono">{entry.defaultDeliveredCount || 450} भोजन</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="mt-4 pt-2">
                      {isCompleted ? (
                        <div className="w-full bg-emerald-100/80 text-emerald-800 text-xs font-bold py-2 px-3 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5 text-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>सेवा संपन्न ({entry.defaultDeliveredCount || 450} भोजन वितरित)</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleBookShraadhDate(entry)}
                          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                          <span>इस तिथि पर भोजन कराएं (₹70/मील)</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Assistance & Memorial Note */}
            <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-950">
              <div className="text-left space-y-0.5">
                <span className="font-bold block">🕊️ अपने पूर्वजों / माता-पिता के नाम से विशेष संकल्प:</span>
                <p className="text-amber-900/90 text-[11px]">
                  दान करते समय अपने पूर्वजों का नाम अवश्य दर्ज करें। सेवा के समय स्वयंसेवक ट्रॉली पर संकल्प नाम अंकित कर भोजन वितरण करते हैं।
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonatePreset(50)}
                className="bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-2 px-4 rounded-xl text-xs whitespace-nowrap cursor-pointer shadow-xs active:scale-95"
              >
                पूरा वार्ड प्रायोजित करें (50 भोजन - ₹3,500)
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. THREE SEVA INITIATIVE CARDS (1-TAP CHOOSE AND DONATE) */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950">
            Our 3 Hospital Bedside Seva Tracks
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Choose what you want to sponsor today for cancer patients at RUHS and SMS Hospitals:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Nariyal Pani */}
          <div
            onClick={() => setSelectedTab('nariyal')}
            className={`rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
              selectedTab === 'nariyal'
                ? 'bg-emerald-50/70 border-[#084c36] shadow-md ring-2 ring-[#084c36]/20'
                : 'bg-white border-neutral-200 hover:border-emerald-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🥥</span>
                <span className="text-xs font-black font-mono text-[#084c36] bg-emerald-100 px-2 py-0.5 rounded-full">
                  ₹65 / Coconut
                </span>
              </div>
              <h3 className="text-sm font-bold text-neutral-900">
                Fresh Whole Tender Coconut (नारियल पानी)
              </h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Natural sterile electrolyte hydration cut live bedside. Relieves chemotherapy-induced nausea and protects kidney function.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenSponsorModal(coconutItem, { name: '', phone: '', quantity: 20 });
              }}
              className="mt-4 w-full bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Sponsor 20 Coconuts (₹1,300)</span>
            </button>
          </div>

          {/* Card 2: Anaar Juice */}
          <div
            onClick={() => setSelectedTab('anar-juice')}
            className={`rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
              selectedTab === 'anar-juice'
                ? 'bg-rose-50/70 border-rose-600 shadow-md ring-2 ring-rose-500/20'
                : 'bg-white border-neutral-200 hover:border-rose-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🥤</span>
                <span className="text-xs font-black font-mono text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  ₹70 / Glass
                </span>
              </div>
              <h3 className="text-sm font-bold text-neutral-900">
                100% Pure Anaar Juice (अनार का ताज़ा जूस)
              </h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Cold-pressed from ruby-red pomegranates with zero added sugar or water. Clinically proven to raise hemoglobin and platelets.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenSponsorModal(anarItem, { name: '', phone: '', quantity: 20 });
              }}
              className="mt-4 w-full bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Sponsor 20 Glasses (₹1,400)</span>
            </button>
          </div>

          {/* Card 3: Khana / Meal Box */}
          <div
            onClick={() => setSelectedTab('meal')}
            className={`rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
              selectedTab === 'meal'
                ? 'bg-amber-50/70 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                : 'bg-white border-neutral-200 hover:border-amber-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🍱</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded">
                    26 Sep - 10 Oct
                  </span>
                  <span className="text-xs font-black font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    ₹70 / Meal Box
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-neutral-900">
                Wholesome Hospital Meal Box (श्राद्ध भोजन सेवा)
              </h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                26 सितंबर से 10 अक्टूबर तक प्रतिदिन कैंसर मरीजों व परिजनों को 4 रोटी, दाल, मौसमी सब्ज़ी, चावल व सलाद का ताज़ा भोजन। पूर्वजों के निमित्त विशेष सेवा।
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenSponsorModal(mealItem, {
                  name: '',
                  phone: '',
                  quantity: 20,
                  scheduledDate: 'Pavitra Shraadh Drive (26 Sep - 10 Oct)',
                  hospitalName: 'State Cancer Medical College (RUHS), Jaipur',
                  occasionNote: 'Pavitra Shraadh Pitru Bhojan Seva (कैंसर अस्पताल भोजन सेवा)',
                });
              }}
              className="mt-4 w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Sponsor 20 Shraadh Meals (₹1,400)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. 1-CLICK QUICK SPONSORSHIP TIERS */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h3 className="text-base sm:text-xl font-bold text-neutral-900">
            Select Sponsorship Quantity for {activeItem.name.split('(')[0].trim()}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Choose a pre-calculated package or enter your custom count:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {presetTiers.map((tier) => (
            <motion.div
              key={tier.units}
              whileHover={{ y: -4 }}
              onClick={() => handleDonatePreset(tier.units)}
              className={`rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer flex flex-col justify-between relative ${
                tier.popular
                  ? 'bg-gradient-to-b from-amber-50/60 to-white border-amber-300 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-white border-neutral-200/90 shadow-xs hover:shadow-md'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-2.5 right-4 bg-[#084c36] text-white text-[9px] font-bold font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Most Chosen Seva
                </span>
              )}

              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-base sm:text-lg font-black text-neutral-900">
                    {tier.label}
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-[#084c36] font-mono">
                    ₹{tier.amount.toLocaleString('en-IN')}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md inline-block mb-2">
                  {tier.tag}
                </span>

                <p className="text-xs text-neutral-600 leading-snug">
                  {tier.desc}
                </p>
              </div>

              <button
                type="button"
                className="mt-4 w-full bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Sponsor {tier.units} Units Now</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Custom Quantity Stepper Box */}
        <div className="mt-4 bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
              Need a Custom Count of {activeItem.unitLabel || 'Units'}?
            </h4>
            <p className="text-[11px] text-neutral-500">
              Enter any number of units you wish to sponsor for the oncology wards.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="flex items-center bg-neutral-100 rounded-xl p-1 border border-neutral-300">
              <button
                type="button"
                onClick={() => setCustomQty((q) => (typeof q === 'number' ? Math.max(1, q - 5) : 5))}
                className="w-8 h-8 rounded-lg bg-white hover:bg-neutral-200 font-bold text-neutral-700 flex items-center justify-center text-sm cursor-pointer shadow-2xs"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={customQty}
                onChange={(e) => setCustomQty(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value, 10)))}
                className="w-16 text-center font-bold text-sm bg-transparent focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setCustomQty((q) => (typeof q === 'number' ? q + 5 : 25))}
                className="w-8 h-8 rounded-lg bg-white hover:bg-neutral-200 font-bold text-neutral-700 flex items-center justify-center text-sm cursor-pointer shadow-2xs"
              >
                +
              </button>
            </div>

            <button
              onClick={handleDonateCustom}
              className="bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>
                Sponsor {customQty || 20} Units (₹{((typeof customQty === 'number' ? customQty : 20) * unitRate).toLocaleString('en-IN')})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. SHARE THIS DIRECT CLIENT DONATION LINK */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-50 via-[#f0fdf4] to-amber-50 rounded-2xl p-4 sm:p-5 border border-emerald-300/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1">
              <Share2 className="w-3 h-3" />
              <span>Direct Client Donation Link</span>
            </span>
            <h4 className="text-sm sm:text-base font-bold text-neutral-900">
              Share Direct Hospital Seva Link With Donors & Friends
            </h4>
            <p className="text-xs text-neutral-600">
              Donors who click this link bypass all home page browsing and open the direct donation window instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs font-mono text-neutral-700 select-all focus:outline-none min-w-[240px]"
            />
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. CLINICAL IMPORTANCE IN CANCER WARDS */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-neutral-200/90 shadow-sm text-left space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#084c36] flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                Why Bedside Nutrition Matters During Chemotherapy
              </h3>
              <p className="text-[11px] text-neutral-500">
                Approved by hospital protocols for direct patient hydration and recovery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 space-y-1">
              <span className="text-xl">🥥</span>
              <h4 className="text-xs font-bold text-neutral-900">Coconut Electrolyte Balance</h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Chemotherapy causes severe oral mucositis and nausea. Fresh coconut water is sterile, hypoallergenic, and provides bio-available potassium to protect renal function.
              </p>
            </div>

            <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 space-y-1">
              <span className="text-xl">🥤</span>
              <h4 className="text-xs font-bold text-neutral-900">Anaar Juice Platelet & Iron</h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Cold-pressed fresh pomegranate juice is rich in antioxidants, polyphenols, and iron, naturally aiding bone marrow recovery and boosting blood counts during treatment.
              </p>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100 space-y-1">
              <span className="text-xl">🍱</span>
              <h4 className="text-xs font-bold text-neutral-900">Warm Wholesome Meal Boxes</h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Patients and needy families coming from remote villages often spend their last rupees on medicines. Wholesome warm meals keep their physical strength intact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. PARTNER HOSPITALS */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h3 className="text-base sm:text-xl font-bold text-neutral-900">
            Active Verified Hospital Relief Nodes in Jaipur
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Regular on-ground bedside delivery conducted with official hospital ward permission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {hospitals.slice(0, 3).map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#084c36] flex items-center justify-center shrink-0 border border-emerald-200">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-[9px] font-bold text-emerald-800 uppercase font-mono">
                  {hosp.category}
                </span>
                <h4 className="text-xs font-bold text-neutral-900 truncate">
                  {hosp.name}
                </h4>
                <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#FDB813]" />
                  <span className="truncate">{hosp.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. TRANSPARENCY & 80G TAX EXEMPTION FOOTNOTE */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 text-center">
        <div className="bg-neutral-100 rounded-2xl p-4 text-xs text-neutral-600 flex flex-wrap items-center justify-center gap-4">
          <span className="font-semibold text-neutral-900">🏛️ {OFFICIAL_INFO.name}</span>
          <span>•</span>
          <span>CIN: {OFFICIAL_INFO.cinNumber}</span>
          <span>•</span>
          <span>{OFFICIAL_INFO.taxExemption}</span>
          <span>•</span>
          <span className="text-emerald-800 font-bold">Helpline: {OFFICIAL_INFO.phone}</span>
        </div>
      </div>
    </div>
  );
};
