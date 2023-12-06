export const rotationSnaps = (() => {
  const degrees = 45;
  const count = 360 / degrees;

  return [...Array(count)].map((_, i) => i * degrees);
})();

export function downloadCanvas(uri: string, name: string) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getTextSizes(
  fontSize: number,
  fontFamily: string,
  textContent: string,
) {
  const textElement = document.createElement("p");
  document.body.appendChild(textElement);

  textElement.style.font = fontFamily;
  textElement.style.fontSize = fontSize + "px";
  textElement.style.height = "auto";
  textElement.style.width = "auto";
  textElement.style.position = "absolute";
  textElement.style.whiteSpace = "no-wrap";
  textElement.style.top = -fontSize - 20 + "px";

  textElement.innerHTML = textContent.replaceAll("\n", "<br />");

  const width = Math.ceil(textElement.clientWidth) + 20;
  const height = Math.ceil(textElement.clientHeight) + 20;
  document.body.removeChild(textElement);

  return { width, height };
}
