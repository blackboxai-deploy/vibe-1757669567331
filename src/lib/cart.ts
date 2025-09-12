import { CartItem, Product } from './products';

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export class CartManager {
  private static STORAGE_KEY = '3d-commerce-cart';

  static getCart(): CartState {
    if (typeof window === 'undefined') {
      return { items: [], total: 0, itemCount: 0 };
    }

    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const items: CartItem[] = JSON.parse(saved);
        return {
          items,
          total: this.calculateTotal(items),
          itemCount: this.calculateItemCount(items)
        };
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }

    return { items: [], total: 0, itemCount: 0 };
  }

  static saveCart(items: CartItem[]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  static addToCart(product: Product, quantity: number = 1): CartState {
    const cart = this.getCart();
    const existingItem = cart.items.find(item => item.id === product.id);

    let newItems: CartItem[];
    if (existingItem) {
      newItems = cart.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem: CartItem = { ...product, quantity };
      newItems = [...cart.items, newItem];
    }

    this.saveCart(newItems);
    return {
      items: newItems,
      total: this.calculateTotal(newItems),
      itemCount: this.calculateItemCount(newItems)
    };
  }

  static updateQuantity(productId: string, quantity: number): CartState {
    const cart = this.getCart();
    let newItems: CartItem[];

    if (quantity <= 0) {
      newItems = cart.items.filter(item => item.id !== productId);
    } else {
      newItems = cart.items.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
    }

    this.saveCart(newItems);
    return {
      items: newItems,
      total: this.calculateTotal(newItems),
      itemCount: this.calculateItemCount(newItems)
    };
  }

  static removeFromCart(productId: string): CartState {
    return this.updateQuantity(productId, 0);
  }

  static clearCart(): CartState {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    return { items: [], total: 0, itemCount: 0 };
  }

  private static calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private static calculateItemCount(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
  }

  static formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  static calculateSavings(items: CartItem[]): number {
    return items.reduce((savings, item) => {
      if (item.originalPrice) {
        return savings + ((item.originalPrice - item.price) * item.quantity);
      }
      return savings;
    }, 0);
  }

  static getCartSummary(): {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    savings: number;
  } {
    const cart = this.getCart();
    const subtotal = cart.total;
    const savings = this.calculateSavings(cart.items);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
    const total = subtotal + tax + shipping;

    return {
      subtotal,
      tax,
      shipping,
      total,
      savings
    };
  }
}