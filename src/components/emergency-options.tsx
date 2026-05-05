"use client";

import { useState } from "react";
import { AlertTriangle, ChevronDown, Flame, KeyRound, PlugZap, ThermometerSnowflake, Waves, Wrench } from "lucide-react";
import { useLanguage } from "./language-provider";
import { Badge } from "./ui";

const options = [
  { name: "Plumbing Emergency", icon: Wrench },
  { name: "Electrical Emergency", icon: PlugZap },
  { name: "Lockout", icon: KeyRound },
  { name: "Gas smell", icon: Flame },
  { name: "Flooding", icon: Waves },
  { name: "No heat", icon: ThermometerSnowflake },
  { name: "Urgent cleaning", icon: AlertTriangle },
];

export function EmergencyOptions() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const localizedOptions =
    language === "es"
      ? ["Emergencia de plomería", "Emergencia eléctrica", "Cerradura", "Olor a gas", "Inundación", "Sin calefacción", "Limpieza urgente"]
      : options.map((option) => option.name);

  return (
    <div className="overflow-hidden rounded-lg border border-orange-200 bg-[linear-gradient(135deg,#fff7ed,#ffedd5)] p-4 shadow-[0_18px_45px_rgba(240,90,40,0.14)] sm:p-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 rounded-lg bg-[#f05a28] px-4 py-4 text-left text-base font-black text-white shadow-[0_16px_34px_rgba(240,90,40,0.28)] transition hover:bg-[#d94d22] sm:gap-4 sm:px-5"
      >
        <span className="inline-flex min-w-0 flex-1 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/18 ring-1 ring-white/30">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block leading-5">{language === "es" ? "Necesito ayuda ahora" : "I need help now"}</span>
            <span className="mt-1 block text-xs font-semibold leading-4 text-orange-100">
              {language === "es" ? "Triaje rápido para servicios urgentes del hogar" : "Fast triage for urgent home-service issues"}
            </span>
          </span>
        </span>
        <ChevronDown className={`h-5 w-5 shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-4 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr))]">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <button key={option.name} type="button" className="premium-card-hover flex min-h-16 items-center gap-3 rounded-lg border border-orange-200 bg-white p-3.5 text-left text-sm font-black leading-5 text-[#102027] transition hover:border-orange-400 hover:bg-orange-50/50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 break-words leading-5">{localizedOptions[index]}</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Badge tone="danger">{language === "es" ? "Solicitudes urgentes resaltadas" : "Emergency requests stand out"}</Badge>
        <Badge tone="warning">{language === "es" ? "Llama a emergencias si alguien está en peligro" : "Call emergency services if anyone is in danger"}</Badge>
      </div>
    </div>
  );
}
