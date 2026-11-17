import React, { useState } from 'react';
import { BuffetMenu } from '../types/index.ts';
import { DietaryIcon } from './DietaryIcon';
import { Clock, Calendar, Sparkles, ChefHat, Layers, CheckCircle2 } from 'lucide-react';

interface BuffetViewProps {
  buffetMenus: BuffetMenu[];
}

export const BuffetView: React.FC<BuffetViewProps> = ({ buffetMenus }) => {
  const publishedMenus = buffetMenus.filter(m => m.isPublished);

  const [activeTab, setActiveTab] = useState<string>(
    publishedMenus.length > 0 ? publishedMenus[0].id : ''
  );

  const currentMenu = publishedMenus.find(m => m.id === activeTab) || publishedMenus[0];

  if (publishedMenus.length === 0) {
    return (
      <div className="w-full my-12 p-8 rounded-2xl bg-white border border-[#E2D7C3] text-center max-w-xl mx-auto shadow-sm">
        <Layers className="w-12 h-12 text-[#C5A059] mx-auto mb-3 opacity-60" />
        <h3 className="font-serif text-xl font-bold text-[#0B192C] mb-2">
          No Buffet Menu Scheduled
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Our à la carte dining service is fully operational. Please explore our all-day menu or consult with our dining concierge.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full my-8">
      {/* Buffet Selector Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059] block">
            Executive Dining Spread
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C]">
            Grand Resort Buffet Menus
          </h2>
        </div>

        {/* Tabs for different buffet meals */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {publishedMenus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                activeTab === menu.id
                  ? 'bg-[#0B192C] text-white border-[#C5A059] shadow-md'
                  : 'bg-white text-slate-700 border-[#E2D7C3] hover:border-[#C5A059]'
              }`}
            >
              {menu.title}
            </button>
          ))}
        </div>
      </div>

      {currentMenu && (
        <div className="rounded-3xl bg-white border border-[#C5A059]/40 shadow-xl overflow-hidden">
          {/* Buffet Card Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0B192C] via-[#152A4A] to-[#070F1A] text-white relative">
            <div className="absolute top-0 right-0 w-64 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.25)_0,transparent_70%)] pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#E6C280] font-semibold text-xs border border-[#C5A059]/40 uppercase tracking-wider">
                    {currentMenu.mealType} Buffet
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    {currentMenu.serviceDate}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                  {currentMenu.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[#E6C280]">
                  <Clock className="w-4 h-4" />
                  <span>Timings: {currentMenu.timings}</span>
                </div>
              </div>

              {/* Pricing Pill */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
                    Adult Rate
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#E6C280]">
                    ₹{currentMenu.priceAdult}
                  </span>
                  <span className="text-[9px] text-slate-300 block">+18% GST</span>
                </div>
                <div className="h-10 w-px bg-white/20"></div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
                    Child (5–11 yrs)
                  </span>
                  <span className="font-serif text-2xl font-bold text-white">
                    ₹{currentMenu.priceChild}
                  </span>
                  <span className="text-[9px] text-slate-300 block">+18% GST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buffet Sections Grid */}
          <div className="p-6 sm:p-8 bg-[#FAF8F5]/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentMenu.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#EFE9DF] shadow-xs"
                >
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#FAF6EE]">
                    <ChefHat className="w-4 h-4 text-[#C5A059]" />
                    <h4 className="font-serif font-bold text-base text-[#0B192C]">
                      {section.title}
                    </h4>
                  </div>

                  <ul className="space-y-2.5">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <DietaryIcon isVeg={item.isVeg} size="sm" />
                        <div>
                          <span className="font-medium text-[#1E2022] block leading-snug">
                            {item.name}
                          </span>
                          {item.description && (
                            <span className="text-[11px] text-slate-500 italic block mt-0.5">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Buffet Note */}
            <div className="mt-6 p-4 rounded-xl bg-[#FAF6EE] border border-[#C5A059]/30 text-xs text-[#9A7730] flex items-center justify-between">
              <span>★ Live counter items are prepared fresh to order. Unlimited servings per guest.</span>
              <span className="font-bold">Reservation recommended for large parties</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
