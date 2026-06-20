import { useEffect, useRef, useState } from 'react';

/**
 * Watches a list of section ids inside a scroll container and reports
 * whichever one currently has the most visible area — used to highlight
 * the active stop in the navbar and the side index rail.
 */
export function useActiveSection(ids: string[], rootRef: React.RefObject<HTMLElement>) {
  const [active, setActive] = useState(ids[0]);
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current.set(entry.target.id, entry.intersectionRatio);
        });
        let bestId = active;
        let bestRatio = 0;
        ratios.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestRatio > 0) setActive(bestId);
      },
      { root, threshold: [0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, rootRef]);

  return active;
}
