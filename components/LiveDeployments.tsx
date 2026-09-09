"use client";

/* eslint-disable @next/next/no-img-element -- CMS images do not store intrinsic dimensions, so native sizing is required here. */

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { WebProject } from "@/lib/types";

interface LiveDeploymentsProps {
  projects: WebProject[];
}

export default function LiveDeployments({ projects }: LiveDeploymentsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (projects.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".ld-title",
          { x: 180, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: { trigger: ".ld-title", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".ld-card",
          { y: 80, opacity: 0, skewY: 3 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: ".ld-card", start: "top 85%" },
          }
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".ld-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
        gsap.fromTo(
          ".ld-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ".ld-card", start: "top 90%" },
          }
        );
      });

      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef, dependencies: [projects.length] }
  );

  const visibleProjects = [...projects].filter((project) => project.is_visible !== false).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  if (visibleProjects.length === 0) return null;

  return (
    <section
      id="live-deployments"
      ref={sectionRef}
      className="relative w-full bg-p5-black py-24 px-6 md:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(#F5F5F5 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 flex justify-end">
          <h2 className="ld-title inline-block bg-p5-red text-p5-paper text-4xl sm:text-5xl md:text-7xl font-black uppercase px-6 py-2 -skew-y-3 border-4 border-p5-black shadow-[8px_8px_0px_#121212]">
            Live Deployments
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-20">
          {visibleProjects.map((project, index) => {
            const isAlternate = index % 2 === 1;
            const previewUrl = project.preview_image_url || "";
            const isLive = project.status === "live";
            const domain = project.display_domain || project.live_url || "";

            return (
              <article
                key={project.id}
                className="ld-card relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <div className={`${isAlternate ? "md:order-2" : "md:order-1"}`}>
                  <div className="relative bg-p5-black border-8 border-p5-black shadow-[16px_16px_0px_#CE0000] overflow-hidden group">
                    <div className="flex items-center gap-2 bg-p5-black px-4 py-3 border-b-4 border-p5-red">
                      <span className="w-3 h-3 rounded-full bg-p5-red" />
                      <span className="w-3 h-3 rounded-full bg-p5-paper" />
                      <span className="w-3 h-3 rounded-full bg-p5-red" />
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-p5-paper/80">
                        {String(index + 1).padStart(2, "0")} / {project.title.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex justify-center overflow-hidden bg-p5-paper">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt={`${project.title} preview`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="block h-auto max-h-[34rem] w-full object-contain object-center"
                          loading={index === 0 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : "auto"}
                        />
                      ) : (
                        <div className="m-6 flex min-h-[312px] flex-1 items-center justify-center border-4 border-dashed border-p5-black bg-p5-paper text-2xl font-black uppercase text-p5-black md:min-h-[392px]">
                          Preview pending
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`${isAlternate ? "md:order-1" : "md:order-2"} flex flex-col gap-5`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.35em] text-p5-red font-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {isLive && (
                      <span className="inline-flex items-center gap-2 border-4 border-p5-red bg-p5-red px-2 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-p5-paper">
                        <span className="inline-block w-2 h-2 bg-p5-paper rounded-full" />
                        LIVE
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none text-p5-paper tracking-tighter">
                    {project.title}
                  </h3>

                  <p className="max-w-xl text-base md:text-lg font-bold text-p5-paper/80">
                    {project.description}
                  </p>

                  {project.tech_stack.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <li key={tech} className="border-2 border-p5-black bg-p5-paper px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-p5-black">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap items-center gap-4 border-t-4 border-b-4 border-p5-paper py-3">
                    {domain && (
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-p5-paper/70">
                        {domain}
                      </span>
                    )}
                    {project.status && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-p5-red font-black">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-p5-red text-p5-paper font-black uppercase px-5 py-3 border-4 border-p5-black shadow-[6px_6px_0px_#121212] hover:-translate-y-1 hover:translate-x-1 transition-transform"
                      >
                        Visit Site →
                      </a>
                    )}
                    {project.repository_url && (
                      <a
                        href={project.repository_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center border-4 border-p5-black bg-p5-paper text-p5-black font-black uppercase px-5 py-3 hover:bg-p5-black hover:text-p5-paper transition-colors"
                      >
                        Repo
                      </a>
                    )}
                    {project.case_study_url && (
                      <a
                        href={project.case_study_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center border-4 border-p5-black bg-p5-paper text-p5-black font-black uppercase px-5 py-3 hover:bg-p5-black hover:text-p5-paper transition-colors"
                      >
                        Case Study
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
