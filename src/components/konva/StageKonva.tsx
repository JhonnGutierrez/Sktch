import usePasteNodes from "@/hooks/usePasteNodes";
import { useEffect } from "react";
import { Layer, Rect, Stage } from "react-konva";
import ImageKonva from "./ImageKonva";
import { useCanvasStore } from "@/store/CanvaStore";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";
import { useSelectedStore } from "@/store/SelectedStore";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import TextKonva from "./TextKonva";

const StageKonva = () => {
  const {
    stageRef,
    canvasDimensions,
    setDimensions,
    canvasScale,
    setScale,
    containerRef,
  } = useCanvasStore();
  const { items, layerRef, updateItem } = useItemsLayerStore();
  // const [selectedId, selectShape] = useState<string | null>(null);
  const { selectedId, setSelected, clearSelected } = useSelectedStore();

  useKeyboardShortcuts();
  usePasteNodes();

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setDimensions([width, height]);
    }

    setScale();
  }, []);

  // @ts-expect-error event type
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      clearSelected();
    }
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden aspect-[6/4] h-[calc(100vh-4rem)] max-h-full min-w-full  relative rounded-md"
    >
      <Stage
        width={canvasDimensions[0]}
        height={canvasDimensions[1]}
        scaleX={canvasScale[0]}
        scaleY={canvasScale[1]}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        ref={stageRef}
      >
        {/* Paper background Layer */}
        <Layer>
          <Rect
            listening={false}
            x={0}
            y={0}
            width={canvasDimensions[0]}
            height={canvasDimensions[1]}
            scaleX={6000 / canvasDimensions[0]}
            scaleY={4000 / canvasDimensions[1]}
            fill="#ffffff"
          />
        </Layer>
        {/* Items Layer*/}
        <Layer listening={true} opacity={1} ref={layerRef}>
          {items.map((item) => {
            switch (item.type) {
              case "image":
                return (
                  <ImageKonva
                    image={item}
                    key={item.id}
                    isSelected={item.id === selectedId}
                    onSelect={() => {
                      setSelected(item.id);
                    }}
                    onChange={(newAttrs) => updateItem(newAttrs, item.id)}
                  />
                );
                break;
              case "text":
                return (
                  <TextKonva
                    text={item}
                    key={item.id}
                    onChange={(newAttrs) => updateItem(newAttrs, item.id)}
                  />
                );
                break;
              default:
                return null;
                break;
            }
          })}
        </Layer>
        {/* Details Layer */}
        <Layer></Layer>
        {/* Overlay Layer */}
        <Layer name="top-layer" />
      </Stage>
      <hr className="border-r border-dashed border-cyan-500 absolute h-full left-[50%] top-0 bottom-0" />
    </div>
  );
};

export default StageKonva;
