"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Inbox, ShieldCheck, Sparkles, Star } from "lucide-react";
import type { Urgency } from "@/lib/types";
import { urgencyTranslations } from "@/lib/translations";
import { useLanguage } from "./language-provider";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "emergency" | "ghost";
  className?: string;
}) {
  const classes = {
    primary: "bg-[#0f6bff] text-white shadow-[0_18px_38px_rgba(15,107,255,0.24)] hover:bg-[#0b55d9] hover:shadow-[0_22px_50px_rgba(15,107,255,0.3)] focus-visible:outline-[#0f6bff]",
    secondary: "bg-white text-[#102027] ring-1 ring-[#cddde4] shadow-sm hover:bg-[#f1f7f9] hover:ring-[#0f6bff]",
    emergency: "bg-[#f05a28] text-white shadow-[0_18px_38px_rgba(240,90,40,0.25)] hover:bg-[#d94d22]",
    ghost: "bg-white/12 text-white ring-1 ring-white/35 hover:bg-white hover:text-[#102027] hover:shadow-sm",
  };

  return (
    <Link
      href={href}
      className={cx(
        "inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-black leading-5 transition active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2",
        classes[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "emergency";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  const classes = {
    primary: "bg-[#0f6bff] text-white shadow-[0_18px_38px_rgba(15,107,255,0.24)] hover:bg-[#0b55d9]",
    secondary: "border border-[#cddde4] bg-white text-[#102027] shadow-sm hover:border-[#0f6bff] hover:bg-blue-50",
    emergency: "bg-[#f05a28] text-white shadow-[0_18px_38px_rgba(240,90,40,0.24)] hover:bg-[#d94d22]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        "inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-black leading-5 transition active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2",
        classes[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "blue";
}) {
  const classes = {
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    warning: "bg-amber-50 text-amber-800 ring-amber-200",
    danger: "bg-red-50 text-red-700 ring-red-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
  };

  return <span className={`inline-flex max-w-full flex-wrap items-center gap-1 rounded-md px-2.5 py-1 text-left text-xs font-bold leading-4 break-words ring-1 ${classes[tone]}`}>{children}</span>;
}

export function PageSection({
  children,
  tone = "default",
  tight = false,
  className,
}: {
  children: ReactNode;
  tone?: "default" | "white" | "dark";
  tight?: boolean;
  className?: string;
}) {
  const tones = {
    default: "",
    white: "bg-white",
    dark: "bg-[#071923] text-white",
  };

  return (
    <section className={cx(tight ? "page-section-tight" : "page-section", tones[tone], className)}>
      <div className="app-container">{children}</div>
    </section>
  );
}

export function Card({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return <div className={cx("premium-card p-5 md:p-6", hover && "premium-card-hover", className)}>{children}</div>;
}

export function IconTile({
  children,
  tone = "blue",
  className,
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "orange" | "dark" | "white";
  className?: string;
}) {
  const tones = {
    blue: "bg-blue-50 text-[#0f6bff] ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    orange: "bg-orange-50 text-orange-700 ring-orange-100",
    dark: "bg-[#102027] text-white ring-slate-800",
    white: "bg-white text-[#0f6bff] ring-[#dbe7ec]",
  };

  return <span className={cx("flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1", tones[tone], className)}>{children}</span>;
}

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const { language } = useLanguage();
  const tone = urgency === "Emergency" ? "danger" : urgency === "High" ? "warning" : urgency === "Medium" ? "blue" : "success";
  return (
    <Badge tone={tone}>
      {urgency === "Emergency" && <AlertTriangle className="mr-1 h-3.5 w-3.5" />}
      {urgencyTranslations[language][urgency]}
    </Badge>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="mb-3 inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-black uppercase tracking-normal text-[#0f6bff] ring-1 ring-blue-100">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-black leading-tight text-[#102027] md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-[#5c6f77] md:text-lg">{description}</p>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[#dbe7ec] bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,107,255,0.08),transparent_42%,rgba(18,185,129,0.08))]" />
      <div className="relative app-container flex flex-col gap-6 py-10 sm:py-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 inline-flex rounded-md bg-white px-2.5 py-1 text-xs font-black uppercase tracking-normal text-[#0f6bff] ring-1 ring-blue-100">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-black leading-tight text-[#102027] md:text-5xl">{title}</h1>
          {description && <p className="mt-4 text-base leading-7 text-[#5c6f77] md:text-lg">{description}</p>}
        </div>
        {actions && <div className="action-row shrink-0">{actions}</div>}
      </div>
    </section>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  icon,
  tone = "blue",
}: {
  label: ReactNode;
  value: string | number;
  detail?: ReactNode;
  icon?: ReactNode;
  tone?: "blue" | "green" | "orange" | "dark";
}) {
  const toneClasses = {
    blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    orange: "bg-orange-50 text-orange-700 ring-1 ring-orange-100",
    dark: "bg-[#102027] text-white ring-1 ring-slate-800",
  };

  return (
    <div className="premium-card premium-card-hover relative min-h-[150px] overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0f6bff,#12b981,#f05a28)] opacity-80" />
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold leading-5 text-[#5c6f77]">{label}</p>
        {icon && <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${toneClasses[tone]}`}>{icon}</div>}
      </div>
      <p className="mt-4 text-3xl font-black text-[#102027]">{value}</p>
      {detail && <p className="mt-2 text-sm text-[#5c6f77]">{detail}</p>}
    </div>
  );
}

export function ScoreBadge({ label, score }: { label: string; score: number }) {
  const tone = score >= 90 ? "success" : score >= 80 ? "blue" : score >= 70 ? "warning" : "danger";
  return (
    <Badge tone={tone}>
      <ShieldCheck className="mr-1 h-3.5 w-3.5" />
      {label}: {score}
      {label.toLowerCase().includes("trust") ? "%" : "/100"}
    </Badge>
  );
}

export function DemoEmptyState({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="soft-panel p-5">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#0f6bff] shadow-sm">
          <Inbox className="h-5 w-5" />
        </span>
        <div>
          <p className="font-black text-[#102027]">{title}</p>
          <p className="mt-1 text-sm leading-6 text-[#5c6f77]">{description}</p>
          {action && <div className="mt-4">{action}</div>}
        </div>
      </div>
    </div>
  );
}

export function LoadingDemoState({ label = "Matching providers" }: { label?: ReactNode }) {
  return (
    <div className="soft-panel p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0f6bff]">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[#102027]">{label}</p>
          <div className="mt-3 grid gap-2">
            <div className="loading-line h-2 w-full" />
            <div className="loading-line h-2 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Rating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#102027]">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      {rating.toFixed(1)}
    </span>
  );
}

export function VerificationLevel({ level }: { level: number }) {
  const levels = [
    "Email and phone verified",
    "Government ID uploaded",
    "Admin approved",
    "Insurance uploaded",
    "License or certificate verified",
  ];

  return (
    <div className="space-y-2">
      {levels.map((item, index) => {
        const active = index < level;
        return (
          <div key={item} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className={`h-4 w-4 shrink-0 ${active ? "text-emerald-600" : "text-slate-300"}`} />
            <span className={`leading-6 ${active ? "font-medium text-[#102027]" : "text-[#7a8d95]"}`}>Level {index + 1}: {item}</span>
          </div>
        );
      })}
    </div>
  );
}
