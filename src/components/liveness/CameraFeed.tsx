"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { FaceMeshService } from "@/lib/liveness/FaceMeshService";
import { drawFaceMesh } from "@/lib/liveness/drawingUtils";

export interface CameraFeedRef {
    captureFrame: () => string | null;
}

interface CameraFeedProps {
    className?: string;
}

export const CameraFeed = forwardRef<CameraFeedRef, CameraFeedProps>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    captureFrame: () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                return canvas.toDataURL("image/jpeg", 0.9);
            }
        }
        return null;
    }
  }));

  useEffect(() => {
    let isActive = true;
    let frameId: number;

    const init = async () => {
        try {
            // 1. Setup Camera
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 1280, height: 720 }, // Standard 720p
                audio: false 
            });
            
            if (!isActive) return;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.addEventListener("loadeddata", predictWebcam);
            }

            // 2. Setup Face Mesh
            const service = FaceMeshService.getInstance();
            await service.initialize();

        } catch (err) {
            console.error(err);
            setError("Camera failed to initialize.");
        }
    };

    const predictWebcam = async () => {
        if (!isActive || !videoRef.current || !canvasRef.current) return;
        
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const landmarker = FaceMeshService.getInstance().getLandmarker();

        if (landmarker && video.currentTime > 0 && !video.paused) {
             // Resize canvas to match video
             if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
                 canvas.width = video.videoWidth;
                 canvas.height = video.videoHeight;
             }
             
             const results = landmarker.detectForVideo(video, performance.now());
             if (results) {
                 const ctx = canvas.getContext("2d");
                 if (ctx) drawFaceMesh(ctx, results);
             }
        }
        
        frameId = requestAnimationFrame(predictWebcam);
    };

    init();

    return () => {
        isActive = false;
        cancelAnimationFrame(frameId);
        if (videoRef.current && videoRef.current.srcObject) {
             (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
        }
    };
  }, []);

  return (
    <div className={`relative w-full h-full bg-black overflow-hidden ${props.className || ''}`}>
        {error && <div className="absolute inset-0 flex items-center justify-center text-red-500 z-50">{error}</div>}
        <video 
            ref={videoRef}
            autoPlay 
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" // Mirror effect + Cover
        />
        <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transform -scale-x-100" // Mirror match
        />
    </div>
  );
});

CameraFeed.displayName = "CameraFeed";
