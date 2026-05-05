import { ArrowRight, BarChart3, Bot, BriefcaseBusiness, CheckCircle2, ClipboardList, Image as ImageIcon, LockKeyhole, MapPin, Rocket, ShieldCheck, Users } from "lucide-react";
import { Badge, ButtonLink, PageHeader } from "@/components/ui";

const pitchSections = [
  {
    title: "Problem",
    detail: "People often need local help quickly, but finding a reliable provider can be slow, fragmented, and hard to trust.",
    icon: MapPin,
  },
  {
    title: "Solution",
    detail: "QuickFix lets customers post a request and receive offers from local providers who match the category, location, and timing.",
    icon: ClipboardList,
  },
  {
    title: "Target users",
    detail: "Customers, independent service providers, small local businesses, and admins who manage quality and categories.",
    icon: Users,
  },
  {
    title: "Why AI matters",
    detail: "AI can help classify requests, detect urgent issues, generate safety tips, summarize jobs, and make offer comparison easier.",
    icon: Bot,
  },
  {
    title: "Main features",
    detail: "Post requests, browse requests, send offers, compare providers, message, view profiles, review, and manage admin workflows.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Trust and safety",
    detail: "Profiles, reviews, verification levels, Trust Scores, Reliability Scores, reported cases, and admin controls help build confidence.",
    icon: ShieldCheck,
  },
];

const roadmap = [
  "Launch free local marketplace MVP",
  "Run neighborhood and small-business pilots",
  "Improve provider verification and category management",
  "Add smarter matching and request summaries",
  "Introduce optional featured providers and urgent request boosts",
  "Evaluate commission only after repeat usage is proven",
];

const screenshotPlaceholders = [
  "Home marketplace",
  "Post request flow",
  "Provider comparison",
  "Public provider profile",
];

export default function PitchPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Startup Pitch"
        title="QuickFix is a simple local services marketplace built for fast testing"
        description="The first version focuses on marketplace liquidity: customers post requests, providers send offers, and both sides learn whether the local supply-demand loop works."
        actions={
          <>
            <ButtonLink href="/request">Post a Request</ButtonLink>
            <ButtonLink href="/requests" variant="secondary">Browse Requests</ButtonLink>
          </>
        }
      />
      <section className="app-container grid gap-8 py-10">
        <section className="overflow-hidden rounded-lg bg-[#102027] text-white shadow-[0_34px_110px_rgba(15,37,48,0.22)]">
          <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div>
              <Badge tone="blue">Free MVP first</Badge>
              <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">A local marketplace that can be tested city by city</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
                QuickFix should grow supply and demand before charging. The product is intentionally simple: requests, offers, messaging, profiles, reviews, and admin oversight.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge tone="success">No commission yet</Badge>
                <Badge tone="success">No subscription yet</Badge>
                <Badge tone="success">No payment system yet</Badge>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["19", "service categories"],
                ["$0", "launch price"],
                ["3", "core roles"],
                ["10", "demo flow steps"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/14 bg-white/10 p-5">
                  <p className="text-3xl font-black">{value}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-normal text-cyan-100">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pitchSections.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="premium-card premium-card-hover rounded-lg p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#0f6bff] ring-1 ring-blue-100">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-xl font-black text-[#102027]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{item.detail}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="premium-card rounded-lg p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-[#12b981]" />
              <h2 className="text-2xl font-black text-[#102027]">Business model</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#5c6f77]">
              QuickFix is free at launch. Future monetization can include featured providers, urgent request fees, verified badges, a pro provider plan, and commission only after the marketplace grows.
            </p>
          </article>
          <article className="premium-card rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Rocket className="h-6 w-6 text-[#f05a28]" />
              <h2 className="text-2xl font-black text-[#102027]">Future roadmap</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {roadmap.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#12b981]" />
                  <p className="text-sm font-semibold text-[#39505a]">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="premium-card rounded-lg p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#102027]">Demo screenshots and placeholders</h2>
              <p className="mt-2 text-sm leading-6 text-[#5c6f77]">These cards represent the product areas a judge, recruiter, or investor should inspect in the live MVP.</p>
            </div>
            <Badge tone="blue">Clickable MVP</Badge>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {screenshotPlaceholders.map((item) => (
              <div key={item} className="rounded-lg border border-[#dbe7ec] bg-[linear-gradient(180deg,#ffffff,#eef7f8)] p-4 shadow-sm">
                <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-[#9fc4d3] bg-white text-[#0f6bff]">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <p className="mt-3 font-black text-[#102027]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-[linear-gradient(135deg,#0f6bff,#0b4fbe)] p-6 text-white shadow-[0_26px_80px_rgba(15,107,255,0.22)] md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <LockKeyhole className="h-6 w-6 text-cyan-100" />
                <h2 className="text-3xl font-black">Final call to action</h2>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-50">
                Launch QuickFix as a free local marketplace, recruit service providers by category, drive customer requests through local marketing, and use the MVP to measure response quality and repeat demand.
              </p>
            </div>
            <ButtonLink href="/request" variant="secondary">
              Start demo <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </section>
      </section>
    </div>
  );
}
