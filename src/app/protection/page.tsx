import { AlertTriangle, Camera, FileText, ShieldCheck, Upload } from "lucide-react";
import { T } from "@/components/language-provider";
import { ActionButton, Badge, ButtonLink, LoadingDemoState, PageHeader } from "@/components/ui";
import { disputes } from "@/lib/demo-data";

export default function ProtectionPage() {
  return (
    <div>
      <PageHeader
        eyebrow={<T k="protection.eyebrow" />}
        title={<T k="protection.title" />}
        description={<T k="protection.description" />}
        actions={<ButtonLink href="/jobs/job-001" variant="secondary"><T k="protection.back" /></ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10 lg:grid-cols-[1fr_0.9fr]">
        <form className="premium-card rounded-lg p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-700 shadow-sm ring-1 ring-red-100">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-black text-[#102027]"><T k="protection.assistant" /></h2>
              <p className="text-sm text-[#5c6f77]"><T k="protection.assistantCopy" /></p>
            </div>
          </div>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#102027]"><T k="protection.issueType" /></span>
              <select className="premium-input px-3 text-sm">
                <option>Damage report</option>
                <option>No-show report</option>
                <option>Provider dispute</option>
                <option>Follow-up request</option>
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#102027]"><T k="protection.jobId" /></span>
                <input defaultValue="job-001" className="premium-input px-3 text-sm" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#102027]"><T k="protection.providerName" /></span>
                <input defaultValue="Ahmed Plumbing" className="premium-input px-3 text-sm" />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#102027]"><T k="protection.whatHappened" /></span>
              <textarea rows={6} defaultValue="The cabinet floor appears swollen after the leak repair. I want admin to review what happened." className="premium-input p-3 text-sm leading-6" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { key: "before", label: <T k="protection.beforePhotos" /> },
                { key: "after", label: <T k="protection.afterPhotos" /> },
              ].map((item) => (
                <label key={item.key} className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#9fc4d3] bg-[#f7fbfc] p-4 text-center transition hover:border-[#0f6bff] hover:bg-blue-50/40">
                  <Upload className="h-5 w-5 text-[#0f6bff]" />
                  <span className="mt-2 text-sm font-bold text-[#102027]">{item.label}</span>
                  <span className="mt-1 text-xs text-[#5c6f77]">Upload placeholder</span>
                  <input type="file" className="sr-only" />
                </label>
              ))}
            </div>
            <ActionButton variant="emergency" className="min-h-12"><T k="protection.submit" /></ActionButton>
          </div>
        </form>

        <div className="grid gap-6">
          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="protection.preview" /></h2>
            <div className="mt-5 grid gap-3">
              {[
                ["Issue type", "Damage report"],
                ["Description", "Cabinet floor appears swollen after leak repair"],
                ["Before photos", "Attached placeholder"],
                ["After photos", "Attached placeholder"],
                ["Provider name", "Ahmed Plumbing"],
                ["Job ID", "job-001"],
                ["Estimated severity", "Medium"],
                ["Admin review status", "Submitted"],
              ].map(([label, value]) => (
                <div key={label} className="soft-panel flex items-start gap-3 rounded-lg p-3">
                  <FileText className="mt-0.5 h-4 w-4 text-[#0f6bff]" />
                  <p className="text-sm text-[#5c6f77]"><span className="font-bold text-[#102027]">{label}:</span> {value}</p>
                </div>
              ))}
            </div>
          </section>
          <LoadingDemoState label="Organizing report evidence" />
          <section className="premium-card rounded-lg p-5">
            <h2 className="text-2xl font-black text-[#102027]"><T k="protection.caseStatuses" /></h2>
            <div className="mt-5 grid gap-3">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-black text-[#102027]">{dispute.id}</p>
                    <Badge tone={dispute.status === "Resolved" ? "success" : dispute.status === "Under review" ? "warning" : "blue"}>{dispute.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-[#5c6f77]">{dispute.job} - {dispute.provider}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <div className="flex gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-emerald-700" />
              <p className="text-sm leading-6 text-emerald-950">For the first MVP, customers and providers connect without platform payments. Future protection workflows can pause payouts after payment tools are added.</p>
            </div>
          </section>
          <section className="premium-card rounded-lg p-5">
            <div className="flex gap-3">
              <Camera className="mt-1 h-5 w-5 text-[#0f6bff]" />
              <p className="text-sm leading-6 text-[#5c6f77]">Take before and after photos whenever possible. Clear photos improve admin review quality.</p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
