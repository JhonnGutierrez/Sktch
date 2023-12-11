import { OnResizeEvent, useResizeObserver } from "@/hooks/useResizeObserver";
import { TextItem } from "@/types/storeTypes";
import Konva from "konva";
import { useEffect, useRef, useState } from "react";

type Props = {
  shapeNode: Konva.Text;
  areaPosition: {
    x: number;
    y: number;
  };
  scale: [number, number];
  text: TextItem;
  onChange: (newAttrs: TextItem) => void;
  removeTextarea: () => void;
};

const TextEditor = ({
  shapeNode,
  areaPosition,
  scale,
  removeTextarea,
  onChange,
  text,
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [transform, setTransform] = useState("");
  const [value, setValue] = useState(shapeNode.text());
  const [textareaRows, setTextareaRows] = useState(1);

  const textarea = textAreaRef.current;

  useEffect(() => {
    // Apply node rotation
    // Todo: Fix reposition when node is roteted
    const rotation = shapeNode.rotation();
    if (rotation) {
      setTransform((state) => (state += " rotateZ(" + rotation + "deg)"));
    }

    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    let px = 0;
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    if (isFirefox) {
      px += 2 + Math.round(shapeNode.fontSize() / 20);
    }

    setTransform((state) => (state += `translateY(-${px}px)`));

    const rows = (value.match(/\n/g) || []).length + 1 || 1;
    setTextareaRows(rows);
  }, []);

  useEffect(() => {
    return () => {
      onChange({
        ...text,
        fontFamily: shapeNode.fontFamily(),
        // @ts-expect-error blendMode types
        blendMode: shapeNode.globalCompositeOperation(),
        content: value,
        width: shapeNode.width(),
        height: shapeNode.height(),
      });
    };
  }, [value, shapeNode]);

  function onResize(e: OnResizeEvent) {
    shapeNode.width(e.CR.width / scale[0]);
    shapeNode.height(e.CR.height / scale[1]);
  }

  useResizeObserver({
    node: textarea,
    onResize,
  });

  return (
    <textarea
      ref={textAreaRef}
      rows={textareaRows}
      className="absolute border-none [box-sizing:content-box] m-0 bg-white overflow-hidden whitespace-pre bg-none outline-none resize-none h-auto border border-border "
      onKeyDown={(e) => {
        if (textarea) {
          if (e.code === "Enter" && !e.shiftKey) {
            removeTextarea();
          }
          if (e.code === "Escape") {
            removeTextarea();
          }
        }
      }}
      onKeyUp={() => {
        if (textarea) {
          const rows = (value.match(/\n/g) || []).length + 1 || 1;
          setTextareaRows(rows);
          shapeNode.height(rows * (shapeNode.fontSize() + 10));
        }
      }}
      style={{
        left: areaPosition.x - 4 + "px",
        top: areaPosition.y - 1 - 4 + "px",
        width: shapeNode.width() * scale[0] + "px",
        height: "auto",
        padding: 4 + "px",
        fontSize: shapeNode.fontSize() * scale[0] + "px",
        lineHeight: shapeNode.lineHeight(),
        fontFamily: shapeNode.fontFamily(),
        transformOrigin: "left center",
        // @ts-expect-error TextNode.align() return type is given trubbles
        textAlign: shapeNode.align() || "start",
        color: shapeNode.fill(),
        overflowWrap: "normal",
        transform,
      }}
      // @ts-expect-error onResize types
      onResize={onResize}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default TextEditor;
