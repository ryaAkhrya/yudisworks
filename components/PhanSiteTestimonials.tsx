"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface Testimonial {
  author: string;
  text: string;
}

interface PhanSiteTestimonialsProps {
  testimonials: Testimonial[];
}

export default function PhanSiteTestimonials({ testimonials }: PhanSiteTestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Continuous upward scroll imitating a live forum
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(trackRef.current, {
      yPercent: -50, // scroll half since we duplicate the list
      ease: "none",
      duration: 15,
    });
  }, { scope: containerRef });

  return (
    <section className="relative w-full py-24 px-6 md:px-16 bg-p5-black overflow-hidden border-t-8 border-p5-red">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 h-[600px]">
        
        {/* Title side */}
        <div className="md:w-1/3 flex flex-col justify-center relative z-10">
          <div className="bg-p5-paper p-6 border-4 border-p5-red shadow-[8px_8px_0px_#CE0000] skew-p5 transform -rotate-3">
            <h2 className="text-5xl font-black uppercase text-p5-black leading-none">
              The<br/>Phan-Site
            </h2>
            <p className="mt-4 font-bold text-lg text-p5-black">
              LIVE FORUM ACTIVITY...
            </p>
          </div>
        </div>

        {/* Scrolling Chat Side */}
        <div ref={containerRef} className="md:w-2/3 h-full overflow-hidden relative border-4 border-p5-paper shadow-[inset_0px_0px_20px_#121212]">
          <div ref={trackRef} className="flex flex-col gap-6 pt-6">
            {/* Render twice for seamless infinite scroll */}
            {[...testimonials, ...testimonials].map((testi, i) => (
              <div 
                key={i} 
                className="bg-[#1a1a1a] p-4 border-l-8 border-p5-red shadow-[4px_4px_0px_#F5F5F5] w-[85%] mx-auto skew-p5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 bg-p5-red inline-block" />
                  <span className="text-p5-red font-bold font-mono text-sm uppercase">
                    {testi.author}
                  </span>
                </div>
                <p className="text-p5-paper font-bold">
                  {testi.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
