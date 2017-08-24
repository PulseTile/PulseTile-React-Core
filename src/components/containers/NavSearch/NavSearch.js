import React from 'react';
import Dropdown from 'simple-react-dropdown'

import SearchContent from '../SearchContent/SearchContent'
import PTButton from '../PTButton/PTButton';

const NavSearch = () => {
  return (
    <div className="wrap-search wrap-header-search">
      <div className="header-search">
        <div className="control-group left control-search-select dropdown">
          <Dropdown content={<SearchContent />}>
            <PTButton className="btn btn-dropdown-toggle btn-search-toggle"
              children={(
                <i className="btn-icon fa fa-bars" />
              )}
            />
          </Dropdown>
        </div>
        <PTButton className="btn btn-search"
          children={(
            <i className="btn-icon fa fa-search" />
          )}
        />
        <div className="wrap-search-holder">
          <div className="search-holder">
            <form>
              <input className="form-control" placeholder="Search" type="text" />
            </form>
            <i className="clearAll fa fa-times-circle" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default NavSearch;
