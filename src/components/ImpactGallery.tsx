import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  Calendar,
  ArrowLeft,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  X,
  Search,
  ChevronRight,
  ChevronLeft,
  Camera,
  Images,
  Flame,
  Layers,
} from 'lucide-react';
import { GALLERY_ITEMS, DRIVE_ITEMS } from '../data/mockData';
import type { GalleryItem, DriveItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ImpactGalleryProps {
  onBackToHome: () => void;
  onSponsorItem: (item: DriveItem) => void;
  onOpenRecruitment: () => void;
  galleryItems?: GalleryItem[];
}

interface CategoryMeta {
  key: string;
  icon: string;
  nameEn: string;
  nameHi: string;
  desc: string;
  badge: string;
  accentBg: string;
  borderCol: string;
  badgeBg: string;
}

const getCategoryMeta = (categoryName: string): CategoryMeta => {
  const lower = (categoryName || '').toLowerCase();
  if (lower.includes('nariyal') || lower.includes('coconut') || lower.includes('healthcare')) {
    return {
      key: 'nariyal',
      icon: '🥥',
      nameEn: 'Har Ekadashi Nariyal Pani & Hospital Seva',
      nameHi: 'हर एकादशी नारियल पानी एवं हॉस्पिटल सेवा',
      desc: 'Farm-fresh green coconuts cut bedside at RUHS Cancer Hospital and SMS Hospital oncology wards for chemotherapy fighters.',
      badge: 'Hospital Bedside Seva',
      accentBg: 'from-emerald-950 via-[#084c36] to-emerald-900',
      borderCol: 'border-emerald-600/40',
      badgeBg: 'bg-emerald-900 text-emerald-100',
    };
  }
  if (lower.includes('education') || lower.includes('bag') || lower.includes('school')) {
    return {
      key: 'education',
      icon: '🎒',
      nameEn: 'Slum Children School Bags & Mentoring',
      nameHi: 'कच्ची बस्ती बाल शिक्षा एवं स्कूल बैग वितरण',
      desc: 'Durable waterproof school backpacks, 6 notebooks, DOMS colors, pens, geometry boxes, and educational mentorship across slum clusters.',
      badge: 'Slum Education Drive',
      accentBg: 'from-amber-950 via-amber-900 to-yellow-950',
      borderCol: 'border-amber-600/40',
      badgeBg: 'bg-amber-900 text-amber-100',
    };
  }
  if (lower.includes('silai') || lower.includes('sewing') || lower.includes('women') || lower.includes('livelihood')) {
    return {
      key: 'livelihood',
      icon: '🧵',
      nameEn: 'Women Tailoring & Sewing Machines (Rozgar)',
      nameHi: 'महिला स्वरोजगार सिलाई मशीन सेवा',
      desc: 'Free commercial sewing machine distribution and 3-month certified stitching courses to make underprivileged mothers financially self-reliant.',
      badge: 'Women Livelihood Drive',
      accentBg: 'from-rose-950 via-rose-900 to-pink-950',
      borderCol: 'border-rose-600/40',
      badgeBg: 'bg-rose-900 text-rose-100',
    };
  }
  if (lower.includes('wheelchair') || lower.includes('divyang') || lower.includes('disability') || lower.includes('relief')) {
    return {
      key: 'divyang',
      icon: '🦽',
      nameEn: 'Divyangjan Mobility & Hospital Wheelchairs',
      nameHi: 'दिव्यांगजन गतिशीलता एवं हॉस्पिटल व्हीलचेयर',
      desc: 'Heavy-duty medical wheelchairs, tricycles, and walking calipers donated directly to patients in need and govt hospital emergency gates.',
      badge: 'Mobility & Relief Drive',
      accentBg: 'from-purple-950 via-purple-900 to-indigo-950',
      borderCol: 'border-purple-600/40',
      badgeBg: 'bg-purple-900 text-purple-100',
    };
  }
  return {
    key: 'general',
    icon: '✨',
    nameEn: 'General Ground Seva & Emergency Relief',
    nameHi: 'सामान्य धरातल सेवा एवं आपातकालीन सहायता',
    desc: 'Verified on-ground humanitarian drives organized and executed by Rise Up (Humanity Foundation).',
    badge: 'Verified Mission',
    accentBg: 'from-neutral-900 via-neutral-800 to-neutral-900',
    borderCol: 'border-neutral-700/40',
    badgeBg: 'bg-neutral-800 text-neutral-100',
  };
};

export const ImpactGallery: React.FC<ImpactGalleryProps> = ({
  onBackToHome,
  onSponsorItem,
  onOpenRecruitment,
  galleryItems,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const rawItems = useMemo(() => {
    return galleryItems && galleryItems.length > 0 ? galleryItems : GALLERY_ITEMS;
  }, [galleryItems]);

  const getItemImages = (item: GalleryItem): string[] => {
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images;
    }
    return item.image
      ? [item.image]
      : ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80'];
  };

  // Keyboard navigation for multi-photo lightbox
  useEffect(() => {
    if (!activeLightboxItem) return;
    const currentImages = getItemImages(activeLightboxItem);
    if (currentImages.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
      } else if (e.key === 'Escape') {
        setActiveLightboxItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxItem]);

  // Lock body scroll when photo lightbox is open
  useEffect(() => {
    if (activeLightboxItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLightboxItem]);

  // Extract unique categories
  const categories = useMemo(() => {
    const list: string[] = [];
    rawItems.forEach((it) => {
      if (it.category && !list.includes(it.category)) {
        list.push(it.category);
      }
    });
    return list;
  }, [rawItems]);

  // Recent items
  const recentItems = useMemo(() => {
    return rawItems.filter((it) => it.isRecent);
  }, [rawItems]);

  // Filter items by search
  const matchesSearch = useCallback(
    (item: GalleryItem) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
    },
    [searchQuery]
  );

  // Group items by category for 'all' mode
  const categorizedGroups = useMemo(() => {
    const groups: { category: string; meta: CategoryMeta; items: GalleryItem[] }[] = [];
    categories.forEach((cat) => {
      const itemsInCat = rawItems.filter((it) => it.category === cat && matchesSearch(it));
      if (itemsInCat.length > 0) {
        groups.push({
          category: cat,
          meta: getCategoryMeta(cat),
          items: itemsInCat,
        });
      }
    });
    return groups;
  }, [categories, rawItems, matchesSearch]);

  const handleSponsorFromGallery = (galleryItem: GalleryItem) => {
    let driveItemToSponsor = DRIVE_ITEMS[0];
    if (galleryItem.driveReferenceId) {
      const found = DRIVE_ITEMS.find((d) => d.id === galleryItem.driveReferenceId);
      if (found) driveItemToSponsor = found;
    }
    setActiveLightboxItem(null);
    onSponsorItem(driveItemToSponsor);
  };

  const currentLightboxImages = activeLightboxItem ? getItemImages(activeLightboxItem) : [];

  return (
    <div className="min-h-screen w-full matte-gradient-canvas rounded-2xl sm:rounded-3xl border border-neutral-300/80 shadow-md relative overflow-hidden text-neutral-900 select-none pb-24">
      {/* Decorative Sunset Aura & Emerald Grids */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#FDB813]/15 via-[#084c36]/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#084c36_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 bg-white/95 backdrop-blur-xl border-b border-neutral-200 shadow-xs flex items-center justify-between gap-3">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="group inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>{t.galleryBack}</span>
        </button>

        {/* Brand Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-100 to-orange-100 p-1 border border-amber-300 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block leading-tight text-left">
            <div className="text-sm font-bold text-neutral-950 flex items-center gap-1.5">
              <span>{language === 'hi' ? 'लाइव सेवा गैलरी' : language === 'hinglish' ? 'Live Seva Gallery' : 'Live Seva Truth Engine'}</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.2 rounded-full font-mono font-bold">
                100% Ground Verified
              </span>
            </div>
            <div className="text-[10px] text-emerald-800 font-mono">
              {language === 'hi' ? 'वास्तविक धरातल की तस्वीरें' : language === 'hinglish' ? 'Real Ground Photos' : 'Visual Transparency & Direct Photo Feeds'}
            </div>
          </div>
        </div>

        {/* Sponsor Quick Action */}
        <button
          onClick={() => onSponsorItem(DRIVE_ITEMS[0])}
          className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <HeartHandshake className="w-3.5 h-3.5 text-[#FDB813]" />
          <span>{t.sponsorNow}</span>
        </button>
      </header>

      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-[#084c36]/10 text-[#084c36] font-semibold text-xs rounded-full px-4 py-1.5 mb-3 border border-[#084c36]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
          <span>{t.galleryBadge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight">
          {t.galleryHeroTitle}
        </h1>

        <p className="mt-3 text-xs sm:text-sm lg:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {t.galleryHeroDesc}
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by keyword, hospital, slum, or activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-neutral-300 rounded-full pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-800 shadow-xs"
          />
        </div>

        {/* Dynamic Category Navigation Ribbon */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {/* All Chapters Button */}
          <button
            onClick={() => setActiveTab('all')}
            className={`text-xs px-3.5 py-2 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-[#084c36] text-white shadow-md scale-105'
                : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#FDB813]" />
            <span>🌟 All Seva Chapters</span>
          </button>

          {/* Recently Uploaded Button */}
          <button
            onClick={() => setActiveTab('recent')}
            className={`text-xs px-3.5 py-2 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'recent'
                ? 'bg-rose-700 text-white shadow-md scale-105'
                : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#FDB813]" />
            <span>🔥 Recently Uploaded</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-mono">
              {recentItems.length}
            </span>
          </button>

          {/* Individual Category Filter Tabs */}
          {categories.map((cat) => {
            const meta = getCategoryMeta(cat);
            const count = rawItems.filter((it) => it.category === cat).length;
            const isSelected = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-xs px-3.5 py-2 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#084c36] text-white shadow-md scale-105 font-bold'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                <span>{meta.icon}</span>
                <span className="truncate max-w-[140px] sm:max-w-none">{cat}</span>
                <span className="text-[10px] opacity-70 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-12">
        {/* CASE 1: RECENTLY UPLOADED VIEW */}
        {activeTab === 'recent' && (
          <div>
            <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-2">
                  <Flame className="w-4 h-4 text-[#FDB813]" />
                  <span>NEW GROUND UPLOADS FEED</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  🔥 Recently Uploaded Seva Photos
                </h2>
                <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-2xl">
                  Ground photos from our most recent hospital drives, slum distributions, and women empowerment workshops uploaded in the last few days.
                </p>
              </div>
            </div>

            {recentItems.filter(matchesSearch).length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8">
                <Flame className="w-10 h-10 text-rose-500 mx-auto mb-2 opacity-50" />
                <h3 className="text-base font-bold text-neutral-800">No recent activities match your filter</h3>
                <p className="text-xs text-neutral-500 mt-1">Admin can tag activities as 'Recently Uploaded' in the admin panel.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {recentItems.filter(matchesSearch).map((item) => (
                  <ActivityDetailCard
                    key={item.id}
                    item={item}
                    getItemImages={getItemImages}
                    onOpenLightbox={(imgIdx) => {
                      setActiveLightboxItem(item);
                      setActivePhotoIndex(imgIdx);
                    }}
                    onSponsor={() => handleSponsorFromGallery(item)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CASE 2: SINGLE CATEGORY FILTER SELECTED */}
        {activeTab !== 'all' && activeTab !== 'recent' && (
          <div>
            {(() => {
              const meta = getCategoryMeta(activeTab);
              const itemsInThisCat = rawItems.filter(
                (it) => it.category === activeTab && matchesSearch(it)
              );

              return (
                <div>
                  {/* Category Header Banner */}
                  <div
                    className={`bg-gradient-to-r ${meta.accentBg} rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden border ${meta.borderCol}`}
                  >
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-2">
                        <span className="text-base">{meta.icon}</span>
                        <span>{meta.badge}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {meta.icon} {meta.nameEn}
                      </h2>
                      <div className="text-sm font-semibold text-amber-300 font-serif mt-0.5">
                        {meta.nameHi}
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-200 mt-2 max-w-3xl leading-relaxed">
                        {meta.desc}
                      </p>
                    </div>
                  </div>

                  {itemsInThisCat.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8">
                      <h3 className="text-base font-bold text-neutral-800">No activities found</h3>
                      <p className="text-xs text-neutral-500 mt-1">Try clearing your search query.</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {itemsInThisCat.map((item) => (
                        <ActivityDetailCard
                          key={item.id}
                          item={item}
                          getItemImages={getItemImages}
                          onOpenLightbox={(imgIdx) => {
                            setActiveLightboxItem(item);
                            setActivePhotoIndex(imgIdx);
                          }}
                          onSponsor={() => handleSponsorFromGallery(item)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* CASE 3: ALL SEVA CHAPTERS (SCROLL DOWN TO SEE NARIYAL PANI, SLUM, SILAI, DIVYANG, ETC.) */}
        {activeTab === 'all' && (
          <div className="space-y-16">
            {categorizedGroups.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8">
                <h3 className="text-base font-bold text-neutral-800">No matching activities found</h3>
                <p className="text-xs text-neutral-500 mt-1">Try searching with a different keyword.</p>
              </div>
            ) : (
              categorizedGroups.map((group) => (
                <section
                  key={group.category}
                  className="bg-white/70 backdrop-blur-md rounded-3xl p-5 sm:p-8 border border-neutral-200/90 shadow-sm"
                >
                  {/* Distinct Chapter Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-neutral-200">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#084c36]/10 border border-[#084c36]/20 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                        {group.meta.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-xl sm:text-2xl font-bold text-neutral-950">
                            {group.category}
                          </h2>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono ${group.meta.badgeBg}`}
                          >
                            {group.meta.badge}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                          {group.meta.nameHi}
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 max-w-3xl leading-relaxed">
                          {group.meta.desc}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab(group.category)}
                      className="text-xs text-[#084c36] hover:underline font-bold self-start sm:self-center shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Focus this chapter ({group.items.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* All Activities in this Chapter with Multi-Photo Open Streams */}
                  <div className="space-y-8">
                    {group.items.map((item) => (
                      <ActivityDetailCard
                        key={item.id}
                        item={item}
                        getItemImages={getItemImages}
                        onOpenLightbox={(imgIdx) => {
                          setActiveLightboxItem(item);
                          setActivePhotoIndex(imgIdx);
                        }}
                        onSponsor={() => handleSponsorFromGallery(item)}
                      />
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        )}
      </div>

      {/* Expandable Glassmorphic Lightbox Overlay with Multi-Photo Carousel via Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeLightboxItem && (
              <div
                onClick={() => setActiveLightboxItem(null)}
                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/85 backdrop-blur-md"
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-neutral-200 relative flex flex-col max-h-[92vh]"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveLightboxItem(null)}
                    className="absolute top-4 right-4 z-30 text-white bg-black/70 hover:bg-black p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
                    title="Close Lightbox (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Large Multi-Photo Carousel Header */}
                  <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 flex-shrink-0 select-none">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${activeLightboxItem.id}-${activePhotoIndex}`}
                        src={
                          currentLightboxImages[
                            Math.min(activePhotoIndex, Math.max(0, currentLightboxImages.length - 1))
                          ] || activeLightboxItem.image
                        }
                        alt={`${activeLightboxItem.title} - Photo ${activePhotoIndex + 1}`}
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80') {
                            target.src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80';
                          }
                        }}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />

                    {/* Photo Counter Badge */}
                    {currentLightboxImages.length > 1 && (
                      <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 border border-white/20 shadow-xs">
                        <Camera className="w-3.5 h-3.5 text-[#FDB813]" />
                        <span>
                          Photo {activePhotoIndex + 1} of {currentLightboxImages.length}
                        </span>
                      </div>
                    )}

                    {/* Left and Right Carousel Arrows */}
                    {currentLightboxImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIndex((prev) =>
                              prev === 0 ? currentLightboxImages.length - 1 : prev - 1
                            );
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md hover:scale-110 active:scale-95"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIndex((prev) =>
                              prev === currentLightboxImages.length - 1 ? 0 : prev + 1
                            );
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md hover:scale-110 active:scale-95"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Bottom Overlay Info & Thumbnail Strip */}
                    <div className="absolute bottom-3 left-4 right-4 z-20 text-white">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="bg-[#FDB813] text-neutral-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                          {activeLightboxItem.category}
                        </span>
                        {activeLightboxItem.isRecent && (
                          <span className="bg-rose-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-300" />
                            <span>Recent</span>
                          </span>
                        )}
                        <span className="text-xs text-emerald-300 font-mono flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {activeLightboxItem.location}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold leading-tight drop-shadow-sm mb-2">
                        {activeLightboxItem.title}
                      </h3>

                      {/* Horizontal Thumbnail Ribbon */}
                      {currentLightboxImages.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
                          {currentLightboxImages.map((imgUrl, imgIdx) => (
                            <button
                              key={imgIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePhotoIndex(imgIdx);
                              }}
                              className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer shadow-xs ${
                                activePhotoIndex === imgIdx
                                  ? 'border-[#FDB813] ring-2 ring-[#FDB813]/60 scale-105 shadow-md'
                                  : 'border-white/50 opacity-60 hover:opacity-100 hover:border-white'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`Thumbnail ${imgIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Detailed Story & Telemetry */}
                  <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-neutral-800 space-y-4">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-1 font-mono">
                        On-Ground Truth Report
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                        {activeLightboxItem.fullStory}
                      </p>
                    </div>

                    <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">On-Ground Impact Metric:</strong>
                        <span>{activeLightboxItem.impactMetrics}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 text-xs">
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-mono">
                          Verified Metric
                        </span>
                        <strong className="text-emerald-800 font-bold text-sm">
                          {activeLightboxItem.stats}
                        </strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-mono">
                          Ledger Verification
                        </span>
                        <strong className="text-neutral-900 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          Section 8 80G Certified
                        </strong>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleSponsorFromGallery(activeLightboxItem)}
                        className="flex-1 bg-[#084c36] hover:bg-[#063b2a] text-white py-3 px-5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <HeartHandshake className="w-4 h-4 text-[#FDB813]" />
                        <span>Sponsor This Exact Drive</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setActiveLightboxItem(null);
                          onOpenRecruitment();
                        }}
                        className="sm:w-auto px-4 py-3 border border-neutral-300 rounded-2xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        Join As Ground Volunteer
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

// MULTI-PHOTO OPEN STRIP ACTIVITY CARD COMPONENT
interface ActivityCardProps {
  item: GalleryItem;
  getItemImages: (item: GalleryItem) => string[];
  onOpenLightbox: (photoIndex: number) => void;
  onSponsor: () => void;
}

const ActivityDetailCard: React.FC<ActivityCardProps> = ({
  item,
  getItemImages,
  onOpenLightbox,
  onSponsor,
}) => {
  const images = getItemImages(item);

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden p-4 sm:p-6">
      {/* Activity Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-neutral-200">
              {item.category}
            </span>
            {item.isRecent && (
              <span className="bg-rose-100 text-rose-800 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-600" />
                <span>Recently Uploaded</span>
              </span>
            )}
            <span className="text-[11px] text-neutral-500 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-500" />
              {item.date}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
            {item.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-emerald-800 font-medium mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Impact Badge */}
        <div className="self-start sm:self-center shrink-0">
          <span className="inline-block bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full font-mono">
            {item.stats}
          </span>
        </div>
      </div>

      {/* ALL PHOTOS VISIBLE ON SCROLL: OPEN MULTI-PHOTO MOSAIC */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2 font-mono">
          <span className="flex items-center gap-1 font-semibold text-neutral-700">
            <Images className="w-3.5 h-3.5 text-[#084c36]" />
            <span>Ground Photo Evidence ({images.length} Photos)</span>
          </span>
          <span className="text-[11px] text-neutral-400">Tap any photo to zoom in lightbox</span>
        </div>

        {/* Layout based on photo count: All pictures are directly visible */}
        {images.length === 1 && (
          <div
            onClick={() => onOpenLightbox(0)}
            className="relative h-64 sm:h-80 rounded-2xl overflow-hidden cursor-pointer group bg-neutral-100 border border-neutral-200"
          >
            <img
              src={images[0]}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-xs">
              <Camera className="w-4 h-4 text-[#FDB813]" />
              <span>Tap to Open Lightbox</span>
            </div>
          </div>
        )}

        {images.length === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => onOpenLightbox(idx)}
                className="relative h-56 sm:h-64 rounded-2xl overflow-hidden cursor-pointer group bg-neutral-100 border border-neutral-200"
              >
                <img
                  src={img}
                  alt={`${item.title} ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-sm">
                  Photo #{idx + 1}
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-xs">
                  <Camera className="w-4 h-4 text-[#FDB813]" />
                  <span>Zoom Photo #{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => onOpenLightbox(idx)}
                className="relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer group bg-neutral-100 border border-neutral-200"
              >
                <img
                  src={img}
                  alt={`${item.title} ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-sm">
                  Photo #{idx + 1}
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-xs">
                  <Camera className="w-4 h-4 text-[#FDB813]" />
                  <span>Zoom</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length >= 4 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => onOpenLightbox(idx)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-neutral-100 border border-neutral-200 ${
                  idx === 0 ? 'h-48 sm:h-56 col-span-2' : 'h-48 sm:h-56'
                }`}
              >
                <img
                  src={img}
                  alt={`${item.title} ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-sm">
                  Photo #{idx + 1}
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-xs">
                  <Camera className="w-4 h-4 text-[#FDB813]" />
                  <span>Zoom</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary and Verification Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
        <p className="text-xs text-neutral-600 leading-relaxed max-w-2xl">
          {item.summary}
        </p>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => onOpenLightbox(0)}
            className="text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-full font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Images className="w-3.5 h-3.5 text-neutral-500" />
            <span>Full Story ({images.length})</span>
          </button>

          <button
            onClick={onSponsor}
            className="text-xs text-white bg-[#084c36] hover:bg-[#063b2a] px-3.5 py-1.5 rounded-full font-semibold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-[#FDB813]" />
            <span>Sponsor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
