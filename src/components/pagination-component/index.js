import React, { useState } from 'react';

function PaginationComponent({
  dataLength,
  setRowIndex,
  pageLimit,
  dataLimit,
}) {
  const [pages] = useState(Math.round(dataLength / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const emitRowIndex = (current) => {
    const startIndex = current * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    setRowIndex({ start: startIndex, end: endIndex });
  };

  function nextPage() {
    const newPage = currentPage + 1;
    emitRowIndex(newPage);
    setCurrentPage(newPage);
  }

  function prevPage() {
    const newPage = currentPage - 1;
    emitRowIndex(newPage);
    setCurrentPage(newPage);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    emitRowIndex(pageNumber);
    setCurrentPage(pageNumber);
  }

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    if (pageLimit > pages) {
      return new Array(pages).fill().map((_, idx) => start + idx + 1);
    }
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      {/* previous button */}

      <div className="pagination_wrapper">
        <button
          type="button"
          onClick={prevPage}
          className={`prev round ${currentPage === 1 ? 'disabled' : ''}`}
        >
          {'<'}
        </button>
        {/* show page numbers */}
        {getPaginationGroup().map((item) => (
          <button
            type="button"
            key={item}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? 'active-page' : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        {/* next button */}
        <button
          type="button"
          onClick={nextPage}
          className={`next round ${currentPage === pages ? 'disabled' : ''}`}
        >
          {'>'}
        </button>
      </div>
    </>
  );
}

export default PaginationComponent;