import React, { useState } from 'react';
import { X, Sparkles, Layers, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onBookConsultation: (subject?: string) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose, onBookConsultation }) => {
  const [showBefore, setShowBefore] = useState(false);

  if (!item) return null;

  const hasBefore = Boolean(item.beforeImageUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1D1B]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#E8E1D5] overflow-hidden text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F4EFE6] text-[#6B6359] hover:text-[#1F1D1B] hover:bg-[#EAE2D5] transition-colors z-10"
          aria-label="Close transformation preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-[#8E8276] px-3 py-1 rounded-full bg-[#EFE9DF]">
            {item.category}
          </span>
          {item.shade && (
            <span className="text-xs uppercase tracking-[0.14em] font-medium text-[#B69768] px-3 py-1 rounded-full bg-[#FAF0E1] border border-[#E8DBC5]">
              Shade: {item.shade}
            </span>
          )}
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl text-[#1F1D1B] mb-2 font-normal">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#6A6258] leading-relaxed mb-6 font-light">
          {item.description}
        </p>

        {/* Before / After toggle if applicable */}
        {hasBefore && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={() => setShowBefore(false)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                !showBefore
                  ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                  : 'bg-[#EAE2D5] text-[#554E46] hover:bg-[#D9CFBF]'
              }`}
            >
              After (Restoration)
            </button>
            <button
              onClick={() => setShowBefore(true)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                showBefore
                  ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                  : 'bg-[#EAE2D5] text-[#554E46] hover:bg-[#D9CFBF]'
              }`}
            >
              Before (Pre-Treatment)
            </button>
          </div>
        )}

        {/* Large Image Showcase */}
        <div className="relative rounded-2xl overflow-hidden bg-[#ECE4D8] aspect-16/10 mb-6 shadow-inner">
          <img
            src={showBefore && item.beforeImageUrl ? item.beforeImageUrl : item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover object-center transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          {hasBefore && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1F1D1B]/80 text-white text-[10px] tracking-widest uppercase font-medium backdrop-blur-xs">
              {showBefore ? 'Initial State' : 'Completed Ceramic Artistry'}
            </div>
          )}
        </div>

        {/* Technical Specification details */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F4EFE6] border border-[#E7DECة] text-xs text-[#524B43] mb-6">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-[#8E8276] font-medium mb-0.5">
              Units Planned
            </span>
            <span className="font-medium text-[#1F1D1B]">{item.teethCount || 'Bespoke Anterior Units'}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-[#8E8276] font-medium mb-0.5">
              Aesthetic Goal
            </span>
            <span className="font-medium text-[#1F1D1B]">Lifelike Enamel Biomimicry</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EAE2D5]">
          <p className="text-xs text-[#8E8276] italic">
            All photography reflects real clinical cases planned by Dr. Sara Alhammadi.
          </p>

          <button
            onClick={() => {
              onClose();
              onBookConsultation(item.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-xs uppercase tracking-[0.18em] font-medium text-[#FAF8F5] transition-colors"
          >
            <span>Discuss This Treatment</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </div>
    </div>
  );
};
