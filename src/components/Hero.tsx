import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroImage from '../assets/zaaq-hero.jpg';
import SectionMark from './SectionMark';

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  return (
    <section id="home" ref={ref} className="snap-section relative flex flex-col justify-end overflow-hidden bg-ink text-cream">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[7%] h-[114%] w-full">
        <img src={heroImage} alt="A ZAAQ client in deep plum, Dubai waterfront skyline behind her" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/28 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/42 via-transparent to-ink/18" />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 px-6 pb-14 pt-32 sm:px-10 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <SectionMark eyebrow="ZAAQ - UAE fragrance house" arrow="up-right" />

          <h1 className="mt-8 max-w-5xl font-display text-[12vw] font-light leading-[0.93] tracking-[0.04em] sm:text-[8.5vw] lg:text-[5.9vw]">
            Your Signature
            <br />
            in Scent
          </h1>

          <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md font-display text-base leading-relaxed text-cream/76 sm:text-lg">
              A luxury fragrance collection built around identity, restraint, and long-lasting presence.
            </p>

            <button
              onClick={() => onNavigate('scents')}
              className="group flex items-center gap-3 bg-plum px-7 py-4 font-display text-xs uppercase tracking-widest2 text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              Explore collection
              <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
