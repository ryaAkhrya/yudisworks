import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProjectCategoriesWrapper from "@/app/ProjectCategoriesWrapper";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import TestimonialsWrapper from "@/app/TestimonialsWrapper";

export default function Home() {
  return (
    <main className="w-full">
      <LoadingScreen />
      <ScrollProgress />
      <Hero />
      <Services />
      <ProjectCategoriesWrapper />
      <TestimonialsWrapper />
    </main>
  );
}
