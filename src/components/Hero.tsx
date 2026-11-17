import React from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  Compass, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ArrowDown, 
  Sparkles,
  Utensils,
  Sun,
  Moon,
  Coffee,
  ShoppingBag
} from 'lucide-react';
import { RestaurantSettings, MealFilter } from '../types/index.ts';

interface HeroProps {
  settings: RestaurantSettings;
  onSelectMeal: (meal: MealFilter) => void;
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onSelectMeal, onScrollToMenu }) => {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#0B192C] text-white">
      {/* Background Image with Coastal Luxury Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85"
          alt="Le Boulevard Fine Coastal Dining"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        {/* Coastal Ocean to Ivory Gradient Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.12)_0,transparent_70%)]"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24 flex flex-col items-center text-center">
        
        {/* Resort Crest Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A059]/40 text-[#E6C280] text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Hotel Atithi — TGI Grand, Puducherry</span>
          <span className="text-[#C5A059]">★ ★ ★ ★</span>
        </div>

        {/* Centerpiece Logo & Typography */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4 transform hover:scale-105 transition-transform">
            <BrandLogo size="lg" variant="light" showSubtitle={false} />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-3">
            <span className="block drop-shadow-md">Le Boulevard</span>
          </h1>

          <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A059]"></div>
            <p className="font-serif italic text-lg sm:text-2xl text-[#E6C280] tracking-wide font-normal">
              {settings.subtitle}
            </p>
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A059]"></div>
          </div>

          <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed mt-3 font-light">
            Indulge in French colonial elegance and rich Bay of Bengal coastal culinary treasures. From freshly roasted tandoori grills and Seeraga Samba Thokku biryani to artisanal sandwiches and delicate French pastries.
          </p>
        </div>

        {/* Quick Meal Action Buttons */}
        <div className="w-full max-w-3xl mt-4 mb-8">
          <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-3">
            Select Your Dining Service
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
            <button
              onClick={() => { onSelectMeal('all'); onScrollToMenu(); }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#0B192C] border border-[#C5A059]/40 backdrop-blur-xs transition-all duration-200 group cursor-pointer shadow-sm"
            >
              <Utensils className="w-5 h-5 mb-1 text-[#E6C280] group-hover:text-[#0B192C]" />
              <span className="text-xs font-bold">View Menu</span>
              <span className="text-[10px] text-slate-300 group-hover:text-[#0B192C]/80">Full Selection</span>
            </button>

            <button
              onClick={() => { onSelectMeal('breakfast'); onScrollToMenu(); }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#0B192C] border border-[#C5A059]/40 backdrop-blur-xs transition-all duration-200 group cursor-pointer shadow-sm"
            >
              <Coffee className="w-5 h-5 mb-1 text-[#E6C280] group-hover:text-[#0B192C]" />
              <span className="text-xs font-bold">Breakfast</span>
              <span className="text-[10px] text-slate-300 group-hover:text-[#0B192C]/80">7 AM – 10:30 AM</span>
            </button>

            <button
              onClick={() => { onSelectMeal('lunch'); onScrollToMenu(); }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#0B192C] border border-[#C5A059]/40 backdrop-blur-xs transition-all duration-200 group cursor-pointer shadow-sm"
            >
              <Sun className="w-5 h-5 mb-1 text-[#E6C280] group-hover:text-[#0B192C]" />
              <span className="text-xs font-bold">Lunch</span>
              <span className="text-[10px] text-slate-300 group-hover:text-[#0B192C]/80">12:30 – 3:00 PM</span>
            </button>

            <button
              onClick={() => { onSelectMeal('dinner'); onScrollToMenu(); }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#0B192C] border border-[#C5A059]/40 backdrop-blur-xs transition-all duration-200 group cursor-pointer shadow-sm"
            >
              <Moon className="w-5 h-5 mb-1 text-[#E6C280] group-hover:text-[#0B192C]" />
              <span className="text-xs font-bold">Dinner</span>
              <span className="text-[10px] text-slate-300 group-hover:text-[#0B192C]/80">7:30 – 11:00 PM</span>
            </button>

            <button
              onClick={() => { onSelectMeal('room-service'); onScrollToMenu(); }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#9A7730] text-[#0B192C] hover:opacity-95 transition-all duration-200 group cursor-pointer shadow-md font-bold"
            >
              <ShoppingBag className="w-5 h-5 mb-1 text-[#0B192C]" />
              <span className="text-xs font-bold">Room Service</span>
              <span className="text-[10px] text-[#0B192C]/80">Direct to Room</span>
            </button>
          </div>
        </div>

        {/* Location & Contact Key Details Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-300 py-3 px-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>126, S.V. Patel Salai, Puducherry 605001</span>
          </div>
          <div className="hidden sm:inline text-white/20">•</div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>Dining: 7:00 AM – 11:00 PM</span>
          </div>
          <div className="hidden sm:inline text-white/20">•</div>
          <a 
            href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Le Boulevard dining desk, I would like to reserve a table / order room service.')}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>

        {/* Announcement Banner if Active */}
        {settings.isAnnouncementActive && settings.announcement && (
          <div className="mt-6 max-w-xl mx-auto px-4 py-2 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#FAF8F5] text-xs flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-[#C5A059] text-[#0B192C] font-bold text-[9px] uppercase tracking-wider shrink-0">
              Notice
            </span>
            <span className="truncate">{settings.announcement}</span>
          </div>
        )}

        {/* Down indicator */}
        <button
          onClick={onScrollToMenu}
          className="mt-8 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors animate-bounce"
          aria-label="Scroll down to menu items"
        >
          <ArrowDown className="w-5 h-5 text-[#C5A059]" />
        </button>
      </div>

      {/* Decorative Wave Edge Transition into Ivory Body */}
      <div className="w-full h-8 bg-[#FAF8F5] [clip-path:polygon(0_100%,100%_100%,100%_0,0_100%)] sm:[clip-path:polygon(0_100%,100%_100%,100%_0,50%_100%,0_0)]"></div>
    </section>
  );
};
