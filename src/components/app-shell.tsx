"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { BriefcaseBusiness, ClipboardList, LayoutDashboard, Menu, MessageCircle, ShieldCheck, Sparkles, UserRound, Wrench, X } from "lucide-react";
import { LanguageSwitcher, useLanguage } from "./language-provider";
import type { TranslationKey } from "@/lib/translations";

const navItems: {
  href: string;
  labelKey: TranslationKey;
  icon: typeof Wrench;
  desktop?: boolean;
}[] = [
  { href: "/services", labelKey: "nav.services", icon: Wrench, desktop: true },
  { href: "/request", labelKey: "nav.post", icon: ClipboardList },
  { href: "/requests", labelKey: "nav.browse", icon: BriefcaseBusiness, desktop: true },
  { href: "/offers", labelKey: "nav.offers", icon: BriefcaseBusiness, desktop: true },
  { href: "/dashboard/customer", labelKey: "nav.customer", icon: LayoutDashboard, desktop: true },
  { href: "/dashboard/provider", labelKey: "nav.provider", icon: UserRound, desktop: true },
  { href: "/chat", labelKey: "nav.chat", icon: MessageCircle },
  { href: "/pitch", labelKey: "nav.pitch", icon: ShieldCheck, desktop: true },
  { href: "/showcase", labelKey: "nav.showcase", icon: Sparkles, desktop: true },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const desktopItems = navItems.filter((item) => item.desktop);

  return (
    <div className="page-shell min-h-screen bg-[#f6fafb]">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/95 shadow-[0_10px_30px_rgba(15,37,48,0.07)] backdrop-blur-xl">
        <div className="app-container flex items-center justify-between gap-2 py-3 sm:gap-3">
          <Link href="/" className="flex min-w-0 max-w-[min(62vw,18rem)] shrink-0 items-center gap-3 sm:max-w-none" onClick={() => setOpen(false)}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0f6bff] text-sm font-black text-white shadow-[0_14px_32px_rgba(15,107,255,0.28)] ring-1 ring-white/40">QF</span>
            <span className="min-w-0">
              <span className="block text-lg font-black leading-tight text-[#102027]">QuickFix</span>
              <span className="hidden max-w-[250px] truncate text-xs font-semibold leading-4 text-[#5c6f77] lg:block">{t("nav.tagline")}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-lg border border-[#dbe7ec] bg-[#f7fbfc]/88 p-1 2xl:flex">
            {desktopItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-bold text-[#39505a] transition hover:bg-white hover:text-[#102027] hover:shadow-sm"
                >
                  <Icon className="h-4 w-4" />
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <LanguageSwitcher compact />
            <Link
              href="/request"
              className="inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#0f6bff] px-4 py-2 text-sm font-black text-white shadow-[0_14px_32px_rgba(15,107,255,0.24)] transition hover:bg-[#0b55d9] hover:shadow-[0_18px_42px_rgba(15,107,255,0.28)]"
            >
              <ClipboardList className="h-4 w-4" />
              {t("nav.postRequest")}
            </Link>
            <Link
              href="/auth"
              className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-black text-[#0b4fbe] shadow-sm transition hover:border-[#0f6bff] hover:bg-blue-50 hover:text-[#063f9f]"
            >
              {t("nav.demoLogin")}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#cddde4] bg-white px-3 py-2 text-sm font-black text-[#102027] shadow-sm transition hover:border-[#0f6bff] hover:bg-blue-50 2xl:hidden"
            aria-expanded={open}
            aria-label={open ? t("nav.close") : t("nav.menu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            {open ? t("nav.close") : t("nav.menu")}
          </button>
        </div>

        {open && (
          <div className="border-t border-[#eef4f6] bg-white px-4 py-4 shadow-[0_18px_40px_rgba(15,37,48,0.08)] 2xl:hidden">
            <div className="app-container grid gap-3">
              <LanguageSwitcher />
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-[#dbe7ec] bg-[#f7fbfc] px-3 py-2 text-sm font-bold leading-5 text-[#39505a] shadow-sm transition hover:border-[#0f6bff] hover:bg-white"
                >
                      <Icon className="h-4 w-4 shrink-0" />
                      {t(item.labelKey)}
                    </Link>
                  );
                })}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <Link
                  href="/request"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0f6bff] px-4 py-2 text-sm font-black leading-5 text-white shadow-[0_14px_32px_rgba(15,107,255,0.24)] transition hover:bg-[#0b55d9]"
                >
                  <ClipboardList className="h-4 w-4" />
                  {t("nav.postRequest")}
                </Link>
                <Link
                  href="/auth"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-black leading-5 text-[#0b4fbe] shadow-sm transition hover:border-[#0f6bff] hover:bg-blue-50"
                >
                  {t("nav.demoLogin")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-[#dbe7ec] bg-[#071923] text-white">
        <div className="app-container grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-lg font-black text-white">QuickFix</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{t("footer.description")}</p>
            <p className="mt-4 inline-flex rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-xs font-black text-cyan-100">{t("footer.languageNote")}</p>
          </div>
          <div>
            <p className="font-bold text-white">{t("footer.product")}</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-300">
              <Link className="transition hover:text-white" href="/services">{t("footer.serviceCategories")}</Link>
              <Link className="transition hover:text-white" href="/requests">{t("footer.browseRequests")}</Link>
              <Link className="transition hover:text-white" href="/showcase">{t("nav.showcase")}</Link>
              <Link className="transition hover:text-white" href="/pitch">{t("footer.pitchPage")}</Link>
              <Link className="transition hover:text-white" href="/admin">{t("footer.adminDashboard")}</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-white">{t("footer.trustNotes")}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t("footer.trustCopy")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
