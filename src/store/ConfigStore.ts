import { create } from "zustand";

type Store = {
  showLayers: boolean;
  setShowLayers: (state: boolean) => void;
  toogleShowLayeres: () => void;
};

export const useConfigStore = create<Store>()((set) => ({
  showLayers: false,
  setShowLayers(newState) {
    set({ showLayers: newState });
  },
  toogleShowLayeres: () => set((state) => ({ showLayers: !state.showLayers })),
}));
