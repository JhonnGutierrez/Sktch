import { cn } from "@/lib/utils";
import { useSelectedStore } from "@/store/SelectedStore";
import { useEffect, useState } from "react";
import { Item } from "@/types/storeTypes";
import { useConfigStore } from "@/store/ConfigStore";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { CaretLeft } from "@phosphor-icons/react";
import LayerTab from "./LayerTab";
import NodeTab from "./NodeTab";
import { useItemsLayerStore } from "@/store/ItemsLayerStore";

const ToolBar = () => {
  const { selectedId, setSelected } = useSelectedStore();
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const { showLayers, setShowLayers } = useConfigStore();
  const { items } = useItemsLayerStore();

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
        onClick={() => {
          if (selectedId || showLayers) {
            setShowLayers(false);
            setSelected(null);
          } else {
            setShowLayers(true);
          }
        }}
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
            {/* Content */}
            <LayerTab />
            <NodeTab />
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default ToolBar;
