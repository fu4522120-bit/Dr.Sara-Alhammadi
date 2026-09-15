import React, { useState } from 'react';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { JournalArticle } from '../types';
import { ArticleModal } from './ArticleModal';

interface JournalProps {
  articles: JournalArticle[];
  onBookConsultation: () => void;
}

export const Journal: React.FC<JournalProps> = ({ articles, onBookConsultation }) => {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="py-24 lg:py-32 bg-[#F6F2EB] relative border-y border-[#E9E2D6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18 text-left">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#B69768]" />
              <span className="text-xs uppercase tracking-[0.22em] text-[#8E8276] font-medium">
                Clinical Insights & Philosophy
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1F1D1B] font-normal leading-[1.12]">
              The Journal
            </h2>
            <p className="text-sm sm:text-base text-[#6E665D] mt-3 font-light">
              Essays on biomimetic aesthetics, facial smile architecture, and contemporary prosthodontics.
            </p>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {articles.map((article, idx) => (
            <article
              key={article.id || idx}
              id={`journal-card-${article.id}`}
              onClick={() => setActiveArticle(article)}
              className="group relative flex flex-col justify-between rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA] hover:border-[#B69768]/60 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer text-left"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#ECE4D8]">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="text-[10px] uppercase tracking-[0.16em] font-medium px-2.5 py-1 rounded-full bg-[#FAF8F5]/90 text-[#1F1D1B] backdrop-blur-xs">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-[#8E8276] uppercase tracking-wider mb-2.5">
                    <span>{article.publishDate}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl text-[#1F1D1B] group-hover:text-[#8E7E6B] transition-colors line-clamp-2 leading-snug mb-3">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#635B52] line-clamp-3 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Article Action */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs font-medium uppercase tracking-[0.16em] text-[#B69768] group-hover:text-[#1F1D1B] transition-colors">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onBookConsultation={onBookConsultation}
      />
    </section>
  );
};
