"use client"; import React,{createContext,useContext,useState} from "react";
type Toast={id:number;msg:string}; const C=createContext<{toast:(m:string)=>void}>({toast:()=>{}});
export function ToastProvider({children}:{children:React.ReactNode}){const[toasts,set]=useState<Toast[]>([]);const toast=(msg:string)=>{const id=Date.now();set(t=>[...t,{id,msg}]);setTimeout(()=>set(t=>t.filter(x=>x.id!==id)),2600)};return <C.Provider value={{toast}}>{children}<div className="fixed bottom-4 right-4 z-[80] space-y-2">{toasts.map(t=><div key={t.id} className="rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-xl">{t.msg}</div>)}</div></C.Provider>}
export function useToast(){return useContext(C)}
