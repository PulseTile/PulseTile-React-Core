import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import AllergyDetailMainForm from './AllergyDetailMainForm';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';


const ALLERGIE_PANEL = 'allergiePanel';
const META_PANEL = 'metaPanel';


export default class AllergiesDetail extends PureComponent {
  render() {
    const { onExpand, name, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, allergiePanelFormValues, metaPanelFormValues, isSubmit } = this.props;
		let { detail } = this.props;
		detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);
    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === ALLERGIE_PANEL || expandedPanel === 'all') && !editedPanel[ALLERGIE_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={ALLERGIE_PANEL}
            title="Allergy"
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
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <Row>
                    <Col xs={12} md={6}>
                      <Row>
                        <div className="col-md-11">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.CAUSE}</label>
                            <div className="form-control-static">{detail[valuesNames.CAUSE]}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">{valuesLabels.REACTION}</label>
                            <div className="form-control-static">{detail[valuesNames.REACTION]}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">{valuesLabels.AUTHOR}</label>
                            <div className="form-control-static">{detail[valuesNames.AUTHOR]}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">{valuesLabels.DATE_CREATED}</label>
                            <div className="form-control-static">{dateCreated}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">{valuesLabels.SOURCE}</label>
                            <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
                          </div>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === ALLERGIE_PANEL || expandedPanel === 'all') && editedPanel[ALLERGIE_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={ALLERGIE_PANEL}
            title="Allergy"
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
          {(expandedPanel === META_PANEL || expandedPanel === 'all') && !editedPanel[META_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={META_PANEL}
            title="Metadata"
            isOpen={openedPanel === META_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={metaPanelFormValues}
            isShowControlPanel={false}
            isBtnShowPanel
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <Row>
                    <Col xs={12} md={6}>
                      <Row>
                        <div className="col-md-11">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.CAUSECODE}</label>
                            <div className="form-control-static">{detail[valuesNames.CAUSECODE]}</div>
                          </div>

                          <div className="form-group">
                            <label className="control-label">{valuesLabels.TERMINOLOGY}</label>
                            <div className="form-control-static">{detail[valuesNames.TERMINOLOGY]}</div>
                          </div>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
