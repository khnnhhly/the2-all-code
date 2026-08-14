import {useEffect, useState} from 'react'
import {definePlugin, useClient} from 'sanity'

const postsQuery = /* groq */ `
  *[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "imageUrl": mainImage.asset->url,
    "author": author->name,
    "categories": categories[]->title
  }
`

const aboutPageQuery = /* groq */ `
  *[_type == "aboutPage" && _id in ["site.about", "drafts.site.about"]] | order(_updatedAt desc)[0] {
    heroSection {
      headline,
      subheading,
      backgroundImage {
        asset-> { url }
      }
    },
    testimonialsSection {
      categoryTag,
      mainHeadline,
      testimonialCards[]-> {
        _id,
        title,
        serviceCategory,
        location,
        year,
        "cardImageUrl": cardImage.asset->url,
        shortQuote,
        "heroImageUrl": heroImage.asset->url,
        detailedQuote,
        highlightQuote,
        gallery[] {
          asset-> { url }
        },
        ctaLink
      }
    }
  }
`

const allTestimonialsQuery = /* groq */ `
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    title,
    serviceCategory,
    location,
    year,
    "cardImageUrl": cardImage.asset->url,
    shortQuote,
    "heroImageUrl": heroImage.asset->url,
    detailedQuote,
    highlightQuote,
    gallery[] {
      asset-> { url }
    },
    ctaLink
  }
`

function formatDate(value) {
  return value
    ? new Intl.DateTimeFormat('vi-VN', {day: 'numeric', month: 'long', year: 'numeric'}).format(
        new Date(value),
      )
    : ''
}

function PostImage({post, featured = false}) {
  if (!post.imageUrl) return <div className="site-image site-image--empty">Bài viết</div>

  const size = featured ? 'w=1400&h=900' : 'w=900&h=600'
  return (
    <img
      className="site-image"
      src={`${post.imageUrl}?${size}&fit=crop&auto=format`}
      alt={post.title || 'Ảnh bài viết'}
      loading={featured ? 'eager' : 'lazy'}
    />
  )
}

function ArticleMeta({post}) {
  return (
    <p className="site-meta">
      {post.categories?.[0] || 'Chuyện hay'} <span>•</span> {formatDate(post.publishedAt)}
      {post.author && <><span>•</span>{post.author}</>}
    </p>
  )
}

