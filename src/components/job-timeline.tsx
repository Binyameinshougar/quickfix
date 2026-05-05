"use client";

import { CheckCircle2, Circle, Clock3 } from "lucide-react";
import { jobTimeline } from "@/lib/demo-data";
import { useLanguage } from "./language-provider";

export function JobTimeline({ activeStep = 4 }: { activeStep?: number }) {
  const { language } = useLanguage();
  const steps =
    language === "es"
      ? [
          "Solicitud publicada",
          "IA analizó",
          "Ofertas recibidas",
          "Proveedor aceptado",
          "Proveedor en camino",
          "Trabajo iniciado",
          "Trabajo completado",
          "Pago liberado",
          "Reseña enviada",
        ]
      : jobTimeline;

  return (
    <div className="premium-card rounded-lg p-5">
      <h3 className="text-lg font-black text-[#102027]">{language === "es" ? "Estado del trabajo" : "Live job status"}</h3>
      <p className="mt-1 text-sm text-[#5c6f77]">
        {language === "es" ? "Línea de tiempo demo para el ciclo completo del servicio." : "Demo timeline for the full service lifecycle."}
      </p>
      <div className="mt-5 grid gap-3">
        {steps.map((step, index) => {
          const complete = index < activeStep;
          const active = index === activeStep;
          return (
            <div key={step} className={`flex items-center gap-3 rounded-lg px-2 py-2 ${active ? "bg-blue-50" : ""}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${complete ? "bg-emerald-50 text-emerald-600" : active ? "bg-white text-[#0f6bff] shadow-sm" : "bg-slate-100 text-slate-300"}`}>
                {complete ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : active ? (
                  <Clock3 className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </span>
              <span className={`text-sm ${complete || active ? "font-semibold text-[#102027]" : "text-[#7a8d95]"}`}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
