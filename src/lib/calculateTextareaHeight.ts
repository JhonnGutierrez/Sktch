const HIDDEN_TEXTAREA_STYLE = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0",
} as const;

const forceHiddenStyles = (node: HTMLElement) => {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach((key) => {
    node.style.setProperty(
      key,
      HIDDEN_TEXTAREA_STYLE[key as keyof typeof HIDDEN_TEXTAREA_STYLE],
      "important",
    );
  });
};

let hiddenTextarea: HTMLTextAreaElement | null = null;

export function calculateTextareaHeight(
  value: string,
  fontSize: number,
  width: number,
  minRows = 1,
  maxRows = Infinity,
) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tabindex", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    forceHiddenStyles(hiddenTextarea);
  }

  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }

  forceHiddenStyles(hiddenTextarea);
  hiddenTextarea.style.width = width + "px";

  hiddenTextarea.value = value;
  let height = hiddenTextarea.scrollHeight;
  // Double set and calc due to Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1795904
  hiddenTextarea.value = value;
  height = hiddenTextarea.scrollHeight;

  // measure height of a textarea with a single row

  const minHeight = fontSize * minRows;
  height = Math.max(minHeight, height);

  const maxHeight = fontSize * maxRows;
  height = Math.min(maxHeight, height);

  return height;
}
