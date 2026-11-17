import React from 'react';
import { HOTEL_INFO } from '../data/hotelInfo';
import { RestaurantSettings } from '../types/index.ts';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  Compass, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  settings: RestaurantSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  return (
    <section id="contact" className="w-full py-16 sm:py-20 bg-white relative border-t border-[#EFE9DF]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059] block mb-2">
            Visit & Connect
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] mb-3">
            Location & Concierge
          </h2>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mb-3"></div>
          <p className="text-xs sm:text-sm text-slate-500">
            Conveniently situated in the French Heritage precinct of Puducherry, just minutes from the Bay of Bengal coastline.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Card 1: Address & Landmarks */}
          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E2D7C3] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#0B192C] text-[#C5A059] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0B192C] mb-2">
                Resort Address
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                <strong>Hotel Atithi — TGI Grand</strong><br />
                {settings.address},<br />
                {settings.city} — {settings.pincode},<br />
                Puducherry, India
              </p>
              
              <div className="pt-3 border-t border-[#E2D7C3] space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Nearby Landmarks:
                </span>
                {HOTEL_INFO.location.landmarks.map((landmark, i) => (
                  <p key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                    <span className="text-[#C5A059]">•</span> {landmark}
                  </p>
                ))}
              </div>
            </div>

            <a
              href={HOTEL_INFO.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#0B192C] hover:text-[#C5A059] transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Direct Concierge & WhatsApp */}
          <div className="p-6 rounded-3xl bg-[#0B192C] text-white flex flex-col justify-between shadow-xl border border-[#C5A059]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.25)_0,transparent_70%)] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-[#C5A059] text-[#0B192C] flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-white mb-2">
                Dining Desk & Enquiries
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Connect directly with our Food & Beverage manager for table reservations, banquet bookings, or room dining queries.
              </p>

              <div className="space-y-3">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 text-xs"
                >
                  <Phone className="w-4 h-4 text-[#E6C280]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Telephone Hotline</span>
                    <strong className="text-white text-sm">{settings.phone}</strong>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Le Boulevard at Hotel Atithi, I would like to reserve a table / enquire about catering.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 transition-colors border border-emerald-500/30 text-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-emerald-300 block">Instant WhatsApp Concierge</span>
                    <strong className="text-emerald-200 text-sm">{settings.whatsapp}</strong>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 text-xs"
                >
                  <Mail className="w-4 h-4 text-[#E6C280]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Email Reservations</span>
                    <strong className="text-white">{settings.email}</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Interactive Map Preview */}
          <div className="rounded-3xl overflow-hidden border border-[#E2D7C3] shadow-xs flex flex-col bg-[#FAF8F5]">
            <div className="relative w-full h-full min-h-[240px] bg-slate-200">
              <iframe
                title="Hotel Atithi Puducherry Location"
                src="https://maps.google.com/maps?q=Hotel+Atithi+Puducherry+SV+Patel+Salai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 min-h-[250px]"
                loading="lazy"
              ></iframe>
            </div>
            <div className="p-4 bg-white border-t border-[#E2D7C3] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Compass className="w-4 h-4 text-[#C5A059]" />
                <span>Valet parking available for all restaurant guests</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
