import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { LanguageProvider } from "@/components/language-provider";

export const metadata: Metadata = {
  title: "QuickFix | Trusted local help, powered by AI.",
  description:
    "QuickFix helps customers post local service requests, receive offers from local service providers, compare options, and choose the best provider.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
