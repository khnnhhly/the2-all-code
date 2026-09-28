'use client';
import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import LogoSvg from './LogoSvg';
import { urlFor, getImageUrl } from '../lib/sanity';
import PreFooterCta from './PreFooterCta';
import { getTitleStyle, getBodyStyle } from '../lib/typography';

export default function Contact({ contactData, currentLang, setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '', partnerName: '', email: '', phone: '',
    date: '', location: '', guests: '', budget: '',
    hearAbout: '', service: '', story: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const getLocalizedText = (field, fallbackEn = '', fallbackVi = '') => {
    if (!field) return currentLang === 'en' ? fallbackEn : fallbackVi;
    if (typeof field === 'string') return field;
    if (currentLang === 'en') {
      return field.en || fallbackEn || field.vi || '';
    }
    return field.vi || fallbackVi || field.en || '';
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
  const pageLabel = getLocalizedText(contactData?.heroSection?.title, 'Contact us', 'Liên hệ');
  const contactDesc = getLocalizedText(contactData?.heroSection?.subtitle, 'Every great celebration begins with a conversation.', 'Hãy chia sẻ câu chuyện của bạn cùng The Two Planner.');
  const contactTitle = getLocalizedText(contactData?.heroSection?.tagline, 'the two · for you two', 'the two · for you two');

  const defaultGreetingEn = "Hello! We are thrilled you're here. Let's design something unforgettable together. Tell us a bit about your dream day?";
  const defaultGreetingVi = "Chào bạn! Rất vui được đón tiếp. Hãy cùng nhau thiết kế nên những khoảnh khắc đáng nhớ. Hãy chia sẻ đôi chút về ngày mơ ước của bạn nhé?";
  const chatBubbleText = getLocalizedText(contactData?.formConfig?.formGreetingText || contactData?.formConfig?.formGreetingTitle, defaultGreetingEn, defaultGreetingVi);

  const rawChoices = contactData?.formConfig?.eventTypeOptions?.map(x => getLocalizedText(x)).filter(Boolean);
  const quickChoices = (rawChoices && rawChoices.length > 0) ? rawChoices : (
    currentLang === 'en'
      ? ['A romantic wedding', 'An intimate proposal', 'An anniv/private party', 'Something else!']
      : ['Đám cưới lãng mạn', 'Lời cầu hôn thân mật', 'Kỷ niệm / Tiệc riêng tư', 'Dịch vụ khác']
  );

  const successMsgTitle = currentLang === 'en' ? 'Thank you!' : 'Cảm ơn bạn!';
  const successMsgDesc = getLocalizedText(
    contactData?.formConfig?.responseNotice,
    'We typically respond within 1 to 2 business days.',
    'The Two thường phản hồi trong vòng 1–2 ngày làm việc.'
  );
  const successMsgOutro = '';
  const formNote = '';

  const closingText = getLocalizedText(contactData?.bottomBanner?.headline, "Let's create your happily ever after together!", 'Hãy để chúng tôi đồng hành cùng bạn vẽ nên câu chuyện cổ tích đời thực!');
  const closingSig = getLocalizedText(contactData?.bottomBanner?.subtext, 'the two · for you two', 'the two · for you two');

  const heroBgUrl = getImageUrl(contactData?.heroSection?.heroImage) || '/assets/site-media/home-showcase-portrait-03.webp';
  const closingBgUrl = getImageUrl(contactData?.bottomBanner?.bgImage) || '/assets/site-media/home-showcase-portrait-04.webp';

  // 2. Field Label & Placeholder Translations from Sanity
  const ff = contactData?.formConfig?.formFields;
  const labelName = getLocalizedText(ff?.fullNameLabel, 'your name', 'Tên bạn là');
  const labelPartner = getLocalizedText(ff?.partnerNameLabel, "partner's name", 'Tên của "mảnh ghép còn lại" của bạn');
  const labelEmail = getLocalizedText(ff?.emailLabel, 'email address', 'Địa chỉ email của bạn');
  const labelPhone = getLocalizedText(ff?.phoneLabel, 'phone number', 'Số điện thoại của bạn');
  const labelDate = getLocalizedText(ff?.eventDateLabel, 'wedding date', 'Ngày cưới hoặc ngày tổ chức tiệc (nếu có)');
  const placeholderDate = getLocalizedText(ff?.eventDatePlaceholder, 'eg. Autumn 2027', 'ví dụ: Mùa Thu/ Tháng 9/ 2027');
  const labelGuests = getLocalizedText(ff?.guestCountLabel, 'estimated guest count', 'Số lượng khách dự kiến');
  const placeholderGuests = getLocalizedText(ff?.guestCountPlaceholder, 'eg. 100 - 150 guests', 'ví dụ: 100 - 150 khách');
  const labelLoc = getLocalizedText(ff?.locationLabel, 'wedding location', 'Địa điểm dự kiến');
  const labelBudget = getLocalizedText(ff?.budgetLabel, 'estimated budget', 'Ngân sách dự kiến');
  const placeholderBudget = getLocalizedText(ff?.budgetPlaceholder, 'eg. flexible / 500M VND', 'ví dụ: thoải mái / 500 triệu');
  const labelHear = getLocalizedText(ff?.referralLabel, 'how did you hear about us?', 'Bạn biết The Two qua đâu');
  const labelStory = getLocalizedText(ff?.storyLabel, 'your story (or message for us)', 'Kể The Two nghe câu chuyện của hai bạn: Hai bạn là ai? Và hai bạn muốn mọi người cảm nhận điều gì trong ngày đặc biệt ấy?');
  const placeholderStory = getLocalizedText(ff?.storyPlaceholder, 'Tell us your idea...', 'Kể The Two nghe nhé...');
  const labelSubmit = getLocalizedText(contactData?.formConfig?.submitButtonLabel, 'Send your story', 'Gửi The Two');

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
            <h1 className="contact-hero-label" style={getTitleStyle(contactData?.heroSection?.typography)}>{pageLabel}</h1>
            {contactDesc && (
              <p className="contact-hero-subtext" style={getBodyStyle(contactData?.heroSection?.typography)}>
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
              <div className="contact-chat-bubble" style={getBodyStyle(contactData?.formConfig?.typography)}>
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
                    <input type="text" name="date" placeholder={placeholderDate} value={formData.date} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderBottom = '1px solid var(--accent-secondary)'}
                      onBlur={e => e.target.style.borderBottom = '1px solid var(--border-muted)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{labelGuests}</label>
                    <input type="text" name="guests" placeholder={placeholderGuests} value={formData.guests} onChange={handleChange} style={inputStyle}
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
                    <input type="text" name="budget" placeholder={placeholderBudget} value={formData.budget} onChange={handleChange} style={inputStyle}
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
                    placeholder={placeholderStory}
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

      <PreFooterCta
        data={contactData?.bottomBanner}
        lang={currentLang}
        onCtaClick={setCurrentPage}
      />

      {/* Responsive form row styling */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}} />
    </div>
  );
}
