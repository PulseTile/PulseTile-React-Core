import React, { PureComponent } from 'react';

import PluginDetailPanel from './PluginDetailPanel'
import PTButton from '../ui-elements/PTButton/PTButton';

export default class PluginCreate extends PureComponent {
  render() {
    const { onExpand, name, onShow, openedPanel, expandedPanel, currentPanel, onSaveSettings, formValues, onCancel, isCreatePanelVisible, componentForm, title}  = this.props;
    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === name || expandedPanel === 'all') ? <PluginDetailPanel
            onExpand={onExpand}
            name={name}
            title={title}
            onShow={onShow}
            isOpen={openedPanel === name}
            currentPanel={currentPanel}
            isCreatePanelVisible={isCreatePanelVisible}
            editedPanel={{}}
          >
            {componentForm}
            <div className="panel-control">
              <div className="wrap-control-group">
                <div className="control-group right">
                  <PTButton className="btn btn-danger" onClick={() => onCancel()}>
                    <i className="fa fa-ban" /> Cancel
                  </PTButton>
                  <PTButton className="btn btn-success" onClick={() => onSaveSettings(formValues)}>
                    <i className="fa fa-check" /> Complete
                  </PTButton>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
