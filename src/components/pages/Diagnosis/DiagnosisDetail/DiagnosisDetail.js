import React, { PureComponent } from 'react';
import { get } from 'lodash';
import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import DiagnosisDetailForm from './DiagnosisDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';
import Switch from '../../../form-fields/Switch';
import { themeConfigs } from '../../../../themes.config';
import { isButtonVisible, isPanelVisible, isShowElement } from '../../../../utils/themeSettings-helper';

const DIAGNOSES_PANEL = 'diagnosesPanel';
const SYSTEM_INFO_PANEL = 'systemInformationPanel';

export default class DiagnosisDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, diagnosisPanelFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};

    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);
    const dateOfOnset = getDDMMMYYYY(detail[valuesNames.DATE_OF_ONSET]);

    const detailsTitle = get(themeConfigs.patientsSummaryDetailsTitles, 'diagnoses', 'Problem / Diagnosis');
    const editTitle = 'Edit ' + detailsTitle;

    const hideElements = get(themeConfigs, 'detailsToHide.diagnoses', []);
    const hiddenButtons = get(themeConfigs, 'buttonsToHide.diagnoses', []);
    const hiddenPanels = get(themeConfigs, 'panelsToHide.diagnoses', []);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === DIAGNOSES_PANEL || expandedPanel === 'all') && !editedPanel[DIAGNOSES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DIAGNOSES_PANEL}
            title={detailsTitle}
            onShow={onShow}
            isOpen={openedPanel === DIAGNOSES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={diagnosisPanelFormValues}
            isBtnShowPanel
            isEditButton={isButtonVisible(hiddenButtons, 'edit', true)}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">

                  <div className="row-expand">

                  { isShowElement(valuesNames.PROBLEM, hideElements) ?
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.PROBLEM}</label>
                          <div className="form-control-static">{detail[valuesNames.PROBLEM]}</div>
                        </div>
                      </div>
                    : null }
                  { isShowElement(valuesNames.DATE_OF_ONSET, hideElements) ?
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DATE_OF_ONSET}</label>
                          <div className="form-control-static">{dateOfOnset}</div>
                        </div>
                      </div>
                    : null }

                  </div>

                  <div className="row-expand">
                  { isShowElement(valuesNames.DESCRIPTION, hideElements) ?
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DESCRIPTION}</label>
                          <div className="form-control-static">{detail[valuesNames.DESCRIPTION]}</div>
                        </div>
                      </div>
                    : null }
                  { isShowElement(valuesNames.TERMINOLOGY, hideElements) ?
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.TERMINOLOGY}</label>
                          <div className="form-control-static">{detail[valuesNames.TERMINOLOGY]}</div>
                        </div>
                      </div>
                    : null }
                  </div>

                  <div className="row-expand">
                  { isShowElement(valuesNames.CODE, hideElements) ?
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.CODE}</label>
                          <div className="form-control-static">{detail[valuesNames.CODE]}</div>
                        </div>
                      </div>
                    : null }
                  { isShowElement(valuesNames.AUTHOR, hideElements) ?
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.AUTHOR}</label>
                          <div className="form-control-static">{detail[valuesNames.AUTHOR]}</div>
                        </div>
                      </div>
                    : null }
                  </div>

                  { detail[valuesNames.IS_IMPORT] ?
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.ORIGINAL_SOURCE}</label>
                          <div className="form-control-static">{detail[valuesNames.ORIGINAL_SOURCE]}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.IS_IMPORT}</label>
                          <div className="input-holder">
                            <Switch
                              id="isImport"
                              name="isImport"
                              type="checkbox"
                              value
                              chacked
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    : null }

                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === DIAGNOSES_PANEL || expandedPanel === 'all') && editedPanel[DIAGNOSES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DIAGNOSES_PANEL}
            title={editTitle}
            isOpen={openedPanel === DIAGNOSES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={diagnosisPanelFormValues}
            isBtnShowPanel={false}
          >
            <DiagnosisDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null }

          {(expandedPanel === SYSTEM_INFO_PANEL || expandedPanel === 'all') && !editedPanel[SYSTEM_INFO_PANEL] && isPanelVisible(hiddenPanels, 'systemInformation') ?
              <PluginDetailPanel
                onExpand={onExpand}
                name={SYSTEM_INFO_PANEL}
                title="System Information"
                isOpen={openedPanel === SYSTEM_INFO_PANEL}
                onShow={onShow}
                currentPanel={currentPanel}
                onEdit={onEdit}
                editedPanel={editedPanel}
                onCancel={onCancel}
                onSaveSettings={onSaveSettings}
                formValues={diagnosisPanelFormValues}
                isBtnShowPanel
                isShowControlPanel={false}
              >
                <div className="panel-body-inner">
                  <div className="form">
                    <div className="form-group-wrapper">
                      <div className="row-expand">
                        { isShowElement(valuesNames.DATE, hideElements) ?
                          <div className="col-expand-left">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.DATE}</label>
                              <div className="form-control-static">{dateCreated}</div>
                            </div>
                          </div>
                          : null }
                        { isShowElement(valuesNames.SOURCE, hideElements) ?
                          <div className="col-expand-right">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.SOURCE}</label>
                              <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
                            </div>
                          </div>
                          : null }
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
