import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import VitalsDetailForm from './VitalsDetailForm'
import VitalsPopover from '../vitals-page-component/VitalsPopover'
import Switch from '../../../form-fields/Switch';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels, valuesAddons } from '../forms.config';

const VITAL_PANEL = 'vitalPanel';

export default class VitalsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, vitalsDetailFormValues, isSubmit, vitalStatuses, getHighlighterClass, popoverLabels } = this.props;
    let { detail } = this.props;
    detail = detail || {};
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
                            <span className={`${getHighlighterClass(valuesNames.RESPIRATION_RATE)}`} />
                            <label className="vitals-label">{valuesLabels.RESPIRATION_RATE}</label>
                            <VitalsPopover
                              title={valuesLabels.RESPIRATION_RATE}
                              popoverLabels={popoverLabels[valuesNames.RESPIRATION_RATE]}
                              vitalStatusesType={vitalStatuses[valuesNames.RESPIRATION_RATE].type}
                              detailValue={detail[valuesNames.RESPIRATION_RATE]}
                              vitalsAddon={valuesAddons.RESPIRATION_RATE}
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass(valuesNames.OXYGEN_SATURATION)}`} />
                            <label className="vitals-label">{valuesLabels.OXYGEN_SATURATION}</label>
                            <VitalsPopover
                              title={valuesLabels.OXYGEN_SATURATION}
                              popoverLabels={popoverLabels[valuesNames.OXYGEN_SATURATION]}
                              vitalStatusesType={vitalStatuses[valuesNames.OXYGEN_SATURATION].type}
                              detailValue={detail[valuesNames.OXYGEN_SATURATION]}
                              vitalsAddon={valuesAddons.OXYGEN_SATURATION}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass(valuesNames.OXYGEN_SUPPLEMENTAL)}`} />
                            <label className="vitals-label">{valuesLabels.OXYGEN_SUPPLEMENTAL}</label>
                            <div className="input-holder">
                              <Switch
                                type="checkbox"
                                name={valuesNames.OXYGEN_SUPPLEMENTAL}
                                disabled
                                value={detail[valuesNames.OXYGEN_SUPPLEMENTAL]}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass(valuesNames.HEART_RATE)}`} />
                            <label className="vitals-label">{valuesLabels.HEART_RATE}</label>
                            <VitalsPopover
                              title={valuesLabels.HEART_RATE}
                              popoverLabels={popoverLabels[valuesNames.HEART_RATE]}
                              vitalStatusesType={vitalStatuses[valuesNames.HEART_RATE].type}
                              detailValue={detail[valuesNames.HEART_RATE]}
                              vitalsAddon={valuesAddons.HEART_RATE}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="row">
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass(valuesNames.SYSTOLIC_BP)}`} />
                            <label className="vitals-label">{valuesLabels.SYSTOLIC_BP}</label>
                            <VitalsPopover
                              title={valuesLabels.SYSTOLIC_BP}
                              popoverLabels={popoverLabels[valuesNames.SYSTOLIC_BP]}
                              vitalStatusesType={vitalStatuses[valuesNames.SYSTOLIC_BP].type}
                              detailValue={detail[valuesNames.SYSTOLIC_BP]}
                              vitalsAddon={valuesAddons.SYSTOLIC_BP}
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className="highlighter-not-vital" />
                            <label className="vitals-label">{valuesLabels.DIASTOLIC_BP}</label>
                            <div className="input-group vitals-holder">
                              <div className="form-control input-sm">{detail[valuesNames.DIASTOLIC_BP]}</div>
                              <span className="vitals-addon">{valuesAddons.DIASTOLIC_BP}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass(valuesNames.LEVEL_OF_CONSCIOUSNESS)}`} />
                            <label htmlFor={valuesNames.LEVEL_OF_CONSCIOUSNESS} className="vitals-label">{valuesLabels.LEVEL_OF_CONSCIOUSNESS}</label>
                            <div className="input-holder">
                              <div className="switch-group">
                                <Switch
                                  type="radio"
                                  name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                                  disabled
                                  value="Alert"
                                  transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                                  text="A"
                                  id="levelOfConsciousnessA"
                                />
                                <Switch
                                  type="radio"
                                  name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                                  disabled
                                  value="Verbal"
                                  transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                                  text="V"
                                  id="levelOfConsciousnessV"
                                />
                                <Switch
                                  type="radio"
                                  name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                                  disabled
                                  value="Pain"
                                  transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                                  text="P"
                                  id="levelOfConsciousnessP"
                                />
                                <Switch
                                  type="radio"
                                  name={valuesNames.LEVEL_OF_CONSCIOUSNESS}
                                  disabled
                                  value="Unresponsive"
                                  transitionValue={detail[valuesNames.LEVEL_OF_CONSCIOUSNESS]}
                                  text="U"
                                  id="levelOfConsciousnessU"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                          <div className="vitals-group highlighter-wrapper">
                            <span className={`${getHighlighterClass(valuesNames.TEMPERATURE)}`} />
                            <label className="vitals-label">{valuesLabels.TEMPERATURE}</label>
                            <VitalsPopover
                              title={valuesLabels.TEMPERATURE}
                              popoverLabels={popoverLabels[valuesNames.TEMPERATURE]}
                              vitalStatusesType={vitalStatuses[valuesNames.TEMPERATURE].type}
                              detailValue={detail[valuesNames.TEMPERATURE]}
                              vitalsAddon={valuesAddons.TEMPERATURE}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="vitals-group highlighter-wrapper">
                        <span className={`${getHighlighterClass(valuesNames.NEWS_SCORE)}`} />
                        <label className="vitals-label">{valuesLabels.NEWS_SCORE}</label>
                        <div className={`input-holder vitals-holder ${vitalStatuses[valuesNames.NEWS_SCORE].type}`}>
                          <div className="form-control input-sm">{detail[valuesNames.NEWS_SCORE]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body-inner">
                <div className="form-group-wrapper">
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
              vitalStatuses={vitalStatuses}
              getHighlighterClass={getHighlighterClass}
              popoverLabels={popoverLabels}
            />
          </PluginDetailPanel> : null }
        </div>
      </div>
    )
  }
}
