import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  QrCode, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  UtensilsCrossed,
  Sparkles,
  Layers
} from 'lucide-react';
import { RestaurantSettings, MealFilter } from '../types/index.ts';

interface NavbarProps {
  settings: RestaurantSettings;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQr: () => void;
  activeMeal: MealFilter;
  onSelectMeal: (meal: MealFilter) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  cartCount,
  onOpenCart,
  onOpenQr,
  activeMeal,
  onSelectMeal,
  onNavigateSection,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine current active service in Indian Standard Time (IST)
  const getServiceStatus = () => {
    const now = new Date();
    // Indian Standard Time is UTC+5:30
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (3600000 * 5.5));
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const currentMins = hours * 60 + minutes;

    if (currentMins >= 420 && currentMins < 630) {
      return { label: 'Breakfast Buffet Active', time: '7:00 AM – 10:30 AM', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    } else if (currentMins >= 750 && currentMins < 900) {
      return { label: 'Lunch Service Active', time: '12:30 PM – 3:00 PM', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    } else if (currentMins >= 1170 && currentMins < 1380) {
      return { label: 'Dinner Service Active', time: '7:30 PM – 11:00 PM', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    } else if (currentMins >= 660 && currentMins < 1380) {
      return { label: 'All-Day Snacks Active', time: '11:00 AM – 11:00 PM', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    }
    return { label: 'Room Service & Late Bites', time: '24/7 Available', color: 'text-slate-700 bg-slate-100 border-slate-200' };
  };

  const service = getServiceStatus();

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Gold Resort Ribbon */}
      <div className="bg-[#0B192C] text-[#FAF8F5] text-xs py-1.5 px-4 border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <span className="flex items-center gap-1 text-[#E6C280] font-medium tracking-wider uppercase text-[10px]">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              Hotel Atithi - TGI Grand
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-slate-300 text-[11px] truncate">
              126, S.V. Patel Salai, Puducherry
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-[11px]">
            {/* Live Service Pill */}
            <div className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${service.color}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              <span>{service.label}</span>
              <span className="opacity-75">({service.time})</span>
            </div>

            <a 
              href={`tel:${settings.phone}`} 
              className="flex items-center gap-1 text-[#E6C280] hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">Concierge:</span> {settings.phone}
            </a>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-400 hover:text-[#E6C280] transition-colors pl-2 border-l border-slate-700"
              title="Hotel Staff & Admin Login"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className="sticky-glass bg-white/95 backdrop-blur-md border-b border-[#C5A059]/20 shadow-xs px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => onNavigateSection('hero')} 
            className="cursor-pointer transition-transform hover:scale-[1.01]"
          >
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#1E2022]">
            <button
              onClick={() => { onSelectMeal('all'); onNavigateSection('menu'); }}
              className={`transition-colors py-1 hover:text-[#C5A059] ${activeMeal === 'all' ? 'text-[#0B192C] font-bold border-b-2 border-[#C5A059]' : 'text-[#4A4E51]'}`}
            >
              Full Menu
            </button>
            <button
              onClick={() => { onSelectMeal('breakfast'); onNavigateSection('menu'); }}
              className={`transition-colors py-1 hover:text-[#C5A059] ${activeMeal === 'breakfast' ? 'text-[#0B192C] font-bold border-b-2 border-[#C5A059]' : 'text-[#4A4E51]'}`}
            >
              Breakfast
            </button>
            <button
              onClick={() => { onSelectMeal('lunch'); onNavigateSection('menu'); }}
              className={`transition-colors py-1 hover:text-[#C5A059] ${activeMeal === 'lunch' ? 'text-[#0B192C] font-bold border-b-2 border-[#C5A059]' : 'text-[#4A4E51]'}`}
            >
              Lunch
            </button>
            <button
              onClick={() => { onSelectMeal('dinner'); onNavigateSection('menu'); }}
              className={`transition-colors py-1 hover:text-[#C5A059] ${activeMeal === 'dinner' ? 'text-[#0B192C] font-bold border-b-2 border-[#C5A059]' : 'text-[#4A4E51]'}`}
            >
              Dinner
            </button>
            <button
              onClick={() => { onSelectMeal('buffet'); onNavigateSection('menu'); }}
              className={`transition-colors py-1 hover:text-[#C5A059] ${activeMeal === 'buffet' ? 'text-[#0B192C] font-bold border-b-2 border-[#C5A059]' : 'text-[#4A4E51]'}`}
            >
              Buffet Spread
            </button>
            <button
              onClick={() => onNavigateSection('about')}
              className="text-[#4A4E51] hover:text-[#C5A059] transition-colors py-1"
            >
              Our Story
            </button>
            <button
              onClick={() => onNavigateSection('contact')}
              className="text-[#4A4E51] hover:text-[#C5A059] transition-colors py-1"
            >
              Contact
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* QR Code generator button */}
            <button
              onClick={onOpenQr}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#0B192C] bg-[#FAF6EE] border border-[#C5A059]/40 hover:bg-[#EFE9DF] transition-all cursor-pointer shadow-xs"
              title="Table & Room QR Code Studio"
            >
              <QrCode className="w-4 h-4 text-[#C5A059]" />
              <span>QR Code</span>
            </button>

            {/* WhatsApp Quick Order / Concierge */}
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Le Boulevard at Hotel Atithi, I would like to enquire about restaurant dining / room service.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all cursor-pointer shadow-xs"
              title="WhatsApp Room Service / Dining Desk"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Room Service Tray Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#0B192C] to-[#152A4A] border border-[#C5A059] hover:from-[#152A4A] hover:to-[#0B192C] transition-all cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-[#E6C280]" />
              <span className="hidden xs:inline">Room Tray</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C5A059] text-[#0B192C] font-bold text-[11px] flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#0B192C] hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#C5A059]/20 flex flex-col gap-2 pb-2">
            <div className="p-2.5 rounded-lg bg-[#FAF6EE] border border-[#C5A059]/30 mb-2">
              <div className="text-xs font-bold text-[#0B192C] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                {service.label}
              </div>
              <div className="text-[11px] text-[#6B7280]">{service.time}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <button
                onClick={() => { onSelectMeal('all'); onNavigateSection('menu'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-left transition-colors flex items-center gap-2 ${activeMeal === 'all' ? 'bg-[#0B192C] text-white font-semibold' : 'bg-slate-50 text-[#1E2022]'}`}
              >
                <UtensilsCrossed className="w-4 h-4 text-[#C5A059]" />
                Full Menu
              </button>
              <button
                onClick={() => { onSelectMeal('breakfast'); onNavigateSection('menu'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-left transition-colors flex items-center gap-2 ${activeMeal === 'breakfast' ? 'bg-[#0B192C] text-white font-semibold' : 'bg-slate-50 text-[#1E2022]'}`}
              >
                <span className="text-amber-500">☕</span>
                Breakfast
              </button>
              <button
                onClick={() => { onSelectMeal('lunch'); onNavigateSection('menu'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-left transition-colors flex items-center gap-2 ${activeMeal === 'lunch' ? 'bg-[#0B192C] text-white font-semibold' : 'bg-slate-50 text-[#1E2022]'}`}
              >
                <span className="text-emerald-500">🍲</span>
                Lunch
              </button>
              <button
                onClick={() => { onSelectMeal('dinner'); onNavigateSection('menu'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-left transition-colors flex items-center gap-2 ${activeMeal === 'dinner' ? 'bg-[#0B192C] text-white font-semibold' : 'bg-slate-50 text-[#1E2022]'}`}
              >
                <span className="text-indigo-500">🌙</span>
                Dinner
              </button>
              <button
                onClick={() => { onSelectMeal('buffet'); onNavigateSection('menu'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-left transition-colors flex items-center gap-2 ${activeMeal === 'buffet' ? 'bg-[#0B192C] text-white font-semibold' : 'bg-slate-50 text-[#1E2022]'}`}
              >
                <Layers className="w-4 h-4 text-[#C5A059]" />
                Buffet Spread
              </button>
              <button
                onClick={() => { onSelectMeal('room-service'); onNavigateSection('menu'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-lg text-left transition-colors flex items-center gap-2 ${activeMeal === 'room-service' ? 'bg-[#0B192C] text-white font-semibold' : 'bg-slate-50 text-[#1E2022]'}`}
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                Room Service
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <button
                onClick={() => { onOpenQr(); setMobileMenuOpen(false); }}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#FAF6EE] text-[#0B192C] font-semibold border border-[#C5A059]/40"
              >
                <QrCode className="w-4 h-4 text-[#C5A059]" />
                View Table QR Code
              </button>
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="flex items-center gap-1 text-[#6B7280] hover:text-[#0B192C]"
              >
                <ShieldCheck className="w-4 h-4" />
                Staff Admin
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
