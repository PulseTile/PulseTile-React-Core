import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { logo } from './LogoImage';

export default class MainLogo extends PureComponent {
  render() {
    const { patientsInfo, userAccount } = this.props;
    return (
      <div className="wrap-logo">
        <div className="logo">
          <div className="logo-icon">
            {userAccount.role === 'IDCR'
              ? <Link to={'/'}>
                {logo ? <img className="img" alt="logo" src={logo} /> : null}
                <img className={classNames(`img logo-img ${logo ? 'hidden' : ''}`)} alt="logo" src={patientsInfo.logoB64} />
              </Link>
              : userAccount.role === 'PHR'
                ? <Link to={`/patients/${userAccount.nhsNumber}/patients-summary`}>
                  {logo ? <img className="img" alt="logo" src={logo} /> : null}
                  <img className={classNames(`img logo-img ${logo ? 'hidden' : ''}`)} alt="logo" src={patientsInfo.logoB64} />
                </Link> : null }
          </div>
        </div>
      </div>
    )
  }
}
