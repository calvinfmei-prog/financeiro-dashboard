import Navbar from "@/app/dashboard/components/marketing/Navbar";
import Hero from "@/app/dashboard/components/marketing/Hero";
import DashboardPreview from "@/app/dashboard/components/marketing/DashboardPreview";
import Features from "@/app/dashboard/components/marketing/Features";
import Comparison from "@/app/dashboard/components/marketing/Comparison";
import HowItWorks from "@/app/dashboard/components/marketing/HowItWorks";
import Technologies from "@/app/dashboard/components/marketing/Technologies";
import CTA from "@/app/dashboard/components/marketing/CTA";
import Footer from "@/app/dashboard/components/marketing/Footer";
import Benefits from "@/app/dashboard/components/marketing/Benefits";
import Testimonials from "@/app/dashboard/components/marketing/Testimonials";
import Ecosystem from "@/app/dashboard/components/marketing/Ecosystem";
import FAQ from "@/app/dashboard/components/marketing/FAQ";
import Pricing from "@/app/dashboard/components/marketing/Pricing";
import PainPoints from "@/app/dashboard/components/marketing/PainPoints";
import TelegramExperience from "@/app/dashboard/components/marketing/TelegramExperience";


export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PainPoints />
      <DashboardPreview />
      <TelegramExperience />
      <Features />
      <Comparison />
      <Benefits />
      <HowItWorks />
      <Technologies />
      <Ecosystem />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}