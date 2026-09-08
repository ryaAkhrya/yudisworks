"use client";

import { useActionState } from "react";

import { addTestimonial, updateTestimonial, type ActionResult } from "@/app/studio/actions";

const emptyResult: ActionResult = { success: true };

const testimonialFieldCls =
  "w-full bg-white text-p5-black placeholder:text-neutral-500 border-2 border-p5-black font-bold focus:outline-none focus:border-p5-black focus:ring-2 focus:ring-p5-black/30";

type TestimonialCreateFormProps = {
  inputCls: string;
};

export function TestimonialCreateForm(props: TestimonialCreateFormProps) {
  void props;

  const [state, formAction, isPending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    return addTestimonial(formData);
  }, emptyResult);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {!state.success && state.error ? (
        <p className="rounded border-2 border-p5-red bg-p5-red/10 p-3 text-sm font-bold uppercase text-p5-black">{state.error}</p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label className="font-black uppercase text-sm text-p5-paper">Display Name</label>
        <input name="display_name" placeholder="Display name" defaultValue="ANONYMOUS 1" required className={testimonialFieldCls} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-black uppercase text-sm text-p5-paper">Testimonial</label>
        <textarea name="message" placeholder="Quote / testimonial" rows={4} required className={`${testimonialFieldCls} min-h-[120px]`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className="font-black uppercase text-sm text-p5-paper">Display Order</label>
          <input name="sort_order" type="number" defaultValue={0} className={testimonialFieldCls} />
        </div>
        <label className="flex items-center gap-3 font-black uppercase text-sm border-2 border-p5-black bg-p5-paper px-3 text-p5-black mt-7">
          <input name="visible" type="checkbox" defaultChecked className="w-5 h-5 accent-p5-red" />
          Visible
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-p5-red text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-black hover:-translate-y-1 transition-transform disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Add Testimonial"}
      </button>
    </form>
  );
}

type TestimonialEditFormProps = {
  inputCls: string;
  testimonial: {
    id: string;
    display_name?: string | null;
    message?: string | null;
    author?: string | null;
    text?: string | null;
    sort_order?: number | null;
    visible?: boolean | null;
  };
};

export function TestimonialEditForm({ testimonial }: TestimonialEditFormProps) {
  const [state, formAction, isPending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    return updateTestimonial(testimonial.id, formData);
  }, emptyResult);

  const displayName = testimonial.display_name ?? testimonial.author ?? "ANONYMOUS";
  const message = testimonial.message ?? testimonial.text ?? "";

  return (
    <form action={formAction} className="flex flex-col gap-2">
      {!state.success && state.error ? (
        <p className="rounded border-2 border-p5-red bg-p5-red/10 p-2 text-xs font-bold uppercase text-p5-black">{state.error}</p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label className="font-black uppercase text-xs text-p5-paper">Display Name</label>
        <input name="display_name" defaultValue={displayName} required className={testimonialFieldCls} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-black uppercase text-xs text-p5-paper">Testimonial</label>
        <textarea name="message" defaultValue={message} rows={4} required className={`${testimonialFieldCls} min-h-[120px]`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <label className="font-black uppercase text-xs text-p5-paper">Display Order</label>
          <input name="sort_order" type="number" defaultValue={testimonial.sort_order ?? 0} className={testimonialFieldCls} />
        </div>
        <label className="flex items-center gap-2 font-black uppercase text-xs justify-center border-2 border-p5-black bg-p5-paper px-2 text-p5-black mt-6">
          <input name="visible" type="checkbox" defaultChecked={testimonial.visible !== false} className="w-4 h-4 accent-p5-red" />
          Visible
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-p5-black text-p5-paper font-black uppercase px-4 py-2 border-2 border-p5-black hover:bg-p5-red transition-colors disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
