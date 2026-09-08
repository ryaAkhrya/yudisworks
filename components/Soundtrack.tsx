"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import type { MusicTrack } from "@/lib/types";

interface SoundtrackProps {
  tracks: MusicTrack[];
}

function getPlatformLinks(track: MusicTrack) {
  return [
    { label: "SPOTIFY", url: track.spotify_url, key: "spotify" },
    { label: "YOUTUBE", url: track.youtube_url, key: "youtube" },
    { label: "YOUTUBE MUSIC", url: track.youtube_music_url, key: "youtube_music" },
    { label: "SOUNDCLOUD", url: track.soundcloud_url, key: "soundcloud" },
  ].filter((item) => Boolean(item.url));
}

export default function Soundtrack({ tracks }: SoundtrackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visibleTracks = [...tracks]
    .filter((track) => track.is_visible !== false)
    .sort((a, b) => {
      if (Boolean(a.is_featured) !== Boolean(b.is_featured)) return Number(b.is_featured) - Number(a.is_featured);
      return (a.sort_order ?? 0) - (b.sort_order ?? 0) || new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

  useGSAP(
    () => {
      if (visibleTracks.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".soundtrack-title",
          { x: 180, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: { trigger: ".soundtrack-title", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".soundtrack-card",
          { y: 60, opacity: 0, skewY: 2 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: ".soundtrack-card", start: "top 85%" },
          }
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".soundtrack-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
        gsap.fromTo(
          ".soundtrack-card",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ".soundtrack-card", start: "top 88%" },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [visibleTracks.length] }
  );

  if (visibleTracks.length === 0) return null;

  const featuredTrack = visibleTracks.find((track) => track.is_featured) ?? visibleTracks[0];
  const otherTracks = visibleTracks.filter((track) => track.id !== featuredTrack.id);

  return (
    <section id="soundtrack" ref={sectionRef} className="section-shell section-shell--dark relative w-full bg-p5-black py-24 px-6 md:px-16 overflow-hidden border-t-8 border-p5-red">
      <div className="section-background-label section-background-label--light" aria-hidden="true">THE SOUNDTRACK</div>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(#F5F5F5 1.4px, transparent 1.4px)", backgroundSize: "18px 18px" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-p5-paper/70 mb-4">
              ORIGINAL MUSIC / ACTIVE TRANSMISSIONS
            </p>
            <h2 className="soundtrack-title inline-block bg-p5-paper text-p5-black text-4xl sm:text-5xl md:text-7xl font-black uppercase px-6 py-2 -skew-y-3 border-4 border-p5-red shadow-[10px_10px_0px_#CE0000]">
              THE SOUNDTRACK
            </h2>
          </div>
        </div>

        <article className="soundtrack-card relative grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10 items-center mb-16 border-8 border-p5-paper bg-p5-paper p-4 md:p-6 shadow-[18px_18px_0px_#CE0000]">
          <div className="relative aspect-square overflow-hidden border-8 border-p5-black bg-p5-black">
            {featuredTrack.cover_image_url ? (
              <Image
                src={featuredTrack.cover_image_url}
                alt={`Cover artwork for ${featuredTrack.title} by ${featuredTrack.artist}`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-p5-black text-p5-paper font-black uppercase text-2xl tracking-tight px-4 text-center">
                {featuredTrack.title}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-p5-red font-black">
                FEATURED SIGNAL
              </span>
              {featuredTrack.is_featured && (
                <span className="border-2 border-p5-red bg-p5-red px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-p5-paper">
                  FLAGGED
                </span>
              )}
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none text-p5-black tracking-tighter mb-2">
                {featuredTrack.title}
              </h3>
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-p5-black/70">
                {featuredTrack.artist}
              </p>
            </div>

            <p className="max-w-xl text-base md:text-lg font-bold text-p5-black/80">
              {featuredTrack.description || "Original music created and produced independently."}
            </p>

            <div className="flex flex-wrap items-center gap-3 border-t-4 border-b-4 border-p5-black py-3">
              {featuredTrack.release_year ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-p5-black/80">{featuredTrack.release_year}</span>
              ) : null}
              {featuredTrack.genre ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-p5-red font-black">{featuredTrack.genre}</span>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              {getPlatformLinks(featuredTrack).map((platform) => (
                <a
                  key={platform.key}
                  href={platform.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-p5-red text-p5-paper font-black uppercase px-5 py-3 border-4 border-p5-black shadow-[6px_6px_0px_#121212] hover:-translate-y-1 hover:translate-x-1 transition-transform focus:outline-none focus:ring-4 focus:ring-p5-paper focus:ring-offset-4 focus:ring-offset-p5-black"
                >
                  {platform.label}
                </a>
              ))}
            </div>
          </div>
        </article>

        {otherTracks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {otherTracks.map((track, index) => {
              const links = getPlatformLinks(track);
              const isOffset = index % 2 === 1;

              return (
                <article
                  key={track.id}
                  className={`soundtrack-card relative flex flex-col gap-4 border-4 border-p5-paper bg-p5-paper p-4 shadow-[12px_12px_0px_#CE0000] ${isOffset ? "md:translate-y-8" : ""}`}
                >
                  <div className="relative h-52 overflow-hidden border-4 border-p5-black bg-p5-black">
                    {track.cover_image_url ? (
                      <Image
                        src={track.cover_image_url}
                        alt={`Cover artwork for ${track.title} by ${track.artist}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-p5-black text-p5-paper font-black uppercase text-xl tracking-tight px-4 text-center">
                        {track.title}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-black uppercase leading-none text-p5-black tracking-tight">
                          {track.title}
                        </h3>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-p5-black/70 mt-2">
                          {track.artist}
                        </p>
                      </div>
                      {track.release_year ? (
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-p5-red font-black whitespace-nowrap">
                          {track.release_year}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-sm font-bold text-p5-black/80">
                      {track.description || "Original music created, recorded, and produced independently."}
                    </p>

                    {track.genre ? (
                      <span className="self-start border-2 border-p5-black px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-p5-black">
                        {track.genre}
                      </span>
                    ) : null}

                    {links.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-2">
                        {links.map((platform) => (
                          <a
                            key={platform.key}
                            href={platform.url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center border-4 border-p5-black bg-p5-paper text-p5-black font-black uppercase px-3 py-2 text-[10px] tracking-[0.16em] transition-colors hover:bg-p5-red hover:text-p5-paper focus:outline-none focus:ring-4 focus:ring-p5-paper focus:ring-offset-4 focus:ring-offset-p5-black"
                          >
                            {platform.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
