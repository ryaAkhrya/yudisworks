"use client";

import { useActionState } from "react";

import { addSkill, updateSkill, type ActionResult } from "@/app/studio/actions";

const emptyResult: ActionResult = { success: true };

type SkillCreateFormProps = {
  inputCls: string;
};

export function SkillCreateForm({ inputCls }: SkillCreateFormProps) {
  const [state, formAction, isPending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    return addSkill(formData);
  }, emptyResult);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {!state.success && state.error ? (
        <p className="rounded border-2 border-p5-red bg-p5-red/10 p-3 text-sm font-bold uppercase text-p5-black">{state.error}</p>
      ) : null}
      <input name="title" placeholder="Skill Title" required className={inputCls} />
      <textarea name="description" placeholder="Short description" rows={3} required className={inputCls} />
      <input name="tools" placeholder="Tools, comma separated" required className={inputCls} />
      <input name="proof_label" placeholder="Proof button label" defaultValue="VIEW WORK" className={inputCls} />
      <input name="proof_href" placeholder="#operations or /some-page" defaultValue="#operations" className={inputCls} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select name="visual_variant" defaultValue="paper" className={inputCls}>
          <option value="paper">paper</option>
          <option value="dark">dark</option>
          <option value="red">red</option>
          <option value="outline">outline</option>
        </select>
        <input name="sort_order" type="number" defaultValue={0} className={inputCls} />
      </div>
      <label className="flex items-center gap-3 font-black uppercase text-sm">
        <input name="is_visible" type="checkbox" defaultChecked className="w-5 h-5 accent-p5-red" />
        Visible on public site
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-p5-red text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-black hover:-translate-y-1 transition-transform disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Add Skill"}
      </button>
    </form>
  );
}

type SkillEditFormProps = {
  inputCls: string;
  skill: {
    id: string;
    title: string;
    description: string;
    tools?: string[] | null;
    proof_label?: string | null;
    proof_href?: string | null;
    visual_variant?: string | null;
    sort_order?: number | null;
    is_visible?: boolean | null;
  };
};

export function SkillEditForm({ inputCls, skill }: SkillEditFormProps) {
  const [state, formAction, isPending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    return updateSkill(skill.id, formData);
  }, emptyResult);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      {!state.success && state.error ? (
        <p className="rounded border-2 border-p5-red bg-p5-red/10 p-2 text-xs font-bold uppercase text-p5-black">{state.error}</p>
      ) : null}
      <input name="title" defaultValue={skill.title} required className={inputCls} />
      <textarea name="description" defaultValue={skill.description} rows={3} required className={inputCls} />
      <input name="tools" defaultValue={(skill.tools ?? []).join(", ")} required className={inputCls} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input name="proof_label" defaultValue={skill.proof_label ?? "VIEW WORK"} className={inputCls} />
        <input name="proof_href" defaultValue={skill.proof_href ?? "#operations"} className={inputCls} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <select name="visual_variant" defaultValue={skill.visual_variant || "paper"} className={inputCls}>
          <option value="paper">paper</option>
          <option value="dark">dark</option>
          <option value="red">red</option>
          <option value="outline">outline</option>
        </select>
        <input name="sort_order" type="number" defaultValue={skill.sort_order ?? 0} className={inputCls} />
        <label className="flex items-center gap-2 font-black uppercase text-xs justify-center border-2 border-p5-black bg-p5-paper px-2">
          <input name="is_visible" type="checkbox" defaultChecked={Boolean(skill.is_visible)} className="w-4 h-4 accent-p5-red" />
          Visible
        </label>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-p5-black text-p5-paper font-black uppercase px-4 py-2 border-2 border-p5-black hover:bg-p5-red transition-colors disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
