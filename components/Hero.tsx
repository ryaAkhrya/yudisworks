"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface HeroProps {
  headlineLine1: string;
  headlineLine2: string;
  bio: string;
  photoUrl: string | null;
  whatsappNumber: string;
}

export default function Hero({ headlineLine1, headlineLine2, bio, photoUrl, whatsappNumber }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgRedRef = useRef<HTMLDivElement>(null);
  const bgBlackRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // Floating kinetic background elements
  const float1Ref = useRef<HTMLDivElement>(null);
  const float2Ref = useRef<HTMLDivElement>(null);
  const float3Ref = useRef<HTMLDivElement>(null);
  const float4Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ─── Entrance timeline (Slower, Cinematic) ───
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(bgRedRef.current, { x: 500, scaleX: 0 }, { x: 0, scaleX: 1, duration: 1.2, ease: "expo.out" }, 0);
    tl.fromTo(bgBlackRef.current, { x: -500, scaleX: 0 }, { x: 0, scaleX: 1, duration: 1.2, ease: "expo.out" }, 0.2);

    tl.fromTo(
      headlineRef.current?.children as HTMLCollection,
      { y: 150, opacity: 0, skewY: 15, scale: 0.9 },
      { y: 0, opacity: 1, skewY: 0, scale: 1, duration: 1.0, stagger: 0.2, ease: "power4.out" },
      0.4
    );

    tl.fromTo(textBlockRef.current,
      { x: -150, opacity: 0, skewX: -20 },
      { x: 0, opacity: 1, skewX: 0, duration: 1.2, ease: "power3.out" },
      0.8
    );

    tl.fromTo(ctaRef.current,
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2)" },
      1.1
    );

    if (photoRef.current) {
      tl.fromTo(photoRef.current,
        { x: 150, opacity: 0, scale: 0.9, skewX: 10 },
        { x: 0, opacity: 1, scale: 1, skewX: 0, duration: 1.4, ease: "expo.out" },
        0.5
      );
    }

    // ─── Subtle Drifting / Breathing for Main Content ───
    gsap.to(headlineRef.current, { y: -15, duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.5 });
    gsap.to(textBlockRef.current, { y: -10, duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.0 });
    gsap.to(ctaRef.current, { y: -8, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.5 });
    if (photoRef.current) {
      gsap.to(photoRef.current, { y: -12, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.8 });
    }

    // ─── Kinetic floating background elements (Slower Drift) ───
    gsap.to(float1Ref.current, {
      y: -28, x: 12, rotate: 8,
      duration: 6.2, ease: "sine.inOut", repeat: -1, yoyo: true,
    });
    gsap.to(float2Ref.current, {
      y: 20, x: -18, rotate: -6,
      duration: 5.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.0,
    });
    gsap.to(float3Ref.current, {
      y: -16, x: 8, rotate: 12,
      duration: 7.1, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.2,
    });
    gsap.to(float4Ref.current, {
      y: 24, x: -10, rotate: -10,
      duration: 6.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.3,
    });

  }, { scope: heroRef });

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: "random(-4, 4)",
      y: "random(-4, 4)",
      duration: 0.1,
      yoyo: true,
      repeat: 3,
    });
  };

  const waLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  return (
    <section id="hero" ref={heroRef} className="relative w-full min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-16 overflow-hidden bg-p5-paper">

      {/* ── Kinetic Background Geometry ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Halftone / Grid Pattern overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-multiply" style={{
          backgroundImage: 'radial-gradient(#121212 2px, transparent 2px)',
          backgroundSize: '16px 16px'
        }} />
        
        {/* Diagonal Comic Speed Lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #121212 10px, #121212 12px)'
        }} />

        {/* Giant Marquee Typography */}
        <div className="absolute top-[20%] left-0 w-max -skew-y-6 opacity-[0.03] flex animate-marquee z-0">
          <span className="text-[12rem] md:text-[20rem] font-black uppercase text-p5-black tracking-tighter leading-none pr-16">
            I'LL STEAL YOUR DEADLINES — I'LL STEAL YOUR DEADLINES
          </span>
          <span className="text-[12rem] md:text-[20rem] font-black uppercase text-p5-black tracking-tighter leading-none pr-16">
            I'LL STEAL YOUR DEADLINES — I'LL STEAL YOUR DEADLINES
          </span>
        </div>

        {/* Slash stripe */}
        <div className="absolute top-0 right-0 w-[55%] h-full bg-p5-black/5 -skew-x-12 origin-top-right z-0" />

        {/* Floating block 1 — big red */}
        <div ref={float1Ref} className="absolute top-16 right-[38%] w-48 h-16 bg-p5-red skew-p5 opacity-90 border-4 border-p5-black shadow-[6px_6px_0px_#121212]" />

        {/* Floating block 2 — black */}
        <div ref={float2Ref} className="absolute bottom-24 right-[28%] w-28 h-10 bg-p5-black skew-p5 opacity-30" />

        {/* Floating block 3 — paper border only */}
        <div ref={float3Ref} className="absolute top-1/2 right-[15%] w-20 h-20 border-8 border-p5-red skew-p5 opacity-40" />

        {/* Floating block 4 — tiny red dot / square */}
        <div ref={float4Ref} className="absolute top-32 right-[22%] w-10 h-10 bg-p5-red opacity-70 skew-p5" />
      </div>

      {/* ── Static bg accent shapes (entrance animated) ── */}
      <div ref={bgRedRef} className="absolute top-10 right-10 md:top-20 md:right-64 w-64 h-24 bg-p5-red skew-p5 z-0 origin-right opacity-0 border-4 border-p5-black shadow-[8px_8px_0px_#121212]" />
      <div ref={bgBlackRef} className="absolute top-40 right-4 md:right-40 w-32 h-16 bg-p5-black skew-p5 z-0 opacity-0 origin-left" />

      {/* ── Main content grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

        {/* Left: Text */}
        <div className="flex-1 w-full lg:max-w-3xl flex flex-col justify-center">
          <h1
            ref={headlineRef}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-p5-black skew-p5 mb-6 leading-none"
          >
            <span className="bg-p5-red text-p5-paper px-4 py-2 inline-block transform -skew-x-12 shadow-[8px_8px_0px_#121212] border-4 border-p5-black">
              {headlineLine1}
            </span>
            <br />
            <span className="inline-block mt-4 bg-p5-paper text-p5-black px-4 py-2 transform skew-x-6 shadow-[8px_8px_0px_#121212] border-4 border-p5-black">
              {headlineLine2}
            </span>
          </h1>

          <div ref={textBlockRef} className="bg-p5-black text-p5-paper p-6 max-w-xl skew-p5 border-4 border-p5-red shadow-[12px_12px_0px_#CE0000] mt-10">
            <p className="text-xl md:text-2xl font-bold italic">
              &quot;{bio}&quot;
            </p>
          </div>

          <div className="mt-12 flex justify-start">
            <a
              ref={ctaRef}
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleHover}
              className="inline-block bg-p5-red text-p5-paper text-2xl font-black uppercase px-8 py-4 skew-p5 border-4 border-p5-black shadow-[8px_8px_0px_#121212] hover:bg-p5-black hover:text-p5-red hover:border-p5-red hover:-translate-y-1 hover:translate-x-1 hover:shadow-[12px_12px_0px_#CE0000] transition-colors duration-0"
            >
              Drop Your Request
            </a>
          </div>
        </div>

        {/* Right: Profile Photo or geometric placeholder */}
        <div ref={photoRef} className="flex-shrink-0 relative w-full md:w-auto flex justify-center md:justify-end">
          {photoUrl ? (
            <div className="relative border-8 border-p5-black shadow-[16px_16px_0px_#CE0000] -skew-y-3 overflow-hidden w-72 h-[28rem] md:w-[24rem] md:h-[34rem] lg:w-[28rem] lg:h-[38rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt="Profile"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay stamp */}
              <div className="absolute bottom-0 left-0 right-0 bg-p5-black/80 px-3 py-2">
                <p className="font-mono font-black text-p5-red uppercase text-xs tracking-widest">
                  PHANTOM FREELANCER
                </p>
              </div>
            </div>
          ) : (
            // Geometric placeholder if no photo
            <div className="relative w-72 h-[28rem] md:w-[24rem] md:h-[34rem] lg:w-[28rem] lg:h-[38rem]">
              <div className="absolute inset-0 bg-p5-black border-8 border-p5-red shadow-[16px_16px_0px_#CE0000] -skew-y-3" />
              <div className="absolute top-8 left-8 right-8 h-1/2 bg-p5-red/20 border-4 border-p5-red skew-y-6" />
              <div className="absolute bottom-8 left-8 right-8 h-1/4 bg-p5-paper/10 border-4 border-p5-paper/30 -skew-y-3" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-mono font-black text-p5-red uppercase text-sm tracking-widest -rotate-6 border-4 border-p5-red px-4 py-2 bg-p5-black">
                  [IDENTITY<br/>REDACTED]
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
