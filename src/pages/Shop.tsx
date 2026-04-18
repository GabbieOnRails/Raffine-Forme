import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredProducts = categoryFilter 
    ? PRODUCTS.filter(p => p.category === categoryFilter)
    : PRODUCTS;

  const categories = ['All', 'Blazer', 'Dress', 'Set'];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      <header className="mb-16 text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-serif tracking-tight">The Wardrobe</h1>
        <div className="flex flex-wrap justify-center gap-8 border-b border-brand-black/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                const url = cat === 'All' ? '/shop' : `/shop?category=${cat}`;
                window.location.search = cat === 'All' ? '' : `?category=${cat}`;
              }}
              className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-all ${
                (categoryFilter === cat || (!categoryFilter && cat === 'All'))
                  ? 'opacity-100 border-b-2 border-brand-black'
                  : 'opacity-40 hover:opacity-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="py-40 text-center space-y-4">
          <p className="text-sm font-serif italic opacity-40">No pieces found in this selection.</p>
          <button 
            onClick={() => window.location.href = '/shop'}
            className="text-[10px] uppercase tracking-widest font-bold underline"
          >
            Show All
          </button>
        </div>
      )}
    </div>
  );
}
