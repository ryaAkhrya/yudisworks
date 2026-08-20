"use client";

import React, { useState, useRef } from "react";
import { addProjectItem } from "@/app/studio/actions";

interface Category {
  id: string;
  name: string;
}

interface ProjectItemFormProps {
  categories: Category[];
  inputCls: string;
}

export default function ProjectItemForm({ categories, inputCls }: ProjectItemFormProps) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await addProjectItem(formData);

    if (result?.error) {
      alert(`Error deploying file: ${result.error}`);
      console.error(result.error);
    } else {
      // success, clear the form
      formRef.current?.reset();
    }
    
    setLoading(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8">
      <select name="category_id" required className={`${inputCls} bg-p5-paper`}>
        <option value="">— Select Category —</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <input name="title" placeholder="Project Title" required className={inputCls} />
      <input name="status" placeholder="Status (e.g. LIVE, CLASSIFIED)" required className={inputCls} />
      <div className="flex items-center gap-3">
        <input name="is_redacted" type="checkbox" id="is_redacted" className="w-5 h-5 accent-p5-red" />
        <label htmlFor="is_redacted" className="font-bold uppercase">Redact Title on Public Site</label>
      </div>
      <label className="font-bold uppercase text-sm">Project File URL (Link to PDF):</label>
      <input
        name="file_url"
        type="text"
        placeholder="https://..."
        className={inputCls}
      />
      <button 
        type="submit" 
        disabled={loading}
        className="mt-2 bg-p5-black text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-red hover:-translate-y-1 transition-transform hover:bg-p5-red hover:border-p5-black disabled:opacity-50"
      >
        {loading ? "Deploying..." : "Deploy File"}
      </button>
    </form>
  );
}
