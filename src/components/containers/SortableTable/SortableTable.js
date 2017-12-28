import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

import SortableTableHeaderRow from './sortable-table-header-components/SortableTableHeaderRow';
import SortableTableRow from './SortableTableRow';
import SortableTableEmptyDataRow from './SortableTableEmptyDataRow';
import { getArrByTemplate } from '../../../utils/table-helpers/table.utils';

export default class SortableTable extends PureComponent {
  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onHeaderCellClick: PropTypes.func.isRequired,
    onCellClick: PropTypes.func.isRequired,
    sortingOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
    columnNameSortBy: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
  };

  static defaultProps = {
    table: '',
  };

  getSortableTableRows = (rowsData, resourceData, emptyDataMessage) => {
    const { onCellClick, columnNameSortBy, headers, table, id } = this.props;
    const amountCollumns = headers.length - 1;
    return (
      _.isUndefined(resourceData)
        ? <SortableTableEmptyDataRow isLoading emptyDataMessage={emptyDataMessage} amountCollumns={amountCollumns} />
        : !resourceData.length
          ? <SortableTableEmptyDataRow isLoading={false} emptyDataMessage={emptyDataMessage} amountCollumns={amountCollumns} />
          : rowsData.map((rowData, index) =>
            <SortableTableRow
              key={_.uniqueId('__SortableTableRow__')}
              rowData={rowData}
              onCellClick={onCellClick}
              columnNameSortBy={columnNameSortBy}
              headers={headers}
              index={index}
              table={table}
              resourceData={resourceData}
              id={id}
            />)
    )
  };

  render() {
    const { headers, data, onHeaderCellClick, sortingOrder, columnNameSortBy, table, resourceData, emptyDataMessage } = this.props;
    const rowsData = getArrByTemplate(headers, data);

    return (
      <table className={`table table-striped table-bordered table-sorted table-hover table-fixedcol table-patients-full rwd-table ${table}`}>
        <colgroup>
          {headers.map((item) => {
            if (item.display) {
              return (<col style={{ width: item.width, display: item.display }} key={_.uniqueId('__colHeaders__')}></col>)
            }
            return (<col style={{ width: item.width }} key={_.uniqueId('__colHeaders__')}></col>)
          })}
        </colgroup>
        <thead>
          <SortableTableHeaderRow
            headers={headers}
            onHeaderCellClick={onHeaderCellClick}
            sortingOrder={sortingOrder}
            columnNameSortBy={columnNameSortBy}
          />
        </thead>
        <tbody>
          {this.getSortableTableRows(rowsData, resourceData, emptyDataMessage)}
        </tbody>
      </table>
    )
  }
}

