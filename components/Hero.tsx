import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col justify-center items-start px-6 md:px-16 overflow-hidden">
      {/* Background chaotic elements */}
      <div className="absolute top-10 right-10 md:top-20 md:right-32 w-64 h-24 bg-p5-red skew-p5 z-0" />
      <div className="absolute top-40 right-4 md:right-16 w-32 h-16 bg-p5-black skew-p5 z-0 opacity-20" />

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-p5-black skew-p5 mb-6 leading-none">
          <span className="bg-p5-red text-p5-paper px-4 py-2 inline-block transform -skew-x-12 shadow-[8px_8px_0px_#121212] border-4 border-p5-black">
            I&apos;LL STEAL
          </span>
          <br />
          <span className="inline-block mt-4 bg-p5-paper text-p5-black px-4 py-2 transform skew-x-6 shadow-[8px_8px_0px_#121212] border-4 border-p5-black">
            YOUR DEADLINES
          </span>
        </h1>

        <div className="bg-p5-black text-p5-paper p-6 max-w-xl skew-p5 border-4 border-p5-red shadow-[12px_12px_0px_#CE0000] mt-10">
          <p className="text-xl md:text-2xl font-bold italic">
            &quot;Gua ngerjain apa yang lu males kerjain. Dari tugas kuliah, makalah, PPT estetik, sampai bikin website dari nol. Lu duduk manis, kerjaan beres.&quot;
          </p>
        </div>

        <div className="mt-12 flex justify-start">
          <a
            href="https://wa.me/1234567890" // Placeholder WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-p5-red text-p5-paper text-2xl font-black uppercase px-8 py-4 skew-p5 border-4 border-p5-black shadow-[8px_8px_0px_#121212] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#121212] transition-all duration-150 active:translate-x-2 active:translate-y-2 active:shadow-[0px_0px_0px_#121212]"
          >
            Drop Your Request
          </a>
        </div>
      </div>
    </section>
  );
}
