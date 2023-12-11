import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";
import { useSelectedStore } from "@/store/SelectedStore";
import { BlendMode } from "@/types/storeTypes";
import { useEffect, useState } from "react";

export const blendModes: { value: BlendMode; name: string }[] = [
  { value: "source-over", name: "Normal" },
  { value: "darken", name: "Darken" },
  { value: "multiply", name: "Multiply" },
  { value: "color-burn", name: "Color Burn" },
  { value: "color-dodge", name: "Color Dodge" },
  { value: "screen", name: "Screen" },
  { value: "overlay", name: "Overlay" },
  { value: "lighten", name: "Lighten" },
  { value: "hard-light", name: "Hard Light" },
  { value: "soft-light", name: "Soft Light" },
  { value: "difference", name: "Difference" },
  { value: "exclusion", name: "Exclusion" },
  { value: "hue", name: "Hue" },
  { value: "saturation", name: "Saturation" },
  { value: "color", name: "Color" },
  { value: "luminosity", name: "Luminosity" },
];

const SelectBlendMode = () => {
  const { items, updateItem } = useItemsLayerStore();
  const { selectedId } = useSelectedStore();
  const [value, setValue] = useState<string | undefined>();

  useEffect(() => {
    if (selectedId) {
      const item = items.find((i) => i.id === selectedId);
      if (item) {
        setValue(item.blendMode);
      }
    } else {
      setValue(undefined);
    }
  }, [items, selectedId]);

  return (
    <Select
      disabled={!selectedId}
      value={value}
      onValueChange={(v) => {
        if (v) {
          setValue(v);
          if (selectedId) {
            const item = items.find((i) => i.id === selectedId);
            if (item) {
              // @ts-expect-error blendMode type
              updateItem({ ...item, blendMode: v }, selectedId);
              console.log(item);
            }
          }
        }
      }}
    >
      <SelectTrigger className="w-[180px] h-7 text-xs">
        <SelectValue placeholder="Blend mode" />
      </SelectTrigger>
      <SelectContent className="dark">
        {blendModes.map((blendMode) => (
          <SelectItem value={blendMode.value}>{blendMode.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBlendMode;
