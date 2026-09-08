import ServicesWrapper from "@/app/ServicesWrapper";
import ProjectCategoriesWrapper from "@/app/ProjectCategoriesWrapper";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import TestimonialsWrapper from "@/app/TestimonialsWrapper";
import HeroWrapper from "@/app/HeroWrapper";
import LiveDeploymentsWrapper from "@/app/LiveDeploymentsWrapper";
import SoundtrackWrapper from "@/app/SoundtrackWrapper";
import ConfidantFeedWrapper from "@/app/ConfidantFeedWrapper";
import Footer from "@/components/Footer";
import TopNav from "@/components/TopNav";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="w-full">
        <LoadingScreen />
        <ScrollProgress />
        <HeroWrapper />
        <ServicesWrapper />
        <ProjectCategoriesWrapper />
        <LiveDeploymentsWrapper />
        <SoundtrackWrapper />
        <ConfidantFeedWrapper />
        <TestimonialsWrapper />
        <Footer />
      </main>
    </>
  );
}

