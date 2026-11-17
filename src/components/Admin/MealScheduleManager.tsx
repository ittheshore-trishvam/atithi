import React, { useState } from 'react';
import { BuffetMenu, BuffetSection } from '../../types/index.ts';
import { 
  Layers, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Check, 
  Edit3, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  ChefHat
} from 'lucide-react';
import { saveBuffetMenu } from '../../services/api';

interface MealScheduleManagerProps {
  buffetMenus: BuffetMenu[];
  onRefresh: () => void;
}

export const MealScheduleManager: React.FC<MealScheduleManagerProps> = ({ buffetMenus, onRefresh }) => {
  const [editingMenu, setEditingMenu] = useState<BuffetMenu | null>(null);
  const [message, setMessage] = useState('');

  const handleTogglePublish = async (menu: BuffetMenu) => {
    const updated = { ...menu, isPublished: !menu.isPublished };
    await saveBuffetMenu(updated);
    setMessage(`Updated publication status for "${menu.title}"`);
    setTimeout(() => setMessage(''), 3000);
    onRefresh();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMenu) return;

    await saveBuffetMenu(editingMenu);
    setEditingMenu(null);
    setMessage(`Saved "${editingMenu.title}"`);
    setTimeout(() => setMessage(''), 3000);
    onRefresh();
  };

  const handleAddNewMenu = () => {
    const newMenu: BuffetMenu = {
      id: `buffet-${Date.now()}`,
      title: 'Weekend Coastal Feast Buffet',
      mealType: 'dinner',
      serviceDate: 'Weekends (Fri–Sun)',
      timings: '7:30 PM – 11:00 PM',
      priceAdult: 899,
      priceChild: 499,
      isPublished: true,
      sections: [
        {
          title: 'Soups & Salads',
          items: [
            { name: 'Cream of Field Mushroom Soup', isVeg: true },
            { name: 'Coastal Seafood Bisque', isVeg: false }
          ]
        },
        {
          title: 'Live Counters',
          items: [
            { name: 'Live Pasta & Risotto Station', isVeg: true },
            { name: 'Charcoal Smoked Kebabs', isVeg: false }
          ]
        },
        {
          title: 'Main Course Specialties',
          items: [
            { name: 'Multan Paneer Butter Masala', isVeg: true },
            { name: 'Bay Prawn Thokku Curry', isVeg: false }
          ]
        },
        {
          title: 'Desserts & Sweets',
          items: [
            { name: 'French Caramel Custard', isVeg: false },
            { name: 'Royal Rasmalai & Ice Creams', isVeg: true }
          ]
        }
      ]
    };
    setEditingMenu(newMenu);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#0B192C]">
            Meal Schedules & Buffet Manager
          </h3>
          <p className="text-xs text-slate-500">
            Publish, schedule, or modify daily Breakfast, Lunch, and Dinner buffet spreads.
          </p>
        </div>

        <button
          onClick={handleAddNewMenu}
          className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-[#152A4A] border border-[#C5A059] flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 text-[#E6C280]" />
          <span>Create Buffet Spread</span>
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Buffet Menus Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {buffetMenus.map((menu) => (
          <div 
            key={menu.id}
            className="p-6 rounded-3xl bg-white border border-[#E2D7C3] shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6EE] text-[#9A7730] border border-[#C5A059]/40 font-bold text-[10px] uppercase tracking-wider">
                  {menu.mealType} Service
                </span>
                <button
                  onClick={() => handleTogglePublish(menu)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
                    menu.isPublished
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                >
                  {menu.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{menu.isPublished ? 'Published' : 'Draft / Hidden'}</span>
                </button>
              </div>

              <h4 className="font-serif font-bold text-xl text-[#0B192C] mb-2">
                {menu.title}
              </h4>

              <div className="space-y-1 text-xs text-slate-600 mb-4">
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Schedule: <strong>{menu.serviceDate}</strong></span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Timings: <strong>{menu.timings}</strong></span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-[#C5A059] font-bold">₹</span>
                  <span>Adult: <strong>₹{menu.priceAdult}</strong> | Child: <strong>₹{menu.priceChild}</strong> (+18% GST)</span>
                </p>
              </div>

              {/* Sections Preview */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE9DF] space-y-2 mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Included Spread Sections ({menu.sections.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {menu.sections.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-medium">
                      {s.title} ({s.items.length})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setEditingMenu({ ...menu })}
                className="py-1.5 px-4 rounded-xl text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Edit Spread & Sections</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Buffet Modal */}
      {editingMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#C5A059]/40 max-h-[90vh] overflow-y-auto">
            <div className="p-5 bg-gradient-to-r from-[#0B192C] to-[#152A4A] text-white flex items-center justify-between border-b border-[#C5A059]/30">
              <h3 className="font-serif font-bold text-lg text-white">
                Edit Buffet Spread: {editingMenu.title}
              </h3>
              <button
                onClick={() => setEditingMenu(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Buffet Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMenu.title}
                    onChange={(e) => setEditingMenu({ ...editingMenu, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Meal Type *
                  </label>
                  <select
                    value={editingMenu.mealType}
                    onChange={(e) => setEditingMenu({ ...editingMenu, mealType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Schedule Dates *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMenu.serviceDate}
                    onChange={(e) => setEditingMenu({ ...editingMenu, serviceDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Timings *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMenu.timings}
                    onChange={(e) => setEditingMenu({ ...editingMenu, timings: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Adult Price (₹ Pre-GST) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingMenu.priceAdult}
                    onChange={(e) => setEditingMenu({ ...editingMenu, priceAdult: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Child Price (₹ Pre-GST) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingMenu.priceChild}
                    onChange={(e) => setEditingMenu({ ...editingMenu, priceChild: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMenu.isPublished}
                    onChange={(e) => setEditingMenu({ ...editingMenu, isPublished: e.target.checked })}
                  />
                  <span className="font-semibold text-slate-800">
                    Publish this menu on public website
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMenu(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-white bg-[#0B192C] hover:bg-[#152A4A] border border-[#C5A059] font-bold shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-[#E6C280]" />
                  <span>Save Spread</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
