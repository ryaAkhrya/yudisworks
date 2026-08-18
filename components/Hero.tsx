"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgRedRef = useRef<HTMLDivElement>(null);
  const bgBlackRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    // Initial aggressive load animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Whip in backgrounds
    tl.fromTo(bgRedRef.current, { x: 500, scaleX: 0 }, { x: 0, scaleX: 1, duration: 0.6, ease: "expo.out" }, 0);
    tl.fromTo(bgBlackRef.current, { x: -500, scaleX: 0 }, { x: 0, scaleX: 1, duration: 0.6, ease: "expo.out" }, 0.1);

    // Headline slam in
    tl.fromTo(headlineRef.current?.children as HTMLCollection, 
      { y: 100, opacity: 0, skewY: 10, scale: 0.8 }, 
      { y: 0, opacity: 1, skewY: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, 
      0.3
    );

    // Text block slice in
    tl.fromTo(textBlockRef.current,
      { x: -100, opacity: 0, skewX: -20 },
      { x: 0, opacity: 1, skewX: 0, duration: 0.5 },
      0.5
    );

    // CTA pop in
    tl.fromTo(ctaRef.current,
      { y: 50, opacity: 0, scale: 0.5 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)" },
      0.7
    );

  }, { scope: heroRef });

  // Hover jitter effect
  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: "random(-4, 4)",
      y: "random(-4, 4)",
      duration: 0.1,
      yoyo: true,
      repeat: 3,
    });
  };

  return (
    <section ref={heroRef} className="relative w-full min-h-[80vh] flex flex-col justify-center items-start px-6 md:px-16 overflow-hidden">
      {/* Background chaotic elements */}
      <div ref={bgRedRef} className="absolute top-10 right-10 md:top-20 md:right-32 w-64 h-24 bg-p5-red skew-p5 z-0 origin-right" />
      <div ref={bgBlackRef} className="absolute top-40 right-4 md:right-16 w-32 h-16 bg-p5-black skew-p5 z-0 opacity-20 origin-left" />

      <div className="relative z-10 max-w-4xl">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-p5-black skew-p5 mb-6 leading-none">
          <span className="bg-p5-red text-p5-paper px-4 py-2 inline-block transform -skew-x-12 shadow-[8px_8px_0px_#121212] border-4 border-p5-black">
            I&apos;LL STEAL
          </span>
          <br />
          <span className="inline-block mt-4 bg-p5-paper text-p5-black px-4 py-2 transform skew-x-6 shadow-[8px_8px_0px_#121212] border-4 border-p5-black">
            YOUR DEADLINES
          </span>
        </h1>

        <div ref={textBlockRef} className="bg-p5-black text-p5-paper p-6 max-w-xl skew-p5 border-4 border-p5-red shadow-[12px_12px_0px_#CE0000] mt-10">
          <p className="text-xl md:text-2xl font-bold italic">
            &quot;Gua ngerjain apa yang lu males kerjain. Dari tugas kuliah, makalah, PPT estetik, sampai bikin website dari nol. Lu duduk manis, kerjaan beres.&quot;
          </p>
        </div>

        <div className="mt-12 flex justify-start">
          <a
            ref={ctaRef}
            href="https://wa.me/1234567890" // Placeholder WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleHover}
            className="inline-block bg-p5-red text-p5-paper text-2xl font-black uppercase px-8 py-4 skew-p5 border-4 border-p5-black shadow-[8px_8px_0px_#121212] hover:bg-p5-black hover:text-p5-red hover:border-p5-red hover:-translate-y-1 hover:translate-x-1 hover:shadow-[12px_12px_0px_#CE0000] transition-colors duration-0"
          >
            Drop Your Request
          </a>
        </div>
      </div>
    </section>
  );
}
