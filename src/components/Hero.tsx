import React from 'react';
import { ArrowRight, ChevronRight, Award, Sparkles } from 'lucide-react';
import heroImage from '../assets/images/hero_dr_sara_studio_1789472901178.jpg';

interface HeroProps {
  onBookConsultation: () => void;
  onExploreGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookConsultation, onExploreGallery }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 lg:pt-36 lg:pb-24 flex items-center bg-[#FAF8F5] overflow-hidden"
    >
      {/* Soft atmospheric background shapes */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#F3ECE0]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#EAE2D5]/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Trust Line & Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F2ECE1] border border-[#E4DC CE]/60 mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B69768]" />
              <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#6B6359] font-medium">
                Cosmetic Dentistry • Digital Smile Design • Prosthodontics
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.08] font-normal text-[#1F1D1B] tracking-tight mb-6">
              Your Smile, <br />
              <span className="italic font-light text-[#8E7E6B]">Beautifully</span> Designed.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-[#59534C] font-light leading-relaxed max-w-xl mb-9">
              Advanced cosmetic and prosthodontic dentistry in Dubai, meticulously designed around your natural facial beauty and unique expression.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-cta-book"
                onClick={onBookConsultation}
                className="inline-flex items-center justify-center px-8 py-4 text-xs sm:text-[13px] uppercase tracking-[0.2em] font-medium text-[#FAF8F5] bg-[#1F1D1B] hover:bg-[#B69768] rounded-full transition-all duration-300 shadow-sm group"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 ml-2.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-cta-explore"
                onClick={onExploreGallery}
                className="inline-flex items-center justify-center px-8 py-4 text-xs sm:text-[13px] uppercase tracking-[0.2em] font-medium text-[#2E2A27] bg-transparent hover:bg-[#EFE9DF] border border-[#D9CFBF] rounded-full transition-all duration-300"
              >
                <span>Explore Smile Gallery</span>
                <ChevronRight className="w-4 h-4 ml-1 text-[#8E8276]" />
              </button>
            </div>

            {/* Trust badge / Location note */}
            <div className="pt-6 border-t border-[#E8E1D5] w-full max-w-lg grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="font-editorial text-2xl sm:text-3xl text-[#1F1D1B]">Jumeirah 2</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8E8276] mt-0.5">Private Villa Studio</p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl text-[#1F1D1B]">14+ Yrs</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8E8276] mt-0.5">Clinical Specialty</p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl text-[#1F1D1B]">1-on-1</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8E8276] mt-0.5">Dr. Sara Care</p>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative architectural frame */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl sm:rounded-4xl border border-[#E5DDD0] pointer-events-none" />
              
              {/* Image Container with rounded luxury styling */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#EAE2D5] shadow-xl aspect-4/3 lg:aspect-5/6">
                <img
                  src={heroImage}
                  alt="Dr. Sara Alhammadi Dental Studio Dubai"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Subtle soft gradient overlay at base for luxury depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B]/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating pill badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#FAF8F5]/90 backdrop-blur-md border border-[#FAF8F5] shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#1F1D1B]">
                      Dr. Sara Alhammadi
                    </p>
                    <p className="text-[11px] text-[#7A7167] tracking-wider mt-0.5">
                      Specialist Prosthodontist & Cosmetic Dentist
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#EAE2D5] flex items-center justify-center text-[#B69768]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
