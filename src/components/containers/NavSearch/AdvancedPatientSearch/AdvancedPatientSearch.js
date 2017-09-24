import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import AdvancedPatientSearchForm from './AdvancedPatientSearchForm';
import formStateSelector from './selectors';

@connect(formStateSelector)
export default class AdvancedPatientSearch extends PureComponent {
    static propTypes = {
      onClose: PropTypes.func.isRequired,
      formState: PropTypes.object.isRequired,
    };

    state = {
      isOpen: true,
    };

    toggleFormVisibility = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

    render() {
      const { isOpen } = this.state;
      const { onClose, formState } = this.props;

      return (
        <div className={classNames('dropdown-menu dropdown-menu-search dropdown-menu-right', { 'without-shadow': isOpen })}>
          <div className="panel-group accordion">
            <div className={classNames('panel panel-secondary without-margin', { open: isOpen })}>
              <div className="panel-heading">
                <div className="control-group right">
                  <button className="btn btn-success btn-inverse btn-square btn-toggle-rotate" onClick={this.toggleFormVisibility}>
                    <i className="btn-icon fa fa-chevron-up" />
                  </button>
                </div>
                <h3 className="panel-title"><span className="ng-binding">Patient Search - Advanced</span><span className="hidden-xs hidden-sm ng-binding">: Age Range: 0-100</span></h3>
              </div>
              {isOpen && <AdvancedPatientSearchForm onClose={onClose} formState={formState} />}
            </div>
          </div>
        </div>
      )
    }
}
