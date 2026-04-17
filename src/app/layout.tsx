import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "SITREK-MENTARI | Tracking Kelas UNPAM",
  description: "Sistem Informasi Tracking Kelas Mentari - Monitoring jadwal dan tugas mahasiswa UNPAM secara realtime.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1E40AF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-[#F0F2F5] dark:bg-zinc-950 text-foreground`}>
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <Sidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen relative md:ml-20 lg:ml-64 transition-all duration-300">
            {/* Background blobs for premium feel */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none"></div>
            
            <main className="flex-1 p-4 md:p-8 relative z-10 pb-24 md:pb-8">
              {children}
            </main>
          </div>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </body>
    </html>
  );
}
