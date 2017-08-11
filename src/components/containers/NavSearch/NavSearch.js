import React from 'react';
import Dropdown from 'simple-react-dropdown'
import SearchContent from '../SearchContent/SearchContent'

class NavSearch extends React.Component {
  render () {
    return(
      <div className="wrap-search wrap-header-search">
        <div className="header-search">
          <div className="control-group left control-search-select dropdown">
            <Dropdown content={<SearchContent />}>
              <button className="btn btn-dropdown-toggle btn-search-toggle"><i className="btn-icon fa fa-bars"/></button>
            </Dropdown>
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
      </div>
    )
  }
}

export default NavSearch;
