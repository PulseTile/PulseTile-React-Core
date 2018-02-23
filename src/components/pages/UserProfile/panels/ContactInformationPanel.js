import React, { PureComponent } from 'react';

import ControlPanel from '../ControlPanel';
import ContactForm from '../forms/ContactForm';
import { valuesContactFormLabels } from '../forms.config';

const CONTACT_INFORMATION = 'contactInformation';

export default class ContactInformationPanel extends PureComponent {
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

    return (
      <div>
        {(expandedPanel === CONTACT_INFORMATION || expandedPanel === 'all') && !editedPanel[CONTACT_INFORMATION] ? <ControlPanel
          name={CONTACT_INFORMATION}
          title="Contact Information"
          isOpen={openedPanel === CONTACT_INFORMATION}
          onShow={onShow}
          onExpand={onExpand}
          onEdit={onEdit}
          editedPanel={editedPanel}
          onCancel={onCancel}
          isShowControlPanel={isShowControlPanel}
          isSaveButton={isSaveButton}
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
        </ControlPanel> : null }
        {(expandedPanel === CONTACT_INFORMATION || expandedPanel === 'all') && editedPanel[CONTACT_INFORMATION] ? <ControlPanel
          name={CONTACT_INFORMATION}
          title="Contact Information"
          isOpen={openedPanel === CONTACT_INFORMATION}
          onShow={onShow}
          onExpand={onExpand}
          onEdit={onEdit}
          editedPanel={editedPanel}
          onCancel={onCancel}
          isShowControlPanel={isShowControlPanel}
          isSaveButton={isSaveButton}
        >
          <ContactForm />
        </ControlPanel> : null }
      </div>
    )
  }
}