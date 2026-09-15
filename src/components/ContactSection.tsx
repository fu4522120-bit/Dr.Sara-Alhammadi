import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Clock,
  ExternalLink,
  Navigation,
  Compass
} from 'lucide-react';
import { StudioSettings } from '../types';
import studioLoungeImage from '../assets/images/studio_lounge_1789472978518.jpg';

interface ContactSectionProps {
  settings: StudioSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#F6F2EB] relative border-t border-[#E9E2D6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-xl text-left mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#B69768]" />
            <span className="text-xs uppercase tracking-[0.22em] text-[#8E8276] font-medium">
              Studio Location
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1F1D1B] font-normal leading-[1.12]">
            Visit The Studio
          </h2>
          <p className="text-sm sm:text-base text-[#6E665D] mt-3 font-light">
            Situated within an exclusive private villa enclave along Jumeirah Beach Road, Dubai.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            
            <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[#ECE4D8] shadow-sm space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#B69768] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#8E8276] mb-1">
                    Studio Address
                  </h4>
                  <p className="text-sm font-medium text-[#1F1D1B] leading-snug">
                    {settings.address}
                  </p>
                  <p className="text-xs text-[#6A635A] mt-0.5">
                    {settings.city}, {settings.country}
                  </p>
                </div>
              </div>

              {/* Telephone & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#B69768] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#8E8276] mb-1">
                    Telephone & WhatsApp
                  </h4>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-medium text-[#1F1D1B] hover:text-[#B69768] block transition-colors"
                  >
                    {settings.phone}
                  </a>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#4E8D5D] hover:underline block mt-0.5"
                  >
                    Direct WhatsApp: {settings.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#B69768] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#8E8276] mb-1">
                    Direct Email
                  </h4>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm font-medium text-[#1F1D1B] hover:text-[#B69768] transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#B69768] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-medium text-[#8E8276] mb-1">
                    Consultation Hours
                  </h4>
                  <p className="text-xs sm:text-sm text-[#463F38] leading-relaxed">
                    {settings.openingHours}
                  </p>
                </div>
              </div>

            </div>

            {/* Google Maps External Action Button */}
            <a
              id="google-maps-button"
              href={settings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

          </div>

          {/* Right: Architectural Image & Stylized Map Preview */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden bg-[#E7DECة] border border-[#ECE3D6] shadow-xl grow min-h-[380px] flex flex-col">
              
              {/* Studio Lounge photography */}
              <img
                src={studioLoungeImage}
                alt="Dr. Sara Alhammadi Studio Lounge Dubai"
                className="w-full h-full object-cover min-h-[360px]"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B]/85 via-[#1F1D1B]/30 to-transparent pointer-events-none" />

              {/* Floating Location Overlay Pin */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#FAF8F5]/95 backdrop-blur-md border border-[#EAE2D5] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B69768] block mb-1">
                    Prime Jumeirah Beach Road
                  </span>
                  <p className="font-editorial text-xl sm:text-2xl text-[#1F1D1B] font-medium">
                    Villa 410, Private Studio Sanctuary
                  </p>
                  <p className="text-xs text-[#71685E] mt-0.5">
                    Complimentary private valet parking on premises
                  </p>
                </div>

                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EAE2D5] hover:bg-[#D9CFBF] text-[#2B2621] text-xs uppercase tracking-[0.16em] font-medium transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#B69768]" />
                  <span>Get Directions</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
