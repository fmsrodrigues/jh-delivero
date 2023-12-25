interface PaginationProps {
  page: number
  setPage: (page: number) => void
  listLength: number
  listLimit: number
}

export function Pagination({ page, setPage, listLength, listLimit }: PaginationProps) {
  function handlePreviousPage() {
    const newPage = page - 1;

    if (newPage < 1) {
      return
    }

    setPage(newPage)
  }

  function handleNextPage() {
    const newPage = page + 1;
    const noPageAfter = listLength < listLimit;

    if (noPageAfter) {
      return
    }

    setPage(newPage)
  }

  return (
    <div className="flex justify-between items-center">
      <button
        disabled={page === 1}
        onClick={handlePreviousPage}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
      >
        Previous
      </button>
      <div className="text-sm">Page {page}</div>
      <button
        disabled={listLength < listLimit}
        onClick={handleNextPage}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
      >
        Next
      </button>
    </div>
  )
}