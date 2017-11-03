import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import VaccinationDetailForm from './VaccinationDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

const VACCINATIONS_PANEL = 'vaccinationsPanel';

export default class VaccinationDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, vaccinationPanelFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const vaccinationDateTime = getDDMMMYYYY(detail.vaccinationDateTime);
    const dateCreated = getDDMMMYYYY(detail.dateCreated);
    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === VACCINATIONS_PANEL || expandedPanel === 'all') && !editedPanel[VACCINATIONS_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={VACCINATIONS_PANEL}
            title="Vaccination"
            isOpen={openedPanel === VACCINATIONS_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={vaccinationPanelFormValues}
            isBtnShowPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Vaccination Name</label>
                          <div className="form-control-static">{detail.vaccinationName}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">Vaccination Date</label>
                          <div className="form-control-static">{vaccinationDateTime}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Series Number</label>
                          <div className="form-control-static">{detail.series}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">Vaccination Source</label>
                          <div className="form-control-static">{detail.source}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Comment</label>
                          <div className="form-control-static">{detail.comment}</div>
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
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === VACCINATIONS_PANEL || expandedPanel === 'all') && editedPanel[VACCINATIONS_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={VACCINATIONS_PANEL}
            title="Edit Vaccination"
            isOpen={openedPanel === VACCINATIONS_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={vaccinationPanelFormValues}
            isBtnShowPanel={false}
          >
            <VaccinationDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null }
        </div>
      </div>
    )
  }
}
