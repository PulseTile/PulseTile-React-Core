import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import GenericPluginPanelForm from './GenericPluginDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

const GENERIC_PLUGIN_PANEL = 'genericPluginsPanel';

export default class GenericPluginDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, genericPluginFormValues, isSubmit } = this.props;
		let { detail } = this.props;
		detail = detail || {};
		const dateCreated = getDDMMMYYYY(detail.dateCreated);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === GENERIC_PLUGIN_PANEL || expandedPanel === 'all') && !editedPanel[GENERIC_PLUGIN_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={GENERIC_PLUGIN_PANEL}
            title="Generic Plugin Item"
            isOpen={openedPanel === GENERIC_PLUGIN_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={genericPluginFormValues}
            isBtnShowPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Type</label>
                          <div className="form-control-static">{detail.type}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Note</label>
                          <div className="form-control-static">{detail.note}</div>
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
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">Source</label>
                          <div className="form-control-static">{detail.source}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === GENERIC_PLUGIN_PANEL || expandedPanel === 'all') && editedPanel[GENERIC_PLUGIN_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={GENERIC_PLUGIN_PANEL}
            title="Edit Generic Plugin Item"
            isOpen={openedPanel === GENERIC_PLUGIN_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={genericPluginFormValues}
            isBtnShowPanel={false}
          >
            <GenericPluginPanelForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
