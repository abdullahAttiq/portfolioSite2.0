import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hurry } from '../data/narrative';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// "In 10 seconds": types the summary out line by line, the way you'd say it.
export default function HurryPanel({ onClose }) {
  const total = hurry.join('').length;
  const [typed, setTyped] = useState(() => (reduced() ? total : 0));

  useEffect(() => {
    if (typed >= total) return;
    const id = setTimeout(() => setTyped((t) => t + 2), 14);
    return () => clearTimeout(id);
  }, [typed, total]);

  // Where each line starts in the overall typing budget.
  const starts = hurry.map((_, i) => hurry.slice(0, i).join('').length);
  return (
    <aside className="hurry" aria-label="In 10 seconds">
      <div className="hurry__card">
        <div className="hurry__top">
          <span className="eyebrow eyebrow--blue">In 10 seconds</span>
          <button type="button" className="hurry__close" onClick={onClose} aria-label="Close hurry mode">
            ×
          </button>
        </div>
        <ul>
          {hurry.map((line, i) => {
            const budget = typed - starts[i];
            const shown = line.slice(0, Math.max(0, budget));
            const done = budget >= line.length;
            const typing = budget > 0 && !done;
            if (!shown) return null;
            return (
              <li key={i} className={done ? 'is-done' : ''}>
                {shown}
                {typing && <span className="caret" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
        {typed >= total && (
          <Link className="hurry__cta" to="/#contact">
            Get in touch →
          </Link>
        )}
      </div>
    </aside>
  );
}
