'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CartManager, CartState } from '@/lib/cart';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const [cart, setCart] = useState<CartState>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCart(CartManager.getCart());
    }
  }, [isOpen]);

  const updateQuantity = async (productId: string, quantity: number) => {
    setIsLoading(true);
    const newCart = CartManager.updateQuantity(productId, quantity);
    setCart(newCart);
    setIsLoading(false);
  };

  const removeItem = async (productId: string) => {
    setIsLoading(true);
    const newCart = CartManager.removeFromCart(productId);
    setCart(newCart);
    setIsLoading(false);
  };

  const clearCart = async () => {
    setIsLoading(true);
    const newCart = CartManager.clearCart();
    setCart(newCart);
    setIsLoading(false);
  };

  const summary = CartManager.getCartSummary();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          boxShadow: '-10px 0 50px rgba(0,0,0,0.3)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-2xl font-bold text-slate-900">
            Shopping Cart
            {cart.itemCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-sm rounded-full">
                {cart.itemCount}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {cart.items.length === 0 ? (
            // Empty Cart
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16" className="text-slate-400">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Your cart is empty</h3>
              <p className="text-slate-500 mb-6">Add some amazing products to get started!</p>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            // Cart Items
            <div className="p-4 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 rounded-xl p-4 transition-all duration-200 hover:bg-slate-100"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 bg-white rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm leading-tight mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 capitalize mb-2">{item.category}</p>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-slate-900">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading || item.quantity <= 1}
                            className="p-2 hover:bg-slate-100 transition-colors duration-200 disabled:opacity-50"
                          >
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg>
                          </button>
                          <span className="px-3 py-2 text-sm font-medium text-slate-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="p-2 hover:bg-slate-100 transition-colors duration-200 disabled:opacity-50"
                          >
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isLoading}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {cart.items.length > 0 && (
                <button
                  onClick={clearCart}
                  disabled={isLoading}
                  className="w-full py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  Clear Cart
                </button>
              )}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cart.items.length > 0 && (
          <div className="border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900">{CartManager.formatPrice(summary.subtotal)}</span>
              </div>
              {summary.savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>You Save</span>
                  <span>-{CartManager.formatPrice(summary.savings)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Tax</span>
                <span className="text-slate-900">{CartManager.formatPrice(summary.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="text-slate-900">
                  {summary.shipping === 0 ? 'Free' : CartManager.formatPrice(summary.shipping)}
                </span>
              </div>
              {summary.shipping > 0 && (
                <p className="text-xs text-blue-600">
                  Add {CartManager.formatPrice(50 - summary.subtotal)} more for free shipping!
                </p>
              )}
              <div className="border-t border-slate-300 pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900">{CartManager.formatPrice(summary.total)}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : `Checkout • ${CartManager.formatPrice(summary.total)}`}
            </Button>

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full py-3 rounded-xl"
              disabled={isLoading}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
}