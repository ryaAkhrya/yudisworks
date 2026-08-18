import React, { use } from "react";
import { login } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const resolvedSearchParams = use(searchParams);
  
  return (
    <div className="min-h-screen bg-p5-black flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-p5-paper p-10 border-8 border-p5-red shadow-[16px_16px_0px_#CE0000] skew-p5 relative">
        
        {/* Abstract decor */}
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-p5-black border-4 border-p5-paper transform rotate-45" />

        <h1 className="text-5xl font-black uppercase text-p5-black mb-8 leading-none tracking-tighter">
          Control<br/>Room
        </h1>

        {resolvedSearchParams?.error && (
          <div className="bg-p5-red text-p5-paper p-3 mb-6 font-bold uppercase text-sm border-2 border-p5-black">
            ERROR: ACCESS DENIED - {resolvedSearchParams.error}
          </div>
        )}

        <form className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="font-black uppercase text-p5-black text-xl mb-2" htmlFor="email">
              Code Name (Email)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="bg-p5-paper border-4 border-p5-black p-4 text-lg font-bold text-p5-black focus:outline-none focus:bg-p5-black focus:text-p5-paper focus:border-p5-red transition-colors"
              placeholder="phantom@thieves.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-black uppercase text-p5-black text-xl mb-2" htmlFor="password">
              Keyword (Password)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="bg-p5-paper border-4 border-p5-black p-4 text-lg font-bold text-p5-black focus:outline-none focus:bg-p5-black focus:text-p5-paper focus:border-p5-red transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            formAction={login}
            type="submit"
            className="mt-6 bg-p5-red text-p5-paper font-black uppercase text-2xl py-4 border-4 border-p5-black shadow-[8px_8px_0px_#121212] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[12px_12px_0px_#121212] active:translate-y-2 active:translate-x-2 active:shadow-none transition-all cursor-pointer"
          >
            Infiltrate
          </button>
        </form>
      </div>
    </div>
  );
}
