import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, RefreshCw, Mail, Phone, MapPin, Building2 } from 'lucide-react';
import { OFFICIAL_INFO } from '../data/mockData';

export type PolicyTab = 'terms' | 'privacy' | 'refund' | 'contact';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = React.useState<PolicyTab>(initialTab);
  const prevInitialTabRef = React.useRef(initialTab);

  React.useEffect(() => {
    if (initialTab !== prevInitialTabRef.current) {
      prevInitialTabRef.current = initialTab;
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        />

        {/* Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-neutral-200 z-10"
        >
          {/* Header */}
          <div className="bg-[#084c36] text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FDB813] text-neutral-900 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-[#084c36]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold tracking-tight">
                  Legal & Compliance Portal
                </h3>
                <p className="text-[11px] text-emerald-200 font-medium">
                  RiseUpHelp Initiative Foundation • Razorpay KYC Certified
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-200 bg-neutral-50 px-3 pt-2 gap-1 overflow-x-auto text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-2 rounded-t-xl border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'privacy'
                  ? 'border-[#084c36] bg-white text-[#084c36] shadow-xs'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-2 rounded-t-xl border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'terms'
                  ? 'border-[#084c36] bg-white text-[#084c36] shadow-xs'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms & Conditions</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('refund')}
              className={`px-3 py-2 rounded-t-xl border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'refund'
                  ? 'border-[#084c36] bg-white text-[#084c36] shadow-xs'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Donation Refund Policy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className={`px-3 py-2 rounded-t-xl border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'contact'
                  ? 'border-[#084c36] bg-white text-[#084c36] shadow-xs'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-neutral-700 text-xs sm:text-sm leading-relaxed">
            {activeTab === 'privacy' && (
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-neutral-900">Privacy Policy</h4>
                <p className="text-[11px] text-neutral-500">Last updated: September 2026</p>
                <p>
                  <strong>RiseUpHelp Initiative Foundation</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;the Organization&quot;) is committed to protecting the privacy and security of your personal information. This Privacy Policy governs the collection, use, and safeguarding of donor data.
                </p>

                <h5 className="font-bold text-neutral-900 text-xs sm:text-sm pt-1">1. Information We Collect</h5>
                <p>
                  When you make a donation or register on our platform, we collect:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full Name and Contact details (Mobile Number and Email Address).</li>
                  <li>Permanent Account Number (PAN) for donors requesting 80G tax exemption certificates as required by the Income Tax Department of India.</li>
                  <li>Transaction reference ID and payment timestamps generated via our official payment gateway (Razorpay).</li>
                </ul>

                <h5 className="font-bold text-neutral-900 text-xs sm:text-sm pt-1">2. Payment Card and Banking Data</h5>
                <p>
                  We <strong>DO NOT</strong> store your debit/credit card numbers, CVV, or NetBanking credentials on our servers. All financial transactions are processed through RBI-authorized, PCI-DSS Level 1 compliant payment gateways (Razorpay Software Private Limited).
                </p>

                <h5 className="font-bold text-neutral-900 text-xs sm:text-sm pt-1">3. Use of Personal Information</h5>
                <p>Your details are used strictly for:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Issuing official 80G donation receipts and compliance reporting.</li>
                  <li>Sending automated transaction alerts and ground photo verification updates via SMS or WhatsApp.</li>
                  <li>Auditing and statutory accounting under the Companies Act and Indian NGO regulations.</li>
                </ul>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-neutral-900">Terms & Conditions of Service</h4>
                <p className="text-[11px] text-neutral-500">Last updated: September 2026</p>
                <p>
                  Welcome to <strong>RiseUpHelp Initiative Foundation</strong>. By accessing this platform or making a charitable contribution, you agree to comply with and be bound by the following terms and conditions.
                </p>

                <h5 className="font-bold text-neutral-900 text-xs sm:text-sm pt-1">1. Organization Nature & Purpose</h5>
                <p>
                  RiseUpHelp Initiative Foundation is a registered Section 8 Non-Profit Corporation operating under the Ministry of Corporate Affairs, Government of India (CIN: {OFFICIAL_INFO.cinNumber}). Contributions received are allocated towards on-ground patient relief, cancer pediatric nutrition, hospital kits, and child education support at RUHS and SMS Medical College, Jaipur.
                </p>

                <h5 className="font-bold text-neutral-900 text-xs sm:text-sm pt-1">2. Tax Deductibility (Section 80G)</h5>
                <p>
                  Donations made to RiseUpHelp Initiative Foundation are eligible for 50% deduction under Section 80G of the Income Tax Act, 1961. Donors must provide their valid PAN card number during donation to receive a certified tax exemption receipt.
                </p>

                <h5 className="font-bold text-neutral-900 text-xs sm:text-sm pt-1">3. Payment Gateway Authorization</h5>
                <p>
                  All online payments are securely processed through Razorpay. You warrant that you are authorized to use the chosen payment method (UPI, Debit Card, Credit Card, or NetBanking).
                </p>
              </div>
            )}

            {activeTab === 'refund' && (
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-neutral-900">Donation Refund & Cancellation Policy</h4>
                <p className="text-[11px] text-neutral-500">Last updated: September 2026</p>
                <p>
                  RiseUpHelp Initiative Foundation takes the trust of its donors with utmost seriousness. Because donations are immediately mobilized for on-ground procurement of patient food kits, medical nutrition, and relief material, charitable donations are generally non-refundable.
                </p>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 space-y-1">
                  <strong>Exceptional Refund Conditions:</strong>
                  <p>
                    Refunds are processed solely in the case of:
                  </p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Accidental duplicate transactions where an amount was debited more than once for the same donation.</li>
                    <li>Technical error or excess deduction by the payment gateway or bank.</li>
                    <li>Unauthorized fraudulent transaction reported by the legitimate cardholder.</li>
                  </ul>
                </div>

                <h5 className="font-bold text-neutral-900 text-xs sm:text-sm pt-1">How to Request a Refund:</h5>
                <p>
                  If you have experienced a duplicate deduction or erroneous charge, please contact our accounts desk within <strong>7 days</strong> of the transaction:
                </p>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs space-y-1">
                  <p>• <strong>Email:</strong> {OFFICIAL_INFO.email || 'support@riseuphelp.org'}</p>
                  <p>• <strong>Phone / WhatsApp:</strong> +91 {OFFICIAL_INFO.phone}</p>
                  <p>• <strong>Required Details:</strong> Donor Name, Transaction Date, Amount, and Razorpay Payment ID.</p>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Approved refunds will be credited back to the original payment source (bank account / card) within 5 to 7 business days as per banking norms.
                </p>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-neutral-900">Official Contact Information</h4>
                <p className="text-xs text-neutral-600">
                  For inquiries, corporate partnerships, on-ground verification, or grievance redressal:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 space-y-1">
                    <div className="flex items-center gap-2 text-[#084c36] font-bold text-xs">
                      <Building2 className="w-4 h-4" />
                      <span>Registered Office</span>
                    </div>
                    <p className="text-xs text-neutral-800 font-medium">
                      RiseUpHelp Initiative Foundation
                    </p>
                    <p className="text-[11px] text-neutral-600">
                      Jaipur, Rajasthan, 302001, India
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono">
                      CIN: {OFFICIAL_INFO.cinNumber}
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 space-y-1">
                    <div className="flex items-center gap-2 text-[#084c36] font-bold text-xs">
                      <Phone className="w-4 h-4" />
                      <span>Helpline & Seva Desks</span>
                    </div>
                    <p className="text-xs text-neutral-800 font-semibold font-mono">
                      +91 {OFFICIAL_INFO.phone}
                    </p>
                    <p className="text-[11px] text-neutral-600">
                      RUHS & SMS Hospital Jaipur On-Ground Coordinator Desk
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 space-y-1">
                    <div className="flex items-center gap-2 text-[#084c36] font-bold text-xs">
                      <Mail className="w-4 h-4" />
                      <span>Email Support</span>
                    </div>
                    <p className="text-xs text-neutral-800 font-semibold">
                      {OFFICIAL_INFO.email || 'support@riseuphelp.org'}
                    </p>
                    <p className="text-[11px] text-neutral-600">
                      80G Certificates & Donor Receipts
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 space-y-1">
                    <div className="flex items-center gap-2 text-[#084c36] font-bold text-xs">
                      <MapPin className="w-4 h-4" />
                      <span>Hospital Seva Nodes</span>
                    </div>
                    <p className="text-xs text-neutral-800">
                      RUHS Pediatric Ward & SMS Hospital Oncology Relief
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-neutral-50 px-5 py-3 border-t border-neutral-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
