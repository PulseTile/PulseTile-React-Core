import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import PersonalNotesDetailForm from './PersonalNotesDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const PERSONAL_NOTES_PANEL = 'personalNotesPanel';

export default class PersonalNotesDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, personalNoteFormValues, isSubmit } = this.props;
		let { detail } = this.props;
		detail = detail || {};
		const dateCreated = getDDMMMYYYY(detail.dateCreated);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === PERSONAL_NOTES_PANEL || expandedPanel === 'all') && !editedPanel[PERSONAL_NOTES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={PERSONAL_NOTES_PANEL}
            title="Personal Note"
            isOpen={openedPanel === PERSONAL_NOTES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={personalNoteFormValues}
            isBtnShowPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.TYPE}</label>
                          <div className="form-control-static">{detail[valuesNames.TYPE]}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
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
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === PERSONAL_NOTES_PANEL || expandedPanel === 'all') && editedPanel[PERSONAL_NOTES_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={PERSONAL_NOTES_PANEL}
            title="Edit Personal Note"
            isOpen={openedPanel === PERSONAL_NOTES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={personalNoteFormValues}
            isBtnShowPanel={false}
          >
            <PersonalNotesDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
