import React from "react";

const servicesData = [
  {
    title: "Academic Ghostwriter",
    description: "Makalah, laporan, dan tugas kuliah beres cepat dengan kualitas maksimal. Nggak ada ceritanya revisi dosen.",
    offsetClasses: "md:-ml-12 md:mt-0",
    bgClass: "bg-p5-paper",
    textColor: "text-p5-black",
  },
  {
    title: "Presentation Alchemist",
    description: "Desain PPT yang bikin dosen dan audiens melek. Estetik, rapi, dan *to the point*.",
    offsetClasses: "md:ml-32 md:mt-16",
    bgClass: "bg-p5-black",
    textColor: "text-p5-paper",
  },
  {
    title: "Web Developer",
    description: "Bikin website kenceng, responsif, dan desainnya nggak pasaran. Cocok buat company profile atau tugas akhir.",
    offsetClasses: "md:ml-12 md:mt-24",
    bgClass: "bg-p5-red",
    textColor: "text-p5-paper",
  },
];

export default function Services() {
  return (
    <section className="relative w-full py-24 px-6 md:px-16 bg-p5-black overflow-hidden">
      {/* Abstract aggressive section title */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex items-center justify-center">
        <h2 className="text-[12rem] font-black uppercase text-p5-paper whitespace-nowrap -skew-x-12">
          THE ARSENAL
        </h2>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="inline-block bg-p5-paper text-p5-black text-5xl md:text-7xl font-black uppercase px-6 py-2 skew-p5 border-4 border-p5-red shadow-[8px_8px_0px_#CE0000]">
            The Arsenal
          </h2>
        </div>

        <div className="flex flex-col gap-12 md:gap-0 mt-12">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={`relative p-8 md:p-10 border-8 border-p5-black shadow-[12px_12px_0px_#121212] skew-p5 max-w-2xl transform transition-transform duration-200 hover:-translate-y-2 hover:skew-x-2 ${service.bgClass} ${service.textColor} ${service.offsetClasses}`}
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
