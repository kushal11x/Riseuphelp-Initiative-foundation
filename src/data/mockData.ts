import type {
  DriveItem,
  PatientProfile,
  GalleryItem,
  LeaderboardDonor,
  ChildSpotlightProfile,
  MediaPhotoCard,
  FoundationStats,
  SevaScheduleEvent,
  HospitalNode,
  HeroContentConfig,
  StoryContentConfig,
  VolunteerSubmission,
} from '../types';

export const OFFICIAL_INFO = {
  name: "RiseUpHelp Initiative Foundation",
  shortName: "RiseUpHelp",
  handle: "@riseuphelp",
  instagramUrl: "https://instagram.com/riseuphelp",
  tagline: "True service isn't about charity, it's about holding hands.",
  subTagline: "Always There For You • Seva • Empathy • Impact",
  location: "Jaipur, Rajasthan",
  established: "2024",
  registrationType: "Section 8 Registered Non-Profit Foundation",
  cinNumber: "U88900RJ2024NPL093120",
  taxExemption: "80G & 12A Certified (50% Tax Exemption Receipts)",
  upiId: "9828291119@hdfc",
  phone: "+91 98282 91119",
  email: "support@riseuphelp.org",
  verificationNodeId: "RUH-JP-NODE-2026-X88",
  bankDetails: {
    accountName: "RiseUpHelp Initiative Foundation",
    accountNumber: "50200098282911",
    bankName: "HDFC Bank",
    ifscCode: "HDFC0000054",
    branch: "C-Scheme, Ashok Marg, Jaipur - 302001",
    accountType: "Section 8 Non-Profit Current Account",
  },
};

export const INITIAL_HERO_CONTENT: HeroContentConfig = {
  videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4",
  posterUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=60",
  badgeText: "JAIPUR NODE ACTIVE • SECTION 8 REGISTERED",
  title1: "Every Ekadashi,",
  title2: "Pure Bedside Seva",
  title3: "in Cancer Hospitals.",
  subtitle: "We personally cut fresh green coconuts bedside at State Cancer Medical College (RUHS) & SMS Hospital, sponsor chemotherapy for brave kids, and equip underprivileged students across Jaipur.",
  logoUrl: "/logo.png",
  showFrames: true,
  frameTheme: 'matte-white',
  frameStrap: 'standard',
  frameMotion: 'gentle',
  frameAutoRotate: true,
};

export const INITIAL_STORY_CONTENT: StoryContentConfig = {
  missionTitle: "Redefining Clinical Care & Educational Dignity in",
  missionHighlight: "Rajasthan.",
  storyQuote: "Seva • Empathy • Impact — Always There For You",
  paragraph1: "Founded in Jaipur, RiseUpHelp Initiative Foundation [Help__by__riseup (@riseuphelp)] was born out of a fundamental human observation: during prolonged medical battles and underprivileged schooling, it is the simple, dignified essentials that sustain hope.",
  harEkadashiVow: "Every single Ekadashi, our youth volunteers arrive bedside at SMS & RUHS hospitals with hygiene-inspected green coconuts, cold-pressed juices, and fresh ration kits for families camping outside ICU corridors.",
  ethosImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1000&q=80",
  establishedText: "2024 • JAIPUR APEX NODE",
};

export const INITIAL_FOUNDATION_STATS: FoundationStats = {
  coconutsDelivered: "1,94,700+",
  schoolBagsDistributed: "6,400+",
  activeVolunteers: "100+ (20 in each of 5 Govt Hospitals)",
  mealsServed: "34,000+",
  totalBeneficiaries: "45,000+",
  cinNumber: "U88900RJ2024NPL093120",
  taxExemption: "80G & 12A Certified (50% Tax Exemption)",
  upiId: "9828291119@hdfc",
  phone: "+91 98282 91119",
  email: "support@riseuphelp.org"
};

export const PARTNER_HOSPITALS: HospitalNode[] = [
  {
    id: "hosp-ruhs",
    name: "State Cancer Medical College (RUHS Cancer Hospital)",
    category: "Government Apex Oncology Hub",
    specialty: "Comprehensive Chemotherapy, Pediatric Oncology & Bedside Coconut Seva",
    location: "Pratap Nagar, Jaipur (Rajasthan Govt)",
    bedsideCapacity: "450+ Oncology Beds",
    verificationNode: "RUH-NODE-RUHS-01"
  },
  {
    id: "hosp-sms",
    name: "Sawai Man Singh (SMS) Medical College & Hospital",
    category: "State Premier Government Medical Center",
    specialty: "Government Oncology Daycare, Surgery Wards & Nutrient Pomegranate Rations",
    location: "JLN Marg, Jaipur (Rajasthan Govt)",
    bedsideCapacity: "3,200+ Beds",
    verificationNode: "RUH-NODE-SMS-02"
  },
  {
    id: "hosp-jklon",
    name: "JK Lon Government Mother & Child Hospital (SMS Attached)",
    category: "Premier Government Pediatric Wing",
    specialty: "Pediatric Cancer, Rare Blood Disorders & Slum Child Nutrition",
    location: "JLN Marg, Jaipur (Rajasthan Govt)",
    bedsideCapacity: "850+ Pediatric Beds",
    verificationNode: "RUH-NODE-JKLON-03"
  },
  {
    id: "hosp-mahila",
    name: "Mahila Chikitsalaya (Government Super Specialty Hospital)",
    category: "Government Maternal & Pediatric Care",
    specialty: "Women & Child Oncology Nutrition, Dialysis Support & Blood Transfusions",
    location: "Sanganeri Gate, Jaipur (Rajasthan Govt)",
    bedsideCapacity: "650+ Beds",
    verificationNode: "RUH-NODE-MAHILA-04"
  },
  {
    id: "hosp-zenana",
    name: "Zenana Government Hospital (SMS Medical Attached)",
    category: "Government Oncology Care Unit",
    specialty: "Free Bedside Nutrition & Chemotherapy Electrolyte Support",
    location: "Station Road, Jaipur (Rajasthan Govt)",
    bedsideCapacity: "500+ Beds",
    verificationNode: "RUH-NODE-ZENANA-05"
  }
];

