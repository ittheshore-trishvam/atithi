import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface DietaryBadgeProps {
  isVeg: boolean;
  isEgg?: boolean;
  isVegan?: boolean;
  size?: 'sm' | 'md';
}

export const DietaryIcon: React.FC<DietaryBadgeProps> = ({ isVeg, isEgg = false, size = 'sm' }) => {
  const boxSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  if (isVeg) {
    return (
      <div 
        className={`${boxSize} border-[1.5px] border-emerald-600 rounded-sm flex items-center justify-center p-0.5 bg-white shrink-0 shadow-xs`}
        title="Vegetarian"
        aria-label="Vegetarian"
      >
        <div className={`${dotSize} rounded-full bg-emerald-600`}></div>
      </div>
    );
  }

  if (isEgg) {
    return (
      <div 
        className={`${boxSize} border-[1.5px] border-amber-600 rounded-sm flex items-center justify-center p-0.5 bg-white shrink-0 shadow-xs`}
        title="Contains Egg"
        aria-label="Contains Egg"
      >
        <div className={`${dotSize} rounded-full bg-amber-600`}></div>
      </div>
    );
  }

  // Non-Veg
  return (
    <div 
      className={`${boxSize} border-[1.5px] border-rose-700 rounded-sm flex items-center justify-center p-0.5 bg-white shrink-0 shadow-xs`}
      title="Non-Vegetarian"
      aria-label="Non-Vegetarian"
    >
      <div className={`${dotSize} rounded-full bg-rose-700`}></div>
    </div>
  );
};

export const SpicyMeter: React.FC<{ level?: 'none' | 'mild' | 'medium' | 'spicy' }> = ({ level = 'none' }) => {
  if (!level || level === 'none') return null;

  const count = level === 'mild' ? 1 : level === 'medium' ? 2 : 3;
  const label = level === 'mild' ? 'Mildly Spiced' : level === 'medium' ? 'Medium Spiced' : 'Fiery Chef Spice';

  return (
    <div className="inline-flex items-center gap-0.5 text-rose-500" title={label}>
      {Array.from({ length: count }).map((_, i) => (
        <Flame key={i} className="w-3.5 h-3.5 fill-rose-500" />
      ))}
      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 ml-0.5">
        {level}
      </span>
    </div>
  );
};

export const ChefSpecialBadge: React.FC<{ isChefSpecial?: boolean; isBestseller?: boolean }> = ({
  isChefSpecial,
  isBestseller
}) => {
  if (!isChefSpecial && !isBestseller) return null;

  if (isChefSpecial) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF6EE] text-[#9A7730] border border-[#C5A059]/40">
        <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
        Chef’s Signature
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-300">
      ★ Guest Bestseller
    </span>
  );
};
