import ServicesWrapper from "@/app/ServicesWrapper";
import ProjectCategoriesWrapper from "@/app/ProjectCategoriesWrapper";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import TestimonialsWrapper from "@/app/TestimonialsWrapper";
import HeroWrapper from "@/app/HeroWrapper";
import LiveDeploymentsWrapper from "@/app/LiveDeploymentsWrapper";
import ConfidantFeedWrapper from "@/app/ConfidantFeedWrapper";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <LoadingScreen />
      <ScrollProgress />
      <HeroWrapper />
      <ServicesWrapper />
      <ProjectCategoriesWrapper />
      <TestimonialsWrapper />
      <LiveDeploymentsWrapper />
      <ConfidantFeedWrapper />
      <Footer />
    </main>
  );
}

