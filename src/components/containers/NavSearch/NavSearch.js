import React, { PureComponent } from 'react';
import Dropdown from 'simple-react-dropdown'

import SearchOptions from './SearchOptions'
import PTButton from '../../ui-elements/PTButton/PTButton';
import BasicPatientSearch from '../BasicPatientSearch/BasicPatientSearch';
import AdvancedPatientSearch from '../AdvancedPatientSearch/AdvancedPatientSearch';

const BASIC_SEARCH = 'basicSearch';
const ADVANCED_SEARCH = 'advancedSearch';

export default class NavSearch extends PureComponent {
  state = {
    selected: BASIC_SEARCH,
  };

  handleSelect = (selected) => {
    this.setState({ selected });
    //TODO remove this spike to close dropdown
    document.body.click();
  }

  render() {
    const { selected } = this.state;

    return <div className="wrap-search wrap-header-search">
      <div className="header-search">
        <div className="control-group left control-search-select dropdown">
          <Dropdown content={<SearchOptions onSelect={this.handleSelect} {...{ BASIC_SEARCH, ADVANCED_SEARCH }} />}>
            <PTButton className="btn btn-dropdown-toggle btn-search-toggle">
              <i className="btn-icon fa fa-bars" />
            </PTButton>
          </Dropdown>
        </div>
        { selected === BASIC_SEARCH && <BasicPatientSearch /> }
        { selected === ADVANCED_SEARCH && <AdvancedPatientSearch onClose={() => this.handleSelect(BASIC_SEARCH)} /> }
      </div>
    </div>
  }
}
