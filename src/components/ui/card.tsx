import * as React from "react"; import { cn } from "@/lib/utils";
export function Card({className,...p}:React.HTMLAttributes<HTMLDivElement>){return <div {...p} className={cn("rounded-2xl border border-border bg-card shadow-sm",className)}/>}
export function CardHeader({className,...p}:React.HTMLAttributes<HTMLDivElement>){return <div {...p} className={cn("p-5 pb-3",className)}/>}
export function CardTitle({className,...p}:React.HTMLAttributes<HTMLHeadingElement>){return <h3 {...p} className={cn("text-[15px] font-semibold text-text",className)}/>}
export function CardContent({className,...p}:React.HTMLAttributes<HTMLDivElement>){return <div {...p} className={cn("p-5 pt-2",className)}/>}
