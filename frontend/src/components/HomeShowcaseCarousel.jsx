'use client';
import { useRef, useState } from 'react';
import OptimizedImage from './OptimizedImage';

export default function HomeShowcaseCarousel({ onViewAll, hint, images }) {
  const showcaseImages = images || [];
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const dragDistance = useRef(0);
  const inertiaFrame = useRef(null);
  const wheelFrame = useRef(null);
  const pendingWheel = useRef(0);

  const stopInertia = () => {
    if (inertiaFrame.current) {
      cancelAnimationFrame(inertiaFrame.current);
      inertiaFrame.current = null;
    }
  };

  const runInertia = () => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollLeft += velocity.current;
    velocity.current *= 0.92;

    if (Math.abs(velocity.current) > 0.35) {
      inertiaFrame.current = requestAnimationFrame(runInertia);
    } else {
      inertiaFrame.current = null;
    }
  };

  const handleMouseDown = (e) => {
    const track = trackRef.current;
    if (!track) return;

    stopInertia();
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX - track.offsetLeft;
    lastX.current = e.pageX;
    velocity.current = 0;
    dragDistance.current = 0;
    scrollLeft.current = track.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const track = trackRef.current;
    if (!isDragging.current || !track) return;

    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX.current) * 1.45;
    dragDistance.current = Math.max(dragDistance.current, Math.abs(walk));
    track.scrollLeft = scrollLeft.current - walk;
    velocity.current = (lastX.current - e.pageX) * 1.25;
    lastX.current = e.pageX;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    runInertia();
  };

  const handleTouchStart = (e) => {
    const track = trackRef.current;
    if (!track) return;

    stopInertia();
    isDragging.current = true;
    setDragging(true);
    startX.current = e.touches[0].pageX - track.offsetLeft;
    lastX.current = e.touches[0].pageX;
    velocity.current = 0;
    dragDistance.current = 0;
    scrollLeft.current = track.scrollLeft;
  };

  const handleTouchMove = (e) => {
    const track = trackRef.current;
    if (!isDragging.current || !track) return;

    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX.current) * 1.45;
    dragDistance.current = Math.max(dragDistance.current, Math.abs(walk));
    track.scrollLeft = scrollLeft.current - walk;
    velocity.current = (lastX.current - e.touches[0].pageX) * 1.25;
    lastX.current = e.touches[0].pageX;
  };

  const handleWheel = (e) => {
    const track = trackRef.current;
    if (!track) return;

    e.preventDefault();
    stopInertia();
    pendingWheel.current += Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? -e.deltaY : e.deltaX;

    if (wheelFrame.current) return;
    wheelFrame.current = requestAnimationFrame(() => {
      const delta = pendingWheel.current;
      pendingWheel.current = 0;
      wheelFrame.current = null;
      track.scrollLeft += delta;
      velocity.current = delta * 0.18;
      runInertia();
    });
  };

  return (
    <div className="home-showcase-carousel-wrap">
      <p className="home-showcase-carousel-hint">
        {hint || 'scroll, drag, or hover to explore'}
      </p>
      <div
        className="home-showcase-carousel"
        ref={trackRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
        style={{
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
      >
        {showcaseImages.map((src, i) => (
          <button
            key={src}
            type="button"
            className="home-showcase-carousel-slide parallax-slide"
            onClick={() => {
              if (dragDistance.current > 12) return;
              onViewAll();
            }}
            aria-label={`View work ${i + 1}`}
          >
            <div className="parallax-media">
              <OptimizedImage
                src={src}
                alt=""
                maxWidth={1800}
                priority={false}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 58vw, 560px"
                className="parallax-image"
                width={720}
                height={960}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
