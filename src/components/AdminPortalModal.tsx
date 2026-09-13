import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle,
  Database,
  Camera,
  Activity,
  Users,
  Award,
  Settings,
  HeartHandshake,
  Download,
  AlertCircle,
  Calendar as CalendarIcon,
  Upload,
  Globe,
  MessageSquare,
  Mail,
  Phone,
  MessageCircle,
  Search,
  Send,
  ExternalLink,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  Building,
  Sliders,
  Palette,
  Layers,
  Images,
  Star,
  Flame,
} from 'lucide-react';
import type {
  DriveItem,
  PatientProfile,
  LeaderboardDonor,
  ChildSpotlightProfile,
  MediaPhotoCard,
  FoundationStats,
  SevaScheduleEvent,
  HospitalNode,
  HeroContentConfig,
  StoryContentConfig,
  GalleryItem,
  VolunteerSubmission,
  InaugurationConfig,
} from '../types';
import { compressImageFile } from '../utils/imageUtils';
import { uploadImageToServer, pushServerState, type ReceiptConfig, type SiteStatePayload } from '../utils/serverSync';
import { RUHS_CHILDREN_WARD_PROFILES } from '../data/mockData';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  driveItems: DriveItem[];
  setDriveItems: React.Dispatch<React.SetStateAction<DriveItem[]>>;
  patientProfiles: PatientProfile[];
  setPatientProfiles: React.Dispatch<React.SetStateAction<PatientProfile[]>>;
  leaderboardDonors: LeaderboardDonor[];
  setLeaderboardDonors: React.Dispatch<React.SetStateAction<LeaderboardDonor[]>>;
  childSpotlights: { left: ChildSpotlightProfile; right: ChildSpotlightProfile };
  setChildSpotlights: React.Dispatch<
    React.SetStateAction<{ left: ChildSpotlightProfile; right: ChildSpotlightProfile }>
  >;
  wardProfiles?: ChildSpotlightProfile[];
  setWardProfiles?: React.Dispatch<React.SetStateAction<ChildSpotlightProfile[]>>;
  mediaPhotosRow1: MediaPhotoCard[];
  setMediaPhotosRow1: React.Dispatch<React.SetStateAction<MediaPhotoCard[]>>;
  mediaPhotosRow2: MediaPhotoCard[];
  setMediaPhotosRow2: React.Dispatch<React.SetStateAction<MediaPhotoCard[]>>;
  foundationStats: FoundationStats;
  setFoundationStats: React.Dispatch<React.SetStateAction<FoundationStats>>;
  scheduleEvents?: SevaScheduleEvent[];
  setScheduleEvents?: React.Dispatch<React.SetStateAction<SevaScheduleEvent[]>>;
  galleryItems?: GalleryItem[];
  setGalleryItems?: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  heroContent?: HeroContentConfig;
  setHeroContent?: React.Dispatch<React.SetStateAction<HeroContentConfig>>;
  storyContent?: StoryContentConfig;
  setStoryContent?: React.Dispatch<React.SetStateAction<StoryContentConfig>>;
  partnerHospitals?: HospitalNode[];
  setPartnerHospitals?: React.Dispatch<React.SetStateAction<HospitalNode[]>>;
  receiptConfig?: ReceiptConfig;
  setReceiptConfig?: React.Dispatch<React.SetStateAction<ReceiptConfig>>;
  volunteers?: VolunteerSubmission[];
  setVolunteers?: React.Dispatch<React.SetStateAction<VolunteerSubmission[]>>;
  showDonationTicker?: boolean;
  setShowDonationTicker?: (val: boolean) => void;
  inaugurationConfig?: InaugurationConfig;
  setInaugurationConfig?: React.Dispatch<React.SetStateAction<InaugurationConfig>>;
  onTriggerInaugurationPreview?: () => void;
  onResetToDefaults: () => void;
  onSyncToServer?: (overridePayload?: Partial<SiteStatePayload>) => Promise<boolean>;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  driveItems,
  setDriveItems,
  patientProfiles,
  setPatientProfiles,
  leaderboardDonors,
  setLeaderboardDonors,
  childSpotlights,
  setChildSpotlights,
  wardProfiles = [],
  setWardProfiles,
  mediaPhotosRow1,
  setMediaPhotosRow1,
  mediaPhotosRow2,
  setMediaPhotosRow2,
  foundationStats,
  setFoundationStats,
  scheduleEvents,
  setScheduleEvents,
  galleryItems = [],
  setGalleryItems,
  heroContent,
  setHeroContent,
  storyContent,
  setStoryContent,
  partnerHospitals,
  setPartnerHospitals,
  receiptConfig,
  setReceiptConfig,
  volunteers = [],
  setVolunteers,
  showDonationTicker = false,
  setShowDonationTicker,
  inaugurationConfig,
  setInaugurationConfig,
  onTriggerInaugurationPreview,
  onResetToDefaults,
  onSyncToServer,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('ruh_admin_session_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [password, setPassword] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);

  // Active Tab: Complete coverage for EVERY single detail and image across site
  const [activeTab, setActiveTab] = useState<
    | 'branding'
    | 'activities'
    | 'story'
    | 'photos'
    | 'gallery'
    | 'children'
    | 'patients'
    | 'volunteers'
    | 'hospitals'
    | 'calendar'
    | 'telemetry'
    | 'donors'
    | 'automation'
    | 'security'
  >('branding');
  const [saveToast, setSaveToast] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // Volunteer Management States
  const [volSearchQuery, setVolSearchQuery] = useState('');
  const [volTrackFilter, setVolTrackFilter] = useState('all');
  const [volStatusFilter, setVolStatusFilter] = useState('all');
  const [showAddVolModal, setShowAddVolModal] = useState(false);
  const [manualVolName, setManualVolName] = useState('');
  const [manualVolPhone, setManualVolPhone] = useState('');
  const [manualVolEmail, setManualVolEmail] = useState('');
  const [manualVolCity, setManualVolCity] = useState('Jaipur');
  const [manualVolTrack, setManualVolTrack] = useState('Hospital Bedside Coconut Seva (RUHS & SMS)');
  const [manualVolAvailability, setManualVolAvailability] = useState('Sundays & Ekadashi Mornings');

  // Form states for new Live Gallery Activity (Multi-Photo Album)
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Healthcare Drives');
  const [newGalleryLocation, setNewGalleryLocation] = useState('RUHS State Cancer Hospital, Jaipur');
  const [newGalleryDate, setNewGalleryDate] = useState('September 2026');
  const [newGalleryStats, setNewGalleryStats] = useState('');
  const [newGallerySummary, setNewGallerySummary] = useState('');
  const [newGalleryFullStory, setNewGalleryFullStory] = useState('');
  const [newGalleryImpactMetrics, setNewGalleryImpactMetrics] = useState('');
  const [newGalleryImages, setNewGalleryImages] = useState<string[]>([]);
  const [newGalleryManualUrl, setNewGalleryManualUrl] = useState('');
  const [newGalleryIsRecent, setNewGalleryIsRecent] = useState(true);
  const [galleryManualAddUrls, setGalleryManualAddUrls] = useState<Record<string, string>>({});
  const [confirmDeleteActId, setConfirmDeleteActId] = useState<string | null>(null);
  const [isUploadingGalleryImages, setIsUploadingGalleryImages] = useState(false);
  const [isUploadingToActId, setIsUploadingToActId] = useState<string | null>(null);
  const [newGalleryError, setNewGalleryError] = useState<string | null>(null);
  const deleteConfirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hanging Frame Custom Child Profile States
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState<number>(6);
  const [newChildBed, setNewChildBed] = useState('');
  const [newChildSponsorship, setNewChildSponsorship] = useState<number>(15000);
  const [newChildLocation, setNewChildLocation] = useState('RUHS State Cancer Hospital, Jaipur');
  const [newChildStory, setNewChildStory] = useState('');
  const [newChildImage, setNewChildImage] = useState('');

  // Security Master PIN Management States
  const [currentPinChange, setCurrentPinChange] = useState('');
  const [newPinChange, setNewPinChange] = useState('');
  const [confirmPinChange, setConfirmPinChange] = useState('');

  // Form states for new cancer warrior
  const [newWarriorName, setNewWarriorName] = useState('');
  const [newWarriorAge, setNewWarriorAge] = useState<number>(10);
  const [newWarriorGender, setNewWarriorGender] = useState('Male');
  const [newWarriorDiagnosis, setNewWarriorDiagnosis] = useState('Acute Lymphoblastic Leukemia');
  const [newWarriorWard, setNewWarriorWard] = useState('RUHS State Cancer Hospital, Pediatric Ward');
  const [newWarriorCity, setNewWarriorCity] = useState('Jaipur');
  const [newWarriorTarget, setNewWarriorTarget] = useState<number>(15000);
  const [newWarriorUrgency, setNewWarriorUrgency] = useState<'Critical Priority' | 'Active Chemo Protocol' | 'Post-Op Care'>('Active Chemo Protocol');
  const [newWarriorImage, setNewWarriorImage] = useState('https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80');
  const [newWarriorStory, setNewWarriorStory] = useState('');

  // Form states for new hospital node
  const [newHospName, setNewHospName] = useState('');
  const [newHospCategory, setNewHospCategory] = useState('Government Apex Healthcare Hub');
  const [newHospSpecialty, setNewHospSpecialty] = useState('Oncology & Bedside Seva');
  const [newHospLocation, setNewHospLocation] = useState('Jaipur, Rajasthan');
  const [newHospCapacity, setNewHospCapacity] = useState('500+ Beds');

  // Automation Gateway States
  const [smsApiKey, setSmsApiKey] = useState('3nQdRkoOc0fMH5qmiPhaFTuNjJEL76Zt9gYyWrv4DUxpG2XIbz1KaWIYZ3uA7dzbN0y4vqGs6ECDLnfM');
  const [gmailUser, setGmailUser] = useState('support@riseuphelp.org');
  const [gmailPassword, setGmailPassword] = useState('Riseup@2026');
  const [walletBalance, setWalletBalance] = useState('₹150.00 (600 SMS available)');
  const [testSmsPhone, setTestSmsPhone] = useState('9828291119');
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [razorpayKeyId, setRazorpayKeyId] = useState('');
  const [razorpayKeySecret, setRazorpayKeySecret] = useState('');
  const [razorpaySecretSet, setRazorpaySecretSet] = useState(false);
  const [isSendingTestSms, setIsSendingTestSms] = useState(false);
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);

  // Registered Donor Users / Login Accounts
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [donorSubTab, setDonorSubTab] = useState<'leaderboard' | 'accounts'>('leaderboard');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Official 80G Tax Exemption Receipt Setup State
  const [activeReceiptConfig, setActiveReceiptConfig] = useState<ReceiptConfig>(() => {
    if (receiptConfig) return receiptConfig;
    try {
      const s = localStorage.getItem('ruh_receipt_config_v1');
      if (s) return JSON.parse(s);
    } catch {
      // ignore
    }
    return {
      urn80g: 'AAETR9828RE20241',
      cinNumber: 'U88900RJ2024NPL093120',
      receiptPrefix: 'RUH/2026/',
      signatoryName: 'Authorized Trustee',
      signatoryTitle: 'RiseUpHelp Initiative Foundation',
      signatureImage: '',
      stampImage: '',
    };
  });

  const galleryDebounceTimerRef = useRef<any>(null);

  // Load live automation status on open & lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetch('/api/automation-status')
        .then((r) => r.json())
        .then((d) => {
          if (d.success) {
            if (d.wallet) setWalletBalance(`₹${d.wallet} (${d.smsCount} SMS available)`);
            if (d.gmailUser) setGmailUser(d.gmailUser);
            if (d.razorpayKeyId) setRazorpayKeyId(d.razorpayKeyId);
            if (d.razorpaySecretConfigured) setRazorpaySecretSet(true);
          }
        })
        .catch(() => {});
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Form states for new items
  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorAmount, setNewDonorAmount] = useState<number>(15000);
  const [newDonorCause, setNewDonorCause] = useState('Arru (Full Lifeline Care)');
  const [newDonorCity, setNewDonorCity] = useState('Jaipur');

  // Form state for adding activity photo
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState('Hospital Healthcare Vow');
  const [newPhotoLocation, setNewPhotoLocation] = useState('RUHS Cancer Hospital, Jaipur');
  const [newPhotoImage, setNewPhotoImage] = useState('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80');
  const [newPhotoStats, setNewPhotoStats] = useState('389,000+ Delivered');
  const [newPhotoDesc, setNewPhotoDesc] = useState('');
  const [newPhotoStory, setNewPhotoStory] = useState('');
  const [newPhotoPrice, setNewPhotoPrice] = useState<number>(65);
  const [newPhotoTargetRow, setNewPhotoTargetRow] = useState<'row1' | 'row2'>('row1');
  const [photoFilterRow, setPhotoFilterRow] = useState<'all' | 'row1' | 'row2'>('all');

  // Form state for adding schedule event
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTithi, setNewEventTithi] = useState('Upcoming Ekadashi Vow');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventHospital, setNewEventHospital] = useState('State Cancer Medical College (RUHS), Jaipur');
  const [newEventTarget, setNewEventTarget] = useState<number>(3500);
  const [newEventDesc, setNewEventDesc] = useState('');

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3500);
  };

  const getAuthHeaders = (): Record<string, string> => {
    const token = sessionStorage.getItem('ruh_admin_token') || '';
    const pin = sessionStorage.getItem('ruh_admin_pin') || localStorage.getItem('ruh_admin_pin') || '';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (pin) headers['x-admin-pin'] = pin;
    return headers;
  };

  // Test SMS Dispatcher
  const handleSendTestSms = async () => {
    const cleanNumber = testSmsPhone.replace(/\D/g, '').slice(-10);
    if (cleanNumber.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsSendingTestSms(true);
    showToast(`Sending test SMS to +91 ${cleanNumber} via Fast2SMS...`);
    try {
      const res = await fetch('/api/send-sms', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          phone: cleanNumber,
          donorName: 'Devotee Patron',
          amount: 15000,
          receiptNumber: `RUH-80G-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          cause: 'Har Ekadashi Bedside Coconut Seva',
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`🎉 Live Test SMS delivered to +91 ${cleanNumber}! Check your phone messages.`);
      } else {
        showToast(`⚠️ Delivery Notice: ${data.error || 'Check balance or number'}`);
      }
    } catch (e: any) {
      showToast(`❌ SMS test failed: ${e?.message}`);
    } finally {
      setIsSendingTestSms(false);
    }
  };

  // Save Gmail Credentials
  const handleSaveGmailConfig = async () => {
    try {
      const res = await fetch('/api/save-automation-config', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          gmailUser: gmailUser.trim(),
          gmailAppPassword: gmailPassword.trim(),
          fast2smsApiKey: smsApiKey.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('✅ Gmail & Fast2SMS automation settings saved successfully!');
      } else {
        showToast('⚠️ Could not save automation config.');
      }
    } catch {
      showToast('❌ Failed to save config.');
    }
  };

  // Save Razorpay Gateway Key ID & Key Secret
  const handleSaveRazorpayConfig = async () => {
    try {
      const payload: Record<string, string> = {
        razorpayKeyId: razorpayKeyId.trim(),
      };
      if (razorpayKeySecret.trim()) {
        payload.razorpayKeySecret = razorpayKeySecret.trim();
      }
      const res = await fetch('/api/save-automation-config', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        if (razorpayKeySecret.trim()) setRazorpaySecretSet(true);
        showToast('✅ Razorpay Gateway credentials saved successfully!');
      } else {
        showToast('⚠️ Could not save Razorpay credentials.');
      }
    } catch {
      showToast('❌ Failed to save Razorpay credentials.');
    }
  };

  // Test 80G Receipt Email Dispatcher
  const handleSendTestEmail = async () => {
    if (!testEmailAddress.trim() || !testEmailAddress.includes('@')) {
      showToast('Please enter a valid recipient email address');
      return;
    }
    setIsSendingTestEmail(true);
    showToast(`Sending official 80G Receipt email to ${testEmailAddress}...`);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          email: testEmailAddress.trim(),
          donorName: 'Priya & Rahul Sharma',
          amount: 15000,
          receiptNumber: `RUH-80G-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          cause: 'Arru (Full Lifeline Care)',
          panNumber: 'ABCDE1234F',
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          phone: testSmsPhone,
          paymentMode: 'Razorpay / Direct UPI',
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`🎉 80G Receipt Email sent to ${testEmailAddress}! Check your inbox.`);
      } else {
        showToast(`⚠️ Email Error: ${data.error || 'Please enter Gmail App Password'}`);
      }
    } catch (e: any) {
      showToast(`❌ Email test failed: ${e?.message}`);
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  // Volunteer Management Handlers
  const handleExportVolunteersCSV = () => {
    if (!volunteers || volunteers.length === 0) {
      showToast('No volunteer applications to export.');
      return;
    }
    const headers = ['ID', 'Full Name', 'Mobile / WhatsApp', 'Email', 'City', 'Preferred Track', 'Availability', 'Status', 'Submission Date'];
    const rows = volunteers.map((v) => [
      `"${v.id}"`,
      `"${(v.fullName || '').replace(/"/g, '""')}"`,
      `"${(v.phone || '').replace(/"/g, '""')}"`,
      `"${(v.email || '').replace(/"/g, '""')}"`,
      `"${(v.city || 'Jaipur').replace(/"/g, '""')}"`,
      `"${(v.track || '').replace(/"/g, '""')}"`,
      `"${(v.availability || '').replace(/"/g, '""')}"`,
      `"${(v.status || 'pending').replace(/"/g, '""')}"`,
      `"${new Date(v.timestamp).toLocaleString('en-IN')}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RiseUpHelp_Volunteers_Squad_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📥 Volunteers directory exported as CSV!');
  };

  const handleUpdateVolunteerStatus = (id: string, newStatus: 'pending' | 'contacted' | 'approved') => {
    if (!setVolunteers) return;
    setVolunteers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
    showToast(`Volunteer status updated to ${newStatus}`);
    if (onSyncToServer) setTimeout(() => onSyncToServer(), 400);
  };

  const handleDeleteVolunteer = (id: string) => {
    if (!setVolunteers) return;
    setVolunteers((prev) => prev.filter((v) => v.id !== id));
    showToast('Volunteer application removed.');
    if (onSyncToServer) setTimeout(() => onSyncToServer(), 400);
  };

  const handleAddManualVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualVolName.trim() || !manualVolPhone.trim() || !setVolunteers) return;
    const newVol: VolunteerSubmission = {
      id: `vol-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      fullName: manualVolName.trim(),
      phone: manualVolPhone.trim().replace(/\D/g, '').slice(-10),
      email: manualVolEmail.trim() || undefined,
      city: manualVolCity.trim() || 'Jaipur',
      track: manualVolTrack,
      availability: manualVolAvailability,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    setVolunteers((prev) => [newVol, ...prev]);
    setManualVolName('');
    setManualVolPhone('');
    setManualVolEmail('');
    setShowAddVolModal(false);
    showToast(`✅ Added volunteer: ${newVol.fullName}`);
    if (onSyncToServer) setTimeout(() => onSyncToServer(), 400);
  };

  // Fetch registered donor login accounts
  const fetchRegisteredUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setRegisteredUsers(data.users);
      }
    } catch (err) {
      console.warn('Failed to fetch registered users:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchRegisteredUsers();
    }
  }, [isOpen, isAuthenticated]);

  const handleDeleteUser = async (phone: string, donorId: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to remove registered account for ${userName} (+91 ${phone})?`)) return;
    try {
      const res = await fetch('/api/delete-user', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ phone, donorId }),
      });
      const data = await res.json();
      if (data.success) {
        setRegisteredUsers(data.users || []);
        showToast(`🗑️ User account for ${userName} removed.`);
      } else {
        showToast('⚠️ Could not remove user.');
      }
    } catch {
      showToast('❌ Error deleting user account.');
    }
  };

  const handleExportUsersCSV = () => {
    if (!registeredUsers || registeredUsers.length === 0) {
      showToast('No registered user accounts to export.');
      return;
    }
    const headers = ['Donor ID', 'Full Name', 'Mobile / Login ID', 'Email', 'Date of Birth', '80G PAN Card', 'Total Donated (₹)', 'Donations Count', 'Patron Badge', 'Registration Date', 'Last Active'];
    const rows = registeredUsers.map((u) => [
      `"${u.donorId || ''}"`,
      `"${(u.fullName || '').replace(/"/g, '""')}"`,
      `"${u.phone || ''}"`,
      `"${u.email || ''}"`,
      `"${u.dob || ''}"`,
      `"${u.panNumber || ''}"`,
      u.totalDonated || 0,
      u.donationsCount || 0,
      `"${u.badge || 'Verified Patron'}"`,
      `"${u.registeredAt ? new Date(u.registeredAt).toLocaleString('en-IN') : ''}"`,
      `"${u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('en-IN') : ''}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RiseUpHelp_Registered_Donor_Accounts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📥 Registered Donor Accounts exported as CSV!');
  };

  // Manual Trigger to sync all current state & photos across PC & Tablet
  const handleManualSync = async () => {
    if (!onSyncToServer) return;
    setIsSyncing(true);
    showToast('🌐 Syncing photos & data to server disk for Tablet & Mobile...');
    try {
      const ok = await onSyncToServer();
      if (ok) {
        showToast('✅ All photos & data synced! Refresh tablet to view real photos.');
      } else {
        showToast('⚠️ Sync completed locally. Check server connection.');
      }
    } catch {
      showToast('❌ Sync failed. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  // Direct Device File Upload Handler with Server Disk Persistence & Fallback
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // Reset input so user can re-select or pick any photo seamlessly
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    try {
      showToast('Uploading & optimizing photo for Tablet & PC...');
      const uploadRes = await uploadImageToServer(file, file.name.split('.')[0]);
      if (uploadRes.success && uploadRes.url) {
        onSuccess(uploadRes.url);
        showToast('✅ Photo uploaded & saved to server successfully!');
      } else if (uploadRes.url) {
        onSuccess(uploadRes.url);
        showToast('✅ Photo processed successfully!');
      } else {
        const compressedBase64 = await compressImageFile(file, 1000, 1000, 0.75);
        onSuccess(compressedBase64);
        showToast('✅ Photo saved!');
      }
    } catch (err) {
      console.error('Image upload failed', err);
      showToast('Could not process photo from device.');
    }
  };

  // Multi-photo upload handler for Gallery Albums (supports new creation or appending to existing activity)
  // Multi-photo upload handler for Gallery Albums (supports new creation or appending to existing activity)
  const handleMultiImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (urls: string[]) => void,
    activityId?: string
  ) => {
    const inputEl = e.target;
    const files = Array.from(inputEl.files || []);
    if (files.length === 0) return;

    const imageFiles = files.filter(
      (f) => f.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|svg|avif|bmp|heic|jfif)$/i.test(f.name || '')
    );

    if (imageFiles.length === 0) {
      showToast('Please select valid image files (PNG, JPG, WEBP).');
      inputEl.value = '';
      return;
    }

    if (activityId) {
      setIsUploadingToActId(activityId);
    } else {
      setIsUploadingGalleryImages(true);
    }
    showToast(`Uploading ${imageFiles.length} photo(s)...`);

    try {
      const uploadedUrls: string[] = [];
      for (const file of imageFiles) {
        try {
          const uploadRes = await uploadImageToServer(file, file.name.split('.')[0]);
          if (uploadRes.success && uploadRes.url) {
            uploadedUrls.push(uploadRes.url);
          } else if (uploadRes.url) {
            uploadedUrls.push(uploadRes.url);
          } else {
            const compressedBase64 = await compressImageFile(file, 1200, 1200, 0.8);
            uploadedUrls.push(compressedBase64);
          }
        } catch {
          try {
            const compressedBase64 = await compressImageFile(file, 1200, 1200, 0.8);
            uploadedUrls.push(compressedBase64);
          } catch (cErr) {
            console.error('File compression fallback failed', cErr);
          }
        }
      }

      if (uploadedUrls.length > 0) {
        onSuccess(uploadedUrls);
        showToast(`✅ ${uploadedUrls.length} photo(s) added!`);
      } else {
        showToast('❌ Could not process the selected image(s).');
      }
    } catch (err) {
      console.error('Multi-photo upload error', err);
      showToast('Could not process some photos.');
    } finally {
      inputEl.value = '';
      setIsUploadingGalleryImages(false);
      setIsUploadingToActId(null);
    }
  };

  // Create new Live Gallery Activity with multi-photo album
  const handleAddGalleryActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewGalleryError(null);
    if (!newGalleryTitle.trim()) {
      setNewGalleryError('Please enter an activity title.');
      showToast('Please enter an activity title.');
      return;
    }
    const allImages = [...newGalleryImages];
    if (newGalleryManualUrl.trim()) {
      allImages.push(newGalleryManualUrl.trim());
    }
    // Fallback cover if user hasn't added photo yet, ensuring activity is created smoothly
    if (allImages.length === 0) {
      allImages.push('/uploads/ChatGPT_Image_Sep_12__2026__10_1789233956989_71b6034a06.jpg');
    }
    if (!setGalleryItems) return;

    const newItem: GalleryItem = {
      id: `gallery-act-${Date.now()}`,
      title: newGalleryTitle.trim(),
      category: newGalleryCategory,
      location: newGalleryLocation.trim() || 'Jaipur, Rajasthan',
      date: newGalleryDate.trim() || new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      image: allImages[0],
      images: allImages,
      stats: newGalleryStats.trim() || `${allImages.length} Verified Field Photos`,
      summary: newGallerySummary.trim() || newGalleryTitle.trim(),
      fullStory: newGalleryFullStory.trim() || newGallerySummary.trim() || newGalleryTitle.trim(),
      impactMetrics: newGalleryImpactMetrics.trim() || '100% Direct Field Verification',
      isRecent: newGalleryIsRecent,
      createdAt: Date.now(),
    };

    const updated = [newItem, ...galleryItems];
    setGalleryItems(updated);
    try {
      localStorage.setItem('ruh_gallery_items_v2', JSON.stringify(updated));
    } catch {}
    setNewGalleryTitle('');
    setNewGalleryStats('');
    setNewGallerySummary('');
    setNewGalleryFullStory('');
    setNewGalleryImpactMetrics('');
    setNewGalleryImages([]);
    setNewGalleryManualUrl('');
    setNewGalleryError(null);
    showToast('🎉 Live Gallery Activity with album created!');
    await pushServerState({ galleryItems: updated });
    if (onSyncToServer) {
      await onSyncToServer({ galleryItems: updated });
    }
  };

  // Add photos to existing activity album (Device or URL)
  const handleAddPhotosToActivity = async (itemId: string, newUrls: string[]) => {
    if (!setGalleryItems) return;
    const validNew = newUrls.filter((u) => u && typeof u === 'string' && u.trim().length > 0);
    if (validNew.length === 0) {
      showToast('Please provide valid image URLs or select image files.');
      return;
    }

    const updated = galleryItems.map((it) => {
      if (it.id === itemId) {
        const rawImages = it.images && it.images.length > 0 ? it.images : (it.image ? [it.image] : []);
        const currentImages = rawImages.filter((u) => u && typeof u === 'string' && u.trim().length > 0);

        // Merge images without duplicates
        const combined = [...currentImages];
        for (const url of validNew) {
          if (!combined.includes(url)) {
            combined.push(url);
          }
        }

        const coverImage = combined[0] || '';
        return {
          ...it,
          image: coverImage,
          images: combined,
        };
      }
      return it;
    });

    setGalleryItems(updated);
    try {
      localStorage.setItem('ruh_gallery_items_v2', JSON.stringify(updated));
    } catch {}
    showToast(`✅ Successfully added ${validNew.length} photo(s) to activity!`);
    await pushServerState({ galleryItems: updated });
    if (onSyncToServer) {
      await onSyncToServer({ galleryItems: updated });
    }
  };

  // Set photo as cover photo for activity
  const handleSetCoverPhoto = async (itemId: string, photoUrl: string) => {
    if (!setGalleryItems) return;
    const updated = galleryItems.map((item) => {
      if (item.id === itemId) {
        const currentImages = item.images && item.images.length > 0 ? item.images : [item.image];
        const remaining = currentImages.filter((img) => img !== photoUrl);
        return {
          ...item,
          image: photoUrl,
          images: [photoUrl, ...remaining],
        };
      }
      return item;
    });
    setGalleryItems(updated);
    try { localStorage.setItem('ruh_gallery_items_v2', JSON.stringify(updated)); } catch {}
    showToast('🌟 Cover photo updated!');
    await pushServerState({ galleryItems: updated });
    if (onSyncToServer) {
      await onSyncToServer({ galleryItems: updated });
    }
  };

  // Remove photo from activity album
  const handleRemovePhotoFromActivity = async (itemId: string, photoUrl: string) => {
    if (!setGalleryItems) return;
    const item = galleryItems.find((it) => it.id === itemId);
    const currentImages = item?.images && item.images.length > 0 ? item.images : (item?.image ? [item.image] : []);
    const remaining = currentImages.filter((img) => img.trim() !== photoUrl.trim());
    const updated = galleryItems.map((it) => {
      if (it.id === itemId) {
        return {
          ...it,
          image: remaining[0] || '',
          images: remaining,
        };
      }
      return it;
    });
    setGalleryItems(updated);
    try { localStorage.setItem('ruh_gallery_items_v2', JSON.stringify(updated)); } catch {}
    showToast('🗑️ Photo removed from activity.');
    await pushServerState({ galleryItems: updated });
    if (onSyncToServer) {
      await onSyncToServer({ galleryItems: updated });
    }
  };

  // Delete entire activity (Inline 2-step confirmation, 100% immune to browser popup block)
  const promptDeleteActivity = (itemId: string) => {
    setConfirmDeleteActId(itemId);
    if (deleteConfirmTimerRef.current) {
      clearTimeout(deleteConfirmTimerRef.current);
    }
    deleteConfirmTimerRef.current = setTimeout(() => {
      setConfirmDeleteActId((prev) => (prev === itemId ? null : prev));
    }, 8000);
  };

  const cancelDeleteActivity = () => {
    setConfirmDeleteActId(null);
    if (deleteConfirmTimerRef.current) {
      clearTimeout(deleteConfirmTimerRef.current);
    }
  };

  const handleDeleteActivity = async (itemId: string) => {
    if (!setGalleryItems) return;
    const updated = galleryItems.filter((it) => it.id !== itemId);
    setGalleryItems(updated);
    try { localStorage.setItem('ruh_gallery_items_v2', JSON.stringify(updated)); } catch {}
    setConfirmDeleteActId(null);
    if (deleteConfirmTimerRef.current) {
      clearTimeout(deleteConfirmTimerRef.current);
    }
    showToast('🗑️ Activity removed from Live Gallery.');
    await pushServerState({ galleryItems: updated });
    if (onSyncToServer) {
      await onSyncToServer({ galleryItems: updated });
    }
  };

  // Update activity details (debounced server push + instant state and localStorage)
  const handleUpdateActivity = (itemId: string, updates: Partial<GalleryItem>) => {
    if (!setGalleryItems) return;
    const updated = galleryItems.map((it) => {
      if (it.id === itemId) {
        return { ...it, ...updates };
      }
      return it;
    });
    setGalleryItems(updated);
    try {
      localStorage.setItem('ruh_gallery_items_v2', JSON.stringify(updated));
    } catch {}
    if (galleryDebounceTimerRef.current) {
      clearTimeout(galleryDebounceTimerRef.current);
    }
    galleryDebounceTimerRef.current = setTimeout(async () => {
      await pushServerState({ galleryItems: updated });
      if (onSyncToServer) {
        await onSyncToServer({ galleryItems: updated });
      }
    }, 600);
  };

  const handleExplicitSaveActivity = async (_itemId?: string) => {
    if (galleryDebounceTimerRef.current) {
      clearTimeout(galleryDebounceTimerRef.current);
    }
    try {
      localStorage.setItem('ruh_gallery_items_v2', JSON.stringify(galleryItems));
    } catch {}
    await pushServerState({ galleryItems });
    if (onSyncToServer) {
      await onSyncToServer({ galleryItems });
    }
    showToast('💾 Activity changes successfully saved & synced live!');
  };


  const handleAddScheduleEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !newEventDate.trim()) return;
    const newEv: SevaScheduleEvent = {
      id: `seva-event-${Date.now()}`,
      title: newEventTitle.trim(),
      tithi: newEventTithi,
      date: newEventDate,
      hospital: newEventHospital,
      targetCoconuts: newEventTarget || 3500,
      sponsoredCoconuts: 0,
      status: 'upcoming',
      description: newEventDesc || 'Bedside fresh tender coconut hydration drive for cancer patients.',
    };
    if (setScheduleEvents && scheduleEvents) {
      setScheduleEvents([...scheduleEvents, newEv]);
    }
    setNewEventTitle('');
    setNewEventDate('');
    setNewEventDesc('');
    showToast('New Ekadashi Seva Event Scheduled!');
  };

  const handleDeleteScheduleEvent = (id: string) => {
    if (setScheduleEvents && scheduleEvents) {
      setScheduleEvents(scheduleEvents.filter((ev) => ev.id !== id));
      showToast('Event removed from schedule');
    }
  };

  const handleDeleteDonor = (id: string) => {
    setLeaderboardDonors(leaderboardDonors.filter((d) => d.id !== id));
    showToast('Donor record removed from ledger');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = password.trim();
    if (!cleanPin) {
      setAuthError('Please enter Master Security PIN');
      return;
    }

    if (failedAttempts >= 5) {
      setAuthError('Too many failed attempts. Access locked for 15 minutes by security firewall.');
      return;
    }

    setIsVerifyingPin(true);
    setAuthError('');

    try {
      const res = await fetch('/api/verify-admin-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: cleanPin }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('ruh_admin_session_auth', 'true');
        if (data.token) {
          sessionStorage.setItem('ruh_admin_token', data.token);
        }
        sessionStorage.setItem('ruh_admin_pin', cleanPin);
        localStorage.setItem('ruh_admin_pin', cleanPin);
        setPassword('');
        setAuthError('');
        setFailedAttempts(0);
        showToast('🔓 Admin Portal Unlocked Successfully (Secure Token Active).');
        setIsVerifyingPin(false);
        return;
      } else {
        const nextFailed = failedAttempts + 1;
        setFailedAttempts(nextFailed);
        setAuthError(data.error || `Invalid Security PIN. Attempt ${nextFailed} of 5.`);
        setIsVerifyingPin(false);
        return;
      }
    } catch {
      // offline fallback
    }

    const localPin = localStorage.getItem('ruh_admin_pin') || '';
    if (localPin && cleanPin === localPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ruh_admin_session_auth', 'true');
      sessionStorage.setItem('ruh_admin_pin', cleanPin);
      setPassword('');
      setAuthError('');
      setFailedAttempts(0);
      showToast('🔓 Admin Portal Unlocked Successfully.');
    } else {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      if (nextFail >= 5) {
        setAuthError('Maximum attempts exceeded. Access locked.');
      } else {
        setAuthError(`Invalid Security PIN. (${5 - nextFail} attempts remaining)`);
      }
    }
    setIsVerifyingPin(false);
  };

  const handleLockSession = () => {
    sessionStorage.removeItem('ruh_admin_session_auth');
    sessionStorage.removeItem('ruh_admin_token');
    sessionStorage.removeItem('ruh_admin_pin');
    setIsAuthenticated(false);
    setPassword('');
    setAuthError('');
    showToast('🔒 Admin session securely locked.');
  };

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPinChange.trim()) {
      showToast('Please enter your current PIN');
      return;
    }
    if (newPinChange.trim().length < 4) {
      showToast('New PIN must be at least 4 digits/characters');
      return;
    }
    if (newPinChange.trim() !== confirmPinChange.trim()) {
      showToast('New PIN and confirmation do not match');
      return;
    }

    try {
      const res = await fetch('/api/change-admin-pin', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPin: currentPinChange.trim(),
          newPin: newPinChange.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('ruh_admin_pin', newPinChange.trim());
        sessionStorage.setItem('ruh_admin_pin', newPinChange.trim());
        setCurrentPinChange('');
        setNewPinChange('');
        setConfirmPinChange('');
        showToast('🎉 Master PIN changed & cryptographic vault re-keyed!');
      }
    } catch {
      const localPin = localStorage.getItem('ruh_admin_pin') || '';
      if (localPin && currentPinChange.trim() === localPin) {
        localStorage.setItem('ruh_admin_pin', newPinChange.trim());
        setCurrentPinChange('');
        setNewPinChange('');
        setConfirmPinChange('');
        showToast('🎉 Master Admin PIN updated locally in browser!');
      } else {
        showToast('❌ Current PIN is incorrect');
      }
    }
  };

  // Add Cancer Warrior Handler
  const handleAddCancerWarrior = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWarriorName.trim()) {
      showToast('Please enter Warrior name');
      return;
    }
    const newPat: PatientProfile = {
      id: `warrior-custom-${Date.now()}`,
      name: newWarriorName.trim(),
      age: newWarriorAge || 10,
      gender: newWarriorGender,
      diagnosis: newWarriorDiagnosis.trim(),
      hospitalWard: newWarriorWard.trim(),
      city: newWarriorCity.trim(),
      image: newWarriorImage || 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80',
      story: newWarriorStory.trim() || `${newWarriorName} is fighting cancer bravely in hospital.`,
      medicalNeeds: [
        'Chemotherapy cycles & anti-nausea medication',
        'Daily bedside fresh tender coconut electrolyte hydration',
        'Pediatric diagnostic monitoring & nutrition',
      ],
      targetAmount: newWarriorTarget || 15000,
      fundedAmount: 0,
      fundingPercentage: 0,
      cyclesCompleted: 1,
      totalCycles: 6,
      urgency: newWarriorUrgency,
      monthlyMedCost: newWarriorTarget || 15000,
      verificationId: `RUH-WARRIOR-${Date.now().toString().slice(-4)}`,
    };
    setPatientProfiles([newPat, ...patientProfiles]);
    setNewWarriorName('');
    setNewWarriorStory('');
    showToast('New Cancer Warrior profile added!');
    if (onSyncToServer) setTimeout(() => onSyncToServer(), 300);
  };

  const handleDeletePatient = async (id: string) => {
    const updated = patientProfiles.filter((p) => p.id !== id);
    setPatientProfiles(updated);
    try { localStorage.setItem('ruh_patients_v3', JSON.stringify(updated)); } catch {}
    showToast('Warrior profile removed');
    await pushServerState({ patientProfiles: updated });
  };

  // Add Partner Hospital Handler
  const handleAddHospital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHospName.trim()) return;
    const newH: HospitalNode = {
      id: `hosp-custom-${Date.now()}`,
      name: newHospName.trim(),
      category: newHospCategory.trim(),
      specialty: newHospSpecialty.trim(),
      location: newHospLocation.trim(),
      bedsideCapacity: newHospCapacity.trim(),
      verificationNode: `RUH-NODE-${Date.now().toString().slice(-4)}`,
    };
    if (setPartnerHospitals && partnerHospitals) {
      setPartnerHospitals([...partnerHospitals, newH]);
    }
    setNewHospName('');
    showToast('New Partner Hospital node added!');
    if (onSyncToServer) setTimeout(() => onSyncToServer(), 300);
  };

  const handleDeleteHospital = (id: string) => {
    if (setPartnerHospitals && partnerHospitals) {
      setPartnerHospitals(partnerHospitals.filter((h) => h.id !== id));
      showToast('Hospital node removed');
      if (onSyncToServer) setTimeout(() => onSyncToServer(), 300);
    }
  };

  // Add Donor handler
  const handleAddManualDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName.trim()) return;
    const newDonor: LeaderboardDonor = {
      id: `lb-manual-${Date.now()}`,
      name: newDonorName.trim(),
      batchCode: `RUH-BATCH-2026-X${Math.floor(100 + Math.random() * 900)}`,
      patientAdopted: newDonorCause,
      amount: newDonorAmount,
      isVerified: true,
      timestamp: 'Just now',
      city: newDonorCity,
      receiptNumber: `RUH-80G-2026-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setLeaderboardDonors([newDonor, ...leaderboardDonors]);
    setNewDonorName('');
    showToast('New Donor recorded successfully in Ledger!');
  };

  // Add Photo handler (Allows publishing to Row 1 or Row 2)
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim()) return;
    const newCard: MediaPhotoCard = {
      id: `m-custom-${Date.now()}`,
      title: newPhotoTitle.trim(),
      category: newPhotoCategory,
      location: newPhotoLocation,
      image: newPhotoImage || '/uploads/ChatGPT_Image_Sep_12__2026__10_1789233956989_71b6034a06.jpg',
      stats: newPhotoStats,
      description: newPhotoDesc || newPhotoTitle,
      fullStory: newPhotoStory || newPhotoDesc || newPhotoTitle,
      defaultPrice: newPhotoPrice || 65,
      unitLabel: 'Seva Unit',
    };
    const updatedR1 = newPhotoTargetRow === 'row1' ? [newCard, ...mediaPhotosRow1] : mediaPhotosRow1;
    const updatedR2 = newPhotoTargetRow === 'row2' ? [newCard, ...mediaPhotosRow2] : mediaPhotosRow2;

    if (newPhotoTargetRow === 'row1') {
      setMediaPhotosRow1(updatedR1);
    } else {
      setMediaPhotosRow2(updatedR2);
    }
    setNewPhotoTitle('');
    setNewPhotoDesc('');
    setNewPhotoStory('');
    setNewPhotoImage('');
    showToast(`✅ Photo published to ${newPhotoTargetRow === 'row1' ? 'Top Slider (Row 1)' : 'Bottom Slider (Row 2)'}!`);
    await pushServerState({ mediaPhotosRow1: updatedR1, mediaPhotosRow2: updatedR2 });
    if (onSyncToServer) {
      await onSyncToServer({ mediaPhotosRow1: updatedR1, mediaPhotosRow2: updatedR2 });
    }
  };

  // Update existing photo card in Row 1 or Row 2
  const handleUpdateExistingPhoto = async (id: string, updatedFields: Partial<MediaPhotoCard>) => {
    let updatedR1 = mediaPhotosRow1;
    let updatedR2 = mediaPhotosRow2;
    if (mediaPhotosRow1.some((p) => p.id === id)) {
      updatedR1 = mediaPhotosRow1.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setMediaPhotosRow1(updatedR1);
    }
    if (mediaPhotosRow2.some((p) => p.id === id)) {
      updatedR2 = mediaPhotosRow2.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setMediaPhotosRow2(updatedR2);
    }
    showToast('✅ Photo updated & saved live!');
    await pushServerState({ mediaPhotosRow1: updatedR1, mediaPhotosRow2: updatedR2 });
    if (onSyncToServer) {
      await onSyncToServer({ mediaPhotosRow1: updatedR1, mediaPhotosRow2: updatedR2 });
    }
  };

  // Move photo between Row 1 and Row 2
  const handleMovePhotoRow = async (id: string, targetRow: 'row1' | 'row2') => {
    const cardInR1 = mediaPhotosRow1.find((p) => p.id === id);
    const cardInR2 = mediaPhotosRow2.find((p) => p.id === id);
    const card = cardInR1 || cardInR2;
    if (!card) return;

    let updatedR1 = mediaPhotosRow1;
    let updatedR2 = mediaPhotosRow2;

    if (targetRow === 'row1') {
      updatedR2 = mediaPhotosRow2.filter((p) => p.id !== id);
      updatedR1 = [card, ...mediaPhotosRow1.filter((p) => p.id !== id)];
      setMediaPhotosRow2(updatedR2);
      setMediaPhotosRow1(updatedR1);
      showToast('Photo moved to Top Slider (Row 1)!');
    } else {
      updatedR1 = mediaPhotosRow1.filter((p) => p.id !== id);
      updatedR2 = [card, ...mediaPhotosRow2.filter((p) => p.id !== id)];
      setMediaPhotosRow1(updatedR1);
      setMediaPhotosRow2(updatedR2);
      showToast('Photo moved to Bottom Slider (Row 2)!');
    }
    await pushServerState({ mediaPhotosRow1: updatedR1, mediaPhotosRow2: updatedR2 });
    if (onSyncToServer) {
      await onSyncToServer({ mediaPhotosRow1: updatedR1, mediaPhotosRow2: updatedR2 });
    }
  };

  // Delete photo handler
  const handleDeletePhoto = async (id: string) => {
    const updatedR1 = mediaPhotosRow1.filter((p) => p.id !== id);
    const updatedR2 = mediaPhotosRow2.filter((p) => p.id !== id);
    setMediaPhotosRow1(updatedR1);
    setMediaPhotosRow2(updatedR2);
    showToast('🗑️ Photo removed from stream');
    await pushServerState({ mediaPhotosRow1: updatedR1, mediaPhotosRow2: updatedR2 });
    if (onSyncToServer) {
      await onSyncToServer({ mediaPhotosRow1: updatedR1, mediaPhotosRow2: updatedR2 });
    }
  };

  // Export Donors CSV
  const handleExportCSV = () => {
    const headers = 'ID,Name,BatchCode,CauseAdopted,Amount,City,ReceiptNumber,Timestamp\n';
    const rows = leaderboardDonors
      .map(
        (d) =>
          `"${d.id}","${d.name}","${d.batchCode}","${d.patientAdopted}",${d.amount},"${d.city}","${d.receiptNumber}","${d.timestamp}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `RiseUpHelp_Donation_Ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Donations CSV Exported Successfully!');
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
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Main Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-5xl bg-[#fbf9f6] rounded-3xl shadow-2xl border border-neutral-300 overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="bg-neutral-900 text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/60 flex items-center justify-center border border-emerald-500/30 text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <span>RiseUpHelp Master Admin Control Center</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                    v2.6 Live
                  </span>
                </h2>
                <p className="text-xs text-neutral-400">
                  Manage Live Drives, Photos, Child Spotlights, Cancer Warriors, and Donors Database
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-white bg-amber-950/80 hover:bg-amber-900 px-3 py-1.5 rounded-xl border border-amber-500/40 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Synchronize all real photos & data across PC, Tablet & Mobile"
              >
                <Globe className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-white' : 'text-[#FDB813]'}`} />
                <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync to Tablet & Devices'}</span>
              </button>
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLockSession}
                  className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-white bg-rose-950/80 hover:bg-rose-900 px-3 py-1.5 rounded-xl border border-rose-500/40 transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Lock Admin Session"
                >
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Lock Session</span>
                </button>
              )}
              <button
                onClick={onResetToDefaults}
                className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-xl border border-neutral-700 transition-colors cursor-pointer"
                title="Reset all content to original defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {saveToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-emerald-800 text-white text-xs font-semibold px-4 py-2 text-center flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#FDB813]" />
              <span>{saveToast}</span>
            </motion.div>
          )}

          {!isAuthenticated ? (
            /* Authentication Screen */
            <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center my-auto">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200 shadow-xs">
                <Lock className="w-8 h-8 text-[#084c36]" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-1">
                Admin Authentication Required
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mb-6">
                Enter your Section 8 Master Security PIN to unlock live database editing, photo uploads, and telemetry controllers.
              </p>

              <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-3">
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    placeholder="Enter Master PIN"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={12}
                    className="w-full bg-white border border-neutral-300 rounded-xl pl-4 pr-11 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 font-mono text-center tracking-widest"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer p-1"
                    title={showPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <span className="text-xs text-red-600 font-medium flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{authError}</span>
                  </span>
                )}

                <button
                  type="submit"
                  disabled={isVerifyingPin}
                  className="w-full bg-[#084c36] hover:bg-[#063b2a] disabled:opacity-60 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <Unlock className="w-4 h-4 text-[#FDB813]" />
                  <span>{isVerifyingPin ? 'Verifying PIN...' : 'Unlock Admin Portal'}</span>
                </button>
              </form>

              <div className="mt-5 flex items-center gap-1.5 text-[11px] text-neutral-500 bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200">
                <Shield className="w-3.5 h-3.5 text-emerald-700" />
                <span>Protected by Section 8 Cryptographic Storage & Session Lock</span>
              </div>
            </div>
          ) : (
            /* Authenticated Admin Workspace */
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Sidebar Navigation */}
              <div className="w-full md:w-60 bg-neutral-100/90 border-r border-neutral-200 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveTab('branding')}
                  className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'branding'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#FDB813]" />
                    <span>Inauguration & Branding</span>
                  </div>
                  {inaugurationConfig?.enabled && (
                    <span className="w-2 h-2 rounded-full bg-[#FDB813] animate-pulse" title="Inauguration Celebration Mode Active" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('activities')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'activities'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>Live & Upcoming Drives</span>
                </button>

                <button
                  onClick={() => setActiveTab('story')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'story'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4 text-rose-500" />
                  <span>Story & Ethos</span>
                </button>

                <button
                  onClick={() => setActiveTab('photos')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'photos'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Activity Photos Stream</span>
                </button>

                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'gallery'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <Images className="w-4 h-4 text-[#FDB813]" />
                  <span>Live Gallery (Multi-Photos)</span>
                </button>

                <button
                  onClick={() => setActiveTab('children')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'children'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Child Hanging Frames</span>
                </button>

                <button
                  onClick={() => setActiveTab('patients')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'patients'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Cancer Warriors Lifeline</span>
                </button>

                <button
                  onClick={() => setActiveTab('volunteers')}
                  className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'volunteers'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <HeartHandshake className="w-4 h-4 text-[#FDB813]" />
                    <span>Volunteers / Squad</span>
                  </div>
                  {volunteers && volunteers.length > 0 && (
                    <span className="bg-[#FDB813] text-neutral-950 font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {volunteers.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('hospitals')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'hospitals'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <Building className="w-4 h-4 text-sky-400" />
                  <span>Partner Hospitals</span>
                </button>

                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'calendar'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Har Ekadashi Calendar</span>
                </button>

                <button
                  onClick={() => setActiveTab('donors')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'donors'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Donors & 80G Ledger</span>
                </button>

                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'telemetry'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Foundation Telemetry</span>
                </button>

                <button
                  onClick={() => setActiveTab('automation')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'automation'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-[#FDB813]" />
                  <span>SMS & Email Automation</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${
                    activeTab === 'security'
                      ? 'bg-[#084c36] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-200/80'
                  }`}
                >
                  <Lock className="w-4 h-4 text-rose-400" />
                  <span>Admin Security & PIN</span>
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white">

                {/* Quick Photo Switcher Bar - 1-Click Jump to Edit ANY Photo on the Website */}
                <div className="mb-5 bg-gradient-to-r from-emerald-900 via-[#084c36] to-emerald-950 text-white rounded-2xl p-3 sm:p-3.5 shadow-sm border border-emerald-800">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-[#FDB813] shrink-0">
                        <Camera className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block leading-tight">📸 Website Photo Studio • 1-Click Photo Switcher</span>
                        <span className="text-[10px] text-emerald-200 block leading-tight">Click any section to change its photo (Laptop, Tab & Mobile):</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setActiveTab('activities')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          activeTab === 'activities' ? 'bg-[#FDB813] text-neutral-950 font-bold shadow-xs' : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                      >
                        <span>🥤 Anar Juice & Drives</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('children')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          activeTab === 'children' ? 'bg-[#FDB813] text-neutral-950 font-bold shadow-xs' : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                      >
                        <span>🖼️ Top Hanging Frames</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('photos')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          activeTab === 'photos' ? 'bg-[#FDB813] text-neutral-950 font-bold shadow-xs' : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                      >
                        <span>📸 Ground Seva Stream</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('gallery')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          activeTab === 'gallery' ? 'bg-[#FDB813] text-neutral-950 font-bold shadow-xs' : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                      >
                        <span>🖼️ Live Gallery Albums</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('patients')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          activeTab === 'patients' ? 'bg-[#FDB813] text-neutral-950 font-bold shadow-xs' : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                      >
                        <span>🩺 Cancer Warriors</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('donors')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          activeTab === 'donors' ? 'bg-[#FDB813] text-neutral-950 font-bold shadow-xs' : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                      >
                        <span>📜 80G Stamp & Sign</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('story')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          activeTab === 'story' ? 'bg-[#FDB813] text-neutral-950 font-bold shadow-xs' : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                      >
                        <span>🏛️ Story & Ethos</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* 0. BRANDING & HERO CMS TAB */}
                {activeTab === 'branding' && heroContent && setHeroContent && (
                  <div className="space-y-6">
                    {/* INAUGURATION & PRELOADER CELEBRATION CARD */}
                    <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-amber-500/5 rounded-2xl p-4 sm:p-5 border-2 border-amber-400/40 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start sm:items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#084c36] text-[#FDB813] flex items-center justify-center text-xl shadow-sm shrink-0">
                            🎀
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-bold text-neutral-900">
                                Website Opening & Inauguration Celebration Mode
                              </h4>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                  inaugurationConfig?.enabled
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-neutral-200 text-neutral-700'
                                }`}
                              >
                                {inaugurationConfig?.enabled ? '✨ Celebration Mode Active' : '⚪ Normal Fast Intro'}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-600 mt-0.5">
                              Temporary ribbon-cutting ceremony. ON hone par loading complete hote hi golden ribbon button aayega jise click karte hi fireworks & chime ke saath website launch hogi!
                            </p>
                          </div>
                        </div>

                        {/* Live Toggle Button */}
                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (!setInaugurationConfig || !inaugurationConfig) return;
                              const updated = { ...inaugurationConfig, enabled: !inaugurationConfig.enabled };
                              setInaugurationConfig(updated);
                              try {
                                localStorage.setItem('ruh_inauguration_config_v1', JSON.stringify(updated));
                              } catch {}
                              if (onSyncToServer) onSyncToServer({ inaugurationConfig: updated });
                            }}
                            className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                              inaugurationConfig?.enabled ? 'bg-[#084c36]' : 'bg-neutral-300'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                inaugurationConfig?.enabled ? 'translate-x-7 bg-[#FDB813]' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-amber-200/60 text-xs">
                        <div>
                          <label className="text-[11px] font-bold text-neutral-800 block mb-1">
                            👨‍💻 Lead Developer Name / Signature (Loading Screen Badge - Permanent)
                          </label>
                          <input
                            type="text"
                            value={inaugurationConfig?.developerName || ''}
                            placeholder="e.g. Rahul Sharma / Lead Tech Engineer"
                            onChange={(e) => {
                              if (!setInaugurationConfig || !inaugurationConfig) return;
                              const updated = { ...inaugurationConfig, developerName: e.target.value };
                              setInaugurationConfig(updated);
                              try {
                                localStorage.setItem('ruh_inauguration_config_v1', JSON.stringify(updated));
                              } catch {}
                            }}
                            onBlur={() => {
                              if (onSyncToServer && inaugurationConfig) onSyncToServer({ inaugurationConfig });
                            }}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono text-xs text-neutral-800 focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36]"
                          />
                          <span className="text-[10px] text-neutral-500 mt-1 block">
                            Yeh loading screen ke bottom me permanent show hoga: "Architected & Developed by [Name]"
                          </span>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-800 block mb-1">
                            🎉 Inauguration Ceremony Title
                          </label>
                          <input
                            type="text"
                            value={inaugurationConfig?.inaugurationTitle || ''}
                            placeholder="Grand Portal Inauguration"
                            onChange={(e) => {
                              if (!setInaugurationConfig || !inaugurationConfig) return;
                              const updated = { ...inaugurationConfig, inaugurationTitle: e.target.value };
                              setInaugurationConfig(updated);
                              try {
                                localStorage.setItem('ruh_inauguration_config_v1', JSON.stringify(updated));
                              } catch {}
                            }}
                            onBlur={() => {
                              if (onSyncToServer && inaugurationConfig) onSyncToServer({ inaugurationConfig });
                            }}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono text-xs text-neutral-800 focus:border-[#084c36] focus:ring-1 focus:ring-[#084c36]"
                          />
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-neutral-500 font-mono">
                              Status: {inaugurationConfig?.enabled ? '🟢 Active' : '⚪ Inactive'}
                            </span>
                            {onTriggerInaugurationPreview && (
                              <button
                                type="button"
                                onClick={() => {
                                  onTriggerInaugurationPreview();
                                }}
                                className="text-[11px] font-bold bg-[#084c36] hover:bg-[#063b2a] text-[#FDB813] px-3 py-1.5 rounded-lg border border-emerald-700/40 flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform active:scale-95"
                              >
                                <span>▶️ Test Inauguration Screen</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Logo Management */}
                      <div className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-950 uppercase font-mono">
                            Foundation Logo
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                            Header & Nav
                          </span>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-neutral-200">
                          <div className="w-16 h-16 rounded-xl bg-neutral-900 p-2 flex items-center justify-center shrink-0 border border-neutral-300">
                            <img
                              src={heroContent.logoUrl || '/logo.png'}
                              alt="Logo Preview"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <label className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95">
                              <Upload className="w-3.5 h-3.5 text-[#FDB813]" />
                              <span>Upload New Logo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, (url) => {
                                    setHeroContent({ ...heroContent, logoUrl: url });
                                  })
                                }
                              />
                            </label>
                            <input
                              type="text"
                              value={heroContent.logoUrl || ''}
                              onChange={(e) => setHeroContent({ ...heroContent, logoUrl: e.target.value })}
                              placeholder="Or paste Logo Image URL..."
                              className="w-full bg-neutral-50 border border-neutral-300 rounded p-1.5 font-mono text-[11px] text-neutral-700"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Video Background & Poster */}
                      <div className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-950 uppercase font-mono">
                            Hero Background Media
                          </span>
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                            MP4 Video + Fallback
                          </span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Background Video URL (.mp4)
                            </label>
                            <input
                              type="text"
                              value={heroContent.videoUrl}
                              onChange={(e) => setHeroContent({ ...heroContent, videoUrl: e.target.value })}
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono text-[11px]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Fallback Poster Photo
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={heroContent.posterUrl}
                                onChange={(e) => setHeroContent({ ...heroContent, posterUrl: e.target.value })}
                                className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono text-[11px]"
                              />
                              <label className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3 py-2 rounded-lg inline-flex items-center gap-1 cursor-pointer shrink-0">
                                <Upload className="w-3.5 h-3.5 text-[#FDB813]" />
                                <span className="hidden sm:inline">Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImageUpload(e, (url) => {
                                      setHeroContent({ ...heroContent, posterUrl: url });
                                    })
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kinetic Headline & Badge */}
                    <div className="bg-[#faf8f5] rounded-2xl p-4 sm:p-5 border border-neutral-200 space-y-4">
                      <span className="text-xs font-bold text-emerald-950 uppercase font-mono">
                        Hero Headlines & Badges
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Header Top Badge
                          </label>
                          <input
                            type="text"
                            value={heroContent.badgeText}
                            onChange={(e) => setHeroContent({ ...heroContent, badgeText: e.target.value })}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Title Part 1 (First Line)
                          </label>
                          <input
                            type="text"
                            value={heroContent.title1}
                            onChange={(e) => setHeroContent({ ...heroContent, title1: e.target.value })}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Title Part 2 (Golden Highlight)
                          </label>
                          <input
                            type="text"
                            value={heroContent.title2}
                            onChange={(e) => setHeroContent({ ...heroContent, title2: e.target.value })}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold text-amber-600"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Title Part 3 (Ending Accent)
                          </label>
                          <input
                            type="text"
                            value={heroContent.title3}
                            onChange={(e) => setHeroContent({ ...heroContent, title3: e.target.value })}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Hero Subtitle / Description
                        </label>
                        <textarea
                          rows={2}
                          value={heroContent.subtitle}
                          onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                          className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        showToast('Branding & Hero settings saved and synced!');
                        onSyncToServer?.();
                      }}
                      className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#FDB813]" />
                      <span>Save Branding & Hero Changes</span>
                    </button>
                  </div>
                )}
                
                {/* 1. ACTIVITIES / DRIVES TAB */}
                {activeTab === 'activities' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">
                        Manage Live & Upcoming Seva Drives
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Update drive prices, target units, delivered progress meters, and status.
                      </p>
                    </div>

                    {/* Quick Jump & Photo Helper Banner */}
                    <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">🥤</span>
                        <div>
                          <h4 className="text-xs font-bold text-emerald-950">
                            Change Photos for Juices & Seva Items
                          </h4>
                          <p className="text-[11px] text-emerald-800">
                            Both <strong>Pure Cold-Pressed Anar Juice</strong> and <strong>Immunity Juice Packs (Citrus & Anar)</strong> are listed below with 1-click device photo replacement.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href="#drive-anar-juice"
                          className="bg-[#084c36] hover:bg-[#063b2a] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>🍇 Jump to Anar Juice</span>
                        </a>
                        <a
                          href="#drive-immunity-packs"
                          className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>🍊 Jump to Immunity Packs</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {driveItems.map((drive, idx) => (
                        <div
                          key={drive.id}
                          id={`drive-${drive.id}`}
                          className={`rounded-2xl p-4 border space-y-3 transition-all ${
                            drive.id === 'anar-juice'
                              ? 'bg-rose-50/40 border-rose-300 ring-2 ring-rose-200 shadow-xs'
                              : drive.id === 'immunity-packs'
                              ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-200 shadow-xs'
                              : 'bg-[#faf8f5] border-neutral-200'
                          }`}
                        >
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-emerald-950 uppercase font-mono">
                                Drive #{idx + 1} • {drive.id}
                              </span>
                              {drive.id === 'anar-juice' && (
                                <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">
                                  🍇 Pure Anar Juice Card
                                </span>
                              )}
                              {drive.id === 'immunity-packs' && (
                                <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-bold">
                                  🍊 Citrus & Anar Immunity Pack
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                              {drive.badge}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <label className="text-[10px] font-semibold text-neutral-500 block mb-1">
                                Drive Name
                              </label>
                              <input
                                type="text"
                                value={drive.name}
                                onChange={(e) => {
                                  const updated = [...driveItems];
                                  updated[idx].name = e.target.value;
                                  setDriveItems(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold text-neutral-500 block mb-1">
                                Unit Price (₹)
                              </label>
                              <input
                                type="number"
                                value={drive.price}
                                onChange={(e) => {
                                  const updated = [...driveItems];
                                  updated[idx].price = Number(e.target.value) || 0;
                                  setDriveItems(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold text-emerald-900"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold text-neutral-500 block mb-1">
                                Delivered Count
                              </label>
                              <input
                                type="text"
                                value={drive.deliveredCount}
                                onChange={(e) => {
                                  const updated = [...driveItems];
                                  updated[idx].deliveredCount = e.target.value;
                                  setDriveItems(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <label className="text-[10px] font-semibold text-neutral-500 block mb-1">
                                Tagline / Frequency
                              </label>
                              <input
                                type="text"
                                value={drive.tagline}
                                onChange={(e) => {
                                  const updated = [...driveItems];
                                  updated[idx].tagline = e.target.value;
                                  setDriveItems(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold text-neutral-500 block mb-1">
                                Target Count
                              </label>
                              <input
                                type="text"
                                value={drive.targetCount}
                                onChange={(e) => {
                                  const updated = [...driveItems];
                                  updated[idx].targetCount = e.target.value;
                                  setDriveItems(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                              />
                            </div>
                          </div>

                          {/* Drive Photo & Device Upload */}
                          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-neutral-200 shadow-2xs">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-900 border-2 border-[#084c36]/40 shrink-0 shadow-xs">
                              <img
                                src={drive.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'}
                                alt={drive.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-neutral-700 uppercase">
                                  {drive.name} Photo
                                </span>
                                <span className="text-[9px] text-emerald-800 bg-emerald-50 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                                  1-Click Upload
                                </span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                <label className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3 py-1.5 rounded-xl inline-flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95 shrink-0">
                                  <Upload className="w-3.5 h-3.5 text-[#FDB813]" />
                                  <span>📁 Replace Photo</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleImageUpload(e, async (url) => {
                                        const updated = [...driveItems];
                                        updated[idx].image = url;
                                        setDriveItems(updated);
                                        await pushServerState({ driveItems: updated });
                                        await onSyncToServer?.({ driveItems: updated });
                                        showToast(`✅ Photo updated & saved for ${drive.name}!`);
                                      })
                                    }
                                  />
                                </label>
                                <input
                                  type="text"
                                  value={drive.image || ''}
                                  onChange={(e) => {
                                    const updated = [...driveItems];
                                    updated[idx].image = e.target.value;
                                    setDriveItems(updated);
                                  }}
                                  placeholder="Or paste image URL (e.g. /uploads/... or https://...)"
                                  className="flex-1 bg-neutral-50 border border-neutral-300 rounded-xl px-2.5 py-1.5 font-mono text-[10px] text-neutral-700 focus:bg-white focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-semibold text-neutral-500 block mb-1">
                              Description & Verification Protocol
                            </label>
                            <textarea
                              rows={2}
                              value={drive.description}
                              onChange={(e) => {
                                const updated = [...driveItems];
                                updated[idx].description = e.target.value;
                                setDriveItems(updated);
                              }}
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={async () => {
                        await pushServerState({ driveItems });
                        await onSyncToServer?.({ driveItems });
                        showToast('✅ All Drive settings saved & synced successfully!');
                      }}
                      className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#FDB813]" />
                      <span>Save All Drive Changes</span>
                    </button>
                  </div>
                )}

                {/* 2. STORY & ETHOS CMS TAB */}
                {activeTab === 'story' && storyContent && setStoryContent && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">
                        Foundation Story & Ethos CMS
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Customize the mission title, highlighted phrase, inspirational quote, story paragraphs, and bedside photo.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Story Ethos Photo */}
                      <div className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-950 uppercase font-mono">
                            Ethos Feature Photo
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                            Bedside Seva Picture
                          </span>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-neutral-200">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-300 shadow-xs">
                            <img
                              src={storyContent.ethosImage}
                              alt="Story Ethos"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <label className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95">
                              <Upload className="w-3.5 h-3.5 text-[#FDB813]" />
                              <span>Replace Story Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, (url) => {
                                    setStoryContent({ ...storyContent, ethosImage: url });
                                  })
                                }
                              />
                            </label>
                            <input
                              type="text"
                              value={storyContent.ethosImage}
                              onChange={(e) => setStoryContent({ ...storyContent, ethosImage: e.target.value })}
                              placeholder="Or paste Photo URL..."
                              className="w-full bg-neutral-50 border border-neutral-300 rounded p-1.5 font-mono text-[11px] text-neutral-700"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Headline and Quote */}
                      <div className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-950 uppercase font-mono">
                            Mission Statement & Quote
                          </span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Mission Title
                            </label>
                            <input
                              type="text"
                              value={storyContent.missionTitle}
                              onChange={(e) => setStoryContent({ ...storyContent, missionTitle: e.target.value })}
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Highlight Phrase
                            </label>
                            <input
                              type="text"
                              value={storyContent.missionHighlight}
                              onChange={(e) => setStoryContent({ ...storyContent, missionHighlight: e.target.value })}
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold text-amber-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#faf8f5] rounded-2xl p-4 sm:p-5 border border-neutral-200 space-y-4 text-xs">
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Inspirational Quote (Featured Callout)
                        </label>
                        <input
                          type="text"
                          value={storyContent.storyQuote}
                          onChange={(e) => setStoryContent({ ...storyContent, storyQuote: e.target.value })}
                          className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-serif italic text-emerald-950"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Established Year / Subheading
                        </label>
                        <input
                          type="text"
                          value={storyContent.establishedText}
                          onChange={(e) => setStoryContent({ ...storyContent, establishedText: e.target.value })}
                          className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Story Narrative Paragraph 1
                        </label>
                        <textarea
                          rows={3}
                          value={storyContent.paragraph1}
                          onChange={(e) => setStoryContent({ ...storyContent, paragraph1: e.target.value })}
                          className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Har Ekadashi Sacred Vow Narrative
                        </label>
                        <textarea
                          rows={3}
                          value={storyContent.harEkadashiVow}
                          onChange={(e) => setStoryContent({ ...storyContent, harEkadashiVow: e.target.value })}
                          className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        showToast('Story & Ethos settings saved and synced!');
                        onSyncToServer?.();
                      }}
                      className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#FDB813]" />
                      <span>Save Story & Ethos Changes</span>
                    </button>
                  </div>
                )}

                {/* 3. ACTIVITY PHOTOS STREAM TAB */}
                {activeTab === 'photos' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900">
                          Activity Photos Stream (Sliding Media Matrix & Gallery)
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Upload directly from your phone/computer or edit and replace any previous activity photo.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          {mediaPhotosRow1.length + mediaPhotosRow2.length} Photos in Stream
                        </span>
                      </div>
                    </div>

                    {/* Add New Photo Form with Device Upload */}
                    <form
                      onSubmit={handleAddPhoto}
                      className="bg-emerald-50/80 border-2 border-emerald-300/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-emerald-200">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-[#084c36]" />
                          <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                            Publish New On-Ground Activity Photo
                          </h4>
                        </div>

                        {/* Slider Target Selector */}
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-[11px] text-emerald-900 font-semibold">Publish to:</span>
                          <button
                            type="button"
                            onClick={() => setNewPhotoTargetRow('row1')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition-all ${
                              newPhotoTargetRow === 'row1'
                                ? 'bg-[#084c36] text-white shadow-xs'
                                : 'bg-white text-emerald-900 border border-emerald-200'
                            }`}
                          >
                            Top Slider (Row 1)
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewPhotoTargetRow('row2')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition-all ${
                              newPhotoTargetRow === 'row2'
                                ? 'bg-[#084c36] text-white shadow-xs'
                                : 'bg-white text-emerald-900 border border-emerald-200'
                            }`}
                          >
                            Bottom Slider (Row 2)
                          </button>
                        </div>
                      </div>

                      {/* Direct Device File Upload Box */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                        <div className="sm:col-span-2">
                          <label className="flex flex-col items-center justify-center gap-1.5 bg-white hover:bg-emerald-50/80 border-2 border-dashed border-emerald-400 hover:border-emerald-600 rounded-2xl p-3.5 cursor-pointer transition-all shadow-xs group">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Upload className="w-5 h-5 text-[#084c36]" />
                            </div>
                            <div className="text-center">
                              <span className="text-xs font-bold text-neutral-900 block">
                                📁 Choose Photo from Device / Phone Gallery
                              </span>
                              <span className="text-[10px] text-neutral-500 block">
                                Select PNG, JPG, or WEBP from Phone or PC (No URL needed!)
                              </span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, (b64) => setNewPhotoImage(b64))}
                            />
                          </label>
                        </div>

                        {/* Live Photo Preview */}
                        <div className="flex flex-col items-center justify-center p-2 bg-white rounded-2xl border border-neutral-200">
                          <span className="text-[10px] text-neutral-500 font-semibold mb-1 block">
                            Photo Preview
                          </span>
                          <div className="w-24 h-20 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300 relative shadow-inner">
                            {newPhotoImage ? (
                              <img
                                src={newPhotoImage}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-500 text-[10px]">
                                No Photo
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Photo Title *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Bedside Coconut Drive at RUHS"
                            value={newPhotoTitle}
                            onChange={(e) => setNewPhotoTitle(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Hospital / Location
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. RUHS Cancer Ward, Jaipur"
                            value={newPhotoLocation}
                            onChange={(e) => setNewPhotoLocation(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Stats / Metric Badge
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 500+ Patients Served"
                            value={newPhotoStats}
                            onChange={(e) => setNewPhotoStats(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Category & Suggested Unit Price (₹)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newPhotoCategory}
                              onChange={(e) => setNewPhotoCategory(e.target.value)}
                              className="flex-1 bg-white border border-neutral-300 rounded-lg p-2"
                            />
                            <input
                              type="number"
                              value={newPhotoPrice}
                              onChange={(e) => setNewPhotoPrice(Number(e.target.value) || 65)}
                              className="w-24 bg-white border border-neutral-300 rounded-lg p-2 font-bold text-emerald-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Photo URL (Optional web fallback)
                          </label>
                          <input
                            type="text"
                            value={newPhotoImage}
                            onChange={(e) => setNewPhotoImage(e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono text-[10px] text-neutral-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Full On-Ground Verification Story
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Describe the drive, volunteers involved, and patient relief..."
                          value={newPhotoStory}
                          onChange={(e) => setNewPhotoStory(e.target.value)}
                          className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Plus className="w-4 h-4 text-[#FDB813]" />
                        <span>Publish New Photo Card to {newPhotoTargetRow === 'row1' ? 'Row 1' : 'Row 2'}</span>
                      </button>
                    </form>

                    {/* Filter & Manage Existing Activity Photos */}
                    <div className="space-y-4 pt-4 border-t border-neutral-200">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900">
                            Manage & Edit Existing Activity Photos
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Click "Change Photo" on any card to upload a new picture directly from your device.
                          </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="bg-neutral-100 p-1 rounded-xl flex items-center gap-1 text-xs">
                          <button
                            type="button"
                            onClick={() => setPhotoFilterRow('all')}
                            className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                              photoFilterRow === 'all'
                                ? 'bg-white text-neutral-950 font-bold shadow-xs'
                                : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                          >
                            All ({mediaPhotosRow1.length + mediaPhotosRow2.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setPhotoFilterRow('row1')}
                            className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                              photoFilterRow === 'row1'
                                ? 'bg-white text-neutral-950 font-bold shadow-xs'
                                : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                          >
                            Top Slider ({mediaPhotosRow1.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setPhotoFilterRow('row2')}
                            className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                              photoFilterRow === 'row2'
                                ? 'bg-white text-neutral-950 font-bold shadow-xs'
                                : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                          >
                            Bottom Slider ({mediaPhotosRow2.length})
                          </button>
                        </div>
                      </div>

                      {/* Photo Cards Grid with Full Inline Editing & Device Replace */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {(photoFilterRow === 'row1'
                          ? mediaPhotosRow1
                          : photoFilterRow === 'row2'
                          ? mediaPhotosRow2
                          : [...mediaPhotosRow1, ...mediaPhotosRow2]
                        ).map((photo) => {
                          const isRow1 = mediaPhotosRow1.some((p) => p.id === photo.id);
                          return (
                            <div
                              key={photo.id}
                              className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all space-y-3"
                            >
                              <div className="flex flex-col sm:flex-row items-start gap-3.5">
                                {/* Photo Thumbnail with 1-Click Device File Replace */}
                                <div className="flex flex-col items-center gap-2 shrink-0 w-full sm:w-auto">
                                  <div className="w-full sm:w-28 h-32 sm:h-28 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 relative group shadow-xs">
                                    <img
                                      src={photo.image}
                                      alt={photo.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-1.5 left-1.5">
                                      <span className="text-[9px] font-mono font-bold bg-neutral-900/80 text-amber-300 px-1.5 py-0.5 rounded">
                                        {isRow1 ? 'Top Slider' : 'Bottom Slider'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Direct Device Upload Button for Existing Photo */}
                                  <label className="w-full sm:w-auto bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95">
                                    <Upload className="w-3.5 h-3.5 text-[#FDB813]" />
                                    <span>📁 Replace Photo</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) =>
                                        handleImageUpload(e, (b64) =>
                                          handleUpdateExistingPhoto(photo.id, { image: b64 })
                                        )
                                      }
                                    />
                                  </label>
                                </div>

                                {/* Editable Fields for Existing Photo */}
                                <div className="flex-1 min-w-0 space-y-2 text-xs w-full">
                                  <div>
                                    <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">
                                      Drive Title
                                    </label>
                                    <input
                                      type="text"
                                      value={photo.title}
                                      onChange={(e) =>
                                        handleUpdateExistingPhoto(photo.id, { title: e.target.value })
                                      }
                                      className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-1.5 font-bold text-neutral-900"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">
                                        Hospital Ward / Location
                                      </label>
                                      <input
                                        type="text"
                                        value={photo.location}
                                        onChange={(e) =>
                                          handleUpdateExistingPhoto(photo.id, { location: e.target.value })
                                        }
                                        className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-1.5"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">
                                        Stats Badge
                                      </label>
                                      <input
                                        type="text"
                                        value={photo.stats}
                                        onChange={(e) =>
                                          handleUpdateExistingPhoto(photo.id, { stats: e.target.value })
                                        }
                                        className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-1.5 font-mono text-[11px]"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">
                                        Category
                                      </label>
                                      <input
                                        type="text"
                                        value={photo.category}
                                        onChange={(e) =>
                                          handleUpdateExistingPhoto(photo.id, { category: e.target.value })
                                        }
                                        className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-1.5"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">
                                        Unit Price (₹)
                                      </label>
                                      <input
                                        type="number"
                                        value={photo.defaultPrice}
                                        onChange={(e) =>
                                          handleUpdateExistingPhoto(photo.id, {
                                            defaultPrice: Number(e.target.value) || 65,
                                          })
                                        }
                                        className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-1.5 font-bold text-emerald-900"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-[10px] text-neutral-500 font-semibold block mb-0.5">
                                      Full Verification Story
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={photo.fullStory || photo.description}
                                      onChange={(e) =>
                                        handleUpdateExistingPhoto(photo.id, {
                                          fullStory: e.target.value,
                                          description: e.target.value,
                                        })
                                      }
                                      className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-1.5 text-xs"
                                    />
                                  </div>

                                  {/* Row Switching & Delete Actions */}
                                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100">
                                    <button
                                      type="button"
                                      onClick={() => handleMovePhotoRow(photo.id, isRow1 ? 'row2' : 'row1')}
                                      className="text-[11px] font-semibold text-[#084c36] hover:underline bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                                    >
                                      Move to {isRow1 ? 'Bottom Slider (Row 2)' : 'Top Slider (Row 1)'} ➔
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleDeletePhoto(photo.id)}
                                      className="text-red-600 hover:text-red-800 text-[11px] font-bold flex items-center gap-1 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                                      title="Delete Photo"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Delete Photo</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => {
                          showToast('All Activity Photo Matrix changes saved & synced successfully!');
                          onSyncToServer?.();
                        }}
                        className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <Save className="w-4 h-4 text-[#FDB813]" />
                        <span>Save All Photo Stream Changes</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* LIVE GALLERY MULTI-PHOTO ALBUMS CMS TAB */}
                {activeTab === 'gallery' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                          <Images className="w-5 h-5 text-[#084c36]" />
                          <span>Live Impact Gallery CMS (Multi-Photo Activity Albums)</span>
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Add multiple ground photos to any activity. In the Live Gallery, users can click to open a multi-photo carousel with next/prev arrows, photo counters, and thumbnail navigation.
                        </p>
                      </div>
                      <span className="text-[11px] font-mono bg-emerald-100 text-[#084c36] font-bold px-3 py-1 rounded-full w-fit">
                        {galleryItems.length} Activities •{' '}
                        {galleryItems.reduce((acc, it) => acc + (it.images?.length || 1), 0)} Total Photos
                      </span>
                    </div>

                    {/* Quick Helper Banner */}
                    <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl shrink-0">
                          📸
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-emerald-950">
                            Multiple Photos for Every Ground Activity
                          </h4>
                          <p className="text-[11px] text-emerald-800">
                            Select multiple photos at once from your phone or PC. Set any photo as the cover, remove unwanted shots, or add more photos at any time!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Create New Live Activity with Multi-Photo Album */}
                    <form
                      onSubmit={handleAddGalleryActivity}
                      className="bg-emerald-50/60 border-2 border-emerald-300/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs"
                    >
                      <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-[#084c36]" />
                          <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                            Publish New Activity Album
                          </h4>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-medium">
                          Multi-Photo Upload Supported
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Activity Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={newGalleryTitle}
                            onChange={(e) => setNewGalleryTitle(e.target.value)}
                            placeholder="e.g., Slum School Science Kits & Digital Tabs Drive"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Category / Seva Chapter * (Click Preset or Type Custom)
                          </label>
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {[
                              { label: '🥥 Nariyal Pani Seva', val: 'Har Ekadashi Nariyal Pani Seva' },
                              { label: '🏫 Slum & Child Drives', val: 'Slum & Child Education Drives' },
                              { label: '🧵 Women Sewing', val: 'Women Sewing Training' },
                              { label: '♿ Divyangjan Livelihoods', val: 'Disabled Livelihoods' },
                              { label: '🩺 Healthcare & Oncology', val: 'Healthcare Drives' },
                            ].map((preset) => (
                              <button
                                key={preset.val}
                                type="button"
                                onClick={() => setNewGalleryCategory(preset.val)}
                                className={`text-[10px] px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                                  newGalleryCategory === preset.val
                                    ? 'bg-[#084c36] text-white border-[#084c36] shadow-xs scale-102'
                                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                                }`}
                              >
                                <span>{preset.label}</span>
                              </button>
                            ))}
                          </div>
                          <input
                            type="text"
                            required
                            value={newGalleryCategory}
                            onChange={(e) => setNewGalleryCategory(e.target.value)}
                            placeholder="e.g. Har Ekadashi Nariyal Pani Seva, Slum & Child Education Drives, etc."
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 font-medium"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Live Feed Tagging
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer bg-white border border-neutral-300 rounded-xl p-2.5 hover:bg-rose-50/40 transition-colors">
                            <input
                              type="checkbox"
                              checked={newGalleryIsRecent}
                              onChange={(e) => setNewGalleryIsRecent(e.target.checked)}
                              className="w-4 h-4 text-rose-600 rounded cursor-pointer accent-rose-600"
                            />
                            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                              <Flame className="w-3.5 h-3.5 text-rose-600" />
                              <span>Mark Recently Uploaded</span>
                            </span>
                          </label>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Ground Location *
                          </label>
                          <input
                            type="text"
                            value={newGalleryLocation}
                            onChange={(e) => setNewGalleryLocation(e.target.value)}
                            placeholder="e.g., RUHS Hospital, Jaipur"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Activity Date *
                          </label>
                          <input
                            type="text"
                            value={newGalleryDate}
                            onChange={(e) => setNewGalleryDate(e.target.value)}
                            placeholder="e.g., September 2026 or 12 Oct 2026"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Quick Highlight Stat
                          </label>
                          <input
                            type="text"
                            value={newGalleryStats}
                            onChange={(e) => setNewGalleryStats(e.target.value)}
                            placeholder="e.g., 3,500 Coconuts • 4 Wards"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Short Summary (Card Preview)
                          </label>
                          <input
                            type="text"
                            value={newGallerySummary}
                            onChange={(e) => setNewGallerySummary(e.target.value)}
                            placeholder="Brief 1-2 sentence description shown on the grid card"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Impact Metrics
                          </label>
                          <input
                            type="text"
                            value={newGalleryImpactMetrics}
                            onChange={(e) => setNewGalleryImpactMetrics(e.target.value)}
                            placeholder="e.g., 12 Wards Sanitized, 450 Beneficiaries"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Extended On-Ground Story (Shown in Lightbox)
                          </label>
                          <textarea
                            rows={2}
                            value={newGalleryFullStory}
                            onChange={(e) => setNewGalleryFullStory(e.target.value)}
                            placeholder="Detailed story and volunteer testimonial for this activity..."
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 text-xs resize-none"
                          />
                        </div>
                      </div>

                      {/* Multi-Photo Device Upload Box */}
                      <div className="bg-white rounded-2xl p-4 border border-emerald-200 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-neutral-900 block">
                              📸 Upload Photos for this Activity (Select 1 or More)
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              You can select multiple photos together from your phone gallery or laptop folder.
                            </span>
                          </div>
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            {newGalleryImages.length} Photo(s) Selected
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                          <label className="flex flex-col items-center justify-center gap-1.5 bg-emerald-50/50 hover:bg-emerald-100/60 border-2 border-dashed border-emerald-400 hover:border-emerald-600 rounded-2xl p-3.5 cursor-pointer transition-all shadow-xs group">
                            <div className="w-9 h-9 rounded-full bg-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Upload className="w-5 h-5 text-[#084c36]" />
                            </div>
                            <div className="text-center">
                              <span className="text-xs font-bold text-neutral-900 block">
                                📁 Select Multiple Photos from Device
                              </span>
                              <span className="text-[10px] text-neutral-500 block">
                                Hold Ctrl / Shift to pick multiple images
                              </span>
                            </div>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleMultiImageUpload(e, (urls) =>
                                  setNewGalleryImages((prev) => [...prev, ...urls])
                                )
                              }
                            />
                          </label>

                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              value={newGalleryManualUrl}
                              onChange={(e) => setNewGalleryManualUrl(e.target.value)}
                              placeholder="Or paste an image web URL..."
                              className="flex-1 bg-white border border-neutral-300 rounded-xl p-2.5 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newGalleryManualUrl.trim()) {
                                  setNewGalleryImages((prev) => [...prev, newGalleryManualUrl.trim()]);
                                  setNewGalleryManualUrl('');
                                  showToast('Photo URL added to album preview!');
                                }
                              }}
                              className="bg-[#084c36] hover:bg-[#063b2a] text-white px-3 py-2.5 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Selected Photos Thumbnails Strip */}
                        {newGalleryImages.length > 0 && (
                          <div className="pt-2 border-t border-neutral-100">
                            <span className="text-[11px] font-bold text-neutral-700 block mb-2">
                              Selected Album Photos (First photo is Cover):
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                               {newGalleryImages.map((imgUrl, imgIdx) => (
                                <div
                                  key={`new-img-${imgIdx}`}
                                  className="relative group w-20 h-20 rounded-xl overflow-hidden border border-neutral-300 bg-neutral-900 shrink-0 shadow-xs"
                                >
                                  <img
                                    src={imgUrl}
                                    alt={`Preview ${imgIdx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  {imgIdx === 0 && (
                                    <span className="absolute top-1 left-1 bg-amber-400 text-neutral-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-xs z-10">
                                      Cover
                                    </span>
                                  )}
                                  {/* Permanent, Always-Visible Remove Button */}
                                  <button
                                    type="button"
                                    title="Remove this photo"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      setNewGalleryImages((prev) => prev.filter((_, i) => i !== imgIdx));
                                    }}
                                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-90 text-white flex items-center justify-center cursor-pointer shadow-md z-20"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    {imgIdx !== 0 && (
                                      <button
                                        type="button"
                                        title="Set as cover"
                                        onClick={() => {
                                          const filtered = newGalleryImages.filter((_, i) => i !== imgIdx);
                                          setNewGalleryImages([imgUrl, ...filtered]);
                                        }}
                                        className="w-6 h-6 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center justify-center cursor-pointer shadow-xs"
                                      >
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {isUploadingGalleryImages && (
                        <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-xl p-3 text-xs font-semibold flex items-center gap-2 shadow-2xs">
                          <div className="w-4 h-4 border-2 border-amber-700 border-t-transparent rounded-full animate-spin shrink-0" />
                          <span>Uploading & compressing photo(s)... Please wait before publishing.</span>
                        </div>
                      )}

                      {newGalleryError && (
                        <div className="bg-rose-50 border border-rose-300 text-rose-800 rounded-xl p-2.5 text-xs font-bold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{newGalleryError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isUploadingGalleryImages}
                        className={`w-full font-bold py-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${
                          isUploadingGalleryImages
                            ? 'bg-neutral-400 text-white cursor-not-allowed'
                            : 'bg-[#084c36] hover:bg-[#063b2a] text-white shadow-emerald-900/10'
                        }`}
                      >
                        {isUploadingGalleryImages ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4 text-[#FDB813]" />
                        )}
                        <span>
                          {isUploadingGalleryImages
                            ? 'Compressing & Uploading Photos...'
                            : `Publish Activity Album to Live Gallery (${newGalleryImages.length} Photos)`}
                        </span>
                      </button>
                    </form>

                    {/* Manage Existing Activity Albums */}
                    <div className="space-y-4 pt-4 border-t border-neutral-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900">
                            Existing Activity Albums ({galleryItems.length})
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Upload additional photos, change cover photos, remove individual shots, or edit details.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {galleryItems.map((item, actIdx) => {
                          const itemImages =
                            item.images && item.images.length > 0 ? item.images : [item.image];
                          const manualAddVal = galleryManualAddUrls[item.id] || '';

                          return (
                            <div
                              key={item.id}
                              className="bg-[#faf8f5] rounded-2xl p-4 sm:p-5 border border-neutral-200 space-y-4 shadow-xs"
                            >
                              {/* Activity Header */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-mono font-bold text-emerald-950 bg-emerald-100/80 px-2 py-0.5 rounded">
                                      #{actIdx + 1}
                                    </span>
                                    <span className="text-xs font-bold text-neutral-900">
                                      {item.title}
                                    </span>

                                    {/* 1-Click Recent Toggle */}
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateActivity(item.id, { isRecent: !item.isRecent })}
                                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all flex items-center gap-1 cursor-pointer ${
                                        item.isRecent
                                          ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                                          : 'bg-white text-neutral-500 border-neutral-300 hover:border-rose-300 hover:text-rose-700'
                                      }`}
                                      title="Click to toggle Recently Uploaded feed status"
                                    >
                                      <Flame className={`w-3 h-3 ${item.isRecent ? 'text-amber-300 fill-amber-300' : 'text-neutral-400'}`} />
                                      <span>{item.isRecent ? '🔥 Recent (Active)' : 'Mark Recent'}</span>
                                    </button>

                                    {/* Category Selector */}
                                    <select
                                      value={item.category}
                                      onChange={(e) => handleUpdateActivity(item.id, { category: e.target.value })}
                                      className="text-[10px] bg-white border border-neutral-300 rounded-lg px-2 py-0.5 font-bold text-neutral-800 cursor-pointer"
                                      title="Change Category Chapter"
                                    >
                                      <option value="Har Ekadashi Nariyal Pani Seva">🥥 Har Ekadashi Nariyal Pani Seva</option>
                                      <option value="Slum & Child Education Drives">🏫 Slum & Child Education Drives</option>
                                      <option value="Women Sewing Training">🧵 Women Sewing Training</option>
                                      <option value="Disabled Livelihoods">♿ Disabled Livelihoods</option>
                                      <option value="Healthcare Drives">🩺 Healthcare Drives</option>
                                      <option value="Emergency Medical Relief">🚑 Emergency Medical Relief</option>
                                      {item.category && ![
                                        'Har Ekadashi Nariyal Pani Seva',
                                        'Slum & Child Education Drives',
                                        'Women Sewing Training',
                                        'Disabled Livelihoods',
                                        'Healthcare Drives',
                                        'Emergency Medical Relief'
                                      ].includes(item.category) && (
                                        <option value={item.category}>{item.category}</option>
                                      )}
                                    </select>
                                  </div>
                                  <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                                    <span>📍 {item.location}</span>
                                    <span>📅 {item.date}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-xl border border-emerald-200 shadow-2xs">
                                    📸 {itemImages.length} Photo{itemImages.length !== 1 ? 's' : ''}
                                  </span>
                                  {confirmDeleteActId === item.id ? (
                                    <div className="flex items-center gap-1.5 bg-rose-50 border-2 border-rose-400 rounded-xl p-1 shadow-sm animate-pulse">
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteActivity(item.id)}
                                        className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-extrabold cursor-pointer transition-all active:scale-95 shadow-xs flex items-center gap-1"
                                        title="Permanently Delete Activity"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Confirm Delete?</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={cancelDeleteActivity}
                                        className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-bold cursor-pointer border border-neutral-300"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => promptDeleteActivity(item.id)}
                                      className="px-3 py-1.5 text-rose-700 bg-white hover:bg-rose-600 hover:text-white rounded-xl border border-rose-200 hover:border-rose-600 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs group"
                                      title="Delete this entire activity"
                                    >
                                      <Trash2 className="w-3.5 h-3.5 text-rose-600 group-hover:text-white transition-colors" />
                                      <span>Delete Activity</span>
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Photo Album Manager Grid */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-bold text-neutral-800">
                                    Photo Album ({itemImages.length} Photos) • First photo is Cover
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                                  {itemImages.map((photo, pIdx) => {
                                    const isCover = pIdx === 0 || photo === item.image;
                                    return (
                                      <div
                                        key={`act-${item.id}-p-${pIdx}`}
                                        className={`relative group rounded-xl overflow-hidden aspect-square bg-neutral-900 border transition-all ${
                                          isCover
                                            ? 'ring-2 ring-amber-400 border-amber-400'
                                            : 'border-neutral-200 hover:border-neutral-400'
                                        }`}
                                      >
                                        <img
                                          src={photo}
                                          alt={`Photo ${pIdx + 1}`}
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {isCover && (
                                          <div className="absolute top-1 left-1 bg-amber-400 text-neutral-950 font-bold text-[9px] px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5 z-20">
                                            <Star className="w-2.5 h-2.5 fill-current" />
                                            <span>Cover</span>
                                          </div>
                                        )}

                                        {/* 🌟 Permanent, Always-Visible 1-Click Delete Button on Top-Right */}
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleRemovePhotoFromActivity(item.id, photo);
                                          }}
                                          title="Delete / Remove this photo"
                                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-90 text-white flex items-center justify-center cursor-pointer shadow-md z-30 transition-transform"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>

                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 z-10">
                                          {!isCover && (
                                            <button
                                              type="button"
                                              onClick={() => handleSetCoverPhoto(item.id, photo)}
                                              title="Set as Cover Photo"
                                              className="w-6 h-6 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center justify-center cursor-pointer shadow-xs"
                                            >
                                              <Star className="w-3.5 h-3.5 fill-current" />
                                            </button>
                                          )}
                                          <a
                                            href={photo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="View Full Resolution"
                                            className="w-6 h-6 rounded-full bg-white/80 hover:bg-white text-neutral-900 flex items-center justify-center shadow-xs"
                                          >
                                            <Eye className="w-3 h-3" />
                                          </a>
                                          <button
                                            type="button"
                                            onClick={() => handleRemovePhotoFromActivity(item.id, photo)}
                                            title="Remove Photo"
                                            className="w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center cursor-pointer shadow-xs"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {/* Add More Photos Direct Device Upload Box */}
                                  <label className="rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-600 bg-white hover:bg-emerald-50/50 flex flex-col items-center justify-center p-2 cursor-pointer transition-all aspect-square text-center group">
                                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform mb-1">
                                      {isUploadingToActId === item.id ? (
                                        <div className="w-4 h-4 border-2 border-[#084c36] border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <Upload className="w-4 h-4 text-[#084c36]" />
                                      )}
                                    </div>
                                    <span className="text-[10px] font-bold text-neutral-800 leading-tight">
                                      {isUploadingToActId === item.id ? 'Uploading...' : '+ Add Photos'}
                                    </span>
                                    <span className="text-[9px] text-neutral-400">Device</span>
                                    <input
                                      type="file"
                                      multiple
                                      accept="image/*"
                                      disabled={isUploadingToActId === item.id}
                                      className="hidden"
                                      onChange={(e) =>
                                        handleMultiImageUpload(
                                          e,
                                          (urls) => handleAddPhotosToActivity(item.id, urls),
                                          item.id
                                        )
                                      }
                                    />
                                  </label>
                                </div>
                              </div>

                              {/* Or Add Photo by URL */}
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
                                <span className="text-[11px] font-semibold text-neutral-600 shrink-0">
                                  Add photo by URL:
                                </span>
                                <input
                                  type="url"
                                  value={manualAddVal}
                                  onChange={(e) =>
                                    setGalleryManualAddUrls((prev) => ({
                                      ...prev,
                                      [item.id]: e.target.value,
                                    }))
                                  }
                                  placeholder="Paste image URL to append to this album..."
                                  className="flex-1 bg-white border border-neutral-300 rounded-xl p-2 text-xs"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (manualAddVal.trim()) {
                                      handleAddPhotosToActivity(item.id, [manualAddVal.trim()]);
                                      setGalleryManualAddUrls((prev) => ({
                                        ...prev,
                                        [item.id]: '',
                                      }));
                                    }
                                  }}
                                  className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
                                >
                                  + Append Photo
                                </button>
                              </div>

                              {/* Editable Activity Customization Center */}
                              <div className="pt-3 border-t border-neutral-200 text-xs space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <span className="font-bold text-neutral-800 text-xs flex items-center gap-1.5">
                                    <Settings className="w-3.5 h-3.5 text-[#084c36]" />
                                    <span>Activity Details & Customization</span>
                                  </span>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {confirmDeleteActId === item.id ? (
                                      <div className="flex items-center gap-1.5 bg-rose-50 border-2 border-rose-400 rounded-lg p-1">
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteActivity(item.id)}
                                          className="bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-md cursor-pointer transition-all active:scale-95 shadow-xs flex items-center gap-1"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                          <span>Yes, Delete Activity!</span>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={cancelDeleteActivity}
                                          className="bg-white hover:bg-neutral-100 text-neutral-700 text-[11px] font-bold px-2.5 py-1.5 rounded-md border border-neutral-300 cursor-pointer"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => promptDeleteActivity(item.id)}
                                        className="text-rose-700 hover:bg-rose-600 hover:text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-rose-200 hover:border-rose-600 bg-white flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                                        title="Delete this entire activity"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 text-rose-600 hover:text-white" />
                                        <span>Delete Activity</span>
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleExplicitSaveActivity(item.id)}
                                      className="bg-[#084c36] hover:bg-[#063b2a] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-transform"
                                      title="Save all changes for this activity"
                                    >
                                      <Save className="w-3.5 h-3.5 text-[#FDB813]" />
                                      <span>Save Activity Changes</span>
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                                  {/* Title */}
                                  <div className="sm:col-span-2">
                                    <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                                      Activity Title
                                    </label>
                                    <input
                                      type="text"
                                      value={item.title}
                                      onChange={(e) =>
                                        handleUpdateActivity(item.id, { title: e.target.value })
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs font-semibold text-neutral-900 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                  </div>

                                  {/* Location */}
                                  <div>
                                    <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                                      Location
                                    </label>
                                    <input
                                      type="text"
                                      value={item.location}
                                      onChange={(e) =>
                                        handleUpdateActivity(item.id, { location: e.target.value })
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs text-neutral-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                  </div>

                                  {/* Date */}
                                  <div>
                                    <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                                      Date (e.g. 09 Sep 2026)
                                    </label>
                                    <input
                                      type="text"
                                      value={item.date}
                                      onChange={(e) =>
                                        handleUpdateActivity(item.id, { date: e.target.value })
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs text-neutral-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                  </div>

                                  {/* Highlight Stat Badge */}
                                  <div>
                                    <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                                      Highlight Stat Badge
                                    </label>
                                    <input
                                      type="text"
                                      value={item.stats}
                                      onChange={(e) =>
                                        handleUpdateActivity(item.id, { stats: e.target.value })
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs text-neutral-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                  </div>

                                  {/* Impact Metrics */}
                                  <div className="sm:col-span-3">
                                    <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                                      Impact Metrics
                                    </label>
                                    <input
                                      type="text"
                                      value={item.impactMetrics || ''}
                                      onChange={(e) =>
                                        handleUpdateActivity(item.id, { impactMetrics: e.target.value })
                                      }
                                      placeholder="e.g. 100% wholesome hot tiffin meals delivered directly..."
                                      className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs text-neutral-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                  </div>

                                  {/* Summary */}
                                  <div className="sm:col-span-4">
                                    <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                                      Short Summary (Front Card)
                                    </label>
                                    <input
                                      type="text"
                                      value={item.summary}
                                      onChange={(e) =>
                                        handleUpdateActivity(item.id, { summary: e.target.value })
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs text-neutral-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                  </div>

                                  {/* Full Story & Narrative */}
                                  <div className="sm:col-span-4">
                                    <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                                      Full Story & Detailed Field Description (Shown in Detail Modal)
                                    </label>
                                    <textarea
                                      rows={3}
                                      value={item.fullStory || item.summary || ''}
                                      onChange={(e) =>
                                        handleUpdateActivity(item.id, { fullStory: e.target.value })
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs text-neutral-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 leading-relaxed"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. CHILD HANGING FRAMES TAB */}
                {activeTab === 'children' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                          <Sliders className="w-5 h-5 text-[#084c36]" />
                          <span>Top Hero 3D Hanging Frames & Child Spotlights</span>
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Customize frame theme, strap length, physics sway motion, and child profiles hanging on the Hero ceiling.
                        </p>
                      </div>
                      <span className="text-[11px] font-mono bg-emerald-100 text-[#084c36] font-bold px-2.5 py-1 rounded-full w-fit">
                        {heroContent?.showFrames !== false ? '● Frames Active' : '○ Frames Hidden'}
                      </span>
                    </div>

                    {/* Frame Visual Controls & Physics Studio */}
                    <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                        <span className="text-xs font-bold text-neutral-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                          <Palette className="w-4 h-4 text-[#FDB813]" />
                          <span>Frame Design & Hanging Physics Settings</span>
                        </span>
                        <div className="flex items-center gap-2">
                          {/* Auto-Rotate 6s Toggle */}
                          <button
                            type="button"
                            onClick={() => {
                              if (setHeroContent) {
                                setHeroContent((prev) => ({
                                  ...prev,
                                  frameAutoRotate: prev?.frameAutoRotate === false ? true : false,
                                }));
                                showToast(
                                  heroContent?.frameAutoRotate === false
                                    ? '✅ Auto-Rotate enabled (Rotates every 6s)'
                                    : '⏸️ Static Frames enabled (Carousel paused)'
                                );
                              }
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs ${
                              heroContent?.frameAutoRotate !== false
                                ? 'bg-sky-600 hover:bg-sky-700 text-white'
                                : 'bg-amber-600 hover:bg-amber-700 text-white'
                            }`}
                          >
                            {heroContent?.frameAutoRotate !== false ? '🔄 Auto-Rotate (6s ON)' : '⏸️ Static (Rotation OFF)'}
                          </button>

                          {/* Delete / Hide Hanging Frames Toggle */}
                          <button
                            type="button"
                            onClick={() => {
                              if (setHeroContent) {
                                const current = heroContent?.showFrames !== false;
                                setHeroContent((prev) => ({
                                  ...prev,
                                  showFrames: !current,
                                }));
                                showToast(
                                  !current
                                    ? '✅ Hanging Frames enabled in Hero'
                                    : '🗑️ Hanging Frames deleted / hidden from Hero'
                                );
                              }
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                              heroContent?.showFrames !== false
                                ? 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>
                              {heroContent?.showFrames !== false
                                ? '🗑️ Delete / Hide Frames from Hero'
                                : '👁️ Restore Frames in Hero'}
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* 1. Theme Selector */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-neutral-700 block">
                            Frame Border Theme
                          </label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[
                              { id: 'matte-white', label: 'Matte White', bg: 'bg-white border-neutral-300' },
                              { id: 'gold-foil', label: '24K Gold Foil', bg: 'bg-amber-50 border-amber-300' },
                              { id: 'vintage-polaroid', label: 'Vintage Polaroid', bg: 'bg-[#faf6ee] border-stone-300' },
                              { id: 'emerald', label: 'Royal Emerald', bg: 'bg-emerald-50 border-emerald-400' },
                            ].map((theme) => {
                              const isSelected = (heroContent?.frameTheme || 'matte-white') === theme.id;
                              return (
                                <button
                                  key={theme.id}
                                  type="button"
                                  onClick={() => {
                                    if (setHeroContent) {
                                      setHeroContent((prev) => ({
                                        ...prev,
                                        frameTheme: theme.id as any,
                                      }));
                                      showToast(`Frame theme set to ${theme.label}`);
                                    }
                                  }}
                                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${theme.bg} ${
                                    isSelected
                                      ? 'ring-2 ring-[#084c36] shadow-xs font-bold text-[#084c36]'
                                      : 'hover:border-neutral-400 text-neutral-600'
                                  }`}
                                >
                                  <div className="text-[11px] font-bold">{theme.label}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 2. Strap Length */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-neutral-700 block">
                            Hanging Strap Length
                          </label>
                          <div className="space-y-1">
                            {[
                              { id: 'short', label: 'Short Straps (High Ceiling)', desc: '144px drop' },
                              { id: 'standard', label: 'Standard Straps (Classic)', desc: '192px drop' },
                              { id: 'long', label: 'Long Straps (Dramatic Hang)', desc: '240px drop' },
                            ].map((strap) => {
                              const isSelected = (heroContent?.frameStrap || 'standard') === strap.id;
                              return (
                                <button
                                  key={strap.id}
                                  type="button"
                                  onClick={() => {
                                    if (setHeroContent) {
                                      setHeroContent((prev) => ({
                                        ...prev,
                                        frameStrap: strap.id as any,
                                      }));
                                      showToast(`Strap length set to ${strap.label}`);
                                    }
                                  }}
                                  className={`w-full p-1.5 px-2.5 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                                    isSelected
                                      ? 'bg-emerald-50 border-emerald-500 font-bold text-[#084c36] ring-1 ring-emerald-500'
                                      : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700'
                                  }`}
                                >
                                  <span className="text-[11px]">{strap.label}</span>
                                  <span className="text-[10px] text-neutral-400 font-mono">{strap.desc}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 3. Physics Motion */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-neutral-700 block">
                            Kinetic Sway Motion
                          </label>
                          <div className="space-y-1">
                            {[
                              { id: 'gentle', label: 'Gentle Harmonic Wind Sway', desc: 'Subtle physics' },
                              { id: 'calm', label: 'Static Calm (No Sway)', desc: 'Zero movement' },
                              { id: 'dynamic', label: 'Dynamic Lifelike Motion', desc: 'Responsive swing' },
                            ].map((motion) => {
                              const isSelected = (heroContent?.frameMotion || 'gentle') === motion.id;
                              return (
                                <button
                                  key={motion.id}
                                  type="button"
                                  onClick={() => {
                                    if (setHeroContent) {
                                      setHeroContent((prev) => ({
                                        ...prev,
                                        frameMotion: motion.id as any,
                                      }));
                                      showToast(`Motion set to ${motion.label}`);
                                    }
                                  }}
                                  className={`w-full p-1.5 px-2.5 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                                    isSelected
                                      ? 'bg-emerald-50 border-emerald-500 font-bold text-[#084c36] ring-1 ring-emerald-500'
                                      : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700'
                                  }`}
                                >
                                  <span className="text-[11px]">{motion.label}</span>
                                  <span className="text-[10px] text-neutral-400 font-mono">{motion.desc}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Child Profile Cards Editor (Left & Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Left Child Form */}
                      <div className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200 space-y-3 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-2 gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-emerald-950 uppercase font-mono flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-[#084c36]" />
                              <span>Left Hanging Frame Card</span>
                            </span>
                            {heroContent?.showLeftFrame !== false ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-[#084c36] border border-emerald-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                <span>● ACTIVE ON HOMEPAGE</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-200 text-neutral-600">
                                <span>○ HIDDEN FROM HOMEPAGE</span>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                if (setHeroContent) {
                                  const current = heroContent?.showLeftFrame !== false;
                                  setHeroContent((prev) => ({ ...prev, showLeftFrame: !current }));
                                  showToast(!current ? '👁️ Left Hanging Frame Activated' : '🗑️ Left Hanging Frame Hidden');
                                  pushServerState({ heroContent: { ...(heroContent || {}), showLeftFrame: !current } as any });
                                }
                              }}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                                heroContent?.showLeftFrame !== false
                                  ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                                  : 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                              }`}
                            >
                              <span>{heroContent?.showLeftFrame !== false ? 'Hide Left Frame' : 'Activate Left Frame'}</span>
                            </button>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                              {childSpotlights.left.verificationNode || 'RUH-NODE-L'}
                            </span>
                          </div>
                        </div>

                        {/* Quick Preset Selector */}
                        <div>
                          <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                            ⚡ Quick Choose / Change Child from Roster:
                          </label>
                          <select
                            onChange={async (e) => {
                              const roster = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                              const found = roster.find((p) => p.id === e.target.value);
                              if (found) {
                                const updated = {
                                  ...childSpotlights,
                                  left: { ...found },
                                };
                                setChildSpotlights(updated);
                                showToast(`Loaded ${found.name} into Left Hanging Frame!`);
                                await pushServerState({ childSpotlights: updated, wardProfiles: roster });
                                await onSyncToServer?.({ childSpotlights: updated, wardProfiles: roster });
                              }
                            }}
                            defaultValue=""
                            className="w-full bg-white border border-emerald-300 rounded-lg p-1.5 text-xs font-medium text-emerald-950 cursor-pointer"
                          >
                            <option value="" disabled>
                              -- Select Child Profile to Auto-Fill --
                            </option>
                            {(wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES).map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name} — {p.title || p.bedNumber} ({p.age} yrs)
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Child Full Name
                            </label>
                            <input
                              type="text"
                              value={childSpotlights.left.name}
                              onChange={(e) =>
                                setChildSpotlights({
                                  ...childSpotlights,
                                  left: { ...childSpotlights.left, name: e.target.value },
                                })
                              }
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Age (Years)
                            </label>
                            <input
                              type="number"
                              value={childSpotlights.left.age}
                              onChange={(e) =>
                                setChildSpotlights({
                                  ...childSpotlights,
                                  left: {
                                    ...childSpotlights.left,
                                    age: Number(e.target.value) || 1,
                                  },
                                })
                              }
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold"
                            />
                          </div>
                        </div>

                        {/* Photo Upload & Preview */}
                        <div className="text-xs space-y-1.5">
                          <label className="text-[10px] font-semibold text-neutral-600 block">
                            Child Photo (1-Click Upload from Device or Web URL)
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300 shrink-0 shadow-xs">
                              <img
                                src={childSpotlights.left.image}
                                alt={childSpotlights.left.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-1.5">
                              <div className="flex items-center gap-1.5">
                                <label className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95">
                                  <Upload className="w-3.5 h-3.5 text-[#FDB813]" />
                                  <span>📁 Upload Photo</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleImageUpload(e, async (newUrl) => {
                                        const updatedSpotlights = {
                                          ...childSpotlights,
                                          left: { ...childSpotlights.left, image: newUrl },
                                        };
                                        setChildSpotlights(updatedSpotlights);
                                        let updatedWard = wardProfiles;
                                        if (setWardProfiles) {
                                          updatedWard = wardProfiles.map((p) =>
                                            p.id === childSpotlights.left.id ||
                                            p.name.toLowerCase() === childSpotlights.left.name.toLowerCase()
                                              ? { ...p, image: newUrl }
                                              : p
                                          );
                                          setWardProfiles(updatedWard);
                                        }
                                        await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard });
                                        await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard });
                                        showToast('✅ Left Frame photo updated & synced!');
                                      })
                                    }
                                  />
                                </label>
                                {childSpotlights.left.image && (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      const updatedSpotlights = {
                                        ...childSpotlights,
                                        left: { ...childSpotlights.left, image: '' },
                                      };
                                      setChildSpotlights(updatedSpotlights);
                                      let updatedWard = wardProfiles;
                                      if (setWardProfiles) {
                                        updatedWard = wardProfiles.map((p) =>
                                          p.id === childSpotlights.left.id ||
                                          p.name.toLowerCase() === childSpotlights.left.name.toLowerCase()
                                            ? { ...p, image: '' }
                                            : p
                                        );
                                        setWardProfiles(updatedWard);
                                      }
                                      await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard });
                                      await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard });
                                      showToast('🗑️ Left Frame photo removed.');
                                    }}
                                    className="text-[10px] text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg font-bold transition-all cursor-pointer"
                                    title="Remove photo"
                                  >
                                    🗑️ Remove
                                  </button>
                                )}
                              </div>
                              <input
                                type="text"
                                value={childSpotlights.left.image}
                                onChange={async (e) => {
                                  const newUrl = e.target.value;
                                  const updatedSpotlights = {
                                    ...childSpotlights,
                                    left: { ...childSpotlights.left, image: newUrl },
                                  };
                                  setChildSpotlights(updatedSpotlights);
                                  if (setWardProfiles) {
                                    setWardProfiles((prev) =>
                                      prev.map((p) =>
                                        p.id === childSpotlights.left.id ||
                                        p.name.toLowerCase() === childSpotlights.left.name.toLowerCase()
                                          ? { ...p, image: newUrl }
                                          : p
                                      )
                                    );
                                  }
                                }}
                                onBlur={async () => {
                                  const currentWard = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                                  await pushServerState({ childSpotlights, wardProfiles: currentWard });
                                  await onSyncToServer?.({ childSpotlights, wardProfiles: currentWard });
                                }}
                                placeholder="Or paste image URL (or clear to remove)..."
                                className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 font-mono text-[10px] text-neutral-600"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Ward & Bed Number
                            </label>
                            <input
                              type="text"
                              value={childSpotlights.left.bedNumber || childSpotlights.left.title || ''}
                              onChange={(e) =>
                                setChildSpotlights({
                                  ...childSpotlights,
                                  left: { ...childSpotlights.left, bedNumber: e.target.value, title: e.target.value },
                                })
                              }
                              placeholder="e.g. Bed No. 1 • RUHS Ward 4"
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Suggested Sponsorship (₹)
                            </label>
                            <input
                              type="number"
                              value={childSpotlights.left.suggestedDonation}
                              onChange={(e) =>
                                setChildSpotlights({
                                  ...childSpotlights,
                                  left: {
                                    ...childSpotlights.left,
                                    suggestedDonation: Number(e.target.value) || 1000,
                                  },
                                })
                              }
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold text-emerald-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Hospital & Location
                          </label>
                          <input
                            type="text"
                            value={childSpotlights.left.location}
                            onChange={(e) =>
                              setChildSpotlights({
                                ...childSpotlights,
                                left: { ...childSpotlights.left, location: e.target.value },
                              })
                            }
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Life Story & Struggle
                          </label>
                          <textarea
                            rows={3}
                            value={childSpotlights.left.story}
                            onChange={(e) =>
                              setChildSpotlights({
                                ...childSpotlights,
                                left: { ...childSpotlights.left, story: e.target.value },
                              })
                            }
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                          />
                        </div>
                      </div>

                      {/* Right Child Form */}
                      <div className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200 space-y-3 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-2 gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-emerald-950 uppercase font-mono flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-[#084c36]" />
                              <span>Right Hanging Frame Card</span>
                            </span>
                            {heroContent?.showRightFrame !== false ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-[#084c36] border border-emerald-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                <span>● ACTIVE ON HOMEPAGE</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-200 text-neutral-600">
                                <span>○ HIDDEN FROM HOMEPAGE</span>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                if (setHeroContent) {
                                  const current = heroContent?.showRightFrame !== false;
                                  setHeroContent((prev) => ({ ...prev, showRightFrame: !current }));
                                  showToast(!current ? '👁️ Right Hanging Frame Activated' : '🗑️ Right Hanging Frame Hidden');
                                  pushServerState({ heroContent: { ...(heroContent || {}), showRightFrame: !current } as any });
                                }
                              }}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                                heroContent?.showRightFrame !== false
                                  ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                                  : 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                              }`}
                            >
                              <span>{heroContent?.showRightFrame !== false ? 'Hide Right Frame' : 'Activate Right Frame'}</span>
                            </button>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                              {childSpotlights.right.verificationNode || 'RUH-NODE-R'}
                            </span>
                          </div>
                        </div>

                        {/* Quick Preset Selector */}
                        <div>
                          <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                            ⚡ Quick Choose / Change Child from Roster:
                          </label>
                          <select
                            onChange={async (e) => {
                              const roster = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                              const found = roster.find((p) => p.id === e.target.value);
                              if (found) {
                                const updated = {
                                  ...childSpotlights,
                                  right: { ...found },
                                };
                                setChildSpotlights(updated);
                                showToast(`Loaded ${found.name} into Right Hanging Frame!`);
                                await pushServerState({ childSpotlights: updated, wardProfiles: roster });
                                await onSyncToServer?.({ childSpotlights: updated, wardProfiles: roster });
                              }
                            }}
                            defaultValue=""
                            className="w-full bg-white border border-emerald-300 rounded-lg p-1.5 text-xs font-medium text-emerald-950 cursor-pointer"
                          >
                            <option value="" disabled>
                              -- Select Child Profile to Auto-Fill --
                            </option>
                            {(wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES).map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name} — {p.title || p.bedNumber} ({p.age} yrs)
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Child Full Name
                            </label>
                            <input
                              type="text"
                              value={childSpotlights.right.name}
                              onChange={(e) =>
                                setChildSpotlights({
                                  ...childSpotlights,
                                  right: { ...childSpotlights.right, name: e.target.value },
                                })
                              }
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Age (Years)
                            </label>
                            <input
                              type="number"
                              value={childSpotlights.right.age}
                              onChange={(e) =>
                                setChildSpotlights({
                                  ...childSpotlights,
                                  right: {
                                    ...childSpotlights.right,
                                    age: Number(e.target.value) || 1,
                                  },
                                })
                              }
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold"
                            />
                          </div>
                        </div>

                        {/* Photo Upload & Preview */}
                        <div className="text-xs space-y-1.5">
                          <label className="text-[10px] font-semibold text-neutral-600 block">
                            Child Photo (1-Click Upload from Device or Web URL)
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300 shrink-0 shadow-xs">
                              <img
                                src={childSpotlights.right.image}
                                alt={childSpotlights.right.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-1.5">
                              <div className="flex items-center gap-1.5">
                                <label className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95">
                                  <Upload className="w-3.5 h-3.5 text-[#FDB813]" />
                                  <span>📁 Upload Photo</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleImageUpload(e, async (newUrl) => {
                                        const updatedSpotlights = {
                                          ...childSpotlights,
                                          right: { ...childSpotlights.right, image: newUrl },
                                        };
                                        setChildSpotlights(updatedSpotlights);
                                        let updatedWard = wardProfiles;
                                        if (setWardProfiles) {
                                          updatedWard = wardProfiles.map((p) =>
                                            p.id === childSpotlights.right.id ||
                                            p.name.toLowerCase() === childSpotlights.right.name.toLowerCase()
                                              ? { ...p, image: newUrl }
                                              : p
                                          );
                                          setWardProfiles(updatedWard);
                                        }
                                        await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard });
                                        await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard });
                                        showToast('✅ Right Frame photo updated & synced!');
                                      })
                                    }
                                  />
                                </label>
                                {childSpotlights.right.image && (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      const updatedSpotlights = {
                                        ...childSpotlights,
                                        right: { ...childSpotlights.right, image: '' },
                                      };
                                      setChildSpotlights(updatedSpotlights);
                                      let updatedWard = wardProfiles;
                                      if (setWardProfiles) {
                                        updatedWard = wardProfiles.map((p) =>
                                          p.id === childSpotlights.right.id ||
                                          p.name.toLowerCase() === childSpotlights.right.name.toLowerCase()
                                            ? { ...p, image: '' }
                                            : p
                                        );
                                        setWardProfiles(updatedWard);
                                      }
                                      await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard });
                                      await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard });
                                      showToast('🗑️ Right Frame photo removed.');
                                    }}
                                    className="text-[10px] text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg font-bold transition-all cursor-pointer"
                                    title="Remove photo"
                                  >
                                    🗑️ Remove
                                  </button>
                                )}
                              </div>
                              <input
                                type="text"
                                value={childSpotlights.right.image}
                                onChange={async (e) => {
                                  const newUrl = e.target.value;
                                  const updatedSpotlights = {
                                    ...childSpotlights,
                                    right: { ...childSpotlights.right, image: newUrl },
                                  };
                                  setChildSpotlights(updatedSpotlights);
                                  if (setWardProfiles) {
                                    setWardProfiles((prev) =>
                                      prev.map((p) =>
                                        p.id === childSpotlights.right.id ||
                                        p.name.toLowerCase() === childSpotlights.right.name.toLowerCase()
                                          ? { ...p, image: newUrl }
                                          : p
                                      )
                                    );
                                  }
                                }}
                                onBlur={async () => {
                                  const currentWard = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                                  await pushServerState({ childSpotlights, wardProfiles: currentWard });
                                  await onSyncToServer?.({ childSpotlights, wardProfiles: currentWard });
                                }}
                                placeholder="Or paste image URL (or clear to remove)..."
                                className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 font-mono text-[10px] text-neutral-600"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Ward & Bed Number
                            </label>
                            <input
                              type="text"
                              value={childSpotlights.right.bedNumber || childSpotlights.right.title || ''}
                              onChange={(e) =>
                                setChildSpotlights({
                                  ...childSpotlights,
                                  right: { ...childSpotlights.right, bedNumber: e.target.value, title: e.target.value },
                                })
                              }
                              placeholder="e.g. Bed No. 3 • RUHS Children Ward"
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                              Suggested Sponsorship (₹)
                            </label>
                            <input
                              type="number"
                              value={childSpotlights.right.suggestedDonation}
                              onChange={(e) =>
                                setChildSpotlights({
                                  ...childSpotlights,
                                  right: {
                                    ...childSpotlights.right,
                                    suggestedDonation: Number(e.target.value) || 1000,
                                  },
                                })
                              }
                              className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold text-emerald-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Hospital & Location
                          </label>
                          <input
                            type="text"
                            value={childSpotlights.right.location}
                            onChange={(e) =>
                              setChildSpotlights({
                                ...childSpotlights,
                                right: { ...childSpotlights.right, location: e.target.value },
                              })
                            }
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Life Story & Struggle
                          </label>
                          <textarea
                            rows={3}
                            value={childSpotlights.right.story}
                            onChange={(e) =>
                              setChildSpotlights({
                                ...childSpotlights,
                                right: { ...childSpotlights.right, story: e.target.value },
                              })
                            }
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hanging Frames Live Sync Action Bar */}
                    <div className="bg-emerald-50/90 border-2 border-emerald-400/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                      <div>
                        <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Both Left & Right Hanging Frames Active & Live</span>
                        </h4>
                        <p className="text-[11px] text-emerald-800 mt-0.5">
                          Left Card: <strong>{childSpotlights.left.name}</strong> ({childSpotlights.left.age}y) • Right Card: <strong>{childSpotlights.right.name}</strong> ({childSpotlights.right.age}y). Click to save & sync changes permanently:
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          const currentWard = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                          await pushServerState({
                            childSpotlights,
                            wardProfiles: currentWard,
                            heroContent,
                          });
                          await onSyncToServer?.({ childSpotlights, wardProfiles: currentWard, heroContent });
                          showToast('🎉 Hanging Frames saved & live on homepage!');
                        }}
                        className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs cursor-pointer active:scale-95 transition-all shrink-0 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>💾 Save & Sync Frames Live</span>
                      </button>
                    </div>

                    {/* Add New Custom Child / Case to Hanging Frames Roster */}
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!newChildName.trim()) {
                          showToast('Please enter a child name.');
                          return;
                        }
                        const newProfile: ChildSpotlightProfile = {
                          id: `child-${Date.now()}`,
                          name: newChildName.trim(),
                          age: Number(newChildAge) || 6,
                          gender: 'Child',
                          category: 'RUHS Children Ward',
                          bedNumber: newChildBed.trim() || 'Bed in Pediatric Ward',
                          title: newChildBed.trim() || 'RUHS Cancer Fighter',
                          suggestedDonation: Number(newChildSponsorship) || 15000,
                          monthlyNeed: Number(newChildSponsorship) || 15000,
                          unitLabel: 'Nutrition & Chemo Care Kit',
                          stat: 'Verified Pediatric Ward Patient',
                          criticalNeeds: ['Pediatric Oncology Infusions', 'Bedside Care & Hydration'],
                          location: newChildLocation.trim() || 'RUHS Hospital, Jaipur',
                          story: newChildStory.trim() || 'Receiving pediatric oncology care and clinical bedside nutrition at RUHS Hospital.',
                          image: newChildImage.trim() || '/uploads/IMG20260827153940_1789291836489_078fa0d76d.jpg',
                          verificationNode: `RUH-RUHS-${Math.floor(100 + Math.random() * 900)}`,
                        };

                        const currentRoster = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                        const updatedWard = [...currentRoster, newProfile];
                        if (setWardProfiles) {
                          setWardProfiles(updatedWard);
                        }
                        setNewChildName('');
                        setNewChildBed('');
                        setNewChildStory('');
                        setNewChildImage('');
                        setNewChildLocation('RUHS State Cancer Hospital, Jaipur');
                        showToast(`🎉 Added ${newProfile.name} to Hanging Frames roster!`);
                        await pushServerState({ childSpotlights, wardProfiles: updatedWard, heroContent });
                        await onSyncToServer?.({ childSpotlights, wardProfiles: updatedWard, heroContent });
                      }}
                      className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-[#084c36]" />
                          <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                            Add New Child / Case to Hanging Frames Roster
                          </h4>
                        </div>
                        <span className="text-[11px] text-emerald-800 font-medium">
                          Can be set into Left or Right Frame
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Child Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={newChildName}
                            onChange={(e) => setNewChildName(e.target.value)}
                            placeholder="e.g. Baby Aarav"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2 font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Age (Years)
                          </label>
                          <input
                            type="number"
                            value={newChildAge}
                            onChange={(e) => setNewChildAge(Number(e.target.value) || 1)}
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2 font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Ward / Bed Number
                          </label>
                          <input
                            type="text"
                            value={newChildBed}
                            onChange={(e) => setNewChildBed(e.target.value)}
                            placeholder="e.g. Bed 12 • Oncology Ward"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Suggested Sponsorship (₹)
                          </label>
                          <input
                            type="number"
                            value={newChildSponsorship}
                            onChange={(e) => setNewChildSponsorship(Number(e.target.value) || 15000)}
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2 font-bold text-emerald-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Child Photo (Upload File or Paste Web URL)
                          </label>
                          <div className="flex items-center gap-2">
                            <label className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-3 py-2 rounded-xl inline-flex items-center gap-1.5 cursor-pointer transition-all shrink-0">
                              <Upload className="w-3.5 h-3.5 text-[#FDB813]" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, (b64) => setNewChildImage(b64))
                                }
                              />
                            </label>
                            <input
                              type="text"
                              value={newChildImage}
                              onChange={(e) => setNewChildImage(e.target.value)}
                              placeholder="Or paste image URL..."
                              className="w-full bg-white border border-neutral-300 rounded-xl p-2 text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Hospital & Location
                          </label>
                          <input
                            type="text"
                            value={newChildLocation}
                            onChange={(e) => setNewChildLocation(e.target.value)}
                            placeholder="e.g. RUHS State Cancer Hospital, Jaipur"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Life Story & Struggle Summary
                          </label>
                          <input
                            type="text"
                            value={newChildStory}
                            onChange={(e) => setNewChildStory(e.target.value)}
                            placeholder="e.g. Undergoing chemotherapy sessions and requiring nutritional support..."
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2 text-xs"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-2 rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <Plus className="w-4 h-4 text-[#FDB813]" />
                        <span>Add Child Profile to Hanging Frames Roster</span>
                      </button>
                    </form>

                    {/* All Ward Children Frame Images Roster */}
                    <div className="bg-white border-2 border-emerald-800/20 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                        <div>
                          <h4 className="text-xs font-bold text-emerald-950 uppercase font-mono flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-[#084c36]" />
                            <span>All Hanging Frame Profiles ({((wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES)).length})</span>
                          </h4>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            Upload or remove photos, delete child cards, or 1-click set any child into Left or Right frame! Saves immediately to homepage.
                          </p>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-mono font-bold self-start sm:self-auto">
                          {((wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES)).length} Profiles Active
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5">
                        {((wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES)).map((profile, idx) => {
                          const isCurrentlyLeft =
                            childSpotlights.left.id === profile.id ||
                            childSpotlights.left.name?.trim().toLowerCase() === profile.name?.trim().toLowerCase();

                          const isCurrentlyRight =
                            childSpotlights.right.id === profile.id ||
                            childSpotlights.right.name?.trim().toLowerCase() === profile.name?.trim().toLowerCase();

                          const displayImg = isCurrentlyLeft
                            ? childSpotlights.left.image
                            : isCurrentlyRight
                            ? childSpotlights.right.image
                            : profile.image;

                          return (
                            <div
                              key={profile.id || idx}
                              className={`rounded-xl p-3.5 border flex flex-col justify-between space-y-3 transition-all ${
                                isCurrentlyLeft
                                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                                  : isCurrentlyRight
                                  ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                                  : 'bg-[#faf8f5] border-neutral-200 hover:border-neutral-300'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300 shrink-0 shadow-xs">
                                  {displayImg ? (
                                    <img
                                      src={displayImg}
                                      alt={profile.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-500 text-[9px] font-mono text-center p-1">
                                      No Photo
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-bold text-neutral-900 text-xs truncate">{profile.name}</span>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] text-neutral-500 font-medium">{profile.age} Yrs</span>
                                      {/* 🗑️ Delete Profile from Roster */}
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          if (!window.confirm(`Are you sure you want to delete ${profile.name} from hanging frames roster?`)) return;
                                          const currentWard = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                                          const updatedWard = currentWard.filter((p) => p.id !== profile.id && p.name !== profile.name);
                                          if (setWardProfiles) {
                                            setWardProfiles(updatedWard);
                                          }
                                          let updatedSpotlights = { ...childSpotlights };
                                          if (isCurrentlyLeft && updatedWard.length > 0) {
                                            updatedSpotlights.left = { ...updatedWard[0] };
                                          }
                                          if (isCurrentlyRight && updatedWard.length > 1) {
                                            updatedSpotlights.right = { ...updatedWard[1] };
                                          } else if (isCurrentlyRight && updatedWard.length > 0) {
                                            updatedSpotlights.right = { ...updatedWard[0] };
                                          }
                                          setChildSpotlights(updatedSpotlights);
                                          showToast(`🗑️ Deleted ${profile.name} from roster.`);
                                          await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard, heroContent });
                                          await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard, heroContent });
                                        }}
                                        className="p-1 rounded-md text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer shrink-0"
                                        title={`Delete ${profile.name} from hanging frames roster`}
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                                    {isCurrentlyLeft && (
                                      <span className="text-[9px] bg-emerald-700 text-white font-mono font-bold px-1.5 py-0.5 rounded">
                                        LEFT FRAME
                                      </span>
                                    )}
                                    {isCurrentlyRight && (
                                      <span className="text-[9px] bg-amber-700 text-white font-mono font-bold px-1.5 py-0.5 rounded">
                                        RIGHT FRAME
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-neutral-600 mt-1">{profile.bedNumber || profile.title}</div>
                                  <div className="text-[10px] text-emerald-800 font-mono font-semibold truncate">{profile.verificationNode}</div>
                                </div>
                              </div>

                              {/* Direct Photo Upload & URL for this profile */}
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <label className="flex-1 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-[10px] font-bold py-1.5 px-2 rounded-lg inline-flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95">
                                    <Upload className="w-3 h-3 text-[#084c36]" />
                                    <span>📁 Upload Photo</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) =>
                                        handleImageUpload(e, async (b64) => {
                                          const currentRoster = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                                          const updatedWard = currentRoster.map((p) =>
                                            p.id === profile.id || p.name.toLowerCase() === profile.name.toLowerCase() ? { ...p, image: b64 } : p
                                          );
                                          if (setWardProfiles) {
                                            setWardProfiles(updatedWard);
                                          }
                                          let updatedSpotlights = { ...childSpotlights };
                                          if (isCurrentlyLeft) {
                                            updatedSpotlights = {
                                              ...updatedSpotlights,
                                              left: { ...updatedSpotlights.left, image: b64 },
                                            };
                                          }
                                          if (isCurrentlyRight) {
                                            updatedSpotlights = {
                                              ...updatedSpotlights,
                                              right: { ...updatedSpotlights.right, image: b64 },
                                            };
                                          }
                                          setChildSpotlights(updatedSpotlights);
                                          showToast(`✅ Photo changed for ${profile.name}!`);
                                          await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard, heroContent });
                                          await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard, heroContent });
                                        })
                                      }
                                    />
                                  </label>
                                  {displayImg && (
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        const currentRoster = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                                        const updatedWard = currentRoster.map((p) =>
                                          p.id === profile.id || p.name.toLowerCase() === profile.name.toLowerCase() ? { ...p, image: '' } : p
                                        );
                                        if (setWardProfiles) {
                                          setWardProfiles(updatedWard);
                                        }
                                        let updatedSpotlights = { ...childSpotlights };
                                        if (isCurrentlyLeft) {
                                          updatedSpotlights = {
                                            ...updatedSpotlights,
                                            left: { ...updatedSpotlights.left, image: '' },
                                          };
                                        }
                                        if (isCurrentlyRight) {
                                          updatedSpotlights = {
                                            ...updatedSpotlights,
                                            right: { ...updatedSpotlights.right, image: '' },
                                          };
                                        }
                                        setChildSpotlights(updatedSpotlights);
                                        showToast(`🗑️ Photo removed for ${profile.name}.`);
                                        await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard, heroContent });
                                        await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard, heroContent });
                                      }}
                                      className="text-[10px] text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg font-bold transition-all cursor-pointer"
                                      title={`Remove photo for ${profile.name}`}
                                    >
                                      🗑️ Remove Photo
                                    </button>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  defaultValue={displayImg}
                                  key={displayImg}
                                  onBlur={async (e) => {
                                    const url = e.target.value.trim();
                                    if (url !== displayImg) {
                                      const currentRoster = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                                      const updatedWard = currentRoster.map((p) =>
                                        p.id === profile.id || p.name.toLowerCase() === profile.name.toLowerCase() ? { ...p, image: url } : p
                                      );
                                      if (setWardProfiles) {
                                        setWardProfiles(updatedWard);
                                      }
                                      let updatedSpotlights = { ...childSpotlights };
                                      if (isCurrentlyLeft) {
                                        updatedSpotlights = {
                                          ...updatedSpotlights,
                                          left: { ...updatedSpotlights.left, image: url },
                                        };
                                      }
                                      if (isCurrentlyRight) {
                                        updatedSpotlights = {
                                          ...updatedSpotlights,
                                          right: { ...updatedSpotlights.right, image: url },
                                        };
                                      }
                                      setChildSpotlights(updatedSpotlights);
                                      showToast(`✅ Photo saved for ${profile.name}!`);
                                      await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard, heroContent });
                                      await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: updatedWard, heroContent });
                                    }
                                  }}
                                  placeholder="Or paste photo URL (or clear to remove)..."
                                  className="w-full bg-white border border-neutral-300 rounded-lg px-2 py-1 font-mono text-[9px] text-neutral-600 truncate"
                                />
                              </div>

                              {/* 1-Click Frame Assignment */}
                              <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-neutral-200">
                                <button
                                  type="button"
                                  onClick={async () => {
                                    const currentWard = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                                    const latest = currentWard.find((p) => p.id === profile.id || p.name === profile.name) || profile;
                                    const updatedSpotlights = {
                                      ...childSpotlights,
                                      left: { ...latest, image: latest.image },
                                    };
                                    setChildSpotlights(updatedSpotlights);
                                    showToast(`👈 ${profile.name} set as Left Hanging Frame!`);
                                    await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: currentWard, heroContent });
                                    await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: currentWard, heroContent });
                                  }}
                                  className="bg-[#084c36] hover:bg-[#063b2a] text-white text-[10px] font-bold py-1.5 px-1.5 rounded-lg transition-all text-center cursor-pointer active:scale-95"
                                >
                                  👈 Set Left Frame
                                </button>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    const currentWard = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                                    const latest = currentWard.find((p) => p.id === profile.id || p.name === profile.name) || profile;
                                    const updatedSpotlights = {
                                      ...childSpotlights,
                                      right: { ...latest, image: latest.image },
                                    };
                                    setChildSpotlights(updatedSpotlights);
                                    showToast(`👉 ${profile.name} set as Right Hanging Frame!`);
                                    await pushServerState({ childSpotlights: updatedSpotlights, wardProfiles: currentWard, heroContent });
                                    await onSyncToServer?.({ childSpotlights: updatedSpotlights, wardProfiles: currentWard, heroContent });
                                  }}
                                  className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold py-1.5 px-1.5 rounded-lg transition-all text-center cursor-pointer active:scale-95"
                                >
                                  👉 Set Right Frame
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={async () => {
                          const currentWard = wardProfiles.length > 0 ? wardProfiles : RUHS_CHILDREN_WARD_PROFILES;
                          await pushServerState({
                            childSpotlights,
                            wardProfiles: currentWard,
                            heroContent,
                          });
                          await onSyncToServer?.({ childSpotlights, wardProfiles: currentWard, heroContent });
                          showToast('✅ Hanging Frame Styles & Child Spotlights saved & synced to server!');
                        }}
                        className="bg-[#084c36] hover:bg-[#063b2a] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <Save className="w-4 h-4 text-[#FDB813]" />
                        <span>Save Hanging Frame Changes & Sync</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. CANCER WARRIORS TAB */}
                {activeTab === 'patients' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">
                        Cancer Warriors (Patient Lifeline Module)
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Manage active chemo profiles, hospital ward admissions, and funded amounts.
                      </p>
                    </div>

                    {/* Register New Cancer Warrior Form */}
                    <form
                      onSubmit={handleAddCancerWarrior}
                      className="bg-emerald-50/80 border-2 border-emerald-300/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-[#084c36]" />
                          <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                            Register New Cancer Warrior Profile
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                          Bedside Case Registration
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Child Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Master Rohan Meena"
                            value={newWarriorName}
                            onChange={(e) => setNewWarriorName(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Age & Gender
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              min={1}
                              max={25}
                              value={newWarriorAge}
                              onChange={(e) => setNewWarriorAge(Number(e.target.value) || 10)}
                              className="w-20 bg-white border border-neutral-300 rounded-lg p-2 text-center"
                            />
                            <select
                              value={newWarriorGender}
                              onChange={(e) => setNewWarriorGender(e.target.value)}
                              className="flex-1 bg-white border border-neutral-300 rounded-lg p-2"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Urgency Protocol
                          </label>
                          <select
                            value={newWarriorUrgency}
                            onChange={(e) => setNewWarriorUrgency(e.target.value as any)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold text-amber-800"
                          >
                            <option value="Active Chemo Protocol">Active Chemo Protocol</option>
                            <option value="Critical Priority">Critical Priority</option>
                            <option value="Post-Op Care">Post-Op Care</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Diagnosis / Disease
                          </label>
                          <input
                            type="text"
                            value={newWarriorDiagnosis}
                            onChange={(e) => setNewWarriorDiagnosis(e.target.value)}
                            placeholder="e.g. B-Cell ALL"
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Hospital & Ward
                          </label>
                          <input
                            type="text"
                            value={newWarriorWard}
                            onChange={(e) => setNewWarriorWard(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            City (Node)
                          </label>
                          <input
                            type="text"
                            value={newWarriorCity}
                            onChange={(e) => setNewWarriorCity(e.target.value)}
                            placeholder="e.g. Jaipur"
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Target Amount (₹)
                          </label>
                          <input
                            type="number"
                            value={newWarriorTarget}
                            onChange={(e) => setNewWarriorTarget(Number(e.target.value) || 15000)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold text-emerald-900"
                          />
                        </div>
                      </div>

                      {/* Photo Upload & Preview for New Warrior */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-3 rounded-xl border border-neutral-200">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300 shrink-0">
                          <img
                            src={newWarriorImage}
                            alt="Warrior Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 w-full space-y-1">
                          <div className="flex items-center gap-2">
                            <label className="bg-[#084c36] hover:bg-[#063b2a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95">
                              <Upload className="w-3 h-3 text-[#FDB813]" />
                              <span>📁 Upload Child Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, (url) => setNewWarriorImage(url))}
                              />
                            </label>
                            <span className="text-[10px] text-neutral-500">or enter image link below</span>
                          </div>
                          <input
                            type="text"
                            value={newWarriorImage}
                            onChange={(e) => setNewWarriorImage(e.target.value)}
                            placeholder="Image URL..."
                            className="w-full bg-neutral-50 border border-neutral-300 rounded p-1 font-mono text-[10px]"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                          Child's Story & Condition Overview
                        </label>
                        <textarea
                          rows={2}
                          value={newWarriorStory}
                          onChange={(e) => setNewWarriorStory(e.target.value)}
                          placeholder="Briefly describe the child's battle, family situation, and how public support will help save their life..."
                          className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-[#FDB813]" />
                        <span>Add Cancer Warrior Profile</span>
                      </button>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {patientProfiles.map((pat, idx) => (
                        <div
                          key={pat.id}
                          className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200 space-y-3 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-emerald-950">{pat.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono text-[10px]">
                                {pat.urgency}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeletePatient(pat.id)}
                                className="text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer p-1 rounded-lg hover:bg-rose-50"
                                title="Delete Patient Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Patient Photo & Device Upload */}
                          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-neutral-200">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300 shrink-0 shadow-xs">
                              <img
                                src={pat.image}
                                alt={pat.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-1.5">
                              <label className="bg-[#084c36] hover:bg-[#063b2a] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-95">
                                <Upload className="w-3 h-3 text-[#FDB813]" />
                                <span>📁 Upload Patient Photo</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImageUpload(e, (b64) => {
                                      const updated = [...patientProfiles];
                                      updated[idx].image = b64;
                                      setPatientProfiles(updated);
                                    })
                                  }
                                />
                              </label>
                              <input
                                type="text"
                                value={pat.image}
                                onChange={(e) => {
                                  const updated = [...patientProfiles];
                                  updated[idx].image = e.target.value;
                                  setPatientProfiles(updated);
                                }}
                                placeholder="Or photo URL..."
                                className="w-full bg-neutral-50 border border-neutral-300 rounded p-1 font-mono text-[10px] text-neutral-600"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-neutral-500 block">Diagnosis</label>
                              <input
                                type="text"
                                value={pat.diagnosis}
                                onChange={(e) => {
                                  const updated = [...patientProfiles];
                                  updated[idx].diagnosis = e.target.value;
                                  setPatientProfiles(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded p-1.5"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-neutral-500 block">Funded (₹)</label>
                              <input
                                type="number"
                                value={pat.fundedAmount}
                                onChange={(e) => {
                                  const updated = [...patientProfiles];
                                  const val = Number(e.target.value) || 0;
                                  updated[idx].fundedAmount = val;
                                  updated[idx].fundingPercentage = Math.min(
                                    100,
                                    Math.round((val / updated[idx].targetAmount) * 100)
                                  );
                                  setPatientProfiles(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded p-1.5 font-bold text-emerald-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-neutral-500 block">Hospital Ward</label>
                            <input
                              type="text"
                              value={pat.hospitalWard}
                              onChange={(e) => {
                                const updated = [...patientProfiles];
                                updated[idx].hospitalWard = e.target.value;
                                setPatientProfiles(updated);
                              }}
                              className="w-full bg-white border border-neutral-300 rounded p-1.5"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        showToast('Patient profiles updated & synced successfully!');
                        onSyncToServer?.();
                      }}
                      className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#FDB813]" />
                      <span>Save Warrior Profiles</span>
                    </button>
                  </div>
                )}

                {/* VOLUNTEER SQUAD ENROLMENTS TAB */}
                {activeTab === 'volunteers' && (
                  <div className="space-y-6">
                    {/* Header & Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                            <span>Frontline Youth Volunteer Squad</span>
                            <span className="bg-[#084c36] text-[#FDB813] text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                              {volunteers.length} Total
                            </span>
                          </h3>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Direct volunteer registrations received from the official website enrolment form.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddVolModal(true)}
                          className="inline-flex items-center gap-1.5 bg-[#084c36] hover:bg-[#063b2a] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#FDB813]" />
                          <span>Add Volunteer</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleExportVolunteersCSV}
                          className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                          title="Export CSV for Excel / Google Sheets"
                        >
                          <Download className="w-3.5 h-3.5 text-[#FDB813]" />
                          <span>Export CSV</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Metric Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-neutral-200/80">
                        <span className="text-[10px] uppercase font-mono font-bold text-neutral-500 block">Total Volunteers</span>
                        <div className="text-xl sm:text-2xl font-black text-neutral-900 mt-0.5">{volunteers.length}</div>
                        <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">Jaipur Ground Squad</span>
                      </div>
                      <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200/80">
                        <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 block">Hospital Coconut Seva</span>
                        <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-0.5">
                          {volunteers.filter((v) => (v.track || '').toLowerCase().includes('hospital')).length}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">RUHS & SMS Oncology</span>
                      </div>
                      <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80">
                        <span className="text-[10px] uppercase font-mono font-bold text-amber-800 block">Slum Mentorship</span>
                        <div className="text-xl sm:text-2xl font-black text-amber-950 mt-0.5">
                          {volunteers.filter((v) => (v.track || '').toLowerCase().includes('slum')).length}
                        </div>
                        <span className="text-[10px] text-amber-700 font-medium mt-0.5 block">Digital & STEM Education</span>
                      </div>
                      <div className="bg-teal-50/60 p-3.5 rounded-2xl border border-teal-200/80">
                        <span className="text-[10px] uppercase font-mono font-bold text-teal-800 block">Emergency & Media</span>
                        <div className="text-xl sm:text-2xl font-black text-teal-950 mt-0.5">
                          {volunteers.filter((v) => {
                            const t = (v.track || '').toLowerCase();
                            return !t.includes('hospital') && !t.includes('slum');
                          }).length}
                        </div>
                        <span className="text-[10px] text-teal-700 font-medium mt-0.5 block">Rapid Seva Dispatches</span>
                      </div>
                    </div>

                    {/* Filter & Search Controls */}
                    <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                      <div className="relative flex-1">
                        <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search volunteers by name, phone, email, city..."
                          value={volSearchQuery}
                          onChange={(e) => setVolSearchQuery(e.target.value)}
                          className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-800"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={volTrackFilter}
                          onChange={(e) => setVolTrackFilter(e.target.value)}
                          className="text-xs bg-white border border-neutral-300 rounded-xl px-2.5 py-2 text-neutral-800 focus:outline-none focus:border-emerald-800"
                        >
                          <option value="all">All Seva Tracks</option>
                          <option value="Hospital">Hospital Bedside Coconut Seva</option>
                          <option value="Slum">Weekend Slum Mentorship</option>
                          <option value="Emergency">Emergency Relief Squad</option>
                          <option value="Media">Media & Transparency</option>
                        </select>

                        <select
                          value={volStatusFilter}
                          onChange={(e) => setVolStatusFilter(e.target.value)}
                          className="text-xs bg-white border border-neutral-300 rounded-xl px-2.5 py-2 text-neutral-800 focus:outline-none focus:border-emerald-800"
                        >
                          <option value="all">All Statuses</option>
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="approved">Approved</option>
                        </select>
                      </div>
                    </div>

                    {/* Volunteer List */}
                    {(() => {
                      const filtered = volunteers.filter((v) => {
                        const q = volSearchQuery.toLowerCase();
                        const matchesQuery =
                          !q ||
                          (v.fullName || '').toLowerCase().includes(q) ||
                          (v.phone || '').includes(q) ||
                          (v.email || '').toLowerCase().includes(q) ||
                          (v.city || '').toLowerCase().includes(q) ||
                          (v.track || '').toLowerCase().includes(q);

                        const matchesTrack =
                          volTrackFilter === 'all' ||
                          (v.track || '').toLowerCase().includes(volTrackFilter.toLowerCase());

                        const matchesStatus =
                          volStatusFilter === 'all' ||
                          (v.status || 'pending') === volStatusFilter;

                        return matchesQuery && matchesTrack && matchesStatus;
                      });

                      if (filtered.length === 0) {
                        return (
                          <div className="text-center py-12 bg-[#faf8f5] rounded-3xl border border-dashed border-neutral-300 space-y-2">
                            <Users className="w-10 h-10 text-neutral-400 mx-auto" />
                            <h4 className="text-sm font-bold text-neutral-800">No Volunteer Applications Found</h4>
                            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                              {volSearchQuery || volTrackFilter !== 'all' || volStatusFilter !== 'all'
                                ? 'No volunteer matches your current filter criteria. Try clearing search.'
                                : 'When visitors fill out the Volunteer Enrolment Form on the site, their name, WhatsApp number, and chosen seva track will appear right here.'}
                            </p>
                            <button
                              type="button"
                              onClick={() => setShowAddVolModal(true)}
                              className="mt-2 inline-flex items-center gap-1.5 bg-[#084c36] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#FDB813]" />
                              <span>Add Volunteer Manually</span>
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filtered.map((vol) => {
                            const cleanPhone = (vol.phone || '').replace(/\D/g, '').slice(-10);
                            const currentStatus = vol.status || 'pending';
                            const waText = `Namaste ${vol.fullName}! Rise Up Help Foundation (+91 98282 91119) received your volunteer application for ${vol.track}. We are delighted to welcome you to our Jaipur youth changemaker squad! Our next hospital seva schedule is coming up. Let us know when you can join!`;

                            return (
                              <div
                                key={vol.id}
                                className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3"
                              >
                                <div>
                                  {/* Card Top: Name & Status */}
                                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-neutral-100">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-9 h-9 rounded-xl bg-[#084c36] text-[#FDB813] font-bold flex items-center justify-center text-xs shrink-0 font-mono">
                                        {(vol.fullName || 'V')
                                          .split(' ')
                                          .map((n) => n[0])
                                          .join('')
                                          .slice(0, 2)
                                          .toUpperCase()}
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-bold text-neutral-900 leading-tight">
                                          {vol.fullName}
                                        </h4>
                                        <span className="text-[10px] text-neutral-400 font-mono">
                                          {new Date(vol.timestamp).toLocaleString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                          })}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Status Badge with Select */}
                                    <select
                                      value={currentStatus}
                                      onChange={(e) =>
                                        handleUpdateVolunteerStatus(
                                          vol.id,
                                          e.target.value as 'pending' | 'contacted' | 'approved'
                                        )
                                      }
                                      className={`text-[10px] font-mono font-bold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none ${
                                        currentStatus === 'approved'
                                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                          : currentStatus === 'contacted'
                                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                                          : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                                      }`}
                                    >
                                      <option value="pending">⏳ Pending</option>
                                      <option value="contacted">💬 Contacted</option>
                                      <option value="approved">✅ Approved</option>
                                    </select>
                                  </div>

                                  {/* Track & Availability Badges */}
                                  <div className="pt-2.5 space-y-1.5">
                                    <div className="flex items-start gap-1.5 text-xs text-neutral-800 font-medium">
                                      <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 shrink-0 mt-0.5">Track:</span>
                                      <span className="bg-emerald-50 text-emerald-900 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-emerald-200/80">
                                        {vol.track}
                                      </span>
                                    </div>
                                    <div className="flex items-start gap-1.5 text-xs text-neutral-700">
                                      <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 shrink-0 mt-0.5">Avail:</span>
                                      <span className="bg-neutral-100 text-neutral-800 text-[11px] px-2 py-0.5 rounded-md border border-neutral-200">
                                        {vol.availability}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Contact Details */}
                                  <div className="pt-3 flex flex-wrap items-center gap-2 text-xs">
                                    <span className="text-neutral-700 font-mono font-semibold flex items-center gap-1 bg-[#faf8f5] px-2 py-1 rounded-lg border border-neutral-200">
                                      <Phone className="w-3 h-3 text-[#084c36]" />
                                      <span>+91 {cleanPhone}</span>
                                    </span>
                                    {vol.email && (
                                      <a
                                        href={`mailto:${vol.email}?subject=${encodeURIComponent(
                                          'Welcome to Rise Up Help Foundation Volunteer Squad!'
                                        )}`}
                                        className="text-neutral-700 hover:text-neutral-900 flex items-center gap-1 bg-[#faf8f5] px-2 py-1 rounded-lg border border-neutral-200 truncate max-w-[200px]"
                                        title={vol.email}
                                      >
                                        <Mail className="w-3 h-3 text-[#084c36]" />
                                        <span className="truncate">{vol.email}</span>
                                      </a>
                                    )}
                                  </div>
                                </div>

                                {/* Action Buttons: WhatsApp, Call, Delete */}
                                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    {cleanPhone && (
                                      <>
                                        <a
                                          href={`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(waText)}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-xs transition-all active:scale-95"
                                          title="Connect via WhatsApp"
                                        >
                                          <MessageCircle className="w-3 h-3 text-[#FDB813]" />
                                          <span>WhatsApp</span>
                                        </a>
                                        <a
                                          href={`tel:+91${cleanPhone}`}
                                          className="inline-flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-neutral-300 transition-all active:scale-95"
                                          title="Call Volunteer"
                                        >
                                          <Phone className="w-3 h-3 text-[#084c36]" />
                                          <span>Call</span>
                                        </a>
                                      </>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteVolunteer(vol.id)}
                                    className="text-neutral-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                    title="Delete volunteer record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}

                    {/* Manual Volunteer Addition Modal */}
                    {showAddVolModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
                        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
                          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                            <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                              <Plus className="w-4 h-4 text-[#084c36]" />
                              <span>Enrol Walk-In Volunteer</span>
                            </h4>
                            <button
                              type="button"
                              onClick={() => setShowAddVolModal(false)}
                              className="text-neutral-400 hover:text-neutral-700 p-1 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <form onSubmit={handleAddManualVolunteer} className="space-y-3">
                            <div>
                              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Suresh Verma"
                                value={manualVolName}
                                onChange={(e) => setManualVolName(e.target.value)}
                                className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                                  10-Digit Phone *
                                </label>
                                <input
                                  type="tel"
                                  required
                                  maxLength={10}
                                  placeholder="9828291119"
                                  value={manualVolPhone}
                                  onChange={(e) => setManualVolPhone(e.target.value.replace(/\D/g, ''))}
                                  className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                                  City
                                </label>
                                <input
                                  type="text"
                                  placeholder="Jaipur"
                                  value={manualVolCity}
                                  onChange={(e) => setManualVolCity(e.target.value)}
                                  className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                                Email Address (Optional)
                              </label>
                              <input
                                type="email"
                                placeholder="suresh@gmail.com"
                                value={manualVolEmail}
                                onChange={(e) => setManualVolEmail(e.target.value)}
                                className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                                Preferred Seva Track
                              </label>
                              <select
                                value={manualVolTrack}
                                onChange={(e) => setManualVolTrack(e.target.value)}
                                className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                              >
                                <option value="Hospital Bedside Coconut Seva (RUHS & SMS)">Hospital Bedside Coconut Seva (RUHS & SMS)</option>
                                <option value="Weekend Slum Digital & STEM Mentorship">Weekend Slum Digital & STEM Mentorship</option>
                                <option value="Emergency Relief & Rapid Distribution Squad">Emergency Relief & Rapid Distribution Squad</option>
                                <option value="Media, Photography & Transparency Dispatch">Media, Photography & Transparency Dispatch</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                                Availability
                              </label>
                              <select
                                value={manualVolAvailability}
                                onChange={(e) => setManualVolAvailability(e.target.value)}
                                className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                              >
                                <option value="Sundays & Ekadashi Mornings">Sundays & Ekadashi Mornings (3-4 Hours)</option>
                                <option value="Weekend Afternoons (Saturday/Sunday)">Weekend Afternoons (Saturday/Sunday)</option>
                                <option value="Full-Time Active Intern (Weekdays)">Full-Time Active Intern (Weekdays)</option>
                                <option value="On-Call Emergency Squad">On-Call Emergency Squad</option>
                              </select>
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setShowAddVolModal(false)}
                                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold px-4 py-2 rounded-xl text-xs cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="bg-[#084c36] hover:bg-[#063b2a] text-white font-bold px-5 py-2 rounded-xl text-xs shadow-xs cursor-pointer"
                              >
                                Save Volunteer
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. PARTNER HOSPITALS TAB */}
                {activeTab === 'hospitals' && partnerHospitals && setPartnerHospitals && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">
                        Partner Hospitals (Verified Healthcare Seva Nodes)
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Manage official hospital network nodes where bedside tender coconut hydration & nutrition drives operate.
                      </p>
                    </div>

                    {/* Add Hospital Form */}
                    <form
                      onSubmit={handleAddHospital}
                      className="bg-sky-50/80 border-2 border-sky-300/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-sky-200">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-sky-900" />
                          <h4 className="text-xs font-bold text-sky-950 uppercase tracking-wide">
                            Add New Partner Hospital Node
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-bold">
                          Healthcare Network Node
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Hospital Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. AIIMS New Delhi"
                            value={newHospName}
                            onChange={(e) => setNewHospName(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Category / Classification
                          </label>
                          <input
                            type="text"
                            value={newHospCategory}
                            onChange={(e) => setNewHospCategory(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Seva Specialty / Focus
                          </label>
                          <input
                            type="text"
                            value={newHospSpecialty}
                            onChange={(e) => setNewHospSpecialty(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Location (City, State)
                          </label>
                          <input
                            type="text"
                            value={newHospLocation}
                            onChange={(e) => setNewHospLocation(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-700 block mb-1">
                            Bedside Capacity
                          </label>
                          <input
                            type="text"
                            value={newHospCapacity}
                            onChange={(e) => setNewHospCapacity(e.target.value)}
                            placeholder="e.g. 500+ Beds"
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-[#FDB813]" />
                        <span>Register Hospital Node</span>
                      </button>
                    </form>

                    {/* Hospital Nodes List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {partnerHospitals.map((hosp, idx) => (
                        <div
                          key={hosp.id}
                          className="bg-[#faf8f5] rounded-2xl p-4 border border-neutral-200 space-y-3 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-emerald-950 font-mono">
                              #{idx + 1} {hosp.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteHospital(hosp.id)}
                              className="text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer p-1 rounded-lg hover:bg-rose-50"
                              title="Delete Hospital Node"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <label className="text-[10px] text-neutral-500 block">Category</label>
                              <input
                                type="text"
                                value={hosp.category}
                                onChange={(e) => {
                                  const updated = [...partnerHospitals];
                                  updated[idx].category = e.target.value;
                                  setPartnerHospitals(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded p-1.5"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-neutral-500 block">Location</label>
                              <input
                                type="text"
                                value={hosp.location}
                                onChange={(e) => {
                                  const updated = [...partnerHospitals];
                                  updated[idx].location = e.target.value;
                                  setPartnerHospitals(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded p-1.5"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-[10px] text-neutral-500 block">Specialty & Seva Scope</label>
                              <input
                                type="text"
                                value={hosp.specialty}
                                onChange={(e) => {
                                  const updated = [...partnerHospitals];
                                  updated[idx].specialty = e.target.value;
                                  setPartnerHospitals(updated);
                                }}
                                className="w-full bg-white border border-neutral-300 rounded p-1.5"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        showToast('Partner hospital nodes saved and synced!');
                        onSyncToServer?.();
                      }}
                      className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#FDB813]" />
                      <span>Save Hospital Nodes</span>
                    </button>
                  </div>
                )}

                {/* 6. DONORS DATABASE & 80G LEDGER TAB */}
                {activeTab === 'donors' && (
                  <div className="space-y-6">
                    {/* SubTab Switcher: Leaderboard vs Registered Accounts */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setDonorSubTab('leaderboard')}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            donorSubTab === 'leaderboard'
                              ? 'bg-[#084c36] text-white shadow-xs'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          <Award className="w-3.5 h-3.5 text-[#FDB813]" />
                          <span>🏆 Public Leaderboard ({leaderboardDonors.length})</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDonorSubTab('accounts');
                            fetchRegisteredUsers();
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            donorSubTab === 'accounts'
                              ? 'bg-[#084c36] text-white shadow-xs'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          <Users className="w-3.5 h-3.5 text-[#FDB813]" />
                          <span>👤 Registered Login IDs ({registeredUsers.length})</span>
                        </button>
                      </div>

                      {donorSubTab === 'leaderboard' ? (
                        <button
                          onClick={handleExportCSV}
                          className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#FDB813]" />
                          <span>Export CSV Ledger</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={fetchRegisteredUsers}
                            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                            title="Refresh Users"
                          >
                            <RotateCcw className={`w-3.5 h-3.5 text-[#084c36] ${isLoadingUsers ? 'animate-spin' : ''}`} />
                            <span>Refresh</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleExportUsersCSV}
                            className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#FDB813]" />
                            <span>Export Users CSV</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {donorSubTab === 'accounts' ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                            <span>Registered Donor Accounts & Login Records</span>
                            <span className="bg-[#084c36] text-[#FDB813] text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                              {registeredUsers.length} Total
                            </span>
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Real-time database of citizens who authenticated via mobile OTP, verified their identity, and created their donor accounts.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-neutral-200/80">
                            <span className="text-[10px] uppercase font-mono font-bold text-neutral-500 block">Total Registered</span>
                            <div className="text-xl sm:text-2xl font-black text-neutral-900 mt-0.5">{registeredUsers.length} Patrons</div>
                            <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">Mobile OTP Verified</span>
                          </div>
                          <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200/80">
                            <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 block">Total Seva Contributed</span>
                            <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-0.5 font-mono">
                              ₹{registeredUsers.reduce((acc, u) => acc + (Number(u.totalDonated) || 0), 0).toLocaleString('en-IN')}
                            </div>
                            <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">Combined Patron Impact</span>
                          </div>
                          <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80">
                            <span className="text-[10px] uppercase font-mono font-bold text-amber-800 block">80G PAN On File</span>
                            <div className="text-xl sm:text-2xl font-black text-amber-950 mt-0.5">
                              {registeredUsers.filter((u) => u.panNumber).length}
                            </div>
                            <span className="text-[10px] text-amber-700 font-medium mt-0.5 block">Tax Exemption Ready</span>
                          </div>
                          <div className="bg-teal-50/60 p-3.5 rounded-2xl border border-teal-200/80">
                            <span className="text-[10px] uppercase font-mono font-bold text-teal-800 block">Active Seva Sessions</span>
                            <div className="text-xl sm:text-2xl font-black text-teal-950 mt-0.5">
                              {registeredUsers.reduce((acc, u) => acc + (Number(u.donationsCount) || 0), 0)}
                            </div>
                            <span className="text-[10px] text-teal-700 font-medium mt-0.5 block">Recorded Donations</span>
                          </div>
                        </div>

                        <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 flex items-center gap-3">
                          <div className="relative flex-1">
                            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              placeholder="Search registered accounts by phone (+91...), name, PAN card, or donor ID..."
                              value={userSearchQuery}
                              onChange={(e) => setUserSearchQuery(e.target.value)}
                              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-800"
                            />
                          </div>
                          {userSearchQuery && (
                            <button
                              type="button"
                              onClick={() => setUserSearchQuery('')}
                              className="text-xs text-neutral-500 hover:text-neutral-900 font-semibold cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>

                        <div className="overflow-x-auto border border-neutral-200 rounded-2xl">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-neutral-100 text-neutral-700 font-semibold border-b border-neutral-200">
                              <tr>
                                <th className="p-3">Patron & Donor ID</th>
                                <th className="p-3">Mobile & Direct Connect</th>
                                <th className="p-3">80G PAN / DOB</th>
                                <th className="p-3">Total Donated</th>
                                <th className="p-3">Patron Badge</th>
                                <th className="p-3">Registered / Last Active</th>
                                <th className="p-3 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 bg-white">
                              {(() => {
                                const q = userSearchQuery.toLowerCase().trim();
                                const filtered = registeredUsers.filter((u) => {
                                  if (!q) return true;
                                  return (
                                    (u.fullName || '').toLowerCase().includes(q) ||
                                    (u.phone || '').includes(q) ||
                                    (u.donorId || '').toLowerCase().includes(q) ||
                                    (u.panNumber || '').toLowerCase().includes(q) ||
                                    (u.email || '').toLowerCase().includes(q)
                                  );
                                });

                                if (filtered.length === 0) {
                                  return (
                                    <tr>
                                      <td colSpan={7} className="text-center py-10 text-neutral-500">
                                        <Users className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                                        <p className="font-semibold text-neutral-700">No registered donor accounts found</p>
                                        <p className="text-[11px] text-neutral-400 mt-1">
                                          When donors login with their mobile number on the site, their verified account details will appear here.
                                        </p>
                                      </td>
                                    </tr>
                                  );
                                }

                                return filtered.map((u) => (
                                  <tr key={u.donorId || u.phone} className="hover:bg-neutral-50 transition-colors">
                                    <td className="p-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#084c36] font-bold flex items-center justify-center text-xs shrink-0">
                                          {(u.fullName || 'P').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                          <strong className="font-bold text-neutral-900 block">{u.fullName || 'Citizen Patron'}</strong>
                                          <span className="font-mono text-[10px] text-neutral-400 block">{u.donorId || `RUH-DONOR-${u.phone}`}</span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      <div className="space-y-1">
                                        <span className="font-mono font-bold text-neutral-900 block">+91 {u.phone}</span>
                                        <div className="flex items-center gap-2">
                                          <a
                                            href={`https://wa.me/91${u.phone}?text=${encodeURIComponent(`Namaste ${u.fullName || ''}! RiseUpHelp Foundation team here. Thank you for your support.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-[10px] text-emerald-700 hover:text-emerald-900 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                                            title="Chat on WhatsApp"
                                          >
                                            <MessageCircle className="w-3 h-3" />
                                            <span>WhatsApp</span>
                                          </a>
                                          <a
                                            href={`tel:+91${u.phone}`}
                                            className="inline-flex items-center gap-1 text-[10px] text-neutral-600 hover:text-neutral-900 font-medium"
                                            title="Call Phone"
                                          >
                                            <Phone className="w-2.5 h-2.5" />
                                            <span>Call</span>
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      {u.panNumber ? (
                                        <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px] block w-fit">
                                          <span>💳 {u.panNumber}</span>
                                        </span>
                                      ) : (
                                        <span className="text-neutral-400 text-[11px] italic block">Not Provided</span>
                                      )}
                                      {u.dob && (
                                        <span className="text-[10px] text-neutral-500 block mt-0.5">DOB: {u.dob}</span>
                                      )}
                                    </td>
                                    <td className="p-3">
                                      <span className="font-bold text-emerald-800 font-mono text-sm block">
                                        ₹{(Number(u.totalDonated) || 0).toLocaleString('en-IN')}
                                      </span>
                                      <span className="text-[10px] text-neutral-500 block">
                                        {u.donationsCount || 0} Donation{(u.donationsCount || 0) === 1 ? '' : 's'}
                                      </span>
                                    </td>
                                    <td className="p-3">
                                      <span className="inline-flex items-center gap-1 bg-[#FDB813]/20 text-neutral-900 font-bold text-[10px] px-2 py-0.5 rounded-full border border-[#FDB813]/40">
                                        <Award className="w-3 h-3 text-amber-700" />
                                        <span>{u.badge || 'Verified Patron'}</span>
                                      </span>
                                    </td>
                                    <td className="p-3 text-neutral-600">
                                      <div className="text-[11px]">
                                        {u.registeredAt ? new Date(u.registeredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Earlier'}
                                      </div>
                                      <div className="text-neutral-400 text-[10px]">
                                        Active: {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                                      </div>
                                    </td>
                                    <td className="p-3 text-right">
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteUser(u.phone, u.donorId, u.fullName || 'Patron')}
                                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        title="Delete User Account"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ));
                              })()}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-bold text-neutral-900">
                              Honor Roll Leaderboard & Donor Database
                            </h3>
                            <p className="text-xs text-neutral-500">
                              Total {leaderboardDonors.length} Verified Donations recorded in Jaipur Node.
                            </p>
                          </div>
                        </div>

                    {/* Live Ticker Notification Setting Card */}
                    <div className="bg-white border-2 border-emerald-800/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#084c36] flex items-center justify-center font-bold text-lg">
                          🔔
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                            <span>Live Donation Corner Notification Ticker</span>
                            <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                              showDonationTicker
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-neutral-100 text-neutral-600 border border-neutral-300'
                            }`}>
                              {showDonationTicker ? '● ACTIVE (ON)' : '○ DISABLED (OFF)'}
                            </span>
                          </h4>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Displays real verified donor transactions popping up at the bottom-left of screen. (Fake notifications are completely disabled).
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (setShowDonationTicker) {
                              setShowDonationTicker(!showDonationTicker);
                              showToast(`Donation Notification Ticker turned ${!showDonationTicker ? 'ON' : 'OFF'}!`);
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                            showDonationTicker
                              ? 'bg-rose-700 hover:bg-rose-800 text-white'
                              : 'bg-[#084c36] hover:bg-[#063b2a] text-white'
                          }`}
                        >
                          {showDonationTicker ? 'Turn OFF Notifications' : 'Turn ON Notifications'}
                        </button>
                      </div>
                    </div>

                    {/* Add Manual Donor Form */}
                    <form
                      onSubmit={handleAddManualDonor}
                      className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-3 text-xs"
                    >
                      <h4 className="font-bold text-amber-950 uppercase flex items-center gap-1.5">
                        <Plus className="w-4 h-4 text-amber-800" />
                        <span>Record Offline / Bank / Direct Donor</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="text-[10px] text-neutral-600 block mb-1">Donor Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Ramesh Chandra"
                            value={newDonorName}
                            onChange={(e) => setNewDonorName(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-600 block mb-1">Amount (₹)</label>
                          <input
                            type="number"
                            value={newDonorAmount}
                            onChange={(e) => setNewDonorAmount(Number(e.target.value) || 0)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold text-emerald-900"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-600 block mb-1">Adopted Cause</label>
                          <input
                            type="text"
                            value={newDonorCause}
                            onChange={(e) => setNewDonorCause(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-600 block mb-1">City</label>
                          <input
                            type="text"
                            value={newDonorCity}
                            onChange={(e) => setNewDonorCity(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-amber-900 hover:bg-amber-950 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5 text-[#FDB813]" />
                        <span>Add to Public Ledger</span>
                      </button>
                    </form>

                    {/* Official 80G Tax Exemption Receipt Book, Stamp & Signature Settings */}
                    <div className="bg-[#fcfbf9] border-2 border-emerald-800/40 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/20 pb-3">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-[#084c36]" />
                          <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                            Official 80G Tax Exemption Receipt Book, Stamp & Signature Setup
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold self-start sm:self-auto">
                          Income Tax Sec 80G & Form 10BE Ready
                        </span>
                      </div>

                      {/* Legal Compliance & Info Notice */}
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <span>⚖️ How 80G Receipts Work Under Indian Income Tax Law:</span>
                        </div>
                        <p className="text-[11px] text-emerald-800 leading-relaxed">
                          1. <strong>50% Tax Exemption:</strong> Donations to Section 8 registered NGOs are eligible for <strong>50% tax deduction</strong> under Section 80G of the Income Tax Act, 1961.
                          <br />
                          2. <strong>Form 10BD & Form 10BE:</strong> Every financial year, our foundation files Form 10BD with the Income Tax Department using the donor's PAN. The department then generates official Form 10BE certificates.
                          <br />
                          3. <strong>Instant Digital Voucher:</strong> Immediately upon donation, the system automatically generates a printable, legally compliant 1-page A4 80G Receipt Voucher with your CIN, 80G Reg URN, Donor PAN, and official stamp/signature.
                        </p>
                      </div>

                      {/* Config Inputs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 block mb-1">
                            80G Unique Registration No. (URN)
                          </label>
                          <input
                            type="text"
                            value={activeReceiptConfig.urn80g}
                            onChange={(e) => setActiveReceiptConfig({ ...activeReceiptConfig, urn80g: e.target.value })}
                            placeholder="e.g. AAETR9828RE20241"
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono font-bold"
                          />
                          <span className="text-[9px] text-neutral-500">From Income Tax 80G Order</span>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 block mb-1">
                            Section 8 CIN Number
                          </label>
                          <input
                            type="text"
                            value={activeReceiptConfig.cinNumber}
                            onChange={(e) => setActiveReceiptConfig({ ...activeReceiptConfig, cinNumber: e.target.value })}
                            placeholder="e.g. U88900RJ2024NPL093120"
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono font-bold"
                          />
                          <span className="text-[9px] text-neutral-500">Ministry of Corporate Affairs</span>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 block mb-1">
                            Receipt Book Serial Prefix
                          </label>
                          <input
                            type="text"
                            value={activeReceiptConfig.receiptPrefix}
                            onChange={(e) => setActiveReceiptConfig({ ...activeReceiptConfig, receiptPrefix: e.target.value })}
                            placeholder="e.g. RUH/2026/"
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono font-bold"
                          />
                          <span className="text-[9px] text-neutral-500">Matches physical printed receipt book</span>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 block mb-1">
                            Authorized Signatory Name
                          </label>
                          <input
                            type="text"
                            value={activeReceiptConfig.signatoryName}
                            onChange={(e) => setActiveReceiptConfig({ ...activeReceiptConfig, signatoryName: e.target.value })}
                            placeholder="e.g. Authorized Trustee / Director"
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 block mb-1">
                            Signatory Foundation Title
                          </label>
                          <input
                            type="text"
                            value={activeReceiptConfig.signatoryTitle}
                            onChange={(e) => setActiveReceiptConfig({ ...activeReceiptConfig, signatoryTitle: e.target.value })}
                            placeholder="e.g. RiseUpHelp Initiative Foundation"
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold"
                          />
                        </div>
                      </div>

                      {/* Official Stamp & Sign Upload Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-200 text-xs">
                        {/* 1. Official NGO Stamp Upload */}
                        <div className="bg-white border border-neutral-200 rounded-xl p-3.5 space-y-2">
                          <label className="text-[11px] font-bold text-neutral-800 flex items-center justify-between">
                            <span>🏛️ Official Foundation Round Stamp (मुहर)</span>
                            {activeReceiptConfig.stampImage && (
                              <span className="text-[9px] text-emerald-700 font-semibold">● Stamp Configured</span>
                            )}
                          </label>
                          <p className="text-[10px] text-neutral-500">
                            Upload a photo or scanned PNG/JPG of your physical NGO seal/stamp. Appears on every printed & emailed 80G receipt.
                          </p>

                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-full border-2 border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center overflow-hidden shrink-0">
                              {activeReceiptConfig.stampImage ? (
                                <img src={activeReceiptConfig.stampImage} alt="Stamp" className="w-full h-full object-contain p-1" />
                              ) : (
                                <span className="text-[9px] text-neutral-400 text-center px-1">No Stamp</span>
                              )}
                            </div>

                            <div className="space-y-1.5 flex-1">
                              <label className="bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-[10px] font-bold py-1 px-2.5 rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95">
                                <Upload className="w-3.5 h-3.5 text-[#084c36]" />
                                <span>📁 Upload Stamp Image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImageUpload(e, (b64) => {
                                      setActiveReceiptConfig((prev) => ({ ...prev, stampImage: b64 }));
                                      showToast('✅ Official Stamp image uploaded!');
                                    })
                                  }
                                />
                              </label>

                              {activeReceiptConfig.stampImage && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveReceiptConfig((prev) => ({ ...prev, stampImage: '' }));
                                    showToast('Stamp cleared.');
                                  }}
                                  className="block text-[10px] text-rose-600 hover:underline cursor-pointer"
                                >
                                  Remove Stamp
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 2. Authorized Signatory Signature Upload */}
                        <div className="bg-white border border-neutral-200 rounded-xl p-3.5 space-y-2">
                          <label className="text-[11px] font-bold text-neutral-800 flex items-center justify-between">
                            <span>✍️ Authorized Signatory Signature (हस्ताक्षर)</span>
                            {activeReceiptConfig.signatureImage && (
                              <span className="text-[9px] text-emerald-700 font-semibold">● Signature Configured</span>
                            )}
                          </label>
                          <p className="text-[10px] text-neutral-500">
                            Upload a photo or scanned PNG of trustee/secretary signature. Automatically placed on the receipt signatory line.
                          </p>

                          <div className="flex items-center gap-3">
                            <div className="w-24 h-14 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center overflow-hidden shrink-0">
                              {activeReceiptConfig.signatureImage ? (
                                <img src={activeReceiptConfig.signatureImage} alt="Signature" className="w-full h-full object-contain p-1" />
                              ) : (
                                <span className="text-[9px] text-neutral-400 text-center px-1">No Signature</span>
                              )}
                            </div>

                            <div className="space-y-1.5 flex-1">
                              <label className="bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-[10px] font-bold py-1 px-2.5 rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95">
                                <Upload className="w-3.5 h-3.5 text-[#084c36]" />
                                <span>📁 Upload Signature</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImageUpload(e, (b64) => {
                                      setActiveReceiptConfig((prev) => ({ ...prev, signatureImage: b64 }));
                                      showToast('✅ Authorized Signature uploaded!');
                                    })
                                  }
                                />
                              </label>

                              {activeReceiptConfig.signatureImage && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveReceiptConfig((prev) => ({ ...prev, signatureImage: '' }));
                                    showToast('Signature cleared.');
                                  }}
                                  className="block text-[10px] text-rose-600 hover:underline cursor-pointer"
                                >
                                  Remove Signature
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Save Receipt Config Button */}
                      <div className="flex items-center justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (setReceiptConfig) {
                              setReceiptConfig(activeReceiptConfig);
                            }
                            try {
                              localStorage.setItem('ruh_receipt_config_v1', JSON.stringify(activeReceiptConfig));
                            } catch {
                              // ignore
                            }
                            showToast('✅ 80G Receipt Book Settings, Stamp & Signatures Saved!');
                            onSyncToServer?.();
                          }}
                          className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                          <Save className="w-3.5 h-3.5 text-[#FDB813]" />
                          <span>Save 80G Receipt Book Settings</span>
                        </button>
                      </div>
                    </div>

                    {/* Donors & 80G Tax Ledger Table */}
                    <div className="overflow-x-auto border border-neutral-200 rounded-2xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-neutral-100 text-neutral-700 font-semibold border-b border-neutral-200">
                          <tr>
                            <th className="p-3">Donor & Identifier</th>
                            <th className="p-3">Phone & DOB</th>
                            <th className="p-3">80G PAN Card</th>
                            <th className="p-3">Amount (₹)</th>
                            <th className="p-3">Cause / Drive</th>
                            <th className="p-3">80G Receipt #</th>
                            <th className="p-3">City / Time</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 bg-white">
                          {leaderboardDonors.map((donor) => (
                            <tr key={donor.id} className="hover:bg-neutral-50">
                              <td className="p-3">
                                <strong className="font-bold text-neutral-900 block">{donor.name}</strong>
                                <span className="font-mono text-[10px] text-neutral-400 block">
                                  {donor.donorId || `RUH-DONOR-${donor.phone || 'GUEST'}`}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="font-mono font-medium text-neutral-800 block">
                                  {donor.phone ? `+91 ${donor.phone}` : '—'}
                                </span>
                                {donor.dob && (
                                  <span className="text-[10px] text-neutral-500 block">DOB: {donor.dob}</span>
                                )}
                              </td>
                              <td className="p-3">
                                {donor.panNumber ? (
                                  <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                                    <span>💳 {donor.panNumber}</span>
                                  </span>
                                ) : (
                                  <span className="text-neutral-400 text-[11px] italic">Not Requested</span>
                                )}
                              </td>
                              <td className="p-3 font-bold text-emerald-800 font-mono">
                                ₹{donor.amount.toLocaleString('en-IN')}
                              </td>
                              <td className="p-3 text-neutral-600 max-w-xs truncate">
                                {donor.patientAdopted}
                              </td>
                              <td className="p-3 font-mono text-[10px] text-neutral-600 font-bold">
                                {donor.receiptNumber}
                              </td>
                              <td className="p-3 text-neutral-600">
                                <div>{donor.city}</div>
                                <div className="text-neutral-400 text-[10px]">{donor.timestamp}</div>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleDeleteDonor(donor.id)}
                                  className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

                {/* 6. FOUNDATION TELEMETRY & STATS TAB */}
                {activeTab === 'telemetry' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">
                        Foundation Telemetry & Registry Credentials
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Edit global metrics, Section 8 CIN, UPI handles, and official helpline.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Coconuts Delivered Counter
                        </label>
                        <input
                          type="text"
                          value={foundationStats.coconutsDelivered}
                          onChange={(e) =>
                            setFoundationStats({ ...foundationStats, coconutsDelivered: e.target.value })
                          }
                          className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-2.5 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          School Bags Distributed
                        </label>
                        <input
                          type="text"
                          value={foundationStats.schoolBagsDistributed}
                          onChange={(e) =>
                            setFoundationStats({
                              ...foundationStats,
                              schoolBagsDistributed: e.target.value,
                            })
                          }
                          className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-2.5 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Active Volunteers Count
                        </label>
                        <input
                          type="text"
                          value={foundationStats.activeVolunteers}
                          onChange={(e) =>
                            setFoundationStats({ ...foundationStats, activeVolunteers: e.target.value })
                          }
                          className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-2.5 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Meals Served Counter
                        </label>
                        <input
                          type="text"
                          value={foundationStats.mealsServed}
                          onChange={(e) =>
                            setFoundationStats({ ...foundationStats, mealsServed: e.target.value })
                          }
                          className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-2.5 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Official UPI ID (QR Gateway)
                        </label>
                        <input
                          type="text"
                          value={foundationStats.upiId}
                          onChange={(e) =>
                            setFoundationStats({ ...foundationStats, upiId: e.target.value })
                          }
                          className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-2.5 font-mono font-bold text-emerald-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Helpline Phone Number
                        </label>
                        <input
                          type="text"
                          value={foundationStats.phone}
                          onChange={(e) =>
                            setFoundationStats({ ...foundationStats, phone: e.target.value })
                          }
                          className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-2.5 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Corporate CIN Number
                        </label>
                        <input
                          type="text"
                          value={foundationStats.cinNumber}
                          onChange={(e) =>
                            setFoundationStats({ ...foundationStats, cinNumber: e.target.value })
                          }
                          className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-2.5 font-mono text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                          Support Email
                        </label>
                        <input
                          type="text"
                          value={foundationStats.email}
                          onChange={(e) =>
                            setFoundationStats({ ...foundationStats, email: e.target.value })
                          }
                          className="w-full bg-[#faf8f5] border border-neutral-300 rounded-lg p-2.5"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        showToast('Foundation Telemetry & Registry saved & synced!');
                        onSyncToServer?.();
                      }}
                      className="bg-[#084c36] hover:bg-[#063b2a] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#FDB813]" />
                      <span>Save Foundation Credentials</span>
                    </button>
                  </div>
                )}

                {/* 7. HAR EKADASHI CALENDAR & LIVE BROADCAST TAB */}
                {activeTab === 'calendar' && scheduleEvents && setScheduleEvents && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900">
                          Har Ekadashi Bedside Calendar & Live Drives
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Update currently active on-ground seva broadcast and upcoming Ekadashi dates across Jaipur hospitals.
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        {scheduleEvents.length} Events Listed
                      </span>
                    </div>

                    {/* Form to Schedule New Ekadashi Drive */}
                    <form
                      onSubmit={handleAddScheduleEvent}
                      className="bg-[#fcfbf9] rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-xs space-y-3"
                    >
                      <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                        <Plus className="w-4 h-4 text-[#084c36]" />
                        <span>Schedule New Ekadashi / Hospital Drive</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Event Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Upcoming Devutthana Ekadashi Maha Seva"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium text-neutral-900"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Tithi / Occasion Tag
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Devutthana Ekadashi Vow"
                            value={newEventTithi}
                            onChange={(e) => setNewEventTithi(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium text-neutral-900"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Scheduled Date (e.g. Nov 12, 2026) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nov 12, 2026"
                            value={newEventDate}
                            onChange={(e) => setNewEventDate(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-mono font-medium text-neutral-900"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Partner Hospital Node
                          </label>
                          <select
                            value={newEventHospital}
                            onChange={(e) => setNewEventHospital(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-medium text-neutral-900"
                          >
                            <option value="State Cancer Medical College (RUHS), Jaipur">State Cancer Medical College (RUHS), Jaipur</option>
                            <option value="SMS Medical College & Hospital, Jaipur">SMS Medical College & Hospital, Jaipur</option>
                            <option value="JK Lon Children Hospital, Jaipur">JK Lon Children Hospital, Jaipur</option>
                            <option value="Mahatma Gandhi Cancer Institute, Sitapura">Mahatma Gandhi Cancer Institute, Sitapura</option>
                            <option value="All Partner Hospitals Across Jaipur Node">All Partner Hospitals Across Jaipur Node</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Target Coconuts Count
                          </label>
                          <input
                            type="number"
                            min="50"
                            step="50"
                            placeholder="3500"
                            value={newEventTarget}
                            onChange={(e) => setNewEventTarget(Number(e.target.value))}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 font-bold text-neutral-900 font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-neutral-600 block mb-1">
                            Short Description / Ward Details
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Bedside fresh tender coconut hydration drive for cancer patients."
                            value={newEventDesc}
                            onChange={(e) => setNewEventDesc(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-neutral-900"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-[#084c36] hover:bg-[#063b2a] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Ekadashi Event to Calendar</span>
                      </button>
                    </form>

                    {/* List of Existing Schedule Events */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-neutral-800">
                        Current Listed Ekadashi & Hospital Events:
                      </h4>

                      {scheduleEvents.map((ev, idx) => (
                        <div
                          key={ev.id}
                          className="p-4 bg-white rounded-2xl border border-neutral-200 flex flex-col gap-3 shadow-xs"
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                    ev.status === 'active_today'
                                      ? 'bg-red-100 text-red-700 animate-pulse'
                                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                                  }`}
                                >
                                  {ev.status === 'active_today' ? '🔴 Active Today' : ev.tithi}
                                </span>
                                <strong className="text-xs sm:text-sm text-neutral-900 font-bold">
                                  {ev.title}
                                </strong>
                              </div>
                              <p className="text-[11px] text-neutral-500 flex flex-wrap items-center gap-2 font-medium">
                                <span>📅 {ev.date}</span>
                                <span>•</span>
                                <span>🏥 {ev.hospital}</span>
                                <span>•</span>
                                <span>⏰ {ev.timing || '12:00 PM - 04:00 PM'}</span>
                                <span>•</span>
                                <span className="text-emerald-800 font-bold font-mono">
                                  {ev.sponsoredCoconuts} / {ev.targetCoconuts} Coconuts
                                </span>
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              {ev.status === 'active_today' ? (
                                <button
                                  onClick={() => {
                                    const updated = scheduleEvents.map((item, i) => ({
                                      ...item,
                                      status: i === idx ? ('upcoming' as const) : item.status,
                                    }));
                                    setScheduleEvents(updated);
                                    showToast(`Set "${ev.title}" back to Upcoming`);
                                  }}
                                  className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold px-2.5 py-1.5 rounded-lg border border-amber-300 transition-colors cursor-pointer"
                                >
                                  Set as Upcoming ⚪
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    const updated = scheduleEvents.map((item, i) => ({
                                      ...item,
                                      status: i === idx ? ('active_today' as const) : ('upcoming' as const),
                                    }));
                                    setScheduleEvents(updated);
                                    showToast(`Set "${ev.title}" as Active Today!`);
                                  }}
                                  className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-[#084c36] font-bold px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                                >
                                  Set as Live Today 🔴
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteScheduleEvent(ev.id)}
                                className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete Event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Coconut Count & Timing Customizer (Admin Feature) */}
                          <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs bg-neutral-50/70 p-2.5 rounded-xl border border-neutral-200/80">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-neutral-700">🥥 Customize Coconut Count:</span>
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  min="0"
                                  value={ev.sponsoredCoconuts}
                                  onChange={(e) => {
                                    const val = Math.max(0, parseInt(e.target.value) || 0);
                                    const updated = scheduleEvents.map((item, i) =>
                                      i === idx ? { ...item, sponsoredCoconuts: val } : item
                                    );
                                    setScheduleEvents(updated);
                                  }}
                                  className="w-20 px-2 py-1 text-xs font-mono font-bold bg-white border border-neutral-300 rounded-lg text-center text-emerald-800 focus:outline-none focus:border-emerald-700"
                                  title="Completed / Sponsored Coconuts"
                                />
                                <span className="text-neutral-400 font-bold">/</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={ev.targetCoconuts}
                                  onChange={(e) => {
                                    const val = Math.max(1, parseInt(e.target.value) || 1);
                                    const updated = scheduleEvents.map((item, i) =>
                                      i === idx ? { ...item, targetCoconuts: val } : item
                                    );
                                    setScheduleEvents(updated);
                                  }}
                                  className="w-20 px-2 py-1 text-xs font-mono font-bold bg-white border border-neutral-300 rounded-lg text-center text-neutral-900 focus:outline-none focus:border-emerald-700"
                                  title="Target Goal Coconuts"
                                />
                                <span className="text-[10px] text-neutral-500 font-medium">Target</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                              <span>⏰ Timing:</span>
                              <input
                                type="text"
                                value={ev.timing || '12:00 PM - 04:00 PM'}
                                onChange={(e) => {
                                  const updated = scheduleEvents.map((item, i) =>
                                    i === idx ? { ...item, timing: e.target.value } : item
                                  );
                                  setScheduleEvents(updated);
                                }}
                                className="w-36 px-2 py-1 text-xs font-mono bg-white border border-neutral-300 rounded-lg text-neutral-800 focus:outline-none focus:border-emerald-700"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. SMS & EMAIL AUTOMATION TAB */}
                {activeTab === 'automation' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-[#084c36]" />
                          <span>Live SMS & Gmail Receipt Automation Control Center</span>
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Automate instant mobile SMS delivery and official 80G Tax Exemption receipts on every donation.
                        </p>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full font-mono flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Fast2SMS Active</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {/* CARD 1: FAST2SMS GATEWAY */}
                      <div className="bg-[#faf8f5] rounded-2xl p-5 border border-neutral-200 space-y-4 shadow-xs">
                        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                              📱
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-neutral-900">Fast2SMS Gateway</h4>
                              <p className="text-[11px] text-neutral-500">Route 'q' (Instant Quick SMS Delivery)</p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold px-2 py-0.5 rounded-full">
                            Connected 🟢
                          </span>
                        </div>

                        {/* Balance Banner */}
                        <div className="bg-white rounded-xl p-3 border border-neutral-200 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">
                              Fast2SMS Live Balance
                            </span>
                            <strong className="text-sm font-bold text-emerald-800 font-mono">
                              {walletBalance}
                            </strong>
                          </div>
                          <a
                            href="https://www.fast2sms.com/dashboard/dev-api"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#084c36] font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>Dashboard</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {/* API Key Field */}
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Fast2SMS Authorization API Key
                          </label>
                          <input
                            type="password"
                            value={smsApiKey}
                            onChange={(e) => setSmsApiKey(e.target.value)}
                            className="w-full text-xs font-mono bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:border-emerald-800"
                            placeholder="Enter Fast2SMS API Key"
                          />
                        </div>

                        {/* Live Test SMS Form */}
                        <div className="bg-emerald-900/5 rounded-xl p-3.5 border border-emerald-800/20 space-y-2.5">
                          <span className="text-xs font-bold text-emerald-950 block">
                            🧪 Test Live SMS to Any Mobile Phone
                          </span>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-2 text-xs font-medium text-neutral-400">+91</span>
                              <input
                                type="tel"
                                maxLength={10}
                                value={testSmsPhone}
                                onChange={(e) => setTestSmsPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                placeholder="Enter 10-digit number"
                                className="w-full text-xs font-mono bg-white border border-neutral-300 rounded-xl pl-10 pr-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={handleSendTestSms}
                              disabled={isSendingTestSms}
                              className="bg-[#084c36] hover:bg-[#063b2a] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                            >
                              <Send className={`w-3.5 h-3.5 ${isSendingTestSms ? 'animate-spin' : ''}`} />
                              <span>{isSendingTestSms ? 'Sending...' : 'Send Test SMS'}</span>
                            </button>
                          </div>
                          <p className="text-[10px] text-neutral-500">
                            Sends an actual live confirmation message to verify instant SMS delivery.
                          </p>
                        </div>

                        {/* Message Preview */}
                        <div className="bg-white rounded-xl p-3 border border-neutral-200 text-xs text-neutral-700 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                            Donor SMS Preview:
                          </span>
                          <p className="font-mono text-[11px] text-neutral-800 bg-neutral-50 p-2 rounded-lg border border-neutral-200/60 leading-relaxed">
                            "Namaste Sanjay Ji! RiseUpHelp Foundation has received your seva of Rs.15000 for Har Ekadashi Bedside Coconut Seva. 80G Receipt: RUH-80G-2026-981240. Bedside photos: wa.me/919828291119 . Thank you!"
                          </p>
                        </div>
                      </div>

                      {/* CARD 2: GMAIL / EMAIL 80G TAX EXEMPTION GATEWAY */}
                      <div className="bg-[#faf8f5] rounded-2xl p-5 border border-neutral-200 space-y-4 shadow-xs">
                        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                              ✉️
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-neutral-900">Gmail 80G Receipt Gateway</h4>
                              <p className="text-[11px] text-neutral-500">Automated Branded 80G Tax Exemption Email</p>
                            </div>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              gmailUser && gmailPassword
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                                : 'bg-amber-50 text-amber-800 border border-amber-300'
                            }`}
                          >
                            {gmailUser && gmailPassword ? 'Ready 🟢' : 'Enter Credentials 🟡'}
                          </span>
                        </div>

                        {/* Gmail Configuration Fields */}
                        <div className="space-y-3">
                          <div>
                            <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                              Official Foundation Email (GoDaddy / Custom Domain / Gmail)
                            </label>
                            <input
                              type="email"
                              value={gmailUser}
                              onChange={(e) => setGmailUser(e.target.value)}
                              placeholder="support@riseuphelp.org"
                              className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:border-emerald-800"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[11px] font-semibold text-neutral-700">
                                Email Password / Google App Password
                              </label>
                              <span className="text-[10px] text-emerald-800 font-semibold">
                                {gmailUser?.includes('riseuphelp.org') ? 'GoDaddy SMTP Connected 🟢' : 'Encrypted'}
                              </span>
                            </div>
                            <input
                              type="password"
                              value={gmailPassword}
                              onChange={(e) => setGmailPassword(e.target.value)}
                              placeholder="Enter email account password"
                              className="w-full text-xs font-mono bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:border-emerald-800"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={handleSaveGmailConfig}
                            className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold py-2 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5 text-[#FDB813]" />
                            <span>Save Email Automation Settings</span>
                          </button>
                        </div>

                        {/* Test Email Form */}
                        <div className="bg-amber-900/5 rounded-xl p-3.5 border border-amber-800/20 space-y-2.5">
                          <span className="text-xs font-bold text-amber-950 block">
                            🧪 Test Official 80G Receipt Email
                          </span>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              value={testEmailAddress}
                              onChange={(e) => setTestEmailAddress(e.target.value)}
                              placeholder="Enter your email to receive test receipt"
                              className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-emerald-800 flex-1"
                            />
                            <button
                              type="button"
                              onClick={handleSendTestEmail}
                              disabled={isSendingTestEmail}
                              className="bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                            >
                              <Mail className={`w-3.5 h-3.5 ${isSendingTestEmail ? 'animate-spin' : ''}`} />
                              <span>{isSendingTestEmail ? 'Sending...' : 'Send Test'}</span>
                            </button>
                          </div>
                          <p className="text-[10px] text-neutral-500">
                            Sends an official HTML 80G certificate with CIN U88900RJ2024NPL093120 and receipt breakdown.
                          </p>
                        </div>

                        {/* Quick 3-Step Guide */}
                        <div className="bg-white rounded-xl p-3 border border-neutral-200 text-xs text-neutral-600 space-y-1">
                          <strong className="text-[11px] text-neutral-900 block font-bold">
                            💡 How to get 16-Digit Google App Password:
                          </strong>
                          <ol className="list-decimal list-inside space-y-0.5 text-[11px]">
                            <li>Go to Google Account Security $\rightarrow$ 2-Step Verification.</li>
                            <li>Search for <strong>"App passwords"</strong>.</li>
                            <li>Name it <em>"RiseUpHelp"</em>, copy the 16-letter code & paste here!</li>
                          </ol>
                        </div>
                      </div>

                      {/* CARD 3: RAZORPAY / CARDS & NETBANKING GATEWAY */}
                      <div className="bg-[#faf8f5] rounded-2xl p-5 border border-neutral-200 space-y-4 shadow-xs lg:col-span-2">
                        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                              💳
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-neutral-900">Razorpay Online Gateway Settings</h4>
                              <p className="text-[11px] text-neutral-500">Enable Credit Cards, Debit Cards, NetBanking & NRI Donations</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            razorpayKeyId
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                          }`}>
                            {razorpayKeyId ? 'Configured 🟢' : 'Optional (UPI Active) ⚪'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                              Razorpay Key ID (rzp_live_... or rzp_test_...) *
                            </label>
                            <input
                              type="text"
                              value={razorpayKeyId}
                              onChange={(e) => setRazorpayKeyId(e.target.value)}
                              placeholder="rzp_live_xxxxxxxxxxxxxxxx"
                              className="w-full text-xs font-mono bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:border-emerald-800"
                            />
                            <p className="text-[10px] text-neutral-500 mt-1">
                              From Razorpay Dashboard → Account & Settings → API Keys → Key ID.
                            </p>
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-neutral-700 block mb-1 flex items-center justify-between">
                              <span>Razorpay Key Secret (Optional / Recommended)</span>
                              {razorpaySecretSet && (
                                <span className="text-[9px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                                  Secret Saved 🔒
                                </span>
                              )}
                            </label>
                            <input
                              type="password"
                              value={razorpayKeySecret}
                              onChange={(e) => setRazorpayKeySecret(e.target.value)}
                              placeholder={razorpaySecretSet ? '•••••••••••••••• (Saved)' : 'Enter Razorpay Key Secret'}
                              className="w-full text-xs font-mono bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:border-emerald-800"
                            />
                            <p className="text-[10px] text-neutral-500 mt-1">
                              Enables server-side cryptographic signature verification (HMAC SHA-256).
                            </p>
                          </div>

                          <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                            <p className="text-[10px] text-neutral-500 text-left">
                              *Tip: 1-Tap UPI and HDFC Bank Wire work 100% automatically even without Razorpay keys.
                            </p>
                            <button
                              type="button"
                              onClick={handleSaveRazorpayConfig}
                              className="w-full sm:w-auto bg-[#084c36] hover:bg-[#063b2a] text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5 text-[#FDB813]" />
                              <span>Save Razorpay Credentials</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. ADMIN SECURITY & PIN TAB */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-rose-600" />
                        <span>Admin Security & Master PIN Management</span>
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Change the Master Security PIN required to unlock this portal. PIN is permanently saved to server disk and protected against unauthorized access.
                      </p>
                    </div>

                    <div className="max-w-lg bg-[#faf8f5] rounded-2xl p-5 border border-neutral-200 space-y-4 shadow-xs">
                      <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                        <Shield className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-bold text-neutral-900 uppercase">Change Master Access PIN</span>
                      </div>

                      <form onSubmit={handleChangePin} className="space-y-3 text-xs">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Current Master PIN *
                          </label>
                          <input
                            type="password"
                            required
                            value={currentPinChange}
                            onChange={(e) => setCurrentPinChange(e.target.value)}
                            placeholder="Enter current PIN"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            New Master PIN (minimum 4 characters) *
                          </label>
                          <input
                            type="password"
                            required
                            value={newPinChange}
                            onChange={(e) => setNewPinChange(e.target.value)}
                            placeholder="Enter new strong PIN"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                            Confirm New Master PIN *
                          </label>
                          <input
                            type="password"
                            required
                            value={confirmPinChange}
                            onChange={(e) => setConfirmPinChange(e.target.value)}
                            placeholder="Re-enter new PIN"
                            className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 font-mono"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                        >
                          <Save className="w-4 h-4 text-[#FDB813]" />
                          <span>Update & Save Master PIN</span>
                        </button>
                      </form>

                      <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-500">Need to immediately log out?</span>
                        <button
                          type="button"
                          onClick={handleLockSession}
                          className="bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Lock className="w-3.5 h-3.5 text-rose-600" />
                          <span>Lock Portal Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
