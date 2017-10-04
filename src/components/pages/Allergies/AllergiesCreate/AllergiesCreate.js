import React, { PureComponent } from 'react';

import AlergiesDetailPanel from '../AllergiesDetail/AlergiesDetailPanel'
import AllergiesCreateForm from './AllergiesCreateForm/AllergiesCreateForm'
import PTButton from '../../../ui-elements/PTButton/PTButton';

const ALLERGIES_CREATE = 'allergiesCreate';

export default class AllergiesCreate extends PureComponent {
  render() {
    const { onExpand, name, onShow, openedPanel, expandedPanel, currentPanel, onSaveSettings, formValues, onCancel } = this.props
    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === ALLERGIES_CREATE || expandedPanel === 'all') ? <AlergiesDetailPanel
            onExpand={onExpand}
            name={ALLERGIES_CREATE}
            title="Create Allergy"
            onShow={onShow}
            isOpen={openedPanel === ALLERGIES_CREATE}
            currentPanel={currentPanel}
          >
            <AllergiesCreateForm />
            <div className="panel-control">
              <div className="wrap-control-group">
                <div className="control-group right">
                  <PTButton className="btn btn-danger" onClick={() => onCancel()}>
                    <i className="fa fa-ban" /> Cancel
                  </PTButton>
                  <PTButton className="btn btn-success" onClick={() => onSaveSettings(formValues)}>
                    <i className="fa fa-check" /> Complete
                  </PTButton>
                </div>
              </div>
            </div>
          </AlergiesDetailPanel> : null}
        </div>
      </div>
    )
  }
}