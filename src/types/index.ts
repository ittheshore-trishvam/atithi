export type MealFilter = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'room-service' | 'buffet';

export type CategoryId = 
  | 'snacks'
  | 'soups-salads'
  | 'starters'
  | 'main-course'
  | 'rice-noodles-pasta'
  | 'indian-bread'
  | 'desserts'
  | 'tea-coffee';

export interface DishVariant {
  name: string;
  price: number;
  isVeg?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  categoryTitle: string;
  price: number; // Pre-GST price in INR
  serviceTime: string;
  mealTypes: ('breakfast' | 'lunch' | 'dinner' | 'all-day' | 'room-service')[];
  isVeg: boolean;
  isEgg?: boolean;
  isVegan?: boolean;
  isSpicy?: 'none' | 'mild' | 'medium' | 'spicy';
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  isAvailable: boolean;
  description: string;
  image?: string;
  portionSize?: string;
  allergens?: string[];
  variants?: DishVariant[];
  choices?: string[];
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  serviceTime: string;
  iconName: string;
  description: string;
  count?: number;
}

export interface BuffetItem {
  name: string;
  isVeg: boolean;
  description?: string;
}

export interface BuffetSection {
  title: string;
  items: BuffetItem[];
}

export interface BuffetMenu {
  id: string;
  title: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  serviceDate: string;
  timings: string;
  priceAdult: number;
  priceChild: number;
  isPublished: boolean;
  sections: BuffetSection[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedVariant?: DishVariant;
  selectedChoice?: string;
  notes?: string;
}

export interface OrderRecord {
  id: string;
  guestName: string;
  roomNumber: string;
  phone: string;
  orderType: 'room-service' | 'table-dining';
  tableNumber?: string;
  items: {
    name: string;
    variantName?: string;
    choice?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    notes?: string;
  }[];
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'completed' | 'cancelled';
  createdAt: string;
  specialInstructions?: string;
}

export interface RestaurantSettings {
  restaurantName: string;
  parentProperty: string;
  subtitle: string;
  taxNotice: string;
  gstPercentage: number;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  qrCodeBaseUrl: string;
  announcement: string;
  isAnnouncementActive: boolean;
  roomServiceActive: boolean;
}