export const INITIAL_SEVA_SCHEDULE: SevaScheduleEvent[] = [
  {
    id: "seva-ekadashi-parsva",
    title: "Upcoming Parsva (Parivartini) Ekadashi Hospital Drive",
    tithi: "Parsva / Parivartini Ekadashi (Bhadrapada Shukla)",
    date: "Sep 22, 2026",
    hospital: "State Cancer Medical College (RUHS), Jaipur",
    timing: "12:00 PM - 04:00 PM",
    targetCoconuts: 3000,
    sponsoredCoconuts: 150,
    status: "upcoming",
    description: "Next immediate bedside tender coconut delivery and electrolyte hydration drive for chemotherapy cancer patients across RUHS wards. Timing: 12:00 PM - 04:00 PM."
  },
  {
    id: "seva-ekadashi-indira",
    title: "Upcoming Indira Ekadashi Bedside Seva",
    tithi: "Indira Ekadashi Vow (Ashwin Krishna)",
    date: "Oct 6, 2026",
    hospital: "State Cancer Medical College (RUHS) & SMS Hospital",
    targetCoconuts: 3800,
    sponsoredCoconuts: 1420,
    status: "upcoming",
    description: "Bi-monthly oncology hydration vow ensuring every chemo patient receives natural potassium & electrolyte hydration straight from fresh green coconuts."
  },
  {
    id: "seva-ekadashi-papankusha",
    title: "Upcoming Papankusha Ekadashi Maha Seva",
    tithi: "Papankusha Ekadashi Vow (Ashwin Shukla)",
    date: "Oct 22, 2026",
    hospital: "RUHS State Cancer College & JK Lon Children Wing",
    targetCoconuts: 4200,
    sponsoredCoconuts: 850,
    status: "upcoming",
    description: "Specialized pediatric & adult oncology drive distributing bedside tender coconuts, antioxidant fruit packs, and comfort blankets."
  },
  {
    id: "seva-ekadashi-rama",
    title: "Upcoming Rama Ekadashi Seva Drive",
    tithi: "Rama Ekadashi Vow (Kartik Krishna)",
    date: "Nov 5, 2026",
    hospital: "State Cancer Medical College (RUHS), Jaipur",
    targetCoconuts: 4500,
    sponsoredCoconuts: 620,
    status: "upcoming",
    description: "Pre-Diwali hospital bedside hydration drive providing natural comfort to patients spending festive weeks inside oncology wards."
  },
  {
    id: "seva-ekadashi-devutthana",
    title: "Devutthana (Prabodhini) Ekadashi Maha Yagya Seva",
    tithi: "Devutthana Ekadashi (Kartik Shukla)",
    date: "Nov 20, 2026",
    hospital: "All Partner Government Hospitals Across Jaipur",
    targetCoconuts: 6000,
    sponsoredCoconuts: 1800,
    status: "upcoming",
    description: "Annual Grand Seva Vow targeting 6,000+ fresh coconuts across RUHS State Cancer Institute, SMS Hospital, JK Lon Government Children Hospital, and Mahila Chikitsalaya."
  },
  {
    id: "seva-ekadashi-utpanna",
    title: "Upcoming Utpanna Ekadashi Seva Drive",
    tithi: "Utpanna Ekadashi Vow (Margashirsha Krishna)",
    date: "Dec 4, 2026",
    hospital: "State Cancer Medical College (RUHS), Jaipur",
    targetCoconuts: 4000,
    sponsoredCoconuts: 310,
    status: "upcoming",
    description: "Winter bedside hydration drive providing sterile green tender coconuts and warm nutritional soups for chemotherapy recovery."
  },
  {
    id: "seva-ekadashi-mokshada",
    title: "Mokshada Ekadashi & Gita Jayanti Maha Seva",
    tithi: "Mokshada / Vaikuntha Ekadashi (Margashirsha Shukla)",
    date: "Dec 20, 2026",
    hospital: "State Cancer Medical College (RUHS) & SMS Hospital",
    targetCoconuts: 5500,
    sponsoredCoconuts: 450,
    status: "upcoming",
    description: "Year-end sacred Ekadashi distribution delivering whole green coconuts and high-protein nutrition directly bedside."
  }
];

export const RUHS_CHILDREN_WARD_PROFILES: ChildSpotlightProfile[] = [
  {
    id: "spotlight-lovekush",
    name: "Lovekush Jatav (Lovkush)",
    age: 13,
    gender: "Male",
    category: "RUHS Children Ward",
    title: "Blood Cancer • Bed No. 3",
    location: "RUHS Hospital, Jaipur",
    bedNumber: "Bed No. 3",
    guardianName: "Rise Up Bedside Patient Support",
    guardianPhone: "9828291119",
    duration: "Admitted last 6 months",
    monthlyNeed: 20000,
    suggestedDonation: 20000,
    unitLabel: "Monthly Chemotherapy Protocol Care",
    stat: "Bed No. 3 • Age 13",
    image: "/uploads/upload_1788854883629_8bda525a0f.jpg",
    story: "13-year-old Lovekush Jatav has been admitted in RUHS Children Ward Bed No. 3 for the last 6 months battling blood cancer. His family has exhausted all savings and urgently needs ₹20,000 monthly for targeted chemotherapy, sterile bedside hydration, and critical clinical care.",
    criticalNeeds: [
      "Targeted blood cancer chemotherapy cycles",
      "Daily whole green tender coconut hydration bedside",
      "Specialized pediatric oncology antibiotics",
      "Sterile clinical care and patient attendant support"
    ],
    verificationNode: "RUH-RUHS-LK13-B3"
  },
  {
    id: "spotlight-aru",
    name: "Aru (Arru)",
    age: 7,
    gender: "Male",
    category: "RUHS Children Ward",
    title: "Blood Cancer • Bed No. 1",
    location: "RUHS State Cancer Hospital, Pediatric Ward 4",
    bedNumber: "Bed No. 1",
    guardianName: "Rise Up Bedside Patient Support",
    guardianPhone: "9828291119",
    duration: "Under active chemotherapy",
    monthlyNeed: 20000,
    suggestedDonation: 20000,
    unitLabel: "Pediatric Leukemia Protocol Care",
    stat: "Bed No. 1 • Age 7",
    image: "/uploads/upload_1788854883630_6eb02e090b.jpg",
    story: "7-year-old Aru is fighting acute lymphoblastic leukemia with an inspiring brave smile. His father is a daily-wage e-rickshaw driver in Jaipur whose earnings cannot sustain intensive high-potency chemotherapy regimens. Your support provides fresh whole coconut electrolyte hydration cut bedside daily at RUHS, sterile comfort packs, and targeted chemotherapeutic medicines.",
    criticalNeeds: [
      "High-potency leukemia chemotherapy protocol",
      "Daily fresh tender coconut electrolyte hydration bedside",
      "Sterile pediatric comfort packs & nutritional support",
      "Emergency transfusion & intensive care backing"
    ],
    verificationNode: "RUH-RUHS-AR07-B1"
  },
  {
    id: "spotlight-pari-singh",
    name: "Pari Singh (Pari)",
    age: 12,
    gender: "Female",
    category: "RUHS Children Ward",
    title: "Blood Cancer • Bed No. 4",
    location: "Dholpur (RUHS Children Ward, Jaipur)",
    bedNumber: "Bed No. 4",
    guardianName: "Rise Up Bedside Patient Support",
    guardianPhone: "9828291119",
    duration: "Admitted last 2 months",
    monthlyNeed: 20000,
    suggestedDonation: 20000,
    unitLabel: "Monthly Leukemia Protocol Care",
    stat: "Bed No. 4 • Dholpur",
    image: "/uploads/IMG20260827153940_1789291836489_078fa0d76d.jpg",
    story: "12-year-old Pari Singh traveled from Dholpur to Jaipur and has been admitted in RUHS Children Ward Bed No. 4 for the last 2 months battling blood cancer. Her family is managing treatment with great hardship in Jaipur. The monthly clinical requirement is ₹20,000 for systemic chemo drugs, electrolytes, and supportive therapy. For verified hospital records or to sponsor bedside care, contact Rise Up Helpline at +91 98282 91119.",
    criticalNeeds: [
      "Systemic blood cancer chemotherapy cycles",
      "Sterile electrolyte & fresh fruit bedside hydration",
      "Specialized pediatric oncology antibiotics",
      "Supportive bedside care and companion assistance"
    ],
    verificationNode: "RUH-RUHS-PS12-B4"
  },
  {
    id: "spotlight-rocky-singh",
    name: "Rocky Singh (Rocky)",
    age: 4,
    gender: "Male",
    category: "RUHS Children Ward",
    title: "Pediatric Cancer Fighter",
    location: "Kotputli-Behror (RUHS Hospital)",
    bedNumber: "RUHS Children Ward",
    guardianName: "Rise Up Bedside Patient Support",
    guardianPhone: "9828291119",
    duration: "Admitted last 25 days",
    monthlyNeed: 15000,
    suggestedDonation: 15000,
    unitLabel: "Toddler Oncology Comfort & Care",
    stat: "Age 4 • Kotputli-Behror",
    image: "/uploads/WhatsApp_Image_2026-09-12_at_3_1789291780722_06ff628682.jpg",
    story: "Little 4-year-old Rocky Singh from a humble farming family in Kotputli-Behror has been admitted at RUHS Children Ward for the last 25 days battling pediatric cancer. His family urgently needs compassionate sponsorship of ₹15,000 monthly to sustain his toddler oncology protocol. For hospital verification or bedside adoption, contact Rise Up Helpline at +91 98282 91119.",
    criticalNeeds: [
      "Pediatric oncology infusions & anti-infective formulations",
      "Daily whole green tender coconut hydration bedside",
      "High-protein toddler milk supplements",
      "Sterile comfort blankets and hospital recovery packs"
    ],
    verificationNode: "RUH-RUHS-RS04-KP"
  }
];

