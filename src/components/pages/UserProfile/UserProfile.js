import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'lodash/fp';
import moment from 'moment';

import PersonalInformationPanel from './PersonalInformationPanel';
import AppSettingsForm from './forms/AppSettingsForm';
import PersonalForm from './forms/PersonalForm';
import ContactForm from './forms/ContactForm';
import { formStateSelector, patientInfoSelector, userAccountSelector } from './selectors';
import { fetchProfileAppPreferencesRequest } from '../../../ducks/fetch-profile-application-preferences.duck';
import { fetchPatientsInfoRequest } from '../../../ducks/fetch-patients-info.duck';
import { setLogo } from '../../../ducks/set-logo.duck';
import { setTitle } from '../../../ducks/set-title.duck';
import { setTheme } from '../../../ducks/set-theme.duck';
import { valuesSettingsFormLabels, valuesPersonalFormLabels, valuesContactFormLabels } from './forms/values-names.config';
import themes from './theme-config';

const APPLICATION_PREFERENCES = 'applicationPreferences';
const PERSONAL_INFORMATION = 'personalInformation';
const CONTACT_INFORMATION = 'contactInformation';
const CHANGE_HISTORY = 'changeHistory';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchProfileAppPreferencesRequest, fetchPatientsInfoRequest, setLogo, setTitle, setTheme }, dispatch) });

