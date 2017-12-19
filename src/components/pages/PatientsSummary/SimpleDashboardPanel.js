import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

const SimpleDashboardPanel = ({ title, items, goToState, state, isHasPreview, isHasList, srcPrevirew }) => {
  return (<div className="dashboard-item">
    <div className="board">
      <div className="board-header">
        <div className="control-group right">
          <button className="btn btn-success btn-inverse btn-board-more" onClick={() => goToState(state)}><i className="btn-icon fa fa-caret-right" /></button>
        </div>
        <h3 className="board-title">{ title }</h3>
      </div>
      <div className="board-body">
        {isHasPreview
          ? <div className="board-preview" style={{ backgroundImage: `url(${srcPrevirew})` }} ></div>
          : null
        }
        {isHasList
          ? <ul className="board-list">
              {items.map(item =>
                <li className="board-list-item" key={_.uniqueId('__SimpleDashboardPanel__item__')} onClick={() => goToState(`${state}/${item.sourceId}`)}>
                  {item.sourceId ? <span className="board-list-link" >{item.text}</span> : null}
                </li>)}
            </ul>
          : null}
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
