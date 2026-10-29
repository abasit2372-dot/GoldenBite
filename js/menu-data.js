// Golden Bite Pizza Hut - Official Menu Data with Exact Menu Card Prices
const RESTAURANT_INFO = {
  name: "Golden Bite Pizza Hut",
  tagline: "Fresh, Crispy & Delicious Fast Food",
  urduAddress: "۳۰ فٹ بازار نشاط آباد، نزد نشاط مل کالونی گیٹ، فیصل آباد",
  address: "30 Feet Bazar Nishatabad, Near Nishat Mill Colony Gate, Faisalabad",
  googleMapsQuery: "Golden Bite pizza Hut, Nishatabad Faisalabad",
  googleMapsUrl: "https://maps.app.goo.gl/XZqLBqXobswUaSFZ8",
  latitude: 31.4584441,
  longitude: 73.113898,
  timings: "2:00 PM to 2:00 AM",
  openHour: 14, // 2 PM
  closeHour: 2, // 2 AM (next day)
  whatsappNumber: "923211345410", // 0321-1345410
  phoneNumbers: ["0321-1345410", "0302-0640556", "0303-7422473"],
  currency: "Rs.",
  deliveryFee: 0, // Free Home Delivery
  minOrder: 0
};

const CATEGORIES = [
  { id: "deals", name: "Golden Deals", badge: "Special" },
  { id: "regular-pizza", name: "Regular Pizza" },
  { id: "special-pizza", name: "Special Pizza" },
  { id: "square-pizza", name: "Square & Platters" },
  { id: "burgers", name: "Burger Deals" },
  { id: "shawarma", name: "Shawarma & Paratha" },
  { id: "pasta", name: "Pasta" },
  { id: "sides", name: "Wings & Fries" },
  { id: "beverages", name: "Chilled Drinks" }
];

