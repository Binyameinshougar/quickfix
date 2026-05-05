import type { ServiceCategory, Urgency } from "./types";

export type AIAnalysis = {
  category: ServiceCategory;
  urgency: Urgency;
  possibleIssue: string;
  recommendedFirstAction: string;
  estimatedPriceRange: string;
  bestProviderType: string;
  safetyWarning: string;
  safetyTips: string[];
  providerSummary: string;
  photoAnalysis: string;
};

const priceRanges: Record<ServiceCategory, string> = {
  Electrical: "$120 - $320",
  Plumbing: "$90 - $220",
  HVAC: "$120 - $350",
  Cleaning: "$90 - $260",
  Moving: "$80 - $220",
  Handyman: "$60 - $180",
  "Appliance Repair": "$100 - $280",
  "Mobile Mechanic": "$80 - $240",
  Painting: "$150 - $650",
  Carpentry: "$120 - $500",
  Landscaping: "$80 - $350",
  "Home Repair": "$75 - $280",
  Delivery: "$25 - $120",
  "Tax Help": "$60 - $220",
  "Immigration Paperwork Help": "$80 - $260",
  Translation: "$40 - $180",
  "Student Help": "$30 - $140",
  "Web Design": "$250 - $1200",
  "General Local Services": "$40 - $250",
};

const safetyTips: Record<ServiceCategory, string[]> = {
  Electrical: [
    "Turn off the breaker if safe",
    "Do not touch exposed wires",
    "Keep children away",
    "Wait for a verified electrician",
  ],
  Plumbing: [
    "Turn off the water valve if possible",
    "Move electronics away from water",
    "Take before photos",
    "Avoid touching electrical items near water",
  ],
  HVAC: ["Turn off the unit if it smells hot", "Check vents only if safe", "Keep children away", "Ask for license details"],
  Cleaning: ["Keep walkways clear", "Secure valuables", "Ventilate the area", "Share priority rooms with the provider"],
  Moving: ["Clear walking paths", "Protect floors and walls", "Do not lift heavy items alone", "Confirm truck access"],
  Handyman: ["Confirm wall materials", "Move fragile items", "Keep tools away from children", "Photograph the work area"],
  "Appliance Repair": ["Unplug the appliance if safe", "Do not force damaged parts", "Clear access space", "Share model details"],
  "Mobile Mechanic": ["Park safely", "Do not stand near traffic", "Share vehicle details", "Confirm parts before repair"],
  Painting: ["Clear furniture", "Ventilate rooms", "Confirm paint type", "Protect floors"],
  Carpentry: ["Clear the work area", "Confirm measurements", "Keep children away", "Photograph existing damage"],
  Landscaping: ["Mark sprinkler heads", "Secure pets", "Share gate access", "Confirm waste removal"],
  "Home Repair": ["Document the issue", "Clear access", "Avoid unsafe structures", "Ask for experience details"],
  Delivery: ["Confirm pickup details", "Avoid sharing sensitive info", "Use public handoff when possible", "Track arrival time"],
  "Tax Help": ["Do not send sensitive documents in public chat", "Confirm qualifications", "Keep copies", "Review before signing"],
  "Immigration Paperwork Help": ["Avoid sharing originals unnecessarily", "Confirm language needs", "Review forms carefully", "Ask about experience"],
  Translation: ["Confirm language pair", "Avoid sharing sensitive info publicly", "Review final text", "Keep copies"],
  "Student Help": ["Confirm scope", "Meet in safe locations", "Keep guardian approval if needed", "Set clear timing"],
  "Web Design": ["Clarify deliverables", "Share references", "Avoid sharing passwords", "Confirm ownership of files"],
  "General Local Services": ["Clarify scope", "Compare offers", "Confirm identity", "Keep communication on the platform"],
};

