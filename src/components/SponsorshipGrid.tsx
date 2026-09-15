import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, ArrowUpRight, X, Sparkles, Plus, Minus } from 'lucide-react';
import { Gauge } from './Gauge';
import { DRIVE_ITEMS } from '../data/mockData';
import type { DriveItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SponsorshipGridProps {
  onTriggerCheckout: (item?: DriveItem, initialData?: { name: string; phone: string; quantity: number }) => void;
  onCloseMatrix?: () => void;
  onOpenCustomDateModal?: () => void;
  driveItems?: DriveItem[];
}

export const SponsorshipGrid: React.FC<SponsorshipGridProps> = ({
  onTriggerCheckout,
  onCloseMatrix,
  onOpenCustomDateModal,
  driveItems,
}) => {
  const { language } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State for Card 1 toggle pill (Coconut vs Immunity Packs)
  const [card1ActivePill, setCard1ActivePill] = useState<'coconut' | 'juice'>('coconut');
  
  // State for Card 3 toggle pill (Nutritional Meals vs Anar Juice)
  const [card3ActivePill, setCard3ActivePill] = useState<'meals' | 'anar'>('meals');

  const items = driveItems && driveItems.length > 0 ? driveItems : DRIVE_ITEMS;
  const card1Item = items.find((i) => i.id === 'coconut-water') || items[0];
  const card3MealItem = items.find((i) => i.id === 'pomegranate-meal') || items[1] || items[0];
  const card3AnarItem = items.find((i) => i.id === 'anar-juice') || items[2] || items[0];
  const card3Item = card3ActivePill === 'meals' ? card3MealItem : card3AnarItem;

  // State for Card 2 in-card fast inputs
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [card2Quantity, setCard2Quantity] = useState(20);
  const [card2ItemType, setCard2ItemType] = useState('Fresh Whole Tender Coconut (RUHS Bedside)');
  const [selectedDriveItem, setSelectedDriveItem] = useState<DriveItem>(card1Item);
  const [card2Error, setCard2Error] = useState('');

  const immunityPacksItem: DriveItem = items.find((i) => i.id === 'immunity-packs') || {
    ...card1Item,
    id: 'immunity-packs',
    name: 'Immunity Juice Packs (Citrus & Anar)',
    tagline: 'Cold-Pressed Citrus & Anar • Chemo & Dialysis Support',
    category: 'hospital',
    price: 65,
    unitLabel: 'Juice Pack',
    targetCount: '100K Target',
    deliveredCount: '84K Delivered',
    percentage: 84,
    badge: 'Pure Citrus & Anar',
    image: '/uploads/immunity_packs_citrus_anar.jpg',
  };

  const anarJuiceItem: DriveItem = card3AnarItem;

  // Card 1 Dynamic Data based on active pill
  const card1Data = card1ActivePill === 'coconut' ? {
    title: card1Item.name,
    tagline: card1Item.tagline,
    price: card1Item.price,
    unit: `/${card1Item.unitLabel || 'Coconut'}`,
    gaugeValue: card1Item.percentage || 91,
    delivered: card1Item.deliveredCount,
    target: card1Item.targetCount,
    badge: card1Item.badge,
    image: card1Item.image || '/uploads/nariyal_pani_fresh_coconut.jpg',
    alt: card1Item.name,
    description: card1Item.description,
  } : {
    title: immunityPacksItem.name,
    tagline: immunityPacksItem.tagline,
    price: immunityPacksItem.price,
    unit: `/${immunityPacksItem.unitLabel || 'Pack'}`,
    gaugeValue: immunityPacksItem.percentage || 84,
    delivered: immunityPacksItem.deliveredCount || '84K Delivered',
    target: immunityPacksItem.targetCount || '100K Target',
    badge: immunityPacksItem.badge || 'Pure Citrus & Anar',
    image: immunityPacksItem.image || '/uploads/immunity_packs_citrus_anar.jpg',
    alt: immunityPacksItem.name,
    description: immunityPacksItem.description,
  };

  // Card 3 Dynamic Data based on active pill
  const card3Data = card3ActivePill === 'meals' ? {
    title: card3MealItem.name,
    tagline: card3MealItem.tagline,
    price: card3MealItem.price,
    unit: `/${card3MealItem.unitLabel || 'Meal'}`,
    gaugeValue: card3MealItem.percentage || 68,
    delivered: card3MealItem.deliveredCount,
    target: card3MealItem.targetCount,
    badge: card3MealItem.badge,
    image: card3MealItem.image || '/uploads/slum_packed_thali_tiffin.jpg',
    alt: card3MealItem.name,
    description: card3MealItem.description,
  } : {
    title: card3AnarItem.name,
    tagline: card3AnarItem.tagline,
    price: card3AnarItem.price,
    unit: `/${card3AnarItem.unitLabel || 'Bottle'}`,
    gaugeValue: card3AnarItem.percentage || 80,
    delivered: card3AnarItem.deliveredCount,
    target: card3AnarItem.targetCount,
    badge: card3AnarItem.badge || '100% Pure Pomegranate',
    image: card3AnarItem.image || 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=600&q=80',
    alt: card3AnarItem.name,
    description: card3AnarItem.description,
  };

  // Direct 1-Click Sponsorship Launcher
  const handleDirectSponsor = (item: DriveItem, _causeName?: string, defaultQty: number = 20) => {
    onTriggerCheckout(item, {
      name: donorName.trim() || '',
      phone: donorPhone.trim() || '',
      quantity: defaultQty,
    });
  };

  const handleOpenForm = (item: DriveItem, causeName: string) => {
    setSelectedDriveItem(item);
    setCard2ItemType(causeName);
    setCard2Error('');
    setIsFormOpen(true);
  };

  const handleCard2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) {
      setCard2Error('Please enter your name');
      return;
    }
    if (donorPhone.length < 10) {
      setCard2Error('Enter valid 10-digit phone');
      return;
    }
    setCard2Error('');
    onTriggerCheckout(selectedDriveItem, {
      name: donorName,
      phone: donorPhone,
      quantity: card2Quantity,
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCard2Error('');
  };

  const getUnitPrice = () => {
    if (card2ItemType.includes('65') || card2ItemType.includes('Coconut') || card2ItemType.includes('Immunity')) return 65;
    if (card2ItemType.includes('899') || card2ItemType.includes('250') || card2ItemType.includes('School') || card2ItemType.includes('Bag')) return 899;
    if (card2ItemType.includes('4200') || card2ItemType.includes('Wheelchair')) return 4200;
    if (card2ItemType.includes('5500') || card2ItemType.includes('Sewing')) return 5500;
    if (card2ItemType.includes('450') || card2ItemType.includes('First Aid') || card2ItemType.includes('Emergency') || card2ItemType.includes('STEM')) return 450;
    return 70;
  };

  return (
    <div className="px-3 sm:px-4 bg-[#f5f2ee]/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 w-full max-w-[960px] mx-auto border border-neutral-300/80 shadow-md relative">
      {/* Top Header Label & Close Matrix Button */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#084c36] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 font-sans">
            Fast Bedside Seva Matrix
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenCustomDateModal && (
            <button
              type="button"
              onClick={onOpenCustomDateModal}
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 text-[11px] font-extrabold px-3 py-1 rounded-full border border-amber-500/40 shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>📅</span>
              <span>Custom Date & Basket Builder</span>
            </button>
          )}

          <span className="text-[11px] text-neutral-500 font-medium hidden md:inline-block">
            Section 8 Verified • Rajasthan Government Hospitals
          </span>

          {onCloseMatrix && (
            <button
              type="button"
              onClick={onCloseMatrix}
              title="Minimize matrix"
              className="text-neutral-500 hover:text-neutral-900 bg-white/90 hover:bg-white p-1 rounded-full border border-neutral-200 shadow-xs transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch">
        
        {/* Card 1 — Fresh Coconut & Immunity Packs with Real Photo Preview */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm border border-neutral-200/90 hover:shadow-md hover:border-emerald-800/30 transition-all duration-300 group">
          <div>
            {/* Real Visual Image Thumbnail Header */}
            <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden mb-3 border border-neutral-200 bg-neutral-900 shadow-xs">
              <img
                src={card1Data.image}
                alt={card1Data.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-700/90 backdrop-blur-xs px-2 py-0.5 rounded">
                  {card1ActivePill === 'coconut' ? 'Live Bedside Cut' : 'Chemo Support'}
                </span>
                <span className="text-[11px] font-bold text-amber-300">
                  Jaipur Govt Hospitals
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug group-hover:text-[#084c36] transition-colors">
                {card1Data.title}
              </h3>
              <p className="text-xs font-medium text-[#084c36] mt-0.5">
                {card1Data.tagline}
              </p>
            </div>

            {/* Gauge Component with Calibrated Stats */}
            <div className="my-2.5">
              <Gauge
                value={card1Data.gaugeValue}
                color="#084c36"
                showLabels={true}
                labelLeft={card1Data.delivered}
                labelRight={card1Data.target}
              />
            </div>
          </div>

          <div>
            {/* Toggle pill bottom: Fresh Coconut / Immunity Packs */}
            <div className="bg-neutral-100 rounded-full p-1 flex items-center text-xs font-medium text-neutral-600 mb-2.5">
              <button
                type="button"
                onClick={() => setCard1ActivePill('coconut')}
                className={`flex-1 py-1 px-2 rounded-full text-center transition-all cursor-pointer ${
                  card1ActivePill === 'coconut'
                    ? 'bg-[#084c36] text-white shadow-xs font-bold'
                    : 'hover:text-neutral-900 text-neutral-700'
                }`}
              >
                {language === 'hi' ? '🥥 ताजा नारियल' : language === 'hinglish' ? '🥥 Fresh Nariyal' : '🥥 Fresh Coconut'}
              </button>
              <button
                type="button"
                onClick={() => setCard1ActivePill('juice')}
                className={`flex-1 py-1 px-2 rounded-full text-center transition-all cursor-pointer ${
                  card1ActivePill === 'juice'
                    ? 'bg-[#084c36] text-white shadow-xs font-bold'
                    : 'hover:text-neutral-900 text-neutral-700'
                }`}
              >
                {language === 'hi' ? '🍊 इम्युनिटी पैक' : language === 'hinglish' ? '🍊 Immunity Packs' : '🍊 Immunity Packs'}
              </button>
            </div>

            {/* 1-Click Working Sponsor Buttons */}
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => handleDirectSponsor(card1ActivePill === 'coconut' ? card1Item : immunityPacksItem, card1Data.title, 20)}
                className="flex items-center justify-center gap-1 bg-[#084c36] hover:bg-[#063b2a] text-white rounded-xl py-2 px-1 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                title="Direct Sponsor 20 Units"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? '20 यूनिट दान करें' : language === 'hinglish' ? '20 Units Sponsor' : 'Sponsor 20 Units'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenForm(card1ActivePill === 'coconut' ? card1Item : immunityPacksItem, card1Data.title)}
                className="flex items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-[#084c36] border border-emerald-200 rounded-xl py-2 px-1 text-xs font-bold transition-colors cursor-pointer"
                title="Change Quantity"
              >
                <span>{language === 'hi' ? 'अन्य मात्रा' : language === 'hinglish' ? 'Custom Qty' : 'Custom Qty'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 — Dynamic Center Panel: Fast Sponsor Node with Stepper +/- */}
        <div className="relative min-h-[380px] flex flex-col">
          <AnimatePresence mode="wait">
            {!isFormOpen ? (
              /* Clean Default State: Foundation Node & Direct Sponsor Launcher */
              <motion.div
                key="clean-node"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.92, filter: 'blur(6px)', y: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm border border-neutral-200/90 hover:shadow-md hover:border-emerald-800/30 transition-all duration-300 h-full group"
              >
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#084c36] animate-pulse" />
                      <h3 className="font-bold text-neutral-900 text-sm">
                        {language === 'hi' ? 'त्वरित सेवा केंद्र' : language === 'hinglish' ? 'Fast Seva Node' : 'Fast Sponsor Node'}
                      </h3>
                    </div>
                    <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-mono font-bold">
                      {language === 'hi' ? 'औसत 20 यूनिट्स ⭐' : 'Avg 20 Units ⭐'}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-col items-center text-center">
                    {/* Open Clean Logo */}
                    <div className="w-16 h-14 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                      <img
                        src="/logo.png"
                        alt="RiseUpHelp Initiative Foundation"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <h4 className="font-extrabold text-neutral-900 text-sm leading-tight">
                      {language === 'hi' ? 'औसत 20 बेडसाइड सेवा यूनिट्स' : language === 'hinglish' ? 'Average 20 Bedside Seva Units' : 'Average 20 Bedside Seva Units'}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {language === 'hi'
                        ? 'ताजा हरा नारियल, कोल्ड-प्रेस्ड जूस या स्कूल किट दान करें। मात्रा अपनी इच्छानुसार बदलें।'
                        : language === 'hinglish'
                        ? 'Fresh green nariyal, cold-pressed juice ya school kits sponsor karein. Qty freely adjust karein.'
                        : 'Sponsor fresh green coconuts, cold-pressed juice, or school kits. Adjust quantity freely without limit.'}
                    </p>
                  </div>

                  <div className="mt-3 space-y-1.5 text-[11px] text-neutral-700 bg-[#f5f2ee] rounded-xl p-2.5 border border-neutral-200/70">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">{language === 'hi' ? 'RUHS ऑन्कोलॉजी:' : 'RUHS Oncology:'}</span>
                      <span className="font-semibold text-emerald-800">{language === 'hi' ? 'लाइव बेडसाइड वितरण' : language === 'hinglish' ? 'Fresh Bedside Cut' : 'Fresh Bedside Cut'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">{language === 'hi' ? 'सामान्य औसत:' : 'Default Average:'}</span>
                      <span className="font-bold text-[#084c36]">{language === 'hi' ? '20 बेडसाइड सेवा यूनिट्स' : '20 Bedside Seva Units'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => handleDirectSponsor(card1Item, 'Fresh Whole Tender Coconut (RUHS Bedside)', 20)}
                    className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white rounded-xl py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                    <span>{language === 'hi' ? 'त्वरित दान 20 यूनिट्स' : language === 'hinglish' ? 'Quick Sponsor 20 Units' : 'Quick Sponsor 20 Units'}</span>
                  </button>

                  {onOpenCustomDateModal && (
                    <button
                      type="button"
                      onClick={onOpenCustomDateModal}
                      className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl py-2.5 px-3 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer border border-amber-500/50"
                    >
                      <span>📅</span>
                      <span>{language === 'hi' ? 'मिक्स बास्केट व तिथि (नारियल + अनार + चुकंदर)' : language === 'hinglish' ? 'Mix Basket & Date (Nariyal + Anar + Beetroot)' : 'Mix Basket & Date (Nariyal + Anar + Beetroot)'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleOpenForm(card1Item, 'Fresh Whole Tender Coconut (RUHS Bedside)')}
                    className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'मात्रा चयन (+ / -)' : language === 'hinglish' ? 'Single Item Stepper (+ / -)' : 'Single Item Stepper (+ / -)'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Fast Sponsor Form with Average 20 Quantity and Stepper (+ / -) */
              <motion.div
                key="checkout-form"
                initial={{ opacity: 0, scale: 0.9, y: 22, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, y: 22, filter: 'blur(8px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 28,
                  mass: 0.8,
                }}
                className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl border-2 border-emerald-800/30 ring-4 ring-emerald-500/10 h-full"
              >
                <div>
                  {/* Header with X icon */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#084c36] animate-ping" />
                      <h3 className="font-bold text-neutral-900 text-sm">
                        {language === 'hi' ? 'कस्टम दान फॉर्म' : language === 'hinglish' ? 'Custom Sponsor Form' : 'Custom Sponsor Form'}
                      </h3>
                    </div>
                    <button
                      onClick={handleCloseForm}
                      title="Close form"
                      className="text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 p-1 rounded-full transition-colors ml-auto cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Structured Fast Form */}
                  <form onSubmit={handleCard2Submit} className="mt-2.5 flex flex-col gap-2.5">
                    {/* Cause Drive selection */}
                    <div>
                      <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                        {language === 'hi' ? 'सेवा अभियान चुनें' : language === 'hinglish' ? 'Seva Drive Chunein' : 'Select Cause Drive'}
                      </label>
                      <select
                        value={card2ItemType}
                        onChange={(e) => {
                          setCard2ItemType(e.target.value);
                          if (e.target.value.includes('Coconut')) setSelectedDriveItem(items[0]);
                          else if (e.target.value.includes('Meal') || e.target.value.includes('Pomegranate') || e.target.value.includes('Anar')) setSelectedDriveItem(items[1]);
                          else if (e.target.value.includes('Wheelchair')) setSelectedDriveItem(items.find(d => d.id === 'hospital-wheelchair') || items[0]);
                          else if (e.target.value.includes('First Aid') || e.target.value.includes('Emergency') || e.target.value.includes('STEM')) setSelectedDriveItem(items.find(d => d.id === 'first-aid-kit') || items[0]);
                          else if (e.target.value.includes('Sewing')) setSelectedDriveItem(items.find(d => d.id === 'sewing-machine') || items[0]);
                          else setSelectedDriveItem(items[2]);
                        }}
                        className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-800 focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors font-medium"
                      >
                        <option value="Fresh Whole Tender Coconut (RUHS Bedside)">🥥 Fresh Coconut (₹65/pc)</option>
                        <option value="Immunity Juice Packs (Hospital Recovery)">🍊 Immunity Packs (₹65/pk)</option>
                        <option value="Nutritional Wholesome Meal Box">🍲 Meal Box (₹70/meal)</option>
                        <option value="Fresh Anar Cold-Pressed Juice">🥤 Anar Juice (₹70/btl)</option>
                        <option value="Children School Bag & Stationery Kit">🎒 School Bag & Complete Stationery Kit (₹899/kit)</option>
                        <option value="First Aid & Emergency Treatment Kit">🩹 First Aid & Emergency Kit (₹450/kit)</option>
                        <option value="Sewing Machine & Training">🧵 Sewing Machine & Training (₹5,500/unit)</option>
                        <option value="Hospital Grade Foldable Wheelchair">🦽 Hospital Wheelchair (₹4,200/unit)</option>
                      </select>
                    </div>

                    {/* Quantity Stepper with Prominent - and + Buttons */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-neutral-700">
                          {language === 'hi' ? 'दान मात्रा' : language === 'hinglish' ? 'Sponsorship Quantity' : 'Sponsorship Quantity'}
                        </label>
                        <span className="text-[10px] text-emerald-800 font-mono font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          {card2Quantity} units
                        </span>
                      </div>

                      {/* Stepper with - and + */}
                      <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-300 rounded-xl p-1 shadow-xs">
                        <button
                          type="button"
                          onClick={() => setCard2Quantity((q) => Math.max(1, q - 1))}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-neutral-200 text-neutral-800 font-black flex items-center justify-center text-sm border border-neutral-200 transition-colors cursor-pointer shadow-xs active:scale-95"
                          title="Kam Karein (-1)"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <input
                          type="number"
                          min="1"
                          value={card2Quantity}
                          onChange={(e) => setCard2Quantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="flex-1 text-center font-bold text-neutral-900 text-xs focus:outline-none bg-transparent"
                        />

                        <button
                          type="button"
                          onClick={() => setCard2Quantity((q) => q + 1)}
                          className="w-7 h-7 rounded-lg bg-[#084c36] hover:bg-[#063b2a] text-white font-black flex items-center justify-center text-sm transition-colors cursor-pointer shadow-xs active:scale-95"
                          title="Zada Karein (+1)"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quick Presets */}
                      <div className="flex gap-1 mt-1.5">
                        {[5, 10, 20, 50, 100].map((qty) => (
                          <button
                            key={qty}
                            type="button"
                            onClick={() => setCard2Quantity(qty)}
                            className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer border ${
                              card2Quantity === qty
                                ? 'bg-[#084c36] text-white border-[#084c36] shadow-xs'
                                : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            {qty} {qty === 20 && '⭐'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Donor Name & Phone in 2-cols */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-0.5">
                          {language === 'hi' ? 'दाता का नाम' : language === 'hinglish' ? 'Donor Ka Naam' : 'Donor Name'}
                        </label>
                        <input
                          type="text"
                          placeholder={language === 'hi' ? 'आपका नाम' : language === 'hinglish' ? 'Aapka Naam' : 'Your Name'}
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1.5 text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:border-emerald-800 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-0.5">
                          {language === 'hi' ? 'फ़ोन नंबर' : 'Phone Number'}
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="10 Digits"
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1.5 text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:border-emerald-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    {card2Error && (
                      <div className="text-[10px] text-red-600 font-bold">{card2Error}</div>
                    )}

                    {/* Calculated Total */}
                    <div className="bg-amber-50/90 border border-amber-200/80 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-xs">
                      <span className="text-amber-900 font-medium">
                        {language === 'hi' ? 'कुल राशि:' : 'Grand Total:'}
                      </span>
                      <span className="text-amber-950 font-extrabold text-[14px]">
                        ₹{(getUnitPrice() * card2Quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Footer buttons */}
                    <div className="flex items-center justify-between pt-0.5 gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold rounded-lg px-3 py-2 transition-all shadow-sm active:scale-95 cursor-pointer text-center"
                      >
                        {language === 'hi' ? 'स्वीकार करें व आगे बढ़ें' : language === 'hinglish' ? 'Confirm & Proceed' : 'Confirm & Proceed'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseForm}
                        className="text-xs text-neutral-500 underline hover:text-neutral-800 cursor-pointer px-1"
                      >
                        {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card 3 — Wholesome Meals & Anar Juice with Real Photo Preview */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm border border-neutral-200/90 hover:shadow-md hover:border-neutral-300 transition-all duration-300 group">
          <div>
            {/* Real Visual Image Thumbnail Header */}
            <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden mb-3 border border-neutral-200 bg-neutral-900 shadow-xs">
              <img
                src={card3Data.image}
                alt={card3Data.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-700/90 backdrop-blur-xs px-2 py-0.5 rounded">
                  {card3ActivePill === 'meals' ? 'SMS Nutrition Drive' : 'Cold-Pressed Pure'}
                </span>
                <span className="text-[11px] font-bold text-amber-300">
                  SMS & Cancer Wards
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug group-hover:text-rose-700 transition-colors">
                {card3Data.title}
              </h3>
              <p className="text-xs font-medium text-rose-800 mt-0.5">
                {card3Data.tagline}
              </p>
            </div>

            {/* Gauge Component with Calibrated Stats */}
            <div className="my-2.5">
              <Gauge
                value={card3Data.gaugeValue}
                color="#084c36"
                showLabels={true}
                labelLeft={card3Data.delivered}
                labelRight={card3Data.target}
              />
            </div>
          </div>

          <div>
            {/* Toggle pill bottom: Nutritional Meals / Anar Juice */}
            <div className="bg-neutral-100 rounded-full p-1 flex items-center text-xs font-medium text-neutral-600 mb-2.5">
              <button
                type="button"
                onClick={() => setCard3ActivePill('meals')}
                className={`flex-1 py-1 px-2 rounded-full text-center transition-all cursor-pointer ${
                  card3ActivePill === 'meals'
                    ? 'bg-rose-700 text-white shadow-xs font-bold'
                    : 'hover:text-neutral-900 text-neutral-700'
                }`}
              >
                {language === 'hi' ? '🍲 पौष्टिक आहार' : language === 'hinglish' ? '🍲 Meal Box' : '🍲 Meal Box'}
              </button>
              <button
                type="button"
                onClick={() => setCard3ActivePill('anar')}
                className={`flex-1 py-1 px-2 rounded-full text-center transition-all cursor-pointer ${
                  card3ActivePill === 'anar'
                    ? 'bg-rose-700 text-white shadow-xs font-bold'
                    : 'hover:text-neutral-900 text-neutral-700'
                }`}
              >
                {language === 'hi' ? '🥤 अनार जूस' : language === 'hinglish' ? '🥤 Anar Juice' : '🥤 Anar Juice'}
              </button>
            </div>

            {/* 1-Click Working Sponsor Buttons */}
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => handleDirectSponsor(card3ActivePill === 'meals' ? card3Item : anarJuiceItem, card3Data.title, 20)}
                className="flex items-center justify-center gap-1 bg-rose-700 hover:bg-rose-800 text-white rounded-xl py-2 px-1 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                title="Direct Sponsor 20 Units"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? '20 यूनिट दान करें' : language === 'hinglish' ? '20 Units Sponsor' : 'Sponsor 20 Units'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenForm(card3ActivePill === 'meals' ? card3Item : anarJuiceItem, card3Data.title)}
                className="flex items-center justify-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl py-2 px-1 text-xs font-bold transition-colors cursor-pointer"
                title="Change Quantity"
              >
                <span>{language === 'hi' ? 'अन्य मात्रा' : language === 'hinglish' ? 'Custom Qty' : 'Custom Qty'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
