import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import MedicationsDetailPanel from './MedicationsDetailPanel'
import MedicationsDetailForm from './MedicationsDetailForm'
import MedicationsPrescriptionForm from './MedicationsPrescriptionForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import PTButton from '../../../ui-elements/PTButton/PTButton';

const MEDICATION_PANEL = 'medicationPanel';
const PRESCRIPTION_PANEL = 'prescriptionPanel';
const WARNINGS_PANEL = 'warningsPanel';
const CHANGE_HISTORY_PANEL = 'changeHistoryPanel';

export default class MedicationsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, medicationsDetailFormValues, prescriptionPanelFormValues, isSubmit, toggleHourlySchedule, isOpenHourlySchedule } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail.dateCreated);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === MEDICATION_PANEL || expandedPanel === 'all') && !editedPanel[MEDICATION_PANEL] ? <MedicationsDetailPanel
            onExpand={onExpand}
            name={MEDICATION_PANEL}
            title="Medication"
            onShow={onShow}
            isOpen={openedPanel === MEDICATION_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={medicationsDetailFormValues}
            isBtnShowPanel
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">Name</label>
                        <div className="form-control-static">{detail.name}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">Dose Amount</label>
                        <div className="form-control-static">{detail.doseAmount}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">Dose Timing</label>
                        <div className="form-control-static">{detail.doseTiming}</div>
                      </div>
                      <div className="form-group">
                        <div className="wrap-control-group">
                          <div className="control-group left">
                            <button type="button" className="btn btn-primary btn-inverse" onClick={() => onShow(PRESCRIPTION_PANEL)}><span className="btn-text">Prescription</span></button>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label">Dose Directions</label>
                        <div className="form-control-static">{detail.doseDirections}</div>
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
          </MedicationsDetailPanel> : null}

          {(expandedPanel === MEDICATION_PANEL || expandedPanel === 'all') && editedPanel[MEDICATION_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={MEDICATION_PANEL}
            title="Edit Medication"
            onShow={onShow}
            isOpen={openedPanel === MEDICATION_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={medicationsDetailFormValues}
            isBtnShowPanel
          >
            <MedicationsDetailForm
              detail={detail}
              isSubmit={isSubmit}
              onShow={onShow}
            />
          </PluginDetailPanel> : null }

          {(expandedPanel === PRESCRIPTION_PANEL || expandedPanel === 'all') && !editedPanel[PRESCRIPTION_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={PRESCRIPTION_PANEL}
            title="Prescription (1)"
            isOpen={openedPanel === PRESCRIPTION_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={prescriptionPanelFormValues}
            isBtnShowPanel
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="panel-body-section">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">Name</label>
                        <div className="form-control-static">{detail.name}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">Dose Amount</label>
                        <div className="form-control-static">{detail.doseAmount}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-body-section">
                  <div className="form-group">
                    <label className="control-label">Dose Timing:</label>
                    <div className="form-control-static">2X each morning</div>
                  </div>
                  <div className="form-group">
                    <div className="wrap-control-group">
                      <div className="control-group left">
                        <PTButton className="btn btn-success btn-sm btn-inverse btn-icon-normal btn-dropdown-toggle btn-schedule" onClick={() => toggleHourlySchedule()}>
                          <i className="btn-icon fa fa-table" />
                          <span className="btn-text"> Hourly Schedule</span>
                        </PTButton>
                      </div>
                    </div>
                    {isOpenHourlySchedule ? <div className="schedule-block ng-scope">
                      <div className="panel panel-small panel-table">
                        <div className="panel-heading">
                          <h3 className="panel-title">27-Nov-2016</h3>
                        </div>
                        <div className="panel-body">
                          <div className="wrap-table-scrollX">
                            <table className="table table-striped table-bordered table-fixedcol table-schedule">
                              <thead>
                                <tr>
                                  <th>09:00</th>
                                  <th>10:00</th>
                                  <th className="selected">11:00</th>
                                  <th>12:00</th>
                                  <th>13:00</th>
                                  <th>14:00</th>
                                  <th>15:00</th>
                                  <th className="selected">16:00</th>
                                  <th>17:00</th>
                                  <th>18:00</th>
                                  <th>19:00</th>
                                  <th>20:00</th>
                                  <th className="selected">21:00</th>
                                  <th>22:00</th>
                                  <th>23:00</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td className="selected">2X</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td className="selected">2X</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td className="selected">2X</td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div> : null }
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}

          {(expandedPanel === PRESCRIPTION_PANEL || expandedPanel === 'all') && editedPanel[PRESCRIPTION_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={PRESCRIPTION_PANEL}
            title="Edit Prescription (1)"
            onShow={onShow}
            isOpen={openedPanel === PRESCRIPTION_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={prescriptionPanelFormValues}
            isBtnShowPanel
          >
            <MedicationsPrescriptionForm
              toggleHourlySchedule={toggleHourlySchedule}
              detail={detail}
              isSubmit={isSubmit}
              isOpenHourlySchedule={isOpenHourlySchedule}
              formValues={prescriptionPanelFormValues}
            />
          </PluginDetailPanel> : null }

          {(expandedPanel === WARNINGS_PANEL || expandedPanel === 'all') ? <PluginDetailPanel
            onExpand={onExpand}
            name={WARNINGS_PANEL}
            title="Warnings (2)"
            isOpen={openedPanel === WARNINGS_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            isBtnShowPanel
            isShowControlPanel={false}
          >
            <div className="panel-expand-wrapper">
              <div className="panel-expand-row">
                <div className="panel-expand-item">
                  <div className="panel-body-inner highlighter-wrapper">
                    <span className="highlighter-warning ng-scope"></span>
                    <div className="form">
                      <div className="form-group">
                        <label className="control-label">Warning #1</label>
                        <div className="form-control-static">Interaction found between <a>Furosemide</a> and <a>Latanoprost</a></div>
                      </div>

                      <div className="form-group">
                        <label className="control-label">Effects</label>
                        <div className="form-control-static">Anticonvulsant effect antagonised</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-expand-item">
                  <div className="panel-body-inner highlighter-wrapper">
                    <span className="highlighter-danger ng-scope"></span>
                    <div className="form">
                      <div className="form-group">
                        <label className="control-label">Warning #2</label>
                        <div className="form-control-static">Interaction found between <a>Furosemide</a> and <a>Digoxin</a></div>
                      </div>

                      <div className="form-group">
                        <label className="control-label">Effects</label>
                        <div className="form-control-static">May increase anticoagulant effect</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}

          {(expandedPanel === CHANGE_HISTORY_PANEL || expandedPanel === 'all') ? <PluginDetailPanel
            onExpand={onExpand}
            name={CHANGE_HISTORY_PANEL}
            title="Change History (1)"
            isOpen={openedPanel === CHANGE_HISTORY_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            isBtnShowPanel
            isShowControlPanel={false}
          >
            <div className="panel-expand-wrapper">
              <div className="panel-expand-row">
                <div className="panel-expand-item">
                  <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group">
                        <label className="control-label">Change #1 Date</label>
                        <div className="form-control-static">11-Oct-2016 11:45</div>
                      </div>

                      <div className="form-group">
                        <label className="control-label">Changes</label>
                        <div className="form-control-static">Dose: <em>60mg</em>  <span className="next-separate"><i className="fa fa-caret-right"></i></span>  40-20mg</div>
                      </div>
                    </div>
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
