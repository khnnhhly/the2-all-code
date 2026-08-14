import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Globe, ChevronDown, Heart, BookOpen, Search, CalendarDays, Palette, Rocket, Clock, Lightbulb, Trash2, MapPin, Check, XIcon } from 'lucide-react';
import { translationData } from './translationData';
import LogoSvg from './components/LogoSvg';
import Home from './components/Home';
import About from './components/About';
import Team from './components/Team';
import Services from './components/Services';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// ─── Inline Section Components ───

function preserveBrandCase(root) {
  if (!root) return;

  const brandName = 'The Two Planner';
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (
        !parent ||
        !node.nodeValue.includes(brandName) ||
        parent.closest('.brand-preserve-case') ||
        ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(parent.tagName)
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const parts = node.nodeValue.split(brandName);

    parts.forEach((part, index) => {
      if (part) fragment.appendChild(document.createTextNode(part));
      if (index < parts.length - 1) {
        const span = document.createElement('span');
        span.className = 'brand-preserve-case';
        span.textContent = brandName;
        fragment.appendChild(span);
      }
    });

    node.parentNode.replaceChild(fragment, node);
  });
}

function ExperienceSection({ t, currentLang }) {
  const stepIcons = [Search, CalendarDays, Palette, Rocket];
  return (
    <div id="experience">
      <section style={{ backgroundColor: 'var(--cream)', borderBottom: '1px solid var(--border-color)', padding: '120px 0 60px 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="eyebrow reveal-on-scroll"><Clock size={14} strokeWidth={1.5} style={{ marginRight: '6px', verticalAlign: 'middle' }} />{t.expLabel}</span>
          <h2 className="reveal-on-scroll delay-100 exp-title-single-line" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: 'var(--charcoal)', marginBottom: '32px'
          }}>
            {t.expTitle}
          </h2>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="bento-grid-2" style={{ gap: '20px' }}>
            {t.steps.map((step, idx) => (
              <div key={idx} className="bento-card reveal-on-scroll" style={{
                display: 'flex', flexDirection: 'column', gap: '12px',
                transitionDelay: `${idx * 60}ms`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {(() => { const Icon = stepIcons[idx] || Search; return <Icon size={22} strokeWidth={1.5} style={{ color: 'var(--accent-primary)' }} />; })()}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    phase 0{idx + 1}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--charcoal)', margin: '4px 0 0 0', fontWeight: 300 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function MattersSection({ t, currentLang }) {
  return (
    <div id="matters">
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-neutral)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal-on-scroll">
            <span className="eyebrow" style={{ backgroundColor: 'var(--sage)' }}><Lightbulb size={14} strokeWidth={1.5} style={{ marginRight: '6px', verticalAlign: 'middle' }} />{t.mattersLabel}</span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: 'var(--charcoal)', fontWeight: 300, marginTop: '8px'
            }}>
              {t.mattersTitle}
            </h2>
          </div>

          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {/* We Care About */}
            <div className="bento-card reveal-on-scroll" style={{ backgroundColor: 'var(--white)' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.4rem',
                color: 'var(--charcoal)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 300
              }}>
                <Heart size={20} strokeWidth={1.5} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} /> {t.careTitle}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {t.carePoints.map((point, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    fontSize: '0.98rem', color: 'var(--charcoal)', lineHeight: 1.6
                  }}>
                    <Check size={16} strokeWidth={1.5} style={{ color: 'var(--accent-secondary)', flexShrink: 0, marginTop: '4px' }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function JournalSection({ t, currentLang }) {
  return (
    <div id="journal">
      <section className="section-padding" style={{ backgroundColor: 'var(--cream)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div className="reveal-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <span className="eyebrow"><BookOpen size={14} strokeWidth={1.5} style={{ marginRight: '6px', verticalAlign: 'middle' }} />{t.journalLabel}</span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: 'var(--charcoal)', fontWeight: 300
            }}>
              {t.journalSub}
            </h2>
            <p style={{
              fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7,
              maxWidth: '650px', margin: 0
            }}>
              {t.journalDesc}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="reveal-on-scroll" style={{ marginBottom: '24px' }}>
            <span className="eyebrow" style={{ backgroundColor: 'var(--sage)' }}><MapPin size={14} strokeWidth={1.5} style={{ marginRight: '6px', verticalAlign: 'middle' }} />{t.topicsTitle}</span>
          </div>
          <div className="bento-grid-3" style={{ gap: '16px' }}>
            {t.topicsList.map((topic, idx) => (
              <div key={idx} className="bento-card reveal-on-scroll" style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '16px 20px',
                cursor: 'default',
                transitionDelay: `${(idx % 3) * 60}ms`
              }}>
                <BookOpen size={16} strokeWidth={1.5} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--charcoal)', lineHeight: 1.4, fontWeight: 300 }}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Main App ───

export default function App() {
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showcaseProjectId, setShowcaseProjectId] = useState(null);

  const t = translationData[lang];

  // ─── Scroll handler for navbar ───
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Scroll-reveal observer ───
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    }, 100);

    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [lang, currentPage]); // re-trigger on lang or page change

  useEffect(() => {
    const timer = setTimeout(() => {
      const root = document.getElementById('root');
      preserveBrandCase(root);
    }, 0);
    return () => clearTimeout(timer);
  }, [lang, currentPage, mobileMenuOpen, servicesMenuOpen, showcaseProjectId]);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return undefined;

    const observer = new MutationObserver(() => {
      preserveBrandCase(root);
    });

    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback((id, options = {}) => {
    if (id === 'showcase') {
      setShowcaseProjectId(options.projectId || null);
    } else {
      setShowcaseProjectId(null);
    }
    setCurrentPage(id);
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'showcase', label: t.nav.showcase },
    { id: 'contact', label: t.nav.contact },
  ];

  const linkColor = scrolled ? 'var(--charcoal)' : '#ffffff';

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>

      {/* ─── NAVIGATION ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        transition: 'all var(--transition)',
        backgroundColor: scrolled || currentPage !== 'home' ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled || currentPage !== 'home' ? 'blur(12px)' : 'none',
        borderBottom: scrolled || currentPage !== 'home' ? '1px solid var(--border-muted)' : '1px solid transparent',
        padding: scrolled || currentPage !== 'home' ? '12px 0' : '28px 0'
      }}>
        <div className="nav-container">

          {/* Left: Logo */}
          <button onClick={() => handleNavClick('home')} style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, gap: '4px'
          }}>
            <LogoSvg
              size={scrolled || currentPage !== 'home' ? 74 : 92}
              color={scrolled || currentPage !== 'home' ? 'var(--accent-primary)' : '#ffffff'}
              armColor={scrolled || currentPage !== 'home' ? 'var(--charcoal)' : '#ffffff'}
            />
            <span className="brand-preserve-case" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '10px',
              fontWeight: 300,
              letterSpacing: '0.15em',
              textTransform: 'none',
              color: scrolled || currentPage !== 'home' ? 'var(--charcoal)' : '#ffffff',
              transition: 'color var(--transition)'
            }}>
              The Two Planner
            </span>
          </button>

          {/* Center: Navigation Links — desktop only */}
          <div className="desktop-nav-links" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            {navItems.map(link => {
              const isActive = currentPage === link.id;
              const activeColor = 'var(--accent-secondary)';
              const baseColor = (currentPage !== 'home') ? 'var(--charcoal)' : linkColor;
              return (
                <button key={link.id} onClick={() => handleNavClick(link.id)}
                  className="nav-link-btn"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontWeight: 500,
                    fontSize: '16px',
                    letterSpacing: '0.04em',
                    color: isActive ? activeColor : baseColor,
                    position: 'relative', padding: '6px 0',
                    transition: 'color var(--transition)',
                    whiteSpace: 'nowrap'
                  }}>
                  {link.label}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: isActive ? '100%' : '0', height: '1px',
                    backgroundColor: 'var(--accent-secondary)',
                    transition: 'width var(--transition)'
                  }} />
                </button>
              );
            })}
          </div>

          {/* Right: Language toggle + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            {/* Language toggle — two separate buttons side-by-side */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                onClick={() => setLang('en')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 0,
                  padding: '4px 2px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: '13px',
                  fontWeight: 500,
                  color: scrolled || currentPage !== 'home' ? 'var(--charcoal)' : '#ffffff',
                  transition: 'all var(--transition)',
                  opacity: lang === 'en' ? 1 : 0.62
                }}
              >
                EN
              </button>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: scrolled || currentPage !== 'home' ? 'var(--charcoal)' : '#ffffff',
                opacity: 0.42
              }}>|</span>
              <button
                onClick={() => setLang('vi')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 0,
                  padding: '4px 2px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: '13px',
                  fontWeight: 500,
                  color: scrolled || currentPage !== 'home' ? 'var(--charcoal)' : '#ffffff',
                  transition: 'all var(--transition)',
                  opacity: lang === 'vi' ? 1 : 0.62
                }}
              >
                VI
              </button>
            </div>

            {/* Hamburger — mobile only */}
              <button
                type="button"
                className="hamburger-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(prev => !prev);
                }}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: scrolled || currentPage !== 'home' ? 'var(--charcoal)' : '#ffffff',
                  padding: 8,
                  position: 'relative',
                  zIndex: 10002,
                  touchAction: 'manipulation'
                }}
              >{mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full-screen overlay (outside nav stacking) */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          onClick={() => setMobileMenuOpen(false)}
        >
          <button
            type="button"
            className="mobile-menu-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            {navItems.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  className="mobile-menu-link"
                  onClick={() => handleNavClick(link.id)}
                  style={{ color: isActive ? 'var(--accent-secondary)' : undefined }}
                >
                  {link.label}
                </button>
              );
            })}
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                {lang === 'en' ? 'Language' : 'Ngôn ngữ'}
              </span>
              <button
                type="button"
                onClick={() => { setLang('en'); setMobileMenuOpen(false); }}
                style={{
                  background: lang === 'en' ? '#ffffff' : 'transparent',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  color: lang === 'en' ? 'var(--charcoal)' : '#ffffff',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => { setLang('vi'); setMobileMenuOpen(false); }}
                style={{
                  background: lang === 'vi' ? '#ffffff' : 'transparent',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  color: lang === 'vi' ? 'var(--charcoal)' : '#ffffff',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }}
              >
                Tiếng Việt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PAGE ROUTED CONTENT ─── */}
      <main>
        {currentPage === 'home' && <Home t={t.home} currentLang={lang} setCurrentPage={handleNavClick} />}
        {currentPage === 'about' && (
          <>
            <About t={t.about} currentLang={lang} setCurrentPage={handleNavClick} />
            <Team t={t.about} currentLang={lang} setCurrentPage={handleNavClick} />
          </>
        )}
        {currentPage === 'services' && <Services t={t.services} currentLang={lang} setCurrentPage={handleNavClick} />}
        {currentPage === 'showcase' && <Showcase t={t.showcase} currentLang={lang} setCurrentPage={handleNavClick} targetProjectId={showcaseProjectId} />}
        {currentPage === 'contact' && <Contact t={t.contact} currentLang={lang} />}
      </main>

      {/* ─── FOOTER ─── */}
      <Footer nav={t.nav} footer={t.footer} currentLang={lang} onNavClick={handleNavClick} />

      {/* ─── Global Responsive CSS ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 769px) {
          .desktop-nav-links { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        .nav-link-btn:hover span:last-child {
          width: 100% !important;
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(16px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
