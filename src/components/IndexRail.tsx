import { sections } from '../data/sections';

interface IndexRailProps {
  active: string;
  onNavigate: (id: string) => void;
}

export default function IndexRail({ active, onNavigate }: IndexRailProps) {
  const railSections = sections.filter((s) => s.id !== 'cart');
  const activeIdx = railSections.findIndex((s) => s.id === active);
  const progress = activeIdx < 0 ? 0 : ((activeIdx + 1) / railSections.length) * 100;

  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 rounded-full bg-ink/35 px-2.5 py-5 backdrop-blur-xl sm:right-8 xl:flex" aria-label="Page sections">
      {railSections.map((s, i) => {
        const isActive = s.id === active;
        return (
          <button key={s.id} onClick={() => onNavigate(s.id)} className="group relative flex h-5 w-5 items-center justify-center" aria-label={`Go to ${s.label}`} aria-current={isActive}>
            <span className={`eyebrow absolute right-8 whitespace-nowrap bg-ink/70 px-2 py-1 text-cream backdrop-blur-md transition-all duration-300 ${isActive ? 'translate-x-0 opacity-90' : 'translate-x-1 opacity-0 group-hover:opacity-70'}`}>
              {String(i + 1).padStart(2, '0')} · {s.label}
            </span>
            <span className={`block rounded-full border transition-all duration-300 ${isActive ? 'h-2.5 w-2.5 border-cream bg-cream' : 'h-1.5 w-1.5 border-cream/45 bg-transparent group-hover:border-cream'}`} />
          </button>
        );
      })}

      <span className="mt-1 h-16 w-px bg-cream/15">
        <span className="block w-px bg-cream transition-all duration-500 ease-editorial" style={{ height: `${progress}%` }} />
      </span>
    </div>
  );
}
