import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import IndexRail from './components/IndexRail';
import Hero from './components/Hero';
import Narrative from './components/Narrative';
import Pillars from './components/Pillars';
import Scents from './components/Scents';
import Cart from './components/Cart';
import OrderGuide from './components/OrderGuide';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { sections } from './data/sections';
import type { Scent } from './data/scents';
import type { CartItem } from './data/cart';
import { useActiveSection } from './hooks/useActiveSection';

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const active = useActiveSection(sections.map((s) => s.id), rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onScroll = () => setScrolled(root.scrollTop > 24);
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddToCart = (scent: Scent) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === scent.name);
      if (existing) {
        return items.map((item) =>
          item.id === scent.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...items,
        {
          id: scent.name,
          name: scent.name,
          notes: scent.notes,
          line: scent.line,
          image: scent.image,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      quantity <= 0
        ? items.filter((item) => item.id !== id)
        : items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar active={active} scrolled={scrolled} cartCount={cartCount} onNavigate={handleNavigate} />
      <IndexRail active={active} onNavigate={handleNavigate} />

      <div ref={rootRef} className="snap-root">
        <Hero onNavigate={handleNavigate} />
        <Narrative />
        <Pillars />
        <Scents cartItems={cartItems} onAddToCart={handleAddToCart} onViewCart={() => handleNavigate('cart')} />
        <OrderGuide />
        <Cart items={cartItems} onUpdateQuantity={handleUpdateQuantity} onNavigate={handleNavigate} />
        <Gallery />
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
}

export default App;

