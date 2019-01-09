import React, { PureComponent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash/fp';
import { get } from 'lodash';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectFormGroup from '../SelectFormGroup';
import RecordsOfTablePopover from './RecordsOfTablePopover';
import Spinner from '../../ui-elements/Spinner/Spinner';
import { valuesNames, valuesLabels, defaultTypesOptions } from './forms.config';
import { fetchPatientMedicationsRequest } from '../../pages/Medications/ducks/fetch-patient-medications.duck';
import { fetchPatientDiagnosesRequest } from '../../pages/Diagnosis/ducks/fetch-patient-diagnoses.duck';
import { patientDiagnosesSelector } from '../../pages/Diagnosis/selectors';
import { patientMedicationsSelector } from '../../pages/Medications/selectors';

import * as recordsFunctions from './functions';
import { themeActions, themeSelector, themeTypesRecords } from '../../theme/config/recordsOfTable/recordsOfTable';
import { themeFunctions } from '../../theme/config/recordsOfTable/recordsOfTableFunctions';

const PREFIX_POPOVER_ID = 'rot-popover-';

const coreActions = {
  fetchPatientDiagnosesRequest,
  fetchPatientMedicationsRequest,
};
const actionsArray = Object.assign(coreActions, themeActions);
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actionsArray, dispatch) });

const coreTypesRecords = {
  diagnosis: {
    title: 'Diagnosis',
    fetchList: 'fetchPatientDiagnosesRequest',
    stateName: 'allDiagnoses',
    setMethodName: 'setDiagnosisRecords',
    records: null,
    hasSubItems: false,
  },
  medications: {
    title: 'Medications',
    fetchList: 'fetchPatientMedicationsRequest',
    stateName: 'allMedications',
    setMethodName: 'setMedicationsRecords',
    records: null,
    hasSubItems: false,
  },
};
const typesRecords = Object.assign(coreTypesRecords, themeTypesRecords);

@connect(patientDiagnosesSelector, mapDispatchToProps)
@connect(patientMedicationsSelector)
@connect(themeSelector)

export default class RecordsOfTable extends PureComponent {

  static defaultProps = {
    typesOptions: defaultTypesOptions,
    isNotDragAndDropOfRaws: false,
    isOnlyOneRecord: false
  };

  state = {
    typeRecords: '',
    indexOfSelectedRecord: '',
    indexOfTypeEvents: '',
    waitingDataOf: '',
    isRecordsLoading: false,
    indexOfOpenedPopover: null,
    isDisplayTypeSelect: true,
    isOnlyOneTypeOfRecords: false,
    typesRecords: typesRecords,
  };

