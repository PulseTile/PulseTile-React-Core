import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';

import PersonalInformationPanel from './PersonalInformationPanel';

const APPLICATION_PREFERENCES = 'applicationPreferences';
const PERSONAL_INFORMATION = 'personalInformation';
const CONTACT_INFORMATION = 'contactInformation';
const CHANGE_HISTORY = 'changeHistory';

class UserProfile extends PureComponent {
  state = {
    openedPanel: APPLICATION_PREFERENCES,
    expandedPanel: '',
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  }

  handleExpand = (name) => {
    console.log(name)
  }

  render() {
    const { openedPanel } = this.state;

    return (<section className="page-wrapper">
      <div className="section">
        <Row>
          <Col xs={12}>
            <div className="section-main ng-scope">
              <div className="panel-group accordion">
                <PersonalInformationPanel
                  name={APPLICATION_PREFERENCES}
                  title="Application preferences"
                  isOpen={openedPanel === APPLICATION_PREFERENCES}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
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
                </PersonalInformationPanel>
                <PersonalInformationPanel
                  name={PERSONAL_INFORMATION}
                  title="Personal Information"
                  isOpen={openedPanel === PERSONAL_INFORMATION}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
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
                </PersonalInformationPanel>
                <PersonalInformationPanel
                  name={CONTACT_INFORMATION}
                  title="Contact Information"
                  isOpen={openedPanel === CONTACT_INFORMATION}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
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
                </PersonalInformationPanel>
                <PersonalInformationPanel
                  name={CHANGE_HISTORY}
                  title="Change History"
                  isOpen={openedPanel === CHANGE_HISTORY}
                  onShow={this.handleShow}
                  onExpand={this.handleExpand}
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
                </PersonalInformationPanel>
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

