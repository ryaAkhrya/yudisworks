"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-4 z-50 pointer-events-none">
      <div 
        ref={progressRef}
        className="h-full bg-p5-red w-full origin-left scale-x-0 border-b-4 border-p5-black shadow-[4px_4px_0px_#121212] skew-x-12"
      />
    </div>
  );
}
