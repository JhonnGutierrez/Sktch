import { TabsContent } from "@/components/ui/tabs";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";
import LayerItem from "./LayerItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import SelectBlendMode from "./SelectBlendMode";
import { useSelectedStore } from "@/store/SelectedStore";

const LayerTab = () => {
  const { items, setItems, deleteItem, addItem } = useItemsLayerStore();
  const { selectedId } = useSelectedStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id && active && over) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <TabsContent value="layers" className="h-full py-2 mt-1">
      {/* <Card className="h-full  rounded-md"> */}
      {/* <p>Layers</p> */}
      <div className="mb-1 flex justify-between items-center">
        <SelectBlendMode />
        <div className="space-x-1">
          <Button
            size={"sm"}
            variant={"ghost"}
            className="px-2 text-muted-foreground"
            disabled={!selectedId}
            onClick={() => {
              if (selectedId) {
                const item = items.find((i) => i.id === selectedId);
                if (item) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { id, ...restItem } = item;
                  addItem({
                    ...restItem,
                    x: restItem.x + 200,
                    y: restItem.y + 200,
                  });
                }
              }
            }}
          >
            <Copy size={15} />
          </Button>
          <Button
            size={"sm"}
            variant={"ghost"}
            disabled={!selectedId}
            className="px-2 text-muted-foreground"
            onClick={() => selectedId && deleteItem(selectedId)}
          >
            <Trash size={15} />
          </Button>
        </div>
      </div>
      <div className="h-[calc(100%-60px)] mt-2 pb-2">
        {items.length > 0 ? (
          <ScrollArea className="h-full">
            <div className="flex gap-1 flex-col-reverse px-2 overflow-hidden pb-2 min-h-full">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={items}
                  strategy={verticalListSortingStrategy}
                >
                  {items.map((item) => (
                    <LayerItem item={item} key={item.id} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </ScrollArea>
        ) : (
          <div className="h-full grid place-content-center text-muted-foreground text-lg font-thin">
            <span>Add a new item</span>
          </div>
        )}
      </div>
      {/* </Card> */}
    </TabsContent>
  );
};

export default LayerTab;
