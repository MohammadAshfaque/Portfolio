import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CursorGuide from "@/components/CursorGuide";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammad Ashfaque — Indie Developer & Design Engineer",
  description:
    "Portfolio of Mohammad Ashfaque, Indie Developer & Design Engineer building real products like Pastily. Full-Stack, React Native, Tauri/Rust & AI Specialist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#09090b] text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white min-h-screen`}
      >
        <CursorGuide />
        {children}
      </body>
    </html>
  );
}

