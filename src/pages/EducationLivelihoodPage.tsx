import React from 'react';
import { ArrowLeft, BookOpen, ShoppingBag, Sparkles, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Footer } from '../components/Footer';
import type { DriveItem } from '../types';
import { DRIVE_ITEMS } from '../data/mockData';

interface EducationLivelihoodPageProps {
  onBackToHome: () => void;
  onOpenSponsorModal: (
    item?: DriveItem,
    initialData?: { name: string; phone: string; quantity: number }
  ) => void;
  onOpenAdmin?: () => void;
  driveItems?: DriveItem[];
}

export const EducationLivelihoodPage: React.FC<EducationLivelihoodPageProps> = ({
  onBackToHome,
  onOpenSponsorModal,
  onOpenAdmin,
  driveItems,
}) => {
  const currentDrives = driveItems && driveItems.length > 0 ? driveItems : DRIVE_ITEMS;
  const schoolBagItem = currentDrives.find((d) => d.id === 'school-bags') || DRIVE_ITEMS[2];
  const sewingItem = currentDrives.find((d) => d.id === 'sewing-machine');
  const firstAidItem = currentDrives.find((d) => d.id === 'first-aid-kit');
  const wheelchairItem = currentDrives.find((d) => d.id === 'hospital-wheelchair');

  const handleSponsorBags = (quantity: number = 5) => {
    onOpenSponsorModal(schoolBagItem, {
      name: '',
      phone: '',
      quantity,
    });
  };

  const handleSponsorCustomInitiative = (name: string, price: number, unitLabel: string, defaultQty: number = 1) => {
    const customItem: DriveItem = {
      id: `edu-${Date.now()}`,
      name,
      tagline: 'Education & Livelihood Cell • Jaipur',
      category: 'education',
      price,
      unitLabel,
      targetCount: 'Direct Impact',
      deliveredCount: 'Verified Seva',
      percentage: 90,
      color: '#0e6245',
      badge: '100% Transparent',
      description: `Direct empowerment and procurement of ${name} for underprivileged children and families in Jaipur.`,
      impactMetrics: 'Zero intermediary fee, 100% verified on-ground distribution with photo proof.',
      options: {
        primary: unitLabel,
        secondary: 'Full Kit',
      },
      status: 'active',
    };
    onOpenSponsorModal(customItem, {
      name: '',
      phone: '',
      quantity: defaultQty,
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

        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 font-bold text-xs px-3 py-1.5 rounded-full border border-amber-200">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>All Children Education & Livelihoods</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-neutral-950 via-[#063323] to-[#0e6245] text-white p-6 sm:p-12 shadow-xl border border-emerald-800/40 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#FDB813] text-neutral-950 font-mono font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Academic Dignity & Vocational Hub
            </span>
            <h1 className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              All Children School Bags & Livelihood Hub
            </h1>
            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed">
              Equipping all underprivileged children (both boys and girls) across Jaipur slum clusters with durable waterproof school bags, notebooks, STEM kits, and foundational tablet learning to eliminate dropouts and ensure real educational dignity.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                🎒 6,400+ Waterproof Bags Distributed
              </span>
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                🧵 210+ Women Tailoring Certified
              </span>
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                📚 450+ Slum Students Mentored
              </span>
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                🦽 180+ Hospital Wheelchairs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Initiative 1: School Bag Drive */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#084c36] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-mono">
                Primary Education Drive • ₹899 / Complete Academic Kit
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 leading-tight">
                Complete School Bag & Stationery Kit (₹899 / Child)
              </h2>
              <p className="text-xs sm:text-base text-neutral-600 leading-relaxed">
                For a child of a daily-wage laborer in Jaipur slums, having their official Rise Up Help backpack loaded with fresh class notebooks, DOMS color pencils, Pentonic pens, stainless steel water bottle, lunch box, scissors, and complete geometry stationery transforms their confidence and pride in school.
              </p>

              {/* What is Included Checklist */}
              <div className="bg-[#f5f2ee] rounded-2xl p-4 border border-neutral-200/90 text-xs space-y-2">
                <strong className="text-neutral-900 block font-bold text-xs uppercase tracking-wide">
                  📦 Complete ₹899 School Bag & Stationery Kit Includes:
                </strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#084c36] shrink-0" />
                    <span>Heavy-duty Rise Up Help waterproof backpack</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#084c36] shrink-0" />
                    <span>Complete set of ruled notebooks & registers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#084c36] shrink-0" />
                    <span>DOMS 12-shade color pencils & Pentonic pen set</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#084c36] shrink-0" />
                    <span>Stainless steel bottle, lunch box & geometry kit</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200">
                  <span className="text-2xl font-extrabold text-[#084c36]">₹2,697</span>
                  <p className="text-xs text-neutral-600 mt-1">Sponsor 3 Complete Kits (₹899 each)</p>
                </div>
                <div className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200">
                  <span className="text-2xl font-extrabold text-[#FDB813]">₹4,495</span>
                  <p className="text-xs text-neutral-600 mt-1">Sponsor 5 Complete Kits (₹899 each)</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => handleSponsorBags(1)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span>Sponsor 1 Kit (₹899)</span>
                </button>
                <button
                  onClick={() => handleSponsorBags(3)}
                  className="bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#FDB813]" />
                  <span>Sponsor 3 Kits (₹2,697)</span>
                </button>
                <button
                  onClick={() => handleSponsorBags(5)}
                  className="bg-[#FDB813] hover:bg-[#f59e0b] text-neutral-950 font-bold py-3 px-5 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Sponsor 5 Kits (₹4,495)</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-neutral-950 aspect-[4/3] relative group">
              <img
                src="/uploads/riseup_bag_with_stationery_kit.jpg"
                alt="Children School Bag & Complete Stationery Kit"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 text-xs text-neutral-900 border border-neutral-200 flex items-center justify-between shadow-sm">
                <span className="font-bold">🎒 School Bag + Complete Stationery Kit</span>
                <span className="font-mono font-extrabold text-[#084c36]">₹899 / Child</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Multi-Path Livelihood & Educational Support Cells WITH REAL IMAGES & CLEAR PRICING */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6">
        <div className="mb-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
            Specialized Educational & Mobility Support Drives
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600">
            Clear procurement pricing, 100% verified ground delivery, and authentic equipment specs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: Slum Child Monthly Education & Nutrition Support */}
          <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Real Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                <img
                  src="/uploads/slum_teacher_whiteboard_class.jpg"
                  alt="Slum Child Monthly Education & Nutrition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white font-mono font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  Slum Education Cell
                </div>
                <div className="absolute bottom-2 right-2 bg-neutral-950/85 backdrop-blur-xs text-white font-mono font-bold text-xs px-2 py-0.5 rounded-md border border-neutral-700">
                  ₹350 / Month
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-neutral-900 text-base leading-snug">
                    Slum Child Study & Tiffin
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                  Daily after-school remedial coaching, NCERT textbooks, workbook practice, and wholesome evening tiffin meals for slum children in Jaipur.
                </p>
                <div className="bg-blue-50/80 rounded-xl p-2.5 text-[11px] text-blue-950 font-semibold border border-blue-200/70 mb-3">
                  <div className="flex justify-between">
                    <span>1 Month Education & Tiffin:</span>
                    <strong className="text-blue-900">₹350</strong>
                  </div>
                  <div className="flex justify-between mt-0.5 text-neutral-600">
                    <span>3 Months Term Sponsorship:</span>
                    <strong className="text-neutral-800">₹1,050</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2">
              <button
                onClick={() => handleSponsorCustomInitiative('Slum Child 1-Month Education & Nutrition Sponsorship', 350, 'Monthly Study Share', 1)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                Sponsor 1 Month (₹350)
              </button>
              <button
                onClick={() => handleSponsorCustomInitiative('Slum Child 3-Month Term Education Sponsorship', 1050, '3-Month Term Share', 3)}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Sponsor 3 Months (₹1,050)
              </button>
            </div>
          </div>

          {/* Card 2: Women Vocational Sewing Machine & Livelihood */}
          <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Real Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                <img
                  src={sewingItem?.image || "/uploads/ChatGPT_Image_Sep_13__2026__10_1789320630857_41143ed87d.jpg"}
                  alt="Women Vocational Sewing Machine"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-purple-600 text-white font-mono font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  Vocational Hub
                </div>
                <div className="absolute bottom-2 right-2 bg-neutral-950/85 backdrop-blur-xs text-white font-mono font-bold text-xs px-2 py-0.5 rounded-md border border-neutral-700">
                  ₹5,500 / Machine
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-neutral-900 text-base leading-snug">
                    Sewing Machine & Training
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                  Heavy-duty motorized sewing machine & 6-month tailoring mentorship empowering single & widowed mothers in Sanganer.
                </p>
                <div className="bg-purple-50/80 rounded-xl p-2.5 text-[11px] text-purple-950 font-semibold border border-purple-200/70 mb-3">
                  <div className="flex justify-between">
                    <span>Motorized Machine + Kit:</span>
                    <strong className="text-purple-900">₹5,500</strong>
                  </div>
                  <div className="flex justify-between mt-0.5 text-neutral-600">
                    <span>Artisan Training Share:</span>
                    <strong className="text-neutral-800">₹550 / share</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2">
              <button
                onClick={() => handleSponsorCustomInitiative('Women Vocational Motorized Sewing Machine & Kit', 5500, 'Sewing Machine Unit', 1)}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                Sponsor Machine (₹5,500)
              </button>
              <button
                onClick={() => handleSponsorCustomInitiative('Women Artisan 1-Month Tailoring Training Share', 550, 'Training Share', 1)}
                className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Sponsor Training Share (₹550)
              </button>
            </div>
          </div>

          {/* Card 3: First Aid & Emergency Treatment Kit */}
          <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Real Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                <img
                  src={firstAidItem?.image || "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&q=80"}
                  alt="First Aid & Emergency Treatment Kit"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white font-mono font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  Emergency Healthcare
                </div>
                <div className="absolute bottom-2 right-2 bg-neutral-950/85 backdrop-blur-xs text-white font-mono font-bold text-xs px-2 py-0.5 rounded-md border border-neutral-700">
                  ₹450 / Kit
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-red-500" />
                  </div>
                  <h4 className="font-extrabold text-neutral-900 text-base leading-snug">
                    First Aid & Emergency Treatment Kit
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                  Complete clinical first aid kits equipped with antiseptic lotion, burn ointment, sterile gauze, pediatric trauma bandages, and emergency relief supplies.
                </p>
                <div className="bg-red-50/70 rounded-xl p-2.5 text-[11px] text-neutral-900 font-semibold border border-red-200/60 mb-3">
                  <div className="flex justify-between">
                    <span>1 Complete First-Aid Kit:</span>
                    <strong className="text-red-700">₹450</strong>
                  </div>
                  <div className="flex justify-between mt-0.5 text-neutral-600">
                    <span>Pack of 5 Emergency Kits:</span>
                    <strong className="text-neutral-800">₹2,250</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2">
              <button
                onClick={() => handleSponsorCustomInitiative('First Aid & Emergency Treatment Kit', 450, 'First-Aid Kit', 1)}
                className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                Sponsor 1 First-Aid Kit (₹450)
              </button>
              <button
                onClick={() => handleSponsorCustomInitiative('First Aid & Emergency Treatment Kits (Set of 5)', 2250, '5 First-Aid Kits', 5)}
                className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#084c36] font-semibold py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Sponsor 5 Emergency Kits (₹2,250)
              </button>
            </div>
          </div>

          {/* Card 4: Foldable Hospital Wheelchair & Mobility Aid */}
          <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Real Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                <img
                  src={wheelchairItem?.image || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80"}
                  alt="Hospital Grade Foldable Wheelchair"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-amber-600 text-white font-mono font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  Mobility Lifeline
                </div>
                <div className="absolute bottom-2 right-2 bg-neutral-950/85 backdrop-blur-xs text-white font-mono font-bold text-xs px-2 py-0.5 rounded-md border border-neutral-700">
                  ₹4,200 / Unit
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-neutral-900 text-base leading-snug">
                    Hospital Wheelchair
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                  Heavy-duty ISO certified foldable wheelchairs placed in government cancer OPDs and trauma wards for weak patients.
                </p>
                <div className="bg-amber-50/80 rounded-xl p-2.5 text-[11px] text-amber-950 font-semibold border border-amber-200/70 mb-3">
                  <div className="flex justify-between">
                    <span>Full Clinical Wheelchair:</span>
                    <strong className="text-amber-900">₹4,200</strong>
                  </div>
                  <div className="flex justify-between mt-0.5 text-neutral-600">
                    <span>Part Mobility Share:</span>
                    <strong className="text-neutral-800">₹2,100 / share</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2">
              <button
                onClick={() => handleSponsorCustomInitiative('Foldable Hospital Grade Patient Wheelchair', 4200, 'Wheelchair Unit', 1)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                Sponsor Wheelchair (₹4,200)
              </button>
              <button
                onClick={() => handleSponsorCustomInitiative('Foldable Hospital Wheelchair Part Share', 2100, 'Wheelchair Part Share', 1)}
                className="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Sponsor Half Share (₹2,100)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />
    </div>
  );
};
