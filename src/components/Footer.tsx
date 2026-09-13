import React, { useState } from 'react';
import { ShieldCheck, Phone, MapPin, ArrowUp } from 'lucide-react';
import { OFFICIAL_INFO } from '../data/mockData';
import { PolicyModal, type PolicyTab } from './PolicyModal';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  const [localPolicyOpen, setLocalPolicyOpen] = useState(false);
  const [localPolicyTab, setLocalPolicyTab] = useState<PolicyTab>('privacy');

  const handleOpenTab = (tab: PolicyTab) => {
    if (onOpenPolicy) {
      onOpenPolicy(tab);
    } else {
      setLocalPolicyTab(tab);
      setLocalPolicyOpen(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-[#084c36] text-white rounded-3xl mx-2 sm:mx-4 mb-16 sm:mb-4 pb-6 sm:pb-0 p-8 sm:p-12 relative overflow-hidden border border-emerald-900 shadow-xl">
      {/* Decorative Glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#FDB813]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-white/15">
        {/* Col 1: Brand & Registration */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center shadow">
              <img
                src="/logo.png"
                alt="RiseUpHelp Initiative Foundation Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">RiseUpHelp</h3>
              <p className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">
                Initiative Foundation
              </p>
            </div>
          </div>

          <p className="text-sm text-emerald-100/90 leading-relaxed font-serif italic">
            "{OFFICIAL_INFO.tagline}"
          </p>
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            Registered Section 8 Non-Profit Foundation operating under the Ministry of Corporate Affairs, Govt of India. 80G & 12A Certified for 50% income tax exemption.
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#FDB813]">
            <div className="flex items-center gap-2 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/60">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>CIN: {OFFICIAL_INFO.cinNumber}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Hospital & Education Links */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FDB813]">
            Verified Impact Tracks
          </h4>
          <ul className="space-y-2 text-xs text-emerald-100/90">
            <li>
              <a href="#sponsorship-grid" className="hover:text-white transition-colors">
                • Tender Coconut Water Seva (RUHS)
              </a>
            </li>
            <li>
              <a href="#sponsorship-grid" className="hover:text-white transition-colors">
                • Pomegranate Hospital Drives (SMS)
              </a>
            </li>
            <li>
              <a href="#sponsorship-grid" className="hover:text-white transition-colors">
                • Girl Child School Bags (Chhoti Chaupar)
              </a>
            </li>
            <li>
              <a href="#sponsorship-grid" className="hover:text-white transition-colors">
                • Cancer Warriors Lifeline Care
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Direct UPI & Contact */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FDB813]">
            Official Registry Node
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-200">
              <span className="font-semibold text-white">Direct UPI ID:</span>
              <span className="font-mono text-[#FDB813] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                {OFFICIAL_INFO.upiId}
              </span>
            </div>

            <div className="flex items-center gap-2 text-emerald-200">
              <Phone className="w-3.5 h-3.5 text-[#FDB813]" />
              <span>{OFFICIAL_INFO.phone}</span>
            </div>

            <div className="flex items-center gap-2 text-emerald-200">
              <svg className="w-3.5 h-3.5 text-[#FDB813] fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <a
                href={OFFICIAL_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white"
              >
                {OFFICIAL_INFO.handle} (Instagram)
              </a>
            </div>

            <div className="flex items-center gap-2 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-[#FDB813]" />
              <span>Jaipur, Rajasthan, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Policy Links */}
      <div className="max-w-6xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} RiseUpHelp Initiative Foundation. All rights reserved.</span>
        </div>

        {/* Mandatory Razorpay KYC Compliance Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-emerald-200">
          <button
            type="button"
            onClick={() => handleOpenTab('privacy')}
            className="hover:text-white underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => handleOpenTab('terms')}
            className="hover:text-white underline cursor-pointer"
          >
            Terms & Conditions
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => handleOpenTab('refund')}
            className="hover:text-white underline cursor-pointer"
          >
            Refund Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => handleOpenTab('contact')}
            className="hover:text-white underline cursor-pointer"
          >
            Contact Us
          </button>
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors cursor-pointer text-xs font-medium"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Razorpay Compliance Legal Modal */}
      <PolicyModal
        isOpen={localPolicyOpen}
        onClose={() => setLocalPolicyOpen(false)}
        initialTab={localPolicyTab}
      />
    </footer>
  );
};
