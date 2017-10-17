import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import classNames from 'classnames';

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
    hoveredRowIndex: PropTypes.number,
  };

  render() {
    const { rowData, headers, onCellClick, columnNameSortBy, onMouseEnter, onMouseLeave, hoveredRowIndex, index, table } = this.props;
    const userId = _.flow(_.find({ name: 'id' }), _.get('value'))(rowData);
    const sourceId = _.flow(_.find({ name: 'sourceId' }), _.get('value'))(rowData);

    const rowDataItem = rowData.map((rowItem, index) => {
      return <td data-table-hover data-th={headers[index].title} key={_.uniqueId('__SortableTableRow__')} name={rowItem.name} onClick={() => onCellClick(userId, rowItem.name, sourceId)} className={classNames({ 'sorted': rowItem.name === columnNameSortBy, 'text-center': (table === 'patientsList' && rowItem.name !== 'name' && rowItem.name !== 'address') })}>{rowItem.value}</td>
    });

    return (<tr onMouseEnter={() => onMouseEnter(index)} onMouseLeave={() => onMouseLeave()} className={classNames({ hovered: hoveredRowIndex === index })}>
      {rowDataItem}
    </tr>)
  }
}
