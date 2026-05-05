"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Languages, MapPin, MessageCircle, PackageCheck, ShieldCheck, Zap } from "lucide-react";
import type { Provider } from "@/lib/types";
import { categoryTranslations } from "@/lib/translations";
import { useLanguage } from "./language-provider";
import { Badge, Rating, ScoreBadge } from "./ui";

export function ProviderCard({ provider, highlight = false }: { provider: Provider; highlight?: boolean }) {
  const { language } = useLanguage();

  return (
    <article className={`premium-card premium-card-hover flex h-full flex-col overflow-hidden ${highlight ? "border-[#0f6bff] ring-2 ring-blue-100" : ""}`}>
      <div className="relative h-20 bg-[#102027]">
        <img src={provider.coverPhoto} alt="" className="h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,22,32,0.82),rgba(6,22,32,0.1))]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {highlight && <Badge tone="blue">{language === "es" ? "Mejor opción" : "Best Match"}</Badge>}
          {provider.badges.includes("Emergency Provider") && (
            <Badge tone="danger">
              <Zap className="mr-1 h-3.5 w-3.5" />
              {language === "es" ? "Urgencias" : "Emergency ready"}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="-mt-12 flex gap-4">
          <img src={provider.profilePhoto} alt={`${provider.name} profile`} className="relative h-20 w-20 rounded-lg border-4 border-white object-cover shadow-lg" />
          <div className="min-w-0 flex-1">
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <h3 className="min-w-0 break-words text-xl font-black leading-6 text-[#102027]">{provider.name}</h3>
              {provider.kycStatus === "Verified" && (
                <Badge tone="success">
                  <BadgeCheck className="mr-1 h-3.5 w-3.5" />
                  {language === "es" ? "Proveedor verificado" : "Verified Provider"}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm font-medium leading-5 text-[#5c6f77]">{provider.categories.map((category) => categoryTranslations[language][category]).join(" + ")}</p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              <Rating rating={provider.rating} />
              <span className="inline-flex items-center gap-1 text-sm leading-5 text-[#5c6f77]">
                <Clock className="h-4 w-4 shrink-0" />
                ETA {provider.etaMinutes} min
              </span>
              <span className="inline-flex min-w-0 items-center gap-1 text-sm leading-5 text-[#5c6f77]">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="max-w-[180px] truncate">{provider.serviceArea}</span>
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#5c6f77]">{provider.bio}</p>

        <div className="mt-5 grid gap-3">
          <ScoreBar label="Trust Score" value={provider.trustScore} suffix="%" />
          <ScoreBar label="Reliability Score" value={provider.reliabilityScore} suffix="/100" />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <ScoreBadge label="Trust Score" score={provider.trustScore} />
          <ScoreBadge label="Reliability Score" score={provider.reliabilityScore} />
          <Badge tone={provider.kycStatus === "Verified" ? "success" : "warning"}>
            <ShieldCheck className="mr-1 h-3.5 w-3.5" />
            {language === "es" ? "Nivel" : "Level"} {provider.verificationLevel}
          </Badge>
        </div>

        <div className="mt-4 grid gap-3 rounded-lg border border-[#dbe7ec] bg-[#f5fafb] p-3">
          <div className="flex items-start gap-2 text-sm text-[#5c6f77]">
            <Languages className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6bff]" />
            <span><span className="font-black text-[#102027]">{language === "es" ? "Idiomas" : "Languages"}:</span> {provider.languages.join(", ")}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-[#5c6f77]">
            <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#12b981]" />
            <span>
              <span className="font-black text-[#102027]">{language === "es" ? "Paquetes" : "Packages"}:</span>{" "}
              {provider.servicePackages.slice(0, 2).map((pack) => pack.name).join(", ")}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 rounded-lg border border-[#dbe7ec] bg-white p-3 text-center">
          <div>
            <p className="text-lg font-black text-[#102027]">{provider.completedJobs}</p>
            <p className="text-xs text-[#5c6f77]">{language === "es" ? "Trabajos" : "Jobs"}</p>
          </div>
          <div>
            <p className="text-lg font-black text-[#102027]">{provider.responseTimeMinutes}m</p>
            <p className="text-xs text-[#5c6f77]">{language === "es" ? "Respuesta" : "Response"}</p>
          </div>
          <div>
            <p className="text-lg font-black text-[#102027]">{provider.startingPrice}</p>
            <p className="text-xs text-[#5c6f77]">{language === "es" ? "Desde" : "Starts"}</p>
          </div>
        </div>

        <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
          <Link href="/request" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#0f6bff] px-4 py-2 text-center text-sm font-black leading-5 text-white shadow-[0_14px_30px_rgba(15,107,255,0.2)] transition hover:bg-[#0b55d9]">
            {language === "es" ? "Contratar" : "Hire"}
          </Link>
          <Link href="/chat" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#cddde4] bg-white px-4 py-2 text-center text-sm font-black leading-5 text-[#102027] shadow-sm transition hover:border-[#0f6bff] hover:bg-blue-50">
            <MessageCircle className="h-4 w-4" />
            {language === "es" ? "Mensaje" : "Message"}
          </Link>
        </div>
        <Link href={`/providers/${provider.id}`} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#102027] px-4 py-2 text-center text-sm font-bold leading-5 text-white transition hover:bg-[#203843]">
          {language === "es" ? "Ver perfil completo" : "View full profile"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function ScoreBar({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold text-[#5c6f77]">
        <span>{label}</span>
        <span className="text-[#102027]">{value}{suffix}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-[#e5f0f3]">
        <div className="h-full rounded-full bg-[linear-gradient(90deg,#0f6bff,#12b981)]" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}
