import { LoginForm } from "@/components/auth/login-form";
import { AuroraText } from "@/components/ui/aurora-text";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute left-6 top-6 z-10 flex items-center gap-3 sm:left-8 sm:top-8 lg:left-10 lg:top-10">
        <img src="/icon.png" alt="Iris Connect" className="h-11 w-11" />
        <span className="text-lg font-semibold tracking-tight text-white" style={{ fontFamily: "'Times New Roman', serif" }}>IRIS CROWN SCHOOL</span>
      </div>
      <div className="grid min-h-screen lg:grid-cols-[3fr_auto_2fr]">
        {/* Left side — hero / statements */}
        <section className="relative flex items-center bg-surface-dark px-6 py-16 sm:px-10 lg:px-14 xl:px-20">
          <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[size:28px_28px] opacity-20" />
          <div className="relative animate-fadeUp">
            <h1 className="text-7xl font-bold tracking-tight sm:text-8xl lg:text-9xl uppercase" style={{ fontFamily: "'Times New Roman', serif" }}>
              <span className="text-white">IRIS </span>
              <AuroraText className="text-white">CONNECT</AuroraText>
            </h1>
            <p className="mt-6 max-w-prose text-xl leading-relaxed text-[#9498ab] sm:text-2xl">
              Simplifying everyday school operations for the Iris Crown community.
            </p>
          </div>
        </section>

        {/* Full-height divider */}
        <div className="hidden w-px bg-gradient-to-b from-transparent via-brand-500/20 to-transparent lg:block" />

        {/* Right side — login with distinct gradient */}
        <div className="flex items-center justify-center bg-gradient-to-br from-[#0b1025] via-[#0f163a] to-[#080b15] px-6 py-16 sm:px-10 lg:justify-end lg:px-14 xl:px-20">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
