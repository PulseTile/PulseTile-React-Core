import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import ClinicalNotesDetailForm from './ClinicalNotesDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const CLINICAL_NOTES_PANEL = 'clinicalNotesPanel';

export default class ClinicalNotesDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, clinicalNoteFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);

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
                          <label className="control-label">{valuesLabels.TYPE}</label>
                          <div className="form-control-static">{detail[valuesNames.TYPE]}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.NOTE}</label>
                          <div className="form-control-static">{detail[valuesNames.NOTE]}</div>
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
                          <label className="control-label">{valuesLabels.DATE_CREATED}</label>
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
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === CLINICAL_NOTES_PANEL || expandedPanel === 'all') && editedPanel[CLINICAL_NOTES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={CLINICAL_NOTES_PANEL}
            title="Edit Clinical Note"
            isOpen={openedPanel === CLINICAL_NOTES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={clinicalNoteFormValues}
            isBtnShowPanel={false}
          >
            <ClinicalNotesDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
