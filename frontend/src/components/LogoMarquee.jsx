'use client';
import { PARTNER_LOGOS } from '../imageAssets';
import OptimizedImage from './OptimizedImage';

export default function LogoMarquee({ label, stats }) {
  const logos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="partners-marquee-section" style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-muted)',
      padding: '64px 0',
      overflow: 'hidden'
    }}>
      <div className="container reveal-on-scroll" style={{ marginBottom: '40px', textAlign: 'center' }}>
        {stats?.length > 0 && (
          <div className="home-stats-row">
            {stats.map((item, i) => (
              <div key={i} className="home-stat-item">
                <span className="home-stat-value">
                  {String(item.value).endsWith('+') ? (
                    <>
                      {String(item.value).slice(0, -1)}
                      <span className="home-stat-plus">+</span>
                    </>
                  ) : item.value}
                </span>
                <span className="home-stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        )}
        <span className="eyebrow emphasis-label partners-marquee-label">{label}</span>
      </div>
      <div className="logo-marquee" aria-hidden="true">
        <div className="logo-marquee-track">
          {logos.map((src, i) => (
            <div key={i} className="logo-marquee-item">
              <OptimizedImage src={src} alt="" maxWidth={200} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
