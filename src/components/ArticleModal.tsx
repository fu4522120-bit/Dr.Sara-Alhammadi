import React from 'react';
import { X, Calendar, Clock, BookOpen, ArrowRight, Share2 } from 'lucide-react';
import { JournalArticle } from '../types';

interface ArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onBookConsultation }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1D1B]/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-12 shadow-2xl border border-[#E8E1D5] overflow-hidden text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 p-2 rounded-full bg-[#F4EFE6] text-[#6B6359] hover:text-[#1F1D1B] hover:bg-[#EAE2D5] transition-colors z-10"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.16em] text-[#8E8276] mb-4">
          <span className="px-3 py-1 rounded-full bg-[#EFE9DF] text-[#6E665D] font-medium">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#B69768]" />
            <span>{article.publishDate}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#B69768]" />
            <span>{article.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="font-editorial text-2xl sm:text-4xl text-[#1F1D1B] font-normal leading-[1.2] mb-6">
          {article.title}
        </h2>

        {/* Lead Excerpt */}
        <p className="text-base sm:text-lg text-[#6E6357] font-serif italic mb-8 border-l-2 border-[#B69768] pl-4">
          {article.excerpt}
        </p>

        {/* Editorial Image */}
        <div className="rounded-2xl overflow-hidden bg-[#ECE4D8] aspect-16/9 mb-8 shadow-sm">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-stone max-w-none text-[#4D463F] text-sm sm:text-base leading-relaxed space-y-4 font-light mb-10">
          <p>{article.content}</p>
          <p>
            In modern restorative and prosthodontic workflows, patient involvement is pivotal. By employing high-speed intraoral scanning and precise digital smile simulations, we eliminate uncertainty before a single tooth is prepared. The synergy between digital planning and biological preservation allows us to attain unparalleled longevity, structural strength, and subtle aesthetic grace.
          </p>
          <p>
            Whether planning a single conservative veneer or a comprehensive full-mouth reconstruction, Dr. Sara Alhammadi personalizes every curve, shade gradient, and incisal angle to match the natural anatomy of your face and oral architecture.
          </p>
        </div>

        {/* Footer Callout */}
        <div className="p-6 rounded-2xl bg-[#F4EFE6] border border-[#E7DECة] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-editorial text-lg text-[#1F1D1B]">
              Experience Bespoke Cosmetic Dentistry
            </p>
            <p className="text-xs text-[#7A7167]">
              Private consultations available at our Jumeirah 2 villa studio.
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookConsultation();
            }}
            className="shrink-0 px-6 py-3 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-xs uppercase tracking-[0.18em] font-medium text-[#FAF8F5] transition-colors"
          >
            Book Consultation
          </button>
        </div>

      </div>
    </div>
  );
};
