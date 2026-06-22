import { ArrowLeft, Check, ChevronDown, ClipboardCopy, ExternalLink, Minus, Plus, Send, ShoppingBag, Trash2 } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import type { CartItem } from '../data/cart';
import SectionMark from './SectionMark';

const WHATSAPP_NUMBER = '971503142399';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onNavigate: (id: string) => void;
}

export default function Cart({ items, onUpdateQuantity, onNavigate }: CartProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const { messageText, whatsappUrl, whatsappWebUrl } = useMemo(() => {
    const itemLines = items.map((item) => `• ${item.name} × ${item.quantity}`).join('\n');
    const messageText = [
      'Hello ZAAQ 🌿',
      "I'd like to order the following:",
      itemLines,
      name.trim() ? `Name: ${name.trim()}` : 'Name:',
      address.trim() ? `Delivery address: ${address.trim()}` : 'Delivery address:',
      notes.trim() ? `Notes: ${notes.trim()}` : 'Notes:',
      'Looking forward to hearing from you!',
    ]
      .filter(Boolean)
      .join('\n');

    const encoded = encodeURIComponent(messageText);
    return {
      messageText,
      whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`,
      whatsappWebUrl: `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encoded}`,
    };
  }, [address, items, name, notes]);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText).then(() => {
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="cart" className="snap-section bg-cream px-6 py-28 text-ink sm:px-10 lg:py-36">
      <div className="mx-auto w-full max-w-7xl">
        <SectionMark eyebrow="Cart" arrow="down-left" tone="dark" />

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-4xl font-light leading-[1.05] tracking-[0.03em] sm:text-5xl">
                  Review quietly.
                  <br />
                  Send directly.
                </h2>
                <p className="mt-5 max-w-xl font-display text-base leading-[1.8] text-ink/58">
                  Your fragrance list opens in WhatsApp with the message already prepared for the ZAAQ team.
                </p>
              </div>

              <button
                onClick={() => onNavigate('scents')}
                className="flex items-center gap-2 border border-ink/12 px-5 py-3 font-display text-xs uppercase tracking-widest2 text-ink/64 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
              >
                <ArrowLeft size={14} /> Shop
              </button>
            </div>

            <div className="mt-10 grid gap-4">
              {items.length === 0 ? (
                <div className="bg-mist p-8">
                  <ShoppingBag size={22} className="text-plum" />
                  <p className="mt-5 font-display text-2xl font-light">Your cart is waiting for a signature.</p>
                  <p className="mt-3 max-w-md font-display text-sm leading-relaxed text-ink/58">
                    Add a fragrance from the collection, then send your order through WhatsApp.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <article key={item.id} className="grid gap-5 bg-mist p-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-center sm:p-5">
                    <div className="aspect-[4/5] overflow-hidden bg-cream">
                      <img src={item.image} alt={`${item.name} bottle`} className="h-full w-full object-contain object-center p-2" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-display text-[0.62rem] uppercase tracking-widest2 text-plum">30 ml Eau de Parfum</p>
                      <h3 className="mt-2 font-display text-3xl font-light tracking-[0.04em]">{item.name}</h3>
                      <p className="mt-3 font-display text-xs uppercase tracking-widest2 leading-relaxed text-ink/48">{item.notes}</p>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                      <div className="flex h-11 items-center border border-ink/10 bg-cream">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="grid h-11 w-11 place-items-center text-ink/65 transition-colors hover:bg-ink hover:text-cream" aria-label={`Decrease ${item.name} quantity`}>
                          <Minus size={14} />
                        </button>
                        <span className="grid h-11 min-w-10 place-items-center font-display text-xs text-ink">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="grid h-11 w-11 place-items-center text-ink/65 transition-colors hover:bg-ink hover:text-cream" aria-label={`Increase ${item.name} quantity`}>
                          <Plus size={14} />
                        </button>
                      </div>

                      <button onClick={() => onUpdateQuantity(item.id, 0)} className="flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-widest text-ink/42 transition-colors hover:text-plum">
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <aside className="bg-ink p-6 text-cream lg:sticky lg:top-24">
            <p className="font-display text-[0.62rem] uppercase tracking-widest2 text-cream/45">Order details</p>
            <div className="mt-4 flex items-end justify-between border-b border-cream/10 pb-5">
              <span className="font-display text-3xl font-light">{itemCount}</span>
              <span className="font-display text-xs uppercase tracking-widest2 text-cream/45">item{itemCount === 1 ? '' : 's'}</span>
            </div>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2">
                <span className="font-display text-[0.62rem] uppercase tracking-widest2 text-cream/45">Name optional</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="border-b border-cream/20 bg-transparent py-3 font-display text-sm text-cream placeholder:text-cream/28 focus:border-cream focus:outline-none" />
              </label>

              <label className="grid gap-2">
                <span className="font-display text-[0.62rem] uppercase tracking-widest2 text-cream/45">Delivery address optional</span>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Area, building, phone alternate..." rows={3} className="resize-none border-b border-cream/20 bg-transparent py-3 font-display text-sm leading-relaxed text-cream placeholder:text-cream/28 focus:border-cream focus:outline-none" />
              </label>

              <label className="grid gap-2">
                <span className="font-display text-[0.62rem] uppercase tracking-widest2 text-cream/45">Notes optional</span>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Gift wrap, delivery timing, or questions" rows={3} className="resize-none border-b border-cream/20 bg-transparent py-3 font-display text-sm leading-relaxed text-cream placeholder:text-cream/28 focus:border-cream focus:outline-none" />
              </label>
            </div>

            {/* Primary send button */}
            <button
              disabled={items.length === 0}
              onClick={() => {
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                setTimeout(() => setShowFallback(true), 2000);
              }}
              className={`mt-8 flex w-full items-center justify-center gap-3 px-6 py-4 font-display text-xs uppercase tracking-widest2 transition-colors duration-300 ${items.length === 0 ? 'cursor-not-allowed bg-cream/10 text-cream/30' : 'bg-plum text-cream hover:bg-cream hover:text-ink'}`}
            >
              Send order via WhatsApp
              <Send size={14} />
            </button>

            {/* Fallback panel — shown after user clicks, in case wa.me fails */}
            {showFallback && items.length > 0 && (
              <div className="mt-3 border border-cream/12 bg-cream/[0.06] p-4">
                <button
                  onClick={() => setShowFallback(false)}
                  className="flex w-full items-center justify-between"
                >
                  <span className="font-display text-[0.6rem] uppercase tracking-widest2 text-cream/50">
                    WhatsApp not opening?
                  </span>
                  <ChevronDown size={13} className="text-cream/40" />
                </button>

                <div className="mt-3 grid gap-2">
                  {/* WhatsApp Web direct link */}
                  <a
                    href={whatsappWebUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between border border-cream/14 bg-cream/[0.05] px-4 py-3 font-display text-[0.65rem] uppercase tracking-widest text-cream/70 transition-colors hover:border-cream/30 hover:text-cream"
                  >
                    Open WhatsApp Web directly
                    <ExternalLink size={12} className="shrink-0" />
                  </a>

                  {/* Copy order to clipboard */}
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-between border border-cream/14 bg-cream/[0.05] px-4 py-3 font-display text-[0.65rem] uppercase tracking-widest text-cream/70 transition-colors hover:border-cream/30 hover:text-cream"
                  >
                    {copied ? (
                      <>
                        <span className="text-plum-mist">Copied, paste into WhatsApp</span>
                        <Check size={12} className="shrink-0 text-plum-mist" />
                      </>
                    ) : (
                      <>
                        Copy order to clipboard
                        <ClipboardCopy size={12} className="shrink-0" />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-3 font-display text-[0.58rem] leading-relaxed text-cream/32">
                  Open WhatsApp, start a chat with +971 50 314 2399, and paste your order.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
