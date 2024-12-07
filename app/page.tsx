import { CallToAction } from "@/components/landing-page/CallToAction";
import { Hero } from "@/components/landing-page/Hero";
import { Features } from "@/components/landing-page/Features";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
}
