import React, { PureComponent } from 'react';
import classNames from 'classnames';

import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import { valuesNames, valuesLabels, typesOptions } from '../forms.config';
import { connect } from "react-redux";
import { serviceTransferOfCare } from '../transfer-of-care-helpers.utills';
import Spinner from '../../../ui-elements/Spinner/Spinner';

import { bindActionCreators } from "redux";
// import PropTypes from "prop-types";
import {fetchPatientReferralsRequest} from "../../Referrals/ducks/fetch-patient-referrals.duck";
import {fetchPatientVitalsRequest} from "../../Vitals/ducks/fetch-patient-vitals.duck";
import {fetchPatientEventsRequest} from "../../Events/ducks/fetch-patient-events.duck";
import {fetchPatientMedicationsRequest} from "../../Medications/ducks/fetch-patient-medications.duck";
import {fetchPatientDiagnosesRequest} from "../../ProblemsDiagnosis/ducks/fetch-patient-diagnoses.duck";
import {patientDiagnosesSelector} from "../../ProblemsDiagnosis/selectors";
import {patientMedicationsSelector} from "../../Medications/selectors";
import {patientVitalsSelector} from "../../Vitals/selectors";
import {patientEventsSelector} from "../../Events/selectors";
import {patientReferralsSelector} from "../../Referrals/selectors";
import _ from "lodash/fp";
import {getDDMMMYYYY} from "../../../../utils/time-helpers.utils";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPatientDiagnosesRequest,
    fetchPatientMedicationsRequest,
    fetchPatientReferralsRequest,
    fetchPatientEventsRequest,
    fetchPatientVitalsRequest,
  }, dispatch) });

@connect(patientDiagnosesSelector, mapDispatchToProps)
@connect(patientMedicationsSelector)
@connect(patientReferralsSelector)
@connect(patientEventsSelector)
@connect(patientVitalsSelector)
export default class TransfersOfCareRecordsEdit extends PureComponent {
  state = {
    typesRecords: {
      diagnosis: {
        title: 'Problems / Diagnosis',
        actionsFuncAll: 'fetchPatientDiagnosesRequest',
        // actionsFuncOne: diagnosesActions.get,
        stateName: 'allDiagnoses',
        setMethodName: 'setDiagnosisRecords',
        records: null,
      },
      medications: {
        title: 'Medications',
        actionsFuncAll: 'fetchPatientMedicationsRequest',
        // actionsFuncOne: medicationsActions.get,
        stateName: 'allMedications',
        setMethodName: 'setMedicationRecords',
        records: null,
      },
      referrals: {
        title: 'Referrals',
        actionsFuncAll: 'fetchPatientReferralsRequest',
        // actionsFuncOne: referralsActions.get,
        stateName: 'allReferrals',
        setMethodName: 'setReferralsRecords',
        records: null,
      },
      events: {
        title: 'Events',
        actionsFuncAll: 'fetchPatientEventsRequest',
        // actionsFuncOne: eventsActions.get,
        stateName: 'allEvents',
        setMethodName: 'setEventsRecords',
        records: null,
      },
      vitals: {
        title: 'Vitals',
        actionsFuncAll: 'fetchPatientVitalsRequest',
        // actionsFuncOne: vitalsActions.get,
        stateName: 'allVitals',
        setMethodName: 'setVitalsRecords',
        records: null,
      },
    },

    typeRecords: '',
    waitingDataOf: '',
    isRecordsLoading: false,
  };


  // componentDidMount() {
  //   const { detail  } = this.props;
  // }

  componentWillReceiveProps(nextProps) {
    const { waitingDataOf } = this.state;
    // console.log('waitingDataOf', waitingDataOf);
    if (nextProps[waitingDataOf]) {
      this.setState({isRecordsLoading: false})
    }
  }

  componentWillUpdate() {
    // this.setAllRecords();
    // const { typesRecords, typeRecords } = this.state;
    // if (typesRecords[typeRecords] && typesRecords[typeRecords].records) {
    //   console.log('false componentWillUpdate');
    //   this.setState({ isRecordsLoading: false });
    // }
  }

