import React from 'react';
import PropTypes from 'prop-types';

const SortableTableHeaderRow = props => <tr>
  {props.headers.map(({ name, title, icon, onClick }) =>
    <th name={name} onClick={onClick || (e => console.log(e))}>
      <span>{title}</span>
      {icon}
    </th>)}
</tr>

SortableTableHeaderRow.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  })).isRequired,
};

export default SortableTableHeaderRow
