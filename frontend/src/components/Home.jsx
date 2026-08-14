import { useEffect, useState } from 'react';
import LogoMarquee from './LogoMarquee';
import DriveVideoEmbed from './DriveVideoEmbed';
import HeroVideoBackground from './HeroVideoBackground';
import HomeShowcaseCarousel from './HomeShowcaseCarousel';
import HomeServiceRow from './HomeServiceRow';
import {
  HOME_WEDDING_SERVICES,
  HOME_EVENT_SERVICES,
  HOME_STAT_HIGHLIGHTS,
  COUPLES_DRIVE_VIDEO,
  CLOSING_SECTION_BG,
} from '../content/homeAssets';

export default function Home({ t, currentLang, setCurrentPage }) {
  const [heroColorized, setHeroColorized] = useState(false);
  const quoteParagraphs = t.quoteBodyParagraphs || (t.quoteBody ? [t.quoteBody] : []);
  const closingLines = t.closingParagraphs || [];
  const partnersLabel = t.partnersLabel || (currentLang === 'vi' ? 'chúng tôi đã đồng hành cùng' : 'we have worked with');
  const heroParagraphs = t.heroDescParagraphs || (t.heroDesc ? [t.heroDesc] : []);
  const statHighlights = HOME_STAT_HIGHLIGHTS[currentLang] || HOME_STAT_HIGHLIGHTS.en;
  const weddingServices = HOME_WEDDING_SERVICES[currentLang] || HOME_WEDDING_SERVICES.en;
  const eventServices = HOME_EVENT_SERVICES[currentLang] || HOME_EVENT_SERVICES.en;

  useEffect(() => {
    const tmr = window.setTimeout(() => setHeroColorized(true), 1400);
    return () => window.clearTimeout(tmr);
  }, []);

  const navigateToServiceDetail = (service) => {
    if (service?.id) {
      window.sessionStorage.setItem('pendingServiceId', service.id);
    }
    setCurrentPage(service?.page || 'services');
  };

  const renderHeroTitle = () => {
    if (!t.heroTitle && !t.heroTitleLine1 && !t.heroTitleLine2) {
      return null;
    }

    if (currentLang === 'vi') {
      if (t.heroTitleLine1 && t.heroTitleLine2) {
        return (
          <>
            <span className="hero-title-line">{t.heroTitleLine1}</span>
            <span className="hero-title-line">{t.heroTitleLine2}</span>
          </>
        );
      }
      return t.heroTitle;
    }

    return (
      <>
        <span className="hero-title-line">{t.heroTitleLine1}</span>
        <span className="hero-title-line">{t.heroTitleLine2}</span>
      </>
    );
  };

  const renderHeroLabel = () => {
    const label = t.heroLabel || '';
    if (label.includes('·')) {
      return <span className="hero-label-single">{label}</span>;
    }
    if (!label.includes(',')) return label;
    const [brand, rest] = label.split(',');
    return (
      <>
        <span className="hero-label-brand">{brand}</span>
        <span className="hero-label-rest">{rest.trim()}</span>
      </>
    );
  };

  const heroTitle = renderHeroTitle();

  return (
    <div id="home">
      {/* Hero */}
      <section className="hero-home">
        <HeroVideoBackground colorize={heroColorized} />
        <div className="hero-home-overlay" />

        <div
          className={`container hero-content-wrapper${currentLang === 'vi' ? ' hero-content-wrapper-vi' : ''}`}
        >
          <p
            className={`hero-tagline hero-tagline--animate brand-preserve-case preserve-copy-case${currentLang === 'vi' ? ' hero-home-eyebrow-vi' : ''}`}
            onAnimationEnd={() => setHeroColorized(true)}
          >
            {renderHeroLabel()}
          </p>

          {heroTitle && (
            <h1 className={`reveal-on-scroll delay-100 hero-home-title${currentLang === 'vi' ? ' hero-home-title-vi' : ' hero-home-title-en'}`}>
              {heroTitle}
            </h1>
          )}

          <div className={`reveal-on-scroll delay-200 brand-preserve-case${currentLang === 'vi' ? ' hero-home-subtext-vi' : ''} hero-home-subtext`}>
            {heroParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="hero-cta-links reveal-on-scroll delay-300">
            <button type="button" className="hero-cta-link hero-cta-link--primary" onClick={() => setCurrentPage('contact')}>
              {t.ctaStart}
            </button>
            <span className="hero-cta-divider">·</span>
            <button type="button" className="hero-cta-link" onClick={() => setCurrentPage('showcase')}>
              {t.ctaExplore}
            </button>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding home-showcase-section" style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <div className="reveal-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center' }}>
            {t.quoteBlock && (
              <>
                <p className="quote-single-line" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  color: 'var(--charcoal)',
                  lineHeight: 1.45,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  margin: 0
                }}>
                  {t.quoteBlock}
                </p>
                <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent-secondary)' }} />
              </>
            )}
            <div className="home-quote-body">
              {quoteParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={`${i === 0 ? 'home-quote-salutation' : ''}${i === quoteParagraphs.length - 1 ? ' home-quote-signoff' : ''}`.trim()}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services — zigzag */}
      <section className="section-padding home-services-section" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="eyebrow">{t.servicesLabel}</span>
            {t.servicesTitle && (
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--charcoal)', fontWeight: 400, margin: '12px 0' }}>
                {t.servicesTitle}
              </h2>
            )}
            {t.servicesSubtext && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                {t.servicesSubtext}
              </p>
            )}
          </div>

          <h3 className="home-services-group-title home-services-group-title--wedding">
            {t.weddingServicesHeading || 'wedding services'}
          </h3>
          <div className="home-services-editorial">
            {weddingServices.map((service, i) => (
              <HomeServiceRow
                key={service.name}
                service={service}
                index={i + 1}
                onNavigate={navigateToServiceDetail}
              />
            ))}
          </div>

          <h3 className="home-services-group-title home-services-group-title--event">
            {t.eventServicesHeading || 'event services'}
          </h3>
          <div className="home-event-services-list">
            {eventServices.map((service, i) => (
              <button
                key={service.name}
                type="button"
                className="home-event-service-item"
                onClick={() => setCurrentPage(service.page)}
              >
                <span className="home-event-service-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="home-event-service-name">{service.name}</span>
                <span className="home-event-service-desc">{service.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <LogoMarquee label={partnersLabel} stats={statHighlights} />

      {/* Showcase carousel */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal-on-scroll">
            <span className="eyebrow">{t.showcaseLabel}</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--charcoal)', fontWeight: 400, margin: '12px 0' }}>
              {t.showcaseTitle}
            </h2>
            {t.showcaseSubtitle && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                {t.showcaseSubtitle}
              </p>
            )}
          </div>

          <HomeShowcaseCarousel
            onViewAll={() => setCurrentPage('showcase')}
            hint={currentLang === 'vi' ? 'cuộn touchpad hoặc kéo ngang để xem thêm' : undefined}
          />

          <div className="home-showcase-cta-wrap" style={{ textAlign: 'center' }}>
            <button type="button" className="hero-cta-link hero-cta-link--dark reveal-on-scroll" onClick={() => setCurrentPage('showcase')}>
              {t.showcaseCta}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Video Section — Centered and smaller width */}
      <section className="section-padding home-testimonials-video-section" style={{ backgroundColor: 'var(--white)', borderBottom: 0, paddingBottom: 0, overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1100px', textAlign: 'center', marginBottom: '32px' }}>
          <p className="reveal-on-scroll" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
            color: 'var(--charcoal)',
            fontStyle: 'italic',
            lineHeight: 1.6,
            margin: '0 auto 28px'
          }}>
            {t.videoIntro || "hear it directly from the couples we've had the privilege to work with"}
          </p>
          {t.videoCaption && (
            <p className="reveal-on-scroll" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              margin: '0 auto',
              maxWidth: '640px'
            }}>
              {t.videoCaption}
            </p>
          )}
        </div>
        <div className="reveal-on-scroll video-underlay-wrapper" style={{ width: '100vw', maxWidth: '100%', margin: 0, padding: 0 }}>
          <DriveVideoEmbed driveUrl={COUPLES_DRIVE_VIDEO} isFullScreen={true} />
        </div>
      </section>

      {/* Closing CTA — image background */}
      <section className="home-closing-cta">
        <div className="home-closing-cta-bg" aria-hidden="true" style={{ backgroundImage: `url(${CLOSING_SECTION_BG})` }} />
        <div className="home-closing-cta-overlay" />
        <div className="container reveal-on-scroll home-closing-cta-inner">
          {closingLines.length > 0 ? (
            <div className="home-closing-lines">
              {closingLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ) : (
            <h2>{t.closingTitle}</h2>
          )}
          <p className="home-closing-meta">{t.closingText}</p>
          <button type="button" className="hero-cta-link hero-cta-link--on-image" onClick={() => setCurrentPage('contact')}>
            {t.ctaTell}
          </button>
        </div>
      </section>
    </div>
  );
}
