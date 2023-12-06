import { useEffect } from "react";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";
import { useCanvasStore } from "@/store/CanvaStore";
import { useSelectedStore } from "@/store/SelectedStore";

export default function useKeyboardShortcuts() {
  const deleteItem = useItemsLayerStore((state) => state.deleteItem);
  const selectedId = useSelectedStore((state) => state.selectedId);
  const stageRef = useCanvasStore((state) => state.stageRef);
  const { undo, redo } = useItemsLayerStore();
  useEffect(() => {
    const handleKeyboardDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "Delete":
          if (selectedId) {
            deleteItem(selectedId);
          }
          break;
        case "KeyZ":
          if (e.ctrlKey && !e.shiftKey) {
            undo();
            break;
          }
          if (e.ctrlKey && e.shiftKey) {
            redo();
            break;
          }
          break;
        default:
          // console.log(e.code);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyboardDown, false);

    return () =>
      window.removeEventListener("keydown", handleKeyboardDown, false);
  }, [stageRef, deleteItem, selectedId]);
}
