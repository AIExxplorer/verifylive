"use client";

import { ComplianceModal } from "@/components/compliance/ComplianceModal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CompliancePage() {
  const router = useRouter();

  const handleAccept = () => {
    toast.success("Terms accepted!");
    // TODO: Mark terms as accepted in DB and redirect to verification
    router.push("/dashboard"); 
  };

  const handleDecline = () => {
    toast.error("You must accept the terms to continue.");
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <ComplianceModal onAccept={handleAccept} onDecline={handleDecline} />
    </div>
  );
}
