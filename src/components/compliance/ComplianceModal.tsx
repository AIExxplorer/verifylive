"use client";

import { ShieldCheck, Lock, Clock, FileText } from "lucide-react";
import { useState } from "react";

interface ComplianceModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function ComplianceModal({ onAccept, onDecline }: ComplianceModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-lg rounded-xl border border-border shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-primary/5 p-6 border-b border-border flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-xl font-bold text-foreground">Verificação de Identidade</h2>
            <p className="text-xs text-muted-foreground">Conformidade LGPD & Anti-Fraude</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-foreground/80 leading-relaxed">
            Para sua segurança e conformidade com a legislação vigente (LGPD/Lei Felca), 
            precisamos realizar uma verificação biométrica e documental.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3 items-start">
               <div className="mt-1 bg-chart-1/10 p-2 rounded-lg text-chart-1">
                 <Lock size={18} />
               </div>
               <div>
                 <h3 className="text-sm font-semibold text-foreground">Privacidade Absoluta</h3>
                 <p className="text-xs text-muted-foreground">
                   Seus dados são criptografados e usados **exclusivamente** para autenticação.
                 </p>
               </div>
            </div>

            <div className="flex gap-3 items-start">
               <div className="mt-1 bg-chart-2/10 p-2 rounded-lg text-chart-2">
                 <Clock size={18} />
               </div>
               <div>
                 <h3 className="text-sm font-semibold text-foreground">Armazenamento Temporário</h3>
                 <p className="text-xs text-muted-foreground">
                   Fotos e documentos são deletados automaticamente após 24 horas (TTL).
                 </p>
               </div>
            </div>

            <div className="flex gap-3 items-start">
               <div className="mt-1 bg-chart-5/10 p-2 rounded-lg text-chart-5">
                 <FileText size={18} />
               </div>
               <div>
                 <h3 className="text-sm font-semibold text-foreground">Validação Documental</h3>
                 <p className="text-xs text-muted-foreground">
                   Cruzamos sua biometria com o documento oficial para prevenir fraudes (Deepfakes/Injeção).
                 </p>
               </div>
            </div>
          </div>
          
          <div className="bg-muted match-braces p-3 rounded-md border border-border text-[10px] text-muted-foreground font-mono">
            Ao continuar, você autoriza o processamento biométrico conforme nossos Termos de Uso e Política de Privacidade.
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/50 flex gap-3 justify-end">
          <button 
            onClick={onDecline}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => { setIsOpen(false); onAccept(); }}
            className="px-6 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20"
          >
            Concordar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
