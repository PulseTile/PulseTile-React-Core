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
import PluginMainPanel from '../../plugin-page-component/PluginMainPanel';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientDiagnosesRequest } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesDetailRequest } from './ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientDiagnosesDetailEditRequest } from './ducks/fetch-patient-diagnoses-detail-edit.duck';
import { fetchPatientDiagnosesCreateRequest } from './ducks/fetch-patient-diagnoses-create.duck';
import { fetchPatientDiagnosesOnMount, fetchPatientDiagnosesDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientDiagnosesSelector, patientDiagnosesDetailSelector, diagnosisPanelFormSelector, diagnosesCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm } from '../../../utils/plugin-helpers.utils';
import ProblemsDiagnosisDetail from './ProblemsDiagnosisDetail/ProblemsDiagnosisDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import ProblemsDiagnosisCreateForm from './ProblemsDiagnosisCreate/ProblemsDiagnosisCreateForm'

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
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
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
    isSubmit: false,
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
  }

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
    const filterByDate = _.flow(_.filter(filterByDatePredicate), _.sortBy([item => new Date(item[columnNameSortBy]).getTime()]), reverseIfDescOrder)(diagnoses);
    const filterBySource = _.flow(_.filter(filterBySourcePredicate), _.sortBy([columnNameSortBy]), reverseIfDescOrder)(diagnoses);

    const filteredAndSortedDiagnoses = [filterByDiagnoses, filterByDate, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    if (columnNameSortBy === 'dateOfOnset') {
      return filterByDate
    }
    return _.head(filteredAndSortedDiagnoses)
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: DIAGNOSES_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}/create`);
  };

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
      isSubmit: false,
    }))
  };

  handleDiagnosisDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
    }))
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions, diagnosisPanelFormState, userId, diagnosisDetail } = this.props;
    const sourceId = diagnosisDetail.sourceId;
    if (checkIsValidateForm(diagnosisPanelFormState)) {
      actions.fetchPatientDiagnosesDetailEditRequest(this.formValuesToString(formValues, 'edit'));
      setTimeout(() => {
        actions.fetchPatientDiagnosesRequest({ userId });
        actions.fetchPatientDiagnosesDetailRequest({ userId, sourceId });
      }, 1000);
      this.setState(prevState => ({
        editedPanel: {
          ...prevState.editedPanel,
          [name]: false,
        },
        isSubmit: false,
      }))
    } else {
      this.setState({ isSubmit: true });
    }
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIAGNOSES_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, diagnosisCreateFormState } = this.props;

    if (checkIsValidateForm(diagnosisCreateFormState)) {
      actions.fetchPatientDiagnosesCreateRequest(this.formValuesToString(formValues, 'create'));
      setTimeout(() => actions.fetchPatientDiagnosesRequest({ userId }), 1000);
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}`);
      this.setState({ isSubmit: false });
      this.hideCreateForm();
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, diagnosisDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;
    sendData[valuesNames.PROBLEM] = formValues[valuesNames.PROBLEM];
    sendData[valuesNames.DESCRIPTION] = formValues[valuesNames.DESCRIPTION];
    sendData[valuesNames.TERMINOLOGY] = formValues[valuesNames.TERMINOLOGY];
    sendData[valuesNames.CODE] = formValues[valuesNames.CODE];
    sendData[valuesNames.DATE_OF_ONSET] = moment(formValues[valuesNames.DATE_OF_ONSET]).format('YYYY-MM-DD');

    if (formName === 'edit') {
      sendData[valuesNames.ISIMPORT] = formValues[valuesNames.ISIMPORT];
      sendData[valuesNames.SOURCEID] = formValues[valuesNames.SOURCEID];
    }

    if (formName === 'edit') {
      sendData.source = 'ethercis';
      sendData.sourceId = diagnosisDetail.sourceId;
    }

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIAGNOSES_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit } = this.state;
    const { allDiagnoses, diagnosisDetail, diagnosisPanelFormState, diagnosisCreateFormState } = this.props;

    const isPanelDetails = (expandedPanel === DIAGNOSES_DETAIL || expandedPanel === DIAGNOSES_PANEL);
    const isPanelMain = (expandedPanel === DIAGNOSES_MAIN);
    const isPanelCreate = (expandedPanel === DIAGNOSES_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredDiagnoses = this.filterAndSortDiagnoses(allDiagnoses);

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
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allDiagnoses}
                emptyDataMessage="No diagnoses"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailDiagnosesClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="diagnoses"
                filteredData={filteredDiagnoses}
                totalEntriesAmount={_.size(allDiagnoses)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
              />
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
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create Problem and Diagnosis"
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
                <ProblemsDiagnosisCreateForm isSubmit={isSubmit} />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
