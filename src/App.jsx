import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import TrustFeatures from "./components/TrustFeatures.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Services from "./components/Services.jsx";
import Work from "./components/Work.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import Insurance from "./components/Insurance.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FAQ from "./components/FAQ.jsx";
import RequestForm from "./components/RequestForm.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";
import FloatingActions from "./components/FloatingActions.jsx";
import { useI18n } from "./i18n/LanguageContext.jsx";

export default function App() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-ink-950 pb-14 sm:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {t("nav.skip")}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Stats />
        <TrustFeatures />
        <HowItWorks />
        <Services />
        <Work />
        <WhyChoose />
        <Insurance />
        <Testimonials />
        <FAQ />
        <RequestForm />
        <CTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
