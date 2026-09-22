import { useState, useEffect, useCallback, useRef } from 'react';
import { PreloaderIntro } from './components/PreloaderIntro';
import { AmbientBackgroundCanvas } from './components/AmbientBackgroundCanvas';
import { RecentDonationsTicker } from './components/RecentDonationsTicker';
import { ChildSpotlightModal } from './components/ChildSpotlightModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { CartDrawer, type CartItemEntry } from './components/CartDrawer';
import { CustomSevaDateBuilderModal } from './components/CustomSevaDateBuilderModal';
import { ImpactGallery } from './components/ImpactGallery';
import { Footer } from './components/Footer';

// Standalone Multi-Page Views
import { HomePage } from './pages/HomePage';
import { EkadashiPage } from './pages/EkadashiPage';
import { CancerWarriorsPage } from './pages/CancerWarriorsPage';
import { EducationLivelihoodPage } from './pages/EducationLivelihoodPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { Navbar, type AppView } from './components/Navbar';
import { useLanguage } from './context/LanguageContext';
import { safeLocalStorageSet } from './utils/imageUtils';
import {
  fetchServerState,
  pushServerState,
  hasCustomUploadedContent,
  type ReceiptConfig,
  type SiteStatePayload,
} from './utils/serverSync';

import {
  DRIVE_ITEMS,
  PATIENT_PROFILES,
  INITIAL_LEADERBOARD_DONORS,
  INITIAL_CHILD_SPOTLIGHTS,
  INITIAL_MEDIA_CARDS_ROW_1,
  INITIAL_MEDIA_CARDS_ROW_2,
  INITIAL_FOUNDATION_STATS,
  INITIAL_SEVA_SCHEDULE,
  PARTNER_HOSPITALS,
  INITIAL_HERO_CONTENT,
  INITIAL_STORY_CONTENT,
  sanitizeDriveItems,
  GALLERY_ITEMS,
  RUHS_CHILDREN_WARD_PROFILES,
  INITIAL_VOLUNTEERS,
} from './data/mockData';
import type {
  DriveItem,
  PatientProfile,
  LeaderboardDonor,
  ChildSpotlightProfile,
  MediaPhotoCard,
  FoundationStats,
  DonorProfile,
  SevaScheduleEvent,
  HospitalNode,
  HeroContentConfig,
  StoryContentConfig,
  GalleryItem,
  VolunteerSubmission,
  InaugurationConfig,
} from './types';

const sanitizeGalleryItems = (items: GalleryItem[]): GalleryItem[] => {
  if (!Array.isArray(items)) return GALLERY_ITEMS;
  return items.map((item) => {
    const rawImages = item.images && item.images.length > 0 ? item.images : (item.image ? [item.image] : []);
    const cleanImages = rawImages.filter(
      (img) => !img.includes('1506794778202') && !img.includes('1502086223501')
    );
    let cleanCover = item.image;
    if (!cleanCover || cleanCover.includes('1506794778202') || cleanCover.includes('1502086223501')) {
      cleanCover = cleanImages[0] || '/uploads/upload_1788854883629_8bda525a0f.jpg';
    }
    return {
      ...item,
      image: cleanCover,
      images: cleanImages.length > 0 ? cleanImages : [cleanCover],
    };
  });
};

const sanitizePatientProfiles = (profiles: PatientProfile[]): PatientProfile[] => {
  if (!Array.isArray(profiles) || profiles.length === 0) return PATIENT_PROFILES;
  return profiles
    .filter((p) => p.id !== 'warrior-irfan')
    .map((p) => {
      let name = p.name;
      let diagnosis = p.diagnosis;
      let story = p.story;
      let medicalNeeds = p.medicalNeeds;

      if (
        p.id === 'warrior-aarav' ||
        name.toLowerCase().includes('aarav') ||
        name.toLowerCase().includes('arav') ||
        name.toLowerCase().includes('master aarav')
      ) {
        name = 'Arru';
        diagnosis = 'Blood Cancer (Leukemia) • Chemo Protocol • Bed No. 1';
        if (!story.toLowerCase().includes('drawing')) {
          story =
            '7-year-old Arru is admitted in RUHS Pediatric Ward Bed No. 1 battling blood cancer. Arru loves drawing and coloring sketches (drawing karna bahut pasand hai), facing his regular chemotherapy cycles with an inspiring brave smile. His father works as a daily-wage e-rickshaw driver in Jaipur whose small earnings cannot sustain high-potency chemotherapy ampoules, platelet transfusions, and supportive bedside clinical care. For verified records or bedside visits, contact Rise Up via Instagram (@riseuphelp) or email support@riseuphelp.org.';
        }
        if (!medicalNeeds || !medicalNeeds.some((m) => m.toLowerCase().includes('drawing'))) {
          medicalNeeds = [
            'Targeted Blood Cancer Chemotherapy Ampoules (Vincristine & Methotrexate)',
            'Drawing kit, color sketchbooks & bedside creative distraction therapy',
            'Single Donor Platelet (SDP) Transfusion Support',
            'Daily sterile tender coconut hydration bedside at RUHS Bed 1',
          ];
        }
      }

      let img = p.image;
      if (img?.includes('1506794778202')) {
        img = '/uploads/upload_1788854883643_e4a411d682.jpg';
      } else if (img?.includes('1502086223501')) {
        img = '/uploads/upload_1788854883635_8a4d2b5135.jpg';
      }
      return {
        ...p,
        name,
        diagnosis,
        story,
        medicalNeeds,
        image: img,
      };
    });
};

