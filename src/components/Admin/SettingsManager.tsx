import React, { useState } from 'react';
import { RestaurantSettings } from '../../types/index.ts';
import { Save, Check, ShieldAlert, Receipt, Globe, Phone, MessageCircle, AlertTriangle } from 'lucide-react';
import { saveSettings } from '../../services/api';

interface SettingsManagerProps {
  settings: RestaurantSettings;
  onRefresh: () => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({ settings, onRefresh }) => {
  const [formData, setFormData] = useState<RestaurantSettings>({ ...settings });
  const [savedMessage, setSavedMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(formData);
    setSavedMessage('Hotel & Tax settings successfully updated!');
    setTimeout(() => setSavedMessage(''), 3000);
    onRefresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {savedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Tax & GST Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E2D7C3] shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Receipt className="w-5 h-5 text-[#C5A059]" />
          <div>
            <h4 className="font-serif font-bold text-base text-[#0B192C]">
              Statutory Tax Notice & GST Configuration
            </h4>
            <p className="text-xs text-slate-500">
              Configure the mandatory government tax notice displayed across public menu pages.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Government Tax Notice Text *
            </label>
            <input
              type="text"
              required
              value={formData.taxNotice}
              onChange={(e) => setFormData({ ...formData, taxNotice: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Default required notice: “All prices are subject to 18% GST.”
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                Applicable GST Percentage (%) *
              </label>
              <input
                type="number"
                required
                min={0}
                max={28}
                value={formData.gstPercentage}
                onChange={(e) => setFormData({ ...formData, gstPercentage: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                HSN / SAC Category Code
              </label>
              <input
                type="text"
                disabled
                value="996331 (Restaurant & In-Room Dining)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Domain & QR Code Target URL */}
      <div className="p-6 rounded-3xl bg-white border border-[#E2D7C3] shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Globe className="w-5 h-5 text-[#C5A059]" />
          <div>
            <h4 className="font-serif font-bold text-base text-[#0B192C]">
              Public QR Code & Deployment Domain
            </h4>
            <p className="text-xs text-slate-500">
              The public URL encoded into printed table tents and room service cards.
            </p>
          </div>
        </div>

        <div className="text-xs space-y-3">
          <div>
            <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Production Website URL *
            </label>
            <input
              type="url"
              required
              value={formData.qrCodeBaseUrl}
              onChange={(e) => setFormData({ ...formData, qrCodeBaseUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Configured production target: <strong>https://menu.atithipondicherry.com/</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Contact & Concierge Information */}
      <div className="p-6 rounded-3xl bg-white border border-[#E2D7C3] shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Phone className="w-5 h-5 text-[#C5A059]" />
          <div>
            <h4 className="font-serif font-bold text-base text-[#0B192C]">
              Restaurant & Hotel Contact Details
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Restaurant Name
            </label>
            <input
              type="text"
              required
              value={formData.restaurantName}
              onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Parent Property
            </label>
            <input
              type="text"
              required
              value={formData.parentProperty}
              onChange={(e) => setFormData({ ...formData, parentProperty: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Concierge Phone Number
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div>
            <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
              WhatsApp Concierge Number
            </label>
            <input
              type="text"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>
      </div>

      {/* Special Announcement Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E2D7C3] shadow-sm space-y-4">
        <h4 className="font-serif font-bold text-base text-[#0B192C]">
          Header Announcement Banner
        </h4>
        <div className="text-xs space-y-3">
          <div>
            <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Announcement Message
            </label>
            <input
              type="text"
              value={formData.announcement}
              onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
              placeholder="e.g. Chef's Weekend Seafood Carnival - Enjoy Bay Prawn Thokku & Fresh Catch specials"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formData.isAnnouncementActive}
              onChange={(e) => setFormData({ ...formData, isAnnouncementActive: e.target.checked })}
            />
            <span className="font-semibold text-slate-700">Display this banner on homepage</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="py-3 px-8 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0B192C] to-[#152A4A] hover:from-[#152A4A] hover:to-[#0B192C] border border-[#C5A059] shadow-md flex items-center gap-2 cursor-pointer transition-all"
        >
          <Save className="w-4 h-4 text-[#E6C280]" />
          <span>Save All Settings</span>
        </button>
      </div>
    </form>
  );
};
