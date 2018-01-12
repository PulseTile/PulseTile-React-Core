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
    columnNameSortBy: PropTypes.string.isRequired,
  };

  render() {
    const { rowData, headers, onCellClick, columnNameSortBy, id } = this.props;
    const sourceId = _.flow(_.find({ name: 'sourceId' }), _.get('value'))(rowData);

    const rowDataItem = rowData.map((rowItem, index) => {
      if (rowItem.highlighter) {
        return (
          <td data-table-hover data-th={headers[index].title} key={_.uniqueId('__SortableTableRow__')} name={rowItem.name} onClick={() => onCellClick(sourceId)} className={classNames('highlighter-wrapper', { 'sorted': rowItem.name === columnNameSortBy })}>
            <span>
              <span className={`highlighter-${rowItem.highlighter}`} />
              <span>{ rowItem.value }</span>
            </span>
          </td>
        )
      }
      return <td data-table-hover data-th={headers[index].title} key={_.uniqueId('__SortableTableRow__')} name={rowItem.name} onClick={() => onCellClick(sourceId)} className={classNames({ 'sorted': rowItem.name === columnNameSortBy })}>{rowItem.value}</td>
    });

    return (<tr className={classNames({ 'info': id === sourceId })}>
      {rowDataItem}
    </tr>)
  }
}
