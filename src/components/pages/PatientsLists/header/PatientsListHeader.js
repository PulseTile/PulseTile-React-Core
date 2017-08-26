import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom'

import PatientsInfoPanel from './PatientsInfoPanel';
import PTButton from '../../../ui-elements/PTButton/PTButton';

export default class PatientsListHeader extends PureComponent {
    static propTypes = {
      onFilterChange: PropTypes.func.isRequired,
      onColumnsSelected: PropTypes.func.isRequired,
      selectedColumns: PropTypes.objectOf(PropTypes.bool).isRequired,
    };

    state = {
      isFilterInputVisible: false,
      isPatientInfoPanelVisible: false,
    };

    toggleFilterInputVisibility = () => this.setState(prevState => ({ isFilterInputVisible: !prevState.isFilterInputVisible }),
      () => !this.state.isFilterInputVisible && this.props.onFilterChange({ target: { value: '' } })
    );

    togglePatientInfoPanelVisibility = (e, visibility) => {
      /*if (findDOMNode(this).contains(e.target)) {
          console.log('inside')
          e.nativeEvent.stopPropagation();
      }*/
      this.setState(prevState => _.cond([
        [_.isUndefined, () => ({ isPatientInfoPanelVisible: !prevState.isPatientInfoPanelVisible })],
        [v => v, isPatientInfoPanelVisible => ({ isPatientInfoPanelVisible })],
      ])(visibility))
    }

    render() {
      const { isFilterInputVisible, isPatientInfoPanelVisible } = this.state;
      const { onFilterChange, onColumnsSelected, selectedColumns } = this.props;

      return (
        <div className="panel-heading">
          <div className="control-group right">
            <div className={classNames('dropdown', { open: isPatientInfoPanelVisible })}>
              <PTButton className="btn btn-success btn-inverse btn-dropdown-toggle open" onClick={this.togglePatientInfoPanelVisibility}>
                <i className="btn-icon fa fa-cog" />
              </PTButton>
              {isPatientInfoPanelVisible && <PatientsInfoPanel onColumnsSelected={onColumnsSelected} selectedColumns={selectedColumns} toggleVisibility={this.togglePatientInfoPanelVisibility} />}
            </div>
            <PTButton className="btn btn-success btn-inverse btn-filter" onClick={this.toggleFilterInputVisibility}>
              <i className="btn-icon fa fa-filter" />
            </PTButton>
          </div>
          <h3 className="panel-title">Patient info</h3>
          {isFilterInputVisible && <div className="panel-filter">
            <div className="inner-addon addon-left">
              <div className="addon">
                <i className="fa fa-filter" />
              </div>
              <input className="form-control" placeholder="Filter..." onChange={onFilterChange} />
            </div>
          </div>}
        </div>
      )
    }
}