export const SPOTLIGHT_LEFT_PROFILES: ChildSpotlightProfile[] = [
  RUHS_CHILDREN_WARD_PROFILES[0], // Lovekush Jatav
  RUHS_CHILDREN_WARD_PROFILES[1], // Aru
  RUHS_CHILDREN_WARD_PROFILES[2], // Pari Singh
  RUHS_CHILDREN_WARD_PROFILES[3], // Rocky Singh
];

export const SPOTLIGHT_RIGHT_PROFILES: ChildSpotlightProfile[] = [
  RUHS_CHILDREN_WARD_PROFILES[1], // Aru
  RUHS_CHILDREN_WARD_PROFILES[0], // Lovekush Jatav
  RUHS_CHILDREN_WARD_PROFILES[2], // Pari Singh
  RUHS_CHILDREN_WARD_PROFILES[3], // Rocky Singh
];

export const INITIAL_CHILD_SPOTLIGHTS: { left: ChildSpotlightProfile; right: ChildSpotlightProfile } = {
  left: SPOTLIGHT_LEFT_PROFILES[0], // Lovekush Jatav
  right: SPOTLIGHT_RIGHT_PROFILES[0] // Aru
};

export const DRIVE_ITEMS: DriveItem[] = [
  {
    id: "coconut-water",
    name: "Fresh Whole Tender Coconut",
    tagline: "Every Ekadashi Vow • Government Cancer Hospital (RUHS)",
    category: "hospital",
    price: 65,
    unitLabel: "Fresh Coconut",
    targetCount: "215K Target",
    deliveredCount: "194.7K Delivered",
    percentage: 91,
    color: "#084c36",
    badge: "100% Direct Sourced",
    image: "/uploads/nariyal_pani_fresh_coconut.jpg",
    description: "Whole green tender coconuts cut and opened fresh in front of cancer patients at State Cancer Medical College (RUHS) and SMS Hospitals with sterile eco-straws.",
    impactMetrics: "194,700+ fresh coconuts cut bedside for patients battling chemotherapy and trauma recovery.",
    options: {
      primary: "Fresh Coconut",
      secondary: "Immunity Packs"
    },
    status: "active"
  },
  {
    id: "pomegranate-meal",
    name: "Wholesome Hospital Meal Box",
    tagline: "Daily Hospital Drives • SMS & JK Lon",
    category: "hospital",
    price: 70,
    unitLabel: "Meal Box",
    targetCount: "50K Target",
    deliveredCount: "34K Delivered",
    percentage: 68,
    color: "#084c36",
    badge: "Active Metrics",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    description: "Freshly cooked hygienic high-protein meal box containing roti, sabzi, dal, rice and salad for patient attendants and recovering individuals.",
    impactMetrics: "34,000+ wholesome nutritious meals distributed across Jaipur government healthcare centers.",
    options: {
      primary: "Meal Box",
      secondary: "Nutritional Pack"
    },
    status: "active"
  },
  {
    id: "immunity-packs",
    name: "Immunity Juice Packs (Citrus & Anar)",
    tagline: "Cold-Pressed Citrus & Anar • Chemo & Dialysis Support",
    category: "hospital",
    price: 65,
    unitLabel: "Juice Pack",
    targetCount: "100K Target",
    deliveredCount: "84K Delivered",
    percentage: 84,
    color: "#084c36",
    badge: "Pure Citrus & Anar",
    image: "/uploads/immunity_packs_citrus_anar.jpg",
    description: "Pure cold-pressed fresh Citrus (Orange, Lemon, Mosambi) and Anar juice packs served bedside in government oncology and dialysis wards.",
    impactMetrics: "84,000+ immunity packs delivered to chemotherapy patients.",
    options: {
      primary: "Immunity Packs",
      secondary: "Citrus & Anar Juice"
    },
    status: "active"
  },
  {
    id: "anar-juice",
    name: "Pure Cold-Pressed Anar (Pomegranate) Juice",
    tagline: "Antioxidant & Platelet Boost • SMS & RUHS",
    category: "hospital",
    price: 70,
    unitLabel: "Juice Bottle",
    targetCount: "60K Target",
    deliveredCount: "48K Delivered",
    percentage: 80,
    color: "#084c36",
    badge: "100% Pure Pomegranate",
    image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=600&q=80",
    description: "100% pure cold-pressed fresh pomegranate juice served bedside in government oncology and dialysis wards.",
    impactMetrics: "48,000+ bottles delivered to chemotherapy patients.",
    options: {
      primary: "Anar Juice",
      secondary: "Pomegranate"
    },
    status: "active"
  },
  {
    id: "beetroot-juice",
    name: "Fresh Beetroot & Carrot Detox Juice",
    tagline: "Hemoglobin & Iron Booster for Cancer Patients",
    category: "hospital",
    price: 60,
    unitLabel: "Juice Bottle",
    targetCount: "40K Target",
    deliveredCount: "28K Delivered",
    percentage: 70,
    color: "#084c36",
    badge: "Natural Iron Boost",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    description: "Fresh cold-pressed beetroot, carrot, and amla juice to help patients restore hemoglobin levels naturally during chemotherapy cycles.",
    impactMetrics: "28,000+ iron booster juices served across government cancer wards.",
    options: {
      primary: "Beetroot Juice",
      secondary: "Carrot Amla"
    },
    status: "active"
  },
  {
    id: "school-bags",
    name: "School Bag & Complete Stationery Kit",
    tagline: "All Slum Children & Students Education Drive",
    category: "education",
    price: 899,
    unitLabel: "Complete Kit",
    targetCount: "8K Target",
    deliveredCount: "6.4K Delivered",
    percentage: 80,
    color: "#0e6245",
    badge: "100% Verified",
    image: "/uploads/riseup_bag_with_stationery_kit.jpg",
    description: "Durable waterproof school bags loaded with notebooks, DOMS color pencils, Pentonic pens, water bottle, lunch box, and complete stationery kit for underprivileged children across Jaipur government schools and slum education cells.",
    impactMetrics: "6,400+ underprivileged children equipped with dignity and academic tools.",
    options: {
      primary: "Full Bag & Stationery Kit",
      secondary: "Stationery Pack"
    },
    status: "active"
  },
  {
    id: "hospital-wheelchair",
    name: "Foldable Hospital Grade Wheelchair",
    tagline: "Mobility Aid for Trauma & Cancer Patients",
    category: "hospital",
    price: 4200,
    unitLabel: "Wheelchair Unit",
    targetCount: "250 Target",
    deliveredCount: "180 Delivered",
    percentage: 72,
    color: "#084c36",
    badge: "Clinical Standard",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
    description: "Heavy-duty ISO certified foldable wheelchairs placed in government cancer OPDs and trauma wards to transport weak patients safely.",
    impactMetrics: "180+ hospital wheelchairs actively easing mobility for cancer fighters in government hospitals.",
    options: {
      primary: "Full Wheelchair (₹4,200)",
      secondary: "Part Share (₹2,100)"
    },
    status: "active"
  },
  {
    id: "first-aid-kit",
    name: "First Aid & Emergency Treatment Kit",
    tagline: "Emergency Medical Supplies for Slum Families & Hospitals",
    category: "hospital",
    price: 450,
    unitLabel: "First-Aid Kit",
    targetCount: "2.5K Target",
    deliveredCount: "1.8K Delivered",
    percentage: 72,
    color: "#084c36",
    badge: "Emergency Care",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&q=80",
    description: "Complete clinical first aid & emergency treatment kits equipped with antiseptic lotion, burn ointment, sterile gauze, pediatric trauma bandages, and emergency relief supplies for slum children and patient attendants.",
    impactMetrics: "1,800+ emergency treatment kits deployed across underserved communities and hospital shelters.",
    options: {
      primary: "First-Aid Kit (₹450)",
      secondary: "Pack of 5 Kits (₹2,250)"
    },
    status: "active"
  },
  {
    id: "sewing-machine",
    name: "Sewing Machine & Training",
    tagline: "Vocational Livelihood for Widowed & Single Mothers",
    category: "education",
    price: 5500,
    unitLabel: "Machine & Kit",
    targetCount: "500 Target",
    deliveredCount: "320 Delivered",
    percentage: 64,
    color: "#7e22ce",
    badge: "Women Livelihood",
    image: "/uploads/ChatGPT_Image_Sep_13__2026__10_1789320630857_41143ed87d.jpg",
    description: "Heavy-duty motorized sewing machine and 6-month certified tailoring training to empower single and widowed mothers in Sanganer with dignified, independent earnings.",
    impactMetrics: "320+ women trained and equipped with motorized sewing machines.",
    options: {
      primary: "Full Machine (₹5,500)",
      secondary: "Training Share (₹550)"
    },
    status: "active"
  }
];

