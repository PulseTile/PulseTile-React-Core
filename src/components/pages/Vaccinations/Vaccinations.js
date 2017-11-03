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
import { fetchPatientVaccinationsRequest } from './ducks/fetch-patient-vaccinations.duck';
import { fetchPatientVaccinationsDetailRequest } from './ducks/fetch-patient-vaccinations-detail.duck';
import { fetchPatientVaccinationsDetailEditRequest } from './ducks/fetch-patient-vaccinations-detail-edit.duck';
import { fetchPatientVaccinationsCreateRequest } from './ducks/fetch-patient-vaccinations-create.duck';
import { fetchPatientVaccinationsOnMount, fetchPatientVaccinationsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientVaccinationsSelector, patientVaccinationsDetailSelector, vaccinationPanelFormSelector, vaccinationsCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm } from '../../../utils/plugin-helpers.utils';
import VaccinationDetail from './VaccinationDetail/VaccinationDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import VaccinationCreateForm from './VaccinationCreate/VaccinationCreateForm'

const VACCINATIONS_MAIN = 'vaccinationsMain';
const VACCINATIONS_DETAIL = 'vaccinationsDetail';
const VACCINATIONS_CREATE = 'vaccinationsCreate';
const VACCINATIONS_PANEL = 'vaccinationsPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientVaccinationsRequest, fetchPatientVaccinationsDetailRequest, fetchPatientVaccinationsDetailEditRequest, fetchPatientVaccinationsCreateRequest }, dispatch) });

@connect(patientVaccinationsSelector, mapDispatchToProps)
@connect(patientVaccinationsDetailSelector, mapDispatchToProps)
@connect(vaccinationPanelFormSelector)
@connect(vaccinationsCreateFormStateSelector)
@compose(lifecycle(fetchPatientVaccinationsOnMount), lifecycle(fetchPatientVaccinationsDetailOnMount))
export default class Vaccination extends PureComponent {
  static propTypes = {
    allVaccinations: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: VACCINATIONS_PANEL,
    columnNameSortBy: 'vaccinationName',
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.VACCINATIONS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === VACCINATIONS_MAIN) {
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

  handleDetailVaccinationsClick = (id, name, sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: VACCINATIONS_PANEL, editedPanel: {}, expandedPanel: 'all' });
    actions.fetchPatientVaccinationsDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.VACCINATIONS}/${sourceId}`);
  };

  filterAndSortVaccinations = (vaccinations) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;
    const filterByVaccinationsPredicate = _.flow(_.get('vaccinationName'), _.toLower, _.includes(nameShouldInclude));
    const filterBySourcePredicate = _.flow(_.get('source'), _.toLower, _.includes(nameShouldInclude));
    const filterByDatePredicate = _.flow(_.get('dateCreated'), _.toLower, _.includes(nameShouldInclude));
    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    if (vaccinations !== undefined) {
      vaccinations.map((item) => {
        item.dateCreated = getDDMMMYYYY(item.dateCreated);
      });
    }

    const filterByVaccinations = _.flow(_.filter(filterByVaccinationsPredicate), _.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder)(vaccinations);
    const filterByDate = _.flow(_.filter(filterByDatePredicate), _.sortBy([columnNameSortBy]), reverseIfDescOrder)(vaccinations);
    const filterBySource = _.flow(_.filter(filterBySourcePredicate), _.sortBy([columnNameSortBy]), reverseIfDescOrder)(vaccinations);

    const filteredAndSortedVaccinations = [filterByVaccinations, filterByDate, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    return _.head(filteredAndSortedVaccinations)
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: VACCINATIONS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.VACCINATIONS}/create`);
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

  handleVaccinationDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
    }))
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions, vaccinationPanelFormState } = this.props;
    if (checkIsValidateForm(vaccinationPanelFormState)) {
      actions.fetchPatientVaccinationsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: VACCINATIONS_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.VACCINATIONS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, vaccinationCreateFormState } = this.props;

    if (checkIsValidateForm(vaccinationCreateFormState)) {
      formValues.dateOfOnset = moment(formValues.dateOfOnset).format('YYYY-MM-DD');
      actions.fetchPatientVaccinationsCreateRequest(this.formValuesToString(formValues, 'create'));
      setTimeout(() => actions.fetchPatientVaccinationsRequest({ userId }), 1000);
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.VACCINATIONS}`);
      this.setState({ isSubmit: false });
      this.hideCreateForm();
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId } = this.props;
    const vaccinationName = _.get(valuesNames.VACCINATION_NAME)(formValues);
    const vaccinationDateTime = new Date(_.get(valuesNames.VACCINATION_DATE)(formValues));
    const series = _.get(valuesNames.SERIES_NUMBER)(formValues);
    const comment = _.get(valuesNames.COMMENT)(formValues);
    const source = _.get(valuesNames.VACCINATION_SOURCE)(formValues);
    const dateCreated = new Date();

    return ({ vaccinationName, vaccinationDateTime, series, comment, source, dateCreated, userId });
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: VACCINATIONS_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit } = this.state;
    const { allVaccinations, vaccinationDetail, vaccinationPanelFormState, vaccinationCreateFormState } = this.props;

    const isPanelDetails = (expandedPanel === VACCINATIONS_DETAIL || expandedPanel === VACCINATIONS_PANEL);
    const isPanelMain = (expandedPanel === VACCINATIONS_MAIN);
    const isPanelCreate = (expandedPanel === VACCINATIONS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredVaccinations = this.filterAndSortVaccinations(allVaccinations);

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Vaccinations"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={VACCINATIONS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={VACCINATIONS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allVaccinations}
                emptyDataMessage="No vaccinations"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailVaccinationsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="vaccinations"
                filteredData={filteredVaccinations}
                totalEntriesAmount={_.size(allVaccinations)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
              />
            </div>
          </Col> : null }
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <VaccinationDetail
              onExpand={this.handleExpand}
              name={VACCINATIONS_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={VACCINATIONS_DETAIL}
              detail={vaccinationDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleVaccinationDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              vaccinationPanelFormValues={vaccinationPanelFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={VACCINATIONS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={VACCINATIONS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={vaccinationCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <VaccinationCreateForm isSubmit={isSubmit} />
              }
              title="Create Vaccination"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
