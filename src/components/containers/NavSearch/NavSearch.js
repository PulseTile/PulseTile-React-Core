import React from 'react';
import PTButton from '../PTButton/PTButton';

const NavSearch = props => <div className="wrap-search wrap-header-search">
  <div className="header-search">
    <div className="control-group left control-search-select dropdown">
      <PTButton className="btn btn-dropdown-toggle btn-search-toggle"
        children={(
          <i className="btn-icon fa fa-bars"/>
        )}
      />
      <div className="dropdown-menu dropdown-menu-search-select dropdown-menu-panel dropdown-menu-left dropdown-menu-small-size">
        <div className="heading">Search Options</div>
        <div className="dropdown-menu-wrap-list">
          <div className="dropdown-menu-list">
            <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Patient Search - Basic</span></div>
            <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">test</span></div>
          </div>
        </div>
      </div>
    </div>
    <PTButton className="btn btn-search"
      children={(
        <i className="btn-icon fa fa-search"/>
      )}
    />
    <div className="wrap-search-holder">
      <div className="search-holder">
        <form>
          <input className="form-control" placeholder="Search" type="text"/>
        </form>
        <i className="clearAll fa fa-times-circle"/>
      </div>
    </div>
  </div>
</div>;

export default NavSearch;
