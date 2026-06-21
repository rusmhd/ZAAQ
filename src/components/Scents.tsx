import { Check, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionMark from './SectionMark';
import { scents, type Scent } from '../data/scents';
import type { CartItem } from '../data/cart';

interface ScentsProps {
  cartItems: CartItem[];
  onAddToCart: (scent: Scent) => void;
  onViewCart: () => void;
}

function CartToast({ name, visible }: { name: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-full bg-cream px-5 py-3 shadow-2xl">
            <Check size={14} className="text-plum" />
            <span className="font-display text-xs uppercase tracking-widest text-ink">{name} added</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScentCard({
  s,
  quantity,
  onAdd,
  onViewCart,
}: {
  s: Scent;
  quantity: number;
  onAdd: () => void;
  onViewCart: () => void;
}) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);

  // Raw pointer position within card (0–1)
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  // Smooth spring values
  const springConfig = { stiffness: 200, damping: 28, mass: 0.6 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Tilt (±8 deg) and glow position
  const tiltRange = prefersReduced ? 0 : 8;
  const rotateY = useTransform(smoothX, [0, 1], [-tiltRange, tiltRange]);
  const rotateX = useTransform(smoothY, [0, 1], [tiltRange, -tiltRange]);
  const glowX = useTransform(smoothX, [0, 1], ['20%', '80%']);
  const glowY = useTransform(smoothY, [0, 1], ['20%', '80%']);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    rawX.set(0.5);
    rawY.set(0.5);
  }

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={prefersReduced ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[38rem] flex-col overflow-hidden border border-cream/10 bg-cream/[0.045] shadow-2xl shadow-black/15"
    >
      {/* Cursor-tracked glow layer */}
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(340px circle at ${x} ${y}, rgba(96,48,140,0.22), transparent 70%)`
            ),
          }}
        />
      )}

      {/* Image area */}
      <div className="relative flex min-h-[24rem] flex-1 items-center justify-center overflow-hidden p-7">
        {/* Background blur bleed */}
        <img
          src={s.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-18 blur-md transition-transform duration-700 group-hover:scale-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-midnight/35 to-ink/92" />

        {/* Main bottle — lifts in Z and Y on hover */}
        <motion.img
          src={s.image}
          alt={`${s.name} Eau de Parfum by ZAAQ`}
          style={prefersReduced ? {} : { translateZ: 24 }}
          whileHover={prefersReduced ? {} : { scale: 1.06, y: -8 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-h-[21rem] w-full object-contain object-center drop-shadow-[0_28px_70px_rgba(0,0,0,0.48)]"
        />

        {/* Notes overlay — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full bg-ink/90 px-5 py-4 backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <p className="font-display text-[0.6rem] uppercase tracking-widest2 text-plum-mist">Fragrance notes</p>
          <p className="mt-1.5 font-display text-[0.68rem] uppercase tracking-widest2 leading-relaxed text-cream/72">{s.notes}</p>
        </div>
      </div>

      {/* Info panel */}
      <div className="relative z-10 border-t border-cream/10 bg-ink/72 p-6 backdrop-blur-md" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-[0.62rem] uppercase tracking-widest2 text-cream/35">No. {s.index}</p>
            <h3 className="mt-3 font-display text-3xl font-light tracking-[0.05em]">{s.name}</h3>
          </div>
          <p className="font-display text-[0.6rem] uppercase tracking-widest text-plum-mist">30 ml</p>
        </div>

        <p className="mt-4 min-h-12 font-display text-sm leading-[1.7] text-cream/62">{s.line}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {/* Primary CTA — diagonal sweep fill */}
          <button
            onClick={onAdd}
            className="group/btn relative flex flex-1 items-center justify-center gap-3 overflow-hidden bg-plum px-5 py-3 font-display text-xs uppercase tracking-widest2 text-cream"
          >
            <span className="absolute inset-0 translate-x-[-101%] bg-cream transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0" />
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-200 group-hover/btn:text-ink">
              <ShoppingBag size={13} />
              {quantity > 0 ? `Add one more (${quantity})` : 'Add to cart'}
            </span>
          </button>

          {/* Secondary cart link */}
          <AnimatePresence>
            {quantity > 0 && (
              <motion.button
                key="view-cart"
                initial={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                animate={{ opacity: 1, width: 'auto', paddingLeft: 20, paddingRight: 20 }}
                exit={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={onViewCart}
                className="overflow-hidden border border-cream/16 py-3 font-display text-xs uppercase tracking-widest2 text-cream/70 transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-ink"
              >
                Cart
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

export default function Scents({ cartItems, onAddToCart, onViewCart }: ScentsProps) {
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const quantityFor = (name: string) => cartItems.find((item) => item.id === name)?.quantity ?? 0;

  const handleAddToCart = (scent: Scent) => {
    onAddToCart(scent);
    setToast(scent.name);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  return (
    <section id="scents" className="snap-section relative overflow-hidden bg-ink px-6 py-28 text-cream sm:px-10 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(61,26,92,0.28),transparent_34%),linear-gradient(180deg,rgba(9,9,12,1),rgba(17,17,31,1))]" />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.45fr)] lg:items-end">
          <div>
            <SectionMark eyebrow="Featured fragrances" arrow="down-left" />
            <h2 className="mt-8 max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-[0.03em] sm:text-5xl lg:text-6xl">
              The collection,
              <br />
              composed with restraint.
            </h2>
          </div>
          <p className="max-w-md font-display text-base leading-[1.8] text-cream/58 lg:justify-self-end">
            Each fragrance is treated like a signature: simple at first glance, layered when it stays with you.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {scents.map((s, i) => (
            <ScentCard
              key={s.index}
              s={s}
              quantity={quantityFor(s.name)}
              onAdd={() => handleAddToCart(s)}
              onViewCart={onViewCart}
            />
          ))}
        </div>
      </div>

      <CartToast name={toast ?? ''} visible={!!toast} />
    </section>
  );
}
