'use client';
import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';

/**
 * Google Drive accepts several link shapes for the same file, but only
 * /preview renders inside an iframe. Editors paste whichever URL the Drive UI
 * gave them, so normalise before embedding.
 */
export function toDrivePreviewUrl(raw) {
  if (!raw || typeof raw !== 'string') return '';
  let url = raw.trim();

  // The field may hold a whole <iframe …> snippet rather than a bare URL.
  if (url.includes('<iframe')) {
    const match = url.match(/src=["']([^"']+)["']/i);
    url = match ? match[1] : '';
  }
  if (!url) return '';
  if (!url.includes('drive.google.com')) return url;

  const id =
    url.match(/\/file\/d\/([^/?#]+)/)?.[1] ||
    url.match(/[?&]id=([^&#]+)/)?.[1];

  return id ? `https://drive.google.com/file/d/${id}/preview` : url;
}

export default function DriveVideoEmbed({ driveUrl, bgImage, coverImage, isFullScreen = false, playLabel = 'Play video' }) {
  const [playing, setPlaying] = useState(false);
  const src = toDrivePreviewUrl(driveUrl);
  if (!src) return null;

  // The iframe is mounted only after a click: it keeps a third-party frame off
  // the critical path, and a private Drive file shows the cover rather than a
  // Google sign-in box.
  const poster = coverImage || bgImage;

  return (
    <div className={`drive-video-section${isFullScreen ? ' drive-video-section--fullscreen' : ''}`}>
      {bgImage && (
        <div className="drive-video-section-bg" aria-hidden="true">
          <OptimizedImage
            src={bgImage}
            alt=""
            maxWidth={1200}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
          />
        </div>
      )}
      <div className="drive-video-frame">
        {playing ? (
          <iframe
            src={`${src}?autoplay=1`}
            title="Couples video"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="drive-video-poster"
            onClick={() => setPlaying(true)}
            aria-label={playLabel}
          >
            {poster && (
              <OptimizedImage
                src={poster}
                alt=""
                maxWidth={1600}
                priority
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <span className="drive-video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
