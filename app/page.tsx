import Services from "@/components/Services";
import ProjectCategoriesWrapper from "@/app/ProjectCategoriesWrapper";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import TestimonialsWrapper from "@/app/TestimonialsWrapper";
import HeroWrapper from "@/app/HeroWrapper";
import ConfidantFeedWrapper from "@/app/ConfidantFeedWrapper";

export default function Home() {
  return (
    <main className="w-full">
      <LoadingScreen />
      <ScrollProgress />
      <HeroWrapper />
      <Services />
      <ProjectCategoriesWrapper />
      <TestimonialsWrapper />
      <ConfidantFeedWrapper />
    </main>
  );
}

