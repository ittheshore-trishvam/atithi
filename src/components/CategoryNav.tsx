import React from 'react';
import { CategoryId, CategoryInfo } from '../types/index.ts';
import { 
  Search, 
  X, 
  Sparkles, 
  Flame, 
  Soup, 
  Coffee, 
  Utensils, 
  Wheat, 
  CircleDot, 
  Cake, 
  CupSoda 
} from 'lucide-react';
import { DietaryIcon } from './DietaryIcon';

interface CategoryNavProps {
  categories: CategoryInfo[];
  activeCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  vegOnly: boolean;
  onToggleVeg: () => void;
  nonVegOnly: boolean;
  onToggleNonVeg: () => void;
  chefSpecialOnly: boolean;
  onToggleChefSpecial: () => void;
  categoryCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  vegOnly,
  onToggleVeg,
  nonVegOnly,
  onToggleNonVeg,
  chefSpecialOnly,
  onToggleChefSpecial,
  categoryCounts
}) => {
  // Helper for category icons
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Soup': return <Soup className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Wheat': return <Wheat className="w-4 h-4" />;
      case 'CircleDot': return <CircleDot className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      case 'CupSoda': return <CupSoda className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  return (
    <div className="sticky top-[105px] z-30 w-full py-2.5 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#C5A059]/20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-3">
        {/* Search & Dietary Filters Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by dish name (e.g., Thokku Biryani, Prawns, Dosa)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-white border border-[#E2D7C3] focus:border-[#C5A059] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 text-[#0B192C] placeholder:text-slate-400 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
            {/* Pure Veg Filter */}
            <button
              onClick={onToggleVeg}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                vegOnly
                  ? 'bg-emerald-700 text-white border-emerald-800 ring-2 ring-emerald-600/30'
                  : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <DietaryIcon isVeg={true} size="sm" />
              <span>Pure Veg</span>
            </button>

            {/* Non-Veg Filter */}
            <button
              onClick={onToggleNonVeg}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                nonVegOnly
                  ? 'bg-rose-800 text-white border-rose-900 ring-2 ring-rose-700/30'
                  : 'bg-white text-rose-800 border-rose-300 hover:bg-rose-50'
              }`}
            >
              <DietaryIcon isVeg={false} size="sm" />
              <span>Non-Veg</span>
            </button>

            {/* Chef Special Filter */}
            <button
              onClick={onToggleChefSpecial}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                chefSpecialOnly
                  ? 'bg-[#C5A059] text-[#0B192C] border-[#9A7730] ring-2 ring-[#C5A059]/30 font-bold'
                  : 'bg-white text-[#9A7730] border-[#C5A059]/40 hover:bg-[#FAF6EE]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Chef’s Specials</span>
            </button>
          </div>
        </div>

        {/* Category Scrollable Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {/* All Categories Option */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer shrink-0 border ${
              activeCategory === 'all'
                ? 'bg-[#0B192C] text-white border-[#C5A059] shadow-sm'
                : 'bg-white text-[#1E2022] border-[#E2D7C3] hover:border-[#C5A059]'
            }`}
          >
            <span>All Categories</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeCategory === 'all' ? 'bg-[#C5A059] text-[#0B192C]' : 'bg-slate-100 text-slate-600'
            }`}>
              {categoryCounts['all'] || 0}
            </span>
          </button>

          {/* Individual Category Tabs */}
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-[#0B192C] text-white border-[#C5A059] shadow-sm'
                    : 'bg-white text-[#1E2022] border-[#E2D7C3] hover:border-[#C5A059]'
                }`}
              >
                <span className={isActive ? 'text-[#E6C280]' : 'text-[#C5A059]'}>
                  {renderIcon(cat.iconName)}
                </span>
                <span>{cat.name}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#C5A059] text-[#0B192C]' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
