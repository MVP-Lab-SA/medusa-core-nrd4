/**
 * Page Error Component
 * 
 * Error display for CMS pages.
 */

export interface PageErrorProps {
  error?: Error | string
  reset?: () => void
  statusCode?: number
}

export function PageError({ error, reset, statusCode }: PageErrorProps) {
  const errorMessage = typeof error === 'string' 
    ? error 
    : error?.message || 'An error occurred while loading this page.'
  
  const getStatusMessage = (code?: number) => {
    switch (code) {
      case 404:
        return 'Page not found'
      case 500:
        return 'Server error'
      default:
        return 'Something went wrong'
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        {getStatusMessage(statusCode)}
      </h1>
      {statusCode && (
        <p className="text-6xl font-bold text-gray-200 mb-4">{statusCode}</p>
      )}
      <p className="text-gray-600 mb-6">
        {errorMessage}
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
