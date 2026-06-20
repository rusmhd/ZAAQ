import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { sections } from '../data/sections';

interface NavbarProps {
  active: string;
  scrolled: boolean;
  cartCount: number;
  onNavigate: (id: string) => void;
}

export default function Navbar({ active, scrolled, cartCount, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  const visibleSections = sections.filter((s) => ['scents', 'story', 'contact'].includes(s.id));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-cream transition-all duration-500 ease-editorial ${
        scrolled ? 'border-b border-cream/10 bg-ink/82 shadow-2xl shadow-black/20 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <button onClick={() => handleNavigate('home')} className="font-display text-xl font-light tracking-[0.24em]" aria-label="ZAAQ - back to top">
          ZAAQ
        </button>

        <nav className="hidden items-center gap-9 md:flex">
          {visibleSections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleNavigate(s.id)}
              className={`eyebrow transition-colors duration-300 ${active === s.id ? 'text-plum-mist' : 'text-cream/58 hover:text-cream'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavigate('cart')}
            className={`relative grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 ${
              active === 'cart'
                ? 'border-plum bg-plum text-cream'
                : 'border-cream/25 text-cream hover:border-plum hover:bg-plum hover:text-cream'
            }`}
            aria-label={`View cart with ${cartCount} item${cartCount === 1 ? '' : 's'}`}
          >
            <ShoppingBag size={16} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-plum px-1 font-mono text-[0.62rem] font-semibold leading-none text-cream">
                {cartCount}
              </span>
            )}
          </button>

          <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-cream/10 bg-ink/96 text-cream backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {[...visibleSections, { id: 'cart', label: 'Cart' }].map((s) => (
                <button key={s.id} onClick={() => handleNavigate(s.id)} className={`eyebrow py-3 text-left ${active === s.id ? 'text-plum-mist' : 'text-cream/58'}`}>
                  {s.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
