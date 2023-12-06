import IconButton from "../ui/IconButton";
import {
  User,
  Gear,
  PaintBrush,
  Cards,
  Magnet,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import DownloadPage from "./DownloadPage";
import ImportImage from "./ImportImage";

const Header = () => {
  return (
    <header className="h-[3.2rem] w-full shadow-md flex items-center justify-center px-12">
      <div className="space-x-3 mr-auto">
        <IconButton Icon={User} />
        <IconButton Icon={Gear} tooltip="Config" />
      </div>
      <div className="rounded-full bottom-4 right-[50%] flex items-center gap-3 ">
        <IconButton size="sm" Icon={CaretLeft} iconSize={16} />
        <span className="leading-none mb-1">1</span>
        <IconButton size="sm" Icon={CaretRight} iconSize={16} />
      </div>
      <div className="space-x-3 ml-auto">
        <DownloadPage />
        <ImportImage />
        <IconButton Icon={PaintBrush} />
        <IconButton Icon={Cards} />
        {/* StackSimple */}
        <IconButton Icon={Magnet} />
        {/* Asterisk */}
        {/* Books */}
        {/* CirclesFour */}
        {/* CirclesThreePlus */}
        {/* CompassTool */}
        {/* MagnifyingGlassMinus */}
        {/* Sparkle  */}
      </div>
    </header>
  );
};

export default Header;
