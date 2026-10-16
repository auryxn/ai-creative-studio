"use client";
import type { Repo } from "@/lib/db/repository";
let repoPromise: Promise<Repo> | null = null;
export function getRepo(): Promise<Repo> { if(!repoPromise) repoPromise=loadRepo(); return repoPromise; }
async function loadRepo(): Promise<Repo> {
  const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (hasSupabase) { const { createSupabaseRepo } = await import("@/lib/db/supabase"); return createSupabaseRepo(); }
  const { LocalRepoAdapter } = await import("@/lib/db/local"); const adapter=new LocalRepoAdapter(); await adapter.init(); return adapter;
}
