import React from "react";
import {
  addTestimonial,
  deleteTestimonial,
  addCategory,
  deleteCategory,
  addProjectItem,
  deleteProjectItem,
  updateHeroContent,
  addConfidantPost,
  deleteConfidantPost,
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
    { data: heroContent },
    { data: confidantFeed },
  ] = await Promise.all([
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    supabase.from("project_categories").select("*").order("created_at", { ascending: true }),
    supabase.from("project_items").select("*, project_categories(name)").order("created_at", { ascending: false }),
    supabase.from("hero_content").select("id, headline_line1, headline_line2, bio, whatsapp_number, photo_url, created_at").eq("id", "00000000-0000-0000-0000-000000000001").maybeSingle(),
    supabase.from("confidant_feed").select("*").order("created_at", { ascending: false }),
  ]);

  const displayTestis = testimonials ?? [];
  const displayCategories = categories ?? [];
  const displayItems = projectItems ?? [];
  const displayFeed = confidantFeed ?? [];

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

        {/* ─── HERO SETTINGS ─── */}
        <section className="bg-p5-red p-8 border-4 border-p5-black shadow-[12px_12px_0px_#121212]">
          <h2 className="text-3xl font-black text-p5-paper uppercase mb-6 border-b-4 border-p5-black pb-2">
            {"// Hero Settings"}
          </h2>
          <form action={updateHeroContent} key={heroContent?.id ?? "no-hero"} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-black text-p5-paper uppercase text-sm">Headline Line 1</label>
              <input
                name="headline_line1"
                defaultValue={heroContent?.headline_line1 ?? "I'LL STEAL"}
                required
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-black text-p5-paper uppercase text-sm">Headline Line 2</label>
              <input
                name="headline_line2"
                defaultValue={heroContent?.headline_line2 ?? "YOUR DEADLINES"}
                required
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-black text-p5-paper uppercase text-sm">Bio Text</label>
              <textarea
                name="bio"
                rows={3}
                defaultValue={heroContent?.bio ?? ""}
                required
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-black text-p5-paper uppercase text-sm">WhatsApp Number</label>
              <input
                name="whatsapp_number"
                defaultValue={heroContent?.whatsapp_number ?? "1234567890"}
                placeholder="628xxxxxxxxxx"
                required
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-black text-p5-paper uppercase text-sm">Profile Photo / Character Graphic</label>
              {heroContent?.photo_url && (
                <div className="mb-2 border-4 border-p5-black w-20 h-20 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={heroContent.photo_url} alt="Current photo" className="w-full h-full object-cover" />
                </div>
              )}
              <input
                name="photo"
                type="file"
                accept="image/*"
                className="p-3 bg-p5-paper border-2 border-p5-black font-bold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-p5-black file:text-p5-paper file:font-bold hover:file:bg-p5-red cursor-pointer"
              />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="bg-p5-black text-p5-paper font-black uppercase text-xl py-3 px-8 border-4 border-p5-paper hover:-translate-y-1 transition-transform hover:bg-p5-paper hover:text-p5-black hover:border-p5-black">
                Save Hero
              </button>
            </div>
          </form>
        </section>

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
            <form action={addProjectItem} className="flex flex-col gap-3 mb-8">
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

        {/* ─── ROW 3: Confidant Feed ─── */}
        <section className="bg-p5-black p-8 border-4 border-p5-red shadow-[12px_12px_0px_#CE0000]">
          <h2 className="text-3xl font-black text-p5-red uppercase mb-2 border-b-4 border-p5-red pb-2">
            {"// Confidant Feed"}
          </h2>
          <p className="text-p5-paper/50 font-mono text-sm mb-6">
            Visual transmissions broadcast to the Confidant Network section on the homepage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Upload Form */}
            <form action={addConfidantPost} className="flex flex-col gap-4">
              <label className="text-p5-paper font-black uppercase text-sm">Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                required
                className="p-3 bg-p5-paper border-2 border-p5-red font-bold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-p5-red file:text-p5-paper file:font-bold hover:file:bg-p5-paper hover:file:text-p5-black cursor-pointer"
              />
              <label className="text-p5-paper font-black uppercase text-sm">Caption / Transmission Log</label>
              <textarea
                name="caption"
                placeholder="Describe the mission..."
                rows={4}
                className={inputDarkCls}
              />
              <button
                type="submit"
                className="mt-2 bg-p5-red text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-paper hover:-translate-y-1 transition-transform"
              >
                Transmit Post
              </button>
            </form>

            {/* Existing Posts */}
            <div>
              <h3 className="text-xl font-black text-p5-paper uppercase mb-3">
                Active Transmissions ({displayFeed.length})
              </h3>
              <ul className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                {displayFeed.length === 0 && (
                  <li className="text-p5-paper/40 font-mono text-sm">No transmissions yet.</li>
                )}
                {displayFeed.map((post) => (
                  <li key={post.id} className="flex gap-3 items-start bg-[#1a1a1a] p-3 border-l-8 border-p5-red">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-16 h-16 border-2 border-p5-red overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-p5-paper/80 text-sm font-mono truncate">
                        {post.caption || <span className="italic opacity-40">[no caption]</span>}
                      </p>
                      <p className="text-p5-paper/30 text-xs font-mono mt-1">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <form action={deleteConfidantPost.bind(null, post.id)} className="flex-shrink-0">
                      <button
                        type="submit"
                        className="bg-p5-red text-p5-paper font-black uppercase px-3 py-1 text-sm hover:bg-p5-paper hover:text-p5-black transition-colors"
                      >
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
