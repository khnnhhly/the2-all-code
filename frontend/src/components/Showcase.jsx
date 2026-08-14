'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SHOWCASE_GALLERIES, COUPLE_THUMBNAILS } from '../imageAssets';
import OptimizedImage, { preloadImages } from './OptimizedImage';

const HERO_BY_ID = {
  'tony-myriam': COUPLE_THUMBNAILS.tonyMyriam,
  'olivier-linh': COUPLE_THUMBNAILS.olivierLinh,
  'ren-jonathan': COUPLE_THUMBNAILS.renJonathan,
  'thao-vu': COUPLE_THUMBNAILS.phuongThaoTuanVu,
  'chi-anh': COUPLE_THUMBNAILS.haChiHungAnh,
  'thanh-lam': COUPLE_THUMBNAILS.thanhLamBacDang,
};

const LOOKBOOK_DETAILS = {
  'tony-myriam': {
    meta: 'full wedding planning · Saigon · 2025',
    viMeta: 'wedding planning trọn gói · Sài Gòn · 2025',
    quote: 'an intimate cross-cultural celebration bringing together Australian and Indonesian families through warmth, food, music, and a wedding experience centered around connection.',
    viQuote: 'Một lễ cưới thân mật kết nối hai nền văn hóa, nơi gia đình từ Australia và Indonesia cùng gặp gỡ, sẻ chia và tạo nên những ký ức đẹp. Mọi chi tiết đều được thiết kế xoay quanh sự gắn kết.',
    testimonial: '“a day that felt exactly like us.”',
    viTestimonial: '“một ngày cưới thật sự là tụi mình.”'
  },
  'olivier-linh': {
    meta: 'full wedding planning · Saigon · 2025',
    viMeta: 'wedding planning trọn gói · Sài Gòn · 2025',
    quote: 'a celebration shaped by French elegance and Vietnamese warmth, thoughtful, emotional, and designed to feel effortlessly intimate from beginning to end.',
    viQuote: 'Một lễ cưới mang tinh thần thanh lịch của nước Pháp hòa quyện cùng sự ấm áp rất riêng của Việt Nam. Tinh tế nhưng không xa cách. Cảm xúc nhưng không phô trương.',
    testimonial: '“intimate, elegant, and unforgettable.”',
    viTestimonial: '“thân mật, tinh tế, và trọn vẹn.”'
  },
  'ren-jonathan': {
    meta: 'full wedding planning · concept and styling · Saigon · 2026',
    viMeta: 'wedding planning · concept & styling · Sài Gòn · 2026',
    quote: 'a wedding blending French and Canadian influences into a modern celebration filled with quiet romance, meaningful details, and an atmosphere that felt entirely their own.',
    viQuote: 'Lấy cảm hứng từ hai nền văn hóa Pháp và Canada, đám cưới được xây dựng như một bản hòa ca của sự hiện đại, lãng mạn và những chi tiết mang ý nghĩa cá nhân.',
    testimonial: '“no template, just our story.”',
    viTestimonial: '“không khuôn mẫu. chỉ có câu chuyện của chúng tôi.”'
  },
  'thao-vu': {
    meta: 'concept and styling · coordination · Hanoi · 2025',
    viMeta: 'concept & styling · coordination · Hà Nội · 2025',
    quote: 'a deeply personal wedding bringing together Northern and Southern Vietnamese traditions through a modern experience rooted in family, emotion, and cultural connection.',
    viQuote: 'Một lễ cưới đầy cảm xúc, nơi những nét đẹp Bắc và Nam Việt Nam được kết nối trong một trải nghiệm hiện đại nhưng vẫn đậm chất gia đình.',
    testimonial: '“beyond what we expected.”',
    viTestimonial: '“chỉn chu hơn cả mong đợi.”'
  },
  'chi-anh': {
    meta: 'full wedding planning · Hanoi · 2027',
    viMeta: 'wedding planning trọn gói · Hà Nội · 2027',
    quote: 'two doctors building a celebration inspired by the life they created together in Germany, intentional, intimate, and centered around the people who mattered most to them.',
    viQuote: 'Hai bác sĩ cùng xây dựng cuộc sống tại Đức và mong muốn mang tinh thần ấy trở về trong ngày cưới. Thân mật, tinh giản và dành trọn tâm hồn cho những người họ yêu thương.',
    testimonial: '“care in every small detail.”',
    viTestimonial: '“tận tâm trong từng chi tiết nhỏ.”'
  },
  'thanh-lam': {
    meta: 'full wedding planning · Hanoi · 2025',
    viMeta: 'wedding planning trọn gói · Hà Nội · 2025',
    quote: 'living in Australia meant planning most of their wedding from afar. arriving in Vietnam just a week before the celebration, they were able to step into a wedding that felt completely ready for them, thoughtful, seamless, and filled with the people who mattered most.',
    viQuote: 'Sống ở Australia nên phần lớn kế hoạch được làm từ xa. Về Việt Nam chỉ một tuần trước ngày cưới, họ bước vào một lễ kỷ niệm đã sẵn sàng, chỉn chu, nhẹ nhàng và đầy những người thân yêu.',
    testimonial: '“quiet, meaningful, and emotional.”',
    viTestimonial: '“nhẹ nhàng, sâu sắc, và giàu cảm xúc.”'
  }
};

