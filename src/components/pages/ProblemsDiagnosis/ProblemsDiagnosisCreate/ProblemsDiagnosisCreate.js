import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import ProblemsDiagnosisCreateForm from './ProblemsDiagnosisCreateForm/ProblemsDiagnosisCreateForm'
import PTButton from '../../../ui-elements/PTButton/PTButton';

const DIAGNOSES_CREATE = 'diagnosesCreate';

export default class ProblemsDiagnosisCreate extends PureComponent {
  render() {
    const { onExpand, name, openedPanel, expandedPanel, currentPanel, onSaveSettings, formValues, onCancel, isCreatePanelVisible}  = this.props;
    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === DIAGNOSES_CREATE || expandedPanel === 'all') ? <PluginDetailPanel
            onExpand={onExpand}
            name={DIAGNOSES_CREATE}
            title="Create Problem and Diagnosis"
            isOpen={openedPanel === DIAGNOSES_CREATE}
            currentPanel={currentPanel}
            isCreatePanelVisible={isCreatePanelVisible}
          >
            <ProblemsDiagnosisCreateForm />
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
