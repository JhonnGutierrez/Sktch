type LayerGeneric<Type> = {
  layerRef: React.RefObject<Konva.Layer>;
} & Type;

export type BlendMode =
  | "source-over"
  | "darken"
  | "multiply"
  | "color-burn"
  | "color-dodge"
  | "screen"
  | "overlay"
  | "lighten"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

export type NodeItem = {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  blendMode: BlendMode;
};

export type ImageItem = {
  type: "image";
  src: string | undefined;
} & NodeItem;

export type TextItem = {
  type: "text";
  content: string;
  fontFamily: string;
  fontSize: number;
} & NodeItem;

export type Item = ImageItem | TextItem;
type WithoutId<Type> = {
  [Property in keyof Type as Exclude<Property, "id">]: Type[Property];
};
export type ItemWithoutId = WithoutId<Item>;
export type ItemsLayer = LayerGeneric<{ items: Item[] }>;
export type PaperLayer = LayerGeneric<{ backgroundSrc: string }>;
