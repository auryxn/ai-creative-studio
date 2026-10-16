"use client";
import * as React from "react"; import { cn } from "@/lib/utils";
type Variant="primary"|"secondary"|"ghost"|"danger";
const styles:Record<Variant,string>={primary:"bg-primary hover:bg-primary-hover text-white border-primary/40",secondary:"bg-card-hover hover:bg-border text-text border-border",ghost:"bg-transparent hover:bg-card-hover text-secondary hover:text-text border-transparent",danger:"bg-error/15 hover:bg-error/25 text-error border-error/30"};
export function Button({className,variant="secondary",size="md",...props}:React.ButtonHTMLAttributes<HTMLButtonElement>&{variant?:Variant;size?:"sm"|"md"|"lg"}){return <button className={cn("focus-ring inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition disabled:opacity-50 disabled:pointer-events-none", size==="sm"?"h-8 px-3 text-xs":size==="lg"?"h-11 px-5 text-sm":"h-10 px-4 text-sm",styles[variant],className)} {...props}/>}
