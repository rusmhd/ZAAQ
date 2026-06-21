import { motion, useReducedMotion } from 'framer-motion';
import storyImage from '../assets/zaaq-story.jpg';
import SectionMark from './SectionMark';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Narrative() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? 'show' : 'hidden';

  return (
    <section id="story" className="snap-section relative flex items-center overflow-hidden bg-ink px-6 py-28 text-cream sm:px-10 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(61,26,92,0.32),transparent_32%),linear-gradient(180deg,rgba(9,9,12,1),rgba(17,17,31,0.96))]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
        <motion.div
          initial={reduceMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden border border-cream/10 bg-midnight"
        >
          <img src={storyImage} alt="A ZAAQ client carrying a branded bag, Dubai skyline in the distance" className="h-full w-full object-cover opacity-88" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        </motion.div>

        <div className="flex flex-col justify-center">
          <SectionMark eyebrow="About ZAAQ" arrow="down-left" />

          <motion.h2
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-display text-4xl font-light leading-[1.04] tracking-[0.03em] sm:text-5xl lg:text-[3.7rem]"
          >
            Beyond borrowed names.
            <br />
            A scent made yours.
          </motion.h2>

          <motion.p
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl font-display text-base leading-[1.9] text-cream/66 sm:text-lg"
          >
            ZAAQ is built as a quiet luxury fragrance house: clear identities, balanced notes, and a minimal visual language that lets each perfume speak with restraint.
          </motion.p>

          <motion.div
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 border-l border-plum-mist/40 pl-6"
          >
            <p className="font-display text-2xl font-light tracking-[0.05em] text-plum-mist sm:text-3xl">Your Signature in Scent.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
