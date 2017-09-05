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

  function pagination(currentPage, totalPage, range) {
    range = range || 3;
    const arr = [];
    for (var i = 1; i <= totalPage; i++) {
      if (i <= range || (i > currentPage - range / 2 && i < currentPage + range / 2) || i > totalPage - range) {
        if (arr[arr.length - 1] && i != arr[arr.length - 1] + 1)arr.push('...');
        arr.push(i)
      }
    }

    return arr
  }

  return (<ul className="pagination-block">
    <li className={classNames('pagination-item arrow', { disabled: isFirstPage })}>
      <button className="pagination-link" onClick={isFirstPage ? _.noop : setPage(1)}>«</button>
    </li>
    <li className={classNames('pagination-item arrow short-show', { disabled: isFirstPage })}>
      <button className="pagination-link pp" onClick={isFirstPage ? _.noop : setPage(currentPage - 1)}>‹</button>
    </li>
    { pagination(currentPage, pagesAmount).map(function (pageIndex) {
      return (
        <li className={classNames('pagination-item', {active: currentPage === pageIndex, disabled: pageIndex === '...', 'short-show': currentPage === pageIndex})} key={_.uniqueId('__PaginationBlock__li__')}>
          <button className={classNames('pagination-link', { disabled: pageIndex === '...'})} onClick={setPage(pageIndex)}>{pageIndex}</button>
        </li>
      )
    })
    }
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
