import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { PRODUCTS } from '../data';
import { useCart } from '../CartContext';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Minus, Plus, Heart, Share2 } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return <div>Product not found</div>;

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-40 mb-12">
        <Link to="/shop" className="hover:opacity-100">Collection</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="opacity-100">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Gallery */}
        <div className="lg:col-span-1 hidden lg:flex flex-col gap-4 sticky top-32">
          {product.images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`aspect-[3/4] border-2 transition-all ${activeImage === idx ? 'border-brand-black' : 'border-transparent'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>

        <div className="lg:col-span-7 space-y-8">
          {/* Main images stack for mobile-first feel */}
          <div className="space-y-4">
            {product.images.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-[3/4] bg-brand-beige"
              >
                <img 
                  src={img} 
                  alt={`${product.name} - ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-4 sticky top-32 space-y-12">
          <div className="space-y-4 border-b border-brand-black/5 pb-8">
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">{product.category}</span>
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight leading-tight">{product.name}</h1>
            <p className="text-lg opacity-80">{formatPrice(product.price)}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                <span>Select Size</span>
                <button className="underline opacity-40 hover:opacity-100">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border flex items-center justify-center text-xs transition-all ${
                      selectedSize === size 
                        ? 'bg-brand-black text-white border-brand-black' 
                        : 'border-brand-black/10 hover:border-brand-black/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className="w-full bg-brand-black text-brand-cream h-14 text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-black/90 transition-all active:scale-95 disabled:opacity-70"
              >
                {isAdded ? 'Piece Added' : 'Add to Collection'}
              </button>
              <div className="flex gap-4">
                 <button className="flex-1 border border-brand-black/10 h-14 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest hover:border-brand-black/30 transition-all">
                  <Heart className="w-4 h-4" /> Wishlist
                </button>
                <button className="flex-1 border border-brand-black/10 h-14 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest hover:border-brand-black/30 transition-all">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8 pt-8 border-t border-brand-black/5">
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">The Detail</h3>
              <p className="text-xs leading-relaxed opacity-60 uppercase tracking-widest">{product.description}</p>
              <ul className="space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="text-[10px] uppercase tracking-widest opacity-40 flex items-center gap-2">
                    <span className="w-1 h-1 bg-brand-black rounded-full" /> {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-sans">
              <div className="flex justify-between border-b border-black/5 pb-2 cursor-pointer hover:opacity-100 opacity-60">
                <span>Shipping & Returns</span>
                <Plus className="w-3 h-3" />
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2 cursor-pointer hover:opacity-100 opacity-60">
                <span>Materials & Origin</span>
                <Plus className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
