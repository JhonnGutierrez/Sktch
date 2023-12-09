import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretUpDown, Check } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
// import { ScrollArea } from "../ui/scroll-area";
import { Item } from "@/types/storeTypes";
import { useVirtualizer } from "@tanstack/react-virtual";
import WebFont from "webfontloader";

type FontItem = {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  category: string;
  kind: string;
  menu: string;
};

type Props = {
  selectedId: string | null;
  updateItem: (newAttrs: Item, id: string) => void;
  selectedItem: Item | undefined;
};

const SelectFont = ({ selectedId, updateItem, selectedItem }: Props) => {
  const [open, setOpen] = useState(false);
  const [reloadVirtualize, setReloadVirtualize] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  // const [searchValue, setSearchValue] = useState("");

  const parentRef = useRef(null);
  const { isPending, error, data } = useQuery<{
    kind: "string";
    items: FontItem[];
  }>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${
          import.meta.env.VITE_GOOGLE_FONTS_API_KEY
        }`,
      ).then((res) => res.json()),
  });

  useEffect(() => {
    const selectedItemFont =
      selectedItem?.type === "text" && selectedItem.fontFamily;

    if (data) {
      const selectedItemFontIndex = data.items.findIndex(
        (i) => i.family === selectedItemFont,
      );
      setValue(selectedItemFontIndex + "");
    }
  }, [selectedItem, data]);

  const Row = ({
    index,
    style,
    data,
  }: {
    index: number;
    style: React.CSSProperties;
    data: FontItem[];
  }) => {
    const fontFamily = data[index].family;
    return (
      <CommandItem
        style={style}
        // key={index}
        value={index + ""}
        onSelect={(currentValue) => {
          const newValue = currentValue === value ? "0" : currentValue;
          const fontFamily = data[index].family;
          setValue(newValue);
          if (selectedItem?.type === "text" && selectedId) {
            WebFont.load({
              google: {
                families: [fontFamily],
              },
            });
            updateItem(
              {
                ...selectedItem,
                fontFamily: fontFamily,
              },
              selectedId,
            );
          } else {
            console.error("Failing");
          }
          setOpen(false);
        }}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === fontFamily ? "opacity-100" : "opacity-0",
          )}
        />
        <span className="overflow-ellipsis w-full whitespace-nowrap overflow-x-hidden">
          {fontFamily}
        </span>
      </CommandItem>
    );
  };

  useEffect(() => {
    // setReloadVirtualize((state) => !state);
    if (parentRef.current) {
      setTimeout(() => setReloadVirtualize((state) => !state), 150);
    } else {
      setTimeout(() => setReloadVirtualize((state) => !state), 250);
    }
  }, [open, data, parentRef]);

  // const filteredData = data
  //   ? data.items.filter((item) =>
  //       item.family
  //         .toLowerCase()
  //         .trim()
  //         .includes(searchValue.toLowerCase().trim()),
  //     )
  //   : [];

  const rowVirtualizer = useVirtualizer({
    count: data && !isPending ? data.items.length : 0,
    getScrollElement: () => (reloadVirtualize ? parentRef.current : null),
    estimateSize: () => 32,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isPending && !value}
          className="w-[200px] justify-between capitalize"
        >
          {data && value ? data.items[Number(value)].family : "loading..."}
          {/* {value} */}
          <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] h-[300px] p-0 dark">
        <Command shouldFilter={false}>
          {!isPending && data && (
            <>
              <CommandInput
                placeholder="Search framework..."
                onValueChange={(v) => {
                  const valueIndex = data.items.findIndex((i) =>
                    i.family
                      .toLowerCase()
                      .trim()
                      .includes(v.toLowerCase().trim()),
                  );
                  rowVirtualizer.scrollToIndex(valueIndex, { align: "start" });
                }}
                // value={searchValue}
              />
              <CommandEmpty>No font found.</CommandEmpty>
              {/* <ScrollArea asChild> */}
              <div
                ref={parentRef}
                style={{
                  height: 250 + "px",
                  overflow: "auto",
                }}
              >
                <CommandGroup
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                    <Row
                      key={virtualItem.key}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                      index={virtualItem.index}
                      data={data.items}
                    />
                  ))}
                </CommandGroup>
              </div>
              {/* </ScrollArea> */}
            </>
          )}
          {isPending && <CommandEmpty>Loading...</CommandEmpty>}
          {error && <CommandEmpty>An error ocurred</CommandEmpty>}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectFont;