function TestimonialModal({ testimonial, onClose }) {
  useEffect(() => {
    // Lock body scroll when active
    document.body.style.overflow = 'hidden'

    // Close on ESC keypress
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!testimonial) return null

  const serviceCategory = testimonial.serviceCategory
  const location = testimonial.location
  const year = testimonial.year
  const title = testimonial.title
  const heroImageUrl = testimonial.heroImageUrl
  const detailedQuote = testimonial.detailedQuote
  const highlightQuote = testimonial.highlightQuote
  const gallery = testimonial.gallery || []
  const ctaLink = testimonial.ctaLink || '/our-works'

  return (
    <div className="site-modal-overlay" onClick={onClose}>
      <div className="site-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="site-modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        
        <div className="site-modal-content">
          <header className="site-modal-header">
            <p className="site-modal-meta">
              {serviceCategory && <span>{serviceCategory}</span>}
              {serviceCategory && (location || year) && <span> · </span>}
              {location && <span>{location}</span>}
              {location && year && <span> · </span>}
              {year && <span>{year}</span>}
            </p>
            <h2 className="site-modal-title">{title}</h2>
          </header>
          
          {heroImageUrl && (
            <div className="site-modal-hero">
              <img 
                src={`${heroImageUrl}?w=1400&h=700&fit=crop&auto=format`} 
                alt={title} 
                className="site-modal-hero-img" 
              />
            </div>
          )}
          
          <section className="site-modal-quotes">
            {detailedQuote && (
              <p className="site-modal-quote-detailed">
                {detailedQuote}
              </p>
            )}
            {highlightQuote && (
              <p className="site-modal-quote-highlight">
                {highlightQuote}
              </p>
            )}
          </section>
          
          {gallery.length > 0 && (
            <section className="site-modal-gallery">
              <div className="site-modal-gallery-grid">
                {gallery.map((img, index) => {
                  const url = img?.asset?.url
                  if (!url) return null
                  return (
                    <div className="site-modal-gallery-item" key={index}>
                      <img 
                        src={`${url}?w=800&fit=max&auto=format`} 
                        alt={img.alt || `Gallery Image ${index + 1}`} 
                      />
                    </div>
                  )
                })}
              </div>
            </section>
          )}
          
          <footer className="site-modal-footer">
            <p className="site-modal-footer-text">
              Each gallery is held together by real emotion, lived details, and the people who made the day unmistakably theirs.
            </p>
            <a href={ctaLink} className="site-modal-cta-button">
              start planning your story
            </a>
          </footer>
        </div>
      </div>
    </div>
  )
}

function Website() {
  const client = useClient({apiVersion: '2026-07-19'})
  const [posts, setPosts] = useState([])
  const [aboutData, setAboutData] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    
    // Fetch all content
    Promise.all([
      client.fetch(postsQuery),
      client.fetch(aboutPageQuery),
      client.fetch(allTestimonialsQuery)
    ]).then(([postsResult, aboutResult, allTestimonialsResult]) => {
      if (!active) return
      setPosts(postsResult)
      setAboutData(aboutResult)
      
      // Determine testimonials to show (use referenced list, fallback to all)
      const cards = aboutResult?.testimonialsSection?.testimonialCards
      if (cards && cards.length > 0) {
        setTestimonials(cards.filter(Boolean))
      } else {
        setTestimonials(allTestimonialsResult || [])
      }
      
      setStatus('ready')
    }).catch((err) => {
      console.error("Website preview fetch error:", err)
      if (active) setStatus('error')
    })

    return () => { active = false }
  }, [client])

  const [featured, ...rest] = posts
  return (
    <main className="site-shell">
      <style>{styles}</style>
      <nav className="site-nav">
        <a className="site-brand" href="#top">mộc.</a>
        <div className="site-nav-links">
          <a href="#bai-viet">Bài viết</a>
          <a href="#ve-chung-toi">Về chúng tôi</a>
        </div>
      </nav>
      
      <section className="site-hero" id="top">
        <p className="site-eyebrow">TẠP CHÍ SỐ</p>
        <h1>Những điều đáng<br /><em>để tâm.</em></h1>
        <p className="site-intro">Một góc nhỏ cho những câu chuyện, con người và ý tưởng khiến cuộc sống thêm nhiều màu sắc.</p>
        <a className="site-button" href="#bai-viet">Khám phá bài viết <span>↓</span></a>
      </section>
      
      <section className="site-content" id="bai-viet">
        <div className="site-section-heading">
          <p className="site-eyebrow">MỚI NHẤT</p>
          <h2>Câu chuyện gần đây</h2>
        </div>
        {status === 'loading' && <p className="site-message">Đang tải nội dung từ Sanity…</p>}
        {status === 'error' && <p className="site-message">Chưa thể tải nội dung. Hãy kiểm tra quyền đọc của dataset Sanity.</p>}
        {status === 'ready' && !featured && <p className="site-message">Chưa có bài viết nào. Hãy tạo một mục <strong>Post</strong> trong Studio để nội dung xuất hiện tại đây.</p>}
        {featured && (
          <article className="site-featured">
            <PostImage post={featured} featured />
            <div className="site-featured-copy">
              <ArticleMeta post={featured} />
              <h3>{featured.title || 'Bài viết chưa có tiêu đề'}</h3>
              <button type="button" className="site-read">Đọc bài viết <span>→</span></button>
            </div>
          </article>
        )}
        {rest.length > 0 && (
          <div className="site-grid">
            {rest.map((post) => (
              <article className="site-card" key={post._id}>
                <PostImage post={post} />
                <ArticleMeta post={post} />
                <h3>{post.title || 'Bài viết chưa có tiêu đề'}</h3>
                <button type="button" className="site-read">Khám phá <span>→</span></button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* About Us & Testimonials Section */}
      <section className="site-about-section" id="ve-chung-toi">
        <div className="site-section-heading">
          <p className="site-eyebrow">
            {aboutData?.testimonialsSection?.categoryTag?.en || 
             aboutData?.testimonialsSection?.categoryTag?.vi || 
             "TESTIMONIALS"}
          </p>
          <h2>
            {aboutData?.testimonialsSection?.mainHeadline?.en || 
             aboutData?.testimonialsSection?.mainHeadline?.vi || 
             "What Couples Say"}
          </h2>
        </div>
        
        {status === 'loading' && <p className="site-message">Đang tải chia sẻ…</p>}
        {status === 'ready' && testimonials.length === 0 && (
          <p className="site-message">Chưa có chia sẻ nào. Tạo một Customer Testimonial trong Studio để hiển thị tại đây.</p>
        )}
        {status === 'ready' && testimonials.length > 0 && (
          <div className="site-testimonial-grid">
            {testimonials.map((t) => {
              if (!t) return null
              return (
                <article 
                  className="site-testimonial-card" 
                  key={t._id}
                  onClick={() => setSelectedTestimonial(t)}
                >
                  <div className="site-testimonial-card-img-wrapper">
                    {t.cardImageUrl ? (
                      <img 
                        src={`${t.cardImageUrl}?w=600&h=600&fit=crop&auto=format`} 
                        alt={t.title} 
                        className="site-testimonial-card-img"
                      />
                    ) : (
                      <div className="site-testimonial-card-img-placeholder">Story</div>
                    )}
                  </div>
                  <div className="site-testimonial-card-body">
                    <p className="site-testimonial-card-meta">
                      {t.serviceCategory && <span>{t.serviceCategory}</span>}
                      {t.serviceCategory && (t.location || t.year) && <span> · </span>}
                      {t.location}
                      {t.year && <span> · </span>}
                      {t.year}
                    </p>
                    <h3 className="site-testimonial-card-title">{t.title}</h3>
                    <p className="site-testimonial-card-quote">
                      {t.shortQuote && t.shortQuote.length > 140 
                        ? `${t.shortQuote.slice(0, 140)}...` 
                        : t.shortQuote}
                    </p>
                    <span className="site-testimonial-card-more">Đọc câu chuyện của họ <span>→</span></span>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* Detailed Modal Popup */}
      {selectedTestimonial && (
        <TestimonialModal 
          testimonial={selectedTestimonial} 
          onClose={() => setSelectedTestimonial(null)} 
        />
      )}
      
      <footer className="site-footer">
        <p className="site-brand">mộc.</p>
        <p>Một website được cập nhật trực tiếp từ Sanity.</p>
      </footer>
    </main>
  )
}

export const websiteTool = definePlugin({name: 'website-preview', tools: [{name: 'website', title: 'Website', component: Website}]})

const styles = `
.site-shell{--ink:#17281f;--paper:#f8f6f0;--lime:#d6f05c;background:var(--paper);color:var(--ink);min-height:100vh;font-family:Georgia,'Times New Roman',serif}.site-nav,.site-hero,.site-content,.site-footer,.site-about-section{box-sizing:border-box;max-width:1240px;margin:0 auto}.site-nav{display:flex;justify-content:space-between;align-items:center;padding:28px 36px;border-bottom:1px solid #d7d9d1}.site-brand{color:var(--ink);font-family:Arial,sans-serif;font-size:27px;font-weight:800;letter-spacing:-2px;text-decoration:none}.site-nav-links{display:flex;gap:28px;font-family:Arial,sans-serif;font-size:13px;font-weight:700}.site-nav-links a{color:var(--ink);text-decoration:none}.site-hero{padding:112px 36px 120px}.site-eyebrow{margin:0 0 18px;color:#647269;font-family:Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:1.8px}.site-hero h1{margin:0;font-size:clamp(54px,9vw,118px);font-weight:400;letter-spacing:-6px;line-height:.87}.site-hero h1 em{color:#56734b;font-weight:400}.site-intro{max-width:420px;margin:42px 0 30px;color:#4d5c52;font-size:19px;line-height:1.55}.site-button{display:inline-flex;align-items:center;gap:18px;padding:15px 20px;background:var(--ink);color:white;font-family:Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none}.site-button span,.site-read span{color:var(--lime);font-size:18px}.site-content{padding:76px 36px 112px;background:#e9eee2}.site-section-heading{display:flex;justify-content:space-between;align-items:end;margin-bottom:34px}.site-section-heading h2{margin:0;font-size:40px;font-weight:400;letter-spacing:-2px}.site-message{margin:0;padding:30px;background:white;color:#536259;font-family:Arial,sans-serif;line-height:1.6}.site-featured{display:grid;grid-template-columns:1.15fr .85fr;min-height:390px;background:var(--ink);color:white}.site-image{display:block;width:100%;height:100%;min-height:230px;object-fit:cover;background:#b3c1a5}.site-image--empty{display:grid;place-items:center;color:#56734b;font-family:Arial,sans-serif;font-size:13px;font-weight:700}.site-featured-copy{display:flex;flex-direction:column;justify-content:center;padding:44px}.site-meta{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px;color:#849a89;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.3px;text-transform:uppercase}.site-featured h3,.site-card h3{margin:0;font-size:clamp(28px,3vw,43px);font-weight:400;letter-spacing:-1.7px;line-height:1.04}.site-read{align-self:flex-start;margin-top:30px;padding:0;border:0;background:transparent;color:inherit;cursor:pointer;font-family:Arial,sans-serif;font-size:13px;font-weight:700}.site-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:24px}.site-card{padding-bottom:27px;background:white}.site-card .site-image{height:220px;min-height:0}.site-card .site-meta,.site-card h3,.site-card .site-read{margin-left:25px;margin-right:25px}.site-card .site-meta{margin-top:25px;color:#758279}.site-card h3{min-height:88px;font-size:26px}.site-card .site-read{margin-top:21px;color:#3b5242}.site-footer{display:flex;justify-content:space-between;align-items:center;padding:42px 36px;background:var(--ink);color:#cbd5c7;font-family:Arial,sans-serif;font-size:12px}.site-footer .site-brand{color:white}.site-footer p{margin:0}

/* About Us & Testimonials Styles */
.site-about-section {
  padding: 100px 36px 120px;
  background: var(--paper);
}
.site-testimonial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-top: 40px;
}
.site-testimonial-card {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #d7d9d1;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}
.site-testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(23, 40, 31, 0.08);
}
.site-testimonial-card-img-wrapper {
  aspect-ratio: 4/3;
  overflow: hidden;
  position: relative;
  background: #cbd5c7;
}
.site-testimonial-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.site-testimonial-card:hover .site-testimonial-card-img {
  filter: grayscale(0%);
  transform: scale(1.04);
}
.site-testimonial-card-img-placeholder {
  display: grid;
  place-items: center;
  height: 100%;
  color: #56734b;
  font-family: Arial, sans-serif;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}
.site-testimonial-card-body {
  padding: 36px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.site-testimonial-card-meta {
  color: #647269;
  font-family: Arial, sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  margin: 0 0 16px;
}
.site-testimonial-card-title {
  margin: 0 0 16px;
  font-family: Georgia, serif;
  font-size: clamp(22px, 2.5vw, 28px);
  font-weight: 400;
  letter-spacing: -0.8px;
  line-height: 1.1;
  color: var(--ink);
}
.site-testimonial-card-quote {
  font-size: 15px;
  line-height: 1.65;
  color: #4d5c52;
  margin: 0 0 30px;
  flex-grow: 1;
}
.site-testimonial-card-more {
  font-family: Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.site-testimonial-card-more span {
  transition: transform 0.2s ease;
}
.site-testimonial-card:hover .site-testimonial-card-more span {
  transform: translateX(4px);
}

/* Reusable Modal Pop-up */
.site-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(23, 40, 31, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  padding: 50px 24px;
  box-sizing: border-box;
}
.site-modal-container {
  background: var(--paper);
  width: 100%;
  max-width: 900px;
  position: relative;
  box-shadow: 0 24px 60px rgba(17, 30, 23, 0.2);
  border: 1px solid #d7d9d1;
  animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.site-modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: var(--paper);
  border: 1px solid #d7d9d1;
  color: var(--ink);
  font-size: 28px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10010;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.site-modal-close:hover {
  background: var(--ink);
  color: white;
  border-color: var(--ink);
}
.site-modal-content {
  padding: 60px;
  box-sizing: border-box;
}
.site-modal-header {
  margin-bottom: 40px;
  text-align: center;
}
.site-modal-meta {
  color: #647269;
  font-family: Arial, sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 16px;
}
.site-modal-title {
  margin: 0;
  font-family: Georgia, serif;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 400;
  letter-spacing: -2px;
  line-height: 1.05;
  color: var(--ink);
}
.site-modal-hero {
  margin-bottom: 48px;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #cbd5c7;
  border: 1px solid #d7d9d1;
}
.site-modal-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.site-modal-quotes {
  max-width: 720px;
  margin: 0 auto 48px;
}
.site-modal-quote-detailed {
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 19px;
  line-height: 1.75;
  color: var(--ink);
  margin: 0 0 32px;
}
.site-modal-quote-highlight {
  font-family: Georgia, serif;
  color: #c0564b; /* Accent Red */
  font-style: normal;
  font-size: 21px;
  line-height: 1.6;
  margin: 0;
  border-left: 3px solid #c0564b;
  padding-left: 24px;
}
.site-modal-gallery {
  margin-bottom: 60px;
}
.site-modal-gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.site-modal-gallery-item {
  aspect-ratio: 3/2;
  overflow: hidden;
  background: #cbd5c7;
  border: 1px solid #d7d9d1;
}
.site-modal-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.site-modal-gallery-item:hover img {
  transform: scale(1.05);
}
.site-modal-footer {
  text-align: center;
  border-top: 1px solid #d7d9d1;
  padding-top: 48px;
  max-width: 640px;
  margin: 0 auto;
}
.site-modal-footer-text {
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 15px;
  line-height: 1.65;
  color: #647269;
  margin: 0 0 32px;
}
.site-modal-cta-button {
  display: inline-block;
  background: var(--ink);
  color: white;
  font-family: Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 18px 44px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.site-modal-cta-button:hover {
  background: #273b30;
  box-shadow: 0 6px 18px rgba(23, 40, 31, 0.18);
}

@media(max-width:720px){
  .site-testimonial-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .site-about-section {
    padding: 80px 20px;
  }
  .site-modal-content {
    padding: 40px 20px;
  }
  .site-modal-gallery-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .site-modal-close {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
}
`
