import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://i.ibb.co/zWjpSZ71/raffine-forme-1776530550-3878140405510693271-33760888379.jpg",
    "https://i.ibb.co/dJGp9PFq/raffine-forme-1776513025-3877993914955549223-33760888379.jpg",
    "https://i.ibb.co/YB34TwLx/raffine-forme-1776509220-3877962233565527931-33760888379.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center -mt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img 
                src={heroImages[currentSlide]} 
                alt={`Hero ${currentSlide}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <div className="relative z-20 text-center text-white space-y-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <h1 className="text-4xl sm:text-7xl font-serif tracking-tight leading-tight mb-8 uppercase">
              For the Refined Woman
            </h1>
            <div className="flex justify-center">
              <Link 
                to="/shop" 
                className="bg-brand-cream text-brand-black px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all shadow-2xl"
              >
                Shop Collection
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-12 h-[2px] transition-all duration-500 ${
                currentSlide === idx ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-24 px-6 sm:px-12 bg-brand-cream" id="collections">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 px-2">
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight uppercase">New Arrivals</h2>
            <div className="w-20 h-[1px] bg-brand-black mx-auto mt-6 opacity-20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/FLkwK2bc/raffine-forme-1776513025-3877993917858044502-33760888379.jpg" 
            alt="Newsletter Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-black/60 z-10" />
        </div>

        <div className="max-w-xl mx-auto text-center space-y-10 relative z-20 px-6 py-32 text-white">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-serif uppercase tracking-tight italic">The Raffiné Woman</h2>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/70 leading-relaxed font-medium">
                Be the first to know about new collection drops, private sales and exclusive discounts.
              </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full pt-4">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="flex-grow bg-transparent border-b border-white/40 py-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-white transition-colors"
                required
              />
              <button className="bg-white text-brand-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-cream transition-all">
                Subscribe
              </button>
            </form>
        </div>
      </section>
    </div>
  );
}

