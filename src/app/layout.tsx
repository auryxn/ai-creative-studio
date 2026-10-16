import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = { title: "AI Creative Studio", description: "Organize AI film and video production" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark"><body><ToastProvider><AppShell>{children}</AppShell></ToastProvider></body></html>;
}
