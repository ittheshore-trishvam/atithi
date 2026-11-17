import React, { useState } from 'react';
import { BrandLogo } from '../BrandLogo';
import { MenuManager } from './MenuManager';
import { MealScheduleManager } from './MealScheduleManager';
import { OrdersManager } from './OrdersManager';
import { SettingsManager } from './SettingsManager';
import { 
  UtensilsCrossed, 
  Layers, 
  ShoppingBag, 
  Settings as SettingsIcon, 
  LogOut, 
  X, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { MenuItem, BuffetMenu, RestaurantSettings, OrderRecord } from '../../types/index.ts';
import { setAdminAuth } from '../../services/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  buffetMenus: BuffetMenu[];
  settings: RestaurantSettings;
  orders: OrderRecord[];
  onRefreshAll: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  items,
  buffetMenus,
  settings,
  orders,
  onRefreshAll,
  onLogout
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'menu' | 'buffets' | 'orders' | 'settings'>('menu');

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const inStockCount = items.filter(i => i.isAvailable).length;
  const outOfStockCount = items.length - inStockCount;

  const handleSignOut = () => {
    setAdminAuth(null);
    onLogout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-2 sm:p-4">
      <div 
        className="relative w-full max-w-6xl h-[95vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#C5A059]/40 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0B192C] via-[#152A4A] to-[#070F1A] text-white flex items-center justify-between border-b border-[#C5A059]/30 shrink-0">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" variant="light" showSubtitle={false} />
            <div className="border-l border-white/20 pl-3">
              <h2 className="font-serif font-bold text-base sm:text-lg text-white">
                F&B Management Portal
              </h2>
              <p className="text-[10px] text-[#E6C280] tracking-wider uppercase">
                Hotel Atithi — TGI Grand
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSignOut}
              className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Quick Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-white border-b border-slate-200 shrink-0 text-xs">
          <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#C5A059]/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Dishes</span>
              <strong className="text-sm font-bold text-[#0B192C]">{items.length} Items</strong>
            </div>
            <UtensilsCrossed className="w-4 h-4 text-[#C5A059]" />
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-emerald-700 block uppercase font-bold">Active in Menu</span>
              <strong className="text-sm font-bold text-emerald-800">{inStockCount} In Stock</strong>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-rose-700 block uppercase font-bold">Sold Out / Pause</span>
              <strong className="text-sm font-bold text-rose-800">{outOfStockCount} Dishes</strong>
            </div>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-blue-700 block uppercase font-bold">Room Service Queue</span>
              <strong className="text-sm font-bold text-blue-800">{pendingOrdersCount} Pending</strong>
            </div>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 pt-3 bg-[#FAF8F5] border-b border-slate-200 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-t border-x cursor-pointer ${
              activeTab === 'menu'
                ? 'bg-white text-[#0B192C] border-slate-200 border-b-transparent shadow-xs'
                : 'text-slate-600 border-transparent hover:text-[#0B192C]'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 text-[#C5A059]" />
            <span>Menu Items ({items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('buffets')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-t border-x cursor-pointer ${
              activeTab === 'buffets'
                ? 'bg-white text-[#0B192C] border-slate-200 border-b-transparent shadow-xs'
                : 'text-slate-600 border-transparent hover:text-[#0B192C]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#C5A059]" />
            <span>Buffet Schedules ({buffetMenus.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-t border-x cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-[#0B192C] border-slate-200 border-b-transparent shadow-xs'
                : 'text-slate-600 border-transparent hover:text-[#0B192C]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            <span>In-Room Orders ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-t border-x cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white text-[#0B192C] border-slate-200 border-b-transparent shadow-xs'
                : 'text-slate-600 border-transparent hover:text-[#0B192C]'
            }`}
          >
            <SettingsIcon className="w-4 h-4 text-[#C5A059]" />
            <span>Tax Notice & Settings</span>
          </button>
        </div>

        {/* Tab Body View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'menu' && (
            <MenuManager items={items} onRefresh={onRefreshAll} />
          )}

          {activeTab === 'buffets' && (
            <MealScheduleManager buffetMenus={buffetMenus} onRefresh={onRefreshAll} />
          )}

          {activeTab === 'orders' && (
            <OrdersManager orders={orders} onRefresh={onRefreshAll} />
          )}

          {activeTab === 'settings' && (
            <SettingsManager settings={settings} onRefresh={onRefreshAll} />
          )}
        </div>
      </div>
    </div>
  );
};
