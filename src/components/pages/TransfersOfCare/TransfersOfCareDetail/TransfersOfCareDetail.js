import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import TransfersOfCareDetailForm from './TransfersOfCareDetailForm';
import RecordsOfTableView from '../../../form-fields/RecordsOfTable/RecordsOfTableView';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const TRANSFER_OF_CARE_PANEL = 'transferOfCarePanel';

export default class TransfersOfCareDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, transfersOfCareDetailFormValues, isSubmit, match } = this.props;
    let { detail } = this.props;
    detail = detail || {};

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === TRANSFER_OF_CARE_PANEL || expandedPanel === 'all') && !editedPanel[TRANSFER_OF_CARE_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={TRANSFER_OF_CARE_PANEL}
            title="Transfer of Care"
            onShow={onShow}
            isOpen={openedPanel === TRANSFER_OF_CARE_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={transfersOfCareDetailFormValues}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.FROM}</label>
                        <div className="form-control-static">{detail[valuesNames.FROM]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.TO}</label>
                        <div className="form-control-static">{detail[valuesNames.TO]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label">{valuesLabels.DATE_TIME}</label>
                    <div className="form-control-static">{getDDMMMYYYY(detail[valuesNames.DATE_TIME])}</div>
                  </div>

                  <RecordsOfTableView records={detail[valuesNames.RECORDS]} />

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.REASON}</label>
                        <div className="form-control-static">{detail[valuesNames.REASON]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.CLINICAL}</label>
                        <div className="form-control-static">{detail[valuesNames.CLINICAL]}</div>
                      </div>
                    </div>
                  </div>

                  {/*<div className="form-group">*/}
                  {/*<label className="control-label">{valuesLabels.AUTHOR}</label>*/}
                  {/*<div className="form-control-static">{detail[valuesNames.AUTHOR]}</div>*/}
                  {/*</div>*/}

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

          {(expandedPanel === TRANSFER_OF_CARE_PANEL || expandedPanel === 'all') && editedPanel[TRANSFER_OF_CARE_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={TRANSFER_OF_CARE_PANEL}
            title="Edit Transfer of Care"
            onShow={onShow}
            isOpen={openedPanel === TRANSFER_OF_CARE_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={transfersOfCareDetailFormValues}
            isBtnShowPanel
          >
            <TransfersOfCareDetailForm
              detail={detail}
              isSubmit={isSubmit}
              match={match}
            />
          </PluginDetailPanel> : null }
        </div>
      </div>
    )
  }
}
