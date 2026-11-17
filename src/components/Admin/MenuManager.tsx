import React, { useState } from 'react';
import { MenuItem, CategoryId } from '../../types/index.ts';
import { CATEGORIES } from '../../data/initialMenu';
import { DietaryIcon } from '../DietaryIcon';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  ToggleLeft, 
  ToggleRight,
  Clock,
  Save,
  AlertCircle
} from 'lucide-react';
import { saveMenuItem, deleteMenuItem, toggleItemAvailability } from '../../services/api';

interface MenuManagerProps {
  items: MenuItem[];
  onRefresh: () => void;
}

export const MenuManager: React.FC<MenuManagerProps> = ({ items, onRefresh }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [message, setMessage] = useState('');

  // Filter items
  const filtered = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleToggle = async (item: MenuItem) => {
    const nextState = !item.isAvailable;
    await toggleItemAvailability(item.id, nextState);
    setMessage(`Updated availability for "${item.name}"`);
    setTimeout(() => setMessage(''), 3000);
    onRefresh();
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      await deleteMenuItem(id);
      setMessage(`Deleted "${name}"`);
      setTimeout(() => setMessage(''), 3000);
      onRefresh();
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    await saveMenuItem(editingItem);
    setEditingItem(null);
    setIsAddingNew(false);
    setMessage(`Saved "${editingItem.name}" successfully!`);
    setTimeout(() => setMessage(''), 3000);
    onRefresh();
  };

  const handleStartAddNew = () => {
    const newItem: MenuItem = {
      id: `dish-custom-${Date.now()}`,
      name: '',
      category: 'starters',
      categoryTitle: 'Starters & Appetizers',
      price: 350,
      serviceTime: '12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM',
      mealTypes: ['lunch', 'dinner', 'room-service'],
      isVeg: true,
      isAvailable: true,
      description: '',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    };
    setEditingItem(newItem);
    setIsAddingNew(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Add Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-300 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-3 py-2 rounded-xl text-xs border border-slate-300 bg-white focus:outline-none focus:border-[#C5A059]"
          >
            <option value="all">All Categories ({items.length})</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleStartAddNew}
          className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-[#152A4A] border border-[#C5A059] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 text-[#E6C280]" />
          <span>Add New Dish</span>
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Dishes Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Dish</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Pre-GST Price</th>
                <th className="py-3 px-3">Service Hours</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <DietaryIcon isVeg={item.isVeg} isEgg={item.isEgg} size="sm" />
                      <div>
                        <div className="font-serif font-bold text-sm text-[#0B192C] flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.isChefSpecial && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FAF6EE] text-[#9A7730] border border-[#C5A059]/40 font-sans font-bold">
                              ★ Chef Special
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {item.categoryTitle}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-sm text-[#0B192C]">
                    ₹{item.price}
                    {item.variants && item.variants.length > 0 && (
                      <span className="text-[10px] text-slate-400 block font-normal">
                        ({item.variants.length} options)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px]">
                    {item.serviceTime}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => handleToggle(item)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                        item.isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-rose-50 text-rose-700 border border-rose-300'
                      }`}
                      title="Click to toggle availability"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                      <span>{item.isAvailable ? 'In Stock' : 'Sold Out'}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => { setEditingItem({ ...item }); setIsAddingNew(false); }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B192C] hover:bg-slate-100 transition-colors"
                        title="Edit Dish"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#C5A059]/40 max-h-[90vh] overflow-y-auto">
            <div className="p-5 bg-gradient-to-r from-[#0B192C] to-[#152A4A] text-white flex items-center justify-between border-b border-[#C5A059]/30">
              <h3 className="font-serif font-bold text-lg text-white">
                {isAddingNew ? 'Add New Menu Dish' : `Edit "${editingItem.name}"`}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Category *
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => {
                      const cat = CATEGORIES.find(c => c.id === e.target.value);
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as any,
                        categoryTitle: cat ? cat.name : editingItem.categoryTitle
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#C5A059]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Price in INR (Pre-GST) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Service Hours *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.serviceTime}
                    onChange={(e) => setEditingItem({ ...editingItem, serviceTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Dish Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                ></textarea>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer bg-slate-50">
                  <input
                    type="checkbox"
                    checked={editingItem.isVeg}
                    onChange={(e) => setEditingItem({ ...editingItem, isVeg: e.target.checked })}
                  />
                  <span className="font-semibold text-slate-700">Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer bg-slate-50">
                  <input
                    type="checkbox"
                    checked={editingItem.isAvailable}
                    onChange={(e) => setEditingItem({ ...editingItem, isAvailable: e.target.checked })}
                  />
                  <span className="font-semibold text-slate-700">In Stock</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer bg-slate-50">
                  <input
                    type="checkbox"
                    checked={!!editingItem.isChefSpecial}
                    onChange={(e) => setEditingItem({ ...editingItem, isChefSpecial: e.target.checked })}
                  />
                  <span className="font-semibold text-slate-700">Chef Special</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer bg-slate-50">
                  <input
                    type="checkbox"
                    checked={!!editingItem.isBestseller}
                    onChange={(e) => setEditingItem({ ...editingItem, isBestseller: e.target.checked })}
                  />
                  <span className="font-semibold text-slate-700">Bestseller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-white bg-[#0B192C] hover:bg-[#152A4A] border border-[#C5A059] font-bold shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-[#E6C280]" />
                  <span>Save Dish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
