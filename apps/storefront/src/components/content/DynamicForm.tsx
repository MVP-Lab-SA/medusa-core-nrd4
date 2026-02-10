import { useState } from "react"

interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  label: string
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

interface DynamicFormProps {
  fields: FormField[]
  submitText?: string
  onSubmit: (data: Record<string, string | boolean>) => Promise<void>
}

export function DynamicForm({ fields, submitText = 'Submit', onSubmit }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, string | boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (id: string, value: string | boolean) => {
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Thank you!</h3>
        <p className="text-gray-500 mt-1">Your submission has been received.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              value={(formData[field.id] as string) || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none h-24"
            />
          ) : field.type === 'select' ? (
            <select
              value={(formData[field.id] as string) || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : field.type === 'checkbox' ? (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(formData[field.id] as boolean) || false}
                onChange={(e) => handleChange(field.id, e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">{field.placeholder}</span>
            </label>
          ) : field.type === 'radio' ? (
            <div className="space-y-2">
              {field.options?.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={field.id}
                    value={opt.value}
                    checked={formData[field.id] === opt.value}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{opt.label}</span>
                </label>
              ))}
            </div>
          ) : (
            <input
              type={field.type}
              value={(formData[field.id] as string) || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : submitText}
      </button>
    </form>
  )
}
