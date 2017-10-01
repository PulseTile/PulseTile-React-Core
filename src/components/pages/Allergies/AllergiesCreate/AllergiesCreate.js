import React, { PureComponent } from 'react';

import AlergiesDetailPanel from '../AllergiesDetail/AlergiesDetailPanel'
import AllergiesCreateForm from './AllergiesCreateForm/AllergiesCreateForm'

const ALLERGIES_CREATE = 'allergiesCreate';

export default class AllergiesCreate extends PureComponent {
  render() {
    const { onExpand, name, onShow, openedPanel, expandedPanel, currentPanel } = this.props
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
          </AlergiesDetailPanel> : null}
        </div>
      </div>
    )
  }
}
