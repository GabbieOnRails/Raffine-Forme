import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { formatPrice } from '../lib/utils';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-32 text-center">
        <h1 className="text-4xl font-serif mb-6 italic opacity-20">Your collection is empty.</h1>
        <Link 
          to="/shop" 
          className="bg-brand-black text-brand-cream px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-brand-black/90 transition-all inline-block"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
      <h1 className="text-3xl sm:text-4xl font-serif tracking-tight mb-12">Your Collection</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <div className="hidden sm:grid grid-cols-12 pb-4 border-b border-brand-black/5 text-[10px] uppercase tracking-widest opacity-40 font-bold">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {cart.map((item) => (
            <motion.div 
              key={`${item.id}-${item.selectedSize}`}
              layout
              className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pb-8 border-b border-brand-black/5"
            >
              <div className="col-span-1 sm:col-span-6 flex gap-4">
                <Link to={`/product/${item.id}`} className="w-24 aspect-[3/4] flex-shrink-0 bg-brand-beige">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </Link>
                <div className="flex flex-col justify-center gap-1">
                  <h3 className="text-xs font-serif uppercase tracking-wider">{item.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Size: {item.selectedSize}</p>
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="text-[10px] uppercase tracking-widest underline opacity-40 hover:opacity-100 text-left mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 text-center text-xs opacity-60">
                <span className="sm:hidden font-bold mr-2">Price:</span>
                {formatPrice(item.price)}
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-center">
                <div className="flex items-center border border-brand-black/10 px-2 py-1 gap-4">
                  <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="hover:opacity-50 transition-opacity">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs min-w-[20px] text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="hover:opacity-50 transition-opacity">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 text-right text-xs font-bold">
                <span className="sm:hidden mr-2 opacity-40 uppercase tracking-widest font-normal">Subtotal:</span>
                {formatPrice(item.price * item.quantity)}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-brand-beige p-8 sticky top-32">
            <h2 className="text-xl font-serif mb-8 border-b border-brand-black/5 pb-4">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-60">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-60">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-xs font-bold pt-4 border-t border-brand-black/5">
                <span className="uppercase tracking-[0.2em] font-sans">Estimated Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout"
              className="w-full bg-brand-black text-brand-cream h-14 flex items-center justify-center text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-black/90 transition-all"
            >
              Initiate Checkout <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <div className="mt-8 space-y-4 text-[10px] uppercase tracking-widest opacity-40 text-center leading-relaxed">
              <p>Complimentary worldwide shipping on orders exceeding ₦500,000</p>
              <p>Secure payment processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
