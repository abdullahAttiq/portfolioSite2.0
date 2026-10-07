import { approach } from '../data/narrative';
import Icon from './Icon';

// Two rows of steps, snaking left-to-right then continuing on the next row.
export default function ApproachFlow() {
  return (
    <div className="approach-flow">
      <p className="eyebrow approach-flow__label">{approach.label}</p>
      <ol className="approach-flow__list" aria-label="How I work through a system">
        {approach.rows.map((row, r) => (
          <li key={r} className={`approach-flow__row approach-flow__row--${r}`}>
            <ol>
              {row.map((s) => (
                <li key={s.label} className={`approach-step tone-${s.tone}${s.icon ? ' has-icon' : ''}`}>
                  {s.icon ? (
                    <>
                      <Icon name={s.icon} size={30} strokeWidth={1.6} />
                      <span>{s.label}</span>
                    </>
                  ) : (
                    <span className="approach-step__box">{s.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
