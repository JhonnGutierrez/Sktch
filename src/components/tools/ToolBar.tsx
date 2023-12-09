import SelectFont from "./SelectFont";
import { cn } from "@/lib/utils";
import { useSelectedStore } from "@/store/SelectedStore";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";
import { useEffect, useState } from "react";
import { Item } from "@/types/storeTypes";
import { useConfigStore } from "@/store/ConfigStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CaretLeft } from "@phosphor-icons/react";

const ToolBar = () => {
  const selectedId = useSelectedStore((state) => state.selectedId);
  const { items, updateItem } = useItemsLayerStore();
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const { showLayers, toogleShowLayeres } = useConfigStore();

  useEffect(() => {
    if (selectedId) {
      setSelectedItem(items.find((i) => i.id === selectedId));
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, items]);

  return (
    <section
      className={cn(
        "relative my-auto w-0 transition-all z-40",
        (selectedId || showLayers) && "w-[350px]",
      )}
    >
      <Button
        variant={"ghost"}
        className="absolute my-auto -left-11 top-[calc(50%-36px)] cursor-pointer"
        onClick={toogleShowLayeres}
        size={"icon"}
      >
        <div
          className={cn(
            "text-muted-foreground",
            (selectedId || showLayers) && "rotate-180 transition-transform ",
          )}
        >
          <CaretLeft size={20} />
        </div>
      </Button>
      <div
        className={cn(
          "h-[500px] w-[0] my-auto overflow-hidden transition-all",
          (selectedId || showLayers) && "w-[350px]",
        )}
        // onClick={() => setIsOpen((state) => !state)}
      >
        <Card
          className={cn(
            "w-full h-full rounded-s-lg rounded-e-none translate-x-full transition-transform py-3 px-3 border-e-transparent ",
            (selectedId || showLayers) && "translate-x-0",
          )}
        >
          <Tabs
            defaultValue="layers"
            className="w-full h-full "
            value={!selectedItem ? "layers" : undefined}
          >
            <TabsList className=" w-full grid grid-cols-2 gap-2">
              <TabsTrigger className="w-full" value="layers">
                Layers
              </TabsTrigger>
              <TabsTrigger
                className="w-full"
                value="node"
                disabled={!selectedItem}
                title={!selectedItem ? "Select an item first" : undefined}
              >
                Node
              </TabsTrigger>
            </TabsList>
            <TabsContent value="layers" className="px-3 py-2">
              {/* <Card className="h-full  rounded-md"> */}
              <p>Layers</p>
              {/* </Card> */}
            </TabsContent>
            <TabsContent value="node" className="px-3 py-2">
              {/* <Card className="h-full  rounded-md"> */}
              {selectedItem && <p>{selectedItem.type}</p>}
              <SelectFont
                selectedId={selectedId}
                updateItem={updateItem}
                selectedItem={selectedItem}
              />
              {/* </Card> */}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default ToolBar;
