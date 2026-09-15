export type LanguageMode = 'en' | 'hi' | 'hinglish';

export interface TranslationDictionary {
  // Navigation
  navHome: string;
  navEkadashi: string;
  navWarriors: string;
  navEducation: string;
  navGallery: string;
  navVolunteer: string;
  navSignIn: string;
  navProfile: string;
  navCart: string;
  navSection8: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroSubtitle: string;
  heroSponsorBtn: string;
  heroCalendarBtn: string;
  heroDirectUpi: string;

  // Stats
  statYears: string;
  statYearsSub: string;
  statCoconuts: string;
  statCoconutsSub: string;
  statVolunteers: string;
  statVolunteersSub: string;
  statMeals: string;
  statMealsSub: string;
  statBags: string;
  statBagsSub: string;

  // Gateway Cards
  gatewaysTitle: string;
  gatewaysSubtitle: string;
  card1Title: string;
  card1Tag: string;
  card1Desc: string;
  card1Cta: string;

  card2Title: string;
  card2Tag: string;
  card2Desc: string;
  card2Cta: string;

  card3Title: string;
  card3Tag: string;
  card3Desc: string;
  card3Cta: string;

  card4Title: string;
  card4Tag: string;
  card4Desc: string;
  card4Cta: string;

  // Story Section
  storyBadge: string;
  storyTitle: string;
  storyHighlight: string;
  storyQuote: string;
  storyPara1: string;
  storyVowTitle: string;
  storyVowDesc: string;
  storyCard1Title: string;
  storyCard1Desc: string;
  storyCard2Title: string;
  storyCard2Desc: string;
  storySec8Title: string;
  storySec8Desc: string;

  // Impact Telemetry Ledger
  impactBadge: string;
  impactTitle: string;
  impactHighlight: string;
  impactDesc: string;
  impactCoconuts: string;
  impactCoconutsSub: string;
  impactBags: string;
  impactBagsSub: string;
  impactMeals: string;
  impactMealsSub: string;
  impactVolunteers: string;
  impactVolunteersSub: string;

  // Impact Simulator
  simulatorBadge: string;
  simulatorTitle: string;
  simulatorSubtitle: string;
  simulatorTag: string;
  simulatorLabel: string;
  simulatorSponsorBtn: string;
  simulatorPack200: string;
  simulatorPack25k: string;
  simulatorPack100k: string;

  // Closing Ecosystem
  closingBadge: string;
  closingTitle: string;
  closingDesc: string;
  closingSponsorBtn: string;
  closingDirectUpi: string;

  // Footer
  footerTagline: string;
  footerDescription: string;
  footerVerifiedTracks: string;
  footerTrack1: string;
  footerTrack2: string;
  footerTrack3: string;
  footerTrack4: string;
  footerRegistryTitle: string;
  footerRights: string;
  footerPrivacy: string;
  footerTerms: string;
  footerRefund: string;
  footerContact: string;

  // Ekadashi Page
  ekadashiBack: string;
  ekadashiVowBadge: string;
  ekadashiRegistryBadge: string;
  ekadashiHeroTitle: string;
  ekadashiHeroDesc: string;
  ekadashiBadge1: string;
  ekadashiBadge2: string;
  ekadashiBadge3: string;
  ekadashiSponsorBtn: string;

  // Cancer Warriors Page
  warriorsBack: string;
  warriorsVowBadge: string;
  warriorsHeroTitle: string;
  warriorsHeroDesc: string;
  warriorsSponsorBtn: string;

  // Education Page
  educationBack: string;
  educationBadge: string;
  educationHeroTitle: string;
  educationHeroDesc: string;
  educationSponsorBtn: string;

  // Gallery Page
  galleryBack: string;
  galleryBadge: string;
  galleryHeroTitle: string;
  galleryHeroDesc: string;

  // Volunteer Page
  volunteerBack: string;
  volunteerBadge: string;
  volunteerHeroTitle: string;
  volunteerHeroDesc: string;
  volunteerSubmitBtn: string;

  // Modals & General CTAs
  sponsorNow: string;
  viewStory: string;
  verifiedTax: string;
  close: string;
  donorId: string;
  selectLanguage: string;
}

