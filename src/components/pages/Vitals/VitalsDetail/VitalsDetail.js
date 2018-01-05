import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import VitalsDetailForm from './VitalsDetailForm'
import VitalsPopover from '../vitals-page-component/VitalsPopover'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

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
