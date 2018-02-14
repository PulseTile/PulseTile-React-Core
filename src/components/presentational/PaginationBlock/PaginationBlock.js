import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

export default class PaginationBlock extends PureComponent {
	static propTypes = {
		entriesPerPage: PropTypes.number.isRequired,
		totalEntriesAmount: PropTypes.number.isRequired,
		offset: PropTypes.number.isRequired,
		setOffset: PropTypes.func.isRequired,
	};

	getPagesAmount = () => {
		const { totalEntriesAmount, entriesPerPage } = this.props;
		return Math.ceil(totalEntriesAmount / entriesPerPage);
	};

	setPage = page => () => {
		const { setOffset, entriesPerPage } = this.props;
		const pagesAmount = this.getPagesAmount();

		if (page < 1) return this.setPage(1);
		if (page > pagesAmount) return this.setPage(pagesAmount);
		return setOffset((page - 1) * entriesPerPage)
	};

	calculatePageNumber = (i, actualPage, paginationRange, totalPages) => {
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

	pagination = (actualPage, collectionLength, rowsPerPage) => {
		const { entriesPerPage } = this.props;
		const pages = [];
		const maxSizePage = 6;
		const totalPages = Math.ceil(collectionLength / entriesPerPage);
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
			const pageNumber = this.calculatePageNumber(i, actualPage, paginationRange, totalPages);

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

	noop = () => undefined;

	render() {
		const { entriesPerPage, totalEntriesAmount, offset, isShortView } = this.props;

		const isFirstPage = offset < entriesPerPage;
		const isLastPage = offset >= totalEntriesAmount - entriesPerPage;
		const pagesAmount = this.getPagesAmount();
		const currentPage = Math.floor(offset / entriesPerPage) + 1;

		if (totalEntriesAmount < offset) {
			this.setPage(pagesAmount)();
		}

		return (
      <ul className={`pagination-block ${isShortView ? 'pagination-short' : ''}`}>
        <li className={classNames('pagination-item arrow', { disabled: isFirstPage })}>
          <a className="pagination-link" onClick={isFirstPage ? this.noop() : this.setPage(1)}>«</a>
        </li>
        <li className={classNames('pagination-item arrow short-show', { disabled: isFirstPage })}>
          <a className="pagination-link pp" onClick={isFirstPage ? this.noop() : this.setPage(currentPage - 1)}>‹</a>
        </li>
				{ this.pagination(currentPage, totalEntriesAmount, pagesAmount).map(pageIndex =>
          <li className={classNames('pagination-item', { active: currentPage === pageIndex, 'short-show': currentPage === pageIndex, disabled: pageIndex === '...' })} key={_.uniqueId('__PaginationBlock__li__')}>
            <a className="pagination-link" onClick={pageIndex === '...' ? this.noop() : this.setPage(pageIndex)}>{pageIndex}</a>
          </li>
				)}
        <li className={classNames('pagination-item arrow short-show', { disabled: isLastPage })}>
          <a className="pagination-link nn" onClick={isLastPage ? this.noop() : this.setPage(currentPage + 1)}>›</a>
        </li>
        <li className={classNames('pagination-item arrow', { disabled: isLastPage })}>
          <a className="pagination-link" onClick={isLastPage ? this.noop() : this.setPage(pagesAmount)}>»</a>
        </li>
      </ul>
		)
	}
}
