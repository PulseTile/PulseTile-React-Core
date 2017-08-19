import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

const SortableTableRow = props => <tr>
  {_.map(rowDataEntry => <td key={_.uniqueId('__SortableTableRow__')}>{rowDataEntry}</td>, props.rowData)}
</tr>

SortableTableRow.propTypes = {
  rowData: PropTypes.array.isRequired,
};

export default SortableTableRow
