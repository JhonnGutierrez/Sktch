import { Images } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { ChangeEvent, useRef } from "react";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const ImportImage = () => {
  const addItem = useItemsLayerStore((state) => state.addItem);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file?.length && file?.length > 0 && inputRef.current) {
      const imageUrl = URL.createObjectURL(file[0]);

      addItem({
        type: "image",
        x: 0,
        y: 0,
        width: undefined,
        height: undefined,
        src: imageUrl,
      });

      inputRef.current.value = "";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            // onClick={onClick}
            variant={"secondary"}
            className="rounded-full  p-2 text-muted-foreground relative overflow-hidden"
          >
            <label
              htmlFor="file"
              className="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
            />
            <Images size={20} />
            <input
              id="file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={inputRef}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={6}>
          <p>Import image</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ImportImage;
