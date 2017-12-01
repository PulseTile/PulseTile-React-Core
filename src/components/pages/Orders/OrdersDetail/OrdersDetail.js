import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const ORDERS_PANEL = 'ordersPanel';

export default class OrdersDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, editedPanel, onCancel } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail[valuesNames.ORDER_DATE]);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === ORDERS_PANEL || expandedPanel === 'all') && !editedPanel[ORDERS_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={ORDERS_PANEL}
            title="Orders"
            isOpen={openedPanel === ORDERS_PANEL}
            currentPanel={currentPanel}
            editedPanel={editedPanel}
            onCancel={onCancel}
            isBtnShowPanel={false}
            isShowControlPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.NAME}</label>
                          <div className="form-control-static">{detail[valuesNames.NAME]}</div>
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
        </div>
      </div>
    )
  }
}
