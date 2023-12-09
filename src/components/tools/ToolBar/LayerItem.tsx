import { Card } from "@/components/ui/card";
import { Item } from "@/types/storeTypes";
import { DotsSixVertical, TextAa } from "@phosphor-icons/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const LayerItem = ({ item }: { item: Item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Card
      className="rounded-md flex justify-between h-16 py-2 pl-1.5"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="max-h-full w-full gap-2 flex items-center">
        <div className="h-12 w-14 bg-white rounded-sm overflow-hidden grid place-content-center p-1">
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
        <div className=" w-full">
          <p
            title={item.type === "text" ? item.content : undefined}
            className="whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {item.type === "text" ? item.content : "Image"}
          </p>
          <span className="text-muted-foreground text-sm">{item.type}</span>
        </div>
      </div>
      <div className="grid place-content-center px-2 cursor-pointer">
        <DotsSixVertical size={25} />
      </div>
    </Card>
  );
};

export default LayerItem;