  changeArraysForTable = (arr, name, date) => {
    return arr.map(el => {
      el.tableName = el[name];
      el.date = getDDMMMYYYY(el[date]);
      return {
      spacialValue: el,
      title: el[name],
    }});
  };
  setDiagnosisRecords = data => {
    return this.changeArraysForTable(data, 'problem', 'dateOfOnset');
  };
  setMedicationRecords = data => {
    return this.changeArraysForTable(data, 'name', 'dateCreated');
  };
  setReferralsRecords = data => {
    return data.map(el => {
      const date = getDDMMMYYYY(el.dateOfReferral);
      el.date = date;
      el.tableName = `${date} ${el.referralFrom} ${el.referralTo}`;
      return {
        specialValue: el,
        title: `${date} - ${el.referralFrom} -> ${el.referralTo}`
      }
    });
  };
  setEventsRecords = data => {
    // goto: Later types will come
    // arr = _.chain(arr)
    //   .filter(function (value) {
    //     return value.dateOfAppointment;
    //   })
    //   .each(function (value, index) {
    //     value.type = 'Appointment';
    //     value.date = serviceTransferOfCareFormatted.formattingDate(value.dateOfAppointment, serviceTransferOfCareFormatted.formatCollection.DDMMMYYYY);
    //     value.tableName = value.serviceTransferOfCareTeam;
    //     value.selectName = value.serviceTransferOfCareTeam;
    //     return value;
    //   })
    //   .groupBy(function(value) {
    //     return value.type;
    //   })
    //   .value();
    return data;
  };
  setVitalsRecords = data => {
    const records = [];
    records.push({
      specialValue: data[1]
    });

    records[0].specialValue.date = getDDMMMYYYY(records[0].dateCreated);
    records[0].specialValue.tableName = 'Latest Vitals Data (News Score: ' + records[0].newsScore + ')';
    records[0].title = 'Latest Vitals Data';
    return records;
  };

  setAllRecords = () => {
    const { typesRecords } = this.state;
    const newTypesRecords = {
      ...typesRecords
    };
    for (const key in newTypesRecords) {
      const stateName = newTypesRecords[key].stateName;
      // console.log('stateName', stateName);
      // console.log('newTypesRecords[key].records', newTypesRecords[key].records);
      // console.log('this.props[stateName]', this.props[stateName]);
      if (!_.isEmpty(this.props[stateName]) && _.isEmpty(newTypesRecords[key].records)) {
        // console.log('was here!');
        newTypesRecords[key].records = this[newTypesRecords[key].setMethodName](this.props[stateName]);
      }
    }

    this.setState({ typesRecords: newTypesRecords });
  };

  handleGetHeadingsLists = (ev) => {
    const { actions, match } = this.props;
    const { typesRecords } = this.state;
    const typeRecords = ev.target.value;
    const userId = _.get('params.userId', match);

    if (userId && !typesRecords[typeRecords].records) {
      this.setState({ typeRecords, waitingDataOf: typesRecords[typeRecords].stateName, isRecordsLoading: true });
      actions[typesRecords[typeRecords].actionsFuncAll]({ userId });
    } else {
      this.setState({ typeRecords });
    }
  };

  getHeadingsItem = (ev) => {
    debugger
  };

