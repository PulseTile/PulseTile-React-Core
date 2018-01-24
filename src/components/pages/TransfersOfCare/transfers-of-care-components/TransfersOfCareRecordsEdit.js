import React, { PureComponent } from 'react';
import classNames from 'classnames';

import SelectFormGroup from '../../../form-fields/SelectFormGroup';
import { valuesNames, valuesLabels, typesOptions } from '../forms.config';
import { connect } from "react-redux";
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

    records: [],

    typeRecords: '',
    indexOfSelectedRecord: '',
    typeOfEvent: '',
    indexOfSelectedEventType: '',
    waitingDataOf: '',
    isRecordsLoading: false,
  };

  componentWillMount() {
    this.setState({records: this.props.records});
  }

  componentWillReceiveProps(nextProps) {
    const { waitingDataOf } = this.state;
    if (nextProps[waitingDataOf]) {
      this.setState({isRecordsLoading: false})
    }
    if (nextProps.records !== this.props.records) {
      this.setState({records: nextProps.records});
    }
    this.setAllRecords(nextProps);
  }

  changeArraysForTable = (arr, name, date) => {
    return arr.map((el, index) => {
      el.tableName = el[name];
      el.date = getDDMMMYYYY(el[date]);
      return {
        record: el,
        title: el[name],
        value: index
      }
    });
  };
  setDiagnosisRecords = data => {
    return this.changeArraysForTable(data, 'problem', 'dateOfOnset');
  };
  setMedicationRecords = data => {
    return this.changeArraysForTable(data, 'name', 'dateCreated');
  };
  setReferralsRecords = data => {
    return data.map((el, index) => {
      const date = getDDMMMYYYY(el.dateOfReferral);
      el.date = date;
      el.tableName = `${date} ${el.referralFrom} ${el.referralTo}`;
      return {
        record: el,
        title: `${date} - ${el.referralFrom} -> ${el.referralTo}`,
        value: index
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
    //     value.date = getDDMMMYYYY(value.dateOfAppointment);
    //     value.tableName = value.serviceTeam;
    //     value.selectName = value.serviceTeam;
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
      record: data[1]
    });

    records[0].record.date = getDDMMMYYYY(records[0].dateCreated);
    records[0].record.tableName = 'Latest Vitals Data (News Score: ' + records[0].newsScore + ')';
    records[0].title = 'Latest Vitals Data';
    records[0].value = 0;
    return records;
  };

  setAllRecords = (props) => {
    const { typesRecords } = this.state;
    let isShouldUpdate = false;
    const newTypesRecords = {
      ...typesRecords
    };
    for (const key in newTypesRecords) {
      const stateName = newTypesRecords[key].stateName;

      if (!_.isEmpty(props[stateName]) && _.isEmpty(newTypesRecords[key].records)) {
        newTypesRecords[key].records = this[newTypesRecords[key].setMethodName](props[stateName]);
        isShouldUpdate = true;
      }
    }

    if (isShouldUpdate) {
      this.setState({ typesRecords: newTypesRecords });
    }
  };

  handleGetHeadingsLists = (ev) => {
    const { actions, match } = this.props;
    const { typesRecords } = this.state;
    const typeRecords = ev.target.value;
    const userId = _.get('params.userId', match);

    if (userId && !typesRecords[typeRecords].records) {
      this.setState({ typeRecords, indexOfSelectedRecord: '', waitingDataOf: typesRecords[typeRecords].stateName, isRecordsLoading: true });
      actions[typesRecords[typeRecords].actionsFuncAll]({ userId });
    } else {
      this.setState({ typeRecords, indexOfSelectedRecord: '' });
    }
  };

  handleGetHeadingsItems = (ev) => {
    const indexOfSelectedRecord = parseInt(ev.target.value);
    const { records, typeRecords, typesRecords } = this.state;

    const newRecords = records.slice();
    const selectedItem = typesRecords[typeRecords].records[indexOfSelectedRecord]

    if (selectedItem) {
      const record = {
        name: selectedItem.record.tableName,
        type: typeRecords,
        typeTitle: typesRecords[typeRecords].title,
        date: selectedItem.record.date,
        source: selectedItem.record.source,
        sourceId: selectedItem.record.sourceId,
      };

      newRecords.push(record);

      this.setState({ indexOfSelectedRecord, records: newRecords });
    }
  };

  removeRecord = index => {
    const newRecords = this.state.records.slice();
    newRecords.splice(index, 1);
    this.setState({records: newRecords});
  };

  render() {
    const { isSubmit } = this.props;
    const { typesRecords, typeRecords, indexOfSelectedRecord, isRecordsLoading, records } = this.state;
    // console.log(typesRecords);
    // console.log('records', records);

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
            meta={{error: false, touched: false}}
            input={{value: indexOfSelectedRecord}}
            onChange={this.handleGetHeadingsItems}
          />
          : null
        }

        {typeRecords === 'events' ?
          <div>
            <SelectFormGroup
              label={valuesLabels.RECORDS_TYPE_EVENTS}
              name={valuesNames.RECORDS_TYPE_EVENTS}
              id={valuesNames.RECORDS_TYPE_EVENTS}
              options={typesRecords[typeRecords].records || []}
              component={SelectFormGroup}
              placeholder={'-- Select Events Type --'}
              meta={{error: false, touched: false}}
              input={{value: indexOfSelectedEventType}}
              onChange={this.handleGetHeadingsItems}
            />
            {/*<div  className="form-group">*/}
              {/*<label htmlFor="typeevents" className="control-label">Events Type</label>*/}
              {/*<div className="input-holder">*/}
                {/*<select className="form-control input-sm" id="typeevents" name="typeevents" ng-model="selectedTypeEvents" ng-options=" key as key for (key, item) in typeRecords.events.records">*/}
                  {/*<option value="">-- Select Events Type --</option>*/}
                {/*</select>*/}
              {/*</div>*/}
            {/*</div>*/}

            <SelectFormGroup
              label={valuesLabels.RECORDS_EVENTS}
              name={valuesNames.RECORDS_EVENTS}
              id={valuesNames.RECORDS_EVENTS}
              options={typesRecords[typeRecords].records || []}
              component={SelectFormGroup}
              placeholder={`-- Select ${typesRecords[typeRecords].title} --`}
              meta={{error: false, touched: false}}
              input={{value: indexOfSelectedRecord}}
              onChange={this.handleGetHeadingsItems}
            />

            {/*<div  className="form-group">*/}
              {/*<label htmlFor="typeRecordId" className="control-label">Events</label>*/}
              {/*<div className="input-holder">*/}
                {/*<select className="form-control input-sm" id="typeRecordId" name="typeRecordId" ng-model="selectedRecord" ng-options="item as item.selectName for item in typeRecords.events.records[selectedTypeEvents]" ng-change="addToRecords(selectedRecord)">*/}
                  {/*<option value="">-- Select Events --</option>*/}
                {/*</select>*/}
              {/*</div>*/}
            {/*</div>*/}
          </div>
          : null
        }

        { records.length
          ? <div className="panel-body-inner-table">
              <div className="form-group">
                <div className="record-popover-wrapper">
                <table className="table table-striped table-hover table-bordered rwd-table table-fixedcol table-transferOfCare">
                  <colgroup>
                    <col />
                    <col style={{width: '22%'}}/>
                    <col style={{width: '22%'}}/>
                    <col style={{width: '19%'}}/>
                    <col style={{width: '54px'}}/>
                  </colgroup>
                  <thead><tr>
                    <th>{valuesLabels.RECORDS_NAME}</th>
                    <th>{valuesLabels.RECORDS_TYPE}</th>
                    <th>{valuesLabels.RECORDS_DATE}</th>
                    <th>{valuesLabels.RECORDS_SOURCE}</th>
                    <th />
                  </tr></thead>
                  {/*<tbody dnd-list="transferOfCareEdit.records">*/}
                  <tbody>
                    { records.map((record, index) => <tr key={index}>
                      {/*dnd-draggable="record"*/}
                      {/*dnd-moved="transferOfCareEdit.records.splice($index, 1); closePopovers();"*/}
                      {/*dnd-effect-allowed="move"*/}
                      {/*dnd-nodrag*/}
                      {/*ng-click="togglePopover($event, record);">*/}

                      <td data-th={valuesLabels.RECORDS_NAME} className="dnd-handle-wrapper">
                        {/*dnd-handle*/}
                        <div  className="dnd-handle"><i className="fa fa-bars" /></div>
                        <span>{record[valuesNames.RECORDS_NAME]}</span>
                      </td>
                      <td data-th={valuesLabels.RECORDS_TYPE}><span>{record[valuesNames.RECORDS_TYPE]}</span></td>
                      <td data-th={valuesLabels.RECORDS_DATE}><span>{record[valuesNames.RECORDS_DATE]}</span></td>
                      <td data-th={valuesLabels.RECORDS_SOURCE}><span>{record[valuesNames.RECORDS_SOURCE]}</span></td>
                      <td data-th="" className="table-transferOfCare__control">
                        <div
                          className="btn btn-smaller btn-danger btn-icon-normal"
                          onClick={() => {this.removeRecord(index);}}
                        ><i className="btn-icon fa fa-times" /></div>
                        {/*ng-click="removeRecord(index); closePopovers();"*/}
                      </td>
                    </tr>)}
                    {/*<tr className="dndPlaceholder">*/}
                      {/*<td><span></span></td>*/}
                      {/*<td><span></span></td>*/}
                      {/*<td><span></span></td>*/}
                      {/*<td><span></span></td>*/}
                      {/*<td><span></span></td>*/}
                    {/*</tr>*/}
                  </tbody>
                </table>
                {/*<transfer-of-care-popover-component></transfer-of-care-popover-component>*/}
                </div>
              </div>
            </div>
          : <div className={classNames('form-group', { 'has-error': isSubmit})}>
              <div className="form-control-static">{valuesLabels.RECORDS_NOT_EXIST}</div>
              {isSubmit ? <span className="help-block animate-fade">You must select at least one record.</span> : null}
            </div>
        }
      </div>)
  }
}
