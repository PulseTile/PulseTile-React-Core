import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class AdvancedPatientSearch extends PureComponent {
    propTypes = {
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
              {isOpen && <div className="panel-body">
                <div className="panel-body-inner">
                  <form name="advancedSearchForm" className="form ng-pristine ng-invalid ng-invalid-required">
                    <div className="form-group-wrapper">
                      <div className="row">
                        <div className="col-xs-12 col-sm-6 ng-scope">
                          <div className="form-group has-error" >
                            <label htmlFor="nhsNumber" className="control-label">NHS Number</label>
                            <div className="input-holder">
                              <input type="text" tabIndex="1" className="form-control input-sm ng-pristine ng-empty ng-invalid ng-invalid-required ng-touched" id="nhsNumber" name="nhsNumber" placeholder="e.g. 123 456 7890" required="required" />
                            </div>
                            <span className="help-block animate-fade ng-hide" >You must enter a value.</span>
                            <span className="required-label" >*Required</span>
                            <span className="required-label ng-hide" >*NHS Number too short</span>
                            <span className="required-label ng-hide" >*NHS Number too long</span>
                          </div>
                        </div>
                      </div>
                      <div className="row ng-scope">
                        <div className="col-xs-12 col-sm-6">
                          <div className="form-group" >
                            <label htmlFor="surname" className="control-label">Last Name</label>
                            <div className="input-holder">
                              <input type="text" tabIndex="2" className="form-control input-sm ng-pristine ng-untouched ng-empty ng-valid ng-valid-required" id="surname" name="surname" placeholder="e. g. Smith" />
                            </div>
                            <span className="help-block animate-fade ng-hide">You must enter a value.</span>
                            <span className="required-label ng-hide" >*Required</span>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                          <div className="form-group" >
                            <label htmlFor="forename" className="control-label">First Name</label>
                            <div className="input-holder">
                              <input type="text" tabIndex="3" className="form-control input-sm ng-pristine ng-untouched ng-empty ng-valid ng-valid-required" id="forename" name="forename" placeholder="e.g. John" />
                            </div>
                            <span className="help-block animate-fade ng-hide" >You must enter a value.</span>
                            <span className="required-label ng-hide" >*Required</span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-sm-4">
                          <div className="form-group">
                            <label htmlFor="selectAgeField" className="control-label">Select Age Params</label>
                            <select className="form-control input-sm ng-pristine ng-untouched ng-valid ng-not-empty" tabIndex="5" id="selectAgeField" name="selectAgeField">
                              <option value="range">Age Range</option>
                              <option value="birthday">Date of Birth</option>
                            </select>
                          </div>
                        </div>
                      </div>


                      <div className="form-group ng-scope">
                        <label htmlFor="" className="control-label">Age Range (Years)</label>
                        <div className="wrap-rzslider-search">

                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-sm-6">
                          <div className="form-group" >
                            <label htmlFor="gender" className="control-label">Gender</label>
                            <div className="input-holder">
                              <div className="wrap-fcustominps-inline">
                                <div className="wrap-fcustominp">
                                  <div className="fcustominp">
                                    <input type="checkbox" id="gender-male" name="gender-male" className="ng-pristine ng-untouched ng-valid ng-empty" />
                                    <label htmlFor="gender-male" />
                                  </div>
                                  <label htmlFor="gender-male" className="fcustominp-label ng-binding">Male</label>
                                </div>
                                <div className="wrap-fcustominp">
                                  <div className="fcustominp">
                                    <input type="checkbox" id="gender-female" name="gender-female" className="ng-pristine ng-untouched ng-valid ng-empty" />
                                    <label htmlFor="gender-female" />
                                  </div>
                                  <label htmlFor="gender-female" className="fcustominp-label ng-binding">Female</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
                <div className="panel-control">
                  <div className="wrap-control-group hide-indent-bottom">
                    <div className="control-group with-indent right">
                      <button className="btn btn-danger btn-icon-normal" onClick={onClose}><i className="btn-icon fa fa-times" /> <span className="btn-text">Close</span></button>
                      <button className="btn btn-success btn-icon-normal" ><i className="btn-icon fa fa-search" /> <span className="btn-text">Search</span></button>
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
