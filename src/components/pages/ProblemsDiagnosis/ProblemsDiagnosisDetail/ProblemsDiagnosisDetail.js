import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import DiagnosisPanelForm from './DiagnosisPanelForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

const DIAGNOSES_PANEL = 'diagnosesPanel';

export default class ProblemsDiagnosisDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, diagnosisPanelFormValues, isSubmit } = this.props;
		let { detail } = this.props;
		detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail.dateCreated);
    const dateOfOnset = getDDMMMYYYY(detail.dateOfOnset);
    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === DIAGNOSES_PANEL || expandedPanel === 'all') && !editedPanel[DIAGNOSES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DIAGNOSES_PANEL}
            title="Problem / Diagnosis"
            isOpen={openedPanel === DIAGNOSES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={diagnosisPanelFormValues}
            isBtnShowPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Problem / Diagnosis</label>
                          <div className="form-control-static">{detail.problem}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">Date of Onset</label>
                          <div className="form-control-static">{dateOfOnset}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Description</label>
                          <div className="form-control-static">{detail.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Terminology</label>
                          <div className="form-control-static">{detail.terminology}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">Code</label>
                          <div className="form-control-static">{detail.code}</div>
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
                    <div className="form-group">
                      <label className="control-label">Source</label>
                      <div className="form-control-static">{detail.source}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === DIAGNOSES_PANEL || expandedPanel === 'all') && editedPanel[DIAGNOSES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DIAGNOSES_PANEL}
            title="Edit Problem / Diagnosis"
            isOpen={openedPanel === DIAGNOSES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={diagnosisPanelFormValues}
            isBtnShowPanel={false}
          >
            <DiagnosisPanelForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null }
        </div>
      </div>
    )
  }
}
