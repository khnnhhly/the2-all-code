'use client';

import React, { useEffect, useState } from 'react';
import { urlFor } from '../lib/sanity';

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
}

interface HeroSectionProps {
  heroData?: HeroData | null;
  lang?: 'en' | 'vi';
  onCtaClick?: (page: string) => void;
}

export default function HeroSection({ heroData, lang = 'en', onCtaClick }: HeroSectionProps) {
  const [heroColorized, setHeroColorized] = useState(false);
  const [bgUrl, setBgUrl] = useState<string>('');

  useEffect(() => {
    const tmr = setTimeout(() => setHeroColorized(true), 1400);
    return () => clearTimeout(tmr);
  }, []);

  useEffect(() => {
    if (heroData?.backgroundImage) {
      try {
        const url = urlFor(heroData.backgroundImage).url();
        if (url) {
          setBgUrl(url);
        }
      } catch (err) {
        console.error('Error generating image URL from Sanity asset:', err);
      }
    }
  }, [heroData]);

  // Fallback image if backgroundImage is null or not yet loaded
  const fallbackUrl = 'https://cdn.sanity.io/images/quhr7leo/production/852f4f61e673cbaf5759790b8fe3157b097147f9-1728x960.gif';
  const finalBgUrl = bgUrl || fallbackUrl;

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
      {/* Background Image Container */}
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
          <p className="hero-tagline hero-tagline--animate brand-preserve-case preserve-copy-case">
            {subheading}
          </p>
        )}

        {headline && (
          <h1 className={`reveal-on-scroll delay-100 hero-home-title ${lang === 'vi' ? 'hero-home-title-vi' : 'hero-home-title-en'}`}>
            {headline}
          </h1>
        )}

        {descriptionText && (
          <div className="reveal-on-scroll delay-200 brand-preserve-case hero-home-subtext">
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
