import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import DrawingsDetailForm from './DrawingsDetailForm'
import DrawingsPaint from "../drawings-page-component/DrawingsPaint";
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const DRAWING_PANEL = 'drawingPanel';
const DRAWING = 'drawing';

export default class DrawingsDetail extends PureComponent {
  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, drawingsDetailFormValues, drawingsFormValues, isSubmit, onChangeImageCanvas } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === DRAWING || expandedPanel === 'all') && !editedPanel[DRAWING] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DRAWING}
            title="Drawing"
            onShow={onShow}
            isOpen={openedPanel === DRAWING}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={drawingsFormValues}
            isBtnShowPanel
          >
            <div className="drawing-wrapper">
              { detail.drawingBase64 ? <div className="drawing-canvas-holder">
                <img src={detail.drawingBase64} alt="drawingImage" />
              </div> : null }
            </div>
          </PluginDetailPanel> : null}

          {(expandedPanel === DRAWING || expandedPanel === 'all') && editedPanel[DRAWING] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DRAWING}
            title="Edit Drawing"
            onShow={onShow}
            isOpen={openedPanel === DRAWING}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={drawingsFormValues}
            isBtnShowPanel
          >
            <DrawingsPaint
              detail={detail}
              onChangeImageCanvas={onChangeImageCanvas}
            />
          </PluginDetailPanel> : null }

          {(expandedPanel === DRAWING_PANEL || expandedPanel === 'all') && !editedPanel[DRAWING_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DRAWING_PANEL}
            title="Drawing Details"
            isOpen={openedPanel === DRAWING_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={drawingsDetailFormValues}
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
                        <label className="control-label">{valuesLabels.SOURCE}</label>
                        <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
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
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}

          {(expandedPanel === DRAWING_PANEL || expandedPanel === 'all') && editedPanel[DRAWING_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DRAWING_PANEL}
            title="Edit Drawing Details"
            isOpen={openedPanel === DRAWING_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={drawingsDetailFormValues}
            isBtnShowPanel
          >
            <DrawingsDetailForm
              detail={detail}
              isSubmit={isSubmit}
            />
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
