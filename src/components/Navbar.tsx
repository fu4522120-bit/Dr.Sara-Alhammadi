import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Shield, Sparkles } from 'lucide-react';
import { StudioSettings } from '../types';

interface NavbarProps {
  settings: StudioSettings;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onOpenBooking, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Smile Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-xs py-3.5 border-b border-[#EAE2D5]/80'
          : 'bg-[#FAF8F5]/70 backdrop-blur-xs py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="navbar-brand"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
          className="group flex flex-col tracking-wider text-left transition-opacity hover:opacity-85"
        >
          <span className="font-editorial text-lg sm:text-xl lg:text-2xl tracking-[0.14em] font-medium text-[#1F1D1B] uppercase">
            DR. SARA ALHAMMADI
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8E8276] uppercase -mt-0.5 font-sans font-light">
            Dental Studio • Dubai
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-9" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-xs lg:text-[13px] uppercase tracking-[0.18em] text-[#4A453F] hover:text-[#B69768] font-medium transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            id="navbar-admin-trigger"
            onClick={onOpenAdmin}
            title="Studio Portal / Admin Management"
            className="p-2 text-[#8E8276] hover:text-[#1F1D1B] hover:bg-[#EAE2D5]/40 rounded-full transition-colors"
            aria-label="Studio Portal"
          >
            <Shield className="w-4 h-4" />
          </button>

          <button
            id="navbar-book-cta"
            onClick={onOpenBooking}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-[#FAF8F5] bg-[#1F1D1B] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#B69768] hover:shadow-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Book a Consultation</span>
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            id="mobile-admin-toggle"
            onClick={onOpenAdmin}
            className="p-2 text-[#8E8276] hover:text-[#1F1D1B]"
            aria-label="Admin Portal"
          >
            <Shield className="w-4 h-4" />
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1F1D1B] rounded-md focus:outline-hidden"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden fixed inset-x-0 top-full bg-[#FAF8F5]/98 border-b border-[#E8E1D5] shadow-xl backdrop-blur-xl px-6 py-8 transition-all animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-base tracking-[0.15em] uppercase text-[#1F1D1B] hover:text-[#B69768] py-2 border-b border-[#F0EBE1] font-editorial"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              <button
                id="mobile-book-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#FAF8F5] bg-[#1F1D1B] hover:bg-[#B69768] rounded-full text-center transition-colors shadow-sm"
              >
                Book a Consultation
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 text-xs uppercase tracking-[0.18em] text-[#8E8276] hover:text-[#1F1D1B] border border-[#EAE2D5] rounded-full text-center"
              >
                Studio Management Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
