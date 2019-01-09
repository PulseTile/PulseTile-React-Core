import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { get } from 'lodash';

import { themeConfigs } from '../../../themes.config';

const SimpleDashboardPanel = ({ id, title, items, goToState, state, isHasPreview, isHasList, srcPrevirew, isFeeds }) => {
  const imageLink = (isFeeds && items.length > 0) ? items[0].link : state;
  let filterItemsArray = (items.length > 4) ? [{text: 'Loading ...'}, '', '', ''] : items;
  const isShowPagesSynopsisImages = get(themeConfigs, 'isShowPagesSynopsisImages', false);
  return (<div id={id} className="dashboard-item">
    <div className="board">
      <div className="board-header">
        <div className="control-group right">
          <button className="btn btn-success btn-inverse btn-board-more" aria-label="More" onClick={() => goToState(state)}><i className="btn-icon fa fa-caret-right" /></button>
        </div>
        <h2 className="board-title">{ title }</h2>
      </div>
      <div className="board-body">
        {(isHasPreview && isShowPagesSynopsisImages)
          ? <div
            className="board-preview"
            style={{ backgroundImage: `url(${srcPrevirew})` }}
            onClick={() => goToState(imageLink)}
          />
          : null
        }
        {isHasList
          ? <ul className="board-list">
            {filterItemsArray.map(item =>
              <li className="board-list-item" key={_.uniqueId('__SimpleDashboardPanel__item__')}>
                {item.text ? <a className="board-list-link"
                  onClick={() => goToState(`${state}/${item.sourceId}`, item.link)}
                  onKeyPress={(event) => {if( event.key == 'Enter' ){ goToState(`${state}/${item.sourceId}`, item.link) }} }
                  title={item.text}
                  tabIndex="0">
                    {item.text}
                  </a> : null}
              </li>)}
          </ul>
          : null}
      </div>
    </div>
  </div>)
};

SimpleDashboardPanel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  isFeeds: PropTypes.bool,
  id: PropTypes.string,
};
SimpleDashboardPanel.defaultProps = {
  isFeeds: false,
  id: '',
};

export default SimpleDashboardPanel
