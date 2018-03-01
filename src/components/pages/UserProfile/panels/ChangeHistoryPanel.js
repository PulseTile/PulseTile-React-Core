import React, { PureComponent } from 'react';
import moment from 'moment';

import ControlPanel from '../ControlPanel';

const CHANGE_HISTORY = 'changeHistory';

export default class ChangeHistoryPanel extends PureComponent {
  render() {
    const {
      openedPanel,
      editedPanel,
      onShow,
      onExpand,
      onEdit,
      onCancel,
      isShowControlPanel,
      isSaveButton,
    } = this.props;

    const currentDate = (new Date()).getTime();
    const CONVERT_CURRENT_DATE_WITH_TIME = moment(currentDate).format('YYYY-MM-DD HH:mm');

    return (
      <ControlPanel
        name={CHANGE_HISTORY}
        title="Change History"
        isOpen={openedPanel === CHANGE_HISTORY}
        onShow={onShow}
        onExpand={onExpand}
        onEdit={onEdit}
        editedPanel={editedPanel}
        onCancel={onCancel}
        onSaveSettings={() => {}}
        isShowControlPanel={isShowControlPanel}
        isSaveButton={isSaveButton}
      >
        <div className="panel-body-inner">
          <div className="form">
            <div className="form-group-wrapper">
              <div className="form-group">
                <label className="control-label ng-binding">Change #1 Date</label>
                <div className="form-control-static ng-binding">{CONVERT_CURRENT_DATE_WITH_TIME}</div>
              </div>
              <div className="form-group">
                <label className="control-label">Changes</label>
                <div className="form-control-static ng-binding">Last Name: <em className="ng-binding">White</em> <span className="next-separate"><i className="fa fa-caret-right" /></span> Blackwell</div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-body-inner">
          <div className="form">
            <div className="form-group-wrapper">
              <div className="form-group">
                <label className="control-label ng-binding">Change #2 Date</label>
                <div className="form-control-static ng-binding">{CONVERT_CURRENT_DATE_WITH_TIME}</div>
              </div>
              <div className="form-group">
                <label className="control-label">Changes</label>
                <div className="form-control-static ng-binding">Address: <em className="ng-binding">Flower Street</em> <span className="next-separate"><i className="fa fa-caret-right" /></span> 6801 Tellus Street</div>
              </div>
            </div>
          </div>
        </div>
      </ControlPanel>
    )
  }
}