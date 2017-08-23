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

  return (<ul className="pagination-block">
    <li className={classNames('pagination-item arrow', { disabled: isFirstPage })}>
      <button className="pagination-link" onClick={isFirstPage ? _.noop : setPage(1)}>«</button>
    </li>
    <li className={classNames('pagination-item arrow short-show', { disabled: isFirstPage })}>
      <button className="pagination-link pp" onClick={isFirstPage ? _.noop : setPage(currentPage - 1)}>‹</button>
    </li>
    {_.times(pageIndex =>
      <li className={classNames('pagination-item short-show', { active: currentPage === pageIndex + 1 })} key={_.uniqueId('__PaginationBlock__li__')}>
        <button className="pagination-link" onClick={setPage(pageIndex + 1)}>{pageIndex + 1}</button>
      </li>
      , pagesAmount)}
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
