import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import LogoSvg from './LogoSvg';
export default function Contact({ t, currentLang }) {
  const [formData, setFormData] = useState({
    name: '', partnerName: '', email: '', phone: '',
    date: '', location: '', guests: '', budget: '',
    hearAbout: '', service: '', story: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  if (!t) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || submitting) return;

    setSubmitting(true);
    setSubmitError(false);

    const messageBody = [
      `Name: ${formData.name}`,
      formData.partnerName ? `Partner: ${formData.partnerName}` : null,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : null,
      formData.date ? `Date: ${formData.date}` : null,
      formData.location ? `Location: ${formData.location}` : null,
      formData.guests ? `Guests: ${formData.guests}` : null,
      formData.budget ? `Budget: ${formData.budget}` : null,
      formData.hearAbout ? `How they heard about us: ${formData.hearAbout}` : null,
      formData.service ? `Service interest: ${formData.service}` : null,
      '',
      'Story:',
      formData.story
    ].filter(Boolean).join('\n');

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('message', messageBody);
    payload.append('_subject', `Website inquiry, ${formData.name}`);
    payload.append('_captcha', 'false');
    payload.append('_template', 'table');

    try {
      const res = await fetch('https://formsubmit.co/ajax/thetwoplanner@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload
      });
      if (!res.ok) throw new Error('submit failed');
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyle = {
    border: 'none',
    borderBottom: '1px solid var(--border-muted)',
    padding: '16px 4px 12px 4px',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    color: 'var(--charcoal)',
    transition: 'border-color var(--transition)'
  };

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    fontWeight: 300,
    letterSpacing: '0.2em',
    color: 'var(--text-muted)',
    display: 'block',
    marginBottom: '8px'
  };

  const servicesOptions = t.formServiceOptions || [
    'lên kế hoạch trọn gói', 'phối hợp', 'ý tưởng và phong cách', 'xa nhà', 'sự kiện', 'chưa chắc'
  ];
  const quickChoices = [
    'A romantic wedding',
    'An intimate proposal',
    'An anniv/private party',
    'Something else!'
  ];

  const closingText = t.closingQuote || t.closingText || '';
  const closingSig = t.closingSignature || 'the two · for you two';
  const contactTitle = t.contactTitle || t.contactTitleLines?.join(' ') || '';
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id="contact">
      {/* Contact Hero */}
      <section className="contact-cinematic-hero">
        <div className="contact-cinematic-grain" aria-hidden="true" />
        <div className="container contact-cinematic-content">
          <div className="contact-hero-copy reveal-on-scroll">
            <h1 className="contact-hero-label">{t.pageLabel || 'Contact us'}</h1>
            {t.contactDesc && (
              <p className="contact-hero-subtext">
                {t.contactDesc}
              </p>
            )}
            <button
              type="button"
              className="contact-hero-cta-text reveal-on-scroll delay-150"
              onClick={scrollToForm}
            >
              {contactTitle}
            </button>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="contact-chat-section" id="contact-form">
        <div className="container">
          <div className="contact-chat-shell reveal-on-scroll">
            <div className="contact-chat-card">
              <div className="contact-chat-agent">
                <div className="contact-chat-avatar contact-chat-logo" aria-label="The Two Planner logo">
                  <LogoSvg size={62} color="var(--accent-primary)" armColor="var(--charcoal)" />
                </div>
                <div>
                  <div className="contact-chat-name brand-preserve-case">The Two Planner</div>
                </div>
              </div>
              <div className="contact-chat-bubble">
                Hello! We are thrilled you're here. Let's design something unforgettable together. Tell us a bit about your dream day?
              </div>
              {!submitted && (
                <div className="contact-choice-grid" aria-label="Choose your event type">
                  {quickChoices.map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      className={`contact-choice-chip${formData.service === choice ? ' is-selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, service: choice }))}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="contact-form-card">
            {submitted ? (
              <div className="contact-chat-success" style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-muted)',
                borderRadius: '6px',
                padding: '60px 40px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
              }}>
                <CheckCircle size={48} strokeWidth={1} style={{ color: 'var(--accent-secondary)' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--charcoal)' }}>
                  {t.successMsgTitle}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--charcoal)', opacity: 0.8, lineHeight: 1.7 }}>
                  {t.successMsgDesc}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {t.successMsgOutro}
                </p>
              </div>
            ) : (
              <form className="contact-chat-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{t.formName} *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.formPartner}</label>
                    <input type="text" name="partnerName" value={formData.partnerName} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{t.formEmail} *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{currentLang === 'en' ? 'phone number' : 'số điện thoại'}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{t.formDate}</label>
                    <input type="text" name="date" placeholder={currentLang === 'en' ? 'e.g. Autumn 2026' : 'Ví dụ: Mùa thu 2026'} value={formData.date} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.formGuests}</label>
                    <input type="text" name="guests" placeholder={currentLang === 'en' ? 'e.g. 100 - 150 guests' : 'Ví dụ: 100 - 150 khách'} value={formData.guests} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{t.formLoc}</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{currentLang === 'en' ? 'estimated budget' : 'ngân sách dự kiến'}</label>
                    <input type="text" name="budget" placeholder={currentLang === 'en' ? 'e.g. flexible / 500M VND' : 'Ví dụ: linh hoạt / 500 triệu'} value={formData.budget} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{currentLang === 'en' ? 'how did you hear about us?' : 'bạn biết đến chúng tôi qua đâu?'}</label>
                  <input type="text" name="hearAbout" value={formData.hearAbout} onChange={handleChange} style={inputStyle}
                    onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                    onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                </div>

                <input type="hidden" name="service" value={formData.service} readOnly />

                <div>
                  <label style={labelStyle}>{t.formStory} *</label>
                  <textarea name="story" required rows={5} value={formData.story} onChange={handleChange}
                    placeholder={currentLang === 'en' ? 'Tell us your idea...' : 'Our wedding will be in...'}
                    style={{
                      ...inputStyle,
                      border: '1px solid var(--border-muted)',
                      padding: '16px',
                      resize: 'vertical',
                      lineHeight: 1.6
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent-secondary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-muted)'} />
                </div>

                {t.formNote && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', margin: '-10px 0 0 0' }}>
                    {t.formNote}
                  </p>
                )}

                {submitError && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--accent-primary)', margin: 0 }}>
                    {currentLang === 'en'
                      ? 'Something went wrong. Please email us at thetwoplanner@gmail.com'
                      : 'Gửi không thành công. Vui lòng gửi email trực tiếp tới thetwoplanner@gmail.com'}
                  </p>
                )}

                <button type="submit" disabled={submitting} style={{ 
                  alignSelf: 'flex-start',
                  backgroundColor: submitting ? 'var(--text-muted)' : 'var(--accent-primary)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 300,
                  padding: '16px 36px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: submitting ? 'wait' : 'pointer',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {submitting
                    ? (currentLang === 'en' ? 'Sending…' : 'Đang gửi…')
                    : t.formSubmit}
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Line — with background image overlay */}
      {closingText && (
        <section style={{
          position: 'relative',
          padding: '140px 0',
          textAlign: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--charcoal)'
        }}>
          {/* Background image container */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("/assets/site-media/home-showcase-portrait-03.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }} aria-hidden="true" />
          
          {/* Dark gradient overlay for text readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(20, 18, 18, 0.55), rgba(20, 18, 18, 0.75))',
            zIndex: 2
          }} />

          <div className="container reveal-on-scroll" style={{ position: 'relative', zIndex: 3, maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
              fontStyle: 'italic',
              color: 'var(--white)',
              lineHeight: 1.5,
              marginBottom: '20px',
              fontWeight: 400,
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.4)'
            }}>
              {closingText}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.75)',
              letterSpacing: '0.12em',
              textTransform: 'none'
            }}>
              {closingSig}
            </p>
          </div>
        </section>
      )}

      {/* Responsive form row styling */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}} />
    </div>
  );
}
