import React, { PureComponent } from 'react';

export default class HeaderList extends PureComponent {
  static defaultProps = {
    items: [],
  };

  render() {
    const { items } = this.props;
    return (
      (items && items.length)
        ? <div className="header-list">
          { items.map((el, i) => (<div className="header-list__item" key={i}>{ el }</div>)) }
        </div>
        : <div />
    )
  }
}
