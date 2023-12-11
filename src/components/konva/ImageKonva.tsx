import { Image } from "react-konva";
import useImage from "use-image";
import { useEffect, useRef } from "react";
import Konva from "konva";
import Transformer from "./Transformer";
import { ImageItem } from "@/types/storeTypes";

type ImageKonvaProps = {
  image: ImageItem;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: ImageItem) => void;
};
const ImageKonva = ({
  image,
  isSelected,
  onSelect,
  onChange,
}: ImageKonvaProps) => {
  if (!image.src) {
    return null;
  }

  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const [img, state] = useImage(image.src);

  useEffect(() => {
    onChange({
      ...image,
      width: img?.width,
      height: img?.height,
    });
  }, [state]);

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
      <Image
        image={img}
        x={image.x || 0}
        y={image.y || 0}
        // I will use offset to set origin to the center of the image
        // offsetX={img ? img.width / 2 : 0}
        // offsetY={img ? img.height / 2 : 0}
        width={image.width || 0}
        height={image.height || 0}
        rotation={image.rotation || 0}
        globalCompositeOperation={image.blendMode}
        onDblClick={onSelect}
        onDblTap={onSelect}
        ref={shapeRef}
        draggable={true}
        onDragEnd={(e) => {
          // console.log(image);
          onChange({
            ...image,
            // width: e.target.width(),
            // height: e.target.height(),
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
              ...image,
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
      <Transformer isSelected={isSelected} trRef={trRef} />
    </>
  );
};

export default ImageKonva;
