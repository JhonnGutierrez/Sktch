import Konva from "konva";
import { createRef } from "react";
import { create } from "zustand";

type Store = {
  stageRef: React.RefObject<Konva.Stage>;
  containerRef: React.RefObject<HTMLDivElement>;
  canvasDimensions: [number, number];
  canvasScale: [number, number];
  CanvasResolution: [number, number];
  setDimensions: (dimension: Store["canvasDimensions"]) => void;
  setScale: () => void;
};

export const useCanvasStore = create<Store>()((set) => ({
  stageRef: createRef(),
  containerRef: createRef(),
  canvasDimensions: [0, 0],
  CanvasResolution: [6000, 4000],
  canvasScale: [1, 1],
  setDimensions: (dimension) => set({ canvasDimensions: dimension }),
  setScale: () =>
    set((state) => ({
      canvasScale: [
        state.canvasDimensions[0] / state.CanvasResolution[0],
        state.canvasDimensions[1] / state.CanvasResolution[1],
      ],
    })),
}));
