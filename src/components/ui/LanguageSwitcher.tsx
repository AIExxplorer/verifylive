"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Simple animation classes
  const containerClasses = "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2";
  const pillClasses = "bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg border border-white/10 hover:bg-black/80 transition-all cursor-pointer flex items-center gap-2 select-none";
  const optionsClasses = `bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 origin-bottom-right ${
    isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
  }`;

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={containerClasses}>
      {/* Options Menu */}
      <div className={optionsClasses}>
         <div className="flex flex-col p-1">
            <button 
               onClick={() => { setLanguage("pt"); setIsOpen(false); }}
               className={`px-4 py-2 text-sm text-left hover:bg-white/10 rounded-lg transition-colors ${language === "pt" ? "text-emerald-400 font-bold" : "text-gray-300"}`}
            >
               PT - Português
            </button>
            <button 
               onClick={() => { setLanguage("en"); setIsOpen(false); }}
               className={`px-4 py-2 text-sm text-left hover:bg-white/10 rounded-lg transition-colors ${language === "en" ? "text-emerald-400 font-bold" : "text-gray-300"}`}
            >
               EN - English
            </button>
             <button 
               onClick={() => { setLanguage("es"); setIsOpen(false); }}
               className={`px-4 py-2 text-sm text-left hover:bg-white/10 rounded-lg transition-colors ${language === "es" ? "text-emerald-400 font-bold" : "text-gray-300"}`}
            >
               ES - Español
            </button>
         </div>
      </div>

      {/* Main Pill */}
      <button onClick={toggle} className={pillClasses}>
        <Globe className="w-4 h-4" />
        <span className="text-xs font-mono font-medium">{language.toUpperCase()}</span>
      </button>
    </div>
  );
}
