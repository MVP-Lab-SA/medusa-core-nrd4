import { Star } from "@medusajs/icons"

interface ReviewFiltersProps {
  onFilterChange: (filters: {
    rating?: number
    withPhotos?: boolean
    verified?: boolean
    sortBy?: string
  }) => void
  currentFilters: {
    rating?: number
    withPhotos?: boolean
    verified?: boolean
    sortBy?: string
  }
}

export function ReviewFilters({ onFilterChange, currentFilters }: ReviewFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <h3 className="font-semibold text-gray-900">Filter Reviews</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          value={currentFilters.sortBy || 'recent'}
          onChange={(e) => onFilterChange({ ...currentFilters, sortBy: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange({ ...currentFilters, rating: undefined })}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
              !currentFilters.rating ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            All Ratings
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => onFilterChange({ ...currentFilters, rating })}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                currentFilters.rating === rating ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span>{rating === 1 ? '& up' : 'only'}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={currentFilters.withPhotos || false}
            onChange={(e) => onFilterChange({ ...currentFilters, withPhotos: e.target.checked })}
            className="rounded border-gray-300"
          />
          <span className="text-sm text-gray-600">With Photos</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={currentFilters.verified || false}
            onChange={(e) => onFilterChange({ ...currentFilters, verified: e.target.checked })}
            className="rounded border-gray-300"
          />
          <span className="text-sm text-gray-600">Verified Purchases Only</span>
        </label>
      </div>

      <button
        onClick={() => onFilterChange({})}
        className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Clear All Filters
      </button>
    </div>
  )
}
