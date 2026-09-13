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
    heroTitle1: 'Musibat Ke Waqt',
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

    sponsorNow: 'Abhi Sponsor Karein',
    viewStory: 'Story Padhein & Madad Karein',
    verifiedTax: '80G Tax Exemption Receipt Sath Me',
    close: 'Band Karein',
    donorId: 'Donor ID',
    selectLanguage: 'Bhasha Chunein',
  },
};
