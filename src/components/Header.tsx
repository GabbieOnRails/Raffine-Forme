import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../CartContext';
import { cn } from '../lib/utils';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'shop', path: '/shop' },
    { name: 'New Arrivals', path: '/#collections' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 sm:px-12 py-6",
        isScrolled ? "bg-brand-cream/90 backdrop-blur-md py-4 border-b border-brand-black/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left Nav (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-xs uppercase tracking-[0.2em] font-medium hover:opacity-50 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl sm:text-3xl font-serif tracking-tight text-brand-black flex flex-col items-center"
        >
          <span className="leading-none uppercase">RAFFINÉ FORME</span>
        </Link>

        {/* Right Nav */}
        <div className="flex items-center gap-6 flex-1 justify-end">
          <button className="hidden sm:block hover:opacity-50 transition-opacity">
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/cart" className="relative hover:opacity-50 transition-opacity">
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-brand-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-cream border-b border-brand-black/5 p-8 md:hidden shadow-xl"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-lg font-serif tracking-wide border-b border-black/10 pb-2"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
