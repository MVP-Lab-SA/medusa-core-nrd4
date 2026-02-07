import { useState } from "react"
import { ChevronDownMini, ThumbUp, Check } from "@medusajs/icons"
import { Button } from "./button"

interface Answer {
  id: string
  content: string
  author: string
  date: string
  helpful: number
  isOfficial?: boolean
}

interface Question {
  id: string
  content: string
  author: string
  date: string
  answers: Answer[]
}

interface QAndAProps {
  questions: Question[]
  onAskQuestion: (question: string) => Promise<void>
  onAnswerQuestion?: (questionId: string, answer: string) => Promise<void>
  onMarkHelpful: (answerId: string) => void
  className?: string
}

export function QAndA({
  questions,
  onAskQuestion,
  onAnswerQuestion,
  onMarkHelpful,
  className = ""
}: QAndAProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])
  const [newQuestion, setNewQuestion] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAskForm, setShowAskForm] = useState(false)

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    )
  }

  const handleAskQuestion = async () => {
    if (!newQuestion.trim()) return
    setIsSubmitting(true)
    try {
      await onAskQuestion(newQuestion)
      setNewQuestion("")
      setShowAskForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          Questions & Answers ({questions.length})
        </h3>
        <Button variant="outline" onClick={() => setShowAskForm(!showAskForm)}>
          Ask a Question
        </Button>
      </div>

      {/* Ask Question Form */}
      {showAskForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-medium text-gray-900 mb-3">Ask a Question</h4>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-3"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAskForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleAskQuestion} disabled={isSubmitting || !newQuestion.trim()}>
              {isSubmitting ? "Submitting..." : "Submit Question"}
            </Button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map(question => {
          const isExpanded = expandedQuestions.includes(question.id)
          
          return (
            <div key={question.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleQuestion(question.id)}
                className="w-full flex items-start gap-4 p-4 text-left hover:bg-gray-50"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center font-bold text-cyan-600">
                  Q
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{question.content}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Asked by {question.author} - {question.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {question.answers.length} answer{question.answers.length !== 1 ? "s" : ""}
                  </span>
                  <ChevronDownMini className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                  {question.answers.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No answers yet</p>
                  ) : (
                    question.answers.map(answer => (
                      <div key={answer.id} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">
                          A
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-700">{answer.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <p className="text-sm text-gray-500">
                              {answer.isOfficial && (
                                <span className="inline-flex items-center gap-1 text-cyan-600 mr-2">
                                  <Check className="w-4 h-4" />
                                  Official Answer
                                </span>
                              )}
                              {answer.author} - {answer.date}
                            </p>
                            <button
                              onClick={() => onMarkHelpful(answer.id)}
                              className="flex items-center gap-1 text-sm text-gray-500 hover:text-cyan-600"
                            >
                              <ThumbUp className="w-4 h-4" />
                              Helpful ({answer.helpful})
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {questions.length === 0 && !showAskForm && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 mb-4">No questions yet. Be the first to ask!</p>
          <Button onClick={() => setShowAskForm(true)}>Ask a Question</Button>
        </div>
      )}
    </div>
  )
}
