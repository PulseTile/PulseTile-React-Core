import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { clientUrls } from '../../../../config/client-urls.constants';

import ViewPatientDropdownOptions from './ViewPatientDropdownOptions';

export default class ViewPatientDropdown extends PureComponent {
    static propTypes = {
      patient: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
      onPatientViewClick: PropTypes.func.isRequired,
    };

    state = {
      isDropdownOptionsVisible: false,
    };

    togglePatientOptionsVisibility = () => this.setState(prevState => ({ isDropdownOptionsVisible: !prevState.isDropdownOptionsVisible }));

    handlePatientViewClick = (destination) => {
      this.togglePatientOptionsVisibility();
      this.props.onPatientViewClick(`${clientUrls.PATIENTS}/${this.props.patient.id}/${destination}`);
    };

    render() {
      const { isDropdownOptionsVisible } = this.state;
      return (
        <div className={classNames('patient-buttons dropdown', { open: isDropdownOptionsVisible })}>
          <button className="btn btn-success btn-inverse btn-sm btn-dropdown-toggle dropdown-toggle" aria-haspopup="true" aria-expanded={isDropdownOptionsVisible} onClick={this.togglePatientOptionsVisibility} />
          { isDropdownOptionsVisible && <ViewPatientDropdownOptions handlePatientViewClick={this.handlePatientViewClick} toggleVisibility={this.togglePatientOptionsVisibility} /> }
          <div className="wrap-overflow">
            <button className="btn btn-success btn-inverse btn-sm btn-bold btn-view-patient" onClick={() => this.handlePatientViewClick(clientUrls.PATIENTS_SUMMARY)} >View</button>
          </div>
        </div>
      )
    }
}
