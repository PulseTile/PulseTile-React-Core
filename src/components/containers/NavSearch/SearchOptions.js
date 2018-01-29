import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SearchContent = ({ onSelect, selected, BASIC_SEARCH, ADVANCED_SEARCH, SEARCH_CONTENT }) =>
  <div className="dropdown-menu dropdown-menu-search-select dropdown-menu-panel dropdown-menu-left dropdown-menu-small-size">
    <div className="heading">Search Options</div>
    <div className="dropdown-menu-wrap-list">
      <div className="dropdown-menu-list">
        <div
          className={classNames('dropdown-menu-item', { 'active': selected === BASIC_SEARCH })}
          onClick={() => onSelect(BASIC_SEARCH)}
        ><span className="dropdown-menu-item-text">Patient Search - Basic</span></div>
        <div
          className={classNames('dropdown-menu-item', { 'active': selected === ADVANCED_SEARCH })}
          onClick={() => onSelect(ADVANCED_SEARCH)}
        ><span className="dropdown-menu-item-text">Patient Search - Advanced</span></div>
        <div
          className={classNames('dropdown-menu-item', { 'active': selected === SEARCH_CONTENT })}
          onClick={() => onSelect(SEARCH_CONTENT)}
        ><span className="dropdown-menu-item-text">Clinical Query</span></div>
      </div>
    </div>
  </div>

SearchContent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  BASIC_SEARCH: PropTypes.string.isRequired,
  ADVANCED_SEARCH: PropTypes.string.isRequired,
  SEARCH_CONTENT: PropTypes.string.isRequired,
};

export default SearchContent;
