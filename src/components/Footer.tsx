import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-cream pt-20 pb-10 px-6 sm:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-brand-cream/10 pb-20">
        <div className="col-span-1">
          <Link to="/" className="text-2xl font-serif tracking-tight">
            RAFFINÉ FORME
          </Link>
          <p className="mt-4 text-xs opacity-60 leading-relaxed max-w-xs">
            A celebration of contemporary femininity and timeless elegance. 
            Crafted for the woman who moves with purpose and poise.
          </p>
          <div className="flex gap-4 mt-8">
            <Instagram className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer" />
            <Twitter className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer" />
            <Facebook className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-medium mb-6">Explore</h4>
          <ul className="space-y-4 text-xs opacity-60">
            <li><Link to="/shop" className="hover:opacity-100 uppercase tracking-widest">All Products</Link></li>
            <li><Link to="/shop?category=Blazer" className="hover:opacity-100 uppercase tracking-widest">Blazers</Link></li>
            <li><Link to="/shop?category=Dress" className="hover:opacity-100 uppercase tracking-widest">Dresses</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="text-xs uppercase tracking-[0.2em] font-medium mb-6">Contact</h4>
          <ul className="space-y-4 text-xs opacity-60">
            <li className="uppercase tracking-[0.1em]">Abuja, Nigeria</li>
            <li><a href="mailto:concierge@raffineforme.com" className="hover:opacity-100 uppercase tracking-widest">concierge@raffineforme.com</a></li>
            <li className="uppercase tracking-widest">+234 000 000 0000</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-10 text-[10px] opacity-40 uppercase tracking-[0.3em]">
        <p>© 2026 RAFFINÉ FORME. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Legal</span>
        </div>
      </div>
    </footer>
  );
}
