'use client';
import React from 'react';
import LogoSvg from './LogoSvg';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const EmailIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Footer({ nav, footer, currentLang, onNavClick }) {
  const f = footer || {};

  const navLinks = [
    { id: 'home', label: nav.home },
    { id: 'about', label: nav.about },
    { id: 'services', label: nav.services },
    { id: 'showcase', label: nav.showcase },
    { id: 'contact', label: nav.contact },
  ];

  const headingStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.72rem', fontWeight: 300,
    letterSpacing: '0.18em', textTransform: 'none',
    color: 'var(--accent-secondary)', marginBottom: '20px',
    display: 'block'
  };

  const bodyStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--charcoal)',
    lineHeight: 1.7,
    opacity: 0.85
  };

  const linkStyle = {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    textDecoration: 'none',
    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
    color: 'var(--charcoal)', opacity: 0.85,
    transition: 'all var(--transition)',
    lineHeight: 1.6
  };

  return (
    <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-muted)' }}>
      {/* Main footer grid */}
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '64px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          alignItems: 'start'
        }}>

          {/* Col 1 — Brand Logo & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
              <LogoSvg size={92} color="var(--accent-primary)" armColor="var(--charcoal)" />
              <span className="brand-preserve-case" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'none',
                color: 'var(--accent-secondary)'
              }}>
                The Two Planner
              </span>
            </div>
            <p style={bodyStyle}>
              {f.tagline}
            </p>
          </div>

          {/* Col 2 — Navigation Explore */}
          <div>
            <span style={headingStyle}>{currentLang === 'en' ? 'Explore' : 'Khám phá'}</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
              {navLinks.map(link => (
                <li key={link.id}>
                  <button
                    style={{
                      border: 'none', background: 'none', padding: 0,
                      fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                      color: 'var(--charcoal)', cursor: 'pointer',
                      opacity: 0.85, transition: 'opacity var(--transition)',
                      textAlign: 'left'
                    }}
                    onClick={() => onNavClick(link.id)}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.85}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Clickable Services */}
          <div>
            <span style={headingStyle}>{f.servicesTitle}</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
              {(f.servicesList || []).map((svc, i) => (
                <li key={i}>
                  <button
                    style={{
                      border: 'none', background: 'none', padding: 0,
                      fontFamily: 'var(--font-body)', fontSize: '0.83rem',
                      color: 'var(--charcoal)', cursor: 'pointer',
                      opacity: 0.8, transition: 'opacity var(--transition)',
                      textAlign: 'left', lineHeight: 1.4
                    }}
                    onClick={() => onNavClick('services')}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
                  >
                    {svc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact & Socials */}
          <div>
            <span style={headingStyle}>{f.contactTitle}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href={`mailto:${f.email}`} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.85}>
                <EmailIcon size={15} />
                <span>{f.email}</span>
              </a>
              <a href={`tel:${f.phoneLyTel || '+84984898070'}`} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.85}>
                <PhoneIcon size={15} />
                <span>{f.phoneLy}</span>
              </a>
              <a href={`tel:${f.phoneNhiTel || '+84862366956'}`} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.85}>
                <PhoneIcon size={15} />
                <span>{f.phoneNhi}</span>
              </a>
              <a href="https://instagram.com/thetwo.planner" target="_blank" rel="noopener noreferrer" style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.85}>
                <InstagramIcon size={15} />
                <span>{f.instagram}</span>
              </a>
              <a href="https://facebook.com/thetwoplanner" target="_blank" rel="noopener noreferrer" style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.85}>
                <FacebookIcon size={15} />
                <span>{f.facebook || 'The Two Planner'}</span>
              </a>
              <div style={{ ...bodyStyle, display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
                <MapPinIcon size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div>{f.location}</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.7 }}>{f.locationSub}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature strip */}
      <div style={{ borderTop: '1px solid var(--border-muted)', backgroundColor: 'var(--white)' }}>
        <div className="container" style={{
          paddingTop: '20px', paddingBottom: '20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px'
        }}>
          <p className="footer-signature">
            <span className="footer-signature-script">the two</span>
            <span className="footer-signature-separator" aria-hidden="true">·</span>
            <span className="footer-signature-script">for you two</span>
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--charcoal)', opacity: 0.5, letterSpacing: '0.08em', margin: 0, textTransform: 'none' }}>
            {f.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
