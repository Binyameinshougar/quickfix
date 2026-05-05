import { CheckCircle2, CreditCard, DollarSign, RotateCcw, ShieldAlert, WalletCards } from "lucide-react";
import { Badge, ButtonLink, PageHeader } from "@/components/ui";

const steps = [
  { label: "No payment system in MVP", status: "Current", icon: CreditCard },
  { label: "Customer and provider agree offline", status: "Current", icon: WalletCards },
  { label: "Future platform payment", status: "Later", icon: DollarSign },
  { label: "Future dispute hold", status: "Optional", icon: ShieldAlert },
  { label: "Future refund workflow", status: "Optional", icon: RotateCcw },
];

export default function EscrowPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Future Payment Placeholder"
        title="QuickFix does not include payments in the first MVP"
        description="The first version focuses on posting requests, receiving offers, messaging, and reviews. Payment, escrow, commission, and refunds are future marketplace features only."
        actions={<ButtonLink href="/protection" variant="secondary">Open protection center</ButtonLink>}
      />
      <section className="app-container grid gap-6 py-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="premium-card rounded-lg p-5">
          <h2 className="text-2xl font-black text-[#102027]">MVP payment policy</h2>
          <div className="mt-5 rounded-lg bg-[#102027] p-5 text-white shadow-[0_26px_70px_rgba(16,32,39,0.22)]">
            <p className="text-sm font-bold text-cyan-200">Current job</p>
            <h3 className="mt-2 text-2xl font-black">Kitchen sink leaking</h3>
            <p className="mt-4 text-4xl font-black">Free MVP</p>
            <p className="mt-2 text-sm text-slate-200">QuickFix helps both sides connect. No platform payment or commission is charged in this version.</p>
          </div>
          <div className="mt-5 grid gap-3">
            <button type="button" className="min-h-11 rounded-lg bg-[#12b981] px-4 text-sm font-black text-white shadow-[0_14px_30px_rgba(18,185,129,0.2)]">Mark job completed</button>
            <button type="button" className="min-h-11 rounded-lg border border-[#cddde4] bg-white px-4 text-sm font-bold text-[#102027] shadow-sm">Leave review</button>
            <button type="button" className="min-h-11 rounded-lg border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-700 shadow-sm">Report issue</button>
          </div>
        </div>
        <section className="premium-card rounded-lg p-5">
          <h2 className="text-2xl font-black text-[#102027]">Future payment flow</h2>
          <div className="mt-6 grid gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const active = step.status === "Current";
              return (
                <div key={step.label} className={`flex items-center gap-4 rounded-lg border p-4 shadow-sm ${active ? "border-[#0f6bff] bg-blue-50" : "border-[#dbe7ec] bg-[#f7fbfc]"}`}>
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${active ? "bg-[#0f6bff] text-white shadow-[0_14px_30px_rgba(15,107,255,0.22)]" : "bg-white text-[#5c6f77] shadow-sm"}`}>
                    {index === 0 ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </span>
                  <div className="flex-1">
                    <p className="font-black text-[#102027]">{step.label}</p>
                    <p className="text-sm text-[#5c6f77]">{step.status}</p>
                  </div>
                  <Badge tone={active ? "blue" : step.status === "Later" ? "warning" : "neutral"}>{step.status}</Badge>
                </div>
              );
            })}
          </div>
          <p className="mt-5 rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-orange-950">
            No real payment integration is included in the MVP. This page is only a future concept placeholder for after the marketplace has local traction.
          </p>
        </section>
      </section>
    </div>
  );
}
