import { useState } from "react"
import { Check, ChevronRightMini } from "@medusajs/icons"
import { Button } from "./button"

interface ConfigOption {
  id: string
  label: string
  image?: string
  priceModifier?: number
}

interface ConfigStep {
  id: string
  title: string
  description?: string
  type: "single" | "multi" | "color" | "text"
  options: ConfigOption[]
  required?: boolean
}

interface ProductConfiguratorProps {
  steps: ConfigStep[]
  basePrice: number
  currency?: string
  productImage?: string
  onComplete: (config: Record<string, string | string[]>) => void
}

export function ProductConfigurator({
  steps,
  basePrice,
  currency = "USD",
  productImage,
  onComplete
}: ProductConfiguratorProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [config, setConfig] = useState<Record<string, string | string[]>>({})

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const calculateTotal = () => {
    let total = basePrice
    steps.forEach(step => {
      const selection = config[step.id]
      if (selection) {
        const selections = Array.isArray(selection) ? selection : [selection]
        selections.forEach(sel => {
          const option = step.options.find(o => o.id === sel)
          if (option?.priceModifier) {
            total += option.priceModifier
          }
        })
      }
    })
    return total
  }

  const handleSelect = (stepId: string, optionId: string, type: "single" | "multi") => {
    setConfig(prev => {
      if (type === "multi") {
        const current = (prev[stepId] as string[]) || []
        if (current.includes(optionId)) {
          return { ...prev, [stepId]: current.filter(id => id !== optionId) }
        }
        return { ...prev, [stepId]: [...current, optionId] }
      }
      return { ...prev, [stepId]: optionId }
    })
  }

  const isStepComplete = (stepIndex: number) => {
    const step = steps[stepIndex]
    if (!step.required) return true
    const selection = config[step.id]
    if (!selection) return false
    if (Array.isArray(selection)) return selection.length > 0
    return !!selection
  }

  const canProceed = isStepComplete(currentStep)
  const step = steps[currentStep]

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Preview */}
      <div className="lg:w-1/2">
        <div className="sticky top-4">
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4">
            {productImage ? (
              <img src={productImage} alt="Product preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Product Preview
              </div>
            )}
          </div>

          {/* Config Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Your Configuration</h3>
            <div className="space-y-2">
              {steps.map((s, idx) => {
                const selection = config[s.id]
                const labels = selection
                  ? Array.isArray(selection)
                    ? selection.map(id => s.options.find(o => o.id === id)?.label).join(", ")
                    : s.options.find(o => o.id === selection)?.label
                  : null

                return (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{s.title}</span>
                    <span className={labels ? "text-gray-900" : "text-gray-400"}>
                      {labels || "Not selected"}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-cyan-600">{formatPrice(calculateTotal())}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configurator */}
      <div className="lg:w-1/2">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => idx <= currentStep && setCurrentStep(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                idx === currentStep
                  ? "bg-cyan-500 text-white"
                  : idx < currentStep
                  ? "bg-cyan-100 text-cyan-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {idx < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
              )}
              {s.title}
            </button>
          ))}
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{step.title}</h2>
          {step.description && (
            <p className="text-gray-600">{step.description}</p>
          )}
        </div>

        {/* Options */}
        <div className={`grid gap-3 mb-6 ${
          step.type === "color" ? "grid-cols-6" : "grid-cols-2"
        }`}>
          {step.options.map(option => {
            const selection = config[step.id]
            const isSelected = Array.isArray(selection)
              ? selection.includes(option.id)
              : selection === option.id

            if (step.type === "color") {
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(step.id, option.id, step.type === "multi" ? "multi" : "single")}
                  className={`aspect-square rounded-full border-2 relative ${
                    isSelected ? "border-cyan-500 ring-2 ring-cyan-200" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: option.id }}
                  title={option.label}
                >
                  {isSelected && (
                    <Check className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              )
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(step.id, option.id, step.type === "multi" ? "multi" : "single")}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  isSelected
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                )}
                <p className="font-medium text-gray-900">{option.label}</p>
                {option.priceModifier !== undefined && option.priceModifier !== 0 && (
                  <p className="text-sm text-cyan-600">
                    {option.priceModifier > 0 ? "+" : ""}{formatPrice(option.priceModifier)}
                  </p>
                )}
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed}
              className="flex-1"
            >
              Continue <ChevronRightMini className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={() => onComplete(config)}
              disabled={!canProceed}
              className="flex-1"
            >
              Add to Cart - {formatPrice(calculateTotal())}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
