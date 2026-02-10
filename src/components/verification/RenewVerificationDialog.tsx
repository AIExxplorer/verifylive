"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { resetVerification } from "@/app/actions/resetVerification";

interface RenewVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RenewVerificationDialog({ isOpen, onClose }: RenewVerificationDialogProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = await resetVerification();
      if (result.success) {
          toast.success("Verificação renovada com sucesso!");
          // Wait a bit for revalidation/redirect
          window.location.reload(); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao renovar verificação.");
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-background border border-border w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-200">
        
        <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mb-2">
                <AlertTriangle size={32} />
            </div>
            <h2 className="text-xl font-bold">{t.dashboard.renew_confirm_title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
                {t.dashboard.renew_confirm_desc}
            </p>
        </div>

        <div className="flex gap-3 justify-end pt-2">
           <button 
             onClick={onClose}
             disabled={isLoading}
             className="flex-1 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 rounded-xl transition-colors disabled:opacity-50"
           >
             {t.dashboard.renew_confirm_cancel}
           </button>
           <button 
             onClick={handleConfirm}
             disabled={isLoading}
             className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
           >
             {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
             {t.dashboard.renew_confirm_confirm}
           </button>
        </div>

      </div>
    </div>
  );
}
