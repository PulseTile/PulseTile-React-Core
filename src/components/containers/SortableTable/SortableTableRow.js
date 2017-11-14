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
    const { rowData, headers, onCellClick, columnNameSortBy, resourceData, id } = this.props;
    const userId = _.flow(_.find({ name: 'id' }), _.get('value'))(rowData);
    const sourceId = _.flow(_.find({ name: 'sourceId' }), _.get('value'))(rowData);

    const warningNameField = _.flow(_.find({ warning: true }), _.get('name'))(resourceData);
    const dangerNameField = _.flow(_.find({ danger: true }), _.get('name'))(resourceData);

    const rowDataItem = rowData.map((rowItem, index) => {
      if ((rowItem.value === warningNameField || rowItem.value === dangerNameField) && rowItem.name === 'name') {
        return (
          <td data-table-hover data-th={headers[index].title} key={_.uniqueId('__SortableTableRow__')} name={rowItem.name} onClick={() => onCellClick(userId, rowItem.name, sourceId)} className={classNames('highlighter-wrapper', { 'sorted': rowItem.name === columnNameSortBy })}>
            <span>
              { rowItem.value === warningNameField ? <span className="highlighter-warning"></span> : null }
              { rowItem.value === dangerNameField ? <span className="highlighter-danger"></span> : null }
              <span > { rowItem.value }</span>
            </span>
          </td>
        )
      }
      return <td data-table-hover data-th={headers[index].title} key={_.uniqueId('__SortableTableRow__')} name={rowItem.name} onClick={() => onCellClick(userId, rowItem.name, sourceId)} className={classNames({ 'sorted': rowItem.name === columnNameSortBy })}>{rowItem.value}</td>
    });

    return (<tr className={classNames({ 'info': id === sourceId })}>
      {rowDataItem}
    </tr>)
  }
}
