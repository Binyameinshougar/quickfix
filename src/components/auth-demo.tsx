"use client";

import { useState } from "react";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useLanguage } from "./language-provider";
import { ActionButton } from "./ui";

export function AuthDemo() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"Customer" | "Provider" | "Admin">("Customer");
  const roleLabel = {
    Customer: t("auth.customer"),
    Provider: t("auth.provider"),
    Admin: t("auth.admin"),
  }[role];

  return (
    <section className="premium-card mx-auto w-full max-w-xl p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#eef6f9] p-1">
        {(["login", "register"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-lg text-sm font-bold capitalize transition ${mode === item ? "bg-white text-[#102027] shadow-sm" : "text-[#5c6f77]"}`}
          >
            {t(item === "login" ? "auth.login" : "auth.register")}
          </button>
        ))}
      </div>
      <div className="mt-5">
        <h1 className="text-3xl font-black text-[#102027]">{mode === "login" ? t("auth.welcome") : t("auth.create")}</h1>
        <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{t("auth.copy")}</p>
      </div>
      <div className="mt-5 grid gap-4">
        {mode === "register" && (
          <label className="grid gap-2">
            <span className="text-sm font-bold text-[#102027]">{t("auth.name")}</span>
            <span className="relative">
              <UserRound className="absolute left-3 top-3 h-5 w-5 text-[#5c6f77]" />
              <input className="premium-input w-full px-10" placeholder="Ahmed Plumbing" />
            </span>
          </label>
        )}
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[#102027]">{t("auth.email")}</span>
          <span className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-[#5c6f77]" />
            <input className="premium-input w-full px-10" placeholder="demo@quickfix.local" />
          </span>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[#102027]">{t("auth.password")}</span>
          <span className="relative">
            <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-[#5c6f77]" />
            <input type="password" className="premium-input w-full px-10" placeholder="demo password" />
          </span>
        </label>
        <div className="grid gap-2">
          <span className="text-sm font-bold text-[#102027]">{t("auth.role")}</span>
          <div className="grid gap-2 sm:grid-cols-3">
            {(["Customer", "Provider", "Admin"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`min-h-11 rounded-lg border px-3 text-sm font-bold transition ${
                  role === item ? "border-[#0f6bff] bg-blue-50 text-[#0f6bff]" : "border-[#cddde4] bg-white text-[#5c6f77]"
                }`}
              >
                {item === "Customer" ? t("auth.customer") : item === "Provider" ? t("auth.provider") : t("auth.admin")}
              </button>
            ))}
          </div>
        </div>
        <ActionButton className="min-h-12 w-full">
          {t("auth.continueAs")} {roleLabel}
        </ActionButton>
      </div>
    </section>
  );
}
