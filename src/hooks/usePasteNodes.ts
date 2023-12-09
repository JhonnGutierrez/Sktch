import { useEffect } from "react";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";
import { useCanvasStore } from "@/store/CanvaStore";
import { useSelectedStore } from "@/store/SelectedStore";

export default function usePasteNodes() {
  const addItem = useItemsLayerStore((state) => state.addItem);
  const stageRef = useCanvasStore((state) => state.stageRef);
  const selectedId = useSelectedStore((state) => state.selectedId);

  useEffect(() => {
    const handlePaste = async () => {
      const data = await navigator.clipboard.read();

      if (data[0].types.includes("image/png")) {
        const blob = await data[0].getType("image/png");
        const imageUrl = URL.createObjectURL(blob);

        addItem({
          type: "image",
          x: 100,
          y: 100,
          width: undefined,
          height: undefined,
          src: imageUrl,
        });
      } else if (data[0].types.includes("text/plain")) {
        if (!selectedId) {
          const blob = await data[0].getType("text/plain");
          const textContent = await blob.text();

          addItem({
            type: "text",
            x: 100,
            y: 100,
            width: 200,
            content: textContent,
            fontFamily: "Roboto",
            fontSize: 20,
          });
        }
      } else {
        console.error("Copied type of file is not supported");
      }
    };

    window.addEventListener("paste", handlePaste, false);

    return () => window.removeEventListener("paste", handlePaste, false);
  }, [stageRef, addItem, selectedId]);
}
