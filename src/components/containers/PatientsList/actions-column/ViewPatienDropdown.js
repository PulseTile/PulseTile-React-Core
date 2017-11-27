import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ViewPatientDropdownOptions from './ViewPatientDropdownOptions';

export default class ViewPatientDropdown extends PureComponent {
    static propTypes = {
      patient: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
      onPatientViewClick: PropTypes.func.isRequired,
      onSetOpenedDropdownID: PropTypes.func.isRequired,
    };

    handlePatientViewClick = (destination) => {
      this.props.onPatientViewClick(this.props.patient.id, destination);
    };

    render() {
      const { patient, openedDropdownID, onSetOpenedDropdownID } = this.props;
      const isOpen = patient.id === openedDropdownID;
      return (
        <div className={classNames('patient-buttons dropdown', { open: isOpen })} onClick={e => e.stopPropagation()}>
          <button className="btn btn-success btn-inverse btn-sm btn-dropdown-toggle dropdown-toggle"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => {onSetOpenedDropdownID(isOpen ? null : patient.id)}} />
          { isOpen &&
          <ViewPatientDropdownOptions
            handlePatientViewClick={this.handlePatientViewClick}
          /> }
          <div className="wrap-overflow">
            <button
              className="btn btn-success btn-inverse btn-sm btn-bold btn-view-patient"
              onClick={() => this.handlePatientViewClick()}
            >View</button>
          </div>
        </div>
      )
    }
}
