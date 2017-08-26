import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

const SortableTableRow = props => <tr>
  {_.map(rowDataEntry => <td key={_.uniqueId('__SortableTableRow__')}>{rowDataEntry}</td>, props.rowData)}
</tr>;

SortableTableRow.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default SortableTableRow
