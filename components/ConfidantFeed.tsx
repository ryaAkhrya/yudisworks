"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface FeedPost {
  id: string;
  created_at: string;
  image_url: string;
  caption: string;
}

interface ConfidantFeedProps {
  posts: FeedPost[];
}

// Alternating tilt angles for the P5 calling-card feel
const CARD_TILTS = [-2.5, 2, -1.5, 3, -2, 1.5, -3, 2.5];

export default function ConfidantFeed({ posts }: ConfidantFeedProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (posts.length === 0) return;

      const mm = gsap.matchMedia();

      // ── Desktop: full tilt pop-in + float + header animations ──
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(".cf-title",
          { x: -120, opacity: 0, skewX: -18 },
          { x: 0, opacity: 1, skewX: 0, duration: 1.0, ease: "expo.out",
            scrollTrigger: { trigger: ".cf-title", start: "top 88%", toggleActions: "play none none none" } }
        );
        gsap.fromTo(".cf-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.out", transformOrigin: "left center",
            scrollTrigger: { trigger: ".cf-line", start: "top 88%", toggleActions: "play none none none" } }
        );
        gsap.fromTo(".cf-sublabel",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.3,
            scrollTrigger: { trigger: ".cf-sublabel", start: "top 90%", toggleActions: "play none none none" } }
        );
        document.querySelectorAll(".confidant-card").forEach((card, i) => {
          const tiltAngle = CARD_TILTS[i % CARD_TILTS.length];
          gsap.fromTo(card,
            { opacity: 0, y: 90, rotate: tiltAngle + (tiltAngle > 0 ? 14 : -14), scale: 0.85 },
            { opacity: 1, y: 0, rotate: tiltAngle, scale: 1, duration: 0.9, ease: "back.out(1.6)",
              scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" } }
          );
          gsap.to(card, {
            y: i % 2 === 0 ? -6 : 6,
            duration: 3.5 + i * 0.4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.2 + i * 0.15,
          });
        });
        gsap.fromTo(".cf-glitch",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: ".cf-glitch", start: "top 85%", toggleActions: "play none none none" } }
        );
      });

      // ── Mobile: simple fade-in only — no tilt physics, no perpetual float ──
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(".cf-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: ".cf-title", start: "top 88%", toggleActions: "play none none none" } }
        );
        gsap.fromTo(".cf-sublabel",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.15,
            scrollTrigger: { trigger: ".cf-sublabel", start: "top 90%", toggleActions: "play none none none" } }
        );
        document.querySelectorAll(".confidant-card").forEach((card, i) => {
          // Keep the resting tilt from the start — only fade in
          const tiltAngle = CARD_TILTS[i % CARD_TILTS.length];
          gsap.set(card, { rotate: tiltAngle });
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" } }
          );
        });
      });

      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef, dependencies: [posts.length] }
  );

  if (posts.length === 0) return null;

  return (
    <section
      id="confidant-network"
      ref={sectionRef}
      className="relative w-full bg-p5-paper py-24 px-6 md:px-16 overflow-hidden"
    >
      {/* ── Background: red grid lines ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(18,18,18,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(18,18,18,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Diagonal speed stripe ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 8px, #121212 8px, #121212 10px)",
        }}
      />

      {/* ── Corner bracket decorations ── */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-4 border-l-4 border-p5-red opacity-60 z-10 pointer-events-none" />
      <div className="absolute top-8 right-8 w-10 h-10 border-t-4 border-r-4 border-p5-red opacity-60 z-10 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-b-4 border-l-4 border-p5-red opacity-60 z-10 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b-4 border-r-4 border-p5-red opacity-60 z-10 pointer-events-none" />

      {/* ── Glitch decoration bars ── */}
      <div className="absolute top-0 left-0 w-full flex flex-col gap-px pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="cf-glitch h-px bg-p5-red"
            style={{ opacity: 0.15 + i * 0.08, transformOrigin: "left center" }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            {/* Pulsing red dot */}
            <div className="relative flex items-center justify-center w-4 h-4 flex-shrink-0">
              <div className="w-3 h-3 bg-p5-red" />
              <div
                className="absolute inset-0 bg-p5-red opacity-50"
                style={{ animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
              />
            </div>
            <p className="cf-sublabel font-mono text-p5-black text-xs uppercase tracking-[0.3em] opacity-0">
              CONFIDANT NETWORK — ACTIVE TRANSMISSIONS
            </p>
          </div>

          <h2 className="cf-title text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-p5-black leading-none opacity-0">
            <span className="inline-block bg-p5-red text-p5-paper px-4 py-2 -skew-x-6 border-4 border-p5-black shadow-[6px_6px_0px_#CE0000]">
              CONFIDANT
            </span>{" "}
            <span className="inline-block text-p5-black">NETWORK</span>
          </h2>

          <div
            className="cf-line mt-6 h-1 bg-p5-red w-full origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* ── Feed Grid: calling-card wall ── */}
        {/* Single column on mobile so cards aren't tiny/oversized; multi-col on larger screens */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-10 md:space-y-8">
          {posts.map((post, i) => {
            const tilt = CARD_TILTS[i % CARD_TILTS.length];
            const isFirst = i === 0;

            return (
              <div
                key={post.id}
                className="confidant-card break-inside-avoid inline-block w-full"
                style={{ transform: `rotate(${tilt}deg)` }}
              >
                {/* Card shell */}
                <div
                  className="relative bg-[#0f0f0f] border-4 border-p5-paper overflow-hidden group"
                  style={{
                    boxShadow: `8px 8px 0px #CE0000, 12px 12px 0px #121212`,
                  }}
                >
                  {/* Transmission number badge */}
                  <div className="absolute top-0 left-0 z-20 bg-p5-red px-3 py-1 font-mono font-black text-p5-paper text-xs tracking-widest border-b-2 border-r-2 border-p5-paper">
                    #{String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Image — relaxed aspect ratio on mobile */}
                  <div className="relative w-full aspect-[4/3] md:aspect-[4/5] overflow-hidden">
                    <Image
                      src={post.image_url}
                      alt={post.caption || `Confidant Network post ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={isFirst}
                    />

                    {/* Scan-line overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 3px, #000 3px, #000 4px)",
                      }}
                    />

                    {/* Hover: red tint flash */}
                    <div className="absolute inset-0 bg-p5-red opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10 pointer-events-none" />
                  </div>

                  {/* Caption area — stamp style */}
                  {post.caption && (
                    <div className="relative bg-p5-black border-t-4 border-p5-paper px-4 py-3">
                      {/* Corner tick */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-t-p5-red border-l-[16px] border-l-transparent" />
                      <p className="font-mono text-p5-paper text-sm leading-snug pr-4">
                        {post.caption}
                      </p>
                      <p className="font-mono text-p5-red/50 text-[10px] mt-2 uppercase tracking-widest">
                        {new Date(post.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  )}

                  {/* Bottom stamp bar */}
                  <div className="bg-p5-red/10 border-t-2 border-p5-red/30 px-4 py-1.5 flex justify-between items-center">
                    <span className="font-mono text-p5-red text-[9px] uppercase tracking-[0.25em]">
                      CLASSIFIED
                    </span>
                    <span className="font-mono text-p5-paper/20 text-[9px] uppercase tracking-widest">
                      PHANTOM THIEVES
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer decoration ── */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-p5-black/20" />
          <p className="font-mono text-p5-black/40 text-xs uppercase tracking-[0.3em]">
            END OF TRANSMISSION
          </p>
          <div className="flex-1 h-px bg-p5-black/20" />
        </div>
      </div>

      {/* ── Keyframes for ping animation (inline style) ── */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
