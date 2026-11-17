import React from 'react';
import { MealFilter } from '../types/index.ts';
import { Utensils, Coffee, Sun, Moon, ShoppingBag, Layers } from 'lucide-react';

interface MealNavProps {
  activeMeal: MealFilter;
  onSelectMeal: (meal: MealFilter) => void;
}

export const MealNav: React.FC<MealNavProps> = ({ activeMeal, onSelectMeal }) => {
  const mealTabs: { id: MealFilter; label: string; timing: string; icon: React.ReactNode }[] = [
    {
      id: 'all',
      label: 'All Day Menu',
      timing: 'Full Culinary Selection',
      icon: <Utensils className="w-4 h-4" />
    },
    {
      id: 'breakfast',
      label: 'Breakfast Service',
      timing: '7:00 AM – 10:30 AM',
      icon: <Coffee className="w-4 h-4 text-amber-500" />
    },
    {
      id: 'lunch',
      label: 'Lunch Service',
      timing: '12:30 PM – 3:00 PM',
      icon: <Sun className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 'dinner',
      label: 'Dinner Service',
      timing: '7:30 PM – 11:00 PM',
      icon: <Moon className="w-4 h-4 text-indigo-500" />
    },
    {
      id: 'buffet',
      label: 'Buffet Menus',
      timing: 'Live Stations & Feasts',
      icon: <Layers className="w-4 h-4 text-[#C5A059]" />
    },
    {
      id: 'room-service',
      label: 'In-Room Dining',
      timing: 'Express to Suite',
      icon: <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
    }
  ];

  return (
    <div className="w-full my-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
        {mealTabs.map((tab) => {
          const isActive = activeMeal === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectMeal(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 shadow-xs border ${
                isActive
                  ? 'bg-[#0B192C] text-white border-[#C5A059] shadow-md ring-2 ring-[#C5A059]/20'
                  : 'bg-white text-[#4A4E51] border-[#E2D7C3] hover:border-[#C5A059] hover:bg-[#FAF6EE]'
              }`}
            >
              <span>{tab.icon}</span>
              <div className="flex flex-col text-left">
                <span className={`leading-none ${isActive ? 'text-white' : 'text-[#0B192C]'}`}>
                  {tab.label}
                </span>
                <span className={`text-[10px] font-normal mt-0.5 ${isActive ? 'text-[#E6C280]' : 'text-slate-400'}`}>
                  {tab.timing}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
