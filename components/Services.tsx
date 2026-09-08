"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Marquee from "@/components/Marquee";
import type { Skill, SkillVisualVariant } from "@/lib/types";

const FALLBACK_SKILLS: Skill[] = [
  {
    id: "fallback-1",
    created_at: new Date().toISOString(),
    title: "Web Developer",
    description: "Build modern websites from landing pages to full-stack applications.",
    tools: ["NEXT.JS", "TYPESCRIPT", "SUPABASE"],
    proof_label: "VIEW LIVE DEPLOYMENTS",
    proof_href: "#live-deployments",
    visual_variant: "red",
    sort_order: 0,
    is_visible: true,
  },
  {
    id: "fallback-2",
    created_at: new Date().toISOString(),
    title: "Visual Designer",
    description: "Poster, branding, layout, promotional and digital design.",
    tools: ["PHOTOSHOP", "CANVA", "FIGMA"],
    proof_label: "VIEW DESIGN ARCHIVE",
    proof_href: "#confidant-network",
    visual_variant: "dark",
    sort_order: 1,
    is_visible: true,
  },
  {
    id: "fallback-3",
    created_at: new Date().toISOString(),
    title: "Presentation Designer",
    description: "Pitch decks, academic presentations and creative presentation systems.",
    tools: ["POWERPOINT", "CANVA"],
    proof_label: "VIEW SELECTED WORK",
    proof_href: "#operations",
    visual_variant: "paper",
    sort_order: 2,
    is_visible: true,
  },
];

const variantClasses: Record<SkillVisualVariant, string> = {
  paper: "bg-p5-paper text-p5-black border-p5-black shadow-[12px_12px_0px_#121212] hover:bg-p5-black hover:text-p5-paper",
  dark: "bg-p5-black text-p5-paper border-p5-red shadow-[12px_12px_0px_#CE0000] hover:bg-p5-red hover:text-p5-black",
  red: "bg-p5-red text-p5-paper border-p5-black shadow-[12px_12px_0px_#121212] hover:bg-p5-paper hover:text-p5-black",
  outline: "bg-transparent text-p5-black border-p5-black shadow-[12px_12px_0px_#121212] hover:bg-p5-black hover:text-p5-paper",
};

export default function Services({ skills = FALLBACK_SKILLS }: { skills?: Skill[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<Array<HTMLElement | null>>([]);

  const visibleSkills = [...skills].filter((skill) => skill.is_visible !== false).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        headerRef.current,
        { x: -300, opacity: 0, skewX: 20 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
        }
      );

      cardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 150, opacity: 0, scale: 0.8, skewY: 10 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            skewY: 0,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      cardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    });

    return () => mm.revert();
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

  if (visibleSkills.length === 0) {
    return (
      <section id="arsenal" className="relative w-full py-24 px-6 md:px-16 bg-p5-black overflow-hidden">
        <Marquee />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="inline-block bg-p5-paper text-p5-black text-5xl md:text-7xl font-black uppercase px-6 py-2 skew-p5 border-4 border-p5-red shadow-[8px_8px_0px_#CE0000]">
              The Arsenal
            </h2>
          </div>
          <div className="border-8 border-dashed border-p5-red bg-p5-paper p-12 text-center">
            <p className="font-black uppercase text-3xl text-p5-black">No skills on record yet.</p>
            <p className="font-mono text-p5-black/70 mt-2">Admin: add capabilities in the Control Room.</p>
          </div>
        </div>
      </section>
    );
  }

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
          {visibleSkills.map((skill, index) => {
            const variant = skill.visual_variant || "paper";
            const offsetClasses = index % 2 === 0 ? "md:-ml-12 md:mt-0" : "md:ml-32 md:mt-16";
            const proofHref = skill.proof_href && skill.proof_href.trim() ? skill.proof_href : "#operations";
            const proofLabel = skill.proof_label && skill.proof_label.trim() ? skill.proof_label : "VIEW WORK";

            return (
              <article
                key={skill.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onMouseEnter={handleHover}
                className={`relative p-8 md:p-10 border-8 border-p5-black skew-p5 max-w-2xl transform transition-colors duration-0 cursor-pointer ${variantClasses[variant]} ${offsetClasses} ${index === visibleSkills.length - 1 ? "md:mb-0" : ""}`}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-p5-red border-4 border-p5-black -skew-y-12" />

                <div className="flex items-center justify-between gap-4 mb-5">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">
                    {skill.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-75">
                    {skill.visual_variant?.toUpperCase()}
                  </span>
                </div>

                <p className="text-lg md:text-xl font-bold mb-5">
                  {skill.description}
                </p>

                {skill.tools.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mb-6">
                    {skill.tools.map((tool) => (
                      <li key={`${skill.id}-${tool}`} className="border-2 border-current px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em]">
                        {tool}
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={proofHref}
                  className="inline-flex items-center gap-2 font-black uppercase border-4 border-current px-4 py-2 text-sm md:text-base hover:-translate-y-1 transition-transform"
                >
                  {proofLabel} →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
