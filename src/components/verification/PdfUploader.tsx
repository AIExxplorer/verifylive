"use client";

import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface PdfUploaderProps {
  onUpload: (file: File) => void;
  onBack: () => void;
}

export function PdfUploader({ onUpload, onBack }: PdfUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Basic Validation
      if (selectedFile.type !== "application/pdf") {
        toast.error("Apenas arquivos PDF são permitidos.");
        return;
      }
      
      if (selectedFile.size > 5 * 1024 * 1024) {
         toast.error("O arquivo deve ter no máximo 5MB.");
         return;
      }

      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleConfirm = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
         <button onClick={onBack} className="text-sm font-medium text-muted-foreground hover:text-foreground">
           ← Voltar
         </button>
         <h2 className="text-xl font-bold">Upload de PDF</h2>
         <div className="w-10"></div>
      </div>

      {!previewUrl ? (
        <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-10 flex flex-col items-center justify-center gap-4 bg-muted/20">
          <div className="bg-blue-500/10 p-4 rounded-full">
            <Upload className="w-8 h-8 text-blue-500" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">Clique para selecionar</p>
            <p className="text-xs text-muted-foreground mt-1">
              Apenas PDF Original (Gov.br / CNH Digital)
            </p>
          </div>
          <input 
            type="file" 
            accept="application/pdf"
            onChange={handleFileChange}
            className="absolute opacity-0 w-full h-full cursor-pointer inset-0"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative w-full aspect-[3/4] bg-zinc-900 rounded-lg overflow-hidden border border-border shadow-lg">
             <iframe 
               src={previewUrl} 
               className="w-full h-full object-contain" 
               title="PDF Preview"
             />
             <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs px-2 py-1 rounded-bl-lg flex items-center gap-1">
               <CheckCircle2 size={12} />
               Carregado
             </div>
          </div>
          
          <button 
            onClick={handleConfirm}
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:brightness-110 transition-all shadow-lg"
          >
            Confirmar Documento
          </button>
          
          <button 
            onClick={() => { setPreviewUrl(null); setFile(null); }}
            className="w-full py-2 text-sm text-destructive hover:underline"
          >
            Remover e Escolher Outro
          </button>
        </div>
      )}
    </div>
  );
}
