import { ArrowRight, MapPin, Search, UserCheck } from "lucide-react";
import { CategoryGrid } from "@/components/category-grid";
import { T } from "@/components/language-provider";
import { ButtonLink, Card, DemoEmptyState, IconTile, PageHeader } from "@/components/ui";
import { serviceCategories } from "@/lib/demo-data";

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        eyebrow={<T k="services.eyebrow" />}
        title={<T k="services.title" />}
        description={<T k="services.description" />}
        actions={
          <>
            <ButtonLink href="/request"><T k="nav.postRequest" /></ButtonLink>
            <ButtonLink href="/requests" variant="secondary"><T k="footer.browseRequests" /></ButtonLink>
          </>
        }
      />
      <section className="app-container grid gap-8 py-10">
        <div className="card-grid-wide">
          <Card hover className="h-full">
            <IconTile><Search className="h-5 w-5" /></IconTile>
            <h2 className="mt-4 text-xl font-black text-[#102027]"><T k="services.customersPost" /></h2>
            <p className="mt-2 text-sm leading-6 text-[#5c6f77]"><T k="services.customersPostCopy" /></p>
          </Card>
          <Card hover className="h-full">
            <IconTile tone="green"><UserCheck className="h-5 w-5" /></IconTile>
            <h2 className="mt-4 text-xl font-black text-[#102027]"><T k="services.providersOffer" /></h2>
            <p className="mt-2 text-sm leading-6 text-[#5c6f77]"><T k="services.providersOfferCopy" /></p>
          </Card>
          <Card hover className="h-full">
            <IconTile tone="orange"><MapPin className="h-5 w-5" /></IconTile>
            <h2 className="mt-4 text-xl font-black text-[#102027]"><T k="services.localMatching" /></h2>
            <p className="mt-2 text-sm leading-6 text-[#5c6f77]"><T k="services.localMatchingCopy" /></p>
          </Card>
        </div>

        <CategoryGrid />

        <DemoEmptyState
          title={`${serviceCategories.length} demo categories ready`}
          description="New categories can be added by updating the shared demo data file. Admin category management is represented in the dashboard for the MVP."
          action={<ButtonLink href="/admin" variant="secondary">Open admin dashboard <ArrowRight className="h-4 w-4" /></ButtonLink>}
        />
      </section>
    </div>
  );
}
