"use client";

import React, { useState, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import DocumentViewer from "./DocumentViewer";

interface ProjectItem {
  id: string;
  title: string;
  status: string;
  image_urls: string[] | string | null;
  is_redacted: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  accent_color: string;
  project_items: ProjectItem[];
}

interface ProjectCategoriesProps {
  categories: Category[];
}

function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<ProjectItem | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Animate list items in
      gsap.fromTo(
        listRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(listRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setIsOpen(false),
      });
    }
  };

  const offsetClass =
    index === 0
      ? "md:ml-0"
      : index === 1
      ? "md:ml-24 md:mt-12"
      : "md:ml-8 md:mt-24";

  return (
    <>
      <div
        ref={cardRef}
        className={`relative w-full max-w-xl ${offsetClass}`}
      >
        {/* Category Card Header — clickable */}
        <button
          onClick={toggleOpen}
          className="w-full text-left bg-p5-paper border-8 border-p5-black shadow-[12px_12px_0px_#121212] skew-p5 p-8 group hover:bg-p5-black transition-colors duration-0 focus:outline-none"
        >
          {/* Accent corner block */}
          <div
            className="absolute -top-4 -left-4 w-12 h-12 border-4 border-p5-black"
            style={{ backgroundColor: category.accent_color }}
          />

          <div className="flex justify-between items-start">
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-2 group-hover:text-p5-paper"
                style={{ color: category.accent_color }}
              >
                {"// OPERATION TYPE"}
              </p>
              <h3 className="text-3xl md:text-4xl font-black uppercase text-p5-black group-hover:text-p5-paper leading-tight">
                {category.name}
              </h3>
              {category.description && (
                <p className="mt-3 font-bold text-p5-black/70 group-hover:text-p5-paper/70">
                  {category.description}
                </p>
              )}
            </div>
            <div
              className="text-4xl font-black ml-6 mt-1 flex-shrink-0 transition-transform duration-200 group-hover:text-p5-paper"
              style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </div>
          </div>

          <div className="mt-4 border-t-4 border-dashed border-p5-black/30 group-hover:border-p5-paper/30 pt-3">
            <p className="font-mono text-sm font-bold group-hover:text-p5-paper text-p5-black">
              {category.project_items.length} FILE
              {category.project_items.length !== 1 ? "S" : ""} ON RECORD
            </p>
          </div>
        </button>

        {/* Expandable Project List */}
        <div
          ref={listRef}
          className={`overflow-hidden ${isOpen ? "" : "h-0 opacity-0"}`}
          style={{ height: isOpen ? "auto" : 0 }}
        >
          <div className="bg-p5-black border-8 border-t-0 border-p5-black shadow-[12px_12px_0px_#121212] skew-p5">
            {category.project_items.length === 0 ? (
              <p className="p-6 text-p5-paper/50 font-mono text-sm uppercase">
                No files on record yet.
              </p>
            ) : (
              category.project_items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`w-full text-left flex items-center justify-between p-5 hover:bg-p5-red transition-colors duration-0 group/item ${
                    i < category.project_items.length - 1
                      ? "border-b-2 border-p5-paper/10"
                      : ""
                  }`}
                >
                  <div>
                    <p className="font-black uppercase text-p5-paper group-hover/item:text-p5-black text-lg">
                      {item.is_redacted ? (
                        <span className="bg-p5-red group-hover/item:bg-p5-black text-p5-red group-hover/item:text-p5-black px-1 select-none">
                          {item.title}
                        </span>
                      ) : (
                        item.title
                      )}
                    </p>
                    <p className="font-mono text-xs text-p5-paper/50 group-hover/item:text-p5-black/70 uppercase mt-1">
                      STATUS: {item.status}
                    </p>
                  </div>
                  <span className="text-p5-red group-hover/item:text-p5-black font-black text-xl ml-4 flex-shrink-0">
                    ▶
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {activeItem && (
        <DocumentViewer item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </>
  );
}

export default function ProjectCategories({
  categories,
}: ProjectCategoriesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "expo.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="operations"
      ref={sectionRef}
      className="relative w-full py-24 px-6 md:px-16 bg-p5-paper overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 flex justify-end">
          <h2
            ref={headerRef}
            className="inline-block bg-p5-red text-p5-paper text-5xl md:text-7xl font-black uppercase px-6 py-2 -skew-y-3 border-4 border-p5-black shadow-[8px_8px_0px_#121212]"
          >
            The Operations
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="border-8 border-dashed border-p5-black p-16 text-center">
            <p className="font-black text-3xl uppercase text-p5-black">
              No operations on record yet.
            </p>
            <p className="font-mono text-p5-black/50 mt-2">
              Admin: add categories in the Control Room.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 md:gap-0 mt-4">
            {categories.map((cat, index) => (
              <CategoryCard key={cat.id} category={cat} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
