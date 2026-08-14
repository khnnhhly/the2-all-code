import { useState } from 'react';
import { X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

export default function Team({ t, currentLang }) {
  const [activeMember, setActiveMember] = useState(null);

  if (!t) return null;

  const members = t.members || [];

  return (
    <div id="team">
      {/* Yearbook Editorial Collage Layout */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border-color)', padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: '1100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Our Team Header */}
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="eyebrow">{currentLang === 'vi' ? 'đội ngũ' : 'our team'}</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: 'var(--charcoal)',
              fontWeight: 400,
              marginTop: '12px',
              textTransform: 'none'
            }}>
              {t.teamTitle}
            </h2>
          </div>

          <div className="team-grid-container">
            {members.map((member, i) => (
              <button
                key={member.name}
                type="button"
                className="team-collage-card reveal-on-scroll"
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => setActiveMember(member)}
              >
                <div className="team-collage-inner">
                  <div className="team-collage-photo">
                    {member.img && (
                      <OptimizedImage
                        src={member.img}
                        alt={member.name}
                        maxWidth={480}
                        sizes="(max-width: 768px) 90vw, 270px"
                        className="team-collage-image"
                      />
                    )}
                    {member.strengths && (
                      <div className="team-collage-keywords">
                        {member.strengths.split(' · ').slice(0, 4).map((keyword) => (
                          <span key={keyword}>{keyword}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="team-collage-caption">
                    <h3 className="team-collage-name">{member.name}</h3>
                    <p className="team-collage-role">{member.role}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
        </div>
      </section>

      {/* Dynamic Story / Testimonial Block */}
      {t.closingQuote && (
        <section style={{ 
          backgroundImage: 'linear-gradient(rgba(20, 18, 18, 0.6), rgba(20, 18, 18, 0.6)), url(/assets/site-media/home-showcase-portrait-02.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'var(--white)', 
          padding: '140px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '380px',
          position: 'relative'
        }}>
          <div className="container reveal-on-scroll" style={{ 
            maxWidth: '850px', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            <h3 
              className="about-closing-quote"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                color: 'var(--white)',
                marginBottom: '32px',
                textAlign: 'center',
                lineHeight: 1.3,
                fontWeight: 400
              }}
            >
              "{t.closingQuote}"
            </h3>
            {t.closingCta && (
              <button 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: '#ffffff',
                  color: 'var(--accent-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  padding: '14px 36px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {t.closingCta}
              </button>
            )}
          </div>
        </section>
      )}

      {/* Team Member Bio Modal */}
      {activeMember && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(42, 37, 38, 0.4)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }} 
          onClick={() => setActiveMember(null)}
        >
          <div 
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-muted)',
              borderRadius: '8px',
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column'
            }} 
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveMember(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--white)',
                border: '1px solid var(--border-muted)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                zIndex: 10
              }}
            >
              <X size={18} strokeWidth={1.5} style={{ color: 'var(--charcoal)' }} />
            </button>

            {/* Modal Content */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '36px',
                padding: '44px'
              }} 
              className="modal-grid"
            >
              {/* Image */}
              <div>
                {activeMember.img ? (
                  <div className="image-container" style={{ aspectRatio: '3/4', width: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                    <OptimizedImage src={activeMember.img} alt={activeMember.name} maxWidth={960} sizes="(max-width: 768px) 90vw, 420px" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ aspectRatio: '3/4', width: '100%', backgroundColor: 'var(--cream)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--accent-secondary)' }}>{activeMember.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
              </div>

              {/* Info & Bio details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--charcoal)', margin: '0 0 6px 0', fontWeight: 400 }}>
                    {activeMember.name}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'none', color: 'var(--accent-secondary)' }}>
                    {activeMember.role}
                  </span>
                  {activeMember.stats && (
                    <div style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      {activeMember.stats}
                    </div>
                  )}
                </div>

                {/* Strengths Tags */}
                {activeMember.strengths && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {activeMember.strengths.split(' · ').map((str, idx) => (
                      <span key={idx} style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.72rem',
                        backgroundColor: 'var(--white)',
                        color: 'var(--charcoal)',
                        padding: '4px 12px',
                        borderRadius: '99px',
                        border: '1px solid var(--border-muted)',
                        textTransform: 'none'
                      }}>
                        {str}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bio text paragraph stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid var(--border-muted)', paddingTop: '20px' }}>
                  {activeMember.bio1 && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--charcoal)', opacity: 0.85, lineHeight: 1.7, margin: 0 }}>{activeMember.bio1}</p>}
                  {activeMember.bio2 && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--charcoal)', opacity: 0.85, lineHeight: 1.7, margin: 0 }}>{activeMember.bio2}</p>}
                  {activeMember.bio3 && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--charcoal)', opacity: 0.85, lineHeight: 1.7, margin: 0 }}>{activeMember.bio3}</p>}
                </div>

                {/* Direct personal Quote */}
                {activeMember.quote && (
                  <div style={{ borderLeft: '2px solid var(--accent-secondary)', paddingLeft: '16px', fontStyle: 'italic', marginTop: '8px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--charcoal)', lineHeight: 1.5, margin: 0 }}>
                      {activeMember.quote}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
