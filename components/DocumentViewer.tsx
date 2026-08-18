"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface ProjectItem {
  id: string;
  title: string;
  status: string;
  image_urls: string[];
  is_redacted: boolean;
}

interface DocumentViewerProps {
  item: ProjectItem;
  onClose: () => void;
}

export default function DocumentViewer({ item, onClose }: DocumentViewerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Slam-in animation on mount
    gsap.fromTo(
      docRef.current,
      { scale: 0.6, opacity: 0, skewY: 8 },
      { scale: 1, opacity: 1, skewY: 0, duration: 0.3, ease: "back.out(3)" }
    );
    // Lock scroll
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    // Instant cut on close
    gsap.to(docRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      className="fixed inset-0 z-[200] bg-p5-black/90 flex items-center justify-center p-4 md:p-12 overflow-y-auto"
    >
      <div
        ref={docRef}
        className="relative w-full max-w-3xl bg-p5-paper border-8 border-p5-black shadow-[20px_20px_0px_#CE0000]"
      >
        {/* Document Header */}
        <div className="bg-p5-black px-8 py-6 flex justify-between items-start border-b-8 border-p5-red">
          <div>
            <p className="text-p5-red font-mono text-xs uppercase tracking-widest mb-1">
              CLASSIFIED / PHANTOM THIEVES ARCHIVE
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-p5-paper leading-tight">
              {item.is_redacted ? (
                <span className="bg-p5-red text-p5-red px-2 select-none">
                  {item.title}
                </span>
              ) : (
                item.title
              )}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-p5-paper font-black text-5xl leading-none hover:text-p5-red transition-colors ml-6 mt-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Status stamp */}
        <div className="px-8 pt-6 flex items-center gap-4">
          <div className="border-4 border-p5-red px-4 py-1 -rotate-3 inline-block">
            <p className="font-mono font-black text-p5-red uppercase text-sm tracking-widest">
              STATUS: {item.status}
            </p>
          </div>
        </div>

        {/* Document Pages */}
        <div className="p-8 flex flex-col gap-8">
          {item.image_urls && item.image_urls.length > 0 ? (
            item.image_urls.map((url, i) => (
              <div
                key={i}
                className="relative border-4 border-p5-black shadow-[8px_8px_0px_#121212] overflow-hidden"
              >
                {/* Page number */}
                <div className="absolute top-2 right-2 bg-p5-black text-p5-red font-mono text-xs px-2 py-1 font-bold z-10">
                  PAGE {i + 1}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Document page ${i + 1}`}
                  className="w-full h-auto block"
                />
              </div>
            ))
          ) : (
            <div className="border-4 border-dashed border-p5-black p-12 text-center">
              <p className="font-mono font-black text-p5-black uppercase text-xl">
                [FILE CONTENTS REDACTED]
              </p>
              <p className="font-mono text-p5-black/50 text-sm mt-2">
                — Phantom Thieves Internal Use Only —
              </p>
            </div>
          )}
        </div>

        {/* Document Footer */}
        <div className="bg-p5-black px-8 py-4 flex justify-between items-center border-t-4 border-p5-red">
          <p className="text-p5-red font-mono text-xs uppercase">
            YUDISWORKS.ID / CONFIDENTIAL
          </p>
          <button
            onClick={handleClose}
            className="bg-p5-red text-p5-paper font-black uppercase px-6 py-2 border-4 border-p5-paper hover:bg-p5-paper hover:text-p5-black transition-colors"
          >
            Close File
          </button>
        </div>
      </div>
    </div>
  );
}