const isOldAarav = (id?: string, name?: string) => {
  const n = (name || '').toLowerCase();
  const i = (id || '').toLowerCase();
  return (
    n.includes('mr arav') ||
    n.includes('mr aarav') ||
    n.includes('master aarav') ||
    n.includes('aarav sharma') ||
    i.includes('spotlight-aarav')
  );
};

const sanitizeSpotlights = (spot: { left: ChildSpotlightProfile; right: ChildSpotlightProfile }) => {
  if (!spot?.left || !spot?.right) return INITIAL_CHILD_SPOTLIGHTS;
  let s = { ...spot, left: { ...spot.left }, right: { ...spot.right } };

  // Ensure left is always a valid child (default Lovekush Jatav)
  if (!s.left.name || isOldAarav(s.left.id, s.left.name) || s.left.category?.includes('Education') || s.left.title?.includes('School Bags')) {
    s.left = RUHS_CHILDREN_WARD_PROFILES[0];
  }

  // Ensure right is always a valid child (default Aru)
  if (!s.right.name || isOldAarav(s.right.id, s.right.name) || s.right.category?.includes('Education') || s.right.title?.includes('School Bags')) {
    s.right = RUHS_CHILDREN_WARD_PROFILES[1] || RUHS_CHILDREN_WARD_PROFILES[0];
  }

  return s;
};

const sanitizeWardProfiles = (profiles: ChildSpotlightProfile[]): ChildSpotlightProfile[] => {
  if (!Array.isArray(profiles) || profiles.length === 0) return RUHS_CHILDREN_WARD_PROFILES;
  const filtered = profiles.filter((p) => !isOldAarav(p.id, p.name));
  if (filtered.length === 0) return RUHS_CHILDREN_WARD_PROFILES;
  return filtered;
};

