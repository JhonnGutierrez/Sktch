import { Transformer as KonvaTransformer } from "react-konva";
import { Portal } from "react-konva-utils";
import Konva from "konva";
import { rotationSnaps } from "@/lib/konvaUtils";

type TransformerProps = {
  isSelected: boolean;
  trRef: React.RefObject<Konva.Transformer>;
  enabledAnchors?: string[];
  padding?: number;
};

const Transformer = ({
  isSelected,
  trRef,
  enabledAnchors,
  padding = 0,
}: TransformerProps) => {
  return (
    isSelected && (
      <Portal selector=".top-layer" enabled={true}>
        <KonvaTransformer
          enabledAnchors={enabledAnchors}
          ref={trRef}
          padding={padding}
          anchorStroke="black"
          anchorStrokeWidth={0.7}
          anchorFill="white"
          anchorSize={8}
          borderStrokeWidth={0.7}
          borderStroke="black"
          flipEnabled={true}
          rotationSnaps={rotationSnaps}
          rotateAnchorCursor={"move"}
          boundBoxFunc={(_oldBox, newBox) => {
            // limit resize
            newBox.width = Math.max(10, newBox.width);
            newBox.height = Math.max(10, newBox.height);

            return newBox;
          }}
        />
      </Portal>
    )
  );
};

export default Transformer;
