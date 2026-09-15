import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#F6F2EB] relative overflow-hidden border-y border-[#E9E2D6]">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-[#EAE2D5]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#FAF8F5]/80 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#B69768]" />
            <span className="text-xs uppercase tracking-[0.22em] text-[#8E8276] font-medium">
              Patient Reflections
            </span>
            <span className="h-px w-8 bg-[#B69768]" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1F1D1B] font-normal leading-[1.12]">
            Kind Words From Our Patients
          </h2>
          <p className="text-sm sm:text-base text-[#6E665D] mt-3 font-light">
            Real stories of restored comfort, renewed confidence, and understated beauty.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#FFFFFF] rounded-3xl p-8 sm:p-14 lg:p-16 shadow-xl border border-[#EBE3D7] text-left">
            
            <div className="flex items-center justify-between mb-8">
              {/* Star Ratings */}
              <div className="flex items-center gap-1 text-[#B69768]">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B69768]" />
                ))}
              </div>

              {/* Treatment Pill */}
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-medium text-[#7E7469] bg-[#F4EFE6] px-3.5 py-1.5 rounded-full">
                {current.treatment}
              </span>
            </div>

            {/* Quote Body */}
            <div className="relative mb-10">
              <Quote className="absolute -top-6 -left-3 sm:-left-6 w-12 h-12 text-[#EFE8DD] -z-10" />
              <p className="font-editorial text-xl sm:text-2xl lg:text-3xl text-[#2B2724] leading-relaxed font-light italic">
                &ldquo;{current.quote}&rdquo;
              </p>
            </div>

            {/* Patient Details & Carousel Nav */}
            <div className="pt-6 border-t border-[#F0EBE1] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h4 className="text-base sm:text-lg font-medium text-[#1F1D1B]">
                  {current.patientName}
                </h4>
                <p className="text-xs tracking-wider text-[#8E8276] uppercase mt-0.5">
                  {current.location}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                <button
                  id="testimonial-prev-btn"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 rounded-full border border-[#DCD3C4] flex items-center justify-center text-[#554E46] hover:bg-[#1F1D1B] hover:text-[#FAF8F5] hover:border-[#1F1D1B] transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-xs uppercase tracking-[0.2em] text-[#8E8276] font-medium px-2">
                  0{activeIndex + 1} / 0{testimonials.length}
                </span>

                <button
                  id="testimonial-next-btn"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="w-11 h-11 rounded-full border border-[#DCD3C4] flex items-center justify-center text-[#554E46] hover:bg-[#1F1D1B] hover:text-[#FAF8F5] hover:border-[#1F1D1B] transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Small thumbnail indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                i === activeIndex ? 'w-8 bg-[#B69768]' : 'w-2 bg-[#D3C7B6]'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