export const PATIENT_PROFILES: PatientProfile[] = [
  {
    id: "warrior-lovekush",
    name: "Lovekush Jatav",
    age: 13,
    gender: "Male",
    diagnosis: "Acute Leukemia • Bed No. 3",
    hospitalWard: "State Cancer Medical College (RUHS) Pediatric Ward",
    city: "Jaipur",
    image: "/uploads/upload_1788854883629_8bda525a0f.jpg",
    story: "13-year-old Lovekush has been admitted in RUHS Children Ward Bed No. 3 for the last 6 months battling blood cancer. His family has exhausted all lifetime savings and urgently needs ₹20,000 monthly for targeted chemotherapy, sterile bedside hydration, and critical clinical care. For verified records, bedside visits, or support, contact Rise Up via Instagram (@riseuphelp) or email support@riseuphelp.org.",
    medicalNeeds: [
      "Targeted leukemia chemotherapy infusions & anti-nausea meds",
      "Daily sterile tender coconut electrolyte hydration bedside at Bed 3",
      "Platelet and blood markers diagnostic monitoring kits",
      "Pediatric clinical nutrition & comfort blankets"
    ],
    targetAmount: 20000,
    fundedAmount: 14000,
    fundingPercentage: 70,
    cyclesCompleted: 5,
    totalCycles: 8,
    urgency: "Critical Priority",
    monthlyMedCost: 20000,
    verificationId: "RUH-MED-2026-LK13"
  },
  {
    id: "warrior-aarav",
    name: "Arru",
    age: 7,
    gender: "Male",
    diagnosis: "Blood Cancer (Leukemia) • Chemo Protocol • Bed No. 1",
    hospitalWard: "State Cancer Medical College (RUHS) Pediatric Ward 4",
    city: "Jaipur",
    image: "/uploads/upload_1788854883630_6eb02e090b.jpg",
    story: "7-year-old Arru is admitted in RUHS Pediatric Ward Bed No. 1 battling blood cancer. Arru loves drawing and coloring sketches (drawing karna bahut pasand hai), facing his regular chemotherapy cycles with an inspiring brave smile. His father works as a daily-wage e-rickshaw driver in Jaipur whose small earnings cannot sustain high-potency chemotherapy ampoules, platelet transfusions, and supportive bedside clinical care. For verified records or bedside visits, contact Rise Up via Instagram (@riseuphelp) or email support@riseuphelp.org.",
    medicalNeeds: [
      "Targeted Blood Cancer Chemotherapy Ampoules (Vincristine & Methotrexate)",
      "Drawing kit, color sketchbooks & bedside creative distraction therapy",
      "Single Donor Platelet (SDP) Transfusion Support",
      "Daily sterile tender coconut hydration bedside at RUHS Bed 1"
    ],
    targetAmount: 15000,
    fundedAmount: 11250,
    fundingPercentage: 75,
    cyclesCompleted: 4,
    totalCycles: 6,
    urgency: "Active Chemo Protocol",
    monthlyMedCost: 15000,
    verificationId: "RUH-MED-2026-AR07"
  },
  {
    id: "warrior-pari",
    name: "Pari Singh",
    age: 12,
    gender: "Female",
    diagnosis: "Blood Cancer Protocol • Bed No. 4",
    hospitalWard: "State Cancer Medical College (RUHS) Pediatric Ward",
    city: "Dholpur / Jaipur",
    image: "/uploads/upload_1788854883643_e4a411d682.jpg",
    story: "12-year-old Pari Singh traveled from Dholpur to Jaipur and has been admitted in RUHS Children Ward Bed No. 4 for the last 2 months battling blood cancer. Her family is managing treatment alone in Jaipur with great hardship. The monthly clinical requirement is ₹20,000 for systemic chemo drugs, electrolytes, and supportive therapy. For verified records or bedside visits, contact Rise Up via Instagram (@riseuphelp) or email support@riseuphelp.org.",
    medicalNeeds: [
      "Systemic blood cancer chemotherapy cycles",
      "Sterile electrolyte & fresh fruit bedside hydration",
      "Specialized pediatric oncology antibiotics",
      "Supportive bedside care and companion assistance"
    ],
    targetAmount: 20000,
    fundedAmount: 12000,
    fundingPercentage: 60,
    cyclesCompleted: 3,
    totalCycles: 6,
    urgency: "Active Chemo Protocol",
    monthlyMedCost: 20000,
    verificationId: "RUH-MED-2026-PS12"
  },
  {
    id: "warrior-rocky",
    name: "Rocky Singh",
    age: 4,
    gender: "Male",
    diagnosis: "Pediatric Oncology Protocol Support",
    hospitalWard: "State Cancer Medical College (RUHS) Toddler Oncology",
    city: "Kotputli-Behror / Jaipur",
    image: "/uploads/upload_1788854883635_8a4d2b5135.jpg",
    story: "Little 4-year-old Rocky Singh from a humble farming family in Kotputli-Behror has been admitted at RUHS Children Ward battling pediatric cancer. His family urgently needs compassionate sponsorship of ₹15,000 monthly to sustain his toddler oncology protocol. For hospital verification or bedside adoption, contact Rise Up via Instagram (@riseuphelp) or email support@riseuphelp.org.",
    medicalNeeds: [
      "Pediatric oncology infusions & anti-infective formulations",
      "Daily whole green tender coconut hydration bedside",
      "High-protein toddler milk supplements",
      "Sterile comfort blankets and hospital recovery packs"
    ],
    targetAmount: 15000,
    fundedAmount: 9500,
    fundingPercentage: 63,
    cyclesCompleted: 2,
    totalCycles: 6,
    urgency: "Critical Priority",
    monthlyMedCost: 15000,
    verificationId: "RUH-MED-2026-RS04"
  }
];