export function analyzeProblem(description: string, selectedUrgency?: Urgency): AIAnalysis {
  const text = description.toLowerCase();
  const has = (words: string[]) => words.some((word) => text.includes(word));

  let category: ServiceCategory = "General Local Services";
  if (has(["gas smell", "flooding", "flood", "no heat", "danger", "emergency"])) category = "Home Repair";
  if (has(["sink", "leak", "leaking", "pipe", "water", "toilet", "drain", "fregadero", "goteando", "fuga", "agua", "plomería", "plomeria"])) category = "Plumbing";
  if (has(["spark", "outlet", "breaker", "wire", "electrical", "power", "chispas", "enchufe", "electricidad", "cable"])) category = "Electrical";
  if (has(["hvac", "heat", "cooling", "ac", "air conditioner", "furnace"])) category = "HVAC";
  if (has(["clean", "mess", "deep clean", "spill"])) category = "Cleaning";
  if (has(["move", "couch", "furniture", "truck"])) category = "Moving";
  if (has(["washer", "dryer", "fridge", "oven", "appliance"])) category = "Appliance Repair";
  if (has(["car", "brake", "engine", "mobile mechanic", "vehicle"])) category = "Mobile Mechanic";
  if (has(["paint", "painting"])) category = "Painting";
  if (has(["tax", "irs", "return"])) category = "Tax Help";
  if (has(["immigration", "uscis", "paperwork"])) category = "Immigration Paperwork Help";
  if (has(["translate", "translation"])) category = "Translation";
  if (has(["website", "web design"])) category = "Web Design";

  let urgency: Urgency = "Medium";
  if (has(["gas smell", "sparks", "spark", "flooding", "flood", "lockout at night", "no heat", "danger", "olor a gas", "chispas", "inundación", "inundacion", "peligro"])) urgency = "Emergency";
  else if (has(["water everywhere", "heavy leak", "leaking", "urgent", "within 1 hour", "agua en el piso", "goteando", "urgente", "fuga fuerte"])) urgency = "High";
  else if (has(["today", "soon", "guest", "guests"])) urgency = "Medium";
  else if (has(["next week", "when possible", "not urgent"])) urgency = "Low";

  if (selectedUrgency) urgency = selectedUrgency;

  const possibleIssueByCategory: Record<ServiceCategory, string> = {
    Electrical: "Damaged outlet, loose wiring, overloaded circuit, or breaker issue",
    Plumbing: "Leaking pipe, broken sink drain, loose fitting, or failed supply line",
    HVAC: "Heating or cooling system issue that may need a local HVAC technician",
    Cleaning: "Time-sensitive deep cleaning or urgent cleanup need",
    Moving: "Labor and transport support for furniture or boxes",
    Handyman: "General repair or installation task requiring tools and inspection",
    "Appliance Repair": "Faulty appliance component, blocked line, or electrical/mechanical failure",
    "Mobile Mechanic": "Vehicle issue requiring local mobile mechanic support",
    Painting: "Painting or surface preparation request",
    Carpentry: "Wood repair, trim, shelving, or door issue",
    Landscaping: "Yard maintenance, cleanup, or outdoor service request",
    "Home Repair": "General home issue that may need a local repair provider",
    Delivery: "Local pickup, errand, or delivery request",
    "Tax Help": "Tax preparation or paperwork support request",
    "Immigration Paperwork Help": "Document preparation, form support, or translation-adjacent help",
    Translation: "Translation or interpretation request",
    "Student Help": "Student support, tutoring, errands, or setup help",
    "Web Design": "Simple website or local business web request",
    "General Local Services": "General local service request needing provider offers",
  };

  const firstActionByCategory: Record<ServiceCategory, string> = {
    Electrical: "Stop using the outlet and turn off the breaker if safe",
    Plumbing: "Turn off the water valve if possible",
    HVAC: "Turn off the unit if there is a burning smell or unsafe condition",
    Cleaning: "List the rooms and priority areas",
    Moving: "Clear walkways and note large items",
    Handyman: "Take a clear photo of the repair area",
    "Appliance Repair": "Unplug the appliance if safe and note the model number",
    "Mobile Mechanic": "Move the vehicle to a safe location if possible",
    Painting: "Clear furniture and confirm paint colors",
    Carpentry: "Measure the area and take clear photos",
    Landscaping: "Share yard access details and priority areas",
    "Home Repair": "Document the issue and avoid unsafe areas",
    Delivery: "Confirm pickup, dropoff, and timing details",
    "Tax Help": "Prepare documents and avoid sharing sensitive data in public chat",
    "Immigration Paperwork Help": "List the forms or documents that need help",
    Translation: "Share the language pair and document type",
    "Student Help": "Describe the exact task and preferred time",
    "Web Design": "Share examples and a short project goal",
    "General Local Services": "Add photos and describe what outcome you need",
  };

  const bestProviderTypeByCategory: Record<ServiceCategory, string> = {
    Electrical: "licensed electrician",
    Plumbing: urgency === "Emergency" || urgency === "High" ? "urgent plumbing provider" : "local plumber",
    HVAC: "local HVAC technician",
    Cleaning: "verified cleaning team",
    Moving: "moving helper with equipment",
    Handyman: "verified handyman",
    "Appliance Repair": "appliance repair technician",
    "Mobile Mechanic": "mobile mechanic",
    Painting: "painting provider",
    Carpentry: "carpentry provider",
    Landscaping: "landscaping provider",
    "Home Repair": "local home repair provider",
    Delivery: "local delivery helper",
    "Tax Help": "tax paperwork helper",
    "Immigration Paperwork Help": "paperwork support provider",
    Translation: "translation provider",
    "Student Help": "student support provider",
    "Web Design": "web design provider",
    "General Local Services": "qualified local provider",
  };

  return {
    category,
    urgency,
    possibleIssue: possibleIssueByCategory[category],
    recommendedFirstAction: firstActionByCategory[category],
    estimatedPriceRange: priceRanges[category],
    bestProviderType: bestProviderTypeByCategory[category],
    safetyWarning:
      category === "Electrical"
        ? "Do not touch exposed wires or sparking outlets."
        : category === "Home Repair" && urgency === "Emergency"
          ? "If there is immediate danger, leave the area and call local emergency services."
          : category === "Plumbing"
            ? "Move electronics away from water and avoid wet electrical surfaces."
            : "Keep the work area clear and document the issue with photos.",
    safetyTips: safetyTips[category],
    providerSummary: `Customer reports ${description || "a local home-service issue"}. Possible issue: ${
      possibleIssueByCategory[category]
    }. Urgency is ${urgency.toLowerCase()}. Provider should bring ${category.toLowerCase()} tools and review the safety notes before arrival.`,
    photoAnalysis:
      category === "Plumbing"
        ? "Possible leaking pipe detected. Recommended category: Plumbing. Urgency: High."
        : `Mock photo scan ready. Recommended category: ${category}. Urgency: ${urgency}.`,
  };
}

