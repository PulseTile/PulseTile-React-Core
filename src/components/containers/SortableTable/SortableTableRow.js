import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

const SortableTableRow = (props) => {
  const userId = _.flow(_.find({ name: 'id' }), _.get('value'))(props.rowData);

  return <tr>
    {_.map(({ name, value }) => <td key={_.uniqueId('__SortableTableRow__')} onClick={() => props.onCellClick(userId, name)}>{value}</td>, props.rowData)}
  </tr>
}

SortableTableRow.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
  onCellClick: PropTypes.func.isRequired,

};

export default SortableTableRow
