import React, { useEffect, useState } from 'react';

export default function HeroVideoBackground({ colorize = false }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className={`hero-video-bg${colorize ? ' hero-video-bg--color' : ''}${ready ? ' hero-video-bg--ready' : ''}`}
      aria-hidden="true"
>
      <iframe
        src="https://drive.google.com/file/d/1h1fpn0Lm3jehaES2af1jD6qkRnlidZt5/preview?autoplay=1&mute=1"
        title="The Two Planner hero video"
        allow="autoplay; encrypted-media; picture-in-picture"
        aria-hidden="true"
        tabIndex="-1"
      />
    </div>
  );
}
