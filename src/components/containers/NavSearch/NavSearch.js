import React from 'react';
import Dropdown from 'simple-react-dropdown'

import SearchContent from '../../presentational/SearchContent/SearchContent'
import BasicPatientSearch from './BasicPatientSearch';
import PTButton from '../../ui-elements/PTButton/PTButton';

const NavSearch = () =>
  <div className="wrap-search wrap-header-search">
    <div className="header-search">
      <div className="control-group left control-search-select dropdown">
        <Dropdown content={<SearchContent />}>
          <PTButton className="btn btn-dropdown-toggle btn-search-toggle">
            <i className="btn-icon fa fa-bars" />
          </PTButton>
        </Dropdown>
      </div>
      <BasicPatientSearch />
    </div>
  </div>

export default NavSearch;
