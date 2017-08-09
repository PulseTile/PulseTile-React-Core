import React, {Component} from 'react';

class PTButtonIcon extends Component {
  render() {
    let span = null;
    if (this.props.classButtonName == 'btn-notification') {
      span = <span className="count">2</span>;
    }
    return (
      <a className={`btn-header ${ this.props.classButtonName }`}>
        <i className={`fa ${ this.props.icon }`}/>
        {span}
      </a>
    );
  }
}

export default PTButtonIcon;
