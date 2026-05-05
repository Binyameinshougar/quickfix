"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardList,
  Code2,
  DollarSign,
  Image as ImageIcon,
  LayoutDashboard,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/language-provider";
import { ButtonLink, Badge } from "@/components/ui";

export default function ShowcasePage() {
  const { language } = useLanguage();
  const es = language === "es";

  const keyFeatures = es
    ? [
        "Análisis de urgencia y seguridad con IA",
        "Experiencia bilingüe en inglés y español",
        "Perfiles de proveedores verificados",
        "Trust Score y Reliability Score",
        "Comparación de ofertas y guía de precio justo",
        "Centro de Protección y placeholder de depósito futuro",
      ]
    : [
        "AI urgency and safety analysis",
        "Bilingual English and Spanish experience",
        "Verified provider profiles",
        "Trust Score and Reliability Score",
        "Offer comparison and fair-price guidance",
        "Protection Center and escrow demo placeholder",
      ];

  const trustSafety = es
    ? [
        "Perfiles verificados y niveles de verificación",
        "Trust Score y Reliability Score en tarjetas de proveedor",
        "Centro de Protección con reportes estructurados",
        "Placeholder de depósito para pagos protegidos futuros",
        "Panel admin para disputas, no-shows y revisión KYC",
        "Soporte en inglés y español para acceso local más amplio",
      ]
    : [
        "Verified provider profiles and verification levels",
        "Trust Score and Reliability Score on provider cards",
        "Damage Protection Center with structured reports",
        "Escrow demo placeholder for future protected payments",
        "Admin dashboards for disputes, no-shows, and KYC review",
        "English and Spanish support for broader local access",
      ];

  const demoFlow = es
    ? [
        "El cliente publica una solicitud por fuga en el fregadero",
        "La IA clasifica Plomería, urgencia alta y pasos de seguridad",
        "Los proveedores envían ETA, precio y disponibilidad",
        "El cliente compara señales de confianza y acepta Ahmed Plumbing",
        "El estado se actualiza, el chat sigue abierto y se deja reseña",
      ]
    : [
        "Customer posts a leaking-sink request",
        "AI classifies Plumbing, High urgency, and safety steps",
        "Providers send ETA, price, and availability",
        "Customer compares trust signals and accepts Ahmed Plumbing",
        "Job status updates, chat stays open, review is submitted",
      ];

  const roadmap = es
    ? [
        "Autenticación real y cuentas persistentes",
        "Solicitudes, ofertas, reseñas y mensajes con base de datos",
        "API de IA real para intake, resúmenes y matching",
        "Integraciones de verificación de proveedores",
        "Plan local de lanzamiento ciudad por ciudad",
        "Pagos futuros solo después de validar tracción",
      ]
    : [
        "Real authentication and persistent accounts",
        "Database-backed requests, offers, reviews, and messages",
        "Production AI API for intake, summaries, and matching",
        "Provider verification integrations",
        "City-by-city local launch playbook",
        "Future payments only after marketplace traction",
      ];

  const demoCards = es
    ? [
        ["Inicio", "Hero, categorías y flujo de demo"],
        ["Publicar solicitud", "Formulario con análisis de IA"],
        ["Comparar ofertas", "Precio, ETA, reseñas y confianza"],
        ["Perfil proveedor", "Servicios, paquetes, reseñas y badges"],
        ["Chat", "Cliente, proveedor y asistente en un hilo"],
        ["Admin", "KYC, solicitudes, ofertas y casos reportados"],
      ]
    : [
        ["Home", "Hero, categories, and demo flow"],
        ["Post request", "Request form with AI analysis"],
        ["Compare offers", "Price, ETA, reviews, and trust"],
        ["Provider profile", "Services, packages, reviews, and badges"],
        ["Chat", "Customer, provider, and assistant in one thread"],
        ["Admin", "KYC, requests, offers, and reported cases"],
      ];

  return (
    <div>
      <section className="relative overflow-hidden bg-[#071923] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,107,255,0.34),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(18,185,129,0.22),transparent_30%)]" />
        <div className="app-container relative grid min-h-[78vh] gap-10 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <Badge tone="blue">{es ? "Presentación para AI Showcase" : "AI Showcase Submission"}</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-7xl">QuickFix</h1>
            <p className="mt-4 text-lg font-black text-cyan-100">Trusted local help, powered by AI.</p>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-100">
              {es
                ? "Un marketplace inteligente de servicios locales que convierte problemas urgentes en opciones confiables de proveedores en minutos."
                : "An intelligent local services marketplace that turns urgent problems into trusted provider matches in minutes."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/">{es ? "Probar demo" : "Try Demo"} <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/request" variant="secondary">{es ? "Publicar solicitud" : "Post a Request"}</ButtonLink>
              <ButtonLink href="/providers/ahmed-plumbing" variant="ghost">{es ? "Ver perfil proveedor" : "View Provider Profile"}</ButtonLink>
            </div>
          </div>
          <div className="glass-panel rounded-lg p-5 text-[#102027]">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-normal text-[#0f6bff]">{es ? "Demo de IA" : "Live AI demo"}</p>
                <h2 className="mt-1 text-2xl font-black">{es ? "Fregadero de cocina goteando" : "Kitchen sink leaking"}</h2>
              </div>
              <Badge tone="warning">{es ? "Urgencia alta" : "High urgency"}</Badge>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                [es ? "Categoría" : "Category", es ? "Plomería" : "Plumbing"],
                [es ? "Seguridad" : "Safety", es ? "Cerrar la válvula de agua" : "Turn off water valve"],
                [es ? "Rango" : "Range", "$90 - $220"],
                [es ? "Mejor opción" : "Best match", "Ahmed Plumbing, 20 min"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 rounded-lg bg-[#f5fafb] p-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="font-bold text-[#5c6f77]">{label}</span>
                  <span className="font-black text-[#102027]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-container grid gap-6 py-14 lg:grid-cols-3">
        <StoryCard icon={<MapPin className="h-5 w-5" />} title={es ? "Problema" : "Problem statement"}>
          {es
            ? "Encontrar ayuda local confiable es estresante cuando el problema es urgente, los precios no son claros y las señales de confianza están dispersas."
            : "Finding reliable local help is stressful when the problem is urgent, prices are unclear, and trust signals are scattered across disconnected channels."}
        </StoryCard>
        <StoryCard icon={<Bot className="h-5 w-5" />} title={es ? "Solución con IA" : "AI-powered solution"}>
          {es
            ? "QuickFix analiza la solicitud, detecta urgencia, muestra pasos de seguridad y ayuda a comparar proveedores verificados antes de elegir."
            : "QuickFix analyzes the request, detects urgency, surfaces safety steps, and helps customers compare verified providers before choosing."}
        </StoryCard>
        <StoryCard icon={<Users className="h-5 w-5" />} title={es ? "Por qué importa" : "Why it matters"}>
          {es
            ? "El producto ayuda a propietarios, inquilinos, estudiantes, negocios pequeños, administradores e inmigrantes a conseguir ayuda local más rápido."
            : "The product helps homeowners, renters, students, small businesses, property managers, and immigrant communities access local help faster."}
        </StoryCard>
      </section>

      <section className="bg-white py-16">
        <div className="app-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge tone="blue">{es ? "Funciones principales" : "Key features"}</Badge>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#102027]">{es ? "Construido como un producto startup real" : "Built like a real startup product"}</h2>
            <p className="mt-4 text-base leading-7 text-[#5c6f77]">
              {es
                ? "El MVP no es solo una landing page. Incluye flujos conectados para clientes, proveedores, admin, UI bilingüe y sistemas de confianza."
                : "The MVP is not just a landing page. It includes a connected customer flow, provider flow, admin monitoring, bilingual UI, and trust-focused marketplace systems."}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {keyFeatures.map((feature) => (
              <div key={feature} className="premium-card premium-card-hover flex gap-3 rounded-lg p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#12b981]" />
                <p className="font-bold leading-6 text-[#102027]">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-container py-16">
        <div className="premium-card rounded-lg p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-[#12b981] ring-1 ring-emerald-100">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-4xl font-black leading-tight text-[#102027]">{es ? "Confianza y seguridad" : "Trust and safety features"}</h2>
              <p className="mt-4 text-base leading-7 text-[#5c6f77]">
                {es
                  ? "QuickFix está diseñado alrededor de señales de confianza que facilitan decidir antes de contratar."
                  : "QuickFix is designed around trust signals that make local service decisions easier to understand before a customer hires."}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustSafety.map((item) => (
                <div key={item} className="rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4">
                  <CheckCircle2 className="h-5 w-5 text-[#12b981]" />
                  <p className="mt-3 text-sm font-bold leading-6 text-[#39505a]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="app-container">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge tone="blue">{es ? "Pantallas demo" : "Demo screenshots"}</Badge>
              <h2 className="mt-4 text-4xl font-black leading-tight text-[#102027]">{es ? "Áreas clave listas para revisar" : "Key product areas ready to review"}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[#5c6f77]">
              {es
                ? "Estos placeholders muestran las pantallas que jueces, reclutadores o empleadores deberían revisar en menos de 60 segundos."
                : "These placeholders show the screens judges, recruiters, or employers should inspect in under 60 seconds."}
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {demoCards.map(([title, detail], index) => (
              <article key={title} className="premium-card premium-card-hover overflow-hidden rounded-lg">
                <div className="flex aspect-[16/10] items-center justify-center bg-[linear-gradient(135deg,#eef7ff,#f3fbf7)]">
                  <div className="rounded-lg border border-dashed border-[#9fc4d3] bg-white/80 p-5 text-center shadow-sm">
                    {index === 5 ? <LayoutDashboard className="mx-auto h-8 w-8 text-[#0f6bff]" /> : <ImageIcon className="mx-auto h-8 w-8 text-[#0f6bff]" />}
                    <p className="mt-3 text-xs font-black uppercase tracking-normal text-[#5c6f77]">{es ? "Placeholder" : "Placeholder"}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-[#102027]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="app-container grid gap-8 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="premium-card rounded-lg p-6">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-[#0f6bff]" />
            <h2 className="text-3xl font-black text-[#102027]">{es ? "Flujo de usuario demo" : "Demo user flow"}</h2>
          </div>
          <div className="mt-6 grid gap-3">
            {demoFlow.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0f6bff] text-sm font-black text-white">{index + 1}</span>
                <p className="font-semibold leading-6 text-[#39505a]">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <StoryCard icon={<Code2 className="h-5 w-5" />} title={es ? "Tech stack" : "Tech stack"}>
            {es
              ? "Next.js App Router, React, TypeScript, Tailwind CSS, datos mock, proveedor de idioma en cliente y lógica de IA extensible."
              : "Next.js App Router, React, TypeScript, Tailwind CSS, mock data architecture, client-side language provider, and extensible AI logic."}
          </StoryCard>
          <StoryCard icon={<DollarSign className="h-5 w-5" />} title={es ? "Modelo de negocio" : "Business model"}>
            {es
              ? "Lanzamiento gratis primero. Monetización futura: proveedores destacados, boosts urgentes, badges verificados, planes pro y comisión después de tracción."
              : "Free launch first. Future monetization can include featured providers, urgent request boosts, verified badges, pro plans, and commission after traction."}
          </StoryCard>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="app-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge tone="blue">{es ? "Roadmap" : "Roadmap"}</Badge>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#102027]">{es ? "Camino claro de MVP a marketplace" : "Clear path from MVP to marketplace"}</h2>
            <p className="mt-4 text-base leading-7 text-[#5c6f77]">
              {es
                ? "El demo está estructurado para agregar backend, IA real, verificación, mensajes y pagos paso a paso sin rehacer la superficie del producto."
                : "The demo is structured so backend, real AI, verification, messaging, and payments can be added step by step without rebuilding the product surface."}
            </p>
          </div>
          <div className="grid gap-3">
            {roadmap.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4">
                <Rocket className="mt-0.5 h-5 w-5 shrink-0 text-[#f05a28]" />
                <p className="font-semibold leading-6 text-[#39505a]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-container py-16">
        <div className="rounded-lg bg-[linear-gradient(135deg,#0f6bff,#102027)] p-6 text-white shadow-[0_30px_90px_rgba(15,107,255,0.24)] md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-cyan-100" />
                <h2 className="text-3xl font-black">{es ? "¿Listo para evaluar el MVP?" : "Ready to evaluate the MVP?"}</h2>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-50">
                {es
                  ? "Prueba la landing page, publica una solicitud, revisa el perfil de Ahmed Plumbing y mira los paneles de cliente, proveedor y admin."
                  : "Try the landing page, post a request, inspect Ahmed Plumbing's profile, and review the customer/provider/admin dashboards."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/" variant="secondary">{es ? "Probar demo" : "Try Demo"}</ButtonLink>
              <ButtonLink href="/request" variant="ghost">{es ? "Publicar solicitud" : "Post a Request"}</ButtonLink>
              <ButtonLink href="/providers/ahmed-plumbing" variant="ghost">{es ? "Ver perfil proveedor" : "View Provider Profile"}</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StoryCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <article className="premium-card premium-card-hover rounded-lg p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#0f6bff] ring-1 ring-blue-100">{icon}</span>
      <h2 className="mt-5 text-2xl font-black text-[#102027]">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#5c6f77]">{children}</p>
    </article>
  );
}
