import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux'

import AdvancedPatientSearchForm from './AdvancedSearchForm/AdvancedPatientSearchForm';
import formStateSelector from './selectors';

// @connect(formStateSelector)
export default class AdvancedPatientSearch extends PureComponent {
    static propTypes = {
      onClose: PropTypes.func.isRequired,
    };

    state = {
      isOpen: true,
    };

    toggleFormVisibility = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

    render() {
      const { isOpen } = this.state;
      const { onClose } = this.props;

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
              {isOpen &&
              <div className="panel-body">
                <div className="panel-body-inner">
                  <AdvancedPatientSearchForm />
                </div>
                <div className="panel-control">
                  <div className="wrap-control-group hide-indent-bottom">
                    <div className="control-group with-indent right">
                      <button className="btn btn-danger btn-icon-normal" onClick={onClose}><i className="btn-icon fa fa-times" /> <span className="btn-text">Close</span></button>
                      <button className="btn btn-success btn-icon-normal" >
                        <i className="btn-icon fa fa-search" />
                        <span className="btn-text">Search</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>
      )
    }
}
