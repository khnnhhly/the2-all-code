'use client';
export function imageDisplayUrl(src, maxWidth = 800) {
  if (!src || typeof src !== 'string') return src;
  return src;
}

function imageSrcSet(src, widths = [480, 800, 1200, 1600, 2000]) {
  if (!src || typeof src !== 'string' || !src.includes('i.ibb.co')) return undefined;
  if (src.includes('i.ibb.co')) return undefined;
  const base = src.split('?')[0];
  const ext = base.split('.').pop()?.toLowerCase();
  if (ext === 'png' || ext === 'gif') return undefined;
  return widths.map((width) => `${base}?width=${width} ${width}w`).join(', ');
}

export function preloadImages(sources, maxWidth = 320) {
  if (!sources?.length || typeof window === 'undefined') return;
  sources.forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = imageDisplayUrl(src, maxWidth);
  });
}

export function preloadAllShowcaseGalleries(galleries, maxWidth = 320) {
  if (!galleries || typeof window === 'undefined') return;
  const urls = new Set();
  Object.values(galleries).forEach((items) => {
    items?.forEach((src) => urls.add(src));
  });
  preloadImages([...urls], maxWidth);
}

export default function OptimizedImage({
  src,
  alt = '',
  className,
  style,
  priority = false,
  maxWidth = 800,
  sizes,
  ...rest
}) {
  if (!src) return null;

  const displaySrc = imageDisplayUrl(src, maxWidth);
  const resolvedSizes = sizes || `(max-width: 768px) ${Math.min(maxWidth, 480)}px, ${maxWidth}px`;
  const resolvedSrcSet = imageSrcSet(src);
  return (
    <img
      src={displaySrc}
      srcSet={resolvedSrcSet}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={resolvedSizes}
      onError={(event) => {
        const image = event.currentTarget;
        image.removeAttribute('srcset');
        if (image.dataset.fallbackApplied) return;
        image.dataset.fallbackApplied = 'true';
        image.src = '/assets/site-media/home-showcase-portrait-01.webp';
      }}
      {...rest}
    />
  );
}
