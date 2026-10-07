import Icon from './Icon';

// A small vertical flow: what happens, what breaks, how it lands.
// flow entries are [label, icon | 'box', tone].
export default function ScenarioCard({ title, sub, flow, result }) {
  return (
    <article className="scenario">
      <h4 className="scenario__title">{title}</h4>
      <p className="scenario__sub">{sub}</p>
      <ol className="scenario__flow">
        {flow.map(([label, kind, tone]) => (
          <li key={label} className={`tone-${tone}`}>
            {kind === 'box' ? (
              <span className="scenario__box">{label}</span>
            ) : (
              <>
                <Icon name={kind} size={kind === 'x' ? 20 : 28} strokeWidth={kind === 'x' ? 2.2 : 1.6} />
                <span className="scenario__label">{label}</span>
              </>
            )}
          </li>
        ))}
      </ol>
      <p className={`scenario__result tone-${result[1]}`}>{result[0]}</p>
    </article>
  );
}
