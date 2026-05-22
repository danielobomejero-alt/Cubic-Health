import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Hero, Pathway, Labs, Learning, Testimonials, Consultation, Footer } from './components/Sections';
import RiskScreening from './components/RiskScreening';
import EnquiryForm from './components/EnquiryForm';
import WhatsAppButton from './components/WhatsAppButton';
import { initGA, logPageView } from './services/analytics';

export default function App() {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <RiskScreening />
        <Pathway />
        <Labs />
        <Learning />
        <Testimonials />
        <Consultation />
        <EnquiryForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
