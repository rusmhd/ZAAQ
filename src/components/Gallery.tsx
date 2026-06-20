import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import galleryImage from '../assets/zaaq-gallery.jpg';
import SectionMark from './SectionMark';

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-12%', '12%']);

  return (
    <section
      id="gallery"
      ref={ref}
      className="snap-section relative flex flex-col justify-between overflow-hidden bg-ink text-cream"
    >
      <div className="relative z-10 px-6 pt-28 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionMark eyebrow="On Location — Dubai" arrow="up-right" />
        </div>
      </div>

      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[12%] h-[124%] w-full">
        <img
          src={galleryImage}
          alt="A ZAAQ client walking along the Dubai waterfront in deep plum"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink/80" />
      </motion.div>

      <div className="relative z-10 px-6 pb-20 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="max-w-xl font-display text-3xl font-light leading-tight sm:text-4xl">
            Worn quietly. Noticed anyway.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-cream/50">
            Campaign, 2026 — Dubai
          </p>
        </div>
      </div>
    </section>
  );
}
