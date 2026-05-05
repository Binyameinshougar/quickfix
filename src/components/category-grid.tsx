"use client";

import {
  Bubbles,
  Calculator,
  Car,
  FileText,
  GraduationCap,
  Hammer,
  Home,
  Languages,
  Monitor,
  MoreHorizontal,
  Package,
  Paintbrush,
  PlugZap,
  Refrigerator,
  Sparkles,
  Trees,
  Truck,
  Wrench,
  Fan,
} from "lucide-react";
import { serviceCategories } from "@/lib/demo-data";
import type { ServiceCategory } from "@/lib/types";
import { categoryDescriptionTranslations, categoryTranslations } from "@/lib/translations";
import { useLanguage } from "./language-provider";
import { Badge } from "./ui";

const iconMap: Record<ServiceCategory, typeof Wrench> = {
  Electrical: PlugZap,
  Plumbing: Wrench,
  HVAC: Fan,
  Cleaning: Sparkles,
  Moving: Truck,
  Handyman: Hammer,
  "Appliance Repair": Refrigerator,
  "Mobile Mechanic": Car,
  Painting: Paintbrush,
  Carpentry: Hammer,
  Landscaping: Trees,
  "Home Repair": Home,
  Delivery: Package,
  "Tax Help": Calculator,
  "Immigration Paperwork Help": FileText,
  Translation: Languages,
  "Student Help": GraduationCap,
  "Web Design": Monitor,
  "General Local Services": MoreHorizontal,
};

export function CategoryGrid() {
  const { language, t } = useLanguage();

  return (
    <div className="card-grid">
      {serviceCategories.map((category) => {
        const Icon = iconMap[category.name] ?? Bubbles;
        return (
          <div key={category.name} className="premium-card premium-card-hover group flex min-h-[220px] flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e8f3ff] text-[#0f6bff] shadow-sm ring-1 ring-blue-100 transition group-hover:bg-[#0f6bff] group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              {category.emergencyReady && <Badge tone="danger">{t("category.emergency")}</Badge>}
            </div>
            <h3 className="mt-5 text-lg font-black leading-6 text-[#102027]">{categoryTranslations[language][category.name]}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#5c6f77]">{categoryDescriptionTranslations[language][category.name] ?? category.description}</p>
            <div className="mt-4 h-1 rounded-full bg-[#e6f0f4]">
              <div className={`h-full rounded-full ${category.emergencyReady ? "w-4/5 bg-[#f05a28]" : "w-3/5 bg-[#12b981]"}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
