import { AIAnalysisCard } from "@/components/ai-analysis-card";
import { T } from "@/components/language-provider";
import { ProviderCard } from "@/components/provider-card";
import { ButtonLink, PageHeader } from "@/components/ui";
import { analyzeProblem } from "@/lib/ai";
import { providers } from "@/lib/demo-data";

export default function AnalysisPage() {
  const analysis = analyzeProblem("My sink is leaking and water is everywhere.");

  return (
    <div>
      <PageHeader
        eyebrow={<T k="analysis.eyebrow" />}
        title={<T k="analysis.title" />}
        description={<T k="analysis.description" />}
        actions={<ButtonLink href="/offers"><T k="analysis.viewOffers" /></ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <AIAnalysisCard analysis={analysis} />
        <div className="grid gap-6">
          {providers.slice(0, 2).map((provider, index) => (
            <ProviderCard key={provider.id} provider={provider} highlight={index === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
