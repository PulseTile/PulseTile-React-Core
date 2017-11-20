import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import VaccinationDetailForm from './VaccinationDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const VACCINATIONS_PANEL = 'vaccinationsPanel';

export default class VaccinationDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, vaccinationPanelFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const vaccinationDateTime = getDDMMMYYYY(detail[valuesLabels.DATE_TIME]);
    const dateCreated = getDDMMMYYYY(detail[valuesLabels.DATE]);
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
                          <label className="control-label">{valuesLabels.NAME}</label>
                          <div className="form-control-static">{detail[valuesNames.NAME]}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DATE_TIME}</label>
                          <div className="form-control-static">{vaccinationDateTime}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.SERIES_NUMBER}</label>
                          <div className="form-control-static">{detail[valuesNames.SERIES_NUMBER]}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.SOURCE}</label>
                          <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.COMMENT}</label>
                          <div className="form-control-static">{detail[valuesNames.COMMENT]}</div>
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
