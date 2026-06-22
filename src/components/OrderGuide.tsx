import { ArrowRight, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionMark from './SectionMark';

const steps = [
  { label: 'Browse', text: 'Explore the fragrance collection.', icon: Sparkles },
  { label: 'Add to Cart', text: 'Choose one or more signatures.', icon: ShoppingBag },
  { label: 'Order on WhatsApp', text: 'Send your list directly to ZAAQ.', icon: MessageCircle },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function OrderGuide() {
  return (
    <section id="order" className="snap-section bg-midnight px-6 py-28 text-cream sm:px-10 lg:py-36">
      <div className="mx-auto w-full max-w-7xl">
        <SectionMark eyebrow="How to order" arrow="up-right" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <blockquote className="max-w-4xl font-display text-4xl font-light leading-[1.08] tracking-[0.03em] sm:text-6xl lg:text-7xl">
            "Beyond borrowed names: six scents that are distinctly yours."
          </blockquote>

          <p className="max-w-md font-display text-base leading-[1.85] text-cream/62 lg:justify-self-end">
            Shopping stays in the background. Select your fragrances, review them once, and send the order through WhatsApp when you are ready.
          </p>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                className="group border border-cream/12 bg-cream/[0.035] p-7 transition-colors duration-300 hover:border-cream/24 hover:bg-cream/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <Icon size={20} strokeWidth={1.25} className="text-plum-mist" />
                  <span className="font-display text-xs text-cream/35">0{index + 1}</span>
                </div>
                <h3 className="mt-12 font-display text-2xl font-light tracking-[0.04em]">{step.label}</h3>
                <p className="mt-4 text-sm leading-[1.8] text-cream/55">{step.text}</p>
                {index < steps.length - 1 && (
                  <ArrowRight size={16} className="mt-8 text-cream/25 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
