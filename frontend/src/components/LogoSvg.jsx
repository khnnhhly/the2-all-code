'use client';
import React from 'react';

export default function LogoSvg({ size = 80, src, alt = "The Two Planner logo", style = {} }) {
  const logoSrc = src || '/logo-brand.png';

  return (
    <span
      role="img"
      aria-label={alt}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size * 0.75}px`,
        position: 'relative',
        ...style
      }}
    >
      <img
        src={logoSrc}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </span>
  );
}
