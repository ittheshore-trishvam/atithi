import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#C5A059]/40 flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-gradient-to-r from-[#0B192C] to-[#152A4A] text-white flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif font-bold text-lg text-white">
              Guest Privacy & Data Policy
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
          <p>
            At <strong>Le Boulevard (Hotel Atithi — TGI Grand, Puducherry)</strong>, we deeply value the trust and privacy of all our esteemed dining and hotel guests.
          </p>

          <h4 className="font-serif font-bold text-base text-[#0B192C]">
            1. Information We Collect
          </h4>
          <p>
            When utilizing our digital menu for In-Room Dining or table order enquiries, we may collect your Room Number or Table Number, Guest Name, Mobile Number, and specific dietary or allergen requirements.
          </p>

          <h4 className="font-serif font-bold text-base text-[#0B192C]">
            2. Purpose of Collection
          </h4>
          <p>
            This information is strictly utilized to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Accurately prepare and dispatch food orders to your designated hotel suite or dining table.</li>
            <li>Post charges to your verified room folio upon guest signature and order delivery.</li>
            <li>Accommodate severe culinary allergies and dietary requirements safely.</li>
            <li>Enable direct WhatsApp or telephone communication regarding dining status.</li>
          </ul>

          <h4 className="font-serif font-bold text-base text-[#0B192C]">
            3. Data Retention & Third Parties
          </h4>
          <p>
            We do not sell, rent, or lease guest information to any commercial third parties. In-room dining records are retained strictly in accordance with hospitality accounting standards for statutory tax audits (GST compliance).
          </p>

          <h4 className="font-serif font-bold text-base text-[#0B192C]">
            4. Contact
          </h4>
          <p>
            For privacy inquiries or deletion requests, please contact our General Manager or Concierge Desk at <strong>dining@atithipondicherry.com</strong> or phone <strong>+91 413 2211111</strong>.
          </p>
        </div>

        <div className="p-4 bg-[#FAF8F5] border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-[#152A4A] transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
