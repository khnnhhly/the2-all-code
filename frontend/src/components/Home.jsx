'use client';
import { useEffect, useState } from 'react';
import LogoMarquee from './LogoMarquee';
import DriveVideoEmbed from './DriveVideoEmbed';
import HeroSection from './HeroSection';
import HomeShowcaseCarousel from './HomeShowcaseCarousel';
import HomeServiceRow from './HomeServiceRow';
import { urlFor } from '../lib/sanity';

export default function Home({ homeData, testimonials, projects, currentLang, setCurrentPage }) {
  const [heroColorized, setHeroColorized] = useState(false);

  const getLocalizedText = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || field.vi || '';
  };

  useEffect(() => {
    const tmr = window.setTimeout(() => setHeroColorized(true), 1400);
    return () => window.clearTimeout(tmr);
  }, []);

  if (!homeData) {
    return (
      <div style={{ padding: '160px 0', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <p>{currentLang === 'vi' ? 'Đang tải dữ liệu...' : 'Loading content...'}</p>
      </div>
    );
  }

  const navigateToServiceDetail = (service) => {
    if (service?.id) {
      window.sessionStorage.setItem('pendingServiceId', service.id);
    }
    setCurrentPage(service?.page || 'services');
  };

  // 1. Letter / Quote Section Paragraphs
  const quoteParagraphs = [];
  const scriptTitle = getLocalizedText(homeData?.letterSection?.scriptTitle);
  if (scriptTitle) quoteParagraphs.push(scriptTitle);
  if (homeData?.letterSection?.subheading) {
    quoteParagraphs.push(getLocalizedText(homeData.letterSection.subheading));
  }
  if (homeData?.letterSection?.paragraphs) {
    homeData.letterSection.paragraphs.forEach(p => {
      const text = getLocalizedText(p.paragraphText);
      if (text) {
        text.split('\n').forEach(line => {
          if (line.trim()) quoteParagraphs.push(line.trim());
        });
      }
    });
  }
  const closingSignOff = getLocalizedText(homeData?.letterSection?.closingSignOff);
  if (closingSignOff) quoteParagraphs.push(closingSignOff);

  const partnersLabel = getLocalizedText(homeData?.statsAndPartnersSection?.partnerHeader) || (currentLang === 'vi' ? 'chúng tôi đã đồng hành cùng' : 'we have worked with');

  // 2. Stats
  const statHighlights = homeData?.statsAndPartnersSection?.stats?.map(stat => ({
    value: stat.value || '',
    label: getLocalizedText(stat.label)
  })) || [];

  // 3. Wedding Services
  const weddingServices = homeData?.weddingServicesSection?.servicesList?.map(service => {
    let imgUrl = '';
    if (service.bgImage) {
      try {
        imgUrl = urlFor(service.bgImage).url() || '';
      } catch (e) {}
    }
    return {
      id: service.serviceNumber || '',
      name: getLocalizedText(service.title),
      desc: getLocalizedText(service.shortDescription),
      details: service.scopeItems?.map(item => getLocalizedText(item)) || [],
      img: imgUrl,
      page: service.ctaLink || 'services'
    };
  }) || [];

  // 4. Event Services
  const eventServices = homeData?.eventServicesSection?.eventItems?.map(service => {
    return {
      name: getLocalizedText(service.title),
      desc: getLocalizedText(service.description),
      page: 'services'
    };
  }) || [];

  // 5. Showcase images
  const showcaseImages = homeData?.showcaseSection?.gallery?.map(img => {
    try {
      return urlFor(img).url() || '';
    } catch (e) {
      return '';
    }
  }).filter(Boolean) || [];

  // 6. Partner logos
  const partnerLogos = homeData?.statsAndPartnersSection?.partnerLogos?.map(img => {
    try {
      return urlFor(img).url() || '';
    } catch (e) {
      return '';
    }
  }).filter(Boolean) || [];

  // 7. Testimonial / Video
  const videoEmbedUrl = homeData?.testimonialVideoSection?.videoUrl || '';
  let cleanVideoUrl = videoEmbedUrl;
  if (videoEmbedUrl.includes('<iframe')) {
    const match = videoEmbedUrl.match(/src="([^"]+)"/);
    if (match && match[1]) {
      cleanVideoUrl = match[1];
    }
  }

  // 8. Pre-footer Closing CTA
  const closingLines = [];
  const bannerHeadline = getLocalizedText(homeData?.preFooterCtaSection?.bannerHeadline);
  if (bannerHeadline) {
    bannerHeadline.split('\n').forEach(line => {
      if (line.trim()) closingLines.push(line.trim());
    });
  }

  let closingCtaBgUrl = '';
  if (homeData?.preFooterCtaSection?.backgroundImage) {
    try {
      closingCtaBgUrl = urlFor(homeData.preFooterCtaSection.backgroundImage).url() || '';
    } catch (e) {}
  }

  const servicesLabel = getLocalizedText(homeData?.weddingServicesSection?.mainHeader) || (currentLang === 'vi' ? 'Chúng tôi phác thảo và mang đến' : 'We sketch and provide');
  const servicesTitle = getLocalizedText(homeData?.weddingServicesSection?.title); // optional
  const servicesSubtext = getLocalizedText(homeData?.weddingServicesSection?.subtext); // optional
  const weddingServicesHeading = getLocalizedText(homeData?.weddingServicesSection?.categoryLabel) || (currentLang === 'vi' ? 'Dịch vụ đám cưới' : 'Wedding services');
  const eventServicesHeading = getLocalizedText(homeData?.eventServicesSection?.headerTitle) || (currentLang === 'vi' ? 'Dịch vụ sự kiện' : 'Event services');

  const showcaseLabel = getLocalizedText(homeData?.showcaseSection?.categoryTag) || (currentLang === 'vi' ? 'Đám cưới tiêu biểu' : 'Wedding showcase');
  const showcaseTitle = getLocalizedText(homeData?.showcaseSection?.mainTitle) || (currentLang === 'vi' ? 'Tình yêu ở khắp nơi' : 'Love is in the air');
  const showcaseSubtitle = getLocalizedText(homeData?.showcaseSection?.instructionText);
  const showcaseCta = getLocalizedText(homeData?.showcaseSection?.ctaButton?.label) || (currentLang === 'vi' ? 'Khám phá thêm những câu chuyện của chúng tôi' : 'See all our works');

  const videoIntro = getLocalizedText(homeData?.testimonialVideoSection?.quoteTitle) || (currentLang === 'vi' ? 'Hãy lắng nghe trực tiếp từ những cặp đôi chúng tôi may mắn được đồng hành' : "hear it directly from the couples we've had the privilege to work with");
  const videoCaption = getLocalizedText(homeData?.testimonialVideoSection?.coupleDetails);
  
  const closingText = getLocalizedText(homeData?.preFooterCtaSection?.bannerSubtext) || 'Based in Vietnam · available worldwide · thetwoplanner@gmail.com';
  const ctaTell = getLocalizedText(homeData?.preFooterCtaSection?.ctaButtonText) || (currentLang === 'vi' ? 'Hãy cho chúng tôi cơ hội được lắng nghe câu chuyện của bạn!' : 'Tell us your story');

  return (
    <div id="home">
      {/* Hero */}
      <HeroSection heroData={homeData.heroSection} lang={currentLang} onCtaClick={setCurrentPage} />

      {/* Quote */}
      <section className="section-padding home-showcase-section" style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <div className="reveal-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center' }}>
            {quoteParagraphs.length > 0 && (
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
            )}
          </div>
        </div>
      </section>

      {/* Services — zigzag */}
      <section className="section-padding home-services-section" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="eyebrow">{servicesLabel}</span>
            {servicesTitle && (
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--charcoal)', fontWeight: 400, margin: '12px 0' }}>
                {servicesTitle}
              </h2>
            )}
            {servicesSubtext && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                {servicesSubtext}
              </p>
            )}
          </div>

          <h3 className="home-services-group-title home-services-group-title--wedding">
            {weddingServicesHeading}
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

          {eventServices.length > 0 && (
            <>
              <h3 className="home-services-group-title home-services-group-title--event">
                {eventServicesHeading}
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
            </>
          )}
        </div>
      </section>

      <LogoMarquee label={partnersLabel} stats={statHighlights} logos={partnerLogos} />

      {/* Showcase carousel */}
      {showcaseImages.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container" style={{ maxWidth: '1100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal-on-scroll">
              <span className="eyebrow">{showcaseLabel}</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--charcoal)', fontWeight: 400, margin: '12px 0' }}>
                {showcaseTitle}
              </h2>
              {showcaseSubtitle && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                  {showcaseSubtitle}
                </p>
              )}
            </div>

            <HomeShowcaseCarousel
              onViewAll={() => setCurrentPage('showcase')}
              images={showcaseImages}
              hint={currentLang === 'vi' ? 'cuộn touchpad hoặc kéo ngang để xem thêm' : undefined}
            />

            <div className="home-showcase-cta-wrap" style={{ textAlign: 'center' }}>
              <button type="button" className="hero-cta-link hero-cta-link--dark reveal-on-scroll" onClick={() => setCurrentPage('showcase')}>
                {showcaseCta}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Video Section */}
      {cleanVideoUrl && (
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
              {videoIntro}
            </p>
            {videoCaption && (
              <p className="reveal-on-scroll" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                margin: '0 auto',
                maxWidth: '640px'
              }}>
                {videoCaption}
              </p>
            )}
          </div>
          <div className="reveal-on-scroll video-underlay-wrapper" style={{ width: '100vw', maxWidth: '100%', margin: 0, padding: 0 }}>
            <DriveVideoEmbed driveUrl={cleanVideoUrl} isFullScreen={true} />
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="home-closing-cta">
        {closingCtaBgUrl && <div className="home-closing-cta-bg" aria-hidden="true" style={{ backgroundImage: `url(${closingCtaBgUrl})` }} />}
        <div className="home-closing-cta-overlay" />
        <div className="container reveal-on-scroll home-closing-cta-inner">
          {closingLines.length > 0 && (
            <div className="home-closing-lines">
              {closingLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
          <p className="home-closing-meta">{closingText}</p>
          <button type="button" className="hero-cta-link hero-cta-link--on-image" onClick={() => setCurrentPage('contact')}>
            {ctaTell}
          </button>
        </div>
      </section>
    </div>
  );
}
