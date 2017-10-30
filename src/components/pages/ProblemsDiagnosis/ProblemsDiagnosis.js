import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import moment from 'moment';

import PluginListHeader from '../../plugin-page-component/PluginListHeader';
import SortableTable from '../../containers/SortableTable/SortableTable';
import { diagnosesColumnsConfig, defaultColumnsSelected } from './diagnoses-table-columns.config'
import { fetchPatientDiagnosesRequest } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesDetailRequest } from './ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientDiagnosesDetailEditRequest } from './ducks/fetch-patient-diagnoses-detail-edit.duck';
import { fetchPatientDiagnosesCreateRequest } from './ducks/fetch-patient-diagnoses-create.duck';
import { fetchPatientDiagnosesOnMount, fetchPatientDiagnosesDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientDiagnosesSelector, patientDiagnosesDetailSelector, diagnosisPanelFormSelector, diagnosesCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import PaginationBlock from '../../presentational/PaginationBlock/PaginationBlock';
import PTButton from '../../ui-elements/PTButton/PTButton';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import ProblemsDiagnosisDetail from './ProblemsDiagnosisDetail/ProblemsDiagnosisDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import { valuesNames } from './ProblemsDiagnosisCreate/ProblemsDiagnosisCreateForm/values-names.config';
import ProblemsDiagnosisCreateForm from './ProblemsDiagnosisCreate/ProblemsDiagnosisCreateForm/ProblemsDiagnosisCreateForm'

const DIAGNOSES_MAIN = 'diagnosesMain';
const DIAGNOSES_DETAIL = 'diagnosesDetail';
const DIAGNOSES_CREATE = 'diagnosesCreate';
const DIAGNOSES_PANEL = 'diagnosesPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientDiagnosesRequest, fetchPatientDiagnosesDetailRequest, fetchPatientDiagnosesDetailEditRequest, fetchPatientDiagnosesCreateRequest }, dispatch) });

@connect(patientDiagnosesSelector, mapDispatchToProps)
@connect(patientDiagnosesDetailSelector, mapDispatchToProps)
@connect(diagnosisPanelFormSelector)
@connect(diagnosesCreateFormStateSelector)
@compose(lifecycle(fetchPatientDiagnosesOnMount), lifecycle(fetchPatientDiagnosesDetailOnMount))
export default class ProblemsDiagnosis extends PureComponent {
  static propTypes = {
    allDiagnoses: PropTypes.arrayOf(PropTypes.object),
    diagnosesPerPageAmount: PropTypes.number,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  static defaultProps = {
    diagnosesPerPageAmount: 10,
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: DIAGNOSES_PANEL,
    columnNameSortBy: 'problem',
    sortingOrder: 'asc',
    expandedPanel: 'all',
    isBtnCreateVisible: true,
    isBtnExpandVisible: false,
    isAllPanelsVisible: false,
    isDetailPanelVisible: false,
    isSecondPanel: false,
    isCreatePanelVisible: false,
    editedPanel: {},
    offset: 0,
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
  }

  getDiagnosesOnFirstPage = (diagnoses) => {
    const { offset } = this.state;
    const { diagnosesPerPageAmount } = this.props;

    return (_.size(diagnoses) > diagnosesPerPageAmount
      ? _.slice(offset, offset + diagnosesPerPageAmount)(diagnoses)
      : diagnoses)
  };

  handleExpand = (name, currentPanel) => {
    if (currentPanel === DIAGNOSES_MAIN) {
      if (this.state.expandedPanel === 'all') {
        this.setState({ expandedPanel: name });
      } else {
        this.setState({ expandedPanel: 'all' });
      }
    } else if (this.state.expandedPanel === 'all') {
      this.setState({ expandedPanel: name, openedPanel: name });
    } else {
      this.setState({ expandedPanel: 'all' });
    }
  };

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailDiagnosesClick = (id, name, sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIAGNOSES_PANEL, editedPanel: {}, expandedPanel: 'all' });
    actions.fetchPatientDiagnosesDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}/${sourceId}`);
  };

  filterAndSortDiagnoses = (diagnoses) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;
    const filterByProblemPredicate = _.flow(_.get('problem'), _.toLower, _.includes(nameShouldInclude));
    const filterByDatePredicate = _.flow(_.get('dateOfOnset'), _.toLower, _.includes(nameShouldInclude));
    const filterBySourcePredicate = _.flow(_.get('source'), _.toLower, _.includes(nameShouldInclude));
    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    if (diagnoses !== undefined) {
      diagnoses.map((item) => {
        item.dateOfOnset = getDDMMMYYYY(item.dateOfOnset);
      });
    }

    const filterByDiagnoses = _.flow(_.filter(filterByProblemPredicate), _.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder)(diagnoses);
    const filterByDate = _.flow(_.filter(filterByDatePredicate), _.sortBy([columnNameSortBy]), reverseIfDescOrder)(diagnoses);
    const filterBySource = _.flow(_.filter(filterBySourcePredicate), _.sortBy([columnNameSortBy]), reverseIfDescOrder)(diagnoses);

    const filteredAndSortedDiagnoses = [filterByDiagnoses, filterByDate, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    return _.head(filteredAndSortedDiagnoses)
  };

  shouldHavePagination = diagnoses => _.size(diagnoses) > this.props.diagnosesPerPageAmount;

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = (name) => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: name, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all' });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}/create`);
  };

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
    }))
  };

  handleDiagnosisDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
    }))
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions } = this.props;
    actions.fetchPatientDiagnosesDetailEditRequest(this.formValuesToDetailEditString(formValues));
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
    }))
  };

  formValuesToDetailEditString = (formValues) => {
    const { userId } = this.props;
    const isProblemValid = _.isEmpty((formValues[valuesNames.PROBLEM]));
    const problem = _.get(valuesNames.PROBLEM)(formValues);
    const dateOfOnset = _.get(valuesNames.DATE_OF_ONSET)(formValues);
    const description = _.get(valuesNames.DESCRIPTION)(formValues);
    const terminology = _.get(valuesNames.TERMINOLOGY)(formValues);
    const code = _.get(valuesNames.CODE)(formValues);
    const author = _.get(valuesNames.AUTHOR)(formValues);
    const isImport = _.get(valuesNames.ISIMPORT)(formValues);
    const sourceId = _.get(valuesNames.SOURCEID)(formValues);
    const date = _.get(valuesNames.DATE)(formValues);
    const source = 'ethercis';

    if (!isProblemValid) return ({ problem, dateOfOnset, description, terminology, code, sourceId, source, isImport, userId });
    return ({ problem, dateOfOnset, description, terminology, code, author, isImport, sourceId, date });
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIAGNOSES_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all' });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId } = this.props;
    formValues.dateOfOnset = moment(formValues.dateOfOnset).format('YYYY-MM-DD');
    actions.fetchPatientDiagnosesCreateRequest(this.formValuesToCreateString(formValues));
    setTimeout(() => actions.fetchPatientDiagnosesRequest({ userId }), 1000);
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}`);
    this.hideCreateForm();
  };

  formValuesToCreateString = (formValues) => {
    const { userId } = this.props;
    const isProblemValid = _.isEmpty((formValues[valuesNames.PROBLEM]));
    const problem = _.get(valuesNames.PROBLEM)(formValues);
    const dateOfOnset = _.get(valuesNames.DATE_OF_ONSET)(formValues);
    const description = _.get(valuesNames.DESCRIPTION)(formValues);
    const terminology = _.get(valuesNames.TERMINOLOGY)(formValues);
    const code = _.get(valuesNames.CODE)(formValues);
    const author = _.get(valuesNames.AUTHOR)(formValues);
    const isImport = _.get(valuesNames.ISIMPORT)(formValues);
    const sourceId = _.get(valuesNames.SOURCEID)(formValues);
    const date = _.get(valuesNames.DATE)(formValues);

    if (!isProblemValid) return ({ problem, dateOfOnset, description, terminology, code, sourceId, isImport, userId });
    return ({ problem, dateOfOnset, description, terminology, code, author, isImport, sourceId, date, userId });
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIAGNOSES_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset } = this.state;
    const { allDiagnoses, diagnosesPerPageAmount, diagnosisDetail, diagnosisPanelFormState, diagnosisCreateFormState } = this.props;

    const isPanelDetails = (expandedPanel === DIAGNOSES_DETAIL || expandedPanel === DIAGNOSES_PANEL);
    const isPanelMain = (expandedPanel === DIAGNOSES_MAIN);
    const isPanelCreate = (expandedPanel === DIAGNOSES_CREATE);

    const columnsToShowConfig = diagnosesColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredDiagnoses = this.filterAndSortDiagnoses(allDiagnoses);
    const diagnosesOnFirstPage = _.flow(this.getDiagnosesOnFirstPage)(filteredDiagnoses);

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Problems / Diagnoses"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={DIAGNOSES_MAIN}
                onExpand={this.handleExpand}
                currentPanel={DIAGNOSES_MAIN}
              />
              <div className="panel-body">
                <SortableTable
                  headers={columnsToShowConfig}
                  data={diagnosesOnFirstPage}
                  resourceData={allDiagnoses}
                  emptyDataMessage="No diagnoses"
                  onHeaderCellClick={this.handleHeaderCellClick}
                  onCellClick={this.handleDetailDiagnosesClick}
                  columnNameSortBy={columnNameSortBy}
                  sortingOrder={sortingOrder}
                  table="diagnoses"
                />
                <div className="panel-control">
                  <div className="wrap-control-group">
                    {this.shouldHavePagination(filteredDiagnoses) &&
                    <div className="control-group with-indent left">
                      <PaginationBlock
                        entriesPerPage={diagnosesPerPageAmount}
                        totalEntriesAmount={_.size(allDiagnoses)}
                        offset={offset}
                        setOffset={this.handleSetOffset}
                      />
                    </div>
                    }
                    <div className="control-group with-indent right">
                      {isBtnCreateVisible ? <PTButton className="btn btn-success btn-inverse btn-create" onClick={() => this.handleCreate(DIAGNOSES_CREATE)}>
                        <i className="btn-icon fa fa-plus" />
                        <span className="btn-text"> Create</span>
                      </PTButton> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col> : null }
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <ProblemsDiagnosisDetail
              onExpand={this.handleExpand}
              name={DIAGNOSES_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={DIAGNOSES_DETAIL}
              detail={diagnosisDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleDiagnosisDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              diagnosisPanelFormValues={diagnosisPanelFormState.values}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={DIAGNOSES_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={DIAGNOSES_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={diagnosisCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <ProblemsDiagnosisCreateForm />
              }
              title="Create Problem and Diagnosis"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
