"use client";

import { useActionState } from "react";

import { addMusicTrack, updateMusicTrack, type ActionResult } from "@/app/studio/actions";

const emptyResult: ActionResult = { success: true };

type MusicTrackCreateFormProps = {
  inputCls: string;
};

export function MusicTrackCreateForm({ inputCls }: MusicTrackCreateFormProps) {
  const [state, formAction, isPending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    return addMusicTrack(formData);
  }, emptyResult);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {!state.success && state.error ? (
        <p className="rounded border-2 border-p5-red bg-p5-red/10 p-3 text-sm font-bold uppercase text-p5-paper">{state.error}</p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label className="text-p5-paper font-black uppercase text-sm">Track Title</label>
        <input name="title" placeholder="How Far" required className={inputCls} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-p5-paper font-black uppercase text-sm">Artist</label>
        <input name="artist" defaultValue="Yudistira" className={inputCls} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-p5-paper font-black uppercase text-sm">Short Description</label>
        <textarea name="description" rows={4} placeholder="Original indie track..." className={inputCls} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Release Year</label>
          <input name="release_year" type="number" min={1900} max={2100} placeholder="2026" className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Genre / Label</label>
          <input name="genre" placeholder="Indie / Original" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Spotify URL</label>
          <input name="spotify_url" placeholder="https://open.spotify.com/..." className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">YouTube URL</label>
          <input name="youtube_url" placeholder="https://youtube.com/watch?..." className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">YouTube Music URL</label>
          <input name="youtube_music_url" placeholder="https://music.youtube.com/..." className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">SoundCloud URL</label>
          <input name="soundcloud_url" placeholder="https://soundcloud.com/..." className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Display Order</label>
          <input name="sort_order" type="number" defaultValue={0} className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Cover Artwork</label>
          <input name="cover_image" type="file" accept="image/jpeg,image/png,image/webp" className="p-3 bg-p5-paper border-2 border-p5-red font-bold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-p5-red file:text-p5-paper file:font-bold hover:file:bg-p5-paper hover:file:text-p5-black cursor-pointer" />
        </div>
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        <label className="flex items-center gap-2 font-black uppercase text-sm text-p5-paper">
          <input name="is_featured" type="checkbox" className="w-4 h-4 accent-p5-red" />
          Featured
        </label>
        <label className="flex items-center gap-2 font-black uppercase text-sm text-p5-paper">
          <input name="is_visible" type="checkbox" defaultChecked className="w-4 h-4 accent-p5-red" />
          Visible in public site
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-p5-red text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-paper hover:-translate-y-1 transition-transform disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Add Track"}
      </button>
    </form>
  );
}

type MusicTrackEditFormProps = {
  inputCls: string;
  track: {
    id: string;
    title: string;
    artist?: string | null;
    description?: string | null;
    cover_image_url?: string | null;
    release_year?: number | null;
    genre?: string | null;
    spotify_url?: string | null;
    youtube_url?: string | null;
    youtube_music_url?: string | null;
    soundcloud_url?: string | null;
    sort_order?: number | null;
    is_featured?: boolean | null;
    is_visible?: boolean | null;
  };
};

export function MusicTrackEditForm({ inputCls, track }: MusicTrackEditFormProps) {
  const [state, formAction, isPending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    return updateMusicTrack(track.id, formData);
  }, emptyResult);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {!state.success && state.error ? (
        <p className="rounded border-2 border-p5-red bg-p5-red/10 p-3 text-sm font-bold uppercase text-p5-paper">{state.error}</p>
      ) : null}

      {track.cover_image_url ? (
        <div className="w-full h-36 border-4 border-p5-red overflow-hidden bg-p5-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={track.cover_image_url} alt={`Current cover art for ${track.title}`} className="w-full h-full object-cover" />
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label className="text-p5-paper font-black uppercase text-sm">Track Title</label>
        <input name="title" defaultValue={track.title} required className={inputCls} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-p5-paper font-black uppercase text-sm">Artist</label>
        <input name="artist" defaultValue={track.artist ?? "Yudistira"} className={inputCls} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-p5-paper font-black uppercase text-sm">Short Description</label>
        <textarea name="description" rows={4} defaultValue={track.description ?? ""} className={inputCls} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Release Year</label>
          <input name="release_year" type="number" min={1900} max={2100} defaultValue={track.release_year ?? ""} className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Genre / Label</label>
          <input name="genre" defaultValue={track.genre ?? ""} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Spotify URL</label>
          <input name="spotify_url" defaultValue={track.spotify_url ?? ""} className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">YouTube URL</label>
          <input name="youtube_url" defaultValue={track.youtube_url ?? ""} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">YouTube Music URL</label>
          <input name="youtube_music_url" defaultValue={track.youtube_music_url ?? ""} className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">SoundCloud URL</label>
          <input name="soundcloud_url" defaultValue={track.soundcloud_url ?? ""} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Display Order</label>
          <input name="sort_order" type="number" defaultValue={track.sort_order ?? 0} className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-p5-paper font-black uppercase text-sm">Replace Cover Artwork</label>
          <input name="cover_image" type="file" accept="image/jpeg,image/png,image/webp" className="p-3 bg-p5-paper border-2 border-p5-red font-bold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-p5-red file:text-p5-paper file:font-bold hover:file:bg-p5-paper hover:file:text-p5-black cursor-pointer" />
        </div>
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        <label className="flex items-center gap-2 font-black uppercase text-sm text-p5-paper">
          <input name="is_featured" type="checkbox" defaultChecked={Boolean(track.is_featured)} className="w-4 h-4 accent-p5-red" />
          Featured
        </label>
        <label className="flex items-center gap-2 font-black uppercase text-sm text-p5-paper">
          <input name="is_visible" type="checkbox" defaultChecked={Boolean(track.is_visible)} className="w-4 h-4 accent-p5-red" />
          Visible
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-p5-red text-p5-paper font-black uppercase text-xl py-3 border-4 border-p5-paper hover:-translate-y-1 transition-transform disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save Track"}
      </button>
    </form>
  );
}
