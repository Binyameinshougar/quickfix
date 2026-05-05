import { EmergencyOptions } from "@/components/emergency-options";
import { T } from "@/components/language-provider";
import { RequestIntake } from "@/components/request-intake";
import { PageHeader } from "@/components/ui";

export default function RequestPage() {
  return (
    <div>
      <PageHeader
        eyebrow={<T k="request.eyebrow" />}
        title={<T k="request.title" />}
        description={<T k="request.description" />}
      />
      <section className="app-container grid gap-6 py-10">
        <EmergencyOptions />
        <RequestIntake />
      </section>
    </div>
  );
}