export const TRANSLATIONS: Record<LanguageMode, TranslationDictionary> = {
  // 1. SIMPLE ENGLISH
  en: {
    navHome: 'Home',
    navEkadashi: 'Ekadashi Seva',
    navWarriors: 'Cancer Warriors',
    navEducation: 'Children Education',
    navGallery: 'Live Gallery',
    navVolunteer: 'Be a Volunteer',
    navSignIn: 'Login',
    navProfile: 'Profile',
    navCart: 'Cart',
    navSection8: 'Section 8 Registered Non-Profit • 80G Tax Exemption',

    heroBadge: '3 Years of Pure Seva • Government Hospitals Network',
    heroTitle1: 'Holding Hands In',
    heroTitle2: 'The Darkest Hours',
    heroTitle3: 'Of Need.',
    heroSubtitle: 'Every Ekadashi, our volunteers visit government cancer hospitals in Jaipur to cut fresh green coconuts bedside and support underprivileged cancer fighters and slum children.',
    heroSponsorBtn: 'Sponsor Fresh Coconut',
    heroCalendarBtn: 'View Ekadashi Calendar',
    heroDirectUpi: 'Direct UPI: 98282911119@hdfc',

    statYears: '3+ Years',
    statYearsSub: 'Continuous Seva Since 2023',
    statCoconuts: '194,700+',
    statCoconutsSub: 'Fresh Coconuts Cut Bedside',
    statVolunteers: '100+ Volunteers',
    statVolunteersSub: '20 in Each of 5 Govt Hospitals',
    statMeals: '34,000+',
    statMealsSub: 'Nutritious Meals & Juices',
    statBags: '6,400+',
    statBagsSub: 'School Bags & Stationery Kits',

    gatewaysTitle: 'Our Main Seva Initiatives',
    gatewaysSubtitle: 'Click on any initiative below to explore full details and sponsor directly.',
    card1Title: 'Har Ekadashi Bedside Coconut Seva',
    card1Tag: 'RUHS Government Cancer Hospital',
    card1Desc: 'Fresh green coconuts cut live bedside for chemotherapy patients in government cancer wards.',
    card1Cta: 'View Seva Calendar',

    card2Title: 'Adopt a Cancer Warrior',
    card2Tag: '₹15,000 / Care Unit',
    card2Desc: 'Cover vital chemotherapy medicines, platelet kits, and recovery care for poor cancer patients.',
    card2Cta: 'View Patient Profiles',

    card3Title: 'All Children Education & Bags',
    card3Tag: '₹899 / Bag & Stationery Kit',
    card3Desc: 'Waterproof school backpacks, notebooks, DOMS colors, pens, complete stationery kits, and slum mentorship for children.',
    card3Cta: 'View Education Kits',

    card4Title: 'Live Impact & Transparency Gallery',
    card4Tag: '100% Real Ground Photos',
    card4Desc: 'Verified real-time photos and daily distribution reports from government hospital wards.',
    card4Cta: 'View Photo Matrix',

    storyBadge: 'OUR FOUNDATION STORY & ETHOS',
    storyTitle: 'Redefining Clinical Care & Educational Dignity in',
    storyHighlight: 'Rajasthan.',
    storyQuote: 'Seva • Empathy • Impact — Always There For You',
    storyPara1: 'Founded in Jaipur, RiseUpHelp Initiative Foundation was born out of a fundamental human observation: during prolonged medical battles and underprivileged schooling, it is the simple, dignified essentials that sustain hope.',
    storyVowTitle: 'Har Ekadashi Vow:',
    storyVowDesc: 'We purchase whole, fresh green tender coconuts directly from ethical orchards, transport them on-ground to State Cancer Medical College (RUHS) and SMS Hospital oncology wards, cut and open them fresh right in front of chemotherapy cancer fighters, and serve them with sterile eco-straws for natural hydration and nausea relief.',
    storyCard1Title: 'Har Ekadashi Bedside Seva',
    storyCard1Desc: 'Whole tender green coconuts cut live bedside at State Cancer Medical College (RUHS) for cancer patients.',
    storyCard2Title: 'All Children Education Cells',
    storyCard2Desc: 'High-grade waterproof school bags, notebooks & mentoring for all underprivileged children across Jaipur slums.',
    storySec8Title: 'Section 8 Registered',
    storySec8Desc: '50% Tax Exemption (80G Certified)',

    impactBadge: 'REAL-TIME AUDIT & VERIFIED TELEMETRY',
    impactTitle: 'Jaipur Impact Telemetry &',
    impactHighlight: 'Public Relief Ledger',
    impactDesc: 'We maintain absolute transparency. Explore the live distribution milestones recorded across hospitals and educational cells in Jaipur.',
    impactCoconuts: 'Fresh Coconuts Cut Bedside',
    impactCoconutsSub: 'Served at RUHS State Cancer Hospital & SMS Medical College',
    impactBags: 'School Bags Provided',
    impactBagsSub: 'Empowering all underprivileged children across Jaipur slum cells',
    impactMeals: 'Nutritious Meal Boxes',
    impactMealsSub: 'Antioxidant juice and wholesome food packs for patient attendants',
    impactVolunteers: 'Active Seva Volunteers',
    impactVolunteersSub: 'Dedicated team of 20 volunteers in each of the 5 Govt Hospitals',

    simulatorBadge: 'Interactive Impact Simulator',
    simulatorTitle: 'See Your Tangible On-Ground Change in Jaipur',
    simulatorSubtitle: 'Calculate how your contribution directly transforms lives at hospital bedsides and slum classrooms.',
    simulatorTag: '100% Direct Bedside Seva',
    simulatorLabel: 'Enter or Select Any Contribution Amount (No Upper Limit):',
    simulatorSponsorBtn: 'Sponsor This Impact Now',
    simulatorPack200: '₹200 (Bedside Pack)',
    simulatorPack25k: '₹25,000 (~28 Bag & Stationery Kits)',
    simulatorPack100k: '₹1,00,000+ (Full Ward Sponsor)',

    closingBadge: 'OUR COLLECTIVE MISSION',
    closingTitle: "Stand Beside Jaipur's Cancer Patients & Slum Children",
    closingDesc: '100% of your donation reaches directly to bedsides in government hospitals. Fully tax-exempt under 80G.',
    closingSponsorBtn: 'Sponsor Bedside Seva',
    closingDirectUpi: 'Direct Official UPI: 98282911119@hdfc',

    footerTagline: 'Seva • Empathy • Impact — Always There For You',
    footerDescription: 'Registered Section 8 Non-Profit Foundation operating under the Ministry of Corporate Affairs, Govt of India. 80G & 12A Certified for 50% income tax exemption.',
    footerVerifiedTracks: 'Verified Impact Tracks',
    footerTrack1: '• Tender Coconut Water Seva (RUHS)',
    footerTrack2: '• Pomegranate Hospital Drives (SMS)',
    footerTrack3: '• Children School Bags (Chhoti Chaupar)',
    footerTrack4: '• Cancer Warriors Lifeline Care',
    footerRegistryTitle: 'Official Registry Node',
    footerRights: 'All Rights Reserved',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Seva',
    footerRefund: 'Refund Policy',
    footerContact: 'Contact Us',

    ekadashiBack: '← Back to Home',
    ekadashiVowBadge: 'Har Ekadashi Bedside Seva Vow',
    ekadashiRegistryBadge: 'Official Hospital Seva Registry',
    ekadashiHeroTitle: 'Har Ekadashi State Cancer Hospital (RUHS) Nariyal Pani Seva',
    ekadashiHeroDesc: 'Every Ekadashi without interruption, our seva volunteers procure farm-fresh green tender coconuts, transport them on-ground to State Cancer Medical College (RUHS) and SMS Hospitals, and cut them open live bedside for admitted cancer patients undergoing chemotherapy.',
    ekadashiBadge1: '🥥 389,000+ Sourced & Cut Bedside',
    ekadashiBadge2: '🏥 RUHS & SMS Cancer Hospital Wards',
    ekadashiBadge3: '⭐ 50% Tax Exemption (80G)',
    ekadashiSponsorBtn: '🥥 Sponsor Bedside Coconuts (₹65/pc)',

    warriorsBack: '← Back to Home',
    warriorsVowBadge: 'Adopt a Cancer Warrior',
    warriorsHeroTitle: 'Emergency Medicine & Bedside Care for Cancer Warriors',
    warriorsHeroDesc: 'Support underprivileged children and adults battling cancer in government hospitals across Jaipur with vital chemotherapy drugs, recovery kits, and nutritional care.',
    warriorsSponsorBtn: 'Adopt Warrior',

    educationBack: '← Back to Home',
    educationBadge: 'All Children Education & Livelihood',
    educationHeroTitle: 'School Bags & Stationery Kits for Slum Children',
    educationHeroDesc: 'Providing waterproof school bags, notebooks, pens, DOMS colors, and mentorship to ensure no child drops out of school in Jaipur.',
    educationSponsorBtn: 'Sponsor School Kit (₹899)',

    galleryBack: '← Back to Home',
    galleryBadge: 'The Truth Engine',
    galleryHeroTitle: 'Live Ground Photos & Verified Impact Stream',
    galleryHeroDesc: '100% unedited ground photographs taken directly during bedside hospital distributions and education drives.',

    volunteerBack: '← Back to Home',
    volunteerBadge: 'Join the Seva Squad',
    volunteerHeroTitle: 'Become an On-Ground Seva Volunteer in Jaipur',
    volunteerHeroDesc: 'Join our dedicated team of volunteers visiting RUHS and SMS government hospitals every Ekadashi and mentoring slum children.',
    volunteerSubmitBtn: 'Submit Volunteer Application',

    sponsorNow: 'Sponsor Now',
    viewStory: 'View Story & Help',
    verifiedTax: '50% Tax Exemption (80G Receipt)',
    close: 'Close',
    donorId: 'Donor ID',
    selectLanguage: 'Language',
  },

  // 2. HINDI (हिंदी)
  hi: {
    navHome: 'होम',
    navEkadashi: 'एकादशी सेवा',
    navWarriors: 'कैंसर वॉरियर्स',
    navEducation: 'बाल शिक्षा',
    navGallery: 'लाइव गैलरी',
    navVolunteer: 'स्वयंसेवक बनें',
    navSignIn: 'लॉगिन',
    navProfile: 'प्रोफाइल',
    navCart: 'कार्ट',
    navSection8: 'धारा 8 पंजीकृत ट्रस्ट • 80G टैक्स छूट प्रमाण पत्र',

    heroBadge: '3 वर्षों से निरंतर सेवा • सरकारी अस्पताल नेटवर्क',
    heroTitle1: 'कठिन समय में',
    heroTitle2: 'हर मरीज का हाथ',
    heroTitle3: 'थामने का संकल्प।',
    heroSubtitle: 'हर एकादशी पर हमारे स्वयंसेवक जयपुर के सरकारी कैंसर अस्पतालों में जाकर मरीजों के बेड पर ताजा नारियल पानी काटते हैं और जरूरतमंद बच्चों को शिक्षित करते हैं।',
    heroSponsorBtn: 'ताजा नारियल सेवा प्रायोजित करें',
    heroCalendarBtn: 'एकादशी कैलेंडर देखें',
    heroDirectUpi: 'सीधा UPI: 98282911119@hdfc',

    statYears: '3+ वर्ष',
    statYearsSub: '2023 से अविरल सेवा',
    statCoconuts: '1,94,700+',
    statCoconutsSub: 'बेडसाइड ताजे नारियल वितरित',
    statVolunteers: '100+ स्वयंसेवक',
    statVolunteersSub: '5 सरकारी अस्पतालों में (20 प्रति अस्पताल)',
    statMeals: '34,000+',
    statMealsSub: 'पौष्टिक भोजन व अनार जूस',
    statBags: '6,400+',
    statBagsSub: 'वाटरप्रूफ स्कूल बैग किट',

    gatewaysTitle: 'हमारी प्रमुख सेवा परियोजनाएं',
    gatewaysSubtitle: 'पूरी जानकारी देखने और सीधे सेवा करने के लिए नीचे किसी भी सेवा पर क्लिक करें।',
    card1Title: 'हर एकादशी बेडसाइड नारियल सेवा',
    card1Tag: 'RUHS सरकारी कैंसर अस्पताल',
    card1Desc: 'कीमोथेरेपी से जूझ रहे मरीजों के बेड पर ताजा हरा नारियल काटकर तुरंत हाइड्रेशन देना।',
    card1Cta: 'सेवा कैलेंडर देखें',

    card2Title: 'कैंसर वॉरियर को अपनाएं',
    card2Tag: '₹15,000 / माह दवा किट',
    card2Desc: 'गरीब कैंसर मरीजों की कीमोथेरेपी दवाएं, प्लेटलेट्स किट और उपचार का पूरा खर्च उठाएं।',
    card2Cta: 'मरीजों की सूची देखें',

    card3Title: 'सभी बच्चों की शिक्षा व स्कूल बैग',
    card3Tag: '₹899 / बैग व स्टेशनरी किट',
    card3Desc: 'बस्ती के सभी बच्चों के लिए वाटरप्रूफ बैग, कॉपियां, कलर्स, पेन, स्टेशनरी किट और स्लम शिक्षा सहायता।',
    card3Cta: 'शिक्षा सामग्री देखें',

    card4Title: 'सच्चाई व पारदर्शिता लाइव गैलरी',
    card4Tag: '100% असली धरातल की तस्वीरें',
    card4Desc: 'सरकारी अस्पतालों में सेवा वितरण की वास्तविक हाई-क्वालिटी तस्वीरें व प्रमाण।',
    card4Cta: 'फोटो गैलरी देखें',

    storyBadge: 'हमारी संस्था की कहानी और उद्देश्य',
    storyTitle: 'राजस्थान में स्वास्थ्य सेवा और शिक्षा को नई दिशा देने का संकल्प',
    storyHighlight: 'राजस्थान।',
    storyQuote: 'सेवा • संवेदना • प्रभाव — हर कदम आपके साथ',
    storyPara1: 'जयपुर में स्थापित, राइजअपहेल्प इनिशिएटिव फाउंडेशन की शुरुआत इस मूलभूत मानवीय विचार के साथ हुई कि गंभीर बीमारी और अभाव के समय जरूरतमंदों तक सीधे सम्मानजनक सहायता पहुंचना सबसे जरूरी है।',
    storyVowTitle: 'हर एकादशी का संकल्प:',
    storyVowDesc: 'हम सीधे किसानों से ताजे हरे नारियल लाकर RUHS और SMS सरकारी कैंसर अस्पतालों में कीमोथेरेपी मरीजों के सामने काटकर स्वच्छ स्ट्रॉ से पिलाते हैं, जिससे उन्हें प्राकृतिक पोषण और उबकाई में राहत मिलती है।',
    storyCard1Title: 'हर एकादशी बेडसाइड सेवा',
    storyCard1Desc: 'RUHS कैंसर अस्पताल में भर्ती मरीजों के बेड पर ताजे हरे नारियल काटकर तुरंत हाइड्रेशन देना।',
    storyCard2Title: 'सभी बच्चों की शिक्षा केंद्र',
    storyCard2Desc: 'जयपुर की बस्तियों के सभी बच्चों को वाटरप्रूफ स्कूल बैग, कॉपियां और नियमित मेंटरशिप।',
    storySec8Title: 'धारा 8 पंजीकृत संस्था',
    storySec8Desc: '50% आयकर छूट (80G प्रमाणित)',

    impactBadge: 'लाइव ऑडिट और सत्यापित आंकड़े',
    impactTitle: 'जयपुर सेवा प्रभाव व',
    impactHighlight: 'सार्वजनिक सेवा लेजर',
    impactDesc: 'हम पूरी पारदर्शिता में विश्वास रखते हैं। जयपुर के सरकारी अस्पतालों और शिक्षा केंद्रों में किए गए सेवा कार्यों का लाइव ब्यौरा देखें।',
    impactCoconuts: 'बेडसाइड ताजे नारियल वितरित',
    impactCoconutsSub: 'RUHS स्टेट कैंसर अस्पताल व SMS मेडिकल कॉलेज में सेवा',
    impactBags: 'स्कूल बैग वितरित',
    impactBagsSub: 'जयपुर की बस्तियों के सभी जरूरतमंद बच्चों को शिक्षा सहायता',
    impactMeals: 'पौष्टिक भोजन व जूस',
    impactMealsSub: 'मरीजों और उनके परिजनों के लिए पौष्टिक आहार और अनार का जूस',
    impactVolunteers: 'सक्रिय स्वयंसेवक',
    impactVolunteersSub: 'जयपुर के 5 सरकारी अस्पतालों में 20-20 समर्पित स्वयंसेवक',

    simulatorBadge: 'इंटरैक्टिव सेवा कैलकुलेटर',
    simulatorTitle: 'देखें आपका सहयोग जमीन पर क्या बदलाव लाता है',
    simulatorSubtitle: 'गणना करें कि आपका छोटा सा सहयोग सरकारी अस्पताल के मरीजों और बस्ती के बच्चों के जीवन को कैसे संवारता है।',
    simulatorTag: '100% सीधी बेडसाइड सेवा',
    simulatorLabel: 'सहयोग राशि दर्ज करें या चुनें (कोई सीमा नहीं):',
    simulatorSponsorBtn: 'इस सेवा को अभी प्रायोजित करें',
    simulatorPack200: '₹200 (बेडसाइड पैक)',
    simulatorPack25k: '₹25,000 (~28 स्कूल बैग किट)',
    simulatorPack100k: '₹1,00,000+ (पूरे वार्ड का प्रायोजक)',

    closingBadge: 'हमारा सामूहिक मिशन',
    closingTitle: 'जयपुर के कैंसर मरीजों और जरूरतमंद बच्चों का सहारा बनें',
    closingDesc: 'आपका 100% सहयोग सीधे सरकारी अस्पतालों में मरीजों के बेड तक पहुंचता है। धारा 80G के तहत पूर्ण कर छूट।',
    closingSponsorBtn: 'बेडसाइड सेवा प्रायोजित करें',
    closingDirectUpi: 'सीधा आधिकारिक UPI: 98282911119@hdfc',

    footerTagline: 'सेवा • संवेदना • प्रभाव — हर कदम आपके साथ',
    footerDescription: 'भारत सरकार के कॉर्पोरेट कार्य मंत्रालय के अधीन पंजीकृत धारा 8 गैर-लाभकारी संस्था। 50% आयकर छूट हेतु 80G एवं 12A प्रमाणित।',
    footerVerifiedTracks: 'सत्यापित सेवा कार्य',
    footerTrack1: '• ताजा नारियल पानी सेवा (RUHS)',
    footerTrack2: '• अनार जूस व भोजन सेवा (SMS)',
    footerTrack3: '• स्कूल बैग व स्टेशनरी वितरण (जयपुर)',
    footerTrack4: '• कैंसर वॉरियर्स जीवन रक्षा सेवा',
    footerRegistryTitle: 'आधिकारिक कार्यालय व पंजीकरण',
    footerRights: 'सर्वाधिकार सुरक्षित',
    footerPrivacy: 'गोपनीयता नीति',
    footerTerms: 'सेवा नियम',
    footerRefund: 'रिफंड नीति',
    footerContact: 'संपर्क करें',

    ekadashiBack: '← मुख्य पृष्ठ पर लौटें',
    ekadashiVowBadge: 'हर एकादशी बेडसाइड सेवा संकल्प',
    ekadashiRegistryBadge: 'आधिकारिक अस्पताल सेवा पंजी',
    ekadashiHeroTitle: 'हर एकादशी RUHS सरकारी कैंसर अस्पताल नारियल पानी सेवा',
    ekadashiHeroDesc: 'हर एकादशी बिना किसी रुकावट के, हमारे स्वयंसेवक खेतों से ताजे हरे नारियल लाकर RUHS और SMS अस्पतालों में भर्ती कैंसर मरीजों के बेड पर काटकर स्वच्छ स्ट्रॉ से पिलाते हैं।',
    ekadashiBadge1: '🥥 3,89,000+ बेडसाइड ताजे नारियल काटे',
    ekadashiBadge2: '🏥 RUHS व SMS कैंसर अस्पताल वार्ड',
    ekadashiBadge3: '⭐ 50% टैक्स छूट (80G)',
    ekadashiSponsorBtn: '🥥 ताजा नारियल प्रायोजित करें (₹65/नारियल)',

    warriorsBack: '← मुख्य पृष्ठ पर लौटें',
    warriorsVowBadge: 'कैंसर वॉरियर को अपनाएं',
    warriorsHeroTitle: 'कैंसर योद्धाओं के लिए आपातकालीन दवा व बेडसाइड सेवा',
    warriorsHeroDesc: 'जयपुर के सरकारी अस्पतालों में कैंसर से जूझ रहे गरीब बच्चों और वयस्कों के उपचार, कीमोथेरेपी दवाओं और पोषण में मदद करें।',
    warriorsSponsorBtn: 'योद्धा को अपनाएं',

    educationBack: '← मुख्य पृष्ठ पर लौटें',
    educationBadge: 'बाल शिक्षा एवं आजीविका मिशन',
    educationHeroTitle: 'बस्ती के बच्चों के लिए स्कूल बैग व स्टेशनरी किट',
    educationHeroDesc: 'जयपुर की बस्तियों में बच्चों को वाटरप्रूफ स्कूल बैग, कॉपियां, पेन, कलर्स और मेंटरशिप देकर पढ़ाई से जोड़े रखना।',
    educationSponsorBtn: 'स्कूल किट प्रायोजित करें (₹899)',

    galleryBack: '← मुख्य पृष्ठ पर लौटें',
    galleryBadge: 'सच्चाई व पारदर्शिता गैलरी',
    galleryHeroTitle: 'अस्पतालों में वास्तविक सेवा वितरण की लाइव तस्वीरें',
    galleryHeroDesc: 'सरकारी अस्पतालों में मरीजों के बेड पर और बस्तियों में सेवा के समय ली गई 100% असली व अनएडिटेड तस्वीरें।',

    volunteerBack: '← मुख्य पृष्ठ पर लौटें',
    volunteerBadge: 'सेवा टीम से जुड़ें',
    volunteerHeroTitle: 'जयपुर में धरातल पर सेवा स्वयंसेवक बनें',
    volunteerHeroDesc: 'हर एकादशी सरकारी अस्पतालों में नारियल सेवा और बस्तियों में बच्चों को पढ़ाने के लिए हमारी समर्पित टीम से जुड़ें।',
    volunteerSubmitBtn: 'आवेदन जमा करें',

    sponsorNow: 'अभी सेवा करें',
    viewStory: 'कहानी पढ़ें व मदद करें',
    verifiedTax: '80G टैक्स छूट रसीद उपलब्ध',
    close: 'बंद करें',
    donorId: 'डोनर आईडी',
    selectLanguage: 'भाषा चुनें',
  },

  // 3. HINGLISH (हिंदी + English)
  hinglish: {
    navHome: 'Home',
    navEkadashi: 'Ekadashi Seva',
    navWarriors: 'Cancer Warriors',
    navEducation: 'Bacchon Ki Padhai',
    navGallery: 'Live Gallery',
    navVolunteer: 'Volunteer Banein',
    navSignIn: 'Login',
    navProfile: 'Profile',
    navCart: 'Cart',
    navSection8: 'Section 8 Govt Registered NGO • 80G Tax Exemption',

    heroBadge: '3 Saal Se Lagatar Seva • Govt Hospitals Network',
    heroTitle1: 'Mushkil Ghadi Mein',
    heroTitle2: 'Har Zarooratmand Ka',
    heroTitle3: 'Saath Dena.',
    heroSubtitle: 'Har Ekadashi hamare volunteers Jaipur ke Govt Cancer Hospitals me jakar chemotherapy patients ke bed par live fresh Nariyal Pani cut karte hain aur slum bacchon ko padhate hain.',
    heroSponsorBtn: 'Fresh Nariyal Sponsor Karein',
    heroCalendarBtn: 'Ekadashi Calendar Dekhein',
    heroDirectUpi: 'Direct UPI ID: 98282911119@hdfc',

    statYears: '3+ Saal',
    statYearsSub: '2023 Se Pure Seva',
    statCoconuts: '1,94,700+',
    statCoconutsSub: 'Bedside Fresh Nariyal Pilaye',
    statVolunteers: '100+ Volunteers',
    statVolunteersSub: 'Har 5 Govt Hospital Me 20 Volunteers',
    statMeals: '34,000+',
    statMealsSub: 'Poshtik Khana & Juice',
    statBags: '6,400+',
    statBagsSub: 'Waterproof School Bags',

    gatewaysTitle: 'Hamari Main Seva Drives',
    gatewaysSubtitle: 'Details dekhne aur direct donation karne ke liye kisi bhi initiative par click karein.',
    card1Title: 'Har Ekadashi Bedside Nariyal Seva',
    card1Tag: 'RUHS Govt Cancer Hospital',
    card1Desc: 'Chemotherapy patients ke bed par fresh green coconut cut karke live hydration dena.',
    card1Cta: 'Seva Calendar Dekhein',

    card2Title: 'Adopt a Cancer Warrior',
    card2Tag: '₹15,000 / Care Unit',
    card2Desc: 'Garib cancer patients ki chemotherapy medicines, platelet kits aur ilaaj me direct madad.',
    card2Cta: 'Patients List Dekhein',

    card3Title: 'All Children Education & School Bags',
    card3Tag: '₹899 / Bag & Stationery Kit',
    card3Desc: 'Slum bacchon ke liye waterproof school bags, notebooks, colors, pens, stationery kits aur education support.',
    card3Cta: 'Education Kits Dekhein',

    card4Title: 'Truth Engine: Live Ground Photos',
    card4Tag: '100% Real Photos',
    card4Desc: 'Govt hospital wards me distribution ki verified live photos aur transparent records.',
    card4Cta: 'Photo Gallery Dekhein',

    storyBadge: 'Hamari Foundation Ki Kahani & Maksad',
    storyTitle: 'Rajasthan Me Clinical Care Aur Bacchon Ki Shiksha Ko Nayi Disha Dena',
    storyHighlight: 'Rajasthan.',
    storyQuote: 'Seva • Empathy • Impact — Always There For You',
    storyPara1: 'Jaipur me establish hui RiseUpHelp Initiative Foundation ka maqsad hai ki lambi bimari aur gareebi ke dauran har zarooratmand ko seedhe bedside help aur har bacche ko school support mile.',
    storyVowTitle: 'Har Ekadashi Ka Sankalp:',
    storyVowDesc: 'Hum farm se direct fresh green nariyal khareed kar RUHS aur SMS hospital ke cancer wards me patients ke saamne cut karke sterile straw se serve karte hain taaki chemo me natural relief mile.',
    storyCard1Title: 'Har Ekadashi Bedside Seva',
    storyCard1Desc: 'State Cancer Hospital (RUHS) me cancer patients ke bed par live fresh nariyal cut karke pilana.',
    storyCard2Title: 'All Children Education Cells',
    storyCard2Desc: 'Jaipur slum clusters ke sabhi bacchon ko high-grade waterproof school bags, notebooks aur mentoring support.',
    storySec8Title: 'Section 8 Registered NGO',
    storySec8Desc: '50% Tax Exemption (80G Certified)',

    impactBadge: 'Live Verified Seva Records',
    impactTitle: 'Jaipur Seva Impact &',
    impactHighlight: 'Public Relief Ledger',
    impactDesc: 'Hum 100% transparent hain. Jaipur ke govt hospitals aur education drives ka live record yahan dekhein.',
    impactCoconuts: 'Bedside Fresh Nariyal Pilaye',
    impactCoconutsSub: 'RUHS State Cancer Hospital & SMS Medical College me seva',
    impactBags: 'School Bags Baante',
    impactBagsSub: 'Jaipur slum clusters ke bacchon ko school support',
    impactMeals: 'Poshtik Meal Boxes & Juice',
    impactMealsSub: 'Patients aur unke attendants ke liye healthy food packs & juices',
    impactVolunteers: 'Active Seva Volunteers',
    impactVolunteersSub: 'Har 5 Govt Hospitals me 20-20 dedicated volunteers',

    simulatorBadge: 'Interactive Impact Calculator',
    simulatorTitle: 'Dekhein Aapka Donation Zameen Par Kya Badlav Lata Hai',
    simulatorSubtitle: 'Calculate karein ki aapka contribution kaise hospital bedsides aur slum schools me lives transform karta hai.',
    simulatorTag: '100% Direct Bedside Seva',
    simulatorLabel: 'Apna Donation Amount Enter Ya Select Karein (No Limit):',
    simulatorSponsorBtn: 'Ye Seva Abhi Sponsor Karein',
    simulatorPack200: '₹200 (Bedside Pack)',
    simulatorPack25k: '₹25,000 (~28 Bag & Stationery Kits)',
    simulatorPack100k: '₹1,00,000+ (Pura Ward Sponsor)',

    closingBadge: 'HAMARA COLLECTIVE MISSION',
    closingTitle: 'Jaipur Ke Cancer Patients Aur Slum Bacchon Ka Sahara Banein',
    closingDesc: 'Aapka 100% donation seedhe govt hospitals me patient ke bed tak jata hai. Section 80G tax exemption ke sath.',
    closingSponsorBtn: 'Bedside Seva Sponsor Karein',
    closingDirectUpi: 'Direct Official UPI: 98282911119@hdfc',

    footerTagline: 'Seva • Empathy • Impact — Always There For You',
    footerDescription: 'Ministry of Corporate Affairs, Govt of India ke under registered Section 8 Non-Profit NGO. 80G & 12A certified for 50% income tax exemption.',
    footerVerifiedTracks: 'Verified Seva Tracks',
    footerTrack1: '• Tender Nariyal Pani Seva (RUHS)',
    footerTrack2: '• Anar Juice & Meal Drives (SMS)',
    footerTrack3: '• Children School Bags (Chhoti Chaupar)',
    footerTrack4: '• Cancer Warriors Lifeline Care',
    footerRegistryTitle: 'Official Office & Registration',
    footerRights: 'All Rights Reserved',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Seva',
    footerRefund: 'Refund Policy',
    footerContact: 'Contact Us',

    ekadashiBack: '← Back to Home',
    ekadashiVowBadge: 'Har Ekadashi Bedside Seva Sankalp',
    ekadashiRegistryBadge: 'Official Hospital Seva Registry',
    ekadashiHeroTitle: 'Har Ekadashi RUHS Govt Cancer Hospital Nariyal Pani Seva',
    ekadashiHeroDesc: 'Har Ekadashi bina ruke, humare volunteers farm se direct fresh green nariyal lake RUHS aur SMS hospital me chemo patients ke bed par live cut karke fresh pilate hain.',
    ekadashiBadge1: '🥥 3,89,000+ Bedside Cut & Served',
    ekadashiBadge2: '🏥 RUHS & SMS Cancer Hospital Wards',
    ekadashiBadge3: '⭐ 50% Tax Exemption (80G)',
    ekadashiSponsorBtn: '🥥 Bedside Nariyal Sponsor Karein (₹65/pc)',

    warriorsBack: '← Back to Home',
    warriorsVowBadge: 'Adopt a Cancer Warrior',
    warriorsHeroTitle: 'Cancer Warriors Ke Liye Zaroori Dawa & Bedside Care',
    warriorsHeroDesc: 'Jaipur ke govt cancer hospitals me admit garib bacchon aur patients ki chemotherapy medicines, platelet kits aur ilaaj me direct support karein.',
    warriorsSponsorBtn: 'Warrior Ko Adopt Karein',

    educationBack: '← Back to Home',
    educationBadge: 'Bacchon Ki Padhai & Education',
    educationHeroTitle: 'Slum Bacchon Ke Liye School Bags & Stationery Kits',
    educationHeroDesc: 'Jaipur ke slum clusters me bacchon ko waterproof school bags, notebooks, colors, pens aur mentorship support dena.',
    educationSponsorBtn: 'School Kit Sponsor Karein (₹899)',

    galleryBack: '← Back to Home',
    galleryBadge: '100% Real Ground Photos',
    galleryHeroTitle: 'Govt Hospitals Me Real Seva Ki Live Photos',
    galleryHeroDesc: 'Bedside hospital distributions aur slum drives me click ki gayi 100% real, verified photos.',

    volunteerBack: '← Back to Home',
    volunteerBadge: 'Seva Squad Join Karein',
    volunteerHeroTitle: 'Jaipur Me Ground Volunteer Banein',
    volunteerHeroDesc: 'Har Ekadashi govt hospitals me nariyal seva aur slum bacchon ko padhane ke liye humari seva team se judein.',
    volunteerSubmitBtn: 'Application Submit Karein',

    sponsorNow: 'Abhi Sponsor Karein',
    viewStory: 'Story Padhein & Madad Karein',
    verifiedTax: '80G Tax Exemption Receipt Sath Me',
    close: 'Band Karein',
    donorId: 'Donor ID',
    selectLanguage: 'Bhasha Chunein',
  },
};
