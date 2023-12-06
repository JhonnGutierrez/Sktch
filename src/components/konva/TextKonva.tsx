import { TextItem } from "@/types/storeTypes";
import Konva from "konva";
import { useEffect, useRef } from "react";
import { Text } from "react-konva";
import Transformer from "./Transformer";
import { getTextSizes } from "@/lib/konvaUtils";
import { useCanvasStore } from "@/store/CanvaStore";
import TextEditor from "./TextEditor";
import { Html } from "react-konva-utils";
import { createPortal } from "react-dom";
import { useSelectedStore } from "@/store/SelectedStore";

type Props = {
  text: TextItem;
  onChange: (newAttrs: TextItem) => void;
};
const TextKonva = ({ text, onChange }: Props) => {
  if (!text.content) {
    return null;
  }
  const shapeRef = useRef<Konva.Text>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const { canvasScale, stageRef, containerRef } = useCanvasStore();
  const { selectedId, setSelected, clearSelected } = useSelectedStore();

  const isSelected = text.id === selectedId;
  const onSelect = () => {
    setSelected(text.id);
  };

  useEffect(() => {
    if (shapeRef.current) {
      const { width } = getTextSizes(20, "Arial", text.content);

      const rows = (shapeRef.current.text().match(/\n/g) || []).length + 1 || 1;
      const height = rows * shapeRef.current.fontSize();

      onChange({
        ...text,
        width: width / canvasScale[0],
        height: height,
      });
    }
  }, []);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      if (shapeRef.current) {
        trRef.current?.nodes([shapeRef.current]);
        trRef.current?.getLayer()?.batchDraw();
      }
    }
  }, [isSelected]);
  return (
    <>
      <Text
        ref={shapeRef}
        text={text.content}
        x={text.x || 0}
        y={text.y || 0}
        width={text.width}
        height={text.height}
        rotation={text.rotation || 0}
        fontSize={(text.fontSize || 20) / canvasScale[0]}
        fontFamily={text.fontFamily}
        draggable={true}
        wrap="none"
        opacity={isSelected ? 0 : 1}
        onDblClick={() => {
          onSelect();
        }}
        onDblTap={() => {
          onSelect();
        }}
        // onDblClick={handleOpenTextEditor}
        // onDblTap={handleOpenTextEditor}
        onDragEnd={(e) => {
          onChange({
            ...text,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransform={() => {
          const node = shapeRef.current;
          if (node) {
            const scaleX = node.scaleX();

            node.setAttrs({
              width: node.width() * scaleX,
              rotation: node.rotation(),
              scaleX: 1,
              scaleY: 1,
            });
          }
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);

            onChange({
              ...text,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: node.width() * scaleX,
              height: node.height() * scaleY,
              rotation: node.rotation(),
            });
          }
        }}
      />
      <Transformer
        isSelected={isSelected}
        trRef={trRef}
        padding={6}
        enabledAnchors={["middle-left", "middle-right"]}
      />
      <Html>
        {isSelected &&
          containerRef.current &&
          shapeRef.current &&
          stageRef.current &&
          createPortal(
            <TextEditor
              areaPosition={{
                x:
                  stageRef.current.container().offsetLeft +
                  shapeRef.current.absolutePosition().x,
                y:
                  stageRef.current.container().offsetTop +
                  shapeRef.current.absolutePosition().y,
              }}
              shapeNode={shapeRef.current}
              scale={canvasScale}
              removeTextarea={() => clearSelected()}
              onEnd={(value, sizes) =>
                onChange({
                  ...text,
                  content: value,
                  width: sizes[0],
                  height: sizes[1],
                })
              }
            />,
            containerRef.current,
          )}
      </Html>
    </>
  );
};

export default TextKonva;
