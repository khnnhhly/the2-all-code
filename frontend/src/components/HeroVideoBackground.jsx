'use client';
import React, { useEffect, useState } from 'react';

// Helper to convert Sanity image asset reference to CDN URL
function getSanityImageUrl(ref) {
  if (!ref) return '';
  // Format: image-[assetId]-[dimensions]-[extension]
  const parts = ref.split('-');
  if (parts.length < 4) return '';
  const assetId = parts[1];
  const dimensions = parts[2];
  const extension = parts[3];
  return `https://cdn.sanity.io/images/quhr7leo/production/${assetId}-${dimensions}.${extension}`;
}

export default function HeroVideoBackground({ colorize = false }) {
  const [ready, setReady] = useState(false);
  const [bgUrl, setBgUrl] = useState('');

  useEffect(() => {
    // Fetch the homepage data from Sanity API
    fetch('https://quhr7leo.api.sanity.io/v2021-10-21/data/query/production?query=*[_id%20==%20%22site.home%22][0]')
      .then((res) => res.json())
      .then((data) => {
        const bgAssetRef = data?.result?.heroSection?.backgroundImage?.asset?._ref;
        if (bgAssetRef) {
          const url = getSanityImageUrl(bgAssetRef);
          setBgUrl(url);
        } else {
          // Fallback if no Sanity image exists
          setBgUrl('https://cdn.sanity.io/images/quhr7leo/production/852f4f61e673cbaf5759790b8fe3157b097147f9-1728x960.gif');
        }
      })
      .catch((err) => {
        console.error('Error fetching hero background from Sanity:', err);
        // Fallback
        setBgUrl('https://cdn.sanity.io/images/quhr7leo/production/852f4f61e673cbaf5759790b8fe3157b097147f9-1728x960.gif');
      });

    const t = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className={`hero-video-bg${colorize ? ' hero-video-bg--color' : ''}${ready ? ' hero-video-bg--ready' : ''}`}
      style={bgUrl ? { backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' } : {}}
      aria-hidden="true"
    />
  );
}
