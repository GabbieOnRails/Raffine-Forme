import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

type Step = 'info' | 'payment' | 'success';

export default function Checkout() {
  const [step, setStep] = useState<Step>('info');
  const { cart, cartTotal, clearCart } = useCart();

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-32 text-center">
        <h1 className="text-4xl font-serif mb-6 italic opacity-20">No pending orders.</h1>
        <Link to="/shop" className="underline uppercase tracking-widest text-[10px] font-bold">Return to Shop</Link>
      </div>
    );
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'info') setStep('payment');
    else if (step === 'payment') {
      setStep('success');
      clearCart();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12">
      <div className="mb-12 flex justify-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
        <span className={step === 'info' ? 'opacity-100' : 'opacity-40'}>01 Delivery</span>
        <span className="opacity-20">—</span>
        <span className={step === 'payment' ? 'opacity-100' : 'opacity-40'}>02 Payment</span>
         <span className="opacity-20">—</span>
        <span className={step === 'success' ? 'opacity-100' : 'opacity-40'}>03 Confirmation</span>
      </div>

      <AnimatePresence mode="wait">
        {step === 'info' && (
          <motion.div 
            key="info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <h1 className="text-3xl font-serif italic border-b border-black/5 pb-6">Shipping Details</h1>
            <form onSubmit={handleNext} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Email Address</label>
                <input required type="email" placeholder="email@example.com" className="w-full border-b border-brand-black/20 pb-2 focus:border-brand-black transition-colors outline-none text-sm placeholder:opacity-30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Phone Number</label>
                <input required type="tel" placeholder="+234 ..." className="w-full border-b border-brand-black/20 pb-2 focus:border-brand-black transition-colors outline-none text-sm placeholder:opacity-30" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Full Name</label>
                <input required type="text" placeholder="Name on identity" className="w-full border-b border-brand-black/20 pb-2 focus:border-brand-black transition-colors outline-none text-sm placeholder:opacity-30" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Street Address</label>
                <input required type="text" placeholder="House no, Street name" className="w-full border-b border-brand-black/20 pb-2 focus:border-brand-black transition-colors outline-none text-sm placeholder:opacity-30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">City / State</label>
                <input required type="text" placeholder="Location" className="w-full border-b border-brand-black/20 pb-2 focus:border-brand-black transition-colors outline-none text-sm placeholder:opacity-30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Zip / Postal Code</label>
                <input required type="text" placeholder="000000" className="w-full border-b border-brand-black/20 pb-2 focus:border-brand-black transition-colors outline-none text-sm placeholder:opacity-30" />
              </div>
              <button 
                type="submit"
                className="md:col-span-2 w-full bg-brand-black text-brand-cream h-16 text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-black/90 transition-all shadow-xl"
              >
                Proceed to Payment
              </button>
            </form>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div 
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <h1 className="text-3xl font-serif italic border-b border-black/5 pb-6">Secure Payment</h1>
            <div className="bg-brand-beige p-8 border border-brand-black/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 opacity-40" />
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold">Encrypted Transaction</h3>
                  <p className="text-[10px] opacity-40 uppercase tracking-widest">Powered by Stripe & Paystack</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Amount Due</p>
                <p className="text-xl font-serif">{formatPrice(cartTotal)}</p>
              </div>
            </div>

            <form onSubmit={handleNext} className="space-y-12">
               <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Card Number</label>
                    <div className="relative">
                      <input required type="text" placeholder="0000 0000 0000 0000" className="w-full border-b border-brand-black/20 pb-2 focus:border-brand-black transition-colors outline-none text-sm placeholder:opacity-30" />
                      <CreditCard className="absolute right-0 top-0 w-4 h-4 opacity-20" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Expiry Date</label>
                      <input required type="text" placeholder="MM / YY" className="w-full border-b border-brand-black/20 pb-2 focus:border-brand-black transition-colors outline-none text-sm placeholder:opacity-30" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">CVC / Security Code</label>
                      <input required type="text" placeholder="000" className="w-full border-b border-brand-black/20 pb-2 focus:border-brand-black transition-colors outline-none text-sm placeholder:opacity-30" />
                    </div>
                  </div>
               </div>
               
               <div className="flex flex-col gap-4">
                 <button 
                    type="submit"
                    className="w-full bg-brand-black text-brand-cream h-16 text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-black/90 transition-all shadow-xl"
                  >
                    Confirm Order
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep('info')}
                    className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:scale-105 transition-all underline"
                  >
                    Back to Shipping
                  </button>
               </div>
            </form>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 space-y-12"
          >
            <div className="w-24 h-24 bg-brand-black rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Check className="text-brand-cream w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-6xl font-serif tracking-tight mb-4 italic">Thank you for <br /> chosen us</h1>
              <p className="text-xs uppercase tracking-[0.4em] opacity-40">Order #RF-2026-X892 Confirmé</p>
            </div>
            <div className="space-y-6 max-w-sm mx-auto p-10 bg-brand-beige border border-brand-black/5">
              <Truck className="w-8 h-8 mx-auto opacity-20" />
              <p className="text-[10px] uppercase tracking-widest leading-relaxed opacity-60">
                Your silhouette is in production. You will receive a tracking link via email once the artisan has finalized the details.
              </p>
            </div>
            <Link 
              to="/" 
              className="bg-brand-black text-brand-cream px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-black/90 transition-all inline-block shadow-lg"
            >
              Back to Home
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
