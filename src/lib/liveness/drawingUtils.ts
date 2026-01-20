import { FaceLandmarkerResult } from "@mediapipe/tasks-vision";

export const drawFaceMesh = (
  ctx: CanvasRenderingContext2D,
  results: FaceLandmarkerResult,
  mirror: boolean = false
) => {
  if (results.faceLandmarks) {
    for (const landmarks of results.faceLandmarks) {
      // Draw points
      ctx.fillStyle = "#FF0000";
      for (const point of landmarks) {
        const x = mirror ? (1 - point.x) * ctx.canvas.width : point.x * ctx.canvas.width;
        const y = point.y * ctx.canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
};
