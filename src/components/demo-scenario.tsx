"use client";

import { CheckCircle2, ClipboardList, Clock, MessageCircle, SearchCheck, ShieldAlert, Star, UserCheck, Wrench, Zap } from "lucide-react";
import { useLanguage } from "./language-provider";
import { Badge, ButtonLink } from "./ui";

const scenarioStepsEn = [
  {
    title: "Leaking kitchen sink",
    detail: "A customer notices water spreading under the cabinet.",
    icon: Wrench,
    tone: "orange",
  },
  {
    title: "Customer describes the problem",
    detail: "They post a request with a short description, city, urgency, and optional photos.",
    icon: ClipboardList,
    tone: "blue",
  },
  {
    title: "AI analyzes the request",
    detail: "The request is classified as Plumbing with high urgency.",
    icon: Zap,
    tone: "blue",
  },
  {
    title: "Urgency, safety, and price range",
    detail: "QuickFix shows safety tips, a first action, and an estimated $90 - $220 range.",
    icon: ShieldAlert,
    tone: "orange",
  },
  {
    title: "Providers send offers",
    detail: "Local providers respond with price, ETA, availability, and a short message.",
    icon: MessageCircle,
    tone: "green",
  },
  {
    title: "Customer compares providers",
    detail: "The customer reviews price, ETA, reviews, completed jobs, and trust signals.",
    icon: SearchCheck,
    tone: "blue",
  },
  {
    title: "Best match accepted",
    detail: "Ahmed Plumbing is selected because of verification, rating, and a 20-minute ETA.",
    icon: UserCheck,
    tone: "green",
  },
  {
    title: "Provider is on the way",
    detail: "The job timeline updates and the customer can message the provider.",
    icon: Clock,
    tone: "blue",
  },
  {
    title: "Job completed",
    detail: "The customer marks the request complete after the leak is fixed.",
    icon: CheckCircle2,
    tone: "green",
  },
  {
    title: "Customer leaves a review",
    detail: "The review improves provider reputation and marketplace trust.",
    icon: Star,
    tone: "green",
  },
];

const scenarioStepsEs = [
  {
    title: "Fuga en fregadero",
    detail: "Un cliente nota agua extendiéndose debajo del gabinete.",
    icon: Wrench,
    tone: "orange",
  },
  {
    title: "El cliente describe el problema",
    detail: "Publica una solicitud con descripción, ciudad, urgencia y fotos opcionales.",
    icon: ClipboardList,
    tone: "blue",
  },
  {
    title: "La IA analiza la solicitud",
    detail: "La solicitud se clasifica como Plomería con urgencia alta.",
    icon: Zap,
    tone: "blue",
  },
  {
    title: "Urgencia, seguridad y precio",
    detail: "QuickFix muestra consejos de seguridad, primera acción y un rango estimado de $90 - $220.",
    icon: ShieldAlert,
    tone: "orange",
  },
  {
    title: "Proveedores envían ofertas",
    detail: "Proveedores locales responden con precio, ETA, disponibilidad y un mensaje corto.",
    icon: MessageCircle,
    tone: "green",
  },
  {
    title: "El cliente compara proveedores",
    detail: "El cliente revisa precio, ETA, reseñas, trabajos completados y señales de confianza.",
    icon: SearchCheck,
    tone: "blue",
  },
  {
    title: "Acepta la mejor opción",
    detail: "Ahmed Plumbing es elegido por verificación, calificación y ETA de 20 minutos.",
    icon: UserCheck,
    tone: "green",
  },
  {
    title: "Proveedor en camino",
    detail: "La línea de tiempo se actualiza y el cliente puede enviar mensajes.",
    icon: Clock,
    tone: "blue",
  },
  {
    title: "Trabajo completado",
    detail: "El cliente marca la solicitud como completada después de reparar la fuga.",
    icon: CheckCircle2,
    tone: "green",
  },
  {
    title: "El cliente deja una reseña",
    detail: "La reseña mejora la reputación del proveedor y la confianza del marketplace.",
    icon: Star,
    tone: "green",
  },
];

const toneClasses = {
  blue: "bg-blue-50 text-[#0f6bff] ring-blue-100",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  orange: "bg-orange-50 text-orange-700 ring-orange-100",
};

export function DemoScenario() {
  const { language } = useLanguage();
  const es = language === "es";
  const scenarioSteps = es ? scenarioStepsEs : scenarioStepsEn;

  return (
    <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
      <div className="lg:sticky lg:top-28">
        <Badge tone="blue">{es ? "Escenario demo" : "Demo Scenario"}</Badge>
        <h2 className="mt-4 text-3xl font-black leading-tight text-[#102027] md:text-4xl">
          {es ? "Un flujo completo de marketplace para una fuga" : "A complete leaking-sink marketplace flow"}
        </h2>
        <p className="mt-4 text-base leading-7 text-[#5c6f77]">
          {es
            ? "Este recorrido muestra a jueces, reclutadores e inversionistas cómo QuickFix conecta una solicitud con ofertas, comparación, aceptación, finalización y reseña."
            : "This walkthrough shows judges, recruiters, and investors how QuickFix connects a customer request to local provider offers, comparison, acceptance, completion, and review."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/request">{es ? "Publicar solicitud" : "Post a Request"}</ButtonLink>
          <ButtonLink href="/requests/job-001" variant="secondary">{es ? "Ver detalles" : "View request details"}</ButtonLink>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {scenarioSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article key={step.title} className="premium-card premium-card-hover rounded-lg p-5">
              <div className="flex items-start gap-4">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1 ${toneClasses[step.tone as keyof typeof toneClasses]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-normal text-[#5c6f77]">{es ? "Paso" : "Step"} {index + 1}</p>
                  <h3 className="mt-1 font-black text-[#102027]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{step.detail}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
