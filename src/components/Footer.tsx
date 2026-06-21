import { Instagram, MessageCircle, Globe } from 'lucide-react';
import { sections } from '../data/sections';
import SectionMark from './SectionMark';
import zaaqLogo from '../assets/zaaq-logo.png';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const footerLinks = sections.filter((s) => ['scents', 'story', 'contact'].includes(s.id));

  return (
    <footer id="contact" className="snap-section flex flex-col justify-between bg-ink px-6 pb-12 pt-28 text-cream sm:px-10 sm:pt-36">
      <div className="mx-auto w-full max-w-7xl">
        <SectionMark eyebrow="Contact" arrow="down-left" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-[0.04em] sm:text-6xl lg:text-7xl">
            A signature,
            <br />
            made personal.
          </h2>
          <p className="max-w-md font-display text-base leading-[1.85] text-cream/58 lg:justify-self-end">
            For orders and enquiries, send your selected fragrances through WhatsApp and the ZAAQ team will continue from there.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://wa.me/917034550886"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-plum px-7 py-4 font-display text-xs uppercase tracking-widest2 text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
          <a
            href="https://zaaq.ae"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 border border-cream/18 px-7 py-4 font-display text-xs uppercase tracking-widest2 text-cream/72 transition-colors duration-300 hover:border-cream hover:text-cream"
          >
            <Globe size={15} /> zaaq.ae
          </a>
        </div>
      </div>

      <div className="mx-auto mt-20 flex w-full max-w-7xl flex-col gap-10 border-t border-cream/12 pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <img src={zaaqLogo} alt="ZAAQ" className="h-5 w-auto" />
          <p className="mt-3 font-display text-xs uppercase tracking-widest2 text-cream/42">United Arab Emirates</p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((s) => (
            <button key={s.id} onClick={() => onNavigate(s.id)} className="eyebrow text-cream/48 transition-colors hover:text-cream">
              {s.label}
            </button>
          ))}
        </nav>

        <a href="https://www.instagram.com/zaaq.ae/" target="_blank" rel="noreferrer" aria-label="ZAAQ on Instagram" className="text-cream/55 transition-colors hover:text-cream">
          <Instagram size={18} />
        </a>
      </div>

      <p className="mx-auto mt-10 w-full max-w-7xl font-display text-[0.65rem] text-cream/30">© 2026 ZAAQ. Your Signature in Scent.</p>
    </footer>
  );
}
