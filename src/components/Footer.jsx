import content from '../content';
import { identity } from '../data/narrative';

export default function Footer() {
  const { site } = content;
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="footer__name">{site.name}</p>
        <p className="footer__role">{identity.role}</p>
        <ul className="footer__focus">
          {identity.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="footer__tag">{identity.headline}</p>
        <nav className="footer__links" aria-label="Footer links">
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={site.socials.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={site.socials.twitter} target="_blank" rel="noreferrer">X</a>
          <a href={site.cvUrl} download>Résumé</a>
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} {site.name}.</p>
      </div>
    </footer>
  );
}
