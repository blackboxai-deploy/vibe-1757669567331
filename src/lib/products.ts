export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'home', name: 'Home & Garden', icon: '🏠' },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽' },
  { id: 'beauty', name: 'Beauty & Care', icon: '💄' },
  { id: 'toys', name: 'Toys & Games', icon: '🎮' }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life and crystal clear audio quality.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'electronics',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6ccdef54-4a11-4d68-99fe-5ba41e03d3f5.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/77fe0e50-b42a-411c-8c75-4171e7f5b05c.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/168524b3-1eba-4058-9aef-9b7807b619d9.png'
    ],
    rating: 4.8,
    reviewCount: 2847,
    inStock: true,
    featured: true,
    tags: ['wireless', 'bluetooth', 'noise-canceling', 'premium']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking smartwatch with heart rate monitoring, GPS, and 7-day battery life.',
    price: 199.99,
    category: 'electronics',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/07ad12b6-ff1d-4640-b4df-06266cc99a36.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0bcf419d-0b2d-4c58-b53c-3c08cecefd9c.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1f7a0cd1-abbd-464d-8c6d-b5537fa1d958.png'
    ],
    rating: 4.6,
    reviewCount: 1923,
    inStock: true,
    featured: true,
    tags: ['smartwatch', 'fitness', 'health', 'gps']
  },
  {
    id: '3',
    name: 'Designer Leather Jacket',
    description: 'Genuine leather jacket with modern cut and premium finishing. Perfect for casual and formal occasions.',
    price: 449.99,
    originalPrice: 599.99,
    category: 'fashion',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ab37b33a-c1e5-4229-a8cc-81336e7148cd.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2ed65562-9c82-4ca5-b97f-abd0fecdfad2.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c5a3767c-8eb7-48cb-80ec-e38a033f23e9.png'
    ],
    rating: 4.7,
    reviewCount: 856,
    inStock: true,
    featured: false,
    tags: ['leather', 'fashion', 'designer', 'premium']
  },
  {
    id: '4',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with custom switches, programmable keys, and gaming optimization.',
    price: 149.99,
    category: 'electronics',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/05f62fdb-503d-4de4-887b-817c0d15063b.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba6f4015-4843-4ca2-a6ce-474588a28841.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2a6a9f94-5c77-4986-b898-78ff49aafb5a.png'
    ],
    rating: 4.9,
    reviewCount: 3421,
    inStock: true,
    featured: true,
    tags: ['gaming', 'mechanical', 'rgb', 'keyboard']
  },
  {
    id: '5',
    name: 'Luxury Skincare Set',
    description: 'Complete skincare routine with premium anti-aging serums, moisturizers, and cleansers.',
    price: 189.99,
    originalPrice: 249.99,
    category: 'beauty',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b60bd437-ca8c-4046-a329-3bb13cf1530a.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1472d207-4f10-4f7b-9eeb-f512b5f9f44c.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d313aa97-50ce-4226-b736-56e67472bedb.png'
    ],
    rating: 4.5,
    reviewCount: 1247,
    inStock: true,
    featured: false,
    tags: ['skincare', 'luxury', 'anti-aging', 'beauty']
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    description: 'Eco-friendly yoga mat with superior grip, cushioning, and alignment guides for perfect practice.',
    price: 79.99,
    category: 'sports',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e33f2494-5393-4ef3-b3c8-635a595b984b.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7f43d806-2fec-4b2b-bcd7-05fbdacfdf70.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/14216675-1376-431e-994d-b6f47f7f0812.png'
    ],
    rating: 4.4,
    reviewCount: 892,
    inStock: true,
    featured: false,
    tags: ['yoga', 'fitness', 'eco-friendly', 'exercise']
  },
  {
    id: '7',
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with 360-degree sound, smart home integration, and AI assistant.',
    price: 129.99,
    category: 'electronics',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ade3828b-be84-45e2-bdc2-e38f7b7938f7.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/28eaa283-0103-4289-9754-4d3bd1cbafc2.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/31e7067e-795b-4cb7-8bea-268a87ca254d.png'
    ],
    rating: 4.3,
    reviewCount: 1678,
    inStock: true,
    featured: true,
    tags: ['smart-home', 'voice-control', 'speaker', 'ai']
  },
  {
    id: '8',
    name: 'Ceramic Dinnerware Set',
    description: 'Elegant 16-piece ceramic dinnerware set perfect for everyday dining and special occasions.',
    price: 89.99,
    originalPrice: 129.99,
    category: 'home',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3d08a337-b154-44be-a5d4-a0ceb849c108.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5b8fc38f-eca0-4219-b584-8644a8a32d2a.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dedfdb4f-a669-400d-87c4-5eae95a8aa32.png'
    ],
    rating: 4.6,
    reviewCount: 743,
    inStock: true,
    featured: false,
    tags: ['dinnerware', 'ceramic', 'kitchen', 'elegant']
  }
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}