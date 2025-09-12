'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/lib/products';
import { CartManager } from '@/lib/cart';

export default function Hero3D() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, featuredProducts.length]);

  const handleAddToCart = (product: any) => {
    CartManager.addToCart(product);
    // In a real app, you'd trigger a toast notification here
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000); // Resume auto-play after 10s
  };

  if (featuredProducts.length === 0) return null;

  const currentProduct = featuredProducts[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        {/* Content Side */}
        <div className="flex-1 max-w-xl lg:max-w-2xl text-center lg:text-left mb-12 lg:mb-0">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full mb-6 animate-pulse">
              ✨ Featured Product
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Experience
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                3D Shopping
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Discover products like never before with our immersive 3D visualization technology. 
              Shop with confidence in our revolutionary e-commerce experience.
            </p>
          </div>

          {/* Product Info */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">{currentProduct.name}</h3>
            <p className="text-slate-300 mb-4">{currentProduct.description}</p>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-white">
                  ${currentProduct.price.toFixed(2)}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    ${currentProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(currentProduct.rating)
                        ? 'text-yellow-400'
                        : 'text-slate-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-slate-300 ml-2 text-sm">
                  ({currentProduct.reviewCount})
                </span>
              </div>
            </div>
            <Button
              onClick={() => handleAddToCart(currentProduct)}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Add to Cart - ${currentProduct.price.toFixed(2)}
            </Button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center lg:justify-start gap-3">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-purple-400 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3D Product Showcase */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative">
            {/* 3D Container */}
            <div
              className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Floating Elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-purple-400 rounded-full transform -translate-x-1/2 opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-pink-400 rounded-full opacity-40"></div>
                <div className="absolute top-1/2 left-0 w-3 h-3 bg-blue-400 rounded-full transform -translate-y-1/2 opacity-50"></div>
              </div>

              {/* Main Product Display */}
              <div
                className="absolute inset-0 transition-all duration-700 ease-in-out transform-gpu"
                style={{
                  transform: `rotateY(${currentSlide * 45}deg) rotateX(10deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Glass morphism backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 transform translate-z-[-50px]"></div>
                
                {/* Product Image Container */}
                <div
                  className="relative w-full h-full flex items-center justify-center transform-gpu hover:scale-105 transition-transform duration-300"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative group">
                    {/* Shadow */}
                    <div className="absolute -bottom-8 left-1/2 w-48 h-8 bg-black/20 rounded-full blur-xl transform -translate-x-1/2 scale-75"></div>
                    
                    {/* Product Image */}
                    <img
                      src={currentProduct.images[0]}
                      alt={currentProduct.name}
                      className="w-64 h-64 lg:w-80 lg:h-80 object-contain rounded-2xl shadow-2xl transform-gpu transition-transform duration-500"
                      style={{
                        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                        transformStyle: 'preserve-3d'
                      }}
                    />

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl transform scale-110 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* 3D Ring Elements */}
                <div className="absolute inset-0 animate-pulse">
                  <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-purple-300/30 rounded-full transform -translate-x-1/2 -translate-y-1/2" style={{ transform: 'translate(-50%, -50%) rotateX(75deg)' }}></div>
                  <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-pink-300/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" style={{ transform: 'translate(-50%, -50%) rotateX(75deg)', animationDelay: '1s' }}></div>
                </div>
              </div>

              {/* Side Panels */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-30 hover:opacity-60 transition-opacity">
                <div className="w-16 h-32 bg-gradient-to-b from-purple-500 to-pink-500 rounded-lg shadow-lg" style={{ transform: 'rotateY(45deg)' }}></div>
              </div>
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-30 hover:opacity-60 transition-opacity">
                <div className="w-16 h-32 bg-gradient-to-b from-blue-500 to-purple-500 rounded-lg shadow-lg" style={{ transform: 'rotateY(45deg)' }}></div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <div className="animate-bounce text-white/60 text-sm mb-2">Scroll to explore</div>
              <div className="w-0.5 h-8 bg-gradient-to-b from-white/60 to-transparent mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
}