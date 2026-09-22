export interface DriveItem {
  id: string;
  name: string;
  tagline: string;
  category: 'hospital' | 'education' | 'livelihood';
  price: number;
  unitLabel: string;
  targetCount: string;
  deliveredCount: string;
  percentage: number;
  color: string;
  badge: string;
  badgeIcon?: string;
  image?: string;
  description: string;
  impactMetrics: string;
  options: {
    primary: string;
    secondary: string;
  };
  status?: 'active' | 'upcoming' | 'completed';
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  hospitalWard: string;
  city: string;
  image: string;
  story: string;
  medicalNeeds: string[];
  targetAmount: number; // Fixed ₹15,000 per care unit
  fundedAmount: number;
  fundingPercentage: number;
  cyclesCompleted: number;
  totalCycles: number;
  urgency: 'Critical Priority' | 'Active Chemo Protocol' | 'Post-Op Care';
  monthlyMedCost: number;
  verificationId: string;
}

export interface ChildSpotlightProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  category: string;
  title: string;
  location: string;
  stat: string;
  image: string;
  story: string;
  criticalNeeds: string[];
  suggestedDonation: number;
  unitLabel: string;
  verificationNode: string;
  bedNumber?: string;
  guardianName?: string;
  guardianPhone?: string;
  monthlyNeed?: number;
  duration?: string;
}

export interface SevaScheduleEvent {
  id: string;
  title: string;
  tithi: string;
  date: string;
  hospital: string;
  timing?: string;
  targetCoconuts: number;
  sponsoredCoconuts: number;
  status: 'active_today' | 'upcoming' | 'completed';
  description: string;
  // Custom Seva Offerings & Media fields:
  sevaItems?: string[];
  image?: string;
  customOfferingsNote?: string;
  pricePerUnit?: number;
  unitLabel?: string;
}

export interface HospitalNode {
  id: string;
  name: string;
  category: string;
  specialty: string;
  location: string;
  bedsideCapacity: string;
  verificationNode: string;
}

export interface LeaderboardDonor {
  id: string;
  name: string;
  batchCode: string;
  patientAdopted: string;
  amount: number;
  isVerified: boolean;
  timestamp: string;
  city: string;
  receiptNumber: string;
  donorId?: string;
  phone?: string;
  email?: string;
  panNumber?: string;
  dob?: string;
  scheduledDate?: string;
}

export interface DonorProfile {
  donorId: string;
  fullName: string;
  phone: string;
  email?: string;
  dob?: string;
  panNumber?: string;
  totalDonated: number;
  donationsCount: number;
  lastDonationDate: string;
  badge: string;
  receipts?: Array<{
    receiptNo: string;
    date: string;
    amount: number;
    driveName: string;
    panNumber?: string;
  }>;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Healthcare Drives' | 'Children & Slum Education' | 'Women Sewing Training' | 'Disabled Livelihoods' | string;
  location: string;
  date: string;
  image: string;
  images?: string[]; // Multiple photos for this activity
  stats: string;
  summary: string;
  fullStory: string;
  impactMetrics: string;
  driveReferenceId?: string;
  isRecent?: boolean;
  createdAt?: number;
}

export interface MediaPhotoCard {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  stats: string;
  description: string;
  fullStory: string;
  defaultPrice: number;
  unitLabel: string;
  driveItemIndex?: number;
}

export interface FoundationStats {
  coconutsDelivered: string;
  schoolBagsDistributed: string;
  activeVolunteers: string;
  mealsServed: string;
  totalBeneficiaries: string;
  cinNumber: string;
  taxExemption: string;
  upiId: string;
  phone: string;
  email: string;
}

export interface CheckoutModalState {
  isOpen: boolean;
  item: DriveItem | null;
  selectedOption: string;
  quantity: number;
  donorName: string;
  donorPhone: string;
  panNumber?: string;
  isTaxExemptRequired: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  transactionId?: string;
  selectedDate?: string;
}

export interface VolunteerFormData {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  city: string;
  interestTrack: string;
  availability: string;
  notes: string;
  timestamp?: string;
}

export interface VolunteerSubmission {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  track: string;
  availability: string;
  status?: 'pending' | 'contacted' | 'approved';
  timestamp: string;
}

export interface CareerFormData {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  experienceLevel: string;
  linkedInOrResume: string;
  coverNote: string;
  timestamp?: string;
}

export interface HeroContentConfig {
  videoUrl: string;
  posterUrl: string;
  badgeText: string;
  title1: string;
  title2: string;
  title3: string;
  subtitle: string;
  logoUrl?: string;
  showFrames?: boolean;
  showLeftFrame?: boolean;
  showRightFrame?: boolean;
  frameTheme?: 'matte-white' | 'gold-foil' | 'vintage-polaroid' | 'emerald';
  frameStrap?: 'short' | 'standard' | 'long';
  frameMotion?: 'gentle' | 'calm' | 'dynamic';
  frameAutoRotate?: boolean;
}

export interface StoryContentConfig {
  missionTitle: string;
  missionHighlight: string;
  storyQuote: string;
  paragraph1: string;
  harEkadashiVow: string;
  ethosImage: string;
  establishedText: string;
}

export interface BankDetailsConfig {
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  branch: string;
  accountType: string;
}

export interface InaugurationConfig {
  enabled: boolean;
  developerName: string;
  inaugurationTitle?: string;
}

