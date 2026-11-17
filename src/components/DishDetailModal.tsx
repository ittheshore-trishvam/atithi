import React, { useState } from 'react';
import { MenuItem, DishVariant } from '../types/index.ts';
import { DietaryIcon, SpicyMeter, ChefSpecialBadge } from './DietaryIcon';
import { X, Clock, Plus, Minus, ShoppingBag, ShieldAlert, Sparkles, Check } from 'lucide-react';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, variant?: DishVariant, choice?: string, notes?: string, quantity?: number) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<DishVariant | undefined>(
    item.variants && item.variants.length > 0 ? item.variants[0] : undefined
  );
  const [selectedChoice, setSelectedChoice] = useState<string | undefined>(
    item.choices && item.choices.length > 0 ? item.choices[0] : undefined
  );
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price = selectedVariant ? selectedVariant.price : item.price;
  const gstAmount = Math.round(price * 0.18);
  const totalWithGst = price + gstAmount;

  const handleAdd = () => {
    onAddToCart(item, selectedVariant, selectedChoice, specialNotes, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#C5A059]/40 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-72 bg-[#0B192C] overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#C5A059]">
              <Sparkles className="w-12 h-12 mb-2 opacity-50" />
              <span className="font-serif italic text-sm">Le Boulevard Signature</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <DietaryIcon isVeg={selectedVariant?.isVeg ?? item.isVeg} isEgg={item.isEgg} size="md" />
            <ChefSpecialBadge isChefSpecial={item.isChefSpecial} isBestseller={item.isBestseller} />
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 text-xs text-[#E6C280] font-medium mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Service Hours: {item.serviceTime}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Price Breakdown */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF6EE] border border-[#C5A059]/30">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                Menu Price (Pre-GST)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-[#9A7730]">₹</span>
                <span className="font-serif text-3xl font-bold text-[#0B192C]">
                  {price}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">
                +18% GST (₹{gstAmount})
              </span>
              <span className="text-xs font-bold text-[#0B192C]">
                Total approx: ₹{totalWithGst}
              </span>
            </div>
          </div>

          {/* Detailed Culinary Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Culinary Description
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-light">
              {item.description}
            </p>
          </div>

          {/* Preparation Choices if applicable */}
          {item.choices && item.choices.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B192C] block mb-2">
                Preparation Style:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => setSelectedChoice(choice)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                      selectedChoice === choice
                        ? 'bg-[#0B192C] text-white border-[#C5A059] font-bold shadow-xs'
                        : 'bg-white border-[#E2D7C3] text-slate-700 hover:bg-[#FAF6EE]'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variants if applicable */}
          {item.variants && item.variants.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B192C] block mb-2">
                Select Variant / Protein:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariant(v)}
                    className={`py-2 px-3 rounded-xl text-xs flex items-center justify-between border transition-all cursor-pointer ${
                      selectedVariant?.name === v.name
                        ? 'bg-[#0B192C] text-white border-[#C5A059] font-bold shadow-xs'
                        : 'bg-white border-[#E2D7C3] text-slate-700 hover:bg-[#FAF6EE]'
                    }`}
                  >
                    <span>{v.name}</span>
                    <span className="text-[#C5A059] font-bold">₹{v.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Allergen & Portion Info */}
          {(item.allergens || item.portionSize) && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col gap-1.5">
              {item.portionSize && (
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="font-semibold">Portion:</span>
                  <span>{item.portionSize}</span>
                </div>
              )}
              {item.allergens && item.allergens.length > 0 && (
                <div className="flex items-start gap-1.5 text-amber-900">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Allergen Notice:</span> Contains{' '}
                    {item.allergens.join(', ')}.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Special Preparation Instructions Input */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Chef Instructions (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g., Less spicy, no onion-garlic, extra lemons..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-300 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
            />
          </div>

          {/* Quantity Stepper & Add Action */}
          <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center transition-colors text-slate-600 font-bold"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-sm text-[#0B192C]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center transition-colors text-slate-600 font-bold"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!item.isAvailable}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#0B192C] to-[#152A4A] hover:from-[#152A4A] hover:to-[#0B192C] text-white border border-[#C5A059]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Room Tray</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#E6C280]" />
                  <span>Add to Room Tray • ₹{price * quantity}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
