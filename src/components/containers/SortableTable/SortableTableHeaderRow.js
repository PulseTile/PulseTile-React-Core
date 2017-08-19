import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

const SortableTableHeaderCell = ({ name, title, icon, onClick }) => <th
  className="sorted asc"
  name={name}
  onClick={onClick || (e => console.log(e.target))}
>
  <span>{title}</span>
  {icon}
</th>

const SortableTableHeaderRow = props => <tr>
  {props.headers.map(({ name, title, icon, onClick }) => <SortableTableHeaderCell
    key={_.uniqueId('__SortableTableHeaderRow__')}
    {...{ name, title, icon, onClick }}
  />)}
</tr>

SortableTableHeaderRow.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    transformer: PropTypes.func,
  })).isRequired,
};

export default SortableTableHeaderRow
