import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { themeConfigs } from '../../../themes.config';

export default class MainLogo extends PureComponent {
  render() {
    const { patientsInfo, userAccount, logo } = this.props;
    return (
      <div className="wrap-logo">
        <div className="logo">
          <div className="logo-icon">
            {userAccount.role === 'IDCR'
              ? <Link to={'/'}>
                {themeConfigs.isLeedsPHRTheme ? <img className="img" alt="logo" src={logo} /> : <img className="img logo-img" alt="logo" src={patientsInfo.logoB64} />}
              </Link>
              : userAccount.role === 'PHR'
                ? <Link to={`/patients/${userAccount.nhsNumber}/patients-summary`}>
                  {themeConfigs.isLeedsPHRTheme ? <img className="img" alt="logo" src={logo} /> : <img className="img logo-img" alt="logo" src={patientsInfo.logoB64} />}
                </Link> : null }
          </div>
        </div>
      </div>
    )
  }
}
