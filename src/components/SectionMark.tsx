import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface SectionMarkProps {
  eyebrow: string;
  arrow?: 'up-right' | 'down-left';
  tone?: 'light' | 'dark';
}

export default function SectionMark({ eyebrow, arrow = 'up-right', tone = 'light' }: SectionMarkProps) {
  const colorClass = tone === 'light' ? 'text-cream' : 'text-ink';
  const Icon = arrow === 'up-right' ? ArrowUpRight : ArrowDownLeft;

  return (
    <div className={`flex items-center justify-between ${colorClass}`}>
      <div className="flex items-center gap-3">
        <span className="vrule h-4" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <Icon className="corner-mark" strokeWidth={1.25} aria-hidden="true" />
    </div>
  );
}
