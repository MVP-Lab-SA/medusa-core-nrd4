import { Button } from "@/components/ui/button"
import { clsx } from "clsx"

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  "data-testid"?: string;
};

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  "data-testid": dataTestId,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pageNumbers = []
    const startPage = Math.max(1, page - 2)
    const endPage = Math.min(totalPages, page + 2)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div
      className="flex items-center justify-center gap-2 mt-8"
      data-testid={dataTestId}
    >
      {/* Previous button */}
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        variant="secondary"
        size="fit"
      >
        Previous
      </Button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {page > 3 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 text-sm font-medium text-city-gray bg-city-navy border border-city-steel/30 hover:bg-city-steel/30 hover:text-city-white rounded-lg transition-colors"
            >
              1
            </button>
            {page > 4 && (
              <span className="px-2 py-2 text-sm text-city-muted">...</span>
            )}
          </>
        )}

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={clsx(
              "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              pageNum === page
                ? "bg-city-cyan text-city-dark"
                : "text-city-gray bg-city-navy border border-city-steel/30 hover:bg-city-steel/30 hover:text-city-white"
            )}
          >
            {pageNum}
          </button>
        ))}

        {page < totalPages - 2 && (
          <>
            {page < totalPages - 3 && (
              <span className="px-2 py-2 text-sm text-city-muted">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 text-sm font-medium text-city-gray bg-city-navy border border-city-steel/30 hover:bg-city-steel/30 hover:text-city-white rounded-lg transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next button */}
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        variant="secondary"
        size="fit"
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination
