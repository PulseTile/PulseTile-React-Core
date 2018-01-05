import React, { PureComponent } from 'react';

import rangeVital from '../../../../assets/images/range-vital.jpg';

const POPOVER_WIDTH = 266;

export default class VitalsPopover extends PureComponent {
  state = {
    placement: '',
  };
    togglePopover = (ev) => {
      let { placement } = this.state;
      const popover = this.popover;
      const popoverWrap = document.getElementById('popover-wrap');
      const pageWidth = window.innerWidth;
      const offsetPopoverWrapLeft = popoverWrap.getBoundingClientRect().left;
      const freePlaceRight = pageWidth - (offsetPopoverWrapLeft + popover.offsetWidth);
      const freePlaceLeft = offsetPopoverWrapLeft;

      debugger
      if (freePlaceRight > POPOVER_WIDTH) {
        placement = 'right';
      } else if (freePlaceLeft > POPOVER_WIDTH) {
        placement = 'left';
      } else {
        placement = 'top';
      }
      popover.classList.remove('right', 'left', 'top');
      popover.classList.add(placement);
      popover.classList.toggle('in');
    };
    render() {
      const { title, popoverLabels, vitalStatusesType, detailValue, vitalsAddon } = this.props;
      return (
        <div className={`input-group vitals-holder popover-wrap ${vitalStatusesType}`} id="popover-wrap">
          <div className="form-control input-sm">{detailValue}</div>
          <span className="vitals-addon popover-toggle" onClick={this.togglePopover}>{vitalsAddon}</span>
          <div className="popover vitals-popover fade" ref={(el) => { this.popover = el; }}>
            <div className="arrow" />
            <div className="popover-inner">
              <h3 className="popover-title">{title}</h3>
              <div className="popover-content">
                <div className="range-vital-labels">
                  { popoverLabels.map(label => <div className={`range-vital-label place-${label.place}`}>{label.text}</div>)}
                  <img src={rangeVital} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}
