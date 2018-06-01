import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash/fp';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import PromsDetailForm from './PromsDetailForm';
import FormTitle from '../../../ui-elements/FormTitle/FormTitle';
import RecordsOfTableView from '../../../form-fields/RecordsOfTable/RecordsOfTableView';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels, qestionOptions } from '../forms.config';
import { patientProceduresDetailSelector } from '../../Procedures/selectors';
import { fetchPatientProceduresDetailRequest } from '../../Procedures/ducks/fetch-patient-procedures-detail.duck';

const PROM_PANEL = 'promPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientProceduresDetailRequest }, dispatch) });

@connect(patientProceduresDetailSelector, mapDispatchToProps)
export default class PromsDetail extends PureComponent {
  componentDidMount() {
    this.getProcedureById(this.props.detail, this.props.procedureDetail);
  }

  componentWillReceiveProps(nextProps) {
    this.getProcedureById(nextProps.detail, nextProps.procedureDetail);
  }

  getProcedureById = (detail, procedure) => {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);

    if (userId && detail && detail[valuesNames.PROCEDURE_ID]) {
      let procedureId = detail[valuesNames.PROCEDURE_ID];
      procedureId = procedureId.replace(/ehr:\/\/\//, '');
      procedureId = procedureId.replace(/::.*$/, '');

      if (!procedure || procedure.sourceId !== procedureId) {
        actions.fetchPatientProceduresDetailRequest({ userId, sourceId: procedureId });
      }
    }
  };

  getProcedureRecord = procedure => ([{
    date: getDDMMMYYYY(procedure.date),
    name: procedure.name,
    source: procedure.source,
    sourceId: procedure.sourceId,
    type: 'procedures',
    typeTitle: 'Procedures',
  }]);

  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, promsDetailFormValues, isSubmit, match, status, changeScoreStatus } = this.props;
    let { detail, procedureDetail } = this.props;
    detail = detail || {};

    if (detail[valuesNames.PROCEDURE_ID] && procedureDetail) {
      detail[valuesNames.RECORDS] = this.getProcedureRecord(procedureDetail);
    }

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

                  <RecordsOfTableView records={detail[valuesNames.RECORDS]} />

                  <FormTitle text="Specific Question" />
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.QUESTION_1}</label>
                        <div className="form-control-static">{qestionOptions[detail[valuesNames.SPECIFIC_Q1]]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.QUESTION_2}</label>
                        <div className="form-control-static">{qestionOptions[detail[valuesNames.SPECIFIC_Q2]]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.QUESTION_3}</label>
                        <div className="form-control-static">{qestionOptions[detail[valuesNames.SPECIFIC_Q3]]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.QUESTION_4}</label>
                        <div className="form-control-static">{qestionOptions[detail[valuesNames.SPECIFIC_Q4]]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.QUESTION_5}</label>
                      <div className="form-control-static">{qestionOptions[detail[valuesNames.SPECIFIC_Q5]]}</div>
                    </div>
                  </div>

                  <FormTitle text="General Score" />
                  <div className="form-group">
                    <div>Pain severity on a scale of 0 to 100, where 0 indicates no pain and 100 indicates severe pain.</div>
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
