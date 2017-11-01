import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'

export default class MainLogo extends PureComponent {
  render() {
    const { patientsInfo } = this.props;
    return (
      <div className="wrap-logo">
        <div className="logo">
          <div className="logo-icon">
            <Link to={'/'}>
              <img className="img" alt="logo" src={patientsInfo.logoB64} />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
