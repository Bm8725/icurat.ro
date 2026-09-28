"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, Calendar, Layers, User, Home } from "lucide-react";

// Iconița brand — picătură cu checkmark decupat prin mască
// Folosim useId() ca gradientul/masca să aibă id unic de fiecare dată când
// componenta e randată (avem o instanță pt. desktop și una pt. mobil, simultan în DOM;
// id-uri SVG duplicate stricau masca pe a doua instanță).
function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  const uid = useId();
  const gradientId = `icurat-nav-g-${uid}`;
  const maskId = `icurat-nav-cut-${uid}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0B5FFF" />
          <stop offset="1" stopColor="#00C2FF" />
        </linearGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect width="56" height="56" fill="#ffffff" />
          <path
            d="M19.3 35 L25.4 41.1 L38.5 26.3"
            stroke="#000000"
            strokeWidth="5.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </mask>
      </defs>
      <rect width="56" height="56" rx="14" fill={`url(#${gradientId})`} />
      <path
        d="M28 8 C28 8 13.6 25.8 13.6 36.8 C13.6 45.2 20.1 51.6 28 51.6 C35.9 51.6 42.4 45.2 42.4 36.8 C42.4 25.8 28 8 28 8 Z"
        fill="#ffffff"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 80) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Ascundere la scroll în jos, afișare la scroll în sus
      if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false); 
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true);  
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/produse", label: "Produse", color: "text-sky-600" },
    { path: "/servicii", label: "Servicii", color: "text-emerald-600" },
    { path: "/dashboard", label: "Instant buy", color: "text-slate-900" },
  ];

  return (
    <>
      {/* =========================================================================
          1. DESKTOP NAVBAR (Mărit, efect elastic de tip Spring)
         ========================================================================= */}
      <motion.header 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={isVisible ? "visible" : "hidden"}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100 hidden md:block"
      >
        <div className="max-w-7xl mx-auto h-20 px-10 flex items-center justify-between">
          
          {/* Logo iCURAT.ro mărit cu micro-salt la hover */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link href="/" className="flex items-center gap-3">
              <LogoMark className="w-9 h-9" />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                iCURAT<span className="font-semibold text-[#0B5FFF] tracking-wide">.ro</span>
              </span>
            </Link>
          </motion.div>

          {/* Navigație centrală cu efect de glisare magnetică (Hover Card) */}
          <nav className="flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/50 shadow-inner relative">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-6 py-2.5 text-sm font-medium tracking-wide rounded-full transition-colors duration-300 z-10 ${
                    active ? item.color : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {/* Fundalul magnetic la hover */}
                  <AnimatePresence>
                    {hoveredPath === item.path && (
                      <motion.span
                        layoutId="hoverBackground"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute inset-0 bg-white rounded-full shadow-md border border-slate-100 -z-10"
                      />
                    )}
                  </AnimatePresence>

                  {/* Fundalul fix pentru pagina activă (când nu e hover peste altceva) */}
                  {active && !hoveredPath && (
                    <motion.span
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100 -z-10"
                    />
                  )}
                  
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Utilitare Dreapta Mărite */}
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="relative p-2.5 text-slate-500 hover:text-sky-600 transition-colors rounded-full hover:bg-slate-50 cursor-pointer">
              <Link href="/cos">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
              </Link>
            </motion.div>
            
            <div className="h-5 w-px bg-slate-200"></div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/autentificare" 
                className="text-sm font-medium tracking-wide bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-md block"
              >
                Portal Client
              </Link>
            </motion.div>
          </div>

        </div>
      </motion.header>

      {/* =========================================================================
          2. MOBILE TOP HEADER
         ========================================================================= */}
      <header className="w-full h-16 bg-white/80 backdrop-blur-lg border-b border-slate-100 flex items-center justify-between px-6 md:hidden sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark className="w-7 h-7" />
          <span className="font-bold text-base tracking-tight">iCURAT<span className="font-semibold text-[#0B5FFF]">.ro</span></span>
        </Link>

      </header>

      {/* =========================================================================
          3. MOBILE DOCK MENU (Generos, Animat, efect de salt elastic)
         ========================================================================= */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 md:hidden pointer-events-none"
          >
            <nav className="pointer-events-auto h-20 w-full max-w-md bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-2xl flex items-center justify-around px-4 shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
              
              {[
                { path: "/", label: "Acasă", icon: Home, activeColor: "text-sky-600" },
                { path: "/produse", label: "Produse", icon: Layers, activeColor: "text-sky-600" },
                { path: "/servicii", label: "Servicii", icon: Calendar, activeColor: "text-emerald-600" },
                { path: "/cos", label: "Coș", icon: ShoppingBag, activeColor: "text-emerald-600", badge: true },
                { path: "/autentificare", label: "Portal", icon: User, activeColor: "text-slate-900" },
              ].map((item) => {
                const active = pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path} className="relative flex flex-col items-center justify-center w-14 h-14 rounded-xl group">
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      animate={active ? { scale: 1.12, y: -2 } : { scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className={active ? item.activeColor : "text-slate-400"}
                    >
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </motion.div>
                    
                    <span className={`text-[11px] tracking-tight mt-1 font-medium transition-colors ${
                      active ? item.activeColor : "text-slate-400/80"
                    }`}>
                      {item.label}
                    </span>

                    {item.badge && (
                      <span className="absolute top-2 right-3 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
                    )}
                  </Link>
                );
              })}

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}