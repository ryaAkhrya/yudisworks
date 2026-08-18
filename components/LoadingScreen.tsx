"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTopRef = useRef<HTMLDivElement>(null);
  const bgBottomRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true)
    });

    // 1. Text jitters and scales slightly
    tl.to(textRef.current, {
      scale: 1.05,
      duration: 1.2,
      ease: "power2.inOut",
    });

    // 2. Banner snaps and slices away diagonally
    tl.to(bannerRef.current, {
      y: "-150%",
      skewY: -20,
      duration: 0.6,
      ease: "power4.in",
    }, "+=0.2");

    // 3. Red background splits in half and slides out (cinematic slice)
    tl.to(bgTopRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "expo.inOut",
    }, "-=0.3");
    
    tl.to(bgBottomRef.current, {
      yPercent: 100,
      duration: 0.8,
      ease: "expo.inOut",
    }, "<");

  }, { scope: containerRef });

  if (isLoaded) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Background halves for slice transition */}
      <div ref={bgTopRef} className="absolute top-0 left-0 w-full h-[55vh] bg-p5-red origin-top -skew-y-3 scale-110" />
      <div ref={bgBottomRef} className="absolute bottom-0 left-0 w-full h-[55vh] bg-p5-red origin-bottom -skew-y-3 scale-110" />

      {/* Jagged black banner */}
      <div 
        ref={bannerRef}
        className="relative w-[120vw] h-[40vh] md:h-[50vh] bg-p5-black -skew-y-6 md:-skew-y-12 shadow-[20px_20px_0px_#F5F5F5] border-8 border-p5-paper flex items-center justify-center z-10"
      >
        <h1 ref={textRef} className="text-5xl md:text-8xl font-black uppercase text-p5-red tracking-widest px-8 py-4 border-4 border-p5-red bg-p5-black shadow-[8px_8px_0px_#CE0000]">
          Take Your Time
        </h1>
      </div>
    </div>
  );
}
