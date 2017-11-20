import React, { PureComponent } from 'react';
import moment from 'moment';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
// import EventsDetailForm from './EventsDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const EVENT_PANEL = 'eventPanel';
const META_PANEL = 'metaPanel';
const CHAT_PANEL = 'chatPanel';

export default class EventsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, eventsDetailFormValues, metaPanelFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);
    const eventDate = moment(detail[valuesNames.DATE_TIME]).format('DD-MMM-YYYY HH:mm');

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === EVENT_PANEL || expandedPanel === 'all') && !editedPanel[EVENT_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={EVENT_PANEL}
            title={`Event - ${detail[valuesNames.TYPE]} Details`}
            onShow={onShow}
            isOpen={openedPanel === EVENT_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={eventsDetailFormValues}
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
                        <label className="control-label">{valuesLabels.TYPE}</label>
                        <div className="form-control-static">{detail[valuesNames.TYPE]}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.DESCRIPTION}</label>
                        <div className="form-control-static">{detail[valuesNames.DESCRIPTION]}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.EVENT_DATE}</label>
                        <div className="form-control-static">{eventDate}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.DATE}</label>
                        <div className="form-control-static">{dateCreated}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === META_PANEL || expandedPanel === 'all') && !editedPanel[META_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={META_PANEL}
            title={`Event - ${detail[valuesNames.TYPE]} Metadata`}
            onShow={onShow}
            isOpen={openedPanel === META_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={eventsDetailFormValues}
            isBtnShowPanel
            isShowControlPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.AUTHOR}</label>
                        <div className="form-control-static ng-binding">{detail[valuesNames.AUTHOR]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.SOURCE}</label>
                        <div className="form-control-static ng-binding">{detail[valuesNames.SOURCE]}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === CHAT_PANEL || expandedPanel === 'all') && !editedPanel[CHAT_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={CHAT_PANEL}
            title="Chat"
            onShow={onShow}
            isOpen={openedPanel === CHAT_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={eventsDetailFormValues}
            isBtnShowPanel
            isShowControlPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">

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
