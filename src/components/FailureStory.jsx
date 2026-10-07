import { useEffect, useRef, useState } from 'react';
import { story } from '../data/narrative';
import Icon from './Icon';

const STEP_MS = 1900;

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function FailureStory() {
  const { steps, nodes, acts } = story;
  const [reduced] = useState(prefersReduced);
  const [i, setI] = useState(reduced ? steps.length - 1 : 0);
  const [playing, setPlaying] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);

  // Start once the diagram is actually on screen.
  useEffect(() => {
    if (reduced || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          setPlaying(true);
        }
      },
      { threshold: 0.45 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [reduced, seen]);

  const running = playing && i < steps.length - 1;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setI((n) => n + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [running, i]);

  const step = steps[i];
  const actSteps = acts.map((_, a) => steps.map((s, idx) => (s.act === a ? idx : -1)).filter((x) => x >= 0));
  const atIdx = nodes.findIndex((n) => n.id === step.at);

  const nodeState = (n, idx) => {
    if (step.act === 0) {
      if (idx < atIdx) return 'pass';
      if (idx === atIdx) return i === actSteps[0].at(-1) ? 'ok' : 'active';
      return 'idle';
    }
    return step.state?.[n.id] || 'idle';
  };

  const jumpToAct = (a) => {
    setI(reduced ? actSteps[a].at(-1) : actSteps[a][0]);
    setPlaying(!reduced);
  };

  const replay = () => {
    if (reduced) {
      setI((n) => (n + 1) % steps.length);
      return;
    }
    setI(0);
    setPlaying(true);
  };

  const finished = i === steps.length - 1;

  return (
    <div className="story" ref={ref}>
      <div className="story__panel">
        <div className="story__inner">
          <div className="story__progress" role="group" aria-label="Story progress">
            {acts.map((label, a) => {
              const list = actSteps[a];
              const pos = list.indexOf(i);
              const fill = step.act > a ? 100 : step.act === a ? ((pos + 1) / list.length) * 100 : 0;
              return (
                <button
                  key={label}
                  type="button"
                  className={`story__act${step.act === a ? ' is-current' : ''}`}
                  onClick={() => jumpToAct(a)}
                >
                  <span className="story__bar">
                    <span style={{ width: `${fill}%` }} />
                  </span>
                  <span className="story__actlabel">
                    0{a + 1} {label}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            Act {step.act + 1} of 3, {acts[step.act]}. {step.caption}
          </p>

          <div className={`story__pill tone-${step.pill[1]}`}>
            <span className="dot" aria-hidden="true" />
            {step.pill[0]}
          </div>

          <ol className="flow" aria-label="System flow">
            {nodes.map((n, idx) => {
              const st = nodeState(n, idx);
              const here = idx === atIdx;
              return (
                <li key={n.id} className={`flow__node st-${st}${here ? ' is-here' : ''}`}>
                  {n.icon ? (
                    <span className="flow__icon">
                      <Icon name={n.icon} size={34} strokeWidth={1.5} />
                      {st === 'fail' && <span className="flow__badge">✕</span>}
                      {(st === 'retry' || st === 'wait') && <span className="flow__badge flow__badge--retry">↻</span>}
                    </span>
                  ) : null}
                  <span className={n.icon ? 'flow__label' : 'flow__box'}>
                    {n.label}
                    {!n.icon && st === 'fail' && <span className="flow__badge">✕</span>}
                    {!n.icon && (st === 'retry' || st === 'wait') && (
                      <span className="flow__badge flow__badge--retry">↻</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>

          <p className="story__caption" key={i}>
            {step.caption}
          </p>
        </div>
      </div>

      <div className="story__foot">
        <button type="button" className="btn-ghost" onClick={replay} disabled={running}>
          {running ? 'Playing' : reduced ? 'Next step' : finished ? 'Watch it again' : 'Watch what happens'}
          <Icon name="arrow" size={14} />
        </button>
        <p className="eyebrow">Why this is the first thing here</p>
        <p className="story__why">{story.why}</p>
        <a className="link-arrow" href="#work">
          See the systems behind this →
        </a>
      </div>
    </div>
  );
}
