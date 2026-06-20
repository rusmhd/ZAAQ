import { Gem, Hand, Infinity, Minus } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { pillars } from '../data/pillars';
import SectionMark from './SectionMark';

const icons = [Gem, Hand, Infinity, Minus];

export default function Pillars() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="craft" className="snap-section flex flex-col justify-center bg-midnight px-6 py-28 text-cream sm:px-10 lg:py-36">
      <div className="mx-auto w-full max-w-7xl">
        <SectionMark eyebrow="Brand pillars" arrow="up-right" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl font-display text-4xl font-light leading-[1.05] tracking-[0.03em] sm:text-5xl">
            Four ideas.
            <br />
            One signature.
          </h2>
          <p className="max-w-md font-sans text-base leading-relaxed text-cream/58">
            Identity, craft, longevity, and minimalism guide every bottle, note, and gesture.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = icons[i] ?? Gem;
            return (
              <motion.div
                key={p.index}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="min-h-64 border border-cream/10 bg-cream/[0.045] p-7 shadow-2xl shadow-black/10 transition-transform duration-500 ease-editorial hover:-translate-y-1 hover:border-plum-mist/30"
              >
                <div className="flex items-center justify-between">
                  <Icon size={20} strokeWidth={1.25} className="text-plum-mist" />
                  <span className="font-mono text-xs text-cream/30">{p.index}</span>
                </div>
                <h3 className="mt-12 font-display text-2xl font-light tracking-[0.04em]">{p.name}</h3>
                <p className="mt-5 text-sm leading-[1.8] text-cream/58">{p.line}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