export function buildProviderProfile(input: string) {
  const text = input.toLowerCase();
  const isPlumbing = text.includes("plumb") || text.includes("sink") || text.includes("toilet") || text.includes("leak");
  const isElectric = text.includes("electric") || text.includes("outlet") || text.includes("breaker");
  const isCleaning = text.includes("clean");
  const yearsMatch = text.match(/(\d+)\s*(years|year)/);
  const years = yearsMatch ? yearsMatch[1] : "several";

  const category = isPlumbing ? "plumbing" : isElectric ? "electrical" : isCleaning ? "cleaning" : "home repair";
  const skills = isPlumbing
    ? ["Sink repair", "Toilet repair", "Pipe leak repair", "Drain cleaning", "Emergency water shutoff"]
    : isElectric
      ? ["Outlet repair", "Breaker checks", "Fixture installation", "Electrical safety triage"]
      : isCleaning
        ? ["Deep cleaning", "Move-out cleaning", "Kitchen detail", "Urgent cleanup"]
        : ["Minor repairs", "Installation help", "Troubleshooting", "Customer communication"];

  return {
    bio: `I am an experienced ${category} service provider with ${years} years of hands-on experience. I help customers resolve urgent and routine home-service issues quickly, safely, and professionally.`,
    serviceDescription: `Reliable ${category} support for local customers who need clear pricing, responsive communication, and verified service quality.`,
    skills,
    packages: skills.slice(0, 4).map((skill, index) => ({
      name: skill,
      price: `Starting from $${[80, 120, 150, 95][index]}`,
    })),
    suggestedPriceRange: isElectric ? "$95 - $260" : isCleaning ? "$90 - $240" : "$80 - $220",
  };
}

export function fairPriceMessage(status: string, typicalRange: string, price: number) {
  if (status === "Too high") {
    return `This $${price} offer looks higher than the typical demo range of ${typicalRange}. Emergency fees may apply, but customers should compare offers.`;
  }
  if (status === "Unusually low") {
    return `This $${price} offer is below the typical demo range of ${typicalRange}. Customers should confirm scope, verification, and materials.`;
  }
  if (status === "Slightly high") {
    return `This $${price} offer is slightly above the typical demo range of ${typicalRange}. Compare ETA, rating, and emergency availability.`;
  }
  return `This $${price} offer fits the typical demo range of ${typicalRange}.`;
}
