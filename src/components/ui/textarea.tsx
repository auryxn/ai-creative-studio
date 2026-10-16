"use client"; import * as React from "react"; import { cn } from "@/lib/utils";
export function Textarea(p:React.TextareaHTMLAttributes<HTMLTextAreaElement>){return <textarea {...p} className={cn("focus-ring min-h-28 w-full rounded-xl border border-border bg-bg/60 px-3 py-2 text-sm text-text placeholder:text-muted",p.className)}/>}
