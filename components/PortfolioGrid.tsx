import React from "react";
import { getPortfolioProjects } from "@/lib/data";

export default async function PortfolioGrid() {
  const projects = await getPortfolioProjects();

  return (
    <section className="relative w-full py-24 px-6 md:px-16 bg-[#F5F5F5] overflow-hidden">
      {/* Halftone pattern is applied globally, but let's add some tape/board effects */}
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 flex justify-end">
          <h2 className="inline-block bg-p5-black text-p5-red text-5xl md:text-7xl font-black uppercase px-6 py-2 -skew-y-3 border-4 border-p5-red shadow-[-8px_8px_0px_#CE0000]">
            The Heists
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-12 mt-12 relative">
          {projects.map((project, index) => {
            // Asymmetrical placement classes
            const skewClass = index % 2 === 0 ? "skew-x-3 -skew-y-2" : "-skew-x-2 skew-y-3";
            const offsetClass = index === 1 ? "md:mt-24" : index === 2 ? "md:-mt-12" : "";
            
            return (
              <div
                key={project.id}
                className={`relative bg-p5-paper p-8 border-4 border-p5-black shadow-[10px_10px_0px_#121212] w-full max-w-md transform ${skewClass} ${offsetClass} transition-transform hover:scale-105 hover:z-20`}
              >
                {/* Red tape mock */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-p5-red border-2 border-p5-black -skew-x-12 opacity-90" />
                
                <div className="mb-4">
                  <span className="inline-block bg-p5-black text-p5-paper text-sm font-bold uppercase px-2 py-1 mb-2">
                    CLASSIFIED: {project.category}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black uppercase mb-6 leading-tight">
                  {project.isRedacted ? (
                    <span className="bg-p5-black text-p5-black px-2 select-none shadow-sm">
                      {project.title}
                    </span>
                  ) : (
                    project.title
                  )}
                </h3>
                
                <div className="mt-auto border-t-4 border-dashed border-p5-black pt-4">
                  <p className="text-xl font-bold font-mono text-p5-red uppercase">
                    Status: {project.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
