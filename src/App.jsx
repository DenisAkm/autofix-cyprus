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

export default function App() {
  return (
    <div className="min-h-screen bg-white pb-14 sm:pb-0">
      <Navbar />
      <main>
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
