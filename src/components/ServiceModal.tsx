import React from 'react';
import { X, Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBookService }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1F1D1B]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#E8E1D5] overflow-hidden text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#EAE2D5]/50 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2 rounded-full bg-[#F4EFE6] text-[#6B6359] hover:text-[#1F1D1B] hover:bg-[#EAE2D5] transition-colors"
          aria-label="Close treatment details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0EAE0] text-[#8E8276] text-xs uppercase tracking-[0.18em] font-medium mb-3">
          <Sparkles className="w-3 h-3 text-[#B69768]" />
          <span>{service.category} Dentistry</span>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-editorial text-2xl sm:text-4xl text-[#1F1D1B] font-normal mb-2">
          {service.title}
        </h3>
        <p className="text-sm sm:text-base text-[#8E7E6B] font-serif italic mb-6">
          {service.tagline}
        </p>

        {/* Description */}
        <div className="prose prose-stone max-w-none text-[#554E46] text-sm sm:text-base leading-relaxed mb-6 font-light">
          <p>{service.description}</p>
        </div>

        {/* Duration & Protocol */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F4EFE6] border border-[#E6DDD0] mb-6 text-xs sm:text-sm text-[#4A443C]">
          <Clock className="w-4 h-4 text-[#B69768] shrink-0" />
          <span className="font-medium">Estimated Duration:</span>
          <span>{service.duration}</span>
        </div>

        {/* Key Benefits */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#2E2A27] mb-3">
            What To Expect
          </h4>
          <ul className="space-y-2.5">
            {service.keyBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5D554C]">
                <CheckCircle2 className="w-4 h-4 text-[#B69768] shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#EAE2D5]">
          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#FAF8F5] bg-[#1F1D1B] hover:bg-[#B69768] rounded-full transition-colors shadow-sm"
          >
            <span>Book This Treatment</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-medium text-[#7E7469] hover:text-[#1F1D1B]"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
