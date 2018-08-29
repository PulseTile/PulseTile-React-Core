import React, { PureComponent } from 'react';
import { get } from 'lodash';
import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import DiagnosisDetailForm from './DiagnosisDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';
import Switch from '../../../form-fields/Switch';
import { themeConfigs } from '../../../../themes.config';

const DIAGNOSES_PANEL = 'diagnosesPanel';

export default class DiagnosisDetail extends PureComponent {

  /**
   * This function checks that current element should be show at details panel
   *
   * @param {string} el
   * @param {array}  hideElements
   * @return {boolean}
   */
  isShowElement(el, hideElements) {
    return (-1 === hideElements.indexOf(el));
  }


  /**
   * This function check that button should be visible
   *
   * @param {array}   hiddenButtons
   * @param {string}  buttonType
   * @param {boolean} defaultResult
   * @return {boolean}
   */
  isButtonVisible(hiddenButtons, buttonType, defaultResult) {
    let result = defaultResult;
    if (-1 !== hiddenButtons.indexOf(buttonType)) {
      result = false;
    }
    return result;
  }

  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, diagnosisPanelFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};

    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);
    const dateOfOnset = getDDMMMYYYY(detail[valuesNames.DATE_OF_ONSET]);

    const problemsTitle = get(themeConfigs.patientsSummaryTitles, 'diagnoses', 'Problems / Diagnosis');
    const editTitle = 'Edit ' + problemsTitle;

    const hideElements = get(themeConfigs, 'detailsToHide.diagnoses', []);
    const hiddenButtons = get(themeConfigs, 'buttonsToHide.diagnoses', []);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === DIAGNOSES_PANEL || expandedPanel === 'all') && !editedPanel[DIAGNOSES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DIAGNOSES_PANEL}
            title={problemsTitle}
            isOpen={openedPanel === DIAGNOSES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={diagnosisPanelFormValues}
            isBtnShowPanel={false}
            isEditButton={this.isButtonVisible(hiddenButtons, 'edit', true)}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">

                  { this.isShowElement(valuesNames.PROBLEM, hideElements) ?
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.PROBLEM}</label>
                          <div className="form-control-static">{detail[valuesNames.PROBLEM]}</div>
                        </div>
                      </div>
                    </div>
                    : null }

                  { this.isShowElement(valuesNames.DATE_OF_ONSET, hideElements) ?
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DATE_OF_ONSET}</label>
                          <div className="form-control-static">{dateOfOnset}</div>
                        </div>
                      </div>
                    </div>
                    : null }

                  { this.isShowElement(valuesNames.DESCRIPTION, hideElements) ?
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DESCRIPTION}</label>
                          <div className="form-control-static">{dateOfOnset}</div>
                        </div>
                      </div>
                    </div>
                    : null }

                  { this.isShowElement(valuesNames.TERMINOLOGY, hideElements) ?
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.TERMINOLOGY}</label>
                          <div className="form-control-static">{detail[valuesNames.TERMINOLOGY]}</div>
                        </div>
                      </div>
                    </div>
                    : null }

                  { this.isShowElement(valuesNames.CODE, hideElements) ?
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.CODE}</label>
                          <div className="form-control-static">{detail[valuesNames.CODE]}</div>
                        </div>
                      </div>
                    </div>
                    : null }

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

                  { this.isShowElement(valuesNames.AUTHOR, hideElements) ?
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.AUTHOR}</label>
                          <div className="form-control-static">{detail[valuesNames.AUTHOR]}</div>
                        </div>
                      </div>
                    </div>
                    : null }

                  { this.isShowElement(valuesNames.DATE, hideElements) ?
                    <div className="row-expand">
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DATE}</label>
                          <div className="form-control-static">{dateCreated}</div>
                        </div>
                      </div>
                    </div>
                    : null }

                  { this.isShowElement(valuesNames.SOURCE, hideElements) ?
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.SOURCE}</label>
                      <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
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
        </div>
      </div>
    )
  }
}
