const products = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description:
      "Premium wireless headphones with active noise cancellation and up to 30 hours of battery life.",
    price: 4999,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description:
      "Feature-packed smartwatch with fitness tracking, heart-rate monitoring and smartphone notifications.",
    price: 3499,
  },
  {
    id: 3,
    name: "Premium Wireless Earbuds",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
    description:
      "Compact wireless earbuds with deep bass, clear audio and a fast-charging case.",
    price: 2499,
  },
  {
    id: 4,
    name: "Minimal Laptop",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    description:
      "Slim and powerful laptop designed for productivity, development and everyday computing.",
    price: 64999,
  },
  {
    id: 5,
    name: "Mechanical Gaming Keyboard",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    description:
      "RGB mechanical keyboard featuring tactile switches and a durable aluminum frame.",
    price: 3999,
  },
  {
    id: 6,
    name: "Wireless Gaming Mouse",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
    description:
      "Ergonomic wireless gaming mouse with adjustable DPI and responsive tracking.",
    price: 1999,
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    description:
      "Portable Bluetooth speaker delivering powerful sound with an all-day battery.",
    price: 2999,
  },
  {
    id: 8,
    name: "Smartphone X",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    description:
      "Modern smartphone with a vibrant display, powerful processor and advanced camera system.",
    price: 29999,
  },
  {
    id: 9,
    name: "USB-C Fast Charger",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    description:
      "Compact fast charger supporting USB-C devices and multiple charging protocols.",
    price: 899,
  },
  {
    id: 10,
    name: "Premium Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description:
      "Water-resistant everyday backpack with dedicated laptop and accessory compartments.",
    price: 1799,
  },
  {
    id: 11,
    name: "Classic Running Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description:
      "Lightweight running shoes designed for everyday workouts and comfortable movement.",
    price: 2499,
  },
  {
    id: 12,
    name: "Classic Analog Watch",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    description:
      "Elegant analog watch with a minimalist dial and premium stainless-steel finish.",
    price: 2999,
  },
  {
    id: 13,
    name: "Minimal Sunglasses",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    description:
      "Stylish UV-protected sunglasses featuring a lightweight frame for everyday use.",
    price: 1299,
  },
  {
    id: 14,
    name: "Ceramic Coffee Mug",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
    description:
      "Simple ceramic coffee mug perfect for your morning coffee, tea or hot chocolate.",
    price: 499,
  },
  {
    id: 15,
    name: "Modern Desk Lamp",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description:
      "Minimal LED desk lamp with adjustable brightness for studying and working.",
    price: 1499,
  },
  {
    id: 16,
    name: "Premium Leather Wallet",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    description:
      "Slim leather wallet with multiple card slots and a dedicated cash compartment.",
    price: 999,
  },
  {
    id: 17,
    name: "Travel Water Bottle",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    description:
      "Reusable stainless-steel water bottle designed to keep drinks cold or hot for hours.",
    price: 799,
  },
  {
    id: 18,
    name: "Digital Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    description:
      "Compact digital camera designed for capturing high-quality photos and videos.",
    price: 45999,
  },
  {
    id: 19,
    name: "Gaming Controller",
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    description:
      "Ergonomic wireless gaming controller with responsive buttons and comfortable grips.",
    price: 3499,
  },
  {
    id: 20,
    name: "Portable Power Bank",
    image:
      "https://images.unsplash.com/photo-1706275399494-fb26bbc5da63?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "High-capacity portable power bank with fast charging for smartphones and other devices.",
    price: 1599,
  },
];

export default products;