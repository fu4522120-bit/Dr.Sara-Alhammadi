import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { SmileGallery } from './components/SmileGallery';
import { Journal } from './components/Journal';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { siteConfig } from './config/siteConfig';
import {
  ServiceItem,
  TestimonialItem,
  GalleryItem,
  JournalArticle,
  FAQItem,
  StudioSettings,
} from './types';

// Fallback initial data in case of cold start
import {
  initialServices,
  initialTestimonials,
  initialGallery,
  initialJournal,
  initialFAQs,
} from '../server/initialData';

export default function App() {
  const [settings, setSettings] = useState<StudioSettings>(siteConfig);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [journal, setJournal] = useState<JournalArticle[]>(initialJournal);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedBookingService, setSelectedBookingService] = useState<string>('Digital Smile Design');

  // Fetch live dynamic data from Express backend
  const loadData = useCallback(async () => {
    try {
      const [setRes, srvRes, testRes, galRes, jourRes, faqRes] = await Promise.allSettled([
        fetch('/api/settings').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/services').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/testimonials').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/gallery').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/journal').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/faqs').then((r) => (r.ok ? r.json() : null)),
      ]);

      if (setRes.status === 'fulfilled' && setRes.value) setSettings(setRes.value);
      if (srvRes.status === 'fulfilled' && srvRes.value) setServices(srvRes.value);
      if (testRes.status === 'fulfilled' && testRes.value) setTestimonials(testRes.value);
      if (galRes.status === 'fulfilled' && galRes.value) setGallery(galRes.value);
      if (jourRes.status === 'fulfilled' && jourRes.value) setJournal(jourRes.value);
      if (faqRes.status === 'fulfilled' && faqRes.value) setFaqs(faqRes.value);
    } catch (e) {
      console.warn('Could not fetch server data, using cached state:', e);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const scrollToBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedBookingService(serviceName);
    }
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#242220] flex flex-col font-sans selection:bg-[#E8DFC8] selection:text-[#1F1C18]">
      {/* Top Fixed Sticky Navbar */}
      <Navbar
        settings={settings}
        onOpenBooking={() => scrollToBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="grow">
        {/* 1. Hero Section */}
        <Hero
          onBookConsultation={() => scrollToBooking()}
          onExploreTreatments={scrollToServices}
        />

        {/* 2. About Section: Where Dentistry Meets Artistry */}
        <About />

        {/* 3. Signature Services & Treatments */}
        <Services
          services={services}
          onBookService={(name) => scrollToBooking(name)}
        />

        {/* 4. Kind Words From Our Patients (Testimonials) */}
        <Testimonials testimonials={testimonials} />

        {/* 5. Smile Gallery: Transformations, With Intention */}
        <SmileGallery
          galleryItems={gallery}
          onBookConsultation={(subj) => scrollToBooking(subj)}
        />

        {/* 6. The Journal */}
        <Journal
          articles={journal}
          onBookConsultation={() => scrollToBooking()}
        />

        {/* 7. Booking & FAQs Section */}
        <BookingSection
          services={services}
          faqs={faqs}
          preselectedService={selectedBookingService}
        />

        {/* 8. Minimal Contact & Location Section */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Quick Concierge Button */}
      <WhatsAppButton phoneNumber={settings.whatsapp} />

      {/* Studio Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataUpdated={loadData}
      />
    </div>
  );
}
