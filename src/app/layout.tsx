import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "icurat.ro | Curățenie clinică",
  description: "Platformă integrată pentru produse și servicii de curățenie clinică.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-900 selection:bg-sky-50">
        
        {/* Navigația inteligentă (Desktop sus, Mobil jos) */}
        <Navbar />

        {/* Zona de conținut dinamic */}
        <div className="flex-grow flex flex-col">
          {children}
        </div>

        {/* Subsolul site-ului */}
      <Footer/>

      </body>
    </html>
  );
}
