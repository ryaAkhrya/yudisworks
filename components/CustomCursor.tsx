"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use a very tiny duration for buttery smoothness while maintaining click accuracy
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // Negative margins exactly offset the SVG path tip (2,2) to align flawlessly with the true mouse coordinates
      className="fixed top-0 left-0 -ml-[2px] -mt-[2px] pointer-events-none z-[9999]"
      style={{ filter: "drop-shadow(4px 4px 0px rgba(18, 18, 18, 0.5))" }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main Dagger Silhouette */}
        <path 
          id="dagger-main"
          d="M 2 2 L 8 20 L 4 22 L 8 26 L 14 22 L 24 32 L 32 24 L 22 14 L 26 8 L 22 4 L 20 8 Z" 
          fill="#121212" 
          stroke="#F5F5F5" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />
        {/* Inner Blade Line (Fuller) */}
        <path 
          d="M 6 6 L 16 16" 
          stroke="#F5F5F5" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        {/* Handle Wraps (Aesthetic lines) */}
        <path d="M 18 20 L 20 18" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" />
        <path d="M 22 24 L 24 22" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" />
        <path d="M 26 28 L 28 26" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
