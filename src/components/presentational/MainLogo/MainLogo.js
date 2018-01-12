import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'

export default class MainLogo extends PureComponent {
  render() {
    const { patientsInfo, userAccount } = this.props;
    return (
      <div className="wrap-logo">
        <div className="logo">
          <div className="logo-icon">
            {userAccount.role === 'IDCR'
              ? <Link to={'/'}>
                <img className="img" alt="logo" src={patientsInfo.logoB64} />
              </Link>
              : userAccount.role === 'PHR'
                ? <Link to={`/patients/${userAccount.nhsNumber}/patients-summary`}>
                  <img className="img" alt="logo" src={patientsInfo.logoB64} />
                </Link> : null }
          </div>
        </div>
      </div>
    )
  }
}
