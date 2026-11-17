import type { MenuItem, BuffetMenu, RestaurantSettings, OrderRecord } from '../types/index.ts';
import { INITIAL_MENU_ITEMS, INITIAL_SETTINGS } from '../data/initialMenu.ts';
import { INITIAL_BUFFET_MENUS } from '../data/buffetData.ts';

const STORAGE_KEYS = {
  MENU_ITEMS: 'le_boulevard_menu_items_v2',
  SETTINGS: 'le_boulevard_settings_v2',
  BUFFETS: 'le_boulevard_buffets_v2',
  ORDERS: 'le_boulevard_orders_v2',
  ADMIN_TOKEN: 'le_boulevard_admin_token'
};

// Helper to get from local storage with fallback
function getLocal<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving ${key} to localStorage`, e);
  }
}

// Initialize storage if empty
export function initLocalStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) {
    setLocal(STORAGE_KEYS.MENU_ITEMS, INITIAL_MENU_ITEMS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    setLocal(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BUFFETS)) {
    setLocal(STORAGE_KEYS.BUFFETS, INITIAL_BUFFET_MENUS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    setLocal(STORAGE_KEYS.ORDERS, []);
  }
}

// Menu Items API
export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const res = await fetch('/api/menu');
    if (res.ok) {
      const data = await res.json();
      setLocal(STORAGE_KEYS.MENU_ITEMS, data);
      return data;
    }
  } catch (e) {
    // Backend API offline or static mode: fall back to local storage
  }
  return getLocal<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, INITIAL_MENU_ITEMS);
}

export async function saveMenuItem(item: MenuItem): Promise<MenuItem> {
  const current = getLocal<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, INITIAL_MENU_ITEMS);
  const index = current.findIndex(m => m.id === item.id);
  let updated: MenuItem[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = item;
  } else {
    updated = [item, ...current];
  }

  setLocal(STORAGE_KEYS.MENU_ITEMS, updated);

  try {
    await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
  } catch (e) {
    // Backend offline
  }

  return item;
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  const current = getLocal<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, INITIAL_MENU_ITEMS);
  const updated = current.filter(m => m.id !== id);
  setLocal(STORAGE_KEYS.MENU_ITEMS, updated);

  try {
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
  } catch (e) {
    // Backend offline
  }
  return true;
}

export async function toggleItemAvailability(id: string, isAvailable: boolean): Promise<boolean> {
  const current = getLocal<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, INITIAL_MENU_ITEMS);
  const updated = current.map(m => m.id === id ? { ...m, isAvailable } : m);
  setLocal(STORAGE_KEYS.MENU_ITEMS, updated);

  try {
    await fetch(`/api/menu/${id}/availability`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable })
    });
  } catch (e) {
    // Backend offline
  }
  return true;
}

// Settings API
export async function fetchSettings(): Promise<RestaurantSettings> {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      const data = await res.json();
      setLocal(STORAGE_KEYS.SETTINGS, data);
      return data;
    }
  } catch (e) {
    // Fall back to local storage
  }
  return getLocal<RestaurantSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
}

export async function saveSettings(settings: RestaurantSettings): Promise<RestaurantSettings> {
  setLocal(STORAGE_KEYS.SETTINGS, settings);
  try {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
  } catch (e) {
    // Backend offline
  }
  return settings;
}

// Buffets API
export async function fetchBuffets(): Promise<BuffetMenu[]> {
  try {
    const res = await fetch('/api/buffets');
    if (res.ok) {
      const data = await res.json();
      setLocal(STORAGE_KEYS.BUFFETS, data);
      return data;
    }
  } catch (e) {
    // Fall back to local storage
  }
  return getLocal<BuffetMenu[]>(STORAGE_KEYS.BUFFETS, INITIAL_BUFFET_MENUS);
}

export async function saveBuffetMenu(menu: BuffetMenu): Promise<BuffetMenu> {
  const current = getLocal<BuffetMenu[]>(STORAGE_KEYS.BUFFETS, INITIAL_BUFFET_MENUS);
  const index = current.findIndex(b => b.id === menu.id);
  let updated: BuffetMenu[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = menu;
  } else {
    updated = [menu, ...current];
  }
  setLocal(STORAGE_KEYS.BUFFETS, updated);

  try {
    await fetch('/api/buffets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menu)
    });
  } catch (e) {
    // Backend offline
  }
  return menu;
}

// Orders API
export async function fetchOrders(): Promise<OrderRecord[]> {
  try {
    const res = await fetch('/api/orders');
    if (res.ok) {
      const data = await res.json();
      setLocal(STORAGE_KEYS.ORDERS, data);
      return data;
    }
  } catch (e) {
    // Fall back
  }
  return getLocal<OrderRecord[]>(STORAGE_KEYS.ORDERS, []);
}

export async function submitOrder(order: Omit<OrderRecord, 'id' | 'createdAt' | 'status'>): Promise<OrderRecord> {
  const fullOrder: OrderRecord = {
    ...order,
    id: `LB-${Date.now().toString().slice(-6)}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  const current = getLocal<OrderRecord[]>(STORAGE_KEYS.ORDERS, []);
  const updated = [fullOrder, ...current];
  setLocal(STORAGE_KEYS.ORDERS, updated);

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullOrder)
    });
    if (res.ok) {
      const saved = await res.json();
      return saved;
    }
  } catch (e) {
    // Backend offline
  }

  return fullOrder;
}

export async function updateOrderStatus(orderId: string, status: OrderRecord['status']): Promise<boolean> {
  const current = getLocal<OrderRecord[]>(STORAGE_KEYS.ORDERS, []);
  const updated = current.map(o => o.id === orderId ? { ...o, status } : o);
  setLocal(STORAGE_KEYS.ORDERS, updated);

  try {
    await fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  } catch (e) {
    // Backend offline
  }
  return true;
}

// Admin Authentication
export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) === 'admin-authenticated-session-token';
}

export function setAdminAuth(token: string | null): void {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  }
}
