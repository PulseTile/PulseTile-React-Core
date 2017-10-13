import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import classNames from 'classnames';
import { formatNHSNumber } from '../../../utils/table-helpers/table.utils';

export default class SortableTableRow extends PureComponent {
  static propTypes = {
    rowData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
    onCellClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    columnNameSortBy: PropTypes.string.isRequired,
    hoveredRowName: PropTypes.string,
  };

  state = {
    height: '',
  };

  render() {
    const { rowData, headers, onCellClick, columnNameSortBy, onMouseEnter, onMouseLeave, hoveredRowName } = this.props;
    const { height } = this.state;
    const userId = _.flow(_.find({ name: 'id' }), _.get('value'))(rowData);
    const userName = _.flow(_.find({ name: 'name' }), _.get('value'))(rowData);
    const sourceId = _.flow(_.find({ name: 'sourceId' }), _.get('value'))(rowData);
    const tableRowStyle = {height,};

    const rowDataItem = rowData.map((rowItem, index) => {
      if (rowItem.name === 'id') {
        return <td data-table-hover data-th={headers[index].title} key={_.uniqueId('__SortableTableRow__')} name={rowItem.name} onClick={() => onCellClick(userId, rowItem.name, sourceId)} className={classNames({ 'sorted': rowItem.name === columnNameSortBy })}>{formatNHSNumber(rowItem.value)}</td>
      }
      return <td data-table-hover data-th={headers[index].title} key={_.uniqueId('__SortableTableRow__')} name={rowItem.name} onClick={() => onCellClick(userId, rowItem.name, sourceId)} className={classNames({ 'sorted': rowItem.name === columnNameSortBy })}>{rowItem.value}</td>
    });

    return (<tr style={tableRowStyle} onMouseEnter={() => onMouseEnter(userName)} onMouseLeave={() => onMouseLeave()} className={classNames({ hovered: hoveredRowName === userName })}>
      {rowDataItem}
    </tr>)
  }
}
