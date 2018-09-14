import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import ReferralsDetailForm from './ReferralsDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const REFERRAL_PANEL = 'referralPanel';

export default class ReferralsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, referralsDetailFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const dateOfReferral = getDDMMMYYYY(detail[valuesNames.DATE]);
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === REFERRAL_PANEL || expandedPanel === 'all') && !editedPanel[REFERRAL_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={REFERRAL_PANEL}
            title="Referral"
            onShow={onShow}
            isOpen={openedPanel === REFERRAL_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={referralsDetailFormValues}
          >
            <div className="panel-body-inner">
              <div className="form-group-wrapper">
                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.FROM}</label>
                      <div className="form-control-static">{detail[valuesNames.FROM]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.TO}</label>
                      <div className="form-control-static">{detail[valuesNames.TO]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.DATE}</label>
                      <div className="form-control-static">{dateOfReferral}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.REASON}</label>
                      <div className="form-control-static">{detail[valuesNames.REASON]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.SUMMARY}</label>
                      <div className="form-control-static">{detail[valuesNames.SUMMARY]}</div>
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
                      <label className="control-label">{valuesLabels.DATE_CREATED}</label>
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
          </PluginDetailPanel> : null}

          {(expandedPanel === REFERRAL_PANEL || expandedPanel === 'all') && editedPanel[REFERRAL_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={REFERRAL_PANEL}
            title="Edit Referral"
            onShow={onShow}
            isOpen={openedPanel === REFERRAL_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={referralsDetailFormValues}
          >
            <ReferralsDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null }
        </div>
      </div>
    )
  }
}