export const INITIAL_LEADERBOARD_DONORS: LeaderboardDonor[] = [
  {
    id: "lb-1",
    name: "Vikramaditya Singhania",
    batchCode: "RUH-BATCH-2026-X88",
    patientAdopted: "Lovekush Jatav (RUHS Bed No. 3 Lifeline)",
    amount: 20000,
    isVerified: true,
    timestamp: "12 mins ago",
    city: "Jaipur",
    receiptNumber: "RUH-80G-2026-981244",
    scheduledDate: "Aug 29, 2026 (Aja Ekadashi)"
  },
  {
    id: "lb-2",
    name: "Dr. Ananya Malhotra",
    batchCode: "RUH-BATCH-2026-X89",
    patientAdopted: "Arru (Bed 1 Care)",
    amount: 15000,
    isVerified: true,
    timestamp: "34 mins ago",
    city: "Jaipur",
    receiptNumber: "RUH-80G-2026-981243",
    scheduledDate: "Sep 13, 2026 (Padma Ekadashi)"
  },
  {
    id: "lb-3",
    name: "Rameshwar Prasad Kedia",
    batchCode: "RUH-BATCH-2026-X90",
    patientAdopted: "Pari Singh (RUHS Bed No. 4 Lifeline)",
    amount: 20000,
    isVerified: true,
    timestamp: "1 hour ago",
    city: "Jaipur",
    receiptNumber: "RUH-80G-2026-981240",
    scheduledDate: "Sep 28, 2026 (Indira Ekadashi)"
  },
  {
    id: "lb-4",
    name: "Pooja & Rohan Agarwal",
    batchCode: "RUH-BATCH-2026-X91",
    patientAdopted: "Rocky Singh (Toddler Oncology Protocol)",
    amount: 15000,
    isVerified: true,
    timestamp: "3 hours ago",
    city: "Jaipur",
    receiptNumber: "RUH-80G-2026-981236",
    scheduledDate: "Aug 29, 2026 (Aja Ekadashi)"
  },
  {
    id: "lb-5",
    name: "Siddharth Rajpurohit",
    batchCode: "RUH-BATCH-2026-X92",
    patientAdopted: "Arru (Chemo Share)",
    amount: 7500,
    isVerified: true,
    timestamp: "5 hours ago",
    city: "Jaipur",
    receiptNumber: "RUH-80G-2026-981231",
    scheduledDate: "Oct 13, 2026 (Papankusha Ekadashi)"
  },
  {
    id: "lb-6",
    name: "Kiran & Deepak Sharma",
    batchCode: "RUH-BATCH-2026-X93",
    patientAdopted: "Lovekush Jatav (Bedside Hydration Pool)",
    amount: 10000,
    isVerified: true,
    timestamp: "7 hours ago",
    city: "Jaipur",
    receiptNumber: "RUH-80G-2026-981225",
    scheduledDate: "Aug 29, 2026 (Aja Ekadashi)"
  }
];

