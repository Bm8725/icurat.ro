"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 1. STRUCTURI DE DATE DINAMICE (Ușor de modificat sau tradus ulterior)
const PRODUCT_LINKS = [
  { label: "Gama Profesională", href: "/produse" },
  { label: "Detergenți Ecologici", href: "/produse" },
  { label: "Accesorii & Lavete", href: "/produse" },
];

const SERVICE_LINKS = [
  { label: "Curățenie Case", href: "/servicii" },
  { label: "Curățenie Birouri", href: "/servicii" },
  { label: "Igienizare Canapele", href: "/servicii" },
];

const LEGAL_LINKS = [
  { label: "ANPC", href: "/anpc", isUppercase: true },
  { label: "SOL", href: "/sol", isUppercase: true },
  { label: "Termeni", href: "/termeni" },
  { label: "Confidențialitate", href: "/confidentialitate" },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    // Pictogramă SVG nativă Facebook
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    // Pictogramă SVG nativă Instagram
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.4a4.4 4.4 0 110-8.8 4.4 4.4 0 010 8.8zm4.905-10.4a1.14 1.14 0 11-2.28 0 1.14 1.14 0 012.28 0z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-white text-black border-t border-slate-100 pt-16 pb-28 md:pb-12 px-6 md:px-12 mt-auto">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ZONA PRINCIPALĂ: Grile responsive adaptate pentru ecrane mici și mari */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          
          {/* Coloana 1: Brand & Rețele Sociale */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="space-y-2">
              <Link href="/" className="text-lg font-bold tracking-tight block">
                iCURAT.ro
              </Link>
              <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
                Produse profesionale și servicii de curățenie de înaltă calitate.
              </p>
            </div>
            
            {/* Pictograme Sociale */}
            <div className="flex items-center space-x-4 text-slate-400">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors duration-200"
                  aria-label={`Urmărește-ne pe ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Coloana 2: Magazin (Rrandat din Array) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Produse</h4>
            <ul className="space-y-2.5 text-xs font-light text-slate-600">
              {PRODUCT_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-black transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coloana 3: Servicii (Randat din Array) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Servicii</h4>
            <ul className="space-y-2.5 text-xs font-light text-slate-600">
              {SERVICE_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-black transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coloana 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Contact</h4>
            <ul className="space-y-2.5 text-xs font-light text-slate-600">
              <li>
                <a href="tel:07xxxxxxxx" className="hover:text-black transition-colors">07xx xxx xxx</a>
              </li>
              <li>
                <a href="mailto:contact@icurat.ro" className="hover:text-black transition-colors">contact@icurat.ro</a>
              </li>
              <li>
                <span className="inline-flex items-center text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                  Dispecerat Online
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* ZONA DE JOS: Copyright și link-uri legale */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-400">
          <div className="text-center sm:text-left">
            © {currentYear} icurat.ro. Toate drepturile rezervate.
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-normal text-slate-500/90">
            {LEGAL_LINKS.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`hover:text-black transition-colors ${
                  link.isUppercase ? "uppercase text-[10px] tracking-wider" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
