import { useState } from "react"
import { Button } from "./button"

interface SizePredictorProps {
  onResult: (size: string) => void
  sizes: string[]
  productType?: "tops" | "bottoms" | "shoes" | "general"
}

export function SizePredictor({
  onResult,
  sizes,
  productType = "general"
}: SizePredictorProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const questions = {
    tops: [
      {
        id: "fit",
        question: "How do you like your tops to fit?",
        options: ["Tight/Fitted", "Regular", "Loose/Relaxed"]
      },
      {
        id: "height",
        question: "What is your height?",
        options: ["Under 5'4\"", "5'4\" - 5'8\"", "5'8\" - 6'0\"", "Over 6'0\""]
      },
      {
        id: "chest",
        question: "What is your chest measurement?",
        options: ["Under 36\"", "36\" - 40\"", "40\" - 44\"", "Over 44\""]
      }
    ],
    bottoms: [
      {
        id: "fit",
        question: "How do you like your pants to fit?",
        options: ["Skinny", "Slim", "Regular", "Relaxed"]
      },
      {
        id: "waist",
        question: "What is your waist measurement?",
        options: ["Under 30\"", "30\" - 34\"", "34\" - 38\"", "Over 38\""]
      },
      {
        id: "length",
        question: "What is your inseam length?",
        options: ["Under 30\"", "30\" - 32\"", "32\" - 34\"", "Over 34\""]
      }
    ],
    shoes: [
      {
        id: "usSize",
        question: "What US shoe size do you typically wear?",
        options: ["6-7", "7.5-8.5", "9-10", "10.5-11.5", "12+"]
      },
      {
        id: "width",
        question: "How would you describe your foot width?",
        options: ["Narrow", "Regular", "Wide"]
      }
    ],
    general: [
      {
        id: "usualSize",
        question: "What size do you usually wear?",
        options: sizes
      },
      {
        id: "fit",
        question: "How did your last purchase fit?",
        options: ["Too small", "Perfect", "Too large"]
      }
    ]
  }

  const currentQuestions = questions[productType]
  const currentQuestion = currentQuestions[step]

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }))
    
    if (step < currentQuestions.length - 1) {
      setStep(prev => prev + 1)
    } else {
      // Calculate recommended size based on answers
      const recommendedSize = calculateSize({ ...answers, [currentQuestion.id]: answer })
      onResult(recommendedSize)
    }
  }

  const calculateSize = (answers: Record<string, string>): string => {
    // Simplified size calculation logic
    if (productType === "general" && answers.usualSize) {
      const sizeIndex = sizes.indexOf(answers.usualSize)
      if (answers.fit === "Too small" && sizeIndex < sizes.length - 1) {
        return sizes[sizeIndex + 1]
      }
      if (answers.fit === "Too large" && sizeIndex > 0) {
        return sizes[sizeIndex - 1]
      }
      return answers.usualSize
    }
    
    // Default to middle size
    return sizes[Math.floor(sizes.length / 2)]
  }

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Find Your Perfect Size</h3>
        <p className="text-sm text-gray-600">Answer a few questions and we'll recommend the best size for you</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {currentQuestions.map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 h-1 rounded-full ${
              idx <= step ? "bg-cyan-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-gray-900 font-medium mb-4">{currentQuestion.question}</p>
        <div className="space-y-2">
          {currentQuestion.options.map(option => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-cyan-500 hover:bg-white transition-all"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(prev => prev - 1)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; Back
        </button>
      )}
    </div>
  )
}

interface SizeResultProps {
  recommendedSize: string
  confidence?: number
  onSelectSize: (size: string) => void
  onRetake: () => void
}

export function SizeResult({
  recommendedSize,
  confidence = 85,
  onSelectSize,
  onRetake
}: SizeResultProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl p-6 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">We recommend size</h3>
      <div className="text-4xl font-bold text-cyan-600 mb-2">{recommendedSize}</div>
      <p className="text-sm text-gray-600 mb-6">{confidence}% confidence based on your answers</p>

      <div className="space-y-3">
        <Button onClick={() => onSelectSize(recommendedSize)} className="w-full">
          Select Size {recommendedSize}
        </Button>
        <button
          onClick={onRetake}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Retake quiz
        </button>
      </div>
    </div>
  )
}
