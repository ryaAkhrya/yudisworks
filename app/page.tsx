import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PortfolioGrid from "@/components/PortfolioGrid";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Services />
      <PortfolioGrid />
    </main>
  );
}
