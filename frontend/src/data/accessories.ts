// Nissan Genuine Accessories Data - Jammu Dealership
export interface Accessory {
  id: string;
  name: string;
  slug: string;
  category: AccessoryCategory;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  compatibleModels: string[];
  image: string;
  images?: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
}

export type AccessoryCategory = 
  | "exterior" 
  | "interior" 
  | "car-care"
  | "lifestyle"
  | "infotainment"
  | "safety-security"
  | "packages"
  | "health-hygiene";

export const accessoryCategories = [
  {
    id: "exterior",
    name: "Exterior",
    description: "Enhance your car's style and protection",
    icon: "car",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75",
    itemCount: 9,
  },
  {
    id: "interior",
    name: "Interior",
    description: "Premium comfort and convenience",
    icon: "sofa",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75",
    itemCount: 12,
  },
  {
    id: "car-care",
    name: "Car Care",
    description: "Keep your Nissan in pristine condition",
    icon: "sparkles",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&q=75",
    itemCount: 8,
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Accessories for every adventure",
    icon: "briefcase",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=75",
    itemCount: 6,
  },
  {
    id: "infotainment",
    name: "Infotainment",
    description: "Smart tech for modern driving",
    icon: "monitor",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
    itemCount: 7,
  },
  {
    id: "safety-security",
    name: "Safety and Security",
    description: "Advanced protection for you and your family",
    icon: "shield",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=75",
    itemCount: 10,
  },
  {
    id: "packages",
    name: "Packages",
    description: "Bundled accessories at great value",
    icon: "package",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=75",
    itemCount: 4,
  },
  {
    id: "health-hygiene",
    name: "Health and Hygiene",
    description: "Clean and healthy cabin environment",
    icon: "heart",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&q=75",
    itemCount: 5,
  },
];

