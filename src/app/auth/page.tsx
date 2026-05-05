import { AuthDemo } from "@/components/auth-demo";

export default function AuthPage() {
  return (
    <div className="bg-[#f7fbfc]">
      <section className="app-container grid min-h-[calc(100vh-96px)] items-center py-12 sm:py-16">
        <AuthDemo />
      </section>
    </div>
  );
}
