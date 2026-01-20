import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export class FaceMeshService {
  private static instance: FaceMeshService;
  private faceLandmarker: FaceLandmarker | null = null;

  private constructor() {}

  public static getInstance(): FaceMeshService {
    if (!FaceMeshService.instance) {
      FaceMeshService.instance = new FaceMeshService();
    }
    return FaceMeshService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.faceLandmarker) return;

    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );

    this.faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      outputFacialTransformationMatrixes: true,
      runningMode: "VIDEO",
      numFaces: 1
    });
  }

  public getLandmarker(): FaceLandmarker | null {
    return this.faceLandmarker;
  }
}
