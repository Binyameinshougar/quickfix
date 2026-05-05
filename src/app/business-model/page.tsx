import { BadgeDollarSign, Building2, CircleDollarSign, Crown, ShieldCheck, Siren, Star } from "lucide-react";
import { Badge, PageHeader } from "@/components/ui";

const revenue = [
  { title: "Free launch period", detail: "No subscription, commission, or payment system while the marketplace validates local demand.", icon: CircleDollarSign },
  { title: "Featured providers", detail: "Future paid placement for trusted providers after there is enough customer traffic.", icon: Star },
  { title: "Urgent request fee", detail: "Future optional fee for customers who want extra visibility on urgent requests.", icon: Siren },
  { title: "Verified provider badge", detail: "Future optional verification upgrade with admin-approved trust signals.", icon: BadgeDollarSign },
  { title: "Pro provider plan", detail: "Future plan with higher visibility, more lead tools, and profile upgrades.", icon: Crown },
  { title: "Business accounts", detail: "Future dashboards for property managers, offices, hosts, and local teams.", icon: Building2 },
  { title: "Commission later", detail: "A service fee can be considered only after the platform proves repeat usage.", icon: ShieldCheck },
];

export default function BusinessModelPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Business Model"
        title="How QuickFix can grow without charging too early"
        description="The MVP stays free for customers and service providers. Monetization is positioned as a future step after the marketplace has real local supply and demand."
      />
      <section className="app-container grid gap-6 py-10">
        <div className="card-grid-wide">
          {revenue.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="premium-card premium-card-hover rounded-lg p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#e8f3ff] text-[#0f6bff] shadow-sm ring-1 ring-blue-100">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-lg font-black text-[#102027]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{item.detail}</p>
              </article>
            );
          })}
        </div>
        <section className="rounded-lg bg-[#102027] p-6 text-white shadow-[0_26px_70px_rgba(16,32,39,0.22)]">
          <Badge tone="blue">Future enterprise feature</Badge>
          <h2 className="mt-5 text-3xl font-black">QuickFix for Property Managers</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-100">
            Landlords, apartment managers, Airbnb hosts, small businesses, and offices could manage maintenance requests, assign unit details, compare verified providers, track completion, and monitor reported cases from one dashboard.
          </p>
        </section>
      </section>
    </div>
  );
}
