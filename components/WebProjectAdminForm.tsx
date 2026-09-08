"use client";

import { useActionState } from "react";

import { addWebProject, updateWebProject, type ActionResult } from "@/app/studio/actions";

const emptyResult: ActionResult = { success: true };

type WebProjectCreateFormProps = {
  inputDarkCls: string;
};

export function WebProjectCreateForm({ inputDarkCls }: WebProjectCreateFormProps) {
  const [state, formAction, isPending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    return addWebProject(formData);
  }, emptyResult);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {!state.success && state.error ? (
        <p className="rounded border-2 border-p5-red bg-p5-red/10 p-3 text-sm font-bold uppercase text-p5-paper">{state.error}</p>
      ) : null}
      <input name="title" placeholder="Project Title" required className={inputDarkCls} />
      <textarea name="description" placeholder="Project description" rows={3} required className={inputDarkCls} />
      <input name="tech_stack" placeholder="NEXT.JS, TYPESCRIPT, SUPABASE" required className={inputDarkCls} />
      <input name="live_url" placeholder="https://example.com" className={inputDarkCls} />
      <input name="display_domain" placeholder="display domain (optional)" className={inputDarkCls} />
      <input name="repository_url" placeholder="GitHub URL" className={inputDarkCls} />
      <input name="case_study_url" placeholder="Case study URL" className={inputDarkCls} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select name="status" defaultValue="live" className={inputDarkCls}>
          <option value="live">live</option>
          <option value="private">private</option>
          <option value="archived">archived</option>
          <option value="development">development</option>
        </select>
        <input name="sort_order" type="number" defaultValue={0} className={inputDarkCls} />
      </div>
      <label className="text-p5-paper font-black uppercase text-sm">Preview Screenshot</label>
      <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="p-3 bg-p5-paper border-2 border-p5-red font-bold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-p5-red file:text-p5-paper file:font-bold hover:file:bg-p5-paper hover:file:text-p5-black cursor-pointer" />
      <div className="flex items-center gap-4 flex-wrap">
        <label className="flex items-center gap-2 font-black uppercase text-sm text-p5-paper">
          <input name="is_featured" type="checkbox" className="w-4 h-4 accent-p5-red" />
          Featured
        </label>
        <label className="flex items-center gap-2 font-black uppercase text-sm text-p5-paper">
          <input name="is_visible" type="checkbox" defaultChecked className="w-4 h-4 accent-p5-red" />
          Visible
        </label>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-p5-red text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-paper hover:-translate-y-1 transition-transform disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Add Deployment"}
      </button>
    </form>
  );
}

type WebProjectEditFormProps = {
  inputDarkCls: string;
  project: {
    id: string;
    title: string;
    description: string;
    tech_stack?: string[] | null;
    live_url?: string | null;
    display_domain?: string | null;
    repository_url?: string | null;
    case_study_url?: string | null;
    status?: string | null;
    sort_order?: number | null;
    is_visible?: boolean | null;
    is_featured?: boolean | null;
    preview_image_url?: string | null;
  };
};

export function WebProjectEditForm({ inputDarkCls, project }: WebProjectEditFormProps) {
  const [state, formAction, isPending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    return updateWebProject(project.id, formData);
  }, emptyResult);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      {!state.success && state.error ? (
        <p className="rounded border-2 border-p5-red bg-p5-red/10 p-2 text-xs font-bold uppercase text-p5-paper">{state.error}</p>
      ) : null}
      {project.preview_image_url ? (
        <div className="w-full h-28 border-2 border-p5-red overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.preview_image_url} alt={project.title} className="w-full h-full object-cover" />
        </div>
      ) : null}
      <input name="title" defaultValue={project.title} required className={inputDarkCls} />
      <textarea name="description" defaultValue={project.description} rows={3} required className={inputDarkCls} />
      <input name="tech_stack" defaultValue={(project.tech_stack ?? []).join(", ")} required className={inputDarkCls} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input name="live_url" defaultValue={project.live_url ?? ""} className={inputDarkCls} />
        <input name="display_domain" defaultValue={project.display_domain ?? ""} className={inputDarkCls} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input name="repository_url" defaultValue={project.repository_url ?? ""} className={inputDarkCls} />
        <input name="case_study_url" defaultValue={project.case_study_url ?? ""} className={inputDarkCls} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <select name="status" defaultValue={project.status ?? "live"} className={inputDarkCls}>
          <option value="live">live</option>
          <option value="private">private</option>
          <option value="archived">archived</option>
          <option value="development">development</option>
        </select>
        <input name="sort_order" type="number" defaultValue={project.sort_order ?? 0} className={inputDarkCls} />
        <label className="flex items-center gap-2 font-black uppercase text-xs justify-center border-2 border-p5-red bg-p5-black px-2 text-p5-paper">
          <input name="is_visible" type="checkbox" defaultChecked={Boolean(project.is_visible)} className="w-4 h-4 accent-p5-red" />
          Visible
        </label>
      </div>
      <label className="flex items-center gap-2 font-black uppercase text-sm text-p5-paper">
        <input name="is_featured" type="checkbox" defaultChecked={Boolean(project.is_featured)} className="w-4 h-4 accent-p5-red" />
        Featured
      </label>
      <label className="text-p5-paper font-black uppercase text-sm">Replace preview image</label>
      <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="p-3 bg-p5-paper border-2 border-p5-red font-bold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-p5-red file:text-p5-paper file:font-bold hover:file:bg-p5-paper hover:file:text-p5-black cursor-pointer" />
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-p5-red text-p5-paper font-black uppercase px-4 py-2 border-2 border-p5-paper hover:bg-p5-paper hover:text-p5-black transition-colors disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
