import { BadgeCheck, Clock, FileCheck2, Send, ShieldCheck, Star } from "lucide-react";
import { T } from "@/components/language-provider";
import { ProfileBuilder } from "@/components/profile-builder";
import { Badge, ButtonLink, DemoEmptyState, LoadingDemoState, MetricCard, PageHeader, ScoreBadge, UrgencyBadge } from "@/components/ui";
import { jobs, providers } from "@/lib/demo-data";

export default function ProviderDashboardPage() {
  const provider = providers[0];

  return (
    <div>
      <PageHeader
        eyebrow={<T k="dashboard.providerEyebrow" />}
        title={<T k="dashboard.providerTitle" />}
        description={<T k="dashboard.providerDescription" />}
        actions={<ButtonLink href={`/providers/${provider.id}`}><T k="dashboard.viewPublicProfile" /></ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10">
        <div className="dashboard-grid gap-4">
          <MetricCard label="Trust Score" value={`${provider.trustScore}%`} detail="KYC, rating, jobs, response" icon={<ShieldCheck className="h-5 w-5" />} tone="green" />
          <MetricCard label={<T k="dashboard.reliability" />} value={`${provider.reliabilityScore}/100`} detail="No no-shows reported" icon={<BadgeCheck className="h-5 w-5" />} />
          <MetricCard label={<T k="dashboard.completedJobs" />} value={provider.completedJobs} detail="4.9 average rating" icon={<Star className="h-5 w-5" />} tone="orange" />
          <MetricCard label={<T k="dashboard.responseTime" />} value={`${provider.responseTimeMinutes}m`} detail="Fast Response badge" icon={<Clock className="h-5 w-5" />} tone="dark" />
        </div>

        <ProfileBuilder />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="dashboard.verificationCenter" /></h2>
            <p className="mt-2 text-sm leading-6 text-[#5c6f77]">Demo upload placeholders for ID, selfie, insurance document, and license or certificate.</p>
            <div className="mt-5 grid gap-3">
              {["ID document", "Selfie verification", "Insurance document", "License or certificate"].map((item, index) => (
                <div key={item} className="flex flex-col gap-3 rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck2 className={`h-5 w-5 shrink-0 ${index < 3 ? "text-emerald-600" : "text-amber-600"}`} />
                    <span className="font-bold text-[#102027]">{item}</span>
                  </div>
                  <Badge tone={index < 3 ? "success" : "warning"}>{index < 3 ? "Uploaded" : "Pending"}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <DemoEmptyState
                title="Background check not connected yet"
                description="Future versions can connect verification APIs and show admin review history here."
              />
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#102027]"><T k="dashboard.nearbyRequests" /></h2>
                <p className="mt-1 text-sm text-[#5c6f77]">Demo leads ranked by urgency, fit, and nearby availability.</p>
              </div>
              <Badge tone="blue">Live demo data</Badge>
            </div>
            <div className="mt-5 grid gap-4">
              {jobs.slice(0, 3).map((job) => (
                <article key={job.id} className="rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-[#102027]">{job.title}</h3>
                      <p className="mt-1 text-sm text-[#5c6f77]">{job.locationArea} - {job.priceRange}</p>
                    </div>
                    <UrgencyBadge urgency={job.urgency} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#5c6f77]">{job.aiSummary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge tone="blue">Tools: {job.toolsNeeded.slice(0, 2).join(", ")}</Badge>
                    <Badge tone="success">Summary ready</Badge>
                  </div>
                  <button type="button" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#0f6bff] px-4 py-2 text-sm font-bold leading-5 text-white shadow-[0_14px_30px_rgba(15,107,255,0.2)] transition hover:bg-[#0b55d9]">
                    <Send className="h-4 w-4" />
                    Send offer
                  </button>
                </article>
              ))}
            </div>
            <div className="mt-5">
              <LoadingDemoState label="Preparing next request recommendations" />
            </div>
          </section>
        </div>

        <section className="premium-card rounded-lg p-5">
          <h2 className="text-2xl font-black text-[#102027]"><T k="dashboard.currentReputation" /></h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {provider.badges.map((badge) => (
              <Badge key={badge} tone={badge.includes("Pending") ? "warning" : "success"}>{badge}</Badge>
            ))}
            <ScoreBadge label="Trust Score" score={provider.trustScore} />
            <ScoreBadge label="Reliability Score" score={provider.reliabilityScore} />
          </div>
          <p className="mt-4 text-sm leading-6 text-[#5c6f77]">
            Reliability score is reduced by cancellations, no-show reports, slow response, poor reviews, and unresolved disputes. Admin review can restore scores after resolved cases.
          </p>
        </section>
      </section>
    </div>
  );
}
