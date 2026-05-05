import { ArrowRight, Clock, DollarSign, MessageCircle } from "lucide-react";
import { T } from "@/components/language-provider";
import { OfferComparison } from "@/components/offer-comparison";
import { ProviderCard } from "@/components/provider-card";
import { Badge, ButtonLink, LoadingDemoState, PageHeader } from "@/components/ui";
import { fairPriceMessage } from "@/lib/ai";
import { jobs, offers, providers } from "@/lib/demo-data";

export default function OffersPage() {
  const job = jobs[0];
  const bestProvider = providers[0];

  return (
    <div>
      <PageHeader
        eyebrow={<T k="offers.eyebrow" />}
        title={<T k="offers.title" />}
        description={<T k="offers.description" />}
        actions={<ButtonLink href="/jobs/job-001"><T k="offers.openJob" /></ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <ProviderCard provider={bestProvider} highlight />
          <div className="premium-card rounded-lg border-[#0f6bff] p-5 ring-2 ring-blue-100">
            <Badge tone="blue"><T k="offers.bestMatch" /></Badge>
            <h2 className="mt-4 text-2xl font-black text-[#102027]"><T k="offers.bestTitle" /></h2>
            <p className="mt-3 text-sm leading-6 text-[#5c6f77]">
              <T k="offers.bestCopy" />
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="soft-panel rounded-lg p-4">
                <Clock className="h-5 w-5 text-[#0f6bff]" />
                <p className="mt-2 text-xl font-black text-[#102027]">20 min</p>
                <p className="text-xs text-[#5c6f77]"><T k="offers.etaDemo" /></p>
              </div>
              <div className="soft-panel rounded-lg p-4">
                <DollarSign className="h-5 w-5 text-[#12b981]" />
                <p className="mt-2 text-xl font-black text-[#102027]">$160</p>
                <p className="text-xs text-[#5c6f77]"><T k="offers.fairOffer" /></p>
              </div>
              <div className="soft-panel rounded-lg p-4">
                <MessageCircle className="h-5 w-5 text-[#f05a28]" />
                <p className="mt-2 text-xl font-black text-[#102027]">12m</p>
                <p className="text-xs text-[#5c6f77]"><T k="offers.responseTime" /></p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/chat"><T k="offers.chat" /></ButtonLink>
              <ButtonLink href="/jobs/job-001" variant="secondary"><T k="offers.accept" /> <ArrowRight className="h-4 w-4" /></ButtonLink>
            </div>
          </div>
        </div>

        <div className="card-grid-wide">
          {offers.map((offer) => {
            const provider = providers.find((item) => item.id === offer.providerId);
            if (!provider) return null;
            return (
              <article key={offer.id} className="premium-card premium-card-hover rounded-lg p-5">
                <div className="flex items-center gap-3">
                  <img src={provider.profilePhoto} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <h3 className="break-words font-black leading-5 text-[#102027]">{provider.name}</h3>
                    <p className="mt-1 text-xs leading-4 text-[#5c6f77]">{provider.category}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge tone={offer.fairPriceStatus === "Fair" ? "success" : offer.fairPriceStatus === "Too high" ? "danger" : "warning"}>
                    {offer.fairPriceStatus}
                  </Badge>
                  <Badge tone="blue">ETA {offer.etaMinutes} min</Badge>
                </div>
                <p className="mt-4 text-3xl font-black text-[#102027]">${offer.price}</p>
                <p className="mt-3 text-sm leading-6 text-[#5c6f77]">{offer.message}</p>
                <p className="mt-4 rounded-lg border border-[#dbe7ec] bg-[#f5fafb] p-3 text-xs leading-5 text-[#39505a]">{fairPriceMessage(offer.fairPriceStatus, job.priceRange, offer.price)}</p>
              </article>
            );
          })}
        </div>

        <LoadingDemoState label="Checking fair prices and arrival windows" />

        <OfferComparison />
      </section>
    </div>
  );
}