export const INITIAL_MEDIA_CARDS_ROW_1: MediaPhotoCard[] = [
  {
    id: 'm1',
    title: 'Har Ekadashi Bedside Coconut Seva',
    category: 'State Cancer Hospital (RUHS)',
    location: 'State Cancer Medical College, Jaipur',
    image: '/uploads/ruhs_hospital_nariyal_seva_trolley.jpg',
    stats: '389,000+ Delivered',
    description: 'Fresh whole green tender coconuts cut and opened live bedside with sterile straws.',
    fullStory: 'Every single Ekadashi and daily morning rounds, our seva volunteers procure farm-fresh green tender coconuts, transport them bedside in State Cancer Medical College (RUHS) and SMS Hospital oncology wards, and cut them open in front of patients to deliver natural sterile hydration.',
    defaultPrice: 65,
    unitLabel: 'Fresh Coconut',
    driveItemIndex: 0,
  },
  {
    id: 'm2',
    title: 'Children School Bag & Complete Stationery Kit',
    category: 'All Children Education Cell',
    location: 'Govt School, Chhoti Chaupar, Jaipur',
    image: '/uploads/riseup_bag_with_stationery_kit.jpg',
    stats: '12,800+ Bags Distributed',
    description: 'Waterproof backpacks equipped with notebooks, DOMS color pencils, pens, bottle, lunch box, and complete stationery kit.',
    fullStory: 'Equipping all underprivileged children across Jaipur slum clusters with durable waterproof school bags, notebooks, geometry kits, and stationery to ensure zero school dropouts due to basic resource poverty.',
    defaultPrice: 899,
    unitLabel: 'School Kit',
    driveItemIndex: 2,
  },
  {
    id: 'm3',
    title: 'Women Sewing & Livelihood Workshops',
    category: 'Livelihood Hub',
    location: 'Sanganer Skill Center, Jaipur',
    image: '/uploads/ChatGPT_Image_Sep_13__2026__10_1789320630857_41143ed87d.jpg',
    stats: '420+ Women Trained',
    description: 'Vocational tailoring cells helping single mothers earn dignified household income.',
    fullStory: '6-month vocational tailoring and block-printing skill training empowering widowed and single mothers in Sanganer with motorized sewing machines to earn an independent livelihood.',
    defaultPrice: 500,
    unitLabel: 'Artisan Workshop Share',
  },
  {
    id: 'm4',
    title: 'Fresh Pomegranate Nutrient Rations',
    category: 'Daily Hospital Drives',
    location: 'SMS Medical College & Hospital, Jaipur',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',
    stats: '68,000+ Meal Boxes',
    description: 'Antioxidant-dense fresh fruit juice and wholesome protein meal rations for cancer patients.',
    fullStory: 'Freshly extracted unadulterated pomegranate juice with doctor-approved high-protein meal boxes delivered bedside to trauma recovery and oncology ward patients at SMS Hospital.',
    defaultPrice: 70,
    unitLabel: 'Nutrient Meal Box',
    driveItemIndex: 1,
  },
  {
    id: 'm5',
    title: 'Slum Weekend Digital Learning Cells',
    category: 'All Children Welfare',
    location: 'Kacchi Basti, Malviya Nagar, Jaipur',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    stats: '450+ Active Students',
    description: 'Foundational literacy and digital tablet mentorship sessions held for all slum children.',
    fullStory: 'Youth volunteers bring interactive digital learning tablets and STEM learning tools to bridge the foundational literacy and math divide for all slum children of daily-wage migrant laborers.',
    defaultPrice: 350,
    unitLabel: 'Digital Learning Kit',
  },
];

