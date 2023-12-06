import { Redo, Undo } from "./UndoRedo";

const Aside = () => {
  return (
    <aside className="absolute h-[350px] top-[calc(50%-(350px/2))] w-10 rounded-e-md bg-muted shadow-md py-2 flex flex-col items-center gap-1">
      <Undo />
      <Redo />
    </aside>
  );
};

export default Aside;
