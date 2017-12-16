import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";

export default class MainLogo extends PureComponent {
  render() {
    const { patientsInfo, userAccount, logo } = this.props;
    return (
      <div className="wrap-logo">
        <div className="logo">
          <div className="logo-icon">
            {userAccount.role === 'IDCR'
              ? <Link to={'/'}>
                <img className={classNames(`img ${logo ? '' : 'logo-img'}`)} alt="logo" src={logo ? logo : patientsInfo.logoB64} />
              </Link>
              : userAccount.role === 'PHR'
                ? <Link to={`/patients/${userAccount.nhsNumber}/patients-summary`}>
                  <img className={classNames(`img ${logo ? '' : 'logo-img'}`)} alt="logo" src={logo ? logo : patientsInfo.logoB64} />
                </Link> : null }
          </div>
        </div>
      </div>
    )
  }
}
