import React, { PureComponent } from 'react';
import classNames from 'classnames';

import SearchOptions from './SearchOptions'
import PTButton from '../../ui-elements/PTButton/PTButton';
import BasicPatientSearch from '../BasicPatientSearch/BasicPatientSearch';
import AdvancedPatientSearch from '../AdvancedPatientSearch/AdvancedPatientSearch';
import ClinicalQuerySearch from '../ClinicalQuerySearch/ClinicalQuerySearch';
import PropTypes from 'prop-types';

const BASIC_SEARCH = 'basicSearch';
const ADVANCED_SEARCH = 'advancedSearch';
const SEARCH_CONTENT = 'searchContent';

export default class NavSearch extends PureComponent {
  state = {
    selected: BASIC_SEARCH,
    openedPanel: '',
    openedSearchPanel: true,
  };

  handleSelect = (selected) => {
    this.setState({ selected });
    //TODO remove this spike to close dropdown
    document.body.click();
  };

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
    this.changeResolution();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.setState({ openedPanel: '' });
    }
  };

  handleMouseDown = (name) => {
    this.setState((prevState) => {
      if (prevState.openedPanel !== name) {
        return ({ openedPanel: name })
      }
      return ({ openedPanel: '' })
    })
  };

  runSearch = () => {
    this.setState(prevState => ({
      openedSearchPanel: !prevState.openedSearchPanel,
    }));
  };

  changeResolution = () => {
    if (window.innerWidth < 768) {
      this.state.openedSearchPanel = false;
    }
  };


  render() {
    const { selected, openedPanel, openedSearchPanel } = this.state;
    console.log(openedSearchPanel);

    return (
      <div className="header-search-container">
        <NavSearchButton runSearch={this.runSearch} />
        <div className="wrap-search wrap-header-search" ref={node => this.node = node}>
          { openedSearchPanel &&
          <div className="header-search">
            <div
              className={classNames('control-group left control-search-select dropdown', { 'open': openedPanel === SEARCH_CONTENT })}>
              <div>
                <SearchOptions onSelect={this.handleSelect} {...{
                  selected,
                  BASIC_SEARCH,
                  ADVANCED_SEARCH,
                  SEARCH_CONTENT
                }} />
                <PTButton className="btn btn-dropdown-toggle btn-search-toggle" aria-label="Search"
                          onClick={() => this.handleMouseDown(SEARCH_CONTENT)}>
                  <i className="btn-icon fa fa-bars"/>
                </PTButton>
              </div>
            </div>
            {selected === BASIC_SEARCH && <BasicPatientSearch/>}
            {selected === ADVANCED_SEARCH &&
            <AdvancedPatientSearch className="advanced-search" onClose={() => this.handleSelect(BASIC_SEARCH)}/>}
            {selected === SEARCH_CONTENT &&
            <ClinicalQuerySearch className="clinical-query-search" onClose={() => this.handleSelect(BASIC_SEARCH)}/>}
          </div>
          }
        </div>
      </div>

    )
  }
};

const NavSearchButton = ({ runSearch }) => {
  return (
    <PTButton title="Search" id="search" aria-label="Search" className="btn-header search-btn" onClick={() => runSearch()}>
      <i className="fa fa-search" />
    </PTButton>
  );
};
NavSearchButton.propTypes = {
  runSearch: PropTypes.func,
};
NavSearchButton.defaultProps = {
  runSearch: function () { },
};
