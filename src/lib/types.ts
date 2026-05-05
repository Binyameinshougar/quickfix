export type Urgency = "Low" | "Medium" | "High" | "Emergency";

export type ServiceCategory =
  | "Electrical"
  | "Plumbing"
  | "HVAC"
  | "Cleaning"
  | "Moving"
  | "Handyman"
  | "Appliance Repair"
  | "Mobile Mechanic"
  | "Painting"
  | "Carpentry"
  | "Landscaping"
  | "Home Repair"
  | "Delivery"
  | "Tax Help"
  | "Immigration Paperwork Help"
  | "Translation"
  | "Student Help"
  | "Web Design"
  | "General Local Services";

export type KycStatus = "Pending" | "Verified" | "Rejected";

export type ProviderBadge =
  | "Verified Provider"
  | "Top Rated"
  | "Fast Response"
  | "Emergency Provider"
  | "Insured"
  | "Background Checked"
  | "New Provider"
  | "ID Verified"
  | "Phone Verified"
  | "Insurance Uploaded"
  | "Tools Verified"
  | "Background Check Pending";

export type ServicePackage = {
  name: string;
  description: string;
  price: string;
};

export type Provider = {
  id: string;
  name: string;
  category: ServiceCategory;
  categories: ServiceCategory[];
  rating: number;
  kycStatus: KycStatus;
  completedJobs: number;
  etaMinutes: number;
  trustScore: number;
  reliabilityScore: number;
  responseTimeMinutes: number;
  priceRange: string;
  startingPrice: string;
  hourlyRate?: string;
  profilePhoto: string;
  coverPhoto: string;
  bio: string;
  skills: string[];
  yearsExperience: number;
  serviceArea: string;
  availability: string;
  languages: string[];
  portfolioPhotos: string[];
  beforeAfterPhotos: string[];
  licenses: string[];
  certifications: string[];
  insuranceStatus: string;
  badges: ProviderBadge[];
  verificationLevel: number;
  servicePackages: ServicePackage[];
  reviews: {
    customer: string;
    rating: number;
    text: string;
    date: string;
  }[];
  workHistory: {
    title: string;
    category: ServiceCategory;
    status: string;
    rating: number;
  }[];
  disputeCount: number;
  noShowReports: number;
};

export type Job = {
  id: string;
  title: string;
  category: ServiceCategory;
  urgency: Urgency;
  status: string;
  locationArea: string;
  description: string;
  aiSummary: string;
  possibleCause: string;
  priceRange: string;
  safetyNotes: string[];
  toolsNeeded: string[];
  createdAt: string;
};

export type Offer = {
  id: string;
  jobId: string;
  providerId: string;
  price: number;
  etaMinutes: number;
  message: string;
  fairPriceStatus: "Fair" | "Slightly high" | "Too high" | "Unusually low";
  aiMatchReason: string;
};
