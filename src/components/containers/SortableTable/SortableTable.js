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

  state = {
    hoveredRowIndex: '',
  };

  getSortableTableRows = (rowsData) => {
    const { onCellClick, columnNameSortBy, headers } = this.props;
    const { hoveredRowIndex } = this.state;

    return (
      !_.isEmpty(rowsData) ? rowsData.map((rowData, index) =>
        <SortableTableRow
          key={_.uniqueId('__SortableTableRow__')}
          rowData={rowData}
          onCellClick={onCellClick}
          columnNameSortBy={columnNameSortBy}
          headers={headers}
          onMouseEnter={this.hoverTableRow}
          onMouseLeave={this.unHoverTableRow}
          hoveredRowIndex={hoveredRowIndex}
          ref={(el) => { this.tableRow = el; }}
          index={index}
        />) : <SortableTableEmptyDataRow />
    )
  };

  hoverTableRow = (index) => {
    this.setState({ hoveredRowIndex: index });
  };

  unHoverTableRow = () => {
    this.setState({ hoveredRowIndex: '' });
  };

  // resizeFixedTables = () => {
  //   const tableNames = this.tableNames;
  //   const tableControls = this.tableControls;
  //   const tableFull = this.tableFull;
  //
  //   if (tableNames && tableControls && tableFull) {
  //     const tableFullRows = _.last(tableFull.children).children;
  //     const tds = _.head(tableFullRows).children;
  //
  //     tableNames.style.width = `${_.head(tds).offsetWidth + 1}px`;
  //     tableControls.style.width = `${tds[tds.length - 1].offsetWidth}px`;
  //
  //     const height = _.head(tableFullRows).offsetHeight;
  //     this.tableRow.setState({ height: `${height}px` });
  //   }
  // };

  render() {
    const { headers, data, onHeaderCellClick, sortingOrder, columnNameSortBy, table } = this.props;
    const rowsData = getArrByTemplate(headers, data);
    const headersName = [_.head(headers)];
    const headersView = [_.last(headers)];
    const rowsDataName = rowsData.map(el => el.filter(el => (el.name === 'name' || el.name === 'id')));
    const rowsDataView = rowsData.map(el => el.filter(el => el.name === 'viewPatientNavigation'));

    // setTimeout(() => this.resizeFixedTables());
    // window.addEventListener('resize', () => {
    //   this.resizeFixedTables()
    // });
    return (
      <div>
        {table === 'patientsList' ? <table
          className="table table-striped  table-bordered table-sorted table-hover table-fixedcol table-patients-name"
          ref={(el) => { this.tableNames = el; }}
        >
          <colgroup>
            {/*//TODO inject theme here*/}
            {headersName.map(item => <col style={{ width: item.width }} key={_.uniqueId('__colHeadersName__')}></col>)}
          </colgroup>
          <thead>
            <SortableTableHeaderRow
              headers={headersName}
              onHeaderCellClick={onHeaderCellClick}
              sortingOrder={sortingOrder}
              columnNameSortBy={columnNameSortBy}
            />
          </thead>
          <tbody>
            {this.getSortableTableRows(rowsDataName)}
          </tbody>
        </table> : null }
        <table
          className={`table table-striped table-bordered table-sorted table-hover table-fixedcol table-patients-full rwd-table ${table}`}
          ref={(el) => { this.tableFull = el; }}
        >
          <colgroup>
            {/*//TODO inject theme here*/}
            {headers.map(item => <col style={{ width: item.width }} key={_.uniqueId('__colHeaders__')}></col>)}
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
            {this.getSortableTableRows(rowsData)}
          </tbody>
        </table>
        {table === 'patientsList' ? <table
          className="table table-striped table-bordered table-sorted table-fixedcol table-patients-controls"
          ref={(el) => { this.tableControls = el; }}
        >
          <colgroup>
            {/*//TODO inject theme here*/}
            {headersView.map(item => <col style={{ width: item.width }} key={_.uniqueId('__colHeadersView__')}></col>)}
          </colgroup>
          <thead>
            <SortableTableHeaderRow
              headers={headersView}
              onHeaderCellClick={onHeaderCellClick}
              sortingOrder={sortingOrder}
              columnNameSortBy={columnNameSortBy}
            />
          </thead>
          <tbody>
            {this.getSortableTableRows(rowsDataView)}
          </tbody>
        </table> : null }
      </div>)
  }
}

