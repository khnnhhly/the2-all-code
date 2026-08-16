'use client';
import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import LogoSvg from './LogoSvg';
import { urlFor } from '../lib/sanity';

export default function Contact({ contactData, currentLang }) {
  const [formData, setFormData] = useState({
    name: '', partnerName: '', email: '', phone: '',
    date: '', location: '', guests: '', budget: '',
    hearAbout: '', service: '', story: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const getLocalizedText = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || field.vi || '';
  };

  if (!contactData) {
    return (
      <div style={{ padding: '160px 0', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <p>{currentLang === 'vi' ? 'Đang tải dữ liệu...' : 'Loading content...'}</p>
      </div>
    );
  }

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

  // 1. Text variables
  const pageLabel = getLocalizedText(contactData?.heroSection?.headline) || (currentLang === 'en' ? 'Contact us' : 'Liên hệ');
  const contactDesc = getLocalizedText(contactData?.heroSection?.subheading) || '';
  const contactTitle = getLocalizedText(contactData?.heroSection?.description) || '';

  const chatBubbleText = getLocalizedText(contactData?.formSection?.mainBubbleText) || "Hello! We are thrilled you're here. Let's design something unforgettable together. Tell us a bit about your dream day?";
  const quickChoices = contactData?.formSection?.quickChoices?.map(x => getLocalizedText(x)) || [
    'A romantic wedding',
    'An intimate proposal',
    'An anniv/private party',
    'Something else!'
  ];

  const successMsgTitle = getLocalizedText(contactData?.formSection?.successMessageTitle) || (currentLang === 'en' ? 'Thank you!' : 'Cảm ơn bạn!');
  const successMsgDesc = getLocalizedText(contactData?.formSection?.successMessageDescription) || '';
  const successMsgOutro = getLocalizedText(contactData?.formSection?.successMessageOutro) || '';
  const formNote = getLocalizedText(contactData?.formSection?.notes) || '';

  const closingText = getLocalizedText(contactData?.preFooterCtaSection?.headline);
  const closingSig = getLocalizedText(contactData?.preFooterCtaSection?.subheading) || 'the two · for you two';

  let heroBgUrl = '/assets/site-media/home-showcase-portrait-03.webp';
  if (contactData?.heroSection?.backgroundImage) {
    try {
      heroBgUrl = urlFor(contactData.heroSection.backgroundImage).url() || heroBgUrl;
    } catch (e) {}
  }

  let closingBgUrl = '/assets/site-media/home-showcase-portrait-03.webp';
  if (contactData?.preFooterCtaSection?.backgroundImage) {
    try {
      closingBgUrl = urlFor(contactData.preFooterCtaSection.backgroundImage).url() || closingBgUrl;
    } catch (e) {}
  }

  // 2. Field Label Translations
  const labelName = currentLang === 'en' ? 'your name' : 'tên của bạn';
  const labelPartner = currentLang === 'en' ? "partner's name" : 'tên của bạn đời';
  const labelEmail = currentLang === 'en' ? 'email address' : 'địa chỉ email';
  const labelPhone = currentLang === 'en' ? 'phone number' : 'số điện thoại';
  const labelDate = currentLang === 'en' ? 'wedding date' : 'ngày cưới';
  const labelGuests = currentLang === 'en' ? 'estimated guest count' : 'số lượng khách dự kiến';
  const labelLoc = currentLang === 'en' ? 'wedding location' : 'địa điểm tổ chức';
  const labelBudget = currentLang === 'en' ? 'estimated budget' : 'ngân sách dự kiến';
  const labelHear = currentLang === 'en' ? 'how did you hear about us?' : 'bạn biết đến chúng tôi qua đâu?';
  const labelStory = currentLang === 'en' ? 'your story (or message for us)' : 'câu chuyện của bạn (hoặc lời nhắn gửi)';
  const labelSubmit = currentLang === 'en' ? 'Send request' : 'Gửi yêu cầu';

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id="contact">
      {/* Contact Hero */}
      <section 
        className="contact-cinematic-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 20, 20, 0.4), rgba(20, 20, 20, 0.5)), url(${heroBgUrl})`,
        }}
      >
        <div className="contact-cinematic-grain" aria-hidden="true" />
        <div className="container contact-cinematic-content">
          <div className="contact-hero-copy reveal-on-scroll">
            <h1 className="contact-hero-label">{pageLabel}</h1>
            {contactDesc && (
              <p className="contact-hero-subtext">
                {contactDesc}
              </p>
            )}
            {contactTitle && (
              <button
                type="button"
                className="contact-hero-cta-text reveal-on-scroll delay-150"
                onClick={scrollToForm}
              >
                {contactTitle}
              </button>
            )}
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
                {chatBubbleText}
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
                  {successMsgTitle}
                </h3>
                {successMsgDesc && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--charcoal)', opacity: 0.8, lineHeight: 1.7 }}>
                    {successMsgDesc}
                  </p>
                )}
                {successMsgOutro && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {successMsgOutro}
                  </p>
                )}
              </div>
            ) : (
              <form className="contact-chat-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{labelName} *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{labelPartner}</label>
                    <input type="text" name="partnerName" value={formData.partnerName} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{labelEmail} *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{labelPhone}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{labelDate}</label>
                    <input type="text" name="date" placeholder={currentLang === 'en' ? 'e.g. Autumn 2026' : 'Ví dụ: Mùa thu 2026'} value={formData.date} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{labelGuests}</label>
                    <input type="text" name="guests" placeholder={currentLang === 'en' ? 'e.g. 100 - 150 guests' : 'Ví dụ: 100 - 150 khách'} value={formData.guests} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{labelLoc}</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{labelBudget}</label>
                    <input type="text" name="budget" placeholder={currentLang === 'en' ? 'e.g. flexible / 500M VND' : 'Ví dụ: linh hoạt / 500 triệu'} value={formData.budget} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{labelHear}</label>
                  <input type="text" name="hearAbout" value={formData.hearAbout} onChange={handleChange} style={inputStyle}
                    onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                    onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                </div>

                <input type="hidden" name="service" value={formData.service} readOnly />

                <div>
                  <label style={labelStyle}>{labelStory} *</label>
                  <textarea name="story" required rows={5} value={formData.story} onChange={handleChange}
                    placeholder={currentLang === 'en' ? 'Tell us your idea...' : 'Lễ cưới của chúng mình dự kiến sẽ diễn ra tại...'}
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

                {formNote && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', margin: '-10px 0 0 0' }}>
                    {formNote}
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
                    : labelSubmit}
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
            backgroundImage: `url(${closingBgUrl})`,
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
