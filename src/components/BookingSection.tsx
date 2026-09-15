import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { FAQItem, ServiceItem } from '../types';

interface BookingSectionProps {
  services: ServiceItem[];
  faqs: FAQItem[];
  preselectedService?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  services,
  faqs,
  preselectedService
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || 'Digital Smile Design');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM – 01:00 PM');
  const [message, setMessage] = useState('');

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; message: string } | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  // Set default minimum date to tomorrow
  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please provide your full legal or preferred name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg('Please enter a valid telephone or WhatsApp contact number.');
      return;
    }

    if (!preferredDate) {
      setErrorMsg('Please select your preferred date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          service,
          preferredDate,
          preferredTime,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit consultation request.');
      }

      setSuccessData({
        id: data.appointment?.id || 'DRS-CONFIRMED',
        message: data.message || 'Consultation request received successfully.',
      });

      // Reset fields
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 lg:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#B69768]" />
            <span className="text-xs uppercase tracking-[0.22em] text-[#8E8276] font-medium">
              Private Appointments
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1F1D1B] font-normal leading-[1.12]">
            Begin Your Smile Journey
          </h2>
          <p className="text-sm sm:text-base text-[#6E665D] mt-3 font-light leading-relaxed">
            Reserve your private consultation with Dr. Sara Alhammadi at our serene Jumeirah 2 villa studio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left: Consultation Request Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-3xl p-7 sm:p-10 lg:p-12 border border-[#EAE2D5] shadow-xl text-left relative overflow-hidden">
            
            {successData ? (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE6] text-[#B69768] flex items-center justify-center mb-5">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#1F1D1B] mb-2 font-normal">
                  Consultation Requested
                </h3>
                <p className="text-sm text-[#665E55] max-w-md mb-6 font-light leading-relaxed">
                  Thank you for reaching out to Dr. Sara Alhammadi Dental Studio. Our studio concierge will contact you within 24 hours to confirm your private appointment details.
                </p>
                <div className="p-3.5 rounded-xl bg-[#F8F4EC] border border-[#EAE2D5] text-xs text-[#8E8276] font-mono mb-8">
                  Reference: {successData.id}
                </div>
                <button
                  onClick={() => setSuccessData(null)}
                  className="px-8 py-3 rounded-full bg-[#1F1D1B] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#B69768] transition-colors"
                >
                  Make Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-[#FDF2F2] border border-[#F8D7DA] text-xs sm:text-sm text-[#9C2B2B] flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#4D463E] mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        id="booking-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Mariam Al-Qasimi"
                        className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-xl text-[#1F1D1B] placeholder-[#A3998D] focus:outline-hidden focus:border-[#B69768] focus:bg-[#FFFFFF] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#4D463E] mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-xl text-[#1F1D1B] placeholder-[#A3998D] focus:outline-hidden focus:border-[#B69768] focus:bg-[#FFFFFF] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#4D463E] mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-xl text-[#1F1D1B] placeholder-[#A3998D] focus:outline-hidden focus:border-[#B69768] focus:bg-[#FFFFFF] transition-colors"
                    />
                  </div>

                  {/* Preferred Service */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#4D463E] mb-2">
                      Preferred Service *
                    </label>
                    <select
                      id="booking-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-xl text-[#1F1D1B] focus:outline-hidden focus:border-[#B69768] focus:bg-[#FFFFFF] transition-colors"
                    >
                      <option value="Comprehensive Cosmetic Consultation">Comprehensive Consultation</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#4D463E] mb-2">
                      Preferred Date *
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      required
                      min={getTomorrowDateString()}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-xl text-[#1F1D1B] focus:outline-hidden focus:border-[#B69768] focus:bg-[#FFFFFF] transition-colors"
                    />
                  </div>

                  {/* Preferred Time Window */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#4D463E] mb-2">
                      Preferred Time Window *
                    </label>
                    <select
                      id="booking-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-xl text-[#1F1D1B] focus:outline-hidden focus:border-[#B69768] focus:bg-[#FFFFFF] transition-colors"
                    >
                      <option value="09:00 AM – 11:00 AM">Morning (09:00 AM – 11:00 AM)</option>
                      <option value="11:00 AM – 01:00 PM">Midday (11:00 AM – 01:00 PM)</option>
                      <option value="02:00 PM – 04:00 PM">Afternoon (02:00 PM – 04:00 PM)</option>
                      <option value="04:00 PM – 07:00 PM">Late Afternoon (04:00 PM – 07:00 PM)</option>
                      <option value="VIP Private Window">VIP Concierge Private Slot</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] font-medium text-[#4D463E] mb-2">
                    Message / Aesthetic Goals (Optional)
                  </label>
                  <textarea
                    id="booking-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share any specific aesthetic wishes, previous dental experiences, or travel dates..."
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-xl text-[#1F1D1B] placeholder-[#A3998D] focus:outline-hidden focus:border-[#B69768] focus:bg-[#FFFFFF] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="booking-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#FAF8F5] bg-[#1F1D1B] hover:bg-[#B69768] rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <span>Request Consultation</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#8E8276] text-center">
                  Discreet & Confidential • Our concierge confirms all visits individually
                </p>
              </form>
            )}

          </div>

          {/* Right: Studio FAQs Accordion */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#B69768]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#8E8276] font-medium">
                Common Inquiries
              </span>
            </div>
            
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#1F1D1B] mb-6 font-normal">
              Questions & Studio Protocols
            </h3>

            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.id || index}
                    id={`faq-item-${index}`}
                    className="border border-[#E7DECة] bg-[#FFFFFF] rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-editorial text-base sm:text-lg text-[#1F1D1B] hover:text-[#B69768] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8E8276] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#B69768]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#665D53] leading-relaxed border-t border-[#F5EFE6] font-light">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Private travel concierge callout */}
            <div className="mt-8 p-6 rounded-2xl bg-[#F4ECE1] border border-[#E4DACB] flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-[#B69768] shrink-0 mt-0.5" />
              <div className="text-xs text-[#524B43] leading-relaxed">
                <p className="font-medium text-[#1F1D1B] mb-1 uppercase tracking-wider text-[11px]">
                  International & GCC Guests
                </p>
                Our private concierge team can assist with luxury airport transfers, curated Dubai accommodations, and accelerated appointment scheduling.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
