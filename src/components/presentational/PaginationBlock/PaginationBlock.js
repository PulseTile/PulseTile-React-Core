import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

const PaginationBlock = ({ entriesPerPage, totalEntriesAmount, offset, setOffset }) => {
  const isFirstPage = offset < entriesPerPage;
  const isLastPage = offset >= totalEntriesAmount - entriesPerPage;
  const pagesAmount = Math.ceil(totalEntriesAmount / entriesPerPage);
  const currentPage = Math.floor(offset / entriesPerPage) + 1;

  const setPage = page => () => {
    if (page < 1) return setPage(1);
    if (page > pagesAmount) return setPage(pagesAmount);
    return setOffset((page - 1) * entriesPerPage)
  };

  const pagination = (currentPage, collectionLength, rowsPerPage) => {
    const pages = [];
    const maxSizePage = 6;
    const totalPages = Math.ceil(collectionLength / 10);
    let paginationRange;

    if (rowsPerPage > maxSizePage) {
      paginationRange = maxSizePage;
    } else {
      paginationRange = rowsPerPage;
    }

    const halfWay = Math.ceil(paginationRange / 2);
    let position;

    if (currentPage <= halfWay) {
      position = 'start';
    } else if (totalPages - halfWay < currentPage) {
      position = 'end';
    } else {
      position = 'middle';
    }

    const ellipsesNeeded = paginationRange < totalPages;
    let i = 1;
    while (i <= totalPages && i <= paginationRange) {
      const pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);
      
      const openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
      const closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
      if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
        pages.push('...');
      } else {
        pages.push(pageNumber);
      }
      i++;
    }
    return pages;
  };

  const calculatePageNumber = (i, currentPage, paginationRange, totalPages) => {
    const halfWay = Math.ceil(paginationRange / 2);
    if (i === paginationRange) {
      return totalPages;
    } else if (i === 1) {
      return i;
    } else if (paginationRange < totalPages) {
      if (totalPages - halfWay < currentPage) {
        return totalPages - paginationRange + i;
      } else if (halfWay < currentPage) {
        return currentPage - halfWay + i;
      } else {
        return i;
      }
    } else {
      return i;
    }
  };

  return (<ul className="pagination-block">
    <li className={classNames('pagination-item arrow', { disabled: isFirstPage })}>
      <button className="pagination-link" onClick={isFirstPage ? _.noop : setPage(1)}>«</button>
    </li>
    <li className={classNames('pagination-item arrow short-show', { disabled: isFirstPage })}>
      <button className="pagination-link pp" onClick={isFirstPage ? _.noop : setPage(currentPage - 1)}>‹</button>
    </li>
    { pagination(currentPage, totalEntriesAmount, pagesAmount).map(pageIndex =>
        <li className={classNames('pagination-item short-show', {active: currentPage === pageIndex, disabled: pageIndex === '...'})} key={_.uniqueId('__PaginationBlock__li__')}>
          <button className="pagination-link" onClick={pageIndex === '...' ? _.noop : setPage(pageIndex)}>{pageIndex}</button>
        </li>
    )}
    <li className={classNames('pagination-item arrow short-show', { disabled: isLastPage })}>
      <button className="pagination-link nn" onClick={isLastPage ? _.noop : setPage(currentPage + 1)}>›</button>
    </li>
    <li className={classNames('pagination-item arrow', { disabled: isLastPage })}>
      <button className="pagination-link" onClick={isLastPage ? _.noop : setPage(pagesAmount)}>»</button>
    </li>
  </ul>)
};

PaginationBlock.propTypes = {
  entriesPerPage: PropTypes.number.isRequired,
  totalEntriesAmount: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
};

export default PaginationBlock