@connect(formStateSelector)
@connect(userAccountSelector)
@connect(patientInfoSelector, mapDispatchToProps)
class UserProfile extends PureComponent {
  state = {
    openedPanel: APPLICATION_PREFERENCES,
    expandedPanel: 'all',
    isAllPanelsVisible: false,
    editedPanel: {},
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  handleExpand = (name) => {
    if (this.state.expandedPanel === 'all') {
      this.setState(prevState => ({ expandedPanel: name, openedPanel: name, isAllPanelsVisible: !prevState.isAllPanelsVisible }));
    } else {
      this.setState(prevState => ({ expandedPanel: 'all', isAllPanelsVisible: !prevState.isAllPanelsVisible }));
    }
  };

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
    }))
  };

  handleCancel = (name) => {
    const { patientsInfo, dispatch } = this.props;
    dispatch(setTheme(patientsInfo.themeColor));
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
    }))
  };

  handleSaveSettingsForm = (formValues, name) => {
    const { actions, formState, patientsInfo, dispatch } = this.props;
    Object.keys(patientsInfo).forEach((key) => {
      patientsInfo[key] = formValues[key];
    });
    if (_.isEmpty(formState.syncErrors.title) && _.isEmpty(formState.syncErrors.browserTitle)) {
      dispatch(setLogo(patientsInfo.logoB64));
      dispatch(setTitle(patientsInfo.browserTitle));
      actions.fetchProfileAppPreferencesRequest(formValues);
      this.setState(prevState => ({
        editedPanel: {
          ...prevState.editedPanel,
          [name]: false,
        },
      }))
    }
  };

  render() {
    const { openedPanel, expandedPanel, isAllPanelsVisible, editedPanel } = this.state;
    const { formState, patientsInfo, user } = this.props;

    const theme = themes[patientsInfo.themeColor] ? themes[patientsInfo.themeColor] : themes.default;
    const currentDate = (new Date()).getTime();
    const CONVERT_CURRENT_DATE = moment(currentDate).format('DD-MMM-YYYY');
    const CONVERT_CURRENT_DATE_WITH_TIME = moment(currentDate).format('YYYY-MM-DD HH:mm');

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isAllPanelsVisible })}>
        <Row>
          <Col xs={12}>
            <div className="section-main">
              <div className="panel-group accordion">
                {(expandedPanel === 'applicationPreferences' || expandedPanel === 'all') && !editedPanel[APPLICATION_PREFERENCES] ? <PersonalInformationPanel
                  name={APPLICATION_PREFERENCES}
                  title="Application Preferences"
                  isOpen={openedPanel === APPLICATION_PREFERENCES}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                  editedPanel={editedPanel}
                  onCancel={this.handleCancel}
                >
                  <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <Row>
                          <Col xs={12} md={6}>
                            <Row>
                              <div className="col-md-11">
                                <div className="form-group">
                                  <label className="control-label">{valuesSettingsFormLabels.APP_TITLE}</label>
                                  <div className="form-control-static">{patientsInfo.title}</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesSettingsFormLabels.LOGO_PATH}</label>
                                  <div className="form-control-static">
                                    <img src={patientsInfo.logoB64} alt="Logo Example" />
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesSettingsFormLabels.SELECT_THEME_ONE}</label>
                                  <div className="palette-color">
                                    <span className="palette-color-icon" style={{ background: theme.baseColor }}></span>
                                    <span className="palette-color-name">{theme.name}</span>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesSettingsFormLabels.BROWSER_TITLE}</label>
                                  <div className="form-control-static">{patientsInfo.browserTitle}</div>
                                </div>
                              </div>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </PersonalInformationPanel> : null }
                {(expandedPanel === 'applicationPreferences' || expandedPanel === 'all') && editedPanel[APPLICATION_PREFERENCES] ? <PersonalInformationPanel
                  name={APPLICATION_PREFERENCES}
                  title="Application Preferences"
                  isOpen={openedPanel === APPLICATION_PREFERENCES}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                  editedPanel={editedPanel}
                  onCancel={this.handleCancel}
                  onSaveSettings={this.handleSaveSettingsForm}
                  formValues={formState.values}
                >
                  <AppSettingsForm
                    patientsInfo={patientsInfo}
                  />
                </PersonalInformationPanel> : null }

                {(expandedPanel === 'personalInformation' || expandedPanel === 'all') && !editedPanel[PERSONAL_INFORMATION] ? <PersonalInformationPanel
                  name={PERSONAL_INFORMATION}
                  title="Personal Information"
                  isOpen={openedPanel === PERSONAL_INFORMATION}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                  editedPanel={editedPanel}
                  onCancel={this.handleCancel}
                >
                  <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <Row>
                          <Col xs={12} md={6}>
                            <Row>
                              <Col md={11}>
                                <div className="form-group">
                                  <label className="control-label">{valuesPersonalFormLabels.FIRST_NAME}</label>
                                  <div className="form-control-static">{user.given_name}</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesPersonalFormLabels.LAST_NAME}</label>
                                  <div className="form-control-static">{user.family_name}</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesPersonalFormLabels.NHS_NUMBER}</label>
                                  {user.role === 'IDCR'
                                    ? <div className="form-control-static" />
                                    : <div className="form-control-static">{user.nhsNumber}</div> }
                                </div>
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={12} md={6}>
                            <Row>
                              <div className="col-md-11 col-md-offset-1">
                                <div className="form-group">
                                  <label className="control-label">{valuesPersonalFormLabels.DATE_OF_BIRTH}</label>
                                  <div className="form-control-static ng-binding">{CONVERT_CURRENT_DATE}</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesPersonalFormLabels.SELECT_GENDER}</label>
                                  <div className="form-control-static ng-binding">Female</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesPersonalFormLabels.DOCTOR}</label>
                                  <div className="form-control-static ng-binding">Dr Emma Huston</div>
                                </div>
                              </div>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </PersonalInformationPanel> : null }
                {(expandedPanel === 'personalInformation' || expandedPanel === 'all') && editedPanel[PERSONAL_INFORMATION] ? <PersonalInformationPanel
                  name={PERSONAL_INFORMATION}
                  title="Personal Information"
                  isOpen={openedPanel === PERSONAL_INFORMATION}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                  editedPanel={editedPanel}
                  onCancel={this.handleCancel}
                  onClick={this.handleClick}
                >
                  <PersonalForm />
                </PersonalInformationPanel> : null }

                {(expandedPanel === 'contactInformation' || expandedPanel === 'all') && !editedPanel[CONTACT_INFORMATION] ? <PersonalInformationPanel
                  name={CONTACT_INFORMATION}
                  title="Contact Information"
                  isOpen={openedPanel === CONTACT_INFORMATION}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                  editedPanel={editedPanel}
                  onCancel={this.handleCancel}
                >
                  <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <div className="row">
                          <div className="col-xs-12 col-md-6">
                            <div className="row">
                              <div className="col-md-11">
                                <div className="form-group">
                                  <label className="control-label">{valuesContactFormLabels.ADDRESS}</label>
                                  <div className="form-control-static ng-binding">6801 Tellus Street</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesContactFormLabels.CITY}</label>
                                  <div className="form-control-static ng-binding">Westmorland</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesContactFormLabels.STATE}</label>
                                  <div className="form-control-static ng-binding">Westmorland</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesContactFormLabels.POSTAL_CODE}</label>
                                  <div className="form-control-static ng-binding">Box 306</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesContactFormLabels.SELECT_COUNTRY}</label>
                                  <div className="form-control-static ng-binding">USA</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xs-12 col-md-6">
                            <div className="row">
                              <div className="col-md-11 col-md-offset-1">
                                <div className="form-group">
                                  <label className="control-label">{valuesContactFormLabels.PHONE}</label>
                                  <div className="form-control-static ng-binding">07624 647524</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">{valuesContactFormLabels.EMAIL}</label>
                                  <div className="form-control-static">{user.email}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PersonalInformationPanel> : null }
                {(expandedPanel === 'contactInformation' || expandedPanel === 'all') && editedPanel[CONTACT_INFORMATION] ? <PersonalInformationPanel
                  name={CONTACT_INFORMATION}
                  title="Contact Information"
                  isOpen={openedPanel === CONTACT_INFORMATION}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                  editedPanel={editedPanel}
                  onCancel={this.handleCancel}
                  onClick={this.handleClick}
                >
                  <ContactForm />
                </PersonalInformationPanel> : null }

                {expandedPanel === 'changeHistory' || expandedPanel === 'all' ? <PersonalInformationPanel
                  name={CHANGE_HISTORY}
                  title="Change History"
                  isOpen={openedPanel === CHANGE_HISTORY}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                  editedPanel={editedPanel}
                  onCancel={this.handleCancel}
                >
                  <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <div className="form-group">
                          <label className="control-label ng-binding">Change #1 Date</label>
                          <div className="form-control-static ng-binding">{CONVERT_CURRENT_DATE_WITH_TIME}</div>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Changes</label>
                          <div className="form-control-static ng-binding">Last Name: <em className="ng-binding">White</em> <span className="next-separate"><i className="fa fa-caret-right" /></span> Blackwell</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <div className="form-group">
                          <label className="control-label ng-binding">Change #2 Date</label>
                          <div className="form-control-static ng-binding">{CONVERT_CURRENT_DATE_WITH_TIME}</div>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Changes</label>
                          <div className="form-control-static ng-binding">Address: <em className="ng-binding">Flower Street</em> <span className="next-separate"><i className="fa fa-caret-right" /></span> 6801 Tellus Street</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PersonalInformationPanel> : null }
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
    )
  }
}

export default UserProfile

