"use client";

import { useEffect, useRef, useState } from "react";

export function ScreenshotCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  const goTo = (i: number) => {
    setIndex(((i % images.length) + images.length) % images.length);
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, 6000);
  };

  return (
    <div
      className="shot-slideshow"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={index} src={images[index]} alt="" className="shot-slide" />

      <button type="button" aria-label="Previous screenshot" className="shot-nav shot-nav-prev" onClick={() => goTo(index - 1)}>
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5" /></svg>
      </button>
      <button type="button" aria-label="Next screenshot" className="shot-nav shot-nav-next" onClick={() => goTo(index + 1)}>
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5" /></svg>
      </button>

      <div className="shot-slideshow-dots">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Go to screenshot ${i + 1}`}
            className={i === index ? "shot-dot shot-dot-active" : "shot-dot"}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
