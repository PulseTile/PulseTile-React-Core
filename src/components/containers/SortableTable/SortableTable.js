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
    };

    getSortableTableRows = (rowsData) => {
      const { onCellClick } = this.props;

      return _.cond([
        [_.negate(_.isEmpty), _.map(rowData =>
          <SortableTableRow
            key={_.uniqueId('__SortableTableRow__')}
            rowData={rowData}
            onCellClick={onCellClick}
          />)],
        [_.T, () => <SortableTableEmptyDataRow />],
      ])(rowsData);
    }

    render() {
      const { headers, data, onHeaderCellClick } = this.props;
      const rowsData = getArrByTemplate(headers, data);

      return (
        <div>
          <table
            className="table table-striped table-bordered table-hover table-sorted"
          >
            <colgroup>
              {/*//TODO inject theme here*/}
              <col />
            </colgroup>
            <thead>
              <SortableTableHeaderRow
                headers={headers}
                onHeaderCellClick={onHeaderCellClick}
              />
            </thead>
            <tbody>
              {this.getSortableTableRows(rowsData)}
            </tbody>
          </table>
        </div>)
    }
}

