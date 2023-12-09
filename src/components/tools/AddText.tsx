import { TextAa } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { MouseEventHandler } from "react";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useSelectedStore } from "@/store/SelectedStore";

const AddText = () => {
  const { addItem, items } = useItemsLayerStore();
  const setSelected = useSelectedStore((state) => state.setSelected);
  const onClick: MouseEventHandler = () => {
    addItem({
      type: "text",
      x: 100,
      y: 100,
      fontSize: 20,
      fontFamily: "Roboto",
      width: undefined,
      height: undefined,
      content: "",
    });

    setSelected(items[items.length - 1].id);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            variant={"secondary"}
            className="rounded-full  p-2 text-muted-foreground relative overflow-hidden"
          >
            <TextAa />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={6}>
          <p>Add text</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddText;
