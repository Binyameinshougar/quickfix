import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CalendarClock, CheckCircle2, DollarSign, MapPin, MessageSquareText, Send } from "lucide-react";
import { Badge, ButtonLink, DemoEmptyState, PageHeader, Rating, ScoreBadge, UrgencyBadge } from "@/components/ui";
import { jobs, offers, providers } from "@/lib/demo-data";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export default async function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = jobs.find((item) => item.id === id);
  if (!job) notFound();

  const relatedOffers = offers
    .filter((offer) => offer.jobId === job.id)
    .map((offer) => ({
      offer,
      provider: providers.find((provider) => provider.id === offer.providerId),
    }))
    .filter((row) => row.provider);

  return (
    <div>
      <PageHeader
        eyebrow="Request Details"
        title={job.title}
        description="Providers can review the customer request, understand timing and location, then submit a clear offer. Customers can compare offers and choose the provider they trust most."
        actions={
          <>
            <ButtonLink href="/offers">Compare Offers</ButtonLink>
            <ButtonLink href="/chat" variant="secondary">Message Provider</ButtonLink>
          </>
        }
      />
      <section className="app-container grid gap-6 py-10 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <section className="premium-card rounded-lg p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#102027]">Customer request</h2>
                <p className="mt-2 text-sm leading-7 text-[#5c6f77]">{job.description}</p>
              </div>
              <UrgencyBadge urgency={job.urgency} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Detail icon={<MapPin className="h-5 w-5" />} label="City or area" value={job.locationArea} />
              <Detail icon={<CalendarClock className="h-5 w-5" />} label="Preferred time" value={job.createdAt} />
              <Detail icon={<DollarSign className="h-5 w-5" />} label="Estimate" value={job.priceRange} />
              <Detail icon={<MessageSquareText className="h-5 w-5" />} label="Status" value={job.status} />
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]">Request summary for providers</h2>
            <p className="mt-4 text-sm leading-7 text-[#5c6f77]">{job.aiSummary}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="soft-panel rounded-lg p-4">
                <h3 className="font-black text-[#102027]">Possible cause</h3>
                <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{job.possibleCause}</p>
              </div>
              <div className="soft-panel rounded-lg p-4">
                <h3 className="font-black text-[#102027]">Tools or materials</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.toolsNeeded.map((tool) => (
                    <Badge key={tool} tone="blue">{tool}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]">Current offers</h2>
            <div className="mt-5 grid gap-4">
              {relatedOffers.length === 0 ? (
                <DemoEmptyState
                  title="No offers yet"
                  description="This is where provider offers will appear after local providers submit price, availability, and a message."
                />
              ) : (
                relatedOffers.map((row) => {
                  if (!row.provider) return null;
                  return (
                    <article key={row.offer.id} className="rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center gap-3">
                          <img src={row.provider.profilePhoto} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                          <div className="min-w-0">
                            <p className="break-words font-black leading-5 text-[#102027]">{row.provider.name}</p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              <Rating rating={row.provider.rating} />
                              <Badge tone="blue">ETA {row.offer.etaMinutes} min</Badge>
                            </div>
                          </div>
                        </div>
                        <Badge tone={row.offer.fairPriceStatus === "Fair" ? "success" : "warning"}>${row.offer.price} - {row.offer.fairPriceStatus}</Badge>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#5c6f77]">{row.offer.message}</p>
                    </article>
                  );
                })
              )}
            </div>
          </section>
        </div>

        <aside className="grid h-fit gap-6">
          <section className="premium-card rounded-lg p-5">
            <h2 className="text-xl font-black text-[#102027]">Submit an offer</h2>
            <p className="mt-2 text-sm leading-6 text-[#5c6f77]">Provider offer form placeholder for MVP testing.</p>
            <div className="mt-5 grid gap-3">
              <input className="premium-input px-3 text-sm" placeholder="Price, for example $160" />
              <input className="premium-input px-3 text-sm" placeholder="Availability, for example today at 2 PM" />
              <textarea className="premium-input p-3 text-sm leading-6" rows={5} placeholder="Short message to the customer" />
              <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0f6bff] px-4 py-2 text-sm font-black leading-5 text-white shadow-[0_14px_30px_rgba(15,107,255,0.22)] transition hover:bg-[#0b55d9]">
                <Send className="h-4 w-4" />
                Send offer
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-orange-200 bg-orange-50 p-5 shadow-sm">
            <h3 className="font-black text-orange-950">Safety notes</h3>
            <div className="mt-3 grid gap-2">
              {job.safetyNotes.map((note) => (
                <p key={note} className="flex gap-2 text-sm text-orange-950">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  {note}
                </p>
              ))}
            </div>
          </section>

          {providers.slice(0, 2).map((provider) => (
            <section key={provider.id} className="premium-card rounded-lg p-5">
              <div className="flex items-center gap-3">
                <img src={provider.profilePhoto} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="break-words font-black leading-5 text-[#102027]">{provider.name}</p>
                  <p className="mt-1 text-sm leading-5 text-[#5c6f77]">{provider.category}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <ScoreBadge label="Trust Score" score={provider.trustScore} />
                <ScoreBadge label="Reliability Score" score={provider.reliabilityScore} />
              </div>
            </section>
          ))}
        </aside>
      </section>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="soft-panel rounded-lg p-4">
      <span className="shrink-0 text-[#0f6bff]">{icon}</span>
      <p className="mt-3 text-xs font-bold uppercase tracking-normal text-[#5c6f77]">{label}</p>
      <p className="mt-1 break-words text-sm font-black leading-6 text-[#102027]">{value}</p>
    </div>
  );
}
