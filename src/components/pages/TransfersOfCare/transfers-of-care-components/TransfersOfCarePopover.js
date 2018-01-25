import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import { valuesNames, valuesLabels, typesOptions } from '../forms.config';
import { connect } from "react-redux";
import Spinner from '../../../ui-elements/Spinner/Spinner';

import { bindActionCreators } from "redux";
import {fetchPatientReferralsRequest} from "../../Referrals/ducks/fetch-patient-referrals.duck";

import {patientDiagnosesSelector} from "../../ProblemsDiagnosis/selectors";

import _ from "lodash/fp";
import {getDDMMMYYYY} from "../../../../utils/time-helpers.utils";

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({
//     fetchPatientReferralsRequest,
//   }, dispatch) });
//
// @connect(patientDiagnosesSelector, mapDispatchToProps)
export default class TransfersOfCarePopover extends PureComponent {
  static propTypes = {
    record: PropTypes.object,
  };

  state = {};

  componentWillReceiveProps(nextProps) {

  }

  render() {
    // const { isSubmit, input: { value } } = this.props;
    // const {  } = this.state;
    // console.log(typesRecords);
    // console.log('records', records);
    const title = 'It\'s me - Popover!';

    return (
      <div className="record-popover" style={{display: 'block'}}>
        <div className="record-popover-header">
          <div className="record-popover-title">{title}</div>
        </div>

        <div className="record-popover-body">
          <div className="record-popover-content">
          </div>
        </div>
      </div>
    )
  }
}
