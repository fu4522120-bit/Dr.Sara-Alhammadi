import React from 'react';
import { Instagram, Phone, ArrowUp, Shield } from 'lucide-react';
import { StudioSettings } from '../types';

interface FooterProps {
  settings: StudioSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Smile Gallery', href: '#gallery' },
    { name: 'Journal', href: '#journal' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#1C1A18] text-[#FAF8F5] pt-20 pb-12 border-t border-[#2F2C29]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Top Row: Brand & Back to top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-14 border-b border-[#2E2A27]">
          <div>
            <span className="font-editorial text-2xl sm:text-3xl tracking-[0.14em] font-medium text-[#FAF8F5] uppercase block">
              DR. SARA ALHAMMADI
            </span>
            <span className="text-xs tracking-[0.26em] text-[#A69B8D] uppercase font-sans font-light mt-0.5 block">
              Dental Studio • Dubai, UAE
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A69B8D] hover:text-[#FAF8F5] transition-colors group cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-[#2E2A27] text-left">
          
          {/* Philosophy / Bio snippet */}
          <div className="md:col-span-5 pr-0 md:pr-8">
            <p className="font-editorial text-lg sm:text-xl text-[#D9CFBF] font-light italic leading-relaxed mb-4">
              &ldquo;Advanced cosmetic and prosthodontic dentistry designed around your natural beauty.&rdquo;
            </p>
            <p className="text-xs text-[#8C8276] leading-relaxed font-light">
              Villa 410, Jumeirah Beach Road, Jumeirah 2, Dubai, UAE. <br />
              All consultations by private prior appointment.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#D9CFBF] mb-4">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.16em] text-[#8C8276] hover:text-[#FAF8F5] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#D9CFBF] mb-4">
              Social & Concierge
            </p>
            <div className="space-y-2.5">
              <a
                href="https://www.instagram.com/drsaraalhammadi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#8C8276] hover:text-[#FAF8F5] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#B69768]" />
                <span>Instagram {settings.instagram}</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#8C8276] hover:text-[#FAF8F5] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#4E8D5D]" />
                <span>WhatsApp Concierge</span>
              </a>

              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 text-xs text-[#8C8276] hover:text-[#D9CFBF] transition-colors pt-2"
              >
                <Shield className="w-3.5 h-3.5 text-[#B69768]" />
                <span>Admin Management Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E665D]">
          <p>© 2026 Dr. Sara Alhammadi Dental Studio. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[#A69B8D] cursor-pointer">Privacy & Discretion</span>
            <span>•</span>
            <span className="hover:text-[#A69B8D] cursor-pointer">Terms of Care</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
