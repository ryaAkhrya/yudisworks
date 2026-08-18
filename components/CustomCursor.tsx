"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickTo for buttery smooth performance without React state overhead
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });
    const xToDot = gsap.quickTo(dot, "x", { duration: 0, ease: "none" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0, ease: "none" });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.set([cursor, dot], { opacity: 1 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to([cursor, dot], { opacity: 0, duration: 0.2 });
      isVisible = false;
    };

    // Hover effect logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        gsap.to(cursor, {
          scale: 1.5,
          backgroundColor: "#CE0000",
          borderColor: "#121212",
          rotation: 45,
          duration: 0.3,
          ease: "back.out(2)"
        });
        gsap.to(dot, {
          scale: 0,
          duration: 0.2
        });
      }
    };

    const handleMouseOut = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "#CE0000",
        rotation: -12,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "back.out(2)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main trailing cursor box */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border-4 border-p5-red skew-p5 shadow-[4px_4px_0px_#121212] pointer-events-none z-[9999] mix-blend-difference opacity-0 transform -rotate-12"
      />
      {/* Tiny sharp dot strictly following the pointer */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-p5-red pointer-events-none z-[10000] opacity-0 shadow-[2px_2px_0px_#121212] skew-p5"
      />
    </>
  );
}
