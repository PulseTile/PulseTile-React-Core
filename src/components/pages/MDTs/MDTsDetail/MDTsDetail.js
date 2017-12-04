import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import MDTsDetailForm from './MDTsDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const MDTS_PANEL = 'mdtsPanel';

export default class MDTsDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, mdtFormValues, isSubmit } = this.props;
		let { detail } = this.props;
		detail = detail || {};
    const dateOfRequest = getDDMMMYYYY(detail[valuesNames.DATE_OF_REQUEST]);
    const dateOfMeeting = getDDMMMYYYY(detail[valuesNames.DATE_OF_MEETING]);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === MDTS_PANEL || expandedPanel === 'all') && !editedPanel[MDTS_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={MDTS_PANEL}
            title="MDT Meeting"
            isOpen={openedPanel === MDTS_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={mdtFormValues}
            isBtnShowPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.TEAM}</label>
                        <div className="form-control-static">
                          {!detail[valuesNames.TEAM]
                            ? <span>{valuesLabels.TEAM_NOT}</span>
                            : <ul className="list-reset">
                                <li>{detail[valuesNames.TEAM]}</li>
                              </ul>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.DATE_OF_REQUEST}</label>
                        <div className="form-control-static">
                          {!detail[valuesNames.DATE_OF_REQUEST]
                            ? <span>{valuesLabels.DATE_OF_REQUEST_NOT}</span>
                            : <ul className="list-reset">
                                <li>{dateOfRequest}</li>
                              </ul>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.DATE_OF_MEETING}</label>
                        {!detail[valuesNames.DATE_OF_MEETING]
                          ? <span>{valuesLabels.DATE_OF_MEETING_NOT}</span>
                          : <ul className="list-reset">
                              <li>{dateOfMeeting}</li>
                            </ul>
                        }
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.LINK}</label>
                        <div className="form-control-static">
                          {!detail[valuesNames.LINK]
                            ? <span>{valuesLabels.LINK_NOT}</span>
                            : <a href={detail[valuesNames.LINK]}>{detail[valuesNames.LINK]}</a>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.QUESTION}</label>
                        {!detail[valuesNames.QUESTION]
                          ? <span>{valuesLabels.QUESTION_NOT}</span>
                          : <ul className="list-reset">
                              <li>{detail[valuesNames.QUESTION]}</li>
                            </ul>
                        }
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.NOTES}</label>
                        {!detail[valuesNames.NOTES]
                          ? <span>{valuesLabels.NOTES_NOT}</span>
                          : <ul className="list-reset">
                            <li>{detail[valuesNames.NOTES]}</li>
                          </ul>
                        }
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
          {(expandedPanel === MDTS_PANEL || expandedPanel === 'all') && editedPanel[MDTS_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={MDTS_PANEL}
            title="Edit MDT"
            isOpen={openedPanel === MDTS_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={mdtFormValues}
            isBtnShowPanel={false}
          >
            <MDTsDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
