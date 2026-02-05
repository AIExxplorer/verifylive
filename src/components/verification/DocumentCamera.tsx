"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Camera, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentCameraProps {
  usage: "FRONT" | "BACK"; // Which side are we capturing?
  onCapture: (blob: Blob) => void;
  onBack: () => void;
}

export function DocumentCamera({ usage, onCapture, onBack }: DocumentCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { t } = useLanguage();

  // Initialize Camera (High Res for Text)
  useEffect(() => {
    let mounted = true;

    async function startCamera() {
      try {
        const constraints = {
          video: {
            facingMode: "environment", // Rear camera preferred for docs
            width: { ideal: 1920 },    // Higher res than face liveness
            height: { ideal: 1080 },
            focusMode: "continuous",   // Critical for text clarity
          } as MediaTrackConstraints,
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
             videoRef.current?.play().catch(console.error);
             setIsReady(true);
          };
          setStream(mediaStream);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        toast.error(`${t.common.error} - Camera Access`);
      }
    }

    startCamera();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Match resolution exactly
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw full frame
    ctx.drawImage(video, 0, 0);

    // Convert to Blob
    canvas.toBlob((blob) => {
      if (blob) {
         onCapture(blob); // Pass blob up to parent
         // Stop stream to save battery/resources
         stream?.getTracks().forEach(t => t.stop());
      } else {
         toast.error(t.common.error);
      }
    }, "image/jpeg", 0.95); // High quality JPEG

  }, [onCapture, stream, t.common.error]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Header overlay */}
      <div className="absolute top-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-center text-white">
        <button onClick={onBack} className="text-sm font-medium opacity-80 hover:opacity-100">
           {t.upload.back_button}
        </button>
        <div className="text-center">
           <h3 className="font-bold text-lg">
             {usage === "FRONT" ? t.upload.front_side : t.upload.back_side}
           </h3>
           <p className="text-xs opacity-70">{t.upload.position_doc}</p>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Main Viewport */}
      <div className="relative w-full h-full flex items-center justify-center bg-zinc-900">
         <video 
           ref={videoRef}
           className="absolute inset-0 w-full h-full object-contain"
           playsInline 
           muted 
           autoPlay
         />
         
         {/* Guide Overlay (Card Shape) */}
         <div className="absolute w-[85%] aspect-[1.586/1] border-2 border-white/50 rounded-lg shadow-[0_0_0_100vh_rgba(0,0,0,0.5)] pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500 rounded-br-lg"></div>
         </div>

         {/* Helper message */}
         {!isReady && (
            <div className="absolute text-white/50 flex flex-col items-center animate-pulse">
               <RefreshCw className="animate-spin mb-2" />
               <span className="text-xs">{t.upload.starting_camera}</span>
            </div>
         )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-center pb-8 z-10">
         <button 
           onClick={capturePhoto}
           disabled={!isReady}
           className="group relative flex items-center justify-center"
         >
           <div className="w-20 h-20 rounded-full border-4 border-white/30 group-active:scale-95 transition-all"></div>
           <div className="absolute w-16 h-16 bg-white rounded-full group-hover:bg-emerald-400 transition-colors"></div>
           <Camera className="absolute text-black/50 w-8 h-8 group-hover:text-black/80" />
         </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
