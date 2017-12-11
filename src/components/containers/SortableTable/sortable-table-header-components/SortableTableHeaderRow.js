import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

import SortableTableHeaderCell from './SortableTableHeaderCell';

export default class SortableTableHeaderRow extends PureComponent {
    static propTypes = {
      headers: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        transformer: PropTypes.func,
      })).isRequired,
      onHeaderCellClick: PropTypes.func.isRequired,
      columnNameSortBy: PropTypes.string.isRequired,
    };

    state = {
      sortingOrder: 'asc',
    };

    getNextSorting = (name, sortingOrder) => {
      /* istanbul ignore next */
      if (this.props.columnNameSortBy !== name) { return 'asc'; }

      /* istanbul ignore next */
      switch (sortingOrder) {
        case 'asc':
          return 'desc';
        case 'desc':
        default:
          return 'asc';
      }
    };

    handleCellClick = (e, name) => {
      /* istanbul ignore next */
      if (name !== 'viewPatientNavigation') {
        const { onHeaderCellClick } = this.props;
        const sortingOrder = this.getNextSorting(name, this.state.sortingOrder);
        this.setState({ sortingOrder });
        if (_.isFunction(onHeaderCellClick)) onHeaderCellClick(e, { name, sortingOrder })
      }
    };

    render() {
      const { sortingOrder } = this.state;
      const { columnNameSortBy } = this.props;
      const getSortingOrder = name => (name === columnNameSortBy
        ? sortingOrder
        : null);

      return (<tr>
        {this.props.headers.map(({ key, title, icon }) => <SortableTableHeaderCell
          key={_.uniqueId('__SortableTableHeaderCell__')}
          onClick={this.handleCellClick}
          sortingOrder={getSortingOrder(key)}
          name={key}
          {...{ title, icon }}
        />)}
      </tr>)
    }
}
