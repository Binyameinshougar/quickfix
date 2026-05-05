"use client";

import { CheckCircle2, DollarSign, ShieldAlert, Sparkles, Stethoscope, Wrench } from "lucide-react";
import type { AIAnalysis } from "@/lib/ai";
import { categoryTranslations, urgencyTranslations } from "@/lib/translations";
import { useLanguage } from "./language-provider";
import { Badge, UrgencyBadge } from "./ui";

export function AIAnalysisCard({ analysis }: { analysis: AIAnalysis }) {
  const { language, t } = useLanguage();
  const localized = localizeAnalysis(analysis, language);
  const details = [
    { label: t("analysis.category"), value: categoryTranslations[language][analysis.category], icon: <Wrench className="h-5 w-5" /> },
    { label: t("analysis.possibleIssue"), value: localized.possibleIssue, icon: <Stethoscope className="h-5 w-5" /> },
    { label: t("analysis.estimatedRange"), value: analysis.estimatedPriceRange, icon: <DollarSign className="h-5 w-5" /> },
    { label: t("analysis.bestProviderType"), value: localized.bestProviderType, icon: <Sparkles className="h-5 w-5" /> },
  ];

  return (
    <section className={`premium-card overflow-hidden rounded-lg ${analysis.urgency === "Emergency" ? "border-red-300 ring-2 ring-red-100" : ""}`}>
      <div className={`h-1.5 ${analysis.urgency === "Emergency" ? "bg-[linear-gradient(90deg,#dc2626,#f05a28,#f59e0b)]" : "bg-[linear-gradient(90deg,#0f6bff,#12b981)]"}`} />
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#0f6bff] ring-1 ring-blue-100">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-normal text-[#0f6bff]">{t("analysis.analyzer")}</p>
              <h2 className="mt-1 text-2xl font-black text-[#102027]">{t("analysis.result")}</h2>
            </div>
          </div>
          <UrgencyBadge urgency={analysis.urgency} />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {details.map((item) => (
            <div key={item.label} className="soft-panel rounded-lg p-4">
              <div className="flex items-start gap-2 text-sm font-black leading-5 text-[#102027]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0f6bff] shadow-sm">{item.icon}</span>
                <span className="min-w-0">{item.label}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-orange-200 bg-[linear-gradient(180deg,#fff7ed,#ffedd5)] p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-orange-700 shadow-sm">
              <ShieldAlert className="h-5 w-5" />
            </span>
            <div>
              <p className="font-black text-orange-950">{t("analysis.firstAction")}</p>
              <p className="mt-1 text-sm leading-6 text-orange-900">{localized.recommendedFirstAction}</p>
              <p className="mt-2 text-sm leading-6 text-orange-900">{localized.safetyWarning}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-black text-[#102027]">{t("analysis.safetyTips")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {localized.safetyTips.map((tip) => (
              <Badge key={tip} tone="success">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                {tip}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-5 rounded-lg bg-[#102027] p-4 text-white shadow-[0_18px_45px_rgba(16,32,39,0.22)]">
          <p className="text-sm font-bold text-cyan-200">{t("analysis.providerSummary")}</p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{localized.providerSummary}</p>
        </div>
        {language === "es" && (
          <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
            <p className="font-black">Ejemplo en español</p>
            <p className="mt-2">Categoría: {categoryTranslations.es[analysis.category]}</p>
            <p>Urgencia: {urgencyTranslations.es[analysis.urgency]}</p>
            <p>Rango estimado: {analysis.estimatedPriceRange}</p>
            <p>Consejo de seguridad: {localized.safetyWarning}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function localizeAnalysis(analysis: AIAnalysis, language: "en" | "es") {
  if (language === "en") {
    return analysis;
  }

  if (analysis.category === "Plumbing") {
    return {
      ...analysis,
      possibleIssue: "fuga debajo del fregadero",
      recommendedFirstAction: "cerrar la válvula de agua si es posible",
      bestProviderType: "plomero de emergencia",
      safetyWarning: "alejar aparatos eléctricos del agua",
      safetyTips: ["Cierra la válvula de agua si es posible", "Aleja aparatos eléctricos del agua", "Toma fotos antes del trabajo", "Evita tocar superficies eléctricas mojadas"],
      providerSummary:
        "El cliente reporta agua debajo del fregadero de la cocina. La posible causa es una fuga en la tubería o el drenaje. La urgencia es alta y el proveedor debe llevar herramientas de plomería.",
    };
  }

  return {
    ...analysis,
    possibleIssue: "solicitud local que necesita revisión del proveedor",
    recommendedFirstAction: "documentar el problema y agregar fotos si es posible",
    bestProviderType: "proveedor local calificado",
    safetyWarning: "mantén el área despejada y evita compartir información sensible",
    safetyTips: ["Describe el alcance", "Compara ofertas", "Confirma la identidad del proveedor", "Mantén la comunicación en la plataforma"],
    providerSummary: "El cliente reporta una solicitud de servicio local. El proveedor debe revisar la descripción, la urgencia y las notas de seguridad antes de enviar una oferta.",
  };
}
