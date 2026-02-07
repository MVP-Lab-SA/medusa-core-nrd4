import { useState } from "react"
import { Check, ChevronLeft, ChevronRight } from "@medusajs/icons"
import { Button } from "./button"

interface Step {
  id: string
  title: string
  description?: string
  content: React.ReactNode
  validate?: () => boolean | Promise<boolean>
}

interface MultiStepFormProps {
  steps: Step[]
  onComplete: () => void
  submitLabel?: string
  className?: string
}

export function MultiStepForm({
  steps,
  onComplete,
  submitLabel = "Submit",
  className = ""
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isValidating, setIsValidating] = useState(false)

  const goToNext = async () => {
    const step = steps[currentStep]
    
    if (step.validate) {
      setIsValidating(true)
      const isValid = await step.validate()
      setIsValidating(false)
      
      if (!isValid) return
    }

    setCompletedSteps(prev => [...new Set([...prev, currentStep])])

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete()
    }
  }

  const goToPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const goToStep = (index: number) => {
    if (completedSteps.includes(index) || index === currentStep) {
      setCurrentStep(index)
    }
  }

  return (
    <div className={className}>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const isCompleted = completedSteps.includes(idx)
            const isCurrent = idx === currentStep
            const isClickable = isCompleted || isCurrent

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-initial">
                <button
                  onClick={() => goToStep(idx)}
                  disabled={!isClickable}
                  className="flex flex-col items-center"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  } ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    isCurrent ? "text-cyan-600" : isCompleted ? "text-gray-900" : "text-gray-400"
                  }`}>
                    {step.title}
                  </span>
                </button>
                
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    completedSteps.includes(idx) ? "bg-green-500" : "bg-gray-200"
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {steps[currentStep].description && (
          <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
        )}
        {steps[currentStep].content}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPrev}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <Button onClick={goToNext} disabled={isValidating}>
          {isValidating ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : currentStep === steps.length - 1 ? (
            submitLabel
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
