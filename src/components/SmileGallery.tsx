import React, { useState } from 'react';
import { Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { GalleryItem } from '../types';
import { GalleryModal } from './GalleryModal';

interface SmileGalleryProps {
  galleryItems: GalleryItem[];
  onBookConsultation: (subject?: string) => void;
}

export const SmileGallery: React.FC<SmileGalleryProps> = ({ galleryItems, onBookConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Smile Design', 'Veneers', 'Cosmetic Dentistry', 'Natural Smile', 'Before & After'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#B69768]" />
              <span className="text-xs uppercase tracking-[0.22em] text-[#8E8276] font-medium">
                Clinical Portfolio
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1F1D1B] font-normal leading-[1.12]">
              Transformations, <br />
              <span className="italic text-[#8E7E6B] font-light">With Intention.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6E665D] mt-3 font-light">
              Carefully curated outcomes demonstrating subtle enamel translucency, natural anatomy, and facial balance.
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.16em] text-[#8E8276] font-medium hidden md:block">
            {filteredItems.length} Featured Cases
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 sm:mb-14 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#1F1D1B] text-[#FAF8F5] shadow-xs'
                  : 'bg-[#F2ECE1] text-[#6E665D] hover:bg-[#EAE2D5] hover:text-[#1F1D1B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Editorial Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id || idx}
              id={`gallery-item-${item.id}`}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#ECE4D8] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Subtle soft scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B]/70 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Category Pill on Image */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-medium bg-[#FAF8F5]/90 text-[#1F1D1B] backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                {item.beforeImageUrl && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-medium bg-[#B69768] text-white">
                      Before & After
                    </span>
                  </div>
                )}

                {/* Quick Inspect Hover Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FAF8F5]/90 text-[#1F1D1B] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-md">
                  <Eye className="w-5 h-5 text-[#B69768]" />
                </div>
              </div>

              {/* Caption Card Body */}
              <div className="p-5 bg-[#FFFFFF] border-t border-[#EAE2D5] flex flex-col justify-between grow text-left">
                <div>
                  <h3 className="font-editorial text-lg sm:text-xl text-[#1F1D1B] group-hover:text-[#8E7E6B] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6E665D] line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F4EFE6] flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-[#8E8276]">
                  <span>{item.shade || 'Natural Enamel'}</span>
                  <span className="text-[#B69768] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="p-12 text-center text-[#8E8276] bg-[#F4EFE6] rounded-2xl">
            No transformations found for this category.
          </div>
        )}

      </div>

      {/* Interactive Modal */}
      <GalleryModal
        item={activeItem}
        onClose={() => setActiveItem(null)}
        onBookConsultation={onBookConsultation}
      />
    </section>
  );
};
