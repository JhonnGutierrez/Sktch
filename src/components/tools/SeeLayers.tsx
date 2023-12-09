import { Cards } from "@phosphor-icons/react";
import IconButton from "../ui/IconButton";
import { useConfigStore } from "@/store/ConfigStore";

const SeeLayers = () => {
  const toogleShowLayers = useConfigStore((state) => state.toogleShowLayeres);
  return <IconButton Icon={Cards} onClick={toogleShowLayers} />;
};

export default SeeLayers;
