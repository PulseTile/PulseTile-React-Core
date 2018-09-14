import React, { PureComponent } from 'react';

import PluginDetailPanel from './PluginDetailPanel'
import PTButton from '../ui-elements/PTButton/PTButton';

export default class PluginCreate extends PureComponent {
  static defaultProps = {
    isImport: false
  };

  render() {
    const { onExpand, name, onShow, openedPanel, expandedPanel, currentPanel, onSaveSettings, formValues, onCancel, isCreatePanelVisible, componentForm, title}  = this.props;
    const { isImport, onGoBack}  = this.props;
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
            <div>
              {componentForm}
              <div className="panel-control">
                <div className="wrap-control-group">
                  <div className="control-group right">
                    <PTButton className="btn btn-success btn-finished" onClick={() => onSaveSettings(formValues)}>
                      Finished
                      <i className="fa fa-check" /> 
                    </PTButton>
                    <PTButton className="btn btn-danger btn-cancel" onClick={() => onCancel()}>
                      {/* <i className="fa fa-ban" />  */}
                      Cancel
                    </PTButton>
                  </div>
                  {isImport ?
                    <div className="control-group with-indent left">
                      <PTButton className="btn btn-success btn-inverse btn-icon-normal btn-back-doc" onClick={onGoBack}>
                        <i className="btn-icon fa fa-caret-left" /> <span className="btn-text">Back to Documents</span>
                      </PTButton>
                    </div>
                    : null
                  }
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null} 
        </div>
      </div>
    )
  }
}
