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

function Website() {
  const client = useClient({apiVersion: '2026-07-19'})
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    client.fetch(postsQuery).then((result) => {
      if (!active) return
      setPosts(result)
      setStatus('ready')
    }).catch(() => active && setStatus('error'))
    return () => { active = false }
  }, [client])

  const [featured, ...rest] = posts
  return (
    <main className="site-shell">
      <style>{styles}</style>
      <nav className="site-nav">
        <a className="site-brand" href="#top">mộc.</a>
        <div className="site-nav-links"><a href="#bai-viet">Bài viết</a><a href="#ve-chung-toi">Về chúng tôi</a></div>
      </nav>
      <section className="site-hero" id="top">
        <p className="site-eyebrow">TẠP CHÍ SỐ</p>
        <h1>Những điều đáng<br /><em>để tâm.</em></h1>
        <p className="site-intro">Một góc nhỏ cho những câu chuyện, con người và ý tưởng khiến cuộc sống thêm nhiều màu sắc.</p>
        <a className="site-button" href="#bai-viet">Khám phá bài viết <span>↓</span></a>
      </section>
      <section className="site-content" id="bai-viet">
        <div className="site-section-heading"><p className="site-eyebrow">MỚI NHẤT</p><h2>Câu chuyện gần đây</h2></div>
        {status === 'loading' && <p className="site-message">Đang tải bài viết từ Sanity…</p>}
        {status === 'error' && <p className="site-message">Chưa thể tải nội dung. Hãy kiểm tra quyền đọc của dataset Sanity.</p>}
        {status === 'ready' && !featured && <p className="site-message">Chưa có bài viết nào. Hãy tạo một mục <strong>Post</strong> trong Studio để nội dung xuất hiện tại đây.</p>}
        {featured && <article className="site-featured"><PostImage post={featured} featured /><div className="site-featured-copy"><ArticleMeta post={featured} /><h3>{featured.title || 'Bài viết chưa có tiêu đề'}</h3><button type="button" className="site-read">Đọc bài viết <span>→</span></button></div></article>}
        {rest.length > 0 && <div className="site-grid">{rest.map((post) => <article className="site-card" key={post._id}><PostImage post={post} /><ArticleMeta post={post} /><h3>{post.title || 'Bài viết chưa có tiêu đề'}</h3><button type="button" className="site-read">Khám phá <span>→</span></button></article>)}</div>}
      </section>
      <footer className="site-footer" id="ve-chung-toi"><p className="site-brand">mộc.</p><p>Một website được cập nhật trực tiếp từ Sanity.</p></footer>
    </main>
  )
}

export const websiteTool = definePlugin({name: 'website-preview', tools: [{name: 'website', title: 'Website', component: Website}]})

const styles = `
.site-shell{--ink:#17281f;--paper:#f8f6f0;--lime:#d6f05c;background:var(--paper);color:var(--ink);min-height:100vh;font-family:Georgia,'Times New Roman',serif}.site-nav,.site-hero,.site-content,.site-footer{box-sizing:border-box;max-width:1240px;margin:0 auto}.site-nav{display:flex;justify-content:space-between;align-items:center;padding:28px 36px;border-bottom:1px solid #d7d9d1}.site-brand{color:var(--ink);font-family:Arial,sans-serif;font-size:27px;font-weight:800;letter-spacing:-2px;text-decoration:none}.site-nav-links{display:flex;gap:28px;font-family:Arial,sans-serif;font-size:13px;font-weight:700}.site-nav-links a{color:var(--ink);text-decoration:none}.site-hero{padding:112px 36px 120px}.site-eyebrow{margin:0 0 18px;color:#647269;font-family:Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:1.8px}.site-hero h1{margin:0;font-size:clamp(54px,9vw,118px);font-weight:400;letter-spacing:-6px;line-height:.87}.site-hero h1 em{color:#56734b;font-weight:400}.site-intro{max-width:420px;margin:42px 0 30px;color:#4d5c52;font-size:19px;line-height:1.55}.site-button{display:inline-flex;align-items:center;gap:18px;padding:15px 20px;background:var(--ink);color:white;font-family:Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none}.site-button span,.site-read span{color:var(--lime);font-size:18px}.site-content{padding:76px 36px 112px;background:#e9eee2}.site-section-heading{display:flex;justify-content:space-between;align-items:end;margin-bottom:34px}.site-section-heading h2{margin:0;font-size:40px;font-weight:400;letter-spacing:-2px}.site-message{margin:0;padding:30px;background:white;color:#536259;font-family:Arial,sans-serif;line-height:1.6}.site-featured{display:grid;grid-template-columns:1.15fr .85fr;min-height:390px;background:var(--ink);color:white}.site-image{display:block;width:100%;height:100%;min-height:230px;object-fit:cover;background:#b3c1a5}.site-image--empty{display:grid;place-items:center;color:#56734b;font-family:Arial,sans-serif;font-size:13px;font-weight:700}.site-featured-copy{display:flex;flex-direction:column;justify-content:center;padding:44px}.site-meta{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px;color:#849a89;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.3px;text-transform:uppercase}.site-featured h3,.site-card h3{margin:0;font-size:clamp(28px,3vw,43px);font-weight:400;letter-spacing:-1.7px;line-height:1.04}.site-read{align-self:flex-start;margin-top:30px;padding:0;border:0;background:transparent;color:inherit;cursor:pointer;font-family:Arial,sans-serif;font-size:13px;font-weight:700}.site-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:24px}.site-card{padding-bottom:27px;background:white}.site-card .site-image{height:220px;min-height:0}.site-card .site-meta,.site-card h3,.site-card .site-read{margin-left:25px;margin-right:25px}.site-card .site-meta{margin-top:25px;color:#758279}.site-card h3{min-height:88px;font-size:26px}.site-card .site-read{margin-top:21px;color:#3b5242}.site-footer{display:flex;justify-content:space-between;align-items:center;padding:42px 36px;background:var(--ink);color:#cbd5c7;font-family:Arial,sans-serif;font-size:12px}.site-footer .site-brand{color:white}.site-footer p{margin:0}@media(max-width:720px){.site-nav,.site-hero,.site-content,.site-footer{padding-left:20px;padding-right:20px}.site-nav-links{gap:15px}.site-hero{padding-top:76px;padding-bottom:80px}.site-hero h1{letter-spacing:-3px}.site-featured{grid-template-columns:1fr}.site-featured .site-image{height:270px}.site-featured-copy{padding:30px}.site-grid{grid-template-columns:1fr}.site-card .site-image{height:240px}.site-footer{align-items:flex-start;flex-direction:column;gap:15px}}
`
