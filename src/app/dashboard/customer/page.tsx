import { AlertTriangle, BriefcaseBusiness, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { EmergencyOptions } from "@/components/emergency-options";
import { JobTimeline } from "@/components/job-timeline";
import { T } from "@/components/language-provider";
import { ProviderCard } from "@/components/provider-card";
import { Badge, ButtonLink, DemoEmptyState, LoadingDemoState, MetricCard, PageHeader, UrgencyBadge } from "@/components/ui";
import { jobs, providers } from "@/lib/demo-data";

export default function CustomerDashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow={<T k="dashboard.customerEyebrow" />}
        title={<T k="dashboard.customerTitle" />}
        description={<T k="dashboard.customerDescription" />}
        actions={<ButtonLink href="/request"><T k="nav.postRequest" /></ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10">
        <EmergencyOptions />
        <div className="dashboard-grid gap-4">
          <MetricCard label={<T k="dashboard.activeRequests" />} value="3" detail="One high urgency request" icon={<BriefcaseBusiness className="h-5 w-5" />} />
          <MetricCard label={<T k="dashboard.offersReceived" />} value="6" detail="3 for sink leak" icon={<MessageCircle className="h-5 w-5" />} tone="green" />
          <MetricCard label={<T k="dashboard.emergencyJobs" />} value="1" detail="Outlet sparks when used" icon={<AlertTriangle className="h-5 w-5" />} tone="orange" />
          <MetricCard label={<T k="dashboard.completedJobs" />} value="4" detail="Average provider rating: 4.8" icon={<CheckCircle2 className="h-5 w-5" />} tone="dark" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="premium-card rounded-lg p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#102027]"><T k="dashboard.recentRequests" /></h2>
                <p className="mt-1 text-sm text-[#5c6f77]"><T k="dashboard.recentRequestsCopy" /></p>
              </div>
              <ButtonLink href="/analysis" variant="secondary"><T k="dashboard.viewReview" /></ButtonLink>
            </div>
            <div className="mt-5 grid gap-4">
              {jobs.map((job) => (
                <article key={job.id} className={`rounded-lg border p-4 shadow-sm ${job.urgency === "Emergency" ? "border-red-300 bg-red-50" : "border-[#dbe7ec] bg-[#f7fbfc]"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#102027]">{job.title}</h3>
                      <p className="mt-1 text-sm text-[#5c6f77]">{job.category} - {job.locationArea} - {job.createdAt}</p>
                    </div>
                    <UrgencyBadge urgency={job.urgency} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#5c6f77]">{job.aiSummary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge tone="blue">{job.status}</Badge>
                    <Badge tone="success">{job.priceRange}</Badge>
                    <Badge tone="neutral">
                      <Clock className="mr-1 h-3.5 w-3.5" />
                      Demo ETA available
                    </Badge>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <div className="grid gap-6">
            <JobTimeline activeStep={4} />
            <LoadingDemoState label="Refreshing nearby provider availability" />
            <DemoEmptyState
              title={<T k="dashboard.noCases" />}
              description={<T k="dashboard.noCasesCopy" />}
              action={<ButtonLink href="/protection" variant="secondary"><T k="dashboard.openProtection" /></ButtonLink>}
            />
          </div>
        </div>
        <div className="card-grid-wide">
          {providers.slice(0, 2).map((provider, index) => (
            <ProviderCard key={provider.id} provider={provider} highlight={index === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
