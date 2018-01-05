import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import VitalsDetailForm from './VitalsDetailForm'
import VitalsPopover from '../vitals-page-component/VitalsPopover'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';
import Switch from '../../../form-fields/Switch';

const VITAL_PANEL = 'vitalPanel';

export default class VitalsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, vitalsDetailFormValues, isSubmit, vitalStatuses, getHighlighterClass, popoverLabels } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const dateOfVital = getDDMMMYYYY(detail[valuesNames.DATE]);
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === VITAL_PANEL || expandedPanel === 'all') && !editedPanel[VITAL_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={VITAL_PANEL}
            title="Vital"
            onShow={onShow}
            isOpen={openedPanel === VITAL_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={vitalsDetailFormValues}
          >
            <div className="form">
              <div className="panel-body-inner">
                <div className="vitals-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="row">
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass('respirationRate')}`} />
                            <label className="vitals-label">Respiration Rate</label>
                            <VitalsPopover
                              title="Respiration Rate"
                              popoverLabels={popoverLabels.respirationRate}
                              vitalStatusesType={vitalStatuses.respirationRate.type}
                              detailValue={detail.respirationRate}
                              vitalsAddon="resps/min"
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass('oxygenSaturation')}`} />
                            <label className="vitals-label">Oxygen Saturation</label>
                            <VitalsPopover
                              title="Oxygen Saturation"
                              popoverLabels={popoverLabels.oxygenSaturation}
                              vitalStatusesType={vitalStatuses.oxygenSaturation.type}
                              detailValue={detail.oxygenSaturation}
                              vitalsAddon="%"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass('oxygenSupplemental')}`} />
                            <label className="vitals-label">Any Supplemental Oxygen</label>
                            <div className="input-holder">
                              <Switch
                                className="switch"
                                type="checkbox"
                                name="oxygenSupplemental"
                                disabled
                                value={detail.oxygenSupplemental}
                              >
                                <span className="text text-check-true">Yes</span>
                                <span className="text text-check-false">No</span>
                              </Switch>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass('heartRate')}`} />
                            <label className="vitals-label">Heart Rate</label>
                            <VitalsPopover
                              title="Heart Rate"
                              popoverLabels={popoverLabels.heartRate}
                              vitalStatusesType={vitalStatuses.heartRate.type}
                              detailValue={detail.heartRate}
                              vitalsAddon="bpm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="row">
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass('systolicBP')}`} />
                            <label className="vitals-label">Systolic BP</label>
                            <VitalsPopover
                              title="Systolic BP"
                              popoverLabels={popoverLabels.systolicBP}
                              vitalStatusesType={vitalStatuses.systolicBP.type}
                              detailValue={detail.systolicBP}
                              vitalsAddon="mmHg"
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className="highlighter-not-vital" />
                            <label className="vitals-label">Diastolic BP</label>
                            <div className="input-group vitals-holder">
                              <div className="form-control input-sm">{detail.diastolicBP}</div>
                              <span className="vitals-addon">mmHg</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass('levelOfConsciousness')}`} />
                            <label htmlFor="levelOfConsciousness" className="vitals-label">Level of Consciousness</label>
                            <div className="input-holder">
                              <div className="switch-group">
                                <label className="switch">
                                  <input id="levelOfConsciousnessA" type="radio" name="levelOfConsciousness" value="Alert" disabled />
                                  <div className="slider disabled"><span className="text">A</span></div>
                                </label>
                                <label className="switch">
                                  <input id="levelOfConsciousnessV" type="radio" name="levelOfConsciousness" value="Verbal" disabled />
                                  <div className="slider disabled"><span className="text">V</span></div>
                                </label>
                                <label className="switch">
                                  <input id="levelOfConsciousnessP" type="radio" name="levelOfConsciousness" value="Pain" disabled />
                                  <div className="slider disabled"><span className="text">P</span></div>
                                </label>
                                <label className="switch">
                                  <input id="levelOfConsciousnessU" type="radio" name="levelOfConsciousness" value="Unresponsive" disabled />
                                  <div className="slider disabled"><span className="text">U</span></div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass('temperature')}`} />
                            <label className="vitals-label">Temperature</label>
                            <VitalsPopover
                              title="Temperature"
                              popoverLabels={popoverLabels.temperature}
                              vitalStatusesType={vitalStatuses.temperature.type}
                              detailValue={detail.temperature}
                              vitalsAddon="c"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="vitals-group highlighter-wrapper">
                        <span className={`${getHighlighterClass('newsScore')}`} />
                        <label className="vitals-label">NEWS Score</label>
                        <div className={`input-holder vitals-holder ${vitalStatuses.newsScore.type}`}>
                          <div className="form-control input-sm">{detail.newsScore}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}

          {(expandedPanel === VITAL_PANEL || expandedPanel === 'all') && editedPanel[VITAL_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={VITAL_PANEL}
            title="Edit Vital"
            onShow={onShow}
            isOpen={openedPanel === VITAL_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={vitalsDetailFormValues}
          >
            <VitalsDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null }
        </div>
      </div>
    )
  }
}
