import { Building2, CheckCircle2, Crown, Sparkles, Zap } from "lucide-react";
import { Badge, ButtonLink, PageHeader } from "@/components/ui";
import { providerPlans } from "@/lib/demo-data";

const futureAccounts = [
  "Property managers",
  "Apartment buildings",
  "Airbnb hosts",
  "Small businesses",
  "Offices",
];

export default function ProviderPlansPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Free Launch"
        title="Keep the first marketplace version free"
        description="QuickFix should focus on user growth, local supply, request volume, and provider quality before adding subscriptions, commissions, or paid placement."
        actions={<ButtonLink href="/dashboard/provider">Provider dashboard</ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10">
        <div className="card-grid-wide">
          {providerPlans.map((plan) => {
            const featured = plan.name === "Free launch";
            return (
              <article key={plan.name} className={`premium-card premium-card-hover rounded-lg p-6 ${featured ? "border-[#0f6bff] ring-2 ring-blue-100" : ""}`}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-black text-[#102027]">{plan.name}</h2>
                  {featured ? <Badge tone="blue">Current MVP</Badge> : <Badge tone="neutral">Future</Badge>}
                </div>
                <p className="mt-4 text-4xl font-black text-[#102027]">{plan.price}</p>
                <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{plan.note}</p>
                <div className="mt-6 grid gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm text-[#5c6f77]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#12b981]" />
                      {feature}
                    </div>
                  ))}
                </div>
                <button type="button" className={`mt-6 min-h-11 w-full rounded-lg px-4 text-sm font-black shadow-sm ${featured ? "bg-[#0f6bff] text-white shadow-[0_14px_30px_rgba(15,107,255,0.22)]" : "border border-[#cddde4] bg-white text-[#102027]"}`}>
                  {featured ? "Start free" : "Future option"}
                </button>
              </article>
            );
          })}
        </div>

        <section className="premium-card grid gap-6 rounded-lg p-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#102027] text-white">
                <Building2 className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black text-[#102027]">Business accounts future feature</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#5c6f77]">
              QuickFix for Property Managers could allow landlords and apartment managers to manage maintenance requests for multiple units from one dashboard after the consumer marketplace proves demand.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {futureAccounts.map((account, index) => {
              const Icon = index % 2 === 0 ? Crown : index === 1 ? Zap : Sparkles;
              return (
                <div key={account} className="soft-panel flex items-center gap-3 rounded-lg p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0f6bff] shadow-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-bold text-[#102027]">{account}</span>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
}
