"use client";

import { useState } from "react";
import { Bot, PackagePlus, Sparkles } from "lucide-react";
import { buildProviderProfile } from "@/lib/ai";
import { useLanguage } from "./language-provider";
import { Badge } from "./ui";

type BuiltProfile = ReturnType<typeof buildProviderProfile>;

export function ProfileBuilder() {
  const { language } = useLanguage();
  const [input, setInput] = useState("I do plumbing, sink repair, toilet repair, and leaks. I have 5 years experience.");
  const [profile, setProfile] = useState<BuiltProfile>(() => buildProviderProfile(input));

  return (
    <section className="premium-card rounded-lg p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#0f6bff] shadow-sm ring-1 ring-blue-100">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-2xl font-black text-[#102027]">{language === "es" ? "Constructor inteligente de perfil" : "Smart Profile Builder"}</h2>
          <p className="text-sm text-[#5c6f77]">{language === "es" ? "Convierte notas simples del proveedor en un perfil público profesional." : "Turn rough provider notes into a professional public profile draft."}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-[#102027]">{language === "es" ? "Información del proveedor" : "Provider input"}</span>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={8}
              className="premium-input p-3 text-sm leading-6"
            />
          </label>
          <button
            type="button"
            onClick={() => setProfile(buildProviderProfile(input))}
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0f6bff] px-5 py-3 text-sm font-black text-white shadow-[0_18px_38px_rgba(15,107,255,0.22)] transition hover:bg-[#0d5be0]"
          >
            <Bot className="h-4 w-4" />
            {language === "es" ? "Generar perfil" : "Generate profile"}
          </button>
        </div>
        <div className="soft-panel rounded-lg p-4">
          <p className="text-sm font-bold uppercase tracking-normal text-[#0f6bff]">{language === "es" ? "Resultado generado" : "Generated output"}</p>
          <h3 className="mt-3 text-xl font-black text-[#102027]">{language === "es" ? "Biografía profesional" : "Professional bio"}</h3>
          <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{profile.bio}</p>
          <h3 className="mt-5 text-xl font-black text-[#102027]">{language === "es" ? "Descripción del servicio" : "Service description"}</h3>
          <p className="mt-2 text-sm leading-6 text-[#5c6f77]">{profile.serviceDescription}</p>
          <div className="mt-5">
            <p className="font-bold text-[#102027]">{language === "es" ? "Lista de habilidades" : "Skills list"}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} tone="success">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {profile.packages.map((item) => (
              <div key={item.name} className="rounded-lg border border-[#dbe7ec] bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-[#102027]">
                  <PackagePlus className="h-4 w-4 text-[#0f6bff]" />
                  {item.name}
                </div>
                <p className="mt-2 text-sm text-[#5c6f77]">{item.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-lg bg-white p-3 text-sm font-bold text-[#102027]">{language === "es" ? "Rango sugerido" : "Suggested price range"}: {profile.suggestedPriceRange}</p>
        </div>
      </div>
    </section>
  );
}
