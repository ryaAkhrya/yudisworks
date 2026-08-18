"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Infinite scrolling marquee
    const tl = gsap.timeline({ repeat: -1 });
    
    // We move the texts linearly to create a seamless loop
    tl.to([textRef1.current, textRef2.current], {
      xPercent: -100,
      ease: "none",
      duration: 10,
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 flex items-center z-0"
    >
      {/* We use two text blocks for seamless looping */}
      <div className="flex whitespace-nowrap -skew-x-12 -skew-y-3 transform origin-left">
        <div ref={textRef1} className="text-[12rem] font-black uppercase text-p5-paper pr-8 flex-shrink-0">
          {"/// THE ARSENAL /// WHAT I DO /// THE ARSENAL /// WHAT I DO ///"}
        </div>
        <div ref={textRef2} className="text-[12rem] font-black uppercase text-p5-paper pr-8 flex-shrink-0">
          {"/// THE ARSENAL /// WHAT I DO /// THE ARSENAL /// WHAT I DO ///"}
        </div>
      </div>
    </div>
  );
}
