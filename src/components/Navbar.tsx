import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShoppingBag, Menu, X, Flame, Heart, BookOpen, Camera, Home, Users, User } from 'lucide-react';
import type { DonorProfile } from '../types';
import type { LanguageMode } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

export type AppView = 'home' | 'ekadashi' | 'cancer-warriors' | 'education' | 'gallery' | 'volunteer';

interface NavbarProps {
  activeView: AppView;
  onNavigateView: (view: AppView) => void;
  onOpenSponsorModal: () => void;
  onOpenRecruitment?: () => void;
  onOpenCart?: () => void;
  onOpenAdmin?: () => void;
  onOpenAuthModal?: () => void;
  currentUser?: DonorProfile | null;
  cartCount?: number;
  language?: LanguageMode;
  onChangeLanguage?: (lang: LanguageMode) => void;
  logoUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView = 'home',
  onNavigateView,
  onOpenSponsorModal,
  onOpenCart,
  onOpenAdmin,
  onOpenAuthModal,
  currentUser,
  cartCount = 1,
  language = 'en',
  onChangeLanguage,
  logoUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Secret Hotkey (Ctrl + Shift + A) & URL Query Listener (?admin=true)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (onOpenAdmin) onOpenAdmin();
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || window.location.hash === '#admin') {
      if (onOpenAdmin) onOpenAdmin();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenAdmin]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: AppView) => {
    setMobileMenuOpen(false);
    onNavigateView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoTripleClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 3) {
      setLogoClicks(0);
      if (onOpenAdmin) onOpenAdmin();
    }
    setTimeout(() => setLogoClicks(0), 1200);
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-2 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* BRAND LOGO PILL (Triple-click for secret admin entrance) */}
        <div className="pointer-events-auto shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              scale: { type: 'spring', stiffness: 300, damping: 24 },
            }}
            onClick={handleLogoTripleClick}
            className="flex items-center gap-2 sm:gap-3 bg-white rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-md border border-neutral-200/90 hover:shadow-lg hover:border-amber-300/80 transition-all cursor-pointer select-none relative z-50"
            title="RiseUpHelp Initiative Foundation • Jaipur Node"
          >
            {/* Logo Image */}
            <div className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center overflow-hidden">
              <img
                src={logoUrl || "/logo.png"}
                alt="RiseUpHelp Initiative Foundation"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>

            <div className="flex flex-col" onClick={() => handleNavClick('home')}>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-neutral-950 text-xs sm:text-sm tracking-tight">
                  RiseUpHelp
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#084c36] animate-pulse" />
              </div>
              <span className="block text-[8px] sm:text-[10px] text-neutral-500 font-mono uppercase tracking-wider font-semibold leading-none mt-0.5">
                Initiative Foundation
              </span>
            </div>
          </motion.div>
        </div>

        {/* CENTER FLOATING MULTI-PAGE NAVIGATION BAR */}
        <nav className="pointer-events-auto hidden lg:flex items-center justify-center">
          <div
            className={`flex items-center gap-1 rounded-full p-1.5 transition-all duration-300 border ${
              isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md border-neutral-200/90'
                : 'bg-white/85 backdrop-blur-md shadow-xs border-neutral-200/70'
            }`}
          >
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'home'
                  ? 'bg-[#084c36] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.navHome}</span>
            </button>

            {/* 2. Har Ekadashi Seva Page */}
            <button
              onClick={() => handleNavClick('ekadashi')}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'ekadashi'
                  ? 'bg-[#084c36] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#FDB813]" />
              <span>{t.navEkadashi}</span>
            </button>

            {/* 3. Cancer Warriors Lifeline Page */}
            <button
              onClick={() => handleNavClick('cancer-warriors')}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'cancer-warriors'
                  ? 'bg-[#084c36] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>{t.navWarriors}</span>
            </button>

            {/* 4. Children & Livelihood Page */}
            <button
              onClick={() => handleNavClick('education')}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'education'
                  ? 'bg-[#084c36] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.navEducation}</span>
            </button>

            {/* 5. Live Media Gallery Page */}
            <button
              onClick={() => handleNavClick('gallery')}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'gallery'
                  ? 'bg-[#084c36] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.navGallery}</span>
            </button>
          </div>
        </nav>

        {/* TOP-RIGHT ACTION CLUSTER */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* 1-Tap Quick Language Switcher (EN | हिंदी) */}
          <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full p-0.5 sm:p-1 border border-neutral-200/90 shadow-xs">
            <button
              onClick={() => onChangeLanguage && onChangeLanguage('en')}
              className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#084c36] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => onChangeLanguage && onChangeLanguage('hi')}
              className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#084c36] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
              title="हिंदी"
            >
              हिंदी
            </button>
            <button
              onClick={() => onChangeLanguage && onChangeLanguage('hinglish')}
              className={`px-1.5 sm:px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                language === 'hinglish'
                  ? 'bg-[#084c36] text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-950'
              }`}
              title="Hinglish"
            >
              Hing
            </button>
          </div>

          {/* Active Donor Profile Badge or Clean Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="hidden sm:flex items-center gap-1.5 bg-white/90 hover:bg-white backdrop-blur-md border border-neutral-200 rounded-full px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-xs cursor-pointer transition-all"
                title={`Logged in as ${currentUser.fullName} (${currentUser.donorId})`}
              >
                <div className="w-5 h-5 rounded-full bg-[#084c36] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{currentUser.fullName.split(' ')[0]}</span>
                <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-mono">
                  ID Verified
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl p-4 shadow-xl border border-neutral-200 text-xs z-50 animate-in fade-in">
                  <div className="pb-2 border-b border-neutral-100">
                    <span className="text-[10px] text-neutral-400 font-mono block">DONOR IDENTIFIER</span>
                    <strong className="text-neutral-900 text-sm block font-mono">{currentUser.donorId}</strong>
                    <span className="text-neutral-600 font-medium block mt-0.5">{currentUser.fullName} (+91 {currentUser.phone})</span>
                    {currentUser.dob && <span className="text-[10px] text-neutral-500 block">DOB: {currentUser.dob}</span>}
                    {currentUser.panNumber && (
                      <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 block mt-1">
                        PAN: {currentUser.panNumber}
                      </span>
                    )}
                  </div>
                  <div className="py-2.5 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Total Donated:</span>
                      <strong className="text-[#084c36] font-bold">₹{currentUser.totalDonated.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Patron Level:</span>
                      <span className="text-amber-800 font-semibold">{currentUser.badge}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('ruh_donor_user');
                      window.location.reload();
                    }}
                    className="w-full text-center text-[11px] text-red-600 hover:underline pt-2 border-t border-neutral-100 cursor-pointer"
                  >
                    Logout / Clear Profile
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="hidden sm:flex items-center gap-1.5 bg-white/90 hover:bg-white text-neutral-800 border border-neutral-300/80 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-neutral-600" />
              <span>{t.navSignIn}</span>
            </button>
          )}

          {/* Cart Tray Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart || onOpenSponsorModal}
            title="View Sponsorship Tray"
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-neutral-800 border border-neutral-200/90 shadow-sm transition-all relative cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#084c36] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Be a Volunteer Button -> Navigates to Volunteer Page */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleNavClick('volunteer')}
            className={`group inline-flex items-center gap-1 sm:gap-2 text-[11px] sm:text-[13px] font-bold rounded-full pl-2.5 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0 ${
              activeView === 'volunteer'
                ? 'bg-[#FDB813] text-neutral-950 shadow-md font-extrabold'
                : 'bg-[#084c36] hover:bg-[#063b2a] text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#FDB813]" />
            <span className="hidden sm:inline">{t.navVolunteer}</span>
            <span className="sm:hidden font-bold">Volunteer</span>
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </motion.button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white text-neutral-800 border border-neutral-200 shadow-xs focus:outline-none shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-neutral-200 pointer-events-auto flex flex-col gap-2 text-xs"
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2 text-left font-semibold rounded-xl flex items-center gap-2 ${
                activeView === 'home' ? 'bg-[#084c36] text-white' : 'text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.navHome}</span>
            </button>
            <button
              onClick={() => handleNavClick('ekadashi')}
              className={`p-2 text-left font-semibold rounded-xl flex items-center gap-2 ${
                activeView === 'ekadashi' ? 'bg-[#084c36] text-white' : 'text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-500" />
              <span>{t.navEkadashi}</span>
            </button>
            <button
              onClick={() => handleNavClick('cancer-warriors')}
              className={`p-2 text-left font-semibold rounded-xl flex items-center gap-2 ${
                activeView === 'cancer-warriors' ? 'bg-[#084c36] text-white' : 'text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>{t.navWarriors}</span>
            </button>
            <button
              onClick={() => handleNavClick('education')}
              className={`p-2 text-left font-semibold rounded-xl flex items-center gap-2 ${
                activeView === 'education' ? 'bg-[#084c36] text-white' : 'text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>{t.navEducation}</span>
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`p-2 text-left font-semibold rounded-xl flex items-center gap-2 ${
                activeView === 'gallery' ? 'bg-[#084c36] text-white' : 'text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>{t.navGallery}</span>
            </button>

            {/* Prominent Be a Volunteer Card in Mobile Drawer */}
            <button
              onClick={() => handleNavClick('volunteer')}
              className={`p-3 text-left font-bold rounded-xl flex items-center justify-between transition-all ${
                activeView === 'volunteer'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-[#084c36] border border-emerald-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#084c36]" />
                <span className="font-extrabold">{t.navVolunteer}</span>
              </div>
              <span className="text-[10px] bg-[#084c36] text-white px-2 py-0.5 rounded-full font-mono font-bold">
                Join Squad ⭐
              </span>
            </button>

            {!currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuthModal) onOpenAuthModal();
                }}
                className="p-2.5 text-left font-bold rounded-xl flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 cursor-pointer transition-colors"
              >
                <User className="w-4 h-4 text-[#084c36]" />
                <span>{t.navSignIn}</span>
              </button>
            )}

            {/* Mobile Drawer Language Switcher */}
            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-neutral-500 font-medium text-[11px]">{t.selectLanguage}:</span>
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
                <button
                  onClick={() => onChangeLanguage && onChangeLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    language === 'en' ? 'bg-[#084c36] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onChangeLanguage && onChangeLanguage('hi')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    language === 'hi' ? 'bg-[#084c36] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => onChangeLanguage && onChangeLanguage('hinglish')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    language === 'hinglish' ? 'bg-[#084c36] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Hing
                </button>
              </div>
            </div>

            {currentUser && (
              <div className="mt-2 pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px]">
                <span className="text-neutral-500">{t.donorId}: <strong className="font-mono text-neutral-800">{currentUser.donorId}</strong></span>
                <span className="font-bold text-[#084c36]">₹{currentUser.totalDonated.toLocaleString('en-IN')}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MOBILE BOTTOM APP DOCK (1-Tap Fast Switcher for Phones - Always 100% Accessible) */}
      <div className="lg:hidden fixed bottom-2 inset-x-2 sm:inset-x-4 z-50 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-1 shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-neutral-200/90 flex items-center justify-around gap-0.5">
          {/* Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all cursor-pointer flex-1 ${
              activeView === 'home' ? 'text-[#084c36] font-bold bg-emerald-50' : 'text-neutral-500'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[8px] truncate">{t.navHome}</span>
          </button>

          {/* Ekadashi */}
          <button
            onClick={() => handleNavClick('ekadashi')}
            className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all cursor-pointer flex-1 ${
              activeView === 'ekadashi' ? 'text-[#084c36] font-bold bg-emerald-50' : 'text-neutral-500'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-[8px] truncate">Ekadashi</span>
          </button>

          {/* Cancer */}
          <button
            onClick={() => handleNavClick('cancer-warriors')}
            className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all cursor-pointer flex-1 ${
              activeView === 'cancer-warriors' ? 'text-rose-600 font-bold bg-rose-50' : 'text-neutral-500'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-[8px] truncate">Warriors</span>
          </button>

          {/* Education */}
          <button
            onClick={() => handleNavClick('education')}
            className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all cursor-pointer flex-1 ${
              activeView === 'education' ? 'text-amber-700 font-bold bg-amber-50' : 'text-neutral-500'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="text-[8px] truncate">Education</span>
          </button>

          {/* Be a Volunteer (Always on Mobile Dock!) */}
          <button
            onClick={() => handleNavClick('volunteer')}
            className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all cursor-pointer flex-1 ${
              activeView === 'volunteer'
                ? 'text-amber-950 font-bold bg-amber-300 shadow-xs'
                : 'text-[#084c36] font-bold bg-emerald-50/80 border border-emerald-200/60'
            }`}
          >
            <Users className="w-4 h-4 text-[#084c36]" />
            <span className="text-[8px] truncate font-bold">Volunteer</span>
          </button>

          {/* Gallery */}
          <button
            onClick={() => handleNavClick('gallery')}
            className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all cursor-pointer flex-1 ${
              activeView === 'gallery' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-neutral-500'
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-600" />
            <span className="text-[8px] truncate">Gallery</span>
          </button>

          {/* Profile / Login */}
          <button
            onClick={currentUser ? () => setUserDropdownOpen(true) : onOpenAuthModal}
            className="flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl text-[#084c36] font-bold bg-neutral-100 hover:bg-neutral-200 cursor-pointer flex-1"
          >
            <div className="w-4 h-4 rounded-full bg-[#084c36] text-white flex items-center justify-center text-[8px]">
              {currentUser ? currentUser.fullName.charAt(0).toUpperCase() : <User className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className="text-[8px] truncate">{currentUser ? t.navProfile : t.navSignIn}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
