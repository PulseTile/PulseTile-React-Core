import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';

import { unmountOnBlur } from '../../../../utils/HOCs/unmount-on-blur.utils';
import { clientUrls } from '../../../../config/client-urls.constants';

@lifecycle(unmountOnBlur)
export default class ViewPatientDropdownOptions extends PureComponent {
    static propTypes = {
      handlePatientViewClick: PropTypes.func.isRequired,
    };

    render() {
      const { handlePatientViewClick } = this.props;

      return <div className="dropdown-menu dropdown-menu-right">
        <div className="dropdown-menu-wrap-list">
          <div className="dropdown-menu-list">
            {/*TODO: it should be <button/> instead of <div/>*/}
            <div className="dropdown-menu-item" onClick={() => handlePatientViewClick(clientUrls.ORDERS)} ><span className="dropdown-menu-item-text">Orders</span></div>
            <div className="dropdown-menu-item" onClick={() => handlePatientViewClick(clientUrls.RESULTS)} ><span className="dropdown-menu-item-text">Results</span></div>
            <div className="dropdown-menu-item" onClick={() => handlePatientViewClick(clientUrls.VITALS)} ><span className="dropdown-menu-item-text">Vitals</span></div>
            <div className="dropdown-menu-item" onClick={() => handlePatientViewClick(clientUrls.DIAGNOSES)} ><span className="dropdown-menu-item-text">Diagnosis</span></div>
          </div>
        </div>
      </div>
    }
}
