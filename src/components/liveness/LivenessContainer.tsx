"use client";

import { useState } from "react";
import { CameraFeed } from "./CameraFeed";
import { ComplianceModal } from "../compliance/ComplianceModal";
import { DocumentSelector, DocumentType } from "../verification/DocumentSelector";
import { DocumentCamera } from "../verification/DocumentCamera";
import { toast } from "sonner";

export function LivenessContainer() {
  const [step, setStep] = useState<
    "COMPLIANCE" | "DOC_SELECT" | "DOC_FRONT" | "DOC_BACK" | "LIVENESS_INTRO" | "LIVENESS_ACTIVE" | "ANALYZING" | "RESULT"
  >("COMPLIANCE");

  const [documentType, setDocumentType] = useState<DocumentType | null>(null);
  const [docFront, setDocFront] = useState<Blob | null>(null);
  const [docBack, setDocBack] = useState<Blob | null>(null);

  // 1. Compliance Accepted
  const handleComplianceAccept = () => {
    setStep("DOC_SELECT");
  };

  // 2. Document Selected
  const handleDocSelect = (type: DocumentType) => {
    setDocumentType(type);
    setStep("DOC_FRONT");
  };

  // 3. Document Captures
  const handleFrontCapture = (blob: Blob) => {
    setDocFront(blob);
    toast.success("Frente capturada com sucesso!");
    setStep("DOC_BACK");
  };

  const handleBackCapture = (blob: Blob) => {
    setDocBack(blob);
    toast.success("Verso capturado com sucesso!");
    // Here we would upload to storage in background
    setTimeout(() => setStep("LIVENESS_INTRO"), 500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-8">
      
      {/* Step 0: Compliance Modal */}
      {step === "COMPLIANCE" && (
        <ComplianceModal 
          onAccept={handleComplianceAccept}
          onDecline={() => toast.error("A verificação não pode prosseguir sem consentimento.")}
        />
      )}

      {/* Step 1: Select Document Type */}
      {step === "DOC_SELECT" && (
        <div className="py-12">
           <DocumentSelector onSelect={handleDocSelect} />
        </div>
      )}

      {/* Step 2: Capture Documents */}
      {step === "DOC_FRONT" && (
        <DocumentCamera 
          usage="FRONT"
          onCapture={handleFrontCapture}
          onBack={() => setStep("DOC_SELECT")}
        />
      )}

      {step === "DOC_BACK" && (
        <DocumentCamera 
          usage="BACK"
          onCapture={handleBackCapture}
          onBack={() => setStep("DOC_FRONT")} // Allow retaking front
        />
      )}

      {/* Step 3: Liveness Intro (Transition) */}
      {step === "LIVENESS_INTRO" && (
        <div className="text-center py-20 px-6 space-y-6 animate-in fade-in slide-in-from-bottom-8">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
               <span className="text-4xl">😊</span>
            </div>
            <h2 className="text-2xl font-bold">Tudo pronto para a selfie!</h2>
            <p className="text-muted-foreground">
               Agora vamos verificar se você é você mesmo.<br/>
               Siga as instruções de movimento na tela.
            </p>
            <button 
              onClick={() => setStep("LIVENESS_ACTIVE")}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
            >
              Iniciar Verificação Facial
            </button>
        </div>
      )}

      {/* Step 4: Original Camera Feed (Liveness) */}
      {step === "LIVENESS_ACTIVE" && (
        <CameraFeed />
      )}
      
    </div>
  );
}
