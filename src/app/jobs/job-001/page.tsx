"use client";

import { AlertTriangle, CheckCircle2, Clock, Flag, MapPin, ShieldAlert } from "lucide-react";
import { JobTimeline } from "@/components/job-timeline";
import { useLanguage } from "@/components/language-provider";
import { Badge, ButtonLink, LoadingDemoState, PageHeader, UrgencyBadge } from "@/components/ui";
import { jobs, offers, providers } from "@/lib/demo-data";

export default function JobDetailsPage() {
  const { language } = useLanguage();
  const es = language === "es";
  const job = jobs[0];
  const acceptedProvider = providers[0];
  const acceptedOffer = offers[0];

  return (
    <div>
      <PageHeader
        eyebrow={es ? "Detalles del trabajo" : "Job Details"}
        title={job.title}
        description={
          es
            ? "Sigue el ciclo completo, revisa notas, chatea con el proveedor, actualiza estado, completa el trabajo y accede a protección."
            : "Track the full request lifecycle, review request notes, chat with the provider, update status, complete the job, and access protection tools."
        }
        actions={<ButtonLink href="/chat">{es ? "Abrir chat" : "Open chat"}</ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <section className="premium-card rounded-lg p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#102027]">{es ? "Resumen de solicitud" : "Request summary"}</h2>
                <p className="mt-2 text-sm text-[#5c6f77]">{job.createdAt}</p>
              </div>
              <UrgencyBadge urgency={job.urgency} />
            </div>
            <p className="mt-5 text-sm leading-7 text-[#5c6f77]">{job.aiSummary}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="soft-panel rounded-lg p-4">
                <MapPin className="h-5 w-5 text-[#0f6bff]" />
                <p className="mt-2 font-bold text-[#102027]">{job.locationArea}</p>
                <p className="text-xs text-[#5c6f77]">{es ? "Área del cliente" : "Customer area"}</p>
              </div>
              <div className="soft-panel rounded-lg p-4">
                <Clock className="h-5 w-5 text-[#f05a28]" />
                <p className="mt-2 font-bold text-[#102027]">{es ? "El proveedor está a 18 minutos." : "Provider is 18 minutes away."}</p>
                <p className="text-xs text-[#5c6f77]">{es ? "ETA demo" : "ETA demo"}</p>
              </div>
              <div className="soft-panel rounded-lg p-4">
                <CheckCircle2 className="h-5 w-5 text-[#12b981]" />
                <p className="mt-2 font-bold text-[#102027]">{job.status}</p>
                <p className="text-xs text-[#5c6f77]">{es ? "Estado actual" : "Current status"}</p>
              </div>
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]">{es ? "Proveedor aceptado" : "Accepted provider"}</h2>
            <div className="mt-5 flex flex-col gap-4 rounded-lg border border-[#dbe7ec] bg-[#f5fafb] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img src={acceptedProvider.profilePhoto} alt="" className="h-16 w-16 rounded-lg object-cover" />
                <div>
                  <h3 className="text-lg font-black text-[#102027]">{acceptedProvider.name}</h3>
                  <p className="text-sm text-[#5c6f77]">{acceptedProvider.priceRange} - {acceptedProvider.rating} rating</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="success">{es ? "Oferta aceptada" : "Accepted offer"}: ${acceptedOffer.price}</Badge>
                <Badge tone="blue">ETA {acceptedOffer.etaMinutes} min</Badge>
              </div>
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]">{es ? "Controles de estado" : "Status controls"}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(es ? ["Proveedor en camino", "Trabajo iniciado", "Trabajo completado", "Reseña enviada"] : ["Provider on the way", "Job started", "Job completed", "Review submitted"]).map((item) => (
                <button key={item} type="button" className="min-h-11 rounded-lg border border-[#cddde4] bg-white px-3 text-sm font-bold text-[#102027] shadow-sm transition hover:border-[#0f6bff] hover:bg-blue-50">
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ButtonLink href="/protection" variant="emergency">
                <Flag className="h-4 w-4" />
                {es ? "Reportar daño o no-show" : "Report damage or no-show"}
              </ButtonLink>
              <ButtonLink href="/dashboard/customer" variant="secondary">
                {es ? "Dejar reseña" : "Leave review"}
              </ButtonLink>
            </div>
          </section>
        </div>
        <div className="grid gap-6">
          <JobTimeline activeStep={4} />
          <LoadingDemoState label={es ? "Actualizando ETA del proveedor" : "Provider ETA updating"} />
          <section className="rounded-lg border border-orange-200 bg-[linear-gradient(180deg,#fff7ed,#ffedd5)] p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-1 h-5 w-5 text-orange-700" />
              <div>
                <h3 className="font-bold text-orange-950">{es ? "Notas de seguridad" : "Safety notes"}</h3>
                <div className="mt-3 grid gap-2">
                  {job.safetyNotes.map((note) => (
                    <p key={note} className="text-sm text-orange-950">- {note}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="premium-card rounded-lg p-5">
            <h3 className="font-black text-[#102027]">{es ? "Herramientas/materiales" : "Provider tools/materials"}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.toolsNeeded.map((tool) => (
                <Badge key={tool} tone="blue">{tool}</Badge>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-red-200 bg-red-50 p-5 shadow-sm">
            <div className="flex gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 text-red-700" />
              <p className="text-sm leading-6 text-red-950">
                {es ? "Si hay peligro inmediato, sal del área y llama a emergencias locales antes de esperar ayuda de la plataforma." : "For immediate danger, leave the area and call local emergency services before waiting for platform help."}
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
