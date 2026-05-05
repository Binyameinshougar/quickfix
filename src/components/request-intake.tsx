"use client";

import { useMemo, useState } from "react";
import { Camera, MapPin, Send, Sparkles, Upload } from "lucide-react";
import { analyzeProblem, type AIAnalysis } from "@/lib/ai";
import type { ServiceCategory, Urgency } from "@/lib/types";
import { serviceCategories } from "@/lib/demo-data";
import { categoryTranslations, urgencyTranslations } from "@/lib/translations";
import { AIAnalysisCard } from "./ai-analysis-card";
import { useLanguage } from "./language-provider";
import { ActionButton, Badge, LoadingDemoState } from "./ui";

const questions = [
  "What happened?",
  "Is it still happening?",
  "Is there water near electricity?",
  "Do you need help within 1 hour?",
  "Can you upload a photo?",
  "Is anyone in danger?",
  "Do you know where the shutoff valve or breaker is?",
];

export function RequestIntake() {
  const { language, t } = useLanguage();
  const [title, setTitle] = useState("Kitchen sink leaking");
  const [description, setDescription] = useState("My sink is leaking and water is everywhere.");
  const [location, setLocation] = useState("West Loop");
  const [preferredTime, setPreferredTime] = useState("Today as soon as possible");
  const [urgency, setUrgency] = useState<"" | Urgency>("");
  const [category, setCategory] = useState<"" | ServiceCategory>("");
  const [photoName, setPhotoName] = useState("");
  const [analysis, setAnalysis] = useState<AIAnalysis>(() => analyzeProblem("My sink is leaking and water is everywhere."));

  const summary = useMemo(() => {
    const translatedCategory = categoryTranslations[language][analysis.category];
    const translatedUrgency = urgencyTranslations[language][analysis.urgency];
    return language === "es"
      ? `${title || translatedCategory} en ${location || "área del cliente"} - ${preferredTime || "horario flexible"} - urgencia ${translatedUrgency} - ${analysis.estimatedPriceRange}`
      : `${title || analysis.category} in ${location || "customer area"} - ${preferredTime || "time flexible"} - ${analysis.urgency} urgency - ${analysis.estimatedPriceRange}`;
  }, [analysis, language, location, preferredTime, title]);

  function runAnalysis() {
    const result = analyzeProblem(`${description} ${category}`, urgency || undefined);
    setAnalysis(result);
  }

  function useSpanishExample() {
    const input = "El fregadero está goteando y hay agua en el piso.";
    setTitle("Fregadero de cocina goteando");
    setDescription(input);
    setLocation("West Loop");
    setPreferredTime("Hoy lo antes posible");
    setCategory("Plumbing");
    setUrgency("");
    setAnalysis(analyzeProblem(input));
  }

  const localizedQuestions =
    language === "es"
      ? ["¿Qué pasó?", "¿Sigue ocurriendo?", "¿Hay agua cerca de electricidad?", "¿Necesitas ayuda dentro de 1 hora?", "¿Puedes subir una foto?", "¿Alguien está en peligro?", "¿Sabes dónde está la válvula o el breaker?"]
      : questions;
  const photoAnalysis =
    language === "es" && analysis.category === "Plumbing"
      ? "Posible tubería con fuga detectada. Categoría recomendada: Plomería. Urgencia: Alta."
      : analysis.photoAnalysis;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="premium-card rounded-lg p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#0f6bff] shadow-sm ring-1 ring-blue-100">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-[#102027]">{t("request.intakeTitle")}</h2>
            <p className="text-sm text-[#5c6f77]">{t("request.intakeCopy")}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-[#102027]">{t("request.requestTitle")}</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="premium-input px-3 text-sm"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-[#102027]">{t("request.problemDescription")}</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={6}
              className="premium-input p-3 text-sm leading-6"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#102027]">{t("request.category")}</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as ServiceCategory)}
                className="premium-input px-3 text-sm"
              >
                <option value="">{t("request.suggest")}</option>
                {serviceCategories.map((item) => (
                  <option key={item.name} value={item.name}>
                    {categoryTranslations[language][item.name]}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#102027]">{t("request.urgency")}</span>
              <select
                value={urgency}
                onChange={(event) => setUrgency(event.target.value as Urgency)}
                className="premium-input px-3 text-sm"
              >
                <option value="">{t("request.suggest")}</option>
                <option value="Low">{urgencyTranslations[language].Low}</option>
                <option value="Medium">{urgencyTranslations[language].Medium}</option>
                <option value="High">{urgencyTranslations[language].High}</option>
                <option value="Emergency">{urgencyTranslations[language].Emergency}</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#102027]">{t("request.location")}</span>
              <span className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-[#5c6f77]" />
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="premium-input w-full px-10 text-sm"
                />
              </span>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#102027]">{t("request.preferredTime")}</span>
              <input
                value={preferredTime}
                onChange={(event) => setPreferredTime(event.target.value)}
                className="premium-input px-3 text-sm"
              />
            </label>
          </div>
          <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#9fc4d3] bg-[#f7fbfc] p-4 text-center transition hover:border-[#0f6bff] hover:bg-blue-50/40">
            <Upload className="h-5 w-5 text-[#0f6bff]" />
            <span className="mt-2 text-sm font-bold text-[#102027]">{photoName || t("request.upload")}</span>
            <span className="mt-1 text-xs text-[#5c6f77]">{t("request.photoDemo")}</span>
            <input
              type="file"
              className="sr-only"
              onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")}
            />
          </label>
          <ActionButton onClick={runAnalysis} className="min-h-12">
            <Send className="h-4 w-4" />
            {t("request.analyze")}
          </ActionButton>
          <ActionButton onClick={useSpanishExample} variant="secondary">
            {t("request.useSpanishExample")}
          </ActionButton>
        </div>
        <div className="mt-6 rounded-lg bg-[#102027] p-4 text-white shadow-[0_18px_45px_rgba(16,32,39,0.22)]">
          <p className="text-sm font-bold text-cyan-200">{t("request.summary")}</p>
          <p className="mt-2 text-sm leading-6">{summary}</p>
        </div>
      </section>
      <div className="grid gap-6">
        <section className="premium-card rounded-lg p-5">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-[#0f6bff]" />
            <h2 className="text-xl font-black text-[#102027]">{t("request.followup")}</h2>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {localizedQuestions.map((question) => (
              <Badge key={question} tone="blue">
                {question}
              </Badge>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
            {t("request.photoAnalysis")}: {photoAnalysis}
          </div>
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
            <p className="font-black">{t("request.spanishExample")}</p>
            <p className="mt-1">“El fregadero está goteando y hay agua en el piso.”</p>
            <p className="mt-2">Categoría: Plomería · Urgencia: Alta · Rango estimado: $90 - $220</p>
          </div>
          <div className="mt-4">
            <LoadingDemoState label={t("request.loading")} />
          </div>
        </section>
        <AIAnalysisCard analysis={analysis} />
      </div>
    </div>
  );
}
