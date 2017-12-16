import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import ContactsDetailForm from './ContactsDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const CONTACT_PANEL = 'contactPanel';

export default class ContactsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, contactsDetailFormValues, metaPanelFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === CONTACT_PANEL || expandedPanel === 'all') && !editedPanel[CONTACT_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={CONTACT_PANEL}
            title="Contact"
            onShow={onShow}
            isOpen={openedPanel === CONTACT_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={contactsDetailFormValues}
            isBtnShowPanel
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.NAME}</label>
                        <div className="form-control-static">{detail[valuesNames.NAME]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.REALATIONSHIP}</label>
                        <div className="form-control-static">{detail[valuesNames.REALATIONSHIP]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.REALATIONSHIP_TYPE}</label>
                        <div className="form-control-static">{detail[valuesNames.REALATIONSHIP_TYPE]}</div>
                      </div>
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.CONTACT_INFORMATION}</label>
                        <div className="form-control-static">{detail[valuesNames.CONTACT_INFORMATION]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.NEXT_OF_KIN}</label>
                        <div className="form-control-static">{detail[valuesNames.NEXT_OF_KIN] ? 'Yes' : 'No'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.NOTES}</label>
                        <div className="form-control-static">{detail[valuesNames.NOTES]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.AUTHOR}</label>
                        <div className="form-control-static">{detail[valuesNames.AUTHOR]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.DATE}</label>
                        <div className="form-control-static">{dateCreated}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.SOURCE}</label>
                        <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}

          {(expandedPanel === CONTACT_PANEL || expandedPanel === 'all') && editedPanel[CONTACT_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={CONTACT_PANEL}
            title="Edit Contact"
            onShow={onShow}
            isOpen={openedPanel === CONTACT_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={contactsDetailFormValues}
            isBtnShowPanel
          >
            <ContactsDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null }

        </div>
      </div>
    )
  }
}
