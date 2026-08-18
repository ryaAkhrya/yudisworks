"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useGSAP(() => {
    // Sharp instant cut after a short delay mimicking load
    gsap.to(containerRef.current, {
      opacity: 0,
      delay: 0.8,
      duration: 0, // Instant cut
      onComplete: () => setIsLoaded(true)
    });
  }, { scope: containerRef });

  if (isLoaded) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-p5-red overflow-hidden pointer-events-none"
    >
      {/* Jagged black shape */}
      <div className="absolute w-[120vw] h-[50vh] bg-p5-black -skew-y-12 shadow-[20px_20px_0px_#F5F5F5] border-8 border-p5-paper flex items-center justify-center">
        <h1 className="text-6xl md:text-9xl font-black uppercase text-p5-paper tracking-tighter animate-pulse">
          Take Your Time
        </h1>
      </div>
    </div>
  );
}
