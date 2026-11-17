export interface HotelStory {
  name: string;
  resortName: string;
  tagline: string;
  story: string[];
  features: { icon: string; title: string; description: string }[];
  timings: { meal: string; hours: string; service: string }[];
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmarks: string[];
    phone: string;
    whatsapp: string;
    email: string;
    googleMapsUrl: string;
  };
}

export const HOTEL_INFO: HotelStory = {
  name: 'Le Boulevard',
  resortName: 'Hotel Atithi - TGI Grand',
  tagline: 'A Premium Dining Experience by the Sea',
  story: [
    'Nestled in the historic heart of Puducherry on S.V. Patel Salai, Le Boulevard at Hotel Atithi - TGI Grand is a culinary sanctuary where French colonial elegance meets the vibrant, spice-scented heritage of coastal Coromandel.',
    'Our master chefs craft each dish with respect for coastal traditions—bringing you sea-fresh Bay of Bengal catches, aromatic Seeraga Samba Thokku biryanis, authentic Chettinad pepper delicacies, and delicate French pastries.',
    'Whether you are waking up to our sunrise breakfast buffet, enjoying an intimate candlelit dinner with live grills, or having express gourmet room service delivered to your suite, every dining moment at Le Boulevard is steeped in genuine South Indian warmth and five-star luxury.'
  ],
  features: [
    {
      icon: 'Waves',
      title: 'Fresh Bay of Bengal Catch',
      description: 'Sourced daily from Puducherry and Cuddalore fishing harbours, seared with fresh coastal herbs and spices.'
    },
    {
      icon: 'Sparkles',
      title: 'French Creole Heritage',
      description: 'Signature fusion dishes honoring Pondicherry’s historical French quarter, blending European techniques with Tamil spices.'
    },
    {
      icon: 'Award',
      title: 'Five-Star Master Chefs',
      description: 'Crafted under the culinary direction of seasoned executive chefs dedicated to uncompromised flavor and hygienic perfection.'
    },
    {
      icon: 'Clock',
      title: '24/7 Room Service & Dining',
      description: 'Gourmet dining served directly to hotel suites and private dining cabanas with prompt, attentive hospitality.'
    }
  ],
  timings: [
    { meal: 'Grand Breakfast Buffet', hours: '7:00 AM – 10:30 AM', service: 'Live dosas, eggs, south Indian spread, bakery & fresh fruits' },
    { meal: 'All-Day Snacks & Refreshments', hours: '11:00 AM – 11:00 PM', service: 'Artisanal sandwiches, fries, milkshakes, tea & filter coffee' },
    { meal: 'Executive Lunch Service', hours: '12:30 PM – 3:00 PM', service: 'Full à la carte menu, fresh seafood, Thokku biryani & buffet' },
    { meal: 'Royal Dinner & Grills', hours: '7:30 PM – 11:00 PM', service: 'Tandoori grills, Chinese specialties, curries & desserts' },
    { meal: 'In-Room Dining (Room Service)', hours: 'Available 24 Hours', service: 'Express suite delivery with priority room folio billing' }
  ],
  location: {
    address: '126, S.V. Patel Salai, Heritage Town',
    city: 'Puducherry',
    state: 'Puducherry',
    pincode: '605001',
    landmarks: ['Walking distance from Promenade Beach & Rock Beach', 'Near Sri Aurobindo Ashram & French Quarter', 'Minutes from Pondicherry Heritage Railway Station'],
    phone: '+91 413 2211111',
    whatsapp: '+91 93600 00000',
    email: 'dining@atithipondicherry.com',
    googleMapsUrl: 'https://maps.google.com/?q=Hotel+Atithi+Puducherry'
  }
};
