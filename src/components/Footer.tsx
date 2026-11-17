import React from 'react';
import { BrandLogo } from './BrandLogo';
import { RestaurantSettings } from '../types/index.ts';
import { 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle, 
  ArrowUp, 
  ShieldCheck, 
  FileText,
  Sparkles,
  Receipt
} from 'lucide-react';

interface FooterProps {
  settings: RestaurantSettings;
  onOpenPrivacy: () => void;
  onOpenAdmin: () => void;
  onOpenQr: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenPrivacy,
  onOpenAdmin,
  onOpenQr,
  onScrollToTop
}) => {
  return (
    <footer className="w-full bg-[#070F1A] text-slate-300 pt-16 pb-12 border-t-2 border-[#C5A059]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Parent Property */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo size="md" variant="light" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed font-light mt-3">
              Le Boulevard at Hotel Atithi — TGI Grand, Puducherry. Celebrating the intersection of French culinary refinement and rich coastal Coromandel heritage. Dedicated to exemplary hospitality and hygienic preparation.
            </p>
            {/* Tax Notice in Footer */}
            <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-[#C5A059]/30 text-xs text-[#E6C280]">
              <Receipt className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>{settings.taxNotice} (Pre-GST listed prices)</span>
            </div>
          </div>

          {/* Col 2: Service Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Dining Schedule
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li className="flex justify-between pb-1 border-b border-white/5">
                <span>Breakfast:</span>
                <span className="text-white font-medium">7:00 AM – 10:30 AM</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-white/5">
                <span>Lunch:</span>
                <span className="text-white font-medium">12:30 PM – 3:00 PM</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-white/5">
                <span>Dinner:</span>
                <span className="text-white font-medium">7:30 PM – 11:00 PM</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-white/5">
                <span>All-Day Snacks:</span>
                <span className="text-white font-medium">11:00 AM – 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>In-Room Dining:</span>
                <span className="text-[#E6C280] font-medium">24 Hours</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Hotel Info */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Hotel Links
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenQr} className="hover:text-[#E6C280] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>Table & Room QR Code</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-[#E6C280] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>Guest Privacy Policy</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-[#E6C280] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>Hotel Staff & Admin Portal</span>
                </button>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp F&B Concierge</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>Le Boulevard</strong> — Hotel Atithi - TGI Grand. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#E6C280] flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>
            <span>•</span>
            <button
              onClick={onScrollToTop}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#0B192C] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
