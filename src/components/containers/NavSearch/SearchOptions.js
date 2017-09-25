import React from 'react';
import PropTypes from 'prop-types';

const SearchContent = ({ onSelect, BASIC_SEARCH, ADVANCED_SEARCH }) =>
  <div className="dropdown-menu dropdown-menu-search-select dropdown-menu-panel dropdown-menu-left dropdown-menu-small-size">
    <div className="heading">Search Options</div>
    <div className="dropdown-menu-wrap-list">
      <div className="dropdown-menu-list">
        <div className="dropdown-menu-item" onClick={() => onSelect(BASIC_SEARCH)} ><span className="dropdown-menu-item-text">Patient Search - Basic</span></div>
        <div className="dropdown-menu-item" onClick={() => onSelect(ADVANCED_SEARCH)}><span className="dropdown-menu-item-text">Patient Search - Advanced</span></div>
        <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Clinical Query</span></div>
      </div>
    </div>
  </div>

SearchContent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  BASIC_SEARCH: PropTypes.string.isRequired,
  ADVANCED_SEARCH: PropTypes.string.isRequired,
};

export default SearchContent;
