import { Separator } from "../ui/separator";
import { Redo, Undo } from "./UndoRedo";
import ImportImage from "./ImportImage";
import AddText from "./AddText";

const Aside = () => {
  return (
    <aside className="h-[350px] my-auto w-10 rounded-e-md bg-muted shadow-md py-2 flex flex-col items-center gap-2 px-1">
      <Undo />
      <Redo />
      <Separator className="bg-muted-foreground h-[0.2px] opacity-50" />
      <ImportImage />
      <AddText />
    </aside>
  );
};

export default Aside;
