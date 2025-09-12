'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero3D from '@/components/Hero3D';
import ProductCard from '@/components/ProductCard';
import ShoppingCart from '@/components/ShoppingCart';
import { products, categories, searchProducts, getProductsByCategory, Product } from '@/lib/products';
import { CartManager } from '@/lib/cart';

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Update cart count on mount and when cart changes
  useEffect(() => {
    const updateCartCount = () => {
      const cart = CartManager.getCart();
      setCartItemCount(cart.itemCount);
    };

    updateCartCount();

    // Listen for storage changes (cart updates from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === '3d-commerce-cart') {
        updateCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    setCurrentCategory(''); // Clear category filter when searching
    
    setTimeout(() => {
      if (query.trim() === '') {
        setFilteredProducts(products);
      } else {
        const results = searchProducts(query);
        setFilteredProducts(results);
      }
      setLoading(false);
    }, 300); // Simulate search delay for better UX
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setLoading(true);
    setCurrentCategory(category);
    setSearchQuery(''); // Clear search when filtering by category
    
    setTimeout(() => {
      if (category === '') {
        setFilteredProducts(products);
      } else {
        const results = getProductsByCategory(category);
        setFilteredProducts(results);
      }
      setLoading(false);
    }, 200);
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    CartManager.addToCart(product);
    const cart = CartManager.getCart();
    setCartItemCount(cart.itemCount);
    
    // You could add a toast notification here
    console.log(`Added ${product.name} to cart`);
  };

  // Get current category name for display
  const getCurrentCategoryName = () => {
    if (currentCategory === '') return 'All Products';
    const category = categories.find(cat => cat.id === currentCategory);
    return category ? category.name : 'All Products';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Header
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        onCartOpen={() => setIsCartOpen(true)}
        cartItemCount={cartItemCount}
      />

      {/* Hero Section */}
      <Hero3D />

      {/* Main Content */}
      <main className="relative z-10 bg-white">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent flex-1 max-w-32"></div>
              <h2 className="text-4xl font-bold text-slate-900">
                {searchQuery ? `Search Results for "${searchQuery}"` : getCurrentCategoryName()}
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent flex-1 max-w-32"></div>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {searchQuery
                ? `Found ${filteredProducts.length} products matching your search`
                : currentCategory
                  ? `Explore our ${getCurrentCategoryName().toLowerCase()} collection`
                  : 'Discover our complete collection of amazing products with interactive 3D visualization'
              }
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && (
            <>
              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>

                  {/* Products Stats */}
                  <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-8 bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-4 rounded-2xl border border-purple-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{filteredProducts.length}</div>
                        <div className="text-sm text-slate-600">Products</div>
                      </div>
                      <div className="w-px h-8 bg-purple-200"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {filteredProducts.filter(p => p.inStock).length}
                        </div>
                        <div className="text-sm text-slate-600">In Stock</div>
                      </div>
                      <div className="w-px h-8 bg-purple-200"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {categories.length}
                        </div>
                        <div className="text-sm text-slate-600">Categories</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // No Results State
                <div className="text-center py-20">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16" className="text-purple-400">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 mb-4">
                    {searchQuery ? 'No products found' : 'No products in this category'}
                  </h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    {searchQuery
                      ? `We couldn't find any products matching "${searchQuery}". Try different keywords or browse our categories.`
                      : 'This category is currently empty. Check back soon for new products!'
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {searchQuery && (
                      <button
                        onClick={() => handleSearch('')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transform transition-all duration-200 hover:scale-105"
                      >
                        Clear Search
                      </button>
                    )}
                    <button
                      onClick={() => handleCategoryFilter('')}
                      className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-purple-300 rounded-xl font-semibold transform transition-all duration-200 hover:scale-105"
                    >
                      View All Products
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose 3D Commerce?
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Experience the future of online shopping with our revolutionary 3D product visualization technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg width="40" height="40" fill="white" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">3D Visualization</h3>
                <p className="text-slate-300">
                  View products from every angle with our immersive 3D technology. See exactly what you're buying.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg width="40" height="40" fill="white" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Secure Shopping</h3>
                <p className="text-slate-300">
                  Shop with confidence knowing your data is protected with enterprise-grade security.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg width="40" height="40" fill="white" viewBox="0 0 16 16">
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-5zm-4 0a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-5zm-6 0a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Fast Delivery</h3>
                <p className="text-slate-300">
                  Get your products quickly with our reliable shipping partners and real-time tracking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  3D Commerce
                </h3>
                <p className="text-slate-300 mb-6 max-w-md">
                  The future of online shopping is here. Experience products like never before with our revolutionary 3D visualization technology.
                </p>
                <div className="flex space-x-4">
                  <button className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors duration-200">
                    <span className="text-white">f</span>
                  </button>
                  <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200">
                    <span className="text-white">t</span>
                  </button>
                  <button className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-colors duration-200">
                    <span className="text-white">i</span>
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-slate-300">
                  <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Press</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-slate-300">
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Returns</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Shipping</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
              <p>&copy; 2024 3D Commerce. All rights reserved. Built with Next.js and Tailwind CSS.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}