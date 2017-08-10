import React from 'react';

const NavSearch = props => <div className="wrap-search wrap-header-search">
  <div className="header-search">
    <div className="control-group left control-search-select dropdown">
      <button className="btn btn-dropdown-toggle btn-search-toggle"><i className="btn-icon fa fa-bars"/></button>
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
    <button className="btn btn-search"><i className="btn-icon fa fa-search"/></button>
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
