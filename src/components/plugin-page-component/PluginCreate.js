import React, { PureComponent } from 'react';

import PluginDetailPanel from './PluginDetailPanel'
import PTButton from '../ui-elements/PTButton/PTButton';

export default class PluginCreate extends PureComponent {
  static defaultProps = {
    isImport: false,
    headingName: '',
    isCreationPermitted: true,
  };

  render() {
    const { onExpand, name, headingName, onShow, openedPanel, expandedPanel, currentPanel, onSaveSettings, formValues, onCancel, isCreatePanelVisible, isCreationPermitted, componentForm, title}  = this.props;
    const { isImport, onGoBack}  = this.props;
    if (isCreationPermitted) {
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
                        <PTButton className="btn btn-danger" aria-label="Cancel" onClick={() => onCancel()}>
                          <i className="fa fa-ban" /> Cancel
                        </PTButton>
                        <PTButton className="btn btn-success" aria-label="Complete" onClick={() => onSaveSettings(formValues)}>
                          <i className="fa fa-check" /> Complete
                        </PTButton>
                        </div>
                          {isImport ?
                            <div className="control-group with-indent left">
                              <PTButton className="btn btn-success btn-inverse btn-icon-normal btn-back-doc" aria-label="Back to Documents" onClick={onGoBack}>
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
        );
    } else {
      return (
        <div className="section-detail">
          <div className="panel-group accordion">
            {(expandedPanel === name || expandedPanel === 'all') ?
              <PluginDetailPanel
                onExpand={onExpand}
                name={name}
                title={title}
                onShow={onShow}
                isOpen={openedPanel === name}
                currentPanel={currentPanel}
                isCreatePanelVisible={isCreatePanelVisible}
                editedPanel={{}}
              >
                <div className="panel-body-inner">
                  <p>You don't have a permission to add new information about {headingName}</p>
                </div>
              </PluginDetailPanel> : null}
            </div>
          </div>
      );
    }
  }
}
