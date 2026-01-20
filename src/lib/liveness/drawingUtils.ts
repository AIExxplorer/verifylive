import { FaceLandmarkerResult } from "@mediapipe/tasks-vision";

export const drawFaceMesh = (
  ctx: CanvasRenderingContext2D,
  results: FaceLandmarkerResult
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (results.faceLandmarks) {
    for (const landmarks of results.faceLandmarks) {
      ctx.fillStyle = "#FF0000";
      
      for (const point of landmarks) {
        const x = point.x * ctx.canvas.width;
        const y = point.y * ctx.canvas.height;
        
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
};
