"use client";

import { BadgeCheck, Clock, DollarSign, ShieldCheck } from "lucide-react";
import { offers, providers, jobs } from "@/lib/demo-data";
import { fairPriceMessage } from "@/lib/ai";
import { categoryTranslations } from "@/lib/translations";
import { useLanguage } from "./language-provider";
import { Badge, Rating, ScoreBadge } from "./ui";

export function OfferComparison() {
  const { language } = useLanguage();
  const es = language === "es";
  const job = jobs[0];
  const rows = offers.map((offer) => {
    const provider = providers.find((item) => item.id === offer.providerId);
    if (!provider) return null;
    return { offer, provider };
  }).filter(Boolean);

  return (
    <section className="premium-card rounded-lg p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-[#0f6bff]">{es ? "Comparación de proveedores" : "Provider comparison"}</p>
          <h2 className="mt-2 text-2xl font-black text-[#102027]">{es ? "Compara ofertas para la fuga del fregadero" : `Compare offers for ${job.title}`}</h2>
          <p className="mt-2 text-sm text-[#5c6f77]">
            {es
              ? "QuickFix compara precio, ETA, calificación, trabajos, verificación, confianza, confiabilidad y razón de match."
              : "QuickFix compares price, ETA, rating, completed jobs, verification, trust, reliability, and match reason."}
          </p>
        </div>
        <Badge tone="warning">{es ? "Rango típico" : "Typical range"}: {job.priceRange}</Badge>
      </div>
      <div className="table-scroll mt-5">
        <table className="w-full min-w-[860px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase text-[#5c6f77]">
              <th className="rounded-l-lg bg-[#f5fafb] py-3 pl-3 pr-4">{es ? "Proveedor" : "Provider"}</th>
              <th className="bg-[#f5fafb] py-3 pr-4">{es ? "Precio" : "Price"}</th>
              <th className="bg-[#f5fafb] py-3 pr-4">ETA</th>
              <th className="bg-[#f5fafb] py-3 pr-4">{es ? "Calificación" : "Rating"}</th>
              <th className="bg-[#f5fafb] py-3 pr-4">{es ? "Trabajos" : "Jobs"}</th>
              <th className="bg-[#f5fafb] py-3 pr-4">{es ? "Verificación" : "Verification"}</th>
              <th className="bg-[#f5fafb] py-3 pr-4">{es ? "Puntajes" : "Scores"}</th>
              <th className="rounded-r-lg bg-[#f5fafb] py-3 pr-4">{es ? "Razón de match" : "Match reason"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              if (!row) return null;
              return (
                <tr key={row.offer.id} className="align-top">
                  <td className="border-b border-[#edf4f6] py-4 pl-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={row.provider.profilePhoto} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-[#102027]">{row.provider.name}</p>
                        <p className="text-xs text-[#5c6f77]">{categoryTranslations[language][row.provider.category]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[#edf4f6] py-4 pr-4">
                    <p className="inline-flex items-center gap-1 font-bold text-[#102027]">
                      <DollarSign className="h-4 w-4 text-[#12b981]" />
                      {row.offer.price}
                    </p>
                    <p className="mt-1 text-xs text-[#5c6f77]">{row.offer.fairPriceStatus}</p>
                  </td>
                  <td className="border-b border-[#edf4f6] py-4 pr-4">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4 text-[#0f6bff]" />
                      {row.offer.etaMinutes} min
                    </span>
                  </td>
                  <td className="border-b border-[#edf4f6] py-4 pr-4">
                    <Rating rating={row.provider.rating} />
                  </td>
                  <td className="border-b border-[#edf4f6] py-4 pr-4">{row.provider.completedJobs}</td>
                  <td className="border-b border-[#edf4f6] py-4 pr-4">
                    <Badge tone={row.provider.kycStatus === "Verified" ? "success" : "warning"}>
                      {row.provider.kycStatus === "Verified" ? <BadgeCheck className="mr-1 h-3.5 w-3.5" /> : <ShieldCheck className="mr-1 h-3.5 w-3.5" />}
                      {row.provider.kycStatus}
                    </Badge>
                  </td>
                  <td className="border-b border-[#edf4f6] py-4 pr-4">
                    <div className="flex flex-col gap-2">
                      <ScoreBadge label="Trust Score" score={row.provider.trustScore} />
                      <ScoreBadge label="Reliability Score" score={row.provider.reliabilityScore} />
                    </div>
                  </td>
                  <td className="max-w-sm border-b border-[#edf4f6] py-4 pr-4">
                    <p className="text-sm leading-6 text-[#5c6f77]">{row.offer.aiMatchReason}</p>
                    <p className="mt-2 rounded-lg bg-[#f5fafb] p-2 text-xs leading-5 text-[#39505a]">{fairPriceMessage(row.offer.fairPriceStatus, job.priceRange, row.offer.price)}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
