import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({pageSize, itemsCount, currentPage, onPageChange}) => {
  const pagesCount = Math.ceil (itemsCount / pageSize);
  if (pagesCount <= 1) return null;
  const pages = _.range (1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map (page => (
          <li
            className={`page-item ${page === currentPage && 'active'}`}
            key={page}
          >
            <button className="page-link" onClick={() => onPageChange (page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
