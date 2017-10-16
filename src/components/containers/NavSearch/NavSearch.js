import React, { PureComponent } from 'react';
import Dropdown from 'simple-react-dropdown'

import SearchOptions from './SearchOptions'
import PTButton from '../../ui-elements/PTButton/PTButton';
import BasicPatientSearch from '../BasicPatientSearch/BasicPatientSearch';
import AdvancedPatientSearch from '../AdvancedPatientSearch/AdvancedPatientSearch';
import { isIDCRRole } from '../../../utils/auth/auth-check-permissions';

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
    const { userAccount } = this.props;

    return <div className="wrap-search wrap-header-search">
      <div className="header-search">
        <div className="control-group left control-search-select dropdown">
          {isIDCRRole(userAccount) ?
            <Dropdown content={<SearchOptions onSelect={this.handleSelect} {...{ BASIC_SEARCH, ADVANCED_SEARCH }} />}>
              <PTButton className="btn btn-dropdown-toggle btn-search-toggle">
                <i className="btn-icon fa fa-bars" />
              </PTButton>
            </Dropdown>
            :
            <PTButton className="btn btn-dropdown-toggle btn-search-toggle">
              <i className="btn-icon fa fa-bars" />
            </PTButton>
          }
        </div>
        { selected === BASIC_SEARCH && <BasicPatientSearch /> }
        { selected === ADVANCED_SEARCH && <AdvancedPatientSearch onClose={() => this.handleSelect(BASIC_SEARCH)} /> }
      </div>
    </div>
  }
}
