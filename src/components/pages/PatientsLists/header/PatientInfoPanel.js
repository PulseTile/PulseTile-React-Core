import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

export default class PatientInfoPanel extends PureComponent {
    static propTypes = {
      onSelected: PropTypes.func.isRequired,
    };

    state = {
      isFilterInputVisible: false,
      isPatientInfoPanelVisible: false,
    };

    render() {
      return (
        <div className="dropdown-menu dropdown-menu-panel dropdown-menu-right dropdown-menu-summary dropdown-menu-patients">
          <div className="form-group-wrapper">
            <div className="heading">PATIENT INFO</div>
            <div className="form-group">
              <Row>
                <Col xs={6} sm={4}>
                  <div className="wrap-fcustominp">
                    <div className="fcustominp-state disabled">
                      <div className="fcustominp">
                        <input type="checkbox" id="patients-table-info-name" name="patients-table-info-name" className="ng-pristine ng-untouched ng-valid ng-not-empty" />
                        <label />
                      </div>
                      <label className="fcustominp-label ng-binding">Name</label>
                    </div>
                  </div>
                </Col>
                {/*<!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-info-address" ng-change="changeTableSettings()" name="patients-table-info-address" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty">
                                            <label for="patients-table-info-address"></label>
                                    </div>
                                    <label for="patients-table-info-address" class="fcustominp-label ng-binding">Address</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state disabled" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-info-dateOfBirth" ng-change="changeTableSettings()" name="patients-table-info-dateOfBirth" ng-model="tableSettings.select" ng-disabled="true" class="ng-pristine ng-untouched ng-valid ng-not-empty" disabled="disabled">
                                            <label for="patients-table-info-dateOfBirth"></label>
                                    </div>
                                    <label for="patients-table-info-dateOfBirth" class="fcustominp-label ng-binding">Born</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state disabled" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-info-gender" ng-change="changeTableSettings()" name="patients-table-info-gender" ng-model="tableSettings.select" ng-disabled="true" class="ng-pristine ng-untouched ng-valid ng-not-empty" disabled="disabled">
                                            <label for="patients-table-info-gender"></label>
                                    </div>
                                    <label for="patients-table-info-gender" class="fcustominp-label ng-binding">Gender</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-info-nhsNumber" ng-change="changeTableSettings()" name="patients-table-info-nhsNumber" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty">
                                            <label for="patients-table-info-nhsNumber"></label>
                                    </div>
                                    <label for="patients-table-info-nhsNumber" class="fcustominp-label ng-binding">NHS No.</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings -->
                            <div class="col-xs-6 col-sm-4">
                                <button class="btn btn-success btn-inverse btn-bold btn-smaller" ng-click="selectAllSettings(itemKey)"><span class="btn-text">Select All</span></button>
                            </div>
                        </div>
                    </div>
                </div><!-- end ngRepeat: (itemKey, item) in patientsTable --><div ng-repeat="(itemKey, item) in patientsTable" class="ng-scope">
                    <div class="heading ng-binding">DATE / TIME</div>
                    <div class="form-group">
                        <div class="row">
                            <!-- ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-date-orders" ng-change="changeTableSettings()" name="patients-table-date-orders" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty">
                                            <label for="patients-table-date-orders"></label>
                                    </div>
                                    <label for="patients-table-date-orders" class="fcustominp-label ng-binding">Orders</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-date-results" ng-change="changeTableSettings()" name="patients-table-date-results" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty">
                                            <label for="patients-table-date-results"></label>
                                    </div>
                                    <label for="patients-table-date-results" class="fcustominp-label ng-binding">Results</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-date-vitals" ng-change="changeTableSettings()" name="patients-table-date-vitals" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty" style="">
                                            <label for="patients-table-date-vitals"></label>
                                    </div>
                                    <label for="patients-table-date-vitals" class="fcustominp-label ng-binding">Vitals</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-date-diagnoses" ng-change="changeTableSettings()" name="patients-table-date-diagnoses" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty" style="">
                                            <label for="patients-table-date-diagnoses"></label>
                                    </div>
                                    <label for="patients-table-date-diagnoses" class="fcustominp-label ng-binding">Diagnosis</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings -->
                            <div class="col-xs-6 col-sm-4">
                                <button class="btn btn-success btn-inverse btn-bold btn-smaller" ng-click="selectAllSettings(itemKey)"><span class="btn-text">Select All</span></button>
                            </div>
                        </div>
                    </div>
                </div><!-- end ngRepeat: (itemKey, item) in patientsTable --><div ng-repeat="(itemKey, item) in patientsTable" class="ng-scope">
                    <div class="heading ng-binding">COUNT</div>
                    <div class="form-group">
                        <div class="row">
                            <!-- ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-count-orders" ng-change="changeTableSettings()" name="patients-table-count-orders" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty">
                                            <label for="patients-table-count-orders"></label>
                                    </div>
                                    <label for="patients-table-count-orders" class="fcustominp-label ng-binding">Orders</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-count-results" ng-change="changeTableSettings()" name="patients-table-count-results" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty">
                                            <label for="patients-table-count-results"></label>
                                    </div>
                                    <label for="patients-table-count-results" class="fcustominp-label ng-binding">Results</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-count-vitals" ng-change="changeTableSettings()" name="patients-table-count-vitals" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty" style="">
                                            <label for="patients-table-count-vitals"></label>
                                    </div>
                                    <label for="patients-table-count-vitals" class="fcustominp-label ng-binding">Vitals</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings --><div class="col-xs-6 col-sm-4 ng-scope" ng-repeat="(key, tableSettings) in item.settings">
                            <div class="wrap-fcustominp">
                                <div class="fcustominp-state" ng-class="{disabled: !!tableSettings.disabled}">
                                    <div class="fcustominp">
                                        <input type="checkbox" id="patients-table-count-diagnoses" ng-change="changeTableSettings()" name="patients-table-count-diagnoses" ng-model="tableSettings.select" ng-disabled="false" class="ng-pristine ng-untouched ng-valid ng-not-empty" style="">
                                            <label for="patients-table-count-diagnoses"></label>
                                    </div>
                                    <label for="patients-table-count-diagnoses" class="fcustominp-label ng-binding">Diagnosis</label>
                                </div>
                            </div>
                        </div><!-- end ngRepeat: (key, tableSettings) in item.settings -->
                            <div class="col-xs-6 col-sm-4">
                                <button class="btn btn-success btn-inverse btn-bold btn-smaller" ng-click="selectAllSettings(itemKey)"><span class="btn-text">Select All</span></button>
                            </div>
                        </div>
                    </div>
                </div>*/}
              </Row>
            </div>
          </div>
        </div>
      )
    }
}