  componentWillMount() {
    const { typesOptions } = this.props;
    if (typesOptions.length === 1) {
      valuesLabels.RECORDS = typesOptions[0].title;
      this.setState({ isDisplayTypeSelect: false, isOnlyOneTypeOfRecords: true });
      this.handleGetHeadingsLists({ target: { value: typesOptions[0].value } });
    }
    window.addEventListener('resize', this.handleClosePopover);
    window.addEventListener('orientationchange', this.handleClosePopover);
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleClosePopover);
    window.removeEventListener('orientationchange', this.handleClosePopover);
    document.removeEventListener('click', this.handleDocumentClick);
  }

  componentWillReceiveProps(nextProps) {
    const { waitingDataOf } = this.state;
    if (waitingDataOf) {
      this.setState({ isRecordsLoading: false })
    }
    this.setAllRecords(nextProps);
  }

  setAllRecords = (props) => {
    const { typesRecords } = this.state;
    let isShouldUpdate = false;
    const newTypesRecords = {
      ...typesRecords,
    };
    for (const key in newTypesRecords) {
      const stateName = newTypesRecords[key].stateName;
      if (!_.isEmpty(props[stateName]) && _.isEmpty(newTypesRecords[key].records)) {
        const methodName = get(newTypesRecords, '[' + key + '].setMethodName', null);
        let functionName = (typeof(get(recordsFunctions, '[' + methodName+ ']', null)) === 'function')
            ? get(recordsFunctions, '[' + methodName+ ']', null)
            : get(themeFunctions, '[' + methodName+ ']', null);
        newTypesRecords[key].records = (functionName) ? functionName(props[stateName]) : null;
        isShouldUpdate = true;
      }
      this.selectRecordOptionForUpdate(newTypesRecords[key].records);
    }
    if (isShouldUpdate) {
      this.setState({ typesRecords: newTypesRecords });
    }
  };

  selectRecordOptionForUpdate = (typeRecords) => {
    const { isOnlyOneTypeOfRecords } = this.state;
    const { isOnlyOneRecord, input: { value } } = this.props;
    const records = value || [];

    if (isOnlyOneTypeOfRecords && isOnlyOneRecord &&
      typeRecords && typeRecords.length && records.length) {

      const sourceId = records[0].sourceId;

      for (let i = 0; i < typeRecords.length; i++) {
        if (typeRecords[i].record.sourceId === sourceId) {
          this.setState({ indexOfSelectedRecord: typeRecords[i].value});
          break;
        }
      }
    }
  };

  // Functionality of Add and Remove Records items
  handleGetHeadingsLists = (ev) => {
    const { actions, match } = this.props;
    const { typesRecords } = this.state;
    const typeRecords = ev.target.value;
    const userId = _.get('params.userId', match);
    const toSetState = { typeRecords, indexOfSelectedRecord: '', indexOfTypeEvents: '' };

    if (userId && !get(typesRecords, '[' + typeRecords + '].records', null)) {
      toSetState.waitingDataOf = get(typesRecords, '[' + typeRecords + '].stateName', null);
      toSetState.isRecordsLoading = true;
      const fetchList = get(typesRecords, '[' + typeRecords + '].fetchList', null);
      if (fetchList) {
        actions[fetchList]({ userId });
      }
    }

    this.setState(toSetState);
  };

  handleGetHeadingsItems = (ev) => {
    const { input: { onChange, value }, isOnlyOneRecord} = this.props;
    const records = value || [];
    const indexOfSelectedRecord = parseInt(ev.target.value);
    const { typeRecords, typesRecords, indexOfTypeEvents } = this.state;

    const newRecords = records.slice();
    let selectedItem;

    const recordHasSubItem = this.isRecordHasSubitems(typesRecords, typeRecords);
    if (recordHasSubItem) {
      selectedItem = typeRecords ? typesRecords[typeRecords].records[indexOfTypeEvents].events[indexOfSelectedRecord] : null;
    } else {
      selectedItem = typeRecords ? typesRecords[typeRecords].records[indexOfSelectedRecord] : null;
    }

    if (selectedItem) {
      const record = {
        name: get(selectedItem, 'record.tableName', null),
        type: typeRecords,
        typeTitle: typesRecords[typeRecords].title,
        date: get(selectedItem, 'record.date', null),
        source: get(selectedItem, 'record.source', null),
        sourceId: get(selectedItem, 'record.sourceId', null),
      };
      if (recordHasSubItem) {
        record.typeTitle = typeRecords ? typesRecords[typeRecords].records[indexOfTypeEvents].title : null;
      }

      if (isOnlyOneRecord) {
        newRecords[0] = record;
      } else {
        newRecords.push(record);
      }

      onChange(newRecords);
      this.setState({ indexOfSelectedRecord });
    }
  };

  handleGetEventType = (ev) => {
    const indexOfTypeEvents = parseInt(ev.target.value);
    this.setState({ indexOfTypeEvents, indexOfSelectedRecord: '' });
  };

  removeRecord = index => (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const { input: { onChange, value } } = this.props;
    const newRecords = value.slice();
    newRecords.splice(index, 1);

    onChange(newRecords);
    this.handleTogglePopover(null);
  };

  // Functionality of Drag and Drop
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragStart = () => {
    this.handleTogglePopover(null);
  };

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) { return }
    const { input: { onChange, value } } = this.props;
    const newRecords = this.reorder(value, result.source.index, result.destination.index);
    this.handleTogglePopover(null);
    onChange(newRecords);
  };

  getItemStyle = (isDragging, draggableStyle) => ({
    opacity: isDragging ? 0.5 : 1,
    ...draggableStyle,
  });

  // Functionality of Popover
  handleTogglePopover = (index) => {
    this.setState({ indexOfOpenedPopover: this.state.indexOfOpenedPopover !== index ? index : null })
  };

  handleClosePopover = () => {
    this.handleTogglePopover(null);
  };

  handleDocumentClick = (ev) => {
    const target = ev.target;
    const popoverWrapper = target.closest('.record-popover-wrapper');

    if (!popoverWrapper) {
      this.handleTogglePopover(null);
    }
  };

  isRecordHasSubitems = (typesRecords, typeRecords) => {
    return get(typesRecords, typeRecords + '.hasSubItems', false);
  }

  render() {
    const { typesOptions, isSubmit, input: { value }, match, isNotDragAndDropOfRaws } = this.props;
    const { typesRecords, typeRecords, indexOfSelectedRecord, isRecordsLoading, indexOfTypeEvents, indexOfOpenedPopover, isDisplayTypeSelect } = this.state;
    const records = value;
    const recordHasSubItem = this.isRecordHasSubitems(typesRecords, typeRecords);
    return (
      <div>
        {isRecordsLoading ? <Spinner /> : null }
        {isDisplayTypeSelect ?
          <SelectFormGroup
            label={valuesLabels.TYPE}
            name={valuesNames.TYPE}
            id={valuesNames.TYPE}
            options={typesOptions}
            component={SelectFormGroup}
            placeholder="-- Select type --"
            meta={{ error: false, touched: false }}
            input={{ value: typeRecords }}
            onChange={this.handleGetHeadingsLists}
          /> : null}

          {get(typesRecords, '[' + typeRecords + ']', null) ?
            recordHasSubItem ?
              <div>
                <SelectFormGroup
                  label={valuesLabels.RECORDS_TYPE_EVENTS}
                  name={valuesNames.RECORDS_TYPE_EVENTS}
                  id={valuesNames.RECORDS_TYPE_EVENTS}
                  options={get(typesRecords, '[' + typeRecords + '].records', null) || []}
                  component={SelectFormGroup}
                  placeholder={'-- Select Events Type --'}
                  meta={{ error: false, touched: false }}
                  input={{ value: indexOfTypeEvents }}
                  onChange={this.handleGetEventType}
                />
                { indexOfTypeEvents || indexOfTypeEvents === 0 ?
                  <SelectFormGroup
                    label={valuesLabels.RECORDS_EVENTS}
                    name={valuesNames.RECORDS_EVENTS}
                    id={valuesNames.RECORDS_EVENTS}
                    options={get(typesRecords, '[' + typeRecords + '].records[' + indexOfTypeEvents + '].events', null) || []}
                    component={SelectFormGroup}
                    placeholder={`-- Select ${typesRecords[typeRecords].title} --`}
                    meta={{ error: false, touched: false }}
                    input={{ value: indexOfSelectedRecord }}
                    onChange={this.handleGetHeadingsItems}
                  /> : null
                }
              </div>
              :
              <SelectFormGroup
                label={valuesLabels.RECORDS}
                name={valuesNames.RECORDS}
                id={valuesNames.RECORDS}
                options={get(typesRecords, '[' + typeRecords + '].records', null) || []}
                component={SelectFormGroup}
                placeholder={`-- Select ${typesRecords[typeRecords].title} --`}
                meta={{ error: false, touched: false }}
                input={{ value: indexOfSelectedRecord }}
                onChange={this.handleGetHeadingsItems}
              />
            : null
          }

        { records && records.length ?
          <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div
                  className="panel-body-inner-table"
                  ref={provided.innerRef}
                >
                  <div className="form-group">
                    <div className="table table-striped table-hover table-bordered rwd-table table-fixedcol table-records-editable">
                      <div className="table__head">
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
                              <div className="table__row-holder record-popover-wrapper">
                                <div
                                  className="table__row"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  style={this.getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                  onClick={ /* istanbul ignore next */ () => { this.handleTogglePopover(index) }}
                                >
                                  <div
                                    className={`table__col ${!isNotDragAndDropOfRaws ? 'dnd-handle-wrapper' : ''}`}
                                    data-th={valuesLabels.RECORDS_NAME}
                                  >
                                    { !isNotDragAndDropOfRaws ?
                                      <div className="dnd-handle" {...provided.dragHandleProps}>
                                        <i className="fa fa-bars" />
                                      </div>
                                      : null
                                    }
                                    <span>{record[valuesNames.RECORDS_NAME]}</span>
                                  </div>
                                  <div className="table__col table__col-type" data-th={valuesLabels.RECORDS_TYPE}><span>{record[valuesNames.RECORDS_TYPE]}</span></div>
                                  <div className="table__col table__col-date" data-th={valuesLabels.RECORDS_DATE}><span>{record[valuesNames.RECORDS_DATE]}</span></div>
                                  <div className="table__col table__col-source" data-th={valuesLabels.RECORDS_SOURCE}><span>{record[valuesNames.RECORDS_SOURCE]}</span></div>
                                  <div className="table__col table__col-control table-records-editable__control" data-th="">
                                    <div
                                      className="btn btn-smaller btn-danger btn-icon-normal"
                                      onClick={this.removeRecord(index)}
                                    ><i className="btn-icon fa fa-times" /></div>
                                  </div>
                                </div>
                                {provided.placeholder}
                                {index === indexOfOpenedPopover ?
                                  <RecordsOfTablePopover
                                    id={`${PREFIX_POPOVER_ID}${index}`}
                                    record={record}
                                    match={match}
                                  /> : null}
                              </div>
                            )}
                          </Draggable>)}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          : <div className={classNames('form-group', { 'has-error': isSubmit })}>
            <div className="form-control-static">{valuesLabels.RECORDS_NOT_EXIST}</div>
            {isSubmit ? <span className="help-block animate-fade">You must select at least one record.</span> : null}
          </div>
        }
      </div>)
  }
}