export const INITIAL_MEDIA_CARDS_ROW_2: MediaPhotoCard[] = [
  {
    id: 'm6',
    title: 'Daily Emergency Relief Node',
    category: 'Crisis Support',
    location: 'Jaipur Walled City Station',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    stats: '100% Direct Public Ledger',
    description: 'Immediate hydration and emergency rations dispatched within 45 minutes of alert.',
    fullStory: 'Rapid response volunteer squad providing immediate clean drinking water, glucose packs, and basic first-aid supplies to stranded families and emergency trauma cases across Jaipur.',
    defaultPrice: 200,
    unitLabel: 'Emergency Relief Unit',
  },
  {
    id: 'm7',
    title: 'State Cancer Hospital Patient Companion Care',
    category: 'Frontline Seva',
    location: 'State Cancer Medical College (RUHS), Jaipur',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80',
    stats: '2,400+ Active Volunteers',
    description: 'Trained youth volunteers holding hands and supporting cancer patients through chemo cycles.',
    fullStory: 'Our frontline companion volunteers hold hands with pediatric and adult patients battling chemotherapy at State Cancer Hospital RUHS, providing emotional comfort and ensuring bedside sterile support.',
    defaultPrice: 500,
    unitLabel: 'Patient Companion Support',
  },
  {
    id: 'm8',
    title: 'Nutrition Kits for Dialysis Fighters',
    category: 'Clinical Care',
    location: 'Jaipur Nephro Center',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80',
    stats: 'Every Sunday Distribution',
    description: 'Doctor-approved sodium-controlled nutritional baskets for chronic kidney patients.',
    fullStory: 'Doctor-supervised dietary care packages containing kidney-friendly high-biological-value egg whites, cold-pressed juices, and sterile electrolytes for low-income dialysis patients.',
    defaultPrice: 300,
    unitLabel: 'Dialysis Nutrition Kit',
  },
  {
    id: 'm9',
    title: 'Children STEM Science Experiment Kits',
    category: 'All Children Education',
    location: 'Jaipur Central Municipal Schools',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
    stats: '850+ STEM Sets Provided',
    description: 'Hands-on scientific experiment kits and math lab instruments for all students.',
    fullStory: 'Hands-on science kits, solar circuit models, and microscope sets donated to rural Rajasthan schools to nurture scientific curiosity in all underprivileged children.',
    defaultPrice: 450,
    unitLabel: 'STEM Lab Kit',
  },
  {
    id: 'm10',
    title: 'Senior Citizen Medical Outreach',
    category: 'Elderly Care',
    location: 'Amer Outskirts Center, Jaipur',
    image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&q=80',
    stats: 'Weekly Health Screening',
    description: 'Free basic biometrics, hydration supplies, and essential winter blankets.',
    fullStory: 'Weekly doorstep checkups, free blood pressure/glucose screening, and warm fleece blankets distributed to destitute senior citizens living in the outskirts of Jaipur.',
    defaultPrice: 400,
    unitLabel: 'Senior Care Basket',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-cancer-warriors",
    title: "RUHS Childhood Cancer Warriors: Lovekush, Aru, Pari & Rocky Singh",
    category: "Hospital & Cancer Warriors",
    location: "State Cancer Medical College (RUHS), Jaipur",
    date: "Sep 2026",
    isRecent: true,
    createdAt: 1789290000000,
    image: "/uploads/upload_1788854883629_8bda525a0f.jpg",
    images: [
      "/uploads/upload_1788854883629_8bda525a0f.jpg",
      "/uploads/upload_1788854883630_6eb02e090b.jpg",
      "/uploads/upload_1788854883643_e4a411d682.jpg",
      "/uploads/upload_1788854883635_8a4d2b5135.jpg"
    ],
    stats: "4 Brave Cancer Warriors Supported",
    summary: "Dedicated clinical chemotherapy, sterile coconut hydration, and bedside care for Lovekush (Bed 3), Aru (Bed 1), Pari (Bed 4), and Rocky Singh at RUHS.",
    fullStory: "Our continuous ground presence at RUHS Pediatric Oncology Ward supports 4 courageous young fighters: Lovekush (Bed 3), Master Aarav Sharma 'Aru' (Bed 1), Pari Singh (Bed 4), and toddler Rocky Singh. Every Ekadashi and daily rounds, we deliver fresh green tender coconuts cut bedside, cover urgent chemotherapy injections, and provide high-protein clinical nourishment. To help, sponsor bedside care, or verify hospital records, contact Rise Up Help Foundation Helpline directly at +91 98282 91119 (support@riseuphelp.org).",
    impactMetrics: "Direct bedside chemotherapy & natural hydration with 0% intermediary leakage.",
    driveReferenceId: "coconut-water"
  },
  {
    id: "g-slum-tiffin-class",
    title: "बुधवार क्लास 6: स्लम बाल शिक्षा एवं पौष्टिक टिफिन सेवा (Wednesday Class 6)",
    category: "Slum & Child Education Drives",
    location: "Pratap Nagar & Jaipur Slum Learning Hub, Rajasthan",
    date: "09 Sep 2026",
    isRecent: true,
    createdAt: 1789295000000,
    image: "/uploads/slum_packed_thali_tiffin.jpg",
    images: [
      "/uploads/slum_packed_thali_tiffin.jpg",
      "/uploads/slum_children_tiffin_distribution.jpg",
      "/uploads/slum_volunteer_meal_handover.jpg",
      "/uploads/slum_tiffin_class_table.jpg",
      "/uploads/slum_teacher_whiteboard_class.jpg",
      "/uploads/slum_whiteboard_tiffin_plan.jpg"
    ],
    stats: "120+ Fresh Tiffins & Mentorship Kits",
    summary: "Serving fresh, hygienic 5-compartment packed hot thali tiffins (₹75/meal) with poori, seasonal sabzi, steamed rice, raita, and sweet alongside foundational coaching for slum children in Jaipur.",
    fullStory: "On Wednesday, September 9, 2026, Rise Up Help Initiative Foundation organized its scheduled Class 6 Slum Education & Nutrition Drive in Jaipur. Dedicated volunteer mentors conducted classroom lessons on whiteboard while distributing freshly prepared nutritious 5-compartment meal tiffins (₹75 per thali meal with poori, sabzi, steamed rice, boondi raita and sweet gulab jamun), bananas, and academic stationery supplies to children from underprivileged slum communities. Proper nutrition combined with free education ensures every child has the strength, focus, and dignity to study and build a brighter future.",
    impactMetrics: "100% wholesome hot 5-compartment tiffin meals (₹75/tiffin) & stationery delivered directly into children's hands.",
    driveReferenceId: "school-bags"
  },
  {
    id: "g1",
    title: "Har Ekadashi Bedside Coconut Relief",
    category: "Har Ekadashi Nariyal Pani Seva",
    location: "State Cancer Medical College (RUHS), Jaipur",
    date: "Aug 2026",
    isRecent: true,
    createdAt: 1789270000000,
    image: "/uploads/ruhs_hospital_nariyal_seva_trolley.jpg",
    images: [
      "/uploads/ruhs_hospital_nariyal_seva_trolley.jpg",
      "/uploads/nariyal_pani_fresh_coconut.jpg"
    ],
    stats: "389,000+ Sourced Bedside",
    summary: "Whole fresh coconuts cut live in front of cancer patients with sterile eco-straws every Ekadashi.",
    fullStory: "Our ground seva volunteers procure green coconuts directly from verified ethical orchards, transport them bedside in State Cancer Medical College (RUHS) oncology wards, and cut them fresh in front of cancer patients undergoing rigorous chemo cycles.",
    impactMetrics: "Direct bedside hydration reducing post-chemo nausea and maintaining electrolyte balance.",
    driveReferenceId: "coconut-water"
  },
  {
    id: "g2",
    title: "Immunity Juice & Pomegranate Rations",
    category: "Har Ekadashi Nariyal Pani Seva",
    location: "SMS Medical College & Hospital, Jaipur",
    date: "Aug 2026",
    isRecent: true,
    createdAt: 1789260000000,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
    ],
    stats: "84,000+ Immunity Rations",
    summary: "Pure cold-pressed Citrus, Anar and nutrient-dense fruit rations served daily to oncology and dialysis wards.",
    fullStory: "Doctor-approved daily fruit extraction stations operating at SMS Hospital to deliver pure, unadulterated pomegranate and citrus juice packs to chemotherapy and dialysis patients.",
    impactMetrics: "Zero preservatives, 100% natural immunity boost directly in patient hands.",
    driveReferenceId: "immunity-packs"
  },
  {
    id: "g3",
    title: "All Children School Bags & Academic Kits",
    category: "Slum & Child Education Drives",
    location: "Govt School, Chhoti Chaupar, Jaipur",
    date: "Jul 2026",
    isRecent: true,
    createdAt: 1789250000000,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    ],
    stats: "12,800+ Waterproof Bags",
    summary: "Equipping all young boys & girls from underprivileged slum clusters with complete academic kits.",
    fullStory: "Every bag contains ruled notebooks, drawing pads, geometry kits, pens, and hygiene supplies, ensuring zero student dropouts due to lack of basic stationery.",
    impactMetrics: "98% attendance retention across 14 government schools in Jaipur.",
    driveReferenceId: "school-bags"
  },
  {
    id: "g4",
    title: "Weekend Digital Tablet Learning Hub",
    category: "Slum & Child Education Drives",
    location: "Malviya Nagar Kacchi Basti, Jaipur",
    date: "Aug 2026",
    isRecent: false,
    createdAt: 1789240000000,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80"
    ],
    stats: "450+ Enrolled Students",
    summary: "Foundational literacy and digital coding sessions for all slum children every Saturday & Sunday.",
    fullStory: "Volunteer mentors bring interactive learning tablets and STEM tools to bridge the digital education divide for all children of daily-wage migrant laborers.",
    impactMetrics: "Over 450 students achieving grade-level arithmetic and reading fluency."
  },
  {
    id: "g5",
    title: "Sanganer Women Sewing & Livelihood Cell",
    category: "Women Sewing Training",
    location: "Sanganer Skill Hub, Jaipur",
    date: "Aug 2026",
    isRecent: true,
    createdAt: 1789230000000,
    image: "/uploads/ChatGPT_Image_Sep_13__2026__10_1789320630857_41143ed87d.jpg",
    images: [
      "/uploads/ChatGPT_Image_Sep_13__2026__10_1789320630857_41143ed87d.jpg",
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
    ],
    stats: "420+ Women Certified",
    summary: "Vocational tailoring machines provided to widowed and single mothers to earn independent livelihood.",
    fullStory: "6-month intensive tailoring, block-printing, and handcraft certification enabling women to sell artisan goods directly to fair-trade urban markets.",
    impactMetrics: "Average monthly household income increase of ₹8,500 per artisan.",
    driveReferenceId: "sewing-machine"
  },
  {
    id: "g6",
    title: "Disabled Mobility & Vocational Toolkits",
    category: "Disabled Livelihoods",
    location: "Jaipur Central Rehabilitation Center",
    date: "Jun 2026",
    isRecent: false,
    createdAt: 1789220000000,
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&q=80",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80"
    ],
    stats: "310+ Specialized Tricycles & Kits",
    summary: "Custom hand-pedaled tricycles, braille tablets, and mobile kiosk kits for disabled artisans.",
    fullStory: "Restoring independence and dignity through customized mechanical mobility vehicles and repair toolkits for physically challenged individuals.",
    impactMetrics: "Over 310 beneficiaries now operating independent micro-retail setups in Jaipur.",
    driveReferenceId: "hospital-wheelchair"
  },
  {
    id: "g7",
    title: "Pediatric Oncology Ward Comfort Care",
    category: "Har Ekadashi Nariyal Pani Seva",
    location: "State Cancer Medical College (RUHS) Pediatric Wing",
    date: "Aug 2026",
    isRecent: true,
    createdAt: 1789210000000,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
    ],
    stats: "Daily Bedside Volunteer Care",
    summary: "Emotional companion support, story reading, and sterile comfort packs for young oncology fighters.",
    fullStory: "Our trained youth volunteers spend hours with children undergoing painful IV chemotherapy sessions, providing therapeutic warmth and psychological relief.",
    impactMetrics: "Comprehensive emotional and nutritional support for 120+ pediatric cancer patients."
  },
  {
    id: "g8",
    title: "Slum STEM Science & Math Experiment Cell",
    category: "Slum & Child Education Drives",
    location: "Amer Outskirts Govt School",
    date: "Jul 2026",
    isRecent: false,
    createdAt: 1789200000000,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80"
    ],
    stats: "850+ STEM Kits Donated",
    summary: "Hands-on solar experiment kits, microscope sets, and interactive math manipulatives for all children.",
    fullStory: "Igniting curiosity in rural and slum children by transforming dry textbook formulas into exciting physical science experiments.",
    impactMetrics: "100% pass rate in secondary school science practicals.",
    driveReferenceId: "first-aid-kit"
  }
];

