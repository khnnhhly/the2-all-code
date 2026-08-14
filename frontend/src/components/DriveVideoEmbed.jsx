import React from 'react';
import OptimizedImage from './OptimizedImage';

export default function DriveVideoEmbed({ driveUrl, bgImage, isFullScreen = false }) {
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
        <iframe
          src={driveUrl}
          title="Couples video"
          loading="lazy"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
