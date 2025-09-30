export const BUSINESS_INFO = {
  name: 'Manomangal Lawns',
  address: 'Shingave Shivar, Shirpur, Maharashtra 425405',
  phone: '9359525834',
  email: 'jayeshrcpit2003@gmail.com',
  owner: 'Jayesh Patil',
  whatsapp: '9359525834',
  coordinates: {
    lat: 21.3486,
    lng: 74.8811
  }
};

export const EVENT_TYPES = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'reception', label: 'Reception' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'birthday', label: 'Birthday Party' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'other', label: 'Other' }
];

export const TIME_SLOTS = [
  { value: 'morning', label: 'Morning (6:00 AM - 12:00 PM)', price: 15000 },
  { value: 'afternoon', label: 'Afternoon (12:00 PM - 6:00 PM)', price: 20000 },
  { value: 'evening', label: 'Evening (6:00 PM - 12:00 AM)', price: 25000 },
  { value: 'fullday', label: 'Full Day (6:00 AM - 12:00 AM)', price: 45000 }
];

export const FACILITIES = [
  {
    icon: '🏛️',
    title: 'AC Hall',
    description: 'Fully air-conditioned hall for 200+ guests'
  },
  {
    icon: '🌳',
    title: 'Garden Area',
    description: 'Beautiful landscaped garden for outdoor events'
  },
  {
    icon: '🚗',
    title: 'Parking',
    description: 'Spacious parking for 100+ vehicles'
  },
  {
    icon: '🍽️',
    title: 'Catering',
    description: 'In-house catering with variety of cuisines'
  },
  {
    icon: '🎵',
    title: 'Sound System',
    description: 'Professional sound and lighting setup'
  },
  {
    icon: '🏺',
    title: 'Decoration',
    description: 'Complete decoration services available'
  }
];

export const MENU_CATEGORIES = [
  {
    id: 'veg-starters',
    name: 'Vegetarian Starters',
    items: [
      { name: 'Paneer Tikka', price: 250, description: 'Grilled cottage cheese with spices' },
      { name: 'Veg Spring Rolls', price: 180, description: 'Crispy rolls with mixed vegetables' },
      { name: 'Aloo Tikki', price: 150, description: 'Spiced potato patties' },
      { name: 'Dhokla', price: 120, description: 'Steamed gram flour cake' }
    ]
  },
  {
    id: 'non-veg-starters',
    name: 'Non-Vegetarian Starters',
    items: [
      { name: 'Chicken Tikka', price: 350, description: 'Grilled chicken with aromatic spices' },
      { name: 'Fish Fry', price: 400, description: 'Crispy fried fish with spices' },
      { name: 'Mutton Seekh Kebab', price: 450, description: 'Minced mutton grilled on skewers' },
      { name: 'Prawn Koliwada', price: 500, description: 'Spicy fried prawns' }
    ]
  },
  {
    id: 'main-course-veg',
    name: 'Vegetarian Main Course',
    items: [
      { name: 'Dal Tadka', price: 200, description: 'Tempered yellow lentils' },
      { name: 'Paneer Butter Masala', price: 280, description: 'Cottage cheese in rich tomato gravy' },
      { name: 'Veg Biryani', price: 250, description: 'Fragrant rice with mixed vegetables' },
      { name: 'Chole Bhature', price: 220, description: 'Spiced chickpeas with fried bread' }
    ]
  },
  {
    id: 'main-course-non-veg',
    name: 'Non-Vegetarian Main Course',
    items: [
      { name: 'Chicken Curry', price: 350, description: 'Traditional chicken curry' },
      { name: 'Mutton Rogan Josh', price: 450, description: 'Aromatic mutton curry' },
      { name: 'Fish Curry', price: 400, description: 'Coastal style fish curry' },
      { name: 'Chicken Biryani', price: 320, description: 'Fragrant rice with tender chicken' }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      { name: 'Gulab Jamun', price: 150, description: 'Sweet milk dumplings in syrup' },
      { name: 'Rasgulla', price: 120, description: 'Spongy cottage cheese balls' },
      { name: 'Ice Cream', price: 100, description: 'Assorted flavors' },
      { name: 'Kulfi', price: 80, description: 'Traditional Indian ice cream' }
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    items: [
      { name: 'Fresh Lime Water', price: 50, description: 'Refreshing lime drink' },
      { name: 'Lassi', price: 80, description: 'Traditional yogurt drink' },
      { name: 'Tea/Coffee', price: 40, description: 'Hot beverages' },
      { name: 'Soft Drinks', price: 60, description: 'Assorted cold drinks' }
    ]
  }
];