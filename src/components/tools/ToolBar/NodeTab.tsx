import { TabsContent } from "@/components/ui/tabs";
import SelectFont from "../SelectFont";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";
import { useEffect, useState } from "react";
import { Item } from "@/types/storeTypes";
import { useSelectedStore } from "@/store/SelectedStore";

const NodeTab = () => {
  const { items, updateItem } = useItemsLayerStore();
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const { selectedId } = useSelectedStore();

  useEffect(() => {
    if (selectedId) {
      setSelectedItem(items.find((i) => i.id === selectedId));
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, items]);
  return (
    <TabsContent value="node" className="px-3 py-2">
      {selectedItem && <p>{selectedItem.type}</p>}
      {selectedItem && selectedItem.type === "text" && (
        <SelectFont
          selectedId={selectedId}
          updateItem={updateItem}
          selectedItem={selectedItem}
        />
      )}
    </TabsContent>
  );
};

export default NodeTab;
