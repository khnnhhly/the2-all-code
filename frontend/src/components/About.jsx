'use client';
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { COUPLE_THUMBNAILS } from '../imageAssets';

export default function About({ t, currentLang, setCurrentPage }) {
  const aboutHeroBg = 'https://i.ibb.co/xqCTPK63/Ghi-Ma-n-hi-nh-2026-06-02-lu-c-9-36-36-SA-online-video-cutter-com-1-1.gif';

  const testimonials = [
    {
      couple: 'Tony and Myriam',
      meta: 'Saigon · 2025',
      img: COUPLE_THUMBNAILS.tonyMyriam,
      projectId: 'tony-myriam',
      quote: currentLang === 'vi' ? '“một ngày cưới thật sự là tụi mình.”' : '“a day that felt exactly like us.”',
    },
    {
      couple: 'Olivier and Linh',
      meta: 'Saigon · 2025',
      img: COUPLE_THUMBNAILS.olivierLinh,
      projectId: 'olivier-linh',
      quote: currentLang === 'vi' ? '“thân mật, tinh tế, và trọn vẹn.”' : '“intimate, elegant, and unforgettable.”',
    },
    {
      couple: 'Ren and Jonathan',
      meta: 'Saigon · 2026',
      img: COUPLE_THUMBNAILS.renJonathan,
      projectId: 'ren-jonathan',
      quote: currentLang === 'vi' ? '“không khuôn mẫu. chỉ có câu chuyện của chúng tôi.”' : '“no template, just our story.”',
    },
    {
      couple: 'Phuong Thao and Tuan Vu',
      meta: 'Hanoi · 2025',
      img: COUPLE_THUMBNAILS.phuongThaoTuanVu,
      projectId: 'thao-vu',
      quote: currentLang === 'vi' ? '“chỉn chu hơn cả mong đợi.”' : '“beyond what we expected.”',
    },
    {
      couple: 'Ha Chi and Hung Anh',
      meta: 'Hanoi · 2027',
      img: COUPLE_THUMBNAILS.haChiHungAnh,
      projectId: 'chi-anh',
      quote: currentLang === 'vi' ? '“tận tâm trong từng chi tiết nhỏ.”' : '“care in every small detail.”',
    },
    {
      couple: 'Lam and Bắc',
      meta: 'Hanoi · 01/2025',
      img: COUPLE_THUMBNAILS.thanhLamBacDang,
      projectId: 'thanh-lam',
      quote: currentLang === 'vi' ? '“nhẹ nhàng, sâu sắc, và giàu cảm xúc.”' : '“quiet, meaningful, and emotional.”',
    },
  ];

  return (
    <div id="about">
      <section className="about-video-hero">
        <div className="about-video-hero-bg" aria-hidden="true">
          <OptimizedImage src={aboutHeroBg} alt="" maxWidth={1200} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="about-video-hero-overlay" aria-hidden="true" />
        <div className="container about-video-hero-content">
          <div className="reveal-on-scroll about-video-hero-title">
            <span className="about-video-hero-about">{t.pageLabel}</span>
            <span className="about-video-hero-brand">{t.pageTitle}</span>
          </div>
          {t.pageBody && (
            <p className="reveal-on-scroll delay-150 about-video-hero-copy">
              {t.pageBody}
            </p>
          )}
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
              <span className="about-value-heading">{t.missionLabel}</span>
              <p>
                {t.missionTextLines ? t.missionTextLines.map((line, i) => (<>{line}{i < t.missionTextLines.length - 1 && <br />}</>)) : t.missionText}
              </p>
            </div>
            <div className="reveal-on-scroll delay-150 about-value-panel">
              <span className="about-value-heading">{t.visionLabel}</span>
              <p>
                {t.visionTextLines ? (
                  t.visionTextLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t.visionTextLines.length - 1 && <br />}
                    </React.Fragment>
                  ))
                ) : (
                  t.visionText
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal-on-scroll">
            <span className="eyebrow">{currentLang === 'en' ? 'testimonials' : 'đánh giá từ khách hàng'}</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: 'var(--charcoal)',
              fontWeight: 400
            }}>
              {t.testimonialsTitle}
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
                  <OptimizedImage
                    src={item.img}
                    alt={item.couple}
                    maxWidth={520}
                    sizes="(max-width: 900px) 90vw, 260px"
                    className="about-testimonial-image"
                  />
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
    </div>
  );
}
