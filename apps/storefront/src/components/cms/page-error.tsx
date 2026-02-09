/**
 * Page Error Component
 * 
 * Error display for CMS pages.
 */

interface PageErrorProps {
  error?: Error
  reset?: () => void
}

export function PageError({ error, reset }: PageErrorProps) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-6">
        {error?.message || 'An error occurred while loading this page.'}
      </p>
      {reset && (
        <button
          onClick={reset}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}