export const IMPACT_MILESTONES = [
  {
    id: "1",
    metric: "389,450+",
    label: "Fresh Coconuts Served Bedside",
    subtext: "Cut fresh for cancer patients at State Cancer Hospital (RUHS) & SMS",
  },
  {
    id: "2",
    metric: "12,800+",
    label: "Children School Bags Provided",
    subtext: "Empowering all underprivileged children across Jaipur Govt Schools",
  },
  {
    id: "3",
    metric: "100%",
    label: "Direct Public Ledger",
    subtext: "Zero intermediary fee leakage, verified on-ground receipts",
  },
  {
    id: "4",
    metric: "2,400+",
    label: "Active Volunteers",
    subtext: "Youth changemakers operating across 5+ Jaipur hospital nodes",
  }
];

export const sanitizeDriveItems = (items: any[]): DriveItem[] => {
  if (!Array.isArray(items) || items.length === 0) return DRIVE_ITEMS;
  let result = [...items];

  const hasImmunity = result.some((i) => i.id === 'immunity-packs');
  if (!hasImmunity) {
    const defaultImmunity = DRIVE_ITEMS.find((i) => i.id === 'immunity-packs');
    if (defaultImmunity) result.push(defaultImmunity);
  }

  const anarIndex = result.findIndex((i) => i.id === 'anar-juice');
  if (anarIndex >= 0) {
    if (result[anarIndex].name.includes('Immunity') || result[anarIndex].name.includes('Citrus')) {
      const defaultAnar = DRIVE_ITEMS.find((i) => i.id === 'anar-juice');
      if (defaultAnar) {
        result[anarIndex] = {
          ...result[anarIndex],
          name: defaultAnar.name,
          tagline: defaultAnar.tagline,
          price: defaultAnar.price,
          unitLabel: defaultAnar.unitLabel,
          badge: defaultAnar.badge,
          description: defaultAnar.description,
          options: defaultAnar.options,
          image: result[anarIndex].image && !result[anarIndex].image.includes('immunity')
            ? result[anarIndex].image
            : defaultAnar.image,
        };
      }
    }
  } else {
    const defaultAnar = DRIVE_ITEMS.find((i) => i.id === 'anar-juice');
    if (defaultAnar) result.push(defaultAnar);
  }

  const schoolBagIndex = result.findIndex((i) => i.id === 'school-bags');
  if (schoolBagIndex >= 0) {
    result[schoolBagIndex] = {
      ...result[schoolBagIndex],
      name: "School Bag & Complete Stationery Kit",
      price: 899,
      image: result[schoolBagIndex].image && result[schoolBagIndex].image.includes('riseup_bag_with_stationery_kit')
        ? result[schoolBagIndex].image
        : "/uploads/riseup_bag_with_stationery_kit.jpg",
      description: "Durable waterproof school bags loaded with notebooks, DOMS color pencils, Pentonic pens, water bottle, lunch box, and complete stationery kit for underprivileged children across Jaipur government schools and slum education cells.",
      options: {
        primary: "Full Bag & Stationery Kit",
        secondary: "Stationery Pack"
      }
    };
  }

  return result;
};

export const INITIAL_VOLUNTEERS: VolunteerSubmission[] = [
  {
    id: "vol-seed-01",
    fullName: "Rahul Sharma",
    phone: "9828291119",
    email: "rahul.sharma@gmail.com",
    city: "Jaipur",
    track: "Hospital Bedside Coconut Seva (RUHS & SMS)",
    availability: "Sundays & Ekadashi Mornings",
    status: "approved",
    timestamp: "2026-09-12T10:30:00.000Z"
  },
  {
    id: "vol-seed-02",
    fullName: "Anjali Meena",
    phone: "9660618723",
    email: "anjali.m@outlook.com",
    city: "Jaipur",
    track: "Weekend Slum Digital & STEM Mentorship",
    availability: "Weekend Afternoons (Saturday/Sunday)",
    status: "contacted",
    timestamp: "2026-09-13T08:15:00.000Z"
  },
  {
    id: "vol-seed-03",
    fullName: "Vikram Rathore",
    phone: "8503076048",
    email: "vikram.rathore.jpr@gmail.com",
    city: "Jaipur",
    track: "Media, Photography & Transparency Dispatch",
    availability: "On-Call Emergency Squad",
    status: "pending",
    timestamp: "2026-09-13T11:45:00.000Z"
  }
];


