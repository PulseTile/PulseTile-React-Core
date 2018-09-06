import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { get } from 'lodash';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import AllergyDetailMainForm from './AllergyDetailMainForm';
import Switch from '../../../form-fields/Switch';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';
import { themeConfigs } from '../../../../themes.config';
import { isButtonVisible, isPanelVisible, isShowElement } from '../../../../utils/themeSettings-helper';

const ALLERGIE_PANEL = 'allergiePanel';
const META_PANEL = 'metaPanel';
const SYSTEM_INFO_PANEL = 'systemInformationPanel';

export default class AllergiesDetail extends PureComponent {
  render() {
    const { onExpand, name, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, allergiePanelFormValues, metaPanelFormValues, isSubmit } = this.props;
		let { detail } = this.props;
		detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);

    const hideElements = get(themeConfigs, 'detailsToHide.allergies', []);
    const hiddenButtons = get(themeConfigs, 'buttonsToHide.allergies', []);
    const hiddenPanels = get(themeConfigs, 'panelsToHide.allergies', []);

    const detailsTitle = get(themeConfigs.patientsSummaryDetailsTitles, 'allergies', 'Allergy');

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === ALLERGIE_PANEL || expandedPanel === 'all') && !editedPanel[ALLERGIE_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={ALLERGIE_PANEL}
            title={detailsTitle}
            onShow={onShow}
            isOpen={openedPanel === ALLERGIE_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={allergiePanelFormValues}
            isBtnShowPanel
            isEditButton={isButtonVisible(hiddenButtons, 'edit', true)}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">

                  <div className="row-expand">
                    { isShowElement(valuesNames.CAUSE, hideElements) ?
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.CAUSE}</label>
                          <div className="form-control-static">{detail[valuesNames.CAUSE]}</div>
                        </div>
                      </div>
                      : null }
                  { isShowElement(valuesNames.REACTION, hideElements) ?
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.REACTION}</label>
                          <div className="form-control-static">{detail[valuesNames.REACTION]}</div>
                        </div>
                      </div>
                      : null }
                  </div>

                  <div className="row-expand">
                  { isShowElement(valuesNames.AUTHOR, hideElements) ?
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.AUTHOR}</label>
                          <div className="form-control-static">{detail[valuesNames.AUTHOR]}</div>
                        </div>
                      </div>
                      : null }
                  { isShowElement(valuesNames.CAUSECODE, hideElements) ?
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.CAUSECODE}</label>
                          <div className="form-control-static">{detail[valuesNames.CAUSECODE]}</div>
                        </div>
                      </div>
                      : null }
                  </div>

                  <div className="row-expand">
                    { isShowElement(valuesNames.TERMINOLOGY, hideElements) ?
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.TERMINOLOGY}</label>
                          <div className="form-control-static">{detail[valuesNames.TERMINOLOGY]}</div>
                        </div>
                      </div>
                    : null }
                  </div>

                  {detail[valuesNames.ISIMPORT] ?
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.ORIGINAL_SOURCE}</label>
                          <div className="form-control-static">{detail[valuesNames.ORIGINAL_SOURCE]}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.ISIMPORT}</label>
                          <div className="form-control-static"></div>
                          <div className="input-holder">
                            <Switch
                              id="isImport"
                              name="isImport"
                              type="checkbox"
                              value
                              chacked
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div> : null
                  }
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === ALLERGIE_PANEL || expandedPanel === 'all') && editedPanel[ALLERGIE_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={ALLERGIE_PANEL}
            title={detailsTitle}
            onShow={onShow}
            isOpen={openedPanel === ALLERGIE_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={allergiePanelFormValues}
            isBtnShowPanel
          >
            <AllergyDetailMainForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null }

          {(expandedPanel === SYSTEM_INFO_PANEL || expandedPanel === 'all') && !editedPanel[SYSTEM_INFO_PANEL] && isPanelVisible(hiddenPanels, 'systemInformation') ?
            <PluginDetailPanel
              onExpand={onExpand}
              name={SYSTEM_INFO_PANEL}
              title="System Information"
              isOpen={openedPanel === SYSTEM_INFO_PANEL}
              onShow={onShow}
              currentPanel={currentPanel}
              onEdit={onEdit}
              editedPanel={editedPanel}
              onCancel={onCancel}
              onSaveSettings={onSaveSettings}
              formValues={allergiePanelFormValues}
              isBtnShowPanel
              isShowControlPanel={false}
            >
              <div className="panel-body-inner">
                <div className="form">
                  <div className="form-group-wrapper">
                    <div className="row-expand">
                      { isShowElement(valuesNames.DATE, hideElements) ?
                        <div className="col-expand-left">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.DATE_CREATED}</label>
                            <div className="form-control-static">{dateCreated}</div>
                          </div>
                        </div>
                        : null }
                      { isShowElement(valuesNames.SOURCE, hideElements) ?
                        <div className="col-expand-right">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.SOURCE}</label>
                            <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
                          </div>
                        </div>
                        : null }
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
