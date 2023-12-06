import type { Icon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type IconButtonParamas = {
  Icon: Icon;
  iconSize?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tooltip?: string;
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
};

const IconButton = ({
  Icon,
  size,
  onClick,
  tooltip,
  side,
  sideOffset = 4,
  iconSize = 20,
  variant = "secondary",
}: IconButtonParamas) => {
  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onClick}
              size={size}
              variant={variant}
              className="rounded-full  p-2 text-muted-foreground "
            >
              <Icon size={iconSize} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={sideOffset} side={side}>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      className="rounded-full  p-2 text-muted-foreground "
    >
      <Icon size={iconSize} />
    </Button>
  );
};

export default IconButton;
