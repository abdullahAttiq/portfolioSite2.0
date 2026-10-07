import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import HurryPanel from './components/HurryPanel';
import Footer from './components/Footer';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';

const HURRY_KEY = 'aa.hurry';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Wait a frame for the target section to mount.
    requestAnimationFrame(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ block: 'start' });
    });
  }, [pathname, hash]);
  return null;
}

// Old portfolio URLs (/project/:slug) keep working.
function LegacyProject() {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug}`} replace />;
}

export default function App() {
  const [hurry, setHurry] = useState(() => {
    try {
      return localStorage.getItem(HURRY_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HURRY_KEY, hurry ? '1' : '0');
    } catch {
      /* storage unavailable: fine, it's a convenience */
    }
  }, [hurry]);

  return (
    <div className={`app${hurry ? ' is-hurry' : ''}`}>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollToHash />
      <Header hurry={hurry} onHurry={() => setHurry((v) => !v)} />
      {hurry && <HurryPanel onClose={() => setHurry(false)} />}
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/project/:slug" element={<LegacyProject />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
