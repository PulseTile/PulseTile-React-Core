import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import classNames from 'classnames';

const SortableTableHeaderCell = ({ name, title, icon, onClick, sortingOrder }) => (
  <th
    className={classNames('sorted', sortingOrder)}
    name={name}
    onClick={e => onClick(e, name)}
  >
    <span>{title}</span>
    {icon}
  </th>
);

SortableTableHeaderCell.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sortingOrder: PropTypes.oneOf([null, 'asc', 'desc']).isRequired,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
}

export default SortableTableHeaderCell;
