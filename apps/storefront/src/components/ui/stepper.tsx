import { CheckCircleSolid } from "@medusajs/icons"
import { clsx } from "clsx"

interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
  orientation?: "horizontal" | "vertical"
  className?: string
}

export const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
  className,
}: StepperProps) => {
  const isHorizontal = orientation === "horizontal"

  return (
    <div
      className={clsx(
        isHorizontal ? "flex items-center" : "flex flex-col",
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isClickable = onStepClick && index <= currentStep

        return (
          <div
            key={step.id}
            className={clsx(
              isHorizontal
                ? "flex items-center flex-1 last:flex-none"
                : "flex items-start"
            )}
          >
            {/* Step indicator */}
            <div className={clsx(!isHorizontal && "flex flex-col items-center mr-4")}>
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={clsx(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                  isCompleted && "bg-city-cyan border-city-cyan text-city-dark",
                  isCurrent && "bg-city-dark border-city-cyan text-city-cyan",
                  !isCompleted && !isCurrent && "bg-city-dark border-city-steel text-city-muted",
                  isClickable && "cursor-pointer hover:border-city-cyan-light",
                  !isClickable && "cursor-default"
                )}
              >
                {isCompleted ? (
                  <CheckCircleSolid className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </button>

              {/* Vertical connector */}
              {!isHorizontal && index < steps.length - 1 && (
                <div
                  className={clsx(
                    "w-0.5 h-12 my-2",
                    isCompleted ? "bg-city-cyan" : "bg-city-steel"
                  )}
                />
              )}
            </div>

            {/* Step content */}
            <div className={clsx(isHorizontal ? "ml-3" : "pt-1")}>
              <p
                className={clsx(
                  "text-sm font-medium",
                  isCurrent || isCompleted ? "text-city-white" : "text-city-muted"
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="text-xs text-city-muted mt-0.5">
                  {step.description}
                </p>
              )}
            </div>

            {/* Horizontal connector */}
            {isHorizontal && index < steps.length - 1 && (
              <div
                className={clsx(
                  "flex-1 h-0.5 mx-4",
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

export default Stepper
