import type { BuffetMenu } from '../types/index.ts';

export const INITIAL_BUFFET_MENUS: BuffetMenu[] = [
  {
    id: 'buffet-bf-01',
    title: 'Grand Coastal Sunrise Breakfast Buffet',
    mealType: 'breakfast',
    serviceDate: 'Daily Service',
    timings: '7:00 AM – 10:30 AM',
    priceAdult: 550,
    priceChild: 350,
    isPublished: true,
    sections: [
      {
        title: 'Live Counters',
        items: [
          { name: 'Live Dosa Station (Plain, Ghee Roast, Masala, Egg Dosa)', isVeg: true, description: 'Prepared à la minute with fresh organic churned ghee' },
          { name: 'Live Eggs Station (Omelettes, Scrambled, Sunny Side Up, French Toast)', isVeg: false, description: 'Farm fresh country eggs cooked to your preference' },
          { name: 'Live Poori & Bhatura Counter with Pindi Chole', isVeg: true, description: 'Puffed golden hot' }
        ]
      },
      {
        title: 'South Indian Specialties',
        items: [
          { name: 'Steamed Mallipoo Idli with 3 Chutneys & Drumstick Sambar', isVeg: true },
          { name: 'Medu Vada crisp & piping hot', isVeg: true },
          { name: 'Ven Pongal with Cashews & Ghee', isVeg: true },
          { name: 'Rava Kichadi with Country Vegetables', isVeg: true }
        ]
      },
      {
        title: 'Continental & Baker’s Basket',
        items: [
          { name: 'Freshly Baked Croissants, Danishes & Pain au Chocolat', isVeg: true },
          { name: 'Toasted Artisanal Multigrain & Brioche Breads with Butter & Preserves', isVeg: true },
          { name: 'Baked Beans in Herbed Tomato Coulis', isVeg: true },
          { name: 'Grilled Herb Chicken Sausages', isVeg: false }
        ]
      },
      {
        title: 'Fresh Fruits & Juices',
        items: [
          { name: 'Freshly Squeezed Valencia Orange & Watermelon Juice', isVeg: true },
          { name: 'Cut Tropical Fruit Platter (Papaya, Melon, Pineapple, Banana)', isVeg: true },
          { name: 'Greek Yogurt with Granola, Wild Honey & Dried Nuts', isVeg: true }
        ]
      },
      {
        title: 'Morning Brews',
        items: [
          { name: 'Puducherry Degree Filter Coffee', isVeg: true },
          { name: 'Masala Chai & English Breakfast Tea', isVeg: true }
        ]
      }
    ]
  },
  {
    id: 'buffet-lunch-01',
    title: 'The Bay of Bengal Executive Lunch Buffet',
    mealType: 'lunch',
    serviceDate: 'Daily Service',
    timings: '12:30 PM – 3:30 PM',
    priceAdult: 850,
    priceChild: 500,
    isPublished: true,
    sections: [
      {
        title: 'Soup & Broth',
        items: [
          { name: 'Cream of Field Mushroom Soup with Croutons', isVeg: true },
          { name: 'Nattu Kozhi Chettinad Chicken Shorba', isVeg: false }
        ]
      },
      {
        title: 'Salad & Chaat Bar',
        items: [
          { name: 'Sprout & Raw Mango Peanut Chaat', isVeg: true },
          { name: 'Mediterranean Herb Tossed Caesar Salad', isVeg: true },
          { name: 'Cold Smoked Chicken & Bell Pepper Salad', isVeg: false },
          { name: 'Cucumber & Mint Raita, House Pickles, Chutneys & Papads', isVeg: true }
        ]
      },
      {
        title: 'Live Tandoor & Chaat Counter',
        items: [
          { name: 'Hot Tandoori Makhmali Paneer Tikka & Banjara Murgh Kebab', isVeg: false, description: 'Smoked over live coals and served straight to your table' },
          { name: 'Assorted Freshly Baked Indian Breads (Naan, Roti, Kulcha)', isVeg: true }
        ]
      },
      {
        title: 'Vegetarian Main Courses',
        items: [
          { name: 'Paneer Butter Masala', isVeg: true },
          { name: 'Subji Shabnam with Babycorn & Green Peas', isVeg: true },
          { name: 'Dal Tadka with Pure Ghee Tempering', isVeg: true },
          { name: 'Aloo Jeera with Roasted Spices', isVeg: true }
        ]
      },
      {
        title: 'Non-Vegetarian Main Courses',
        items: [
          { name: 'Pondicherry Era Manga Thokku (Prawns in Raw Mango Curry)', isVeg: false },
          { name: 'Murgh Makhani (Butter Chicken Masala)', isVeg: false },
          { name: 'Chettinad Meen Kozhambu (Coastal Fish Curry)', isVeg: false }
        ]
      },
      {
        title: 'Rice & Biryani Station',
        items: [
          { name: 'Dum Chicken Seeraga Samba Biryani', isVeg: false },
          { name: 'Steamed Basmati Rice & Jeera Pulao', isVeg: true },
          { name: 'Creamy Curd Rice with Pomegranate', isVeg: true }
        ]
      },
      {
        title: 'Grand Dessert Spread',
        items: [
          { name: 'French Caramel Custard', isVeg: false },
          { name: 'Royal Kesari Rasmalai', isVeg: true },
          { name: 'Hot Gulab Jamun with Rabdi', isVeg: true },
          { name: 'Warm Walnut Brownie with Ice Cream', isVeg: true },
          { name: 'Assorted Gourmet Pastries & Fresh Fruit Cuts', isVeg: true }
        ]
      }
    ]
  },
  {
    id: 'buffet-dinner-01',
    title: 'Le Boulevard Royal Seafood & Creole Candlelight Dinner Buffet',
    mealType: 'dinner',
    serviceDate: 'Daily Service',
    timings: '7:30 PM – 10:45 PM',
    priceAdult: 950,
    priceChild: 550,
    isPublished: true,
    sections: [
      {
        title: 'Soup & Broth',
        items: [
          { name: 'French Velouté with Garlic Brioche Croutons', isVeg: true },
          { name: 'Coastal Bay Prawn & Crab Bouillabaisse', isVeg: false }
        ]
      },
      {
        title: 'Live Coastal Grills & Live Pasta',
        items: [
          { name: 'Creole Catch of the Day (Seared Fish Fillets & Calamari with Lemon Butter)', isVeg: false },
          { name: 'Live Pasta Bar: Penne & Spaghetti in Arrabbiata, Alfredo & Pesto', isVeg: true },
          { name: 'Charcoal Smoked Chicken Chooza & Jinga Ajwaini', isVeg: false }
        ]
      },
      {
        title: 'Vegetarian Delicacies',
        items: [
          { name: 'Multan Stuffed Paneer Masala', isVeg: true },
          { name: 'Mushroom & Cashew Korma', isVeg: true },
          { name: 'Dal Maharani slow-cooked overnight', isVeg: true },
          { name: 'Tandoori Roti, Garlic Naan & Lachha Paratha', isVeg: true }
        ]
      },
      {
        title: 'Non-Vegetarian Specialties',
        items: [
          { name: 'Coastal Mutton Milagu Sukka Curry', isVeg: false },
          { name: 'Tandoori Murgh Masala in Roasted Onion Gravy', isVeg: false },
          { name: 'Fresh Catch Mangalorean Fish Curry', isVeg: false }
        ]
      },
      {
        title: 'Gourmet Desserts & French Confectionery',
        items: [
          { name: 'Belgian Chocolate Truffle Torte', isVeg: true },
          { name: 'Classic Crème Brûlée & Caramel Custard', isVeg: false },
          { name: 'Rich Gajar ka Halwa with Mawa', isVeg: true },
          { name: 'Artisan Gelato & Ice Cream Cart (4 Flavors)', isVeg: true }
        ]
      }
    ]
  }
];
