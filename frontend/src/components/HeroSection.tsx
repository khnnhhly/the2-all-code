'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { buildImageUrl } from '../lib/sanity';
import { heroVideoFor } from '../lib/heroVideo';
import { getTitleStyle, getBodyStyle, getScriptStyle } from '../lib/typography';

interface CTAButton {
  _key: string;
  label?: { en?: string; vi?: string } | string;
  link: string;
  variant?: 'primary' | 'secondary';
}

interface HeroData {
  backgroundImage?: any;
  overlayOpacity?: number;
  smallSubheading?: { en?: string; vi?: string } | string;
  mainHeadline?: { en?: string; vi?: string } | string;
  description?: { en?: string; vi?: string } | string;
  ctaButtons?: CTAButton[];
  typography?: any;
}

interface HeroSectionProps {
  heroData?: HeroData | null;
  lang?: 'en' | 'vi';
  onCtaClick?: (page: string) => void;
}

export default function HeroSection({ heroData, lang = 'en', onCtaClick }: HeroSectionProps) {
  const [heroColorized, setHeroColorized] = useState(false);

  useEffect(() => {
    const tmr = setTimeout(() => setHeroColorized(true), 1400);
    return () => clearTimeout(tmr);
  }, []);

  // Fallback image if backgroundImage is not set in Sanity.
  //
  // The source is a 29MB animated GIF, and every visitor currently gets it
  // because the Sanity hero image is unset. Served as a single frame in webp it
  // is 89KB. `auto=format` is deliberately not used here: on an animated GIF it
  // re-encodes to animated webp and returns 89MB.
  const fallbackUrl =
    'https://cdn.sanity.io/images/quhr7leo/production/852f4f61e673cbaf5759790b8fe3157b097147f9-1728x960.gif' +
    '?w=1920&q=80&fm=webp&frame=1';

  // Resolved during render, not in an effect: this is the LCP image, and
  // deriving it after hydration made every visitor load the fallback GIF first
  // and the real image second.
  const finalBgUrl = useMemo(() => {
    const image = heroData?.backgroundImage || (heroData as any)?.heroImage;
    if (!image) return fallbackUrl;
    return buildImageUrl(image, 1920, 78) || fallbackUrl;
  }, [heroData]);

  const heroVideo = heroVideoFor(finalBgUrl);

  // Discoverable by the preload scanner; a CSS background alone is found only
  // after the stylesheet parses. With a video the still is just the poster.
  ReactDOM.preload(finalBgUrl, { as: 'image', fetchPriority: heroVideo ? 'low' : 'high' });

  // Localized text helpers
  const getLocalizedText = (field: any) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field['en'] || '';
  };

  const subheading = getLocalizedText(heroData?.smallSubheading) || 'the two · for you two';
  const headline = getLocalizedText(heroData?.mainHeadline);
  const descriptionText = getLocalizedText(heroData?.description);

  return (
    <section className="hero-home" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background — an h264 re-encode when the source is an animated hero,
          otherwise the still image. */}
      {heroVideo ? (
        <video
          className={`hero-video-bg${heroColorized ? ' hero-video-bg--color' : ''} hero-video-bg--ready`}
          style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src={heroVideo}
          poster={finalBgUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      ) : (
        <div
          className={`hero-video-bg${heroColorized ? ' hero-video-bg--color' : ''} hero-video-bg--ready`}
          style={{
            backgroundImage: `url(${finalBgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            width: '100%',
            height: '100%'
          }}
          aria-hidden="true"
        />
      )}

      {/* Dark Overlay with custom opacity if specified */}
      <div 
        className="hero-home-overlay" 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          opacity: heroData?.overlayOpacity !== undefined ? heroData.overlayOpacity / 100 : 0.4
        }}
      />

      <div
        className={`container hero-content-wrapper${lang === 'vi' ? ' hero-content-wrapper-vi' : ''}`}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {subheading && (
          <p
            className="hero-tagline hero-tagline--animate brand-preserve-case preserve-copy-case"
            style={getScriptStyle(heroData?.typography)}
          >
            {subheading}
          </p>
        )}

        {headline && (
          <h1
            className={`reveal-on-scroll delay-100 hero-home-title ${lang === 'vi' ? 'hero-home-title-vi' : 'hero-home-title-en'}`}
            style={getTitleStyle(heroData?.typography)}
          >
            {headline}
          </h1>
        )}

        {descriptionText && (
          <div
            className="reveal-on-scroll delay-200 brand-preserve-case hero-home-subtext"
            style={getBodyStyle(heroData?.typography)}
          >
            <p>{descriptionText}</p>
          </div>
        )}

        <div className="hero-cta-links reveal-on-scroll delay-300">
          {heroData?.ctaButtons && heroData.ctaButtons.length > 0 ? (
            heroData.ctaButtons.map((btn, index) => {
              const labelText = getLocalizedText(btn.label);
              return (
                <React.Fragment key={btn._key || index}>
                  {index > 0 && <span className="hero-cta-divider">·</span>}
                  <button
                    type="button"
                    className={`hero-cta-link ${btn.variant === 'primary' ? 'hero-cta-link--primary' : ''}`}
                    onClick={() => onCtaClick && onCtaClick(btn.link)}
                  >
                    {labelText}
                  </button>
                </React.Fragment>
              );
            })
          ) : (
            <>
              <button
                type="button"
                className="hero-cta-link hero-cta-link--primary"
                onClick={() => onCtaClick && onCtaClick('contact')}
              >
                {lang === 'vi' ? 'Sẵn sàng kể The Two nghe' : 'Start your story'}
              </button>
              <span className="hero-cta-divider">·</span>
              <button
                type="button"
                className="hero-cta-link"
                onClick={() => onCtaClick && onCtaClick('showcase')}
              >
                {lang === 'vi' ? 'Dự án của The Two' : 'See our works'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
