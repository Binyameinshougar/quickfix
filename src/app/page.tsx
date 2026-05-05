"use client";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Home as HomeIcon,
  Languages,
  MessageSquareText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  UserRound,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import { AIAnalysisCard } from "@/components/ai-analysis-card";
import { CategoryGrid } from "@/components/category-grid";
import { DemoScenario } from "@/components/demo-scenario";
import { EmergencyOptions } from "@/components/emergency-options";
import { ProviderCard } from "@/components/provider-card";
import { Badge, ButtonLink, SectionHeader } from "@/components/ui";
import { providers } from "@/lib/demo-data";
import { analyzeProblem } from "@/lib/ai";
import { useLanguage } from "@/components/language-provider";

export default function Home() {
  const { language, t } = useLanguage();
  const analysis = analyzeProblem("My sink is leaking and water is everywhere.");
  const howItWorks =
    language === "es"
      ? ["El cliente publica una solicitud", "Proveedores locales ven trabajos abiertos", "Los proveedores envían ofertas", "El cliente compara y acepta", "El servicio se completa y se reseña"]
      : ["Customer posts a request", "Local providers browse open jobs", "Providers submit offers", "Customer compares and accepts", "Service is completed and reviewed"];
  const trustItems = [
    {
      title: language === "es" ? "Lanzamiento gratis" : "Free launch",
      detail: language === "es" ? "Sin comisión, suscripción ni sistema de pago en la primera versión." : "No commission, subscription, or payment system in the first version.",
      icon: DollarSign,
    },
    {
      title: language === "es" ? "Perfiles de proveedores" : "Provider profiles",
      detail: language === "es" ? "Los proveedores pueden mostrar servicios, habilidades, reseñas, zona y trabajos completados." : "Providers can show services, skills, reviews, service area, and completed jobs.",
      icon: BadgeCheck,
    },
    {
      title: language === "es" ? "Elección del cliente" : "Customer choice",
      detail: language === "es" ? "Los clientes comparan precio, llegada, reseñas y detalles antes de elegir." : "Customers compare price, arrival time, reviews, and provider details before choosing.",
      icon: CheckCircle2,
    },
    {
      title: language === "es" ? "Controles admin" : "Admin controls",
      detail: language === "es" ? "Admins pueden revisar usuarios, solicitudes, ofertas, categorías y reportes." : "Admins can review users, requests, offers, categories, and reported accounts.",
      icon: ShieldCheck,
    },
  ];
  const aiFeatures =
    language === "es"
      ? ["Sugerencia inteligente de categoría", "Guía de urgencia", "Soporte para comparar ofertas", "Consejos de seguridad", "Explicación de mejor proveedor"]
      : ["Smart category suggestion", "Urgency guidance", "Offer comparison support", "Safety tips", "Provider match explanation"];
  const walkthrough = [
    { label: t("home.walkthrough1"), icon: MessageSquareText },
    { label: t("home.walkthrough2"), icon: Sparkles },
    { label: t("home.walkthrough3"), icon: BriefcaseBusiness },
    { label: t("home.walkthrough4"), icon: BadgeCheck },
    { label: t("home.walkthrough5"), icon: Star },
  ];
  const differentiators = [
    { label: t("home.diffAi"), icon: Sparkles, tone: "blue" },
    { label: t("home.diffProfiles"), icon: BadgeCheck, tone: "green" },
    { label: t("home.diffScores"), icon: ShieldCheck, tone: "blue" },
    { label: t("home.diffDamage"), icon: ShieldAlert, tone: "orange" },
    { label: t("home.diffEscrow"), icon: WalletCards, tone: "green" },
    { label: t("home.diffLanguage"), icon: Languages, tone: "blue" },
  ];
  const realWorldUsers = [
    { label: t("home.userHomeowners"), icon: HomeIcon },
    { label: t("home.userRenters"), icon: UserRound },
    { label: t("home.userStudents"), icon: GraduationCap },
    { label: t("home.userProperty"), icon: Building2 },
    { label: t("home.userSmallBusiness"), icon: Store },
    { label: t("home.userImmigrant"), icon: Users },
  ];

  return (
    <div>
      <section
        className="relative flex min-h-[88vh] items-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1800&q=85')",
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="app-container relative grid w-full gap-10 py-16 lg:grid-cols-[1fr_440px] lg:items-center">
          <div className="max-w-4xl pb-4 text-white">
            <p className="mb-4 inline-flex rounded-lg bg-white/16 px-3 py-2 text-sm font-bold ring-1 ring-white/30 backdrop-blur">{t("home.kicker")}</p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-7xl">{t("home.title")}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
              {t("home.subtitle")}
            </p>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-cyan-100">
              {t("home.supporting")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/request">{t("home.postRequest")} <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/offers" variant="secondary">{t("home.browseProviders")}</ButtonLink>
            </div>
            <div className="mt-8 flex max-w-3xl flex-wrap gap-2">
              {[t("home.badgeAi"), t("home.badgeVerified"), t("home.badgeDamage"), t("home.badgeEscrow")].map((badge) => (
                <span key={badge} className="rounded-lg border border-white/20 bg-white/12 px-3 py-2 text-xs font-black text-cyan-50 backdrop-blur">{badge}</span>
              ))}
            </div>
            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                ["4.9", language === "es" ? "calificación destacada" : "top provider rating"],
                ["20 min", language === "es" ? "ETA mejor opción" : "best match ETA"],
                ["94%", language === "es" ? "Trust Score demo" : "demo Trust Score"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/20 bg-white/12 p-4 backdrop-blur">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-normal text-cyan-100">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="glass-panel rounded-lg p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-normal text-[#0f6bff]">{t("home.aiResult")}</p>
                  <h2 className="mt-1 text-xl font-black text-[#102027]">{t("home.demoTitle")}</h2>
                </div>
                <Badge tone="warning">{language === "es" ? "Alta" : "High"}</Badge>
              </div>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="flex flex-col gap-1 rounded-lg bg-[#f5fafb] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="font-bold text-[#5c6f77]">{t("home.category")}</span>
                  <span className="font-black text-[#102027]">{language === "es" ? "Plomería" : "Plumbing"}</span>
                </div>
                <div className="flex flex-col gap-1 rounded-lg bg-[#f5fafb] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="font-bold text-[#5c6f77]">{t("home.urgency")}</span>
                  <span className="font-black text-orange-700">{language === "es" ? "Alta" : "High"}</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[#f5fafb] p-3">
                  <Sparkles className="h-5 w-5 text-[#0f6bff]" />
                  <p className="font-bold text-[#102027]">{t("home.estimatedPrice")}: $90 - $220</p>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[#f5fafb] p-3">
                  <Clock className="h-5 w-5 text-[#12b981]" />
                  <p className="font-bold text-[#102027]">{t("home.bestMatch")}: {t("home.bestMatchValue")}</p>
                </div>
                <div className="loading-line h-2 w-full" />
                <div className="loading-line h-2 w-2/3" />
              </div>
            </div>
            <EmergencyOptions />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="app-container">
          <SectionHeader
            eyebrow={t("home.walkthroughEyebrow")}
            title={t("home.walkthroughTitle")}
            description={t("home.walkthroughDescription")}
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {walkthrough.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.label} className="premium-card premium-card-hover rounded-lg p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#0f6bff] ring-1 ring-blue-100">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-black uppercase tracking-normal text-[#7a8d95]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-base font-black leading-6 text-[#102027]">{step.label}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="app-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow={t("home.differentEyebrow")}
            title={t("home.differentTitle")}
            description={t("home.differentDescription")}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((item) => {
              const Icon = item.icon;
              const tone =
                item.tone === "green"
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                  : item.tone === "orange"
                    ? "bg-orange-50 text-orange-700 ring-orange-100"
                    : "bg-blue-50 text-[#0f6bff] ring-blue-100";
              return (
                <article key={item.label} className="premium-card premium-card-hover rounded-lg p-5">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-lg ring-1 ${tone}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-black text-[#102027]">{item.label}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="app-container">
          <SectionHeader
            eyebrow={t("home.realWorldEyebrow")}
            title={t("home.realWorldTitle")}
            description={t("home.realWorldDescription")}
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {realWorldUsers.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="premium-card premium-card-hover flex items-center gap-4 rounded-lg p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#102027] text-white shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-black text-[#102027]">{item.label}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="app-container">
          <SectionHeader
            eyebrow={t("home.popularEyebrow")}
            title={t("home.popularTitle")}
            description={t("home.popularDescription")}
          />
          <div className="mt-8">
            <CategoryGrid />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="app-container">
          <SectionHeader
            eyebrow={t("home.howEyebrow")}
            title={t("home.howTitle")}
            description={t("home.howDescription")}
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {howItWorks.map((step, index) => (
              <div key={step} className="premium-card premium-card-hover rounded-lg p-5 text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f6bff] text-sm font-black text-white shadow-[0_14px_30px_rgba(15,107,255,0.24)]">{index + 1}</span>
                <p className="mt-4 text-sm font-bold leading-6 text-[#102027]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="app-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow={t("home.smartEyebrow")}
              title={t("home.smartTitle")}
              description={t("home.smartDescription")}
            />
            <div className="mt-8 grid gap-3">
              {aiFeatures.map((feature) => (
                <div key={feature} className="premium-card premium-card-hover flex items-center gap-3 rounded-lg p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="font-bold text-[#102027]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <AIAnalysisCard analysis={analysis} />
        </div>
      </section>

      <section className="py-20">
        <div className="app-container">
          <SectionHeader
            eyebrow={t("home.trustEyebrow")}
            title={t("home.trustTitle")}
            description={t("home.trustDescription")}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="premium-card premium-card-hover rounded-lg p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#102027] text-white shadow-[0_14px_30px_rgba(16,32,39,0.18)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[#102027]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="app-container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={t("home.providersEyebrow")}
              title={t("home.providersTitle")}
              description={t("home.providersDescription")}
            />
            <ButtonLink href="/offers" variant="secondary">{t("home.compareOffers")}</ButtonLink>
          </div>
          <div className="card-grid-wide mt-8">
            {providers.slice(0, 3).map((provider, index) => (
              <ProviderCard key={provider.id} provider={provider} highlight={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="app-container grid gap-6 lg:grid-cols-3">
          <div className="rounded-lg bg-[#102027] p-6 text-white shadow-[0_26px_70px_rgba(16,32,39,0.22)] lg:col-span-2">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="h-6 w-6 text-cyan-200" />
              <h2 className="text-2xl font-black">{t("home.showcaseTitle")}</h2>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-100">
              {t("home.showcaseCopy")}
            </p>
          </div>
          <div className="premium-card grid gap-3 rounded-lg p-6">
            <div className="flex items-center gap-2 text-sm font-bold text-[#102027]">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {t("home.futureModules")}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#5c6f77]">
              <MessageSquareText className="h-4 w-4 text-[#0f6bff]" />
              {t("home.messagingFlow")}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#5c6f77]">
              <Zap className="h-4 w-4 text-[#f05a28]" />
              {t("home.urgencyFlags")}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#5c6f77]">
              <ShieldCheck className="h-4 w-4 text-[#12b981]" />
              {t("home.protectionWorkflows")}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="app-container">
          <DemoScenario />
        </div>
      </section>
    </div>
  );
}
