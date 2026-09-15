import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  Activity,
  Wand2,
  Gem,
  Sun,
  Smile,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { ServiceItem } from '../types';
import { ServiceModal } from './ServiceModal';

interface ServicesProps {
  services: ServiceItem[];
  onBookService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, onBookService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Map icon strings to Lucide components
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#B69768]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#B69768]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#B69768]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#B69768]" />;
      case 'Wand2':
        return <Wand2 className="w-5 h-5 text-[#B69768]" />;
      case 'Gem':
        return <Gem className="w-5 h-5 text-[#B69768]" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#B69768]" />;
      case 'Smile':
      default:
        return <Smile className="w-5 h-5 text-[#B69768]" />;
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#B69768]" />
            <span className="text-xs uppercase tracking-[0.22em] text-[#8E8276] font-medium">
              Signature Treatments
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1F1D1B] font-normal leading-[1.14] mb-4">
            Personalized dentistry designed for confidence, function and natural beauty.
          </h2>
          <p className="text-base text-[#6E665D] font-light leading-relaxed">
            Every procedure at Dr. Sara Alhammadi Dental Studio combines biological precision with artistic finesse, delivering results that look and feel entirely authentic.
          </p>
        </div>

        {/* Services Grid (Clean 2-column or 3-column responsive layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {services.map((service, idx) => (
            <div
              key={service.id || idx}
              id={`service-card-${service.id}`}
              className="group relative flex flex-col justify-between p-7 rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA] hover:border-[#B69768]/60 hover:shadow-lg transition-all duration-300 text-left cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div>
                {/* Header row: Icon & category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#F6F2EB] group-hover:bg-[#EAE2D5] flex items-center justify-center transition-colors">
                    {renderIcon(service.icon)}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#8E8276] px-2.5 py-1 rounded-full bg-[#FAF8F5]">
                    {service.category}
                  </span>
                </div>

                {/* Treatment Name */}
                <h3 className="font-editorial text-xl sm:text-2xl text-[#1F1D1B] group-hover:text-[#8E7E6B] transition-colors mb-2">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#635B52] leading-relaxed line-clamp-3 mb-6 font-light">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between text-xs font-medium uppercase tracking-[0.16em] text-[#8E8276] group-hover:text-[#1F1D1B] transition-colors">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#B69768]" />
                  <span>{service.duration}</span>
                </span>
                
                <span className="inline-flex items-center gap-1 text-[#B69768] group-hover:translate-x-0.5 transition-transform">
                  <span>Discover</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#F2ECE1] border border-[#E3DACB] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h4 className="font-editorial text-xl sm:text-2xl text-[#1F1D1B] mb-1">
              Unsure which treatment fits your smile?
            </h4>
            <p className="text-xs sm:text-sm text-[#685F54] font-light">
              Schedule a comprehensive 1-on-1 aesthetic and functional consultation with Dr. Sara Alhammadi.
            </p>
          </div>
          <button
            onClick={() => onBookService("Comprehensive Consultation")}
            className="shrink-0 px-6 py-3 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-xs uppercase tracking-[0.2em] font-medium text-[#FAF8F5] transition-colors"
          >
            Schedule Assessment
          </button>
        </div>

      </div>

      {/* Interactive Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={onBookService}
      />
    </section>
  );
};
