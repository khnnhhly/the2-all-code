import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

function ServiceCarousel({ services, accentColor, onLearnMore, currentLang }) {
  const trackRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const checkScrollLimits = () => {
    const el = trackRef.current;
    if (!el) return;
    setIsAtStart(el.scrollLeft <= 10);
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScrollLimits();
    // Re-check after images or layout render
    const timer = setTimeout(checkScrollLimits, 300);
    window.addEventListener('resize', checkScrollLimits);
    return () => {
      window.removeEventListener('resize', checkScrollLimits);
      clearTimeout(timer);
    };
  }, [services]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
    checkScrollLimits();
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    setDragging(false);
    if (trackRef.current) {
      trackRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.touches[0].pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.scrollBehavior = 'auto';
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
    checkScrollLimits();
  };

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.scrollBehavior = 'smooth';
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir * amount });
  };

  return (
    <div className="services-carousel-wrapper" style={{ position: 'relative', width: '100%' }}>
      {/* Navigation Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginBottom: '20px',
        paddingRight: '4px'
      }}>
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="carousel-nav-btn"
          aria-label="Previous"
          style={{
            opacity: isAtStart ? 0.3 : 1,
            pointerEvents: isAtStart ? 'none' : 'auto',
            transition: 'opacity 0.3s ease',
            border: '1px solid var(--border-muted)',
            background: 'var(--white)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="carousel-nav-btn"
          aria-label="Next"
          style={{
            opacity: isAtEnd ? 0.3 : 1,
            pointerEvents: isAtEnd ? 'none' : 'auto',
            transition: 'opacity 0.3s ease',
            border: '1px solid var(--border-muted)',
            background: 'var(--white)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}
        >
          ›
        </button>
      </div>

      {/* Carousel Track */}
      <div
        ref={trackRef}
        onScroll={checkScrollLimits}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          padding: '12px 4px 24px 4px',
          scrollbarWidth: 'none',
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
        className="services-carousel-track"
      >
        {services.map((service, idx) => {
          const serviceDesc = service.overview || service.desc || '';
          return (
            <div
              key={service.id || idx}
              id={service.id ? `service-${service.id}` : undefined}
              style={{
                backgroundColor: 'var(--white)',
                border: '1px solid var(--border-muted)',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                transition: 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease',
                transitionDelay: `${idx * 100}ms`
              }}
              className="service-carousel-card reveal-on-scroll reveal-zoom"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
              }}
            >
              {/* Card Image */}
              <div style={{ width: '100%', height: '220px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <OptimizedImage
                  src={service.img}
                  alt={service.name}
                  width="340"
                  height="220"
                  maxWidth={480}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  draggable="false"
                />
              </div>

              {/* Card Content */}
              <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    color: 'var(--charcoal)',
                    marginBottom: '12px',
                    fontWeight: 400,
                    lineHeight: 1.3
                  }}>
                    {service.name}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'var(--charcoal)',
                    opacity: 0.8,
                    lineHeight: 1.6,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {serviceDesc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onLearnMore(service)}
                  style={{
                    alignSelf: 'flex-start',
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    fontWeight: 300,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: accentColor
                  }}
                >
                  {currentLang === 'en' ? 'Learn more' : 'Chi tiết'} &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Services({ t, currentLang, setCurrentPage }) {
  const [activeModal, setActiveModal] = useState(null);
  const [activeFaqTab, setActiveFaqTab] = useState('wedding');
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const pendingId = window.sessionStorage.getItem('pendingServiceId');
    if (!pendingId || !t) return;

    window.sessionStorage.removeItem('pendingServiceId');
    const allServices = [...(t.list || []), ...(t.eventServices || [])];
    const matchedService = allServices.find((service) => service.id === pendingId);

    window.setTimeout(() => {
      document.getElementById(`service-${pendingId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
      if (matchedService) {
        window.setTimeout(() => setActiveModal(matchedService), 450);
      }
    }, 250);
  }, [t]);

  if (!t) return null;

  const weddingServices = t.list || [];
  const eventServices = t.eventServices || [];

  const handleLearnMore = (service) => {
    setActiveModal(service);
  };

  const label = t.pageLabel || (currentLang === 'en' ? 'our services' : 'dịch vụ của chúng tôi');
  const title = t.pageTitle || '';
  const descText = t.pageSubtext || '';
  
  const weddingSectionLabel = t.weddingLabel || (currentLang === 'en' ? 'wedding' : 'đám cưới');
  const weddingSectionTitle = t.weddingTitle || (currentLang === 'en' ? 'weddings that feel like you.' : 'những đám cưới mang hơi thở của bạn.');
  
  const eventSectionLabel = t.eventLabel || (currentLang === 'en' ? 'event' : 'sự kiện');
  const eventSectionTitle = t.eventSectionTitle || (currentLang === 'en' ? 'private celebrations filled with intention and warmth.' : 'những dấu mốc đáng nhớ xứng đáng được kỷ niệm theo cách riêng.');

  const faqData = t.faqs || { wedding: [], event: [] };

  return (
    <div id="services" className="services-page">
      {/* Service Intro */}
      <section
        className="services-intro-section"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 17, 16, 0.32), rgba(18, 17, 16, 0.44)), url("/assets/site-media/services-hero-optimized.webp")',
        }}
      >
        <div className="container services-intro-container">
          <div className="services-intro-copy">
            <span className="eyebrow reveal-on-scroll services-intro-label">{label}</span>
            {(title || t.pageTitleLines?.length > 0) && (
              <h1
                className="reveal-on-scroll delay-100 services-intro-title"
              >
                {t.pageTitleLines?.length > 0 ? (
                  t.pageTitleLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t.pageTitleLines.length - 1 && <br />}
                    </React.Fragment>
                  ))
                ) : (
                  title
                )}
              </h1>
            )}
            {descText && (
              <p
                className="reveal-on-scroll delay-200 services-intro-subtitle"
              >
                {descText}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Service List */}
      <section className="services-list-section">
        <div className="container services-list-container">

          {/* Service Section Groups (Wedding first, then Event) */}
          <div className="services-staggered-bg">
            
            {/* Wedding Services Section */}
            <div className="reveal-on-scroll services-staggered-panel services-staggered-panel--wedding">
              <div style={{ marginBottom: '36px' }}>
                <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '8px' }}>{weddingSectionLabel}</span>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  color: 'var(--charcoal)',
                  fontWeight: 400,
                  margin: 0
                }}>
                  {weddingSectionTitle}
                </h2>
              </div>
              <ServiceCarousel
                services={weddingServices}
                accentColor="var(--accent-secondary)"
                onLearnMore={handleLearnMore}
                currentLang={currentLang}
              />
            </div>

            {/* Event Services Section */}
            <div className="reveal-on-scroll services-staggered-panel services-staggered-panel--event">
              <div style={{ marginBottom: '36px' }}>
                <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '8px' }}>{eventSectionLabel}</span>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  color: 'var(--charcoal)',
                  fontWeight: 400,
                  margin: 0
                }}>
                  {eventSectionTitle}
                </h2>
              </div>
              <ServiceCarousel
                services={eventServices}
                accentColor="var(--charcoal)"
                onLearnMore={handleLearnMore}
                currentLang={currentLang}
              />
            </div>

          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal-on-scroll">
            <span className="eyebrow">{t.faqsLabel || 'FAQs'}</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: 'var(--charcoal)',
              marginTop: '8px',
              marginBottom: '12px',
              fontWeight: 400
            }}>
              {t.faqsTitle || 'Common Questions'}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
              {t.faqsDescription}
            </p>

            {/* Tab switch buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '32px'
            }}>
              <button
                onClick={() => { setActiveFaqTab('wedding'); setExpandedFaq(null); }}
                style={{
                  backgroundColor: activeFaqTab === 'wedding' ? '#5a5e27' : 'transparent',
                  border: '1.5px solid #5a5e27',
                  color: activeFaqTab === 'wedding' ? '#ffffff' : '#5a5e27',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  padding: '10px 24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.3s ease'
                }}
              >
                {currentLang === 'en' ? 'Wedding FAQ' : 'Đám cưới'}
              </button>
              <button
                onClick={() => { setActiveFaqTab('event'); setExpandedFaq(null); }}
                style={{
                  backgroundColor: activeFaqTab === 'event' ? '#5a5e27' : 'transparent',
                  border: '1.5px solid #5a5e27',
                  color: activeFaqTab === 'event' ? '#ffffff' : '#5a5e27',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  padding: '10px 24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.3s ease'
                }}
              >
                {currentLang === 'en' ? 'Event FAQ' : 'Sự kiện'}
              </button>
            </div>
          </div>

          {/* Accordion list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="reveal-on-scroll">
            {(faqData[activeFaqTab] || []).map((faq, i) => {
              const isOpen = expandedFaq === i;
              const accentColor = '#5a5e27';
              return (
                <div 
                  key={i} 
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-muted)',
                    borderRadius: '6px',
                    padding: '24px 28px',
                    transition: 'border-color var(--transition)'
                  }}
                >
                  <button 
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    style={{
                      width: '100%', border: 'none', background: 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      textAlign: 'left', cursor: 'pointer', padding: 0
                    }}
                  >
                    <span style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: '1.15rem', 
                      color: 'var(--charcoal)', 
                      fontWeight: 400,
                      lineHeight: 1.4
                    }}>
                      {faq.q}
                    </span>
                    <ChevronDown size={18} style={{
                      color: accentColor, flexShrink: 0, marginLeft: '16px',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition)'
                    }} />
                  </button>
                  <div style={{
                    maxHeight: isOpen ? '250px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.4s ease',
                    marginTop: isOpen ? '16px' : '0px'
                  }}>
                    <p style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: '0.95rem', 
                      color: 'var(--charcoal)', 
                      opacity: 0.8, 
                      lineHeight: 1.6, 
                      margin: 0 
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ 
        backgroundImage: 'linear-gradient(rgba(42, 42, 42, 0.7), rgba(42, 42, 42, 0.7)), url("/assets/site-media/home-showcase-portrait-02.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#ffffff', 
        padding: '120px 0', 
        textAlign: 'center' 
      }}>
        <div className="container reveal-on-scroll" style={{ maxWidth: '850px', margin: '0 auto' }}>
          {t.closingText && (
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              color: '#ffffff',
              lineHeight: 1.6,
              marginBottom: '32px',
              fontWeight: 300,
              opacity: 0.95
            }}>
              {t.closingText}
            </p>
          )}
          {t.closingCta && (
            <button
              onClick={() => setCurrentPage('contact')}
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 300,
                padding: '16px 40px',
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

      {/* Service Detail Modal */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(42, 42, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '24px'
        }}
        onClick={() => setActiveModal(null)}
        >
          <div style={{
            backgroundColor: 'var(--white)',
            border: '1px solid var(--border-muted)',
            borderRadius: '6px',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '40px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--charcoal)'
              }}
            >
              <X size={24} />
            </button>

            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 300,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: 'var(--accent-secondary)',
                textTransform: 'none'
              }}>
                {currentLang === 'en' ? 'service details' : 'chi tiết dịch vụ'}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.2rem',
                color: 'var(--charcoal)',
                marginTop: '8px',
                marginBottom: '16px'
              }}>
                {activeModal.name}
              </h2>
              
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--charcoal)',
                opacity: 0.85,
                lineHeight: 1.7,
                marginBottom: '24px'
              }}>
                {activeModal.overview || activeModal.desc || ''}
              </p>

              {activeModal.overviewExtra && (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--charcoal)',
                  opacity: 0.85,
                  lineHeight: 1.7,
                  marginBottom: '24px'
                }}>
                  {activeModal.overviewExtra}
                </p>
              )}

              {activeModal.who && activeModal.who.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 300,
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    color: 'var(--charcoal)',
                    textTransform: 'none',
                    marginBottom: '10px'
                  }}>
                    {currentLang === 'en' ? 'Who this is for' : 'Phù Hợp Với'}
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0 }}>
                    {activeModal.who.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', color: 'var(--charcoal)', opacity: 0.8 }}>
                        <span style={{ color: 'var(--accent-secondary)' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(activeModal.scope || activeModal.included) && (activeModal.scope || activeModal.included).length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 300,
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    color: 'var(--charcoal)',
                    textTransform: 'none',
                    marginBottom: '10px'
                  }}>
                    {currentLang === 'en' ? 'Scope of work' : 'Hạng mục thực hiện'}
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0 }}>
                    {(activeModal.scope || activeModal.included).map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', color: 'var(--charcoal)', opacity: 0.8 }}>
                        <span style={{ color: 'var(--accent-secondary)' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeModal.benefits && activeModal.benefits.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 300,
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    color: 'var(--charcoal)',
                    textTransform: 'none',
                    marginBottom: '10px'
                  }}>
                    {currentLang === 'en' ? 'Benefits' : 'Lợi Ích Mang Lại'}
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0 }}>
                    {activeModal.benefits.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', color: 'var(--charcoal)', opacity: 0.8 }}>
                        <span style={{ color: 'var(--accent-secondary)' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setCurrentPage('contact');
                }}
                style={{
                  flex: 1,
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  padding: '14px 28px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {currentLang === 'en' ? 'Request Consultation' : 'Yêu Cầu Tư Vấn'}
              </button>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--charcoal)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  padding: '14px 28px',
                  borderRadius: '4px',
                  border: '1.5px solid var(--border-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {currentLang === 'en' ? 'Close' : 'Đóng'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
