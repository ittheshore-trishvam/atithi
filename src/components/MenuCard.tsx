import React, { useState } from 'react';
import { MenuItem, DishVariant } from '../types/index.ts';
import { DietaryIcon, SpicyMeter, ChefSpecialBadge } from './DietaryIcon';
import { Plus, Minus, Check, Clock, AlertCircle, Info, Sparkles } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onOpenDetail: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem, variant?: DishVariant, choice?: string) => void;
  currentQuantity: number;
  onUpdateQuantity: (item: MenuItem, delta: number, variant?: DishVariant, choice?: string) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onOpenDetail,
  onAddToCart,
  currentQuantity,
  onUpdateQuantity
}) => {
  // If item has variants, default to first variant
  const [selectedVariant, setSelectedVariant] = useState<DishVariant | undefined>(
    item.variants && item.variants.length > 0 ? item.variants[0] : undefined
  );

  // If item has choices (e.g. Cream Soup: Chicken / Mushroom / Broccoli / Veg)
  const [selectedChoice, setSelectedChoice] = useState<string | undefined>(
    item.choices && item.choices.length > 0 ? item.choices[0] : undefined
  );

  const displayPrice = selectedVariant ? selectedVariant.price : item.price;
  const isCurrentlyVeg = selectedVariant && selectedVariant.isVeg !== undefined ? selectedVariant.isVeg : item.isVeg;

  return (
    <div 
      className={`relative flex flex-col justify-between rounded-2xl bg-white border border-[#EFE9DF] transition-all duration-200 luxury-card-shadow luxury-card-hover overflow-hidden ${
        !item.isAvailable ? 'opacity-65 filter grayscale-[30%]' : ''
      }`}
    >
      {/* Top Banner / Image Area */}
      <div className="relative w-full h-44 sm:h-48 bg-[#FAF8F5] overflow-hidden group cursor-pointer" onClick={() => onOpenDetail(item)}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#FAF8F5] to-[#EFE9DF] text-[#C5A059]">
            <Sparkles className="w-8 h-8 mb-1 opacity-40" />
            <span className="font-serif italic text-xs tracking-wider text-slate-500">Le Boulevard Gourmet</span>
          </div>
        )}

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

        {/* Floating Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <DietaryIcon isVeg={isCurrentlyVeg} isEgg={item.isEgg} size="md" />
          <ChefSpecialBadge isChefSpecial={item.isChefSpecial} isBestseller={item.isBestseller} />
        </div>

        {/* Out of Stock Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-full bg-rose-900/90 text-white font-bold text-xs uppercase tracking-wider border border-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Sold Out For Service
            </span>
          </div>
        )}

        {/* Service Timings pill at bottom of image */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] z-10">
          <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md font-medium text-slate-200">
            <Clock className="w-3 h-3 text-[#E6C280]" />
            {item.serviceTime}
          </span>
          {item.portionSize && (
            <span className="hidden sm:inline-block bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md text-slate-300 truncate max-w-[140px]">
              {item.portionSize}
            </span>
          )}
        </div>
      </div>

      {/* Dish Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Spicy level */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 
              onClick={() => onOpenDetail(item)}
              className="font-serif font-bold text-base sm:text-lg text-[#0B192C] hover:text-[#9A7730] transition-colors cursor-pointer line-clamp-1"
              title={item.name}
            >
              {item.name}
            </h3>
            {item.isSpicy && <SpicyMeter level={item.isSpicy} />}
          </div>

          {/* Description */}
          <p 
            onClick={() => onOpenDetail(item)}
            className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-3 cursor-pointer"
          >
            {item.description}
          </p>

          {/* Choices Selector if available (e.g., Sweet Corn / Manchow / Hot n Sour / Clear) */}
          {item.choices && item.choices.length > 0 && (
            <div className="mb-2.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
                Preparation Style:
              </span>
              <div className="flex flex-wrap gap-1">
                {item.choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => setSelectedChoice(choice)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                      selectedChoice === choice
                        ? 'bg-[#0B192C] text-white font-semibold'
                        : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-200 border border-[#E2D7C3]'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variants Selector if available (e.g. Veg ₹300 vs Chicken ₹350) */}
          {item.variants && item.variants.length > 0 && (
            <div className="mb-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
                Select Option:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {item.variants.map((v) => {
                  const isSelected = selectedVariant?.name === v.name;
                  return (
                    <button
                      key={v.name}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex items-center justify-between px-2.5 py-1 rounded-lg text-xs transition-all border ${
                        isSelected
                          ? 'bg-[#FAF6EE] border-[#C5A059] text-[#0B192C] font-bold ring-1 ring-[#C5A059]/40'
                          : 'bg-white border-[#E2D7C3] text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate mr-1">{v.name}</span>
                      <span className="text-[#C5A059] font-semibold shrink-0">₹{v.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer: Price & Add to Room Tray */}
        <div className="pt-3 border-t border-[#EFE9DF] flex items-center justify-between gap-2 mt-auto">
          {/* Price display in INR */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-[#9A7730] font-bold">₹</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#0B192C]">
                {displayPrice}
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              Pre-GST (18% extra)
            </span>
          </div>

          {/* Action Button: Counter or Add */}
          {item.isAvailable ? (
            currentQuantity > 0 ? (
              <div className="flex items-center rounded-xl bg-[#0B192C] text-white p-1 shadow-xs border border-[#C5A059]">
                <button
                  onClick={() => onUpdateQuantity(item, -1, selectedVariant, selectedChoice)}
                  className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors text-[#E6C280]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center font-bold text-xs">
                  {currentQuantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item, 1, selectedVariant, selectedChoice)}
                  className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors text-[#E6C280]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item, selectedVariant, selectedChoice)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0B192C] bg-gradient-to-r from-[#FAF6EE] to-[#EFE9DF] hover:from-[#C5A059] hover:to-[#9A7730] hover:text-white border border-[#C5A059]/60 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-white" />
                <span>Add to Tray</span>
              </button>
            )
          ) : (
            <span className="text-[11px] font-semibold text-slate-400 italic">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
