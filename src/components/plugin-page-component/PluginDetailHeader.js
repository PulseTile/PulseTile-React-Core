import React, { PureComponent } from 'react';

import PTButton from '../ui-elements/PTButton/PTButton';

export default class PluginDetailHeader extends PureComponent {
  render() {
    const { onExpand, name, title, onShow, currentPanel, isBtnShowPanel } = this.props;

    return (
      <div className="panel-heading">
        <div className="control-group right">
          <PTButton className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel" aria-label="Expand / Collapse" onClick={() => onExpand(name, currentPanel)}>
            <i className="btn-icon fa fa-expand" />
            <i className="btn-icon fa fa-compress" />
          </PTButton>
          {isBtnShowPanel ? <PTButton className="btn btn-success btn-inverse btn-square btn-toggle-rotate" aria-label="Toggle" onClick={() => onShow(name)}>
            <i className="btn-icon fa fa-chevron-up" />
          </PTButton> : null }
        </div>
        <h2 className="panel-title">{title}</h2>
      </div>
    )
  }
}
