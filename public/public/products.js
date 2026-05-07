// Products Data for FIT CRAFT HUB
const products = [
  // Dumbbells Category
  {
    id: 1,
    name: "Pro Hex Dumbbells 10kg",
    price: 49.99,
    category: "dumbbells",
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&h=400&fit=crop",
    description: "Premium rubber-coated hex dumbbells with ergonomic chrome handles. Perfect for strength training and muscle building. The hexagonal shape prevents rolling.",
    featured: true
  },
  {
    id: 2,
    name: "Adjustable Dumbbell Set",
    price: 299.99,
    category: "dumbbells",
    image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=400&h=400&fit=crop",
    description: "Space-saving adjustable dumbbells ranging from 5-50 lbs. Quick-change weight system for seamless workout transitions.",
    featured: true
  },
  {
    id: 3,
    name: "Cast Iron Dumbbells 20kg",
    price: 79.99,
    category: "dumbbells",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
    description: "Classic cast iron dumbbells with knurled handles for superior grip. Built to last a lifetime of intense workouts.",
    featured: false
  },
  {
    id: 4,
    name: "Neoprene Dumbbells Set",
    price: 89.99,
    category: "dumbbells",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
    description: "Colorful neoprene-coated dumbbells set. Comfortable grip, floor-friendly coating. Includes 2kg, 4kg, and 6kg pairs.",
    featured: false
  },

  // Protein Category
  {
    id: 5,
    name: "Whey Protein Isolate 2kg",
    price: 59.99,
    category: "protein",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop",
    description: "Premium whey protein isolate with 27g protein per serving. Fast-absorbing formula for optimal muscle recovery. Chocolate flavor.",
    featured: true
  },
  {
    id: 6,
    name: "Plant-Based Protein 1.5kg",
    price: 44.99,
    category: "protein",
    image: "https://images.unsplash.com/photo-1622484211148-c9b4bd498a00?w=400&h=400&fit=crop",
    description: "100% vegan protein blend from pea, rice, and hemp. 24g protein per serving. Great for those with dairy sensitivities.",
    featured: false
  },
  {
    id: 7,
    name: "Mass Gainer 3kg",
    price: 69.99,
    category: "protein",
    image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=400&h=400&fit=crop",
    description: "High-calorie mass gainer with 50g protein and 250g carbs per serving. Perfect for hard gainers looking to bulk up.",
    featured: true
  },
  {
    id: 8,
    name: "Casein Protein 1kg",
    price: 39.99,
    category: "protein",
    image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=400&h=400&fit=crop",
    description: "Slow-release casein protein for overnight muscle recovery. 25g protein per serving. Vanilla dream flavor.",
    featured: false
  },

  // Accessories Category
  {
    id: 9,
    name: "Premium Lifting Gloves",
    price: 29.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=400&fit=crop",
    description: "Professional-grade lifting gloves with padded palms and breathable mesh back. Provides excellent grip and wrist support.",
    featured: true
  },
  {
    id: 10,
    name: "Resistance Bands Set",
    price: 34.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop",
    description: "Set of 5 resistance bands with varying tension levels. Includes door anchor, handles, and ankle straps.",
    featured: true
  },
  {
    id: 11,
    name: "Gym Shaker Bottle 750ml",
    price: 14.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
    description: "BPA-free shaker bottle with mixing ball. Leak-proof design, easy-grip texture. Perfect for protein shakes on the go.",
    featured: false
  },
  {
    id: 12,
    name: "Weight Lifting Belt",
    price: 49.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
    description: "Professional leather weight lifting belt. Provides core support for heavy lifts. Adjustable buckle for perfect fit.",
    featured: false
  }
];

// Make products available globally
if (typeof window !== 'undefined') {
  window.products = products;
}
