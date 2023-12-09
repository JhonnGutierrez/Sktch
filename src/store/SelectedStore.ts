import type { Item } from "@/types/storeTypes";
import { create } from "zustand";

type useSelectedStore = {
  selectedId: Item["id"] | null;
  setSelected: (id: Item["id"] | null) => void;
  clearSelected: () => void;
};

export const useSelectedStore = create<useSelectedStore>()((set) => ({
  selectedId: null,
  setSelected: (id) => set({ selectedId: id }),
  clearSelected: () => set({ selectedId: null }),
}));
