import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import content from '../content';
import { projectExtras, projectName } from '../data/narrative';
import ScenarioCard from '../components/ScenarioCard';
import Icon from '../components/Icon';

const { projects, projectOrder } = content;

const caption = (alt) => (alt.includes('—') ? alt.split('—').pop().trim() : alt);

function Media({ m, priority }) {
  if (m.type === 'video') {
    return (
      <video src={m.src} aria-label={m.alt} autoPlay muted loop playsInline preload={priority ? 'auto' : 'metadata'} />
    );
  }
  return <img src={m.src} alt={m.alt} loading={priority ? 'eager' : 'lazy'} />;
}

export default function CaseStudy() {
  const { slug } = useParams();
  const p = projects[slug];
  const x = projectExtras[slug];

  useEffect(() => {
    if (p) document.title = `${projectName(slug)}: ${x.hook}`;
    return () => {
      document.title = `${content.site.name} — Senior Blockchain Engineer`;
    };
  }, [p, x, slug]);

  if (!p || !x) return <Navigate to="/" replace />;

  const name = projectName(slug);
  const idx = projectOrder.indexOf(slug);
  const nextSlug = projectOrder[(idx + 1) % projectOrder.length];
  const media = [p.hero, ...(p.gallery || [])].filter(Boolean);
  const links = x.hideLinks ? [] : p.links || [];
  const live = links.find((l) => l.href && l.href !== '#' && /live/i.test(l.label));
  const code = links.find((l) => l.href && l.href !== '#' && /code/i.test(l.label));
  const stack = p.meta.stack.split(',').map((s) => s.trim());

  return (
    <main id="main" className="case">
      <div className="wrap">
        <Link to="/#work" className="back">
          <Icon name="back" size={16} /> All work
        </Link>

        <header className="case__head">
          <p className="eyebrow">{x.category}</p>
          <h1>{name}</h1>
          <p className="case__hook">{x.hook}</p>
          <p className="case__meta">
            {p.meta.client} · {p.meta.year} · {p.meta.role}
            {live && (
              <>
                {' · '}
                <a href={live.href} target="_blank" rel="noreferrer">Live ↗</a>
              </>
            )}
            {code && (
              <>
                {' · '}
                <a href={code.href} target="_blank" rel="noreferrer">Case study repo ↗</a>
              </>
            )}
          </p>
        </header>

        <dl className="case__stats">
          {p.stats.items.map((s) => (
            <div key={s.label}>
              <dt>{s.num.replace(/\s/g, '')}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>

        <figure className="case__hero">
          <Media m={p.hero} priority />
        </figure>

        <div className="case__intro">
          <div className="prose">
            <p className="case__lead">{p.overview.displayHeading}</p>
            {p.overview.paragraphs.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <aside className="case__aside">
            <p className="eyebrow">What I owned</p>
            <p>{x.owned}</p>
            <p className="eyebrow">Scale</p>
            <p>{x.scale}</p>
          </aside>
        </div>

        <section className="case__section">
          <h2>What made it hard</h2>
          <div className="prose">
            {p.problem.paragraphs.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            <ul className="bullets">
              {p.problem.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="strong">{p.problem.outro}</p>
          </div>
        </section>

        <section className="case__section">
          <h2>What I built</h2>
          <p className="prose case__approach-intro">{p.approach.intro}</p>
          <div className="pillars">
            {p.approach.sections.map((s, i) => (
              <div key={s.heading} className="pillar">
                <span className="pillar__num">0{i + 1}</span>
                <h3>{s.heading}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="band band--cards" aria-labelledby="h-handles">
        <div className="wrap">
          <h2 id="h-handles">What it already handles</h2>
          <div className="scenarios">
            {x.scenarios.map((s) => (
              <ScenarioCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="case__section">
          <h2>Failure modes</h2>
          <div className="fm" role="table" aria-label="Failure modes">
            <div className="fm__row fm__row--head" role="row">
              <span role="columnheader">Failure</span>
              <span role="columnheader">How it is caught</span>
              <span role="columnheader">What happens next</span>
            </div>
            {x.failures.map((f) => (
              <div key={f.failure} className="fm__row" role="row">
                <span role="cell" className="fm__failure">{f.failure}</span>
                <span role="cell" data-label="Caught by">{f.caught}</span>
                <span role="cell" data-label="Then">{f.next}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="case__section">
          <h2>Why I chose what I chose</h2>
          <div className="decisions decisions--case">
            {x.decisions.map((d) => (
              <article key={d.q} className="decision">
                <h3>{d.q}</h3>
                <p>{d.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case__section">
          <h2>What happened</h2>
          <div className="prose">
            {p.outcome.paragraphs.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            {p.pullQuote && <blockquote>{p.pullQuote.quote.replace(/^"|"$/g, '')}</blockquote>}
          </div>
        </section>
      </div>

      {media.length > 1 && (
        <section className="band band--gallery" aria-labelledby="h-product">
          <div className="wrap">
            <h2 id="h-product">The product</h2>
            <div className="gallery">
              {media.slice(1).map((m) => (
                <figure key={m.src} className={m.wide ? 'is-wide' : ''}>
                  <Media m={m} />
                  <figcaption>{caption(m.alt)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="wrap">
        <section className="case__section case__stack">
          <p className="eyebrow">Stack</p>
          <p>{stack.join(' · ')}</p>
        </section>

        <Link to={`/work/${nextSlug}`} className="next">
          <span className="eyebrow">Next</span>
          <span className="next__title">
            {projectName(nextSlug)} <Icon name="arrow" size={22} />
          </span>
          <span className="next__hook">{projectExtras[nextSlug].hook}</span>
        </Link>
      </div>
    </main>
  );
}
