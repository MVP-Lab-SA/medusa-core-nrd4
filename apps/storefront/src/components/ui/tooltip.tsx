import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { clsx } from "clsx"
import { forwardRef, ComponentPropsWithoutRef, ElementRef, ReactNode } from "react"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={clsx(
      "z-50 overflow-hidden px-3 py-2",
      "bg-city-slate border border-city-steel shadow-lg",
      "text-sm text-city-white",
      "animate-enter data-[state=closed]:animate-leave",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Simple tooltip wrapper for common use case
const SimpleTooltip = ({
  children,
  content,
  side = "top",
}: {
  children: ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, SimpleTooltip }
