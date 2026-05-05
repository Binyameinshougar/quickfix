"use client";

import { ArrowRight, CalendarClock, MapPin, MessageCircle, SearchCheck } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Badge, ButtonLink, LoadingDemoState, MetricCard, PageHeader, UrgencyBadge } from "@/components/ui";
import { categoryTranslations } from "@/lib/translations";
import { jobs, offers } from "@/lib/demo-data";

export default function BrowseRequestsPage() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <div>
      <PageHeader
        eyebrow={es ? "Ver solicitudes" : "Browse Requests"}
        title={es ? "Solicitudes abiertas para proveedores locales" : "Open customer requests for local service providers"}
        description={
          es
            ? "Los proveedores pueden revisar trabajos cercanos, entender la urgencia y enviar una oferta con precio, mensaje y disponibilidad."
            : "Providers can scan nearby jobs, review the request summary, understand urgency, and submit an offer with price, message, and availability."
        }
        actions={<ButtonLink href="/dashboard/provider">{es ? "Panel proveedor" : "Provider Dashboard"}</ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10">
        <div className="dashboard-grid gap-4">
          <MetricCard label={es ? "Solicitudes abiertas" : "Open requests"} value={jobs.filter((job) => job.status !== "Completed").length} detail={es ? "Oferta demo del marketplace" : "Demo marketplace supply"} icon={<SearchCheck className="h-5 w-5" />} />
          <MetricCard label={es ? "Ofertas enviadas" : "Offers submitted"} value={offers.length} detail={es ? "Para la fuga del fregadero" : "For the leaking sink request"} icon={<MessageCircle className="h-5 w-5" />} tone="green" />
          <MetricCard label={es ? "Trabajos urgentes" : "Urgent jobs"} value={jobs.filter((job) => job.urgency === "High" || job.urgency === "Emergency").length} detail={es ? "Resaltados claramente" : "Highlighted clearly"} icon={<CalendarClock className="h-5 w-5" />} tone="orange" />
        </div>

        <section className="premium-card rounded-lg p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#102027]">{es ? "Tablero de solicitudes" : "Request board"}</h2>
              <p className="mt-1 text-sm text-[#5c6f77]">
                {es ? "Las solicitudes demo incluyen categoría, ubicación, urgencia, presupuesto, seguridad y estado." : "Demo requests include category, location, urgency, budget range, safety notes, and current status."}
              </p>
            </div>
            <Badge tone="blue">{es ? "Acceso gratis" : "Free provider access"}</Badge>
          </div>
          <div className="mt-5 grid gap-4">
            {jobs.map((job) => (
              <article key={job.id} className={`rounded-lg border p-4 shadow-sm ${job.urgency === "Emergency" ? "border-red-300 bg-red-50" : job.urgency === "High" ? "border-orange-200 bg-orange-50/70" : "border-[#dbe7ec] bg-[#f7fbfc]"}`}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black text-[#102027]">{job.title}</h3>
                      <UrgencyBadge urgency={job.urgency} />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{job.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge tone="blue">{categoryTranslations[language][job.category]}</Badge>
                      <Badge tone="neutral">
                        <MapPin className="mr-1 h-3.5 w-3.5" />
                        {job.locationArea}
                      </Badge>
                      <Badge tone="success">{job.priceRange}</Badge>
                      <Badge tone="warning">{job.status}</Badge>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <ButtonLink href={`/requests/${job.id}`} variant="secondary">
                      {es ? "Ver detalles" : "View details"} <ArrowRight className="h-4 w-4" />
                    </ButtonLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <LoadingDemoState label={es ? "Cargando más solicitudes cercanas" : "Loading more nearby requests"} />
      </section>
    </div>
  );
}
