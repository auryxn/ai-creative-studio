export function cn(...values: Array<string | false | null | undefined>) { return values.filter(Boolean).join(" "); }
export function fmtDate(s?: string) { return s ? new Intl.DateTimeFormat("en", { month:"short", day:"numeric" }).format(new Date(s)) : "—"; }
export function pct(n:number, d:number) { return d === 0 ? 0 : Math.round((n / d) * 100); }
export function slug(s:string) { return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }
export function uid(prefix="id") { return `${prefix}_${Math.random().toString(36).slice(2,10)}_${Date.now().toString(36)}`; }
export function now() { return new Date().toISOString(); }
