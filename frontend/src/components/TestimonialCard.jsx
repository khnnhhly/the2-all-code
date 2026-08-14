import React, { useState } from 'react';

export default function TestimonialCard({ author, event, teaser, full, readMoreLabel, readLessLabel }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = (full || '').split('\n').filter(Boolean);

  return (
    <div className="bento-card" style={{
      backgroundColor: 'var(--white)',
      padding: '32px',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%'
    }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.92rem',
        fontStyle: 'italic',
        color: 'var(--charcoal)',
        opacity: 0.85,
        lineHeight: 1.65,
        margin: 0
      }}>
        "{expanded ? paragraphs[0] : teaser}"
      </p>
      {expanded && paragraphs.slice(1).map((p, i) => (
        <p key={i} style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.92rem',
          color: 'var(--charcoal)',
          opacity: 0.85,
          lineHeight: 1.65,
          margin: 0
        }}>
          {p}
        </p>
      ))}
      {full && full.length > (teaser?.length || 0) + 20 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-link"
          style={{
            alignSelf: 'flex-start',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            fontWeight: 300,
            color: 'var(--accent-secondary)'
          }}
        >
          {expanded ? readLessLabel : readMoreLabel}
        </button>
      )}
      <div style={{ borderTop: '1px solid var(--border-muted)', paddingTop: '12px', marginTop: 'auto' }}>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent-primary)', margin: 0, fontWeight: 300 }}>
          {author}
        </h4>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {event}
        </span>
      </div>
    </div>
  );
}
