"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// ── SVG Icon primitives ──────────────────────────────────────────────────────

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconSpotify() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "// HERO", href: "#hero" },
  { label: "// THE ARSENAL", href: "#arsenal" },
  { label: "// THE OPERATIONS", href: "#operations" },
  { label: "// DESIGN THAT I DO", href: "#confidant-network" },
  { label: "// PHAN-SITE", href: "#phan-site" },
];

const SOCIAL_LINKS = [
  {
    id: "footer-tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@guayudis",
    icon: <IconTikTok />,
    tilt: "-rotate-2",
  },
  {
    id: "footer-instagram",
    label: "Instagram",
    href: "https://www.instagram.com/distira.wav",
    icon: <IconInstagram />,
    tilt: "rotate-1",
  },
  {
    id: "footer-github",
    label: "GitHub",
    href: "https://github.com/ryaAkhrya",
    icon: <IconGitHub />,
    tilt: "-rotate-1",
  },
  {
    id: "footer-spotify",
    label: "Spotify",
    href: "https://open.spotify.com/artist/2kFEpJnB2Lhxq8XGIy8Qs0",
    icon: <IconSpotify />,
    tilt: "rotate-2",
  },
  {
    id: "footer-whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/6282124624301",
    icon: <IconWhatsApp />,
    tilt: "-rotate-3",
  },
  {
    id: "footer-email",
    label: "Email",
    href: "yudistirabayuputra2004@gmail.com",
    icon: <IconEmail />,
    tilt: "rotate-3",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── Desktop: full stagger cascade ──
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(".footer-headline",
          { y: 80, opacity: 0, skewY: 6, scale: 0.92 },
          {
            y: 0, opacity: 1, skewY: 0, scale: 1, duration: 1.0, ease: "expo.out",
            scrollTrigger: { trigger: ".footer-headline", start: "top 88%", toggleActions: "play none none none" }
          }
        );
        gsap.fromTo(".footer-sub",
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2,
            scrollTrigger: { trigger: ".footer-sub", start: "top 90%", toggleActions: "play none none none" }
          }
        );
        gsap.fromTo(".footer-social-btn",
          { y: 40, opacity: 0, rotate: 12, scale: 0.8 },
          {
            y: 0, opacity: 1, rotate: 0, scale: 1, duration: 0.55, ease: "back.out(2)", stagger: 0.08,
            scrollTrigger: { trigger: ".footer-socials", start: "top 88%", toggleActions: "play none none none" }
          }
        );
        gsap.fromTo(".footer-nav-link",
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.07,
            scrollTrigger: { trigger: ".footer-nav", start: "top 88%", toggleActions: "play none none none" }
          }
        );
        gsap.fromTo(".footer-wipe",
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.9, ease: "power3.out", transformOrigin: "left center", stagger: 0.1,
            scrollTrigger: { trigger: footerRef.current, start: "top 90%", toggleActions: "play none none none" }
          }
        );
      });

      // ── Mobile: simple fades only ──
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(".footer-headline",
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: ".footer-headline", start: "top 88%", toggleActions: "play none none none" }
          }
        );
        gsap.fromTo(".footer-sub",
          { opacity: 0 },
          {
            opacity: 1, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: ".footer-sub", start: "top 90%", toggleActions: "play none none none" }
          }
        );
        gsap.fromTo(".footer-social-btn",
          { opacity: 0 },
          {
            opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out",
            scrollTrigger: { trigger: ".footer-socials", start: "top 88%", toggleActions: "play none none none" }
          }
        );
        gsap.fromTo(".footer-nav-link",
          { opacity: 0 },
          {
            opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out",
            scrollTrigger: { trigger: ".footer-nav", start: "top 90%", toggleActions: "play none none none" }
          }
        );
      });

      return () => mm.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-p5-black overflow-hidden border-t-8 border-p5-red"
    >
      {/* ── Halftone dots ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#CE0000 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* ── Diagonal speed lines ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, #CE0000 10px, #CE0000 12px)",
        }}
      />

      {/* ── Large diagonal slash cutout ── */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-[#1a0000]/60 -skew-x-12 origin-top-right z-0 pointer-events-none" />

      {/* ── Red wipe bars ── */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0 flex flex-col gap-[1px]">
        <div className="footer-wipe h-[3px] bg-p5-red w-full origin-left opacity-80" />
        <div className="footer-wipe h-[1px] bg-p5-red w-full origin-left opacity-40" />
      </div>

      {/* ── Corner brackets ── */}
      <div className="hidden md:block absolute bottom-12 right-12 w-12 h-12 border-b-4 border-r-4 border-p5-red opacity-40 z-10 pointer-events-none" />
      <div className="hidden md:block absolute bottom-12 left-12 w-12 h-12 border-b-4 border-l-4 border-p5-red opacity-40 z-10 pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-12 flex flex-col gap-16">

        {/* ── Hero text block ── */}
        <div className="flex flex-col gap-6 max-w-5xl">
          {/* "All-Out Attack" label */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-p5-red" />
            <span className="font-mono text-p5-red text-xs uppercase tracking-[0.35em]">
              ALL-OUT ATTACK
            </span>
            <div className="w-8 h-1 bg-p5-red" />
          </div>

          <h2 className="footer-headline text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-none text-p5-paper opacity-0">
            <span className="block">THE SHOW'S</span>
            <span className="block bg-p5-red text-p5-paper px-6 py-2 inline-block -skew-x-6 border-4 border-p5-paper shadow-[8px_8px_0px_#CE0000] mt-2">
              OVER.
            </span>
          </h2>

          <p className="footer-sub font-mono text-p5-paper/70 text-lg md:text-xl uppercase tracking-widest border-l-4 border-p5-red pl-4 opacity-0">
            Got an impossible deadline?{" "}
            <span className="text-p5-red font-black">Send the calling card.</span>
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-p5-paper/10" />

        {/* ── Social + Nav grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 md:gap-y-16 gap-x-16">

          {/* Social Channels */}
          <div className="footer-socials flex flex-col gap-6">
            <h3 className="font-mono text-p5-red text-xs uppercase tracking-[0.3em]">
              ▸ Channels
            </h3>
            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`footer-social-btn group relative flex items-center gap-3 bg-p5-paper text-p5-black font-black uppercase text-sm px-5 min-h-[44px] min-w-[44px] border-4 border-p5-black shadow-[4px_4px_0px_#CE0000] ${s.tilt} hover:bg-p5-red hover:text-p5-paper hover:border-p5-paper hover:shadow-[6px_6px_0px_#121212] hover:-translate-y-1 transition-all duration-150`}
                >
                  <span className="flex-shrink-0 transition-transform duration-150 group-hover:scale-110">
                    {s.icon}
                  </span>
                  <span className="hidden sm:block tracking-tight">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="footer-nav flex flex-col gap-6">
            <h3 className="font-mono text-p5-red text-xs uppercase tracking-[0.3em]">
              ▸ Navigation
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Quick navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="footer-nav-link group inline-flex items-center gap-3 font-black uppercase text-p5-paper/70 hover:text-p5-red transition-colors duration-150 text-lg tracking-tight opacity-0 min-h-[44px]"
                >
                  <span className="w-0 group-hover:w-6 h-[3px] bg-p5-red transition-all duration-200 ease-out" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-p5-paper/10" />

        {/* ── Copyright bar ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between pb-6 md:pb-2">
          <p className="font-mono text-p5-paper/30 text-xs uppercase tracking-widest">
            © 2026 YUDISWORKS // PHANTOM FREELANCER.{" "}
            <span className="text-p5-red/50">
              BUILT WITH NEXT.JS &amp; SUPABASE.
            </span>
          </p>
          {/* Phantom Thieves stamp - Hidden on mobile to prevent squishing */}
          <div className="hidden md:block flex-shrink-0 border-2 border-p5-red/40 px-4 py-2 -skew-x-6">
            <span className="font-mono text-p5-red/50 text-[10px] uppercase tracking-[0.3em]">
              PHANTOM THIEVES
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
