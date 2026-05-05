"use client";

import { useState } from "react";
import { Bot, Camera, Send, UserRound, Wrench } from "lucide-react";
import { useLanguage } from "./language-provider";

type Message = {
  author: "Assistant" | "Customer" | "Provider";
  text: string;
};

const initialMessages: Message[] = [
  { author: "Assistant", text: "Can you upload a photo of the problem?" },
  { author: "Customer", text: "The water is still leaking under the sink." },
  { author: "Assistant", text: "Please move electronics away from water and turn off the valve if possible." },
  { author: "Provider", text: "I can arrive in about 20 minutes. Please send a photo of the valve area." },
];

const initialMessagesEs = [
  "¿Puedes subir una foto del problema?",
  "El agua sigue saliendo debajo del fregadero.",
  "Aleja los aparatos eléctricos del agua y cierra la válvula si es posible.",
  "Puedo llegar en unos 20 minutos. Envía una foto del área de la válvula.",
];

const suggestions = ["Is the water still leaking?", "Do you need help within 1 hour?", "Where is the shutoff valve?", "Can I upload a photo?"];

export function ChatInterface() {
  const { language } = useLanguage();
  const es = language === "es";
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const localizedSuggestions = es
    ? ["¿El agua sigue saliendo?", "¿Necesitas ayuda dentro de 1 hora?", "¿Dónde está la válvula?", "¿Puedo subir una foto?"]
    : suggestions;
  const authorLabels = {
    Assistant: es ? "Asistente" : "Assistant",
    Customer: es ? "Cliente" : "Customer",
    Provider: es ? "Proveedor" : "Provider",
  };

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((current) => [
      ...current,
      { author: "Customer", text },
      {
        author: "Assistant",
        text: es
          ? "Agregué ese detalle al resumen y mantendré visibles las notas de seguridad para el proveedor."
          : "I added that detail to the job summary and will keep safety notes visible for the provider.",
      },
    ]);
    setDraft("");
  }

  return (
    <section className="premium-card grid min-h-[560px] overflow-hidden lg:min-h-[680px] lg:grid-cols-[300px_1fr]">
      <aside className="border-b border-[#dbe7ec] bg-[#f5fafb] p-5 lg:border-b-0 lg:border-r">
        <h2 className="text-xl font-black text-[#102027]">{es ? "Chat del trabajo" : "Job chat"}</h2>
        <p className="mt-2 text-sm leading-6 text-[#5c6f77]">
          {es ? "Mensajes del cliente, proveedor y asistente en un solo hilo compartido." : "Customer, provider, and request-assistant messages stay in one shared thread."}
        </p>
        <div className="mt-5 rounded-lg border border-[#dbe7ec] bg-white p-4 shadow-sm">
          <p className="text-sm font-black text-[#102027]">{es ? "Trabajo actual" : "Current job"}</p>
          <p className="mt-2 text-sm text-[#5c6f77]">{es ? "Fregadero de cocina goteando" : "Kitchen sink leaking"}</p>
          <p className="mt-3 text-sm font-bold text-orange-700">{es ? "El proveedor está a 18 minutos." : "Provider is 18 minutes away."}</p>
        </div>
        <button type="button" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#cddde4] bg-white px-4 py-2 text-sm font-bold text-[#102027] shadow-sm transition hover:border-[#0f6bff]">
          <Camera className="h-4 w-4" />
          {es ? "Subir foto" : "Upload photo"}
        </button>
      </aside>
      <div className="flex min-h-[560px] flex-col lg:min-h-[680px]">
        <div className="flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,#ffffff,#f6fafb)] p-5">
          {messages.map((message, index) => {
            const isCustomer = message.author === "Customer";
            const Icon = message.author === "Assistant" ? Bot : message.author === "Provider" ? Wrench : UserRound;
            const displayText = es && index < initialMessagesEs.length ? initialMessagesEs[index] : message.text;
            return (
              <div key={`${message.author}-${index}`} className={`flex gap-3 ${isCustomer ? "justify-end" : "justify-start"}`}>
                {!isCustomer && (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0f6bff]">
                    <Icon className="h-4 w-4" />
                  </span>
                )}
                <div className={`max-w-[86%] rounded-lg p-3 text-sm leading-6 shadow-sm sm:max-w-[78%] ${isCustomer ? "bg-[#0f6bff] text-white" : "border border-[#dbe7ec] bg-white text-[#102027]"}`}>
                  <p className="mb-1 text-xs font-bold opacity-80">{authorLabels[message.author]}</p>
                  {displayText}
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-[#dbe7ec] p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {localizedSuggestions.map((item) => (
              <button key={item} type="button" onClick={() => send(item)} className="rounded-lg border border-[#dbe7ec] bg-[#edf6f9] px-3 py-2 text-xs font-bold text-[#39505a] transition hover:bg-white">
                {item}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") send(draft);
              }}
              placeholder={es ? "Escribe un mensaje" : "Type a message"}
              className="premium-input min-h-11 flex-1 px-3 text-sm"
            />
            <button type="button" onClick={() => send(draft)} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0f6bff] px-4 text-white shadow-[0_14px_30px_rgba(15,107,255,0.22)] transition hover:bg-[#0d5be0]">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
