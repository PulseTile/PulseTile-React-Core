import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';

import ControlPanel from '../ControlPanel';
import AppSettingsForm from '../forms/AppSettingsForm';
import { valuesSettingsFormLabels } from '../forms.config';

const APPLICATION_PREFERENCES = 'applicationPreferences';

export default class ApplicationPreferencesPanel extends PureComponent {
  render() {
    const {
      formState,
      patientsInfo,
      openedPanel,
      expandedPanel,
      editedPanel,
      onShow,
      onExpand,
      onEdit,
      onCancel,
      onSaveSettings,
      isShowControlPanel,
      isSaveButton,
      theme,
    } = this.props;

    return (
      <div>
        {(expandedPanel === APPLICATION_PREFERENCES || expandedPanel === 'all') && !editedPanel[APPLICATION_PREFERENCES] ? <ControlPanel
          name={APPLICATION_PREFERENCES}
          title="Application Preferences"
          isOpen={openedPanel === APPLICATION_PREFERENCES}
          onShow={onShow}
          onExpand={onExpand}
          onEdit={onEdit}
          editedPanel={editedPanel}
          onCancel={onCancel}
          isShowControlPanel={isShowControlPanel}
          isSaveButton={isSaveButton}
        >
          <div className="panel-body-inner">
            <div className="form">
              <div className="form-group-wrapper">
                <Row>
                  <Col xs={12} md={6}>
                    <Row>
                      <div className="col-md-11">
                        <div className="form-group">
                          <label className="control-label">{valuesSettingsFormLabels.APP_TITLE}</label>
                          <div className="form-control-static">{patientsInfo.title}</div>
                        </div>

                        <div className="form-group">
                          <label className="control-label">{valuesSettingsFormLabels.LOGO_PATH}</label>
                          <div className="form-control-static">
                            <img src={patientsInfo.logoB64} alt="Logo Example" />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="control-label">{valuesSettingsFormLabels.SELECT_THEME_ONE}</label>
                          <div className="palette-color">
                            <span className="palette-color-icon" style={{ background: theme.baseColor }} />
                            <span className="palette-color-name">{theme.name}</span>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="control-label">{valuesSettingsFormLabels.BROWSER_TITLE}</label>
                          <div className="form-control-static">{patientsInfo.browserTitle}</div>
                        </div>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ControlPanel> : null }
        {(expandedPanel === APPLICATION_PREFERENCES || expandedPanel === 'all') && editedPanel[APPLICATION_PREFERENCES] ? <ControlPanel
          name={APPLICATION_PREFERENCES}
          title="Application Preferences"
          isOpen={openedPanel === APPLICATION_PREFERENCES}
          onShow={onShow}
          onExpand={onExpand}
          onEdit={onEdit}
          editedPanel={editedPanel}
          onCancel={onCancel}
          onSaveSettings={onSaveSettings}
          formValues={formState.values}
          isShowControlPanel={isShowControlPanel}
          isSaveButton={isSaveButton}
        >
          <AppSettingsForm
            patientsInfo={patientsInfo}
          />
        </ControlPanel> : null }
      </div>
    )
  }
}