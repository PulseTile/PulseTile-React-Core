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

  const calculatePageNumber = (i, actualPage, paginationRange, totalPages) => {
    const halfWay = Math.ceil(paginationRange / 2);
    if (i === paginationRange) {
      return totalPages;
    } else if (i === 1) {
      return i;
    } else if (paginationRange < totalPages) {
      if (totalPages - halfWay < actualPage) {
        return (totalPages - paginationRange) + i;
      } else if (halfWay < actualPage) {
        return (actualPage - halfWay) + i;
      }
      return i;
    }
    return i;
  };

  const pagination = (actualPage, collectionLength, rowsPerPage) => {
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

    if (actualPage <= halfWay) {
      position = 'start';
    } else if (totalPages - halfWay < actualPage) {
      position = 'end';
    } else {
      position = 'middle';
    }

    const ellipsesNeeded = paginationRange < totalPages;
    let i = 1;
    while (i <= totalPages && i <= paginationRange) {
      const pageNumber = calculatePageNumber(i, actualPage, paginationRange, totalPages);

      const openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
      const closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
      if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
        pages.push('...');
      } else {
        pages.push(pageNumber);
      }
      i += 1;
    }
    return pages;
  };

  return (<ul className="pagination-block">
    <li className={classNames('pagination-item arrow', { disabled: isFirstPage })}>
      <a className="pagination-link" onClick={isFirstPage ? _.noop : setPage(1)}>«</a>
    </li>
    <li className={classNames('pagination-item arrow short-show', { disabled: isFirstPage })}>
      <a className="pagination-link pp" onClick={isFirstPage ? _.noop : setPage(currentPage - 1)}>‹</a>
    </li>
    { pagination(currentPage, totalEntriesAmount, pagesAmount).map(pageIndex =>
      <li className={classNames('pagination-item short-show', { active: currentPage === pageIndex, disabled: pageIndex === '...' })} key={_.uniqueId('__PaginationBlock__li__')}>
        <a className="pagination-link" onClick={pageIndex === '...' ? _.noop : setPage(pageIndex)}>{pageIndex}</a>
      </li>
    )}
    <li className={classNames('pagination-item arrow short-show', { disabled: isLastPage })}>
      <a className="pagination-link nn" onClick={isLastPage ? _.noop : setPage(currentPage + 1)}>›</a>
    </li>
    <li className={classNames('pagination-item arrow', { disabled: isLastPage })}>
      <a className="pagination-link" onClick={isLastPage ? _.noop : setPage(pagesAmount)}>»</a>
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
