"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Marquee from "@/components/Marquee";

const servicesData = [
  {
    title: "Academic Ghostwriter",
    description: "Makalah, laporan, dan tugas kuliah beres cepat dengan kualitas maksimal. Nggak ada ceritanya revisi dosen.",
    offsetClasses: "md:-ml-12 md:mt-0",
    bgClass: "bg-p5-paper",
    textColor: "text-p5-black",
    hoverBgClass: "hover:bg-p5-black",
    hoverTextColor: "hover:text-p5-paper",
  },
  {
    title: "Presentation Alchemist",
    description: "Desain PPT yang bikin dosen dan audiens melek. Estetik, rapi, dan *to the point*.",
    offsetClasses: "md:ml-32 md:mt-16",
    bgClass: "bg-p5-black",
    textColor: "text-p5-paper",
    hoverBgClass: "hover:bg-p5-red",
    hoverTextColor: "hover:text-p5-black",
  },
  {
    title: "Web Developer",
    description: "Bikin website kenceng, responsif, dan desainnya nggak pasaran. Cocok buat company profile atau tugas akhir.",
    offsetClasses: "md:ml-12 md:mt-24",
    bgClass: "bg-p5-red",
    textColor: "text-p5-paper",
    hoverBgClass: "hover:bg-p5-black",
    hoverTextColor: "hover:text-p5-red",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Aggressive scroll animation for header
    gsap.fromTo(headerRef.current,
      { x: -300, opacity: 0, skewX: 20 },
      {
        x: 0, opacity: 1, skewX: 0,
        duration: 0.6,
        ease: "expo.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      }
    );

    // Whip in for cards
    cardsRef.current.forEach((card) => {
      gsap.fromTo(card,
        { y: 150, opacity: 0, scale: 0.8, skewY: 10 },
        {
          y: 0, opacity: 1, scale: 1, skewY: 0,
          duration: 0.5,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef });

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: "random(-5, 5)",
      y: "random(-5, 5)",
      duration: 0.08,
      yoyo: true,
      repeat: 3,
    });
  };

  return (
    <section id="arsenal" ref={containerRef} className="relative w-full py-24 px-6 md:px-16 bg-p5-black overflow-hidden">
      
      <Marquee />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 ref={headerRef} className="inline-block bg-p5-paper text-p5-black text-5xl md:text-7xl font-black uppercase px-6 py-2 skew-p5 border-4 border-p5-red shadow-[8px_8px_0px_#CE0000]">
            The Arsenal
          </h2>
        </div>

        <div className="flex flex-col gap-12 md:gap-0 mt-12">
          {servicesData.map((service, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              onMouseEnter={handleHover}
              className={`relative p-8 md:p-10 border-8 border-p5-black shadow-[12px_12px_0px_#121212] skew-p5 max-w-2xl transform transition-colors duration-0 cursor-pointer ${service.bgClass} ${service.textColor} ${service.hoverBgClass} ${service.hoverTextColor} ${service.offsetClasses}`}
            >
              {/* Fake tape or accent element */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-p5-red border-4 border-p5-black -skew-y-12" />
              
              <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="text-lg md:text-xl font-bold">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