export function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const [activeView, setActiveView] = useState<AppView>('home');
  const [isPatientPortalOpen, setIsPatientPortalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [childSpotlightModalOpen, setChildSpotlightModalOpen] = useState(false);
  const [customDateModalOpen, setCustomDateModalOpen] = useState(false);
  const [selectedChildSpotlight, setSelectedChildSpotlight] = useState<ChildSpotlightProfile | null>(null);

  // Multi-Language Switcher State ('en' | 'hi' | 'hinglish') via Unified Context
  const { language, setLanguage: handleLanguageChange } = useLanguage();

  // Live Donation Notifications Ticker Toggle (Controlled via Admin Portal - Default OFF)
  const [showDonationTicker, setShowDonationTicker] = useState<boolean>(() => {
    const s = localStorage.getItem('ruh_show_ticker');
    return s !== null ? s === 'true' : false;
  });

  const handleToggleTicker = (val: boolean) => {
    setShowDonationTicker(val);
    localStorage.setItem('ruh_show_ticker', String(val));
  };

  // Persistent Active Donor User Profile (Auto-logs in repeat donors)
  const [currentUser, setCurrentUser] = useState<DonorProfile | null>(() => {
    const s = localStorage.getItem('ruh_donor_user');
    return s ? JSON.parse(s) : null;
  });

  // --- Dynamic Database States with LocalStorage Persistence ---
  const [driveItems, setDriveItems] = useState<DriveItem[]>(() => {
    const s = localStorage.getItem('ruh_drives_v4') || localStorage.getItem('ruh_drives_v3');
    if (s) {
      try {
        const parsed = JSON.parse(s);
        return sanitizeDriveItems(parsed);
      } catch {
        // ignore
      }
    }
    return DRIVE_ITEMS;
  });

  const [patientProfiles, setPatientProfiles] = useState<PatientProfile[]>(() => {
    const s = localStorage.getItem('ruh_patients_v3');
    if (s) {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = sanitizePatientProfiles(parsed);
          safeLocalStorageSet('ruh_patients_v3', sanitized);
          return sanitized;
        }
      } catch {
        // ignore
      }
    }
    return PATIENT_PROFILES;
  });

  const [leaderboardDonors, setLeaderboardDonors] = useState<LeaderboardDonor[]>(() => {
    const s = localStorage.getItem('ruh_donors_v3');
    return s ? JSON.parse(s) : INITIAL_LEADERBOARD_DONORS;
  });

  const [childSpotlights, setChildSpotlights] = useState<{
    left: ChildSpotlightProfile;
    right: ChildSpotlightProfile;
  }>(() => {
    const s = localStorage.getItem('ruh_child_spotlights_v4');
    if (s) {
      try {
        const parsed = JSON.parse(s);
        if (parsed && typeof parsed === 'object' && parsed.left && parsed.right) {
          return sanitizeSpotlights(parsed);
        }
      } catch {
        // ignore
      }
    }
    return sanitizeSpotlights(INITIAL_CHILD_SPOTLIGHTS);
  });

  const [wardProfiles, setWardProfiles] = useState<ChildSpotlightProfile[]>(() => {
    const s = localStorage.getItem('ruh_ward_profiles_v4');
    if (s) {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sanitizeWardProfiles(parsed);
        }
      } catch {
        // ignore
      }
    }
    return RUHS_CHILDREN_WARD_PROFILES;
  });

  const [mediaPhotosRow1, setMediaPhotosRow1] = useState<MediaPhotoCard[]>(() => {
    const s = localStorage.getItem('ruh_media_r1_v2');
    return s ? JSON.parse(s) : INITIAL_MEDIA_CARDS_ROW_1;
  });

  const [mediaPhotosRow2, setMediaPhotosRow2] = useState<MediaPhotoCard[]>(() => {
    const s = localStorage.getItem('ruh_media_r2_v2');
    return s ? JSON.parse(s) : INITIAL_MEDIA_CARDS_ROW_2;
  });

  const [foundationStats, setFoundationStats] = useState<FoundationStats>(() => {
    const s = localStorage.getItem('ruh_stats_v2');
    return s ? JSON.parse(s) : INITIAL_FOUNDATION_STATS;
  });

  const [scheduleEvents, setScheduleEvents] = useState<SevaScheduleEvent[]>(() => {
    const s = localStorage.getItem('ruh_schedule_v3');
    if (s) {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if parsed already has Jaljhulani Ekadashi active today with custom offerings and image
          const jaljhulaniEv = parsed.find((e: any) => e.id === 'seva-ekadashi-parsva');
          if (jaljhulaniEv && jaljhulaniEv.status === 'active_today' && jaljhulaniEv.image) {
            return parsed;
          }
          // Migrate old cached client data: mark Jaljhulani as active today with Anaar juice photo & offerings
          const updated = parsed.map((e: any) => {
            if (e.id === 'seva-ekadashi-parsva') {
              return {
                ...e,
                title: 'Jaljhulani Ekadashi Hospital Nariyal Pani & Anaar Juice Seva',
                tithi: 'Jaljhulani (Parivartini) Ekadashi Mahotsav',
                date: 'Sep 22, 2026',
                timing: '12:00 PM - 04:00 PM',
                status: 'active_today' as const,
                image: '/uploads/jaljhulani_anar_juice_nariyal_seva.jpg',
                sevaItems: ['🥥 Fresh Tender Coconut Water', '🍷 Pure Pomegranate (Anaar) Juice', '💧 Electrolyte Recovery'],
                customOfferingsNote: 'Special Jaljhulani Offering: Nariyal Pani + Taaza Anaar Juice',
              };
            }
            if (e.id === 'seva-radha-ashtami') {
              return {
                ...e,
                status: 'completed' as const,
              };
            }
            return e;
          });
          // Ensure active_today event is sorted first
          updated.sort((a: any, b: any) => (a.status === 'active_today' ? -1 : b.status === 'active_today' ? 1 : 0));
          return updated;
        }
      } catch {
        // ignore
      }
    }
    return INITIAL_SEVA_SCHEDULE;
  });

  const [heroContent, setHeroContent] = useState<HeroContentConfig>(() => {
    const s = localStorage.getItem('ruh_hero_content');
    return s ? JSON.parse(s) : INITIAL_HERO_CONTENT;
  });

  const [storyContent, setStoryContent] = useState<StoryContentConfig>(() => {
    const s = localStorage.getItem('ruh_story_content');
    return s ? JSON.parse(s) : INITIAL_STORY_CONTENT;
  });

  const [partnerHospitals, setPartnerHospitals] = useState<HospitalNode[]>(() => {
    const s = localStorage.getItem('ruh_hospitals_v2');
    return s ? JSON.parse(s) : PARTNER_HOSPITALS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const s = localStorage.getItem('ruh_gallery_items_v2');
    if (s) {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) {
          const sanitized = sanitizeGalleryItems(parsed);
          safeLocalStorageSet('ruh_gallery_items_v2', sanitized);
          return sanitized;
        }
      } catch {
        // ignore
      }
    }
    return GALLERY_ITEMS;
  });

  const [receiptConfig, setReceiptConfig] = useState<ReceiptConfig>(() => {
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

  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>(() => {
    try {
      const s = localStorage.getItem('ruh_volunteers_v1');
      if (s) return JSON.parse(s);
    } catch {
      // ignore
    }
    return INITIAL_VOLUNTEERS;
  });

  // Sync states to LocalStorage safely (crash-proof)
  useEffect(() => {
    safeLocalStorageSet('ruh_volunteers_v1', volunteers);
  }, [volunteers]);

  useEffect(() => {
    safeLocalStorageSet('ruh_drives_v4', driveItems);
    safeLocalStorageSet('ruh_drives_v3', driveItems);
  }, [driveItems]);

  useEffect(() => {
    safeLocalStorageSet('ruh_patients_v3', patientProfiles);
  }, [patientProfiles]);

  useEffect(() => {
    safeLocalStorageSet('ruh_donors_v3', leaderboardDonors);
  }, [leaderboardDonors]);

  useEffect(() => {
    safeLocalStorageSet('ruh_child_spotlights_v4', childSpotlights);
  }, [childSpotlights]);

  useEffect(() => {
    safeLocalStorageSet('ruh_ward_profiles_v4', wardProfiles);
  }, [wardProfiles]);

  useEffect(() => {
    safeLocalStorageSet('ruh_media_r1_v2', mediaPhotosRow1);
  }, [mediaPhotosRow1]);

  useEffect(() => {
    safeLocalStorageSet('ruh_media_r2_v2', mediaPhotosRow2);
  }, [mediaPhotosRow2]);

  useEffect(() => {
    safeLocalStorageSet('ruh_stats_v2', foundationStats);
  }, [foundationStats]);

  useEffect(() => {
    safeLocalStorageSet('ruh_schedule_v3', scheduleEvents);
  }, [scheduleEvents]);

  useEffect(() => {
    safeLocalStorageSet('ruh_gallery_items_v2', galleryItems);
  }, [galleryItems]);

  useEffect(() => {
    safeLocalStorageSet('ruh_hero_content', heroContent);
  }, [heroContent]);

  useEffect(() => {
    safeLocalStorageSet('ruh_story_content', storyContent);
  }, [storyContent]);

  useEffect(() => {
    safeLocalStorageSet('ruh_hospitals_v2', partnerHospitals);
  }, [partnerHospitals]);

  useEffect(() => {
    safeLocalStorageSet('ruh_receipt_config_v1', receiptConfig);
  }, [receiptConfig]);

  const [inaugurationConfig, setInaugurationConfig] = useState<InaugurationConfig>(() => {
    try {
      const saved = localStorage.getItem('ruh_inauguration_config_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      enabled: true,
      developerName: 'Lead Tech Engineer',
      inaugurationTitle: 'RiseUpHelp Portal Inauguration',
    };
  });

  useEffect(() => {
    safeLocalStorageSet('ruh_inauguration_config_v1', inaugurationConfig);
  }, [inaugurationConfig]);

  // --- Multi-Device Server Disk Sync (PC <-> Tablet <-> Mobile) ---
  const [serverSyncTime, setServerSyncTime] = useState<number>(0);
  const isInitialSyncDone = useRef(false);

  // Push current React state to server disk (extracts base64 to /uploads/)
  const handlePushToServer = useCallback(async (overridePayload?: Partial<SiteStatePayload>): Promise<boolean> => {
    try {
      const payload: Partial<SiteStatePayload> = {
        driveItems,
        patientProfiles,
        leaderboardDonors,
        childSpotlights,
        wardProfiles,
        mediaPhotosRow1,
        mediaPhotosRow2,
        foundationStats,
        scheduleEvents,
        galleryItems,
        heroContent,
        storyContent,
        partnerHospitals,
        receiptConfig,
        volunteers,
        inaugurationConfig,
        ...overridePayload,
      };
      const res = await pushServerState(payload);

      if (res.success && res.data) {
        if (res.data.driveItems) setDriveItems(sanitizeDriveItems(res.data.driveItems));
        if (res.data.mediaPhotosRow1) setMediaPhotosRow1(res.data.mediaPhotosRow1);
        if (res.data.mediaPhotosRow2) setMediaPhotosRow2(res.data.mediaPhotosRow2);
        if (res.data.childSpotlights) setChildSpotlights(sanitizeSpotlights(res.data.childSpotlights));
        if (res.data.wardProfiles) setWardProfiles(sanitizeWardProfiles(res.data.wardProfiles));
        if (res.data.patientProfiles) setPatientProfiles(res.data.patientProfiles);
        if (res.data.scheduleEvents && Array.isArray(res.data.scheduleEvents)) setScheduleEvents(res.data.scheduleEvents);
        if (res.data.foundationStats) setFoundationStats(res.data.foundationStats);
        if (res.data.galleryItems) setGalleryItems(res.data.galleryItems);
        if (res.data.heroContent) setHeroContent(res.data.heroContent);
        if (res.data.storyContent) setStoryContent(res.data.storyContent);
        if (res.data.partnerHospitals) setPartnerHospitals(res.data.partnerHospitals);
        if (res.data.receiptConfig) setReceiptConfig(res.data.receiptConfig);
        if (res.data.volunteers) setVolunteers(res.data.volunteers);
        if (res.data.inaugurationConfig) setInaugurationConfig(res.data.inaugurationConfig);
        if (res.data.lastUpdated) setServerSyncTime(res.data.lastUpdated);
        console.log('✅ Site state and photos successfully synced to server disk.');
        return true;
      }
      return false;
    } catch (err) {
      console.error('[App] Failed to push state to server:', err);
      return false;
    }
  }, [
    driveItems,
    patientProfiles,
    leaderboardDonors,
    childSpotlights,
    wardProfiles,
    mediaPhotosRow1,
    mediaPhotosRow2,
    foundationStats,
    scheduleEvents,
    galleryItems,
    heroContent,
    storyContent,
    partnerHospitals,
    receiptConfig,
    volunteers,
    inaugurationConfig,
  ]);

  // Initial Sync on Mount
  useEffect(() => {
    if (isInitialSyncDone.current) return;
    isInitialSyncDone.current = true;

    const runInitialSync = async () => {
      try {
        const serverRes = await fetchServerState();

        if (serverRes.initialized && serverRes.data) {
          // The server has stored state with real photos!
          const d = serverRes.data;
          if (d.driveItems) setDriveItems(sanitizeDriveItems(d.driveItems));
          if (d.patientProfiles) {
            const cleanP = sanitizePatientProfiles(d.patientProfiles);
            setPatientProfiles(cleanP);
            safeLocalStorageSet('ruh_patients_v3', cleanP);
          }
          if (d.leaderboardDonors) {
            setLeaderboardDonors((prev) => {
              const serverReceipts = new Set(d.leaderboardDonors.map((x: any) => x.receiptNumber));
              const pendingLocal = prev.filter((x: any) => !serverReceipts.has(x.receiptNumber));
              const merged = [...pendingLocal, ...d.leaderboardDonors];
              safeLocalStorageSet('ruh_donors_v3', merged);
              return merged;
            });
          }
          if (d.childSpotlights) {
            const cleanSpot = sanitizeSpotlights(d.childSpotlights);
            setChildSpotlights(cleanSpot);
            safeLocalStorageSet('ruh_child_spotlights_v3', cleanSpot);
          }
          if (d.wardProfiles && Array.isArray(d.wardProfiles)) {
            const cleanWard = sanitizeWardProfiles(d.wardProfiles);
            setWardProfiles(cleanWard);
            safeLocalStorageSet('ruh_ward_profiles_v2', cleanWard);
          }
          if (d.mediaPhotosRow1) setMediaPhotosRow1(d.mediaPhotosRow1);
          if (d.mediaPhotosRow2) setMediaPhotosRow2(d.mediaPhotosRow2);
          if (d.foundationStats) setFoundationStats(d.foundationStats);
          if (d.scheduleEvents && Array.isArray(d.scheduleEvents)) {
            setScheduleEvents(d.scheduleEvents);
            safeLocalStorageSet('ruh_schedule_v3', d.scheduleEvents);
          }
          if (d.galleryItems && Array.isArray(d.galleryItems)) {
            const cleanG = sanitizeGalleryItems(d.galleryItems);
            setGalleryItems(cleanG);
            safeLocalStorageSet('ruh_gallery_items_v2', cleanG);
          }
          if (d.heroContent) setHeroContent(d.heroContent);
          if (d.storyContent) setStoryContent(d.storyContent);
          if (d.partnerHospitals) setPartnerHospitals(d.partnerHospitals);
          if (d.receiptConfig) setReceiptConfig(d.receiptConfig);
          if (d.volunteers && Array.isArray(d.volunteers)) setVolunteers(d.volunteers);
          if (d.inaugurationConfig) {
            setInaugurationConfig(d.inaugurationConfig);
            safeLocalStorageSet('ruh_inauguration_config_v1', d.inaugurationConfig);
          }
          if (serverRes.lastUpdated) setServerSyncTime(serverRes.lastUpdated);
          console.log('✅ Synchronized real photos and data from server disk.');
        } else if (hasCustomUploadedContent()) {
          // This browser (e.g. PC) has custom photos in localStorage! Push them to server!
          console.log('📤 Found custom uploaded photos in local storage. Pushing to server disk...');
          handlePushToServer();
        }
      } catch (err) {
        console.warn('Initial server sync check failed:', err);
      }
    };

    runInitialSync();
  }, [handlePushToServer]);

  // Periodic polling & Window Focus sync (ensures tablet receives updates made on PC in real-time)
  useEffect(() => {
    const checkServerUpdates = async () => {
      try {
        const serverRes = await fetchServerState();
        if (
          serverRes.initialized &&
          serverRes.data &&
          serverRes.lastUpdated &&
          serverRes.lastUpdated > serverSyncTime
        ) {
          const d = serverRes.data;
          if (d.driveItems) setDriveItems(sanitizeDriveItems(d.driveItems));
          if (d.patientProfiles) {
            const cleanP = sanitizePatientProfiles(d.patientProfiles);
            setPatientProfiles(cleanP);
            safeLocalStorageSet('ruh_patients_v3', cleanP);
          }
          if (d.leaderboardDonors) {
            setLeaderboardDonors((prev) => {
              const serverReceipts = new Set(d.leaderboardDonors.map((x: any) => x.receiptNumber));
              const pendingLocal = prev.filter((x: any) => !serverReceipts.has(x.receiptNumber));
              return [...pendingLocal, ...d.leaderboardDonors];
            });
          }
          if (d.childSpotlights) {
            const cleanSpot = sanitizeSpotlights(d.childSpotlights);
            setChildSpotlights(cleanSpot);
            safeLocalStorageSet('ruh_child_spotlights_v3', cleanSpot);
          }
          if (d.wardProfiles && Array.isArray(d.wardProfiles)) {
            const cleanWard = sanitizeWardProfiles(d.wardProfiles);
            setWardProfiles(cleanWard);
            safeLocalStorageSet('ruh_ward_profiles_v2', cleanWard);
          }
          if (d.mediaPhotosRow1) setMediaPhotosRow1(d.mediaPhotosRow1);
          if (d.mediaPhotosRow2) setMediaPhotosRow2(d.mediaPhotosRow2);
          if (d.foundationStats) setFoundationStats(d.foundationStats);
          if (d.scheduleEvents && Array.isArray(d.scheduleEvents)) {
            setScheduleEvents(d.scheduleEvents);
            safeLocalStorageSet('ruh_schedule_v3', d.scheduleEvents);
          }
          if (d.galleryItems && Array.isArray(d.galleryItems)) {
            const cleanG = sanitizeGalleryItems(d.galleryItems);
            setGalleryItems(cleanG);
            safeLocalStorageSet('ruh_gallery_items_v2', cleanG);
          }
          if (d.heroContent) setHeroContent(d.heroContent);
          if (d.storyContent) setStoryContent(d.storyContent);
          if (d.partnerHospitals) setPartnerHospitals(d.partnerHospitals);
          if (d.receiptConfig) setReceiptConfig(d.receiptConfig);
          if (d.volunteers && Array.isArray(d.volunteers)) setVolunteers(d.volunteers);
          if (d.inaugurationConfig) {
            setInaugurationConfig(d.inaugurationConfig);
            safeLocalStorageSet('ruh_inauguration_config_v1', d.inaugurationConfig);
          }
          setServerSyncTime(serverRes.lastUpdated);
          console.log('🔄 Tablet received real-time updates from server.');
        }
      } catch {
        // silent fail
      }
    };

    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        checkServerUpdates();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);
    const interval = setInterval(checkServerUpdates, 8000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
      clearInterval(interval);
    };
  }, [serverSyncTime]);

  // Reset to Factory Defaults
  const handleResetToDefaults = () => {
    localStorage.clear();
    setDriveItems(DRIVE_ITEMS);
    setPatientProfiles(PATIENT_PROFILES);
    setLeaderboardDonors(INITIAL_LEADERBOARD_DONORS);
    setChildSpotlights(INITIAL_CHILD_SPOTLIGHTS);
    setMediaPhotosRow1(INITIAL_MEDIA_CARDS_ROW_1);
    setMediaPhotosRow2(INITIAL_MEDIA_CARDS_ROW_2);
    setFoundationStats(INITIAL_FOUNDATION_STATS);
    setScheduleEvents(INITIAL_SEVA_SCHEDULE);
    setHeroContent(INITIAL_HERO_CONTENT);
    setStoryContent(INITIAL_STORY_CONTENT);
    setPartnerHospitals(PARTNER_HOSPITALS);
    // Also push clean defaults to server
    pushServerState({
      driveItems: DRIVE_ITEMS,
      patientProfiles: PATIENT_PROFILES,
      leaderboardDonors: INITIAL_LEADERBOARD_DONORS,
      childSpotlights: INITIAL_CHILD_SPOTLIGHTS,
      mediaPhotosRow1: INITIAL_MEDIA_CARDS_ROW_1,
      mediaPhotosRow2: INITIAL_MEDIA_CARDS_ROW_2,
      foundationStats: INITIAL_FOUNDATION_STATS,
      scheduleEvents: INITIAL_SEVA_SCHEDULE,
      heroContent: INITIAL_HERO_CONTENT,
      storyContent: INITIAL_STORY_CONTENT,
      partnerHospitals: PARTNER_HOSPITALS,
    });
  };

  const [selectedDriveItem, setSelectedDriveItem] = useState<DriveItem | null>(DRIVE_ITEMS[0]);
  const [initialCheckoutData, setInitialCheckoutData] = useState<{
    name: string;
    phone: string;
    quantity: number;
    scheduledDate?: string;
    hospitalName?: string;
    occasionNote?: string;
    customBreakdown?: string;
  }>({
    name: '',
    phone: '',
    quantity: 20,
  });

  // Cart state for multi-item sponsorship
  const [cartItems, setCartItems] = useState<CartItemEntry[]>([
    { item: DRIVE_ITEMS[0], quantity: 20 },
  ]);

  const handleOpenCheckout = (
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
  ) => {
    setSelectedDriveItem(item || driveItems[0] || DRIVE_ITEMS[0]);
    if (initialData) {
      setInitialCheckoutData(initialData);
    } else {
      setInitialCheckoutData({
        name: currentUser?.fullName || '',
        phone: currentUser?.phone || '',
        quantity: 20,
      });
    }
    setCheckoutModalOpen(true);
  };

  const handleConfirmCustomBundle = (bundleItem: DriveItem, checkoutData: {
    name: string;
    phone: string;
    quantity: number;
    scheduledDate: string;
    hospitalName: string;
    occasionNote: string;
    customBreakdown: string;
  }) => {
    setCustomDateModalOpen(false);
    setSelectedDriveItem(bundleItem);
    setInitialCheckoutData({
      name: checkoutData.name,
      phone: checkoutData.phone,
      quantity: 1,
      scheduledDate: checkoutData.scheduledDate,
      hospitalName: checkoutData.hospitalName,
      occasionNote: checkoutData.occasionNote,
      customBreakdown: checkoutData.customBreakdown,
    });
    setCheckoutModalOpen(true);
  };

  // Cart handlers
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((entry) => {
          if (entry.item.id === id) {
            const nextQty = entry.quantity + delta;
            return nextQty > 0 ? { ...entry, quantity: nextQty } : null;
          }
          return entry;
        })
        .filter((entry): entry is CartItemEntry => entry !== null)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((entry) => entry.item.id !== id));
  };

  const handleCartProceed = () => {
    setCartDrawerOpen(false);
    if (cartItems.length > 0) {
      const firstEntry = cartItems[0];
      handleOpenCheckout(firstEntry.item, {
        name: currentUser?.fullName || '',
        phone: currentUser?.phone || '',
        quantity: firstEntry.quantity,
      });
    } else {
      handleOpenCheckout(driveItems[0] || DRIVE_ITEMS[0]);
    }
  };

  // Real-time Leaderboard Dispatch on Donation Success
  const handleDonationSuccess = (newDonor: LeaderboardDonor) => {
    setLeaderboardDonors((prev) => {
      const updated = [newDonor, ...prev.filter((d) => d.id !== newDonor.id && d.receiptNumber !== newDonor.receiptNumber)];
      safeLocalStorageSet('ruh_donors_v3', updated);
      return updated;
    });
  };

  // Child Spotlight Sponsor Action
  const handleSponsorChildWarrior = (child: ChildSpotlightProfile) => {
    const dummyItem: DriveItem = {
      id: `child-${child.id}`,
      name: `Support ${child.name}`,
      tagline: `${child.category} • ${child.location}`,
      category: 'hospital',
      price: child.suggestedDonation,
      unitLabel: child.unitLabel,
      targetCount: 'Direct Relief',
      deliveredCount: child.stat,
      percentage: 95,
      color: '#084c36',
      badge: 'Child Beneficiary',
      description: child.story,
      impactMetrics: child.criticalNeeds.join('; '),
      options: {
        primary: child.unitLabel,
        secondary: 'Full Month Care',
      },
    };
    handleOpenCheckout(dummyItem, {
      name: currentUser?.fullName || '',
      phone: currentUser?.phone || '',
      quantity: 1,
    });
  };

  const handleNavigateView = (view: AppView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    /* Outer wrapper layout */
    <div className="min-h-screen w-full bg-[#ededed] p-2 sm:p-4 font-sans antialiased text-neutral-900 selection:bg-[#084c36] selection:text-white relative overflow-x-hidden">
      
      {/* 1. Cinematic Opening Intro Sequence */}
      {showPreloader && (
        <PreloaderIntro
          onComplete={handlePreloaderComplete}
          isInaugurationMode={inaugurationConfig.enabled}
          developerName={inaugurationConfig.developerName}
          inaugurationTitle={inaugurationConfig.inaugurationTitle}
        />
      )}

      {/* Ambient Animated Luxury Background Canvas */}
      <AmbientBackgroundCanvas />

      {/* Live Real Verified Recent Donations Activity Ticker */}
      <RecentDonationsTicker
        donors={leaderboardDonors}
        isEnabled={showDonationTicker}
      />

      {/* =========================================================
          MULTI-PAGE ROUTER (CLEAN STANDALONE DEDICATED SUBPAGES)
          ========================================================= */}
      {activeView === 'home' && (
        <HomePage
          isIntroReady={!showPreloader}
          childLeft={childSpotlights.left}
          childRight={childSpotlights.right}
          leftProfiles={wardProfiles}
          rightProfiles={wardProfiles}
          onSelectChild={(child) => {
            setSelectedChildSpotlight(child);
            setChildSpotlightModalOpen(true);
          }}
          onOpenSponsorModal={handleOpenCheckout}
          onOpenCart={() => setCartDrawerOpen(true)}
          onNavigateView={handleNavigateView}
          onOpenAdmin={() => setAdminPortalOpen(true)}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          currentUser={currentUser}
          cartCount={totalCartCount}
          mediaPhotosRow1={mediaPhotosRow1}
          mediaPhotosRow2={mediaPhotosRow2}
          language={language}
          onChangeLanguage={handleLanguageChange}
          onOpenCustomDateModal={() => setCustomDateModalOpen(true)}
          heroContent={heroContent}
          storyContent={storyContent}
          driveItems={driveItems}
        />
      )}

      {activeView !== 'home' && (
        <Navbar
          logoUrl={heroContent?.logoUrl}
          onOpenSponsorModal={() => handleOpenCheckout()}
          onOpenRecruitment={() => handleNavigateView('volunteer')}
          onOpenCart={() => setCartDrawerOpen(true)}
          onNavigateView={handleNavigateView}
          onOpenAdmin={() => setAdminPortalOpen(true)}
          currentUser={currentUser}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          cartCount={totalCartCount}
          activeView={activeView}
          language={language}
          onChangeLanguage={handleLanguageChange}
        />
      )}

      {activeView === 'ekadashi' && (
        <EkadashiPage
          onBackToHome={() => handleNavigateView('home')}
          scheduleEvents={scheduleEvents}
          hospitals={partnerHospitals}
          onOpenSponsorModal={handleOpenCheckout}
          onOpenAdmin={() => setAdminPortalOpen(true)}
        />
      )}

      {activeView === 'cancer-warriors' && (
        <CancerWarriorsPage
          onBackToHome={() => handleNavigateView('home')}
          patients={patientProfiles}
          donors={leaderboardDonors}
          onSponsorPatient={(item, init) => handleOpenCheckout(item, init)}
          onOpenAdmin={() => setAdminPortalOpen(true)}
        />
      )}

      {activeView === 'education' && (
        <EducationLivelihoodPage
          driveItems={driveItems}
          onBackToHome={() => handleNavigateView('home')}
          onOpenSponsorModal={handleOpenCheckout}
          onOpenAdmin={() => setAdminPortalOpen(true)}
        />
      )}

      {activeView === 'gallery' && (
        <main className="relative z-10 w-full animate-in fade-in duration-300">
          <ImpactGallery
            galleryItems={galleryItems}
            onBackToHome={() => handleNavigateView('home')}
            onSponsorItem={(item) => handleOpenCheckout(item)}
            onOpenRecruitment={() => handleNavigateView('volunteer')}
          />
          <Footer onOpenAdmin={() => setAdminPortalOpen(true)} />
        </main>
      )}

      {activeView === 'volunteer' && (
        <VolunteerPage
          onBackToHome={() => handleNavigateView('home')}
          onOpenAdmin={() => setAdminPortalOpen(true)}
          onSubmitVolunteer={(newVol) => {
            setVolunteers((prev) => [newVol, ...prev]);
          }}
        />
      )}

      {/* =========================================================
          GLOBAL MODALS (ACCESSIBLE SEAMLESSLY FROM ANY PAGE)
          ========================================================= */}
      {/* Child Spotlight Modal */}
      <ChildSpotlightModal
        isOpen={childSpotlightModalOpen}
        onClose={() => setChildSpotlightModalOpen(false)}
        child={selectedChildSpotlight}
        onSponsorChild={handleSponsorChildWarrior}
      />

      {/* Custom Seva Date & Multi-Item Builder Modal */}
      <CustomSevaDateBuilderModal
        isOpen={customDateModalOpen}
        onClose={() => setCustomDateModalOpen(false)}
        onConfirmBundleCheckout={handleConfirmCustomBundle}
        currentUser={currentUser}
        driveItems={driveItems}
      />

      {/* Master Admin Control Center Modal */}
      <AdminPortalModal
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
        inaugurationConfig={inaugurationConfig}
        setInaugurationConfig={setInaugurationConfig}
        onTriggerInaugurationPreview={() => {
          setAdminPortalOpen(false);
          setShowPreloader(true);
        }}
        driveItems={driveItems}
        setDriveItems={setDriveItems}
        patientProfiles={patientProfiles}
        setPatientProfiles={setPatientProfiles}
        leaderboardDonors={leaderboardDonors}
        setLeaderboardDonors={setLeaderboardDonors}
        childSpotlights={childSpotlights}
        setChildSpotlights={setChildSpotlights}
        wardProfiles={wardProfiles}
        setWardProfiles={setWardProfiles}
        mediaPhotosRow1={mediaPhotosRow1}
        setMediaPhotosRow1={setMediaPhotosRow1}
        mediaPhotosRow2={mediaPhotosRow2}
        setMediaPhotosRow2={setMediaPhotosRow2}
        foundationStats={foundationStats}
        setFoundationStats={setFoundationStats}
        scheduleEvents={scheduleEvents}
        setScheduleEvents={setScheduleEvents}
        galleryItems={galleryItems}
        setGalleryItems={setGalleryItems}
        heroContent={heroContent}
        setHeroContent={setHeroContent}
        storyContent={storyContent}
        setStoryContent={setStoryContent}
        partnerHospitals={partnerHospitals}
        setPartnerHospitals={setPartnerHospitals}
        receiptConfig={receiptConfig}
        setReceiptConfig={setReceiptConfig}
        volunteers={volunteers}
        setVolunteers={setVolunteers}
        showDonationTicker={showDonationTicker}
        setShowDonationTicker={handleToggleTicker}
        onResetToDefaults={handleResetToDefaults}
        onSyncToServer={handlePushToServer}
      />

      {/* Kinetic Reels Patient Portal Modal */}
      <PatientPortalModal
        isOpen={isPatientPortalOpen}
        onClose={() => setIsPatientPortalOpen(false)}
        donors={leaderboardDonors}
        onSponsorPatient={(patientItem, initData) => handleOpenCheckout(patientItem, initData)}
      />

      {/* Sponsorship Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleCartProceed}
      />

      {/* Razorpay & Direct UPI Payment Gateway Checkout Modal with 1-Page Print Receipt */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        item={selectedDriveItem}
        initialName={initialCheckoutData.name}
        initialPhone={initialCheckoutData.phone}
        initialQuantity={initialCheckoutData.quantity}
        scheduledDate={initialCheckoutData.scheduledDate}
        hospitalName={initialCheckoutData.hospitalName}
        occasionNote={initialCheckoutData.occasionNote}
        customBreakdown={initialCheckoutData.customBreakdown}
        currentUser={currentUser}
        receiptConfig={receiptConfig}
        onUpdateCurrentUser={(prof) => setCurrentUser(prof)}
        onDonationSuccess={handleDonationSuccess}
      />

      {/* Citizen Donor Passwordless OTP Login & Signup Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(prof) => setCurrentUser(prof)}
      />
    </div>
  );
}

export default App;
