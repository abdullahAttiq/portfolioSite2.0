import { Link } from 'react-router-dom';
import content from '../content';
import {
  identity,
  heroStats,
  timeline,
  story,
  unhappy,
  work,
  projectExtras,
  approach,
  decisions,
  aboutBlock,
  contactBlock,
  evidenceCount,
  projectName,
} from '../data/narrative';
import FailureStory from '../components/FailureStory';
import ApproachFlow from '../components/ApproachFlow';
import Icon from '../components/Icon';

const { site, projects, projectOrder } = content;

function SectionHead({ num, kicker, title, children, id }) {
  return (
    <div className="section-head">
      {kicker && <p className="kicker">{kicker}</p>}
      <p className="eyebrow">Section {String(num).padStart(2, '0')}</p>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-head__intro">{children}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <main id="main">
      {/* ── 01 IDENTITY ─────────────────────────────────────────────────── */}
      <section className="hero" aria-label="Engineering identity">
        <div className="hero__id">
          <img className="hero__avatar" src="/assets/avatar.jpg" alt={site.name} width="88" height="88" />
          <p className="eyebrow">{identity.role}</p>
          <h1 className="hero__title">{identity.headline}</h1>
          <p className="hero__lede">{identity.lede}</p>
          <p className="hero__focus">{identity.focus.join(' · ')}</p>
        </div>

        <div className="hero__proof">
          <dl className="stats">
            {heroStats.map((s) => (
              <div key={s.unit} className="stat">
                <dt>{s.num}</dt>
                <dd>
                  <span className="stat__unit">{s.unit}</span>
                  <span className="stat__ctx">{s.ctx}</span>
                </dd>
              </div>
            ))}
          </dl>
          <ul className="timeline">
            {timeline.map((t, i) => (
              <li key={i} className={t.current ? 'is-current' : ''}>
                <span className="timeline__k">{t.k}</span>
                <span className="timeline__v">{t.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="story-head">
          <h2>{story.heading}</h2>
          <p>{story.sub}</p>
        </div>
      </section>
      <FailureStory />

      {/* ── 02 UNHAPPY PATH ─────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="h-unhappy">
        <div className="wrap">
          <SectionHead num={2} kicker="What makes the difference" title={unhappy.heading} id="h-unhappy" />
          <ul className="unhappy">
            {unhappy.cases.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="unhappy__turn">
            <p>{unhappy.turn}</p>
            <p className="strong">{unhappy.close}</p>
          </div>
          <p className="tag tag--red">{unhappy.tag}</p>
        </div>
      </section>

      {/* ── 03 WORK ─────────────────────────────────────────────────────── */}
      <section className="section section--flush" id="work" aria-labelledby="h-work">
        <div className="wrap">
          <SectionHead num={3} kicker="What is actually shipped" title={work.heading} id="h-work">
            {work.intro}
          </SectionHead>
        </div>
        <div className="work">
          {projectOrder.map((slug) => {
            const p = projects[slug];
            const x = projectExtras[slug];
            const name = projectName(slug);
            return (
              <Link key={slug} to={`/work/${slug}`} className="work-row" aria-label={`Read the engineering behind ${name}`}>
                <div className="work-row__name">
                  <span className="work-row__title">{name}</span>
                  <span className="work-row__cat">{x.category}</span>
                </div>
                <p className="work-row__hook">{x.hook}</p>
                <div className="work-row__stat">
                  <span className="num">{x.stat.num}</span>
                  <span className="unit">{x.stat.unit}</span>
                </div>
                <div className="work-row__handles">
                  <span className="tag tag--green">Handles</span>
                  {x.handles.map((h, i) => (
                    <span key={h}>
                      {i > 0 && <span className="sep">·</span>}
                      {h}
                    </span>
                  ))}
                </div>
                <div className="work-row__foot">
                  <span className="work-row__read">
                    Read the engineering <Icon name="arrow" size={15} />
                  </span>
                  <span className="work-row__count">
                    {p.meta.client} · {p.meta.year} · {evidenceCount(slug)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 04 APPROACH ─────────────────────────────────────────────────── */}
      <section className="section section--flush" id="approach" aria-labelledby="h-approach">
        <div className="wrap">
          <SectionHead num={4} kicker="How I engineer" title={approach.heading} id="h-approach">
            {approach.body}
          </SectionHead>
        </div>
        <div className="band">
          <ApproachFlow />
        </div>
      </section>

      {/* ── 05 DECISIONS ────────────────────────────────────────────────── */}
      <section className="section" id="decisions" aria-labelledby="h-decisions">
        <div className="wrap">
          <SectionHead num={5} kicker="Trade-offs, not tools" title={decisions.heading} id="h-decisions">
            {decisions.intro}
          </SectionHead>
          <div className="decisions">
            {decisions.items.map((d) => (
              <article key={d.q} className="decision">
                <h3>{d.q}</h3>
                <p>{d.a}</p>
                <Link className="decision__src" to={`/work/${d.slug}`}>
                  {projectName(d.slug)} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 ABOUT ────────────────────────────────────────────────────── */}
      <section className="section" id="about" aria-labelledby="h-about">
        <div className="wrap">
          <SectionHead num={6} kicker="The person behind it" title={aboutBlock.heading} id="h-about" />
          <div className="about">
            <aside className="about__side">
              <img src="/assets/headshot.jpg" alt={site.name} width="256" height="256" loading="lazy" />
              <dl className="facts">
                {aboutBlock.facts.map((f) => (
                  <div key={f.k} className={f.status ? 'is-status' : ''}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                    {f.sub && <dd className="facts__sub">{f.sub}</dd>}
                  </div>
                ))}
              </dl>
              <a className="btn-outline" href={site.socials.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={16} /> Verify on LinkedIn
              </a>
            </aside>

            <div className="about__body">
              {aboutBlock.bio.slice(0, 3).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <blockquote>{aboutBlock.quote}</blockquote>

              <h3 className="about__h">Track record</h3>
              <ol className="xp">
                {aboutBlock.experience.map((e) => (
                  <li key={e.year + e.company}>
                    <span className="xp__year">{e.year.replace(/'/g, '’')}</span>
                    <div>
                      <p className="xp__role">
                        {e.role} <span>· {e.company}</span>
                      </p>
                      <p className="xp__desc">{e.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h3 className="about__h">Toolbox</h3>
              <div className="skills">
                {aboutBlock.skills.map((g) => (
                  <div key={g.category}>
                    <p className="eyebrow">{g.category}</p>
                    <ul>
                      {g.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 CONTACT ──────────────────────────────────────────────────── */}
      <section className="section" id="contact" aria-labelledby="h-contact">
        <div className="wrap">
          <SectionHead num={7} title={contactBlock.heading} id="h-contact">
            {contactBlock.body}
          </SectionHead>
          <div className="contact">
            <div className="contact__primary">
              <a className="btn-solid" href={`mailto:${site.email}`}>
                <Icon name="mail" size={16} /> Email me
              </a>
              <a className="btn-outline" href={contactBlock.whatsapp} target="_blank" rel="noreferrer">
                <Icon name="chat" size={16} /> Message on WhatsApp
              </a>
            </div>
            <p className="contact__email">{site.email}</p>
            <div className="contact__secondary">
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={16} /> LinkedIn
              </a>
              <a href={site.socials.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={16} /> GitHub
              </a>
              <a href={site.cvUrl} download>
                <Icon name="file" size={16} /> Résumé (PDF)
              </a>
            </div>
            <p className="tag tag--green">{identity.status}</p>
            <p className="tag">
              {identity.location}, {identity.timezone}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