const MENU_ITEMS = [
  // ================= 1. GOLDEN DEALS (From Flyer) =================
  {
    id: "deal-1",
    name: "Golden Deal 1",
    category: "deals",
    price: 899,
    description: "1 Medium Pizza + 1 Half Pasta + 1x 350ml Chilled Drink",
    badge: "Hot Deal",
    image: "assets/images/deals/deal_1.jpg",
    items: ["1 Medium Pizza", "1 Half Pasta", "1x 350ml Chilled Drink"]
  },
  {
    id: "deal-2",
    name: "Golden Deal 2",
    category: "deals",
    price: 1099,
    description: "2 Small Pizza + 2 Chicken Shawarma + 1 Litre Chilled Drink",
    badge: "Popular",
    image: "assets/images/deals/deal_2.jpg",
    items: ["2 Small Pizza", "2 Chicken Shawarma", "1 Litre Chilled Drink"]
  },
  {
    id: "deal-3",
    name: "Golden Deal 3",
    category: "deals",
    price: 999,
    description: "1 Large Pizza + 1 Litre Chilled Drink",
    badge: "Solo Feast",
    image: "assets/images/deals/deal_3.jpg",
    items: ["1 Large Pizza", "1 Litre Chilled Drink"]
  },
  {
    id: "deal-4",
    name: "Golden Deal 4",
    category: "deals",
    price: 2450,
    description: "1 XL Pizza + 1 Small Pizza + 2 Zinger Burgers + 1.5 Litre Drink",
    badge: "Best Value",
    image: "assets/images/deals/deal_4.jpg",
    items: ["1 XL Pizza", "1 Small Pizza", "2 Zinger Burgers", "1.5 Litre Chilled Drink"]
  },
  {
    id: "deal-5",
    name: "Golden Deal 5",
    category: "deals",
    price: 1800,
    description: "2 Large Pizza + 1.5 Litre Chilled Drink",
    badge: "Pizza Lover",
    image: "assets/images/deals/deal_5.jpg",
    items: ["2 Large Pizza", "1.5 Litre Chilled Drink"]
  },
  {
    id: "deal-6",
    name: "Golden Deal 6",
    category: "deals",
    price: 1499,
    description: "2 Medium Pizza + 5 Hot Wings + 1 Litre Chilled Drink",
    badge: "Spicy Combo",
    image: "assets/images/deals/deal_6.jpg",
    items: ["2 Medium Pizza", "5 Hot Wings", "1 Litre Chilled Drink"]
  },
  {
    id: "deal-7",
    name: "Golden Deal 7",
    category: "deals",
    price: 2699,
    description: "3 Large Pizza + 1.5 Litre Chilled Drink",
    badge: "Mega Party",
    image: "assets/images/deals/deal_7.jpg",
    items: ["3 Large Pizza", "1.5 Litre Chilled Drink"]
  },
  {
    id: "deal-8",
    name: "Golden Deal 8",
    category: "deals",
    price: 1499,
    description: "1 Large Behari Pizza + 1 F1 Pasta + 1x 500ml Drink",
    badge: "Chef Special",
    image: "assets/images/deals/deal_8.jpg",
    items: ["1 Large Behari Pizza", "1 F1 Pasta", "1x 500ml Drink"]
  },
  {
    id: "deal-9",
    name: "Golden Deal 9",
    category: "deals",
    price: 920,
    description: "1 Zinger Burger + 1 Small Pizza + 1 F1 Pasta + 1x 500ml Drink",
    badge: "Super Combo",
    image: "assets/images/deals/deal_9.jpg",
    items: ["1 Zinger Burger", "1 Small Pizza", "1 F1 Pasta", "1x 500ml Drink"]
  },

  // ================= 2. REGULAR PIZZA (Exact Prices: S: 350, M: 599, L: 900, XL: 1500) =================
  {
    id: "reg-tikka",
    name: "Chicken Tikka Pizza",
    category: "regular-pizza",
    price: 599,
    description: "Traditional spicy tikka boti, fresh onions, bell peppers and 100% mozzarella cheese.",
    variants: [
      { name: "Small", price: 350 },
      { name: "Medium", price: 599 },
      { name: "Large", price: 900 },
      { name: "XL", price: 1500 }
    ],
    badge: "Top Seller",
    image: "assets/menu pics/4001.png"
  },
  {
    id: "reg-fajita",
    name: "Chicken Fajita Pizza",
    category: "regular-pizza",
    price: 599,
    description: "Tender Mexican fajita chicken chunks, sweet bell peppers, onions and mozzarella blend.",
    variants: [
      { name: "Small", price: 350 },
      { name: "Medium", price: 599 },
      { name: "Large", price: 900 },
      { name: "XL", price: 1500 }
    ],
    image: "assets/menu pics/4004.png"
  },
  {
    id: "reg-supreme",
    name: "Chicken Supreme Pizza",
    category: "regular-pizza",
    price: 599,
    description: "Loaded combination of chicken chunks, black olives, sweet peppers, mushrooms & melted cheese.",
    variants: [
      { name: "Small", price: 350 },
      { name: "Medium", price: 599 },
      { name: "Large", price: 900 },
      { name: "XL", price: 1500 }
    ],
    image: "assets/menu pics/4002.png"
  },
  {
    id: "reg-bbq",
    name: "Chicken Bar BQ Pizza",
    category: "regular-pizza",
    price: 599,
    description: "Smoky BBQ chicken chunks drizzled with rich barbecue sauce and golden cheese.",
    variants: [
      { name: "Small", price: 350 },
      { name: "Medium", price: 599 },
      { name: "Large", price: 900 },
      { name: "XL", price: 1500 }
    ],
    image: "assets/menu pics/4008.png"
  },
  {
    id: "reg-hot-spicy",
    name: "Chicken Hot Spicy Pizza",
    category: "regular-pizza",
    price: 599,
    description: "Fiery spiced chicken, spicy red sauce, green chilies, jalapeños and mozzarella.",
    variants: [
      { name: "Small", price: 350 },
      { name: "Medium", price: 599 },
      { name: "Large", price: 900 },
      { name: "XL", price: 1500 }
    ],
    badge: "Spicy",
    image: "assets/menu pics/4003.png"
  },
  {
    id: "reg-cheese-lover",
    name: "Cheese Lover Pizza",
    category: "regular-pizza",
    price: 599,
    description: "Double layer of 100% pure gooey mozzarella and rich Italian marinara sauce.",
    variants: [
      { name: "Small", price: 350 },
      { name: "Medium", price: 599 },
      { name: "Large", price: 900 },
      { name: "XL", price: 1500 }
    ],
    image: "assets/menu pics/4005.png"
  },
  {
    id: "reg-veg",
    name: "Vegetarian Pizza",
    category: "regular-pizza",
    price: 599,
    description: "Fresh farm vegetables: sweet corn, crisp bell peppers, onions, tomatoes and black olives.",
    variants: [
      { name: "Small", price: 350 },
      { name: "Medium", price: 599 },
      { name: "Large", price: 900 },
      { name: "XL", price: 1500 }
    ],
    image: "assets/menu pics/4007.png"
  },

  // ================= 3. SPECIAL PIZZA (Exact Prices from Menu Card) =================
  {
    id: "spec-malai-boti",
    name: "Malai Boti Pizza",
    category: "special-pizza",
    price: 750,
    description: "Creamy tender malai chicken boti, garlic mayo drizzle, sweet bell peppers and mozzarella.",
    variants: [
      { name: "Small", price: 400 },
      { name: "Medium", price: 750 },
      { name: "Large", price: 1050 },
      { name: "XL", price: 1599 }
    ],
    badge: "Must Try",
    image: "assets/menu pics/4006.png"
  },
  {
    id: "spec-behari-kabab",
    name: "Behari Kabab Pizza",
    category: "special-pizza",
    price: 750,
    description: "Smoky spiced behari boti kebabs, crisp onion rings, jalapeños & signature savory sauce.",
    variants: [
      { name: "Medium", price: 750 },
      { name: "Large", price: 1100 },
      { name: "XL", price: 1699 }
    ],
    badge: "Special",
    image: "assets/menu pics/4009.png"
  },
  {
    id: "spec-kabab-stuffer",
    name: "Kabab Stuffer Pizza",
    category: "special-pizza",
    price: 750,
    description: "Crust stuffed with seekh kabab pieces, topped with chicken tikka chunks and rich cheese.",
    variants: [
      { name: "Medium", price: 750 },
      { name: "Large", price: 1199 },
      { name: "XL", price: 1749 }
    ],
    badge: "Stuffed",
    image: "assets/menu pics/4011.png"
  },
  {
    id: "spec-crown-crust",
    name: "Crown Crust Pizza",
    category: "special-pizza",
    price: 750,
    description: "Royal golden crown pockets filled with cream cheese, with spicy chicken tikka in center.",
    variants: [
      { name: "Medium", price: 750 },
      { name: "Large", price: 1199 },
      { name: "XL", price: 1899 }
    ],
    badge: "Royal",
    image: "assets/menu pics/4013.png"
  },
  {
    id: "spec-half-half",
    name: "Half Behari + Half Malai Boti Pizza",
    category: "special-pizza",
    price: 750,
    description: "The best of both worlds: half smoky Behari Kabab and half creamy rich Malai Boti.",
    variants: [
      { name: "Medium", price: 750 },
      { name: "Large", price: 1100 },
      { name: "XL", price: 1749 }
    ],
    badge: "2-in-1",
    image: "assets/menu pics/4014.png"
  },
  {
    id: "spec-cheese-stuffer",
    name: "Chicken Chees Stuffer Pizza",
    category: "special-pizza",
    price: 800,
    description: "Overflowing with cheese in crust and toppings, succulent grilled chicken and garlic butter.",
    variants: [
      { name: "Medium", price: 800 },
      { name: "Large", price: 1250 },
      { name: "XL", price: 1999 }
    ],
    badge: "Extra Cheesy",
    image: "assets/menu pics/4010.png"
  },

  // ================= 4. SQUARE PIZZA & PLATTERS =================
  {
    id: "square-pizza",
    name: "Square Pan Pizza",
    category: "square-pizza",
    price: 699,
    description: "Crispy-cornered thick crust square pizza loaded with chicken chunks, veggies and golden cheese.",
    variants: [
      { name: "Medium", price: 699 },
      { name: "Large", price: 1199 }
    ],
    badge: "Unique",
    image: "assets/menu pics/4015.png"
  },
  {
    id: "spin-roll",
    name: "Special Spin Roll",
    category: "square-pizza",
    price: 350,
    description: "Freshly baked golden pizza dough rolled with spiced chicken & melted mozzarella with dip sauce.",
    badge: "Signature",
    image: "assets/menu pics/4041.png"
  },
  {
    id: "sp-platter",
    name: "Golden Bite SP Platter",
    category: "square-pizza",
    price: 650,
    description: "2 Spin Roll + 6 Oven Baked Wings + Regular Fries + Dip Sauce.",
    badge: "Mega Feast",
    image: "assets/menu pics/4043.png"
  },

  // ================= 5. BURGER DEALS & SANDWICHES =================
  {
    id: "burger-patty",
    name: "Patty Burger",
    category: "burgers",
    price: 200,
    description: "Seasoned grilled chicken patty with fresh lettuce, mayo and toasted bun.",
    image: "assets/menu pics/4023.png"
  },
  {
    id: "burger-zinger",
    name: "Crispy Zinger Burger",
    category: "burgers",
    price: 280,
    description: "Extra crunchy spiced fried chicken fillet, fresh iceberg & spicy mayo in toasted sesame bun.",
    badge: "Crispy",
    image: "assets/menu pics/4024.png"
  },
  {
    id: "burger-tower",
    name: "Tower Burger",
    category: "burgers",
    price: 450,
    description: "Double crispy fillet layered with hash brown patty, cheese slice, lettuce & house special sauce.",
    badge: "Giant",
    image: "assets/menu pics/4025.png"
  },
  {
    id: "sandwich-club",
    name: "Grilled Club Sandwich",
    category: "burgers",
    price: 280,
    description: "Toasted triple-layer sandwich with seasoned chicken, egg, fresh greens, and mint mayo.",
    badge: "Special",
    image: "assets/menu pics/4042.png"
  },

  // ================= 6. SHAWARMA & PARATHA =================
  {
    id: "sh-zinger",
    name: "Zinger Shawarma",
    category: "shawarma",
    price: 230,
    description: "Crispy zinger chicken strips, pickles, garlic sauce in soft warm pita bread.",
    badge: "Popular",
    image: "assets/menu pics/4021.png"
  },
  {
    id: "sh-chicken-paratha",
    name: "Chicken Paratha Roll",
    category: "shawarma",
    price: 220,
    description: "Charcoal grilled tikka boti in crisp flaky paratha with green chutney and onions.",
    image: "assets/menu pics/4017.png"
  },
  {
    id: "sh-zinger-paratha",
    name: "Zinger Paratha Roll",
    category: "shawarma",
    price: 270,
    description: "Crunchy fried zinger chicken strips wrapped in golden crispy paratha with garlic mayo.",
    badge: "Best Seller",
    image: "assets/menu pics/4022.png"
  },
  {
    id: "sh-pizza-shawarma",
    name: "Pizza Shawarma",
    category: "shawarma",
    price: 250,
    description: "Grilled chicken, pizza sauce, mozzarella cheese and bell peppers toasted in pita bread.",
    image: "assets/menu pics/4016.png"
  },
  {
    id: "sh-malai-shawarma",
    name: "Malai Boti Shawarma",
    category: "shawarma",
    price: 230,
    description: "Tender malai chicken boti with special creamy tahini mayo in soft pita bread.",
    image: "assets/menu pics/4019.png"
  },
  {
    id: "sh-malai-paratha",
    name: "Malai Boti Paratha Roll",
    category: "shawarma",
    price: 270,
    description: "Juicy malai boti pieces wrapped in crisp golden fried paratha with garlic sauce.",
    image: "assets/menu pics/4020.png"
  },

  // ================= 7. PASTA (Exact Prices: Half & Full) =================
  {
    id: "pasta-special",
    name: "Special Pasta",
    category: "pasta",
    price: 300,
    description: "Rich creamy tomato sauce with grilled chicken, sweet peppers and oven-baked cheese crust.",
    variants: [
      { name: "Half", price: 300 },
      { name: "Full", price: 499 }
    ],
    badge: "House Favorite",
    image: "assets/menu pics/4026.png"
  },
  {
    id: "pasta-crunchy",
    name: "Crunchy Pasta",
    category: "pasta",
    price: 350,
    description: "Penne pasta topped with crunchy fried chicken bites and melted mozzarella sauce.",
    variants: [
      { name: "Half", price: 350 },
      { name: "Full", price: 550 }
    ],
    badge: "Crunchy",
    image: "assets/menu pics/4027.png"
  },
  {
    id: "pasta-flaming",
    name: "Flaming Pasta",
    category: "pasta",
    price: 300,
    description: "Spicy fiery red chili pasta with chicken chunks, jalapeños and melted cheese.",
    variants: [
      { name: "Half", price: 300 },
      { name: "Full", price: 499 }
    ],
    badge: "Spicy",
    image: "assets/menu pics/4028.png"
  },
  {
    id: "pasta-kababish",
    name: "Kababish Pasta",
    category: "pasta",
    price: 350,
    description: "Smoky kebab bites layered into creamy penne pasta with garlic herbs and mozzarella.",
    variants: [
      { name: "Half", price: 350 },
      { name: "Full", price: 550 }
    ],
    image: "assets/menu pics/4029.png"
  },

  // ================= 8. WINGS, NUGGETS & FRIES =================
  {
    id: "fries-plain",
    name: "Plain Salted / Masala Fries",
    category: "sides",
    price: 200,
    description: "Freshly cut golden crispy french fries with seasoning salt or chatpata masala.",
    variants: [
      { name: "Half", price: 200 },
      { name: "Full", price: 300 }
    ],
    image: "assets/menu pics/4030.png"
  },
  {
    id: "fries-loaded",
    name: "Loaded Cheesy Fries",
    category: "sides",
    price: 349,
    description: "Hot crispy fries smothered in melted cheddar cheese sauce, chicken chunks & jalapeños.",
    variants: [
      { name: "Half", price: 349 },
      { name: "Full", price: 499 }
    ],
    badge: "Best Seller",
    image: "assets/menu pics/4031.png"
  },
  {
    id: "fries-pizza",
    name: "Pizza Fries",
    category: "sides",
    price: 349,
    description: "Baked fries topped with pizza sauce, mozzarella cheese, chicken tikka and black olives.",
    variants: [
      { name: "Half", price: 349 },
      { name: "Full", price: 499 }
    ],
    badge: "Super Cheesy",
    image: "assets/menu pics/4032.png"
  },
  {
    id: "fries-mayo",
    name: "Garlic Mayo Fries",
    category: "sides",
    price: 200,
    description: "Crispy golden french fries drizzled generously with signature garlic mayonnaise.",
    variants: [
      { name: "Half", price: 200 },
      { name: "Full", price: 350 }
    ],
    image: "assets/menu pics/4033.png"
  },
  {
    id: "wings-crispy-5",
    name: "Crispy Wings (5 Pcs)",
    category: "sides",
    price: 300,
    description: "5 pieces of crispy golden fried chicken wings with garlic dipping sauce.",
    image: "assets/menu pics/4034.png"
  },
  {
    id: "wings-crispy-10",
    name: "Crispy Wings (10 Pcs)",
    category: "sides",
    price: 500,
    description: "10 pieces of extra crispy crunchy chicken wings served with dipping sauce.",
    badge: "Popular",
    image: "assets/menu pics/4035.png"
  },
  {
    id: "wings-baked-10",
    name: "Oven Baked Wings (10 Pcs)",
    category: "sides",
    price: 500,
    description: "10 pieces of juicy flame-roasted oven baked wings with spicy barbecue glaze.",
    badge: "Oven Baked",
    image: "assets/menu pics/4036.png"
  },
  {
    id: "nuggets-5",
    name: "Crispy Chicken Nuggets (5 Pcs)",
    category: "sides",
    price: 250,
    description: "5 pieces of tender golden chicken breast nuggets served with ketchup dip.",
    image: "assets/menu pics/4037.png"
  },
  {
    id: "nuggets-10",
    name: "Crispy Chicken Nuggets (10 Pcs)",
    category: "sides",
    price: 500,
    description: "10 pieces of crispy golden chicken nuggets, ideal for family snacking.",
    image: "assets/menu pics/4038.png"
  },
  {
    id: "dip-spicy-garlic",
    name: "Spicy Garlic Dipping Sauce",
    category: "sides",
    price: 60,
    description: "Signature rich creamy spicy garlic dip cup for pizzas, crusts & fries.",
    image: "assets/menu pics/4059.jpg"
  },

  // ================= 9. CHILLED BEVERAGES =================
  {
    id: "bev-500",
    name: "Cola Next / Soft Drink (500ml)",
    category: "beverages",
    price: 120,
    description: "500ml chilled bottle of refreshing Cola Next / Soft Drink.",
    image: "assets/menu pics/4044.png"
  },
  {
    id: "bev-1ltr",
    name: "Cola Next / Soft Drink (1 Litre)",
    category: "beverages",
    price: 170,
    description: "1 Litre chilled bottle of refreshing Cola Next / Soft Drink.",
    image: "assets/menu pics/4046.png"
  },
  {
    id: "bev-15ltr",
    name: "Cola Next / Soft Drink (1.5 Litre)",
    category: "beverages",
    price: 200,
    description: "1.5 Litre family size chilled Cola Next / Soft Drink.",
    image: "assets/menu pics/4046.png"
  },
  {
    id: "bev-2ltr",
    name: "Cola Next / Soft Drink (2 Litre)",
    category: "beverages",
    price: 230,
    description: "2 Litre jumbo size chilled Cola Next / Soft Drink.",
    image: "assets/menu pics/4047.png"
  }
];
