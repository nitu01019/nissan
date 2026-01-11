import { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Cars",
    href: "/cars",
    children: [
      { label: "Nissan Magnite", href: "/cars/nissan-magnite", isNew: true },
      { label: "Nissan Kicks", href: "/cars/nissan-kicks" },
      { label: "Nissan X-Trail", href: "/cars/nissan-x-trail", isNew: true },
      { label: "Nissan Sunny", href: "/cars/nissan-sunny" },
      { label: "View All Cars", href: "/cars" },
    ],
  },
  {
    label: "Accessories",
    href: "/accessories",
    children: [
      { label: "Exterior", href: "/accessories?category=exterior" },
      { label: "Interior", href: "/accessories?category=interior" },
      { label: "Safety", href: "/accessories?category=safety" },
      { label: "Electronics", href: "/accessories?category=electronics" },
      { label: "Lifestyle", href: "/accessories?category=lifestyle" },
    ],
  },
  {
    label: "Compare",
    href: "/compare",
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Sales", href: "/services#sales" },
      { label: "Service Center", href: "/services#service" },
      { label: "Spare Parts", href: "/services#parts" },
      { label: "Insurance", href: "/services#insurance" },
      { label: "Finance", href: "/services#finance" },
    ],
  },
  {
    label: "Offers",
    href: "/offers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerNavigation = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Our Cars", href: "/cars" },
    { label: "Compare Cars", href: "/compare" },
    { label: "Book Test Drive", href: "/contact?type=test-drive" },
    { label: "Contact Us", href: "/contact" },
  ],
  cars: [
    { label: "Nissan Magnite", href: "/cars/nissan-magnite" },
    { label: "Nissan Kicks", href: "/cars/nissan-kicks" },
    { label: "Nissan X-Trail", href: "/cars/nissan-x-trail" },
    { label: "Nissan Sunny", href: "/cars/nissan-sunny" },
    { label: "Nissan Terrano", href: "/cars/nissan-terrano" },
  ],
  services: [
    { label: "Sales", href: "/services#sales" },
    { label: "Service Center", href: "/services#service" },
    { label: "Spare Parts", href: "/services#parts" },
    { label: "Insurance", href: "/services#insurance" },
    { label: "Finance Options", href: "/services#finance" },
  ],
  support: [
    { label: "About Us", href: "/about" },
    { label: "Accessories", href: "/accessories" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export const contactInfo = {
  dealerName: "Nissan Authorized Dealer",
  tagline: "Authorized Nissan Dealer",
  address: {
    line1: "Nissan Authorized Dealer",
    line2: "NH-1A, Bye Pass, Opp. Channi Himmat",
    line3: "Channi Himmat",
    city: "Jammu",
    state: "Jammu & Kashmir",
    pincode: "180015",
  },
  phone: ["+91 78895 59631", "+91 80625 11352"],
  email: ["sales@nissanjammu.com", "service@nissanjammu.com"],
  timing: {
    weekdays: "9:30 AM - 7:00 PM",
    weekends: "10:00 AM - 6:00 PM",
  },
  socialLinks: {
    facebook: "https://facebook.com/nissanjammu",
    instagram: "https://instagram.com/nissanjammu",
    twitter: "https://twitter.com/nissanjammu",
    youtube: "https://youtube.com/nissanindia",
  },
  mapCoordinates: {
    lat: 32.7266,
    lng: 74.8570,
  },
  googleMapsUrl: "https://www.google.com/maps/place/Channi+Himmat,+Jammu",
};
