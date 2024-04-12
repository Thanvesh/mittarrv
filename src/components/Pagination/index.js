import React from 'react';
import PropTypes from 'prop-types';
import "./Pagination.css"

const Pagination = ({ currentPage, onPageChange, data, itemsPerPage }) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5; // Maximum number of page numbers to show initially

    let startPageNumber;
    let endPageNumber;

    if (totalPages <= maxPageNumbersToShow) {
        startPageNumber = 1;
        endPageNumber = totalPages;
    } else {
        if (currentPage <= Math.ceil(maxPageNumbersToShow / 2)) {
            startPageNumber = 1;
            endPageNumber = maxPageNumbersToShow;
        } else if (currentPage + Math.floor(maxPageNumbersToShow / 2) >= totalPages) {
            startPageNumber = totalPages - maxPageNumbersToShow + 1;
            endPageNumber = totalPages;
        } else {
            startPageNumber = currentPage - Math.floor(maxPageNumbersToShow / 2);
            endPageNumber = currentPage + Math.floor(maxPageNumbersToShow / 2);
        }
    }

    for (let i = startPageNumber; i <= endPageNumber; i++) {
        pageNumbers.push(
            <li key={i} className={i === currentPage ? 'active' : 'page-number'}>
                <button type="button" className={i === currentPage ? 'btn-active' : ''} onClick={() => onPageChange(i)}>
                    {i}
                </button>
            </li>
        );
    }

    if (startPageNumber > 1) {
        pageNumbers.unshift(
            <li key="prev" className="page-number">
                <button type="button" onClick={() => onPageChange(startPageNumber - 1)}>
                    &laquo;
                </button>
            </li>
        );
    }

    if (endPageNumber < totalPages) {
        pageNumbers.push(
            <li key="next" className="page-number">
                <button type="button" onClick={() => onPageChange(endPageNumber + 1)}>
                    &raquo;
                </button>
            </li>
        );
    }

    return pageNumbers;
  };

  // Calculate the range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const displayedItems = data.slice(startIndex, endIndex);

  return (
    <div>
      <ul className="pagination">
        {renderPageNumbers()}
      </ul>
      <div>
        {displayedItems.map((item, index) => (
          // Render your item component here
          // Ensure that you pass the item data to your item component
          // Example: <YourItemComponent key={index} item={item} />
          <div key={index}>{/* Render your item component here */}</div>
        ))}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default Pagination;
