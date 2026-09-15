import React from 'react';
import { Award, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import doctorPortrait from '../assets/images/dr_sara_portrait_1789472919670.jpg';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-[#EFE8DC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Subtle aesthetic offset frame */}
              <div className="absolute top-4 left-4 -right-4 -bottom-4 rounded-3xl border border-[#E5DDD0] bg-[#F4EFE6]/50 -z-10" />

              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-[#EBE4D8] aspect-3/4">
                <img
                  src={doctorPortrait}
                  alt="Dr. Sara Alhammadi - Cosmetic Dentist Dubai"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Minimal floating doctor signature credential */}
              <div className="absolute -bottom-6 left-6 right-6 p-4 rounded-xl bg-[#FFFFFF] border border-[#EBE3D7] shadow-lg flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#B69768] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] font-medium text-[#1F1D1B]">
                    Specialist Prosthodontist
                  </p>
                  <p className="text-[11px] text-[#7E7469]">
                    Registered Dubai Healthcare City & DHA
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Text Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#B69768]" />
              <span className="text-xs uppercase tracking-[0.22em] text-[#8E8276] font-medium">
                Meet Dr. Sara
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#1F1D1B] leading-[1.12] mb-6 font-normal">
              Where Dentistry Meets <br />
              <span className="italic text-[#8E7E6B] font-light">Artistry.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#554E46] leading-relaxed mb-6 font-light">
              Founded on the belief that genuine cosmetic dentistry is an exacting art of understated elegance, Dr. Sara Alhammadi brings over fourteen years of specialist prosthodontic mastery to the heart of Dubai.
            </p>

            <p className="text-sm sm:text-base text-[#6B6359] leading-relaxed mb-8 font-light">
              Rather than producing cookie-cutter, artificially stark smiles, Dr. Sara creates restorations that mirror natural biological enamel—respecting dental anatomy, facial symmetry, and the soft contours of your lips. Every veneer, implant, and rehabilitation is planned digitally with 3D facial biometrics to give you timeless confidence that feels entirely your own.
            </p>

            {/* Core Values / Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-10">
              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#ECE4D8]">
                <div className="flex items-center gap-2.5 text-[#1F1D1B] mb-1.5 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#B69768]" />
                  <span>Prosthodontic Precision</span>
                </div>
                <p className="text-xs text-[#71685E] leading-relaxed">
                  Post-graduate specialty training ensuring biomechanical stability, balanced occlusion, and lifelong health.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#ECE4D8]">
                <div className="flex items-center gap-2.5 text-[#1F1D1B] mb-1.5 font-medium text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#B69768]" />
                  <span>Enamel-Preserving Philosophy</span>
                </div>
                <p className="text-xs text-[#71685E] leading-relaxed">
                  Micro-invasive protocols dedicated to preserving your natural tooth structure whenever clinically possible.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#ECE4D8]">
                <div className="flex items-center gap-2.5 text-[#1F1D1B] mb-1.5 font-medium text-sm">
                  <HeartHandshake className="w-4 h-4 text-[#B69768]" />
                  <span>Private Concierge Care</span>
                </div>
                <p className="text-xs text-[#71685E] leading-relaxed">
                  Strictly single-patient booking schedules ensuring unhurried appointments, supreme discretion, and focused attention.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#ECE4D8]">
                <div className="flex items-center gap-2.5 text-[#1F1D1B] mb-1.5 font-medium text-sm">
                  <Award className="w-4 h-4 text-[#B69768]" />
                  <span>Master Dental Ceramists</span>
                </div>
                <p className="text-xs text-[#71685E] leading-relaxed">
                  Hand-layered ceramics created in collaboration with world-renowned master dental laboratories in Switzerland & Germany.
                </p>
              </div>
            </div>

            {/* Doctor quote snippet */}
            <div className="p-5 rounded-2xl bg-[#EFE9DE]/70 border-l-2 border-[#B69768] w-full">
              <p className="italic font-editorial text-lg text-[#35312C]">
                &ldquo;A truly beautiful smile doesn&apos;t announce itself from across the room. It illuminates your natural warmth and lets the world see you at your very best.&rdquo;
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#8E8276] mt-2 font-medium">
                — Dr. Sara Alhammadi
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
