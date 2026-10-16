"use client"; import * as React from "react"; import { cn } from "@/lib/utils";
export function Input(p:React.InputHTMLAttributes<HTMLInputElement>){return <input {...p} className={cn("focus-ring h-10 w-full rounded-xl border border-border bg-bg/60 px-3 text-sm text-text placeholder:text-muted",p.className)}/>}
