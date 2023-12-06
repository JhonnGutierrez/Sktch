import { useEffect } from "react";

export type OnResizeEvent = {
  CR: DOMRectReadOnly;
  ET: Element;
};
type Props = {
  node: HTMLElement | null;
  onResize: (e: OnResizeEvent) => void;
};
export function useResizeObserver({ node, onResize }: Props) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { contentRect, target } = entry;
      onResize({ CR: contentRect, ET: target });
    });

    if (node) {
      resizeObserver.observe(node);
    }

    return () => {
      if (node) {
        resizeObserver.unobserve(node);
      }
    };
  }, [onResize]);
}
