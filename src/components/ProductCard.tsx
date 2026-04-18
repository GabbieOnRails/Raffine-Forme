import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-brand-beige aspect-[3/4]">
        <img 
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      
      <div className="mt-4 flex flex-col items-center text-center">
        <h3 className="text-sm font-serif group-hover:underline transition-all">
          <Link to={`/product/${product.id}`}>
            {product.name.toUpperCase()}
          </Link>
        </h3>
        <p className="mt-1 text-xs opacity-60 tracking-wider">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Quick Add (Optional visual) */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest border border-brand-black/10">
          Exclusive
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
