"use client";

import { IdCard, Globe, FileText } from "lucide-react";
import { useState } from "react";

export type DocumentType = "CNH" | "RG" | "PASSPORT";

interface DocumentSelectorProps {
  onSelect: (type: DocumentType) => void;
}

export function DocumentSelector({ onSelect }: DocumentSelectorProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Qual documento você vai usar?</h2>
        <p className="text-muted-foreground text-sm">
          Selecione o documento físico que você tem em mãos agora.
        </p>
      </div>

      <div className="grid gap-4">
        <button
          onClick={() => onSelect("CNH")}
          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all hover:scale-[1.02] active:scale-95 group text-left"
        >
          <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors">
            <IdCard className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="font-semibold">CNH Digital ou Física</div>
            <div className="text-xs text-muted-foreground">Carteira Nacional de Habilitação</div>
          </div>
        </button>

        <button
          onClick={() => onSelect("RG")}
          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all hover:scale-[1.02] active:scale-95 group text-left"
        >
          <div className="bg-green-500/10 p-3 rounded-lg group-hover:bg-green-500/20 transition-colors">
            <FileText className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <div className="font-semibold">RG (Identidade)</div>
            <div className="text-xs text-muted-foreground">Registro Geral (com foto recente)</div>
          </div>
        </button>

        <button
          onClick={() => onSelect("PASSPORT")}
          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all hover:scale-[1.02] active:scale-95 group text-left"
        >
          <div className="bg-purple-500/10 p-3 rounded-lg group-hover:bg-purple-500/20 transition-colors">
            <Globe className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <div className="font-semibold">Passaporte</div>
            <div className="text-xs text-muted-foreground">Válido para brasileiros e estrangeiros</div>
          </div>
        </button>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-[11px] text-amber-600 flex gap-2 items-start">
        <span className="mt-0.5">⚠️</span>
        <p>
          Aceitamos apenas documentos originais. Cópias, prints ou fotos de telas **não serão validadas**.
        </p>
      </div>
    </div>
  );
}
