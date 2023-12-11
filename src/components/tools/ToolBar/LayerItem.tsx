import { Card } from "@/components/ui/card";
import { Item } from "@/types/storeTypes";
import { DotsSixVertical, TextAa } from "@phosphor-icons/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSelectedStore } from "@/store/SelectedStore";
import { cn } from "@/lib/utils";
import { blendModes } from "./SelectBlendMode";

type Props = { item: Item };

const LayerItem = ({ item }: Props) => {
  const { selectedId, setSelected } = useSelectedStore();

  const isSelected = selectedId === item.id;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      className={cn(
        "rounded-md grid grid-cols-[1fr,4fr,1fr] gap-2 h-16 py-2 pl-1.5",
        isSelected && "bg-white",
      )}
      ref={setNodeRef}
      style={style}
      onDoubleClick={() => setSelected(item.id)}
      {...attributes}
      {...listeners}
    >
      {/* <div className="max-h-full w-full gap-2 flex items-center"> */}
      <div className="h-12 w-12 bg-white rounded-sm overflow-hidden grid place-content-center p-1">
        {item.type === "image" ? (
          <img
            src={item.src}
            alt="Layer thumbnail"
            className="h-full object-scale-down w-full"
          />
        ) : (
          <TextAa size={32} className="text-black w-full" />
        )}
      </div>
      <div className="overflow-hidden w-full flex flex-col">
        <p
          className={cn(
            "whitespace-nowrap text-ellipsis overflow-hidden w-full",
            isSelected && "text-black font-semibold",
          )}
          title={item.type === "text" ? item.content : undefined}
        >
          <span className="capitalize">{item.type}</span>
          <span>{item.type === "text" && `: ${item.content}`}</span>
        </p>
        <span
          className={cn(
            "text-muted-foreground text-sm whitespace-nowrap text-ellipsis overflow-hidden w-full capitalize",
            isSelected && "text-muted",
          )}
        >
          {item.blendMode === "source-over"
            ? "normal"
            : blendModes.find((i) => i.value === item.blendMode)?.name}
        </span>
      </div>
      {/* </div> */}
      <div
        className={cn(
          "grid place-content-center px-2 cursor-pointer",
          isSelected && "text-muted",
        )}
      >
        <DotsSixVertical size={25} strokeWidth={20} />
      </div>
    </Card>
  );
};

export default LayerItem;