export const accessories: Accessory[] = [
  // Exterior Accessories
  {
    id: "ext-000",
    name: "Bumper Protector",
    slug: "bumper-protector",
    category: "exterior",
    price: 2800,
    originalPrice: 3500,
    description: "Premium bumper protector to shield your car from minor bumps and scratches. Adds style while protecting.",
    features: [
      "High-impact resistant material",
      "Chrome accent finish",
      "Easy installation",
      "Perfect OEM fit",
      "Scratch protection"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail"],
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.6,
    reviewCount: 289,
  },
  {
    id: "ext-001",
    name: "Chrome Front Grille",
    slug: "chrome-front-grille",
    category: "exterior",
    price: 4500,
    originalPrice: 5500,
    description: "Premium chrome finish front grille that adds a sophisticated look to your Nissan. Easy installation with perfect fit.",
    features: [
      "High-grade chrome finish",
      "UV resistant coating",
      "Perfect OEM fit",
      "Easy bolt-on installation",
      "1 year warranty"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks"],
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "ext-002",
    name: "Roof Rails - Silver",
    slug: "roof-rails-silver",
    category: "exterior",
    price: 6800,
    originalPrice: 8000,
    description: "Aerodynamic silver roof rails for your adventure needs. Perfect for mounting roof boxes, bike carriers, and more.",
    features: [
      "Aircraft-grade aluminum",
      "50kg load capacity",
      "Aerodynamic design",
      "Anti-corrosion coating",
      "Universal mounting system"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail"],
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "ext-003",
    name: "Body Side Moulding",
    slug: "body-side-moulding",
    category: "exterior",
    price: 3200,
    description: "Protect your car doors from dings and scratches with stylish body side moulding.",
    features: [
      "Impact-resistant material",
      "Color-matched options",
      "3M adhesive backing",
      "Easy DIY installation",
      "Scratch protection"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=75",
    inStock: true,
    rating: 4.5,
    reviewCount: 234,
  },
  {
    id: "ext-004",
    name: "LED Fog Lamp Kit",
    slug: "led-fog-lamp-kit",
    category: "exterior",
    price: 7500,
    originalPrice: 9000,
    description: "High-intensity LED fog lamps for superior visibility in adverse weather conditions.",
    features: [
      "6000K white light",
      "IP67 waterproof rating",
      "50,000 hours lifespan",
      "Plug-and-play wiring",
      "DOT approved"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks"],
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "ext-005",
    name: "Rear Spoiler - Gloss Black",
    slug: "rear-spoiler-gloss-black",
    category: "exterior",
    price: 5500,
    description: "Sporty rear spoiler that improves aerodynamics and adds a dynamic look to your vehicle.",
    features: [
      "High-quality ABS plastic",
      "Gloss black finish",
      "Aerodynamic design",
      "Reduces drag coefficient",
      "Easy installation"
    ],
    compatibleModels: ["Nissan Magnite"],
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 67,
  },
  {
    id: "ext-006",
    name: "Alloy Wheels - 16 inch",
    slug: "alloy-wheels-16inch",
    category: "exterior",
    price: 32000,
    originalPrice: 38000,
    description: "Premium 16-inch alloy wheels with stunning design. Set of 4 wheels included.",
    features: [
      "16-inch diameter",
      "Lightweight aluminum alloy",
      "Corrosion resistant",
      "Improves fuel efficiency",
      "Set of 4 wheels"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 156,
  },
  {
    id: "ext-007",
    name: "Door Visor Set",
    slug: "door-visor-set",
    category: "exterior",
    price: 1800,
    originalPrice: 2200,
    description: "Premium door visors allow fresh air while keeping rain out. Set of 4 pieces.",
    features: [
      "Smoke-tinted acrylic",
      "3M adhesive tape",
      "Reduces wind noise",
      "Allows window ventilation",
      "Set of 4 visors"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=75",
    inStock: true,
    rating: 4.5,
    reviewCount: 423,
  },
  {
    id: "ext-008",
    name: "Body Graphics - Racing Stripes",
    slug: "body-graphics-racing",
    category: "exterior",
    price: 4500,
    description: "Premium vinyl body graphics with racing stripe design. Professional installation included.",
    features: [
      "High-quality vinyl",
      "UV resistant",
      "Removable without damage",
      "Multiple color options",
      "Professional fitting"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks"],
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.4,
    reviewCount: 89,
  },
  {
    id: "ext-009",
    name: "Wheel Covers - 15 inch",
    slug: "wheel-covers-15inch",
    category: "exterior",
    price: 2400,
    originalPrice: 3000,
    description: "Stylish wheel covers to enhance your car's appearance. Set of 4 covers.",
    features: [
      "15-inch size",
      "Durable ABS plastic",
      "Easy snap-on installation",
      "Chrome accents",
      "Set of 4 covers"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=75",
    inStock: true,
    rating: 4.3,
    reviewCount: 178,
  },
  {
    id: "ext-010",
    name: "Mud Flaps - Heavy Duty",
    slug: "mud-flaps-heavy-duty",
    category: "exterior",
    price: 1200,
    description: "Heavy-duty mud flaps to protect your car from road debris and mud splashes.",
    features: [
      "Heavy-duty rubber",
      "Universal fit design",
      "Easy bolt-on installation",
      "Front and rear set",
      "Weather resistant"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=75",
    inStock: true,
    rating: 4.5,
    reviewCount: 345,
  },
  {
    id: "ext-011",
    name: "Styling Body Kit - Complete",
    slug: "styling-body-kit-complete",
    category: "exterior",
    price: 45000,
    originalPrice: 55000,
    description: "Complete body kit including front lip, side skirts, and rear diffuser for aggressive styling.",
    features: [
      "Front lip spoiler",
      "Side skirts (pair)",
      "Rear diffuser",
      "High-quality ABS",
      "Professional installation"
    ],
    compatibleModels: ["Nissan Magnite"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 45,
  },

  // Interior Accessories
  {
    id: "int-001",
    name: "Premium 3D Floor Mats",
    slug: "premium-3d-floor-mats",
    category: "interior",
    price: 3500,
    originalPrice: 4200,
    description: "Custom-fit 3D floor mats with raised edges to protect your car's floor from dirt, water, and wear.",
    features: [
      "Custom fit for each model",
      "Raised edge design",
      "Anti-slip backing",
      "Waterproof material",
      "Easy to clean"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 456,
  },
  {
    id: "int-002",
    name: "Leather Seat Covers - Premium",
    slug: "leather-seat-covers-premium",
    category: "interior",
    price: 18500,
    originalPrice: 22000,
    description: "Luxurious genuine leather seat covers that transform your cabin with premium comfort and style.",
    features: [
      "Genuine leather material",
      "Custom stitching",
      "Airbag compatible",
      "Multiple color options",
      "5-year warranty"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 178,
  },
  {
    id: "int-003",
    name: "Ambient Lighting Kit",
    slug: "ambient-lighting-kit",
    category: "interior",
    price: 4500,
    description: "RGB ambient lighting kit with 64 colors to create the perfect mood inside your car.",
    features: [
      "64 color options",
      "App controlled",
      "Music sync mode",
      "Easy installation",
      "Low power consumption"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&q=75",
    inStock: true,
    rating: 4.6,
    reviewCount: 234,
  },
  {
    id: "int-004",
    name: "Wireless Phone Charger Mount",
    slug: "wireless-phone-charger-mount",
    category: "interior",
    price: 2800,
    originalPrice: 3500,
    description: "15W fast wireless charger with automatic clamping for convenient hands-free charging.",
    features: [
      "15W fast charging",
      "Qi certified",
      "Auto clamping",
      "360° rotation",
      "Universal fit"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 567,
  },
  {
    id: "int-005",
    name: "Dashboard Organizer Tray",
    slug: "dashboard-organizer-tray",
    category: "interior",
    price: 1200,
    description: "Non-slip dashboard organizer for phones, coins, and small items.",
    features: [
      "Non-slip silicone",
      "Heat resistant",
      "Custom fit design",
      "Easy to clean",
      "Multiple compartments"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks"],
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=75",
    inStock: true,
    rating: 4.4,
    reviewCount: 123,
  },

  // Safety & Security Accessories
  {
    id: "saf-001",
    name: "Reverse Parking Sensors",
    slug: "reverse-parking-sensors",
    category: "safety-security",
    price: 4500,
    originalPrice: 5500,
    description: "4-sensor parking system with LED display for safe and accurate parking.",
    features: [
      "4 ultrasonic sensors",
      "LED display",
      "Audible alerts",
      "0-2.5m detection range",
      "Weather resistant"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 389,
  },
  {
    id: "saf-002",
    name: "Dash Cam - Dual Channel",
    slug: "dash-cam-dual-channel",
    category: "safety-security",
    price: 8500,
    originalPrice: 10000,
    description: "Full HD dual-channel dash cam with night vision for complete recording coverage.",
    features: [
      "1080p front + rear",
      "Night vision",
      "Loop recording",
      "G-sensor",
      "Parking mode"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 234,
  },
  {
    id: "saf-003",
    name: "Tire Pressure Monitoring System",
    slug: "tpms-kit",
    category: "safety-security",
    price: 5500,
    description: "Real-time tire pressure and temperature monitoring for safer driving.",
    features: [
      "Real-time monitoring",
      "Solar powered display",
      "Temperature alerts",
      "Easy installation",
      "Long battery life"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=75",
    inStock: true,
    rating: 4.6,
    reviewCount: 145,
  },
  {
    id: "saf-004",
    name: "Blind Spot Mirrors",
    slug: "blind-spot-mirrors",
    category: "safety-security",
    price: 650,
    description: "Convex blind spot mirrors for enhanced rear visibility and safer lane changes.",
    features: [
      "Wide-angle convex",
      "Adjustable angle",
      "Weatherproof",
      "Easy stick-on install",
      "Pair included"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=75",
    inStock: true,
    rating: 4.5,
    reviewCount: 678,
  },
  {
    id: "saf-005",
    name: "First Aid Kit - Premium",
    slug: "first-aid-kit-premium",
    category: "safety-security",
    price: 1500,
    description: "Comprehensive first aid kit with 75 essential items for roadside emergencies.",
    features: [
      "75 essential items",
      "Compact design",
      "High-visibility bag",
      "Includes safety vest",
      "Meets safety standards"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&q=75",
    inStock: true,
    rating: 4.8,
    reviewCount: 234,
  },

  // Infotainment
  {
    id: "elec-001",
    name: "Android Infotainment System - 9\"",
    slug: "android-infotainment-9inch",
    category: "infotainment",
    price: 18500,
    originalPrice: 22000,
    description: "9-inch Android touchscreen with Apple CarPlay and Android Auto support.",
    features: [
      "9\" HD touchscreen",
      "Apple CarPlay",
      "Android Auto",
      "Built-in GPS",
      "Bluetooth 5.0"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 445,
  },
  {
    id: "elec-002",
    name: "360° Camera System",
    slug: "360-camera-system",
    category: "infotainment",
    price: 25000,
    originalPrice: 30000,
    description: "Surround view camera system for effortless parking and maneuvering.",
    features: [
      "4 HD cameras",
      "Bird's eye view",
      "Dynamic guidelines",
      "Night vision",
      "OEM integration"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail"],
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 167,
  },
  {
    id: "elec-003",
    name: "USB Hub - 6 Port",
    slug: "usb-hub-6port",
    category: "infotainment",
    price: 1800,
    description: "6-port USB hub with fast charging support for all passengers.",
    features: [
      "6 USB ports",
      "QC 3.0 support",
      "LED indicators",
      "Compact design",
      "12V compatible"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
    inStock: true,
    rating: 4.5,
    reviewCount: 289,
  },
  {
    id: "elec-004",
    name: "Premium Speaker Upgrade Kit",
    slug: "premium-speaker-kit",
    category: "infotainment",
    price: 12500,
    originalPrice: 15000,
    description: "JBL speaker upgrade kit for premium audio experience in your Nissan.",
    features: [
      "JBL speakers",
      "6 speaker setup",
      "200W output",
      "Deep bass",
      "Crystal clear highs"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks"],
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=75",
    inStock: true,
    rating: 4.7,
    reviewCount: 123,
  },

  // Lifestyle
  {
    id: "life-001",
    name: "Roof Box - 400L",
    slug: "roof-box-400l",
    category: "lifestyle",
    price: 22000,
    originalPrice: 26000,
    description: "Aerodynamic 400L roof box for extra luggage capacity on road trips.",
    features: [
      "400L capacity",
      "Aerodynamic design",
      "Dual-side opening",
      "Quick mount system",
      "Weatherproof"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail"],
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "life-002",
    name: "Bike Carrier - 2 Bikes",
    slug: "bike-carrier-2",
    category: "lifestyle",
    price: 8500,
    description: "Rear-mounted bike carrier for 2 bicycles with secure locking system.",
    features: [
      "2 bike capacity",
      "Secure locks",
      "Foldable design",
      "Easy installation",
      "Universal fit"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
    inStock: true,
    rating: 4.6,
    reviewCount: 67,
  },
  {
    id: "life-003",
    name: "Car Refrigerator - 12L",
    slug: "car-refrigerator-12l",
    category: "lifestyle",
    price: 6500,
    originalPrice: 8000,
    description: "Portable 12L car refrigerator for keeping drinks and snacks cool on long drives.",
    features: [
      "12L capacity",
      "Cooling & heating",
      "12V/220V compatible",
      "Energy efficient",
      "Digital display"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.5,
    reviewCount: 145,
  },
  {
    id: "life-004",
    name: "Car Vacuum Cleaner - Cordless",
    slug: "car-vacuum-cordless",
    category: "lifestyle",
    price: 3500,
    description: "Powerful cordless vacuum cleaner with HEPA filter for car interior cleaning.",
    features: [
      "8000Pa suction",
      "HEPA filter",
      "30 min runtime",
      "Multiple attachments",
      "Cordless design"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=75",
    inStock: true,
    rating: 4.6,
    reviewCount: 234,
  },
  {
    id: "life-005",
    name: "Nissan Branded Umbrella",
    slug: "nissan-umbrella",
    category: "lifestyle",
    price: 850,
    description: "Premium Nissan branded automatic umbrella with windproof design.",
    features: [
      "Auto open/close",
      "Windproof frame",
      "UV protection",
      "Nissan branding",
      "Carry case included"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1534309466160-70b22cc6252c?w=600&q=75",
    inStock: true,
    rating: 4.4,
    reviewCount: 567,
  },
  // Car Care Accessories
  {
    id: "care-001",
    name: "Car Wash Kit - Premium",
    slug: "car-wash-kit-premium",
    category: "car-care",
    price: 2500,
    originalPrice: 3200,
    description: "Complete car wash kit with microfiber cloths, shampoo, and polish.",
    features: [
      "Microfiber wash mitt",
      "Car shampoo 500ml",
      "Polish 250ml",
      "Microfiber cloths (5)",
      "Bucket included"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 234,
  },
  {
    id: "care-002",
    name: "Interior Cleaning Kit",
    slug: "interior-cleaning-kit",
    category: "car-care",
    price: 1800,
    description: "Professional interior cleaning kit for dashboard, seats, and carpets.",
    features: [
      "Dashboard cleaner",
      "Leather conditioner",
      "Fabric cleaner",
      "Detailing brushes",
      "Microfiber cloths"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75",
    inStock: true,
    rating: 4.5,
    reviewCount: 156,
  },
  {
    id: "care-003",
    name: "Paint Protection Film",
    slug: "paint-protection-film",
    category: "car-care",
    price: 15000,
    originalPrice: 18000,
    description: "Self-healing PPF for ultimate paint protection against scratches.",
    features: [
      "Self-healing technology",
      "UV protection",
      "10-year warranty",
      "Professional installation",
      "Crystal clear finish"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail"],
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "care-004",
    name: "Ceramic Coating Kit",
    slug: "ceramic-coating-kit",
    category: "car-care",
    price: 8500,
    originalPrice: 10000,
    description: "9H ceramic coating for long-lasting shine and protection.",
    features: [
      "9H hardness",
      "Hydrophobic effect",
      "3-year durability",
      "Easy application",
      "UV protection"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1600964373031-f0b65565f354?w=600&q=75",
    inStock: true,
    rating: 4.8,
    reviewCount: 178,
  },

  // Health & Hygiene Accessories
  {
    id: "health-001",
    name: "Car Air Purifier - HEPA",
    slug: "car-air-purifier-hepa",
    category: "health-hygiene",
    price: 4500,
    originalPrice: 5500,
    description: "HEPA air purifier with ionizer for clean cabin air.",
    features: [
      "True HEPA filter",
      "Negative ion generator",
      "USB powered",
      "Compact design",
      "Air quality indicator"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.6,
    reviewCount: 345,
  },
  {
    id: "health-002",
    name: "Antibacterial Seat Covers",
    slug: "antibacterial-seat-covers",
    category: "health-hygiene",
    price: 12000,
    originalPrice: 14000,
    description: "Premium seat covers with antibacterial and antimicrobial treatment.",
    features: [
      "Antibacterial fabric",
      "Water resistant",
      "Easy to clean",
      "Custom fit",
      "1-year warranty"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 123,
  },
  {
    id: "health-003",
    name: "UV Sanitizer Box",
    slug: "uv-sanitizer-box",
    category: "health-hygiene",
    price: 2200,
    description: "Portable UV-C sanitizer for phones, keys, and small items.",
    features: [
      "UV-C sterilization",
      "99.9% germ kill rate",
      "USB charging",
      "Compact portable",
      "Auto shut-off"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&q=75",
    inStock: true,
    rating: 4.4,
    reviewCount: 89,
  },
  {
    id: "health-004",
    name: "Ventilated Seat Cushion",
    slug: "ventilated-seat-cushion",
    category: "health-hygiene",
    price: 3500,
    originalPrice: 4200,
    description: "Cooling ventilated seat cushion for comfortable summer drives.",
    features: [
      "12V powered fan",
      "Breathable mesh",
      "3 speed settings",
      "Universal fit",
      "Reduces sweating"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.5,
    reviewCount: 267,
  },

  // Packages
  {
    id: "pkg-001",
    name: "Essential Protection Package",
    slug: "essential-protection-package",
    category: "packages",
    price: 15000,
    originalPrice: 20000,
    description: "Complete protection package with floor mats, seat covers, and mud flaps.",
    features: [
      "3D Floor Mats",
      "Seat Covers (Full Set)",
      "Mud Flaps",
      "Door Visors",
      "Free Installation"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks"],
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=75",
    inStock: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 456,
  },
  {
    id: "pkg-002",
    name: "Premium Styling Package",
    slug: "premium-styling-package",
    category: "packages",
    price: 35000,
    originalPrice: 45000,
    description: "Transform your Nissan with chrome garnishes, spoiler, and body kit.",
    features: [
      "Chrome Front Grille",
      "Rear Spoiler",
      "Side Body Moulding",
      "Door Handle Chrome",
      "Professional Fitting"
    ],
    compatibleModels: ["Nissan Magnite"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=75",
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "pkg-003",
    name: "Safety First Package",
    slug: "safety-first-package",
    category: "packages",
    price: 18000,
    originalPrice: 24000,
    description: "Complete safety upgrade with sensors, dash cam, and TPMS.",
    features: [
      "Parking Sensors",
      "Dash Camera",
      "TPMS Kit",
      "First Aid Kit",
      "Fire Extinguisher"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks", "Nissan X-Trail", "Nissan Sunny"],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=75",
    inStock: true,
    rating: 4.7,
    reviewCount: 234,
  },
  {
    id: "pkg-004",
    name: "Tech Upgrade Package",
    slug: "tech-upgrade-package",
    category: "packages",
    price: 45000,
    originalPrice: 55000,
    description: "Ultimate infotainment upgrade with touchscreen, speakers, and camera.",
    features: [
      "9\" Android System",
      "JBL Speaker Kit",
      "360° Camera",
      "Wireless Charger",
      "USB Hub"
    ],
    compatibleModels: ["Nissan Magnite", "Nissan Kicks"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
    inStock: true,
    rating: 4.9,
    reviewCount: 156,
  },
];

// Helper functions
export const getAccessoriesByCategory = (category: AccessoryCategory): Accessory[] => {
  return accessories.filter(acc => acc.category === category);
};

export const getBestSellerAccessories = (): Accessory[] => {
  return accessories.filter(acc => acc.isBestSeller);
};

export const getNewAccessories = (): Accessory[] => {
  return accessories.filter(acc => acc.isNew);
};

export const getAccessoryBySlug = (slug: string): Accessory | undefined => {
  return accessories.find(acc => acc.slug === slug);
};

export const searchAccessories = (query: string): Accessory[] => {
  const lowercaseQuery = query.toLowerCase();
  return accessories.filter(acc => 
    acc.name.toLowerCase().includes(lowercaseQuery) ||
    acc.description.toLowerCase().includes(lowercaseQuery) ||
    acc.compatibleModels.some(model => model.toLowerCase().includes(lowercaseQuery))
  );
};
