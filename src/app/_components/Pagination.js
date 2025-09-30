"use client";

export const Pagination = ({ page, setPage, totalPages }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-end items-center w-full mt-6 gap-2">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Previous
      </button>

      {getPageNumbers().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={`page-${p}`}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded ${
              page === p
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
