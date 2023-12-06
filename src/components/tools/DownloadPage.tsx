import { useCanvasStore } from "@/store/CanvaStore";
import { downloadCanvas } from "@/lib/konvaUtils";
import IconButton from "../ui/IconButton";
import { DownloadSimple } from "@phosphor-icons/react";
import { useSelectedStore } from "@/store/SelectedStore";

const DownloadPage = () => {
  const stageRef = useCanvasStore((state) => state.stageRef);
  const clearSelected = useSelectedStore((state) => state.clearSelected);
  return (
    <IconButton
      Icon={DownloadSimple}
      tooltip="Download image"
      side="bottom"
      sideOffset={6}
      onClick={() => {
        clearSelected();

        setTimeout(() => {
          const imgUrl = stageRef.current?.toDataURL({ pixelRatio: 3 });
          if (imgUrl) {
            downloadCanvas(imgUrl, "stage.png");
          }
        }, 100);
      }}
    />
  );
};

export default DownloadPage;
