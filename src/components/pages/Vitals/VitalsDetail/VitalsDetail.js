import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import VitalsDetailForm from './VitalsDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const VITAL_PANEL = 'vitalPanel';

export default class VitalsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, vitalsDetailFormValues, isSubmit } = this.props;
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
            <div className="panel-body-inner">
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

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.DATE}</label>
                      <div className="form-control-static">{dateOfVital}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.REASON}</label>
                      <div className="form-control-static">{detail[valuesNames.REASON]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.SUMMARY}</label>
                      <div className="form-control-static">{detail[valuesNames.SUMMARY]}</div>
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
                      <label className="control-label">{valuesLabels.DATE_CREATED}</label>
                      <div className="form-control-static">{dateCreated}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.SOURCE}</label>
                      <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
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
