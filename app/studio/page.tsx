import React from "react";
import { addHeist, addTestimonial, deleteHeist, deleteTestimonial } from "./actions";
import { logout } from "./login/actions";
import { createClient } from "@/utils/supabase/server";

export default async function StudioDashboard() {
  const supabase = await createClient();
  
  // Fetch real data if DB is connected, otherwise fallback to empty arrays
  const { data: heists } = await supabase.from("heists").select("*").order("created_at", { ascending: false });
  const { data: testimonials } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });

  // For the sake of UI development before DB is seeded, we mock if null
  const displayHeists = heists || [
    { id: "mock1", title: "Project Alpha", category: "Web", status: "Live" }
  ];
  const displayTestis = testimonials || [
    { id: "mock1", author: "Anon_01", text: "Great work!" }
  ];

  return (
    <div className="min-h-screen bg-p5-paper text-p5-black p-6 md:p-12 font-sans selection:bg-p5-red selection:text-p5-paper">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b-8 border-p5-black pb-6 mb-12">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter skew-p5 bg-p5-black text-p5-red px-6 py-2">
          Control Room
        </h1>
        <form action={logout}>
          <button className="bg-p5-red text-p5-paper font-black uppercase px-6 py-2 border-4 border-p5-black shadow-[4px_4px_0px_#121212] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#121212] transition-transform">
            Eject
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* HEISTS COLUMN */}
        <section className="bg-p5-black p-8 border-4 border-p5-red skew-p5 shadow-[12px_12px_0px_#CE0000]">
          <h2 className="text-4xl font-black text-p5-paper uppercase mb-8 border-b-4 border-p5-red pb-2">
            Add Heist
          </h2>
          <form action={addHeist} className="flex flex-col gap-4">
            <input name="title" placeholder="Title" required className="p-3 bg-p5-paper border-2 border-p5-black font-bold focus:outline-none focus:border-p5-red" />
            <input name="category" placeholder="Category" required className="p-3 bg-p5-paper border-2 border-p5-black font-bold focus:outline-none focus:border-p5-red" />
            <input name="result" placeholder="Status / Result" required className="p-3 bg-p5-paper border-2 border-p5-black font-bold focus:outline-none focus:border-p5-red" />
            <input name="image" type="file" className="p-3 bg-p5-paper border-2 border-p5-black font-bold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-p5-red file:text-p5-paper file:font-bold hover:file:bg-p5-black cursor-pointer" />
            <button type="submit" className="mt-4 bg-p5-red text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-paper hover:-translate-y-1 transition-transform">
              Deploy Heist
            </button>
          </form>

          <div className="mt-12">
            <h3 className="text-2xl font-black text-p5-paper uppercase mb-4">Current Heists</h3>
            <ul className="flex flex-col gap-4">
              {displayHeists.map((h) => (
                <li key={h.id} className="flex justify-between items-center bg-[#1a1a1a] p-4 border-l-8 border-p5-red">
                  <div>
                    <p className="text-p5-paper font-bold uppercase">{h.title}</p>
                    <p className="text-p5-red text-sm font-mono">{h.category} | {h.status}</p>
                  </div>
                  <form action={deleteHeist.bind(null, h.id)}>
                    <button type="submit" className="bg-p5-paper text-p5-black font-black uppercase px-4 py-2 hover:bg-p5-red hover:text-p5-paper transition-colors">
                      Eradicate
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TESTIMONIALS COLUMN */}
        <section className="bg-p5-paper p-8 border-4 border-p5-black skew-p5 shadow-[12px_12px_0px_#121212]">
          <h2 className="text-4xl font-black text-p5-black uppercase mb-8 border-b-4 border-p5-black pb-2">
            Add Testimonial
          </h2>
          <form action={addTestimonial} className="flex flex-col gap-4">
            <input name="name" placeholder="Author / Code Name" required className="p-3 bg-p5-black text-p5-paper border-2 border-p5-red font-bold focus:outline-none focus:border-p5-paper" />
            <textarea name="message" placeholder="Message..." rows={4} required className="p-3 bg-p5-black text-p5-paper border-2 border-p5-red font-bold focus:outline-none focus:border-p5-paper" />
            <button type="submit" className="mt-4 bg-p5-black text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-red hover:-translate-y-1 transition-transform hover:bg-p5-red hover:border-p5-black">
              Inject Comm
            </button>
          </form>

          <div className="mt-12">
            <h3 className="text-2xl font-black text-p5-black uppercase mb-4">Current Comms</h3>
            <ul className="flex flex-col gap-4">
              {displayTestis.map((t) => (
                <li key={t.id} className="flex justify-between items-center bg-gray-200 p-4 border-l-8 border-p5-black">
                  <div>
                    <p className="text-p5-black font-bold">{t.author}</p>
                    <p className="text-gray-600 text-sm italic line-clamp-2">{t.text}</p>
                  </div>
                  <form action={deleteTestimonial.bind(null, t.id)}>
                    <button type="submit" className="bg-p5-black text-p5-paper font-black uppercase px-4 py-2 hover:bg-p5-red transition-colors ml-4">
                      Purge
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