export default function Showcase({ t, currentLang, setCurrentPage, targetProjectId }) {
  const [activeProject, setActiveProject] = useState(null);
  const [dismissedTargetProjectId, setDismissedTargetProjectId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const preloadProjectGallery = (projectId) => {
    const gallery = SHOWCASE_GALLERIES[projectId];
    if (gallery) preloadImages(gallery, 480);
  };

  // Removed global preloadAllShowcaseGalleries useEffect









  const filterList = t?.filters || ['all', 'wedding', 'events', 'destination'];
  const list = t?.list || [];
  const targetProject = targetProjectId ? list.find((item) => item.id === targetProjectId) : null;
  const modalProject = activeProject || (dismissedTargetProjectId === targetProjectId ? null : targetProject);

  useEffect(() => {
    if (modalProject?.id) {
      preloadProjectGallery(modalProject.id);
    }
  }, [modalProject?.id]);

  if (!t) return null;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredList = list.filter(project => {
    if (selectedFilter === 'all') return true;

    const cat = project.category ? project.category.toLowerCase() : '';
    const filter = selectedFilter.toLowerCase();

    if (filter === 'wedding' || filter === 'đám cưới') {
      return cat === 'wedding' || cat === 'đám cưới';
    }
    if (filter === 'events' || filter === 'sự kiện') {
      return cat === 'events' || cat === 'sự kiện' || cat === 'event' || cat === 'các sự kiện khác';
    }
    if (filter === 'destination') {
      return cat === 'destination' || cat === 'đám cưới xa nhà';
    }
    return cat === filter;
  });

  const closingText = t.ctaText || (currentLang === 'en' ? 'your wedding hasn\'t been planned yet. but your story already exists.' : 'đám cưới của bạn chưa được lập kế hoạch. nhưng câu chuyện của bạn đã hiện hữu.');
  const closingBtn = t.ctaBtn || (currentLang === 'en' ? 'start planning your story' : 'bắt đầu kể câu chuyện của bạn');

  // Specific lookbook images configuration for asymmetric layouts
  const getLookbookImages = (projectId) => {
    const images = SHOWCASE_GALLERIES[projectId] || [];
    if (images.length === 0) return { hero: null, secondary: [], color: [], bw: [] };
    
    return {
      hero: images[0],
      secondary: images.slice(1, 3), // next two
      color: images.slice(3, 5),     // next two color
      bw: images.slice(5)            // remainder black & white
    };
  };

  const closeLookbook = () => {
    setActiveProject(null);
    if (targetProjectId) {
      setDismissedTargetProjectId(targetProjectId);
    }
  };

  const openLookbook = (project) => {
    setDismissedTargetProjectId(null);
    setActiveProject(project);
  };

  const activeDetails = modalProject ? LOOKBOOK_DETAILS[modalProject.id] : null;
  const projectMeta = activeDetails ? (currentLang === 'vi' ? activeDetails.viMeta : activeDetails.meta) : '';
  const projectQuote = activeDetails ? (currentLang === 'vi' ? activeDetails.viQuote : activeDetails.quote) : '';
  const projectTestimonial = activeDetails ? (currentLang === 'vi' ? activeDetails.viTestimonial : activeDetails.testimonial) : '';

  return (
    <div id="showcase">
      {/* Showcase Hero */}
      <section className="showcase-brutalist-hero">
        <div className="showcase-brutalist-bg" aria-hidden="true" />
        <div className="showcase-brutalist-shade" aria-hidden="true" />
        <div className="container showcase-brutalist-content">
          <div className="reveal-on-scroll showcase-hero-heading">
            <span>{t.pageLabel || 'Our works'}</span>
            {t.pageSubtext && <p>{t.pageSubtext}</p>}
          </div>
          <div className="reveal-on-scroll showcase-brutalist-locations">
            <div>
              <span>North</span>
              <p>Ha Noi<br />Ninh Binh<br />Hai Phong</p>
            </div>
            <div>
              <span>Central</span>
              <p>Da Nang<br />Nha Trang<br />Phu Yen<br />Da Lat</p>
            </div>
            <div>
              <span>South</span>
              <p>Sai Gon<br />Vung Tau<br />Ninh Thuan<br />Binh Thuan</p>
            </div>
          </div>
          <h1 className="reveal-on-scroll delay-150 showcase-brutalist-title">
            {t.pageTitleLines?.length > 0 ? (
              t.pageTitleLines.map((line) => <span key={line}>{line}</span>)
            ) : (
              <span>{t.pageTitle}</span>
            )}
          </h1>
        </div>
      </section>

      {/* Featured Experiences Masonry Grid */}
      <section className="section-padding showcase-works-section" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-muted)' }}>
        <div className="container showcase-works-container" style={{ maxWidth: '1200px' }}>
          
          {/* Filters Bar */}
          <div className="reveal-on-scroll" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px', 
            marginBottom: '56px',
            flexWrap: 'wrap'
          }}>
            {filterList.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: selectedFilter === filter ? '2px solid var(--accent-secondary)' : '2px solid transparent',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  textTransform: 'none',
                  color: selectedFilter === filter ? 'var(--accent-secondary)' : 'var(--text-muted)',
                  transition: 'all var(--transition)'
                }}
              >
                {currentLang === 'en' ? filter : (
                  filter === 'all' ? 'Tất cả' :
                  filter === 'wedding' ? 'Đám cưới' :
                  filter === 'events' ? 'Sự kiện' :
                  filter === 'destination' ? 'Đám cưới xa nhà' : filter
                )}
              </button>
            ))}
          </div>

          {filteredList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              {currentLang === 'en' ? 'No projects found in this category.' : 'Không tìm thấy dự án nào thuộc nhóm này.'}
            </div>
          ) : (
            <div className="showcase-editorial-grid">
              {filteredList.map((project, idx) => {
                return (
                  <div 
                    key={project.id}
                    className="reveal-on-scroll showcase-editorial-item"
                    style={{ transitionDelay: `${(idx % 3) * 60}ms`, marginBottom: '24px' }}
                    onClick={() => openLookbook(project)}
                    onMouseEnter={() => preloadProjectGallery(project.id)}
                    onFocus={() => preloadProjectGallery(project.id)}
                  >
                    <div 
                      style={{
                        position: 'relative',
                        aspectRatio: idx === 0 ? '16/10' : '4/5',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                      }}
                      className="showcase-card-media-wrapper"
                    >
                      <OptimizedImage
                        src={HERO_BY_ID[project.id] || project.heroImg}
                        alt={project.title}
                        maxWidth={640}
                        priority={true}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="showcase-grid-image"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {/* Hover Overlay - Clean title only */}
                      <div className="showcase-card-overlay">
                        <span className="showcase-card-title">
                          {project.title}
                        </span>
                      </div>
                    </div>
                    {/* Mobile title below image */}
                    <h3 className="showcase-card-mobile-title">
                      {project.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding" style={{ 
        backgroundColor: 'var(--white)', 
        color: 'var(--charcoal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div className="container reveal-on-scroll" style={{ 
          maxWidth: '850px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: 'var(--charcoal)',
            lineHeight: 1.35,
            marginBottom: '36px',
            fontWeight: 400
          }}>
            {closingText}
          </h2>
          <button 
            className="text-action-link"
            onClick={() => setCurrentPage ? setCurrentPage('contact') : scrollToSection('contact')}
            style={{
              color: 'var(--accent-secondary)'
            }}
          >
            {closingBtn}
          </button>
        </div>
      </section>

      {/* Editorial Lookbook Modal */}
      {modalProject && (() => {
        const lbMedia = getLookbookImages(modalProject.id);
        return (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 20, 20, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '12px'
          }}
          onClick={closeLookbook}
          >
            <div style={{
              backgroundColor: '#ffffff',
              maxWidth: '1000px',
              width: '100%',
              height: '92vh',
              overflowY: 'auto',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.35)',
              borderRadius: '2px'
            }}
            onClick={(e) => e.stopPropagation()}
            className="lookbook-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={closeLookbook}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--charcoal)',
                  zIndex: 100,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                <X size={20} />
              </button>

              {/* SECTION 1: Cover Hero */}
              <div style={{ padding: '60px 40px 40px 40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ borderBottom: '1px solid rgba(42, 42, 42, 0.08)', paddingBottom: '24px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 300,
                    fontSize: '0.8rem',
                    letterSpacing: '0.2em',
                    color: 'var(--accent-secondary)',
                    textTransform: 'none'
                  }}>
                    {projectMeta}
                  </span>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                    color: 'var(--charcoal)',
                    marginTop: '8px',
                    marginBottom: 0,
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    textTransform: 'none'
                  }}>
                    {modalProject.title}
                  </h2>
                </div>

                {/* Hero Image */}
                {lbMedia.hero && (
                  <div style={{ width: '100%', height: '480px', overflow: 'hidden', borderRadius: '2px', position: 'relative' }}>
                    <OptimizedImage
                      src={lbMedia.hero}
                      alt={modalProject.title}
                      maxWidth={960}
                      priority
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>

              {/* SECTION 2: Quote Block (Alternate Background) */}
              {projectQuote && (
                <div style={{ backgroundColor: '#ffffff', padding: '64px 40px', textAlign: 'center' }}>
                  <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                      lineHeight: 1.7,
                      color: 'var(--charcoal)',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      margin: 0
                    }}>
                      "{projectQuote}"
                    </p>
                    {projectTestimonial && (
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.45rem, 3vw, 2rem)',
                        lineHeight: 1.45,
                        color: 'var(--accent-secondary)',
                        fontWeight: 300,
                        margin: '28px 0 0'
                      }}>
                        {projectTestimonial}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION 3: Asymmetric Photo Collage */}
              <div style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
                
                {/* Secondary Images (Two columns, offset heights) */}
                {lbMedia.secondary.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
                    <div style={{ marginTop: '0px', height: '360px', overflow: 'hidden', borderRadius: '2px' }}>
                      <OptimizedImage
                        src={lbMedia.secondary[0]}
                        alt=""
                        maxWidth={480}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    {lbMedia.secondary[1] && (
                      <div style={{ marginTop: '48px', height: '360px', overflow: 'hidden', borderRadius: '2px' }}>
                        <OptimizedImage
                          src={lbMedia.secondary[1]}
                          alt=""
                          maxWidth={480}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Color Images (Overlapping / Asymmetric) */}
                {lbMedia.color.length > 0 && (
                  <div style={{ position: 'relative', height: '420px', marginTop: '32px' }} className="lookbook-overlap-block">
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      width: '60%',
                      height: '320px',
                      overflow: 'hidden',
                      borderRadius: '2px',
                      zIndex: 1
                    }}>
                      <OptimizedImage
                        src={lbMedia.color[0]}
                        alt=""
                        maxWidth={640}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    {lbMedia.color[1] && (
                      <div style={{
                        position: 'absolute',
                        right: '0',
                        bottom: '0',
                        width: '50%',
                        height: '280px',
                        overflow: 'hidden',
                        borderRadius: '2px',
                        zIndex: 2,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                      }}>
                        <OptimizedImage
                          src={lbMedia.color[1]}
                          alt=""
                          maxWidth={480}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Closing copy instead of monochrome footage */}
                {lbMedia.bw.length > 0 && (
                  <div className="lookbook-copy-cta">
                    <p>
                      {currentLang === 'vi'
                        ? 'Mỗi gallery là một lát cắt của cảm xúc thật, được giữ lại bằng nhịp điệu, chi tiết và con người trong ngày hôm đó.'
                        : 'Each gallery is held together by real emotion, lived details, and the people who made the day unmistakably theirs.'}
                    </p>
                    <button
                      type="button"
                      className="text-action-link"
                      onClick={() => {
                        closeLookbook();
                        setCurrentPage ? setCurrentPage('contact') : scrollToSection('contact');
                      }}
                    >
                      {currentLang === 'vi' ? 'bắt đầu câu chuyện của bạn' : 'start your story'}
                    </button>
                  </div>
                )}

              </div>

              {/* SECTION 4: Close CTA */}
              <div style={{ padding: '48px 40px 80px 40px', display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff' }}>
                <button 
                  onClick={() => {
                    closeLookbook();
                    setCurrentPage ? setCurrentPage('contact') : scrollToSection('contact');
                  }}
                  className="text-action-link"
                >
                  {currentLang === 'en' ? 'start planning your story' : 'bắt đầu kế hoạch của bạn'}
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
}
