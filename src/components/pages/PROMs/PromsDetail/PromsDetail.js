import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import PromsDetailForm from './PromsDetailForm';
import FormTitle from '../../../ui-elements/FormTitle/FormTitle';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const PROM_PANEL = 'promPanel';

export default class PromsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, promsDetailFormValues, isSubmit, match, status, changeScoreStatus } = this.props;
    let { detail } = this.props;
    detail = detail || {};

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === PROM_PANEL || expandedPanel === 'all') && !editedPanel[PROM_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={PROM_PANEL}
            title="PROM"
            onShow={onShow}
            isOpen={openedPanel === PROM_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={promsDetailFormValues}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.NAME}</label>
                        <div className="form-control-static">{detail[valuesNames.NAME]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label">{valuesLabels.RECORDS}</label>
                    { detail[valuesNames.RECORDS] && detail[valuesNames.RECORDS].length
                      ? <table className="table table-striped table-hover table-bordered rwd-table table-fixedcol table-no-cursor">
                        <colgroup>
                          <col />
                          <col style={{ width: '21%' }} />
                          <col style={{ width: '21%' }} />
                          <col style={{ width: '18%' }} />
                        </colgroup>
                        <thead><tr>
                          <th>{valuesLabels.RECORDS_NAME}</th>
                          <th>{valuesLabels.RECORDS_TYPE}</th>
                          <th>{valuesLabels.RECORDS_DATE}</th>
                          <th>{valuesLabels.RECORDS_SOURCE}</th>
                        </tr></thead>
                        <tbody>
                          { detail[valuesNames.RECORDS].map((record, index) => <tr key={index}>
                            <td data-th={valuesLabels.RECORDS_NAME}><span>{record[valuesNames.RECORDS_NAME]}</span></td>
                            <td data-th={valuesLabels.RECORDS_TYPE}><span>{record[valuesNames.RECORDS_TYPE]}</span></td>
                            <td data-th={valuesLabels.RECORDS_DATE}><span>{getDDMMMYYYY(record[valuesNames.RECORDS_DATE])}</span></td>
                            <td data-th={valuesLabels.RECORDS_SOURCE}><span>{record[valuesNames.RECORDS_SOURCE]}</span></td>
                          </tr>)}
                        </tbody>
                      </table>
                      : <div className="form-control-static">{valuesLabels.RECORDS_NOT_EXIST}</div>
                    }
                  </div>

                  <FormTitle text="Specific Question" />
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.QUESTION_PAIN}</label>
                        <div className="form-control-static">{detail[valuesNames.SPECIFIC_Q1]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.QUESTION_LIMITATIONS}</label>
                        <div className="form-control-static">{detail[valuesNames.SPECIFIC_Q2]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.QUESTION_WALKING}</label>
                        <div className="form-control-static">{detail[valuesNames.SPECIFIC_Q3]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.QUESTION_WALKING_SURFACES}</label>
                        <div className="form-control-static">{detail[valuesNames.SPECIFIC_Q4]}</div>
                      </div>
                    </div>
                  </div>

                  <FormTitle text="General Score" />
                  <div className="form-group">
                    <div>Pain severity on a scale of 0 to 10, where 0 indicates no pain and 10 indicates severe pain.</div>
                  </div>
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="highlighter-input-group highlighter-wrapper">
                        <span className={`highlighter-${status}`} />
                        <label className="control-label">{valuesLabels.SCORE}</label>
                        <div className={`input-holder highlighter-input-holder ${status}`}>
                          <div className="form-control input-sm">{detail[valuesNames.SCORE]}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.DATE_CREATED}</label>
                        <div className="form-control-static">{getDDMMMYYYY(detail[valuesNames.DATE_CREATED])}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.SOURCE}</label>
                        <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}

          {(expandedPanel === PROM_PANEL || expandedPanel === 'all') && editedPanel[PROM_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={PROM_PANEL}
            title="Edit PROM"
            onShow={onShow}
            isOpen={openedPanel === PROM_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={promsDetailFormValues}
            isBtnShowPanel
          >
            <PromsDetailForm
              detail={detail}
              isSubmit={isSubmit}
              match={match}
              status={status}
              changeScoreStatus={changeScoreStatus}
            />
          </PluginDetailPanel> : null }
        </div>
      </div>
    )
  }
}
