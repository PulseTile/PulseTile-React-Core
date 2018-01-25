import React, { PureComponent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

    typeRecords: '',
    indexOfSelectedRecord: '',
    indexOfTypeEvents: '',
    waitingDataOf: '',
    isRecordsLoading: false,
  };

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

  // Functionality of Set different data to types of Records
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
    const events = _.flow(
      _.filter(item => item.dateCreated && item.type),
      _.filter(item => item.dateCreated),
      _.map(item => {
        item.date = getDDMMMYYYY(item.dateCreated);
        item.tableName = item.name;
        return item;
      }),
      _.groupBy(item => item.type.capitalize()),
    )(data);

    const arr = [];
    let index = 0;
    for (let key in events) {
      events[key] = events[key].map((el, index) => ({
        record: el,
        title: el.name,
        value: index
      }));
      arr.push({
        events: events[key],
        title: key,
        value: index++
      });
    };

    return arr;
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

  // Functionality of Add and Remove Records items
  handleGetHeadingsLists = (ev) => {
    const { actions, match } = this.props;
    const { typesRecords } = this.state;
    const typeRecords = ev.target.value;
    const userId = _.get('params.userId', match);
    const toSetState = { typeRecords, indexOfSelectedRecord: '', indexOfTypeEvents: '' };

    if (userId && !typesRecords[typeRecords].records) {
      toSetState['waitingDataOf'] = typesRecords[typeRecords].stateName;
      toSetState['isRecordsLoading'] = true;
      actions[typesRecords[typeRecords].actionsFuncAll]({ userId });
    }

    this.setState(toSetState);
  };
  handleGetHeadingsItems = (ev) => {
    const { input: { onChange, value } } = this.props;
    const records = value;
    const indexOfSelectedRecord = parseInt(ev.target.value);
    const { typeRecords, typesRecords, indexOfTypeEvents } = this.state;

    const newRecords = records.slice();
    let selectedItem;

    if (typeRecords === 'events') {
      selectedItem = typesRecords[typeRecords].records[indexOfTypeEvents].events[indexOfSelectedRecord];
    } else {
      selectedItem = typesRecords[typeRecords].records[indexOfSelectedRecord];
    }

    if (selectedItem) {
      const record = {
        name: selectedItem.record.tableName,
        type: typeRecords,
        typeTitle: typesRecords[typeRecords].title,
        date: selectedItem.record.date,
        source: selectedItem.record.source,
        sourceId: selectedItem.record.sourceId,
      };
      // if (typeRecords === 'events') {
      //   record.typeTitle = typesRecords[typeRecords].records[indexOfTypeEvents].title;
      // }
      newRecords.push(record);

      onChange(newRecords);
      this.setState({ indexOfSelectedRecord });
    }
  };
  handleGetEventType = ev => {
    const indexOfTypeEvents = parseInt(ev.target.value);
    this.setState({ indexOfTypeEvents, indexOfSelectedRecord: '' });
  };
  removeRecord = index => {
    const { input: { onChange, value } } = this.props;
    const newRecords = value.slice();
    newRecords.splice(index, 1);

    onChange(newRecords);
  };

  // Functionality of Drag and Drop
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = result => {
    // dropped outside the list
    if(!result.destination) { return }
    const { input: { onChange, value } } = this.props;
    const newRecords = this.reorder(value, result.source.index, result.destination.index);
    onChange(newRecords);
  };

  getItemStyle = (isDragging, draggableStyle) => ({
    opacity: isDragging ? 0.5 : 1,
    ...draggableStyle
  });

  render() {
    const { isSubmit, input: { value } } = this.props;
    const records = value;
    const { typesRecords, typeRecords, indexOfSelectedRecord, isRecordsLoading,
      indexOfTypeEvents } = this.state;
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
              input={{value: indexOfTypeEvents}}
              onChange={this.handleGetEventType}
            />
            { indexOfTypeEvents || indexOfTypeEvents === 0 ?
              <SelectFormGroup
                label={valuesLabels.RECORDS_EVENTS}
                name={valuesNames.RECORDS_EVENTS}
                id={valuesNames.RECORDS_EVENTS}
                options={typesRecords[typeRecords].records[indexOfTypeEvents].events || []}
                component={SelectFormGroup}
                placeholder={`-- Select ${typesRecords[typeRecords].title} --`}
                meta={{error: false, touched: false}}
                input={{value: indexOfSelectedRecord}}
                onChange={this.handleGetHeadingsItems}
              /> : null
            }
          </div>
          : null
        }

        { records && records.length ?
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div className="panel-body-inner-table"
                     ref={provided.innerRef} >
                  <div className="form-group">
                    <div className="record-popover-wrapper">
                      <div className="table table-striped table-hover table-bordered rwd-table table-fixedcol table-no-cursor table-transferOfCare">
                        <div className='table__head'>
                          <div className="table__row">
                            <div className="table__col">{valuesLabels.RECORDS_NAME}</div>
                            <div className="table__col table__col-type">{valuesLabels.RECORDS_TYPE}</div>
                            <div className="table__col table__col-date">{valuesLabels.RECORDS_DATE}</div>
                            <div className="table__col table__col-source">{valuesLabels.RECORDS_SOURCE}</div>
                            <div className="table__col table__col-control" />
                          </div>
                        </div>
                        <div className="table__body">
                          { records.map((record, index) =>
                            <Draggable
                              key={`record-${index}`}
                              draggableId={`record-${index}`}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div className="table__row-holder">
                                  <div className="table__row"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={this.getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <div className="table__col dnd-handle-wrapper"
                                         data-th={valuesLabels.RECORDS_NAME}>
                                      <div className="dnd-handle" {...provided.dragHandleProps}>
                                        <i className="fa fa-bars" />
                                      </div>
                                      <span>{record[valuesNames.RECORDS_NAME]}</span>
                                    </div>
                                    <div className="table__col table__col-type" data-th={valuesLabels.RECORDS_TYPE}><span>{record[valuesNames.RECORDS_TYPE]}</span></div>
                                    <div className="table__col table__col-date" data-th={valuesLabels.RECORDS_DATE}><span>{record[valuesNames.RECORDS_DATE]}</span></div>
                                    <div className="table__col table__col-source" data-th={valuesLabels.RECORDS_SOURCE}><span>{record[valuesNames.RECORDS_SOURCE]}</span></div>
                                    <div className="table__col table__col-control table-transferOfCare__control" data-th="">
                                      <div
                                        className="btn btn-smaller btn-danger btn-icon-normal"
                                        onClick={() => {this.removeRecord(index);}}
                                      ><i className="btn-icon fa fa-times" /></div>
                                    </div>
                                  </div>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Draggable>)}
                          {provided.placeholder}
                        </div>
                      </div>
                      {/*<transfer-of-care-popover-component></transfer-of-care-popover-component>*/}
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          : <div className={classNames('form-group', { 'has-error': isSubmit})}>
              <div className="form-control-static">{valuesLabels.RECORDS_NOT_EXIST}</div>
              {isSubmit ? <span className="help-block animate-fade">You must select at least one record.</span> : null}
            </div>
        }
      </div>)
  }
}
