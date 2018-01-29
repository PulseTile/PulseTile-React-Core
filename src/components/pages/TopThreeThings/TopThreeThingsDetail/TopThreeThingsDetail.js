import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import TopThreeThingsDetailForm from './TopThreeThingsDetailForm'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';
import FormSectionList from '../../../form-fields/FormSectionList';
import FormSection from '../../../form-fields/FormSection';

const TOP_THREE_THINGS_PANEL = 'topThreeThingsPanel';

export default class TopThreeThingsDetail extends PureComponent {
  render() {
    const { onExpand, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, topThreeThingFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail.dateCreated);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === TOP_THREE_THINGS_PANEL || expandedPanel === 'all') && !editedPanel[TOP_THREE_THINGS_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={TOP_THREE_THINGS_PANEL}
            title="Top 3 Thing"
            isOpen={openedPanel === TOP_THREE_THINGS_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={topThreeThingFormValues}
            isBtnShowPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div>
                    <FormSectionList title="Isssue #1">
                      <FormSection isBordered theme='primary'>
                        <div className="form-group-wrapper">
                          <div className="row-expand">
                            <div className="col-expand-left">
                              <div className="form-group">
                                <label className="control-label">{valuesLabels.NAME}</label>
                                <div className="form-control-static">{detail[valuesNames.NAME1]}</div>
                              </div>
                            </div>
                            <div className="col-expand-right">
                              <div className="form-group">
                                <label className="control-label">{valuesLabels.DESCRIPTION}</label>
                                <div className="form-control-static">{detail[valuesNames.DESCRIPTION1]}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </FormSection>
                    </FormSectionList>
                    <FormSectionList title="Isssue #2">
                      <FormSection isBordered theme='primary'>
                        <div className="form-group-wrapper">
                          <div className="row-expand">
                            <div className="col-expand-left">
                              <div className="form-group">
                                <label className="control-label">{valuesLabels.NAME}</label>
                                <div className="form-control-static">{detail[valuesNames.NAME2]}</div>
                              </div>
                            </div>
                            <div className="col-expand-right">
                              <div className="form-group">
                                <label className="control-label">{valuesLabels.DESCRIPTION}</label>
                                <div className="form-control-static">{detail[valuesNames.DESCRIPTION2]}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </FormSection>
                    </FormSectionList>
                    <FormSectionList title="Isssue #3">
                      <FormSection isBordered theme='primary'>
                        <div className="form-group-wrapper">
                          <div className="row-expand">
                            <div className="col-expand-left">
                              <div className="form-group">
                                <label className="control-label">{valuesLabels.NAME}</label>
                                <div className="form-control-static">{detail[valuesNames.NAME3]}</div>
                              </div>
                            </div>
                            <div className="col-expand-right">
                              <div className="form-group">
                                <label className="control-label">{valuesLabels.DESCRIPTION}</label>
                                <div className="form-control-static">{detail[valuesNames.DESCRIPTION3]}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </FormSection>
                    </FormSectionList>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DATE}</label>
                          <div className="form-control-static">{dateCreated}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
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
          {(expandedPanel === TOP_THREE_THINGS_PANEL || expandedPanel === 'all') && editedPanel[TOP_THREE_THINGS_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={TOP_THREE_THINGS_PANEL}
            title="Edit Top 3 Thing"
            isOpen={openedPanel === TOP_THREE_THINGS_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={topThreeThingFormValues}
            isBtnShowPanel={false}
          >
            <TopThreeThingsDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
