import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import PatientsChart from '../../../../../../containers/PatientsChart/PatientsChart';
import { patientsDepartments } from '../../../../../../../config/patients.constants';
import patientsSelector from './selectors';
import { fetchPatientsRequest } from '../../../../../../../ducks/feth-patients.duck';
import { fetchPatientsOnMount } from '../../../../../../../utils/HOCs/fetch-patients.utils';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientsRequest }, dispatch) });

@connect(patientsSelector, mapDispatchToProps)
@lifecycle(fetchPatientsOnMount)

/**
 * This component returns content of BarChart section in Blocks
 */
export default class BarChart extends Component {

    render() {
        const { patientsByDepartment } = this.props;
        return (
            <div id="charts" className="ui-section">
                <strong className="ui-title">Charts</strong>
                <div className="ui-sub-section">
                    <strong className="ui-sub-title">Chart Bar</strong>
                    <div className="panel panel-secondary">
                        <div className="panel-heading">
                            <h3 className="panel-title"><i className="fa fa-bar-chart"></i> Patients By Setting</h3>
                        </div>
                        <div className="panel-body">
                            <div className="panel-body-inner">
                                <div className="chart-block">
                                    <PatientsChart
                                        title='Patients By Setting'
                                        subTitle='This is a brief description of patients by setting.'
                                        borderColor="rgba(36, 161, 116,1)"
                                        backgroundColor="rgba(36, 161, 116,0.3)"
                                        isChartsDataReceived
                                        labels={patientsDepartments}
                                        patients={patientsByDepartment}
                                        onBarClick={function () {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
