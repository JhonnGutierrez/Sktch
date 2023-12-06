import { OnResizeEvent, useResizeObserver } from "@/hooks/useResizeObserver";
import Konva from "konva";
import { useEffect, useRef, useState } from "react";

type Props = {
  shapeNode: Konva.Text;
  areaPosition: {
    x: number;
    y: number;
  };
  scale: [number, number];
  onEnd: (value: string, sizes: [number, number]) => void;
  removeTextarea: () => void;
};

const TextEditor = ({
  shapeNode,
  areaPosition,
  scale,
  removeTextarea,
  onEnd,
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textarea = textAreaRef.current;
  const [transform, setTransform] = useState("");
  const [value, setValue] = useState(shapeNode.text());
  const [textareaheight, setTextareaheight] = useState(1);
  let size: [number, number] = [shapeNode.width(), shapeNode.height()];
  // const [sizeState, setSizeState] = useState(size);
  const getSize = () => {
    console.log("size", size);
    return size;
  };

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
    setTextareaheight(rows);
  }, []);

  useEffect(() => {
    return () => {
      console.log(value, getSize());
      onEnd(value, getSize());
    };
  }, [value]);

  function onResize(e: OnResizeEvent) {
    // console.log(e);
    size = [e.CR.width / scale[0], size[1]];
    console.log("width", size[0]);
    shapeNode.width(size[0]);
    // setSizeState(size);
    // setSize((state) => [e.CR.width / scale[0], state[1]]);
  }
  useResizeObserver({
    node: textarea,
    onResize,
  });

  return (
    <textarea
      ref={textAreaRef}
      rows={textareaheight}
      className="absolute border-none [box-sizing:content-box] m-0 bg-white overflow-hidden bg-none outline-none resize-none h-auto border border-border "
      onKeyDown={(e) => {
        if (textarea) {
          // hide on enter
          // but don't hide on shift + enter
          if (e.code === "Enter" && !e.shiftKey) {
            removeTextarea();
          }
          // on esc do not set value back to node
          if (e.code === "Escape") {
            removeTextarea();
          }
          textarea.scrollTo({ left: 0, top: 0 });
        }
      }}
      onKeyUp={() => {
        if (textarea) {
          const rows = (value.match(/\n/g) || []).length + 1 || 1;
          setTextareaheight(rows);
          size = [size[0], rows * (shapeNode.fontSize() + 10)];
          // setSizeState(size);
          shapeNode.height(size[1]);
          textarea.scrollTo({ left: 0, top: 0 });
        }
      }}
      style={{
        left: areaPosition.x - 4 + "px",
        top: areaPosition.y - 1 - 4 + "px",
        height: "auto",
        width: shapeNode.width() * scale[0] + "px",
        padding: 4 + "px",
        fontSize: shapeNode.fontSize() * scale[0] + "px",
        lineHeight: shapeNode.lineHeight(),
        fontFamily: shapeNode.fontFamily(),
        transformOrigin: "left center",
        // @ts-expect-error TextNode.align() return type is given trubbles
        textAlign: shapeNode.align() || "start",
        color: shapeNode.fill(),
        whiteSpace: "pre",
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
