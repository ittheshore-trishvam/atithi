import React from 'react';
import { HOTEL_INFO } from '../data/hotelInfo';
import { Sparkles, Award, Waves, Clock, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-[#EFE9DF]">
      {/* Background Watermark Crest */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#C5A059" strokeWidth="2" fill="none" />
          <path d="M50 18 L53 32 L67 32 L56 41 L60 55 L50 46 L40 55 L44 41 L33 32 L47 32 Z" fill="#C5A059" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6EE] border border-[#C5A059]/40 text-[#9A7730] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Heritage & Philosophy
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B192C] mb-4">
            A French-Colonial Coastal Haven
          </h2>
          <div className="h-0.5 w-20 bg-[#C5A059] mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
            Welcome to <strong className="text-[#0B192C]">Le Boulevard</strong>, the premier signature multi-cuisine dining destination at <strong className="text-[#0B192C]">Hotel Atithi — TGI Grand</strong>, Puducherry.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          {/* Images Mosaic */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                alt="Le Boulevard Coastal Delicacies"
                className="w-full h-56 sm:h-64 object-cover rounded-3xl shadow-lg border-2 border-white"
              />
              <div className="p-5 rounded-3xl bg-[#0B192C] text-white shadow-lg border border-[#C5A059]/40">
                <span className="font-serif text-3xl font-bold text-[#E6C280] block mb-1">
                  100%
                </span>
                <p className="text-xs text-slate-300">
                  Sea-fresh catches sourced daily from local Coromandel coast fishermen.
                </p>
              </div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="p-5 rounded-3xl bg-white text-[#0B192C] shadow-lg border border-[#E2D7C3]">
                <Award className="w-8 h-8 text-[#C5A059] mb-2" />
                <span className="font-serif text-xl font-bold block mb-1">
                  Five-Star Standard
                </span>
                <p className="text-xs text-slate-500">
                  Hygienic culinary kitchens supervised by veteran master chefs.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                alt="Ambiance at Hotel Atithi"
                className="w-full h-56 sm:h-64 object-cover rounded-3xl shadow-lg border-2 border-white"
              />
            </div>
          </div>

          {/* Story Text */}
          <div className="space-y-6">
            {HOTEL_INFO.story.map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E2D7C3]">
              {HOTEL_INFO.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center shrink-0 border border-[#C5A059]/30">
                    <CheckCircle className="w-4 h-4 text-[#9A7730]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#0B192C]">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-snug mt-0.5">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dining Schedule Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C5A059]/40 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#FAF6EE]">
            <Clock className="w-6 h-6 text-[#C5A059]" />
            <div>
              <h3 className="font-serif font-bold text-xl text-[#0B192C]">
                Official Service Timings & Outlets
              </h3>
              <p className="text-xs text-slate-500">
                Available to hotel guests and visitors at Hotel Atithi — TGI Grand
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOTEL_INFO.timings.map((t, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE9DF] hover:border-[#C5A059] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h5 className="font-serif font-bold text-sm text-[#0B192C]">
                    {t.meal}
                  </h5>
                  <span className="px-2 py-0.5 rounded-full bg-[#0B192C] text-[#E6C280] font-bold text-[10px]">
                    {t.hours}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.service}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
