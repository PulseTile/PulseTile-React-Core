import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import ContactsDetailForm from './ContactsDetailForm/ContactsDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

const CONTACT_PANEL = 'contactPanel';
const META_PANEL = 'metaPanel';

export default class ContactsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, contactsDetailFormValues, metaPanelFormValues, isSubmit } = this.props;
		let { detail } = this.props;
		detail = detail || {};
		const dateCreated = getDDMMMYYYY(detail.dateCreated);

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
						isBtnShowPanel={true}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">Name</label>
                        <div className="form-control-static">{detail.name}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">Relationship</label>
                        <div className="form-control-static">{detail.relationship}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">Relationship Type</label>
                        <div className="form-control-static">{detail.relationshipType}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">Next of Kin</label>
                        <div className="form-control-static">{detail.nextOfKin ? 'Yes' : 'No'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">Note</label>
                        <div className="form-control-static">{detail.notes}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">Author</label>
                        <div className="form-control-static">{detail.author}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">Date</label>
                        <div className="form-control-static">{dateCreated}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">Source</label>
                        <div className="form-control-static">{detail.source}</div>
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
						isBtnShowPanel={true}
          >
            <ContactsDetailForm
							detail={detail}
							isSubmit={isSubmit}
						/>
          </PluginDetailPanel> : null }

          {(expandedPanel === META_PANEL || expandedPanel === 'all') ? <PluginDetailPanel
            onExpand={onExpand}
            name={META_PANEL}
            title="Metadata"
            isOpen={openedPanel === META_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={metaPanelFormValues}
						isBtnShowPanel={true}
            isShowControlPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">Relationship Code</label>
                        <div className="form-control-static">{detail.relationshipCode}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">Relationship Terminology</label>
                        <div className="form-control-static">{detail.relationshipTerminology}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
