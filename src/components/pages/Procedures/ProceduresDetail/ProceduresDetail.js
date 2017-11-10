import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import ProceduresDetailForm from './ProceduresDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const PROCEDURE_PANEL = 'procedurePanel';
const META_PANEL = 'metaPanel';

export default class ProceduresDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, proceduresDetailFormValues, metaPanelFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const date = getDDMMMYYYY(detail[valuesNames.DATE_OF_PROCEDURE]);
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE]);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === PROCEDURE_PANEL || expandedPanel === 'all') && !editedPanel[PROCEDURE_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={PROCEDURE_PANEL}
            title="Procedure"
            onShow={onShow}
            isOpen={openedPanel === PROCEDURE_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={proceduresDetailFormValues}
            isBtnShowPanel
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
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.DATE_OF_PROCEDURE}</label>
                        <div className="form-control-static">{date}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PERFORMER}</label>
                        <div className="form-control-static">{detail[valuesNames.PERFORMER]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.NOTES}</label>
                        <div className="form-control-static">{detail[valuesNames.NOTES]}</div>
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
                        <label className="control-label">{valuesLabels.DATE}</label>
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
            </div>
          </PluginDetailPanel> : null}

          {(expandedPanel === PROCEDURE_PANEL || expandedPanel === 'all') && editedPanel[PROCEDURE_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={PROCEDURE_PANEL}
            title="Edit Procedure"
            onShow={onShow}
            isOpen={openedPanel === PROCEDURE_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={proceduresDetailFormValues}
            isBtnShowPanel
          >
            <ProceduresDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null }

          {(expandedPanel === META_PANEL || expandedPanel === 'all') ? <PluginDetailPanel
            onExpand={onExpand}
            name={META_PANEL}
            title="Metadata"
            isOpen={openedPanel === META_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={metaPanelFormValues}
            isBtnShowPanel
            isShowControlPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.TERMINOLOGY}</label>
                        <div className="form-control-static">{detail[valuesNames.TERMINOLOGY]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.CODE}</label>
                        <div className="form-control-static">{detail[valuesNames.CODE]}</div>
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
