'use client';
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { urlFor } from '../lib/sanity';

export default function About({ aboutData, currentLang, setCurrentPage }) {
  const defaultHeroBg = 'https://i.ibb.co/xqCTPK63/Ghi-Ma-n-hi-nh-2026-06-02-lu-c-9-36-36-SA-online-video-cutter-com-1-1.gif';

  const getLocalizedText = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || field.vi || '';
  };

  if (!aboutData) {
    return (
      <div style={{ padding: '160px 0', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <p>{currentLang === 'vi' ? 'Đang tải dữ liệu...' : 'Loading content...'}</p>
      </div>
    );
  }

  // 1. Hero background and titles
  let heroBgUrl = defaultHeroBg;
  if (aboutData?.heroSection?.backgroundImage) {
    try {
      heroBgUrl = urlFor(aboutData.heroSection.backgroundImage).url() || defaultHeroBg;
    } catch (e) {}
  }

  const pageLabel = getLocalizedText(aboutData?.heroSection?.headline) || (currentLang === 'vi' ? 'Về chúng tôi' : 'About us');
  const pageTitle = getLocalizedText(aboutData?.heroSection?.subheading) || '';

  // 2. Mission & Vision
  const missionLabel = getLocalizedText(aboutData?.missionVisionSection?.mission?.title) || (currentLang === 'vi' ? 'Sứ mệnh' : 'Mission');
  const missionText = getLocalizedText(aboutData?.missionVisionSection?.mission?.content) || '';
  const visionLabel = getLocalizedText(aboutData?.missionVisionSection?.vision?.title) || (currentLang === 'vi' ? 'Tầm nhìn' : 'Vision');
  const visionText = getLocalizedText(aboutData?.missionVisionSection?.vision?.content) || '';

  // 3. Testimonials
  const testimonials = aboutData?.testimonialsSection?.testimonialCards?.map(item => {
    if (!item) return null;
    let imgUrl = '';
    if (item.cardImage) {
      try {
        imgUrl = urlFor(item.cardImage).url() || '';
      } catch (e) {}
    }
    const projectId = item._id ? (item._id.replace('drafts.', '').split('.')[1] || item._id.replace('drafts.', '')) : '';
    return {
      couple: item.title || '',
      meta: `${item.serviceCategory || ''} · ${item.location || ''} · ${item.year || ''}`,
      img: imgUrl,
      projectId: projectId,
      quote: item.highlightQuote || item.shortQuote || ''
    };
  }).filter(Boolean) || [];

  const testimonialsTitle = getLocalizedText(aboutData?.testimonialsSection?.mainHeadline) || (currentLang === 'vi' ? 'Từ những trái tim đã tin tưởng chúng tôi' : "From the bottom of our clients' hearts");
  const testimonialsTag = getLocalizedText(aboutData?.testimonialsSection?.categoryTag) || (currentLang === 'vi' ? 'đánh giá từ khách hàng' : 'testimonials');

  return (
    <div id="about">
      <section className="about-video-hero">
        <div className="about-video-hero-bg" aria-hidden="true">
          <OptimizedImage src={heroBgUrl} alt="" maxWidth={1200} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="about-video-hero-overlay" aria-hidden="true" />
        <div className="container about-video-hero-content">
          <div className="reveal-on-scroll about-video-hero-title">
            <span className="about-video-hero-about">{pageLabel}</span>
            <span className="about-video-hero-brand">{pageTitle}</span>
          </div>
        </div>
      </section>

      <section
        className="section-padding about-values-section"
        style={{
          borderBottom: '1px solid var(--border-muted)',
          backgroundColor: 'var(--white)',
        }}
      >
        <div className="container">
          <div className="about-values-grid">
            <div className="reveal-on-scroll about-value-panel">
              <span className="about-value-heading">{missionLabel}</span>
              <p>
                {missionText.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < missionText.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className="reveal-on-scroll delay-150 about-value-panel">
              <span className="about-value-heading">{visionLabel}</span>
              <p>
                {visionText.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < visionText.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container" style={{ maxWidth: '1100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal-on-scroll">
              <span className="eyebrow">{testimonialsTag}</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                color: 'var(--charcoal)',
                fontWeight: 400
              }}>
                {testimonialsTitle}
              </h2>
            </div>
            <div className="about-testimonials-grid">
              {testimonials.map((item, idx) => (
                <button
                  key={item.couple}
                  type="button"
                  className="about-testimonial-row reveal-on-scroll"
                  style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
                  onClick={() => setCurrentPage?.('showcase', { projectId: item.projectId })}
                >
                  <div className="about-testimonial-image-wrap">
                    {item.img && (
                      <OptimizedImage
                        src={item.img}
                        alt={item.couple}
                        maxWidth={520}
                        sizes="(max-width: 900px) 90vw, 260px"
                        className="about-testimonial-image"
                      />
                    )}
                  </div>
                  <div className="about-testimonial-copy">
                    <div className="about-testimonial-meta">{item.couple} · {item.meta}</div>
                    <div className="about-testimonial-quote">{item.quote}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
