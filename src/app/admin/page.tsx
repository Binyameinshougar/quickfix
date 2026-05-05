import { AlertTriangle, BadgeCheck, BriefcaseBusiness, ShieldAlert, UserRoundCheck, Users } from "lucide-react";
import { T } from "@/components/language-provider";
import { Badge, ButtonLink, LoadingDemoState, MetricCard, PageHeader, ScoreBadge, UrgencyBadge } from "@/components/ui";
import { demoUsers, disputes, jobs, offers, platformStats, providers, serviceCategories } from "@/lib/demo-data";

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow={<T k="admin.eyebrow" />}
        title={<T k="admin.title" />}
        description={<T k="admin.description" />}
        actions={<ButtonLink href="/business-model" variant="secondary"><T k="admin.businessModel" /></ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10">
        <div className="dashboard-grid gap-4">
          <MetricCard label={<T k="admin.totalCustomers" />} value={platformStats.totalCustomers} icon={<Users className="h-5 w-5" />} />
          <MetricCard label={<T k="admin.totalProviders" />} value={platformStats.totalProviders} icon={<UserRoundCheck className="h-5 w-5" />} tone="green" />
          <MetricCard label={<T k="admin.totalJobs" />} value={platformStats.totalJobs} icon={<BriefcaseBusiness className="h-5 w-5" />} tone="dark" />
          <MetricCard label={<T k="admin.completedJobs" />} value={platformStats.completedJobs} icon={<BadgeCheck className="h-5 w-5" />} tone="green" />
          <MetricCard label={<T k="admin.emergencyJobs" />} value={platformStats.emergencyJobs} icon={<AlertTriangle className="h-5 w-5" />} tone="orange" />
          <MetricCard label={<T k="admin.disputes" />} value={platformStats.disputes} icon={<ShieldAlert className="h-5 w-5" />} />
        </div>

        <section className="premium-card rounded-lg p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#102027]"><T k="admin.kycReview" /></h2>
              <p className="mt-1 text-sm text-[#5c6f77]">Verification, badges, no-show risk, and score context for admin decisions.</p>
            </div>
            <Badge tone="blue">Admin queue</Badge>
          </div>
          <div className="table-scroll mt-5">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-[#5c6f77]">
                  <th className="rounded-l-lg bg-[#f5fafb] py-3 pl-3 pr-4">Provider</th>
                  <th className="bg-[#f5fafb] py-3 pr-4">KYC</th>
                  <th className="bg-[#f5fafb] py-3 pr-4">Badges</th>
                  <th className="bg-[#f5fafb] py-3 pr-4">Scores</th>
                  <th className="bg-[#f5fafb] py-3 pr-4">No-shows</th>
                  <th className="rounded-r-lg bg-[#f5fafb] py-3 pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider.id} className="align-top">
                    <td className="border-b border-[#edf4f6] py-4 pl-3 pr-4 font-black text-[#102027]">{provider.name}</td>
                    <td className="border-b border-[#edf4f6] py-4 pr-4">
                      <Badge tone={provider.kycStatus === "Verified" ? "success" : "warning"}>{provider.kycStatus}</Badge>
                    </td>
                    <td className="max-w-xs border-b border-[#edf4f6] py-4 pr-4">
                      <div className="flex flex-wrap gap-2">
                        {provider.badges.slice(0, 3).map((badge) => (
                          <Badge key={badge} tone={badge.includes("Pending") ? "warning" : "success"}>{badge}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="border-b border-[#edf4f6] py-4 pr-4">
                      <div className="flex flex-col gap-2">
                        <ScoreBadge label="Trust Score" score={provider.trustScore} />
                        <ScoreBadge label="Reliability Score" score={provider.reliabilityScore} />
                      </div>
                    </td>
                    <td className="border-b border-[#edf4f6] py-4 pr-4">
                      <Badge tone={provider.noShowReports > 1 ? "danger" : provider.noShowReports === 1 ? "warning" : "success"}>{provider.noShowReports}</Badge>
                    </td>
                    <td className="border-b border-[#edf4f6] py-4 pr-4">
                      <div className="flex gap-2">
                        <button type="button" className="rounded-lg bg-[#12b981] px-3 py-2 text-xs font-bold text-white shadow-sm">Approve</button>
                        <button type="button" className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 ring-1 ring-red-100">Suspend</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <LoadingDemoState label="Scanning admin queue for high-risk cases" />

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="admin.requests" /></h2>
            <div className="mt-5 grid gap-3">
              {jobs.map((job) => (
                <div key={job.id} className="rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-[#102027]">{job.title}</p>
                      <p className="text-sm text-[#5c6f77]">{job.category} - {job.status}</p>
                    </div>
                    <UrgencyBadge urgency={job.urgency} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="admin.reportedCases" /></h2>
            <div className="mt-5 grid gap-3">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-[#102027]">{dispute.id}</p>
                      <p className="text-sm text-[#5c6f77]">{dispute.job} - {dispute.provider}</p>
                    </div>
                    <Badge tone={dispute.status === "Resolved" ? "success" : dispute.status === "Under review" ? "warning" : "blue"}>{dispute.status}</Badge>
                  </div>
                  <p className="mt-2 text-xs font-bold text-[#5c6f77]">Severity: {dispute.severity}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="premium-card rounded-lg p-5">
          <h2 className="text-2xl font-black text-[#102027]"><T k="admin.allOffers" /></h2>
          <div className="table-scroll mt-5">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-[#5c6f77]">
                  <th className="rounded-l-lg bg-[#f5fafb] py-3 pl-3 pr-4">Offer</th>
                  <th className="bg-[#f5fafb] py-3 pr-4">Request</th>
                  <th className="bg-[#f5fafb] py-3 pr-4">Provider</th>
                  <th className="bg-[#f5fafb] py-3 pr-4">Price</th>
                  <th className="rounded-r-lg bg-[#f5fafb] py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => {
                  const provider = providers.find((item) => item.id === offer.providerId);
                  const job = jobs.find((item) => item.id === offer.jobId);
                  return (
                    <tr key={offer.id}>
                      <td className="border-b border-[#edf4f6] py-4 pl-3 pr-4 font-black text-[#102027]">{offer.id}</td>
                      <td className="border-b border-[#edf4f6] py-4 pr-4 text-[#5c6f77]">{job?.title ?? offer.jobId}</td>
                      <td className="border-b border-[#edf4f6] py-4 pr-4 text-[#5c6f77]">{provider?.name ?? offer.providerId}</td>
                      <td className="border-b border-[#edf4f6] py-4 pr-4 font-bold text-[#102027]">${offer.price}</td>
                      <td className="border-b border-[#edf4f6] py-4 pr-4">
                        <Badge tone={offer.fairPriceStatus === "Fair" ? "success" : offer.fairPriceStatus === "Too high" ? "danger" : "warning"}>{offer.fairPriceStatus}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="premium-card rounded-lg p-5">
          <h2 className="text-2xl font-black text-[#102027]"><T k="admin.allUsers" /></h2>
          <div className="dashboard-grid mt-5 gap-3">
            {demoUsers.map((user) => (
              <div key={user.name} className="rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm">
                <p className="font-black text-[#102027]">{user.name}</p>
                <p className="mt-1 text-sm text-[#5c6f77]">{user.role}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone={user.status.includes("Verified") || user.status === "Active" ? "success" : "warning"}>{user.status}</Badge>
                  <Badge tone="blue">{user.jobs} jobs</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <button type="button" className="rounded-lg border border-[#cddde4] bg-white px-3 py-2 text-xs font-bold text-[#102027] shadow-sm">Approve</button>
                  <button type="button" className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 ring-1 ring-red-100">Block</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="premium-card rounded-lg p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#102027]"><T k="admin.categories" /></h2>
              <p className="mt-1 text-sm text-[#5c6f77]">Admin placeholder for enabling, reviewing, and expanding marketplace categories.</p>
            </div>
            <Badge tone="blue">{serviceCategories.length} categories</Badge>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <div key={category.name} className="rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-[#102027]">{category.name}</p>
                    <p className="mt-1 text-sm text-[#5c6f77]">{category.description}</p>
                  </div>
                  <Badge tone={category.emergencyReady ? "danger" : "success"}>{category.emergencyReady ? "Urgent" : "Active"}</Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
