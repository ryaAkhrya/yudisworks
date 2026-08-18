import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProjectCategoriesWrapper from "@/app/ProjectCategoriesWrapper";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import PhanSiteTestimonials from "@/components/PhanSiteTestimonials";

export default function Home() {
  return (
    <main className="w-full">
      <LoadingScreen />
      <ScrollProgress />
      <Hero />
      <Services />
      <ProjectCategoriesWrapper />
      <PhanSiteTestimonials />
    </main>
  );
}
