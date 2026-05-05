import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Award, BadgeCheck, BriefcaseBusiness, Clock, Languages, MapPin, ShieldCheck, Star, WalletCards } from "lucide-react";
import { T } from "@/components/language-provider";
import { providers } from "@/lib/demo-data";
import { Badge, ButtonLink, LoadingDemoState, Rating, ScoreBadge, VerificationLevel } from "@/components/ui";

export function generateStaticParams() {
  return providers.map((provider) => ({ id: provider.id }));
}

export default async function ProviderProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((item) => item.id === id);
  if (!provider) notFound();

  return (
    <div>
      <section className="relative min-h-[420px] overflow-hidden bg-[#102027]">
        <img src={provider.coverPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061620] via-[#061620]/78 to-[#061620]/24" />
        <div className="app-container relative flex min-h-[420px] items-end py-12">
          <div className="max-w-4xl text-white">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <img src={provider.profilePhoto} alt={`${provider.name} profile`} className="h-24 w-24 shrink-0 rounded-lg border-4 border-white object-cover shadow-xl sm:h-28 sm:w-28" />
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {provider.badges.slice(0, 4).map((badge) => (
                    <Badge key={badge} tone={badge.includes("Pending") ? "warning" : "success"}>{badge}</Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl">{provider.name}</h1>
                <p className="mt-2 text-sm font-bold uppercase leading-5 tracking-normal text-cyan-100">{provider.categories.join(" + ")}</p>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-100">{provider.bio}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/request"><T k="profile.hire" /></ButtonLink>
                  <ButtonLink href="/chat" variant="secondary"><T k="profile.message" /></ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-container grid gap-6 py-10 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <section className="premium-card rounded-lg p-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="soft-panel rounded-lg p-4">
                <Rating rating={provider.rating} />
                <p className="mt-2 text-xs text-[#5c6f77]"><T k="profile.ratings" /></p>
              </div>
              <div className="soft-panel rounded-lg p-4">
                <p className="text-lg font-black text-[#102027]">{provider.completedJobs}</p>
                <p className="mt-2 text-xs text-[#5c6f77]"><T k="profile.completedJobs" /></p>
              </div>
              <div className="soft-panel rounded-lg p-4">
                <p className="text-lg font-black text-[#102027]">{provider.responseTimeMinutes} minutes</p>
                <p className="mt-2 text-xs text-[#5c6f77]"><T k="profile.responseTime" /></p>
              </div>
              <div className="soft-panel rounded-lg p-4">
                <p className="text-lg font-black text-[#102027]">{provider.startingPrice}</p>
                <p className="mt-2 text-xs text-[#5c6f77]"><T k="profile.startingPrice" /></p>
              </div>
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="profile.professionalProfile" /></h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Info icon={<BriefcaseBusiness className="h-5 w-5" />} label={<T k="profile.serviceCategories" />} value={provider.categories.join(", ")} />
              <Info icon={<Award className="h-5 w-5" />} label={<T k="profile.experience" />} value={`${provider.yearsExperience} years`} />
              <Info icon={<MapPin className="h-5 w-5" />} label={<T k="profile.serviceArea" />} value={provider.serviceArea} />
              <Info icon={<Clock className="h-5 w-5" />} label={<T k="profile.availability" />} value={provider.availability} />
              <Info icon={<WalletCards className="h-5 w-5" />} label={<T k="profile.price" />} value={`${provider.startingPrice} / ${provider.hourlyRate ?? "fixed quotes"}`} />
              <Info icon={<Languages className="h-5 w-5" />} label={<T k="profile.languages" />} value={provider.languages.join(", ")} />
            </div>
            <div className="mt-5">
              <h3 className="font-black text-[#102027]"><T k="profile.skills" /></h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {provider.skills.map((skill) => (
                  <Badge key={skill} tone="blue">{skill}</Badge>
                ))}
              </div>
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="profile.packages" /></h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {provider.servicePackages.map((pack) => (
                <article key={pack.name} className="premium-card-hover rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm">
                  <h3 className="font-black text-[#102027]">{pack.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{pack.description}</p>
                  <p className="mt-4 text-lg font-black text-[#0f6bff]">{pack.price}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="profile.portfolio" /></h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {provider.portfolioPhotos.map((photo) => (
                <img key={photo} src={photo} alt="Provider portfolio work" className="aspect-[4/3] w-full rounded-lg object-cover shadow-sm" />
              ))}
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="profile.beforeAfter" /></h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {provider.beforeAfterPhotos.map((photo, index) => (
                <div key={photo} className="relative overflow-hidden rounded-lg">
                  <img src={photo} alt="Before and after work placeholder" className="aspect-video w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-lg bg-white px-2 py-1 text-xs font-bold text-[#102027]">{index === 0 ? "Before" : "After"}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="profile.workHistory" /></h2>
            <div className="mt-5 grid gap-3">
              {provider.workHistory.map((work) => (
                <div key={work.title} className="flex flex-col justify-between gap-3 rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm sm:flex-row sm:items-center">
                  <div>
                    <p className="font-black text-[#102027]">{work.title}</p>
                    <p className="text-sm text-[#5c6f77]">{work.category} - {work.status}</p>
                  </div>
                  <Badge tone="success">Customer rating: {work.rating}</Badge>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="profile.ratings" /></h2>
            <div className="mt-5 grid gap-4">
              {provider.reviews.map((review) => (
                <article key={`${review.customer}-${review.date}`} className="rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-black text-[#102027]">{review.customer}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-bold">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {review.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{review.text}</p>
                  <p className="mt-2 text-xs text-[#7a8d95]">{review.date}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="grid h-fit gap-6">
          <section className="premium-card rounded-lg p-5">
            <h2 className="text-xl font-black text-[#102027]"><T k="profile.trustProfile" /></h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <ScoreBadge label="Trust Score" score={provider.trustScore} />
              <ScoreBadge label="Reliability Score" score={provider.reliabilityScore} />
              <Badge tone={provider.kycStatus === "Verified" ? "success" : "warning"}>
                <BadgeCheck className="mr-1 h-3.5 w-3.5" />
                KYC {provider.kycStatus}
              </Badge>
              <Badge tone={provider.insuranceStatus.includes("uploaded") ? "success" : "warning"}>{provider.insuranceStatus}</Badge>
            </div>
            <div className="mt-5">
              <VerificationLevel level={provider.verificationLevel} />
            </div>
          </section>

          <LoadingDemoState label="Profile quality scan complete" />

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-xl font-black text-[#102027]"><T k="profile.licenses" /></h2>
            <div className="mt-4 grid gap-2">
              {[...provider.licenses, ...provider.certifications].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#5c6f77]">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#12b981]" />
                  <span className="min-w-0 leading-6">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-card rounded-lg p-5">
            <h2 className="text-xl font-black text-[#102027]"><T k="profile.booking" /></h2>
            <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{provider.availability}. Typical response time is {provider.responseTimeMinutes} minutes.</p>
            <div className="mt-5 grid gap-3">
              <ButtonLink href="/request"><T k="profile.hire" /></ButtonLink>
              <ButtonLink href="/chat" variant="secondary"><T k="profile.message" /></ButtonLink>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

function Info({ icon, label, value }: { icon: ReactNode; label: ReactNode; value: string }) {
  return (
    <div className="soft-panel flex gap-3 rounded-lg p-4">
      <span className="shrink-0 text-[#0f6bff]">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-normal text-[#5c6f77]">{label}</p>
        <p className="mt-1 break-words text-sm font-bold leading-6 text-[#102027]">{value}</p>
      </div>
    </div>
  );
}
