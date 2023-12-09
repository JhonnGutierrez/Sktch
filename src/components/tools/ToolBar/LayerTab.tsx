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

const LayerTab = () => {
  const { items, setItems } = useItemsLayerStore();

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
    <TabsContent value="layers" className=" py-2">
      {/* <Card className="h-full  rounded-md"> */}
      {/* <p>Layers</p> */}
      <div className="flex flex-col gap-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <LayerItem item={item} key={item.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      {/* </Card> */}
    </TabsContent>
  );
};

export default LayerTab;
