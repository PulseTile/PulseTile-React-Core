import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

const SimpleDashboardPanel = ({ title, items, navigateTo }) => {
  return (<div className="dashboard-item">
    <div className="board">
      <div className="board-header">
        <div className="control-group right">
          <button className="btn btn-success btn-inverse btn-board-more" onClick={navigateTo}><i className="btn-icon fa fa-caret-right" /></button>
        </div>
        <h3 className="board-title">{ title }</h3>
      </div>
      <div className="board-body">
        <ul className="board-list">
          {items.map(item =>
            <li className="board-list-item" id={_.uniqueId('__SimpleDashboardPanel__item__')}>
              <span className="board-list-link" >{item}</span>
            </li>)}
        </ul>
      </div>
    </div>
  </div>)
};

SimpleDashboardPanel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  navigateTo: PropTypes.func.isRequired,
};

export default SimpleDashboardPanel