import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ValueProps } from "@/components/landing/value-props";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { UseCases } from "@/components/landing/use-cases";
import { SocialProof } from "@/components/landing/social-proof";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <ValueProps />
      <HowItWorks />
      <Features />
      <UseCases />
      <SocialProof />
      <CTA />
      <Footer />
    </main>
  );
}
