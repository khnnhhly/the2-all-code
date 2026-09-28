'use client';

import { getTitleStyle, getBodyStyle } from '../lib/typography';
import { getImageUrl } from '../lib/sanity';

const FALLBACK_BG = '/assets/site-media/home-showcase-portrait-02.webp';

function localized(field, lang, fallbackEn = '', fallbackVi = '') {
  if (!field) return lang === 'vi' ? fallbackVi || fallbackEn : fallbackEn;
  if (typeof field === 'string') return field;
  return field[lang] || field.en || fallbackEn;
}

/**
 * The closing call to action shared by About Us, Services, Our Works and
 * Contact. Each page used to carry its own copy of this block — different
 * padding, overlay, type scale and button — so they drifted apart. Change it
 * here and all four move together. Homepage keeps its own CTA on purpose.
 */
export default function PreFooterCta({ data, lang = 'en', onCtaClick }) {
  const headline = localized(
    data?.headline ?? data?.bannerHeadline,
    lang,
    "Let's create your happily ever after together!",
    'Hãy để chúng tôi đồng hành cùng bạn vẽ nên câu chuyện cổ tích đời thực!'
  );
  const buttonLabel = localized(
    data?.ctaButton?.label ?? data?.ctaButtonText,
    lang,
    'Tell us your story',
    'Kể cho chúng tôi câu chuyện của bạn'
  );
  const bgUrl = getImageUrl(data?.backgroundImage ?? data?.bgImage) || FALLBACK_BG;

  return (
    <section className="prefooter-cta">
      <div
        className="prefooter-cta-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className="prefooter-cta-overlay" aria-hidden="true" />
      <div className="container reveal-on-scroll prefooter-cta-inner">
        {headline && (
          <p className="prefooter-cta-headline" style={getTitleStyle(data?.typography)}>
            {headline}
          </p>
        )}
        {buttonLabel && (
          <button
            type="button"
            className="prefooter-cta-button"
            onClick={() => onCtaClick && onCtaClick('contact')}
            style={getBodyStyle(data?.typography)}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </section>
  );
}
