import React from "react";
import {
  addTestimonial,
  deleteTestimonial,
  addCategory,
  deleteCategory,
  addProjectItem,
  deleteProjectItem,
} from "./actions";
import { logout } from "./login/actions";
import { createClient } from "@/utils/supabase/server";

const inputCls =
  "p-3 bg-p5-paper border-2 border-p5-black font-bold focus:outline-none focus:border-p5-red";
const inputDarkCls =
  "p-3 bg-p5-black text-p5-paper border-2 border-p5-red font-bold focus:outline-none focus:border-p5-paper";

export default async function StudioDashboard() {
  const supabase = await createClient();

  const [
    { data: testimonials },
    { data: categories },
    { data: projectItems },
  ] = await Promise.all([
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    supabase.from("project_categories").select("*").order("created_at", { ascending: true }),
    supabase.from("project_items").select("*, project_categories(name)").order("created_at", { ascending: false }),
  ]);

  const displayTestis = testimonials ?? [];
  const displayCategories = categories ?? [];
  const displayItems = projectItems ?? [];

  return (
    <div className="min-h-screen bg-p5-paper text-p5-black p-6 md:p-12 font-sans selection:bg-p5-red selection:text-p5-paper">

      {/* Header */}
      <div className="flex justify-between items-end border-b-8 border-p5-black pb-6 mb-12">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter skew-p5 bg-p5-black text-p5-red px-6 py-2">
          Control Room
        </h1>
        <form action={logout}>
          <button className="bg-p5-red text-p5-paper font-black uppercase px-6 py-2 border-4 border-p5-black shadow-[4px_4px_0px_#121212] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#121212] transition-transform">
            Eject
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-12">

        {/* ─── ROW 1: Categories + Project Items ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* CATEGORIES */}
          <section className="bg-p5-black p-8 border-4 border-p5-red shadow-[12px_12px_0px_#CE0000]">
            <h2 className="text-3xl font-black text-p5-paper uppercase mb-6 border-b-4 border-p5-red pb-2">
              {"// Operation Types (Categories)"}
            </h2>
            <form action={addCategory} className="flex flex-col gap-3 mb-8">
              <input name="name" placeholder="Category Name" required className={inputCls} />
              <input name="description" placeholder="Short description" className={inputCls} />
              <div className="flex gap-3 items-center">
                <label className="text-p5-paper font-bold uppercase text-sm">Accent Color:</label>
                <input
                  name="accent_color"
                  type="color"
                  defaultValue="#CE0000"
                  className="h-10 w-16 bg-transparent border-2 border-p5-paper cursor-pointer"
                />
              </div>
              <button type="submit" className="mt-2 bg-p5-red text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-paper hover:-translate-y-1 transition-transform">
                Deploy Category
              </button>
            </form>

            <h3 className="text-xl font-black text-p5-paper uppercase mb-3">Current Categories</h3>
            <ul className="flex flex-col gap-3">
              {displayCategories.length === 0 && (
                <li className="text-p5-paper/40 font-mono text-sm">None yet.</li>
              )}
              {displayCategories.map((c) => (
                <li key={c.id} className="flex justify-between items-center bg-[#1a1a1a] p-4 border-l-8" style={{ borderColor: c.accent_color }}>
                  <div>
                    <p className="text-p5-paper font-bold uppercase">{c.name}</p>
                    {c.description && (
                      <p className="text-p5-paper/50 text-sm font-mono">{c.description}</p>
                    )}
                  </div>
                  <form action={deleteCategory.bind(null, c.id)}>
                    <button type="submit" className="bg-p5-paper text-p5-black font-black uppercase px-3 py-1 text-sm hover:bg-p5-red hover:text-p5-paper transition-colors">
                      Eradicate
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </section>

          {/* PROJECT ITEMS */}
          <section className="bg-p5-paper p-8 border-4 border-p5-black shadow-[12px_12px_0px_#121212]">
            <h2 className="text-3xl font-black text-p5-black uppercase mb-6 border-b-4 border-p5-black pb-2">
              {"// Project Files (Items)"}
            </h2>
            <form action={addProjectItem} className="flex flex-col gap-3 mb-8" encType="multipart/form-data">
              <select name="category_id" required className={`${inputCls} bg-p5-paper`}>
                <option value="">— Select Category —</option>
                {displayCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <input name="title" placeholder="Project Title" required className={inputCls} />
              <input name="status" placeholder="Status (e.g. LIVE, CLASSIFIED)" required className={inputCls} />
              <div className="flex items-center gap-3">
                <input name="is_redacted" type="checkbox" id="is_redacted" className="w-5 h-5 accent-p5-red" />
                <label htmlFor="is_redacted" className="font-bold uppercase">Redact Title on Public Site</label>
              </div>
              <label className="font-bold uppercase text-sm">Upload Document Pages (images):</label>
              <input
                name="files"
                type="file"
                multiple
                accept="image/*,application/pdf"
                className="p-3 bg-p5-black text-p5-paper border-2 border-p5-red font-bold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-p5-red file:text-p5-paper file:font-bold hover:file:bg-p5-paper hover:file:text-p5-black cursor-pointer"
              />
              <button type="submit" className="mt-2 bg-p5-black text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-red hover:-translate-y-1 transition-transform hover:bg-p5-red hover:border-p5-black">
                Deploy File
              </button>
            </form>

            <h3 className="text-xl font-black text-p5-black uppercase mb-3">Current Files</h3>
            <ul className="flex flex-col gap-3">
              {displayItems.length === 0 && (
                <li className="text-p5-black/40 font-mono text-sm">No files yet.</li>
              )}
              {displayItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center bg-gray-200 p-4 border-l-8 border-p5-black">
                  <div>
                    <p className="font-bold uppercase text-p5-black">{item.title}</p>
                    <p className="text-p5-black/50 text-sm font-mono">
                      {(item.project_categories as { name: string } | null)?.name ?? "—"} | {item.status} | {item.image_urls?.length ?? 0} page(s)
                    </p>
                  </div>
                  <form action={deleteProjectItem.bind(null, item.id)}>
                    <button type="submit" className="bg-p5-black text-p5-paper font-black uppercase px-3 py-1 text-sm hover:bg-p5-red transition-colors ml-4">
                      Purge
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* ─── ROW 2: Testimonials ─── */}
        <section className="bg-[#1a1a1a] p-8 border-4 border-p5-paper shadow-[12px_12px_0px_#CE0000]">
          <h2 className="text-3xl font-black text-p5-paper uppercase mb-6 border-b-4 border-p5-paper pb-2">
            {"// Comms (Testimonials)"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <form action={addTestimonial} className="flex flex-col gap-3">
              <input name="name" placeholder="Author / Code Name" required className={inputDarkCls} />
              <textarea name="message" placeholder="Message..." rows={4} required className={inputDarkCls} />
              <button type="submit" className="mt-2 bg-p5-red text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-paper hover:-translate-y-1 transition-transform">
                Inject Comm
              </button>
            </form>

            <div>
              <h3 className="text-xl font-black text-p5-paper uppercase mb-3">Current Comms</h3>
              <ul className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
                {displayTestis.length === 0 && (
                  <li className="text-p5-paper/40 font-mono text-sm">None yet.</li>
                )}
                {displayTestis.map((t) => (
                  <li key={t.id} className="flex justify-between items-start bg-[#242424] p-4 border-l-8 border-p5-red">
                    <div>
                      <p className="text-p5-paper font-bold">{t.author}</p>
                      <p className="text-p5-paper/60 text-sm italic mt-1">{t.text}</p>
                    </div>
                    <form action={deleteTestimonial.bind(null, t.id)} className="ml-4 flex-shrink-0">
                      <button type="submit" className="bg-p5-red text-p5-paper font-black uppercase px-3 py-1 text-sm hover:bg-p5-paper hover:text-p5-black transition-colors">
                        Purge
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
