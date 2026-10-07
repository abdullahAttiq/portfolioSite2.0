import { useState } from 'react';
import { Link } from 'react-router-dom';
import content from '../content';

const links = [
  { label: 'Work', to: '/#work' },
  { label: 'Approach', to: '/#approach' },
  { label: 'Decisions', to: '/#decisions' },
  { label: 'About', to: '/#about' },
];

export default function Header({ hurry, onHurry }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header">
      <Link to="/" className="header__logo" onClick={close}>
        {content.site.name}
      </Link>

      <nav className={`header__nav${open ? ' is-open' : ''}`} aria-label="Primary">
        {links.map((l) => (
          <Link key={l.to} to={l.to} onClick={close}>
            {l.label}
          </Link>
        ))}
        <a href={content.site.socials.linkedin} target="_blank" rel="noreferrer" onClick={close}>
          LinkedIn
        </a>
        <a className="header__nav-cv" href={content.site.cvUrl} download onClick={close}>
          Résumé (PDF)
        </a>
      </nav>

      <div className="header__actions">
        <button
          type="button"
          className={`chip${hurry ? ' is-on' : ''}`}
          aria-pressed={hurry}
          onClick={onHurry}
        >
          <span className="chip__dot" aria-hidden="true" />
          Hurry mode
        </button>
        <a className="chip chip--live" href={content.site.cvUrl} download>
          <span className="chip__dot" aria-hidden="true" />
          Résumé
        </a>
        <button
          type="button"
          className="header__menu"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
