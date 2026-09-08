"use client";

import { useEffect, useState } from "react";
import YudisworksMark from "@/components/YudisworksMark";

const NAV_LINKS = [
  { label: "HOME", href: "#hero", id: "hero" },
  { label: "ARSENAL", href: "#arsenal", id: "arsenal" },
  { label: "OPERATIONS", href: "#operations", id: "operations" },
  { label: "DESIGN", href: "#confidant-network", id: "confidant-network" },
  { label: "DEPLOYMENTS", href: "#live-deployments", id: "live-deployments" },
  { label: "SOUNDTRACK", href: "#soundtrack", id: "soundtrack" },
  { label: "PHAN-SITE", href: "#phan-site", id: "phan-site" },
] as const;

const REQUEST_URL = "https://wa.me/6282124624301";

export default function TopNav() {
  const [activeId, setActiveId] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 48;
      setIsScrolled((current) => (current === scrolled ? current : scrolled));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean) as HTMLElement[];

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={[
        "top-nav sticky top-0 z-50 w-full border-b-4 border-p5-black bg-[#111111]/95 shadow-[0_10px_0_rgba(206,0,0,0.24)] backdrop-blur-[2px] transition-all duration-300 ease-out",
        isScrolled ? "border-p5-red/80 bg-[#121212] shadow-[0_10px_0_rgba(206,0,0,0.42)]" : "",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className={[
          "top-nav-inner flex items-center justify-between gap-3 transition-all duration-300 ease-out",
          isScrolled ? "py-2.5" : "py-3",
        ].join(" ")}>
          <a
            href="#hero"
            onClick={handleNavigate}
            aria-label="Yudisworks home"
            className="group inline-flex min-h-[48px] items-center gap-3 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p5-red focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
          >
            <span className={[
              "top-nav-mark inline-flex shrink-0 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              isScrolled ? "scale-[0.96]" : "scale-100",
            ].join(" ")}>
              <YudisworksMark className="h-10 w-10 md:h-11 md:w-11" />
            </span>
            <span className="leading-none">
              <span className={[
                "top-nav-brand block font-black uppercase tracking-[0.18em] text-p5-paper transition-all duration-300 ease-out",
                isScrolled ? "text-base md:text-base" : "text-base md:text-lg",
              ].join(" ")}>
                YUDISWORKS
              </span>
              <span className={[
                "top-nav-subbrand mt-1 block font-mono uppercase tracking-[0.28em] text-p5-paper/70 transition-all duration-300 ease-out",
                isScrolled ? "text-[8px] md:text-[9px]" : "text-[9px] md:text-[10px]",
              ].join(" ")}>
                MULTIDISCIPLINARY CREATIVE
              </span>
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={handleNavigate}
                  className={[
                    "top-nav-link group relative inline-flex min-h-[44px] items-center px-2.5 py-2 font-mono text-[10px] font-black uppercase tracking-[0.22em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p5-red focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]",
                    isActive ? "text-p5-paper" : "text-p5-paper/70 hover:text-p5-red",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute inset-x-1 bottom-0 h-[2px] origin-left transition-transform duration-200",
                      isActive ? "scale-x-100 bg-p5-red" : "scale-x-0 bg-p5-red group-hover:scale-x-100",
                    ].join(" ")}
                  />
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex">
            <a
              href={REQUEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="top-nav-button inline-flex items-center justify-center border-4 border-p5-red bg-p5-red px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-p5-paper shadow-[4px_4px_0px_#CE0000] transition-transform duration-150 hover:-translate-y-0.5 hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p5-paper focus-visible:ring-offset-2 focus-visible:ring-offset-p5-red"
            >
              REQUEST
            </a>
          </div>

          <button
            type="button"
            className={[
              "top-nav-button inline-flex h-11 w-11 items-center justify-center border-4 border-p5-red bg-p5-black text-p5-paper transition-colors duration-300 ease-out hover:bg-p5-red hover:text-p5-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p5-red focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] md:hidden",
              isScrolled ? "shadow-[4px_4px_0_rgba(206,0,0,0.35)]" : "",
            ].join(" ")}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={[
                  "top-nav-hamburger-line absolute left-0 block h-[2px] w-full rounded-sm bg-current transition-all duration-200",
                  isOpen ? "top-1.5 rotate-45" : "top-0",
                ].join(" ")}
              />
              <span
                className={[
                  "top-nav-hamburger-line absolute left-0 block h-[2px] w-full rounded-sm bg-current transition-all duration-200",
                  isOpen ? "opacity-0" : "top-1.5 opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "top-nav-hamburger-line absolute left-0 block h-[2px] w-full rounded-sm bg-current transition-all duration-200",
                  isOpen ? "top-1.5 -rotate-45" : "bottom-0",
                ].join(" ")}
              />
            </span>
          </button>
        </div>

        {isOpen && (
          <div id="mobile-navigation" className="border-t-4 border-p5-red bg-p5-black md:hidden">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2 px-3 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "flex items-center justify-between border-2 px-3 py-3 font-mono text-xs font-black uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p5-red focus-visible:ring-offset-2 focus-visible:ring-offset-p5-black",
                      isActive ? "border-p5-red bg-p5-red text-p5-paper" : "border-p5-paper/20 bg-[#171717] text-p5-paper/80 hover:border-p5-red hover:text-p5-red",
                    ].join(" ")}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true">›</span>
                  </a>
                );
              })}

              <a
                href={REQUEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavigate}
                className="mt-2 inline-flex items-center justify-center border-4 border-p5-red bg-p5-red px-4 py-3 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-p5-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p5-paper focus-visible:ring-offset-2 focus-visible:ring-offset-p5-black"
              >
                Send Calling Card
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
