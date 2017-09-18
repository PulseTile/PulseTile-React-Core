import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import PersonalInformationPanel from './PersonalInformationPanel';

const APPLICATION_PREFERENCES = 'applicationPreferences';
const PERSONAL_INFORMATION = 'personalInformation';
const CONTACT_INFORMATION = 'contactInformation';
const CHANGE_HISTORY = 'changeHistory';

class UserProfile extends PureComponent {
  state = {
    openedPanel: APPLICATION_PREFERENCES,
    expandedPanel: 'all',
    isAllPanelsVisible: false,
    editedPanel: '',
    applicationTitle: 'Test',
    logoFile: '',
    logoPreviewUrl: '',
    applicationTheme: '',
    browserWindowTitle: 'Test',
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
    this.setState({ editedPanel: name })
  };

  handleApplicationTitleChange = (evt) => {
    this.setState({ applicationTitle: evt.target.value });
  };

  handleApplicationThemeChange = (evt) => {
    this.setState({ applicationTheme: evt.target.value });
  };

  handleBrowserWindowChange = (evt) => {
    this.setState({ browserWindowTitle: evt.target.value });
  };

  handleLogoChange = (evt) => {
    evt.preventDefault();

    const reader = new FileReader();
    const file = evt.target.files[0];

    reader.onloadend = () => {
      this.setState({
        logoPreviewUrl: file,
        logoPreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file)
  };

  render() {
    const { openedPanel, expandedPanel, isAllPanelsVisible, editedPanel, applicationTitle, logoPreviewUrl, applicationTheme, browserWindowTitle } = this.state;

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isAllPanelsVisible })}>
        <Row>
          <Col xs={12}>
            <div className="section-main ng-scope">
              <div className="panel-group accordion">
                {(expandedPanel === 'applicationPreferences' || expandedPanel === 'all') && editedPanel === '' ? <PersonalInformationPanel
                  name={APPLICATION_PREFERENCES}
                  title="Application preferences"
                  isOpen={openedPanel === APPLICATION_PREFERENCES}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                >
                  <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <Row>
                          <Col xs={12} md={6}>
                            <Row>
                              <div className="col-md-11">
                                <div className="form-group">
                                  <label className="control-label">Application
                                                      Title</label>
                                  <div className="form-control-static" />
                                </div>

                                <div className="form-group">
                                  <label className="control-label">Application
                                                      Logo File</label>
                                  <div className="form-control-static">

                                  </div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">Application
                                                      Theme</label>
                                  <div className="palette-color">
                                    <span className="palette-color-icon" />
                                    <span className="palette-color-name" />
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">Browser
                                                      Window Title</label>
                                  <div className="form-control-static" />
                                </div>
                              </div>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </PersonalInformationPanel> : null }
                {(expandedPanel === 'applicationPreferences' || expandedPanel === 'all') && editedPanel === 'applicationPreferences' ? <PersonalInformationPanel
                  name={APPLICATION_PREFERENCES}
                  title="Application preferences"
                  isOpen={openedPanel === APPLICATION_PREFERENCES}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                >
                  <div className="panel-body-inner">
                    <form name="appSettingsForm" className="form">
                      <div className="form-group-wrapper">
                        <Row>
                          <Col xs={12} md={6}>
                            <Row>
                              <Col md={11}>
                                <div className={classNames('form-group', { 'has-error': applicationTitle === '', 'has-success': applicationTitle.length > 0 })}>
                                  <label htmlFor="title" className="control-label">Application Title</label>
                                  <div className="input-holder">
                                    <input className="form-control input-sm" id="title" name="title" required onChange={this.handleApplicationTitleChange} value={applicationTitle} />
                                  </div>
                                  {applicationTitle === '' ? <span className="help-block animate-fade">You must enter a value.</span> : null }
                                </div>
                                <div className="form-group">
                                  <label className="control-label">Application Logo File</label>
                                  <div className="input-holder">
                                    <div className="wrap-fcustomfile">
                                      <div className="fcustomfile-control">
                                        <input
                                          accept="image/jpeg,image/png,image/gif"
                                          type="file"
                                          name="logoPath"
                                          id="logoPath"
                                          onChange={e=>this.handleLogoChange(e)}
                                        />
                                        <label htmlFor="logoPath" className="btn btn-success btn-inverse btn-normal-icon">
                                          <i className="fa fa-plus"></i>
                                          <span>Upload logo</span>
                                        </label>
                                      </div>
                                      <div className="fcustomfile-text"></div>
                                    </div>
                                  </div>
                                  <span className="help-block animate-fade">You must choise image file.</span>
                                </div>
                                {logoPreviewUrl.length !== 0 ? <div className="form-group">
                                  <div className="form-control-static">
                                    <img src={logoPreviewUrl} alt="Logo Example" />
                                  </div>
                                </div> : null }
                                <div className={classNames('form-group', { 'has-error': applicationTheme === '', 'has-success': applicationTheme.length > 0 })}>
                                  <label htmlFor="themes" className="control-label">Application Themes</label>
                                  <div className="input-holder">
                                    <select></select>
                                  </div>
                                  {applicationTheme === '' ? <span className="help-block animate-fade">You must enter a value.</span> : null }
                                </div>
                                <div className={classNames('form-group', { 'has-error': browserWindowTitle === '', 'has-success': browserWindowTitle.length > 0 })}>
                                  <label htmlFor="browseTitle" className="control-label">Browser Window title</label>
                                  <div className="input-holder">
                                    <input className="form-control input-sm" id="browseTitle" name="browseTitle" required onChange={this.handleBrowserWindowChange} value={browserWindowTitle} />
                                  </div>
                                  {browserWindowTitle === '' ? <span className="help-block animate-fade">You must enter a value.</span> : null }
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </form>
                  </div>
                </PersonalInformationPanel> : null }
                {expandedPanel === 'personalInformation' || expandedPanel === 'all' ? <PersonalInformationPanel
                  name={PERSONAL_INFORMATION}
                  title="Personal Information"
                  isOpen={openedPanel === PERSONAL_INFORMATION}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                >
                  <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <Row>
                          <Col xs={12} md={6}>
                            <Row>
                              <Col md={11}>
                                <div className="form-group">
                                  <label className="control-label">First Name</label>
                                  <div className="form-control-static">Bob</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">Last Name</label>
                                  <div className="form-control-static">Smith</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">NHS No</label>
                                  <div className="form-control-static" />
                                </div>
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={12} md={6}>
                            <Row>
                              <div className="col-md-11 col-md-offset-1">
                                <div className="form-group">
                                  <label className="control-label">Date of Birth</label>
                                  <div className="form-control-static ng-binding">10-Sep-2017</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">Gender</label>
                                  <div className="form-control-static ng-binding">Female</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">Doctor</label>
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
                {expandedPanel === 'contactInformation' || expandedPanel === 'all' ? <PersonalInformationPanel
                  name={CONTACT_INFORMATION}
                  title="Contact Information"
                  isOpen={openedPanel === CONTACT_INFORMATION}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                >
                  <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <div className="row">
                          <div className="col-xs-12 col-md-6">
                            <div className="row">
                              <div className="col-md-11">
                                <div className="form-group">
                                  <label className="control-label">Address</label>
                                  <div className="form-control-static ng-binding">6801 Tellus Street</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">City</label>
                                  <div className="form-control-static ng-binding">Westmorland</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">State</label>
                                  <div className="form-control-static ng-binding">Westmorland</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">Postal Code</label>
                                  <div className="form-control-static ng-binding">Box 306</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">Country</label>
                                  <div className="form-control-static ng-binding">USA</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xs-12 col-md-6">
                            <div className="row">
                              <div className="col-md-11 col-md-offset-1">
                                <div className="form-group">
                                  <label className="control-label">Phone Number</label>
                                  <div className="form-control-static ng-binding">07624 647524</div>
                                </div>

                                <div className="form-group">
                                  <label className="control-label">Email</label>
                                  <div className="form-control-static">bob.smith@gmail.com</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PersonalInformationPanel> : null }
                {expandedPanel === 'changeHistory' || expandedPanel === 'all' ? <PersonalInformationPanel
                  name={CHANGE_HISTORY}
                  title="Change History"
                  isOpen={openedPanel === CHANGE_HISTORY}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
                  onEdit={this.handleEdit}
                >
                  <div className="panel-body-inner ng-scope">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <div className="form-group">
                          <label className="control-label ng-binding">Change #1 Date</label>
                          <div className="form-control-static ng-binding">2017-09-10 21:44</div>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Changes</label>
                          <div className="form-control-static ng-binding">Last Name: <em className="ng-binding">White</em> <span className="next-separate"><i className="fa fa-caret-right"></i></span> Blackwell</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body-inner ng-scope">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <div className="form-group">
                          <label className="control-label ng-binding">Change #2 Date</label>
                          <div className="form-control-static ng-binding">2017-09-10 21:44</div>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Changes</label>
                          <div className="form-control-static ng-binding">Address: <em className="ng-binding">Flower Street</em> <span className="next-separate"><i className="fa fa-caret-right"></i></span> 6801 Tellus Street</div>
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

