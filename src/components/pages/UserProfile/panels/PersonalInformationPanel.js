import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

import ControlPanel from '../ControlPanel';
import PersonalForm from '../forms/PersonalForm';
import { valuesPersonalFormLabels } from '../forms.config';

const PERSONAL_INFORMATION = 'personalInformation';

export default class PersonalInformationPanel extends PureComponent {
  render() {
    const {
      user,
      openedPanel,
      expandedPanel,
      editedPanel,
      onShow,
      onExpand,
      onEdit,
      onCancel,
      isShowControlPanel,
      isSaveButton,
    } = this.props;

    const currentDate = (new Date()).getTime();
    const CONVERT_CURRENT_DATE = moment(currentDate).format('DD-MMM-YYYY');

    return (
      <ControlPanel
        name={PERSONAL_INFORMATION}
        title="Personal Information"
        isOpen={openedPanel === PERSONAL_INFORMATION}
        onShow={onShow}
        onExpand={onExpand}
        onEdit={onEdit}
        editedPanel={editedPanel}
        onCancel={onCancel}
        isShowControlPanel={isShowControlPanel}
        isSaveButton={isSaveButton}
      >
        <div>
          {editedPanel[PERSONAL_INFORMATION] ?
            <PersonalForm/> :
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
          }
        </div>
      </ControlPanel>
    )
  }
}