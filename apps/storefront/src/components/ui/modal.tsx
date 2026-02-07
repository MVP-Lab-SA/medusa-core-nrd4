import * as Dialog from "@radix-ui/react-dialog"
import { XMark } from "@medusajs/icons"
import { clsx } from "clsx"
import { ReactNode } from "react"

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Modal = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  size = "md",
}: ModalProps) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-4xl",
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-city-dark/80 backdrop-blur-sm z-50 data-[state=open]:animate-enter data-[state=closed]:animate-leave" />
        <Dialog.Content
          className={clsx(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
            "w-[95vw] p-6",
            "bg-city-navy border border-city-steel shadow-2xl",
            "data-[state=open]:animate-enter data-[state=closed]:animate-leave",
            "focus:outline-none",
            sizeClasses[size]
          )}
        >
          {(title || description) && (
            <div className="mb-6">
              {title && (
                <Dialog.Title className="text-xl font-bold text-city-white">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="mt-2 text-city-gray">
                  {description}
                </Dialog.Description>
              )}
            </div>
          )}

          {children}

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-2 text-city-gray hover:text-city-white hover:bg-city-steel/50 transition-colors"
              aria-label="Close"
            >
              <XMark className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// Modal trigger button - for use with uncontrolled modals
const ModalTrigger = Dialog.Trigger

// Modal footer for action buttons
const ModalFooter = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={clsx("mt-6 flex items-center justify-end gap-3", className)}>
      {children}
    </div>
  )
}

export { Modal, ModalTrigger, ModalFooter }
export default Modal
