"use client";

import { IdCard, Globe, FileText, Camera, Upload } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export type DocumentType = "CNH" | "RG" | "PASSPORT";
export type SubmissionMethod = "CAMERA" | "PDF";

interface DocumentSelectorProps {
  onSelect: (type: DocumentType, method: SubmissionMethod) => void;
}

export function DocumentSelector({ onSelect }: DocumentSelectorProps) {
  const [selectedDoc, setSelectedDoc] = useState<DocumentType | null>(null);
  const { t } = useLanguage();

  // If a doc type is selected, show method choice (Camera vs PDF)
  if (selectedDoc) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-2">
           <button onClick={() => setSelectedDoc(null)} className="text-xs text-muted-foreground hover:text-foreground mb-2">
             ← {t.upload.back_button}
           </button>
           <h2 className="text-2xl font-bold">{t.upload.how_to_submit}</h2>
           <p className="text-sm text-muted-foreground">
             {selectedDoc === "CNH" ? t.upload.doc_cnh : selectedDoc === "RG" ? t.upload.doc_rg : t.upload.doc_passport}
           </p>
        </div>

        <div className="grid gap-4">
           {/* Option 1: Live Camera */}
           <button
             onClick={() => onSelect(selectedDoc, "CAMERA")}
             className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all border-l-4 border-l-emerald-500"
           >
             <div className="bg-emerald-500/10 p-3 rounded-full">
               <Camera className="w-6 h-6 text-emerald-600" />
             </div>
             <div className="text-left">
               <div className="font-semibold">{t.upload.camera_option}</div>
               <div className="text-xs text-muted-foreground">{t.upload.use_camera_desc}</div>
             </div>
           </button>

           {/* Option 2: PDF Upload */}
           <button
             onClick={() => onSelect(selectedDoc, "PDF")}
             className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all border-l-4 border-l-blue-500"
           >
             <div className="bg-blue-500/10 p-3 rounded-full">
               <Upload className="w-6 h-6 text-blue-600" />
             </div>
             <div className="text-left">
               <div className="font-semibold">{t.upload.upload_option}</div>
               <div className="text-xs text-muted-foreground">{t.upload.upload_pdf_desc}</div>
             </div>
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{t.upload.which_doc}</h2>
        <p className="text-muted-foreground text-sm">
          {t.upload.select_document}
        </p>
      </div>

      <div className="grid gap-4">
        <button
          onClick={() => setSelectedDoc("CNH")}
          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all hover:scale-[1.02] active:scale-95 group text-left"
        >
          <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors">
            <IdCard className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="font-semibold">{t.upload.doc_cnh}</div>
            <div className="text-xs text-muted-foreground">{t.upload.doc_cnh}</div>
          </div>
        </button>

        <button
          onClick={() => setSelectedDoc("RG")}
          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all hover:scale-[1.02] active:scale-95 group text-left"
        >
          <div className="bg-green-500/10 p-3 rounded-lg group-hover:bg-green-500/20 transition-colors">
            <FileText className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <div className="font-semibold">{t.upload.doc_rg}</div>
            <div className="text-xs text-muted-foreground">{t.upload.doc_rg}</div>
          </div>
        </button>

        <button
          onClick={() => setSelectedDoc("PASSPORT")}
          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all hover:scale-[1.02] active:scale-95 group text-left"
        >
          <div className="bg-purple-500/10 p-3 rounded-lg group-hover:bg-purple-500/20 transition-colors">
            <Globe className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <div className="font-semibold">{t.upload.doc_passport}</div>
            <div className="text-xs text-muted-foreground">{t.upload.doc_passport}</div>
          </div>
        </button>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-[11px] text-amber-600 flex gap-2 items-start">
        <span className="mt-0.5">⚠️</span>
        <p>
          {t.upload.warning_original}
        </p>
      </div>
    </div>
  );
}
