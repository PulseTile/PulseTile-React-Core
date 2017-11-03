import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import ClinicalNotesPanelForm from './ClinicalNotesPanelForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

const CLINICAL_NOTES_PANEL = 'clinicalNotesPanel';

export default class ClinicalNotesDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, clinicalNoteFormValues, isSubmit } = this.props;
		let { detail } = this.props;
		detail = detail || {};
		const dateCreated = getDDMMMYYYY(detail.dateCreated);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === CLINICAL_NOTES_PANEL || expandedPanel === 'all') && !editedPanel[CLINICAL_NOTES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={CLINICAL_NOTES_PANEL}
            title="Clinical Note"
            isOpen={openedPanel === CLINICAL_NOTES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={clinicalNoteFormValues}
            isBtnShowPanel={false}
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
          </PluginDetailPanel> : null}
          {(expandedPanel === CLINICAL_NOTES_PANEL || expandedPanel === 'all') && editedPanel[CLINICAL_NOTES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={CLINICAL_NOTES_PANEL}
            title="Edit Personal Note"
            isOpen={openedPanel === CLINICAL_NOTES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={clinicalNoteFormValues}
            isBtnShowPanel={false}
          >
            <ClinicalNotesPanelForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
