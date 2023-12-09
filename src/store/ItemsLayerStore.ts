import { Item, ItemWithoutId, ItemsLayer } from "@/types/storeTypes";
import { createRef } from "react";
import { create } from "zustand";

type ItemsLayerStore = {
  addItem: (item: ItemWithoutId) => void;
  setItems: (items: Item[]) => void;
  updateItem: (newAttrs: Item, id: string) => void;
  deleteItem: (itemId: string) => void;
  undo: () => void;
  redo: () => void;
} & ItemsLayer;

let history: Item[][] = [[]];
let historyStep: number = 0;

export const useItemsLayerStore = create<ItemsLayerStore>()((set) => ({
  layerRef: createRef(),
  items: [],
  addItem: (item) => {
    set((state) => ({
      items: state.items.concat([
        {
          ...item,
          id: `item-${state.items.length}${Math.floor(Math.random() * 100)}`,
        },
      ]),
    }));
  },
  updateItem: (newAttrs, id) => {
    set((state) => {
      const itemsCopy = state.items.slice();
      const index = itemsCopy.findIndex((i) => i.id === id);
      itemsCopy[index] = newAttrs;

      history = history.slice(0, historyStep + 1);
      if (
        !(JSON.stringify(history[historyStep]) == JSON.stringify(itemsCopy))
      ) {
        history = history.concat([itemsCopy]);
        historyStep += 1;
      }
      return { items: itemsCopy };
    });
  },
  setItems: (items) => set({ items }),
  deleteItem: (itemId) => {
    set((state) => {
      const itemsCopy = state.items.slice();
      return { items: itemsCopy.filter((i) => i.id !== itemId) };
    });
  },
  redo: () => {
    if (historyStep === history.length - 1) {
      return null;
    }
    historyStep += 1;
    const next = history[historyStep];
    set(() => ({ items: next }));
  },
  undo: () => {
    if (historyStep === 0) {
      return null;
    }

    historyStep -= 1;
    const previous = history[historyStep];
    set(() => ({ items: previous }));
  },
}));
