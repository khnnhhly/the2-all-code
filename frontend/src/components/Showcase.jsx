'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import OptimizedImage, { preloadImages } from './OptimizedImage';
import { urlFor } from '../lib/sanity';

export default function Showcase({ worksData, projects, currentLang, setCurrentPage, targetProjectId }) {
  const [activeProject, setActiveProject] = useState(null);
  const [dismissedTargetProjectId, setDismissedTargetProjectId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getLocalizedText = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || field.vi || '';
  };

  const getThumbnailUrl = (project) => {
    if (project?.thumbnailImage) {
      try {
        return urlFor(project.thumbnailImage).url() || '';
      } catch (e) {}
    }
    return '';
  };

  const getLookbookImages = (project) => {
    if (!project) return { hero: null, secondary: [], color: [], bw: [] };
    const images = project.galleryImages?.map(img => {
      try {
        return urlFor(img).url() || '';
      } catch (e) {
        return '';
      }
    }).filter(Boolean) || [];

    if (images.length === 0) {
      let fallbackUrl = '';
      if (project.heroDetailImage) {
        try {
          fallbackUrl = urlFor(project.heroDetailImage).url() || '';
        } catch (e) {}
      } else {
        fallbackUrl = getThumbnailUrl(project);
      }
      return { hero: fallbackUrl, secondary: [], color: [], bw: [] };
    }

    return {
      hero: images[0],
      secondary: images.slice(1, 3), // next two
      color: images.slice(3, 5),     // next two color
      bw: images.slice(5)            // remainder
    };
  };

  const preloadProjectGallery = (project) => {
    if (!project) return;
    const media = getLookbookImages(project);
    const urls = [media.hero, ...media.secondary, ...media.color, ...media.bw].filter(Boolean);
    if (urls.length > 0) preloadImages(urls, 480);
  };

  // 1. Build projects list
  const featured = worksData?.portfolioSection?.featuredProjects?.map(project => {
    if (!project) return null;
    return {
      id: project.slug?.current || project._id,
      title: project.title || '',
      category: project.category || '',
      thumbnailImage: project.thumbnailImage,
      heroDetailImage: project.heroDetailImage,
      galleryImages: project.galleryImages || [],
      serviceType: project.serviceType,
      location: project.location,
      year: project.year,
      summaryQuote: project.summaryQuote,
      highlightFeedback: project.highlightFeedback,
      closingThought: project.closingThought,
      ctaText: project.ctaText,
      _id: project._id
    };
  }).filter(Boolean) || [];

  const remaining = projects?.map(project => {
    if (!project) return null;
    return {
      id: project.slug?.current || project._id,
      title: project.title || '',
      category: project.category || '',
      thumbnailImage: project.thumbnailImage,
      heroDetailImage: project.heroDetailImage,
      galleryImages: project.galleryImages || [],
      serviceType: project.serviceType,
      location: project.location,
      year: project.year,
      summaryQuote: project.summaryQuote,
      highlightFeedback: project.highlightFeedback,
      closingThought: project.closingThought,
      ctaText: project.ctaText,
      _id: project._id
    };
  }).filter(p => p && !featured.some(f => f._id === p._id)) || [];

  const list = [...featured, ...remaining];

  const filterList = worksData?.portfolioSection?.filterTabs || ['all', 'wedding', 'events', 'destination'];
  const targetProject = targetProjectId ? list.find((item) => item.id === targetProjectId) : null;
  const modalProject = activeProject || (dismissedTargetProjectId === targetProjectId ? null : targetProject);

  useEffect(() => {
    if (modalProject) {
      preloadProjectGallery(modalProject);
    }
  }, [modalProject?.id]);

  if (!worksData && list.length === 0) {
    return (
      <div style={{ padding: '160px 0', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <p>{currentLang === 'vi' ? 'Đang tải dữ liệu...' : 'Loading content...'}</p>
      </div>
    );
  }

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

  const closingText = getLocalizedText(worksData?.preFooterCtaSection?.headline) || (currentLang === 'en' ? 'your wedding hasn\'t been planned yet. but your story already exists.' : 'đám cưới của bạn chưa được lập kế hoạch. nhưng câu chuyện của bạn đã hiện hữu.');
  const closingBtn = getLocalizedText(worksData?.preFooterCtaSection?.ctaButton?.label) || (currentLang === 'en' ? 'start planning your story' : 'bắt đầu kể câu chuyện của bạn');

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

  const projectMeta = modalProject ? `${getLocalizedText(modalProject.serviceType)} · ${modalProject.location || ''} · ${modalProject.year || ''}` : '';
  const projectQuote = modalProject ? getLocalizedText(modalProject.summaryQuote) : '';
  const projectTestimonial = modalProject ? getLocalizedText(modalProject.highlightFeedback) : '';

  const pageLabel = getLocalizedText(worksData?.heroSection?.headline) || (currentLang === 'en' ? 'Our works' : 'Dự án');
  const pageSubtext = getLocalizedText(worksData?.heroSection?.subheading) || '';
  const pageTitle = getLocalizedText(worksData?.heroSection?.title) || '';

  return (
    <div id="showcase">
      {/* Showcase Hero */}
      <section className="showcase-brutalist-hero">
        <div className="showcase-brutalist-bg" aria-hidden="true" />
        <div className="showcase-brutalist-shade" aria-hidden="true" />
        <div className="container showcase-brutalist-content">
          <div className="reveal-on-scroll showcase-hero-heading">
            <span>{pageLabel}</span>
            {pageSubtext && <p>{pageSubtext}</p>}
          </div>

          {worksData?.heroSection?.regions?.length > 0 ? (
            <div className="reveal-on-scroll showcase-brutalist-locations">
              {worksData.heroSection.regions.map((reg, idx) => (
                <div key={idx}>
                  <span>{getLocalizedText(reg.regionName)}</span>
                  <p>
                    {reg.locations?.map((loc, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {getLocalizedText(loc)}
                        {lIdx < reg.locations.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          ) : (
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
          )}

          {pageTitle && (
            <h1 className="reveal-on-scroll delay-150 showcase-brutalist-title">
              <span>{pageTitle}</span>
            </h1>
          )}
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
                const thumbnailUrl = getThumbnailUrl(project);
                return (
                  <div 
                    key={project.id}
                    className="reveal-on-scroll showcase-editorial-item"
                    style={{ transitionDelay: `${(idx % 3) * 60}ms`, marginBottom: '24px' }}
                    onClick={() => openLookbook(project)}
                    onMouseEnter={() => preloadProjectGallery(project)}
                    onFocus={() => preloadProjectGallery(project)}
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
                      {thumbnailUrl && (
                        <OptimizedImage
                          src={thumbnailUrl}
                          alt={project.title}
                          maxWidth={640}
                          priority={true}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="showcase-grid-image"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
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
            onClick={() => setCurrentPage ? setCurrentPage('contact') : null}
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
        const lbMedia = getLookbookImages(modalProject);
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

                {/* Closing thought and start buttons */}
                <div className="lookbook-copy-cta">
                  {modalProject.closingThought && (
                    <p>
                      {getLocalizedText(modalProject.closingThought)}
                    </p>
                  )}
                  <button
                    type="button"
                    className="text-action-link"
                    onClick={() => {
                      closeLookbook();
                      setCurrentPage ? setCurrentPage('contact') : null;
                    }}
                  >
                    {getLocalizedText(modalProject.ctaText) || (currentLang === 'vi' ? 'bắt đầu câu chuyện của bạn' : 'start your story')}
                  </button>
                </div>

              </div>

              {/* SECTION 4: Close CTA */}
              <div style={{ padding: '48px 40px 80px 40px', display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff' }}>
                <button 
                  onClick={() => {
                    closeLookbook();
                    setCurrentPage ? setCurrentPage('contact') : null;
                  }}
                  className="text-action-link"
                >
                  {getLocalizedText(modalProject.ctaText) || (currentLang === 'en' ? 'start planning your story' : 'bắt đầu kế hoạch của bạn')}
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
}
