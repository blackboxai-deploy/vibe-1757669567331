'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/products';
import { CartManager } from '@/lib/cart';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    CartManager.addToCart(product);
    onAddToCart?.(product);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
        setIsHovered(false);
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Sale Badge */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Save ${(product.originalPrice - product.price).toFixed(0)}
          </div>
        )}

        {/* Image Navigation */}
        {product.images.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all duration-200"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all duration-200"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </>
        )}

        {/* Product Image */}
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
          }}
        />

        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-blue-500 w-4' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}

        {/* 3D Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 rounded-t-2xl"></div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md capitalize">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400' 
                    : 'text-slate-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-slate-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-slate-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 transform ${
            product.inStock
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>

      {/* 3D Border Effect */}
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 group-hover:border-blue-500/30 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}