import React, { useState } from 'react';

const VIDEO_ID = 'az1eBpmYOpE';
const POSTER_PRIMARY = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const POSTER_FALLBACK = `https://i.ytimg.com/vi/${VIDEO_ID}/sddefault.jpg`;

export default function VideoEmbed() {
  const [playing, setPlaying] = useState(false);
  const [posterSrc, setPosterSrc] = useState(POSTER_PRIMARY);

  if (playing) {
    return (
      <div className="video-responsive video-embed-clean">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&modestbranding=1&rel=0&controls=1&iv_load_policy=3`}
          title="Wedding thank you"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="video-responsive video-embed-clean">
      <button
        type="button"
        className="video-poster"
        onClick={() => setPlaying(true)}
        aria-label="Play video"
      >
        <img
          src={posterSrc}
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          width={1280}
          height={720}
          className="video-poster-img"
          onError={() => {
            if (posterSrc !== POSTER_FALLBACK) setPosterSrc(POSTER_FALLBACK);
          }}
        />
      </button>
      <button
        type="button"
        className="video-play-btn"
        onClick={() => setPlaying(true)}
        aria-label="Play video"
      />
    </div>
  );
}
