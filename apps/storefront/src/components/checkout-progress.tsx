import { Button } from "@/components/ui/button"
import { CheckoutStep, CheckoutStepKey } from "@/lib/types/global"
import { CheckCircleSolid } from "@medusajs/icons"
import { clsx } from "clsx"

type CheckoutProgressProps = {
  steps: CheckoutStep[];
  currentStepIndex: number;
  handleStepChange: (step: CheckoutStepKey) => void;
  className?: string;
};

const CheckoutProgress = ({
  steps,
  currentStepIndex,
  handleStepChange,
  className,
}: CheckoutProgressProps) => {
  return (
    <div className={clsx("flex flex-wrap items-center gap-2 md:gap-4", className)}>
      {steps.map((step, index) => {
        const isCompleted = step.completed
        const isCurrent = index === currentStepIndex
        const isPast = index < currentStepIndex

        return (
          <div key={step.key} className="flex items-center gap-2 md:gap-4">
            <Button
              onClick={() => handleStepChange(step.key)}
              variant="transparent"
              className={clsx(
                "p-0 hover:bg-transparent flex items-center gap-2 transition-colors",
                isCurrent && "text-city-cyan hover:text-city-cyan-light",
                isPast && isCompleted && "text-city-white hover:text-city-cyan",
                !isCurrent && !isPast && "text-city-muted hover:text-city-gray"
              )}
              disabled={index > currentStepIndex && !isCompleted}
            >
              {isCompleted && isPast ? (
                <CheckCircleSolid className="w-4 h-4 text-city-cyan" />
              ) : (
                <span
                  className={clsx(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border-2",
                    isCurrent && "border-city-cyan text-city-cyan",
                    isPast && "border-city-cyan bg-city-cyan text-city-dark",
                    !isCurrent && !isPast && "border-city-steel text-city-muted"
                  )}
                >
                  {index + 1}
                </span>
              )}
              <span className="hidden sm:inline">{step.title}</span>
            </Button>
            {index < steps.length - 1 && (
              <div
                className={clsx(
                  "w-8 md:w-12 h-0.5 transition-colors",
                  isCompleted ? "bg-city-cyan" : "bg-city-steel"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CheckoutProgress
