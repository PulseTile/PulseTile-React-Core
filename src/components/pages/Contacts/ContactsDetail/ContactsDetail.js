import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';

import ContactsDetailPanel from './ContactsDetailPanel'
import ContactPanelForm from './ContactsDetailForm/ContactsPanelForm'
import ContactMetaForm from './ContactsDetailForm/ContactsMetaForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';


const CONTACT_PANEL = 'contactPanel';
const META_PANEL = 'metaPanel';


export default class ContactsDetail extends PureComponent {
  render() {
    const { onExpand, name, onShow, openedPanel, expandedPanel, currentPanel, detail, onEdit, editedPanel, onCancel, onSaveSettings, contactPanelFormValues, metaPanelFormValues } = this.props;
    const dateCreated = getDDMMMYYYY(detail.dateCreated);

    console.dir('detail', detail);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === CONTACT_PANEL || expandedPanel === 'all') && !editedPanel[CONTACT_PANEL] ? <ContactsDetailPanel
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
            formValues={contactPanelFormValues}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Type</label>
                          <div className="form-control-static">{detail.clinicalNotesType}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Note</label>
                          <div className="form-control-static">{detail.note}</div>
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
            </div>
          </ContactsDetailPanel> : null}
          {(expandedPanel === CONTACT_PANEL || expandedPanel === 'all') && editedPanel[CONTACT_PANEL] ? <ContactsDetailPanel
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
            formValues={contactPanelFormValues}
          >
            <ContactPanelForm
              detail={detail}
            />
          </ContactsDetailPanel> : null }
          {(expandedPanel === META_PANEL || expandedPanel === 'all') && !editedPanel[META_PANEL] ? <ContactsDetailPanel
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
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <Row>
                    <Col xs={12} md={6}>
                      <Row>
                        <div className="col-md-11">
                          <div className="form-group">
                            <label className="control-label">Cause Code</label>
                            <div className="form-control-static">{detail.causeCode}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">Terminology</label>
                            <div className="form-control-static">{detail.causeTerminology}</div>
                          </div>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </ContactsDetailPanel> : null}
          {(expandedPanel === META_PANEL || expandedPanel === 'all') && editedPanel[META_PANEL] ? <ContactsDetailPanel
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
          >
            <ContactMetaForm
              detail={detail}
            />
          </ContactsDetailPanel> : null }
        </div>
      </div>
    )
  }
}
