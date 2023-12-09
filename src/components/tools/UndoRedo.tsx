import { ArrowUUpLeft, ArrowUUpRight } from "@phosphor-icons/react";
import IconButton from "../ui/IconButton";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";

export const Undo = () => {
  const undo = useItemsLayerStore((state) => state.undo);

  return (
    <IconButton
      onClick={undo}
      variant="ghost"
      Icon={ArrowUUpLeft}
      tooltip="Undo"
      side="right"
      sideOffset={6}
    />
  );
};

export const Redo = () => {
  const redo = useItemsLayerStore((state) => state.redo);

  return (
    <IconButton
      onClick={redo}
      variant="ghost"
      Icon={ArrowUUpRight}
      tooltip="Redo"
      side="right"
      sideOffset={6}
    />
  );
};