  render() {
    const { records, isSubmit } = this.props;
    const { typesRecords, typeRecords, isRecordsLoading } = this.state;

    return (
      <div>
        {isRecordsLoading ? <Spinner /> : null }
        <SelectFormGroup
          label={valuesLabels.TYPE}
          name={valuesNames.TYPE}
          id={valuesNames.TYPE}
          options={typesOptions}
          component={SelectFormGroup}
          placeholder="-- Select type --"
          props={{ isSubmit }}
          meta={{error: false, touched: false}}
          input={{value: typeRecords}}
          onChange={this.handleGetHeadingsLists}
        />

        {(typeRecords === 'diagnosis' ||
          typeRecords === 'medications' ||
          typeRecords === 'referrals' ||
          typeRecords === 'vitals') ?
          <SelectFormGroup
            label={valuesLabels.RECORDS}
            name={valuesNames.RECORDS}
            id={valuesNames.RECORDS}
            options={typesRecords[typeRecords].records || []}
            component={SelectFormGroup}
            placeholder={`-- Select ${typesRecords[typeRecords].title} --`}
            props={{ isSubmit }}
            meta={{error: false, touched: false}}
            input={{value: typeRecords}}
            onChange={this.getHeadingsItem}
          />

          : null
        }
        {/*<Field*/}
        {/*label={valuesLabels.RECORDS}*/}
        {/*name={valuesNames.RECORDS}*/}
        {/*id={valuesNames.RECORDS}*/}
        {/*options={typesRecords[typeRecords].records || []}*/}
        {/*component={SelectFormGroup}*/}
        {/*placeholder={`-- Select ${typesRecords[typeRecords].title} --`}*/}
        {/*props={{ isSubmit }}*/}
        {/*/>*/}

        {typeRecords === 'events' ?
          <div>
            <div  className="form-group">
              <label htmlFor="typeevents" className="control-label">Events Type</label>
              <div className="input-holder">
                <select className="form-control input-sm" id="typeevents" name="typeevents" ng-model="selectedTypeEvents" ng-options=" key as key for (key, item) in typeRecords.events.records">
                  <option value="">-- Select Events Type --</option>
                </select>
              </div>
            </div>

            <div  className="form-group">
              <label htmlFor="typeRecordId" className="control-label">Events</label>
              <div className="input-holder">
                <select className="form-control input-sm" id="typeRecordId" name="typeRecordId" ng-model="selectedRecord" ng-options="item as item.selectName for item in typeRecords.events.records[selectedTypeEvents]" ng-change="addToRecords(selectedRecord)">
                  <option value="">-- Select Events --</option>
                </select>
              </div>
            </div>
          </div>
          : null
        }

        {/*{!transferOfCareEdit.records.length ?*/}
        {/*<div className={classNames('form-group', { 'has-error': (formSubmitted || transferOfCareEdit.records.length)})}>*/}
        {/*<div className="form-control-static">No records added</div>*/}
        {/*{(formSubmitted || transferOfCareEdit.records.length) ?*/}
        {/*<span className="help-block animate-fade">You must select at least one record.</span>*/}
        {/*: null*/}
        {/*}*/}
        {/*</div>*/}
        {/*: null*/}
        {/*}*/}

        {/*<div ng-if="transferOfCareEdit.records.length" class="panel-body-inner-table">*/}
        {/*<div class="form-group">*/}
        {/*<div class="record-popover-wrapper">*/}
        {/*<table class="table table-striped table-hover table-bordered rwd-table table-fixedcol table-transferOfCare">*/}
        {/*<colgroup>*/}
        {/*<col>*/}
        {/*<col style="width: 22%;">*/}
        {/*<col style="width: 22%;">*/}
        {/*<col style="width: 19%;">*/}
        {/*<col style="width: 54px;">*/}
        {/*</colgroup>*/}
        {/*<thead>*/}
        {/*<tr>*/}
        {/*<th>Name</th>*/}
        {/*<th>Type</th>*/}
        {/*<th>Date</th>*/}
        {/*<th>Source</th>*/}
        {/*<th></th>*/}
        {/*</tr>*/}
        {/*</thead>*/}
        {/*<tbody dnd-list="transferOfCareEdit.records">*/}
        {/*<tr ng-repeat="(index, record) in transferOfCareEdit.records"*/}
        {/*dnd-draggable="record"*/}
        {/*dnd-moved="transferOfCareEdit.records.splice($index, 1); closePopovers();"*/}
        {/*dnd-effect-allowed="move"*/}
        {/*dnd-nodrag*/}
        {/*ng-click="togglePopover($event, record);">*/}

        {/*<td data-th="Name" class="dnd-handle-wrapper">*/}
        {/*<div dnd-handle class="dnd-handle"><i class="fa fa-bars"></i></div>*/}
        {/*<span>{{ record.name }}</span>*/}
        {/*</td>*/}
        {/*<td data-th="Type"><span>{{ record.typeTitle }}</span></td>*/}
        {/*<td data-th="Date"><span>{{ record.date }}</span></td>*/}
        {/*<td data-th="Source"><span>{{ record.source }}</span></td>*/}
        {/*<td data-th="" class="table-transferOfCare__control"><div ng-click="removeRecord(index); closePopovers();" class="btn btn-smaller btn-danger btn-icon-normal"><i class="btn-icon fa fa-times"></i></div></td>*/}
        {/*</tr>*/}
        {/*<tr class="dndPlaceholder">*/}
        {/*<td><span></span></td>*/}
        {/*<td><span></span></td>*/}
        {/*<td><span></span></td>*/}
        {/*<td><span></span></td>*/}
        {/*<td><span></span></td>*/}
        {/*</tr>*/}
        {/*</tbody>*/}
        {/*</table>*/}
        {/*<transfer-of-care-popover-component></transfer-of-care-popover-component>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
      </div>)
  }
}
