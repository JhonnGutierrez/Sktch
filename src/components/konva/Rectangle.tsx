import { useEffect, useRef } from "react";
import { Rect } from "react-konva";
import Konva from "konva";
import Transformer from "./Transformer";

type RectangleProps = {
  shapeProps: RectangleConfig;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: RectangleConfig) => void;
};

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: RectangleProps) => {
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

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
      <Rect
        {...shapeProps}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        draggable={isSelected}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);

            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: node.width() * scaleX,
              height: node.height() * scaleY,
            });
          }
        }}
      />
      <Transformer isSelected={isSelected} trRef={trRef} />
    </>
  );
};

export type RectangleConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
};

export default Rectangle;
