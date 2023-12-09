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
import { useEffect, useState } from "react";
// import { ScrollArea } from "../ui/scroll-area";
import { Item } from "@/types/storeTypes";
// import { useVirtualizer } from "@tanstack/react-virtual";
import { FixedSizeList as List } from "react-window";

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
  const [value, setValue] = useState("0");
  const [searchValue, setSearchValue] = useState("");

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

  // useEffect(() => {
  //   if (!isPending) {
  //     console.log(data);
  //   } else {
  //     console.log("loading...");
  //   }
  // }, [isPending, data]);

  // const parentRef = useRef(null);

  // const rowVirtualizer = useVirtualizer({
  //   count: 1589,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => 32,
  // });

  const Row = ({
    index,
    style,
    data,
  }: {
    index: number;
    style: React.CSSProperties;
    data: FontItem[];
  }) => {
    return (
      <CommandItem
        style={style}
        // key={index}
        value={index + ""}
        onSelect={(currentValue) => {
          console.log(currentValue);
          const newValue = currentValue === value ? "0" : currentValue;
          setValue(newValue);
          if (selectedItem?.type === "text" && selectedId) {
            updateItem(
              {
                ...selectedItem,
                fontFamily: data[index].family,
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
            value === data[index].family ? "opacity-100" : "opacity-0",
          )}
        />
        {data[index].family}
      </CommandItem>
    );
  };

  const filteredData = data
    ? data.items.filter((item) =>
        item.family
          .toLowerCase()
          .trim()
          .includes(searchValue.toLowerCase().trim()),
      )
    : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isPending}
          className="w-[200px] justify-between capitalize"
        >
          {data ? data.items[Number(value)].family : "loading..."}
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
                onValueChange={(v) => setSearchValue(v)}
                value={searchValue}
              />
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {/* <ScrollArea asChild> */}
                {/* <div> */}
                <List
                  height={250}
                  itemCount={filteredData.length}
                  itemSize={32}
                  width={200}
                  itemData={filteredData}
                  onScroll={(e) => console.log(e)}
                  itemKey={(index, data) => data[index].family}
                >
                  {Row}
                </List>
                {/* </div> */}
                {/* </ScrollArea> */}
              </CommandGroup>
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
