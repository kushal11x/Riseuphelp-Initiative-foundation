import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Sparkles,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { DriveItem, DonorProfile } from '../types';
import { PARTNER_HOSPITALS } from '../data/mockData';

export interface CustomSevaBundleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unitLabel: string;
  icon: string;
  category: string;
  image: string;
}

interface CustomSevaDateBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmBundleCheckout: (bundleItem: DriveItem, checkoutData: {
    name: string;
    phone: string;
    quantity: number;
    scheduledDate: string;
    hospitalName: string;
    occasionNote: string;
    customBreakdown: string;
  }) => void;
  currentUser?: DonorProfile | null;
  driveItems?: DriveItem[];
}

const generateBundleId = () => `custom-bundle-${Date.now()}`;

export const CustomSevaDateBuilderModal: React.FC<CustomSevaDateBuilderModalProps> = ({
  isOpen,
  onClose,
  onConfirmBundleCheckout,
  currentUser,
  driveItems,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Default Items List with independent quantity counters
  const [items, setItems] = useState<CustomSevaBundleItem[]>([
    {
      id: 'coconut',
      name: 'Fresh Whole Tender Coconut',
      price: 65,
      quantity: 50,
      unitLabel: 'Coconut',
      icon: '🥥',
      category: 'Hydration',
      image: '/uploads/nariyal_pani_fresh_coconut.jpg',
    },
    {
      id: 'anar',
      name: 'Pure Cold-Pressed Anar (Pomegranate) Juice',
      price: 70,
      quantity: 50,
      unitLabel: 'Bottle',
      icon: '🥤',
      category: 'Platelet Boost',
      image: '/uploads/IMG_20260913_104140_1789287615105_e54f3a756c.jpg',
    },
    {
      id: 'beetroot',
      name: 'Fresh Beetroot & Carrot Detox Juice',
      price: 60,
      quantity: 30,
      unitLabel: 'Bottle',
      icon: '🧃',
      category: 'Hemoglobin Iron',
      image: '/uploads/Gemini_Generated_Image_olkfeho_1789278370883_49a1ca3655.jpg',
    },
    {
      id: 'meal',
      name: 'Wholesome Hospital Nutritious Meal Box',
      price: 70,
      quantity: 20,
      unitLabel: 'Meal Box',
      icon: '🍲',
      category: 'Nutrition',
      image: '/uploads/slum_packed_thali_tiffin.jpg',
    },
    {
      id: 'bags',
      name: 'School Bag & Complete Stationery Kit',
      price: 899,
      quantity: 0,
      unitLabel: 'Kit',
      icon: '🎒',
      category: 'Education',
      image: '/uploads/riseup_bag_with_stationery_kit.jpg',
    },
    {
      id: 'firstaid',
      name: 'First Aid & Emergency Treatment Kit',
      price: 450,
      quantity: 0,
      unitLabel: 'First-Aid Kit',
      icon: '🩹',
      category: 'Emergency Care',
      image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&q=80',
    },
    {
      id: 'sewing',
      name: 'Sewing Machine & Training Unit',
      price: 5500,
      quantity: 0,
      unitLabel: 'Machine & Kit',
      icon: '🧵',
      category: 'Livelihood',
      image: '/uploads/ChatGPT_Image_Sep_13__2026__10_1789320630857_41143ed87d.jpg',
    },
    {
      id: 'wheelchair',
      name: 'Hospital Grade Foldable Wheelchair',
      price: 4200,
      quantity: 0,
      unitLabel: 'Wheelchair',
      icon: '🦽',
      category: 'Mobility',
      image: '/uploads/IMG_20260730_134705_1789320665801_679437e732.jpg',
    },
  ]);

  // Dynamically sync photos if driveItems are updated from Admin Panel / Server
  useEffect(() => {
    if (driveItems && driveItems.length > 0) {
      setItems((prevItems) =>
        prevItems.map((item) => {
          let matched: DriveItem | undefined;
          if (item.id === 'coconut') matched = driveItems.find((d) => d.id === 'coconut-water');
          else if (item.id === 'anar') matched = driveItems.find((d) => d.id === 'anar-juice');
          else if (item.id === 'beetroot') matched = driveItems.find((d) => d.id === 'beetroot-juice');
          else if (item.id === 'meal') matched = driveItems.find((d) => d.id === 'pomegranate-meal');
          else if (item.id === 'bags') matched = driveItems.find((d) => d.id === 'school-bags');
          else if (item.id === 'firstaid') matched = driveItems.find((d) => d.id === 'first-aid-kit');
          else if (item.id === 'sewing') matched = driveItems.find((d) => d.id === 'sewing-machine');
          else if (item.id === 'wheelchair') matched = driveItems.find((d) => d.id === 'hospital-wheelchair');

          if (matched && matched.image) {
            return { ...item, image: matched.image };
          }
          return item;
        })
      );
    }
  }, [driveItems]);

  // Date Selection State
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-22');
  const [datePreset, setDatePreset] = useState<'next_ekadashi' | 'sunday' | 'today' | 'custom'>('next_ekadashi');
  const [selectedHospital, setSelectedHospital] = useState<string>(PARTNER_HOSPITALS[0]?.name || 'RUHS State Cancer Hospital');
  const [occasionNote, setOccasionNote] = useState<string>('Jaljhulani Ekadashi Vow Seva (Sep 22, 2026)');
  const [donorName, setDonorName] = useState<string>(currentUser?.fullName || '');
  const [donorPhone, setDonorPhone] = useState<string>(currentUser?.phone || '');
  const [error, setError] = useState<string>('');

  const handleUpdateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: Math.max(0, it.quantity + delta) } : it))
    );
  };

  const handleSetQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: Math.max(0, qty) } : it))
    );
  };

  const activeItems = items.filter((it) => it.quantity > 0);
  const grandTotal = activeItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const totalUnits = activeItems.reduce((acc, it) => acc + it.quantity, 0);

  // Preset Date Handlers
  const handleSelectPreset = (preset: 'next_ekadashi' | 'sunday' | 'today' | 'custom') => {
    setDatePreset(preset);
    const d = new Date();
    if (preset === 'today') {
      setSelectedDate(d.toISOString().split('T')[0]);
      setOccasionNote('Today Immediate Bedside Seva');
    } else if (preset === 'next_ekadashi') {
      // Next Ekadashi: Sep 22, 2026 (Jaljhulani Ekadashi)
      setSelectedDate('2026-09-22');
      setOccasionNote('Jaljhulani Ekadashi Vow Seva (Sep 22, 2026)');
    } else if (preset === 'sunday') {
      // Upcoming Sunday
      const day = d.getDay();
      const diff = (7 - day) % 7 || 7;
      d.setDate(d.getDate() + diff);
      setSelectedDate(d.toISOString().split('T')[0]);
      setOccasionNote('Sunday Hospital Mega Distribution');
    }
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (grandTotal === 0) {
      setError('Kripya kam se kam 1 item select karein (Please add at least 1 item).');
      return;
    }
    if (!donorName.trim()) {
      setError('Kripya apna naam enter karein (Please enter your name).');
      return;
    }
    if (donorPhone.length < 10) {
      setError('Kripya valid 10-digit phone number enter karein.');
      return;
    }
    setError('');

    const breakdownStr = activeItems
      .map((it) => `${it.quantity}× ${it.name} (₹${it.price * it.quantity})`)
      .join(' + ');

    const bundleItem: DriveItem = {
      id: generateBundleId(),
      name: `Custom Multi-Item Seva Bundle (${totalUnits} Units)`,
      tagline: `Scheduled for ${selectedDate} • ${selectedHospital}`,
      category: 'hospital',
      price: grandTotal,
      unitLabel: 'Custom Seva Bundle',
      targetCount: 'Scheduled Date Drive',
      deliveredCount: 'Personalized Seva',
      percentage: 100,
      color: '#084c36',
      badge: `${selectedDate}`,
      description: `Customized Seva Bundle scheduled on ${selectedDate} at ${selectedHospital}. Items: ${breakdownStr}. Sankalp: ${occasionNote}.`,
      impactMetrics: `${totalUnits} bedside units served on your chosen date with live photo verification.`,
      options: {
        primary: `${totalUnits} Seva Units`,
        secondary: selectedDate,
      },
      status: 'active',
    };

    onConfirmBundleCheckout(bundleItem, {
      name: donorName,
      phone: donorPhone,
      quantity: 1,
      scheduledDate: selectedDate,
      hospitalName: selectedHospital,
      occasionNote: occasionNote.trim() || 'Custom Date Seva Sankalp',
      customBreakdown: breakdownStr,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh] z-10"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#063323] via-[#084c36] to-[#0e6245] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg leading-tight flex items-center gap-2">
                  <span>Custom Seva Date & Multi-Item Builder</span>
                  <span className="text-[10px] font-mono bg-amber-400 text-neutral-950 px-2 py-0.5 rounded font-bold uppercase">
                    Apni Pasand Ki Seva
                  </span>
                </h3>
                <p className="text-xs text-emerald-100/90">
                  Choose specific quantities of Nariyal, Anar Juice, Beetroot Juice & pick any date!
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Step 1: Multi-Item Mix & Match Selectors */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#084c36] text-white flex items-center justify-center text-xs font-bold font-mono">
                    1
                  </span>
                  <h4 className="font-bold text-neutral-900 text-sm sm:text-base">
                    Select Your Items & Quantities (Kripya sankhya chunein)
                  </h4>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  {totalUnits} Units Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className={`rounded-2xl p-3.5 border transition-all flex items-center justify-between gap-3 ${
                      it.quantity > 0
                        ? 'bg-emerald-50/50 border-[#084c36]/40 shadow-xs'
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 shrink-0 relative">
                        <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0.5 right-0.5 text-xs">{it.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono block truncate">
                          {it.category}
                        </span>
                        <h5 className="font-bold text-neutral-900 text-xs sm:text-sm truncate">
                          {it.name}
                        </h5>
                        <div className="text-xs font-extrabold text-[#084c36] mt-0.5">
                          ₹{it.price} <span className="font-normal text-neutral-500 text-[11px]">/ {it.unitLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stepper +/- */}
                    <div className="flex items-center gap-1.5 bg-white border border-neutral-300 rounded-xl p-1 shrink-0 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(it.id, it.id === 'coconut' || it.id === 'anar' ? -10 : -1)}
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-black flex items-center justify-center text-xs transition-colors cursor-pointer active:scale-95"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="number"
                        min="0"
                        value={it.quantity}
                        onChange={(e) => handleSetQty(it.id, parseInt(e.target.value) || 0)}
                        className="w-10 text-center font-extrabold text-neutral-900 text-xs focus:outline-none bg-transparent"
                      />

                      <button
                        type="button"
                        onClick={() => handleUpdateQty(it.id, it.id === 'coconut' || it.id === 'anar' ? 10 : 1)}
                        className="w-7 h-7 rounded-lg bg-[#084c36] hover:bg-[#063b2a] text-white font-black flex items-center justify-center text-xs transition-colors cursor-pointer active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Date & Hospital */}
            <div className="pt-2 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#084c36] text-white flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <h4 className="font-bold text-neutral-900 text-sm sm:text-base">
                  Choose Date & Government Hospital (Kab aur kahan seva karani hai)
                </h4>
              </div>

              {/* Date Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => handleSelectPreset('next_ekadashi')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer flex flex-col justify-between ${
                    datePreset === 'next_ekadashi'
                      ? 'bg-[#084c36] text-white border-[#084c36] shadow-sm'
                      : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-[10px] text-amber-300 block font-mono">POPULAR VOW</span>
                  <span>✨ Next Ekadashi</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPreset('sunday')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer flex flex-col justify-between ${
                    datePreset === 'sunday'
                      ? 'bg-[#084c36] text-white border-[#084c36] shadow-sm'
                      : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-[10px] text-emerald-300 block font-mono">WEEKEND MEGA</span>
                  <span>☀️ Upcoming Sunday</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPreset('today')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer flex flex-col justify-between ${
                    datePreset === 'today'
                      ? 'bg-[#084c36] text-white border-[#084c36] shadow-sm'
                      : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-[10px] text-rose-300 block font-mono">EMERGENCY</span>
                  <span>⚡ Today (Immediate)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPreset('custom')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer flex flex-col justify-between ${
                    datePreset === 'custom'
                      ? 'bg-[#084c36] text-white border-[#084c36] shadow-sm'
                      : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-[10px] text-blue-300 block font-mono">CUSTOM</span>
                  <span>📅 Choose Any Date</span>
                </button>
              </div>

              {/* Date Input & Hospital Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    Scheduled Seva Date (तारीख)
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setDatePreset('custom');
                    }}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs font-bold text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    Select 100% Government Hospital (अस्पताल)
                  </label>
                  <select
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs font-bold text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none"
                  >
                    {PARTNER_HOSPITALS.map((h) => (
                      <option key={h.id} value={h.name}>
                        🏥 {h.name} ({h.location.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion / Sankalp Note */}
              <div className="mt-3">
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Sankalp / Occasion (उदा: जन्मदिन / पुण्यतिथि / एकादशी संकल्प / परिवार की सुख शांति)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Birthday Seva for Aarav / In Memory of Late Grandfather"
                  value={occasionNote}
                  onChange={(e) => setOccasionNote(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#084c36] focus:outline-none"
                />
              </div>
            </div>

            {/* Step 3: Donor Contact Details */}
            <div className="pt-2 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#084c36] text-white flex items-center justify-center text-xs font-bold font-mono">
                  3
                </span>
                <h4 className="font-bold text-neutral-900 text-sm sm:text-base">
                  Donor Information (WhatsApp proof & 80G receipt)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    Your Full Name (नाम)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    WhatsApp Phone Number (मोबाइल नंबर)
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:border-[#084c36] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
                {error}
              </div>
            )}

            {/* Real-Time Calculated Bill Breakdown */}
            <div className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200 text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <strong className="text-neutral-900 font-bold uppercase text-[11px] font-mono">
                  🧾 Real-Time Seva Bill Breakdown:
                </strong>
                <span className="text-[11px] text-emerald-800 font-semibold">
                  {selectedDate} • {selectedHospital.split('(')[0]}
                </span>
              </div>

              {activeItems.length === 0 ? (
                <p className="text-neutral-500 italic">No items selected yet. Please adjust quantities above.</p>
              ) : (
                <div className="space-y-1">
                  {activeItems.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-neutral-700">
                      <span>
                        {it.icon} {it.quantity}× {it.name} (₹{it.price} each)
                      </span>
                      <strong className="text-neutral-950 font-mono">₹{(it.price * it.quantity).toLocaleString('en-IN')}</strong>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-neutral-300 flex items-center justify-between text-sm font-extrabold text-[#084c36]">
                    <span>Grand Total Sponsorship:</span>
                    <span className="text-lg font-mono">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shrink-0">
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#084c36]" />
                <div>
                  <span className="text-[11px] text-neutral-500 block leading-tight">Total Calculated:</span>
                  <strong className="text-base sm:text-xl font-extrabold text-[#084c36] font-mono">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
              <span className="text-[10px] sm:hidden font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                {totalUnits} Units
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 sm:w-auto px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProceed}
                disabled={grandTotal === 0}
                className="flex-1 sm:flex-initial bg-[#084c36] hover:bg-[#063b2a] disabled:opacity-50 text-white font-bold px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FDB813]" />
                <span>Confirm & Pay (₹{grandTotal.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
