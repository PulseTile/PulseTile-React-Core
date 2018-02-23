import React, { PureComponent } from 'react';

import ControlPanel from '../ControlPanel';
import Feeds from '../../Feeds/Feeds'

const FEEDS = 'feeds';

export default class FeedsPanel extends PureComponent {
  render() {
    const {
      openedPanel,
      expandedPanel,
      editedPanel,
      onShow,
      onExpand,
      onEdit,
      onCancel,
      isShowControlPanel,
      isSaveButton,
    } = this.props;

    return (
      <div>
        {expandedPanel === FEEDS || expandedPanel === 'all' ? <ControlPanel
          name={FEEDS}
          title="Feeds"
          isOpen={openedPanel === FEEDS}
          onShow={onShow}
          onExpand={onExpand}
          onEdit={onEdit}
          editedPanel={editedPanel}
          onCancel={onCancel}
          isShowControlPanel={isShowControlPanel}
          isSaveButton={isSaveButton}
        >
          <Feeds />
        </ControlPanel> : null }
      </div>
    )
  }
}