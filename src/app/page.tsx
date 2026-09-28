"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useMotionTemplate, useTransform } from "framer-motion";
import { MouseEvent } from "react";

const products = [
  { id: 1, name: "Purificator Air Pro", image: "/test1.png", angle: -40 },
  { id: 2, name: "Detergent Eco-Clinic", image: "/test1.png", angle: -20 },
  { id: 3, name: "Igienizant UV-C", image: "/test1.jpg", angle: 0 },
  { id: 4, name: "Kit Microfibră Premium", image: "/test1.png", angle: 20 },
  { id: 5, name: "Senzor Calitate Aer", image: "/test1.jpg", angle: 40 },
];

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateYContainer = useTransform(mouseX, [0, 1200], [12, -12]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-sky-100 overflow-x-hidden">
      
      {/* 1. HERO SECTION (Textul sus, produsele jos) */}
      <main 
        onMouseMove={handleMouseMove}
        className="relative flex flex-col items-center justify-start pt-24 md:pt-32 pb-6 px-6 text-center overflow-hidden group/hero border-b border-slate-100"
      >
        
        {/* Apă / Lumină fluidă pe fundal */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                700px circle at ${mouseX}px ${mouseY}px,
                rgba(56, 189, 248, 0.06) 0%,
                rgba(45, 212, 191, 0.02) 50%,
                transparent 80%
              )
            `,
          }}
        />

        {/* ZONE TEXT & COMANDE (Perfect lizibilă, fără interferențe) */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center z-10 mb-16">
          


          {/* Titlu */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 leading-[1.1] max-w-3xl">
            Puritate absolută pentru <br className="hidden sm:inline" />
            <span className="font-light bg-gradient-to-r from-sky-500 via-teal-500 to-sky-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              spațiul în care trăiești.
            </span>
          </h1>

          {/* Subtitlu */}
          <p className="mt-6 max-w-xl text-base sm:text-lg font-normal leading-relaxed text-slate-500">
            O platformă integrată pentru soluții de curățenie cu eficiență medicală și echipe specializate pentru casa sau biroul tău.
          </p>

          {/* Butoane */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10 w-full sm:w-auto">
            <Link
              href="/produse"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all rounded-full shadow-md tracking-wide text-center"
            >
              Explorează Produsele
            </Link>
            <Link
              href="/servicii"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 active:scale-[0.98] transition-all rounded-full tracking-wide text-center"
            >
              Programează un Serviciu
            </Link>
          </div>
        </div>

        {/* MEDIA CENTER SEMICERC 3D (Coborât sub text, complet accesibil) */}
        <div className="relative w-full max-w-5xl h-[340px] md:h-[400px] flex items-center justify-center select-none [perspective:1000px] z-10 pt-4">
          <motion.div 
            style={{ rotateY: rotateYContainer }}
            className="relative w-full h-full flex items-center justify-center transition-all duration-300 ease-out [transform-style:preserve-3d]"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="absolute w-36 h-48 sm:w-44 sm:h-56 bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:border-sky-300 hover:shadow-[0_15px_35px_rgba(56,189,248,0.12)] flex flex-col justify-between group/card"
                style={{
                  transform: `rotateY(${product.angle}deg) translateZ(360px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="relative w-full h-[75%] rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                </div>
                <p className="text-[12px] font-medium text-slate-600 text-center truncate mt-1.5 group-hover/card:text-sky-600 transition-colors">
                  {product.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

      </main>

      {/* 2. ZONA DE CARACTERISTICI */}
      <section className="bg-slate-50/40 py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200/60 rounded-2xl overflow-hidden border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            
            <div className="bg-white p-8 sm:p-10 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/40 via-teal-50/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 text-sm font-medium mb-6 group-hover:scale-110 group-hover:bg-sky-100 transition-all duration-300">01</div>
                <h3 className="text-lg font-medium text-slate-900 tracking-tight">Soluții Certificate</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">Detergenți și dezinfectanți premium, ideali pentru suprafețe sensibile.</p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/40 via-teal-50/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 text-sm font-medium mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">02</div>
                <h3 className="text-lg font-medium text-slate-900 tracking-tight">Echipe Dedicate</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">Personal instruit după protocoale stricte de curățenie clinică.</p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-10 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/40 via-slate-50/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-200 text-sm font-medium mb-6 group-hover:scale-110 group-hover:bg-slate-100 transition-all duration-300">03</div>
                <h3 className="text-lg font-medium text-slate-900 tracking-tight">Management Simplu</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-slate-500">Comanzi consumabilele pe bază de abonament direct din cont.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
